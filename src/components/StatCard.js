import React from "react";

export default function StatCard({ icon: Icon, label, value, change, tone = "violet", note }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
      <div className="stat-copy"><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><span className="stat-note">{change && <em>{change}</em>} {note}</span></div>
    </article>
  );
}
