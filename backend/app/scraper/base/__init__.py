"""
Base scraper functionality and utilities.
"""

from .session import create_chrome_driver, close_driver
from .utils import wait_for_element, safe_get_text, is_element_present
from .constants import (
    DEFAULT_TIMEOUT,
    LONG_TIMEOUT,
    SHORT_TIMEOUT,
    LOADING_SPINNER,
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
)

__all__ = [
    'create_chrome_driver',
    'close_driver',
    'wait_for_element',
    'safe_get_text',
    'is_element_present',
    'DEFAULT_TIMEOUT',
    'LONG_TIMEOUT',
    'SHORT_TIMEOUT',
    'LOADING_SPINNER',
    'ERROR_MESSAGE',
    'SUCCESS_MESSAGE',
] 