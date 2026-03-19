// Difficulty breakdown donut chart

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = { Easy: "#22c55e", Medium: "#f97316", Hard: "#ef4444" };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs shadow-xl">
      <p className="font-display font-600 text-white mb-1">{d.name}</p>
      <p className="font-mono text-slate-400">Attempts: {d.total}</p>
      <p className="font-mono text-slate-400">Solved: {d.solved}</p>
      <p className="font-mono" style={{ color: COLORS[d.name] }}>
        Accuracy: {d.accuracy}%
      </p>
    </div>
  );
};

export default function DifficultyChart({ data }) {
  const sorted = ["Easy", "Medium", "Hard"]
    .map((d) => data?.find((x) => x.name === d))
    .filter(Boolean);

  if (!sorted.length) {
    return (
      <div className="glass-card p-6 flex items-center justify-center text-slate-500 text-sm h-full">
        No data yet
      </div>
    );
  }

  return (
    <div className="glass-card p-5 animate-slide-up">
      <h3 className="font-display font-600 text-white text-sm mb-4">
        Difficulty Split
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={sorted}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            strokeWidth={0}
          >
            {sorted.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => (
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: 11,
                  fontFamily: "DM Sans",
                }}
              >
                {v}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Accuracy breakdown */}
      <div className="grid grid-cols-3 gap-2 mt-3 border-t border-slate-800/60 pt-4">
        {sorted.map((d) => (
          <div key={d.name} className="text-center">
            <p className="text-xs font-mono" style={{ color: COLORS[d.name] }}>
              {d.name}
            </p>
            <p className="text-lg font-display font-700 text-white">
              {d.accuracy}%
            </p>
            <p className="text-xs text-slate-500">{d.total} tried</p>
          </div>
        ))}
      </div>
    </div>
  );
}
