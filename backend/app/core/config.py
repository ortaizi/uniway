from pydantic_settings import BaseSettings
from pathlib import Path
from typing import List, Optional
from dotenv import load_dotenv
import os
import platform
import secrets
from urllib.parse import urlparse

# טוען את הקובץ .env שנמצא בשורש (ולא בתוך backend)
env_path = Path(__file__).resolve().parents[3] / ".env"

if not env_path.exists():
    raise FileNotFoundError(f"❌ .env file not found at {env_path}")

load_dotenv(dotenv_path=env_path)

def get_default_chrome_path() -> str:
    """מחזיר את הנתיב הדיפולטיבי לכרום לפי מערכת ההפעלה"""
    system = platform.system().lower()
    if system == "windows":
        return r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    elif system == "darwin":  # macOS
        return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    else:  # Linux
        return "/usr/bin/google-chrome"

def validate_url(url: str) -> str:
    """בודק שכתובת ה-URL תקינה"""
    try:
        result = urlparse(url)
        if not all([result.scheme, result.netloc]):
            raise ValueError(f"❌ Invalid URL format: {url}")
        return url
    except Exception as e:
        raise ValueError(f"❌ Invalid URL: {url} - {str(e)}")

class Settings(BaseSettings):
    # סביבת ריצה
    ENVIRONMENT: str = "development"
    
    # הגדרות בסיס נתונים
    DATABASE_URL: str
    
    # כתובות URL
    FRONTEND_URL: str
    MOODLE_URL: str
    
    # הגדרות כרום
    CHROME_PATH: str = get_default_chrome_path()
    
    # אבטחה
    SECRET_KEY: str
    ALLOWED_ORIGINS_RAW: str = "http://localhost:5173"
    FERNET_SECRET_KEY: str

    # אופציונלי - הגדרות נוספות
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"
    API_PREFIX: str = "/api/v1"

    @property
    def allowed_origins(self) -> List[str]:
        """מחזיר רשימה של דומיינים מורשים"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS_RAW.split(",")]

    def validate_secret_key(self) -> None:
        """בודק שהמפתח הסודי חזק מספיק"""
        if len(self.SECRET_KEY) < 32:
            raise ValueError("❌ SECRET_KEY must be at least 32 characters long")
        if not any(c.isupper() for c in self.SECRET_KEY):
            raise ValueError("❌ SECRET_KEY must contain at least one uppercase letter")
        if not any(c.islower() for c in self.SECRET_KEY):
            raise ValueError("❌ SECRET_KEY must contain at least one lowercase letter")
        if not any(c.isdigit() for c in self.SECRET_KEY):
            raise ValueError("❌ SECRET_KEY must contain at least one number")

    def validate_urls(self) -> None:
        """בודק שכל כתובות ה-URL תקינות"""
        self.FRONTEND_URL = validate_url(self.FRONTEND_URL)
        self.MOODLE_URL = validate_url(self.MOODLE_URL)

    def validate_chrome_path(self) -> None:
        """בודק שנתיב הכרום קיים"""
        if not Path(self.CHROME_PATH).exists():
            raise FileNotFoundError(f"❌ Chrome executable not found at {self.CHROME_PATH}")

    def validate_database_url(self) -> None:
        """בודק שכתובת ה-DB תקינה"""
        try:
            result = urlparse(self.DATABASE_URL)
            if not all([result.scheme, result.netloc]):
                raise ValueError("❌ Invalid DATABASE_URL format")
            if result.scheme not in ["postgresql", "postgres"]:
                raise ValueError("❌ DATABASE_URL must use postgresql:// or postgres:// scheme")
        except Exception as e:
            raise ValueError(f"❌ Invalid DATABASE_URL: {str(e)}")

    class Config:
        case_sensitive = True
        env_file = str(env_path)
        env_file_encoding = 'utf-8'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.validate_secret_key()
        self.validate_urls()
        self.validate_chrome_path()
        self.validate_database_url()

settings = Settings()
