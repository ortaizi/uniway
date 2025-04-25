from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from auth.service import login_to_moodle
from auth.schema import LoginRequest, LoginResponse

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
async def login(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    status, error = login_to_moodle(username, password)

    if status == "success":
        return {"status": "success", "message": "Login successful", "error": None}
    elif error == "Invalid credentials":
        return JSONResponse(status_code=401, content={
            "status": "error", "message": "Invalid credentials", "error": None
        })
    else:
        return JSONResponse(status_code=500, content={
            "status": "error", "message": "Error during login", "error": error
        })
