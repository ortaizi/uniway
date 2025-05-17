# core/tests/conftest.py

import sys
import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import platform
import asyncio
from typing import AsyncGenerator, Generator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import settings
from app.core.database import Base, get_db
from app.models.user import User

# ✅ הוספת הנתיב של backend ל־PYTHONPATH בשביל imports מסודרים
current_dir = os.path.dirname(__file__)  # איפה הקובץ הזה נמצא
backend_path = os.path.abspath(os.path.join(current_dir, "../../../"))  # עולה 3 תיקיות אחורה
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

@pytest.fixture(scope="function")
def browser():
    """
    Fixture: Launches a headless Chrome browser for Selenium-based tests.
    This setup is cross-platform and compatible with both Mac (dev) and EC2 (prod).
    """

    options = Options()
    options.add_argument("--headless")  # Run Chrome in headless mode
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])  # Cleaner console output

    # Cross-platform ChromeDriver initialization
    if platform.system() == "Darwin":
        # Mac OS (ChromeDriver should be installed via brew or manually)
        driver = webdriver.Chrome(options=options)
    else:
        # Linux (e.g., EC2 server)
        driver = webdriver.Chrome(
            service=Service("/usr/local/bin/chromedriver"),
            options=options
        )

    yield driver  # Provide the driver to the test

    driver.quit()  # Ensure the browser always closes after the test

# Test database URL
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

@pytest.fixture(scope="session")
def event_loop() -> Generator:
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="session")
async def test_engine():
    """Create a test database engine."""
    engine = create_async_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield engine
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    
    await engine.dispose()

@pytest.fixture
async def test_db_session(test_engine) -> AsyncGenerator[AsyncSession, None]:
    """Create a test database session."""
    async_session = async_sessionmaker(
        test_engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    
    async with async_session() as session:
        yield session
        await session.rollback()

@pytest.fixture
def override_get_db(test_db_session):
    """Override the get_db dependency."""
    async def _override_get_db():
        yield test_db_session
    
    return _override_get_db

@pytest.fixture
async def test_user(test_db_session) -> User:
    """Create a test user in the database."""
    user = User(
        email="test@example.com",
        full_name="Test User",
        hashed_password="hashed_pass",
        student_id="123456789",
        institution="אוניברסיטת בן-גוריון"
    )
    test_db_session.add(user)
    await test_db_session.commit()
    await test_db_session.refresh(user)
    return user

@pytest.fixture
def mock_settings():
    """Mock settings for testing."""
    with pytest.MonkeyPatch.context() as m:
        m.setattr(settings, "SECRET_KEY", "test_secret_key")
        m.setattr(settings, "ALGORITHM", "HS256")
        m.setattr(settings, "ACCESS_TOKEN_EXPIRE_MINUTES", 30)
        yield settings
