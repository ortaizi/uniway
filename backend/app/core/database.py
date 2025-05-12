from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings


# יצירת מנוע חיבור לבסיס הנתונים
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

# Session מקומית לכל בקשה
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# בסיס למחלקות ORM
Base = declarative_base()


# ✅ פונקציה שמחזירה חיבור DB זמני (ל־Depends)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ פונקציה שמאמתת שה־DB אכן נגיש (לשימוש באירועי startup)
def init_db():
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        print("✅ Database connected successfully.")
    except Exception as e:
        print(f"❌ Failed to connect to database: {e}")

from app.models.user import User  # ← רשום את כל המודלים שיש לך
