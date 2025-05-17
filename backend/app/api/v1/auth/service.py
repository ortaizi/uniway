from datetime import timedelta
from typing import Optional, Literal, Union, TypedDict

from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.config import settings
from app.core.security import encrypt_password
from app.models.user import User, UserCreate
from app.scraper.moodle.login import login_to_moodle


# ============================
# 📝 Type Definitions
# ============================

class LoginResult(TypedDict):
    """Type definition for successful login result"""
    access_token: str
    token_type: str
    encrypted_password: Optional[str]


# ============================
# 🌐 תהליך התחברות ראשי
# ============================

async def login_user_flow(
    db: AsyncSession,
    username: str,
    password: str,
    student_id: str,
    institution: str,
    remember: bool
) -> tuple[Literal["success", "error"], Union[LoginResult, str]]:
    """
    מבצע את כל תהליך ההתחברות:
    - התחברות למודל
    - יצירת משתמש אם זו התחברות ראשונה
    - שמירת סיסמה מוצפנת אם 'זכור אותי'
    - יצירת טוקן JWT
    """
    # 🔐 התחברות למודל
    from fastapi.concurrency import run_in_threadpool

    status_msg, message = await run_in_threadpool(login_to_moodle, username, password)
    if status_msg != "success":
        return "error", f"התחברות למודל נכשלה: {message}"

    # 👤 חיפוש משתמש במסד
    user = await get_user_by_username(db, username)

    # 🆕 יצירת משתמש אם זו התחברות ראשונה
    if not user:
        user = await create_user(db, UserCreate(
            email=username,
            full_name="סטודנט ממודל",
            password=password  # הסיסמה תוצפן בתוך create_user
        ))

    # 🎟️ יצירת Access Token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )

    # 🔐 הצפנת סיסמה אם נבחר 'זכור אותי'
    encrypted_pw = encrypt_password(password) if remember else None

    return "success", {
        "access_token": token,
        "token_type": "bearer",
        "encrypted_password": encrypted_pw
    }


# ============================
# 🧠 Get current user from JWT
# ============================

async def get_current_user_from_token(db: AsyncSession, token: str) -> User:
    """
    מחזיר משתמש לפי טוקן JWT
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise ValueError("Missing subject")
    except JWTError:
        raise ValueError("Invalid token")

    user = await get_user_by_username(db, email)
    if user is None:
        raise ValueError("User not found")

    return user


# ============================
# 🗃️ Get user by email
# ============================

async def get_user_by_username(db: AsyncSession, email: str) -> Optional[User]:
    """
    מחזיר משתמש לפי כתובת אימייל
    """
    stmt = select(User).where(User.email == email)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


# ============================
# ➕ Create new user
# ============================

async def create_user(db: AsyncSession, user_create: UserCreate) -> User:
    """
    יוצר משתמש חדש במסד הנתונים
    """
    # יצירת משתמש עם סיסמה מוצפנת
    user_data = user_create.model_dump()
    hashed_password = encrypt_password(user_data.pop("password"))
    user = User(**user_data, hashed_password=hashed_password)
    
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


# ============================
# 🛡️ Create JWT
# ============================

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    יוצר טוקן JWT עם זמן תפוגה
    """
    to_encode = data.copy()
    expire = (settings.NOW() + expires_delta) if expires_delta else (settings.NOW() + timedelta(minutes=15))
    to_encode["exp"] = expire.timestamp()
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
