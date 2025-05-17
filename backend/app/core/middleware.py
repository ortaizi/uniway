import time
import logging
from typing import Callable
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError

from app.core.config import settings

# Configure logging
logging.basicConfig(
    level=settings.LOG_LEVEL,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ErrorHandlingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        try:
            return await call_next(request)
        except Exception as exc:
            return await self.handle_exception(request, exc)

    async def handle_exception(self, request: Request, exc: Exception) -> JSONResponse:
        # Log the error
        logger.error(
            f"Error processing request: {request.method} {request.url.path}",
            exc_info=exc,
            extra={
                "path": request.url.path,
                "method": request.method,
                "client_host": request.client.host if request.client else None,
            }
        )

        # Handle specific exceptions
        if isinstance(exc, ValidationError):
            return JSONResponse(
                status_code=422,
                content={"detail": exc.errors()}
            )
        elif isinstance(exc, SQLAlchemyError):
            return JSONResponse(
                status_code=500,
                content={"detail": "Database error occurred"}
            )
        
        # Handle generic exceptions
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"}
        )

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # Start timer
        start_time = time.time()
        
        # Process request
        response = await call_next(request)
        
        # Calculate duration
        duration = time.time() - start_time
        
        # Log request details
        logger.info(
            f"{request.method} {request.url.path} - {response.status_code} - {duration:.2f}s",
            extra={
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration": duration,
                "client_host": request.client.host if request.client else None,
            }
        )
        
        return response 