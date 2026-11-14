import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Search,
  Sliders,
  Eye,
  CheckCircle2,
  Layers,
  Flame,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface CraftStage {
  step: number;
  title: string;
  subtitle: string;
  materials: string[];
  description: string;
  chemicalSecret: string;
  visualState: string;
}

interface AlchemyCraft {
  id: string;
  name: string;
  origin: string;
  craftType: string;
  imageBefore: string;
  imageAfter: string;
  stages: CraftStage[];
}

const ALCHEMY_CRAFTS: AlchemyCraft[] = [
  {
    id: 'bidriware',
    name: 'Bidriware Silver Inlay & Fort Soil Alchemy',
    origin: 'Bidar, Karnataka (14th c. Bahmani Dynasty)',
    craftType: 'Metallurgical Inlay & Soil Oxidation',
    imageBefore: '/images/heritage/workshop_bidriware.jpg',
    imageAfter: '/images/heritage/craft_bidriware_aftaba.jpg',
    stages: [
      {
        step: 1,
        title: 'Zinc-Copper Alloy Core Casting',
        subtitle: '16:1 ratio of molten zinc & copper',
        materials: ['Molten Zinc (94%)', 'Copper (6%)', 'Oiled Sand Molds'],
        description:
          'Molten zinc and copper alloy is poured into oiled soil molds. The addition of 6% copper prevents premature zinc oxidation while providing structural ductility for fine engraving.',
        chemicalSecret:
          'Zinc-copper intermetallic phase creates an alloy matrix responsive to later nitrate patination.',
        visualState: 'Raw dull-grey cast vessel with casting seams and rough sandy texture.',
      },
      {
        step: 2,
        title: 'Kalam Kaam Chisel Engraving',
        subtitle: 'Freehand carving of Bahmani floral vines',
        materials: ['Steel Gravers', 'Copper Sulfate solution'],
        description:
          'The vessel is rubbed with temporary copper sulfate to create a dark guide layer. Master artisans hand-chisel undercut grooves without stencils or measuring rulers.',
        chemicalSecret:
          'Under-beveled grooves lock silver wire mechanically when hammered, requiring zero artificial glue.',
        visualState: 'Darkened surface etched with brilliant silver grooves cutting into the core.',
      },
      {
        step: 3,
        title: 'Tarkashi (Pure Silver Wire Hammering)',
        subtitle: '99.9% fine silver tapped cold into grooves',
        materials: ['Pure Silver Wire', 'Small Ball-Peen Hammer'],
        description:
          'Pure silver ribbons and wires are hammered cold into the undercut grooves. The soft silver spreads outwards inside the beveled channels, locking into the harder zinc matrix.',
        chemicalSecret:
          'Mechanical cold-welding under compressive hammer impact.',
        visualState: 'Flush, bright metallic silver ribbons gleaming against unoxidized grey zinc.',
      },
      {
        step: 4,
        title: 'Bidar Fort Soil Oxidation',
        subtitle: 'Underground nitrate soil turns zinc pitch black',
        materials: ['Bidar Fort Ruins Soil', 'Ammonium Chloride', 'Boiling Water'],
        description:
          'Soil collected from the subterranean ruins of Bidar Fort (where centuries without sunlight have accumulated special alkaline nitrates) is blended with sal-ammoniac and rubbed onto the heated vessel. Within 15 seconds, the zinc turns velvety coal black while the pure silver remains brilliantly white.',
        chemicalSecret:
          'Nitrates in unexposed fort soil react with zinc to create a black zinc oxide/nitrate layer, leaving unreactive silver unaffected.',
        visualState: 'Deep velvet-black matte patina with radiant pure silver floral vines shining bright.',
      },
    ],
  },
  {
    id: 'kalamkari',
    name: 'Srikalahasti Natural Dye Botanical Chemistry',
    origin: 'Srikalahasti, Andhra Pradesh (Nayaka Dynasty)',
    craftType: 'Protein Mordanting & Vegetable Dyeing',
    imageBefore: '/images/heritage/workshop_kalamkari.jpg',
    imageAfter: '/images/heritage/craft_kalamkari.jpg',
    stages: [
      {
        step: 1,
        title: 'Buffalo Milk Protein Bath',
        subtitle: 'Fat-rich protein treatment prevents dye bleed',
        materials: ['Handspun Gaada Cotton', 'Buffalo Milk (Paalu)', 'Myrobalan Nut'],
        description:
          'Unbleached river-scoured cotton is steeped in fresh buffalo milk and crushed myrobalan nut (Karakkai). The high fat and casein protein in buffalo milk creates a natural resist barrier across cotton cellulose.',
        chemicalSecret:
          'Milk casein bonds with cotton cellulose fibers, preventing capillary bleeding of natural water-based inks.',
        visualState: 'Cream-colored cloth smelling of rich natural milk and earthy tannins.',
      },
      {
        step: 2,
        title: 'Tamarind Charcoal Contour Sketching',
        subtitle: 'Burnt tamarind twigs for sacred outlines',
        materials: ['Burnt Tamarind Twigs'],
        description:
          'Master chitrakars sketch sacred Hindu epic deities freehand using burnt tamarind twigs. The delicate charcoal can be dusted off with a peacock feather without staining the protein-coated cotton.',
        chemicalSecret:
          'Friable amorphous carbon outlines that lift off cleanly during subsequent washing.',
        visualState: 'Faint smoky charcoal contours of temple trees, dancers, and epics.',
      },
      {
        step: 3,
        title: 'Kasim (Iron-Jaggery) Indelible Inking',
        subtitle: 'Bamboo reed pen with fermented iron ink',
        materials: ['Fermented Scrap Iron', 'Cane Jaggery', 'Palm Wine', 'Bamboo Kalam'],
        description:
          'Rusted iron horse-shoe nails and palm jaggery ferment underground in earthen pots for 21 days. The sharpened bamboo pen (kalam) with wool reservoir discharges deep black ink that turns permanent upon contact with myrobalan tannins.',
        chemicalSecret:
          'Iron acetate reacts instantly with tannic acid in myrobalan-treated cloth, precipitating indelible iron tannate black.',
        visualState: 'Jet black indelible master linework standing bold against warm cloth.',
      },
      {
        step: 4,
        title: 'Madder Root Boiling & River Bleach',
        subtitle: 'Natural alizarin blooming in copper vats',
        materials: ['Madder Root (Manjistha)', 'Copper Cauldrons', 'Swarnamukhi River Water'],
        description:
          'Areas painted with alum mordant bloom into deep crimson red when boiled in copper cauldrons with crushed madder roots. The cloth is then washed in the flowing Swarnamukhi River and laid over clean river sand under the hot sun to bleach unpainted sections white.',
        chemicalSecret:
          'Alizarin dye chelation with aluminum mordant produces vibrant insoluble crimson lacquer.',
        visualState: 'Vibrant terracotta reds, rich ochres, and pristine bleached white sand backgrounds.',
      },
    ],
  },
  {
    id: 'rogan',
    name: 'Kutch Rogan: Airborne Polymerized Castor Thread',
    origin: 'Nirona Village, Kutch, Gujarat (300+ Years)',
    craftType: 'High-Temperature Oil Polymerization',
    imageBefore: '/images/heritage/workshop_rogan.jpg',
    imageAfter: '/images/heritage/artisan_rogan.jpg',
    stages: [
      {
        step: 1,
        title: '48-Hour Castor Oil Polymerization',
        subtitle: 'Open-air boiling into gelatinous resin',
        materials: ['Cold-Pressed Castor Oil', 'Firewood Pit', 'Cold Water'],
        description:
          'Castor oil is boiled continuously in open wilderness pits for two full days. Highly flammable volatile fumes evaporate, causing the ricinoleic fatty acids to cross-link into a dense, amber-colored rubbery paste.',
        chemicalSecret:
          'Thermal oxidative polymerization converts liquid triglycerides into a high-molecular-weight elastic gel.',
        visualState: 'Thick, amber-golden gummy resin cooling in cold water containers.',
      },
      {
        step: 2,
        title: 'Stone Slab Mineral Pigment Kneading',
        subtitle: 'Earth ochres ground into viscous paste',
        materials: ['Natural Mineral Pigments', 'Flat Granite Stone', 'Hand Pestle'],
        description:
          'Lumps of cured rogan paste are vigorously ground on granite slabs with powdered yellow ochre, chalk white, and copper blue minerals to create vivid colored paste cakes.',
        chemicalSecret:
          'Complete mechanical dispersion of insoluble mineral particles into the polymerized oil matrix.',
        visualState: 'Luminous spheres of colored elastic dough resting in small bowls.',
      },
      {
        step: 3,
        title: 'Palm-Friction Airborne Stylus Threading',
        subtitle: 'Drawing in the air without touching fabric',
        materials: ['Artisan Body Heat', 'Blunt Brass Stylus (Kalam)', 'Raw Silk'],
        description:
          'A small lump of colored rogan is rubbed in the palm of the left hand using body heat and shear friction to soften it into a gossamer elastic filament. The artisan guides this thread through the air with a blunt brass rod held millimeters above the fabric.',
        chemicalSecret:
          'Thixotropic shear-thinning allows the viscous oil paste to draw into hair-thin continuous elastic fibers.',
        visualState: 'A microscopic golden thread floating suspended between stylus and silk cloth.',
      },
      {
        step: 4,
        title: 'Symmetrical Mirror Folding',
        subtitle: 'One hand drawing, perfect bilateral symmetry',
        materials: ['Fabric Tension', 'Manual Palm Pressure'],
        description:
          'While the oil thread is still tacky, the artisan folds the cloth along the center crease and presses down firmly with the side of their hand. When peeled open, a flawless, perfectly identical mirror image is transferred onto the blank half.',
        chemicalSecret:
          'Tack transfer before atmospheric oxidative drying permanently bonds the pigment to silk.',
        visualState: 'Flawless bilateral Tree of Life lattice spanning both halves of the royal stole.',
      },
    ],
  },
];

