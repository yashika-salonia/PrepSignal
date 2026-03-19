// src/models/Problem.model.js – Catalogue of DSA problems (shared reference data)
// Problems can be seeded or created by admin; used as a reference for attempts.
// This keeps problem metadata separate from user-attempt data.

const mongoose = require("mongoose");

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

const problemSchema = new mongoose.Schema(
  {
    title: {
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
    // Optional external links for future LeetCode / GFG integration
    externalLinks: {
      leetcode: { type: String, default: "" },
      gfg: { type: String, default: "" },
    },
    // Future: company tags, frequency, pattern tags
    companies: { type: [String], default: [] },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

// Export TOPICS so other modules can reuse them
module.exports = mongoose.model("Problem", problemSchema);
module.exports.TOPICS = TOPICS;
