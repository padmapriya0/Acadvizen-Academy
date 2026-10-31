import Link from "next/link";
import { ArrowUpRight, Clock3, GraduationCap, Code2, Palette, Megaphone, BriefcaseBusiness, Bot, TrendingUp } from "lucide-react";

const iconMap = { code: Code2, palette: Palette, megaphone: Megaphone, briefcase: BriefcaseBusiness, bot: Bot, "trending-up": TrendingUp };

export default function CourseCard({ course }) {
  const Icon = course.icon || iconMap[course.iconKey] || Code2;
  return (
    <article className="course-card">
      <div className={`course-art ${course.art || "art-purple"}`}>
        <span className="course-badge">{course.level}</span>
        {course.imageUrl ? <img className="course-image" src={course.imageUrl} alt="" loading="lazy" /> : <span className="course-icon"><Icon size={28}/></span>}
      </div>
      <div className="course-body">
        <div className="course-meta"><span className="category-label">{course.category}</span><span><Clock3 size={14} style={{display:"inline",verticalAlign:"middle",marginRight:4}}/>{course.duration}</span></div>
        <h3>{course.title}</h3>
        <p>{course.shortDescription}</p>
        <div className="course-bottom">
          <span className="course-price">₹{Number(course.price || 0).toLocaleString("en-IN")} <small>/ course</small></span>
          <Link href={`/courses/${course.id}`} className="btn btn-link" aria-label={`View ${course.title}`}>Explore <ArrowUpRight size={17}/></Link>
        </div>
      </div>
    </article>
  );
}
