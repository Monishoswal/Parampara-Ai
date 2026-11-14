from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from backend.app.schemas.lens import ImageAnalysisResponse
from backend.app.schemas.qa import QARequest, QAResponse
from backend.app.services.gemini_service import gemini_service
from backend.app.services.retrieval import retrieval_service

router = APIRouter(prefix="/heritage", tags=["Heritage AI"])

@router.post("/analyse-image", response_model=ImageAnalysisResponse)
async def analyse_craft_image(
    file: Optional[UploadFile] = File(None)
):
    image_bytes = None
    mime_type = "image/jpeg"
    if file:
        # Validate MIME type
        if file.content_type and not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Uploaded file must be a valid image format (JPEG, PNG, WebP).")
        image_bytes = await file.read()
        mime_type = file.content_type or "image/jpeg"

    # Analyze via Gemini multimodal / grounded pilot fallback
    analysis = await gemini_service.analyze_craft_image(image_bytes=image_bytes or b"", mime_type=mime_type)
    return analysis

@router.post("/ask", response_model=QAResponse)
async def ask_heritage_qa(req: QARequest):
    if not req.question or len(req.question.strip()) < 3:
        raise HTTPException(status_code=400, detail="Please provide a specific question regarding craft traditions.")
    
    # Retrieve relevant approved chunks
    retrieved_context = retrieval_service.retrieve(
        query=req.question,
        craft_slug=req.craft_slug,
        limit=3
    )

    # Call grounded RAG synthesis
    result = await gemini_service.answer_heritage_qa(
        question=req.question,
        retrieved_context=retrieved_context,
        craft_slug=req.craft_slug
    )
    return result
