# moodle_scraper.py

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time


class MoodleScraper:
    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password
        self.driver = None

    def _init_browser(self):
        """פותח את הדפדפן במצב שקוף (headless)"""
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")

        # יצירת השירות והדפדפן
        service = Service("/usr/local/bin/chromedriver")  # שנה לפי הנתיב שלך
        self.driver = webdriver.Chrome(service=service, options=options)

    def login(self):
        """מבצע התחברות לחשבון Moodle"""
        self._init_browser()

        self.driver.get("https://moodle.bgu.ac.il/moodle/login/index.php")
        time.sleep(2)

        # מציאת שדות התחברות
        username_input = self.driver.find_element(By.ID, "username")
        password_input = self.driver.find_element(By.ID, "password")

        username_input.send_keys(self.username)
        password_input.send_keys(self.password)

        # לחיצה על כפתור התחברות
        login_button = self.driver.find_element(By.ID, "loginbtn")
        login_button.click()

        time.sleep(3)

        # בדיקה: האם נשארנו בעמוד ההתחברות?
        current_url = self.driver.current_url
        if "login" in current_url:
            try:
                error_div = self.driver.find_element(By.CLASS_NAME, "loginerrors")
                error_text = error_div.text.strip()
                raise Exception(f"ההתחברות נכשלה: {error_text}")
            except:
                raise Exception("ההתחברות נכשלה – לא הצלחנו לעבור לעמוד הבית")

        print("✅ התחברות הצליחה")

    def quit(self):
        """סגירת הדפדפן"""
        if self.driver:
            self.driver.quit()
