import sys
import os

# הוספת תיקיית backend לשורת החיפוש של פייתון
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../")))

# עכשיו אפשר לייבא
from core.scraper.moodle_scraper import MoodleScraper
import pytest
from selenium.webdriver.common.by import By

@pytest.fixture
def fake_scraper(mocker):
    scraper = MoodleScraper(username="fake_user", password="fake_pass")
    mocker.patch.object(scraper, "_init_browser")

    mock_driver = mocker.MagicMock()

    mock_username = mocker.MagicMock()
    mock_password = mocker.MagicMock()
    mock_login_button = mocker.MagicMock()
    mock_error_div = mocker.MagicMock(text="Login error")

    mock_driver.find_element.side_effect = lambda by, value: {
        (By.ID, "username"): mock_username,
        (By.ID, "password"): mock_password,
        (By.ID, "loginbtn"): mock_login_button,
        (By.CLASS_NAME, "loginerrors"): mock_error_div
    }[(by, value)]

    mock_driver.current_url = "https://moodle.bgu.ac.il/moodle/dashboard"
    scraper.driver = mock_driver
    return scraper

def test_login_success(fake_scraper):
    try:
        fake_scraper.login()
    except Exception:
        pytest.fail("login() raised Exception unexpectedly!")
