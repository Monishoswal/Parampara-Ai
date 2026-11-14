-- PARAMPARA AI Database Migration
-- Version: 2.0 Consolidated Master Architecture
-- Created: 2026-11-08

-- Enable pgvector extension for RAG embeddings
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('public_explorer', 'artisan', 'curator', 'admin')),
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ARTISANS
CREATE TABLE IF NOT EXISTS artisans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    public_name TEXT NOT NULL,
    collective_name TEXT,
    region_label TEXT NOT NULL,
    craft_specialization TEXT,
    bio TEXT,
    avatar_url TEXT,
    experience_years INTEGER,
    contact_visibility TEXT DEFAULT 'enquiry_only' CHECK (contact_visibility IN ('public', 'enquiry_only', 'private')),
    consent_status TEXT DEFAULT 'consented_full_public',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CRAFTS (DIGITAL HERITAGE VAULT)
CREATE TABLE IF NOT EXISTS crafts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    alternate_names TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    region_claim TEXT NOT NULL,
    region_basis TEXT NOT NULL,
    state TEXT NOT NULL,
    summary TEXT NOT NULL,
    cultural_context TEXT NOT NULL,
    techniques JSONB DEFAULT '[]'::jsonb,
    materials JSONB DEFAULT '[]'::jsonb,
    process_stages JSONB DEFAULT '[]'::jsonb,
    hero_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'restricted', 'private')),
    review_status TEXT DEFAULT 'draft' CHECK (review_status IN ('draft', 'submitted', 'under_review', 'curator_reviewed', 'published', 'needs_changes', 'rejected', 'restricted', 'withdrawn')),
    data_label TEXT DEFAULT 'Verified demo record' CHECK (data_label IN ('Verified demo record', 'Community-contributed demo', 'Illustrative sample')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_reviewed_at TIMESTAMPTZ
);

-- 4. SOURCES
CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,
    craft_id TEXT REFERENCES crafts(id) ON DELETE CASCADE,
    source_title TEXT NOT NULL,
    publisher TEXT NOT NULL,
    source_url TEXT,
    source_type TEXT DEFAULT 'archive' CHECK (source_type IN ('archive', 'research_monograph', 'museum_catalog', 'government_registry', 'oral_history')),
    accessed_at DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CLAIM REVIEWS
CREATE TABLE IF NOT EXISTS claim_reviews (
    id TEXT PRIMARY KEY,
    craft_id TEXT REFERENCES crafts(id) ON DELETE CASCADE,
    claim_text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'source_attached' CHECK (status IN ('ai_suggested', 'contributor_provided', 'source_attached', 'community_confirmed', 'curator_reviewed', 'disputed', 'unknown', 'restricted')),
    reviewer_id UUID REFERENCES profiles(id),
    reviewer_name TEXT,
    source_id TEXT REFERENCES sources(id),
    review_note TEXT,
    reviewed_at DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CONSENT RECORDS
CREATE TABLE IF NOT EXISTS consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contributor_id UUID REFERENCES profiles(id),
    contributor_name TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('archive_and_research', 'public_storytelling', 'commercial_attribution')),
    visibility TEXT NOT NULL CHECK (visibility IN ('public', 'restricted', 'private')),
    attribution_choice TEXT NOT NULL CHECK (attribution_choice IN ('named', 'collective', 'anonymous')),
    allows_translation BOOLEAN DEFAULT TRUE,
    allows_ai_search BOOLEAN DEFAULT TRUE,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    withdrawn_at TIMESTAMPTZ
);

-- 7. CRAFT STORIES (VOICE OF TRADITION)
CREATE TABLE IF NOT EXISTS craft_stories (
    id TEXT PRIMARY KEY,
    craft_id TEXT REFERENCES crafts(id) ON DELETE CASCADE,
    contributor_id UUID REFERENCES profiles(id),
    contributor_name TEXT NOT NULL,
    artisan_role TEXT,
    language TEXT NOT NULL,
    audio_path TEXT,
    duration_seconds INTEGER,
    transcript TEXT NOT NULL,
    translation TEXT,
    summary TEXT NOT NULL,
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'restricted', 'private')),
    consent_id UUID REFERENCES consent_records(id),
    review_status TEXT DEFAULT 'submitted' CHECK (review_status IN ('draft', 'submitted', 'under_review', 'published', 'restricted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. KNOWLEDGE CHUNKS (FOR RAG & VECTOR SEARCH)
CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    craft_id TEXT REFERENCES crafts(id) ON DELETE CASCADE,
    source_id TEXT REFERENCES sources(id),
    chunk_type TEXT NOT NULL,
    chunk_text TEXT NOT NULL,
    embedding VECTOR(768),
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'restricted', 'private')),
    approval_status TEXT DEFAULT 'curator_reviewed' CHECK (approval_status IN ('unapproved', 'contributor_provided', 'curator_reviewed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. PRODUCTS (ARTISAN STORY CARDS)
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    artisan_id UUID REFERENCES artisans(id) ON DELETE CASCADE,
    craft_id TEXT REFERENCES crafts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    cultural_story TEXT NOT NULL,
    price_inr INTEGER,
    image_url TEXT NOT NULL,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. OPPORTUNITIES (OPPORTUNITY CONNECT)
CREATE TABLE IF NOT EXISTS opportunities (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Exhibition', 'Fair', 'Grant', 'Residency', 'Procurement', 'Workshop')),
    description TEXT NOT NULL,
    eligible_crafts TEXT[] DEFAULT '{}',
    eligible_regions TEXT[] DEFAULT '{}',
    source_url TEXT NOT NULL,
    deadline DATE NOT NULL,
    grant_amount_or_stipend TEXT,
    last_checked_at DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'verified_open' CHECK (status IN ('verified_open', 'upcoming', 'closing_soon', 'archived')),
    is_demo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AUDIT EVENTS
CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    actor_id TEXT NOT NULL,
    actor_name TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL,
    before_after_summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE crafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE craft_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public crafts are viewable by everyone" ON crafts
    FOR SELECT USING (visibility = 'public');

CREATE POLICY "Public stories are viewable by everyone" ON craft_stories
    FOR SELECT USING (visibility = 'public' AND review_status = 'published');

CREATE POLICY "Published products are viewable by everyone" ON products
    FOR SELECT USING (status = 'published');

CREATE POLICY "Active opportunities are viewable by everyone" ON opportunities
    FOR SELECT USING (status != 'archived');

CREATE POLICY "Only approved public chunks are searchable" ON knowledge_chunks
    FOR SELECT USING (visibility = 'public' AND approval_status = 'curator_reviewed');

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_crafts_category ON crafts(category);
CREATE INDEX IF NOT EXISTS idx_crafts_state ON crafts(state);
CREATE INDEX IF NOT EXISTS idx_claims_craft_id ON claim_reviews(craft_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claim_reviews(status);
CREATE INDEX IF NOT EXISTS idx_stories_craft_id ON craft_stories(craft_id);
CREATE INDEX IF NOT EXISTS idx_chunks_craft_id ON knowledge_chunks(craft_id);
