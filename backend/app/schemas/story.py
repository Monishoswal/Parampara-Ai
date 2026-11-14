from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class ConsentRecord(BaseModel):
    contributor_name: str
    scope: str = "archive_and_research"  # archive_and_research, public_storytelling, commercial_attribution
    visibility: str = "public"  # public, restricted, private
    attribution_choice: str = "named"  # named, collective, anonymous
    allows_translation: bool = True
    allows_ai_search: bool = True
    recorded_at: str
    consent_confirmed: bool = True

class StoryTranscriptionRequest(BaseModel):
    audio_filename: Optional[str] = None
    language_hint: Optional[str] = "hi"  # hi (Hindi), te (Telugu), gu (Gujarati), kn (Kannada), en (English)

class StoryTranscriptionResponse(BaseModel):
    transcript_text: str
    detected_language: str
    confidence_note: str
    uncertain_terms: List[str] = []
    is_draft: bool = True
    disclaimer: str = "AI draft transcript. Contributor must review and correct local terms, dialect names, and personal references."

class StoryStructuringRequest(BaseModel):
    transcript: str
    contributor_name: str
    craft_name: Optional[str] = None
    region: Optional[str] = None
    language: str = "Hindi"

class StoryStructuringResponse(BaseModel):
    structured_title: str
    cultural_summary: str
    extracted_techniques: List[str] = []
    extracted_materials: List[str] = []
    oral_memory_quote: str
    flagged_terms_for_verification: List[str] = []
    suggested_tags: List[str] = []

class CraftStoryItem(BaseModel):
    id: str
    craft_id: str
    craft_name: str
    contributor_id: str
    contributor_name: str
    artisan_role: str
    language: str
    audio_path: Optional[str] = None
    duration_seconds: Optional[int] = 120
    transcript: str
    translation: Optional[str] = None
    summary: str
    visibility: str = "public"
    review_status: str = "published"  # draft, submitted, under_review, published
    consent: ConsentRecord
    created_at: str
