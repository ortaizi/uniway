"""
Moodle scraping functionality.
"""

from .login import login_to_moodle
from .constants import (
    MOODLE_LOGIN_URL,
    MOODLE_DASHBOARD_URL,
    COURSE_LIST,
    ASSIGNMENT_LIST,
    GRADE_TABLE,
)

__all__ = [
    'login_to_moodle',
    'MOODLE_LOGIN_URL',
    'MOODLE_DASHBOARD_URL',
    'COURSE_LIST',
    'ASSIGNMENT_LIST',
    'GRADE_TABLE',
] 