// Analytics & placement readiness computation
// This is the "coach brain" of PrepSignal.

const Attempt = require("../models/Attempt.model");

/**
 - Compute full dashboard analytics for a user.
 - @param {string} userId
 - @returns {object} dashboard stats
 */
const getDashboardAnalytics = async (userId) => {
  const attempts = await Attempt.find({ user: userId });

  if (attempts.length === 0) {
    return getEmptyDashboard();
  }

  // Basic Stats 
  const totalAttempts = attempts.length;
  const totalSolved = attempts.filter((a) => a.solved).length;
  const accuracy = ((totalSolved / totalAttempts) * 100).toFixed(1);
  const avgTimeTaken = (
    attempts.reduce((sum, a) => sum + a.timeTaken, 0) / totalAttempts
  ).toFixed(1);
  const avgConfidence = (
    attempts.reduce((sum, a) => sum + a.confidenceRating, 0) / totalAttempts
  ).toFixed(2);

  // Difficulty Breakdown 
  const difficultyBreakdown = computeBreakdown(attempts, "difficulty");

  // Topic-wise Performance 
  const topicStats = computeTopicStats(attempts);

  // Weak Topics (accuracy < 50%) 
  const weakTopics = topicStats
    .filter((t) => t.accuracy < 50 && t.attempts >= 2)
    .map((t) => t.topic);

  // Strong Topics (accuracy >= 80%, ≥3 attempts) 
  const strongTopics = topicStats
    .filter((t) => t.accuracy >= 80 && t.attempts >= 3)
    .map((t) => t.topic);

  // Placement Readiness Score (0–100) 
  const readinessScore = computeReadinessScore({
    accuracy: parseFloat(accuracy),
    totalSolved,
    avgConfidence: parseFloat(avgConfidence),
    weakTopics,
    topicsCovered: topicStats.length,
  });

  // Readiness Label 
  const readinessLabel = getReadinessLabel(readinessScore);

  // Recent Activity (last 14 days) 
  const recentActivity = computeRecentActivity(attempts, 14);

  return {
    overview: {
      totalAttempts,
      totalSolved,
      accuracy: parseFloat(accuracy),
      avgTimeTaken: parseFloat(avgTimeTaken),
      avgConfidence: parseFloat(avgConfidence),
    },
    difficultyBreakdown,
    topicStats,
    weakTopics,
    strongTopics,
    readinessScore,
    readinessLabel,
    recentActivity,
    // Future: companyReadiness, aiRecommendations
    recommendations: generateRecommendations({
      weakTopics,
      accuracy: parseFloat(accuracy),
      totalSolved,
    }),
  };
};

// Helpers
function computeBreakdown(attempts, field) {
  const map = {};
  for (const a of attempts) {
    const key = a[field];
    if (!map[key]) map[key] = { total: 0, solved: 0 };
    map[key].total++;
    if (a.solved) map[key].solved++;
  }
  return Object.entries(map).map(([name, stats]) => ({
    name,
    total: stats.total,
    solved: stats.solved,
    accuracy: parseFloat(((stats.solved / stats.total) * 100).toFixed(1)),
  }));
}

function computeTopicStats(attempts) {
  const map = {};
  for (const a of attempts) {
    if (!map[a.topic]) {
      map[a.topic] = { total: 0, solved: 0, totalTime: 0, totalConfidence: 0 };
    }
    map[a.topic].total++;
    if (a.solved) map[a.topic].solved++;
    map[a.topic].totalTime += a.timeTaken;
    map[a.topic].totalConfidence += a.confidenceRating;
  }

  return Object.entries(map)
    .map(([topic, s]) => ({
      topic,
      attempts: s.total,
      solved: s.solved,
      accuracy: parseFloat(((s.solved / s.total) * 100).toFixed(1)),
      avgTime: parseFloat((s.totalTime / s.total).toFixed(1)),
      avgConfidence: parseFloat((s.totalConfidence / s.total).toFixed(2)),
    }))
    .sort((a, b) => b.attempts - a.attempts);
}

function computeReadinessScore({
  accuracy,
  totalSolved,
  avgConfidence,
  weakTopics,
  topicsCovered,
}) {
  // Weighted formula (tweak weights as needed)
  const accuracyScore = accuracy * 0.35; // max 35
  const solvedScore = Math.min(totalSolved, 100) * 0.25; // max 25
  const confidenceScore = (avgConfidence / 5) * 100 * 0.15; // max 15
  const topicCoverageScore = (Math.min(topicsCovered, 15) / 15) * 100 * 0.15; // max 15
  const weakPenalty = weakTopics.length * 2; // −2 per weak topic

  const raw =
    accuracyScore +
    solvedScore +
    confidenceScore +
    topicCoverageScore -
    weakPenalty;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

function getReadinessLabel(score) {
  if (score >= 85) return { label: "Interview Ready 🚀", color: "green" };
  if (score >= 65) return { label: "Almost There 💪", color: "blue" };
  if (score >= 45) return { label: "Needs Work 📚", color: "yellow" };
  if (score >= 25) return { label: "Early Stage 🌱", color: "orange" };
  return { label: "Just Starting 🐣", color: "red" };
}

function computeRecentActivity(attempts, days) {
  const now = new Date();
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const dayAttempts = attempts.filter(
      (a) => a.createdAt.toISOString().split("T")[0] === dateStr,
    );

    result.push({
      date: dateStr,
      attempts: dayAttempts.length,
      solved: dayAttempts.filter((a) => a.solved).length,
    });
  }

  return result;
}

function generateRecommendations({ weakTopics, accuracy, totalSolved }) {
  const recs = [];

  if (totalSolved < 20) {
    recs.push("Aim to solve at least 20 problems to establish a baseline.");
  }
  if (accuracy < 50) {
    recs.push(
      "Your accuracy is below 50%. Focus on understanding solutions before moving on.",
    );
  }
  if (weakTopics.length > 0) {
    recs.push(
      `Spend dedicated sessions on your weak topics: ${weakTopics.slice(0, 3).join(", ")}.`,
    );
  }
  if (accuracy >= 80 && totalSolved >= 50) {
    recs.push("Great progress! Start practicing timed mock interviews.");
  }
  if (recs.length === 0) {
    recs.push("Keep going! Consistency is the key to placement success.");
  }

  return recs;
}

function getEmptyDashboard() {
  return {
    overview: {
      totalAttempts: 0,
      totalSolved: 0,
      accuracy: 0,
      avgTimeTaken: 0,
      avgConfidence: 0,
    },
    difficultyBreakdown: [],
    topicStats: [],
    weakTopics: [],
    strongTopics: [],
    readinessScore: 0,
    readinessLabel: { label: "Just Starting 🐣", color: "red" },
    recentActivity: [],
    recommendations: ["Log your first problem to get started!"],
  };
}

module.exports = { getDashboardAnalytics };
