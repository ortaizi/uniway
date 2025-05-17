import pytest
from unittest.mock import AsyncMock, patch
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.v1.auth.service import login_user_flow, get_user_by_username, create_user
from app.models.user import User, UserCreate
from app.core.security import encrypt_password

@pytest.fixture
def test_user_data():
    return {
        "username": "test@example.com",
        "password": "testpass123",
        "student_id": "123456789",
        "institution": "אוניברסית בן-גוריון"
    }

@pytest.fixture
def mock_db_session():
    session = AsyncMock(spec=AsyncSession)
    session.execute.return_value.scalar_one_or_none = AsyncMock()
    return session

@pytest.mark.asyncio
async def test_successful_login_existing_user(mock_db_session, test_user_data):
    existing_user = User(
        email=test_user_data["username"],
        full_name="Test User",
        hashed_password="hashed_pass"
    )
    mock_db_session.execute.return_value.scalar_one_or_none.return_value = existing_user

    with patch("app.scraper.moodle.login.login_to_moodle", new_callable=AsyncMock) as mock_login:
        mock_login.return_value = ("success", "Login successful")
        with patch("app.api.v1.auth.service.create_access_token", return_value="test.jwt.token"):
            status, result = await login_user_flow(
                db=mock_db_session,
                username=test_user_data["username"],
                password=test_user_data["password"],
                student_id=test_user_data["student_id"],
                institution=test_user_data["institution"],
                remember=False
            )
            assert status == "success"
            assert result["access_token"] == "test.jwt.token"
            assert result["token_type"] == "bearer"
            assert result["encrypted_password"] is None

@pytest.mark.asyncio
async def test_failed_moodle_login(mock_db_session, test_user_data):
    with patch("app.scraper.moodle.login.login_to_moodle", new_callable=AsyncMock) as mock_login:
        mock_login.return_value = ("error", "Invalid credentials")

        status, result = await login_user_flow(
            db=mock_db_session,
            username=test_user_data["username"],
            password=test_user_data["password"],
            student_id=test_user_data["student_id"],
            institution=test_user_data["institution"],
            remember=False
        )

        assert status == "error"
        assert "התחברות למודל נכשלה" in result
