export interface HeritageObject {
  id: string;
  name: string;
  hindi_name?: string;
  category: 'art_paintings' | 'handicrafts_sculptures' | 'textiles_handloom' | 'architecture_monuments' | 'music_performance' | 'cultural_objects';
  category_label: string;
  region: 'North India' | 'South India' | 'East India' | 'West India' | 'Northeast India' | 'Central India';
  state: string;
  cluster: string;
  historical_era: string;
  gi_status?: string;
  image_url: string;
  artisan_photo_url: string;
  image_attribution: string;
  materials: string[];
  techniques: string[];
  cultural_significance: string;
  historical_context: string;
  manufacturing_process: string;
  associated_artisan_id?: string;
  associated_artisan_name?: string;
  related_object_ids: string[];
  verification_status: 'curator_reviewed' | 'community_confirmed' | 'source_attached';
  primary_source: string;
  audio_narrative_preview?: string;
}

export interface ArtisanProfile {
  id: string;
  name: string;
  honorific?: string;
  craft_specialisation: string;
  region: string;
  state: string;
  zone: string;
  experience_years: number;
  awards: string[];
  portrait_url: string;
  workshop_photo_url: string;
  quote: string;
  bio: string;
  techniques: string[];
  consent_status: 'consented_full_public' | 'guild_collective';
  associated_craft_ids: string[];
  image_attribution: string;
}

export interface CulturalCategoryMeta {
  id: HeritageObject['category'];
  name: string;
  subtitle: string;
  description: string;
  color: string;
  iconName: string;
  featured_artisan: string;
}

export const CULTURAL_CATEGORIES: CulturalCategoryMeta[] = [
  {
    id: 'art_paintings',
    name: 'Traditional Art & Paintings',
    subtitle: 'Sacred Lines & Botanical Pigments',
    description: 'Centuries of indigenous storytelling captured through ritual wall murals, palm leaf scrolls, and fabric tempera.',
    color: '#EA580C',
    iconName: 'Palette',
    featured_artisan: 'Baua Devi (Mithila Painter)'
  },
  {
    id: 'handicrafts_sculptures',
    name: 'Handicrafts & Sculptures',
    subtitle: 'Earth, Bell Metal & Chiseled Stone',
    description: 'Ancestral alchemy turning porous clay, alloy bell metals, and seasoned hardwoods into ceremonial masterpieces.',
    color: '#D97706',
    iconName: 'Hammer',
    featured_artisan: 'Suresh Jhare (Bastar Dhokra Master)'
  },
  {
    id: 'textiles_handloom',
    name: 'Textiles & Handloom',
    subtitle: 'Gossamer Threads & Sacred Weaves',
    description: 'Pure silk, fine hand-spun Changthangi pashm, and natural resists woven on traditional pit and saaz looms.',
    color: '#C2410C',
    iconName: 'Shirt',
    featured_artisan: 'Shah Rashid Qadri & Malika Begum'
  },
  {
    id: 'architecture_monuments',
    name: 'Architecture & Monuments',
    subtitle: 'Living Stone Temples & Stepwells',
    description: 'Subterranean water sanctuaries, Dravidian temple towers, and sandstone fortresses carved without mortar.',
    color: '#475569',
    iconName: 'Landmark',
    featured_artisan: 'Sthapati Temple Sculptor Guild'
  },
  {
    id: 'music_performance',
    name: 'Music & Performing Arts',
    subtitle: 'Divine Ragas, Mudras & Sacred Theater',
    description: 'Centuries of unbroken Guru-Shishya oral traditions expressed through bronze bells, seasoned wood, and classical nritya.',
    color: '#4F46E5',
    iconName: 'Music',
    featured_artisan: 'Vidushi Priyadarshini & Luthier Guild'
  },
  {
    id: 'cultural_objects',
    name: 'Cultural Objects & Traditions',
    subtitle: 'Ritual Masks & Ceremonial Regalia',
    description: 'Tribal masks, temple processional lamps, and sacred wooden deities embodying collective folklore.',
    color: '#059669',
    iconName: 'Shield',
    featured_artisan: 'Purulia Chhau Mask Guild'
  }
];

export const REGIONS_OF_INDIA = [
  'All Regions',
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
  'Northeast India'
];

