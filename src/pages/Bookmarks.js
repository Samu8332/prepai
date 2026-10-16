import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkX, BookOpen, ArrowRight } from "lucide-react";
import { questions } from "../data/questions";

export default function Bookmarks() {
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("prepai-bookmarks") || "[]"));
  const [expanded, setExpanded] = useState([]);
  const remove = (id) => { const next = saved.filter((n) => n !== id); setSaved(next); localStorage.setItem("prepai-bookmarks", JSON.stringify(next)); };
  const items = questions.filter((q) => saved.includes(q.id));
  return <div className="page-stack"><section className="page-intro"><div><span className="eyebrow"><Bookmark size={14} /> YOUR COLLECTION</span><h2>Saved questions</h2><p>Keep important concepts close for quick revision.</p></div><span className="intro-count"><strong>{items.length}</strong><span>saved items</span></span></section>{items.length ? <div className="question-list">{items.map((q) => <article className="panel question-card" key={q.id}><div className="question-top"><div className="question-tags"><span className={`topic-tag tag-${q.topic.toLowerCase()}`}>{q.topic}</span><span className="level-tag">{q.level}</span></div><button className="icon-button" onClick={() => remove(q.id)} aria-label="Remove bookmark" title="Remove bookmark"><BookmarkX size={19} /></button></div><h3>{q.question}</h3>{expanded.includes(q.id) && <div className="explanation"><strong>Answer</strong><p>{q.options[q.answer]}</p><strong>Explanation</strong><p>{q.explanation}</p></div>}<button className="button button-secondary" onClick={() => setExpanded((old) => old.includes(q.id) ? old.filter((id) => id !== q.id) : [...old, q.id])}>{expanded.includes(q.id) ? "Hide answer" : "Review answer"}</button></article>)}</div> : <div className="empty-state panel"><Bookmark size={32} /><h3>No saved questions yet</h3><p>Visit the question bank and tap the bookmark icon on questions you want to revise later.</p><Link to="/questions" className="button button-primary">Explore question bank <ArrowRight size={16} /></Link></div>}<div className="info-banner"><BookOpen size={18} /><p>Bookmarks are saved in this browser using LocalStorage, so they remain after refreshing the page on this device.</p></div></div>;
}
