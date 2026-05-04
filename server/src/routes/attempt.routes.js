// Attempt route definitions (all protected)

const express = require("express");
const router = express.Router();
const {
  logAttempt,
  getAttempts,
  deleteAttempt,
  attemptValidation,
} = require("../controllers/attempt.controller");
const { protect } = require("../middleware/auth.middleware");

// All attempt routes require authentication
router.use(protect);

router.post("/", attemptValidation, logAttempt);
router.get("/", getAttempts);
router.delete("/:id", deleteAttempt);

module.exports = router;
