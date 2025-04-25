# 📚 Uniway – Smart Academic Assistant (Backend)

ברוכים הבאים ל־**Uniway** – מערכת חכמה לניהול החיים האקדמיים של סטודנטים. 
הפרויקט הזה כולל את צד ה־Backend: חיבור למערכות כמו Moodle, ניהול משתמשים, מטלות, ציונים, ימי מילואים, ועוד.

---

## 🚀 טכנולוגיות
- **FastAPI** – REST API מודרני וקל
- **Selenium** – Web Scraping ל־Moodle ואתרים נוספים
- **SQLModel** – ORM יעיל ל־SQLite ו־PostgreSQL
- **Docker (optional)** – להרצה בפרודקשן
- **AWS EC2 + RDS** – פריסה בענן

---

## 🛠 מבנה תיקיות עיקרי
```bash
backend/
├── core/           # קונפיג, DB, main app
├── auth/           # התחברות (Login)
├── assignments/    # מטלות
├── scraper/        # סקרייפר למודל ועוד
├── tests/          # בדיקות (Pytest)
├── .env            # סביבת פיתוח
├── .env.production # סביבת Production
├── requirements.txt
└── Makefile        # פקודות עזר
```

---

## ⚙️ התקנה והרצה מקומית (Development)
```bash
# 1. צור סביבה וירטואלית
python -m venv venv
source venv/bin/activate

# 2. התקנת ספריות
pip install -r requirements.txt

# 3. הגדר קובץ .env
cp .env.example .env  # צור עותק

# 4. הרצה
make run
```

---

## 🔐 קובץ .env לדוגמה (פיתוח)
```dotenv
ENV=dev
FRONTEND_URL=http://localhost:5173
MOODLE_URL=https://moodle.bgu.ac.il/moodle/login/index.php
CHROME_PATH=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
```


## 🌐 קובץ .env.production לדוגמה (פרודקשן)
```dotenv
ENVIRONMENT=production
FRONTEND_URL=https://uniway.site
MOODLE_URL=https://moodle.bgu.ac.il/moodle/login/index.php
CHROME_PATH=/usr/bin/google-chrome-stable
PROD_DB_URL=postgresql://admin:password@rds-url.amazonaws.com:5432/uniway
```


---

## 🧪 בדיקות כמו מקצוען
```bash
# הרצת כל הבדיקות
make test

# בדיקה ספציפית (login)
make test-login
```


---

## 🧠 טיפים למפתחים
- השתמש ב־`.env.production` רק על EC2
- כל פיצ'ר מרכזי (assignments, grades) מקבל תיקייה משלו
- שמור את התחברות ה־Moodle ב־auth/service.py
- סקרייפינג תמיד דרך קובץ נפרד ב־scraper/

---

## 🤝 תרומות / צוות פיתוח
אם אתה רוצה להצטרף לפרויקט או להציע פיצ'רים חדשים – פנה לאור טאיזי דרך [Instagram Uniway](https://www.instagram.com/uniway.il/)

---

## 🧠 קרדיט והשראה
ממשק דומה ל־Notion, ChatGPT Dashboard. מבוסס על סטנדרטים של חברות הייטק אמיתיות ✨
