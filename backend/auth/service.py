import os, time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def login_to_moodle(username: str, password: str):
    chrome_path = os.getenv("CHROME_PATH", "/usr/bin/google-chrome")
    moodle_url = os.getenv("MOODLE_URL", "https://moodle.bgu.ac.il/moodle/login/index.php")

    options = Options()
    options.binary_location = chrome_path
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=options)
    driver.get(moodle_url)

    try:
        driver.find_element(By.ID, "username").send_keys(username)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.ID, "loginbtn").click()
        time.sleep(2)

        if "my" in driver.current_url:
            return "success", None
        else:
            return "error", "Invalid credentials"
    except Exception as e:
        return "error", str(e)
    finally:
        driver.quit()
