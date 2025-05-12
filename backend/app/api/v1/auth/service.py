from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from app.core.config import settings

def login_user(username: str, password: str) -> tuple[str, str]:
    """
    מתחבר ל-Moodle ובודק האם שם המשתמש והסיסמה תקינים.
    מחזיר: ("success", msg) או ("error", msg)
    """
    try:
        # הגדרת אפשרויות לדפדפן (ללא ממשק)
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")

        # הפעלת הדפדפן לפי הנתיב מה־env
        driver = webdriver.Chrome(executable_path=settings.CHROME_PATH, options=options)

        # פתיחת דף התחברות
        driver.get(settings.MOODLE_URL)

        # הכנסת פרטי התחברות
        driver.find_element(By.ID, "username").send_keys(username)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.ID, "loginbtn").click()

        # בדיקה אם יש הודעת שגיאה
        try:
            driver.find_element(By.CLASS_NAME, "loginerrors")
            driver.quit()
            return "error", "שם משתמש או סיסמה שגויים"
        except NoSuchElementException:
            driver.quit()
            return "success", "התחברות למודל הצליחה"

    except Exception as e:
        return "error", f"שגיאה בהתחברות: {str(e)}"