export const CraftAlchemyShowcase: React.FC = () => {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('bidriware');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({ x: 150, y: 150 });
  const [splitPos, setSplitPos] = useState<number>(50); // 0 to 100%
  const [isDraggingSplit, setIsDraggingSplit] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeCraft = ALCHEMY_CRAFTS.find((c) => c.id === selectedCraftId) || ALCHEMY_CRAFTS[0];
  const currentStage = activeCraft.stages.find((s) => s.step === activeStep) || activeCraft.stages[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    setLoupePos({ x, y });

    if (isDraggingSplit) {
      const percentage = (x / rect.width) * 100;
      setSplitPos(Math.max(5, Math.min(95, percentage)));
    }
  };

  return (
    <section className="rounded-lg bg-surface border border-border p-6 sm:p-10 shadow-card relative overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8 relative z-10">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-paper text-muted border border-border text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-muted" />
            <span>Interactive heritage laboratory • Physical metallurgy & chemistry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial text-ink tracking-tight">
            The Alchemy of Living Heritage
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Drag the transformation timeline and engage the <strong>4x Master Artisan Loupe</strong> to witness how raw earth, subterranean fort soil, and mountain fleece metamorphose into certified Indian treasures.
          </p>
        </div>

        {/* Craft Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {ALCHEMY_CRAFTS.map((craft) => (
            <button
              key={craft.id}
              onClick={() => {
                setSelectedCraftId(craft.id);
                setActiveStep(1);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCraftId === craft.id
                  ? 'bg-terracotta text-white shadow-sm border border-terracotta'
                  : 'bg-paper text-ink hover:border-terracotta border border-border'
              }`}
            >
              {craft.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Laboratory Interactive Stage */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Interactive Visual Transformation & 4x Loupe Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{activeCraft.origin}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLoupeActive(!isLoupeActive)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                  isLoupeActive
                    ? 'bg-terracotta text-white font-bold shadow-sm'
                    : 'bg-paper text-ink hover:border-terracotta border border-border'
                }`}
                title="Toggle 4x Magnifying Loupe"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isLoupeActive ? 'Loupe: Active 4X' : 'Enable 4X Loupe'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Split Canvas / Image Stage */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsDraggingSplit(true)}
            onMouseUp={() => setIsDraggingSplit(false)}
            onMouseLeave={() => setIsDraggingSplit(false)}
            className="relative h-[340px] sm:h-[420px] rounded-md overflow-hidden border border-border select-none cursor-ew-resize bg-paper shadow-card group"
          >
            {/* "After" Finished Masterpiece (Base Layer) */}
            <img
              src={activeCraft.imageAfter}
              alt="Finished Masterpiece"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute top-4 right-4 bg-paper/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-xs font-mono text-ink border border-border">
              Stage 4: Finished piece
            </div>

            {/* "Before" Raw Processing (Clipped Top Layer) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
            >
              <img
                src={activeCraft.imageBefore}
                alt="Raw Stage In-Progress"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-xs font-mono text-ink border border-border">
                Stage 1: Raw materials
              </div>
            </div>

            {/* Interactive Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-terracotta cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${splitPos}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-terracotta border border-white text-white flex items-center justify-center shadow-card text-xs font-bold">
                ⇄
              </div>
            </div>

            {/* 4X Optical Artisan Inspection Loupe */}
            {isLoupeActive && (
              <motion.div
                className="absolute pointer-events-none rounded-full overflow-hidden border-2 border-white shadow-2xl"
                style={{
                  width: 140,
                  height: 140,
                  left: loupePos.x - 70,
                  top: loupePos.y - 70,
                  boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.2)',
                }}
              >
                <div
                  className="w-[1000px] h-[800px] absolute"
                  style={{
                    backgroundImage: `url(${splitPos > 50 ? activeCraft.imageAfter : activeCraft.imageBefore})`,
                    backgroundSize: 'cover',
                    transform: `translate(${-loupePos.x * 2.2 + 70}px, ${-loupePos.y * 2.2 + 70}px) scale(2.2)`,
                    transformOrigin: 'top left',
                  }}
                />
                <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono text-white">
                  4x optical zoom
                </div>
              </motion.div>
            )}

            {/* Bottom Hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-paper/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-muted border border-border pointer-events-none">
              Drag horizontally across canvas to reveal transformation
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 4-Stage Metallurgical Timeline Scrubber */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-muted" />
              <span>Sequential transformation stages</span>
            </span>
            <span className="text-xs font-mono text-muted">
              Stage {activeStep} of 4
            </span>
          </div>

          {/* Stepper Navigation Pills */}
          <div className="grid grid-cols-4 gap-2">
            {activeCraft.stages.map((st) => (
              <button
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`py-2 px-1 rounded-md text-xs font-mono font-medium transition-colors text-center border ${
                  activeStep === st.step
                    ? 'bg-terracotta text-white border-terracotta shadow-sm'
                    : 'bg-paper text-ink border-border hover:border-terracotta'
                }`}
              >
                0{st.step}
              </button>
            ))}
          </div>

          {/* Active Stage Technical & Cultural Deep Dive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-lg bg-paper border border-border p-5 space-y-4 shadow-card"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono text-muted">
                  {currentStage.subtitle}
                </span>
                <h3 className="text-xl font-editorial font-bold text-ink">
                  {currentStage.title}
                </h3>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                {currentStage.description}
              </p>

              {/* Chemical & Physical Secret Box */}
              <div className="rounded-md bg-surface p-3.5 border border-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted">
                  <Flame className="w-3.5 h-3.5 text-muted" />
                  <span>Generational chemical secret</span>
                </div>
                <p className="text-[11px] text-ink leading-snug">
                  {currentStage.chemicalSecret}
                </p>
              </div>

              {/* Materials Involved Tags */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-muted block">
                  Materials in action:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStage.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-sm text-xs font-mono bg-surface text-ink border border-border"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

