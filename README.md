# Candor 🕯️
### *Your private space to feel.*

> "Write what you can't say to anyone."

Candor is a full-stack AI journaling app where users write freely and an AI companion reads their entry — reflecting back their emotional state, gently reframing their situation, and offering one small human action to move forward.

**Live demo:** https://candor-rho.vercel.app

---

## What problem does it solve?

Most people have feelings they can't say out loud — not because they don't want to, but because they fear judgment or don't want to burden others. Candor sits beside you like a quiet friend. You write what you feel, and Candor listens — without judgment, without advice, without telling a soul.

---

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + Vite | Fast, modern, component-based |
| Styling | Tailwind CSS | Utility-first, rapid UI development |
| Routing | React Router v6 | Client-side navigation |
| Backend | Node.js + Express | RESTful API, lightweight, fast |
| Database | MongoDB + Mongoose | Document-based, fits journal entry structure |
| Auth | JWT + bcryptjs | Stateless authentication, secure password hashing |
| AI | Groq API (LLaMA 3.1) | Free, fast, emotionally intelligent responses |
| Deployment | Render + Vercel | Free tier, industry standard |

---

## Features

- 🔐 **JWT Authentication** — secure signup and login
- 📝 **Journal entries** — write freely, no prompts
- 🤖 **AI reflection** — Groq's LLaMA 3.1 reads your entry and reflects back your emotional state
- 🎭 **44 mood categories** — nuanced emotion detection
- 📊 **Mood scoring** — 1-10 score tracks emotional patterns over time
- 🗑️ **Entry management** — view, read, delete entries
- 🌓 **Theme switcher** — dark and light mode
- 📱 **Mobile responsive** — works on all screen sizes

---

## AI integration

When a user submits a journal entry:

1. Entry text is sent to Express backend
2. Backend builds a structured prompt with the entry text and allowed mood values
3. Groq API (LLaMA 3.1 8B) analyzes the emotional content
4. AI returns a JSON response with mood, score, and a flowing reflection
5. Result is saved to MongoDB — subsequent views are instant database reads
6. User sees their reflection in the Cormorant Garamond font

The AI prompt is engineered to make the response feel like a wise, warm friend — not a therapist, not a productivity coach.

---

## Running locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- Groq API key (free at console.groq.com)

### Backend
```bash
cd server
npm install
# Create .env with MONGO_URI, JWT_SECRET, GROQ_API_KEY, PORT
npm run dev
```

### Frontend
```bash
cd client
npm install
# Create .env.local with VITE_API_URL=http://localhost:5000/api
npm run dev
```

---

## Project structure