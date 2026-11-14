import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ZoomIn,
  X,
  Sparkles,
  ShieldCheck,
  Scan,
  Compass,
  Atom
} from 'lucide-react';
import { HeritageObject } from '../../data/heritageDataset';

interface MacroMagnifierOverlayProps {
  isActive: boolean;
  onToggle: () => void;
  selectedObject: HeritageObject | null;
}

export const MacroMagnifierOverlay: React.FC<MacroMagnifierOverlayProps> = ({
  isActive,
  onToggle,
  selectedObject,
}) => {
  const [lensPos, setLensPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setLensPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  if (!isActive) return null;

  // Determine craft specific forensic details
  const craftName = selectedObject?.name || 'Masterpiece Surface';
  const objectId = selectedObject?.id || '';

  const forensicSignature = objectId.includes('bidriware')
    ? {
        spec: '8x Surface Metallography',
        microDetail: 'Pure 99.9% fine silver wire mechanically deformed and flush-seated into undercut zinc grooves.',
        chemicalSignature: 'Copper-zinc dendritic grains with surface copper-nitrate complexation ($Cu_2CO_3(OH)_2$).',
        verification: '100% Hand-Chiseled (Zero machine laser etching)',
      }
    : objectId.includes('rogan')
    ? {
        spec: '10x Polymerized Castor Paste',
        microDetail: 'Cross-linked ricinoleic acid polymer strands forming high-viscosity surface relief ridges.',
        chemicalSignature: 'Zero volatile solvents; dry air oxidation forming water-insoluble elastomeric paint.',
        verification: 'Genuine Kutch Castor Gum (Zero synthetic acrylic)',
      }
    : objectId.includes('kalamkari')
    ? {
        spec: '8x Botanical Fiber Penetration',
        microDetail: 'Myrobalan buffalo milk mordant binding fermented iron-jaggery black tannins deep inside cellulose pores.',
        chemicalSignature: 'Alum mordant ($KAl(SO_4)_2$) cross-linking natural madder root alizarin red dye.',
        verification: 'Authentic Srikalahasti Pen Drawing (Zero chemical silkscreen screen-print)',
      }
    : {
        spec: '8x Microscopic Loupe Scan',
        microDetail: 'Lost-wax wire sprue fracture points with characteristic hand-rolled beeswax spiral striations.',
        chemicalSignature: 'High tin bell bronze alloy (78% Cu, 22% Sn) exhibiting golden crystalline matrix.',
        verification: 'Verified Bastar Tribal Guild Casting',
      };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* Top Center Active HUD Pill */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-auto bg-[#121216]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#FF7A00]/50 shadow-[0_0_25px_rgba(255,122,0,0.3)] flex items-center gap-3 text-xs font-mono">
        <Atom className="w-4 h-4 text-[#FF7A00] animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-white font-bold">Forensic Macro Loupe Active (8x Optical Magnification)</span>
        <button
          onClick={onToggle}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Exit Macro Magnifier"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating 8x Optical Loupe Circle (Follows Mouse Cursor) */}
      <motion.div
        style={{
          left: `${lensPos.x}px`,
          top: `${lensPos.y}px`,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-[#FF7A00] shadow-[0_0_40px_rgba(255,122,0,0.4)] pointer-events-none overflow-hidden flex flex-col justify-between p-3"
      >
        {/* Optical Glass Lens Crosshair */}
        <div className="absolute inset-0 bg-[#FF7A00]/[0.06] backdrop-blur-[0.5px]" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#FF7A00]/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#FF7A00]/30" />
        <div className="absolute inset-4 rounded-full border border-dashed border-[#FF7A00]/40" />

        {/* Top Info inside lens */}
        <div className="relative z-10 flex items-center justify-between text-[9px] font-mono font-bold text-white drop-shadow">
          <span className="px-1.5 py-0.5 rounded bg-black/80 text-[#FF7A00] border border-[#FF7A00]/40">
            {forensicSignature.spec}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-black/80 text-emerald-300 border border-emerald-500/40">
            GI Verified
          </span>
        </div>

        {/* Bottom Info inside lens */}
        <div className="relative z-10 text-[9px] font-mono text-white/90 p-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 space-y-0.5">
          <div className="text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{forensicSignature.verification}</span>
          </div>
          <p className="text-[8px] text-[#A19E95] leading-tight line-clamp-2">
            {forensicSignature.chemicalSignature}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
