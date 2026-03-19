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

const rawOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL || "",
].filter(Boolean);

// normalize: remove trailing slashes
const allowedOrigins = rawOrigins.map((o) => o.replace(/\/+$/, ""));

// Global Middleware
app.use(
  cors({
    origin: (incomingOrigin, callback) => {
      if (!incomingOrigin) return callback(null, true);

      const clean = incomingOrigin.replace(/\/+$/, "");

      if (allowedOrigins.includes(clean)) {
        return callback(null, true);
      }

      console.warn(`[CORS] Blocked origin: ${incomingOrigin}`);
      return callback(new Error(`CORS origin "${incomingOrigin}" not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// handle pre-flight options req from all user
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "PrepSignal API is running " });
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/analytics", analyticsRoutes);

//Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
