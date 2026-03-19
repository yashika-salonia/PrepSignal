// Analytics route definitions (all protected)

const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/analytics.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/dashboard", getDashboard);

module.exports = router;
