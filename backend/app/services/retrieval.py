import re
from typing import List, Dict, Any, Optional
from backend.app.repositories.data_store import db

class RetrievalService:
    def __init__(self):
        self._chunks: List[Dict[str, Any]] = []
        self._build_index()

    def _build_index(self):
        self._chunks = []
        for craft_id, craft in db.crafts.items():
            if craft.get("visibility") != "public":
                continue
            
            craft_name = craft.get("name", "")
            sources = [db.sources.get(sid) for sid in craft.get("source_ids", []) if sid in db.sources]
            default_source = sources[0] if sources else {
                "source_title": f"{craft_name} Heritage Archive",
                "publisher": "National Craft Documentation Centre",
                "source_url": None
            }

            # 1. Summary chunk
            self._chunks.append({
                "craft_id": craft_id,
                "craft_name": craft_name,
                "type": "summary",
                "content": f"{craft_name} is {craft.get('summary')} Cultural context: {craft.get('cultural_context')}",
                "source_title": default_source.get("source_title"),
                "publisher": default_source.get("publisher"),
                "source_url": default_source.get("source_url"),
                "claim_status": craft.get("review_status", "curator_reviewed"),
                "keywords": [craft_name.lower(), craft.get("category", "").lower(), craft.get("region_claim", "").lower()] + [alt.lower() for alt in craft.get("alternate_names", [])]
            })

            # 2. Materials chunk
            materials_str = "; ".join([f"{m.get('name')} ({m.get('purpose')})" for m in craft.get("materials", [])])
            self._chunks.append({
                "craft_id": craft_id,
                "craft_name": craft_name,
                "type": "materials",
                "content": f"Materials and tools used in {craft_name}: {materials_str}",
                "source_title": default_source.get("source_title"),
                "publisher": default_source.get("publisher"),
                "source_url": default_source.get("source_url"),
                "claim_status": "source_attached",
                "keywords": [craft_name.lower(), "material", "materials", "tools", "ingredients", "alloy", "pigment", "pen", "milk", "soil", "oil"] + [m.get("name", "").lower() for m in craft.get("materials", [])]
            })

            # 3. Process Stages chunk
            for stage in craft.get("process_stages", []):
                self._chunks.append({
                    "craft_id": craft_id,
                    "craft_name": craft_name,
                    "type": "process",
                    "content": f"Stage {stage.get('stage_number')} of {craft_name} ({stage.get('title')}): {stage.get('description')} Materials: {', '.join(stage.get('materials_used', []))}",
                    "source_title": default_source.get("source_title"),
                    "publisher": default_source.get("publisher"),
                    "source_url": default_source.get("source_url"),
                    "claim_status": "curator_reviewed",
                    "keywords": [craft_name.lower(), "process", "technique", "stage", "method", "how it is made", "steps", "making"] + stage.get("title", "").lower().split()
                })

            # 4. Verified Claims chunks
            for claim_id in craft.get("claim_ids", []):
                claim = db.claims.get(claim_id)
                if claim:
                    source = db.sources.get(claim.get("source_id", "")) or default_source
                    self._chunks.append({
                        "craft_id": craft_id,
                        "craft_name": craft_name,
                        "type": "claim",
                        "content": claim.get("claim_text"),
                        "source_title": claim.get("source_title") or source.get("source_title"),
                        "publisher": source.get("publisher", "Heritage Board"),
                        "source_url": source.get("source_url"),
                        "claim_status": claim.get("status", "curator_reviewed"),
                        "keywords": [craft_name.lower()] + claim.get("claim_text", "").lower().split()
                    })

    def retrieve(self, query: str, craft_slug: Optional[str] = None, limit: int = 3) -> List[Dict[str, Any]]:
        self._build_index()  # refresh index if new records were added
        q_words = [w.strip().lower() for w in re.findall(r'\b[a-zA-Z]{3,}\b', query)]
        
        # Stopwords to ignore
        stopwords = {"what", "when", "where", "which", "how", "why", "who", "the", "and", "for", "with", "from", "this", "that", "are", "is", "used", "made", "you", "can"}
        filtered_q = [w for w in q_words if w not in stopwords]
        
        if not filtered_q:
            return []

        scored_chunks = []
        for chunk in self._chunks:
            # Filter by craft if specified
            if craft_slug:
                craft = db.get_craft(craft_slug)
                target_id = craft.get("id") if craft else craft_slug
                if chunk["craft_id"] != target_id:
                    continue

            score = 0
            content_lower = chunk["content"].lower()
            keywords_lower = [k.lower() for k in chunk.get("keywords", [])]

            for word in filtered_q:
                # Whole word match in content using regex boundary
                if re.search(r'\b' + re.escape(word) + r'\b', content_lower):
                    score += 3
                # Whole word match in keywords
                if any(re.search(r'\b' + re.escape(word) + r'\b', kw) for kw in keywords_lower):
                    score += 2
                # Match in craft name
                if re.search(r'\b' + re.escape(word) + r'\b', chunk["craft_name"].lower()):
                    score += 4

            if score >= 5:  # Strict threshold ensuring evidence relevance
                scored_chunks.append((score, chunk))

        # Sort by relevance score
        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        return [chunk for score, chunk in scored_chunks[:limit]]

retrieval_service = RetrievalService()
