from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.api.v1.auth.schema import LoginRequest, TokenResponse
from app.api.v1.auth.service import (
    login_user_flow,
    get_current_user_from_token
)
from app.models.user import UserResponse

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")


# ============================
# 📌 Get current user from token
# ============================

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)]
) -> UserResponse:
    try:
        user = await get_current_user_from_token(db, token)
        return UserResponse.model_validate(user)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


# ============================
# 🔐 POST /login
# ============================

@router.post("/login", response_model=TokenResponse)
async def login(
    request: Request,
    login_data: LoginRequest,
    db: Annotated[AsyncSession, Depends(get_db)]
) -> TokenResponse:
    """
    Full login flow:
    - Login to Moodle
    - Create user on first login
    - Encrypt password if 'Remember Me'
    - Return access token
    """

    # Get remember parameter from query
    remember = request.query_params.get("remember", "false").lower() == "true"

    # Run full login flow
    status_msg, result = await login_user_flow(
        db=db,
        username=login_data.username,
        password=login_data.password,
        student_id=login_data.student_id,
        institution=login_data.institution,
        remember=remember
    )

    if status_msg == "error":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result
        )

    # Return token response with encrypted password if remember is true
    return TokenResponse(
        access_token=result["access_token"],
        token_type=result["token_type"],
        encrypted_password=result.get("encrypted_password")
    )


# ============================
# 👤 GET /me
# ============================

@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> UserResponse:
    return current_user
