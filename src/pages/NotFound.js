import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return <div className="empty-state panel"><h2>404</h2><h3>Looks like this page took a detour.</h3><p>The page you requested doesn't exist in PrepAI.</p><Link to="/" className="button button-primary"><ArrowLeft size={16} /> Back to dashboard</Link></div>;
}
