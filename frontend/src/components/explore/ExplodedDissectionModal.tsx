import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  RotateCcw,
  Sliders,
  ChevronRight,
  Eye
} from 'lucide-react';
import { VolumetricArtifactDispatcher } from './VolumetricArtifacts';

interface ExplodedDissectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  craftSlug?: string;
  craftName?: string;
}

interface CraftLayerInfo {
  layer: number;
  name: string;
  material: string;
  role: string;
  chemistryNote: string;
}

export const ExplodedDissectionModal: React.FC<ExplodedDissectionModalProps> = ({
  isOpen,
  onClose,
  craftSlug = 'bidriware',
  craftName = 'Bidriware Metal Inlay Aftaba',
}) => {
  const [explodeValue, setExplodeValue] = useState(0.65); // 0 to 1
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  // Craft layer breakdown data based on craft type
  const layers: CraftLayerInfo[] = craftSlug.includes('dhokra')
    ? [
        {
          layer: 1,
          name: 'Inner River Silt Core',
          material: 'Riverbed Clay & Cow Dung Binder',
          role: 'Maintains the lightweight hollow interior volume of the bronze cast',
          chemistryNote: 'Organic fibers burn off during firing, leaving micro-porosities for gas escape',
        },
        {
          layer: 2,
          name: 'Beeswax Thread Armature',
          material: 'Wild Beeswax & Dammar Gum Resin',
          role: 'Hand-pulled threads coiled and sculpted into intricate filigree details',
          chemistryNote: 'Ductile wax ribbons extruded through manual brass presses at 38°C',
        },
        {
          layer: 3,
          name: 'Outer Clay Mold Encasement',
          material: 'Anthill Clay & Chaff Slurry',
          role: 'Captures the negative impression of the wax as the wax evaporates',
          chemistryNote: 'Heat-resistant refractory envelope withstands molten bronze at 1100°C',
        },
        {
          layer: 4,
          name: 'Molten Bell Bronze Casting',
          material: 'Recycled Bell Metal (78% Copper, 22% Tin)',
          role: 'Replaces the lost wax space, forming the permanent ringing bronze artifact',
          chemistryNote: 'High tin concentration yields classic golden resonance and corrosion resistance',
        },
      ]
    : craftSlug.includes('rogan')
    ? [
        {
          layer: 1,
          name: 'Mulberry Silk Canvas',
          material: '100% Handloom Raw Silk',
          role: 'Tightly woven dark ground receiving the ductile oil paint threads',
          chemistryNote: 'Dense natural protein fiber prevents bleed-through of thick ricinoleic paste',
        },
        {
          layer: 2,
          name: '48-Hour Boiled Castor Oil Gum',
          material: 'Wild Castor Seed Oil (Ricinus communis)',
          role: 'Elastic polymeric matrix drawn out in mid-air with blunt brass stylus',
          chemistryNote: 'Thermal polymerization converts fluid oil into elastic ductile resin',
        },
        {
          layer: 3,
          name: 'Mineral Stone Pigments',
          material: 'Natural Chalk, Indigo, Katha, Orpiment',
          role: 'Gives the oil thread brilliant non-fading earth jewel tones',
          chemistryNote: 'Ground stone particles suspended homogenously in warm oil paste',
        },
        {
          layer: 4,
          name: 'Mirror-Symmetry Fold Transfer',
          material: 'Physical Compression & Fabric Fold',
          role: 'Duplicates the wet half-design onto the opposite silk flank',
          chemistryNote: 'Exact pressure control ensures identical bilateral geometric symmetry',
        },
      ]
    : [
        {
          layer: 1,
          name: 'Cast Zinc-Copper Alloy Foundation',
          material: 'Zinc (94%) & Copper (6%) Matrix',
          role: 'Forms the cast vessel body that takes the distinctive fort soil patina',
          chemistryNote: 'Copper prevents zinc brittleness, creating a workable non-ferrous alloy',
        },
        {
          layer: 2,
          name: 'Freehand Chiseled Grooves (Kalam)',
          material: 'Undercut Engraved Trenches',
          role: 'Deep recessed floral paths cut with pointed steel chisels (Kalam)',
          chemistryNote: 'Slightly undercut sidewalls provide mechanical dovetail locking for silver',
        },
        {
          layer: 3,
          name: 'Pure 99.9% Silver Wire Inlay (Tarkashi)',
          material: 'Pure Fine Silver (Chandi) Wire & Leaf',
          role: 'Hammered flush into grooves without any adhesives or welding solder',
          chemistryNote: 'Mechanical friction and cold-working deformation permanently bind the silver',
        },
        {
          layer: 4,
          name: 'Bidar Fort Soil Oxidation Patina',
          material: 'Fort Soil (Nitrate rich) & Sal Ammoniac',
          role: 'Boiling slurry turns zinc matte velvet black while silver remains brilliant',
          chemistryNote: 'Ammonium chloride ($NH_4Cl$) and nitrates oxidize zinc while leaving silver inert',
        },
      ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#08080A]/95 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#121216] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0C0C10] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center border border-[#FF7A00]/30 shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF7A00] uppercase font-bold">
                    Technique Dissection Engine
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs font-mono text-emerald-400">Primary Evidence Verified</span>
                </div>
                <h3 className="text-lg sm:text-xl font-editorial font-normal text-white tracking-tight">
                  {craftName} — <span className="italic text-gold-gradient">Anatomical Layer Breakdown</span>
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A19E95] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive 3D Exploded Viewport */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-[#08080A] border border-white/10 shadow-inner">
                  {/* Real-Time Three.js Exploded 3D Stage */}
                  <Canvas camera={{ position: [0, 0.8, 3.2], fov: 42 }}>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[4, 6, 4]} intensity={1.8} />
                    <directionalLight position={[-4, 2, -2]} intensity={0.7} color="#FF7A00" />
                    <pointLight position={[0, -2, 2]} intensity={1.0} color="#FFFFFF" />

                    <VolumetricArtifactDispatcher
                      objectSlug={craftSlug}
                      isSelected={true}
                      explodeProgress={explodeValue}
                      scale={1.4}
                    />

                    <OrbitControls
                      enableDamping
                      dampingFactor={0.05}
                      rotateSpeed={0.7}
                      maxDistance={6}
                      minDistance={1.8}
                      target={[0, 0, 0]}
                    />
                  </Canvas>

                  {/* On-Canvas Instructions Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>Drag in 3D to rotate • Scroll to zoom</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono">
                    <span className="text-[#A19E95]">Exploded Separation:</span>
                    <strong className="text-[#FF7A00] font-bold">{Math.round(explodeValue * 100)}%</strong>
                  </div>
                </div>

                {/* Tactile Explosion Slider Bar */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F5F3EF] flex items-center gap-1.5 font-bold">
                      <Sliders className="w-4 h-4 text-[#FF7A00]" />
                      Peel Technique Slider
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExplodeValue(0)}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 hover:bg-white/10 text-muted"
                      >
                        Assembled (0%)
                      </button>
                      <button
                        onClick={() => setExplodeValue(1)}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF7A00]/20 text-[#FF7A00] hover:bg-[#FF7A00]/30 font-bold"
                      >
                        Fully Exploded (100%)
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explodeValue}
                    onChange={(e) => setExplodeValue(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg bg-black/60 appearance-none cursor-pointer accent-[#FF7A00]"
                  />
                </div>
              </div>

              {/* Right Column: Layer Dossiers & Indigenous Chemistry Notes */}
              <div className="lg:col-span-5 space-y-3.5">
                <span className="text-xs font-mono tracking-wider uppercase text-[#A19E95] block">
                  Constituent Craft Layers & Chemistry:
                </span>

                <div className="space-y-2.5">
                  {layers.map((l) => {
                    const isSelected = selectedLayer === l.layer;
                    return (
                      <div
                        key={l.layer}
                        onClick={() => setSelectedLayer(isSelected ? null : l.layer)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#FF7A00]/15 border-[#FF7A00] shadow-[0_0_15px_rgba(255,122,0,0.25)]'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#FF7A00] text-black font-mono text-[10px] font-bold flex items-center justify-center">
                              {l.layer}
                            </span>
                            <strong className="text-xs font-bold text-white block">{l.name}</strong>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">Layer {l.layer} of 4</span>
                        </div>

                        <div className="mt-2 text-xs font-mono text-[#A19E95] space-y-1">
                          <div>
                            <span className="text-white/60">Material: </span>
                            <span className="text-white">{l.material}</span>
                          </div>
                          <p className="text-xs text-muted/90 leading-relaxed font-sans pt-0.5">
                            {l.role}
                          </p>
                          <div className="pt-2 mt-1 border-t border-white/5 text-[11px] font-mono text-[#FF7A00] flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 shrink-0" />
                            <span>{l.chemistryNote}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
