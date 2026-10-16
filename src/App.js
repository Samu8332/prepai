import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import MockInterview from "./pages/MockInterview";
import Results from "./pages/Results";
import Progress from "./pages/Progress";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Bookmarks from "./pages/Bookmarks";
import StudyPlanner from "./pages/StudyPlanner";
import NotFound from "./pages/NotFound";
import "./App.css";

function ProtectedLayout({ theme, onToggleTheme, user, onLogout }) {
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Layout theme={theme} onToggleTheme={onToggleTheme} user={user} onLogout={onLogout} />;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("prepai-theme") || "light");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("prepai-user-session") || "null"); }
    catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem("prepai-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleLogin = (loggedInUser) => {
    localStorage.setItem("prepai-user-session", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("prepai-user-session");
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
      <Route element={<ProtectedLayout user={user} onLogout={handleLogout} theme={theme} onToggleTheme={() => setTheme((old) => old === "light" ? "dark" : "light")} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/results" element={<Results />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
