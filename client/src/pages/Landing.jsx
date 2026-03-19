// src/pages/Landing.jsx – Public landing page for unauthenticated visitors

import { Link } from "react-router-dom";

const features = [
  {
    icon: "📊",
    title: "Placement Readiness Score",
    desc: "A live score (0–100) computed from your accuracy, confidence, topic coverage, and weak areas.",
  },
  {
    icon: "🧠",
    title: "Coach Insights",
    desc: "Automated recommendations that tell you exactly what to fix — not just what your numbers are.",
  },
  {
    icon: "📈",
    title: "Topic Analytics",
    desc: "See accuracy, avg time, and confidence broken down by every DSA topic.",
  },
  {
    icon: "⚡",
    title: "Fast Logging",
    desc: "Log a problem in under 30 seconds. Difficulty, confidence, hints, time — all captured.",
  },
];

export default function Landing() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <section className="text-center py-24 space-y-6 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-signal-500/30 bg-signal-500/5 rounded-full text-xs font-mono text-signal-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-500 animate-pulse-slow" />
          Open Beta
        </div>

        <h1 className="text-5xl sm:text-6xl font-display font-800 text-white leading-tight tracking-tight">
          Win your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-400 to-signal-600">
            placement war.
          </span>
        </h1>

        <p className="text-slate-400 font-body text-lg max-w-xl mx-auto leading-relaxed">
          PrepSignal tracks every DSA attempt and computes your real placement
          readiness — not just a problem count, but a score that reflects{" "}
          <em>how well</em> you actually know it.
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <Link to="/register" className="btn-primary text-base px-7 py-3">
            Start for Free
          </Link>
          <Link to="/login" className="btn-ghost text-base px-7 py-3">
            Log In
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-24">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass-card p-6 hover:border-slate-700 transition-colors duration-300 animate-slide-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-display font-700 text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-400 font-body leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
