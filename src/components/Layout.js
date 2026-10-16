import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ theme, onToggleTheme, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="main-area">
        <Navbar onMenu={() => setMenuOpen(true)} theme={theme} onToggleTheme={onToggleTheme} user={user} onLogout={onLogout} />
        <main className="page-content"><Outlet /></main>
        <footer className="footer"><span>© 2026 PrepAI</span><span>Built for your next big opportunity <span className="footer-heart">✦</span></span></footer>
      </div>
    </div>
  );
}
