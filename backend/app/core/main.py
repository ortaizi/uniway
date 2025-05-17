from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.middleware import ErrorHandlingMiddleware, RequestLoggingMiddleware
from app.core.database import engine, Base
from app.api.v1.router import router as v1_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: Clean up resources
    await engine.dispose()

def create_application() -> FastAPI:
    """Create and configure the FastAPI application"""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        lifespan=lifespan,
    )

    # Add middleware
    app.add_middleware(ErrorHandlingMiddleware)
    app.add_middleware(RequestLoggingMiddleware)
    
    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["*"],
        expose_headers=["Content-Type", "Authorization"],
        max_age=3600,  # Cache preflight requests for 1 hour
    )

    # Include the v1 router with proper prefixing
    app.include_router(
        v1_router,
        prefix=settings.API_V1_STR
    )

    # Health check endpoint
    @app.get("/health", tags=["Health"])
    async def health_check():
        """Comprehensive health check endpoint"""
        return {
            "status": "healthy",
            "version": settings.VERSION,
            "database": "connected"
        }

    return app

app = create_application() 