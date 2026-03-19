// Visual placement readiness score widget

export default function ReadinessGauge({ score, label }) {
  const colorMap = {
    green: {
      ring: "#22c55e",
      glow: "rgba(34,197,94,0.3)",
      text: "text-signal-400",
    },
    blue: {
      ring: "#3b82f6",
      glow: "rgba(59,130,246,0.3)",
      text: "text-blue-400",
    },
    yellow: {
      ring: "#eab308",
      glow: "rgba(234,179,8,0.3)",
      text: "text-yellow-400",
    },
    orange: {
      ring: "#f97316",
      glow: "rgba(249,115,22,0.3)",
      text: "text-orange-400",
    },
    red: { ring: "#ef4444", glow: "rgba(239,68,68,0.3)", text: "text-red-400" },
  };

  const color = colorMap[label?.color] || colorMap.red;
  const radius = 56;
  const circ = 2 * Math.PI * radius;
  const dash = circ * (score / 100);

  return (
    <div className="glass-card p-6 flex flex-col items-center gap-4 animate-slide-up">
      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest self-start">
        Placement Readiness
      </p>

      <div className="relative w-40 h-40">
        {/* Background ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
          />
          {/* Score arc */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={color.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{
              filter: `drop-shadow(0 0 8px ${color.glow})`,
              transition: "stroke-dasharray 1s ease",
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-display font-700 ${color.text}`}>
            {score}
          </span>
          <span className="text-xs text-slate-500 font-mono">/100</span>
        </div>
      </div>

      <div className="text-center">
        <p className={`text-base font-display font-600 ${color.text}`}>
          {label?.label}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Based on your performance data
        </p>
      </div>
    </div>
  );
}
