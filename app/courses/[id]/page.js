import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, GraduationCap, CheckCircle2, Code2, Palette, Megaphone, BriefcaseBusiness, Bot, TrendingUp } from "lucide-react";
import { getCourseById } from "../../../lib/courses";

const iconMap = { code: Code2, palette: Palette, megaphone: Megaphone, briefcase: BriefcaseBusiness, bot: Bot, "trending-up": TrendingUp };

export async function generateMetadata({ params }) {
  const { id } = await params;
  const course = await getCourseById(id);
  return { title: course ? `${course.title} | Acadvizen Academy` : "Course not found | Acadvizen Academy" };
}

export default async function CourseDetailsPage({ params }) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) notFound();
  const Icon = course.icon || iconMap[course.iconKey] || Code2;
  const skills = course.skills || [];
  const curriculum = course.curriculum || [];
  return <>
    <section className="page-hero"><div className="container"><Link href="/courses" className="btn btn-link" style={{marginBottom:18}}><ArrowLeft size={16}/> Back to courses</Link><div><span className="eyebrow">{course.category}</span></div><h1>{course.title}</h1><p>{course.shortDescription}</p></div></section>
    <section className="section"><div className="container detail-grid">
      <div className="detail-content"><div className={`detail-banner ${course.art || "art-purple"}`}>{course.imageUrl ? <img className="course-image" src={course.imageUrl} alt=""/> : <Icon size={84}/>}</div><div className="course-meta"><span><Clock3 size={15} style={{display:"inline",verticalAlign:"middle",marginRight:5}}/>{course.duration}</span><span><GraduationCap size={16} style={{display:"inline",verticalAlign:"middle",marginRight:5}}/>{course.level}</span><span><BookOpen size={15} style={{display:"inline",verticalAlign:"middle",marginRight:5}}/>Practical curriculum</span></div><h2>About this course</h2><p>{course.description}</p><h2>What you'll learn</h2><ul className="detail-list">{skills.map(skill=><li key={skill}><CheckCircle2 size={18}/>{skill}</li>)}</ul><h2>Course curriculum</h2><p>Explore the learning modules and build your knowledge step by step.</p>{curriculum.map((item,index)=><div className="curriculum-item" key={item}><span className="curriculum-number">{String(index+1).padStart(2,"0")}</span><div><strong>{item}</strong><p style={{margin:"4px 0 0",fontSize:".88rem"}}>Concepts, guided practice and an activity to apply your learning.</p></div></div>)}</div>
      <aside className="detail-panel"><span className="eyebrow">Your learning path</span><h2 style={{fontSize:"2rem"}}>₹{Number(course.price || 0).toLocaleString("en-IN")}</h2><p>Sample assessment pricing</p><div style={{height:1,background:"var(--line)",margin:"22px 0"}}/><ul className="detail-list"><li><CheckCircle2 size={18}/>Structured learning modules</li><li><CheckCircle2 size={18}/>Practice-oriented activities</li><li><CheckCircle2 size={18}/>Portfolio-focused project ideas</li><li><CheckCircle2 size={18}/>Learn at your own pace</li></ul><Link href={`/contact?course=${encodeURIComponent(course.title)}`} className="btn btn-primary">Enquire about this course <ArrowRight size={17}/></Link><small style={{color:"var(--muted)"}}>Sample course information for assessment purposes.</small></aside>
    </div></section>
  </>;
}
