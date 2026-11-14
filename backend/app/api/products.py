import uuid
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from backend.app.schemas.product import (
    ProductDraftRequest,
    ProductDraftResponse,
    OrderCreateRequest,
    OrderResponse
)
from backend.app.services.gemini_service import gemini_service
from backend.app.repositories.data_store import db

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=List[dict])
def list_products(
    category: Optional[str] = None,
    zone: Optional[str] = None,
    search: Optional[str] = None
):
    items = list(db.products.values())
    if category and category != 'all':
        items = [p for p in items if p.get("category", "").lower() == category.lower()]
    if zone and zone != 'all':
        items = [p for p in items if p.get("zone", "").lower() == zone.lower()]
    if search:
        s = search.lower().strip()
        items = [
            p for p in items
            if s in p.get("title", "").lower()
            or s in p.get("craft_name", "").lower()
            or s in p.get("artisan_name", "").lower()
            or s in p.get("artisan_location", "").lower()
            or any(s in m.lower() for m in p.get("materials", []))
        ]
    return items

@router.get("/{product_id}", response_model=dict)
def get_product(product_id: str):
    if product_id not in db.products:
        raise HTTPException(status_code=404, detail="Product not found")
    prod = dict(db.products[product_id])
    # Attach linked artisan details if available
    artisan = db.artisans.get(prod.get("artisan_id"))
    if artisan:
        prod["artisan_details"] = artisan
    return prod

@router.post("/order", response_model=OrderResponse)
async def place_order(req: OrderCreateRequest):
    if not req.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    # Validate items and calculate total
    total_inr = 0
    ordered_items = []
    first_whatsapp = "+919845012345"

    for item in req.items:
        if item.quantity <= 0:
            raise HTTPException(status_code=400, detail="Item quantity must be greater than zero")
        prod = db.products.get(item.product_id)
        if not prod:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        
        unit_price = prod.get("price_inr", 0)
        item_total = unit_price * item.quantity
        total_inr += item_total
        first_whatsapp = prod.get("whatsapp_number", first_whatsapp)

        ordered_items.append({
            "product_id": item.product_id,
            "title": prod.get("title"),
            "craft_name": prod.get("craft_name"),
            "artisan_name": prod.get("artisan_name"),
            "quantity": item.quantity,
            "unit_price": unit_price,
            "item_total": item_total,
            "gi_tag": prod.get("gi_tag")
        })

    order_id = f"PRM-ORD-{uuid.uuid4().hex[:8].upper()}"
    certificate_id = f"CERT-GI-{uuid.uuid4().hex[:6].upper()}-IN"
    now_utc = datetime.now(timezone.utc)
    est_date = (now_utc + timedelta(days=7)).strftime("%d %B %Y")

    order_record = {
        "order_id": order_id,
        "total_inr": total_inr,
        "artisan_payout_inr": total_inr,  # 100% direct artisan payout (0% platform commission)
        "platform_commission_inr": 0,
        "status": "confirmed",
        "certificate_id": certificate_id,
        "customer_name": req.customer_name,
        "customer_phone": req.customer_phone,
        "customer_email": req.customer_email,
        "shipping_address": f"{req.shipping_address}, {req.city}, {req.state} - {req.pincode}",
        "payment_method": req.payment_method,
        "estimated_delivery": est_date,
        "items": ordered_items,
        "created_at": now_utc.isoformat()
    }

    # Store in memory
    db.orders[order_id] = order_record

    # Formatted direct artisan WhatsApp message link
    wa_clean = first_whatsapp.replace("+", "").replace(" ", "").replace("-", "")
    wa_msg = f"Namaste! I have placed Order {order_id} for authentic Indian handcrafted work on PARAMPARA AI. Total: Rs.{total_inr}."
    import urllib.parse
    whatsapp_url = f"https://wa.me/{wa_clean}?text={urllib.parse.quote(wa_msg)}"

    return OrderResponse(
        order_id=order_id,
        total_inr=total_inr,
        artisan_payout_inr=total_inr,
        platform_commission_inr=0,
        status="confirmed",
        certificate_id=certificate_id,
        customer_name=req.customer_name,
        customer_phone=req.customer_phone,
        shipping_address=order_record["shipping_address"],
        payment_method=req.payment_method,
        estimated_delivery=est_date,
        whatsapp_tracking_url=whatsapp_url,
        created_at=order_record["created_at"]
    )

@router.post("/generate-draft", response_model=ProductDraftResponse)
async def generate_product_draft(req: ProductDraftRequest):
    craft = db.get_craft(req.craft_id)
    craft_name = craft.get("name") if craft else req.craft_id

    result = await gemini_service.generate_product_story(
        artisan_name=req.artisan_name,
        craft_name=craft_name,
        materials=req.materials_supplied,
        dimensions=req.dimensions,
        technique_note=req.technique_note,
        category=req.product_category
    )
    return result
