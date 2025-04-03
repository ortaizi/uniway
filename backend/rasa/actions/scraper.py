# scraper.py
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from rapidfuzz import fuzz

# Correct Moodle URLs
MOODLE_LOGIN_URL = "https://moodle.bgu.ac.il/moodle/login/index.php"
MOODLE_DASHBOARD_URL = "https://moodle.bgu.ac.il/moodle/my"

def login_to_moodle_with_credentials(username, password):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)

    print("🌐 Navigating to Moodle login page...")
    driver.get(MOODLE_LOGIN_URL)
    time.sleep(2)

    username_field = driver.find_element(By.ID, "username")
    password_field = driver.find_element(By.ID, "password")
    username_field.send_keys(username)
    password_field.send_keys(password)
    password_field.send_keys(Keys.RETURN)
    time.sleep(3)

    if MOODLE_DASHBOARD_URL not in driver.current_url:
        print("❌ Login failed!")
        driver.quit()
        return None, None

    print("✅ Logged in successfully!")

    session = requests.Session()
    for cookie in driver.get_cookies():
        session.cookies.set(cookie['name'], cookie['value'])

    page_html = driver.page_source
    driver.quit()
    return session, page_html

def extract_course_list(html):
    soup = BeautifulSoup(html, 'html.parser')
    course_elements = soup.select('.course-title')
    courses = [el.get_text(strip=True) for el in course_elements]
    return courses

def match_course_name(user_input, course_list):
    best_match = None
    highest_score = 0
    for course in course_list:
        score = fuzz.partial_ratio(user_input, course)
        if score > highest_score:
            highest_score = score
            best_match = course
    return best_match

def search_course_files(session, course_name):
    dashboard = session.get(MOODLE_DASHBOARD_URL)
    soup = BeautifulSoup(dashboard.text, 'html.parser')
    courses = soup.select('.course-title')

    course_links = {}
    for link in courses:
        title = link.get_text(strip=True)
        parent = link.find_parent("a")
        if parent and parent.get("href"):
            course_links[title] = parent["href"]

    matched = match_course_name(course_name, list(course_links.keys()))
    if not matched:
        return None, "❌ לא נמצא קורס שתואם את השם שנמסר."

    print(f"🔍 Best match for '{course_name}' is '{matched}'")
    course_url = course_links[matched]

    course_page = session.get(course_url)
    course_soup = BeautifulSoup(course_page.text, 'html.parser')
    files = course_soup.select('a')
    file_links = [(f.text.strip(), f['href']) for f in files if f.get('href', '').endswith(('.pdf', '.docx', '.pptx'))]
    return file_links, matched

def download_file(session, file_url, save_path):
    response = session.get(file_url)
    with open(save_path, 'wb') as f:
        f.write(response.content)
    return save_path