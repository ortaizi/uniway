from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
import os, time

# 📂 טען קובץ env בהתאם לסביבה
env_file = ".env.production" if os.getenv("ENVIRONMENT") == "production" else ".env"
load_dotenv(env_file)
# 🧭 טען את הנתיב מה־env
chrome_path = os.getenv("CHROME_PATH", "/usr/bin/google-chrome")

print(f"🌍 Environment: {os.getenv('ENVIRONMENT')}")
print(f"🌐 Chrome path: {chrome_path}")

app = FastAPI()

# 🌐 הגדרת CORS (שים לב: אין סלאש בסוף!)
allowed_origins = [
    "http://localhost:5173",
    "https://uniway.site"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ תוספת חשובה מאוד – טיפול בכלל בקשות OPTIONS
@app.options("/{full_path:path}")
async def preflight_handler(full_path: str):
    return Response(status_code=200)

# 🧪 בדיקת תקינות
@app.get("/ping")
async def ping():
    return {"status": "ok"}

# 🔐 התחברות
@app.post("/login")
async def login(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    # 🧭 משתנים מה־env
    chrome_path = os.getenv("CHROME_PATH", "/usr/bin/google-chrome")
    moodle_url = os.getenv("MOODLE_URL", "https://moodle.bgu.ac.il/moodle/login/index.php")

    # 🌐 דפדפן כרום
    chrome_options = Options()
    chrome_options.binary_location = chrome_path
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)
    driver.get(moodle_url)

    try:
        driver.find_element(By.ID, "username").send_keys(username)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.ID, "loginbtn").click()
        time.sleep(2)

        if "my" in driver.current_url:
            return JSONResponse(status_code=200, content={
                "status": "success",
                "message": "Login successful"
            })
        else:
            return JSONResponse(status_code=401, content={
                "status": "error",
                "message": "Invalid credentials"
            })

    except Exception as e:
        return JSONResponse(status_code=500, content={
            "status": "error",
            "message": "Error during login",
            "error": str(e)
        })

    finally:
        driver.quit()
