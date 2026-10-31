import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play, Sparkles, Clock3, BadgeCheck, BookOpenCheck, BriefcaseBusiness, UsersRound, Target, Lightbulb, Laptop } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../lib/courses";

export default async function HomePage() {
  const featured = await getCourses({ featuredOnly: true });
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span> Skills for the next version of you</div>
            <h1>Learn skills.<br/>Unlock your <span>potential.</span></h1>
            <p>Practical, career-focused learning designed to help you build confidence, create real projects and move forward with purpose.</p>
            <div className="hero-actions"><Link href="/courses" className="btn btn-primary">Explore courses <ArrowRight size={18}/></Link><Link href="/about" className="btn btn-secondary"><Play size={16}/> Discover our approach</Link></div>
            <div className="hero-proof"><div className="avatar-stack"><span className="avatar">AK</span><span className="avatar">SP</span><span className="avatar">RM</span><span className="avatar">+</span></div><div className="proof-copy"><strong>Built around practical learning</strong><span>Projects, practice and career skills</span></div></div>
          </div>
          <div className="hero-art" aria-label="Illustration of an online learning dashboard">
            <div className="art-orb"></div>
            <div className="floating-tag"><Sparkles size={15} style={{display:"inline",marginRight:5}}/> Learn by doing</div>
            <div className="learning-card">
              <div className="learning-top"><div><small>YOUR LEARNING SPACE</small><h3 style={{margin:"5px 0 0"}}>Keep your momentum</h3></div><span className="progress-pill">In progress</span></div>
              <div className="mock-video"><span className="play-button"><Play fill="currentColor" size={23}/></span></div>
              <h3>Build skills that move you forward</h3><p className="small-copy">Short lessons. Practical projects. Skills you can demonstrate.</p>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:".78rem",fontWeight:700,marginBottom:8}}><span>Learning progress</span><span>68%</span></div><div className="progress-line"><span></span></div>
            </div>
            <div className="floating-note"><span className="floating-icon"><BadgeCheck size={20}/></span><span>Project-based<br/>learning</span></div>
          </div>
        </div>
      </section>
      <section className="trust-strip"><div className="container trust-inner"><span className="trust-label">Skills across growing fields</span><span className="trust-name">TECHNOLOGY</span><span className="trust-name">CREATIVE DESIGN</span><span className="trust-name">BUSINESS</span><span className="trust-name">CAREER GROWTH</span></div></section>
      <section className="section"><div className="container"><div className="section-heading"><span className="eyebrow">Explore learning paths</span><h2>Find the skill that takes you further</h2><p>Learn at your pace with structured courses designed around practical outcomes and real-world skills.</p></div><div className="course-grid">{featured.map(course=><CourseCard key={course.id} course={course}/>)}</div><div style={{textAlign:"center",marginTop:36}}><Link href="/courses" className="btn btn-secondary">View all courses <ArrowUpRight size={17}/></Link></div></div></section>
      <section className="section section-soft"><div className="container"><div className="section-heading"><span className="eyebrow">A smarter way to learn</span><h2>More than lessons. A path forward.</h2><p>Our learning experience is designed to help you move from understanding concepts to applying them with confidence.</p></div><div className="benefit-grid">
        <article className="benefit-card"><span className="benefit-icon"><Laptop size={23}/></span><h3>Practical from day one</h3><p>Work through exercises and projects that help turn new knowledge into demonstrable skills.</p></article>
        <article className="benefit-card"><span className="benefit-icon"><UsersRound size={23}/></span><h3>Support as you grow</h3><p>Use clear learning paths, feedback and structured practice to keep your progress moving.</p></article>
        <article className="benefit-card"><span className="benefit-icon"><Target size={23}/></span><h3>Career-focused outcomes</h3><p>Build a portfolio of work and strengthen the professional skills that help you take your next step.</p></article>
      </div></div></section>
      <section className="stats-band"><div className="container stats-grid"><div><div className="stat-number">5+</div><div className="stat-label">Learning pathways</div></div><div><div className="stat-number">100%</div><div className="stat-label">Practice-focused approach</div></div><div><div className="stat-number">24/7</div><div className="stat-label">Learn at your own pace</div></div><div><div className="stat-number">1 goal</div><div className="stat-label">Your next step forward</div></div></div></section>
      <section className="section"><div className="container"><div className="section-heading"><span className="eyebrow">Designed for progress</span><h2>Build confidence one project at a time</h2><p>Use your learning to create work you can explain, share and keep improving.</p></div><div className="benefit-grid"><article className="quote-card"><div className="quote-stars">★★★★★</div><blockquote>“The best learning happens when you put ideas into practice. Every project is a chance to understand what you can do.”</blockquote><div className="person"><span className="person-avatar">P</span><div><strong>Practical learning</strong><small>Our learning philosophy</small></div></div></article><article className="quote-card"><div className="quote-stars">★★★★★</div><blockquote>“A clear learning path helps you focus on building useful skills instead of feeling overwhelmed by where to start.”</blockquote><div className="person"><span className="person-avatar" style={{background:"var(--peach)",color:"#9c4d2c"}}>G</span><div><strong>Guided progress</strong><small>Our approach to learning</small></div></div></article><article className="quote-card"><div className="quote-stars">★★★★★</div><blockquote>“Small, consistent steps can lead to meaningful progress. Keep practising, keep building and keep moving forward.”</blockquote><div className="person"><span className="person-avatar" style={{background:"#e5eaff",color:"#3452a1"}}>C</span><div><strong>Career readiness</strong><small>A goal worth working toward</small></div></div></article></div></div></section>
      <section className="section" style={{paddingTop:10}}><div className="container"><div className="cta-panel"><div><h2>Your next chapter starts with one skill.</h2><p>Explore the learning paths and find a place to begin.</p></div><Link href="/courses" className="btn">Explore courses <ArrowUpRight size={17}/></Link></div></div></section>
    </>
  );
}
