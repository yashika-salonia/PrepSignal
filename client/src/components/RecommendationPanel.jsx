// Coach recommendations list

export default function RecommendationPanel({
  recommendations,
  weakTopics,
  strongTopics,
}) {
  return (
    <div className="glass-card p-5 animate-slide-up space-y-5">
      <h3 className="font-display font-600 text-white text-sm">
        Coach Insights 🧠
      </h3>

      {/* Recommendations */}
      <ul className="space-y-2.5">
        {(recommendations || []).map((rec, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm text-slate-300 font-body leading-relaxed"
          >
            <span className="text-signal-400 mt-0.5 shrink-0">→</span>
            {rec}
          </li>
        ))}
      </ul>

      {/* Weak topics */}
      {weakTopics?.length > 0 && (
        <div>
          <p className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2">
            Weak Areas
          </p>
          <div className="flex flex-wrap gap-2">
            {weakTopics.map((t) => (
              <span key={t} className="badge badge-red">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Strong topics */}
      {strongTopics?.length > 0 && (
        <div>
          <p className="text-xs font-mono text-signal-400 uppercase tracking-wider mb-2">
            Strengths
          </p>
          <div className="flex flex-wrap gap-2">
            {strongTopics.map((t) => (
              <span key={t} className="badge badge-green">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
