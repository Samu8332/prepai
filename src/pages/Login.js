import React, { useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const USERS_KEY = "prepai-demo-users";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const readUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
    catch { return []; }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const users = readUsers();
    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (users.some((item) => item.email === normalizedEmail)) {
        setError("An account with this email already exists. Please sign in.");
        return;
      }
      const newUser = { name: name.trim(), email: normalizedEmail, password };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
      onLogin({ name: newUser.name, email: newUser.email });
      navigate(location.state?.from?.pathname || "/", { replace: true });
      return;
    }

    const existingUser = users.find((item) => item.email === normalizedEmail && item.password === password);
    if (!existingUser) {
      setError("Email or password is incorrect. If you are new, create an account first.");
      return;
    }
    onLogin({ name: existingUser.name, email: existingUser.email });
    navigate(location.state?.from?.pathname || "/", { replace: true });
  };

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />
      <section className="auth-card">
        <div className="auth-brand"><span className="auth-brand-icon"><Sparkles size={23} /></span><div><strong>PrepAI</strong><small>SMART INTERVIEW COACH</small></div></div>
        <div className="auth-illustration"><div className="auth-illustration-icon"><BookOpen size={31} /></div><span className="auth-orbit orbit-one">✦</span><span className="auth-orbit orbit-two">✧</span><div className="auth-illustration-copy"><strong>Your next opportunity starts here.</strong><span>Practice smarter. Show up with confidence.</span></div></div>
        <div className="auth-form-wrap">
          <span className="eyebrow">WELCOME TO PREPAI</span>
          <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="auth-subtitle">{mode === "login" ? "Sign in to continue your interview preparation." : "Start building confidence for your next interview."}</p>
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "signup" && <label className="auth-field"><span>Full name</span><div><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required /><Sparkles size={17} /></div></label>}
            <label className="auth-field"><span>Email address</span><div><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /><Mail size={17} /></div></label>
            <label className="auth-field"><span>Password</span><div><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "signup" ? "At least 6 characters" : "Enter your password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 6 : undefined} required /><button className="auth-eye" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            {message && <p className="auth-success" role="status">{message}</p>}
            <button type="submit" className="auth-submit">{mode === "login" ? "Sign in" : "Create account"}<ArrowRight size={17} /></button>
          </form>
          <p className="auth-switch">{mode === "login" ? "New to PrepAI?" : "Already have an account?"} <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}>{mode === "login" ? "Create account" : "Sign in"}</button></p>
          <p className="auth-demo-note"><LockKeyhole size={13} /> Demo authentication: account details are stored only in this browser.</p>
        </div>
      </section>
      <p className="auth-footer">© 2026 PrepAI · Prepare today. Impress tomorrow.</p>
    </main>
  );
}
