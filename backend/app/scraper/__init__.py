"""
Uniway Scraper Package

This package contains modules for scraping various academic platforms:
- Moodle
- Student Portal
- Exam Schedule
- Gmail Integration
"""

from .base.session import create_chrome_driver, close_driver
from .base.utils import wait_for_element, safe_get_text, is_element_present
from .moodle.login import login_to_moodle

__all__ = [
    'create_chrome_driver',
    'close_driver',
    'wait_for_element',
    'safe_get_text',
    'is_element_present',
    'login_to_moodle',
] 