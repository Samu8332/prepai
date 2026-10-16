import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, ClipboardCheck, BarChart3, FileText, Bookmark, CalendarDays, Sparkles, X } from "lucide-react";

const mainLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/questions", label: "Question Bank", icon: BookOpen },
  { to: "/mock-interview", label: "Mock Interview", icon: ClipboardCheck },
  { to: "/results", label: "Results & Feedback", icon: BarChart3 },
  { to: "/progress", label: "My Progress", icon: BarChart3 },
  { to: "/resume", label: "Resume Analyzer", icon: FileText },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/planner", label: "Study Planner", icon: CalendarDays }
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="Close menu" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={22} /></div>
          <div><strong>PrepAI</strong><span>SMART INTERVIEW COACH</span></div>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav">
          {mainLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>
              {label === "Mock Interview" && <span className="nav-new">NEW</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={18} /></div>
            <strong>Level up your skills</strong>
            <p>Small practice sessions. Big career moves.</p>
            <NavLink to="/planner" onClick={onClose} className="upgrade-link">Build my plan <span>→</span></NavLink>
          </div>
          <div className="profile-mini">
            <div className="avatar">S</div>
            <div className="profile-info"><strong>Student</strong><span>Job seeker</span></div>
            <span className="online-dot" title="Local demo profile" />
          </div>
        </div>
      </aside>
    </>
  );
}
