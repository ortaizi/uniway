from pydantic import BaseModel, EmailStr, Field, ConfigDict

# ========================
# 📥 Login Request Schema
# ========================

class LoginRequest(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        json_schema_extra={
            "example": {
                "username": "john.doe",
                "password": "securepass123",
                "studentId": "123456789",
                "institution": "אוניברסיטת בן-גוריון"
            }
        }
    )
    
    username: str = Field(
        ..., 
        min_length=3, 
        max_length=50,
        description="שם המשתמש במערכת"
    )
    password: str = Field(
        ..., 
        min_length=4,
        description="סיסמה"
    )
    student_id: str = Field(
        ..., 
        min_length=4, 
        max_length=20,
        alias="studentId",
        description="מספר תעודת זהות"
    )
    institution: str = Field(
        ..., 
        min_length=2, 
        max_length=100,
        description="מוסד לימודי"
    )

# ========================
# 🎟️ JWT Token Response
# ========================

class TokenResponse(BaseModel):
    access_token: str = Field(..., description="JWT token for authentication")
    token_type: str = Field(default="bearer", description="Type of token")
    encrypted_password: str | None = Field(
        default=None,
        description="Encrypted password for future use (if remember is true)"
    )
