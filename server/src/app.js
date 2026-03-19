// src/app.js – Express application setup
// Registers middleware, routes, and error handlers

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const attemptRoutes = require("./routes/attempt.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const errorHandler = require("./middleware/error.middleware");
const notFound = require("./middleware/notFound.middleware");

const app = express();

// Global Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "PrepSignal API is running 🚀" });
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/analytics", analyticsRoutes);

//Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
