# 📦 Makefile ל־Uniway Backend – גרסה מקצועית

# 🧱 משתנים כלליים
VENV = venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip
ENV_FILE = .env

# 📦 התקנת חבילות
install:
	$(PIP) install -r requirements.txt

# 🚀 הרצת השרת (מקומי)
run:
	$(PYTHON) core/main.py

# 🧪 הרצת כל הבדיקות
 test:
	PYTHONPATH=./ $(VENV)/bin/pytest -v tests/

# 🧪 הרצת בדיקה ספציפית (למשל התחברות)
test-login:
	PYTHONPATH=./ $(VENV)/bin/pytest -v tests/auth/test_login.py -k "test_login_success"

# 📄 הקפאת תלויות
freeze:
	$(PIP) freeze > requirements.txt

# ♻️ מחיקת קאש וקבצים זמניים
clean:
	rm -rf __pycache__ */__pycache__ .pytest_cache

# 🧪 קיצור דרך לבדיקה של moodle scraper
test-scraper:
	PYTHONPATH=./ $(VENV)/bin/pytest -v tests/scraper/test_moodle_scraper.py

# ⚙️ הרצת בדיקות עם coverage (דורש התקנת coverage)
coverage:
	PYTHONPATH=./ $(VENV)/bin/coverage run -m pytest
	$(VENV)/bin/coverage report -m
