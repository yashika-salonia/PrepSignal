// 14-day bar chart of daily attempts

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs shadow-xl">
      <p className="font-mono text-slate-400 mb-2">{label}</p>
      {payload.map((p) => (
        <p
          key={p.name}
          style={{ color: p.color }}
          className="font-display font-600"
        >
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function RecentActivity({ data }) {
  const formatted = (data || []).map((d) => ({
    ...d,
    date: new Date(d.date + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="glass-card p-5 animate-slide-up">
      <h3 className="font-display font-600 text-white text-sm mb-5">
        Activity – Last 14 Days
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={formatted} barSize={10} barGap={2}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{
              fontSize: 10,
              fill: "#64748b",
              fontFamily: "JetBrains Mono",
            }}
            axisLine={false}
            tickLine={false}
            interval={1}
          />
          <YAxis
            tick={{
              fontSize: 10,
              fill: "#64748b",
              fontFamily: "JetBrains Mono",
            }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Legend
            wrapperStyle={{
              fontSize: 11,
              fontFamily: "DM Sans",
              color: "#94a3b8",
              paddingTop: 8,
            }}
          />
          <Bar
            dataKey="attempts"
            name="Attempts"
            fill="#334155"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            dataKey="solved"
            name="Solved"
            fill="#22c55e"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
