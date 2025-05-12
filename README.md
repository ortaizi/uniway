# 📚 Uniway – Smart Academic Assistant

ברוך הבא ל-Uniway!  
פלטפורמה חכמה לניהול לימודים שמרכזת את כל חוויית האקדמיה של סטודנטים במקום אחד.

---

## 📦 מבנה הפרויקט

- `frontend/` ➔ אפליקציית React
- `backend/` ➔ שרת FastAPI + Scrapers
- `backend/rasa/` ➔ צ'אטבוט Rasa
- `.vscode/` ➔ הגדרות פיתוח אוטומטיות
- `Makefile*` ➔ קבצים אוטומטיים לניהול פרויקט

---

## 🚀 פקודות עבודה מהירות

### 🔵 פיתוח (Development)

| פעולה | פקודה |
|:------|:------|
| להפעיל Frontend | `make frontend` |
| להפעיל Backend (עם רענון אוטומטי) | `make backend` |
| להפעיל צ׳אטבוט | `make rasa` |
| להפעיל Action Server | `make actions` |
| להריץ בדיקות | `make test` |

---

### 🛡️ פרודקשן (Production)

| פעולה | פקודה |
|:------|:------|
| לבנות Frontend | `make frontend ENV=production` |
| להפעיל Backend יציב | `make backend ENV=production` |
| להפעיל Rasa | `make rasa ENV=production` |
| להפעיל Action Server | `make actions ENV=production` |

---

### 📤 דיפלוי (Deploy)

| פעולה | פקודה |
|:------|:------|
| שליחת קבצים לשרת | `make deploy` |
| התחברות לשרת | `make ssh` |
| ריסטארט לשרת | `make restart-backend` |
| ריסטארט Nginx | `make restart-nginx` |

---

### 🧹 ניקוי (Clean)

| פעולה | פקודה |
|:------|:------|
| מחיקת pycache | `make -f Makefile.clean clean-pycache` |
| מחיקת node_modules | `make -f Makefile.clean clean-node_modules` |
| ניקוי כללי | `make -f Makefile.clean clean-all` |

---

### 💾 גיבויים (Backup)

| פעולה | פקודה |
|:------|:------|
| גיבוי דאטהבייס | `make -f Makefile.backup backup-db` |
| גיבוי קוד | `make -f Makefile.backup backup-code` |
| גיבוי מלא | `make -f Makefile.backup backup-all` |

---

### 🔒 אבטחה (Security)

| פעולה | פקודה |
|:------|:------|
| סריקת קוד לאבטחה | `make -f Makefile.security security-scan` |
| בדיקת תלותים לבעיות | `make -f Makefile.security safety-check` |

---

### 📚 דוקומנטציה (Docs)

| פעולה | פקודה |
|:------|:------|
| יצירת דוקומנטציה אוטומטית | `make -f Makefile.docs generate-docs` |
| פתיחת הדוקומנטציה | `make -f Makefile.docs open-docs` |

---

### 🔖 ניהול גרסאות (Release)

| פעולה | פקודה |
|:------|:------|
| עדכון גרסה | `make -f Makefile.release bump-version` |
| תיוג גרסה בגיט | `make -f Makefile.release tag-version` |

---

### 🧪 בדיקות (Tests)

| פעולה | פקודה |
|:------|:------|
| להריץ בדיקות יוניט | `make -f Makefile.test unit-test` |
| להריץ בדיקות אינטגרציה | `make -f Makefile.test integration-test` |
| להריץ בדיקות E2E | `make -f Makefile.test e2e-test` |
| להריץ את הכל | `make -f Makefile.test test-all` |

---

### 🤖 אוטומציה (CI/CD)

| פעולה | פקודה |
|:------|:------|
| הרצת כל הבדיקות ל־CI | `make -f Makefile.ci ci-all` |

---

## 📋 דרישות מוקדמות (Prerequisites)

- Python 3.9
- Node.js + npm
- PostgreSQL (בהמשך לפרודקשן)
- Docker (אופציונלי)

---

> 🏆 פרויקט Uniway בנוי לפי סטנדרטים מקצועיים:
> פיתוח מודולרי • דיפלוי אוטומטי • בדיקות אוטומטיות • גיבויים חכמים • ניטור ואבטחה.

