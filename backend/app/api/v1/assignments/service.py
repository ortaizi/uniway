from datetime import datetime
from typing import List
from app.api.v1.assignments.schema import Assignment

def get_mock_assignments(course: str | None = None) -> List[Assignment]:
    # ❗ כאן בעתיד תשלב סקרייפינג ממודל לפי קורס
    assignments = [
        Assignment(
            title="הגשת תרגיל 1",
            course="הסתברות",
            deadline=datetime(2025, 5, 15, 23, 59),
            description="להגיש באתר המודל"
        ),
        Assignment(
            title="פרויקט אמצע",
            course="מבוא למדעי המחשב",
            deadline=datetime(2025, 5, 22, 23, 59),
            description=None
        ),
    ]

    if course:
        return [a for a in assignments if a.course == course]

    return assignments
