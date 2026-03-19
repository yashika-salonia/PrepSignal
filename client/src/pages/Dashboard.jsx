import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAnalytics } from "../hooks/useAnalytics";
import StatCard from "../components/StatCard";
import ReadinessGauge from "../components/ReadinessGauge";
import RecentActivity from "../components/RecentActivity";
import DifficultyChart from "../components/DifficultyChart";
import TopicTable from "../components/TopicTable";
import RecommendationPanel from "../components/RecommendationPanel";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useAnalytics();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-signal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm font-mono">
          Crunching your stats…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={refetch} className="btn-ghost">
          Try again
        </button>
      </div>
    );
  }

  const {
    overview,
    difficultyBreakdown,
    topicStats,
    weakTopics,
    strongTopics,
    readinessScore,
    readinessLabel,
    recentActivity,
    recommendations,
  } = data;

  const hasData = overview.totalAttempts > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-700 text-white">
            Hey, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-body">
            {hasData
              ? `${overview.totalAttempts} attempts tracked • Keep pushing.`
              : "Start logging problems to unlock your analytics."}
          </p>
        </div>
        <Link to="/log" className="btn-primary self-start sm:self-auto">
          + Log Problem
        </Link>
      </div>

      {!hasData && (
        <div className="glass-card p-12 text-center space-y-4">
          <div className="text-5xl">🏹</div>
          <h2 className="font-display font-700 text-white text-xl">
            No data yet
          </h2>
          <p className="text-slate-400 font-body text-sm max-w-sm mx-auto">
            Log your first problem attempt to start tracking your placement
            readiness.
          </p>
          <Link to="/log" className="btn-primary inline-block mt-2">
            Log First Problem
          </Link>
        </div>
      )}

      {hasData && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total Solved"
              value={overview.totalSolved}
              sub={`of ${overview.totalAttempts} attempts`}
              accent="green"
              delay={0}
            />
            <StatCard
              label="Accuracy"
              value={`${overview.accuracy}%`}
              sub="problems solved correctly"
              accent="blue"
              delay={60}
            />
            <StatCard
              label="Avg Time"
              value={`${overview.avgTimeTaken}m`}
              sub="per problem"
              accent="orange"
              delay={120}
            />
            <StatCard
              label="Avg Confidence"
              value={`${overview.avgConfidence}/5`}
              sub="self-rated confidence"
              accent="purple"
              delay={180}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReadinessGauge score={readinessScore} label={readinessLabel} />
            <div className="md:col-span-2">
              <RecommendationPanel
                recommendations={recommendations}
                weakTopics={weakTopics}
                strongTopics={strongTopics}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <RecentActivity data={recentActivity} />
            </div>
            <DifficultyChart data={difficultyBreakdown} />
          </div>

          <TopicTable topicStats={topicStats} />
        </>
      )}
    </div>
  );
}
