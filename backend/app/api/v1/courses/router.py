from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, Field
from datetime import datetime

from app.core.database import get_db
from app.models.user import UserResponse
from app.api.v1.auth.router import get_current_user

router = APIRouter()

# Pydantic models for course operations
class CourseBase(BaseModel):
    """Base Course schema with shared attributes"""
    name: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    moodle_course_id: str = Field(..., min_length=1)

class CourseCreate(CourseBase):
    """Schema for creating a new course"""
    pass

class CourseUpdate(BaseModel):
    """Schema for updating a course"""
    name: str | None = Field(None, min_length=1, max_length=255)
    description: str | None = Field(None, min_length=1)
    moodle_course_id: str | None = Field(None, min_length=1)

class CourseResponse(CourseBase):
    """Schema for course response"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# SQLAlchemy model for courses
from sqlalchemy import String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Course(Base):
    """SQLAlchemy Course model"""
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String)
    moodle_course_id: Mapped[str] = mapped_column(String(255), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, 
        default=datetime.utcnow, 
        onupdate=datetime.utcnow
    )

@router.get("/", response_model=List[CourseResponse])
async def list_courses(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    skip: int = 0,
    limit: int = 100
) -> List[CourseResponse]:
    """List all courses"""
    result = await db.execute(
        select(Course)
        .offset(skip)
        .limit(limit)
    )
    courses = result.scalars().all()
    return [CourseResponse.model_validate(course) for course in courses]

@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(
    course_data: CourseCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> CourseResponse:
    """Create a new course (admin only)"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Check if course with same moodle_course_id exists
    result = await db.execute(
        select(Course).where(Course.moodle_course_id == course_data.moodle_course_id)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Course with this Moodle ID already exists"
        )
    
    # Create new course
    db_course = Course(**course_data.model_dump())
    db.add(db_course)
    await db.commit()
    await db.refresh(db_course)
    
    return CourseResponse.model_validate(db_course)

@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(
    course_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> CourseResponse:
    """Get course by ID"""
    result = await db.execute(
        select(Course).where(Course.id == course_id)
    )
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    return CourseResponse.model_validate(course)

@router.patch("/{course_id}", response_model=CourseResponse)
async def update_course(
    course_id: int,
    course_update: CourseUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> CourseResponse:
    """Update course (admin only)"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    result = await db.execute(
        select(Course).where(Course.id == course_id)
    )
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Update course fields
    update_data = course_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(course, field, value)
    
    await db.commit()
    await db.refresh(course)
    
    return CourseResponse.model_validate(course)

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(
    course_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> None:
    """Delete course (admin only)"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    result = await db.execute(
        select(Course).where(Course.id == course_id)
    )
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    await db.delete(course)
    await db.commit() 