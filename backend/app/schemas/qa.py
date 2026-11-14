from typing import List, Optional
from pydantic import BaseModel

class SourceCitation(BaseModel):
    craft_id: str
    craft_name: str
    source_title: str
    publisher: str
    source_url: Optional[str] = None
    claim_status: str
    relevance_snippet: str

class QARequest(BaseModel):
    question: str
    craft_slug: Optional[str] = None
    language: str = "en"

class QAResponse(BaseModel):
    answer: str
    is_grounded: bool
    evidence_found: bool
    citations: List[SourceCitation] = []
    disclaimer: str = (
        "Grounded in verified archive records. If evidence is not in the archive, "
        "PARAMPARA AI explicitly refrains from inventing historical or cultural claims."
    )
