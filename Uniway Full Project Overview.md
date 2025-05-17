
# 🧠 Uniway – Smart Academic Assistant Platform

**Uniway** is a full-stack SaaS platform designed to simplify and centralize the fragmented academic experience for university students.  
It integrates Moodle, portals, schedules, emails, assignments, and intelligent assistants — all into one modern, smart interface.

---

## 🎯 Mission

To empower students by giving them one clean, intelligent, and easy-to-use hub for everything related to their academic life.

---

## 🧱 System Architecture

### 📦 Backend – FastAPI + PostgreSQL
- **Language:** Python 3.11
- **Framework:** FastAPI
- **Database:** PostgreSQL (Docker for local / AWS RDS for prod)
- **ORM:** SQLAlchemy 2.0
- **Migrations:** Alembic
- **Sessions:** Python Requests Session with cookies for Moodle login
- **Encryption:** Fernet for storing credentials (if “remember me” is selected)
- **Folder Structure:**
    - `app/` with `api/v1/`, `core/`, `models/`, `services/`
    - `scraper/` for Moodle scraping logic
    - `infra/` for Docker, Nginx, Gunicorn
    - `tests/` with pytest-based unit/integration tests
- **Dev Tools:** Makefile, `.env` + `.env.production`

### 🌐 Frontend – React + Vite
- **Framework:** React with Vite
- **Styling:** TailwindCSS + global.css
- **Layout:** RTL, Hebrew language
- **Pages:** `/work/` with subpages like home, assignments, grades, chat, etc.
- **State:** Uses `sessionStorage` and `localStorage` for login/session
- **Deployment:** Hosted on Netlify with preview site from `dev` branch

### 🧠 Chatbot – Rasa (Legacy)
- **Language:** Hebrew
- **Framework:** Rasa 3.5.10
- **Purpose:** File search and retrieval from Moodle
- **Custom actions:** Python scraping logic for Moodle
- Being replaced with AI-native flows and API endpoints

---

## 🐳 Deployment Infrastructure

- **Docker Compose** for local development
- **Gunicorn + Nginx + HTTPS (Let’s Encrypt)** on EC2
- **Domains:**
    - Frontend: `https://uniway.site`
    - Backend: `https://api.uniway.site`

---

## 🧩 Features

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| Moodle scraping        | Login, navigate to course pages, find open assignments                     |
| Encrypted credentials  | Uses Fernet to store login data securely if "remember me" is checked       |
| Assignments Dashboard  | View scraped assignments by course, due date, and submission status        |
| User To-Do List        | Add and manage personal study tasks (localStorage for now)                 |
| Hebrew Chatbot         | Rasa-based chatbot with Hebrew intents (get_files, greet, etc.)            |
| Healthcheck            | `/healthcheck` route shows CPU, memory, DB status                         |
| Dev tooling            | Makefile commands (`make test`, `make db-up`, etc.)                        |

---

## 🔄 Workflow & Best Practices

- **Dev/Prod separation** via `.env`
- **CI/CD planned** using GitHub Actions
- **Project board** managed via GitHub Projects (Status, Priority, Sprint, Feature Area)
- **Feature-first dev**: Each feature starts with Notion planning → GitHub Issue → PR

---

## 📚 Stack Summary

| Layer       | Tool/Tech                        |
|-------------|----------------------------------|
| Frontend    | React, Vite, TailwindCSS         |
| Backend     | FastAPI, Python 3.11, SQLAlchemy |
| Database    | PostgreSQL, Alembic              |
| Infra       | Docker, Nginx, Gunicorn, EC2     |
| DevTools    | Makefile, GitHub Actions         |
| Scraping    | Selenium, Requests Session       |
| Chatbot     | Rasa (legacy)                    |

---

## 🧠 Roles Covered (Solo)

- 👨‍💻 Full-Stack Engineer
- 🧠 Product Designer
- 🎨 UI/UX Designer
- 📦 DevOps Engineer
- 🔐 Security / Infra
- 📋 QA / Tester
- 🧭 CTO-level Planner (via Notion & GitHub Projects)

---

## 🧠 Status & Vision

Uniway is already deployed and functional, with:
- Live login
- Moodle scraping
- Secure sessions
- React dashboard
- Initial assignments + ToDo systems

Next steps:
- Expand Gmail/calendar integration
- Replace Rasa with native AI assistant
- Scale to hundreds of students

Built to be the brain of the modern university student 🚀
