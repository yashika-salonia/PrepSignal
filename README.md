# PrepSignal – DSA Performance Tracking Platform

PrepSignal is a full-stack MERN application designed to track and analyze problem-solving activity for Data Structures and Algorithms (DSA).  
It helps users monitor their preparation, identify weak areas, and improve consistency through structured performance insights.

---

## 🚀 Features

### 🔐 Authentication & Security

- User registration and login using JWT-based authentication
- Protected routes on both frontend and backend
- Persistent login using token validation

---

### 📝 Problem Attempt Tracking

- Log DSA problem attempts with:
  - Topic and difficulty level
  - Solved / unsolved status
  - Time taken
  - Confidence rating (1–5)
  - Hints used/ not used
  - Optional notes
- Structured data storage for consistent analytics

---

### 📊 Performance Dashboard

- Displays key performance metrics:
  - Overall accuracy
  - Average time per problem
  - Total attempts vs solved
- Topic-wise breakdown for identifying strengths and weaknesses
- Clean UI for quick insights into preparation progress

---

### 📋 Attempt History

- View all logged attempts
- Pagination support for scalability
- Includes metadata like difficulty, confidence, and timestamps

---

## 🏗️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **API Handling:** Axios

---

## ⚙️ System Architecture

Client (React)
↓
Axios (API calls)
↓
Express Server
↓
Controllers
↓
MongoDB (via Mongoose)

- Controllers handle request/response
- Business logic is structured and separated
- Database schema ensures consistency in attempt tracking

---

## 🔌 API Overview

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| POST   | `/api/auth/register`       | Register user         |
| POST   | `/api/auth/login`          | Login user            |
| GET    | `/api/auth/me`             | Get current user      |
| POST   | `/api/attempts`            | Log problem attempt   |
| GET    | `/api/attempts`            | Fetch attempt history |
| GET    | `/api/analytics/dashboard` | Get performance stats |

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/yashika-salonia/PrepSignal
cd PrepSignal
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=<YOUR_URL>
JWT_SECRET=your_super_secret_key_minimum_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

```bash
npm run dev
# Server starts at http://localhost:5000
```

### 3. Frontend setup

```bash
# Open a new terminal from project root
cd client
npm install
npm run dev
# App opens at http://localhost:5173
```

> The Vite dev server automatically proxies `/api/*` to `localhost:5000` — no CORS issues in development.

---

## 📁 Project Structure

```
PrepSignal/
├── server/
│   ├── src/
│   │   ├── config/db.js                # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.model.js           # Schema + bcrypt hashing
│   │   │   ├── Problem.model.js        # 25 DSA topics catalogue
│   │   │   └── Attempt.model.js        # Core tracking model
│   │   ├── controllers/                # Thin request handlers
│   │   ├── services/                   # All business logic
│   │   │   └── analytics.service.js    # 🧠 The coach brain
│   │   ├── routes/
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js      # JWT guard
│   │   │   └── error.middleware.js     # Global error handler
│   │   ├── utils/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example                    # ← copy to .env, never commit .env
│
└── client/
    ├── src/
    │   ├── api/                        # Axios + JWT interceptor
    │   ├── context/AuthContext.jsx     # Global auth state
    │   ├── hooks/                      # useAnalytics, useAttempts
    │   ├── components/
    │   │   ├── ReadinessGauge.jsx      # SVG arc score gauge
    │   │   ├── DifficultyChart.jsx     # Recharts donut chart
    │   │   ├── RecentActivity.jsx      # 14-day bar chart
    │   │   └── TopicTable.jsx          # Per-topic breakdown
    │   ├── pages/
    │   │   ├── Dashboard.jsx           # Main analytics view
    │   │   ├── LogProblem.jsx          # Attempt logging form
    │   │   └── Attempts.jsx            # Filterable history
    │   └── App.jsx
    ├── vite.config.js
    └── tailwind.config.js
```

---

## 🔌 API Reference

All protected routes require:

```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint             | Auth | Description        |
| ------ | -------------------- | :--: | ------------------ |
| POST   | `/api/auth/register` |  ❌  | Create new account |
| POST   | `/api/auth/login`    |  ❌  | Login, returns JWT |
| GET    | `/api/auth/me`       |  ✅  | Get current user   |

### Attempts

| Method | Endpoint        | Auth | Description                |
| ------ | --------------- | :--: | -------------------------- |
| POST   | `/api/attempts` |  ✅  | Log a new attempt          |
| GET    | `/api/attempts` |  ✅  | Get all (supports filters) |

**POST body:**

```json
{
  "problemTitle": "Two Sum",
  "topic": "Hashing",
  "difficulty": "Easy",
  "solved": true,
  "timeTaken": 12,
  "confidenceRating": 4,
  "hintsUsed": false,
  "notes": "Classic hashmap pattern"
}
```

### Analytics

| Method | Endpoint                   | Auth | Description          |
| ------ | -------------------------- | :--: | -------------------- |
| GET    | `/api/analytics/dashboard` |  ✅  | Full dashboard stats |

---

## 🏗️ Architecture

### Request Flow

```
React Component
  → Custom Hook (useAnalytics)
    → Axios (JWT auto-injected via interceptor)
      → Vite Proxy → Express
        → Route → Auth Middleware
          → Controller (validate only)
            → Service (all logic)
              → Mongoose → MongoDB
```

## 🔐 Security

- Passwords hashed with **bcryptjs** (12 salt rounds)
- JWT with configurable expiry (default 7 days)
- `.env` is gitignored — secrets never committed
- Input validation on every route via **express-validator**
- Global error handler — no stack traces leak to client
- All DB queries scoped per `user._id` — zero cross-user data leakage

---

## 🗺️ Roadmap

- [ ] Company Readiness Score (Amazon, Google, Microsoft)
- [ ] AI-powered study plan recommendations
- [ ] LeetCode API integration — auto-sync solved problems
- [ ] Daily streak tracker with contribution heatmap
- [ ] Timed mock interview mode
- [ ] Anonymous peer leaderboard by college/batch

---

<div align="center">
 
Built with ☕ and late nights for every student fighting their placement war.
 
⭐ **Star this repo if it helps your prep!**
 
</div>
