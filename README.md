# 🌿 AI Vegetarian Food Detector — PureBite

> **Scan any food label in any language — instantly know what's inside.**

## 🚀 Live Demo

🔗 **[https://ai-vegetarian-app-git-main-navjotkaurg1990-jpgs-projects.vercel.app/](https://ai-vegetarian-app-git-main-navjotkaurg1990-jpgs-projects.vercel.app/)**

---

## 📋 Overview

PureBite is an AI-powered web application that helps vegetarians and vegans identify hidden animal-derived ingredients in food products — even when labels are in a foreign language. Upload a photo of any food label or paste ingredients text, and the AI will instantly classify every ingredient with a clear traffic-light verdict.

## ✨ Core Features

- 📷 **Scan Food Labels** — Upload a photo of any product packaging from anywhere in the world.
- 🌍 **Multi-Language Detection** — AI reads labels in 50+ languages including Finnish, Japanese, Arabic, Hindi, and more.
- 🏷️ **Ingredient Classification** — Every ingredient is tagged: Vegan Safe, Dairy, Egg, Meat/Fish, Insect-derived, or Needs Checking.
- 🚦 **Traffic Light Verdict** — 🟢 Vegan | 🟡 Vegetarian | 🟡 Contains Eggs | 🔴 Non-Vegetarian
- ✍️ **Text Input Mode** — Paste any ingredient list directly if no image is available.
- 🔐 **User Authentication** — Secure login/signup via Firebase Auth.

---

## 🛠️ Technical Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Vite |
| **Styling** | Vanilla CSS (Glassmorphism, Animations) |
| **Authentication** | Firebase Auth (Email/Password) |
| **Database** | Firebase Firestore |
| **Backend API** | FastAPI (Python) |
| **AI Engine** | Claude AI (Anthropic API) |
| **Deployment** | Vercel (Frontend) |
| **Workflow Automation** | n8n |

---

## 📁 Project Structure

```
AI project/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx           # Login/Signup screen
│   │   │   ├── Scanner.jsx        # Image upload & text input
│   │   │   └── ResultsDisplay.jsx # Traffic light verdict display
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Firebase Auth state management
│   │   ├── firebase.js            # Firebase configuration
│   │   ├── App.jsx                # Main application logic
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── .env.example               # Environment variable template
│   └── package.json
├── backend/                 # FastAPI Python backend
│   ├── main.py                    # API endpoints (/api/analyze)
│   └── requirements.txt          # Python dependencies
├── render.yaml              # Render.com deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Firebase project with Auth enabled
- Anthropic API key

### Frontend Setup
```bash
cd frontend
npm install
# Copy .env.example to .env and fill in your Firebase keys
cp .env.example .env
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate        # Windows
pip install -r requirements.txt
set ANTHROPIC_API_KEY=your-key  # Windows
uvicorn main:app --reload
```

---

## 🔗 Links

- **Live App:** [https://ai-vegetarian-app-git-main-navjotkaurg1990-jpgs-projects.vercel.app/](https://ai-vegetarian-app-git-main-navjotkaurg1990-jpgs-projects.vercel.app/)
- **GitHub Repo:** [https://github.com/navjotkaurg1990-jpg/ai-vegetarian-app](https://github.com/navjotkaurg1990-jpg/ai-vegetarian-app)

---

*Built with React · FastAPI · Firebase · Claude AI · Vercel*
