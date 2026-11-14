# PARAMPARA AI — Backend API Reference

**Base URL:** `http://localhost:8000/api`  
**Swagger UI:** `http://localhost:8000/docs`  
**ReDoc:** `http://localhost:8000/redoc`

---

## 1. System Health

### `GET /api/health`
Returns system operational status, AI engine configuration, and active mode (Live Gemini 3.8 Flash vs Grounded Pilot Archive mode).

**Response:**
```json
{
  "status": "healthy",
  "service": "PARAMPARA AI",
  "version": "2.0.0",
  "ai_engine": {
    "is_live_gemini": true,
    "text_model": "gemini-3.8-flash",
    "transcribe_model": "gemini-3.5-transcribe",
    "embedding_model": "gemini-embedding-001"
  },
  "mode": "live_gemini"
}
```

---

## 2. Digital Heritage Vault (Crafts)

### `GET /api/crafts`
Search and filter published craft records.

**Query Parameters:**
- `category` (string, optional): Filter by category (e.g. `Metal Inlay Craft`, `Hand-Painted Natural Dye Textile`)
- `state` (string, optional): Filter by Indian State (e.g. `Karnataka`, `Andhra Pradesh`, `Gujarat`)
- `search` (string, optional): Full-text keyword search across craft name, local alternate names, techniques, and materials.

**Response:** Array of craft objects with verified metadata, sources, and claim statuses.

### `GET /api/crafts/{craft_id_or_slug}`
Retrieve a single structured craft record including:
- Process stages (1 to 6)
- Raw materials and natural components
- Attached primary historical sources
- Claim-level verification statuses (`curator_reviewed`, `source_attached`, `community_confirmed`)
- Associated master artisans

---

## 3. Heritage Lens (Image Analysis)

### `POST /api/heritage/analyse-image`
Analyzes an uploaded craft photograph using multimodal Gemini 3.8 Flash. Compares visible features with pilot records and returns candidate matches with uncertainty notes.

**Request:** `multipart/form-data` with `file` (JPEG, PNG, WebP).

**Response:**
```json
{
  "identified_categories": ["Metal Inlay Craft", "Bidriware"],
  "visible_features": [
    {
      "feature": "High-contrast Silver-on-Black Surface",
      "description": "Fine metallic linear wire ornamentation embedded into matte black alloy.",
      "significance": "Signature trait of blackened zinc oxidized with Bidar Fort soil."
    }
  ],
  "candidate_matches": [
    {
      "craft_id": "bidriware",
      "craft_name": "Bidriware Metal Inlay",
      "match_level": "High likelihood",
      "matching_features": ["Matte black oxidized substrate", "Fine silver wire Tarkashi"],
      "evidence_notes": "Visually consistent with documented National Crafts Museum records.",
      "source_reference": "National Crafts Museum Catalog #NM-BID-2019",
      "caution_note": "AI-assisted suggestion based on pilot archive; not an authenticity certificate."
    }
  ],
  "authenticity_disclaimer": "AI-assisted exploration note: Visual analysis suggests stylistic similarities with documented traditions. It does not prove antiquity, origin, or artisan manufacture."
}
```

---

## 4. Heritage Q&A (RAG Grounded Assistance)

### `POST /api/heritage/ask`
Asks a question answered strictly from retrieved, approved archive records.

**Request:**
```json
{
  "question": "Why is Bidar Fort soil used for blackening the metal?",
  "craft_slug": "bidriware"
}
```

**Response (In-Domain Match):**
```json
{
  "answer": "According to verified records for Bidriware Metal Inlay: The soil from unexposed areas of Bidar Fort ruins contains unique nitrates and ammonium salts that chemically react with the zinc-copper alloy, oxidizing it into a deep velvet black while leaving pure silver wire untarnished.",
  "is_grounded": true,
  "evidence_found": true,
  "citations": [
    {
      "craft_id": "bidriware",
      "craft_name": "Bidriware Metal Inlay",
      "source_title": "Bidri Ware: A Metal Inlay Craft of Bidar",
      "publisher": "National Crafts Museum & Hastkala Academy, New Delhi",
      "claim_status": "curator_reviewed",
      "relevance_snippet": "The soil used for blackening the zinc alloy must be harvested from unexposed areas..."
    }
  ]
}
```

**Response (Out-of-Domain / Insufficient Evidence):**
```json
{
  "answer": "The PARAMPARA AI verified archive does not currently contain enough documented, curator-reviewed records to answer this specific question. To protect cultural accuracy, our system explicitly refrains from generating ungrounded folklore or speculative claims.",
  "is_grounded": true,
  "evidence_found": false,
  "citations": []
}
```

---

## 5. Voice of Tradition (Oral Histories)

### `POST /api/stories/transcribe`
Transcribes artisan audio using Gemini 3.5 Transcribe. Returns draft transcript and highlights dialect terms for contributor review.

### `POST /api/stories/structure`
Extracts structured titles, materials, techniques, and verbatim artisan quotes from approved transcripts.

### `GET /api/stories`
Lists public, consented oral history records with audio streams.

---

## 6. Artisan Studio & Product Storytelling

### `POST /api/products/generate-draft`
Creates a respectful product story strictly from facts supplied by the artisan and verified archive data.

### `GET /api/products`
Lists published artisan product story cards.

### `GET /api/artisans` / `GET /api/artisans/{slug}`
Lists and retrieves artisan and collective profiles with consent records.

---

## 7. Curator Console & Moderation

### `GET /api/curator/review-queue`
Lists pending community and artisan submissions.

### `POST /api/curator/reviews/{submission_id}`
Submit curator decision: `approve`, `request_changes`, `reject`, `restrict`.

### `POST /api/curator/claims/{claim_id}`
Updates individual claim status (`curator_reviewed`, `community_confirmed`, `source_attached`, `disputed`).

### `GET /api/curator/stats`
Dashboard metrics: total records, pending reviews, reviewed claims, active artisans.

### `GET /api/curator/audit`
Immutable trail of moderation events.

---

## 8. Opportunity Connect

### `GET /api/opportunities`
Lists verified exhibitions, grants, fellowships, and residencies.
