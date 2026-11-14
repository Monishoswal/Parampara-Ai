import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Compass,
  Layers,
  ChevronRight,
  ShieldCheck,
  Send,
  X,
  Sparkles,
  Home,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Flame,
  Radio,
  Play,
  Pause,
  Navigation,
  Search,
  Palette,
  Eye,
  AlertTriangle,
  ExternalLink,
  Satellite,
  Mountain,
  Map as MapIcon,
  Moon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoganCraftSimulator } from '../components/interactive/RoganCraftSimulator';
import { DhokraCastingSimulator } from '../components/interactive/DhokraCastingSimulator';

export type CraftGenre = 'all' | 'textile' | 'metal' | 'painting' | 'wood' | 'pottery';
export type MapTileMode = 'google_hybrid' | 'google_terrain' | 'google_roadmap' | 'dark_matter';

export interface CraftPlace {
  id: string;
  city: string;
  state: string;
  regionZone: string;
  craftName: string;
  genre: CraftGenre;
  lat: number;
  lng: number;
  status: 'endangered' | 'active';
  giTag: string;
  activeWorkshops: number;
  summary: string;
  materials: string[];
  imageUrl: string;
  fieldAudioTitle: string;
  simulatorId?: 'rogan' | 'dhokra' | null;
  residencyOpen: boolean;
  residencyDuration: string;
}

