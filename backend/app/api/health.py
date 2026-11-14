from fastapi import APIRouter
from backend.app.core.config import settings
from backend.app.services.gemini_service import gemini_service

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "ai_engine": {
            "is_live_gemini": gemini_service.is_live(),
            "text_model": settings.GEMINI_TEXT_MODEL,
            "transcribe_model": settings.GEMINI_TRANSCRIBE_MODEL,
            "embedding_model": settings.GEMINI_EMBEDDING_MODEL
        },
        "mode": "live_gemini" if gemini_service.is_live() else "grounded_pilot_mode"
    }
