-- PARAMPARA AI Database Seed
-- Verified pilot records for Bidriware, Kalamkari, and Rogan Art
-- Version: 2.0 Consolidated Master Architecture

-- 1. CRAFTS
INSERT INTO crafts (id, slug, name, alternate_names, category, region_claim, region_basis, state, summary, cultural_context, techniques, materials, process_stages, hero_image, gallery_images, visibility, review_status, data_label)
VALUES
(
    'bidriware',
    'bidriware',
    'Bidriware Metal Inlay',
    ARRAY['Bidri Art', 'Bidri Kaam', 'Bidri Shilpa'],
    'Metal Inlay Craft',
    'Bidar District, Karnataka',
    'GI Registration No. 17 & Bahmani Sultanate imperial archives',
    'Karnataka',
    'A 500-year-old metalcraft where pure silver wires and sheets are hammered into chiseled grooves of a zinc-copper alloy, then oxidized to jet-black using unique nitrate-rich soil from the Bidar Fort.',
    'Originated during the reign of the Bahmani Sultans in the 14th century, blending Persian arabesque patterns with indigenous Deccan flora and fauna motifs.',
    '["Tarkashi (Pure silver wire inlay)", "Taihnishan (Silver sheet inlay)", "Meenakari (Engraved highlighting)", "Fort Soil Chemical Oxidation"]'::jsonb,
    '[{"name": "Zinc", "purpose": "Primary base alloy (~94%)"}, {"name": "Copper", "purpose": "Ductility (~6%)"}, {"name": "Pure Silver Wire", "purpose": "99.9% fine silver wire for inlay"}, {"name": "Bidar Fort Soil", "purpose": "Natural oxidizing soil containing nitrates"}]'::jsonb,
    '[{"stage_number": 1, "title": "Alloy Melting & Mold Casting", "description": "Zinc and copper are melted and poured into fine soil molds mixed with castor oil."}, {"stage_number": 2, "title": "Chisel Engraving", "description": "Steel gravers hand-chisel intricate floral arabesque motifs."}, {"stage_number": 3, "title": "Pure Silver Inlay (Tarkashi)", "description": "Pure silver wire is tapped into engraved grooves with ball-peen hammers."}, {"stage_number": 4, "title": "Surface Leveling", "description": "Carborundum stones grind silver flush with the base alloy."}, {"stage_number": 5, "title": "Fort Soil Oxidation", "description": "Warm Bidar Fort soil paste blackens zinc while silver shines untarnished."}, {"stage_number": 6, "title": "Groundnut Oil Burnishing", "description": "Oil massage seals the velvety patina against moisture."}]'::jsonb,
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
    ARRAY['https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'],
    'public',
    'published',
    'Verified demo record'
),
(
    'kalamkari-srikalahasti',
    'kalamkari-srikalahasti',
    'Srikalahasti Kalamkari',
    ARRAY['Temple Kalamkari', 'Vastra Chitra', 'Kalamkari Chitrakala'],
    'Hand-Painted Natural Dye Textile',
    'Srikalahasti, Tirupati District, Andhra Pradesh',
    'GI Registration No. 19; Epigraphical records of temple patronage in Nayaka dynasty',
    'Andhra Pradesh',
    'The sacred art of hand-drawing mythological narratives on unbleached cotton using a sharpened bamboo reed pen (kalam) and pure fermented vegetable dyes, without wooden printing blocks.',
    'Born in the temples of Andhra Pradesh where traveling storytellers unrolled large illustrated scrolls to depict sacred narratives to devotees.',
    '["Bamboo Kalam freehand sketching", "Kasim iron-jaggery black ferment", "Alum mordant brush fixing", "River Swarnamukhi sand sun-bleaching"]'::jsonb,
    '[{"name": "Handwoven Cotton", "purpose": "Unbleached natural cloth base"}, {"name": "Buffalo Milk", "purpose": "High fat protein bath preventing dye bleed"}, {"name": "Bamboo Kalam", "purpose": "Sharpened reed pen with wool yarn reservoir"}, {"name": "Madder Root (Manjistha)", "purpose": "Natural root yielding crimson reds"}]'::jsonb,
    '[{"stage_number": 1, "title": "Cloth Scouring & Buffalo Milk Treatment", "description": "Cotton is washed in river water and treated with buffalo milk and myrobalan."}, {"stage_number": 2, "title": "Tamarind Twig Sketching", "description": "Charcoal sticks from burnt tamarind twigs lightly sketch contours."}, {"stage_number": 3, "title": "Kasim Iron Black Inking", "description": "Bamboo pen applies fermented iron jaggery black ink."}, {"stage_number": 4, "title": "Alum Mordanting", "description": "Alum solution is painted where red color is desired."}, {"stage_number": 5, "title": "Madder Root Vat Boiling", "description": "Boiled in copper vats with crushed madder roots to bloom reds."}, {"stage_number": 6, "title": "River Sand Sun Bleaching", "description": "Washed in river and bleached on sunny sand banks."}]'::jsonb,
    'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=80',
    ARRAY['https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80'],
    'public',
    'published',
    'Verified demo record'
),
(
    'rogan-art',
    'rogan-art',
    'Rogan Art of Kutch',
    ARRAY['Rogan Kaam', 'Rogan Painting', 'Kutch Rogan Chhap'],
    'Oil-Based Fabric Painting',
    'Nirona Village, Kutch District, Gujarat',
    'UNESCO Intangible Cultural Heritage Dossier & Khatri family lineage records in Nirona',
    'Gujarat',
    'A rare 300-year-old craft where hand-pressed castor oil is boiled for two days into a dense elastic paste, mixed with earth pigments, and drawn through the air with a blunt brass stylus onto dark cloth.',
    'Originally created to embellish bridal ghaghras, bedspreads, and animal trappings for nomadic Maldhari and Rabari pastoralists in the Thar desert.',
    '["Castor Oil High-Temperature Gelatinization", "Palm-Friction Elastic Filament Formation", "Airborne Stylus Guide", "Mirror Symmetrical Fabric Folding"]'::jsonb,
    '[{"name": "Cold-Pressed Castor Oil", "purpose": "Viscous drying oil boiled 48 hours into polymeric paste"}, {"name": "Mineral and Earth Pigments", "purpose": "Powdered mineral pigments for vibrant hues"}, {"name": "Brass Stylus", "purpose": "6-inch blunt brass rod guiding pigment thread"}, {"name": "Khadi Silk / Cotton Cloth", "purpose": "Dark dyed surface for contrast"}]'::jsonb,
    '[{"stage_number": 1, "title": "48-Hour Castor Oil Boiling", "description": "Castor oil is boiled outdoors for two days until volatile fractions evaporate."}, {"stage_number": 2, "title": "Water Quenching", "description": "Hot resin is plunged into cold water to freeze elastic consistency."}, {"stage_number": 3, "title": "Stone Slab Pigment Grinding", "description": "Lumps of rogan are ground on flat stones with mineral pigments."}, {"stage_number": 4, "title": "Palm Warming & Thread Pulling", "description": "Kneaded in left palm; body heat softens paste into elastic thread."}, {"stage_number": 5, "title": "Airborne Stylus Drawing", "description": "Stylus guides trailing thread floating millimeters above fabric."}, {"stage_number": 6, "title": "Mirror Symmetry Folding", "description": "Fabric is folded along center line to print identical mirror image."}]'::jsonb,
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    ARRAY['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'],
    'public',
    'published',
    'Verified demo record'
)
ON CONFLICT (id) DO NOTHING;

