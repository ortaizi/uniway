from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class AssignmentsRequest(BaseModel):
    course: Optional[str] = Field(None, example="הסתברות")

class Assignment(BaseModel):
    title: str = Field(..., example="הגשת תרגיל 1")
    course: str = Field(..., example="הסתברות")
    deadline: datetime = Field(..., example="2025-05-15T23:59:00")
    description: Optional[str] = Field(None, example="יש להגיש ב־PDF")
