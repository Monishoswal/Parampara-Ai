from typing import List, Optional
from pydantic import BaseModel

class VisibleFeature(BaseModel):
    feature: str
    description: str
    significance: str

class CraftMatchCandidate(BaseModel):
    craft_id: str
    craft_name: str
    slug: str
    category: str
    region_claim: str
    match_level: str  # High likelihood, Moderate likelihood, Stylistic similarity
    matching_features: List[str]
    evidence_notes: str
    source_reference: str
    caution_note: str = "AI-assisted suggestion based on pilot archive; not an authenticity certificate."

class ImageAnalysisResponse(BaseModel):
    identified_categories: List[str]
    visible_features: List[VisibleFeature]
    candidate_matches: List[CraftMatchCandidate]
    confidence_assessment: str
    cultural_context_summary: str
    authenticity_disclaimer: str = (
        "AI-assisted exploration note: Visual analysis suggests stylistic and material similarities "
        "with documented traditions in our archive. It does not constitute proof of provenance, "
        "age, genuine artisan manufacture, or community ownership."
    )
    suggested_correction_link: str = "/curator/feedback"
