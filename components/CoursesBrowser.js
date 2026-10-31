"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import CourseCard from "./CourseCard";

export default function CoursesBrowser({ courses, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => courses.filter((course) => {
    const matchesCategory = category === "All" || course.category === category;
    const text = `${course.title} ${course.category} ${course.shortDescription} ${course.level} ${(course.skills || []).join(" ")}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase().trim());
  }), [courses, query, category]);

  return <>
    <div className="filter-panel"><label className="search-box"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses, skills or topics..." aria-label="Search courses"/></label><div className="filter-list" aria-label="Filter by category">{categories.map(item=><button type="button" key={item} className={`filter-chip ${category===item?"selected":""}`} onClick={()=>setCategory(item)}>{item}</button>)}</div></div>
    <div className="result-count"><SlidersHorizontal size={15} style={{display:"inline",verticalAlign:"middle",marginRight:6}}/>Showing {filtered.length} {filtered.length===1?"course":"courses"}</div>
    <div className="course-grid">{filtered.length ? filtered.map(course=><CourseCard key={course.id} course={course}/>) : <div className="empty-state"><h3>No courses found</h3><p>Try another search term or choose a different category.</p><button className="btn btn-secondary" onClick={()=>{setQuery("");setCategory("All")}}>Clear filters</button></div>}</div>
  </>;
}
