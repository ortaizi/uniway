# 📄 Makefile for Uniway Project
# ===================================

# 🛠️ Variables
# 🛠️ Variables
FRONTEND_DIR=../frontend
BACKEND_DIR=.
RASA_DIR=$(BACKEND_DIR)/rasa
VENV_DIR=$(BACKEND_DIR)/venv


# ===================================

# 🖥️ Frontend Development
frontend:
	cd $(FRONTEND_DIR) && npm run dev

# 🛠️ Backend Development
backend:
	cd $(BACKEND_DIR) && source $(VENV_DIR)/bin/activate && uvicorn core.main:app --reload

# 🤖 Start Rasa Server
rasa:
	cd $(RASA_DIR) && source ../venv/bin/activate && rasa run

# 🧠 Start Rasa Actions Server
actions:
	cd $(RASA_DIR) && source ../venv/bin/activate && rasa run actions

# 🚀 Start All Servers Together (with tmux)
all:
	tmux kill-session -t uniway-dev 2>/dev/null || true
	tmux new-session -d -s uniway-dev
	tmux send-keys -t uniway-dev "cd $(FRONTEND_DIR) && npm run dev" C-m
	tmux split-window -h -t uniway-dev
	tmux send-keys -t uniway-dev "cd $(BACKEND_DIR) && source $(VENV_DIR)/bin/activate && uvicorn core.main:app --reload" C-m
	tmux split-window -v -t uniway-dev:0.1
	tmux send-keys -t uniway-dev "cd $(RASA_DIR) && source ../venv/bin/activate && rasa run" C-m
	tmux split-window -v -t uniway-dev:0.2
	tmux send-keys -t uniway-dev "cd $(RASA_DIR) && source ../venv/bin/activate && rasa run actions" C-m
	tmux select-layout -t uniway-dev tiled
	tmux attach-session -t uniway-dev

# 🧪 Run Backend Tests
test:
	cd $(BACKEND_DIR) && source $(VENV_DIR)/bin/activate && pytest tests/

# 📦 Freeze Requirements to requirements.txt
freeze:
	cd $(BACKEND_DIR) && source $(VENV_DIR)/bin/activate && pip freeze > requirements.txt

# 🏗️ Create Database and Tables
create-db:
	cd $(BACKEND_DIR) && source $(VENV_DIR)/bin/activate && python -c "from core.database import create_db_and_tables; create_db_and_tables()"

# 🧹 Clean Temporary Files
clean:
	find . -type d -name "__pycache__" -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
	echo "✅ Cleaned __pycache__ and .pyc files."

# 🔥 Kill tmux Session
kill:
	tmux kill-session -t uniway-dev 2>/dev/null || true
	echo "✅ Tmux session 'uniway-dev' killed."

# 🧹 Clean Database (Optional Future Command)
# clean-db:
#	cd $(BACKEND_DIR) && source $(VENV_DIR)/bin/activate && alembic downgrade base

# ===================================

# 🧠 Notes:
# make frontend      # Start frontend (Vite server)
# make backend       # Start backend (FastAPI server)
# make rasa          # Start Rasa chatbot server
# make actions       # Start Rasa actions server
# make all           # Start all services in tmux
# make test          # Run backend tests (pytest)
# make freeze        # Update requirements.txt
# make create-db     # Create tables in the database
# make clean         # Clean pycache and temporary files
# make kill          # Kill all servers
# ===================================
