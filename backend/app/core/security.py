from cryptography.fernet import Fernet, InvalidToken
from passlib.context import CryptContext
from app.core.config import settings

# ========================
# 🔐 הצפנה סימטרית (Fernet)
# ========================

fernet = Fernet(settings.FERNET_SECRET_KEY.encode())

def encrypt_password(password: str) -> str:
    """
    מצפין סיסמה רגילה (למשל כדי לשמור אותה זמנית למסדי Moodle).
    """
    return fernet.encrypt(password.encode()).decode()

def decrypt_password(encrypted_password: str) -> str:
    """
    מפענח סיסמה מוצפנת לצורך התחברות אוטומטית למערכות.
    """
    try:
        return fernet.decrypt(encrypted_password.encode()).decode()
    except InvalidToken:
        raise ValueError("פענוח הסיסמה נכשל – ייתכן שמפתח ההצפנה שונה")


# ========================
# 🧂 הצפנת סיסמאות סטנדרטית (bcrypt)
# ========================

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    משמש להצפנת סיסמה לפני שמירה במסד (למשל אם תתמוך במשתמשים חיצוניים בעתיד).
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    בודק אם סיסמה רגילה תואמת לגרסה המוצפנת שלה.
    """
    return pwd_context.verify(plain_password, hashed_password)
