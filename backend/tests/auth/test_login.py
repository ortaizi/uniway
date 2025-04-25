# tests/auth/test_login.py

import pytest
from auth.service import login_to_moodle

# --- MOCKS SETUP ---

class MockDriver:
    def __init__(self, success=True):
        self.success = success
        self.current_url = "https://moodle.bgu.ac.il/moodle/my/" if success else "https://moodle.bgu.ac.il/moodle/login/index.php"
    
    def get(self, url): pass
    def quit(self): pass

    def find_element(self, by, value):
        return self

    def send_keys(self, value): pass
    def click(self): pass


# --- TESTS ---

def test_login_success(mocker):
    mocker.patch("auth.service.webdriver.Chrome", return_value=MockDriver(success=True))
    status, error = login_to_moodle("user", "pass")
    assert status == "success"
    assert error is None

def test_login_invalid_credentials(mocker):
    mocker.patch("auth.service.webdriver.Chrome", return_value=MockDriver(success=False))
    status, error = login_to_moodle("wrong", "wrong")
    assert status == "error"
    assert error == "Invalid credentials"

def test_login_exception(mocker):
    def raise_exception(*args, **kwargs):
        raise Exception("Crash")
    
    mock_driver = MockDriver()
    mock_driver.find_element = raise_exception
    mocker.patch("auth.service.webdriver.Chrome", return_value=mock_driver)

    status, error = login_to_moodle("user", "pass")
    assert status == "error"
    assert "Crash" in error
