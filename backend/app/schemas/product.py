from typing import List, Optional
from pydantic import BaseModel, Field

class ProductDraftRequest(BaseModel):
    artisan_name: str
    craft_id: str
    product_category: str
    materials_supplied: List[str]
    dimensions: Optional[str] = None
    technique_note: Optional[str] = None
    price_inr: Optional[int] = None
    special_motif: Optional[str] = None

class ProductDraftResponse(BaseModel):
    suggested_title: str
    cultural_narrative: str
    technical_description: str
    verified_craft_badge: str
    materials_summary: str
    artisan_attribution: str
    ethical_pricing_note: str = "Price is set directly by the artisan. PARAMPARA AI takes zero transaction commission."
    guardrail_notice: str = "Generated strictly from facts supplied by artisan and approved archive records. No unsubstantiated antique or GI claims added."

class ProductItem(BaseModel):
    id: str
    artisan_id: str
    artisan_name: str
    craft_id: str
    craft_name: str
    title: str
    description: str
    cultural_story: str
    price_inr: Optional[int] = None
    image_url: str
    status: str = "published"  # draft, published
    zone: Optional[str] = "Pan-India"
    category: Optional[str] = "Handicraft"
    materials: Optional[List[str]] = []
    dimensions: Optional[str] = None
    weight: Optional[str] = None
    crafting_days: Optional[int] = 14
    gi_tag: Optional[str] = None
    artisan_location: Optional[str] = None
    artisan_avatar: Optional[str] = None
    in_stock: Optional[bool] = True
    stock_quantity: Optional[int] = 5
    whatsapp_number: Optional[str] = "+919845012345"
    images: Optional[List[str]] = []
    created_at: str

class OrderItem(BaseModel):
    product_id: str
    quantity: int = Field(default=1, gt=0, description="Item quantity must be at least 1")
    price_inr: Optional[int] = None

class OrderCreateRequest(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    shipping_address: str
    city: Optional[str] = "India"
    state: Optional[str] = "Pan-India"
    pincode: Optional[str] = ""
    payment_method: str = "UPI"  # UPI, Card, NetBanking, DirectTransfer, COD
    items: List[OrderItem]

class OrderResponse(BaseModel):
    order_id: str
    total_inr: int
    artisan_payout_inr: int
    platform_commission_inr: int = 0
    status: str
    certificate_id: str
    customer_name: str
    customer_phone: str
    shipping_address: str
    payment_method: str
    estimated_delivery: str
    whatsapp_tracking_url: str
    created_at: str
