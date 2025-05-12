# 🧠 Uniway – Project Context for AI Assistant

## 🎯 Overview
Uniway is a full-stack smart assistant platform for university students.
The platform integrates Moodle, assignments, events, and scraping-based automation into one clean UI.

## 🧱 Architecture

- **Backend:** FastAPI + PostgreSQL + SQLAlchemy + Alembic
- **Frontend:** React (Vite) + Tailwind CSS, RTL layout (Hebrew)
- **Scraping:** Selenium + Headless Chrome
- **Deployment:** Docker, EC2 (backend), Netlify (frontend)

## 📂 Folder Structure (key parts)
- `backend/`
  - `app/core/config.py` – Loads env via pydantic-settings
  - `app/core/database.py` – `engine`, `SessionLocal`, `Base`, `get_db()`
  - `app/api/v1/` – Routers for login, assignments, healthcheck, etc.
  - `app/models/` – SQLAlchemy models like `User`, `Assignment`
  - `alembic/` – Auto-generated migrations
  - `.env` – Includes `DATABASE_URL`, `CHROME_PATH`, `SECRET_KEY`
- `frontend/`
  - `src/pages/` – `login.jsx`, `home.jsx`, `work.jsx`
  - `global.css` – shared Tailwind config
  - `vite.config.js` – build and env setup

## 🧪 Features Implemented
- Login to Moodle using session-based scraping
- Passwords encrypted using Fernet and stored in DB
- Healthcheck route that validates:
  - DB connectivity
  - ENV correctness
  - System resources (`psutil`)
- Component-based React dashboard with RTL Hebrew

## 🚧 In Progress / Upcoming
- Gmail integration
- Grades tracking
- Event calendar sync
- Docker + production-grade CI/CD

## 🧠 When working with me:
Please treat this as a professional SaaS platform.
Help me:
- Refactor cleanly (separation of concerns)
- Validate DB models and migration flow
- Write secure, production-ready backend logic
- Maintain clean and modern UI for RTL

