
import { supabase } from "./supabase";
import { courses as sampleCourses } from "../data/courses";

function normalizeCourse(row) {
  if (!row) return null;

  const sampleFallback = sampleCourses.find(
    (course) => String(course.id) === String(row.id)
  );

  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? sampleFallback?.title ?? ""),
    category: String(row.category ?? sampleFallback?.category ?? ""),
    level: String(row.level ?? sampleFallback?.level ?? ""),
    duration: String(row.duration ?? sampleFallback?.duration ?? ""),
    shortDescription: String(
      row.shortDescription ??
      row.short_description ??
      sampleFallback?.shortDescription ??
      "Explore this practical learning path."
    ),
    imageUrl: String(
      row.imageUrl ??
      row.image_url ??
      sampleFallback?.imageUrl ??
      ""
    ),
    iconKey: String(
      row.iconKey ??
      row.icon_key ??
      sampleFallback?.iconKey ??
      "code"
    ),
    price: Number(row.price ?? sampleFallback?.price ?? 0),
    skills: Array.isArray(row.skills)
      ? row.skills.filter((item) => typeof item === "string")
      : sampleFallback?.skills ?? [],
    curriculum: Array.isArray(row.curriculum)
      ? row.curriculum
      : sampleFallback?.curriculum ?? [],
    featured: Boolean(row.featured ?? sampleFallback?.featured),
    art: String(row.art ?? sampleFallback?.art ?? "art-purple"),
    published: Boolean(row.published),
  };
}

export async function getCourses({ featuredOnly = false } = {}) {
  if (supabase) {
    try {
      let request = supabase
        .from("courses")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (featuredOnly) {
        request = request.eq("featured", true);
      }

      const { data, error } = await request;

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(normalizeCourse);
      }
    } catch (error) {
      console.error(
        "Could not load courses from Supabase; using sample data.",
        error
      );
    }
  }

  const fallback = sampleCourses.map(normalizeCourse);

  return featuredOnly
    ? fallback.filter((course) => course.featured)
    : fallback;
}

export async function getCourseById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .maybeSingle();

      if (!error && data) {
        return normalizeCourse(data);
      }
    } catch (error) {
      console.error(
        "Could not load course from Supabase; checking sample data.",
        error
      );
    }
  }

  return (
    sampleCourses
      .map(normalizeCourse)
      .find((course) => course.id === String(id)) || null
  );
}
