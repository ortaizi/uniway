from selenium.webdriver.common.by import By

# Common timeouts
DEFAULT_TIMEOUT = 10
LONG_TIMEOUT = 30
SHORT_TIMEOUT = 5

# Common selectors
LOADING_SPINNER = (By.CLASS_NAME, "loading-spinner")
ERROR_MESSAGE = (By.CLASS_NAME, "error-message")
SUCCESS_MESSAGE = (By.CLASS_NAME, "success-message")

# Common XPath patterns
XPATH_CONTAINS_TEXT = "//*[contains(text(), '{}')]"
XPATH_CONTAINS_CLASS = "//*[contains(@class, '{}')]"

# Common class names
LOADING_CLASS = "loading"
ERROR_CLASS = "error"
SUCCESS_CLASS = "success"

# Common attributes
DATA_TEST_ID = "data-testid"
ARIA_LABEL = "aria-label"

# Common text patterns
LOADING_TEXT = "Loading..."
ERROR_TEXT = "Error"
SUCCESS_TEXT = "Success" 