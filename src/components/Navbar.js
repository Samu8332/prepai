import React from "react";
import { Menu, Search, Sun, Moon, Bell, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": ["Dashboard", "Your personal interview command center"],
  "/questions": ["Question Bank", "Practice the questions that move your career forward"],
  "/mock-interview": ["Mock Interview", "A little practice today builds confidence tomorrow"],
  "/results": ["Results & Feedback", "Review your performance and learn from every attempt"],
  "/progress": ["My Progress", "See how far your practice has taken you"],
  "/resume": ["Resume Analyzer", "Make your resume clearer and more focused"],
  "/bookmarks": ["Bookmarks", "Your saved questions, all in one place"],
  "/planner": ["Study Planner", "Create a routine that works for you"]
};

export default function Navbar({ onMenu, theme, onToggleTheme, user, onLogout }) {
  const location = useLocation();
  const [title, subtitle] = titles[location.pathname] || ["PrepAI", "Your interview preparation workspace"];
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open menu"><Menu size={21} /></button>
      <div className="page-heading"><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="topbar-actions">
        <label className="top-search"><Search size={17} /><input placeholder="Search anything..." onKeyDown={(e) => { if (e.key === "Enter" && e.currentTarget.value.trim()) window.location.href = "/questions"; }} /><kbd>↵</kbd></label>
        <button className="icon-button theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">{theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}</button>
        <button className="icon-button notification-button" aria-label="Notifications" title="You're all caught up"><Bell size={19} /><span /></button>
        <div className="top-user"><div className="top-avatar">{(user?.name || user?.email || "U").charAt(0).toUpperCase()}</div><span className="top-user-name">{user?.name || user?.email || "User"}</span><button className="signout-button" onClick={onLogout} title="Sign out" aria-label="Sign out"><LogOut size={16} /><span>Sign out</span></button></div>
      </div>
    </header>
  );
}
