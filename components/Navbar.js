 "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Acadvizen Academy home">
          <span className="brand-mark">A</span><span>Acad<span>vizen</span></span>
        </Link>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main navigation">
          {links.map(link => <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link className="btn btn-primary" href="/courses">Explore courses <ArrowUpRight size={17}/></Link>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
        </div>
      </div>
    </header>
  );
}
