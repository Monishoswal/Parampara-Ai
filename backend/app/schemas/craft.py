from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class SourceReference(BaseModel):
    id: str
    craft_id: Optional[str] = None
    source_title: str
    publisher: str
    source_url: Optional[str] = None
    source_type: str = "archive"  # archive, research_paper, museum, government_catalog, oral_history
    accessed_at: Optional[str] = None
    notes: Optional[str] = None

class ClaimReviewItem(BaseModel):
    id: str
    craft_id: str
    claim_text: str
    status: str = "source_attached"  # ai_suggested, contributor_provided, source_attached, community_confirmed, curator_reviewed, disputed, unknown
    reviewer_id: Optional[str] = None
    reviewer_name: Optional[str] = None
    source_id: Optional[str] = None
    source_title: Optional[str] = None
    review_note: Optional[str] = None
    reviewed_at: Optional[str] = None

class ProcessStage(BaseModel):
    stage_number: int
    title: str
    description: str
    materials_used: List[str] = []
    duration: Optional[str] = None
    image_url: Optional[str] = None

class MaterialToolItem(BaseModel):
    name: str
    local_name: Optional[str] = None
    purpose: str
    sourcing: Optional[str] = None
    is_natural: bool = True

class CraftBase(BaseModel):
    name: str
    slug: str
    alternate_names: List[str] = []
    category: str
    region_claim: str
    region_basis: str
    state: str
    summary: str
    cultural_context: str
    techniques: List[str] = []
    materials: List[MaterialToolItem] = []
    process_stages: List[ProcessStage] = []
    hero_image: str
    gallery_images: List[str] = []
    zone: str = "South"  # North, South, West, East, Central, North-East
    gi_tag: Optional[str] = None
    heritage_era: Optional[str] = None
    video_url: Optional[str] = None
    youtube_id: Optional[str] = None
    video_poster: Optional[str] = None
    video_duration: Optional[str] = None
    video_title: Optional[str] = None
    video_bookmarks: List[Dict[str, str]] = []
    visibility: str = "public"  # public, restricted, private
    review_status: str = "curator_reviewed"  # draft, submitted, under_review, published, needs_changes, rejected, restricted
    data_label: str = "Verified demo record"  # Verified demo record, Community-contributed demo, Illustrative sample

class CraftResponse(CraftBase):
    id: str
    created_at: str
    last_reviewed_at: Optional[str] = None
    sources: List[SourceReference] = []
    claims: List[ClaimReviewItem] = []
    associated_artisans: List[Dict[str, Any]] = []