export const HERITAGE_ARTISANS: ArtisanProfile[] = [
  {
    id: 'art-baua-devi',
    name: 'Baua Devi',
    honorific: 'Padma Shri (2017)',
    craft_specialisation: 'Mithila / Madhubani Folk Painting',
    region: 'Jitwarpur, Madhubani District',
    state: 'Bihar',
    zone: 'East India',
    experience_years: 58,
    awards: ['Padma Shri (2017)', 'National Master Craftsman Award (1984)'],
    portrait_url: '/images/heritage/artisan_madhubani.jpg',
    workshop_photo_url: '/images/heritage/workshop_madhubani.jpg',
    quote: 'Our painting begins with prayers and a wash of cow dung on the paper. The bamboo stick never trembles because the stories of Sita belong to our motherland.',
    bio: 'Pioneer of the Mithila art movement who brought wall paintings (Kohbar) from domestic mud walls onto handmade paper during the 1966 Bihar drought, preserving ancient female cosmologies.',
    techniques: ['Bamboo nib double outlining', 'Natural plant sap extraction', 'Kachni line cross-hatching'],
    consent_status: 'consented_full_public',
    associated_craft_ids: ['obj-madhubani', 'obj-kohbar-scroll'],
    image_attribution: 'Mithila Chitrakar Sangha / Asha Jha National Archive'
  },
  {
    id: 'art-rashid-qadri',
    name: 'Shah Rashid Ahmed Qadri',
    honorific: 'Padma Shri (2023)',
    craft_specialisation: 'Bidriware Pure Silver Tarkashi Inlay',
    region: 'Bidar Heritage Cluster',
    state: 'Karnataka',
    zone: 'South India',
    experience_years: 44,
    awards: ['Padma Shri (2023)', 'Shilp Guru Award', 'National Master Craftsman Award'],
    portrait_url: '/images/heritage/artisan_bidriware.jpg',
    workshop_photo_url: '/images/heritage/workshop_bidriware.jpg',
    quote: 'Bidriware cannot be faked with paint. The underground soil of Bidar Fort carries 600 years of mineral memory that only turns real zinc alloy into black velvet.',
    bio: 'Third-generation master metalworker from Bidar who has revived the 14th-century Bahmani silver wire inlay craft and trained more than 300 women and youths in authentic unmechanized metallurgy.',
    techniques: ['Cold chisel engraving', '99.9% silver wire cold hammering', 'Bidar Fort soil thermal patination'],
    consent_status: 'consented_full_public',
    associated_craft_ids: ['obj-bidriware-aftaba', 'obj-bidri-tray'],
    image_attribution: 'Bidar Heritage Guild / Crafts Council of India'
  },
  {
    id: 'art-gafur-khatri',
    name: 'Abdul Gafur Khatri',
    honorific: 'Padma Shri (2019)',
    craft_specialisation: 'Rogan Art of Kutch (Tree of Life)',
    region: 'Nirona Village, Kutch District',
    state: 'Gujarat',
    zone: 'West India',
    experience_years: 48,
    awards: ['Padma Shri (2019)', 'National Award (1997)', 'State Master Craftsman Award'],
    portrait_url: '/images/heritage/artisan_rogan.jpg',
    workshop_photo_url: '/images/heritage/workshop_rogan.jpg',
    quote: 'When my family was the sole keeper left in India, we decided to break the rule of keeping the art inside the family. We taught village daughters so Rogan would outlive us all.',
    bio: 'Eighth-generation master who saved Rogan castor-oil fabric painting from extinction. The craft uses boiled castor oil paste guided airborne with a brass stylus without touching the fabric.',
    techniques: ['48-hour castor oil resin boiling', 'Palm color warming', 'Mirror-fold symmetrical transfer'],
    consent_status: 'consented_full_public',
    associated_craft_ids: ['obj-rogan-tree', 'obj-rogan-stole'],
    image_attribution: 'Khatri Rogan Art Studio, Nirona, Kutch'
  },
  {
    id: 'art-niranjan',
    name: 'Jonnalagadda Niranjan',
    honorific: 'National Master Craftsman',
    craft_specialisation: 'Srikalahasti Sacred Kalamkari',
    region: 'Srikalahasti, Tirupati District',
    state: 'Andhra Pradesh',
    zone: 'South India',
    experience_years: 36,
    awards: ['National Award for Master Craftsman', 'UNESCO Seal of Excellence'],
    portrait_url: '/images/heritage/artisan_kalamkari.jpg',
    workshop_photo_url: '/images/heritage/workshop_kalamkari.jpg',
    quote: 'We don’t print with wooden blocks. Every eye and sacred lotus is drawn freehand with bamboo reeds and fermented iron jaggery water on Swarnamukhi sandbanks.',
    bio: 'Born in a lineage of temple narrative chitrakars along the Swarnamukhi river. Preserves the 16-stage ancient dyeing process using buffalo milk and madder root.',
    techniques: ['Bamboo reed pen inking', 'Fermented iron Kasim black', 'Buffalo milk fat mordant resist'],
    consent_status: 'consented_full_public',
    associated_craft_ids: ['obj-kalamkari-scroll', 'obj-kalamkari-tree'],
    image_attribution: 'Swarnamukhi Chitrakar Sangham & Crafts Council of India'
  },
  {
    id: 'art-suresh-jhare',
    name: 'Suresh Jhare & Tribal Clan',
    honorific: 'Bastar Shilp Guru Nominee',
    craft_specialisation: 'Ghadwa Lost-Wax Bell Metal Casting (Dhokra)',
    region: 'Kondagaon & Bastar',
    state: 'Chhattisgarh',
    zone: 'Central India',
    experience_years: 39,
    awards: ['State Master Craftsman Award', 'TRIFED Master Artisan Honour'],
    portrait_url: '/images/heritage/artisan_dhokra.jpg',
    workshop_photo_url: '/images/heritage/workshop_dhokra.jpg',
    quote: 'Our technique has not changed since Mohenjo-daro. Every clay mold is broken when the molten brass cools—each piece is single in the universe.',
    bio: 'Master Ghadwa caster in Kondagaon forest crafting ritual elephant totems and tribal fertility lamps using ant-hill clay, rice husk, and hand-rolled beeswax threads.',
    techniques: ['Beeswax thread coil extrusion', 'Ant-hill clay core armature', 'Porous pit furnace lost-wax firing'],
    consent_status: 'guild_collective',
    associated_craft_ids: ['obj-dhokra-elephant', 'obj-dhokra-diya'],
    image_attribution: 'Bastar Tribal Art Guild & TRIFED Field Archives'
  },
  {
    id: 'art-malika-begum',
    name: 'Malika Begum & Varanasi Guild',
    honorific: 'Master Handloom Weaver',
    craft_specialisation: 'Banarasi Pure Kinkhwab Zari Weaving',
    region: 'Madanpura, Varanasi',
    state: 'Uttar Pradesh',
    zone: 'North India',
    experience_years: 42,
    awards: ['Sant Kabir Handloom Award Finalist', 'All India Handloom Board Certificate'],
    portrait_url: '/images/heritage/artisan_weaver.jpg',
    workshop_photo_url: '/images/heritage/workshop_weaver.jpg',
    quote: 'It takes three months for two master weavers sitting side by side on a pit loom to weave one royal Kinkhwab saree. Real gold zari feels cool against the skin.',
    bio: 'Fourth-generation master weaver in the historic weavers’ quarters of Varanasi, specializing in intricate Jangla, Shikargah, and Kinkhwab weaves using jacquard and naqsha looms.',
    techniques: ['Pit-loom interweaving', 'Pure silver electroplated zari', 'Kadhwa discontinuous weft embroidery'],
    consent_status: 'guild_collective',
    associated_craft_ids: ['obj-banarasi-saree', 'obj-banarasi-brocade'],
    image_attribution: 'Maheshwar & Varanasi Handloom Weaver Cooperative'
  }
];

