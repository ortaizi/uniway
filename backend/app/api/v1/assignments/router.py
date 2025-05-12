from fastapi import APIRouter
from typing import List

from app.api.v1.assignments.schema import Assignment, AssignmentsRequest
from app.api.v1.assignments.service import get_mock_assignments

router = APIRouter()

@router.get("/", response_model=List[Assignment], summary="קבל את כל המשימות הפתוחות")
def list_assignments():
    """
    מחזיר רשימה של מטלות פתוחות (כרגע דמו, בעתיד מסקרייפינג ממודל)
    """
    return get_mock_assignments()

@router.post("/by-course", response_model=List[Assignment], summary="משימות לפי קורס")
def list_assignments_by_course(data: AssignmentsRequest):
    """
    מחזיר משימות רק עבור קורס מסוים (אם נשלח)
    """
    return get_mock_assignments(course=data.course)
