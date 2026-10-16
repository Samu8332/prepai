import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Target, Flame, Clock3, Trophy, Play, Code2, MessageCircle, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import StatCard from "../components/StatCard";

const chartData = [
  { day: "Mon", score: 35 }, { day: "Tue", score: 48 }, { day: "Wed", score: 42 },
  { day: "Thu", score: 61 }, { day: "Fri", score: 56 }, { day: "Sat", score: 76 }, { day: "Sun", score: 84 }
];

export default function Dashboard() {
  const completed = Number(localStorage.getItem("prepai-completed") || 0);
  const bestScore = Number(localStorage.getItem("prepai-best-score") || 0);
  const tasks = JSON.parse(localStorage.getItem("prepai-tasks") || "[]");
  const doneTasks = tasks.filter((t) => t.done).length;
  return (
    <div className="dashboard-page">
      <section className="hero-banner">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-copy">
          <div className="hero-pill"><Sparkles size={13} /> YOUR CAREER JOURNEY STARTS HERE</div>
          <h2>Ready to ace your<br /><span>next interview?</span></h2>
          <p>Build confidence, sharpen your skills, and turn your preparation into your next opportunity.</p>
          <div className="hero-actions"><Link to="/mock-interview" className="button button-white"><Play size={16} fill="currentColor" /> Start mock interview</Link><Link to="/questions" className="hero-text-link">Explore questions <ArrowRight size={16} /></Link></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-ring ring-one" /><div className="hero-ring ring-two" />
          <div className="hero-orbit-card"><div className="orbit-icon"><Target size={23} /></div><span>INTERVIEW READY</span><strong>{Math.min(100, 35 + completed * 8 + Math.round(bestScore / 10))}%</strong><div className="mini-progress"><i style={{ width: `${Math.min(100, 35 + completed * 8 + Math.round(bestScore / 10))}%` }} /></div><small>Keep your momentum going</small></div>
          <div className="floating-chip chip-top"><span className="chip-dot" /> Skills growing</div><div className="floating-chip chip-bottom"><Trophy size={16} /> Every session counts</div>
        </div>
        <div className="hero-decoration">✳</div>
      </section>

      <div className="section-heading"><div><h2>Your preparation at a glance</h2><p>Every small step adds up. Keep going!</p></div><span className="date-chip">✦ Your learning space</span></div>
      <section className="stats-grid">
        <StatCard icon={Target} label="Practice sessions" value={completed} change="Keep going" note="sessions completed" tone="violet" />
        <StatCard icon={Trophy} label="Best quiz score" value={`${bestScore}%`} change={bestScore ? "Personal best" : "Your goal awaits"} note="highest score" tone="amber" />
        <StatCard icon={Flame} label="Study tasks done" value={doneTasks} change="One step at a time" note="tasks completed" tone="coral" />
        <StatCard icon={Clock3} label="Daily focus" value="20 min" change="Small daily wins" note="suggested practice" tone="blue" />
      </section>

      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <div className="panel-heading"><div><h3>Practice overview</h3><p>Your weekly learning momentum</p></div><span className="chart-legend"><i /> Score trend</span></div>
          <div className="chart-summary"><strong>{bestScore || 0}%</strong><span>your best saved score</span><span className="trend-tag"><ArrowUpRight size={14} /> Keep improving</span></div>
          <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}><defs><linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.24} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid strokeDasharray="3 5" vertical={false} stroke="var(--chart-grid)" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} domain={[0, 100]} /><Tooltip contentStyle={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text)" }} /><Area type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} fill="url(#scoreFill)" activeDot={{ r: 5, strokeWidth: 0 }} /></AreaChart></ResponsiveContainer></div>
          <div className="chart-foot"><span><i className="legend-dot" /> Demo weekly trend</span><span>Saved results update your stats</span></div>
        </article>
        <article className="panel readiness-panel">
          <div className="panel-heading"><div><h3>Readiness snapshot</h3><p>A starting point for your journey</p></div><span className="tiny-sparkle"><Sparkles size={18} /></span></div>
          <div className="readiness-circle" style={{ "--progress": `${Math.min(100, 35 + completed * 8 + Math.round(bestScore / 10))}%` }}><div><strong>{Math.min(100, 35 + completed * 8 + Math.round(bestScore / 10))}%</strong><span>readiness</span></div></div>
          <p className="readiness-note">Your score improves as you complete practice sessions and review your answers.</p>
          <div className="readiness-list"><div><span><i className="readiness-dot purple" /> Technical practice</span><strong>{completed ? "In progress" : "Start today"}</strong></div><div><span><i className="readiness-dot green" /> Study planner</span><strong>{doneTasks}/{tasks.length} tasks</strong></div></div>
          <Link to="/progress" className="panel-link">View progress <ArrowRight size={15} /></Link>
        </article>
      </section>

      <div className="section-heading section-heading-spaced"><div><h2>Make your next move</h2><p>Pick a path and get started</p></div><Link to="/questions" className="subtle-link">View all <ArrowRight size={15} /></Link></div>
      <section className="action-grid">
        <Link to="/mock-interview" className="action-card action-violet"><div className="action-icon"><MessageCircle size={21} /></div><span className="action-arrow"><ArrowUpRight size={18} /></span><h3>Mock interview</h3><p>Practice under a timer and test what you know.</p><span className="action-bottom">Start a session <ArrowRight size={15} /></span></Link>
        <Link to="/questions" className="action-card action-blue"><div className="action-icon"><Code2 size={21} /></div><span className="action-arrow"><ArrowUpRight size={18} /></span><h3>Technical questions</h3><p>Explore React, JavaScript, HTML and CSS.</p><span className="action-bottom">Explore topics <ArrowRight size={15} /></span></Link>
        <Link to="/resume" className="action-card action-orange"><div className="action-icon"><FileText size={21} /></div><span className="action-arrow"><ArrowUpRight size={18} /></span><h3>Resume feedback</h3><p>Review your resume content and spot gaps.</p><span className="action-bottom">Analyze resume <ArrowRight size={15} /></span></Link>
      </section>
      <section className="panel encouragement"><div className="encourage-icon"><CheckCircle2 size={21} /></div><div><strong>Consistency beats cramming.</strong><p>Try one 10-minute practice session today, then review every explanation.</p></div><Link to="/planner" className="panel-link">Plan my week <ArrowRight size={15} /></Link></section>
    </div>
  );
}
