const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation,
} = require("../controllers/auth.controller");
// Note: the exported name is `getMe`, not `me`
const { protect } = require("../middleware/auth.middleware");

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// Protected route
router.get("/me", protect, getMe);

module.exports = router;
