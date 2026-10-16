import React, { useState } from "react";
import { CalendarDays, Plus, Check, Trash2, Target, Clock3 } from "lucide-react";

const defaultTasks = [
  { id: 101, title: "Revise JavaScript fundamentals", category: "JavaScript", date: "", done: false },
  { id: 102, title: "Practice 5 React questions", category: "React", date: "", done: false },
  { id: 103, title: "Review my resume projects", category: "Career", date: "", done: false }
];

export default function StudyPlanner() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("prepai-tasks");
    return stored ? JSON.parse(stored) : defaultTasks;
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technical");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("All");
  const save = (next) => { setTasks(next); localStorage.setItem("prepai-tasks", JSON.stringify(next)); };
  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    save([{ id: Date.now(), title: title.trim(), category, date, done: false }, ...tasks]);
    setTitle(""); setDate("");
  };
  const toggle = (id) => save(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => save(tasks.filter((t) => t.id !== id));
  const visible = tasks.filter((t) => filter === "All" || (filter === "Completed" ? t.done : !t.done));
  const done = tasks.filter((t) => t.done).length;
  return <div className="page-stack"><section className="page-intro"><div><span className="eyebrow"><CalendarDays size={14} /> YOUR ROUTINE</span><h2>Build your study plan</h2><p>Turn big career goals into small, manageable actions.</p></div></section><section className="planner-stats"><article className="panel planner-stat"><div className="stat-icon violet"><Target size={20} /></div><div><span>Total tasks</span><strong>{tasks.length}</strong></div></article><article className="panel planner-stat"><div className="stat-icon green"><Check size={20} /></div><div><span>Completed</span><strong>{done}</strong></div></article><article className="panel planner-stat"><div className="stat-icon blue"><Clock3 size={20} /></div><div><span>Still to do</span><strong>{tasks.length - done}</strong></div></article></section><div className="planner-grid"><form className="panel add-task-panel" onSubmit={addTask}><div className="panel-heading"><div><h3>Add a study task</h3><p>Keep it clear and achievable.</p></div><Plus size={20} /></div><label className="field-label" htmlFor="task-title">Task name</label><input id="task-title" className="text-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Revise React Hooks" maxLength={100} required /><label className="field-label" htmlFor="task-category">Category</label><select id="task-category" className="text-input" value={category} onChange={(e) => setCategory(e.target.value)}>{["Technical", "JavaScript", "React", "Resume", "HR Interview", "Career"].map((x) => <option key={x}>{x}</option>)}</select><label className="field-label" htmlFor="task-date">Target date (optional)</label><input id="task-date" className="text-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} /><button className="button button-primary button-full" type="submit"><Plus size={17} /> Add to my plan</button></form><section className="panel task-list-panel"><div className="panel-heading"><div><h3>Your tasks</h3><p>Progress happens one checkbox at a time.</p></div><span className="task-total">{done}/{tasks.length}</span></div><div className="task-progress-overview"><div className="progress-track"><i style={{ width: `${tasks.length ? done / tasks.length * 100 : 0}%` }} /></div><span>{tasks.length ? Math.round(done / tasks.length * 100) : 0}% complete</span></div><div className="task-filters">{["All", "Pending", "Completed"].map((f) => <button key={f} className={filter === f ? "filter-active" : ""} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="planner-task-list">{visible.map((task) => <article className={`planner-task ${task.done ? "task-done" : ""}`} key={task.id}><button className={`task-check ${task.done ? "checked" : ""}`} onClick={() => toggle(task.id)} aria-label={task.done ? "Mark as pending" : "Mark as completed"}>{task.done && <Check size={14} />}</button><div className="planner-task-copy"><strong>{task.title}</strong><div><span className="task-category">{task.category}</span>{task.date && <span className="task-date">{task.date}</span>}</div></div><button className="icon-button task-delete" onClick={() => remove(task.id)} aria-label="Delete task"><Trash2 size={16} /></button></article>)}{visible.length === 0 && <div className="small-empty">No tasks in this view. Add one or switch filters.</div>}</div></section></div><div className="info-banner"><CalendarDays size={18} /><p>Your tasks are stored locally in this browser. This demo does not sync tasks between devices.</p></div></div>;
}
