// src/models/Attempt.model.js – Tracks every time a user attempts a problem
// This is the core data model; analytics are computed from these records.

const mongoose = require("mongoose");
const { TOPICS } = require("./Problem.model");

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for fast per-user queries
    },

    // Problem info (inline for flexibility — no need to create problems first)
    problemTitle: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      enum: TOPICS,
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: ["Easy", "Medium", "Hard"],
    },

    // Attempt outcome
    solved: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Time taken in minutes
    timeTaken: {
      type: Number,
      required: [true, "Time taken is required"],
      min: [1, "Time taken must be at least 1 minute"],
    },

    // Self-assessed confidence: 1 (very low) to 5 (very high)
    confidenceRating: {
      type: Number,
      required: [true, "Confidence rating is required"],
      min: 1,
      max: 5,
    },

    // Did the user look at hints / editorial?
    hintsUsed: {
      type: Boolean,
      default: false,
    },

    // Optional notes / reflection
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },

    // Future: link to a Problem document for richer data
    problemRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      default: null,
    },
  },
  { timestamps: true },
);

// Compound index for fast analytics queries per user
attemptSchema.index({ user: 1, topic: 1 });
attemptSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Attempt", attemptSchema);
