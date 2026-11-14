import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  Check,
  ArrowRight,
  Eye,
  Layers,
  Box,
  ShoppingBag,
  BookOpen,
  Camera,
  Briefcase,
  Info,
  Shield,
  ChevronRight,
  Sliders,
  PanelLeftClose,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface UIOptionData {
  id: string;
  number: string;
  name: string;
  tagline: string;
  mood: string;
  bgHex: string;
  surfaceHex: string;
  textHex: string;
  accentHex: string;
  accentName: string;
  fontFamily: string;
  description: string;
  idealFor: string;
  image: string;
  palette: {
    ratio: string;
    label: string;
    color: string;
    hex: string;
  }[];
  features: string[];
}

export const UI_OPTIONS: UIOptionData[] = [
  {
    id: 'royal-obsidian',
    number: '01',
    name: 'Royal Obsidian & Temple Gold',
    tagline: 'Refined Architectural Dark Minimalism',
    mood: 'Nocturnal temple sanctum with warm glowing shadows and specular brass reflections.',
    bgHex: '#08080A',
    surfaceHex: '#121216',
    textHex: '#F5F3EF',
    accentHex: '#FF7A00',
    accentName: 'Radiant Temple Gold',
    fontFamily: 'Editorial Serif & JetBrains Mono',
    description:
      'A deep matte onyx canvas that completely recedes, letting the 3D golden Statue of Unity and floating brass frames glow as if illuminated by sacred oil lamps.',
    idealFor: 'Immersive 3D gallery navigation, evening browsing, private auction prestige.',
    image: '/images/ui-options/option1_royal_obsidian.jpg',
    palette: [
      { ratio: '60%', label: 'Canvas', color: 'bg-[#08080A]', hex: '#08080A' },
      { ratio: '30%', label: 'Silk Pearl', color: 'bg-[#F5F3EF]', hex: '#F5F3EF' },
      { ratio: '10%', label: 'Temple Gold', color: 'bg-[#FF7A00]', hex: '#FF7A00' },
    ],
    features: [
      'Deep matte black canvas that eliminates eye strain',
      'Specular brass highlights on active 3D frames',
      'Warm silk pearl typography (zero harsh glare)',
      'Subtle amber halo effect around active items',
    ],
  },
  {
    id: 'ancient-sandstone',
    number: '02',
    name: 'Ancient Manuscript & Ivory Sandstone',
    tagline: 'Warm Earthy Architectural Heritage',
    mood: 'Grounded, organic archival feel inspired by Jaisalmer fort sandstone and hand-pressed khadi paper.',
    bgHex: '#141210',
    surfaceHex: '#1C1916',
    textHex: '#EAE4D9',
    accentHex: '#E05626',
    accentName: 'Saffron Vermilion & Kansa Bronze',
    fontFamily: 'Classical Book Serif',
    description:
      'Banishes cold digital software aesthetics completely. Warm teakwood borders, deckle-edge dividers, and physical museum seal stamps make every craft record feel like an authentic historical manuscript.',
    idealFor: 'Artisan lineage documentation, oral storytelling, natural craft chemistry.',
    image: '/images/ui-options/option2_ancient_sandstone.jpg',
    palette: [
      { ratio: '60%', label: 'Basalt Sand', color: 'bg-[#141210]', hex: '#141210' },
      { ratio: '30%', label: 'Khadi Ivory', color: 'bg-[#EAE4D9]', hex: '#EAE4D9' },
      { ratio: '10%', label: 'Saffron Earth', color: 'bg-[#E05626]', hex: '#E05626' },
    ],
    features: [
      'Warm natural tones that feel completely non-AI',
      'Deckle-edge dividers and physical wax seal badges',
      'Warm candlelit haveli illumination in 3D scene',
      'Archival registry index numbering (e.g. ARC-IN-029)',
    ],
  },
  {
    id: 'glass-vitrine',
    number: '03',
    name: 'Minimalist Glass Vitrine',
    tagline: 'Contemporary Haute Museum Wing',
    mood: 'Modernist Swiss/Nordic exhibition space with hyper-sharp clarity and floating glass vitrines.',
    bgHex: '#0B0D13',
    surfaceHex: '#131722',
    textHex: '#FFFFFF',
    accentHex: '#FF5500',
    accentName: 'Electric Clementine',
    fontFamily: 'Swiss Modernist Sans',
    description:
      'Ultra-clean, laser-sharp 1px borders with frosted glass translucency. High-definition spatial lighting and liquid spring animations present Indian heritage with European haute exhibition polish.',
    idealFor: 'Modern tech meets ancient crafts, fast scanning, high-contrast visual clarity.',
    image: '/images/ui-options/option3_minimalist_glass.jpg',
    palette: [
      { ratio: '60%', label: 'Deep Charcoal', color: 'bg-[#0B0D13]', hex: '#0B0D13' },
      { ratio: '30%', label: 'Snow White', color: 'bg-[#FFFFFF]', hex: '#FFFFFF' },
      { ratio: '10%', label: 'Clementine', color: 'bg-[#FF5500]', hex: '#FF5500' },
    ],
    features: [
      'Precision-engineered 1px borders with subtle edge glow',
      'Translucent floating cards (backdrop blur 32px)',
      'High-contrast crisp white typography',
      'Fluid liquid spring transitions on drawers and modals',
    ],
  },
  {
    id: 'mughal-jewelbox',
    number: '04',
    name: 'Mughal Jewel Box & Royal Zari',
    tagline: 'Opulent Court Heritage & Lapis Lazuli',
    mood: 'Regal court splendor inspired by miniature Padshahnama paintings, lapis lazuli inlays, and 24K gold zari foil.',
    bgHex: '#060913',
    surfaceHex: '#0E1424',
    textHex: '#FFF8E7',
    accentHex: '#F3B33D',
    accentName: 'Royal Zari Gold & Ruby Vermilion',
    fontFamily: 'Regal Ornamental Serif',
    description:
      'Deep midnight lapis lazuli background with champagne silk typography. Geometric Jali lattice watermark silhouettes and gilded metallic hover accents make gold leaf paintings and silver Bidriware gleam with royal majesty.',
    idealFor: 'Masterpiece acquisitions, royal collector prestige, ceremonial craft lineages.',
    image: '/images/ui-options/option4_mughal_jewelbox.jpg',
    palette: [
      { ratio: '60%', label: 'Midnight Lapis', color: 'bg-[#060913]', hex: '#060913' },
      { ratio: '30%', label: 'Champagne Silk', color: 'bg-[#FFF8E7]', hex: '#FFF8E7' },
      { ratio: '10%', label: 'Zari Gold', color: 'bg-[#F3B33D]', hex: '#F3B33D' },
    ],
    features: [
      'Deep oceanic indigo backdrop that makes metallics shine',
      'Subtle Islamic/Mughal Jali lattice watermark motifs',
      'Gilded shimmer animations on hover',
      'Champagne silk typography with warm royal elegance',
    ],
  },
];