export const HERITAGE_OBJECTS: HeritageObject[] = [
  // --- A. TRADITIONAL ART & PAINTINGS ---
  {
    id: 'obj-madhubani',
    name: 'Madhubani (Mithila) Kohbar Mural',
    hindi_name: 'मिथिला कोहबर चित्रकला',
    category: 'art_paintings',
    category_label: 'Traditional Art & Paintings',
    region: 'East India',
    state: 'Bihar',
    cluster: 'Madhubani & Jitwarpur',
    historical_era: 'Ancient Living Domestic Art',
    gi_status: 'GI Registry No. 105',
    image_url: '/images/heritage/craft_madhubani.jpg',
    artisan_photo_url: '/images/heritage/artisan_madhubani.jpg',
    image_attribution: 'Indira Gandhi National Centre for the Arts (IGNCA) Folk Archives',
    materials: ['Handmade rag paper', 'Cow dung wash primer', 'Sharpened bamboo twigs', 'Lamp black (kajal)', 'Aparajita blue flower extract', 'Palash tree orange'],
    techniques: ['Freehand double contour outlining', 'Kachni geometric cross-hatching', 'Bharni vibrant mineral filling'],
    cultural_significance: 'Painted on the nuptial chamber walls (Kohbar Ghar) to bless bride and groom with fertility and marital prosperity. Depicts the cosmic lotus pond (purain leaf), turtles, parrots, and solar deities.',
    historical_context: 'Practiced exclusively by women across caste communities in the Mithila region for centuries before gaining global recognition during the 1960s drought relief program.',
    manufacturing_process: 'Cloth or paper is primed with an antiseptic cow dung and river silt slurry. Sacred motifs are inked in continuous double lines using sharpened bamboo styluses with cotton ink reservoirs.',
    associated_artisan_id: 'art-baua-devi',
    associated_artisan_name: 'Baua Devi (Padma Shri)',
    related_object_ids: ['obj-kalamkari-scroll', 'obj-warli-canvas'],
    verification_status: 'curator_reviewed',
    primary_source: 'National Crafts Museum Monograph & GI Journal No. 105',
    audio_narrative_preview: 'Baua Devi narrates the symbolism of the purain lotus leaf in Maithili dialect.'
  },
  {
    id: 'obj-warli-canvas',
    name: 'Warli Sacred Tribal Rice Mural',
    hindi_name: 'वारली भित्ति चित्र',
    category: 'art_paintings',
    category_label: 'Traditional Art & Paintings',
    region: 'West India',
    state: 'Maharashtra',
    cluster: 'Dahanu & Jawhar',
    historical_era: 'Ancestral Prehistoric Tradition (c. 2500 BCE)',
    gi_status: 'GI Registry No. 342',
    image_url: '/images/heritage/craft_warli.jpg',
    artisan_photo_url: '/images/heritage/workshop_madhubani.jpg',
    image_attribution: 'Tribal Research & Training Institute Maharashtra Archives',
    materials: ['Clay and cow dung mud wall ground', 'Fermented rice flour paste', 'Chewed bamboo twig brush', 'Water and acacia gum'],
    techniques: ['Geometric basic primitives (circle, triangle, line)', 'Spiraling Tarpa dance composition', 'Natural water binding'],
    cultural_significance: 'Expresses the Warli worldview where humans, animals, and nature live in unbroken cyclical harmony. The central Tarpa dance reflects the movement of seasons and life circles.',
    historical_context: 'Rooted in the indigenous animist traditions of the northern Sahyadri hills, created during wedding ceremonies by suvasinis (married women).',
    manufacturing_process: 'Earthy red ochre (geru) grounds are prepared with mud and cow dung. A chewed bamboo sliver transfers white fermented rice paste in spontaneous geometric formations.',
    related_object_ids: ['obj-madhubani', 'obj-dhokra-elephant'],
    verification_status: 'curator_reviewed',
    primary_source: 'Census of India Crafts Monograph & IGNCA Tribal Division'
  },
  {
    id: 'obj-kalamkari-scroll',
    name: 'Srikalahasti Temple Narrative Kalamkari',
    hindi_name: 'श्रीकालहस्ती कलमकारी',
    category: 'art_paintings',
    category_label: 'Traditional Art & Paintings',
    region: 'South India',
    state: 'Andhra Pradesh',
    cluster: 'Srikalahasti, Tirupati District',
    historical_era: 'Vijayanagara & Nayaka Eras (16th c.)',
    gi_status: 'GI Registry No. 19',
    image_url: '/images/heritage/craft_kalamkari.jpg',
    artisan_photo_url: '/images/heritage/artisan_kalamkari.jpg',
    image_attribution: 'Crafts Council of India & Swarnamukhi Chitrakar Sangham',
    materials: ['Unbleached handwoven cotton (gaada)', 'Buffalo milk', 'Bamboo reed pens (kalam)', 'Fermented iron-jaggery (kasim)', 'Madder root (manjistha)', 'Alum mordant'],
    techniques: ['16-stage natural dye immersion', 'Swarnamukhi river sand sun-bleaching', 'Freehand kalam line drawing'],
    cultural_significance: 'Created as narrative temple hangings depicting Mahabharata and Ramayana epics for temple courtyards where traveling storytellers performed.',
    historical_context: 'Flourished under temple patronage where the unique water chemistry of the river Swarnamukhi fixed vegetable tannins indelibly into cotton fibers.',
    manufacturing_process: 'Cloth is treated with buffalo milk to prevent dye capillary bleed. Outlines are inked with fermented iron water and boiled in copper vats with madder roots to bloom reds.',
    associated_artisan_id: 'art-niranjan',
    associated_artisan_name: 'Jonnalagadda Niranjan (National Master)',
    related_object_ids: ['obj-madhubani', 'obj-thanjavur-krishna'],
    verification_status: 'curator_reviewed',
    primary_source: 'Intellectual Property India GI Journal No. 19'
  },
  {
    id: 'obj-thanjavur-krishna',
    name: 'Thanjavur Sacred 22K Gold Foil Painting',
    hindi_name: 'तंजावुर स्वर्ण चित्रकला',
    category: 'art_paintings',
    category_label: 'Traditional Art & Paintings',
    region: 'South India',
    state: 'Tamil Nadu',
    cluster: 'Thanjavur & Kumbakonam',
    historical_era: 'Maratha King Serfoji II Era (17th–18th c.)',
    gi_status: 'GI Registry No. 24',
    image_url: '/images/heritage/craft_thanjavur.png',
    artisan_photo_url: '/images/heritage/artisan_bidriware.jpg',
    image_attribution: 'Saraswathi Mahal Library Imperial Archives, Thanjavur',
    materials: ['Seasoned teakwood plank (palagai)', 'Unbleached cotton cloth', 'Tamarind seed glue', 'Chalk limestone (sukka) paste', '22-carat pure gold leaf', 'Semi-precious Jaipur gemstones'],
    techniques: ['High-relief gesso sculpting', 'Gold leaf agate burnishing', 'Glass pearl insetting'],
    cultural_significance: 'Adorns Hindu home shrines and royal prayer rooms with glowing devotional deities characterized by plump serene faces, almond eyes, and gilded architectural pavilions.',
    historical_context: 'Evolved under the Nayakas and perfected under the Thanjavur Maratha court, blending South Indian temple iconography with Deccani and Maratha aesthetic sensibilities.',
    manufacturing_process: 'Teakwood is layered with cotton and chalk paste. Relief arches and jewelry are sculpted in 3D using sukka gesso, encrusted with gems, and gilded with tissue-thin 22K gold foil.',
    related_object_ids: ['obj-kalamkari-scroll', 'obj-bidriware-aftaba'],
    verification_status: 'curator_reviewed',
    primary_source: 'GI Application Registry No. 24 Standards'
  },

  // --- B. HANDICRAFTS & SCULPTURES ---
  {
    id: 'obj-bidriware-aftaba',
    name: 'Bidriware Bahmani Royal Aftaba (Ewer)',
    hindi_name: 'बीदरी क्राफ्ट चांदी जड़ाऊ आफताबा',
    category: 'handicrafts_sculptures',
    category_label: 'Handicrafts & Sculptures',
    region: 'South India',
    state: 'Karnataka',
    cluster: 'Bidar Heritage Quarter',
    historical_era: 'Bahmani Sultanate (14th c.)',
    gi_status: 'GI Registry No. 17',
    image_url: '/images/heritage/craft_bidriware_aftaba.jpg',
    artisan_photo_url: '/images/heritage/artisan_bidriware.jpg',
    image_attribution: 'National Crafts Museum & Hastkala Academy, New Delhi',
    materials: ['Zinc (94%)', 'Copper (6%)', 'Pure 99.9% fine silver wire', 'Bidar Fort ruins underground soil', 'Ammonium chloride (sal-ammoniac)'],
    techniques: ['Cold chisel engraving', 'Tarkashi silver wire cold hammering', 'Subterranean fort soil thermal patination'],
    cultural_significance: 'Aftaba (ceremonial water ewers) symbolize Deccan courtly hospitality and architectural elegance, distinguished by stark white silver shimmering against deep velvet black zinc.',
    historical_context: 'Originated under Sultan Ahmad Shah Wali Bahmani who brought Persian metalworkers to Bidar; the craft evolved uniquely through the chemical properties of Bidar Fort soil.',
    manufacturing_process: 'Molten zinc-copper is cast in clay molds. Floral vines are engraved with chisels and inlaid with pure silver wire. The piece is heated and rubbed with fort soil to turn zinc pitch-black.',
    associated_artisan_id: 'art-rashid-qadri',
    associated_artisan_name: 'Shah Rashid Ahmed Qadri (Padma Shri)',
    related_object_ids: ['obj-dhokra-elephant', 'obj-thanjavur-krishna'],
    verification_status: 'curator_reviewed',
    primary_source: 'National Crafts Museum Monograph & GI Registry No. 17'
  },
  {
    id: 'obj-dhokra-elephant',
    name: 'Bastar Dhokra Lost-Wax Bell Metal Elephant',
    hindi_name: 'बस्तर ढोकरा कांस्य शिल्प हाथी',
    category: 'handicrafts_sculptures',
    category_label: 'Handicrafts & Sculptures',
    region: 'Central India',
    state: 'Chhattisgarh',
    cluster: 'Bastar & Kondagaon',
    historical_era: 'Harappan Metallurgy Link (c. 2500 BCE)',
    gi_status: 'GI Registry No. 83',
    image_url: '/images/heritage/craft_dhokra_elephant.jpg',
    artisan_photo_url: '/images/heritage/artisan_dhokra.jpg',
    image_attribution: 'Bastar Tribal Art Guild & Archaeological Survey of India',
    materials: ['Ant-hill clay', 'Rice husk and cow dung', 'Natural wild beeswax', 'Dammar tree resin (dhuna)', 'Bell metal / recycled brass'],
    techniques: ['Non-repeating cire perdue (lost wax)', 'Hand-wound wax thread extrusions', 'Porous pit furnace crucible smelting'],
    cultural_significance: 'Ceremonial elephant carry folk deities (Danteshwari Devi). Each sculpture is unique because the mold must be broken to extract the bronze casting.',
    historical_context: 'Practiced by the Ghadwa tribal community of Bastar, maintaining direct metallurgical continuity with the 4,500-year-old Mohenjo-daro Dancing Girl bronze statue.',
    manufacturing_process: 'Clay core is sculpted and sun-dried. Beeswax threads are wrapped over the surface to build ornate patterns. A secondary clay jacket is applied, baked in charcoal pits, and filled with molten bronze.',
    associated_artisan_id: 'art-suresh-jhare',
    associated_artisan_name: 'Suresh Jhare & Clan',
    related_object_ids: ['obj-bidriware-aftaba', 'obj-warli-canvas'],
    verification_status: 'curator_reviewed',
    primary_source: 'ASI Archaeological Field Monograph & GI Journal No. 83'
  },
  {
    id: 'obj-blue-pottery',
    name: 'Jaipur Blue Pottery Glazed Floral Urn',
    hindi_name: 'जयपुर ब्लू पॉटरी फूलदान',
    category: 'handicrafts_sculptures',
    category_label: 'Handicrafts & Sculptures',
    region: 'North India',
    state: 'Rajasthan',
    cluster: 'Jaipur Crafts Cluster',
    historical_era: 'Maharaja Sawai Ram Singh II Era (19th c.)',
    gi_status: 'GI Registry No. 34',
    image_url: '/images/heritage/craft_blue_pottery.jpg',
    artisan_photo_url: '/images/heritage/craft_blue_pottery_school.jpg',
    image_attribution: 'Jaipur Craft Foundation & Rajasthan Small Industries Corp',
    materials: ['Ground quartz stone powder', 'Fuller’s earth (multani mitti)', 'Sodium carbonate and raw glass', 'Cobalt oxide (blue) and copper oxide (turquoise)', 'Natural gum'],
    techniques: ['Clay-free quartz dough formulation', 'Open-mold hand pressing', 'Low-temperature kiln glazing'],
    cultural_significance: 'Celebrated for its translucent turquoise-blue glaze, Persian arabesques, and non-clay ceramic composition that does not crack over decades.',
    historical_context: 'Imported via Turko-Persian traditions and patronized by the royal court of Jaipur to ornament City Palace gateways and royal table services.',
    manufacturing_process: 'Quartz powder, glass, and gum are kneaded into a dough and molded into shape. Cobalt oxides are hand-painted and sealed with a glass frit glaze before single-firing.',
    related_object_ids: ['obj-bidriware-aftaba', 'obj-terracotta-bankura'],
    verification_status: 'curator_reviewed',
    primary_source: 'GI Application No. 34 Specifications'
  },
  {
    id: 'obj-terracotta-bankura',
    name: 'Bankura Terracotta Sacred Horse',
    hindi_name: 'बांकुड़ा टेराकोटा घोड़ा',
    category: 'handicrafts_sculptures',
    category_label: 'Handicrafts & Sculptures',
    region: 'East India',
    state: 'West Bengal',
    cluster: 'Panchmura, Bankura District',
    historical_era: 'Malla Dynasty (17th c.)',
    gi_status: 'GI Registry No. 88',
    image_url: '/images/heritage/craft_bankura_horse.jpg',
    artisan_photo_url: '/images/heritage/pottery_wheel_india.jpg',
    image_attribution: 'West Bengal Crafts Council & Panchmura Kumbhakar Cooperative',
    materials: ['Alluvial river silt', 'Fine river sand', 'Natural red clay slip', 'Eucalyptus leaf wood fuel'],
    techniques: ['Potter’s wheel sectional throwing', 'Hand-modeled ear and mane ornamentation', 'Air-sealed reduction kiln firing'],
    cultural_significance: 'Offered to village folk deities (Dharma Thakur) in sacred groves as symbols of devotion, health, and rural protection. Famous for erect ears and stylized neck curvature.',
    historical_context: 'Panchmura village potters developed these soaring horses under the patronage of Malla kings who built Bishnupur’s terracotta temples.',
    manufacturing_process: 'Body parts (neck, torso, legs, snout) are turned on the wheel separately, joined when leather-hard, hand-ornamented with clay filigree, and wood-fired to brick red.',
    related_object_ids: ['obj-dhokra-elephant', 'obj-blue-pottery'],
    verification_status: 'curator_reviewed',
    primary_source: 'All India Handicrafts Board Monograph'
  },

  // --- C. TEXTILES & HANDLOOM ---
  {
    id: 'obj-banarasi-saree',
    name: 'Varanasi Royal Kinkhwab Pure Zari Brocade',
    hindi_name: 'बनारसी किन्ख्वाब रेशमी साड़ी',
    category: 'textiles_handloom',
    category_label: 'Textiles & Handloom',
    region: 'North India',
    state: 'Uttar Pradesh',
    cluster: 'Varanasi Weavers Quarter',
    historical_era: 'Mughal & Vedic Continuity',
    gi_status: 'GI Registry No. 99',
    image_url: '/images/heritage/craft_banarasi_saree.jpg',
    artisan_photo_url: '/images/heritage/artisan_weaver.jpg',
    image_attribution: 'Varanasi Bunkar Samiti & Weavers Service Centre',
    materials: ['Mulberry filament silk (katan)', 'Pure silver core zari electroplated with gold', 'Natural botanical dyes'],
    techniques: ['Drawloom / Pit-loom jacquard interweaving', 'Kadhwa discontinuous supplementary weft', 'Minakari colored silk insets'],
    cultural_significance: 'Known as "Kinkhwab" (Little Golden Dream), these ceremonial sarees are cherished as bridal heirlooms across India, famed for golden paisleys (kalka) and floral jaals.',
    historical_context: 'Mentioned in Buddhist Pali texts and Mughal imperial chronicles (Ain-i-Akbari) as the pinnacle of Indian luxury weaving patronized by royal courts.',
    manufacturing_process: 'Master artisans work in tandem on pit looms for 40 to 90 days. Thousands of punch cards guide the supplementary zari weft to create raised metallic relief patterns.',
    associated_artisan_id: 'art-malika-begum',
    associated_artisan_name: 'Malika Begum & Guild',
    related_object_ids: ['obj-pashmina-kani', 'obj-kalamkari-scroll'],
    verification_status: 'curator_reviewed',
    primary_source: 'Development Commissioner (Handicrafts) Technical Manual'
  },
  {
    id: 'obj-pashmina-kani',
    name: 'Kashmir Hand-Spun Kani Pashmina Shawl',
    hindi_name: 'कश्मीर कानी पश्मीना शॉल',
    category: 'textiles_handloom',
    category_label: 'Textiles & Handloom',
    region: 'North India',
    state: 'Jammu & Kashmir',
    cluster: 'Srinagar & Budgam',
    historical_era: '15th Century (Sultan Zain-ul-Abidin)',
    gi_status: 'GI Registry No. 46',
    image_url: '/images/heritage/craft_pashmina_shawl.jpg',
    artisan_photo_url: '/images/heritage/artisan_pashmina.jpg',
    image_attribution: 'Craft Development Institute (CDI) Srinagar & GI Registry',
    materials: ['Changthangi mountain goat pashm (12-14 microns)', 'Wild thistle brushes', 'Rice starch (maya)', 'Eyeless wooden needles (tujis)'],
    techniques: ['Yender charkha finger hand-spinning', 'Kani interlocking twill tapestry weave', 'Talim manuscript coded chanting'],
    cultural_significance: 'The world benchmark of featherweight warmth and softness. A genuine hand-woven Kani shawl can take up to two years to complete as each colored thread is inserted by hand.',
    historical_context: 'Brought to Kashmir by Mir Sayyid Ali Hamadani and royal patron Zain-ul-Abidin; became the coveted garment of European monarchs and Mughal emperors.',
    manufacturing_process: 'Raw Changthang fleece is dehaired by hand. Kashmiri women spin gossamer thread on wooden charkhas. Weavers use wooden bobbins, reading line-by-line Talim scripts.',
    related_object_ids: ['obj-banarasi-saree', 'obj-bidriware-aftaba'],
    verification_status: 'curator_reviewed',
    primary_source: 'Craft Development Institute Standards & GI Registry No. 46'
  },
  {
    id: 'obj-rogan-tree',
    name: 'Rogan Art Tree of Life Painted Silk',
    hindi_name: 'रोगन आर्ट जीवन का वृक्ष',
    category: 'textiles_handloom',
    category_label: 'Textiles & Handloom',
    region: 'West India',
    state: 'Gujarat',
    cluster: 'Nirona Village, Kutch',
    historical_era: '300+ Years Living Lineage',
    gi_status: 'UNESCO Intangible Nomination',
    image_url: '/images/heritage/artisan_rogan.jpg',
    artisan_photo_url: '/images/heritage/workshop_rogan.jpg',
    image_attribution: 'Khatri Rogan Art Studio, Nirona & Gujarat State Archives',
    materials: ['Castor oil (hand-pressed)', 'Natural mineral pigments and stones', 'Blunt brass stylus', 'Handwoven tussar silk / cotton'],
    techniques: ['48-hour oil reduction boiling', 'Airborne thread extrusion', 'Mirror-fold symmetrical transfer'],
    cultural_significance: 'Celebrates the Tree of Life (Kalpavriksha) symbolizing fertility, resilience, and coexistence in the arid desert of Kutch. The pigment thread never cracks or fades across centuries.',
    historical_context: 'Migrated from Persia with pastoral Muslim Khatri communities and adapted in Kutch to decorate bridal skirts (ghaghras) and wall hangings.',
    manufacturing_process: 'Castor oil is boiled for two days into a sticky resinous paste mixed with mineral colors. The artisan rubs paste on their palm with body heat, pulling thread through the air with a stylus.',
    associated_artisan_id: 'art-gafur-khatri',
    associated_artisan_name: 'Abdul Gafur Khatri (Padma Shri)',
    related_object_ids: ['obj-kalamkari-scroll', 'obj-madhubani'],
    verification_status: 'curator_reviewed',
    primary_source: 'UNESCO Intangible Cultural Heritage Dossier'
  },

  // --- D. ARCHITECTURE & MONUMENTS ---
  {
    id: 'obj-rani-ki-vav',
    name: 'Rani ki Vav Stepwell Subterranean Pavilion',
    hindi_name: 'रानी की वाव पाटन',
    category: 'architecture_monuments',
    category_label: 'Architecture & Monuments',
    region: 'West India',
    state: 'Gujarat',
    cluster: 'Patan Heritage District',
    historical_era: 'Solanki / Chaulukya Dynasty (11th c.)',
    gi_status: 'UNESCO World Heritage Site',
    image_url: '/images/heritage/arch_rani_ki_vav.jpg',
    artisan_photo_url: '/images/heritage/arch_rani_ki_vav.jpg',
    image_attribution: 'Archaeological Survey of India (ASI) Vadodara Circle',
    materials: ['Grey and buff sandstone', 'Interlocking dry masonry joints', 'Lead dowels'],
    techniques: ['Maru-Gurjara architectural style', 'Seven-terraced subterranean cantilever carving', 'Hydro-engineering stepwell layout'],
    cultural_significance: 'Designed as an inverted temple honoring the sanctity of subterranean water, featuring over 500 major sculptures of Lord Vishnu’s ten avatars (Dashavatara).',
    historical_context: 'Commissioned by Queen Udayamati in memory of King Bhima I around 1063 CE. Preserved intact for centuries by river Saraswati silt burials.',
    manufacturing_process: 'Craftsmen excavated a 30-meter-deep shaft and carved stepped terraces with tiered pillared pavilions, integrating artistic splendor with life-giving aquifer access.',
    related_object_ids: ['obj-brihadisvara', 'obj-konark-wheel'],
    verification_status: 'curator_reviewed',
    primary_source: 'ASI Monument Monograph & UNESCO WHC Archive'
  },
  {
    id: 'obj-brihadisvara',
    name: 'Brihadisvara Great Living Chola Temple Vimana',
    hindi_name: 'तंजावुर बृहदीश्वर मंदिर',
    category: 'architecture_monuments',
    category_label: 'Architecture & Monuments',
    region: 'South India',
    state: 'Tamil Nadu',
    cluster: 'Thanjavur Temple Complex',
    historical_era: 'Rajaraja Chola I (1010 CE)',
    gi_status: 'UNESCO World Heritage Site',
    image_url: '/images/heritage/arch_brihadisvara.jpg',
    artisan_photo_url: '/images/heritage/arch_brihadisvara.jpg',
    image_attribution: 'Archaeological Survey of India (ASI) Chennai Circle',
    materials: ['Granite blocks (transported from 50 km distance)', 'Interlocking gravity joints without cement mortar'],
    techniques: ['Dravidian Vimana pyramidal tower engineering', 'Monolithic 80-tonne granite cupola placement', 'Intricate stone fresco carvings'],
    cultural_significance: 'One of the tallest granite structures in human history (66 meters). Celebrated for its mathematical precision, cosmic temple geometry, and royal Chola epigraphs.',
    historical_context: 'Built to commemorate Rajaraja Chola’s empire across the Bay of Bengal, employing thousands of sculptors, dancers, musicians, and bronze casters.',
    manufacturing_process: 'Massive granite slabs were carved and interlocked with tongue-and-groove joints. The 80-tonne monolithic dome was rolled up a 6-km earthen inclined ramp to the summit.',
    related_object_ids: ['obj-thanjavur-krishna', 'obj-rani-ki-vav'],
    verification_status: 'curator_reviewed',
    primary_source: 'ASI Great Living Chola Temples Dossier'
  },
  {
    id: 'obj-konark-wheel',
    name: 'Konark Sun Temple Carved Chariot Wheel',
    hindi_name: 'कोणार्क सूर्य मंदिर चक्र',
    category: 'architecture_monuments',
    category_label: 'Architecture & Monuments',
    region: 'East India',
    state: 'Odisha',
    cluster: 'Konark, Puri District',
    historical_era: 'Eastern Ganga King Narasimhadeva I (13th c.)',
    gi_status: 'UNESCO World Heritage Site',
    image_url: '/images/heritage/arch_konark_wheel.jpg',
    artisan_photo_url: '/images/heritage/arch_konark_wheel.jpg',
    image_attribution: 'ASI Bhubaneswar Circle & Odisha Tourism Archives',
    materials: ['Khondalite weathered stone', 'Chlorite stone relief insets', 'Iron clamps and dowels'],
    techniques: ['Kalinga architectural style', 'Sundial astronomical shadow alignment', 'Micro-sculptural filigree chasing'],
    cultural_significance: 'The 24 colossal chariot wheels represent the hours of the day and solar cycles. The shadow cast by the wheel axle acts as an exact clock accurate to a few minutes.',
    historical_context: 'Conceived as the cosmic celestial chariot of Surya (the Sun God) pulled by seven rearing horses on the shores of the Bay of Bengal.',
    manufacturing_process: 'Master sculptors (led by legendary architect Bisu Maharana) hand-chiseled Khondalite stone panels, depicting dancers, celestial musicians, and royal court processions.',
    related_object_ids: ['obj-rani-ki-vav', 'obj-brihadisvara'],
    verification_status: 'curator_reviewed',
    primary_source: 'Archaeological Survey of India Konark Records'
  },

  // --- E. MUSIC & PERFORMING ARTS ---
  {
    id: 'obj-classical-sitar',
    name: 'Maihar Tradition Handcrafted Teak & Gourd Sitar',
    hindi_name: 'शास्त्रीय भारतीय सितार',
    category: 'music_performance',
    category_label: 'Music & Performing Arts',
    region: 'North India',
    state: 'West Bengal & Uttar Pradesh',
    cluster: 'Kolkata & Miraj Luthier Guilds',
    historical_era: 'Medieval to Modern Hindustani Tradition',
    gi_status: 'Miraj Musical Instruments GI No. 518',
    image_url: '/images/heritage/music_sitar.jpg',
    artisan_photo_url: '/images/heritage/music_sitar.jpg',
    image_attribution: 'Miraj Luthier Cooperative & Sangeet Natak Akademi Archives',
    materials: ['Seasoned tun (red cedar) or teakwood', 'Natural dried Kaddu gourd (tumba)', 'Camel bone or synthetic jawari bridge', 'Brass and steel strings', 'Deer horn string guides'],
    techniques: ['Acoustic soundboard hollowing', 'Jawari slope micro-filing', 'Movable curved brass fret binding'],
    cultural_significance: 'The premier stringed instrument of Hindustani classical music, capable of producing microtonal meend (glides) that echo human vocal intonations.',
    historical_context: 'Developed from the ancient Veena and Persian Setar under medieval courtly masters; refined to perfection in the 19th and 20th centuries.',
    manufacturing_process: 'A seasoned dried gourd is selected for acoustic resonance, joined to a hollowed teak neck. The luthier hand-files the deer-bone bridge (jawari) to tune the signature buzzing overtone.',
    related_object_ids: ['obj-benares-tabla', 'obj-bharatanatyam-nritya'],
    verification_status: 'curator_reviewed',
    primary_source: 'Sangeet Natak Akademi Instrument Documentation'
  },
  {
    id: 'obj-benares-tabla',
    name: 'Benares Gharana Handcrafted Sheesham Tabla Pair',
    hindi_name: 'बनारस घराना तबला जोड़ी',
    category: 'music_performance',
    category_label: 'Music & Performing Arts',
    region: 'North India',
    state: 'Uttar Pradesh',
    cluster: 'Varanasi Kabir Chaura Quarter',
    historical_era: '18th Century Hindustani Tradition',
    gi_status: 'Varanasi Musical Instruments GI Application',
    image_url: '/images/heritage/music_tabla.jpg',
    artisan_photo_url: '/images/heritage/music_tabla.jpg',
    image_attribution: 'Kabir Chaura Tabla Makers Guild & Sangeet Natak Akademi',
    materials: ['Heavy seasoned sheesham / rosewood (dayan)', 'Hammered copper or brass (bayan)', 'Layered goat skin parchment (puri)', 'Iron soot, starch, and slag compound (syahi)', 'Buffalo rawhide braids (bhiran)'],
    techniques: ['Concentric parchment tensioning', 'Multi-layer syahi pasting and stone burnishing', 'Wooden peg pitch tuning'],
    cultural_significance: 'The rhythmic backbone of Hindustani music, known for its singing resonant tone (Na, Dhin, Dha) produced by the black mineral patch (syahi).',
    historical_context: 'Flourished under legendary masters like Pandit Ram Sahai in Varanasi, uniting temple dhrupad bols with courtly khayal accompaniment.',
    manufacturing_process: 'Rawhide is shaved to micro-tolerances. An iron-slag and rice starch paste is applied in concentric rings and burnished with agate stones while tuning the fundamental frequency.',
    related_object_ids: ['obj-classical-sitar', 'obj-bharatanatyam-nritya'],
    verification_status: 'curator_reviewed',
    primary_source: 'National Academy of Music, Dance and Drama Records'
  },
  {
    id: 'obj-bharatanatyam-nritya',
    name: 'Temple Tradition Bharatanatyam Salangai & Mudra',
    hindi_name: 'भरतनाट्यम शास्त्रीय नृत्य एवं घुंघरू',
    category: 'music_performance',
    category_label: 'Music & Performing Arts',
    region: 'South India',
    state: 'Tamil Nadu',
    cluster: 'Thanjavur & Chennai',
    historical_era: 'Natya Shastra Antiquity (c. 200 BCE)',
    gi_status: 'Living Intangible Classical Tradition',
    image_url: '/images/heritage/dance_bharatanatyam.jpg',
    artisan_photo_url: '/images/heritage/dance_bharatanatyam.jpg',
    image_attribution: 'Kalakshetra Foundation & Tamil Nadu Eyal Isai Nataka Manram',
    materials: ['Kanjeevaram silk pleated costume with gold zari', 'Bronze ankle bells (salangai/ghungroo)', 'Temple jewelry (vanki, oddiyanam, thalaisaman)', 'Natural alta red dye'],
    techniques: ['Adavus (rhythmic movement units)', 'Abhinaya (poetic facial expression)', 'Bhanga (geometric postures like Aramandi)'],
    cultural_significance: 'Originating as Sadir Natyam performed by devadasis in temple mandapams, this sacred dance form interprets divine poetry through strict geometric footwork and hand gestures (hastas).',
    historical_context: 'Codified by the Thanjavur Quartet in the 19th century and revived globally in the 1930s by Rukmini Devi Arundale at Kalakshetra.',
    manufacturing_process: 'Costume artisans tailor silk sarees with accordion pleats that open in fan shapes during the aramandi stance, complemented by handcrafted brass salangai bells on leather straps.',
    related_object_ids: ['obj-thanjavur-krishna', 'obj-classical-sitar'],
    verification_status: 'curator_reviewed',
    primary_source: 'Natya Shastra Text & Sangeet Natak Akademi Classical Registry'
  },

  // --- F. CULTURAL OBJECTS & TRADITIONS ---
  {
    id: 'obj-chhau-mask',
    name: 'Purulia Chhau Sacred Clay & Paper Mask',
    hindi_name: 'पुरुलिया छऊ नृत्य मुखौटा',
    category: 'cultural_objects',
    category_label: 'Cultural Objects & Traditions',
    region: 'East India',
    state: 'West Bengal',
    cluster: 'Charida Village, Purulia District',
    historical_era: 'Living Martial Mask Tradition',
    gi_status: 'GI Registry No. 562',
    image_url: '/images/heritage/craft_chhau_mask.jpg',
    artisan_photo_url: '/images/heritage/craft_chhau_mask.jpg',
    image_attribution: 'Charida Mask Makers Cooperative & UNESCO ICH Archive',
    materials: ['Clay from the Kasai river', 'Recycled paper and paper pulp', 'Cotton fabric bandage layers', 'Bright enamel colors', 'Jari, peacock feathers, and beads'],
    techniques: ['Clay armature molding', 'Paper-cloth lamination layering', 'Hand-painted expressive demonic/heroic expressions'],
    cultural_significance: 'Worn by acrobat-dancers during the martial Chhau dance festivals in spring. Masks depict gods (Durga, Shiva) and demons (Mahishasura) with dramatic crowns.',
    historical_context: 'Charida village in Purulia is entirely dedicated to mask-making, preserving centuries of mythological facial sculpting for tribal troupes.',
    manufacturing_process: 'River clay forms the facial base. Layers of soft paper soaked in gum are pasted over it. Once dried in the sun, fine facial contours are painted and crowned with beads.',
    related_object_ids: ['obj-dhokra-elephant', 'obj-warli-canvas'],
    verification_status: 'curator_reviewed',
    primary_source: 'UNESCO Representative List of Intangible Cultural Heritage'
  },
  {
    id: 'obj-bastar-diya',
    name: 'Bastar Tribal Ceremonial Bell Metal Diya',
    hindi_name: 'बस्तर जनजातीय पीतल दीया',
    category: 'cultural_objects',
    category_label: 'Cultural Objects & Traditions',
    region: 'Central India',
    state: 'Chhattisgarh',
    cluster: 'Kondagaon Tribal Hub',
    historical_era: 'Ancient Living Animist Tradition',
    gi_status: 'GI Registry No. 83',
    image_url: '/images/heritage/craft_dhokra_diya.jpg',
    artisan_photo_url: '/images/heritage/artisan_dhokra.jpg',
    image_attribution: 'Bastar Ghadwa Art Collective & TRIFED Tribal Archives',
    materials: ['Scrap bell metal / brass', 'Riverbed clay and anthill soil', 'Natural beeswax and resin'],
    techniques: ['Lost-wax casting (cire perdue)', 'Channeled crucible firing', 'Wire chasing and buffing'],
    cultural_significance: 'Lit during harvest ceremonies and ancestral rites to guide spirits of the forest. The tiered oil lamps feature guardian birds and fertility cobras.',
    historical_context: 'Maintained by forest-dwelling tribal metalsmiths without industrial tools, reflecting the sanctity of fire in tribal communities.',
    manufacturing_process: 'Beeswax spaghetti threads are hand-extruded and coiled around a clay model. When baked, wax drains through escape vents, replaced by boiling liquid brass.',
    associated_artisan_id: 'art-suresh-jhare',
    associated_artisan_name: 'Suresh Jhare & Bastar Clan',
    related_object_ids: ['obj-dhokra-elephant', 'obj-bidriware-aftaba'],
    verification_status: 'curator_reviewed',
    primary_source: 'Anthropological Survey of India Bastar Monograph'
  }
];