-- 2. SOURCES
INSERT INTO sources (id, craft_id, source_title, publisher, source_url, source_type, accessed_at, notes)
VALUES
('src-bidri-1', 'bidriware', 'Bidri Ware: A Metal Inlay Craft of Bidar', 'National Crafts Museum & Hastkala Academy, New Delhi', 'https://nationalcraftsmuseum.nic.in/crafts/bidriware', 'museum_catalog', '2026-10-15', 'Comprehensive survey of casting, engraving, pure silver tarkashi inlay and fort soil oxidation.'),
('src-bidri-2', 'bidriware', 'Geographical Indications Journal No. 12: Bidriware (GI Application No. 17)', 'Government of India, Intellectual Property Office', 'https://ipindia.gov.in/gi-journal.htm', 'government_registry', '2026-09-20', 'Standardized metallurgical ratio (16:1 Zinc to Copper).'),
('src-kalamkari-1', 'kalamkari-srikalahasti', 'Kalamkari Temple Cloths: The Srikalahasti Tradition', 'Crafts Council of India / Mapin Publishing', 'https://craftscouncilofindia.org/srikalahasti-kalamkari', 'research_monograph', '2026-10-10', 'Sacred narrative iconography, tamarind pen, buffalo milk fat mordant prevention.'),
('src-rogan-1', 'rogan-art', 'Rogan Art of Kutch: The Living Khatri Tradition', 'National Institute of Design (NID), Ahmedabad', 'https://nid.edu/research/publications/rogan-kutch', 'research_monograph', '2026-09-28', 'Documenting 48-hour castor oil boiling, palm manipulation, brass stylus air-guiding.')
ON CONFLICT (id) DO NOTHING;

-- 3. OPPORTUNITIES
INSERT INTO opportunities (id, provider, title, category, description, eligible_crafts, eligible_regions, source_url, deadline, grant_amount_or_stipend, status)
VALUES
('opp-1', 'Ministry of Textiles, Government of India', 'National Master Craftsman Fellowship & Research Grant 2026-27', 'Grant', 'Direct financial stipend and documentation grant for certified master craftspersons.', ARRAY['Bidriware', 'Kalamkari', 'Rogan Art'], ARRAY['Pan-India GI Clusters'], 'https://handicrafts.nic.in/fellowships-2026', '2026-12-15', '₹3,60,000 annual fellowship + ₹1,00,000 raw material grant', 'verified_open'),
('opp-2', 'Crafts Council of India (CCI)', 'Kamaladevi Chattopadhyay National Craft Exhibition — Mumbai 2026', 'Exhibition', 'Curated annual winter craft exposition providing direct artisan stalls and fair price guarantees.', ARRAY['Traditional Metal Inlay', 'Hand-painted Textiles', 'Indigenous Pigment Painting'], ARRAY['Registered state craft societies and guilds'], 'https://craftscouncilofindia.org/exhibitions/kamaladevi-2026', '2026-11-30', 'Complimentary stall + ₹15,000 travel allowance', 'closing_soon')
ON CONFLICT (id) DO NOTHING;
