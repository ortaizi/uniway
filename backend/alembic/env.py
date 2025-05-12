from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# 🔁 מייבא את קובץ alembic.ini
config = context.config

# 📋 טוען את קובץ הלוגינג לפי ההגדרות בקובץ ini
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ✅ הכי חשוב: חיבור למודלים של SQLAlchemy
from app.core.database import Base
from app.models.user import User  # תייבא כאן את כל המודלים שלך

# 👇 זה מאפשר autogenerate
target_metadata = Base.metadata


def run_migrations_offline():
    """מריץ מיגרציה בלי חיבור חי ל-DB"""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """מריץ מיגרציה עם חיבור חי ל-DB"""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


# 🤖 קובע האם לרוץ במצב online או offline
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
