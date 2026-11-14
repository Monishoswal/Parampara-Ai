import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "PARAMPARA AI"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api"
    
    # Gemini Configuration
    GEMINI_API_KEY: str = ""
    GEMINI_TEXT_MODEL: str = "gemini-3.8-flash"
    GEMINI_TRANSCRIBE_MODEL: str = "gemini-3.5-transcribe"
    GEMINI_EMBEDDING_MODEL: str = "gemini-embedding-001"
    
    # Supabase Configuration
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_ANON_KEY: str = ""
    
    # Security / CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]
    
    # Storage paths
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

# Ensure uploads directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
