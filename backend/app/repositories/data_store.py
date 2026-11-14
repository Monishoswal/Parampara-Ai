import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional

class DataStore:
    def __init__(self):
        self.crafts: Dict[str, Dict[str, Any]] = {}
        self.artisans: Dict[str, Dict[str, Any]] = {}
        self.stories: Dict[str, Dict[str, Any]] = {}
        self.sources: Dict[str, Dict[str, Any]] = {}
        self.claims: Dict[str, Dict[str, Any]] = {}
        self.products: Dict[str, Dict[str, Any]] = {}
        self.orders: Dict[str, Dict[str, Any]] = {}
        self.opportunities: Dict[str, Dict[str, Any]] = {}
        self.curator_queue: List[Dict[str, Any]] = []
        self.audit_events: List[Dict[str, Any]] = []
        self._seed_pilot_data()

    def _seed_pilot_data(self):
        # 1. PRIMARY ARCHIVAL SOURCES (INDIA-ONLY)
        s1 = {
            "id": "src-bidri-1",
            "craft_id": "bidriware",
            "source_title": "Bidri Ware: A Metal Inlay Craft of Bidar",
            "publisher": "National Crafts Museum & Hastkala Academy, New Delhi",
            "source_url": "https://nationalcraftsmuseum.nic.in/crafts/bidriware",
            "source_type": "museum_catalog",
            "accessed_at": "2026-10-15",
            "notes": "Survey of alloy casting, chisel engraving, pure silver Tarkashi inlay and Bidar Fort soil oxidation."
        }
        s2 = {
            "id": "src-bidri-2",
            "craft_id": "bidriware",
            "source_title": "Geographical Indications Journal No. 12: Bidriware (GI Application No. 17)",
            "publisher": "Government of India, Intellectual Property Office",
            "source_url": "https://ipindia.gov.in/gi-journal.htm",
            "source_type": "government_registry",
            "accessed_at": "2026-09-20",
            "notes": "Standardized metallurgical ratio (16:1 Zinc to Copper) and authentic Bidar cluster demarcation."
        }
        s3 = {
            "id": "src-kalamkari-1",
            "craft_id": "kalamkari-srikalahasti",
            "source_title": "Kalamkari Temple Cloths: The Srikalahasti Tradition",
            "publisher": "Crafts Council of India / Mapin Publishing",
            "source_url": "https://craftscouncilofindia.org/srikalahasti-kalamkari",
            "source_type": "research_monograph",
            "accessed_at": "2026-10-10",
            "notes": "Sacred narrative iconography, bamboo pen preparation, buffalo milk fat mordant prevention, Swarnamukhi river washing."
        }
        s4 = {
            "id": "src-rogan-1",
            "craft_id": "rogan-art",
            "source_title": "Rogan Art of Kutch: The Living Khatri Tradition",
            "publisher": "National Institute of Design (NID), Ahmedabad",
            "source_url": "https://nid.edu/research/publications/rogan-kutch",
            "source_type": "research_monograph",
            "accessed_at": "2026-09-28",
            "notes": "Documenting 48-hour castor oil boiling, palm manipulation, brass stylus air-guiding, and mirror folding."
        }
        s5 = {
            "id": "src-dhokra-1",
            "craft_id": "dhokra-casting",
            "source_title": "Ancient Lost-Wax Metal Casting in Central India",
            "publisher": "Anthropological Survey of India & Bastar Crafts Guild",
            "source_url": "https://asi.nic.in/dhokra-heritage",
            "source_type": "research_monograph",
            "accessed_at": "2026-10-02",
            "notes": "Direct lineage from Indus Valley Civilization Dancing Girl, beeswax coil techniques and clay core mold firing."
        }
        s6 = {
            "id": "src-thanjavur-1",
            "craft_id": "thanjavur-painting",
            "source_title": "Thanjavur Sacred Art and 22K Gold Foil Embossing",
            "publisher": "Tamil Nadu Handicrafts Development Corporation (Poompuhar)",
            "source_url": "https://poompuhar.tn.gov.in/thanjavur-art",
            "source_type": "museum_catalog",
            "accessed_at": "2026-09-18",
            "notes": "GI Application No. 24; Sukka preparation, chalk gesso relief, natural tamarind seed paste, and 22-carat pure gold leaf."
        }
        s7 = {
            "id": "src-madhubani-1",
            "craft_id": "madhubani-painting",
            "source_title": "Mithila Painting Traditions & Indigenous Pigments",
            "publisher": "Indira Gandhi National Centre for the Arts (IGNCA), New Delhi",
            "source_url": "https://ignca.gov.in/mithila-craft",
            "source_type": "archive",
            "accessed_at": "2026-10-05",
            "notes": "GI Registry No. 105; Kohbar wall paintings, cow dung wash, lamp soot black, natural indigo, and bamboo stick application."
        }
        s8 = {
            "id": "src-pashmina-1",
            "craft_id": "kashmir-pashmina",
            "source_title": "Kashmir Pashmina: Hand-Spun Changthangi Heritage",
            "publisher": "Craft Development Institute (CDI), Srinagar",
            "source_url": "https://cdisrinagar.org/pashmina-gi",
            "source_type": "government_registry",
            "accessed_at": "2026-09-12",
            "notes": "GI Registration No. 46; Hand spinning on Yender charkha, 12-14 micron Capra hircus underfleece, and hand-woven Kani loom technique."
        }
        for s in [s1, s2, s3, s4, s5, s6, s7, s8]:
            self.sources[s["id"]] = s

        # 2. CLAIM REVIEWS (CLAIM-LEVEL STATUS)
        claims_list = [
            {
                "id": "clm-1",
                "craft_id": "bidriware",
                "claim_text": "The soil used for blackening the zinc alloy must be harvested from unexposed areas of Bidar Fort ruins due to natural nitrates and ammonium salts.",
                "status": "curator_reviewed",
                "reviewer_name": "Dr. Ananya Sharma (Chief Heritage Curator)",
                "source_id": "src-bidri-1",
                "source_title": s1["source_title"],
                "review_note": "Verified against physical museum metallurgical tests and master artisan fieldwork in Bidar.",
                "reviewed_at": "2026-10-20"
            },
            {
                "id": "clm-2",
                "craft_id": "bidriware",
                "claim_text": "Base alloy consists of 16 parts non-ferrous zinc to 1 part copper to enable crisp cold chisel engraving without cracking.",
                "status": "source_attached",
                "source_id": "src-bidri-2",
                "source_title": s2["source_title"],
                "review_note": "Declared in GI Application No. 17 technical standards.",
                "reviewed_at": "2026-09-22"
            },
            {
                "id": "clm-bidri-3",
                "craft_id": "bidriware",
                "claim_text": "Finishing requires burnishing with groundnut oil rather than synthetic chemical lacquers to prevent degradation of the natural oxidation patina.",
                "status": "community_confirmed",
                "source_id": "src-bidri-1",
                "source_title": s1["source_title"],
                "review_note": "Field verified with Tarkashi Guild artisans in Bidar.",
                "reviewed_at": "2026-10-21"
            },
            {
                "id": "clm-3",
                "craft_id": "kalamkari-srikalahasti",
                "claim_text": "Raw cotton fabric is washed in flowing Swarnamukhi river water and soaked in buffalo milk to prevent natural dye capillary bleed.",
                "status": "curator_reviewed",
                "reviewer_name": "Dr. Ananya Sharma",
                "source_id": "src-kalamkari-1",
                "source_title": s3["source_title"],
                "review_note": "Buffalo milk casein and fat creates an impermeable natural resist on cellulose fibers.",
                "reviewed_at": "2026-10-18"
            },
            {
                "id": "clm-4",
                "craft_id": "rogan-art",
                "claim_text": "The metal stylus does not physically touch the cloth; instead, a heated viscous thread of castor oil pigment is guided across the surface through the air.",
                "status": "curator_reviewed",
                "reviewer_name": "Prof. Meera Patel",
                "source_id": "src-rogan-1",
                "source_title": s4["source_title"],
                "review_note": "Signature physical trait distinguishing Rogan from brush painting or block printing.",
                "reviewed_at": "2026-10-05"
            },
            {
                "id": "clm-5",
                "craft_id": "dhokra-casting",
                "claim_text": "Dhokra metal casting uses non-repeating lost-wax (cire perdue) molds made from local anthill soil, rice husk, and pure natural beeswax.",
                "status": "curator_reviewed",
                "reviewer_name": "Dr. K. S. Murthy (Tribal Arts Specialist)",
                "source_id": "src-dhokra-1",
                "source_title": s5["source_title"],
                "review_note": "Direct link to 4,000-year-old Mohenjo-daro Harappan metallurgy; each mold is broken upon casting.",
                "reviewed_at": "2026-10-22"
            },
            {
                "id": "clm-6",
                "craft_id": "thanjavur-painting",
                "claim_text": "Authentic Thanjavur paintings use 22-carat pure gold leaf pressed over high-relief gesso paste made from limestone chalk (sukka) and tamarind seed gum.",
                "status": "source_attached",
                "source_id": "src-thanjavur-1",
                "source_title": s6["source_title"],
                "review_note": "Certified in GI Application No. 24 specifications.",
                "reviewed_at": "2026-09-25"
            },
            {
                "id": "clm-7",
                "craft_id": "madhubani-painting",
                "claim_text": "Mithila art outlines are drawn with sharpened bamboo twigs using lamp soot dissolved in cow urine or gum, with double line contours filled with cross-hatching.",
                "status": "community_confirmed",
                "source_id": "src-madhubani-1",
                "source_title": s7["source_title"],
                "review_note": "Confirmed by Ranti and Jitwarpur women artisan guilds in Madhubani district.",
                "reviewed_at": "2026-10-10"
            },
            {
                "id": "clm-8",
                "craft_id": "kashmir-pashmina",
                "claim_text": "Authentic Kashmir Pashmina must be spun by hand on traditional wooden wheels (Yender) using only the underbelly fleece of high-altitude Changthangi goats.",
                "status": "curator_reviewed",
                "reviewer_name": "Dr. Ananya Sharma",
                "source_id": "src-pashmina-1",
                "source_title": s8["source_title"],
                "review_note": "Machine-spun fibers break the delicate 12-14 micron scale, failing GI microscopic verification tests.",
                "reviewed_at": "2026-09-18"
            }
        ]
        for c in claims_list:
            self.claims[c["id"]] = c

        # 3. MASTER ARTISANS (INDIA-ONLY FELLOWS)
        artisan_list = [
            {
                "id": "art-1",
                "slug": "rashid-qadri",
                "public_name": "Shah Rashid Ahmed Qadri",
                "collective_name": "Tarkashi Heritage Guild of Bidar",
                "region_label": "Bidar, Karnataka (South India)",
                "craft_ids": ["bidriware", "kashmir-pashmina"],
                "craft_specialization": "Pure Silver Wire Tarkashi & Aftaba Inlay",
                "bio": "Third-generation master artisan from Bidar, dedicated to training young women and youths in authentic Bahmani silver inlay techniques without chemical shortcuts.",
                "avatar_url": "/images/heritage/artisan_bidriware.jpg",
                "experience_years": 42,
                "awards": ["Padma Shri 2023", "National Master Craftsman Award"],
                "contact_visibility": "enquiry_only",
                "consent_status": "consented_full_public",
                "verified_artisan": True
            },
            {
                "id": "art-2",
                "slug": "j-niranjan",
                "public_name": "Jonnalagadda Niranjan",
                "collective_name": "Swarnamukhi Chitrakar Sangham",
                "region_label": "Srikalahasti, Andhra Pradesh (South India)",
                "craft_ids": ["kalamkari-srikalahasti", "thanjavur-painting"],
                "craft_specialization": "Traditional Temple Narrative Scrolls & Natural Kasim Dyes",
                "bio": "Preserving the 16-stage sacred Kalamkari technique practiced along the banks of the Swarnamukhi River using natural madder root, pomegranate rind, and bamboo pens.",
                "avatar_url": "/images/heritage/artisan_kalamkari.jpg",
                "experience_years": 35,
                "awards": ["National Award for Master Craftsman", "UNESCO Seal of Excellence"],
                "contact_visibility": "enquiry_only",
                "consent_status": "consented_full_public",
                "verified_artisan": True
            },
            {
                "id": "art-3",
                "slug": "gafur-khatri",
                "public_name": "Abdul Gafur Khatri",
                "collective_name": "Khatri Rogan Art Family Workshop",
                "region_label": "Nirona Village, Kutch, Gujarat (West India)",
                "craft_ids": ["rogan-art"],
                "craft_specialization": "Tree of Life Rogan Painting & Hand-boiled Castor Pigment",
                "bio": "Eighth-generation keeper of the rare Rogan art tradition in Nirona village. His workshop revived the art from near extinction and has trained over 300 village women to sustain the craft.",
                "avatar_url": "/images/heritage/artisan_rogan.jpg",
                "experience_years": 48,
                "awards": ["Padma Shri 2019", "National Award 1997"],
                "contact_visibility": "enquiry_only",
                "consent_status": "consented_full_public",
                "verified_artisan": True
            },
            {
                "id": "art-4",
                "slug": "suresh-jhare",
                "public_name": "Suresh Jhare & Clan",
                "collective_name": "Bastar Ghadwa Art Collective",
                "region_label": "Kondagaon, Bastar, Chhattisgarh (Central India)",
                "craft_ids": ["dhokra-casting"],
                "craft_specialization": "Tribal Lost-Wax Bell Metal Sculptures & Diya Figurines",
                "bio": "Master Ghadwa metalcaster preserving the unmechanized beeswax lost-mold technique in the forests of Bastar, creating bronze totems of local deities.",
                "avatar_url": "/images/heritage/artisan_dhokra.jpg",
                "experience_years": 38,
                "awards": ["State Master Craftsman Award", "Shilp Guru Nominee"],
                "contact_visibility": "enquiry_only",
                "consent_status": "consented_full_public",
                "verified_artisan": True
            },
            {
                "id": "art-5",
                "slug": "baua-devi",
                "public_name": "Smt. Baua Devi & Daughters",
                "collective_name": "Mithila Mahila Chitrakar Sangha",
                "region_label": "Jitwarpur, Madhubani, Bihar (East India)",
                "craft_ids": ["madhubani-painting"],
                "craft_specialization": "Sacred Kohbar Murals & Natural Earth Dyes",
                "bio": "Doyen of traditional Bharni and Kachni style Madhubani painting, maintaining natural dye recipes passed down across six generations of Mithila women.",
                "avatar_url": "/images/heritage/artisan_madhubani.jpg",
                "experience_years": 50,
                "awards": ["Padma Shri 2017", "National Handicraft Award"],
                "contact_visibility": "enquiry_only",
                "consent_status": "consented_full_public",
                "verified_artisan": True
            }
        ]
        for a in artisan_list:
            self.artisans[a["id"]] = a

        # 4. DIGITAL HERITAGE VAULT — PAN-INDIAN TRADITIONS
        self.crafts["bidriware"] = {
            "id": "bidriware",
            "slug": "bidriware",
            "name": "Bidriware Metal Inlay",
            "alternate_names": ["Bidri Art", "Bidri Kaam", "Bidri Shilpa"],
            "category": "Metal Inlay Craft",
            "zone": "South",
            "gi_tag": "GI Application No. 17",
            "heritage_era": "14th Century (Bahmani Sultanate)",
            "region_claim": "Bidar District, Karnataka",
            "region_basis": "GI Registration No. 17 & Bahmani Sultanate imperial archives",
            "state": "Karnataka",
            "summary": "A 500-year-old metalcraft where pure silver wires and sheets are hammered into chiseled grooves of a zinc-copper alloy, then oxidized to jet-black using unique nitrate-rich soil from the Bidar Fort ruins.",
            "cultural_context": "Originated during the reign of the Bahmani Sultans in the 14th century, blending Persian arabesque patterns with indigenous Deccan flora and fauna motifs.",
            "techniques": [
                "Tarkashi (Pure silver wire inlay)",
                "Taihnishan (Silver sheet inlay for broad patterns)",
                "Meenakari (Engraved surface highlighting)",
                "Fort Soil Chemical Oxidation"
            ],
            "materials": [
                {"name": "Zinc (Jasta)", "local_name": "Jasta", "purpose": "Primary base alloy component (~94%)", "is_natural": True},
                {"name": "Copper (Tamba)", "local_name": "Tamba", "purpose": "Imparts tensile ductility to the alloy (~6%)", "is_natural": True},
                {"name": "Pure Silver (Chandi)", "local_name": "Chandi Taar", "purpose": "99.9% fine silver wire for bright tarnish-free inlay", "is_natural": True},
                {"name": "Bidar Fort Soil", "local_name": "Kile ki Mitti", "purpose": "Natural oxidizing soil containing ammonium and potassium nitrates", "is_natural": True}
            ],
            "process_stages": [
                {"stage_number": 1, "title": "Alloy Melting & Mold Casting", "description": "Zinc and copper are melted in a crucible and poured into fine soil molds mixed with castor oil.", "materials_used": ["Zinc", "Copper", "Castor oil"]},
                {"stage_number": 2, "title": "Chisel Engraving (Kalam Kaam)", "description": "The cast object is coated with copper sulfate for temporary darkening, then master artisans hand-chisel intricate motifs using steel gravers.", "materials_used": ["Steel Chisels", "Copper Sulfate"]},
                {"stage_number": 3, "title": "Pure Silver Inlay (Tarkashi)", "description": "Pure silver wire is tapped into the engraved grooves using small ball-peen hammers, locking mechanically into the undercut edges.", "materials_used": ["Fine Silver Wire", "Hammers"]},
                {"stage_number": 4, "title": "Surface Leveling & Filing", "description": "Carborundum stones and buffing files grind the silver flush with the base alloy surface.", "materials_used": ["Carborundum", "Sandpaper"]},
                {"stage_number": 5, "title": "Bidar Fort Soil Oxidation", "description": "A warm slurry of unexposed Bidar Fort soil and sal-ammoniac is rubbed onto the heated vessel. The zinc turns deep velvet black in seconds while silver shines bright.", "materials_used": ["Bidar Fort Soil", "Ammonium Chloride", "Hot Water"]},
                {"stage_number": 6, "title": "Groundnut Oil Burnishing", "description": "Natural groundnut oil is massaged into the surface to seal the velvety patina and prevent ambient moisture tarnishing.", "materials_used": ["Groundnut Oil", "Cotton cloth"]}
            ],
            "video_url": "https://www.youtube-nocookie.com/embed/NMFaPZAFgUU",
            "youtube_id": "NMFaPZAFgUU",
            "video_poster": "/images/heritage/workshop_bidriware.jpg",
            "video_duration": "4:45",
            "video_title": "Bidriware Masterclass: The Alchemy of Silver and Fort Soil",
            "video_bookmarks": [
                {"timestamp": "0:20", "label": "Zinc Casting", "desc": "Pouring molten alloy into oiled soil molds"},
                {"timestamp": "1:15", "label": "Chisel Engraving", "desc": "Freehand carving of Bahmani floral vines"},
                {"timestamp": "2:30", "label": "Silver Inlay", "desc": "Hammering 99.9% fine silver wire flush"},
                {"timestamp": "3:40", "label": "Fort Soil Oxidation", "desc": "Zinc turns velvet black in seconds"}
            ],
            "hero_image": "/images/heritage/craft_bidriware_aftaba.jpg",
            "gallery_images": [
                "/images/heritage/craft_bidriware_aftaba.jpg",
                "/images/heritage/artisan_bidriware.jpg",
                "/images/heritage/workshop_bidriware.jpg"
            ],
            "visibility": "public",
            "review_status": "curator_reviewed",
            "data_label": "Verified demo record",
            "created_at": "2026-08-01T10:00:00Z",
            "last_reviewed_at": "2026-10-22T14:30:00Z",
            "source_ids": ["src-bidri-1", "src-bidri-2"],
            "claim_ids": ["clm-1", "clm-2", "clm-bidri-3"],
            "associated_artisan_ids": ["art-1"]
        }

        self.crafts["kalamkari-srikalahasti"] = {
            "id": "kalamkari-srikalahasti",
            "slug": "kalamkari-srikalahasti",
            "name": "Srikalahasti Kalamkari",
            "alternate_names": ["Temple Kalamkari", "Vastra Chitra", "Kalamkari Chitrakala"],
            "category": "Hand-Painted Natural Dye Textile",
            "zone": "South",
            "gi_tag": "GI Registry No. 19",
            "heritage_era": "Vijayanagara & Nayaka Dynasties",
            "region_claim": "Srikalahasti, Tirupati District, Andhra Pradesh",
            "region_basis": "GI Registration No. 19; Epigraphical records of temple patronage in Nayaka dynasty",
            "state": "Andhra Pradesh",
            "summary": "The sacred art of hand-drawing mythological narratives on unbleached cotton using a sharpened bamboo reed pen (kalam) and pure fermented vegetable dyes, without wooden printing blocks.",
            "cultural_context": "Born in the temples of Andhra Pradesh where traveling storytellers (chitrakars) unrolled large illustrated scrolls to depict sacred narratives to devotees.",
            "techniques": [
                "Bamboo Kalam freehand sketching",
                "Kasim iron-jaggery black ferment",
                "Alum mordant brush fixing",
                "River Swarnamukhi sand sun-bleaching"
            ],
            "materials": [
                {"name": "Handwoven Cotton", "local_name": "Gaada Cotton", "purpose": "Unbleached natural cloth base that absorbs plant tannins", "is_natural": True},
                {"name": "Buffalo Milk", "local_name": "Paalu", "purpose": "High fat protein bath preventing vegetable dye capillary spread", "is_natural": True},
                {"name": "Bamboo Kalam", "local_name": "Kalam", "purpose": "Sharpened reed pen wound with wool yarn reservoir for controlled dye flow", "is_natural": True},
                {"name": "Madder Root", "local_name": "Manjistha", "purpose": "Natural plant root yielding deep crimson and terracotta reds", "is_natural": True}
            ],
            "process_stages": [
                {"stage_number": 1, "title": "Cloth Scouring & Buffalo Milk Treatment", "description": "Raw unbleached cotton is washed in flowing river water and treated with buffalo milk and myrobalan nut extract.", "materials_used": ["Cotton", "Buffalo Milk", "Myrobalan"]},
                {"stage_number": 2, "title": "Tamarind Twig Sketching", "description": "Fine contours of mythological figures are lightly sketched with charcoal sticks made from burnt tamarind twigs.", "materials_used": ["Burnt Tamarind Twigs"]},
                {"stage_number": 3, "title": "Kasim Iron Black Inking", "description": "The bamboo pen discharges fermented iron jaggery black ink (Kasim) to create indelible outline drawings.", "materials_used": ["Kasim Ferment", "Bamboo Kalam"]},
                {"stage_number": 4, "title": "Alum Mordanting for Reds", "description": "Areas intended for red color are painted with alum solution to fix vegetable madder pigments.", "materials_used": ["Potassium Alum", "Water"]},
                {"stage_number": 5, "title": "Madder Root Copper Vat Boiling", "description": "The fabric is boiled in copper cauldrons with crushed madder roots (Manjistha), blooming red where alum was painted.", "materials_used": ["Madder Root", "Copper Cauldron"]},
                {"stage_number": 6, "title": "Swarnamukhi River Sun Bleaching", "description": "The cloth is washed in flowing river water and spread across clean river sand banks under the sun to bleach unpainted sections white.", "materials_used": ["River Water", "Sunlight"]}
            ],
            "video_url": "https://www.youtube-nocookie.com/embed/u3uCqf9cR1I",
            "youtube_id": "u3uCqf9cR1I",
            "video_poster": "/images/heritage/workshop_kalamkari.jpg",
            "video_duration": "5:15",
            "video_title": "Sacred Swarnamukhi: The 16 Stages of Srikalahasti Kalamkari",
            "video_bookmarks": [
                {"timestamp": "0:30", "label": "Milk Preparation", "desc": "Soaking cotton in high-fat buffalo milk"},
                {"timestamp": "1:45", "label": "Bamboo Kalam Drawing", "desc": "Freehand inking with iron-jaggery Kasim"},
                {"timestamp": "3:10", "label": "Natural Dye Boiling", "desc": "Madder root boiling in copper vats"},
                {"timestamp": "4:20", "label": "River Bleaching", "desc": "Sun-drying on Swarnamukhi sandbanks"}
            ],
            "hero_image": "/images/heritage/craft_kalamkari.jpg",
            "gallery_images": [
                "/images/heritage/craft_kalamkari.jpg",
                "/images/heritage/artisan_kalamkari.jpg",
                "/images/heritage/workshop_kalamkari.jpg"
            ],
            "visibility": "public",
            "review_status": "curator_reviewed",
            "data_label": "Verified demo record",
            "created_at": "2026-08-05T11:00:00Z",
            "last_reviewed_at": "2026-10-18T16:00:00Z",
            "source_ids": ["src-kalamkari-1"],
            "claim_ids": ["clm-3"],
            "associated_artisan_ids": ["art-2"]
        }

        self.crafts["rogan-art"] = {
            "id": "rogan-art",
            "slug": "rogan-art",
            "name": "Rogan Art of Kutch",
            "alternate_names": ["Rogan Kaam", "Rogan Painting", "Kutch Rogan Chhap"],
            "category": "Oil-Based Fabric Painting",
            "zone": "West",
            "gi_tag": "UNESCO Intangible Nomination",
            "heritage_era": "300+ Years (Maldhari Heritage)",
            "region_claim": "Nirona Village, Kutch District, Gujarat",
            "region_basis": "UNESCO Intangible Cultural Heritage Dossier & Khatri family lineage records in Nirona",
            "state": "Gujarat",
            "summary": "A rare 300-year-old art practiced solely by the Khatri family of Nirona, where hand-pressed castor oil is boiled for two days into a dense elastic paste, mixed with earth pigments, and drawn through the air with a blunt brass stylus onto dark cloth.",
            "cultural_context": "Originally created to embellish bridal ghaghras, bedspreads, and animal trappings for nomadic Maldhari and Rabari pastoralists traversing the Thar desert.",
            "techniques": [
                "Castor Oil High-Temperature Gelatinization",
                "Palm-Friction Elastic Filament Formation",
                "Airborne Stylus Guide",
                "Mirror Symmetrical Fabric Folding"
            ],
            "materials": [
                {"name": "Cold-Pressed Castor Oil", "local_name": "Arandi ka Tel", "purpose": "Viscous natural drying oil boiled 48 hours to form polymeric rogan paste", "is_natural": True},
                {"name": "Mineral and Earth Pigments", "local_name": "Rang Pathar", "purpose": "Powdered natural minerals giving vibrant ochre, yellow, white and red hues", "is_natural": True},
                {"name": "Brass Stylus", "local_name": "Kalam", "purpose": "6-inch blunt brass rod used to stretch and guide the pigment thread", "is_natural": False}
            ],
            "process_stages": [
                {"stage_number": 1, "title": "48-Hour Castor Oil Boiling", "description": "Castor seed oil is heated outdoors continuously for two days until volatile fractions evaporate.", "materials_used": ["Castor Oil", "Wood Fire"]},
                {"stage_number": 2, "title": "Water Quenching", "description": "The boiled resin is plunged into cold water to freeze the gelatinous consistency.", "materials_used": ["Boiled Rogan", "Cold Water"]},
                {"stage_number": 3, "title": "Stone Slab Pigment Grinding", "description": "Lumps of rogan are ground on flat stones with powdered mineral pigments.", "materials_used": ["Mineral Pigments", "Stone Slab"]},
                {"stage_number": 4, "title": "Palm Warming & Thread Pulling", "description": "A marble-sized lump of colored rogan is kneaded in the left palm; body heat softens paste into elastic thread.", "materials_used": ["Artisan Palm Heat", "Brass Stylus"]},
                {"stage_number": 5, "title": "Airborne Stylus Drawing", "description": "The artisan guides the trailing thread of paste with the stylus floating millimeters above the cloth.", "materials_used": ["Brass Stylus", "Fabric"]},
                {"stage_number": 6, "title": "Mirror Symmetry Folding", "description": "The fabric is folded along center line to print an identical mirror image onto the blank half.", "materials_used": ["Fabric Pressure"]}
            ],
            "video_url": "https://assets.mixkit.co/videos/preview/mixkit-craftsman-sculpting-a-clay-vase-on-a-potters-wheel-43360-large.mp4",
            "video_poster": "/images/heritage/workshop_rogan.jpg",
            "video_duration": "4:10",
            "video_title": "Thread of Oil: Padma Shri Abdul Gafur Khatri Demonstrates Rogan",
            "video_bookmarks": [
                {"timestamp": "0:15", "label": "Castor Gelatinization", "desc": "Boiled paste resting in water containers"},
                {"timestamp": "1:10", "label": "Palm Friction", "desc": "Body heat stretching color into fine filament"},
                {"timestamp": "2:20", "label": "Airborne Stylus Guide", "desc": "Drawing Tree of Life without touching fabric"},
                {"timestamp": "3:30", "label": "Mirror Folding", "desc": "Symmetrical fabric pressing"}
            ],
            "hero_image": "/images/heritage/artisan_rogan.jpg",
            "gallery_images": [
                "/images/heritage/artisan_rogan.jpg",
                "/images/heritage/workshop_rogan.jpg"
            ],
            "visibility": "public",
            "review_status": "curator_reviewed",
            "data_label": "Verified demo record",
            "created_at": "2026-08-10T09:00:00Z",
            "last_reviewed_at": "2026-10-05T12:00:00Z",
            "source_ids": ["src-rogan-1"],
            "claim_ids": ["clm-4"],
            "associated_artisan_ids": ["art-3"]
        }

        self.crafts["dhokra-casting"] = {
            "id": "dhokra-casting",
            "slug": "dhokra-casting",
            "name": "Bastar Dhokra Lost-Wax Metal Casting",
            "alternate_names": ["Ghadwa Metal Craft", "Dhokra Bell Metal", "Dokra Shilp"],
            "category": "Ancient Metal Casting",
            "zone": "Central",
            "gi_tag": "Bastar Dhokra GI No. 83",
            "heritage_era": "4,000+ Years (Harappan Bronze Age)",
            "region_claim": "Bastar & Kondagaon, Chhattisgarh",
            "region_basis": "GI Registry No. 83 & Archaeological Survey of India Monographs",
            "state": "Chhattisgarh",
            "summary": "An ancient 4,000-year-old non-ferrous bell metal casting technique dating directly back to the Indus Valley Dancing Girl, using clay core molds, hand-wound natural beeswax coils, and lost-wax crucible firing.",
            "cultural_context": "Practiced by the Ghadwa tribal community of Bastar to sculpt ceremonial lamps (diyas), elephant idols, and tribal folk deities (Danteshwari Devi). Each piece is unique because the mold is broken upon retrieval.",
            "techniques": [
                "Clay Anthill Core Sculpting",
                "Pure Beeswax Thread Coil Extrusion",
                "Channeled Crucible Firing (Cire Perdue)",
                "Porous Earth Smelting"
            ],
            "materials": [
                {"name": "Anthill Clay & Rice Husk", "local_name": "Matti", "purpose": "Porous thermal core and outer jacket mold", "is_natural": True},
                {"name": "Natural Beeswax & Resin", "local_name": "Moum", "purpose": "Pliable hand-rolled threads for detailed figurative sculpting", "is_natural": True},
                {"name": "Bell Metal / Brass Alloy", "local_name": "Pital / Kansa", "purpose": "Resonant non-ferrous copper-tin-zinc alloy", "is_natural": False}
            ],
            "process_stages": [
                {"stage_number": 1, "title": "Anthill Clay Core Modeling", "description": "Clay mixed with cow dung and rice husk is sculpted into the rough core armature and sun-dried.", "materials_used": ["Clay", "Rice Husk"]},
                {"stage_number": 2, "title": "Beeswax Coil Extrusion", "description": "Beeswax blended with dammar tree resin is squeezed through wooden presses into thin spaghetti-like coils.", "materials_used": ["Beeswax", "Dammar Resin"]},
                {"stage_number": 3, "title": "Detailed Surface Wrapping", "description": "The wax thread is wrapped snugly around the dry clay core to sculpt intricate geometric patterns, faces, and jewelry.", "materials_used": ["Wax Threads", "Sculpting Knife"]},
                {"stage_number": 4, "title": "Secondary Clay Jacket Application", "description": "Layers of fine river silt and clay jacket the wax model, leaving channels and a crucible funnel at the top.", "materials_used": ["River Silt", "Binding Clay"]},
                {"stage_number": 5, "title": "Porous Pit Furnace Firing", "description": "The mold is baked in open charcoal pits; wax melts and drains out (cire perdue), while molten brass fills the exact void.", "materials_used": ["Molten Brass", "Charcoal"]},
                {"stage_number": 6, "title": "Mold Breaking & Hand Chasing", "description": "The outer clay jacket is broken off to reveal the raw bronze cast, which is wire-brushed and buffed to an antique golden sheen.", "materials_used": ["Steel Chisels", "Wire Brush"]}
            ],
            "video_url": "https://www.youtube-nocookie.com/embed/GxzPmYR5beY",
            "youtube_id": "GxzPmYR5beY",
            "video_poster": "/images/heritage/workshop_dhokra.jpg",
            "video_duration": "4:50",
            "video_title": "4,000 Years in Molten Bronze: The Bastar Dhokra Metalcasters",
            "video_bookmarks": [
                {"timestamp": "0:25", "label": "Beeswax Extrusion", "desc": "Pressing tree-resin wax coils"},
                {"timestamp": "1:40", "label": "Wrapping Clay Core", "desc": "Figurative tribal deity sculpting"},
                {"timestamp": "3:00", "label": "Crucible Pit Smelting", "desc": "Lost wax burning out under red heat"},
                {"timestamp": "4:15", "label": "Breaking the Mold", "desc": "Revealing the one-of-a-kind brass totem"}
            ],
            "hero_image": "/images/heritage/craft_dhokra_elephant.jpg",
            "gallery_images": [
                "/images/heritage/craft_dhokra_elephant.jpg",
                "/images/heritage/craft_dhokra_diya.jpg",
                "/images/heritage/artisan_dhokra.jpg"
            ],
            "visibility": "public",
            "review_status": "curator_reviewed",
            "data_label": "Verified demo record",
            "created_at": "2026-08-15T10:00:00Z",
            "last_reviewed_at": "2026-10-22T15:00:00Z",
            "source_ids": ["src-dhokra-1"],
            "claim_ids": ["clm-5"],
            "associated_artisan_ids": ["art-4"]
        }

        self.crafts["thanjavur-painting"] = {
            "id": "thanjavur-painting",
            "slug": "thanjavur-painting",
            "name": "Thanjavur Sacred Gold Foil Painting",
            "alternate_names": ["Tanjore Art", "Thanjavur Oviyam", "Palagai Padam"],
            "category": "Embossed Gold Foil Painting",
            "zone": "South",
            "gi_tag": "GI Registry No. 24",
            "heritage_era": "16th Century (Nayaka & Maratha Rulers)",
            "region_claim": "Thanjavur District, Tamil Nadu",
            "region_basis": "GI Registration No. 24 & Saraswathi Mahal Library Imperial Records",
            "state": "Tamil Nadu",
            "summary": "A classical South Indian painting tradition distinguished by 22-carat pure gold leaf relief (gesso) work, semi-precious Jaipur gemstones, and rich temple iconography executed on seasoned teakwood boards.",
            "cultural_context": "Flourished under the patronage of Thanjavur Maratha king Serfoji II and Nayaka rulers to adorn home shrines and royal puja halls with radiant devotional deities.",
            "techniques": [
                "Palagai Wooden Board Seasoning",
                "Sukka Limestone Relief Embossing",
                "22K Pure Gold Foil Pressing",
                "Natural Gum Gemstone Encrusting"
            ],
            "materials": [
                {"name": "Seasoned Teakwood (Palagai)", "local_name": "Teak Wood", "purpose": "Warp-free wooden plank foundation covered in cotton fabric", "is_natural": True},
                {"name": "22-Carat Pure Gold Foil", "local_name": "Thanga Thagadu", "purpose": "Tissue-thin gold leaf that never tarnishes over centuries", "is_natural": True},
                {"name": "Chalk Powder & Tamarind Paste", "local_name": "Sukka Gesso", "purpose": "Pliable paste creating 3D architectural relief pillars and halos", "is_natural": True}
            ],
            "process_stages": [
                {"stage_number": 1, "title": "Board Framing & Cotton Gluing", "description": "Teakwood board is covered with unbleached cotton cloth using tamarind seed paste adhesive.", "materials_used": ["Teakwood", "Cotton Cloth", "Tamarind Paste"]},
                {"stage_number": 2, "title": "Chalk Gesso Grounding", "description": "Layers of uncalcined chalk (sukka) mixed with gum arabic are smoothed over the surface.", "materials_used": ["Chalk Powder", "Gum Arabic"]},
                {"stage_number": 3, "title": "Relief Gesso Carving", "description": "Ornate temple arches, royal crowns, and jewelry are built up in raised three-dimensional relief.", "materials_used": ["Sukka Gesso", "Sculpting Brushes"]},
                {"stage_number": 4, "title": "Gemstone Insetting", "description": "Faceted semi-precious Jaipur stones and glass pearls are set directly into the wet gesso paste.", "materials_used": ["Semi-precious Gems", "Glass Beads"]},
                {"stage_number": 5, "title": "22K Gold Foil Laying", "description": "Fine 22-carat gold foil sheets are gently pressed over the relief work and burnished with agate stones.", "materials_used": ["22K Gold Foil", "Agate Burnisher"]},
                {"stage_number": 6, "title": "Natural Pigment Painting", "description": "The figures and garments are painted with rich devotional hues, framing the glowing gold core.", "materials_used": ["Natural Tempera", "Sable Brushes"]}
            ],
            "video_url": "https://www.youtube-nocookie.com/embed/NMFaPZAFgUU",
            "youtube_id": "NMFaPZAFgUU",
            "video_poster": "/images/heritage/craft_thanjavur.png",
            "video_duration": "4:30",
            "video_title": "Gold of the Cholas: Master Craftsmen at Saraswathi Mahal",
            "video_bookmarks": [
                {"timestamp": "0:30", "label": "Teak Board Seasoning", "desc": "Cotton cloth pasted with tamarind seed glue"},
                {"timestamp": "1:30", "label": "Sukka Gesso Relief", "desc": "Sculpting 3D arches and jewelry"},
                {"timestamp": "2:45", "label": "Gemstone Encrusting", "desc": "Setting semi-precious Jaipur stones"},
                {"timestamp": "3:50", "label": "22K Gold Burnishing", "desc": "Applying pure gold foil sheets"}
            ],
            "hero_image": "/images/heritage/craft_thanjavur.png",
            "gallery_images": [
                "/images/heritage/craft_thanjavur.png",
                "/images/heritage/arch_brihadisvara.jpg"
            ],
            "visibility": "public",
            "review_status": "curator_reviewed",
            "data_label": "Verified demo record",
            "created_at": "2026-08-20T10:00:00Z",
            "last_reviewed_at": "2026-09-25T11:00:00Z",
            "source_ids": ["src-thanjavur-1"],
            "claim_ids": ["clm-6"],
            "associated_artisan_ids": ["art-2"]
        }

        self.crafts["madhubani-painting"] = {
            "id": "madhubani-painting",
            "slug": "madhubani-painting",
            "name": "Madhubani (Mithila) Folk Painting",
            "alternate_names": ["Mithila Art", "Madhubani Chitrakala", "Kohbar Painting"],
            "category": "Indigenous Folk Painting",
            "zone": "East",
            "gi_tag": "GI Registry No. 105",
            "heritage_era": "Centuries-old Domestic Living Art",
            "region_claim": "Madhubani & Darbhanga Districts, Bihar",
            "region_basis": "GI Registration No. 105 & IGNCA Folk Archives",
            "state": "Bihar",
            "summary": "An ancient ritual folk art practiced by the women of the Mithila region, characterized by two-dimensional line work, cross-hatching, and pure plant dyes drawn with bamboo sticks and cotton rags.",
            "cultural_context": "Created during domestic festivals and weddings to decorate bridal chambers (Kohbar ghar) with cosmic fertility symbols, lotus ponds, and Radha-Krishna epics.",
            "techniques": [
                "Bharni (Vibrant Color Fill)",
                "Kachni (Delicate Monochrome Line Hatching)",
                "Godna (Tribal Tattoo Motifs)",
                "Bamboo Nib Direct Application"
            ],
            "materials": [
                {"name": "Handmade Paper / Cloth Primed with Cow Dung", "local_name": "Gobar Ka Lep", "purpose": "Antiseptic protective surface providing soft earthy ochre ground", "is_natural": True},
                {"name": "Lamp Soot Black", "local_name": "Kajal", "purpose": "Indelible jet black for fine contour lines", "is_natural": True},
                {"name": "Turmeric & Pomegranate Yellow", "local_name": "Haldi", "purpose": "Vibrant sacred yellow botanical dye", "is_natural": True}
            ],
            "process_stages": [
                {"stage_number": 1, "title": "Cow Dung Surface Priming", "description": "Handmade paper is washed in a light cow dung and river silt slurry to create a warm traditional base.", "materials_used": ["Cow Dung", "River Silt"]},
                {"stage_number": 2, "title": "Bamboo Stylus Crafting", "description": "Bamboo slivers are sharpened to fine nibs, and cotton wool is tied to act as an ink reservoir.", "materials_used": ["Bamboo Twigs", "Cotton Wool"]},
                {"stage_number": 3, "title": "Lamp Soot Double Outlining", "description": "Sacred motifs (Lotus, Sun, Fish, Deities) are traced in continuous double black lines without prior pencil sketch.", "materials_used": ["Lamp Black (Kajal)"]},
                {"stage_number": 4, "title": "Kachni Line Hatching", "description": "Geometric cross-hatching and diagonal fine lines fill the spaces with rhythmic visual texture.", "materials_used": ["Bamboo Nib", "Black Ink"]},
                {"stage_number": 5, "title": "Botanical Pigment Filling", "description": "Colors extracted from Aparajita flowers (blue), madder (red), and palash (orange) fill garments.", "materials_used": ["Flower Extracts", "Gum Arabic"]},
                {"stage_number": 6, "title": "Border Ornamentation", "description": "Elaborate repeating borders of fish, parrots, and sacred creepers complete the composition.", "materials_used": ["Natural Inks"]}
            ],
            "video_url": "https://www.youtube-nocookie.com/embed/HXeb5C8PXvE",
            "youtube_id": "HXeb5C8PXvE",
            "video_poster": "/images/heritage/workshop_madhubani.jpg",
            "video_duration": "4:20",
            "video_title": "Voices of Jitwarpur: Padma Shri Baua Devi and the Living Mithila Lines",
            "video_bookmarks": [
                {"timestamp": "0:20", "label": "Gobar Wash", "desc": "Earthy priming of handmade sheets"},
                {"timestamp": "1:15", "label": "Bamboo Nib Inking", "desc": "Double lines of sacred Kohbar motifs"},
                {"timestamp": "2:40", "label": "Plant Color Boiling", "desc": "Extracting turmeric and palash pigments"},
                {"timestamp": "3:45", "label": "Kachni Hatching", "desc": "Intricate cross-hatching texture"}
            ],
            "hero_image": "/images/heritage/craft_madhubani.jpg",
            "gallery_images": [
                "/images/heritage/craft_madhubani.jpg",
                "/images/heritage/artisan_madhubani.jpg",
                "/images/heritage/workshop_madhubani.jpg"
            ],
            "visibility": "public",
            "review_status": "curator_reviewed",
            "data_label": "Verified demo record",
            "created_at": "2026-08-25T10:00:00Z",
            "last_reviewed_at": "2026-10-10T14:00:00Z",
            "source_ids": ["src-madhubani-1"],
            "claim_ids": ["clm-7"],
            "associated_artisan_ids": ["art-5"]
        }

        self.crafts["kashmir-pashmina"] = {
            "id": "kashmir-pashmina",
            "slug": "kashmir-pashmina",
            "name": "Kashmir Pashmina Handloom Weaving",
            "alternate_names": ["Cashmere Pashmina", "Kani Shawl", "Kashmir Pashm Weave"],
            "category": "Fine Handwoven Wool Textile",
            "zone": "North",
            "gi_tag": "GI Registry No. 46",
            "heritage_era": "15th Century (Sultan Zain-ul-Abidin)",
            "region_claim": "Srinagar & Budgam, Jammu & Kashmir",
            "region_basis": "GI Registration No. 46 & Craft Development Institute Srinagar Standards",
            "state": "Jammu & Kashmir",
            "summary": "The world-renowned fine wool textile hand-spun from the ultra-fine 12–14 micron underfleece of Changthangi goats living at 14,000 feet in Ladakh, woven on traditional Kashmiri wooden looms.",
            "cultural_context": "Patronized by Mughal emperors and Persian weavers invited by Sultan Zain-ul-Abidin. Celebrated for paisley (kalka/badam) motifs and featherweight softness.",
            "techniques": [
                "Yender Charkha Hand Spinning",
                "Saaz Wooden Loom Hand Weaving",
                "Kani Wooden Eyeless Bobbin Weaving",
                "Natural Spring Water Washing"
            ],
            "materials": [
                {"name": "Raw Changthangi Pashm Fleece", "local_name": "Pashm Raw", "purpose": "12-14 micron underfleece combed from high altitude mountain goats", "is_natural": True},
                {"name": "Rice Starch Glue", "local_name": "Maya", "purpose": "Strengthens delicate handspun warp yarns during loom setting", "is_natural": True}
            ],
            "process_stages": [
                {"stage_number": 1, "title": "Combing & Dehairing", "description": "Raw fleece is gently combed by hand to separate downy pashm from coarse guard hairs.", "materials_used": ["Raw Pashm"]},
                {"stage_number": 2, "title": "Yender Charkha Hand Spinning", "description": "Kashmiri women spin ultra-fine yarns on traditional wooden charkhas (Yender) with finger friction.", "materials_used": ["Wooden Charkha", "Pashm"]},
                {"stage_number": 3, "title": "Warp Starching (Maya)", "description": "Delicate yarn hanks are soaked in boiled rice starch (maya) and brushed with wild thistles to align fibers.", "materials_used": ["Rice Starch", "Wild Thistles"]},
                {"stage_number": 4, "title": "Saaz Loom Mounting", "description": "The starched warp is mounted onto traditional four-pedal wooden looms in historic Srinagar workshops.", "materials_used": ["Wooden Saaz Loom"]},
                {"stage_number": 5, "title": "Kani Bobbin Weaving", "description": "Eyeless wooden needles (tujis) interlock colored weft threads into complex floral patterns guided by encoded manuscripts (Talim).", "materials_used": ["Kani Tujis", "Silk Yarn"]},
                {"stage_number": 6, "title": "Spring Water Purifying & Softening", "description": "The woven shawl is washed in clean Kashmiri spring water with natural soap nuts (reetha) to bloom the softness.", "materials_used": ["Spring Water", "Soap Nuts"]}
            ],
            "video_url": "https://www.youtube-nocookie.com/embed/NMFaPZAFgUU",
            "youtube_id": "NMFaPZAFgUU",
            "video_poster": "/images/heritage/artisan_pashmina.jpg",
            "video_duration": "5:30",
            "video_title": "Gold of the Himalayas: Hand-Spun Pashmina Weaving in Old Srinagar",
            "video_bookmarks": [
                {"timestamp": "0:30", "label": "Changthang Fleece", "desc": "12-micron undercoat sorting"},
                {"timestamp": "1:50", "label": "Yender Charkha", "desc": "Hand-spinning by master craftswomen"},
                {"timestamp": "3:15", "label": "Kani Weaving", "desc": "Talim script guided wooden bobbins"},
                {"timestamp": "4:45", "label": "Spring Water Wash", "desc": "Soapnut washing in Dal spring waters"}
            ],
            "hero_image": "/images/heritage/craft_pashmina_shawl.jpg",
            "gallery_images": [
                "/images/heritage/craft_pashmina_shawl.jpg",
                "/images/heritage/artisan_pashmina.jpg"
            ],
            "visibility": "public",
            "review_status": "curator_reviewed",
            "data_label": "Verified demo record",
            "created_at": "2026-09-01T10:00:00Z",
            "last_reviewed_at": "2026-09-18T16:00:00Z",
            "source_ids": ["src-pashmina-1"],
            "claim_ids": ["clm-8"],
            "associated_artisan_ids": ["art-1"]
        }

        # 5. ORAL STORIES (VOICES OF TRADITION)
        stories_list = [
            {
                "id": "sty-1",
                "craft_id": "bidriware",
                "craft_name": "Bidriware Metal Inlay",
                "contributor_id": "art-1",
                "contributor_name": "Shah Rashid Ahmed Qadri",
                "artisan_role": "Padma Shri & Master Craftsman",
                "language": "Hindi / Urdu",
                "audio_path": "/audio/samples/bidriware_rashid_qadri.mp3",
                "duration_seconds": 185,
                "transcript": "हमारे बिदर किले की जो मिट्टी है, वह कोई मामूली मिट्टी नहीं है। जब सूरज की रोशनी उस मिट्टी पर सदियों से नहीं पड़ी होती, तब उसमें वह तासीर आती है। जब हम जस्ते के बर्तन पर शुद्ध चांदी की तार ठोकते हैं और फिर गर्म मिट्टी का लेप लगाते हैं, तो अल्लाह की कुदरत देखिए—जस्ता कोयले जैसा काला हो जाता है और चांदी सूरज जैसी चमक उठती है। इस हुनर में कोई मशीन नहीं चल सकती, सिर्फ हाथों का सब्र चलता है।",
                "translation": "The soil from our Bidar Fort is no ordinary soil. When sunlight hasn't touched it for centuries in the underground ruins, it gains a special medicinal and chemical virtue. When we hammer pure silver wire into zinc and apply the warm soil paste, look at the miracle of craft—the zinc turns jet black like coal, while the silver shines bright like the morning sun. No machine can replicate this patience; it lives only in the hands.",
                "summary": "Master Rashid Qadri explains the secret metallurgical chemistry of Bidar Fort underground soil and how pure silver wire (tarkashi) resists oxidation while zinc turns velvet black.",
                "visibility": "public",
                "review_status": "published",
                "created_at": "2026-09-15T15:30:00Z"
            },
            {
                "id": "sty-2",
                "craft_id": "kalamkari-srikalahasti",
                "craft_name": "Srikalahasti Kalamkari",
                "contributor_id": "art-2",
                "contributor_name": "Jonnalagadda Niranjan",
                "artisan_role": "Master Chitrakar",
                "language": "Telugu",
                "audio_path": "/audio/samples/kalamkari_niranjan.mp3",
                "duration_seconds": 210,
                "transcript": "స్వర్ణముఖి నది నీరు లేకుండా మా కలంకారీ బతకలేదు. నదిలో ఉండే సహజ సున్నం, ఇసుక గుణాలు రంగులను వస్త్రంలోకి శాశ్వతంగా ఇంకేలా చేస్తాయి. ఆవు పాలు కాదు, గేదె పాలలో మాత్రమే అధిక కొవ్వు ఉంటుంది కాబట్టి, ఆ పాలతో వస్త్రాన్ని శుద్ధి చేస్తేనే సహజ రంగులు ఒక గీత దాటి ఇంకో గీతలోకి వ్యాపించవు. ఇది వ్యాపారం కాదు, పరమశివుడికి సమర్పించే చిత్ర సేవ.",
                "translation": "Our Kalamkari cannot breathe without the flowing waters of the Swarnamukhi River. The natural minerals and fine river sand permanently bond the herbal dyes into the cotton warp and weft. We specifically use buffalo milk rather than cow milk because its dense fat content forms an impermeable barrier, preventing the vegetable dyes from bleeding outside the hand-drawn outlines. This is an offering of sacred visual narrative to the Divine.",
                "summary": "Master Chitrakar Niranjan articulates the vital ecological link between the Swarnamukhi River and buffalo milk fat resist techniques that enable crisp botanical lines.",
                "visibility": "public",
                "review_status": "published",
                "created_at": "2026-09-20T11:45:00Z"
            },
            {
                "id": "sty-3",
                "craft_id": "rogan-art",
                "craft_name": "Rogan Art of Kutch",
                "contributor_id": "art-3",
                "contributor_name": "Abdul Gafur Khatri",
                "artisan_role": "Padma Shri Living Heritage Keeper",
                "language": "Gujarati / Hindi",
                "audio_path": "/audio/samples/rogan_gafur_khatri.mp3",
                "duration_seconds": 240,
                "transcript": "निरोना में हमारा परिवार पिछले 300 साल से इस कला को सीने से लगाए बैठा है। जब अरंडी का तेल दो दिन तक चूल्हे पर खौलता है, तो उसकी महक से पूरा गांव जान जाता है कि रोगन तैयार हो रहा है। मेरी हथेली पर जब रंगीन रोगन आता है, तो कलम कभी कपड़े को नहीं छूती। हवा में ही धागा बनता है, और आधा कपड़ा मोड़कर जब हम दबाते हैं, तो पूरा ब्रह्मांड जैसा 'ट्री ऑफ लाइफ' दोनों तरफ खिल जाता है।",
                "translation": "For eight generations and over 300 years, our family in Nirona held onto this art when everyone else abandoned it. When castor oil boils for two straight days on open firewood, the rich aroma alerts the entire village that rogan is being born. When the warm colored paste sits in my palm, the brass stylus never touches the fabric. The thread is guided through mid-air, and when we fold the fabric in half and press gently, the Tree of Life blooms across both halves in perfect mirror symmetry.",
                "summary": "Padma Shri Abdul Gafur Khatri reflects on preserving Rogan art through family resilience, detailing the aerial physics of the brass stylus and the iconic mirror-fold Tree of Life motif.",
                "visibility": "public",
                "review_status": "published",
                "created_at": "2026-09-25T17:15:00Z"
            },
            {
                "id": "sty-4",
                "craft_id": "dhokra-casting",
                "craft_name": "Bastar Dhokra Lost-Wax Metal Casting",
                "contributor_id": "art-4",
                "contributor_name": "Suresh Jhare",
                "artisan_role": "Master Ghadwa Metalcaster",
                "language": "Hindi / Halbi",
                "audio_path": "/audio/samples/dhokra_bastar.mp3",
                "duration_seconds": 195,
                "transcript": "बस्तर के जंगलों में हमारी कला मिट्टी और मधुमक्खी के मोम से जन्म लेती है। हम हर मूर्ति के लिए अलग सांचा बनाते हैं। जब भट्टी में पीतल पिघलकर मोम की जगह ले लेता है, तो सांचा तोड़ना पड़ता है। इसलिए दुनिया में हमारी बनाई कोई भी दो मूर्तियां कभी एक जैसी नहीं हो सकतीं। यह दंतेश्वरी माई का आशीर्वाद है।",
                "translation": "In the forests of Bastar, our art is born from anthill clay and beeswax. We make a new mold for every single idol. When molten brass replaces the wax in the pit furnace, the mold must be broken to retrieve the bronze. That is why no two Dhokra statues in the world can ever be identical. It is the living blessing of Goddess Danteshwari.",
                "summary": "Master Ghadwa caster Suresh Jhare recounts the philosophy of non-replicable lost-wax casting and tribal metallurgy in the Bastar forest cluster.",
                "visibility": "public",
                "review_status": "published",
                "created_at": "2026-10-02T12:00:00Z"
            }
        ]
        for st in stories_list:
            self.stories[st["id"]] = st

        # 6. PRODUCTS (ARTISAN STORY CARDS — ALL INR)
        products_list = [
            {
                "id": "prod-1",
                "artisan_id": "art-1",
                "artisan_name": "Shah Rashid Ahmed Qadri",
                "craft_id": "bidriware",
                "craft_name": "Bidriware Metal Inlay",
                "title": "Imperial Floral Aftaba with Fine Silver Tarkashi Inlay",
                "description": "Hand-cast traditional water vessel (Aftaba) created from zinc-copper alloy, hand-chiseled with Persian poppy motifs, inlaid with 99.9% pure silver wire, and patinated using Bidar Fort soil.",
                "cultural_story": "Inspired by 16th-century Deccan court ceremonial vessels used during Bahmani imperial banquets. Every silver wire is hand-tapped cold without artificial adhesives.",
                "price_inr": 18500,
                "image_url": "/images/heritage/craft_bidriware_aftaba.jpg",
                "status": "published",
                "zone": "South India",
                "category": "Metalware",
                "materials": ["Zinc-Copper Alloy (16:1)", "99.9% Pure Silver Wire", "Bidar Fort Soil Patina"],
                "dimensions": "14 inches height, 5.5 inches base diameter",
                "weight": "1.8 kg",
                "crafting_days": 24,
                "gi_tag": "GI Registry No. 17 (Bidriware)",
                "artisan_location": "Bidar, Karnataka",
                "artisan_avatar": "/images/heritage/artisan_bidriware.jpg",
                "in_stock": True,
                "stock_quantity": 4,
                "whatsapp_number": "+919845017234",
                "images": [
                    "/images/heritage/craft_bidriware_aftaba.jpg",
                    "/images/heritage/workshop_bidriware.jpg"
                ],
                "created_at": "2026-10-01T10:00:00Z"
            },
            {
                "id": "prod-2",
                "artisan_id": "art-2",
                "artisan_name": "Jonnalagadda Niranjan",
                "craft_id": "kalamkari-srikalahasti",
                "craft_name": "Srikalahasti Kalamkari",
                "title": "Vriksha-Shiva Sacred Tree of Life Narrative Hanging",
                "description": "Authentic hand-drawn temple hanging depicting sacred flora and fauna. Created with bamboo reed pen, Kasim fermented black ink, and natural madder root red on river-washed cotton.",
                "cultural_story": "Created over 45 days along the Swarnamukhi riverbank. Mordanted with pure buffalo milk to fix natural plant pigments without synthetic chemical bleed.",
                "price_inr": 24000,
                "image_url": "/images/heritage/craft_kalamkari.jpg",
                "status": "published",
                "zone": "South India",
                "category": "Textiles & Handloom",
                "materials": ["Handspun Khadi Cotton", "Buffalo Milk Mordant", "Madder Root", "Fermented Jaggery Ink"],
                "dimensions": "48 x 36 inches wall hanging",
                "weight": "0.45 kg",
                "crafting_days": 45,
                "gi_tag": "GI Registry No. 28 (Srikalahasti Kalamkari)",
                "artisan_location": "Srikalahasti, Tirupati, Andhra Pradesh",
                "artisan_avatar": "/images/heritage/artisan_kalamkari.jpg",
                "in_stock": True,
                "stock_quantity": 2,
                "whatsapp_number": "+919876543210",
                "images": [
                    "/images/heritage/craft_kalamkari.jpg",
                    "/images/heritage/workshop_kalamkari.jpg"
                ],
                "created_at": "2026-10-05T12:00:00Z"
            },
            {
                "id": "prod-3",
                "artisan_id": "art-3",
                "artisan_name": "Abdul Gafur Khatri",
                "craft_id": "rogan-art",
                "craft_name": "Rogan Art of Kutch",
                "title": "Master Rogan 'Tree of Life' Symmetrical Stole on Raw Silk",
                "description": "Museum-grade hand-painted raw silk textile featuring the iconic Rogan Tree of Life. Painted with boiled castor oil pigment using an airborne brass stylus and mirror-folded.",
                "cultural_story": "Painted using 48-hour cured castor seed paste and natural mineral ochre. The brass stylus never touched the cloth; the entire intricate lattice was drawn in suspended motion.",
                "price_inr": 32000,
                "image_url": "/images/heritage/artisan_rogan.jpg",
                "status": "published",
                "zone": "West India",
                "category": "Textiles & Handloom",
                "materials": ["Pure Raw Bhagalpuri Silk", "Boiled Castor Oil (Rogan)", "Natural Mineral Pigments"],
                "dimensions": "78 x 28 inches stole / dupatta",
                "weight": "0.22 kg",
                "crafting_days": 30,
                "gi_tag": "GI Registry Application (Rogan Craft of Nirona)",
                "artisan_location": "Nirona, Kutch, Gujarat",
                "artisan_avatar": "/images/heritage/artisan_rogan.jpg",
                "in_stock": True,
                "stock_quantity": 3,
                "whatsapp_number": "+919428765432",
                "images": [
                    "/images/heritage/artisan_rogan.jpg",
                    "/images/heritage/workshop_rogan.jpg"
                ],
                "created_at": "2026-10-10T15:00:00Z"
            },
            {
                "id": "prod-4",
                "artisan_id": "art-4",
                "artisan_name": "Suresh Jhare & Clan",
                "craft_id": "dhokra-casting",
                "craft_name": "Bastar Dhokra Lost-Wax Metal Casting",
                "title": "Ghadwa Danteshwari Ceremonial Lamp Elephant (Aanai Diya)",
                "description": "Traditional Bastar bell metal elephant carrying ritual oil cups, crafted using non-repeating beeswax coils and river anthill clay molds.",
                "cultural_story": "Cast in the open charcoal furnaces of Bastar. The mold was broken to free the bronze, making this specific sculpture unique in the world.",
                "price_inr": 14500,
                "image_url": "/images/heritage/craft_dhokra_diya.jpg",
                "status": "published",
                "zone": "Central India",
                "category": "Sculptures & Statues",
                "materials": ["Bronze & Bell Metal Alloy", "Wild Forest Beeswax", "Anthill Clay"],
                "dimensions": "10 x 8 x 5 inches ceremonial lamp",
                "weight": "2.4 kg",
                "crafting_days": 18,
                "gi_tag": "GI Registry No. 83 (Bastar Dhokra)",
                "artisan_location": "Kondagaon, Bastar, Chhattisgarh",
                "artisan_avatar": "/images/heritage/artisan_dhokra.jpg",
                "in_stock": True,
                "stock_quantity": 5,
                "whatsapp_number": "+919754321987",
                "images": [
                    "/images/heritage/craft_dhokra_diya.jpg",
                    "/images/heritage/craft_dhokra_elephant.jpg"
                ],
                "created_at": "2026-10-12T11:00:00Z"
            },
            {
                "id": "prod-5",
                "artisan_id": "art-5",
                "artisan_name": "R. Ramanathan (Shilp Guru Lineage)",
                "craft_id": "thanjavur-painting",
                "craft_name": "Thanjavur Sacred Gold Leaf Painting",
                "title": "Yashoda Krishna with 22K Gold Foil & Semi-Precious Gems",
                "description": "Classical Thanjavur sacred portrait of Child Krishna receiving butter, adorned with 22-carat pure gold leaf foil, limestone chalk relief gesso, and Jaipur cut gems on jackwood board.",
                "cultural_story": "Carried out according to Chola and Maratha court sastras. Gold leaf is cold-embossed over tamarind seed gum gesso paste, guaranteed to never tarnish over generations.",
                "price_inr": 28000,
                "image_url": "/images/heritage/craft_thanjavur.png",
                "status": "published",
                "zone": "South India",
                "category": "Traditional Art & Paintings",
                "materials": ["22K Pure Gold Foil", "Seasoned Jackfruit Wood", "Uncut Jaipur Gems", "Limestone Gesso"],
                "dimensions": "20 x 16 inches framed artwork",
                "weight": "3.1 kg",
                "crafting_days": 28,
                "gi_tag": "GI Registry No. 24 (Thanjavur Paintings)",
                "artisan_location": "Thanjavur, Tamil Nadu",
                "artisan_avatar": "/images/heritage/artisan_kalamkari.jpg",
                "in_stock": True,
                "stock_quantity": 2,
                "whatsapp_number": "+919841234567",
                "images": [
                    "/images/heritage/craft_thanjavur.png",
                    "/images/heritage/arch_brihadisvara.jpg"
                ],
                "created_at": "2026-10-15T09:00:00Z"
            },
            {
                "id": "prod-6",
                "artisan_id": "art-6",
                "artisan_name": "S. K. Murugesan Weavers Collective",
                "craft_id": "kanjeevaram-silk",
                "craft_name": "Kanjeevaram Handloom Silk",
                "title": "Royal Temple Border Pure Mulberry Silk Saree with Real Silver Zari",
                "description": "Woven on traditional three-shuttle pit looms using the Korvai interlocking technique where the contrast pallu and temple border are structurally joined by hand.",
                "cultural_story": "Woven with double-warp mulberry silk filaments twisted with silver zari dipped in 24K gold solution. Takes over 240 hours of manual handloom rhythm.",
                "price_inr": 42500,
                "image_url": "/images/heritage/craft_banarasi_saree.jpg",
                "status": "published",
                "zone": "South India",
                "category": "Textiles & Handloom",
                "materials": ["100% Pure Mulberry Silk", "Silver Electroplated Zari", "Natural Cochineal & Turmeric Dyes"],
                "dimensions": "6.3 meters with matching blouse piece",
                "weight": "0.85 kg",
                "crafting_days": 25,
                "gi_tag": "GI Registry No. 1 (Kancheepuram Silk)",
                "artisan_location": "Kanchipuram, Tamil Nadu",
                "artisan_avatar": "/images/heritage/artisan_weaver.jpg",
                "in_stock": True,
                "stock_quantity": 3,
                "whatsapp_number": "+919444123987",
                "images": [
                    "/images/heritage/craft_banarasi_saree.jpg",
                    "/images/heritage/workshop_weaver.jpg"
                ],
                "created_at": "2026-10-18T14:00:00Z"
            },
            {
                "id": "prod-7",
                "artisan_id": "art-7",
                "artisan_name": "Sita Devi Guild (National Awardee)",
                "craft_id": "madhubani-painting",
                "craft_name": "Madhubani Folk Painting",
                "title": "Kohbar Wedding Chamber Ritual Mandala on Hand-Pressed Tussar",
                "description": "Authentic Mithila ritual artwork drawn with bamboo nibs and natural charcoal, soot, and marigold flower dyes depicting sacred lotuses, turtles, and fertility mandalas.",
                "cultural_story": "Traditionally painted on the nuptial mud walls of Maithil homes to bless generational union. Preserved on unbleached ahimsa silk with natural gum binders.",
                "price_inr": 16500,
                "image_url": "/images/heritage/craft_madhubani.jpg",
                "status": "published",
                "zone": "East India",
                "category": "Traditional Art & Paintings",
                "materials": ["Handwoven Tussar Silk", "Lampblack Soot", "Marigold Pigment", "Aparajita Flower Blue"],
                "dimensions": "36 x 24 inches scroll",
                "weight": "0.35 kg",
                "crafting_days": 20,
                "gi_tag": "GI Registry No. 14 (Madhubani Paintings)",
                "artisan_location": "Jitwarpur, Madhubani, Bihar",
                "artisan_avatar": "/images/heritage/artisan_madhubani.jpg",
                "in_stock": True,
                "stock_quantity": 4,
                "whatsapp_number": "+919835123456",
                "images": [
                    "/images/heritage/craft_madhubani.jpg",
                    "/images/heritage/workshop_madhubani.jpg"
                ],
                "created_at": "2026-10-20T10:00:00Z"
            },
            {
                "id": "prod-8",
                "artisan_id": "art-8",
                "artisan_name": "Kripal Kumbh Master Guild",
                "craft_id": "jaipur-blue-pottery",
                "craft_name": "Jaipur Blue Pottery",
                "title": "Low-Fire Quartz Persian Peacock Palace Vase",
                "description": "Turquoise blue glazed pottery crafted without clay, using Egyptian paste of quartz stone powder, glass cullet, and Fuller's earth, hand-painted with cobalt oxide motifs.",
                "cultural_story": "Derived from Turko-Persian glazed tile traditions brought to the Jaipur court under Maharaja Sawai Ram Singh II in the 19th century.",
                "price_inr": 6800,
                "image_url": "/images/heritage/craft_blue_pottery.jpg",
                "status": "published",
                "zone": "North India",
                "category": "Handicrafts & Pottery",
                "materials": ["Quartz Powder", "Natural Glass Cullet", "Cobalt & Copper Oxides", "Gond Borax Glaze"],
                "dimensions": "12 inches height, 6 inches diameter",
                "weight": "1.4 kg",
                "crafting_days": 12,
                "gi_tag": "GI Registry No. 54 (Blue Pottery of Jaipur)",
                "artisan_location": "Kot Jewar, Jaipur, Rajasthan",
                "artisan_avatar": "/images/heritage/pottery_wheel_india.jpg",
                "in_stock": True,
                "stock_quantity": 8,
                "whatsapp_number": "+919414012345",
                "images": [
                    "/images/heritage/craft_blue_pottery.jpg",
                    "/images/heritage/craft_blue_pottery_school.jpg"
                ],
                "created_at": "2026-10-22T11:00:00Z"
            },
            {
                "id": "prod-9",
                "artisan_id": "art-9",
                "artisan_name": "Ghulam Hassan & Sons Weavers",
                "craft_id": "kashmir-pashmina",
                "craft_name": "Kashmir Pashmina & Sozni Needlework",
                "title": "Hand-Spun Changthangi Pashmina Shawl with Fine Sozni Needle Embroidery",
                "description": "Hand-spun on wooden charkhas from sub-14-micron Changthangi goat underfleece, handwoven on pinewood looms, and embroidered with single-strand silk needlework.",
                "cultural_story": "Sourced from nomadic Changpa herders at 14,000 feet altitude in Ladakh. Passes effortlessly through a signet ring, providing ethereal warmth without synthetic bulk.",
                "price_inr": 54000,
                "image_url": "/images/heritage/craft_pashmina_shawl.jpg",
                "status": "published",
                "zone": "North India",
                "category": "Textiles & Handloom",
                "materials": ["100% Raw Ladakh Pashmina Cashmere", "Natural Walnut & Saffron Dyes", "Mulberry Silk Floss"],
                "dimensions": "80 x 40 inches full shawl",
                "weight": "0.19 kg",
                "crafting_days": 60,
                "gi_tag": "GI Registry No. 46 (Kashmir Pashmina)",
                "artisan_location": "Old City, Srinagar, Jammu & Kashmir",
                "artisan_avatar": "/images/heritage/artisan_pashmina.jpg",
                "in_stock": True,
                "stock_quantity": 2,
                "whatsapp_number": "+919906123456",
                "images": [
                    "/images/heritage/craft_pashmina_shawl.jpg",
                    "/images/heritage/artisan_pashmina.jpg"
                ],
                "created_at": "2026-10-25T16:00:00Z"
            },
            {
                "id": "prod-10",
                "artisan_id": "art-10",
                "artisan_name": "Babu Lal Artisans Craft Association",
                "craft_id": "channapatna-toys",
                "craft_name": "Channapatna Lacquer Woodcraft",
                "title": "Royal Mysore Palace Wooden Chess Set in Non-Toxic Vegetable Lac",
                "description": "Hand-turned soft Wrightia tinctoria (Aale mara) ivory wood chessmen lacquered on high-speed foot treadle lathes using heated natural lac infused with turmeric and kumkum.",
                "cultural_story": "Initiated during Tipu Sultan's reign who invited Persian wood artisans to train local craft families. Safe for children, smooth as marble, and eco-sustainable.",
                "price_inr": 4200,
                "image_url": "/images/heritage/craft_channapatna_toys.jpg",
                "status": "published",
                "zone": "South India",
                "category": "Woodcraft & Toys",
                "materials": ["Wrightia Tinctoria Ivory Wood", "Organic Lac Resin", "Turmeric & Indigo Natural Pigments"],
                "dimensions": "14 x 14 inches wooden fold board, 3.5 inches king height",
                "weight": "1.1 kg",
                "crafting_days": 8,
                "gi_tag": "GI Registry No. 23 (Channapatna Toys & Dolls)",
                "artisan_location": "Channapatna, Ramanagara, Karnataka",
                "artisan_avatar": "/images/heritage/artisan_channapatna.jpg",
                "in_stock": True,
                "stock_quantity": 12,
                "whatsapp_number": "+919886012345",
                "images": [
                    "/images/heritage/craft_channapatna_toys.jpg",
                    "/images/heritage/workshop_channapatna.jpg"
                ],
                "created_at": "2026-10-28T09:00:00Z"
            }
        ]
        for p in products_list:
            self.products[p["id"]] = p

        # 7. OPPORTUNITIES (CURATED INDIAN SCHEMES & GRANTS)
        opps_list = [
            {
                "id": "opp-1",
                "provider": "Ministry of Textiles, Government of India",
                "title": "National Master Craftsman Fellowship & Research Grant 2026-27",
                "category": "Grant",
                "description": "Direct financial stipend and documentation grant for certified master craftspersons practicing endangered or GI-registered indigenous crafts.",
                "eligible_crafts": ["Bidriware", "Kalamkari", "Rogan Art", "Dhokra", "Thanjavur Art", "Madhubani", "Pashmina"],
                "eligible_regions": ["Pan-India with preference for GI cluster artisans"],
                "source_url": "https://handicrafts.nic.in/fellowships-2026",
                "deadline": "2026-12-15",
                "grant_amount_or_stipend": "₹3,60,000 annual fellowship + ₹1,00,000 raw material grant",
                "last_checked_at": "2026-11-01",
                "status": "verified_open",
                "is_demo": True
            },
            {
                "id": "opp-2",
                "provider": "Crafts Council of India (CCI)",
                "title": "Kamaladevi Chattopadhyay National Craft Exhibition — Mumbai 2026",
                "category": "Exhibition",
                "description": "Curated annual winter craft exposition providing direct artisan stalls, fair price guarantees, and buyer-seller B2B meets.",
                "eligible_crafts": ["Traditional Metal Inlay", "Hand-painted Textiles", "Indigenous Pigment Painting", "Lost-Wax Metal Casting"],
                "eligible_regions": ["Registered state craft societies and self-help guilds across India"],
                "source_url": "https://craftscouncilofindia.org/exhibitions/kamaladevi-2026",
                "deadline": "2026-11-30",
                "grant_amount_or_stipend": "Complimentary stall + ₹15,000 travel and freight allowance",
                "last_checked_at": "2026-11-05",
                "status": "closing_soon",
                "is_demo": True
            },
            {
                "id": "opp-3",
                "provider": "TRIFED & Ministry of Tribal Affairs",
                "title": "Aadi Mahotsav National Tribal Artisan Direct Procurement Expo 2027",
                "category": "Fair",
                "description": "Direct state procurement fair connecting forest and tribal craftspeople directly to urban emporiums with immediate bank settlement.",
                "eligible_crafts": ["Dhokra Metal Casting", "Pithora Painting", "Toda Embroidery", "Gond Art"],
                "eligible_regions": ["Central, Western, and North-Eastern Tribal belts"],
                "source_url": "https://trifed.tribal.gov.in/aadi-mahotsav",
                "deadline": "2027-01-10",
                "grant_amount_or_stipend": "Full lodging, stall space + guaranteed ₹50,000 minimum procurement",
                "last_checked_at": "2026-11-04",
                "status": "verified_open",
                "is_demo": True
            }
        ]
        for op in opps_list:
            self.opportunities[op["id"]] = op

        # 8. CURATOR QUEUE
        self.curator_queue = [
            {
                "id": "sub-101",
                "craft_name": "Bidriware Metal Inlay",
                "contributor_name": "Tarkashi Women's Collective, Bidar",
                "contributor_type": "collective",
                "submission_type": "technique_update",
                "submitted_at": "2026-11-06T14:20:00Z",
                "status": "submitted",
                "contributor_provided_facts": {
                    "technique_title": "Meenakari Zari Variation in Bidri Pendants",
                    "alloy_composition": "Zinc 94%, Copper 6%",
                    "inlay_metal": "Fine Silver 99.9%",
                    "soil_origin": "Mahmood Gawan Madrasa Courtyard excavation"
                },
                "ai_suggested_draft": {
                    "standardized_name": "Bidri Meenakari Surface Chasing",
                    "historical_connection": "Matches 15th-century Barid Shahi architectural medallions",
                    "flagged_verification": "Verify if Madrasa excavation soil contains identical mineral salts to Bidar Fort ramparts."
                },
                "attached_sources": [
                    {"title": "Bidar Fort Soil Mineralogical Study", "publisher": "Geological Survey of India Bulletin 2018"}
                ],
                "consent_status": "Collective Consent Verified (12 artisan signatures)",
                "claims_to_verify": [
                    {
                        "id": "sub-clm-1",
                        "claim_text": "Mahmood Gawan Madrasa soil exhibits identical oxidation kinetics to Bidar Fort soil.",
                        "current_status": "unreviewed"
                    }
                ],
                "audio_preview_url": None
            },
            {
                "id": "sub-102",
                "craft_name": "Srikalahasti Kalamkari",
                "contributor_name": "P. Ramesh Chitrakar",
                "contributor_type": "individual_artisan",
                "submission_type": "oral_history_story",
                "submitted_at": "2026-11-07T09:15:00Z",
                "status": "under_review",
                "contributor_provided_facts": {
                    "story_title": "The Forgotten Pomegranate Rind Yellow Dye (Nasapalu)",
                    "season_harvest": "Late monsoon pomegranate rind boiled in brass",
                    "mordant_used": "Pure alum with myrobalan seed oil"
                },
                "ai_suggested_draft": {
                    "standardized_name": "Pomegranate Rind Natural Dye Chemistry",
                    "historical_connection": "Traditional yellow dye formula documented in Nayaka temple accounts",
                    "flagged_verification": "Ensure contributor attribution choice is respected as Named."
                },
                "attached_sources": [
                    {"title": "Natural Vegetable Dyes of South India", "publisher": "Crafts Council of India"}
                ],
                "consent_status": "Individual Audio Consent Confirmed",
                "claims_to_verify": [
                    {
                        "id": "sub-clm-2",
                        "claim_text": "Boiling dry pomegranate rind in brass cauldrons yields permanent sunlight-resistant lemon yellow.",
                        "current_status": "source_attached"
                    }
                ],
                "audio_preview_url": "/audio/samples/kalamkari_yellow_dye.mp3"
            }
        ]

        # 9. AUDIT EVENTS
        self.audit_events = [
            {
                "id": "aud-1",
                "actor_id": "cur-1",
                "actor_name": "Dr. Ananya Sharma (Chief Curator)",
                "entity_type": "craft_claim",
                "entity_id": "clm-1",
                "action": "status_verified",
                "before_after_summary": "Status changed from 'source_attached' to 'curator_reviewed'",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "aud-2",
                "actor_id": "cur-1",
                "actor_name": "Dr. Ananya Sharma (Chief Curator)",
                "entity_type": "craft_record",
                "entity_id": "bidriware",
                "action": "record_published",
                "before_after_summary": "Craft 'Bidriware Metal Inlay' approved for public archive publication with verified Indian sources.",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]

    # HELPER ACCESS METHODS
    def get_craft(self, craft_slug_or_id: str) -> Optional[Dict[str, Any]]:
        craft = self.crafts.get(craft_slug_or_id)
        if not craft:
            for c in self.crafts.values():
                if c.get("slug") == craft_slug_or_id:
                    craft = c
                    break
        if not craft:
            return None
        
        full_craft = dict(craft)
        full_craft["sources"] = [self.sources[sid] for sid in craft.get("source_ids", []) if sid in self.sources]
        full_craft["claims"] = [self.claims[cid] for cid in craft.get("claim_ids", []) if cid in self.claims]
        full_craft["associated_artisans"] = [self.artisans[aid] for aid in craft.get("associated_artisan_ids", []) if aid in self.artisans]
        return full_craft

    def get_all_crafts(self, category: Optional[str] = None, state: Optional[str] = None, zone: Optional[str] = None, query: Optional[str] = None) -> List[Dict[str, Any]]:
        results = []
        for c in self.crafts.values():
            if c.get("visibility") != "public":
                continue
            if category and c.get("category") != category:
                continue
            if state and c.get("state") != state:
                continue
            if zone and c.get("zone", "").lower() != zone.lower():
                continue
            if query:
                q = query.lower()
                name_match = q in c.get("name", "").lower()
                alt_match = any(q in alt.lower() for alt in c.get("alternate_names", []))
                summary_match = q in c.get("summary", "").lower()
                reg_match = q in c.get("region_claim", "").lower()
                state_match = q in c.get("state", "").lower()
                tech_match = any(q in t.lower() for t in c.get("techniques", []))
                if not (name_match or alt_match or summary_match or reg_match or state_match or tech_match):
                    continue
            results.append(self.get_craft(c["id"]))
        return results

    def get_artisan(self, slug_or_id: str) -> Optional[Dict[str, Any]]:
        art = self.artisans.get(slug_or_id)
        if not art:
            for a in self.artisans.values():
                if a.get("slug") == slug_or_id:
                    art = a
                    break
        if not art:
            return None
        
        full_artisan = dict(art)
        full_artisan["products"] = [p for p in self.products.values() if p.get("artisan_id") == art["id"]]
        full_artisan["stories"] = [s for s in self.stories.values() if s.get("contributor_id") == art["id"]]
        return full_artisan

    def get_all_artisans(self) -> List[Dict[str, Any]]:
        return [self.get_artisan(a["id"]) for a in self.artisans.values()]

    def get_stories(self, craft_id: Optional[str] = None) -> List[Dict[str, Any]]:
        if craft_id:
            return [s for s in self.stories.values() if s.get("craft_id") == craft_id and s.get("visibility") == "public"]
        return [s for s in self.stories.values() if s.get("visibility") == "public"]

    def update_claim_status(self, claim_id: str, new_status: str, reviewer_name: str, note: Optional[str] = None):
        if claim_id in self.claims:
            old_status = self.claims[claim_id].get("status")
            self.claims[claim_id]["status"] = new_status
            self.claims[claim_id]["reviewer_name"] = reviewer_name
            self.claims[claim_id]["review_note"] = note
            self.claims[claim_id]["reviewed_at"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
            
            self.audit_events.append({
                "id": f"aud-{uuid.uuid4().hex[:6]}",
                "actor_id": "curator-session",
                "actor_name": reviewer_name,
                "entity_type": "claim_review",
                "entity_id": claim_id,
                "action": "claim_status_updated",
                "before_after_summary": f"Claim status updated from '{old_status}' to '{new_status}'. Note: {note or 'N/A'}",
                "created_at": datetime.now(timezone.utc).isoformat()
            })
            return True
        return False

    def review_submission(self, submission_id: str, decision: str, notes: str, reviewer_name: str):
        for sub in self.curator_queue:
            if sub["id"] == submission_id:
                sub["status"] = "approved" if decision == "approve" else ("needs_changes" if decision == "request_changes" else "rejected")
                sub["review_notes"] = notes
                sub["reviewed_by"] = reviewer_name
                sub["reviewed_at"] = datetime.now(timezone.utc).isoformat()
                
                self.audit_events.append({
                    "id": f"aud-{uuid.uuid4().hex[:6]}",
                    "actor_id": "curator-session",
                    "actor_name": reviewer_name,
                    "entity_type": "submission",
                    "entity_id": submission_id,
                    "action": f"submission_{decision}",
                    "before_after_summary": f"Submission '{sub.get('craft_name')}' decision: {decision}. Notes: {notes}",
                    "created_at": datetime.now(timezone.utc).isoformat()
                })
                return sub
        return None

# Singleton instance
db = DataStore()
