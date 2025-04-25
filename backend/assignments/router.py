from fastapi import APIRouter, HTTPException
from assignments.schema import AssignmentsRequest, Assignment
from assignments.service import get_open_assignments
from typing import List

router = APIRouter()

@router.post("/open", response_model=List[Assignment])
async def open_assignments_handler(request: AssignmentsRequest):
    try:
        assignments = get_open_assignments(request.username, request.password)

        if not assignments:
            return []  # or raise HTTPException(status_code=204, detail="No open assignments")

        return assignments

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error scraping assignments: {str(e)}")
