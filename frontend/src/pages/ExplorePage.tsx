import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Compass,
  MapPin,
  Clock,
  Scale,
  RotateCcw,
  Box,
  LayoutGrid,
  Palette,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Award,
  Layers,
  BookOpen,
  HelpCircle
} from 'lucide-react';

import {
  HERITAGE_OBJECTS,
  HERITAGE_ARTISANS,
  REGIONS_OF_INDIA,
  HeritageObject,
  ArtisanProfile,
} from '../data/heritageDataset';

import { Heritage3DScene } from '../components/explore/Heritage3DScene';
import { Fallback2DGallery } from '../components/explore/Fallback2DGallery';
import { ObjectDetailDrawer } from '../components/explore/ObjectDetailDrawer';
import { HandsBehindHeritage } from '../components/explore/HandsBehindHeritage';
import { ArtisanProfileModal } from '../components/explore/ArtisanProfileModal';
import { HeritageTimelineModal } from '../components/explore/HeritageTimelineModal';
import { CompareCraftsModal } from '../components/explore/CompareCraftsModal';
import { CraftAlchemyShowcase } from '../components/interactive/CraftAlchemyShowcase';

// 3 Minimalist Curated Lenses as requested by user (replacing 7 cluttered pavilions)
type CuratedLens = 'all' | 'crafts' | 'sacred';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLens, setActiveLens] = useState<CuratedLens>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // Modal / Drawer Selection States
  const [selectedObject, setSelectedObject] = useState<HeritageObject | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanProfile | null>(null);
  const [isArtisanModalOpen, setIsArtisanModalOpen] = useState(false);

  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareInitialObj, setCompareInitialObj] = useState<HeritageObject | null>(null);

  // Onboarding controls hint
  const [showControlsHint, setShowControlsHint] = useState(true);

  // Check URL params for direct link to an object (e.g., ?object=obj-madhubani)
  useEffect(() => {
    const objIdParam = searchParams.get('object');
    if (objIdParam) {
      const found = HERITAGE_OBJECTS.find((o) => o.id === objIdParam);
      if (found) {
        setSelectedObject(found);
        setIsDrawerOpen(true);
      }
    }
  }, [searchParams]);

  // Filtered dataset mapped from the 3 curated lenses
  const filteredObjects = useMemo(() => {
    return HERITAGE_OBJECTS.filter((obj) => {
      // 3 clean categories
      let matchesLens = true;
      if (activeLens === 'crafts') {
        matchesLens = ['cat-sculpture', 'cat-paintings', 'cat-textiles'].includes(obj.category);
      } else if (activeLens === 'sacred') {
        matchesLens = ['cat-architecture', 'cat-music', 'cat-weapons'].includes(obj.category);
      }

      const matchesRegion =
        selectedRegion === 'All Regions' || obj.region === selectedRegion;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        obj.name.toLowerCase().includes(q) ||
        obj.region.toLowerCase().includes(q) ||
        obj.state.toLowerCase().includes(q) ||
        obj.materials.some((m) => m.toLowerCase().includes(q)) ||
        obj.techniques.some((t) => t.toLowerCase().includes(q)) ||
        (obj.associated_artisan_name &&
          obj.associated_artisan_name.toLowerCase().includes(q));

      return matchesLens && matchesRegion && matchesSearch;
    });
  }, [activeLens, selectedRegion, searchQuery]);

  // Object Selection Handler
  const handleSelectObject = (obj: HeritageObject | null) => {
    if (!obj) {
      setSelectedObject(null);
      setIsDrawerOpen(false);
      searchParams.delete('object');
      setSearchParams(searchParams);
      return;
    }
    setSelectedObject(obj);
    setIsDrawerOpen(true);
    setSearchParams({ object: obj.id });
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedObject(null);
    searchParams.delete('object');
    setSearchParams(searchParams);
  };

  // Global Escape key listener: closes any active detail drawer or modal and returns to rotating 3D museum
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedObject(null);
        setIsDrawerOpen(false);
        setIsArtisanModalOpen(false);
        setIsTimelineOpen(false);
        setIsCompareOpen(false);
        searchParams.delete('object');
        setSearchParams(searchParams);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchParams, setSearchParams]);

  // Artisan Selection Handler
  const handleSelectArtisanProfile = (artisan: ArtisanProfile) => {
    setSelectedArtisan(artisan);
    setIsArtisanModalOpen(true);
  };

  // Center HUD (Curated Lenses, Search, and 2D/3D View Switcher)
  const centerHud = (
    <div className="flex items-center gap-1.5 bg-[#121216]/95 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl shrink-0">
      {/* 3 Curated Lenses */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setActiveLens('all')}
          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeLens === 'all'
              ? 'bg-terracotta text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
              : 'text-[#A19E95] hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>All ({filteredObjects.length})</span>
        </button>

        <button
          onClick={() => setActiveLens('crafts')}
          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeLens === 'crafts'
              ? 'bg-terracotta text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
              : 'text-[#A19E95] hover:text-white hover:bg-white/5'
          }`}
        >
          <Palette className="w-3 h-3" />
          <span>Crafts</span>
        </button>

        <button
          onClick={() => setActiveLens('sacred')}
          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeLens === 'sacred'
              ? 'bg-terracotta text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]'
              : 'text-[#A19E95] hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>Sacred</span>
        </button>
      </div>

      <div className="w-[1px] h-4 bg-white/10 mx-0.5 hidden sm:block" />

      {/* Quick Search Input */}
      <div className="relative w-24 sm:w-28 focus-within:w-36 transition-all duration-200 shrink-0">
        <Search className="w-3 h-3 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-7 pr-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-terracotta"
        />
      </div>

      {/* View Toggle */}
      <button
        onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#A19E95] hover:text-white transition-colors shrink-0"
        title={viewMode === '3d' ? 'Switch to 2D Gallery Grid' : 'Switch to 3D Museum'}
      >
        {viewMode === '3d' ? '2D' : '3D'}
      </button>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-hidden bg-[#08080A] text-[#F5F3EF] relative select-none">
      {/* 3D FULLSCREEN IMMERSIVE VIEWPORT (Edge-to-Edge matching Option 1 photo) */}
      {viewMode === '3d' ? (
        <div className="absolute inset-0 w-full h-full z-0">
          <Heritage3DScene
            objects={filteredObjects}
            selectedObject={selectedObject}
            onSelectObject={handleSelectObject}
            selectedCategory={activeLens === 'all' ? 'all' : activeLens}
            searchQuery={searchQuery}
            topHudCenter={centerHud}
          />
        </div>
      ) : (
        /* 2D Curated Gallery View */
        <div className="relative z-10 w-full h-full overflow-y-auto p-6 sm:p-10 pt-20 space-y-8 bg-[#08080A]">
          {/* Header for 2D Mode */}
          <header className="fixed top-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between gap-3">
            <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121216]/90 backdrop-blur-md border border-white/10 shadow-2xl shrink-0">
              <Compass className="w-3.5 h-3.5 text-terracotta" />
              <span className="text-xs font-mono text-white/90 font-medium">Curated Gallery</span>
            </div>
            <div className="pointer-events-auto">
              {centerHud}
            </div>
            <div className="w-16" />
          </header>

          <Fallback2DGallery
            objects={filteredObjects}
            selectedObject={selectedObject}
            onSelectObject={handleSelectObject}
          />
        </div>
      )}

      {/* FLOATING BOTTOM INSTRUCTION CALLOUT */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white/70 shadow-2xl pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          <span>Hover over any artwork to halt rotation • Click to inspect provenance</span>
        </motion.div>
      </div>

      {/* Slide-Over Object Detail Drawer with Smooth Spring Animation */}
      <ObjectDetailDrawer
        object={selectedObject}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onSelectRelated={handleSelectObject}
        onSelectArtisan={(artisanId) => {
          const art = HERITAGE_ARTISANS.find((a) => a.id === artisanId);
          if (art) handleSelectArtisanProfile(art);
        }}
        onOpenCompare={(obj) => {
          setCompareInitialObj(obj);
          setIsCompareOpen(true);
        }}
      />

      {/* Artisan Profile Modal */}
      <ArtisanProfileModal
        artisan={selectedArtisan}
        isOpen={isArtisanModalOpen}
        onClose={() => setIsArtisanModalOpen(false)}
        onSelectCraft={(craftId) => {
          const found = HERITAGE_OBJECTS.find((o) => o.id === craftId);
          if (found) handleSelectObject(found);
        }}
      />

      {/* Timeline Modal */}
      <HeritageTimelineModal
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />

      {/* Compare Modal */}
      <CompareCraftsModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialObjectA={compareInitialObj}
        onSelectObject={handleSelectObject}
      />
    </div>
  );
};