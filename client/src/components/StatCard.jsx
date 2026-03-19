// Reusable metric card for the dashboard

export default function StatCard({
  label,
  value,
  sub,
  accent = "green",
  delay = 0,
}) {
  const accentMap = {
    green: "text-signal-400 bg-signal-500/10 border-signal-500/20",
    orange: "text-war-400 bg-war-500/10 border-war-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <div
      className="glass-card p-5 animate-slide-up hover:border-slate-700/80 transition-colors duration-300"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
        {label}
      </p>
      <p
        className={`text-3xl font-display font-700 ${accentMap[accent].split(" ")[0]}`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-slate-500 mt-1.5 font-body">{sub}</p>}
    </div>
  );
}
