from typing import Dict, Any
from sqlalchemy import text
from app.core.database import engine
from app.core.config import settings
import psutil
import platform
import time

class HealthCheck:
    @staticmethod
    async def check_database() -> Dict[str, Any]:
        """בודק את חיבור בסיס הנתונים"""
        try:
            start_time = time.time()
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            response_time = time.time() - start_time
            
            return {
                "status": "healthy",
                "response_time": f"{response_time:.3f}s",
                "message": "Database connection successful"
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e),
                "message": "Database connection failed"
            }

    @staticmethod
    def check_environment() -> Dict[str, Any]:
        """בודק את הגדרות הסביבה"""
        try:
            return {
                "status": "healthy",
                "environment": settings.ENVIRONMENT,
                "debug_mode": settings.DEBUG,
                "api_prefix": settings.API_PREFIX,
                "message": "Environment configuration is valid"
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e),
                "message": "Environment configuration check failed"
            }

    @staticmethod
    def check_system() -> Dict[str, Any]:
        """בודק את מצב המערכת"""
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            return {
                "status": "healthy",
                "system_info": {
                    "platform": platform.platform(),
                    "python_version": platform.python_version(),
                    "cpu_usage": f"{cpu_percent}%",
                    "memory_usage": f"{memory.percent}%",
                    "disk_usage": f"{disk.percent}%"
                },
                "message": "System resources are available"
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e),
                "message": "System check failed"
            }

    @classmethod
    async def get_health_status(cls) -> Dict[str, Any]:
        """מחזיר את סטטוס הבריאות הכללי של המערכת"""
        db_status = await cls.check_database()
        env_status = cls.check_environment()
        sys_status = cls.check_system()

        # בדיקה אם כל הקומפוננטות בריאות
        is_healthy = all(
            status["status"] == "healthy"
            for status in [db_status, env_status, sys_status]
        )

        return {
            "status": "healthy" if is_healthy else "unhealthy",
            "timestamp": time.time(),
            "components": {
                "database": db_status,
                "environment": env_status,
                "system": sys_status
            }
        } 