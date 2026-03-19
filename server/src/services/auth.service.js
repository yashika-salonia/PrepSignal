// Business logic for authentication
// Controllers call these functions; this layer talks to the DB.

const User = require("../models/User.model");
const { generateToken } = require("../utils/jwt.utils");

/**
 * Register a new user
 * @param {object} userData - { name, email, password }
 * @returns {{ user, token }}
 */
const registerUser = async ({ name, email, password }) => {
  // Check for duplicate email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("An account with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  // Create user (password hashing is handled by the pre-save hook)
  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

/**
 * Log in an existing user
 * @param {object} credentials - { email, password }
 * @returns {{ user, token }}
 */
const loginUser = async ({ email, password }) => {
  // Must explicitly select password because it's hidden by default
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

/**
 * Get user profile by ID (used by /me endpoint)
 * @param {string} userId
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    targetCompanies: user.targetCompanies,
  };
};

module.exports = { registerUser, loginUser, getUserProfile };
