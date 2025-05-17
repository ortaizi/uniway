from fastapi import APIRouter

from app.api.v1.auth.router import router as auth_router
from app.api.v1.assignments.router import router as assignments_router
from app.api.v1.courses.router import router as courses_router
from app.api.v1.users.router import router as users_router

# Create main v1 router
router = APIRouter()

# Include all sub-routers with proper prefixing and tags
router.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

router.include_router(
    assignments_router,
    prefix="/assignments",
    tags=["Assignments"]
)

router.include_router(
    courses_router,
    prefix="/courses",
    tags=["Courses"]
)

router.include_router(
    users_router,
    prefix="/users",
    tags=["Users"]
)
