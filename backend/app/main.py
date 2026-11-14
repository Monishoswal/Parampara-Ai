import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from backend.app.core.config import settings
from backend.app.api import health, heritage, crafts, stories, products, opportunities, artisans, curator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("parampara.main")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="PARAMPARA AI: AI-Powered Cultural Heritage Preservation & Artisan Empowerment Platform",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router, prefix="/api")
app.include_router(heritage.router, prefix="/api")
app.include_router(crafts.router, prefix="/api")
app.include_router(stories.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(opportunities.router, prefix="/api")
app.include_router(artisans.router, prefix="/api")
app.include_router(curator.router, prefix="/api")

# Static assets (Indian authentic heritage imagery)
images_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "public", "images"))
if os.path.exists(images_dir):
    app.mount("/images", StaticFiles(directory=images_dir), name="images")

# Mount compiled React SPA frontend if built
from fastapi.responses import FileResponse
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))

if os.path.exists(frontend_dist):
    # Mount assets directory
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/api-status")
    def api_status():
        return {
            "service": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "status": "operational",
            "docs_url": "/docs"
        }

    # Catch-all route to serve the React SPA for all frontend client routes
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = os.path.join(frontend_dist, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    @app.get("/")
    def root():
        return {
            "service": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "status": "operational",
            "docs_url": "/docs",
            "blueprint_version": "2.0 Consolidated Master Specification"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
