import os
import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def scrape_open_assignments(username: str, password: str):
    moodle_url = os.getenv("MOODLE_URL", "https://moodle.bgu.ac.il/moodle/login/index.php")

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=options)
    assignments = []

    try:
        # 🔐 Login to Moodle
        driver.get(moodle_url)
        driver.find_element(By.ID, "username").send_keys(username)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.ID, "loginbtn").click()
        time.sleep(2)

        # 📚 Go to dashboard
        driver.get("https://moodle.bgu.ac.il/moodle/my/")
        time.sleep(2)

        # 🔁 Loop over course links
        course_links = driver.find_elements(By.CSS_SELECTOR, "a.aalink")
        course_urls = [link.get_attribute("href") for link in course_links if link.get_attribute("href") and "/course/view.php" in link.get_attribute("href")]

        for course_url in course_urls:
            driver.get(course_url)
            time.sleep(1.5)

            try:
                course_name = driver.find_element(By.CSS_SELECTOR, "h1").text.strip()
            except:
                course_name = "לא ידוע"

            # 🔍 All potential assignment links
            assignment_links = driver.find_elements(By.CSS_SELECTOR, "a.aalink.stretched-link")

            for link in assignment_links:
                href = link.get_attribute("href")
                if not href or "/mod/assign/view.php" not in href:
                    continue

                try:
                    driver.get(href)
                    time.sleep(1.2)

                    # 🔐 Check if assignment is open
                    buttons = driver.find_elements(By.TAG_NAME, "button")
                    is_open = any("הוספת הגשה" in btn.text for btn in buttons)
                    if not is_open:
                        continue

                    # 📝 Title
                    try:
                        title = driver.find_element(By.CSS_SELECTOR, "h2").text.strip()
                    except:
                        title = "ללא שם מטלה"

                    # 📅 Due date
                    due_date_str = None
                    due_texts = driver.find_elements(By.XPATH, "//div[contains(text(), 'סגירה') or contains(text(), 'מסתיים')]")
                    for div in due_texts:
                        if ":" in div.text:
                            due_date_str = div.text.split(":")[-1].strip()
                            break

                    if not due_date_str:
                        continue

                    due_datetime = parse_due_date(due_date_str)
                    days_left = (due_datetime - datetime.now()).days

                    # ✅ Add to result
                    assignments.append({
                        "course": course_name,
                        "title": title,
                        "description": None,
                        "due_date": due_datetime.strftime("%Y-%m-%d %H:%M"),
                        "days_left": days_left,
                        "submit_url": href
                    })

                    print(f"✅ {course_name} | {title} | {due_datetime} | {days_left} ימים")

                except Exception as assignment_error:
                    print(f"⚠️ Error scraping assignment: {assignment_error}")
                    continue

            time.sleep(1)

    except Exception as e:
        print(f"❌ Error during scraping: {e}")
    finally:
        driver.quit()

    return assignments

def parse_due_date(raw: str) -> datetime:
    months = {
        'ינואר': 'January', 'פברואר': 'February', 'מרץ': 'March', 'אפריל': 'April',
        'מאי': 'May', 'יוני': 'June', 'יולי': 'July', 'אוגוסט': 'August',
        'ספטמבר': 'September', 'אוקטובר': 'October', 'נובמבר': 'November', 'דצמבר': 'December'
    }
    for heb, eng in months.items():
        raw = raw.replace(heb, eng)

    for fmt in ["%d %B %Y, %H:%M", "%d %B %Y %H:%M", "%d %B %Y"]:
        try:
            return datetime.strptime(raw, fmt)
        except:
            continue

    return datetime.now()
