from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, List
from backend.app.schemas.story import (
    StoryTranscriptionResponse,
    StoryStructuringRequest,
    StoryStructuringResponse
)
from backend.app.services.gemini_service import gemini_service
from backend.app.repositories.data_store import db

router = APIRouter(prefix="/stories", tags=["Stories"])

@router.get("", response_model=List[dict])
def list_stories(craft_id: Optional[str] = None):
    return db.get_stories(craft_id=craft_id)

@router.post("/transcribe", response_model=StoryTranscriptionResponse)
async def transcribe_story(
    file: Optional[UploadFile] = File(None),
    language_hint: Optional[str] = Form("hi")
):
    audio_bytes = None
    if file:
        audio_bytes = await file.read()
    
    result = await gemini_service.transcribe_voice(
        audio_bytes=audio_bytes,
        language_hint=language_hint or "hi"
    )
    return result

@router.post("/structure", response_model=StoryStructuringResponse)
async def structure_story(req: StoryStructuringRequest):
    if not req.transcript or len(req.transcript.strip()) < 10:
        raise HTTPException(status_code=400, detail="Transcript is too short to extract structured heritage metadata.")
    
    result = await gemini_service.structure_story(
        transcript=req.transcript,
        contributor_name=req.contributor_name,
        language=req.language
    )
    return result