export interface HeritageTimelineMilestone {
  era: string;
  approx_period: string;
  significance: string;
  prominent_crafts: string[];
  associated_regions: string[];
}

export const HERITAGE_TIMELINE: HeritageTimelineMilestone[] = [
  {
    era: 'Harappan & Vedic Antiquity',
    approx_period: 'c. 2500 BCE – 500 BCE',
    significance: 'Origin of lost-wax bronze casting (Dancing Girl of Mohenjo-daro), natural dye cotton cultivation, and early terracotta pottery.',
    prominent_crafts: ['Lost-Wax Bronze Metallurgy', 'Alluvial Terracotta', 'Hand-spun Cotton'],
    associated_regions: ['Indus Valley', 'Central India', 'Gangetic Plains']
  },
  {
    era: 'Golden Classical & Temple Age',
    approx_period: 'c. 300 CE – 1300 CE',
    significance: 'Monumental Dravidian and Kalinga stone architecture, Natya Shastra dance codification, and sacred temple narrative scrolls.',
    prominent_crafts: ['Granite Temple Carving', 'Chola Bronze Casting', 'Kalamkari Temple Scrolls'],
    associated_regions: ['Thanjavur', 'Kalinga / Odisha', 'Konark', 'Deccan']
  },
  {
    era: 'Sultanate & Mughal Courtly Synthesis',
    approx_period: 'c. 1300 CE – 1750 CE',
    significance: 'Flourishing of Bahmani Bidriware silver inlays, Varanasi royal Kinkhwab gold brocades, and Kashmir Kani Pashmina tapestry weaving.',
    prominent_crafts: ['Bidriware Metal Inlay', 'Banarasi Silk Weaving', 'Pashmina Kani Shawls', 'Jaipur Blue Pottery'],
    associated_regions: ['Bidar', 'Varanasi', 'Kashmir Valley', 'Jaipur']
  },
  {
    era: 'Maratha & Regional Revival',
    approx_period: 'c. 1650 CE – 1900 CE',
    significance: 'Perfection of Thanjavur 22K gold foil gesso paintings under Serfoji II, Warli tribal community rituals, and Kutch Rogan painting.',
    prominent_crafts: ['Thanjavur Gold Leaf Painting', 'Rogan Art of Kutch', 'Bankura Terracotta Horses'],
    associated_regions: ['Thanjavur', 'Kutch / Gujarat', 'Maharashtra', 'Bengal']
  },
  {
    era: 'Living GI & Modern Artisan Empowerment',
    approx_period: '1999 CE – Present',
    significance: 'Enactment of the Geographical Indications of Goods Act (1999), master artisan Padma honors, and digital preservation of living oral history.',
    prominent_crafts: ['All 8 Pan-India Certified GI Clusters', 'Digital Heritage Vault', 'Voice of Tradition Archives'],
    associated_regions: ['Pan-India (North, South, East, West, Central)']
  }
];
