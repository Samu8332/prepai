import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock3, ArrowLeft, ArrowRight, CheckCircle2, Flag, RotateCcw, Trophy } from "lucide-react";
import { questions } from "../data/questions";

const SESSION_LENGTH = 5;
export default function MockInterview() {
  const navigate = useNavigate();
  const session = useMemo(() => questions.slice(0, SESSION_LENGTH), []);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(SESSION_LENGTH * 60);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (!started || submitted || seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [started, submitted, seconds]);
  useEffect(() => { if (started && seconds === 0 && !submitted) finish(); }, [seconds, started, submitted]); // eslint-disable-line react-hooks/exhaustive-deps
  const finish = () => {
    const score = Math.round(session.reduce((sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0), 0) / session.length * 100);
    localStorage.setItem("prepai-last-score", String(score));
    localStorage.setItem("prepai-best-score", String(Math.max(score, Number(localStorage.getItem("prepai-best-score") || 0))));
    localStorage.setItem("prepai-last-answers", JSON.stringify(answers));
    localStorage.setItem("prepai-last-question-ids", JSON.stringify(session.map((q) => q.id)));
    localStorage.setItem("prepai-completed", String(Number(localStorage.getItem("prepai-completed") || 0) + 1));
    setSubmitted(true);
  };
  const restart = () => { setStarted(false); setCurrent(0); setAnswers({}); setSeconds(SESSION_LENGTH * 60); setSubmitted(false); };
  const question = session[current];
  const formatTime = (n) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  if (!started) return <div className="mock-start-wrap"><section className="mock-start panel"><div className="mock-start-art"><div className="mock-art-circle"><Trophy size={46} /></div><span className="mock-art-star star-a">✦</span><span className="mock-art-star star-b">✧</span><span className="mock-art-line" /></div><span className="eyebrow">YOUR PRACTICE ARENA</span><h2>Show yourself<br /><span>what you know.</span></h2><p>A focused practice round with real interview-style questions. No pressure — just progress.</p><div className="mock-facts"><div><Clock3 size={18} /><span><strong>5 minutes</strong><small>Time limit</small></span></div><div><CheckCircle2 size={18} /><span><strong>5 questions</strong><small>Multiple choice</small></span></div><div><Trophy size={18} /><span><strong>Instant results</strong><small>Review answers</small></span></div></div><button className="button button-primary button-large" onClick={() => setStarted(true)}>Start mock interview <ArrowRight size={17} /></button><small className="mock-disclaimer">Your progress is saved in this browser.</small></section></div>;
  if (submitted) {
    const correct = session.filter((q) => answers[q.id] === q.answer).length;
    const score = Math.round(correct / session.length * 100);
    return <div className="result-wrap"><section className="panel result-hero"><div className="result-medal"><Trophy size={32} /></div><span className="eyebrow">SESSION COMPLETE</span><h2>{score >= 80 ? "Brilliant work!" : score >= 60 ? "Nice effort — keep going!" : "Every attempt makes you stronger."}</h2><p>You completed your practice round. Review the answers below and turn mistakes into progress.</p><div className="result-score">{score}<span>%</span></div><div className="result-metrics"><div><strong>{correct}/{session.length}</strong><span>Correct answers</span></div><div><strong>{formatTime(SESSION_LENGTH * 60 - seconds)}</strong><span>Time used</span></div><div><strong>{session.length - correct}</strong><span>To review</span></div></div><div className="result-actions"><button className="button button-primary" onClick={() => navigate("/results")}>View detailed feedback <ArrowRight size={16} /></button><button className="button button-secondary" onClick={restart}><RotateCcw size={16} /> Try again</button></div></section><section className="panel review-panel"><h3>Answer review</h3>{session.map((q) => <div className="review-row" key={q.id}><div className={`review-status ${answers[q.id] === q.answer ? "review-good" : "review-bad"}`}>{answers[q.id] === q.answer ? <CheckCircle2 size={17} /> : <Flag size={17} />}</div><div><strong>{q.question}</strong><p>Your answer: {answers[q.id] === undefined ? "Not answered" : q.options[answers[q.id]]}</p><p className="correct-answer">Correct answer: {q.options[q.answer]}</p><small>{q.explanation}</small></div></div>)}</section></div>;
  }
  return <div className="interview-layout"><section className="panel interview-main"><div className="interview-top"><span className="eyebrow">MOCK INTERVIEW / TECHNICAL</span><div className={`timer-chip ${seconds < 60 ? "timer-warning" : ""}`}><Clock3 size={17} /><strong>{formatTime(seconds)}</strong></div></div><div className="session-progress"><div><span>QUESTION {current + 1} OF {session.length}</span><strong>{Math.round((current + 1) / session.length * 100)}%</strong></div><div className="progress-track"><i style={{ width: `${(current + 1) / session.length * 100}%` }} /></div></div><div className="question-tags"><span className={`topic-tag tag-${question.topic.toLowerCase()}`}>{question.topic}</span><span className="level-tag">{question.level}</span></div><h2 className="interview-question">{question.question}</h2><p className="interview-hint">Choose the best answer below.</p><div className="interview-options">{question.options.map((option, i) => <button key={option} onClick={() => setAnswers((old) => ({ ...old, [question.id]: i }))} className={`interview-option ${answers[question.id] === i ? "selected" : ""}`}><span className="option-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span><span className="option-radio">{answers[question.id] === i && <i />}</span></button>)}</div><div className="interview-navigation"><button className="button button-secondary" disabled={current === 0} onClick={() => setCurrent((n) => n - 1)}><ArrowLeft size={16} /> Previous</button><span>{Object.keys(answers).length} of {session.length} answered</span>{current === session.length - 1 ? <button className="button button-primary" onClick={finish}>Submit interview <CheckCircle2 size={16} /></button> : <button className="button button-primary" onClick={() => setCurrent((n) => n + 1)}>Next question <ArrowRight size={16} /></button>}</div></section><aside className="panel interview-side"><h3>Question navigator</h3><p>Jump to any question in this session.</p><div className="question-numbers">{session.map((q, i) => <button key={q.id} className={`${current === i ? "number-current" : ""} ${answers[q.id] !== undefined ? "number-answered" : ""}`} onClick={() => setCurrent(i)}>{i + 1}</button>)}</div><div className="navigator-legend"><span><i className="legend-current" /> Current</span><span><i className="legend-answered" /> Answered</span><span><i className="legend-unanswered" /> Unanswered</span></div><div className="interview-tip"><strong>✦ Quick tip</strong><p>Read each question carefully. If you're unsure, eliminate options that don't fit before choosing.</p></div><button className="text-button" onClick={() => { if (window.confirm("End this practice and return to the start? Your current attempt will not be saved.")) restart(); }}>Exit practice</button></aside></div>;
}
