from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query
from backend.app.repositories.data_store import db

router = APIRouter(prefix="/crafts", tags=["Crafts"])

@router.get("", response_model=List[dict])
def list_crafts(
    category: Optional[str] = Query(None, description="Filter by craft category"),
    state: Optional[str] = Query(None, description="Filter by Indian State"),
    search: Optional[str] = Query(None, description="Search query across name, region, and materials")
):
    crafts = db.get_all_crafts(category=category, state=state, query=search)
    return crafts

@router.get("/{craft_id_or_slug}", response_model=dict)
def get_craft(craft_id_or_slug: str):
    craft = db.get_craft(craft_id_or_slug)
    if not craft:
        raise HTTPException(status_code=404, detail=f"Craft record '{craft_id_or_slug}' not found in archive.")
    return craft
