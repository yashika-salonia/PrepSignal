// Form to log a DSA problem attempt

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logAttempt } from "../api/attempts.api";

const TOPICS = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Binary Search",
  "Recursion",
  "Backtracking",
  "Sorting",
  "Two Pointers",
  "Sliding Window",
  "Hashing",
  "Trees",
  "Binary Search Tree",
  "Heaps",
  "Graphs",
  "BFS",
  "DFS",
  "Dynamic Programming",
  "Greedy",
  "Bit Manipulation",
  "Math",
  "Tries",
  "Segment Tree",
  "Disjoint Set",
  "Other",
];

const INITIAL = {
  problemTitle: "",
  topic: "",
  difficulty: "",
  solved: true,
  timeTaken: "",
  confidenceRating: 3,
  hintsUsed: false,
  notes: "",
};

export default function LogProblem() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logAttempt({
        ...form,
        timeTaken: Number(form.timeTaken),
        confidenceRating: Number(form.confidenceRating),
        solved: Boolean(form.solved),
        hintsUsed: Boolean(form.hintsUsed),
      });
      setSuccess(true);
      setForm(INITIAL);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to log attempt. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-700 text-white">
          Log a Problem
        </h1>
        <p className="text-slate-400 mt-1 font-body text-sm">
          Track every attempt — honesty here is what makes the analytics
          powerful.
        </p>
      </div>

      {/* Success banner */}
      {success && (
        <div className="mb-6 px-4 py-3 bg-signal-500/10 border border-signal-500/30 rounded-xl text-signal-400 text-sm font-body flex items-center gap-2 animate-slide-up">
          <span>✓</span> Attempt logged! Keep going 💪
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-body">
          {error}
        </div>
      )}

      <div className="glass-card p-7">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Title */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Problem Title *
            </label>
            <input
              type="text"
              value={form.problemTitle}
              onChange={(e) => set("problemTitle", e.target.value)}
              placeholder="e.g. Two Sum, Merge Intervals, LRU Cache…"
              required
              className="input-field"
            />
          </div>

          {/* Topic + Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Topic *
              </label>
              <select
                value={form.topic}
                onChange={(e) => set("topic", e.target.value)}
                required
                className="input-field appearance-none"
              >
                <option value="">Select topic…</option>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Difficulty *
              </label>
              <div className="flex gap-2 mt-1">
                {["Easy", "Medium", "Hard"].map((d) => {
                  const colors = {
                    Easy:
                      form.difficulty === d
                        ? "bg-signal-500 text-white border-signal-500"
                        : "border-slate-700 text-slate-400 hover:border-signal-700",
                    Medium:
                      form.difficulty === d
                        ? "bg-war-500 text-white border-war-500"
                        : "border-slate-700 text-slate-400 hover:border-war-700",
                    Hard:
                      form.difficulty === d
                        ? "bg-red-500 text-white border-red-500"
                        : "border-slate-700 text-slate-400 hover:border-red-700",
                  };
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => set("difficulty", d)}
                      className={`flex-1 py-2 text-xs font-mono border rounded-lg transition-all ${colors[d]}`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Solved + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Solved? *
              </label>
              <div className="flex gap-2 mt-1">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => set("solved", v)}
                    className={`flex-1 py-2.5 text-xs font-mono border rounded-lg transition-all ${
                      form.solved === v
                        ? v
                          ? "bg-signal-500 text-white border-signal-500"
                          : "bg-red-500 text-white border-red-500"
                        : "border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {v ? "✓ Yes" : "✗ No"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Time Taken (mins) *
              </label>
              <input
                type="number"
                value={form.timeTaken}
                onChange={(e) => set("timeTaken", e.target.value)}
                placeholder="e.g. 30"
                min={1}
                required
                className="input-field"
              />
            </div>
          </div>

          {/* Confidence + Hints */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Confidence Level: {form.confidenceRating}/5
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={form.confidenceRating}
                onChange={(e) => set("confidenceRating", e.target.value)}
                className="w-full accent-signal-500"
              />
              <div className="flex justify-between text-xs font-mono text-slate-600 mt-1">
                <span>Clueless</span>
                <span>Confident</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Used Hints / Editorial?
              </label>
              <div className="flex gap-2 mt-1">
                {[false, true].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => set("hintsUsed", v)}
                    className={`flex-1 py-2.5 text-xs font-mono border rounded-lg transition-all ${
                      form.hintsUsed === v
                        ? v
                          ? "bg-war-500/20 text-war-400 border-war-500/40"
                          : "bg-signal-500/10 text-signal-400 border-signal-500/30"
                        : "border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {v ? "⚠ Yes" : "✓ Clean"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Notes / Reflection{" "}
              <span className="normal-case text-slate-600">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Key idea, mistake made, pattern to remember…"
              rows={3}
              maxLength={500}
              className="input-field resize-none"
            />
            <p className="text-right text-xs font-mono text-slate-600 mt-1">
              {form.notes.length}/500
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                "Log Attempt"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-ghost"
            >
              Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
