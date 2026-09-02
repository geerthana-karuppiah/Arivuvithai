# ARIVUVITHAI (அறிவு விதை) 🌱

> **Begin Your Journey of Wisdom** — A modern, beginner-friendly programming learning platform.

ARIVUVITHAI offers structured, interactive programming curricula across 5 languages with real-life analogies, syntax breakdowns, step-by-step explanations, live progress tracking, and a rule-based code explainer.

---

## 🏛️ Architecture Overview

```
                 ┌────────────────────────────────┐
                 │          ARIVUVITHAI           │
                 │     React 19 + Vite Frontend   │
                 └───────────────┬────────────────┘
                                 │
                                 │ HTTPS / REST APIs
                                 ▼
                 ┌────────────────────────────────┐
                 │         Node + Express         │
                 │     Backend API (JWT Auth)     │
                 └───────────────┬────────────────┘
                                 │
                                 │ Mongoose ODM
                                 ▼
                 ┌────────────────────────────────┐
                 │            MongoDB             │
                 │   70 Multi-Language Lessons    │
                 │   User & Progress Collections  │
                 └────────────────────────────────┘
```

---

## 🚀 Tech Stack

* **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Axios
* **Backend**: Node.js, Express.js (v5), MongoDB + Mongoose (v9), JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS
* **Database**: MongoDB (70 structured lesson documents across 5 languages)
* **Supported Languages**: **Java**, **Python**, **JavaScript**, **C++**, **C** (14 lessons each = 70 total)

---

## 🌟 Key Features

1. **Authentication & Session Management**:
   * Email and Phone login/registration options with strong bcrypt password hashing.
   * Stateless JWT authentication with automatic Bearer token interceptor and session restoration.
2. **Multi-Language Curriculum (70 Lessons)**:
   * 14 comprehensive lessons each for Java, Python, JavaScript, C++, and C.
   * Every lesson includes: Title, Description, Concept Overview, Code Example, Step-by-Step Breakdown, Real-Life Analogy, Difficulty, Estimated Time, and Prerequisites.
3. **MongoDB-Driven Progress Tracking**:
   * Progress calculated dynamically on the server: `(completedCount / totalLessons) * 100`.
   * Complete progress isolation per user and per language with unique compound indexing.
   * Idempotent completion prevents artificial score inflation.
4. **Interactive Dashboard & Continue Learning**:
   * Live visual progress ring/bar, completed lesson counter (`X / 14`), and human-friendly current topic resolver.
   * "Continue Learning" button immediately resumes the user's active lesson in Learning Mode.
5. **Rule-Based Code Explainer**:
   * Deterministic pattern & keyword analyzer detecting primitives, loops, conditionals, OOP constructs (encapsulation, inheritance), arrays, and exceptions.
   * Provides step explanations, keyword tags, and real-life analogies without executing code.

---

## 📁 Project Structure

```
Arivuvithai/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication & route protection
│   ├── models/
│   │   ├── Lesson.js             # Lesson Mongoose schema with compound unique index
│   │   ├── Progress.js           # Progress schema ({ userId, language } compound index)
│   │   └── User.js               # User schema with pre-save bcrypt hashing
│   ├── routes/
│   │   ├── auth.js               # Registration & Login endpoints
│   │   ├── lesson.js             # Lesson retrieval & Code Explainer endpoints
│   │   ├── progress.js           # Progress retrieval & completion endpoints
│   │   └── users.js              # Profile & language preferences endpoints
│   ├── seed.js                   # Idempotent 70-lesson multi-language database seeder
│   ├── server.js                 # Express server & CORS configuration
│   ├── .env.example              # Backend environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Configured Axios client with JWT interceptor
│   │   ├── components/
│   │   │   ├── CelebrationModal.js
│   │   │   ├── CodeExplainer.jsx # Interactive code breakdown tool
│   │   │   ├── HomePage.jsx      # Dashboard with live progress & Continue Learning
│   │   │   ├── LanguageSelection.jsx # Language picker (Java, Python, JS, C++, C)
│   │   │   ├── LearningMode.jsx  # Reusable lesson detail & navigation experience
│   │   │   └── LoginPage.jsx     # Classical aesthetic authentication interface
│   │   ├── App.jsx               # App coordinator & session restoration
│   │   └── main.jsx
│   ├── vite.config.js            # Vite configuration with /api proxy
│   ├── .env.example              # Frontend environment template
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Configuration

### Backend (`backend/.env`)
Create `backend/.env` based on `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/arivuvithai
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
Create `frontend/.env` based on `frontend/.env.example`:

```env
# In development, leave blank to use the Vite proxy (/api)
# In production, set to your backend API URL (e.g. https://api.yourdomain.com/api)
VITE_API_URL=
```

---

## 🛠️ Local Installation & Setup

### 1. Prerequisites
* **Node.js**: v18+ (tested on Node.js v24)
* **MongoDB**: Local MongoDB instance running on `mongodb://localhost:27017` or MongoDB Atlas URI

### 2. Backend Setup
```bash
cd backend
npm install
npm run seed     # Seeds all 70 lessons into MongoDB (Idempotent)
npm start        # Starts server on port 5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts Vite development server on http://localhost:5173
```

---

## 🚢 Production Build & Deployment Guide

### 1. Production Build
```bash
# In frontend directory:
npm run build
```
The optimized client bundle will be generated in `frontend/dist/`.

### 2. Deployment Architecture

#### Option A: Full-Stack on Render / Railway / Heroku
1. Deploy `backend` as a Web Service:
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Environment Variables**: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT`
2. Deploy `frontend` as a Static Site (Vercel / Netlify / Cloudflare Pages):
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist`
   * **Environment Variable**: `VITE_API_URL=https://your-backend.onrender.com/api`

#### Option B: Unified Node.js Server
* Serve `frontend/dist` statically from `backend/server.js` using `express.static()`.

---

## 🛡️ Security & Integrity

* **Zero Leaks**: All passwords hashed using `bcryptjs` with salt; passwords omitted in all API responses.
* **JWT Protected**: All user-specific and lesson content APIs require standard `Bearer <token>` headers.
* **Safe Explainer**: Pure rule-based AST regex parsing — user-submitted code is **never** compiled or executed on the server.
* **Database Isolation**: Compound indexes enforce uniqueness per `{ language, topicId }` and `{ userId, language }`.

---

## 📄 License
MIT License © 2026 ARIVUVITHAI Team.
