# core/tests/conftest.py

import sys
import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import platform

# ✅ הוספת הנתיב של backend ל־PYTHONPATH בשביל imports מסודרים
current_dir = os.path.dirname(__file__)  # איפה הקובץ הזה נמצא
backend_path = os.path.abspath(os.path.join(current_dir, "../../../"))  # עולה 3 תיקיות אחורה
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

@pytest.fixture(scope="function")
def browser():
    """
    Fixture: Launches a headless Chrome browser for Selenium-based tests.
    This setup is cross-platform and compatible with both Mac (dev) and EC2 (prod).
    """

    options = Options()
    options.add_argument("--headless")  # Run Chrome in headless mode
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])  # Cleaner console output

    # Cross-platform ChromeDriver initialization
    if platform.system() == "Darwin":
        # Mac OS (ChromeDriver should be installed via brew or manually)
        driver = webdriver.Chrome(options=options)
    else:
        # Linux (e.g., EC2 server)
        driver = webdriver.Chrome(
            service=Service("/usr/local/bin/chromedriver"),
            options=options
        )

    yield driver  # Provide the driver to the test

    driver.quit()  # Ensure the browser always closes after the test
