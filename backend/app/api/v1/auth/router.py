from fastapi import APIRouter, HTTPException
from app.api.v1.auth.schema import LoginRequest, LoginResponse
from app.api.v1.auth.service import login_user

router = APIRouter()

@router.post("/login", response_model=LoginResponse, summary="Login to Moodle")
def login(data: LoginRequest):
    """
    מתחבר למערכת Moodle דרך Selenium ובודק את הנתונים.
    מחזיר תשובת הצלחה או שגיאה לפי התחברות אמיתית.
    """
    status, message = login_user(data.username, data.password)

    if status == "success":
        return {"status": status, "message": message}

    raise HTTPException(status_code=401, detail=message)
