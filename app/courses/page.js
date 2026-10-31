import CoursesBrowser from "../../components/CoursesBrowser";
import { getCourses } from "../../lib/courses";

export const metadata = { title: "Courses | Acadvizen Academy", description: "Explore practical learning paths across technology, design, business and career development." };

export default async function CoursesPage() {
  const courses = await getCourses();
  const categories = ["All", ...new Set(courses.map((course) => course.category).filter(Boolean))];
  return <>
    <section className="page-hero"><div className="container"><span className="eyebrow">Find your next skill</span><h1>Courses built for your next move</h1><p>Explore practical learning paths across technology, design, business and career development.</p></div></section>
    <section className="section"><div className="container"><CoursesBrowser courses={courses} categories={categories}/></div></section>
  </>;
}
