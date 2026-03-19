// Per-topic performance breakdown table

export default function TopicTable({ topicStats }) {
  if (!topicStats?.length) {
    return (
      <div className="glass-card p-6 text-center text-slate-500 text-sm">
        No topic data yet. Log some problems to see your breakdown.
      </div>
    );
  }

  const getAccuracyBadge = (acc) => {
    if (acc >= 80) return "badge badge-green";
    if (acc >= 50) return "badge badge-orange";
    return "badge badge-red";
  };

  return (
    <div className="glass-card overflow-hidden animate-slide-up">
      <div className="px-5 py-4 border-b border-slate-800/60">
        <h3 className="font-display font-600 text-white text-sm">
          Topic Breakdown
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800/60">
              <th className="text-left px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                Topic
              </th>
              <th className="text-right px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                Attempts
              </th>
              <th className="text-right px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                Solved
              </th>
              <th className="text-right px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                Accuracy
              </th>
              <th className="text-right px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                Avg Time
              </th>
              <th className="text-right px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody>
            {topicStats.map((t, i) => (
              <tr
                key={t.topic}
                className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <td className="px-5 py-3 font-body text-slate-200">
                  {t.topic}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-400">
                  {t.attempts}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-400">
                  {t.solved}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={getAccuracyBadge(t.accuracy)}>
                    {t.accuracy}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-400">
                  {t.avgTime}m
                </td>
                <td className="px-5 py-3 text-right">
                  <ConfidenceDots value={t.avgConfidence} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ConfidenceDots({ value }) {
  const filled = Math.round(value);
  return (
    <div className="flex items-center justify-end gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i <= filled ? "bg-signal-500" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
}
