from typing import List, Callable
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import PostgresDsn, validator
from functools import lru_cache
from pathlib import Path
from datetime import datetime

# נתיב לתיקיית backend
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    """⚙️ Global application settings for Uniway"""
    ALGORITHM: str = "HS256"

    # 📦 פרטי מערכת
    PROJECT_NAME: str = "Uniway"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Academic SaaS assistant for students"
    API_V1_STR: str = "/api/v1"

    # 🔐 אבטחה
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    FERNET_SECRET_KEY: str | None = None  # להצפנה עתידית של מידע

    # 🕒 Utility for JWT and timestamps
    @property
    def NOW(self) -> Callable[[], datetime]:
        """Returns current UTC time — used for token expiration"""
        return datetime.utcnow

    # 🌍 סביבה
    ENVIRONMENT: str = "development"

    # 🔄 CORS
    FRONTEND_URL: str | None = None  # לשימוש פנימי או להפניות
    ALLOWED_ORIGINS_RAW: str | None = None  # מחרוזת מופרדת בפסיקים
    
    @property
    def allowed_origins(self) -> List[str]:
        """Get list of allowed origins based on environment"""
        if self.ENVIRONMENT == "production":
            return ["https://uniway.site"]
        return ["http://localhost:5173", "http://localhost:3000"]

    # 🗄️ מסד נתונים
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: PostgresDsn | None = None
    DATABASE_URL: str | None = None  # לשימוש פנימי או תיעוד

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict) -> str:
        """בונה את URI למסד הנתונים אם לא סופק ישירות"""
        if isinstance(v, str):
            return v

        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            username=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"{values.get('POSTGRES_DB') or ''}"
        )

    # 📚 אינטגרציה עם Moodle
    MOODLE_BASE_URL: str
    MOODLE_USERNAME: str
    MOODLE_PASSWORD: str
    MOODLE_URL: str | None = None  # לשימוש עתידי

    # 🧭 נתיב לדפדפן כרום
    CHROME_PATH: str | None = None

    # ⚙️ הגדרות כלליות לטעינת הסביבה
    model_config = SettingsConfigDict(
        env_file=str(BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True
    )


# טוען את ההגדרות פעם אחת בזיכרון (מומלץ)
settings = Settings()

@lru_cache()
def get_settings() -> Settings:
    return settings
