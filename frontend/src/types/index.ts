export interface SourceReference {
  id: string;
  craft_id?: string;
  source_title: string;
  publisher: string;
  source_url?: string | null;
  source_type: string;
  accessed_at?: string | null;
  notes?: string | null;
}

export type ClaimStatus =
  | 'ai_suggested'
  | 'contributor_provided'
  | 'source_attached'
  | 'community_confirmed'
  | 'curator_reviewed'
  | 'disputed'
  | 'restricted';

export interface ClaimReviewItem {
  id: string;
  craft_id: string;
  claim_text: string;
  status: ClaimStatus;
  reviewer_id?: string | null;
  reviewer_name?: string | null;
  source_id?: string | null;
  source_title?: string | null;
  review_note?: string | null;
  reviewed_at?: string | null;
}

export interface ProcessStage {
  stage_number: number;
  title: string;
  description: string;
  materials_used: string[];
  duration?: string;
  image_url?: string;
}

export interface MaterialToolItem {
  name: string;
  local_name?: string;
  purpose: string;
  sourcing?: string;
  is_natural: boolean;
}

export interface VideoBookmark {
  timestamp: string;
  label: string;
  desc: string;
}

export interface Craft {
  id: string;
  slug: string;
  name: string;
  alternate_names: string[];
  category: string;
  region_claim: string;
  region_basis: string;
  state: string;
  summary: string;
  cultural_context: string;
  techniques: string[];
  materials: MaterialToolItem[];
  process_stages: ProcessStage[];
  hero_image: string;
  gallery_images: string[];
  zone?: string;
  gi_tag?: string;
  heritage_era?: string;
  video_url?: string;
  youtube_id?: string;
  video_poster?: string;
  video_duration?: string;
  video_title?: string;
  video_bookmarks?: VideoBookmark[];
  visibility: 'public' | 'restricted' | 'private';
  review_status: string;
  data_label: string;
  created_at: string;
  last_reviewed_at?: string | null;
  sources?: SourceReference[];
  claims?: ClaimReviewItem[];
  associated_artisans?: Artisan[];
}

export interface Artisan {
  id: string;
  slug: string;
  public_name: string;
  collective_name?: string | null;
  region_label: string;
  craft_ids?: string[];
  craft_specialization: string;
  bio: string;
  avatar_url?: string;
  experience_years?: number;
  awards?: string[];
  contact_visibility: string;
  consent_status: string;
  verified_artisan?: boolean;
  products?: Product[];
  stories?: StoryItem[];
}

export interface StoryItem {
  id: string;
  craft_id: string;
  craft_name: string;
  contributor_id: string;
  contributor_name: string;
  artisan_role: string;
  language: string;
  audio_path?: string | null;
  duration_seconds?: number;
  transcript: string;
  translation?: string | null;
  summary: string;
  visibility: string;
  review_status: string;
  created_at: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  artisan_name: string;
  craft_id: string;
  craft_name: string;
  title: string;
  description: string;
  cultural_story: string;
  price_inr?: number;
  image_url: string;
  status: string;
  zone?: string;
  category?: string;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  crafting_days?: number;
  gi_tag?: string;
  artisan_location?: string;
  artisan_avatar?: string;
  in_stock?: boolean;
  stock_quantity?: number;
  whatsapp_number?: string;
  images?: string[];
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderReceipt {
  order_id: string;
  total_inr: number;
  artisan_payout_inr: number;
  platform_commission_inr: number;
  status: string;
  certificate_id: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  payment_method: string;
  estimated_delivery: string;
  whatsapp_tracking_url: string;
  created_at: string;
}

export interface Opportunity {
  id: string;
  provider: string;
  title: string;
  category: string;
  description: string;
  eligible_crafts: string[];
  eligible_regions: string[];
  source_url: string;
  deadline: string;
  grant_amount_or_stipend?: string;
  last_checked_at: string;
  status: 'verified_open' | 'upcoming' | 'closing_soon' | 'archived';
  is_demo?: boolean;
}

export interface VisibleFeature {
  feature: string;
  description: string;
  significance: string;
}

export interface CraftMatchCandidate {
  craft_id: string;
  craft_name: string;
  slug: string;
  category: string;
  region_claim: string;
  match_level: string;
  matching_features: string[];
  evidence_notes: string;
  source_reference: string;
  caution_note: string;
}

export interface ImageAnalysisResult {
  identified_categories: string[];
  visible_features: VisibleFeature[];
  candidate_matches: CraftMatchCandidate[];
  confidence_assessment: string;
  cultural_context_summary: string;
  authenticity_disclaimer: string;
  suggested_correction_link: string;
}

export interface SourceCitation {
  craft_id: string;
  craft_name: string;
  source_title: string;
  publisher: string;
  source_url?: string | null;
  claim_status: string;
  relevance_snippet: string;
}

export interface QAResult {
  answer: string;
  is_grounded: boolean;
  evidence_found: boolean;
  citations: SourceCitation[];
  disclaimer: string;
}

export interface CuratorQueueItem {
  id: string;
  craft_name: string;
  contributor_name: string;
  contributor_type: string;
  submission_type: string;
  submitted_at: string;
  status: string;
  contributor_provided_facts: Record<string, any>;
  ai_suggested_draft: Record<string, any>;
  attached_sources: Array<{ title: string; publisher: string }>;
  consent_status: string;
  claims_to_verify: Array<{ id: string; claim_text: string; current_status: string }>;
  audio_preview_url?: string | null;
}

export interface CuratorStats {
  total_records: number;
  pending_reviews: number;
  curator_reviewed_claims: number;
  source_attached_claims: number;
  disputed_claims: number;
  contributed_stories: number;
  active_artisans: number;
}
