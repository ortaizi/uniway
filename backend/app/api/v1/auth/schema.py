from pydantic import BaseModel, Field

class LoginRequest(BaseModel):
    username: str = Field(..., example="student123")
    password: str = Field(..., example="mypassword")

class LoginResponse(BaseModel):
    status: str = Field(..., example="success")
    message: str = Field(..., example="Login successful")
