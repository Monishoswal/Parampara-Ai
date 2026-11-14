from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from backend.app.schemas.curator import (
    CuratorQueueItem,
    SubmissionReviewRequest,
    ClaimStatusUpdateRequest,
    CuratorStats
)
from backend.app.repositories.data_store import db

router = APIRouter(prefix="/curator", tags=["Curator Console"])

@router.get("/review-queue", response_model=List[dict])
def get_review_queue():
    return db.curator_queue

@router.post("/reviews/{submission_id}", response_model=dict)
def review_submission(submission_id: str, req: SubmissionReviewRequest):
    reviewed = db.review_submission(
        submission_id=submission_id,
        decision=req.decision,
        notes=req.notes,
        reviewer_name=req.reviewer_name
    )
    if not reviewed:
        raise HTTPException(status_code=404, detail="Submission not found in review queue.")
    
    # Process claim updates if any
    if req.claim_updates:
        for cu in req.claim_updates:
            db.update_claim_status(
                claim_id=cu.claim_id,
                new_status=cu.new_status,
                reviewer_name=req.reviewer_name,
                note=cu.review_note
            )

    return {"status": "success", "submission": reviewed}

@router.post("/claims/{claim_id}", response_model=dict)
def update_claim_status(claim_id: str, req: ClaimStatusUpdateRequest):
    success = db.update_claim_status(
        claim_id=claim_id,
        new_status=req.new_status,
        reviewer_name=req.reviewer_name,
        note=req.review_note
    )
    if not success:
        raise HTTPException(status_code=404, detail=f"Claim '{claim_id}' not found.")
    return {"status": "success", "claim_id": claim_id, "new_status": req.new_status}

@router.get("/stats", response_model=CuratorStats)
def get_curator_stats():
    total_claims = len(db.claims)
    reviewed_claims = sum(1 for c in db.claims.values() if c.get("status") == "curator_reviewed")
    source_attached = sum(1 for c in db.claims.values() if c.get("status") == "source_attached")
    disputed = sum(1 for c in db.claims.values() if c.get("status") == "disputed")
    pending_queue = sum(1 for q in db.curator_queue if q.get("status") in ["submitted", "under_review"])

    return CuratorStats(
        total_records=len(db.crafts),
        pending_reviews=pending_queue,
        curator_reviewed_claims=reviewed_claims,
        source_attached_claims=source_attached,
        disputed_claims=disputed,
        contributed_stories=len(db.stories),
        active_artisans=len(db.artisans)
    )

@router.get("/audit", response_model=List[dict])
def get_audit_trail():
    return db.audit_events
