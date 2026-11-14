from fastapi import APIRouter
from typing import List, Optional
from backend.app.repositories.data_store import db

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])

@router.get("", response_model=List[dict])
def list_opportunities(category: Optional[str] = None):
    opps = list(db.opportunities.values())
    if category:
        opps = [o for o in opps if o.get("category", "").lower() == category.lower()]
    return opps
