from typing import List, Optional
from pydantic import BaseModel

class OpportunityItem(BaseModel):
    id: str
    provider: str
    title: str
    category: str  # Exhibition, Fair, Grant, Residency, Procurement, Workshop
    description: str
    eligible_crafts: List[str]
    eligible_regions: List[str]
    source_url: str
    deadline: str
    grant_amount_or_stipend: Optional[str] = None
    last_checked_at: str
    status: str = "verified_open"  # verified_open, upcoming, closing_soon, archived
    is_demo: bool = True
