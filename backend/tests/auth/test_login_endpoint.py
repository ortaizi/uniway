import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

from app.main import app

# ============================
# 🧪 Fixtures
# ============================

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def valid_login_data():
    return {
        "username": "test@example.com",
        "password": "testpass123",
        "studentId": "123456789",
        "institution": "אוניברסית בן-גוריון"
    }

# ============================
# ✅ Test Cases
# ============================

def test_login_success(client, valid_login_data):
    async def fake_login_flow(*args, **kwargs):
        return "success", {
            "access_token": "test.jwt.token",
            "token_type": "bearer",
            "encrypted_password": None
        }

    with patch("app.api.v1.auth.service.login_user_flow", new_callable=AsyncMock) as mock_login:
        mock_login.side_effect = fake_login_flow

        response = client.post(
            "/api/v1/auth/login?remember=false",
            json=valid_login_data
        )

        assert response.status_code == 200
        data = response.json()
        assert data["access_token"] == "test.jwt.token"
        assert data["token_type"] == "bearer"
        assert data["encrypted_password"] is None


def test_login_with_remember_me(client, valid_login_data):
    async def fake_login_flow(*args, **kwargs):
        return "success", {
            "access_token": "test.jwt.token",
            "token_type": "bearer",
            "encrypted_password": "encrypted.test.password"
        }

    with patch("app.api.v1.auth.service.login_user_flow", new_callable=AsyncMock) as mock_login:
        mock_login.side_effect = fake_login_flow

        response = client.post(
            "/api/v1/auth/login?remember=true",
            json=valid_login_data
        )

        assert response.status_code == 200
        data = response.json()
        assert data["access_token"] == "test.jwt.token"
        assert data["token_type"] == "bearer"
        assert data["encrypted_password"] == "encrypted.test.password"


def test_login_invalid_credentials(client, valid_login_data):
    async def fake_login_flow(*args, **kwargs):
        return "error", "התחברות למודל נכשלה: פרטים שגויים"

    with patch("app.api.v1.auth.service.login_user_flow", new_callable=AsyncMock) as mock_login:
        mock_login.side_effect = fake_login_flow

        response = client.post(
            "/api/v1/auth/login?remember=false",
            json=valid_login_data
        )

        assert response.status_code == 401
        assert response.json()["detail"] == "התחברות למודל נכשלה: פרטים שגויים"
