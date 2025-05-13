# ===================================
# 🚀 Uniway – Professional Makefile
# ===================================

# 📦 Variables
VENV = backend/venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip
UVICORN = $(VENV)/bin/uvicorn
PYTEST = $(VENV)/bin/pytest
BLACK = $(VENV)/bin/black
ISORT = $(VENV)/bin/isort
MYPY = $(VENV)/bin/mypy

# 🎯 Targets
.PHONY: help install clean test lint format check-db migrate up down logs ps restart db-backup db-reset check-db prune backend frontend test-backend test-frontend tree 


# 📚 Help
help:
	@echo "🚀 Uniway Development Commands"
	@echo ""
	@echo "📦 Installation:"
	@echo "  make install          Install all dependencies"
	@echo "  make install-dev      Install development dependencies"
	@echo ""
	@echo "🔄 Development:"
	@echo "  make dev             Start all services (backend + frontend + DB)"
	@echo "  make backend         Start backend server"
	@echo "  make frontend        Start frontend server"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  make test            Run all tests"
	@echo "  make test-backend    Run backend tests"
	@echo "  make test-frontend   Run frontend tests"
	@echo ""
	@echo "📝 Code Quality:"
	@echo "  make lint            Run all linters"
	@echo "  make format          Format all code"
	@echo "  make type-check      Run type checking"
	@echo ""
	@echo "🐳 Docker:"
	@echo "  make up              Start all containers"
	@echo "  make down            Stop all containers"
	@echo "  make logs            View container logs"
	@echo "  make ps              List containers"
	@echo "  make prune           Clean up unused Docker resources"
	@echo ""
	@echo "🗄️ Database:"
	@echo "  make db-up           Start database"
	@echo "  make db-down         Stop database"
	@echo "  make db-migrate      Run database migrations"
	@echo "  make db-reset        Reset database (⚠️ destructive)"
	@echo "  make db-backup       Create database backup"
	@echo "  make check-db        Check database connection"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  make clean           Clean temporary files"
	@echo "  make clean-all       Clean all generated files"
	@echo "  make restart         Restart all services"

# 📦 Installation
install:
	@echo "📦 Installing dependencies..."
	python3 -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install -r backend/requirements/base.txt
	$(PIP) install -r backend/requirements/dev.txt
	cd frontend && npm install

install-dev: install
	@echo "📦 Installing development dependencies..."
	$(PIP) install -r backend/requirements/test.txt
	cd frontend && npm install --save-dev

# 🔄 Development
dev:
	@echo "🚀 Starting development environment..."
	docker compose up -d db
	concurrently "make backend" "make frontend"

backend:
	@echo "🚀 Starting backend server..."
	cd backend && $(UVICORN) app.main:app --reload --env-file ../.env

frontend:
	@echo "🚀 Starting frontend server..."
	cd frontend && npm run dev

# 🧪 Testing
test:
	@echo "🧪 Running all tests..."
	$(MAKE) test-backend
	$(MAKE) test-frontend

test-backend:
	@echo "🧪 Running backend tests..."
	$(PYTEST) backend/tests -v --cov=app

test-frontend:
	@echo "🧪 Running frontend tests..."
	cd frontend && npm test

# 📝 Code Quality
lint:
	@echo "🔍 Running linters..."
	$(BLACK) --check backend/
	$(ISORT) --check-only backend/
	$(MYPY) backend/
	cd frontend && npm run lint

format:
	@echo "✨ Formatting code..."
	$(BLACK) backend/
	$(ISORT) backend/
	cd frontend && npm run format

type-check:
	@echo "🔍 Running type checks..."
	$(MYPY) backend/
	cd frontend && npm run type-check

# 🐳 Docker
up:
	@echo "🚀 Starting all containers..."
	docker compose up -d

down:
	@echo "🛑 Stopping all containers..."
	docker compose down

logs:
	@echo "📋 Showing container logs..."
	docker compose logs -f

ps:
	@echo "📋 Listing containers..."
	docker compose ps

# 🗄️ Database
db-up:
	@echo "🚀 Starting database..."
	docker compose up -d db

db-down:
	@echo "🛑 Stopping database..."
	docker compose stop db

db-migrate:
	@echo "🔄 Running database migrations..."
	cd backend && $(PYTHON) -m alembic upgrade head

db-reset:
	@make db-backup
	@read -p "⚠️ Are you sure you want to RESET the database? This will ERASE ALL DATA. (y/n): " ans; \
	if [ "$$ans" = "y" ]; then \
		echo "🧨 Resetting DB..."; \
		cd backend && $(PYTHON) -m alembic downgrade base && $(PYTHON) -m alembic upgrade head; \
		echo "✅ Database has been reset."; \
	else \
		echo "❌ Cancelled."; \
	fi


db-backup:
	@echo "💾 Creating DB backup..."
	docker exec uniway-db pg_dump -U postgres uniway > backup-`date +%Y-%m-%d_%H-%M`.sql
	@echo "✅ Backup saved to backup-<timestamp>.sql"


check-db:
	@echo "🔎 Checking DB connection..."
	docker exec uniway-db pg_isready -U postgres

# 🧹 Maintenance
clean:
	@echo "🧹 Cleaning temporary files..."
	find . -type d -name "__pycache__" -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type f -name ".coverage" -delete
	find . -type d -name "*.egg-info" -exec rm -r {} +
	find . -type d -name "*.egg" -exec rm -r {} +
	find . -type d -name ".pytest_cache" -exec rm -r {} +
	find . -type d -name "htmlcov" -exec rm -r {} +
	find . -type d -name ".mypy_cache" -exec rm -r {} +
	find . -type d -name ".ruff_cache" -exec rm -r {} +

clean-all: clean
	@echo "🧹 Cleaning all generated files..."
	rm -rf backend/venv
	rm -rf frontend/node_modules
	rm -rf frontend/dist
	rm -rf .vite
	docker compose down -v

prune:
	@echo "🧹 Cleaning up Docker volumes and networks..."
	docker system prune -f

restart: down up
	@echo "🔄 Restarted all services"

# Makefile to generate project structure

STRUCTURE_DEPTH=4
STRUCTURE_FILE=project-structure.txt
IGNORE_DIRS=node_modules|__pycache__|.git|venv|env|*.pyc|*.log

tree:
	@echo "Generating project structure up to depth $(STRUCTURE_DEPTH)..."
	@tree -L $(STRUCTURE_DEPTH) -I "$(IGNORE_DIRS)" > $(STRUCTURE_FILE)
	@echo "Saved to $(STRUCTURE_FILE)"
