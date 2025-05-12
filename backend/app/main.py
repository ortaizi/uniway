from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.auth.router import router as auth_router
from app.api.v1.assignments.router import router as assignments_router
from app.core.health import HealthCheck

app = FastAPI(
    title="Uniway Backend",
    version="1.0.0",
    description="Smart Academic Assistant API for students"
)

# 🛡️ CORS – הרשאות לגשת ל־API מהפרונטאנד
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📥 רישום ה־routers לפי גרסה ותחום
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(assignments_router, prefix="/api/v1/assignments", tags=["Assignments"])

# 🩺 בדיקת בריאות – מצוין ל־Docker Healthcheck
@app.get("/health", tags=["Health"])
async def health_check(response: Response):
    """
    בדיקת בריאות מקיפה של המערכת:
    - חיבור לבסיס הנתונים
    - הגדרות סביבה
    - משאבי מערכת
    """
    health_status = await HealthCheck.get_health_status()
    
    # אם המערכת לא בריאה, מחזירים קוד שגיאה
    if health_status["status"] == "unhealthy":
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    
    return health_status

@app.get("/ping", tags=["Health"])
def ping():
    """בדיקת זמינות בסיסית"""
    return {"status": "ok"}

@app.get("/")
def root():
    return {"status": "Uniway API is live"}
