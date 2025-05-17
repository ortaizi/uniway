from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from typing import Optional, Any, Union
import logging

logger = logging.getLogger(__name__)

def wait_for_element(
    driver: Any,
    by: By,
    value: str,
    timeout: int = 10
) -> Optional[Any]:
    """
    Wait for an element to be present and visible on the page.
    
    Args:
        driver: WebDriver instance
        by: Selenium By locator
        value: Locator value
        timeout: Maximum time to wait in seconds
        
    Returns:
        Optional[Any]: The found element or None if not found
    """
    try:
        element = WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
        return element
    except TimeoutException:
        logger.warning(f"Element not found: {by}={value}")
        return None

def safe_get_text(element: Any) -> str:
    """
    Safely extract text from an element.
    
    Args:
        element: WebElement instance
        
    Returns:
        str: Extracted text or empty string if element is None
    """
    try:
        return element.text.strip() if element else ""
    except Exception as e:
        logger.error(f"Error extracting text: {e}")
        return ""

def is_element_present(driver: Any, by: By, value: str) -> bool:
    """
    Check if an element is present on the page.
    
    Args:
        driver: WebDriver instance
        by: Selenium By locator
        value: Locator value
        
    Returns:
        bool: True if element is present, False otherwise
    """
    try:
        driver.find_element(by, value)
        return True
    except NoSuchElementException:
        return False 