// Full attempt history with filters

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAttempts } from "../hooks/useAttempts";

const DIFFICULTIES = ["", "Easy", "Medium", "Hard"];
const diffColor = {
  Easy: "badge-green",
  Medium: "badge-orange",
  Hard: "badge-red",
};

export default function Attempts() {
  const [filters, setFilters] = useState({ difficulty: "", solved: "" });
  const { attempts, loading, error } = useAttempts(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")),
  );

  const setFilter = (key, val) =>
    setFilters((prev) => ({ ...prev, [key]: val }));

  const confidenceDots = (n) =>
    [1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`inline-block w-1.5 h-1.5 rounded-full ${i <= n ? "bg-signal-500" : "bg-slate-700"}`}
      />
    ));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-700 text-white">
            Attempt History
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-body">
            {attempts.length} attempts recorded
          </p>
        </div>
        <Link to="/log" className="btn-primary text-sm">
          + Log Problem
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-1">
          {DIFFICULTIES.map((d) => (
            <button
              key={d || "all"}
              onClick={() => setFilter("difficulty", d)}
              className={`px-3 py-1.5 text-xs font-mono border rounded-lg transition-all ${
                filters.difficulty === d
                  ? "bg-slate-700 text-white border-slate-600"
                  : "border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {d || "All"}
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          {[
            ["", "All"],
            ["true", "Solved"],
            ["false", "Unsolved"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setFilter("solved", v)}
              className={`px-3 py-1.5 text-xs font-mono border rounded-lg transition-all ${
                filters.solved === v
                  ? "bg-slate-700 text-white border-slate-600"
                  : "border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-signal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="glass-card p-6 text-center text-red-400 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && attempts.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-slate-400 font-body mb-4">No attempts found.</p>
          <Link to="/log" className="btn-primary text-sm">
            Log your first problem
          </Link>
        </div>
      )}

      {!loading && attempts.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="text-left px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Diff
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Conf
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Hints
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => (
                  <tr
                    key={a._id}
                    className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span
                        className="font-body text-slate-200 line-clamp-1"
                        title={a.problemTitle}
                      >
                        {a.problemTitle}
                      </span>
                      {a.notes && (
                        <p className="text-xs text-slate-600 font-body mt-0.5 line-clamp-1">
                          {a.notes}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-body text-xs">
                      {a.topic}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`badge ${diffColor[a.difficulty] || "badge-slate"}`}
                      >
                        {a.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`badge ${a.solved ? "badge-green" : "badge-red"}`}
                      >
                        {a.solved ? "✓ Solved" : "✗ Unsolved"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-400 text-xs">
                      {a.timeTaken}m
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-0.5">
                        {confidenceDots(a.confidenceRating)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-xs font-mono">
                      {a.hintsUsed ? (
                        <span className="text-war-400">Yes</span>
                      ) : (
                        <span className="text-slate-600">No</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-slate-500 text-xs whitespace-nowrap">
                      {new Date(a.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