export const CRAFT_PLACES: CraftPlace[] = [
  {
    id: 'srinagar',
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    regionZone: 'Kashmir Valley & Himalayas',
    craftName: 'Changthangi Pashmina Weaving',
    genre: 'textile',
    lat: 34.0837,
    lng: 74.7973,
    status: 'active',
    giTag: 'GI #46',
    activeWorkshops: 140,
    summary: 'Ultra-fine 12-micron Changthangi mountain goat fleece hand-spun on wooden charkhas and hand-woven into gossamer shawls with Sozni needlework.',
    materials: ['Changthangi Pashm', 'Walnut Bark Dye', 'Saffron Extract'],
    imageUrl: '/images/heritage/artisan_kalamkari.jpg',
    fieldAudioTitle: 'Spindle hum & Jhelum river waters',
    residencyOpen: true,
    residencyDuration: '7–14 Days',
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    regionZone: 'Thar Desert & Aravalli Belt',
    craftName: 'Blue Pottery & Sanganeri Block Print',
    genre: 'pottery',
    lat: 26.9124,
    lng: 75.7873,
    status: 'active',
    giTag: 'GI #35',
    activeWorkshops: 85,
    summary: 'Non-clay Egyptian quartz paste pottery glazed with Fuller’s earth, natural gum, and copper-oxide turquoise pigments.',
    materials: ['Ground Quartz Stone', 'Natural Glaze', 'Copper Oxide'],
    imageUrl: '/images/heritage/craft_thanjavur.png',
    fieldAudioTitle: 'Potter wheel whir & wood-kiln crackle',
    residencyOpen: true,
    residencyDuration: '5–10 Days',
  },
  {
    id: 'kutch',
    city: 'Nirona & Bhuj',
    state: 'Gujarat',
    regionZone: 'Rann of Kutch & Saurashtra',
    craftName: 'Castor-Oil Rogan Art & Ajrakh',
    genre: 'painting',
    lat: 23.3524,
    lng: 69.4589,
    status: 'endangered',
    giTag: 'GI #643',
    activeWorkshops: 1, // Only 1 family surviving
    summary: 'Master artisans boil wild castor oil for 48 hours to create elastic amber paste, pulling ductile threads in mid-air with a blunt brass stylus onto black silk.',
    materials: ['Wild Castor Oil', 'Natural Stone Pigments', 'Mulberry Silk'],
    imageUrl: '/images/heritage/artisan_rogan.jpg',
    fieldAudioTitle: 'Castor thread tension snaps & Kutchhi chants',
    simulatorId: 'rogan',
    residencyOpen: true,
    residencyDuration: '5–10 Days',
  },
  {
    id: 'patan',
    city: 'Patan',
    state: 'Gujarat',
    regionZone: 'Rann of Kutch & Saurashtra',
    craftName: 'Patan Patola Double-Ikkat',
    genre: 'textile',
    lat: 23.8500,
    lng: 72.1167,
    status: 'endangered',
    giTag: 'GI #232',
    activeWorkshops: 3,
    summary: 'Both warp and weft silk bundles are individually tie-dyed before weaving, creating identical front and back designs that remain vivid for 300 years.',
    materials: ['Mulberry Silk', 'Natural Indigofera', 'Madder Root'],
    imageUrl: '/images/heritage/craft_kalamkari.jpg',
    fieldAudioTitle: 'Slanted rosewood loom shuttle clatter',
    residencyOpen: true,
    residencyDuration: '10–21 Days',
  },
  {
    id: 'maheshwar',
    city: 'Maheshwar',
    state: 'Madhya Pradesh',
    regionZone: 'Malwa Plateau & Narmada Basin',
    craftName: 'Maheshwari Silk-Cotton Handlooms',
    genre: 'textile',
    lat: 22.1817,
    lng: 75.5861,
    status: 'active',
    giTag: 'GI #191',
    activeWorkshops: 110,
    summary: 'Reversible border sarees hand-woven along the sacred Narmada River, inspired by Queen Ahilyabai Holkar’s palace temple architecture.',
    materials: ['Mulberry Silk', 'Fine Cotton Yarn', 'Zari Thread'],
    imageUrl: '/images/heritage/craft_thanjavur.png',
    fieldAudioTitle: 'Loom pedal rhythms along Narmada ghats',
    residencyOpen: true,
    residencyDuration: '7–12 Days',
  },
  {
    id: 'varanasi',
    city: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    regionZone: 'Gangetic Plains & Awadh',
    craftName: 'Banarasi Zari Brocade & Kadwa Weaving',
    genre: 'textile',
    lat: 25.3176,
    lng: 82.9739,
    status: 'active',
    giTag: 'GI #99',
    activeWorkshops: 320,
    summary: 'Pure silver and gold electroplated zari threads hand-interlocked into pure silk on manual jacquard pit looms by 7-generation Ansari clans.',
    materials: ['Pure Silk', 'Electroplated Silver Zari', 'Gold Wash'],
    imageUrl: '/images/heritage/craft_kalamkari.jpg',
    fieldAudioTitle: 'Ganga ghat temple chimes & 12-pedal loom clicks',
    residencyOpen: true,
    residencyDuration: '7–14 Days',
  },
  {
    id: 'madhubani',
    city: 'Madhubani',
    state: 'Bihar',
    regionZone: 'Mithila Region',
    craftName: 'Mithila Ritual Line Painting',
    genre: 'painting',
    lat: 26.3534,
    lng: 86.0722,
    status: 'active',
    giTag: 'GI #105',
    activeWorkshops: 240,
    summary: 'Folk geometric line paintings drawn with bamboo twigs, matchsticks, and natural lampblack pigments on fibrous paper primed with cow dung wash.',
    materials: ['Handmade Paper', 'Lampblack', 'Turmeric', 'Indigo'],
    imageUrl: '/images/heritage/craft_madhubani.jpg',
    fieldAudioTitle: 'Maithili folk chants & reed nib sketching',
    residencyOpen: true,
    residencyDuration: '5–14 Days',
  },
  {
    id: 'raghurajpur',
    city: 'Raghurajpur (Puri)',
    state: 'Odisha',
    regionZone: 'Kalinga Coastal Delta',
    craftName: 'Pattachitra Palm-Leaf Engraving',
    genre: 'painting',
    lat: 19.8135,
    lng: 85.8312,
    status: 'active',
    giTag: 'GI #10',
    activeWorkshops: 130,
    summary: 'Sacred palm-leaf scrolls hand-etched with sharp iron styluses and rubbed with natural lampblack and tamarind-gum mineral pigments.',
    materials: ['Seasoned Palm Leaves', 'Iron Stylus', 'Natural Mineral Soot'],
    imageUrl: '/images/heritage/craft_madhubani.jpg',
    fieldAudioTitle: 'Iron stylus etching against dried palm leaves',
    residencyOpen: true,
    residencyDuration: '7–10 Days',
  },
  {
    id: 'bastar',
    city: 'Kondagaon (Bastar)',
    state: 'Chhattisgarh',
    regionZone: 'Dandakaranya Tribal Highlands',
    craftName: 'Bastar Lost-Wax Dhokra Casting',
    genre: 'metal',
    lat: 19.5960,
    lng: 81.6706,
    status: 'active',
    giTag: 'GI #83',
    activeWorkshops: 95,
    summary: 'Ancestral 4,000-year non-ferrous metallurgy dating to Mohenjo-daro, using wild beeswax threads and termite-mound clay molds fired in open ground kilns.',
    materials: ['Wild Beeswax', 'Termite Clay', 'Bell-Metal Bronze Alloy'],
    imageUrl: '/images/heritage/craft_dhokra_elephant.jpg',
    fieldAudioTitle: 'Charcoal kiln crackle & hand-bellows gusts',
    simulatorId: 'dhokra',
    residencyOpen: true,
    residencyDuration: '7–12 Days',
  },
  {
    id: 'bidar',
    city: 'Bidar',
    state: 'Karnataka',
    regionZone: 'Deccan Plateau',
    craftName: 'Bidriware Zinc Silver Inlay',
    genre: 'metal',
    lat: 17.9104,
    lng: 77.5199,
    status: 'active',
    giTag: 'GI #14',
    activeWorkshops: 60,
    summary: 'Jet-black metal alloy oxidized with 15th-century Bidar fort soil, inlaid with 99.9% pure silver wire cold-hammered into hand-chiselled grooves.',
    materials: ['94% Zinc / 6% Copper', 'Pure Silver Wire', 'Bidar Fort Soil'],
    imageUrl: '/images/heritage/craft_bidriware_aftaba.jpg',
    fieldAudioTitle: 'Chisel tapping & fort mud boiling sizzle',
    residencyOpen: true,
    residencyDuration: '5–8 Days',
  },
  {
    id: 'channapatna',
    city: 'Channapatna',
    state: 'Karnataka',
    regionZone: 'Deccan Plateau & Mysore Basin',
    craftName: 'Ivory-Wood Lacquerware Toys',
    genre: 'wood',
    lat: 12.6518,
    lng: 77.2089,
    status: 'active',
    giTag: 'GI #42',
    activeWorkshops: 180,
    summary: 'Eco-friendly polished wooden toys turned on high-speed lathes, colored with non-toxic turmeric and vegetable dyes and buffed with screw-pine leaves.',
    materials: ['Wrightia tinctoria Wood', 'Natural Shellac', 'Turmeric'],
    imageUrl: '/images/heritage/craft_dhokra_elephant.jpg',
    fieldAudioTitle: 'Wood lathe whir & screw-pine leaf friction',
    residencyOpen: true,
    residencyDuration: '3–7 Days',
  },
  {
    id: 'srikalahasti',
    city: 'Srikalahasti',
    state: 'Andhra Pradesh',
    regionZone: 'Coromandel Coastal Plain',
    craftName: '17-Step Vegetable Dye Kalamkari',
    genre: 'painting',
    lat: 13.7498,
    lng: 79.6984,
    status: 'active',
    giTag: 'GI #134',
    activeWorkshops: 75,
    summary: 'Temple narrative scrolls drawn freehand with bamboo pens on unbleached cotton using myrobalan tannins, buffalo milk, and Swarnamukhi river water.',
    materials: ['Organic Cotton', 'Myrobalan Tannins', 'Buffalo Milk Wash'],
    imageUrl: '/images/heritage/craft_kalamkari.jpg',
    fieldAudioTitle: 'Swarnamukhi river water splashes & reed nib strokes',
    residencyOpen: true,
    residencyDuration: '7–14 Days',
  },
  {
    id: 'thanjavur',
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    regionZone: 'Kaveri River Delta',
    craftName: '22K Gold Foil Gesso Art',
    genre: 'painting',
    lat: 10.7870,
    lng: 79.1378,
    status: 'active',
    giTag: 'GI #37',
    activeWorkshops: 50,
    summary: 'Relief-embossed sacred deity paintings adorned with 22-karat pure gold leaf foil, semi-precious gems, and unslaked lime gesso on seasoned teak wood.',
    materials: ['Teak Wood Board', '22K Gold Leaf', 'Unslaked Lime Gesso'],
    imageUrl: '/images/heritage/craft_thanjavur.png',
    fieldAudioTitle: 'Brihadeeswara temple bells & gold burnishing',
    residencyOpen: true,
    residencyDuration: '7–10 Days',
  },
  {
    id: 'aranmula',
    city: 'Aranmula',
    state: 'Kerala',
    regionZone: 'Malabar Coast & Pampa Basin',
    craftName: 'Aranmula Kannadi Front-Surface Metal Mirror',
    genre: 'metal',
    lat: 9.3175,
    lng: 76.6806,
    status: 'endangered',
    giTag: 'GI #1',
    activeWorkshops: 8,
    summary: 'The world’s only zero-refraction front-surface metal mirror, cast from a secret copper-tin alloy without silvering or glass, hand-polished for 45 days with velvet.',
    materials: ['Secret Copper-Tin Alloy', 'River Clay Molds', 'Marotti Seed Oil'],
    imageUrl: '/images/heritage/craft_bidriware_aftaba.jpg',
    fieldAudioTitle: 'Velvet polishing friction & temple chants at Pampa river',
    residencyOpen: false,
    residencyDuration: 'Restricted Guild Lineage',
  }
];

