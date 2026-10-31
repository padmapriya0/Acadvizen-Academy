import { supabase } from "./supabase";
import { courses as sampleCourses } from "../data/courses";

function normalizeCourse(row) {
  if (!row) return null;
  const sampleFallback = sampleCourses.find((course) => course.id === row.id);
  return {
    ...row,
    shortDescription: row.shortDescription ?? row.short_description ?? sampleFallback?.shortDescription ?? "Explore this practical learning path.",
    imageUrl: row.imageUrl ?? row.image_url ?? sampleFallback?.imageUrl ?? "",
    iconKey: row.iconKey ?? row.icon_key ?? "code",
    price: Number(row.price ?? 0),
    skills: Array.isArray(row.skills) ? row.skills : [],
    curriculum: Array.isArray(row.curriculum) ? row.curriculum : [],
    featured: Boolean(row.featured),
    art: row.art || "art-purple",
  };
}

/** Public course reads use the publishable/anon key and are protected by RLS.
 * Local sample data is used as a graceful fallback when Supabase is not configured
 * or the courses table has not been created yet.
 */
export async function getCourses({ featuredOnly = false } = {}) {
  if (supabase) {
    try {
      let request = supabase.from("courses").select("*").eq("published", true).order("sort_order", { ascending: true });
      if (featuredOnly) request = request.eq("featured", true);
      const { data, error } = await request;
      if (!error && Array.isArray(data) && data.length > 0) return data.map(normalizeCourse);
    } catch (error) {
      console.error("Could not load courses from Supabase; using sample data.", error);
    }
  }
  const fallback = sampleCourses.map(normalizeCourse);
  return featuredOnly ? fallback.filter((course) => course.featured) : fallback;
}

export async function getCourseById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from("courses").select("*").eq("id", id).eq("published", true).maybeSingle();
      if (!error && data) return normalizeCourse(data);
    } catch (error) {
      console.error("Could not load course from Supabase; checking sample data.", error);
    }
  }
  return sampleCourses.map(normalizeCourse).find((course) => course.id === id) || null;
}
