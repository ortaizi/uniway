from cryptography.fernet import Fernet
from app.core.config import settings

# יוצרים את אובייקט ההצפנה על בסיס המפתח ששמרת ב־.env
fernet = Fernet(settings.FERNET_SECRET_KEY.encode())

def encrypt_password(password: str) -> str:
    """
    מצפין סיסמה כך שאפשר לשמור אותה בבטחה במסד הנתונים.
    """
    return fernet.encrypt(password.encode()).decode()

def decrypt_password(encrypted_password: str) -> str:
    """
    מפענח סיסמה מוצפנת כדי להשתמש בה (למשל להתחבר למודל).
    """
    return fernet.decrypt(encrypted_password.encode()).decode()
