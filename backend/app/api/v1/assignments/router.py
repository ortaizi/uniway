from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, Field
from datetime import datetime

from app.core.database import get_db
from app.models.user import UserResponse
from app.api.v1.auth.router import get_current_user
from app.api.v1.courses.router import Course

router = APIRouter()

# Pydantic models for assignment operations
class AssignmentBase(BaseModel):
    """Base Assignment schema with shared attributes"""
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    due_date: datetime
    course_id: int
    moodle_assignment_id: str = Field(..., min_length=1)

class AssignmentCreate(AssignmentBase):
    """Schema for creating a new assignment"""
    pass

class AssignmentUpdate(BaseModel):
    """Schema for updating an assignment"""
    title: str | None = Field(None, min_length=1, max_length=255)
    description: str | None = Field(None, min_length=1)
    due_date: datetime | None = None
    course_id: int | None = None
    moodle_assignment_id: str | None = Field(None, min_length=1)

class AssignmentResponse(AssignmentBase):
    """Schema for assignment response"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# SQLAlchemy model for assignments
from sqlalchemy import String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Assignment(Base):
    """SQLAlchemy Assignment model"""
    __tablename__ = "assignments"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String)
    due_date: Mapped[datetime] = mapped_column(DateTime)
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    moodle_assignment_id: Mapped[str] = mapped_column(String(255), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, 
        default=datetime.utcnow, 
        onupdate=datetime.utcnow
    )

    # Relationships
    course: Mapped[Course] = relationship("Course")

@router.get("/", response_model=List[AssignmentResponse])
async def list_assignments(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    course_id: int | None = None,
    skip: int = 0,
    limit: int = 100
) -> List[AssignmentResponse]:
    """List all assignments, optionally filtered by course"""
    query = select(Assignment)
    if course_id:
        query = query.where(Assignment.course_id == course_id)
    
    result = await db.execute(
        query
        .offset(skip)
        .limit(limit)
    )
    assignments = result.scalars().all()
    return [AssignmentResponse.model_validate(assignment) for assignment in assignments]

@router.post("/", response_model=AssignmentResponse, status_code=status.HTTP_201_CREATED)
async def create_assignment(
    assignment_data: AssignmentCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> AssignmentResponse:
    """Create a new assignment (admin only)"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Check if course exists
    result = await db.execute(
        select(Course).where(Course.id == assignment_data.course_id)
    )
    if not result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if assignment with same moodle_assignment_id exists
    result = await db.execute(
        select(Assignment).where(
            Assignment.moodle_assignment_id == assignment_data.moodle_assignment_id
        )
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Assignment with this Moodle ID already exists"
        )
    
    # Create new assignment
    db_assignment = Assignment(**assignment_data.model_dump())
    db.add(db_assignment)
    await db.commit()
    await db.refresh(db_assignment)
    
    return AssignmentResponse.model_validate(db_assignment)

@router.get("/{assignment_id}", response_model=AssignmentResponse)
async def get_assignment(
    assignment_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> AssignmentResponse:
    """Get assignment by ID"""
    result = await db.execute(
        select(Assignment).where(Assignment.id == assignment_id)
    )
    assignment = result.scalar_one_or_none()
    
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found"
        )
    
    return AssignmentResponse.model_validate(assignment)

@router.patch("/{assignment_id}", response_model=AssignmentResponse)
async def update_assignment(
    assignment_id: int,
    assignment_update: AssignmentUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> AssignmentResponse:
    """Update assignment (admin only)"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    result = await db.execute(
        select(Assignment).where(Assignment.id == assignment_id)
    )
    assignment = result.scalar_one_or_none()
    
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found"
        )
    
    # Update assignment fields
    update_data = assignment_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(assignment, field, value)
    
    await db.commit()
    await db.refresh(assignment)
    
    return AssignmentResponse.model_validate(assignment)

@router.delete("/{assignment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_assignment(
    assignment_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[UserResponse, Depends(get_current_user)]
) -> None:
    """Delete assignment (admin only)"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    result = await db.execute(
        select(Assignment).where(Assignment.id == assignment_id)
    )
    assignment = result.scalar_one_or_none()
    
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found"
        )
    
    await db.delete(assignment)
    await db.commit()
