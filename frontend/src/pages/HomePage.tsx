import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Mic,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Camera,
  Layers,
  HeartHandshake,
  CheckCircle2,
  Users,
  Award,
  Film,
  MapPin,
  Play,
  RotateCcw,
  IndianRupee,
  Flame,
  Globe2,
  ShoppingBag,
  Sparkles,
  Trophy
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { CraftVideoPlayer } from '../components/ui/CraftVideoPlayer';
import { CraftAlchemyShowcase } from '../components/interactive/CraftAlchemyShowcase';
import { TiltCard } from '../components/interactive/TiltCard';
import { RoganCraftSimulator } from '../components/interactive/RoganCraftSimulator';
import { MysteryCraftQuiz } from '../components/interactive/MysteryCraftQuiz';

interface CraftCardData {
  id: string;
  slug: string;
  name: string;
  alternateName?: string;
  region: string;
  state: string;
  zone: 'North' | 'South' | 'West' | 'East' | 'Central';
  category: string;
  image: string;
  summary: string;
  giTag: string;
  heritageEra: string;
  videoDuration: string;
  videoUrl: string;
  youtubeId?: string;
  videoPoster: string;
  videoTitle: string;
  videoBookmarks: Array<{ timestamp: string; label: string; desc: string }>;
  masterArtisan: string;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [selectedZone, setSelectedZone] = useState<string>('All India');
  const [activeVideoCraftId, setActiveVideoCraftId] = useState<string>('bidriware');
  const [isRoganOpen, setIsRoganOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const panIndianCrafts: CraftCardData[] = [
    {
      id: 'bidriware',
      slug: 'bidriware',
      name: 'Bidriware Metal Inlay',
      alternateName: 'Tarkashi / Aftaba Inlay',
      region: 'Bidar',
      state: 'Karnataka',
      zone: 'South',
      category: 'Metal Inlay Craft',
      image: '/images/heritage/craft_bidriware_aftaba.jpg',
      summary: 'Pure 99.9% silver wire cold-hammered into chiseled zinc alloy and patinated with nitrate soil from Bidar Fort ruins.',
      giTag: 'GI Application No. 17',
      heritageEra: '14th c. Bahmani Sultanate',
      videoDuration: '4:45',
      videoUrl: 'https://www.youtube-nocookie.com/embed/NMFaPZAFgUU',
      youtubeId: 'NMFaPZAFgUU',
      videoPoster: '/images/heritage/workshop_bidriware.jpg',
      videoTitle: 'Bidriware Masterclass: The Alchemy of Silver and Fort Soil',
      videoBookmarks: [
        { timestamp: '0:20', label: 'Zinc Casting', desc: 'Pouring molten alloy into oiled soil molds' },
        { timestamp: '1:15', label: 'Chisel Engraving', desc: 'Freehand carving of Bahmani floral vines' },
        { timestamp: '2:30', label: 'Silver Inlay', desc: 'Hammering 99.9% fine silver wire flush' },
        { timestamp: '3:40', label: 'Fort Soil Oxidation', desc: 'Zinc turns velvet black in seconds' }
      ],
      masterArtisan: 'Shah Rashid Ahmed Qadri (Padma Shri)'
    },
    {
      id: 'kalamkari-srikalahasti',
      slug: 'kalamkari-srikalahasti',
      name: 'Srikalahasti Kalamkari',
      alternateName: 'Temple Vastra Chitra',
      region: 'Srikalahasti, Tirupati',
      state: 'Andhra Pradesh',
      zone: 'South',
      category: 'Hand-Painted Natural Dye',
      image: '/images/heritage/craft_kalamkari.jpg',
      summary: 'Temple narrative scrolls hand-drawn on river cotton using sharpened bamboo pens, fermented iron Kasim, and buffalo milk resist.',
      giTag: 'GI Registry No. 19',
      heritageEra: 'Nayaka & Vijayanagara Dynasties',
      videoDuration: '5:15',
      videoUrl: 'https://www.youtube-nocookie.com/embed/u3uCqf9cR1I',
      youtubeId: 'u3uCqf9cR1I',
      videoPoster: '/images/heritage/workshop_kalamkari.jpg',
      videoTitle: 'Sacred Swarnamukhi: 16 Stages of Srikalahasti Kalamkari',
      videoBookmarks: [
        { timestamp: '0:30', label: 'Milk Preparation', desc: 'Soaking cotton in high-fat buffalo milk' },
        { timestamp: '1:45', label: 'Bamboo Kalam Drawing', desc: 'Freehand inking with iron-jaggery Kasim' },
        { timestamp: '3:10', label: 'Natural Dye Boiling', desc: 'Madder root boiling in copper vats' },
        { timestamp: '4:20', label: 'River Bleaching', desc: 'Sun-drying on Swarnamukhi sandbanks' }
      ],
      masterArtisan: 'Jonnalagadda Niranjan (National Master)'
    },
    {
      id: 'rogan-art',
      slug: 'rogan-art',
      name: 'Rogan Art of Kutch',
      alternateName: 'Kutch Rogan Chhap',
      region: 'Nirona, Kutch',
      state: 'Gujarat',
      zone: 'West',
      category: 'Oil-Based Fabric Painting',
      image: '/images/heritage/artisan_rogan.jpg',
      summary: 'Hand-pressed castor oil boiled for 48 hours into elastic gel, guided airborne via a brass stylus into mirror-folded Tree of Life motifs.',
      giTag: 'UNESCO Intangible Nomination',
      heritageEra: '300+ Years Living Lineage',
      videoDuration: '4:15',
      videoUrl: 'https://www.youtube-nocookie.com/embed/HXeb5C8PXvE',
      youtubeId: 'HXeb5C8PXvE',
      videoPoster: '/images/heritage/workshop_rogan.jpg',
      videoTitle: 'The Flying Thread: Khatri Family Rogan Art in Kutch',
      videoBookmarks: [
        { timestamp: '0:15', label: 'Castor Oil Reduction', desc: '48-hour boiling into thick viscous paste' },
        { timestamp: '1:20', label: 'Palm Color Warming', desc: 'Working colored paste on palm with body heat' },
        { timestamp: '2:40', label: 'Airborne Filament Drawing', desc: 'Stylus threads drawn without touching fabric' },
        { timestamp: '3:35', label: 'Mirror Symmetry Fold', desc: 'Folding cloth to transfer exact mirror image' }
      ],
      masterArtisan: 'Abdul Gafur Khatri (Padma Shri)'
    },
    {
      id: 'dhokra-casting',
      slug: 'dhokra-casting',
      name: 'Bastar Dhokra Lost-Wax Casting',
      alternateName: 'Ghadwa Bell Metal',
      region: 'Bastar & Kondagaon',
      state: 'Chhattisgarh',
      zone: 'Central',
      category: 'Ancient Metal Casting',
      image: '/images/heritage/craft_dhokra_elephant.jpg',
      summary: 'A 4,000-year-old lost-wax bell metal casting technique dating back to the Mohenjo-daro Dancing Girl, using clay anthill molds and natural beeswax coils.',
      giTag: 'GI Registry No. 83',
      heritageEra: '4,000+ Years Harappan Link',
      videoDuration: '4:50',
      videoUrl: 'https://www.youtube-nocookie.com/embed/GxzPmYR5beY',
      youtubeId: 'GxzPmYR5beY',
      videoPoster: '/images/heritage/workshop_dhokra.jpg',
      videoTitle: '4,000 Years in Molten Bronze: Bastar Dhokra Artisans',
      videoBookmarks: [
        { timestamp: '0:25', label: 'Beeswax Extrusion', desc: 'Pressing tree-resin wax coils' },
        { timestamp: '1:40', label: 'Wrapping Clay Core', desc: 'Figurative tribal deity sculpting' },
        { timestamp: '3:00', label: 'Crucible Pit Smelting', desc: 'Lost wax burning out under red heat' },
        { timestamp: '4:15', label: 'Breaking the Mold', desc: 'Revealing the one-of-a-kind brass totem' }
      ],
      masterArtisan: 'Suresh Jhare & Bastar Ghadwa Clan'
    },
    {
      id: 'thanjavur-painting',
      slug: 'thanjavur-painting',
      name: 'Thanjavur 22K Gold Foil Painting',
      alternateName: 'Tanjore Palagai Padam',
      region: 'Thanjavur',
      state: 'Tamil Nadu',
      zone: 'South',
      category: 'Embossed Gold Foil Painting',
      image: '/images/heritage/craft_thanjavur.png',
      summary: 'Classical South Indian temple paintings adorned with 22-carat pure gold leaf relief (sukka gesso) and semi-precious gemstones on seasoned teakwood planks.',
      giTag: 'GI Registry No. 24',
      heritageEra: '16th c. Nayaka & Maratha Dynasties',
      videoDuration: '4:30',
      videoUrl: 'https://www.youtube-nocookie.com/embed/NMFaPZAFgUU',
      youtubeId: 'NMFaPZAFgUU',
      videoPoster: '/images/heritage/craft_thanjavur.png',
      videoTitle: 'Gold of the Cholas: Master Craftsmen at Saraswathi Mahal',
      videoBookmarks: [
        { timestamp: '0:30', label: 'Teak Board Seasoning', desc: 'Cotton cloth pasted with tamarind seed glue' },
        { timestamp: '1:30', label: 'Sukka Gesso Relief', desc: 'Sculpting 3D arches and jewelry' },
        { timestamp: '2:45', label: 'Gemstone Encrusting', desc: 'Setting semi-precious Jaipur stones' },
        { timestamp: '3:50', label: '22K Gold Burnishing', desc: 'Applying pure gold foil sheets' }
      ],
      masterArtisan: 'P. Swaminathan (Saraswathi Mahal Guild)'
    },
    {
      id: 'madhubani-painting',
      slug: 'madhubani-painting',
      name: 'Madhubani (Mithila) Folk Painting',
      alternateName: 'Mithila Kohbar Chitrakala',
      region: 'Madhubani & Darbhanga',
      state: 'Bihar',
      zone: 'East',
      category: 'Indigenous Folk Painting',
      image: '/images/heritage/craft_madhubani.jpg',
      summary: 'Centuries-old domestic ritual art drawn by Mithila women with sharpened bamboo slivers, lamp soot black, cow dung primer, and vibrant botanical pigments.',
      giTag: 'GI Registry No. 105',
      heritageEra: 'Ancient Domestic Living Art',
      videoDuration: '4:20',
      videoUrl: 'https://www.youtube-nocookie.com/embed/HXeb5C8PXvE',
      youtubeId: 'HXeb5C8PXvE',
      videoPoster: '/images/heritage/workshop_madhubani.jpg',
      videoTitle: 'Voices of Jitwarpur: Living Mithila Lineages',
      videoBookmarks: [
        { timestamp: '0:20', label: 'Gobar Wash', desc: 'Earthy priming of handmade sheets' },
        { timestamp: '1:15', label: 'Bamboo Nib Inking', desc: 'Double lines of sacred Kohbar motifs' },
        { timestamp: '2:40', label: 'Plant Color Boiling', desc: 'Extracting turmeric and palash pigments' },
        { timestamp: '3:45', label: 'Kachni Hatching', desc: 'Intricate cross-hatching texture' }
      ],
      masterArtisan: 'Baua Devi (Padma Shri)'
    },
    {
      id: 'kashmir-pashmina',
      slug: 'kashmir-pashmina',
      name: 'Kashmir Pashmina Handloom Weave',
      alternateName: 'Changthangi Kani Shawl',
      region: 'Srinagar & Budgam',
      state: 'Jammu & Kashmir',
      zone: 'North',
      category: 'Fine Handwoven Wool Textile',
      image: '/images/heritage/craft_pashmina_shawl.jpg',
      summary: 'The pinnacle of fine wool craft, hand-spun on wooden Yender wheels from the 12-micron underfleece of Himalayan Changthangi goats and woven on traditional looms.',
      giTag: 'GI Registry No. 46',
      heritageEra: '15th c. Sultan Zain-ul-Abidin',
      videoDuration: '5:40',
      videoUrl: 'https://www.youtube-nocookie.com/embed/NMFaPZAFgUU',
      youtubeId: 'NMFaPZAFgUU',
      videoPoster: '/images/heritage/artisan_pashmina.jpg',
      videoTitle: 'Fleece of Ladakh, Hands of Kashmir: Authentic Pashmina',
      videoBookmarks: [
        { timestamp: '0:30', label: 'Raw Fleece Sorting', desc: 'Separating 12-micron Changthangi underbelly hair' },
        { timestamp: '1:45', label: 'Yender Spinning', desc: 'Women spinning gossamer yarn on wooden wheels' },
        { timestamp: '3:15', label: 'Saaz Loom Weaving', desc: 'Handloom interweaving with walnut shuttles' },
        { timestamp: '4:30', label: 'Spring Water Wash', desc: 'Purification in Himalayan glacier springs' }
      ],
      masterArtisan: 'Ghulam Mohammad Zargar (Srinagar Guild)'
    },
    {
      id: 'channapatna-toys',
      slug: 'channapatna-toys',
      name: 'Channapatna Lacquerware Toys',
      alternateName: 'Gombegala Ooru Toys',
      region: 'Ramanagara',
      state: 'Karnataka',
      zone: 'South',
      category: 'Turned Wood Lacquer Craft',
      image: '/images/heritage/craft_channapatna_toys.jpg',
      summary: 'Eco-friendly wooden toys hand-turned on lathes from Wrightia tinctoria (Aale mara) wood, dyed with food-grade turmeric, indigo, and kydia tree resin.',
      giTag: 'GI Registry No. 4',
      heritageEra: 'Tipu Sultan Era (18th c.)',
      videoDuration: '3:50',
      videoUrl: 'https://www.youtube-nocookie.com/embed/GxzPmYR5beY',
      youtubeId: 'GxzPmYR5beY',
      videoPoster: '/images/heritage/workshop_channapatna.jpg',
      videoTitle: 'The Toy Town of Karnataka: Natural Lacquer Turning',
      videoBookmarks: [
        { timestamp: '0:20', label: 'Wood Seasoning', desc: 'Cutting soft Aale mara ivory wood' },
        { timestamp: '1:10', label: 'Lathe Turning', desc: 'Hand chisel spinning to contour shape' },
        { timestamp: '2:15', label: 'Natural Lacquer Polish', desc: 'Friction burnishing with Kewda palm leaves' }
      ],
      masterArtisan: 'K. Srinivasan (Channapatna Artisan Sangha)'
    }
  ];

  const zones = ['All India', 'South', 'North', 'West', 'East', 'Central'];

  const filteredCrafts = panIndianCrafts.filter(craft => {
    if (selectedZone === 'All India') return true;
    return craft.zone === selectedZone;
  });

  const activeVideoCraft = panIndianCrafts.find(c => c.id === activeVideoCraftId) || panIndianCrafts[0];

  const featuredMakers = [
    {
      name: 'Shah Rashid Ahmed Qadri',
      craft: 'Bidriware Tarkashi Master',
      location: 'Bidar, Karnataka',
      zone: 'South India',
      awards: 'Padma Shri 2023',
      slug: 'rashid-qadri',
      avatar: '/images/heritage/artisan_bidriware.jpg',
      quote: 'Bidriware cannot be replicated by electroplating. The soil of Bidar Fort carries centuries of mineral memory that only authentic artisans understand.'
    },
    {
      name: 'Jonnalagadda Niranjan',
      craft: 'Master Kalamkari Chitrakar',
      location: 'Srikalahasti, Andhra Pradesh',
      zone: 'South India',
      awards: 'National Award Winner',
      slug: 'j-niranjan',
      avatar: '/images/heritage/artisan_kalamkari.jpg',
      quote: 'When we draw on Swarnamukhi-washed cotton, each stroke of the bamboo pen carries prayers. No machine print can duplicate natural Kasim fermentation.'
    },
    {
      name: 'Abdul Gafur Khatri',
      craft: 'Eighth-Generation Rogan Keeper',
      location: 'Nirona, Gujarat',
      zone: 'West India',
      awards: 'Padma Shri 2019',
      slug: 'gafur-khatri',
      avatar: '/images/heritage/artisan_rogan.jpg',
      quote: 'My family was the last remaining workshop practicing Rogan. We trained over 300 village girls so this 300-year-old art would never die with us.'
    },
    {
      name: 'Suresh Jhare & Clan',
      craft: 'Bastar Dhokra Bell Metal Master',
      location: 'Bastar, Chhattisgarh',
      zone: 'Central India',
      awards: 'State Shilp Guru Nominee',
      slug: 'suresh-jhare',
      avatar: '/images/heritage/artisan_dhokra.jpg',
      quote: 'Every single Dhokra mold is destroyed upon casting. Each bronze deity is truly one-of-a-kind in the universe, molded from forest earth and beeswax.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-editorial text-ink leading-tight sm:leading-snug tracking-tight">
              India’s living heritage <br />
              lives in the hands of its <br />
              <span className="text-white font-bold underline decoration-white/20">master artisans.</span>
            </h1>

            <p className="text-base text-muted max-w-2xl leading-relaxed">
              From the high-altitude wooden looms of Kashmir to the Bahmani silver inlays of Bidar, 
              PARAMPARA AI captures oral stories in native Indian languages, records step-by-step masterclass videos, 
              and establishes verifiable GI-linked heritage archives—with <strong>zero commission</strong> on artisan livelihoods.
            </p>

            {/* Deliberate Action Buttons - Sun Orange for Clickables */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2.5 h-11 px-5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Enter 3D Heritage Museum</span>
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2.5 h-11 px-5 rounded-md bg-surface border border-border hover:border-terracotta hover:text-terracotta text-ink font-medium text-xs tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-terracotta" />
                <span>Join Heritage Guild</span>
              </Link>

              <Link
                to="/studio/stories/new"
                className="inline-flex items-center gap-2.5 h-11 px-4 rounded-md bg-transparent text-muted hover:text-ink font-medium text-xs tracking-wide transition-colors"
              >
                <Mic className="w-4 h-4" />
                <span>Record oral history</span>
              </Link>
            </div>

            {/* Pan-India Trust Metrics in Archival Tabular Format */}
            <div className="pt-6 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="space-y-0.5">
                <span className="font-mono text-base font-semibold text-ink">8 Clusters</span>
                <p className="text-[11px] text-muted leading-tight">GI Registry grounded</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-base font-semibold text-ink">100% Cited</span>
                <p className="text-[11px] text-muted leading-tight">Museum monographs</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-base font-semibold text-ink">₹0 Middlemen</span>
                <p className="text-[11px] text-muted leading-tight">Direct artisan guild</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-base font-semibold text-ink">9 Dialects</span>
                <p className="text-[11px] text-muted leading-tight">Native oral records</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Spotlight Card with 3D Specular Tilt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <TiltCard maxTilt={8} className="rounded-lg shadow-card">
              <div className="relative rounded-lg overflow-hidden bg-surface p-2.5 border border-border shadow-card">
                <div className="relative h-96 rounded-md overflow-hidden bg-[#08080A]">
                  <img
                    src="/images/heritage/craft_bidriware_aftaba.jpg"
                    alt="Bidriware Metal Inlay Mastercraft"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/95 via-[#08080A]/40 to-transparent" />
                  
                  {/* Archival Tag Header */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-surface/90 text-snow border border-border flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-muted" />
                      GI Registry No. 17
                    </span>
                    <span className="text-xs font-mono text-muted px-2 py-0.5 rounded-sm bg-surface/80 border border-border">
                      Karnataka • South
                    </span>
                  </div>

                  {/* Bottom Spotlight Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1.5">
                    <span className="text-xs font-mono text-muted">Primary tradition</span>
                    <h3 className="font-editorial text-2xl text-white">Bidriware Metal Inlay</h3>
                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      99.9% fine silver wire hand-hammered cold into zinc-copper alloy, blackened instantly using centuries-old Bidar Fort soil.
                    </p>
                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-muted text-[11px]">Master: Shah Rashid Qadri</span>
                      <Link
                        to="/explore/bidriware"
                        className="text-terracotta hover:text-terracotta-hover font-medium flex items-center gap-1 text-[11px] transition-colors"
                      >
                        <span>Examine record</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* UNEXPECTED & FASCINATING FEATURE: CRAFT ALCHEMY METAMORPHOSIS & 4X LOUPE */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <CraftAlchemyShowcase />
      </motion.section>

      {/* HACKATHON HIGHLIGHT: INTERACTIVE HERITAGE SANDBOXES & GAMIFIED DISCOVERY */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Rogan Silk Mirroring Simulator */}
          <div className="p-6 rounded-lg bg-surface border border-border shadow-card flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface border border-border text-ink text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-muted" />
                <span>Interactive craft sandbox</span>
              </div>
              <h3 className="text-xl font-editorial text-ink">
                Kutch Rogan painting simulator
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Experience the rare living textile art: draw viscous castor-oil threads on a silk canvas, then fold and press the fabric to watch your symmetrical mandala blossom in real time.
              </p>
            </div>
            <button
              onClick={() => setIsRoganOpen(true)}
              className="w-full py-2.5 px-4 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Launch Rogan silk simulator</span>
            </button>
          </div>

          {/* Card 2: 60-Second Mystery Heritage Quiz */}
          <div className="p-6 rounded-lg bg-surface border border-border shadow-card flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface border border-border text-ink text-xs font-mono">
                <Trophy className="w-3.5 h-3.5 text-muted" />
                <span>60s Cultural challenge</span>
              </div>
              <h3 className="text-xl font-editorial text-ink">
                Microscopic craft texture quiz
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Test your knowledge of Indian craft traditions. Examine high-resolution macro-lens thread counts and unseal cryptic clues to unlock your master heritage rank.
              </p>
            </div>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="w-full py-2.5 px-4 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Trophy className="w-4 h-4 text-white" />
              <span>Take the 60s mystery quiz</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* INTERACTIVE VIDEO MASTERCLASS SPOTLIGHT REEL */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-surface text-ink py-16 border-y border-border relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-paper text-muted border border-border text-xs font-mono mb-3">
                <Film className="w-3.5 h-3.5" />
                <span>Process archive</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-editorial text-ink">
                Master artisans at work
              </h2>
              <p className="text-sm text-muted mt-2 max-w-2xl leading-relaxed">
                Every craft record includes high-definition process footage with timestamped chapter bookmarks, capturing oral secrets passed down through generations.
              </p>
            </div>

            {/* Video Craft Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {panIndianCrafts.slice(0, 4).map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveVideoCraftId(c.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 ${
                    activeVideoCraftId === c.id
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'bg-paper text-ink hover:border-terracotta border border-border'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{c.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Embedded Video Component */}
          <div className="rounded-lg overflow-hidden border border-border bg-paper shadow-card">
            <CraftVideoPlayer
              videoUrl={activeVideoCraft.videoUrl}
              youtubeId={activeVideoCraft.youtubeId}
              posterUrl={activeVideoCraft.videoPoster}
              title={activeVideoCraft.videoTitle}
              duration={activeVideoCraft.videoDuration}
              bookmarks={activeVideoCraft.videoBookmarks}
              craftName={activeVideoCraft.name}
              artisanName={activeVideoCraft.masterArtisan}
            />
          </div>
        </div>
      </motion.section>

      {/* PAN-INDIA CRAFTS EXPLORER BY ZONAL REGIONS */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-muted">
              Pan-India archive
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial text-ink mt-1">
              8 Geographical Indication Clusters
            </h2>
            <p className="text-sm text-muted mt-1">
              Filter by zone to discover verified living traditions across India.
            </p>
          </div>

          {/* Zonal Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {zones.map(zone => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedZone === zone
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'bg-surface text-ink border border-border hover:bg-paper'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Crafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredCrafts.map(craft => (
              <motion.div
                key={craft.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="group bg-surface rounded-lg overflow-hidden border border-border shadow-card hover:border-border-strong transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-paper">
                    <img
                      src={craft.image}
                      alt={craft.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-sm text-xs font-mono bg-surface/90 text-ink border border-border backdrop-blur-sm">
                        {craft.zone} zone
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono bg-surface/90 text-ink border border-border">
                        {craft.giTag.split(';')[0]}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow">
                      <span className="flex items-center gap-1 font-medium text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-muted" />
                        {craft.region}, {craft.state}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-surface/90 text-muted px-2 py-0.5 rounded-sm border border-border">
                        <Film className="w-3 h-3 text-muted" />
                        {craft.videoDuration}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <StatusBadge status="curator_reviewed" size="sm" />
                      <span className="text-[11px] font-mono text-muted">{craft.heritageEra}</span>
                    </div>

                    <h3 className="text-lg font-editorial text-ink group-hover:text-terracotta transition-colors leading-snug">
                      {craft.name}
                    </h3>

                    {craft.alternateName && (
                      <p className="text-[11px] text-muted italic">
                        {craft.alternateName}
                      </p>
                    )}

                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      {craft.summary}
                    </p>

                    <div className="pt-2 text-[11px] text-ink/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Artisan: <strong>{craft.masterArtisan.split('(')[0]}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-2 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveVideoCraftId(craft.id);
                      window.scrollTo({ top: 750, behavior: 'smooth' });
                    }}
                    className="text-[11px] text-muted hover:text-ink font-medium flex items-center gap-1 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>Watch Video</span>
                  </button>

                  <Link
                    to={`/explore/${craft.slug}`}
                    className="text-xs font-medium text-terracotta hover:text-terracotta-hover flex items-center gap-1"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* LIVING HERITAGE BAZAAR SPOTLIGHT */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-surface py-16 border-y border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-muted">
                Direct master artisan marketplace
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial text-ink mt-1">
                The Living Heritage Bazaar
              </h2>
              <p className="text-sm text-muted mt-1 max-w-2xl leading-relaxed">
                Acquire verified, museum-grade handcrafted heirlooms directly from registered Indian artisan lineages. 
                Enjoy <strong>0% platform commission</strong>—100% of the acquisition price goes to the maker.
              </p>
            </div>

            <Link
              to="/bazaar"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors shadow-sm"
            >
              <span>Explore entire bazaar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Curated 4 Masterpieces Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'prod-1',
                artisan_id: 'art-1',
                artisan_name: 'Shah Rashid Ahmed Qadri',
                craft_id: 'bidriware',
                craft_name: 'Bidriware Metal Inlay',
                title: 'Imperial Floral Aftaba with Fine Silver Inlay',
                description: 'Zinc-copper ceremonial vessel hand-chiseled and inlaid with 99.9% pure silver wire, blackened using Bidar Fort soil.',
                cultural_story: 'Inspired by 16th-century Bahmani court ceremonial vessels.',
                price_inr: 18500,
                image_url: '/images/heritage/craft_bidriware_aftaba.jpg',
                gi_tag: 'GI Registry No. 17',
                zone: 'South India',
                status: 'published',
                created_at: '2026-10-01T10:00:00Z'
              },
              {
                id: 'prod-2',
                artisan_id: 'art-2',
                artisan_name: 'Jonnalagadda Niranjan',
                craft_id: 'kalamkari-srikalahasti',
                craft_name: 'Srikalahasti Kalamkari',
                title: 'Vriksha-Shiva Sacred Tree of Life Narrative Hanging',
                description: 'Bamboo-drawn narrative scroll on cotton mordanted with pure buffalo milk and fermented natural dyes.',
                cultural_story: 'Drawn over 45 days along the sacred Swarnamukhi riverbank.',
                price_inr: 24000,
                image_url: '/images/heritage/craft_kalamkari.jpg',
                gi_tag: 'GI Registry No. 28',
                zone: 'South India',
                status: 'published',
                created_at: '2026-10-05T12:00:00Z'
              },
              {
                id: 'prod-3',
                artisan_id: 'art-3',
                artisan_name: 'Abdul Gafur Khatri',
                craft_id: 'rogan-art',
                craft_name: 'Rogan Art of Kutch',
                title: 'Master Rogan Tree of Life Stole on Raw Silk',
                description: 'Painted using boiled castor oil pigment with a suspended brass stylus and mirror-folded on raw silk.',
                cultural_story: 'Crafted using 48-hour cured castor seed paste and mineral ochres.',
                price_inr: 32000,
                image_url: '/images/heritage/artisan_rogan.jpg',
                gi_tag: 'GI Candidate (Rogan)',
                zone: 'West India',
                status: 'published',
                created_at: '2026-10-10T15:00:00Z'
              },
              {
                id: 'prod-10',
                artisan_id: 'art-10',
                artisan_name: 'Babu Lal Artisans Sangha',
                craft_id: 'channapatna-toys',
                craft_name: 'Channapatna Lacquer Woodcraft',
                title: 'Royal Palace Wooden Chess Set in Vegetable Lac',
                description: 'Turned ivory wood chessmen hand-polished on foot treadle lathes with organic lac and turmeric.',
                cultural_story: 'Smooth as marble, sustainable, and painted with natural botanical extracts.',
                price_inr: 4200,
                image_url: '/images/heritage/craft_channapatna_toys.jpg',
                gi_tag: 'GI Registry No. 23',
                zone: 'South India',
                status: 'published',
                created_at: '2026-10-28T09:00:00Z'
              }
            ].map((prod) => (
              <TiltCard key={prod.id} maxTilt={6} className="h-full">
                <div
                  className="bg-paper rounded-lg overflow-hidden border border-border shadow-card hover:border-border-strong transition-colors flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-surface">
                      <img
                        src={prod.image_url}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-paper/90 px-2 py-0.5 rounded-sm text-[10px] font-mono text-ink border border-border">
                        {prod.gi_tag}
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white flex items-center justify-between text-[11px] font-mono drop-shadow">
                        <span>{prod.zone}</span>
                        <span className="text-emerald-400 font-semibold">0% Commission</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-xs font-mono text-muted block">
                        {prod.craft_name}
                      </span>
                      <h3 className="text-sm font-semibold text-ink line-clamp-1">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>

                      <div className="pt-2 border-t border-border flex items-baseline justify-between text-xs">
                        <div>
                          <span className="text-xs font-mono text-muted block">Direct price</span>
                          <span className="text-base font-editorial font-semibold text-ink">
                            ₹{prod.price_inr.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-muted">
                          Maker: {prod.artisan_name.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 mt-2 border-t border-border flex items-center gap-2">
                    <Link
                      to={`/bazaar?product=${prod.id}`}
                      className="flex-1 h-9 rounded-md bg-surface border border-border hover:bg-paper text-ink text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View lore</span>
                    </Link>

                    <button
                      onClick={() => addToCart(prod as any)}
                      className="flex-1 h-9 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-white" />
                      <span>Acquire</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* MEET THE LIVING MAKERS (PAN-INDIA FELLOWS) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-surface py-16 border-y border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-muted">
              Living knowledge holders
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial text-ink">
              Master Artisans of India
            </h2>
            <p className="text-sm text-muted">
              Every documented record connects back to the master artisans, families, and collectives who preserve these traditions with consent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMakers.map((maker) => (
              <div
                key={maker.slug}
                className="bg-paper rounded-lg p-5 border border-border shadow-card hover:border-border-strong transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={maker.avatar}
                      alt={maker.name}
                      className="w-14 h-14 rounded-md object-cover border border-border flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-xs font-mono text-sage">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Consent verified</span>
                      </div>
                      <h3 className="text-sm font-semibold text-ink leading-tight mt-0.5">{maker.name}</h3>
                      <p className="text-xs text-muted font-medium">{maker.craft}</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted/90 italic leading-relaxed bg-surface p-3 rounded-md border border-border">
                    "{maker.quote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted flex items-center gap-1 text-[11px] font-mono">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    {maker.awards}
                  </span>
                  <Link
                    to={`/artisans/${maker.slug}`}
                    className="text-xs font-medium text-terracotta hover:text-terracotta-hover"
                  >
                    View studio →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* HERITAGE LENS AI SCANNER INTERACTIVE TEASER */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-lg bg-surface text-ink p-8 sm:p-12 overflow-hidden relative border border-border shadow-card">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono text-muted">
                Heritage Lens · Multimodal AI
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial text-ink leading-tight">
                Photograph an unfamiliar Indian craft. <br />
                Discover its regional roots responsibly.
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                Upload a photograph of any metalwork, handloom textile, or folk painting. 
                Our model analyzes visible materials, brush strokes, and alloy patinas, 
                comparing them against our verified Pan-India archive—with transparent uncertainty notes and zero unsupported claims.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/heritage-lens"
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Launch visual explorer</span>
                </Link>
                <Link
                  to="/about"
                  className="text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors"
                >
                  Non-hallucination policy →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-md overflow-hidden border border-border p-2 bg-paper max-w-sm w-full shadow-sm">
                <img
                  src="/images/heritage/artisan_rogan.jpg"
                  alt="Rogan Art AI Visual Analysis"
                  className="w-full h-60 object-cover rounded-sm"
                />
                <div className="p-3 text-xs text-muted space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-ink">Multimodal recognition</span>
                    <span className="text-xs font-mono bg-surface text-ink border border-border px-1.5 py-0.5 rounded-sm font-semibold">94% match</span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Detected: Viscous boiled castor pigment, symmetrical Tree of Life mirror-fold, freehand brass stylus thread.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CORE 5-STAGE LIVING LOOP */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-surface py-16 border-y border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono text-muted">
              Archival architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial text-ink">
              Capture → Review → Preserve → Discover → Connect
            </h2>
            <p className="text-sm text-muted">
              Most solutions stop at image identification or e-commerce listing. PARAMPARA AI connects the complete knowledge lifecycle with human verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Capture', desc: 'Artisans record stories and process notes in their native Indian language or upload craft photos.' },
              { step: '02', title: 'Review', desc: 'AI provides preliminary transcription and structuring; the contributor edits and confirms consent.' },
              { step: '03', title: 'Preserve', desc: 'Curators check primary historical sources and verify claims before publication to the archive.' },
              { step: '04', title: 'Discover', desc: 'Visitors explore through visual matching (Heritage Lens) and ask source-grounded questions.' },
              { step: '05', title: 'Connect', desc: 'Artisans leverage approved records to build product stories and access verified opportunities in INR (₹).' }
            ].map((s, idx) => (
              <div
                key={s.step}
                className="bg-paper rounded-lg p-4 border border-border shadow-card hover:border-border-strong transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-sm font-mono text-muted">{s.step}</span>
                  <h3 className="text-sm font-semibold text-ink mt-2">{s.title}</h3>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-border text-[11px] font-mono text-muted flex items-center gap-1">
                  <span>Phase {idx + 1}</span>
                  <ArrowRight className="w-3 h-3 text-terracotta" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Interactive Modals */}
      <RoganCraftSimulator isOpen={isRoganOpen} onClose={() => setIsRoganOpen(false)} />
      <MysteryCraftQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
};
