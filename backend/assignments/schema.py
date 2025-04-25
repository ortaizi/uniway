from pydantic import BaseModel
from typing import Optional, List

class AssignmentsRequest(BaseModel):
    """
    The request body sent from the frontend,
    containing the user's Moodle credentials.
    """
    username: str
    password: str

class Assignment(BaseModel):
    """
    The response model for each open assignment shown in the dashboard.
    """
    course: str                      # Course name
    title: str                       # Assignment title
    description: Optional[str]       # Short description (if available)
    due_date: str                    # Due date as a string (e.g. "2025-05-10 23:55")
    days_left: int                   # Days remaining until due date
    submit_url: str                  # Direct link to submit the assignment
