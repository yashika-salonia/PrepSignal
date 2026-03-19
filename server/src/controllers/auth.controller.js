// Thin controller for auth routes
// Validates input → calls service → sends response. No business logic here.

const { body, validationResult } = require("express-validator");
const authService = require("../services/auth.service");
const { sendSuccess, sendError } = require("../utils/apiResponse.utils");

// Validation Rules 
const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// Handler: POST /api/auth/register 
const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, errors.array()[0].msg);
    }

    const result = await authService.registerUser(req.body);
    sendSuccess(res, 201, "Account created successfully", result);
  } catch (error) {
    next(error);
  }
};

// Handler: POST /api/auth/login 
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, errors.array()[0].msg);
    }

    const result = await authService.loginUser(req.body);
    sendSuccess(res, 200, "Login successful", result);
  } catch (error) {
    next(error);
  }
};

// Handler: GET /api/auth/me 
const getMe = async (req, res, next) => {
  try {
    const profile = await authService.getUserProfile(req.user._id);
    sendSuccess(res, 200, "Profile fetched", profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation,
};
