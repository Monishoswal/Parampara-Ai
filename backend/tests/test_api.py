import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "ai_engine" in data

def test_list_and_get_crafts():
    # List crafts
    response = client.get("/api/crafts")
    assert response.status_code == 200
    crafts = response.json()
    assert len(crafts) >= 3
    slugs = [c["slug"] for c in crafts]
    assert "bidriware" in slugs
    assert "kalamkari-srikalahasti" in slugs
    assert "rogan-art" in slugs

    # Detail craft
    detail_res = client.get("/api/crafts/bidriware")
    assert detail_res.status_code == 200
    bidri = detail_res.json()
    assert bidri["name"] == "Bidriware Metal Inlay"
    assert len(bidri["sources"]) >= 2
    assert len(bidri["claims"]) >= 3
    assert len(bidri["process_stages"]) == 6

def test_heritage_lens_analysis():
    response = client.post("/api/heritage/analyse-image")
    assert response.status_code == 200
    data = response.json()
    assert "identified_categories" in data
    assert len(data["visible_features"]) > 0
    assert len(data["candidate_matches"]) > 0
    assert "authenticity_disclaimer" in data
    # Ensure guardrail disclaimer is present
    assert "not an authenticity certificate" in data["candidate_matches"][0]["caution_note"].lower()

def test_heritage_qa_grounded_and_refusal():
    # 1. In-domain question that matches archive evidence
    in_domain = client.post("/api/heritage/ask", json={
        "question": "Why is Bidar Fort soil used for blackening the metal?",
        "craft_slug": "bidriware"
    })
    assert in_domain.status_code == 200
    ans = in_domain.json()
    assert ans["evidence_found"] is True
    assert len(ans["citations"]) > 0

    # 2. Out-of-domain question where archive has no evidence
    out_of_domain = client.post("/api/heritage/ask", json={
        "question": "How do you build an electric car battery with lithium?"
    })
    assert out_of_domain.status_code == 200
    ans_out = out_of_domain.json()
    assert ans_out["evidence_found"] is False
    assert "verified archive does not currently contain enough documented" in ans_out["answer"]
    assert len(ans_out["citations"]) == 0

def test_story_transcription_and_structuring():
    trans_res = client.post("/api/stories/transcribe", data={"language_hint": "hi"})
    assert trans_res.status_code == 200
    trans_data = trans_res.json()
    assert trans_data["is_draft"] is True
    assert len(trans_data["transcript_text"]) > 20

    struct_res = client.post("/api/stories/structure", json={
        "transcript": trans_data["transcript_text"],
        "contributor_name": "Shah Rashid Ahmed Qadri",
        "language": "Hindi"
    })
    assert struct_res.status_code == 200
    struct_data = struct_res.json()
    assert "structured_title" in struct_data
    assert len(struct_data["extracted_techniques"]) > 0

def test_product_story_generation():
    response = client.post("/api/products/generate-draft", json={
        "artisan_name": "Shah Rashid Ahmed Qadri",
        "craft_id": "bidriware",
        "product_category": "Vase",
        "materials_supplied": ["Zinc", "Pure Silver 99.9%", "Copper"],
        "dimensions": "12 inches height",
        "technique_note": "Hand chiseled Tarkashi pure silver inlay"
    })
    assert response.status_code == 200
    data = response.json()
    assert "suggested_title" in data
    assert "cultural_narrative" in data
    assert "zero commission" in data["ethical_pricing_note"]

def test_curator_queue_and_claim_update():
    # Get queue
    queue_res = client.get("/api/curator/review-queue")
    assert queue_res.status_code == 200
    queue = queue_res.json()
    assert len(queue) > 0

    # Update claim status
    claim_res = client.post("/api/curator/claims/clm-1", json={
        "claim_id": "clm-1",
        "new_status": "curator_reviewed",
        "reviewer_name": "Chief Curator Test",
        "review_note": "Verified against physical museum specimens"
    })
    assert claim_res.status_code == 200
    assert claim_res.json()["new_status"] == "curator_reviewed"

    # Check stats
    stats_res = client.get("/api/curator/stats")
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_records"] >= 3
    assert stats["curator_reviewed_claims"] >= 1

def test_marketplace_list_and_order():
    # 1. List products
    res = client.get("/api/products")
    assert res.status_code == 200
    products = res.json()
    assert len(products) >= 8

    # 2. Filter products by zone
    res_south = client.get("/api/products?zone=South India")
    assert res_south.status_code == 200
    assert len(res_south.json()) >= 3

    # 3. Get single product detail
    prod_id = products[0]["id"]
    detail_res = client.get(f"/api/products/{prod_id}")
    assert detail_res.status_code == 200
    assert detail_res.json()["id"] == prod_id
    assert "price_inr" in detail_res.json()

    # 4. Place order
    order_res = client.post("/api/products/order", json={
        "customer_name": "Aarav Sharma",
        "customer_phone": "+919876543210",
        "customer_email": "aarav@example.com",
        "shipping_address": "Flat 402, Heritage Residency, Indiranagar",
        "city": "Bengaluru",
        "state": "Karnataka",
        "pincode": "560038",
        "payment_method": "UPI",
        "items": [
            {
                "product_id": prod_id,
                "quantity": 1,
                "price_inr": products[0]["price_inr"]
            }
        ]
    })
    assert order_res.status_code == 200
    order_data = order_res.json()
    assert order_data["status"] == "confirmed"
    assert order_data["total_inr"] == products[0]["price_inr"]
    assert order_data["platform_commission_inr"] == 0
    assert order_data["certificate_id"].startswith("CERT-GI-")
    assert "whatsapp_tracking_url" in order_data
