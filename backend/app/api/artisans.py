from fastapi import APIRouter, HTTPException
from typing import List
from backend.app.repositories.data_store import db

router = APIRouter(prefix="/artisans", tags=["Artisans"])

@router.get("", response_model=List[dict])
def list_artisans():
    return db.get_all_artisans()

@router.get("/{artisan_slug_or_id}", response_model=dict)
def get_artisan(artisan_slug_or_id: str):
    artisan = db.get_artisan(artisan_slug_or_id)
    if not artisan:
        raise HTTPException(status_code=404, detail=f"Artisan profile '{artisan_slug_or_id}' not found.")
    return artisan
