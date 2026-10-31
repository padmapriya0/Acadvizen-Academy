import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand"><span className="brand-mark">A</span><span>Acad<span>vizen</span></span></Link>
            <p>Practical learning for ambitious people. Build real-world skills and take the next step in your career.</p>
            <Link href="/courses" className="btn btn-primary">Find your course <ArrowUpRight size={16}/></Link>
          </div>
          <div><h4>Explore</h4><div className="footer-links"><Link href="/courses">All courses</Link><Link href="/about">About us</Link><Link href="/contact">Contact</Link></div></div>
          <div><h4>Course areas</h4><div className="footer-links"><Link href="/courses?category=Technology">Technology</Link><Link href="/courses?category=Design">Design</Link><Link href="/courses?category=Business">Business</Link><Link href="/courses?category=Career Development">Career development</Link></div></div>
          <div><h4>Get in touch</h4><div className="footer-links"><span><Mail size={15} style={{display:"inline",verticalAlign:"middle",marginRight:8}}/> hello@acadvizen.com</span><span><Phone size={15} style={{display:"inline",verticalAlign:"middle",marginRight:8}}/> Contact our team</span><span><MapPin size={15} style={{display:"inline",verticalAlign:"middle",marginRight:8}}/> Learn from anywhere</span></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Acadvizen Academy. Assessment demonstration website.</span><span>Learn today. Lead tomorrow.</span></div>
      </div>
    </footer>
  );
}
