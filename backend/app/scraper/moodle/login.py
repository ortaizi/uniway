from selenium.webdriver.common.by import By
from typing import Optional, Tuple, Literal
import logging
import os

from ..base.session import create_chrome_driver, close_driver
from ..base.utils import wait_for_element, safe_get_text
from app.core.config import settings
from .constants import (
    MOODLE_USERNAME_FIELD,
    MOODLE_PASSWORD_FIELD,
    MOODLE_SUBMIT_BUTTON,
)

logger = logging.getLogger(__name__)

def login_to_moodle(username: str, password: str) -> Tuple[Literal["success", "error"], Optional[str]]:
    """
    Attempts to log in to Moodle using provided credentials.
    Returns:
        - ("success", None) on successful login
        - ("error", error message) on failure
    """
    driver = None
    try:
        moodle_url = settings.MOODLE_BASE_URL  # נקרא מה־.env

        driver = create_chrome_driver()
        driver.get(moodle_url)

        # הזנת שם משתמש
        username_field = wait_for_element(driver, *MOODLE_USERNAME_FIELD)
        if not username_field:
            return "error", "שדה שם המשתמש לא נמצא"
        username_field.send_keys(username)

        # הזנת סיסמה
        password_field = wait_for_element(driver, *MOODLE_PASSWORD_FIELD)
        if not password_field:
            return "error", "שדה הסיסמה לא נמצא"
        password_field.send_keys(password)

        # לחיצה על התחברות
        submit_button = wait_for_element(driver, *MOODLE_SUBMIT_BUTTON)
        if not submit_button:
            return "error", "כפתור התחברות לא נמצא"
        submit_button.click()

        # בדיקת הצלחה לפי כתובת URL לאחר ההתחברות
        if "/moodle/my/" in driver.current_url.lower():
            return "success", None

        # אם לא – בדוק אם יש הודעת שגיאה
        error_msg = safe_get_text(wait_for_element(driver, By.CLASS_NAME, "alert-danger"))
        return "error", error_msg or "התחברות נכשלה. בדוק את הפרטים שלך."

    except Exception as e:
        logger.error(f"❌ שגיאה בהתחברות למודל: {e}")
        return "error", "שגיאה פנימית בעת התחברות"

    finally:
        close_driver(driver)
