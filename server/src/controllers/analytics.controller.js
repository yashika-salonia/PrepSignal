// Thin controller for analytics routes

const analyticsService = require("../services/analytics.service");
const { sendSuccess } = require("../utils/apiResponse.utils");

// ─── Handler: GET /api/analytics/dashboard ────────────────────────────────────
const getDashboard = async (req, res, next) => {
  try {
    const data = await analyticsService.getDashboardAnalytics(req.user._id);
    sendSuccess(res, 200, "Dashboard data fetched", data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
