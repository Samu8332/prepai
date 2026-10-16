import React, { useState } from "react";
import { FileText, Upload, CheckCircle2, AlertCircle, Sparkles, RotateCcw } from "lucide-react";

function analyzeResume(text) {
  const lower = text.toLowerCase();
  const checks = [
    { title: "Contact details", ok: /@/.test(text) && /\d{7,}/.test(text), advice: "Include a professional email address and phone number." },
    { title: "Skills section", ok: /skills|technologies|technical/i.test(text), advice: "Add a clear skills section with tools and technologies you know." },
    { title: "Projects or experience", ok: /project|experience|internship|work/i.test(text), advice: "Describe projects, internships, or work that demonstrates your skills." },
    { title: "Education", ok: /education|degree|bachelor|diploma|university|college/i.test(text), advice: "Include your education, qualification, and institution." },
    { title: "Achievement or impact", ok: /achieved|improved|built|developed|created|%|increased/i.test(lower), advice: "Use action verbs and measurable outcomes where you can support them." },
    { title: "Readable length", ok: text.trim().split(/\s+/).length >= 100, advice: "Add concise details about skills, projects, and results. Aim for relevant content, not filler." }
  ];
  return checks;
}

export default function ResumeAnalyzer() {
  const [text, setText] = useState("");
  const [report, setReport] = useState(null);
  const [fileName, setFileName] = useState("");
  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      setText(await file.text()); setReport(null);
    } else {
      setText(""); setReport(null);
      alert("For this demo, paste resume text or upload a .txt file. PDF/DOCX parsing is not configured.");
    }
  };
  const runAnalysis = (e) => {
    e.preventDefault();
    if (text.trim().length < 30) { alert("Please paste more resume content before analyzing."); return; }
    setReport(analyzeResume(text));
  };
  const score = report ? Math.round(report.filter((x) => x.ok).length / report.length * 100) : 0;
  return <div className="page-stack"><section className="page-intro"><div><span className="eyebrow"><Sparkles size={14} /> RESUME REVIEW</span><h2>Make your resume work harder</h2><p>Get a quick checklist to improve clarity and completeness.</p></div></section><div className="resume-grid"><form className="panel resume-input-panel" onSubmit={runAnalysis}><div className="panel-heading"><div><h3>Your resume content</h3><p>Paste text below or upload a plain text file.</p></div><FileText size={21} /></div><label className="upload-box"><Upload size={22} /><strong>{fileName || "Choose a .txt resume file"}</strong><span>Or click to browse your device</span><input type="file" accept=".txt,text/plain" onChange={(e) => handleFile(e.target.files[0])} /></label><label className="field-label" htmlFor="resume-text">Resume text</label><textarea id="resume-text" className="resume-textarea" value={text} onChange={(e) => { setText(e.target.value); setReport(null); }} placeholder={"Paste your resume here...\n\nInclude contact details, education, skills, projects, and experience."} rows={14} /><div className="textarea-footer"><span>{text.trim() ? text.trim().split(/\s+/).length : 0} words</span><button type="button" className="text-button" onClick={() => { setText(""); setReport(null); setFileName(""); }}><RotateCcw size={14} /> Clear</button></div><button className="button button-primary button-full" type="submit"><Sparkles size={17} /> Analyze resume</button><p className="privacy-note">Demo analysis runs in your browser. Your resume is not uploaded to a server.</p></form><section className="panel resume-report-panel"><div className="panel-heading"><div><h3>Feedback report</h3><p>Practical checks for your next revision</p></div></div>{!report ? <div className="resume-empty"><div className="resume-empty-icon"><FileText size={28} /></div><strong>Your feedback will appear here</strong><p>Paste your resume and run the checklist to see what is already covered and what could be improved.</p><div className="resume-benefits"><span><CheckCircle2 size={16} /> Structure checklist</span><span><CheckCircle2 size={16} /> Skills and projects</span><span><CheckCircle2 size={16} /> Actionable suggestions</span></div></div> : <><div className="resume-score"><div><span>CHECKLIST SCORE</span><strong>{score}%</strong></div><div className="resume-score-track"><i style={{ width: `${score}%` }} /></div><p>{report.filter((x) => x.ok).length} of {report.length} basic checks passed. This is a content checklist, not an ATS guarantee.</p></div><div className="resume-checks">{report.map((item) => <div className="resume-check" key={item.title}><div className={`resume-check-icon ${item.ok ? "check-ok" : "check-needs"}`}>{item.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}</div><div><strong>{item.title}</strong><p>{item.ok ? "Looks covered in your text." : item.advice}</p></div></div>)}</div><button className="button button-secondary button-full" onClick={() => setReport(null)}>Edit resume text</button></>}</section></div><div className="info-banner"><AlertCircle size={18} /><p>This is an educational checklist, not an actual AI model or professional hiring assessment. Never add information that is not true about your experience.</p></div></div>;
}
