from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

# 📡 Debug – הדפסת כתובת ההתחברות למסד הנתונים
print("📡 DATABASE_URL =", settings.SQLALCHEMY_DATABASE_URI)

# ⚙️ יצירת מנוע אסינכרוני
engine = create_async_engine(
    str(settings.SQLALCHEMY_DATABASE_URI),
    echo=False,
    future=True,
    pool_pre_ping=True,
)

# 🧵 יצירת מפעל לסשנים אסינכרוניים
async_session_factory = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# 📐 בסיס למודלים ORM
class Base(DeclarativeBase):
    """Base class for all database models"""
    pass

# 📦 תלות שניתן להזריק לכל route
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency for getting async database sessions.
    Usage:
        @app.get("/")
        async def route(db: AsyncSession = Depends(get_db)):
            ...
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

# 🧪 פונקציית בדיקה לחיבור למסד הנתונים (מומלץ להריץ ב־startup)
def init_db():
    """Verify database connection"""
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        print("✅ Database connected successfully.")
    except Exception as e:
        print(f"❌ Failed to connect to database: {e}")

# 🧬 טען את המודלים שלך כאן כדי ש-Alembic יזהה אותם
from app.models.user import User  # ⬅️ תוסיף גם אחרים כמו Course, Assignment...
