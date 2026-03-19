// CRUD logic for problem attempts

const Attempt = require("../models/Attempt.model");

/**
 * Log a new problem attempt for a user
 * @param {string} userId
 * @param {object} attemptData
 */
const createAttempt = async (userId, attemptData) => {
  const attempt = await Attempt.create({ user: userId, ...attemptData });
  return attempt;
};

/**
 * Get all attempts for a user (most recent first)
 * @param {string} userId
 * @param {object} filters - optional { topic, difficulty, solved }
 */
const getUserAttempts = async (userId, filters = {}) => {
  const query = { user: userId };

  if (filters.topic) query.topic = filters.topic;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.solved !== undefined) query.solved = filters.solved === "true";

  const attempts = await Attempt.find(query).sort({ createdAt: -1 }).limit(200); // Safety cap

  return attempts;
};

module.exports = { createAttempt, getUserAttempts };
