import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Flame,
  Hammer,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  Thermometer,
  Check
} from 'lucide-react';

interface DhokraCastingSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DhokraCastingSimulator: React.FC<DhokraCastingSimulatorProps> = ({
  isOpen,
  onClose
}) => {
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);

  // Stage 1: Wax Modeling state (0 to 6 threads applied to elephant core)
  const [waxThreadsApplied, setWaxThreadsApplied] = useState<number>(0);
  const maxWaxThreads = 6;

  // Stage 2: Clay Wrapping state (0 to 3 coats)
  const [clayCoats, setClayCoats] = useState<number>(0);
  const maxClayCoats = 3;

  // Stage 3: Molten Bronze Pouring state
  const [kilnTemp, setKilnTemp] = useState<number>(880);
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [metalPouredPercent, setMetalPouredPercent] = useState<number>(0);

  // Stage 4: Hammer Chipping state
  const [hammerStrikes, setHammerStrikes] = useState<number>(0);
  const maxStrikes = 4;
  const [revealedArtifact, setRevealedArtifact] = useState<boolean>(false);

  const playClickSound = (freq = 300, duration = 0.08) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {}
  };

  const handleApplyWaxThread = () => {
    if (waxThreadsApplied < maxWaxThreads) {
      playClickSound(420 + waxThreadsApplied * 60, 0.12);
      setWaxThreadsApplied((prev) => prev + 1);
    }
  };

  const handleApplyClayCoat = () => {
    if (clayCoats < maxClayCoats) {
      playClickSound(220 + clayCoats * 40, 0.15);
      setClayCoats((prev) => prev + 1);
    }
  };

  const handleStokeFurnace = () => {
    if (kilnTemp < 1120) {
      playClickSound(180, 0.2);
      setKilnTemp((prev) => Math.min(1150, prev + 70));
    }
  };

  const handlePourBronze = () => {
    if (kilnTemp < 1080) return;
    setIsPouring(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setMetalPouredPercent(current);
      playClickSound(550 + current * 4, 0.05);
      if (current >= 100) {
        clearInterval(interval);
        setIsPouring(false);
      }
    }, 110);
  };

  const handleStrikeHammer = () => {
    if (hammerStrikes < maxStrikes) {
      const next = hammerStrikes + 1;
      playClickSound(140 + next * 30, 0.25);
      setHammerStrikes(next);
      if (next >= maxStrikes) {
        setRevealedArtifact(true);
        playClickSound(880, 0.4);
      }
    }
  };

  const handleReset = () => {
    setCurrentStage(1);
    setWaxThreadsApplied(0);
    setClayCoats(0);
    setKilnTemp(880);
    setIsPouring(false);
    setMetalPouredPercent(0);
    setHammerStrikes(0);
    setRevealedArtifact(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#121216] border border-white/15 rounded-3xl shadow-2xl text-[#F5F3EF] flex flex-col overflow-hidden z-10 max-h-[94vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#08080A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/20 text-[#FF7A00] flex items-center justify-center border border-[#FF7A00]/30 shadow-md">
                <Flame className="w-5 h-5 text-[#FF7A00]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Bastar Dhokra Lost-Wax Bronze Journey</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 hidden sm:inline">
                    4,000-Year Ancient Alchemy
                  </span>
                </h3>
                <p className="text-xs text-[#A19E95] font-mono">
                  Crafting the sacred Bastar Elephant using beeswax filigree and riverbed clay
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="p-2 rounded-xl text-[#A19E95] hover:text-white hover:bg-white/10 transition-colors"
                title="Restart Journey"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#A19E95] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="px-6 py-2.5 bg-[#0D0D12] border-b border-white/10 grid grid-cols-4 gap-2 text-xs font-mono">
            {[
              { num: 1, title: '1. Beeswax Filigree' },
              { num: 2, title: '2. Terracotta Encasement' },
              { num: 3, title: '3. 1100°C Bronze Pour' },
              { num: 4, title: '4. Mold Break & Reveal' },
            ].map((step) => {
              const isCurrent = currentStage === step.num;
              const isPast = currentStage > step.num;
              return (
                <div
                  key={step.num}
                  className={`flex items-center justify-center sm:justify-start gap-1.5 py-1 px-2 rounded-lg transition-all ${
                    isCurrent
                      ? 'bg-[#FF7A00]/15 text-[#FF7A00] font-bold border border-[#FF7A00]/40'
                      : isPast
                      ? 'text-emerald-400 font-semibold'
                      : 'text-[#A19E95]/40'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                      isCurrent
                        ? 'bg-[#FF7A00] text-black font-bold'
                        : isPast
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-[#A19E95]/40'
                    }`}
                  >
                    {isPast ? '✓' : step.num}
                  </span>
                  <span className="truncate hidden sm:inline">{step.title}</span>
                </div>
              );
            })}
          </div>

          {/* Stage Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* ================= STAGE 1: BEESWAX FILIGREE MODELING ================= */}
            {currentStage === 1 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FF7A00] font-semibold">Stage 1 of 4 • Organic Patterning</span>
                  <h4 className="text-xl font-bold text-white">Beeswax Thread Wrapping Over Earthen Core</h4>
                  <p className="text-xs text-[#A19E95] leading-relaxed">
                    Over a hand-sculpted clay elephant core, master artisans wind soft wild beeswax and dammar resin cords. 
                    Every single wax coil you place will be replaced by solid bronze in the furnace.
                  </p>
                </div>

                {/* Highly Refined Bastar Elephant Crafting Canvas */}
                <div className="p-6 rounded-3xl bg-[#08080A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  {/* Interactive Visual Elephant SVG Illustration */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center bg-[#0D0D12] rounded-2xl border border-white/5 p-4 shadow-inner">
                    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      {/* 1. Base Earthen Clay Elephant Silhouette */}
                      <g fill="#27272A" stroke="#3F3F46" strokeWidth="2">
                        {/* Stout Legs */}
                        <rect x="130" y="270" width="34" height="60" rx="8" />
                        <rect x="180" y="270" width="34" height="60" rx="8" />
                        <rect x="235" y="270" width="34" height="60" rx="8" />
                        <rect x="285" y="270" width="34" height="60" rx="8" />

                        {/* Sturdy Body & Arched Back */}
                        <path d="M 120 270 C 100 230, 110 180, 170 170 C 220 160, 290 170, 310 220 C 330 260, 320 280, 310 290 Z" />

                        {/* Head & Upraised Trunk */}
                        <path d="M 170 190 C 150 160, 120 140, 100 130 C 80 120, 60 130, 60 150 C 60 170, 80 180, 100 200 C 120 220, 140 240, 160 230 Z" />

                        {/* Curved Fan Ears */}
                        <path d="M 175 160 C 205 130, 220 160, 200 200 Z" />

                        {/* Clay Tusk */}
                        <path d="M 105 195 Q 85 205 80 220 Q 95 210 110 200 Z" fill="#52525B" stroke="#71717A" />

                        {/* Top Clay Sprue Funnel (where bronze enters) */}
                        <polygon points="215,165 245,165 235,135 225,135" fill="#3F3F46" />
                      </g>

                      {/* 2. Interactive Golden Beeswax Coils (Revealed progressively!) */}
                      {waxThreadsApplied >= 1 && (
                        /* Coil 1: Trunk Rings */
                        <g stroke="#F59E0B" strokeWidth="3" fill="none" className="animate-pulse">
                          <ellipse cx="80" cy="145" rx="8" ry="14" transform="rotate(-30 80 145)" />
                          <ellipse cx="95" cy="165" rx="10" ry="16" transform="rotate(-30 95 165)" />
                          <ellipse cx="115" cy="185" rx="12" ry="18" transform="rotate(-30 115 185)" />
                        </g>
                      )}

                      {waxThreadsApplied >= 2 && (
                        /* Coil 2: Intricate Spiral Fan Ear (Jali Lattice) */
                        <g stroke="#FBBF24" strokeWidth="2.5" fill="none">
                          <path d="M 180 165 Q 210 145 195 195" />
                          <path d="M 185 170 Q 200 155 190 190" />
                          <circle cx="190" cy="175" r="4" fill="#F59E0B" />
                        </g>
                      )}

                      {waxThreadsApplied >= 3 && (
                        /* Coil 3: Royal Diamond Mesh Blanket (Jali Howdah) */
                        <g stroke="#D97706" strokeWidth="2.5" fill="none">
                          <path d="M 170 190 L 290 230 M 180 180 L 300 220" />
                          <path d="M 290 190 L 170 230 M 300 180 L 180 220" />
                          <rect x="175" y="180" width="115" height="45" rx="6" stroke="#F59E0B" strokeWidth="3" />
                        </g>
                      )}

                      {waxThreadsApplied >= 4 && (
                        /* Coil 4: Sacred Tribal Neck Bells & Braided Cord */
                        <g stroke="#F59E0B" strokeWidth="3" fill="none">
                          <path d="M 140 210 Q 155 245 170 235" />
                          <circle cx="145" cy="235" r="5" fill="#F59E0B" />
                          <circle cx="158" cy="242" r="5" fill="#F59E0B" />
                          <circle cx="170" cy="240" r="5" fill="#F59E0B" />
                        </g>
                      )}

                      {waxThreadsApplied >= 5 && (
                        /* Coil 5: Leg Cuff Rings & Forehead Diadem Crest */
                        <g stroke="#FBBF24" strokeWidth="3" fill="none">
                          <line x1="130" y1="315" x2="164" y2="315" />
                          <line x1="180" y1="315" x2="214" y2="315" />
                          <line x1="235" y1="315" x2="269" y2="315" />
                          <line x1="285" y1="315" x2="319" y2="315" />
                          <circle cx="145" cy="145" r="7" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2" />
                        </g>
                      )}

                      {waxThreadsApplied >= 6 && (
                        /* Coil 6: Ceremonial Howdah Throne on Elephant Back */
                        <g fill="#F59E0B" stroke="#FEF08A" strokeWidth="2">
                          <rect x="210" y="145" width="45" height="20" rx="3" />
                          <polygon points="215,145 232,125 250,145" fill="#D97706" />
                          <circle cx="232" cy="120" r="4" fill="#FEF08A" />
                        </g>
                      )}
                    </svg>

                    {/* Progress Indicator */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-mono text-amber-300">
                      {waxThreadsApplied === 0
                        ? 'Raw Earthen Core'
                        : `${waxThreadsApplied}/6 Beeswax Filigree Layers`}
                    </div>
                  </div>

                  {/* Actions & Instructions */}
                  <div className="flex-1 space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <span className="text-xs font-mono text-[#FF7A00] font-bold block uppercase">
                        Active Filigree Component
                      </span>
                      <h5 className="text-sm font-bold text-white">
                        {waxThreadsApplied === 0 && 'Ready to apply beeswax threads'}
                        {waxThreadsApplied === 1 && '1. Serrated Trunk Rings Applied'}
                        {waxThreadsApplied === 2 && '2. Fan Ear Spiral Lattice Coiled'}
                        {waxThreadsApplied === 3 && '3. Diamond Jali Blanket Woven'}
                        {waxThreadsApplied === 4 && '4. Sacred Neck Temple Bells Suspended'}
                        {waxThreadsApplied === 5 && '5. Leg Cuffs & Forehead Diadem Finished'}
                        {waxThreadsApplied === 6 && '6. Ceremonial Howdah Throne Mounted'}
                      </h5>
                      <p className="text-xs text-[#A19E95] leading-relaxed">
                        {waxThreadsApplied < maxWaxThreads
                          ? 'Press the button to extrude and wind pure wild beeswax threads onto the sculpture.'
                          : 'The intricate wax filigree is complete. Every coil is locked and ready for heat-resistant clay encasement!'}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleApplyWaxThread}
                        disabled={waxThreadsApplied >= maxWaxThreads}
                        className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-black font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>+ Wind Wax Thread ({waxThreadsApplied}/{maxWaxThreads})</span>
                      </button>

                      {waxThreadsApplied >= maxWaxThreads && (
                        <button
                          onClick={() => setCurrentStage(2)}
                          className="py-3 px-5 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,122,0,0.4)] flex items-center justify-center gap-2 transition-all"
                        >
                          <span>Proceed to Clay Mold</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAGE 2: CLAY MOLD ENCASEMENT ================= */}
            {currentStage === 2 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FF7A00] font-semibold">Stage 2 of 4 • Terracotta Encasement</span>
                  <h4 className="text-xl font-bold text-white">Alluvial Silt & Termite Mound Mold Packaging</h4>
                  <p className="text-xs text-[#A19E95] leading-relaxed">
                    The wax model is coated with three layers of riverbed clay mixed with rice husks and red earth. 
                    This creates the heavy negative mold that withstands molten bronze at 1100°C.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#08080A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                  {/* Visual Clay Mold Evolution */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center bg-[#0D0D12] rounded-2xl border border-white/5 p-4 shadow-inner">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      {/* Clay Outer Shell growing with each coat */}
                      <g
                        fill={
                          clayCoats === 0
                            ? '#78350F'
                            : clayCoats === 1
                            ? '#522E15'
                            : clayCoats === 2
                            ? '#3C2010'
                            : '#28170B'
                        }
                        stroke={clayCoats === maxClayCoats ? '#FF7A00' : '#A16207'}
                        strokeWidth={clayCoats === maxClayCoats ? 3 : 2}
                        className="transition-colors duration-500"
                      >
                        {/* Mold Shell Enclosing Elephant */}
                        <path d="M 90 120 C 60 180, 70 260, 110 320 C 140 350, 310 350, 330 300 C 350 240, 330 160, 260 130 C 230 110, 140 100, 90 120 Z" />

                        {/* Funnel Runner Sprue (Bronze Inflow) */}
                        <polygon points="200,130 260,130 245,60 215,60" fill="#B45309" stroke="#F59E0B" strokeWidth="2" />

                        {/* Clay Surface Texture Lines */}
                        {clayCoats >= 2 && (
                          <g stroke="#92400E" strokeWidth="1.5" strokeDasharray="3 3">
                            <path d="M 120 180 Q 220 160 300 200" />
                            <path d="M 100 240 Q 200 260 320 250" />
                            <path d="M 130 290 Q 210 310 290 290" />
                          </g>
                        )}
                      </g>
                    </svg>

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-mono text-amber-300">
                      {clayCoats === maxClayCoats ? 'Mold Air-Dried & Sealed' : `Clay Coat ${clayCoats}/3`}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <span className="text-xs font-mono text-[#FF7A00] font-bold block uppercase">
                        Mold Encasement Status
                      </span>
                      <h5 className="text-sm font-bold text-white">
                        {clayCoats === 0 && 'Raw wax model ready for fine silt coat'}
                        {clayCoats === 1 && 'Coat 1: Ant-hill mud captures intricate filigree details'}
                        {clayCoats === 2 && 'Coat 2: Fibrous paddy husk layer for thermal elasticity'}
                        {clayCoats === 3 && 'Coat 3: Heavy terracotta jacket with bronze pouring sprue'}
                      </h5>
                      <p className="text-xs text-[#A19E95] leading-relaxed">
                        {clayCoats < maxClayCoats
                          ? 'Apply traditional clay layers over the wax structure before furnace firing.'
                          : 'The mold is completely dried and heat-resistant. Ready for the charcoal furnace!'}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleApplyClayCoat}
                        disabled={clayCoats >= maxClayCoats}
                        className="flex-1 py-3 px-4 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-30 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Layers className="w-4 h-4" />
                        <span>Apply Clay Layer ({clayCoats}/{maxClayCoats})</span>
                      </button>

                      {clayCoats >= maxClayCoats && (
                        <button
                          onClick={() => setCurrentStage(3)}
                          className="py-3 px-5 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,122,0,0.4)] flex items-center justify-center gap-2 transition-all"
                        >
                          <span>Ignite Kiln Furnace</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAGE 3: FURNACE FIRING & BRONZE POURING ================= */}
            {currentStage === 3 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FF7A00] font-semibold">Stage 3 of 4 • Crucible Alchemy</span>
                  <h4 className="text-xl font-bold text-white">Furnace Dewaxing & Molten Bronze Pouring (1100°C)</h4>
                  <p className="text-xs text-[#A19E95] leading-relaxed">
                    The furnace melts out the internal wax ("lost wax"), leaving a hollow void. 
                    Molten bell-metal bronze heated to 1100°C is poured into the funnel, flowing into every cavity where the wax was.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#08080A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                  {/* Furnace & Molten Pour Animation Canvas */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center bg-[#07070A] rounded-2xl border border-white/5 p-4 shadow-inner overflow-hidden">
                    {/* Glowing Kiln Fire Coals at bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-red-600/40 via-amber-600/20 to-transparent pointer-events-none" />

                    <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                      {/* Mold Outline */}
                      <path
                        d="M 120 140 C 90 190, 100 260, 140 310 C 170 330, 290 330, 310 290 C 330 240, 310 170, 260 140 Z"
                        fill="#1C1917"
                        stroke="#78350F"
                        strokeWidth="3"
                      />

                      {/* Top Pouring Funnel */}
                      <polygon points="195,140 255,140 240,70 210,70" fill="#292524" stroke="#A8A29E" strokeWidth="2" />

                      {/* Molten Stream from Crucible if Pouring */}
                      {isPouring && (
                        <g>
                          <line x1="225" y1="20" x2="225" y2="70" stroke="#FEF08A" strokeWidth="8" strokeLinecap="round" className="animate-pulse" />
                          <circle cx="225" cy="70" r="10" fill="#FEF08A" filter="drop-shadow(0 0 10px #F59E0B)" />
                        </g>
                      )}

                      {/* Internal Elephant Filling with Glowing Bronze Liquid */}
                      <g fill="none" strokeWidth="6" strokeLinecap="round">
                        {metalPouredPercent > 20 && (
                          <path d="M 140 280 L 170 280 M 260 280 L 290 280" stroke="#F59E0B" filter="drop-shadow(0 0 8px #F59E0B)" />
                        )}
                        {metalPouredPercent > 40 && (
                          <path d="M 140 230 Q 210 240 280 230" stroke="#FBBF24" filter="drop-shadow(0 0 10px #FBBF24)" />
                        )}
                        {metalPouredPercent > 60 && (
                          <path d="M 160 180 Q 220 170 270 190" stroke="#FEF08A" filter="drop-shadow(0 0 12px #FEF08A)" />
                        )}
                        {metalPouredPercent > 80 && (
                          <path d="M 130 170 Q 150 200 180 170" stroke="#FFFFFF" filter="drop-shadow(0 0 15px #FFFFFF)" />
                        )}
                      </g>
                    </svg>

                    {/* Heat Wave Pulse */}
                    <div className="absolute inset-0 border-2 border-red-500/20 rounded-2xl animate-pulse pointer-events-none" />

                    {/* Top Status Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-mono text-red-400 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-red-500" />
                      <span>{kilnTemp}°C (Target: 1100°C)</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#FF7A00] font-bold uppercase">
                          Crucible Temperature & Fill
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-300">
                          {metalPouredPercent}% Bronze Cast
                        </span>
                      </div>

                      {/* Temperature Bar */}
                      <div className="space-y-1">
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              kilnTemp >= 1080 ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-amber-600'
                            }`}
                            style={{ width: `${(kilnTemp / 1150) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted block">
                          {kilnTemp < 1080
                            ? `Furnace at ${kilnTemp}°C. Stoke bellows to reach 1080°C - 1100°C pouring heat.`
                            : 'Furnace at optimal 1100°C! Ready to pour liquid bronze into the runner funnel.'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleStokeFurnace}
                        disabled={kilnTemp >= 1120 || isPouring || metalPouredPercent > 0}
                        className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-30 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Stoke Bellows (+70°C)</span>
                      </button>

                      <button
                        onClick={handlePourBronze}
                        disabled={kilnTemp < 1080 || isPouring || metalPouredPercent === 100}
                        className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{isPouring ? 'Pouring Bronze (1100°C)...' : 'Pour Molten Bronze'}</span>
                      </button>

                      {metalPouredPercent === 100 && (
                        <button
                          onClick={() => setCurrentStage(4)}
                          className="py-3 px-5 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,122,0,0.4)] flex items-center justify-center gap-2 transition-all"
                        >
                          <span>Quench & Break Mold</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAGE 4: QUENCHING, MOLD BREAKING & REVEAL ================= */}
            {currentStage === 4 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FF7A00] font-semibold">Stage 4 of 4 • The Sacred Reveal</span>
                  <h4 className="text-xl font-bold text-white">Quenching in Cold River Water & Breaking the Mold</h4>
                  <p className="text-xs text-[#A19E95] leading-relaxed">
                    The glowing cast is quenched with an explosive hiss of steam. 
                    Strike the charred clay shell with a wooden mallet to shatter the mold and reveal your one-of-a-kind Bastar bronze elephant!
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#08080A] border border-white/10 flex flex-col items-center justify-center text-center space-y-5">
                  {!revealedArtifact ? (
                    <div className="space-y-5 flex flex-col items-center">
                      {/* Terracotta Shell with Fracture Cracks */}
                      <div
                        onClick={handleStrikeHammer}
                        className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-[#1C1917] border-4 border-amber-900/60 flex items-center justify-center cursor-pointer group shadow-2xl overflow-hidden"
                      >
                        {/* Crack Lines */}
                        <svg viewBox="0 0 300 300" className="w-full h-full absolute inset-0 pointer-events-none">
                          {hammerStrikes >= 1 && (
                            <path d="M 150 40 L 160 120 L 130 160" stroke="#FF7A00" strokeWidth="3" fill="none" filter="drop-shadow(0 0 6px #FF7A00)" />
                          )}
                          {hammerStrikes >= 2 && (
                            <path d="M 160 120 L 220 150 L 250 220" stroke="#FF7A00" strokeWidth="3" fill="none" filter="drop-shadow(0 0 6px #FF7A00)" />
                          )}
                          {hammerStrikes >= 3 && (
                            <path d="M 130 160 L 80 200 L 110 260" stroke="#FEF08A" strokeWidth="4" fill="none" filter="drop-shadow(0 0 8px #FEF08A)" />
                          )}
                        </svg>

                        <div className="flex flex-col items-center gap-3 z-10">
                          <Hammer className="w-14 h-14 text-amber-500 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-mono text-white/80 font-bold bg-black/60 px-3 py-1 rounded-full border border-white/10">
                            Click to Strike Mallet ({hammerStrikes}/{maxStrikes})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleStrikeHammer}
                        className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2"
                      >
                        <Hammer className="w-4 h-4" />
                        <span>Strike Mold ({hammerStrikes}/{maxStrikes})</span>
                      </button>
                    </div>
                  ) : (
                    /* Revealed Bastar Dhokra Bronze Masterpiece */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="space-y-5 max-w-lg mx-auto"
                    >
                      <div className="relative rounded-2xl overflow-hidden h-72 border-2 border-[#FF7A00] shadow-[0_0_40px_rgba(255,122,0,0.4)]">
                        <img
                          src="/images/heritage/craft_dhokra_elephant.jpg"
                          alt="Revealed Dhokra Bronze Masterpiece"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                          <span className="text-xs font-mono text-amber-300 font-bold">
                            Bastar Sacred Dhokra Elephant • 100% Unique Single-Cast Bronze
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-3 text-left">
                        <Award className="w-8 h-8 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-white block font-bold">Master Alchemist Seal Unlocked</strong>
                          <span>You have experienced the authentic non-ferrous lost-wax process preserved unbroken in Bastar since 2500 BCE.</span>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-center pt-2">
                        <button
                          onClick={handleReset}
                          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                        >
                          Cast Another Piece
                        </button>
                        <button
                          onClick={onClose}
                          className="px-7 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-mono text-xs font-bold transition-colors shadow-lg"
                        >
                          Complete Journey
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
