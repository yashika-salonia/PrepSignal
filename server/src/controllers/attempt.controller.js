// Thin controller for attempt routes

const { body, validationResult } = require("express-validator");
const attemptService = require("../services/attempt.service");
const { sendSuccess, sendError } = require("../utils/apiResponse.utils");
const { TOPICS } = require("../models/Problem.model");

// Validation Rules 
const attemptValidation = [
  body("problemTitle")
    .trim()
    .notEmpty()
    .withMessage("Problem title is required"),
  body("topic").isIn(TOPICS).withMessage("Invalid topic"),
  body("difficulty")
    .isIn(["Easy", "Medium", "Hard"])
    .withMessage("Difficulty must be Easy, Medium, or Hard"),
  body("solved").isBoolean().withMessage("Solved must be true or false"),
  body("timeTaken")
    .isInt({ min: 1 })
    .withMessage("Time taken must be at least 1 minute"),
  body("confidenceRating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Confidence must be between 1 and 5"),
];

// Handler: POST /api/attempts 
const logAttempt = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, errors.array()[0].msg);
    }

    const attempt = await attemptService.createAttempt(req.user._id, req.body);
    sendSuccess(res, 201, "Attempt logged successfully", attempt);
  } catch (error) {
    next(error);
  }
};

// Handler: GET /api/attempts 
const getAttempts = async (req, res, next) => {
  try {
    const attempts = await attemptService.getUserAttempts(
      req.user._id,
      req.query,
    );
    sendSuccess(res, 200, "Attempts fetched", attempts);
  } catch (error) {
    next(error);
  }
};

module.exports = { logAttempt, getAttempts, attemptValidation };
