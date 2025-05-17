from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from typing import Optional
import logging

logger = logging.getLogger(__name__)

def create_chrome_driver(headless: bool = True) -> webdriver.Chrome:
    """
    Create and configure a Chrome WebDriver instance.
    
    Args:
        headless (bool): Whether to run Chrome in headless mode
        
    Returns:
        webdriver.Chrome: Configured Chrome WebDriver instance
    """
    chrome_options = Options()
    if headless:
        chrome_options.add_argument("--headless")
    
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-popup-blocking")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    return driver

def close_driver(driver: Optional[webdriver.Chrome]) -> None:
    """
    Safely close the Chrome WebDriver instance.
    
    Args:
        driver (Optional[webdriver.Chrome]): The WebDriver instance to close
    """
    if driver:
        try:
            driver.quit()
        except Exception as e:
            logger.error(f"Error closing driver: {e}") 