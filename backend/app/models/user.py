from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True)  # שם המשתמש במודל
    encrypted_password = Column(String, nullable=True)      # סיסמה מוצפנת (רק אם 'זכור אותי')
    created_at = Column(DateTime, default=datetime.utcnow)  # מתי המשתמש נוצר
    last_login = Column(DateTime, default=datetime.utcnow)  # מתי התחבר לאחרונה
