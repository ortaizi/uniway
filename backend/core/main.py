# core/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from core.load_env import load_environment
from auth.router import router as auth_router

load_environment()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://uniway.site"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Handle preflight requests
@app.options("/{full_path:path}")
async def preflight_handler(full_path: str):
    return Response(status_code=200)

# Ping route
@app.get("/ping")
async def ping():
    return {"status": "ok"}

# 🧩 Add routers
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