export const CraftMapPage: React.FC = () => {
  const { showToast } = useApp();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [selectedPlace, setSelectedPlace] = useState<CraftPlace>(CRAFT_PLACES[2]); // Default Kutch Rogan
  const [filterGenre, setFilterGenre] = useState<CraftGenre>('all');
  const [filterEndangeredOnly, setFilterEndangeredOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tileMode, setTileMode] = useState<MapTileMode>('google_hybrid');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isResidencyModalOpen, setIsResidencyModalOpen] = useState(false);
  const [isRoganModalOpen, setIsRoganModalOpen] = useState(false);
  const [isDhokraModalOpen, setIsDhokraModalOpen] = useState(false);

  // Residency Form
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPurpose, setApplicantPurpose] = useState('apprentice');
  const [desiredMonth, setDesiredMonth] = useState('October 2026');
  const [residencySubmitted, setResidencySubmitted] = useState(false);

  // Filter places
  const filteredPlaces = CRAFT_PLACES.filter((p) => {
    if (filterGenre !== 'all' && p.genre !== filterGenre) return false;
    if (filterEndangeredOnly && p.status !== 'endangered') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.city.toLowerCase().includes(q) ||
        p.craftName.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.giTag.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Tile layer configuration
  const getTileConfig = (mode: MapTileMode) => {
    switch (mode) {
      case 'google_hybrid':
        return {
          url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: 'Map data &copy; Google Maps Platform'
        };
      case 'google_terrain':
        return {
          url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: 'Map data &copy; Google Maps Platform'
        };
      case 'google_roadmap':
        return {
          url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: 'Map data &copy; Google Maps Platform'
        };
      case 'dark_matter':
      default:
        return {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          maxZoom: 19,
          subdomains: 'abcd',
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        };
    }
  };

  // 1. Initialize Realistic Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Already initialized

    // Center of India: Lat 22.5, Lng 78.9, zoom 5
    const map = L.map(mapContainerRef.current, {
      center: [22.5, 78.9],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false, // We render our own clean zoom controls
      attributionControl: true
    });

    const tileConfig = getTileConfig(tileMode);
    const tileLayer = L.tileLayer(tileConfig.url, {
      maxZoom: tileConfig.maxZoom,
      subdomains: tileConfig.subdomains,
      attribution: tileConfig.attribution
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Handle Tile Mode Switching
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tileConfig = getTileConfig(tileMode);
    const newTileLayer = L.tileLayer(tileConfig.url, {
      maxZoom: tileConfig.maxZoom,
      subdomains: tileConfig.subdomains,
      attribution: tileConfig.attribution
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
  }, [tileMode]);

  // 3. Render Real Interactive Pins on the Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    filteredPlaces.forEach((place) => {
      const isSelected = selectedPlace.id === place.id;
      const isEndangered = place.status === 'endangered';

      // Custom HTML Marker matching Royal Obsidian & Temple Gold
      const customHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%);">
          ${isEndangered ? '<span style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(239, 68, 68, 0.4); animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>' : ''}
          ${isSelected ? '<span style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(255, 122, 0, 0.45); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>' : ''}
          <div style="display: flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 9999px; background: ${
            isSelected ? '#FF7A00' : isEndangered ? '#DC2626' : '#121218'
          }; color: ${isSelected ? '#000000' : '#FFFFFF'}; border: 2px solid ${
            isSelected ? '#FFFFFF' : isEndangered ? '#FCA5A5' : '#FF7A00'
          }; box-shadow: 0 4px 15px rgba(0,0,0,0.7); font-family: ui-monospace, monospace; font-size: 11px; font-weight: bold; white-space: nowrap; cursor: pointer; transition: transform 0.15s ease;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${
              isSelected ? '#000000' : isEndangered ? '#FFFFFF' : '#FF7A00'
            };"></span>
            <span>${place.city.split(' ')[0]}</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'parampara-real-pin',
        html: customHtml,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([place.lat, place.lng], { icon }).addTo(map);

      // On marker click
      marker.on('click', () => {
        setSelectedPlace(place);
        setIsPlayingAudio(false);
        map.flyTo([place.lat, place.lng], Math.max(map.getZoom(), 8), {
          duration: 1.2
        });
      });

      markersRef.current[place.id] = marker;
    });
  }, [filteredPlaces, selectedPlace]);

  // Fly to selected place
  const handleSelectPlace = (place: CraftPlace) => {
    setSelectedPlace(place);
    setIsPlayingAudio(false);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([place.lat, place.lng], 9, { duration: 1.2 });
    }
  };

  const handleZoomIn = () => {
    const map = mapInstanceRef.current;
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    const map = mapInstanceRef.current;
    if (map) map.zoomOut();
  };

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (map) map.flyTo([22.5, 78.9], 5, { duration: 1.2 });
  };

  const handleResidencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) {
      showToast('Please provide your name and contact email.', 'warning');
      return;
    }
    setResidencySubmitted(true);
    showToast(`Residency request registered for ${selectedPlace.city}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 select-none">
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF7A00]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[10px] font-semibold">GIS Geographical Cluster Map</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-editorial tracking-tight text-white leading-tight">
            Craft Sanctuaries <span className="italic font-normal text-gold-gradient">of India</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted/90 max-w-2xl font-sans">
            Locate active artisan workshops across India. Pan, zoom, and select any location to inspect ongoing work.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search craft, city, or GI #..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface border border-border text-xs font-mono text-ink placeholder:text-muted focus:outline-none focus:border-[#FF7A00]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. CONTROLS: REAL MAP TILE MODES & GENRE FILTERS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Craft Discipline Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {[
            { id: 'all', label: 'All Crafts' },
            { id: 'textile', label: '🧵 Textiles' },
            { id: 'metal', label: '🔥 Metallurgy' },
            { id: 'painting', label: '🎨 Folk Art' },
            { id: 'wood', label: '🪵 Lacquerwood' },
            { id: 'pottery', label: '🏺 Pottery' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterGenre(cat.id as CraftGenre)}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                filterGenre === cat.id
                  ? 'bg-ink text-paper font-semibold shadow-sm'
                  : 'bg-surface hover:bg-paper text-muted border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Real Map Tile View Switcher (Google Satellite, Terrain, Roadmap, Dark Matter) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1 bg-surface p-1 rounded-2xl border border-border shadow-sm">
            <button
              onClick={() => setTileMode('google_hybrid')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                tileMode === 'google_hybrid'
                  ? 'bg-[#FF7A00] text-black font-bold shadow-md'
                  : 'text-muted hover:text-ink'
              }`}
              title="Google Maps Realistic Satellite Hybrid"
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Satellite</span>
            </button>

            <button
              onClick={() => setTileMode('google_terrain')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                tileMode === 'google_terrain'
                  ? 'bg-[#FF7A00] text-black font-bold shadow-md'
                  : 'text-muted hover:text-ink'
              }`}
              title="Google Maps Topographic Terrain"
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Terrain</span>
            </button>

            <button
              onClick={() => setTileMode('google_roadmap')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                tileMode === 'google_roadmap'
                  ? 'bg-[#FF7A00] text-black font-bold shadow-md'
                  : 'text-muted hover:text-ink'
              }`}
              title="Google Maps Street Roadmap"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </button>

            <button
              onClick={() => setTileMode('dark_matter')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                tileMode === 'dark_matter'
                  ? 'bg-[#FF7A00] text-black font-bold shadow-md'
                  : 'text-muted hover:text-ink'
              }`}
              title="Royal Obsidian Dark Theme Map"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Obsidian</span>
            </button>
          </div>

          <button
            onClick={() => setFilterEndangeredOnly(!filterEndangeredOnly)}
            className={`px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
              filterEndangeredOnly
                ? 'bg-red-600 text-white border-red-500 font-bold shadow-sm'
                : 'bg-surface text-muted border-border'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Endangered Only</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN MAP CONTAINER & SELECTED DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: REAL INTERACTIVE GOOGLE-STYLE SLIPPY MAP */}
        <div className="lg:col-span-7 bg-[#08080A] border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[640px]">
          {/* Map Top Bar */}
          <div className="flex items-center justify-between z-20 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-xs font-mono text-white font-bold">
                Real Interactive Indian Map ({filteredPlaces.length} Locations)
              </span>
            </div>

            {/* Custom Zoom Controls */}
            <div className="flex items-center gap-1 bg-black/70 p-1 rounded-xl border border-white/15 z-30">
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetView}
                className="p-1.5 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Whole India View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Real Leaflet Map Container */}
          <div className="relative w-full h-[520px] rounded-2xl overflow-hidden my-2 border border-white/10 shadow-inner z-10">
            <div
              ref={mapContainerRef}
              className="w-full h-full"
              style={{ background: '#0B0B10' }}
            />
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#A19E95] pt-2 border-t border-white/10 z-20">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]" />
                <span className="text-white/80">Active Traditional Workshop</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/80">Critically Endangered (&lt;5 Families)</span>
              </span>
            </div>
            <span className="text-white/40">Drag, pan, and zoom freely on real map tiles</span>
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED WORKSHOP DOSSIER (Sticky alongside interactive map on desktop) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-6">
          {selectedPlace && (
            <motion.div
              key={selectedPlace.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface rounded-3xl p-6 border border-border shadow-2xl space-y-5"
            >
              {/* Photo & Badges */}
              <div className="relative rounded-2xl overflow-hidden h-52 border border-border bg-black/40">
                <img
                  src={selectedPlace.imageUrl}
                  alt={selectedPlace.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md ${
                      selectedPlace.status === 'endangered'
                        ? 'bg-red-600 text-white'
                        : 'bg-[#FF7A00] text-black'
                    }`}
                  >
                    {selectedPlace.status === 'endangered' ? 'Critically Endangered' : 'Active Traditional Guild'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/80 text-white/90 border border-white/20">
                    {selectedPlace.giTag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono font-bold">{selectedPlace.city}, {selectedPlace.state}</span>
                  <span className="font-mono text-emerald-400">{selectedPlace.activeWorkshops} Active Workshops</span>
                </div>
              </div>

              {/* Title & Real Geo Coordinates */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FF7A00] font-bold">{selectedPlace.regionZone}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.lat},${selectedPlace.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink flex items-center gap-1 text-[11px] underline"
                    title="Open exact workshop coordinates in Google Maps"
                  >
                    <span>{selectedPlace.lat.toFixed(4)}° N, {selectedPlace.lng.toFixed(4)}° E</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h3 className="text-2xl font-editorial font-bold text-ink">{selectedPlace.craftName}</h3>
                <p className="text-xs text-muted leading-relaxed pt-1">
                  {selectedPlace.summary}
                </p>
              </div>

              {/* Traditional Materials */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-muted block">Indigenous Raw Materials:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPlace.materials.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-paper border border-border text-xs font-mono text-ink">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Field Audio Player */}
              <div className="p-3.5 rounded-2xl bg-paper border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#FF7A00]" />
                    <span className="text-xs font-mono font-bold text-ink">Workshop Ambient Audio</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsPlayingAudio(!isPlayingAudio);
                      showToast(isPlayingAudio ? 'Audio paused' : `Listening to ${selectedPlace.city}`, 'info');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors ${
                      isPlayingAudio
                        ? 'bg-[#FF7A00] text-white font-bold'
                        : 'bg-surface hover:bg-paper text-muted border border-border'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? 'Playing' : 'Listen'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-muted italic font-mono">
                  "{selectedPlace.fieldAudioTitle}"
                </p>
              </div>

              {/* Quick Simulator Launch (if available) */}
              {selectedPlace.simulatorId && (
                <div className="p-3.5 rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF7A00] uppercase font-bold block">
                      Interactive Simulator Ready
                    </span>
                    <strong className="text-xs text-ink">
                      {selectedPlace.simulatorId === 'rogan' ? 'Kutch Rogan Silk Stylus' : 'Bastar Dhokra 4-Stage Cast'}
                    </strong>
                  </div>
                  <button
                    onClick={() => {
                      if (selectedPlace.simulatorId === 'rogan') setIsRoganModalOpen(true);
                      if (selectedPlace.simulatorId === 'dhokra') setIsDhokraModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white text-xs font-mono font-bold transition-colors shadow-sm"
                  >
                    Launch Simulator
                  </button>
                </div>
              )}

              {/* Cultural Residency Booking */}
              <div className="p-4 rounded-2xl bg-paper border border-border space-y-2.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-bold text-ink font-mono uppercase">
                    Cultural Visit / Masterclass
                  </strong>
                  {selectedPlace.residencyOpen ? (
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">Open to Visitors</span>
                  ) : (
                    <span className="text-[10px] font-mono text-red-500 font-bold">Closed Guild Lineage</span>
                  )}
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {selectedPlace.residencyOpen
                    ? `Join verified artisan workshops in ${selectedPlace.city} for ${selectedPlace.residencyDuration}. 100% of masterclass fees are delivered directly to the maker family.`
                    : 'This lineage does not accept external travelers at this time.'}
                </p>

                {selectedPlace.residencyOpen && (
                  <button
                    onClick={() => {
                      setResidencySubmitted(false);
                      setIsResidencyModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request Workshop Visit / Residency</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Cultural Residency Application Modal */}
      <AnimatePresence>
        {isResidencyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResidencyModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg bg-[#121216] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5F3EF] space-y-5 z-10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-mono">Artisan Workshop Visit Request</h3>
                  <span className="text-xs text-[#A19E95] font-mono">{selectedPlace.city} • {selectedPlace.craftName}</span>
                </div>
                <button
                  onClick={() => setIsResidencyModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#A19E95] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!residencySubmitted ? (
                <form onSubmit={handleResidencySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Full Name</label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Email Address</label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="aditi@example.com"
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Purpose</label>
                    <select
                      value={applicantPurpose}
                      onChange={(e) => setApplicantPurpose(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                    >
                      <option value="apprentice">Hands-on Workshop Apprenticeship</option>
                      <option value="research">Academic / Cultural Documentation</option>
                      <option value="design">Design Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Preferred Month</label>
                    <select
                      value={desiredMonth}
                      onChange={(e) => setDesiredMonth(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                    >
                      <option value="October 2026">October 2026</option>
                      <option value="November 2026">November 2026</option>
                      <option value="January 2027">January 2027</option>
                    </select>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Request Received</h4>
                  <p className="text-xs text-[#A19E95] leading-relaxed">
                    Your workshop visit request for {selectedPlace.city} has been registered. The artisan cooperative will contact you at <strong className="text-white">{applicantEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setIsResidencyModalOpen(false)}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors mt-2"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embedded Craft Simulators */}
      <RoganCraftSimulator
        isOpen={isRoganModalOpen}
        onClose={() => setIsRoganModalOpen(false)}
      />
      <DhokraCastingSimulator
        isOpen={isDhokraModalOpen}
        onClose={() => setIsDhokraModalOpen(false)}
      />
    </div>
  );
};
