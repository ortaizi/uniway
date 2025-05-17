from selenium.webdriver.common.by import By

# URLs
MOODLE_LOGIN_URL = "https://moodle.example.edu/login/index.php"
MOODLE_DASHBOARD_URL = "https://moodle.example.edu/my/"

# Login page selectors
MOODLE_USERNAME_FIELD = (By.ID, "username")
MOODLE_PASSWORD_FIELD = (By.ID, "password")
MOODLE_SUBMIT_BUTTON = (By.ID, "loginbtn")

# Course page selectors
COURSE_LIST = (By.CLASS_NAME, "course-list")
COURSE_ITEM = (By.CLASS_NAME, "course-item")
COURSE_TITLE = (By.CLASS_NAME, "course-title")
COURSE_LINK = (By.CLASS_NAME, "course-link")

# Assignment selectors
ASSIGNMENT_LIST = (By.CLASS_NAME, "assignment-list")
ASSIGNMENT_ITEM = (By.CLASS_NAME, "assignment-item")
ASSIGNMENT_TITLE = (By.CLASS_NAME, "assignment-title")
ASSIGNMENT_DUE_DATE = (By.CLASS_NAME, "due-date")
ASSIGNMENT_STATUS = (By.CLASS_NAME, "status")

# Grade selectors
GRADE_TABLE = (By.CLASS_NAME, "grade-table")
GRADE_ROW = (By.CLASS_NAME, "grade-row")
GRADE_ITEM = (By.CLASS_NAME, "grade-item")
GRADE_VALUE = (By.CLASS_NAME, "grade-value")

# Common class names
LOADING_CLASS = "loading"
ERROR_CLASS = "error"
SUCCESS_CLASS = "success"

# Status indicators
STATUS_SUBMITTED = "submitted"
STATUS_GRADED = "graded"
STATUS_OVERDUE = "overdue"
STATUS_UPCOMING = "upcoming" 