export const UIOptionsPage: React.FC = () => {
  const { setTheme } = useApp();
  const [selectedId, setSelectedId] = useState<string>('royal-obsidian');
  const [previewMode, setPreviewMode] = useState<'render' | 'simulator'>('render');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const selectedOption = UI_OPTIONS.find((o) => o.id === selectedId) || UI_OPTIONS[0];

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F5F3EF] py-10 px-4 sm:px-6 lg:px-8 selection:bg-terracotta selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-tight">
              Curated UI Design Options
            </h1>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
              Explore 4 distinct visual identities crafted specifically for India's Living Heritage
              Vault. Inspect palettes, typography, motion feel, and live UI mockups.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono transition-colors"
            >
              <Compass className="w-4 h-4 text-terracotta" />
              <span>Back to 3D Museum</span>
            </Link>
          </div>
        </div>

        {/* 4 Large Visual Direction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UI_OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;

            return (
              <motion.div
                key={opt.id}
                onClick={() => setSelectedId(opt.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-3xl border p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'border-terracotta shadow-2xl bg-[#121218]'
                    : 'border-white/10 hover:border-white/25 bg-[#0D0D12]'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 35px ${opt.accentHex}25` : undefined,
                }}
              >
                {/* Accent Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: opt.accentHex }}
                />

                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-white/80">
                          Option {opt.number}
                        </span>
                        <span className="text-[11px] font-mono text-white/50">{opt.tagline}</span>
                      </div>
                      <h3 className="text-2xl font-editorial font-bold text-white tracking-tight">
                        {opt.name}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'bg-terracotta text-white border-terracotta'
                          : 'border-white/20 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {opt.mood}
                  </p>

                  {/* Visual Concept Render Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-[16/10] shadow-md bg-black/40">
                    <img
                      src={opt.image}
                      alt={opt.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex items-end justify-between p-3">
                      <span className="text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-terracotta" />
                        <span>Visual Preview</span>
                      </span>
                      <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                        {opt.accentName}
                      </span>
                    </div>
                  </div>

                  {/* 60-30-10 Color Hierarchy Swatches */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                      Color Balance (60% Canvas • 30% Structure • 10% Accent)
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {opt.palette.map((p, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl p-2.5 border border-white/10 flex flex-col justify-between h-16"
                          style={{ backgroundColor: p.hex }}
                        >
                          <span
                            className="text-[10px] font-mono font-bold"
                            style={{
                              color: idx === 1 ? '#000000' : '#FFFFFF',
                            }}
                          >
                            {p.ratio}
                          </span>
                          <span
                            className="text-[9px] font-mono opacity-80"
                            style={{
                              color: idx === 1 ? '#000000' : '#FFFFFF',
                            }}
                          >
                            {p.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Feature Bullets */}
                  <div className="space-y-1.5 pt-3 border-t border-white/10">
                    {opt.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/80 font-sans">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: opt.accentHex }}
                        />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-white/50">
                    Ideal: <span className="text-white/80">{opt.idealFor}</span>
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-transform group-hover:translate-x-1"
                    style={{ color: opt.accentHex }}
                  >
                    <span>{isSelected ? 'Active Preview' : 'Select Option'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed High-Fidelity Interactive Mockup Simulation for Selected Option */}
        <section className="rounded-3xl border border-white/15 bg-[#0D0D12] p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: selectedOption.accentHex }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: selectedOption.accentHex }}>
                High-Fidelity Design Review
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
                Option {selectedOption.number}: {selectedOption.name}
              </h2>
            </div>

            {/* Toggle between Render Image and Interactive Sandbox */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setPreviewMode('render')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  previewMode === 'render'
                    ? 'bg-terracotta text-white font-bold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Concept Picture</span>
              </button>
              <button
                onClick={() => setPreviewMode('simulator')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  previewMode === 'simulator'
                    ? 'bg-terracotta text-white font-bold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Wireframe</span>
              </button>
            </div>
          </div>

          {previewMode === 'render' ? (
            /* Render Picture Display View */
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl group">
                <img
                  src={selectedOption.image}
                  alt={selectedOption.name}
                  className="w-full h-auto max-h-[640px] object-contain mx-auto"
                />
                
                {/* Floating Top Info Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg pointer-events-auto">
                    Option {selectedOption.number} • {selectedOption.tagline}
                  </span>
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors pointer-events-auto shadow-lg"
                    title="Fullscreen Zoom"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Floating Bottom Details Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-6 pt-12">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-editorial font-bold text-white">
                        {selectedOption.name}
                      </div>
                      <p className="text-xs text-white/70 max-w-xl font-sans">
                        {selectedOption.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/60">Font:</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                        {selectedOption.fontFamily}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lightbox Modal */}
              <AnimatePresence>
                {isZoomed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsZoomed(false)}
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center cursor-zoom-out"
                  >
                    <img
                      src={selectedOption.image}
                      alt={selectedOption.name}
                      className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/20"
                    />
                    <div className="mt-4 text-xs font-mono text-white/60">
                      Click anywhere to exit fullscreen
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Simulated Browser Frame with Collapsible Left Sidebar + 3D Viewport */
            <div className="rounded-2xl border border-white/20 overflow-hidden shadow-2xl" style={{ backgroundColor: selectedOption.bgHex }}>
              {/* Fake Browser Window Chrome */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-white/50 pl-3">
                    https://parampara.ai/explore • Living Heritage Vault
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40">60FPS Spatial WebGL</span>
              </div>

              {/* Inner App Mockup Body */}
              <div className="flex h-[420px] sm:h-[480px]">
                {/* Simulated Left Sidebar (Contracted / Expanded) */}
                <div
                  className="w-60 border-r border-white/10 p-4 flex flex-col justify-between shrink-0"
                  style={{ backgroundColor: selectedOption.surfaceHex }}
                >
                  {/* Brand Logo & Collapse */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-editorial text-lg font-bold text-white"
                          style={{ backgroundColor: selectedOption.accentHex }}
                        >
                          P
                        </div>
                        <div>
                          <div className="font-editorial text-sm font-bold text-white">PARAMPARA</div>
                          <div className="text-[9px] font-mono text-white/50">Living Archive</div>
                        </div>
                      </div>
                      <PanelLeftClose className="w-4 h-4 text-white/40" />
                    </div>

                    {/* Nav Links in this Theme */}
                    <div className="space-y-1 text-xs">
                      <div
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold text-white shadow-sm"
                        style={{ backgroundColor: selectedOption.accentHex }}
                      >
                        <Compass className="w-4 h-4" />
                        <span>Heritage 3D</span>
                        <span className="ml-auto text-[9px] font-mono px-1 rounded bg-black/20 text-white">3D</span>
                      </div>

                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/70 hover:text-white">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Bazaar</span>
                      </div>

                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/70 hover:text-white">
                        <Camera className="w-4 h-4" />
                        <span>Heritage Lens</span>
                      </div>

                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/70 hover:text-white">
                        <BookOpen className="w-4 h-4" />
                        <span>Oral Traditions</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom User Profile */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: `${selectedOption.accentHex}30`, color: selectedOption.accentHex }}
                    >
                      A
                    </div>
                    <div className="text-xs min-w-0">
                      <div className="font-semibold text-white truncate">Arjun Mehta</div>
                      <div className="text-[10px] font-mono text-white/50">Public Explorer</div>
                    </div>
                  </div>
                </div>

                {/* Simulated 3D Rotunda Viewport */}
                <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-6">
                  {/* Background 3D Rotunda Visual Simulation */}
                  <img
                    src="/images/heritage/craft_thanjavur.png"
                    alt="3D Rotunda Simulation"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

                  {/* Top Controls Overlay */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white">
                        360° Rotunda • 182m Statue of Unity
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 rounded-md text-xs font-mono font-medium text-white shadow-md"
                        style={{ backgroundColor: selectedOption.accentHex }}
                      >
                        Statue of Unity
                      </button>
                      <button className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/60 border border-white/20 text-white">
                        Orbit Mode
                      </button>
                    </div>
                  </div>

                  {/* Center Hero Monument Representation */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2">
                    <div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center animate-pulse"
                      style={{ borderColor: selectedOption.accentHex, backgroundColor: `${selectedOption.accentHex}15` }}
                    >
                      <Box className="w-10 h-10" style={{ color: selectedOption.accentHex }} />
                    </div>
                    <div className="font-editorial text-xl font-bold text-white tracking-wide">
                      National Monument Sanctum
                    </div>
                    <p className="text-xs text-white/60 max-w-sm">
                      Hover over any artwork to halt 360° rotation. Unhover to resume panoramic glide.
                    </p>
                  </div>

                  {/* Bottom Inspector Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs font-mono text-white/60">
                      Curated Lenses: <strong className="text-white">Living Crafts • Sacred Icons</strong>
                    </span>

                  <button
                    className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-white shadow-lg flex items-center gap-2"
                    style={{ backgroundColor: selectedOption.accentHex }}
                  >
                    <span>Inspect Masterpiece</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </section>
      </div>
    </div>
  );
};
