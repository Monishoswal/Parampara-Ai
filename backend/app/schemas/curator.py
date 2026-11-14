from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class ClaimStatusUpdateRequest(BaseModel):
    claim_id: str
    new_status: str  # ai_suggested, contributor_provided, source_attached, community_confirmed, curator_reviewed, disputed, restricted
    review_note: Optional[str] = None
    reviewer_name: str = "Curator Review Desk"

class SubmissionReviewRequest(BaseModel):
    submission_id: str
    decision: str  # approve, request_changes, restrict, reject
    notes: str
    reviewer_name: str = "Chief Heritage Curator"
    claim_updates: Optional[List[ClaimStatusUpdateRequest]] = []

class CuratorQueueItem(BaseModel):
    id: str
    craft_name: str
    contributor_name: str
    contributor_type: str  # individual_artisan, collective, researcher
    submission_type: str  # new_craft_record, oral_history_story, technique_update
    submitted_at: str
    status: str  # submitted, under_review, needs_changes, approved, rejected
    contributor_provided_facts: Dict[str, Any]
    ai_suggested_draft: Dict[str, Any]
    attached_sources: List[Dict[str, str]]
    consent_status: str
    claims_to_verify: List[Dict[str, Any]]
    audio_preview_url: Optional[str] = None

class CuratorStats(BaseModel):
    total_records: int
    pending_reviews: int
    curator_reviewed_claims: int
    source_attached_claims: int
    disputed_claims: int
    contributed_stories: int
    active_artisans: int
