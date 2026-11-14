import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  RotateCcw,
  Download,
  X,
  Layers,
  CheckCircle,
  Info
} from 'lucide-react';

interface RoganCraftSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROGAN_PIGMENTS = [
  { name: 'Royal Kumkum', hex: '#9F1239', bg: 'bg-[#9F1239]', origin: 'Madder & Vermilion' },
  { name: 'Temple Kansa Gold', hex: '#D97706', bg: 'bg-[#D97706]', origin: 'Brass mineral resin' },
  { name: 'Haldi Turmeric', hex: '#EAB308', bg: 'bg-[#EAB308]', origin: 'Sun-dried Curcuma' },
  { name: 'Peacock Indigo', hex: '#1E3A8A', bg: 'bg-[#1E3A8A]', origin: 'Natural Indigofera tinctoria' },
  { name: 'Malachite Green', hex: '#15803D', bg: 'bg-[#15803D]', origin: 'Copper carbonate stone' },
  { name: 'Khadi White', hex: '#FDF8F2', bg: 'bg-[#FDF8F2]', origin: 'Chalked gypsum' },
];

export const RoganCraftSimulator: React.FC<RoganCraftSimulatorProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState(ROGAN_PIGMENTS[1].hex);
  const [brushSize, setBrushSize] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFolding, setIsFolding] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [foldProgress, setFoldProgress] = useState(0); // 0 to 1

  // Initialize canvas
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Silk cloth textured base
    ctx.fillStyle = '#141416'; // Deep charcoal raw silk ground
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle center crease line
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Save initial blank state
    const initial = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initial]);
    setIsMirrored(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(setupCanvas, 100);
    }
  }, [isOpen, setupCanvas]);

  // Handle pointer drawing
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isFolding) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only allow drawing on the LEFT half (the working fabric half)
    if (x > canvas.width / 2) return;

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isFolding) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Constrain to left half
    const clampedX = Math.min(x, canvas.width / 2 - 2);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Rogan viscous filament stroke with slight glow
    ctx.shadowColor = selectedColor;
    ctx.shadowBlur = brushSize > 4 ? 3 : 1;
    ctx.lineTo(clampedX, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
    ctx.shadowBlur = 0;

    // Save history snapshot
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), snapshot]);
  };

  // Perform authentic Rogan Silk Mirror Pressing
  const handleFoldSilk = () => {
    const canvas = canvasRef.current;
    if (!canvas || isFolding) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsFolding(true);
    setFoldProgress(0);

    // Audio acoustic fold sound via native Web Audio
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {}

    // Animate folding progress
    let start = performance.now();
    const duration = 750; // ms

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(1, elapsed / duration);
      setFoldProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Complete mirror press
        const halfWidth = Math.floor(canvas.width / 2);

        // Mirror horizontally onto right half
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, 0, 0, halfWidth, canvas.height, 0, 0, halfWidth, canvas.height);
        ctx.restore();

        // Draw center gold crease
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        setIsFolding(false);
        setIsMirrored(true);
      }
    };

    requestAnimationFrame(animate);
  };

  // Download finished artwork
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Parampara_Rogan_Masterpiece_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Preset Template loader (Tree of Life base)
  // Preset Template loader (Intricate Kutch Rogan "Tree of Life" with Sacred Birds & Mandala)
  const loadPresetTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setupCanvas();

    const w = canvas.width / 2; // 280px (fold line)
    const h = canvas.height;     // 400px

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. BASE ROOTS & MOUND (Terracotta / Gold)
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w - 5, h - 25);
    ctx.quadraticCurveTo(w - 45, h - 22, w - 85, h - 20);
    ctx.moveTo(w - 25, h - 25);
    ctx.quadraticCurveTo(w - 55, h - 15, w - 75, h - 10);
    ctx.moveTo(w - 10, h - 25);
    ctx.quadraticCurveTo(w - 30, h - 12, w - 45, h - 8);
    ctx.stroke();

    // 2. MAIN ASCENDING TRUNK (Rich Boiled Castor Gold)
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w - 12, h - 25);
    ctx.quadraticCurveTo(w - 28, h * 0.72, w - 38, h * 0.52);
    ctx.quadraticCurveTo(w - 44, h * 0.38, w - 48, h * 0.26);
    ctx.stroke();

    // Secondary Trunk Lining (Vermilion Kumkum)
    ctx.strokeStyle = '#9F1239';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w - 8, h - 25);
    ctx.quadraticCurveTo(w - 22, h * 0.72, w - 32, h * 0.52);
    ctx.quadraticCurveTo(w - 38, h * 0.38, w - 42, h * 0.26);
    ctx.stroke();

    // 3. SWEEPING RADIANT BRANCHES (Organic Filigree Curves)
    const branches = [
      // Lower sweeping bough
      { start: [w - 32, h * 0.70], ctrl: [w - 95, h * 0.75], end: [w - 175, h * 0.68], color: '#D97706', width: 3 },
      { start: [w - 110, h * 0.73], ctrl: [w - 145, h * 0.82], end: [w - 180, h * 0.80], color: '#059669', width: 2.5 },
      // Mid-lower flourishing bough
      { start: [w - 38, h * 0.56], ctrl: [w - 125, h * 0.54], end: [w - 215, h * 0.46], color: '#D97706', width: 3 },
      { start: [w - 135, h * 0.54], ctrl: [w - 170, h * 0.62], end: [w - 210, h * 0.60], color: '#2563EB', width: 2.5 },
      // Central majestic spiral bough
      { start: [w - 44, h * 0.42], ctrl: [w - 130, h * 0.36], end: [w - 205, h * 0.28], color: '#9F1239', width: 3 },
      { start: [w - 120, h * 0.38], ctrl: [w - 160, h * 0.44], end: [w - 195, h * 0.42], color: '#059669', width: 2 },
      // Upper crown arches
      { start: [w - 48, h * 0.30], ctrl: [w - 115, h * 0.20], end: [w - 165, h * 0.16], color: '#D97706', width: 2.5 },
      { start: [w - 48, h * 0.26], ctrl: [w - 75, h * 0.12], end: [w - 115, h * 0.08], color: '#9F1239', width: 2.5 },
      { start: [w - 38, h * 0.22], ctrl: [w - 50, h * 0.09], end: [w - 15, h * 0.06], color: '#D97706', width: 2.5 },
    ];

    branches.forEach((b) => {
      ctx.strokeStyle = b.color;
      ctx.lineWidth = b.width;
      ctx.beginPath();
      ctx.moveTo(b.start[0], b.start[1]);
      ctx.quadraticCurveTo(b.ctrl[0], b.ctrl[1], b.end[0], b.end[1]);
      ctx.stroke();
    });

    // 4. SACRED TEARDROP BUDS & KALKA MOTIFS
    const blossoms = [
      { pt: [w - 175, h * 0.68], color: '#EAB308', r: 7 },
      { pt: [w - 180, h * 0.80], color: '#9F1239', r: 6 },
      { pt: [w - 215, h * 0.46], color: '#EAB308', r: 8 },
      { pt: [w - 210, h * 0.60], color: '#059669', r: 6 },
      { pt: [w - 205, h * 0.28], color: '#9F1239', r: 8 },
      { pt: [w - 195, h * 0.42], color: '#2563EB', r: 6 },
      { pt: [w - 165, h * 0.16], color: '#EAB308', r: 7 },
      { pt: [w - 115, h * 0.08], color: '#9F1239', r: 7 },
      { pt: [w - 15, h * 0.06], color: '#EAB308', r: 6 },
    ];

    blossoms.forEach((b) => {
      // Outer drop
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.pt[0], b.pt[1], b.r, 0, Math.PI * 2);
      ctx.fill();

      // Inner pearl dot
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(b.pt[0], b.pt[1], b.r * 0.4, 0, Math.PI * 2);
      ctx.fill();
    });

    // 5. PERCHED PEACOCK ON CENTRAL BOUGH (Mayura Silhouette)
    ctx.strokeStyle = '#2563EB'; // Peacock Indigo
    ctx.lineWidth = 3;
    ctx.beginPath();
    // Peacock body & arched neck
    ctx.moveTo(w - 95, h * 0.48);
    ctx.quadraticCurveTo(w - 110, h * 0.44, w - 105, h * 0.40);
    ctx.quadraticCurveTo(w - 102, h * 0.37, w - 96, h * 0.38);
    ctx.stroke();
    // Peacock crest
    ctx.fillStyle = '#EAB308';
    ctx.beginPath();
    ctx.arc(w - 95, h * 0.35, 3.5, 0, Math.PI * 2);
    ctx.fill();
    // Sweeping tail plumes
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(w - 108, h * 0.46);
    ctx.quadraticCurveTo(w - 130, h * 0.52, w - 145, h * 0.60);
    ctx.moveTo(w - 106, h * 0.47);
    ctx.quadraticCurveTo(w - 125, h * 0.55, w - 135, h * 0.65);
    ctx.stroke();

    // 6. KHATRI KALAM STIPPLING RAYS (White Gypsum & Gold Fine Dots)
    ctx.fillStyle = '#F8FAFC';
    for (let i = 0; i < 22; i++) {
      const angle = (i / 22) * Math.PI * 0.9 + 0.1;
      const rad = 130 + (i % 3) * 15;
      const px = w - 48 - Math.sin(angle) * rad;
      const py = h * 0.35 - Math.cos(angle) * rad * 0.75;
      if (px > 15 && py > 15 && py < h - 40) {
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev, snapshot]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-paper">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-terracotta/20 border border-terracotta/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-terracotta" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold text-ink">
                Kutch Rogan Silk Simulator
              </h3>
              <p className="text-xs font-mono text-muted">
                Draw castor-oil thread on the left half • Fold cloth to mirror sacred mandala
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-5 flex flex-col lg:flex-row items-start gap-5 overflow-y-auto">
          {/* Drawing Canvas with 3D Fold Transition */}
          <div className="relative flex flex-col items-center">
            <div className="relative rounded-lg overflow-hidden border-2 border-border shadow-card bg-paper">
              <canvas
                ref={canvasRef}
                width={560}
                height={400}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                className="cursor-crosshair block touch-none"
              />

              {/* Center Crease Indicator Badge */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-surface/90 border border-border px-2.5 py-0.5 rounded text-[10px] font-mono text-ink pointer-events-none flex items-center gap-1">
                {isMirrored ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Symmetrically Mirrored</span>
                  </>
                ) : (
                  <span>Silk Center Fold Crease</span>
                )}
              </div>

              {/* Folding Animation Overlay */}
              {isFolding && (
                <div
                  className="absolute inset-y-0 right-0 bg-surface/80 backdrop-blur-xs border-l border-terracotta pointer-events-none transition-colors duration-75 flex items-center justify-center"
                  style={{ width: `${(1 - foldProgress) * 50}%` }}
                >
                  <span className="text-[10px] font-mono text-white">Pressing...</span>
                </div>
              )}

              {/* Side Labels */}
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-muted/60 pointer-events-none">
                Working Half (Draw Here)
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] font-mono text-muted/60 pointer-events-none">
                Mirrored Half (Folds from Left)
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="flex items-center gap-2 mt-3 text-xs text-muted">
              <Info className="w-4 h-4 text-muted shrink-0" />
              <span>
                Draw using fine resin threads. Click <strong>"Fold Silk & Mirror"</strong> to watch your design mirror symmetrically.
              </span>
            </div>
          </div>

          {/* Artisan Toolset Controls */}
          <div className="flex-1 w-full space-y-3">
            {/* Pigment Selection */}
            <div>
              <label className="text-xs font-mono text-muted block mb-1.5">
                1. Viscous mineral pigments
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {ROGAN_PIGMENTS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedColor(p.hex)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-colors ${
                      selectedColor === p.hex
                        ? 'border-terracotta bg-surface shadow-sm'
                        : 'border-border bg-paper hover:border-terracotta'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: p.hex }}
                    />
                    <div className="truncate">
                      <div className="text-[11px] font-medium text-ink truncate">{p.name}</div>
                      <div className="text-[9px] text-muted truncate">{p.origin}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Brass Kalam Stylus Thickness */}
            <div>
              <label className="text-xs font-mono text-muted block mb-1.5">
                2. Brass kalam stylus gauge
              </label>
              <div className="flex items-center gap-2">
                {[2, 4, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBrushSize(size)}
                    className={`flex-1 py-1 rounded-lg border text-xs font-mono transition-colors ${
                      brushSize === size
                        ? 'bg-terracotta text-white border-terracotta shadow-sm'
                        : 'bg-paper text-ink border-border hover:border-terracotta'
                    }`}
                  >
                    {size === 2 ? 'Fine filament' : size === 4 ? 'Medium thread' : 'Bold border'}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Templates */}
            <div>
              <label className="text-xs font-mono text-muted block mb-1.5">
                3. Traditional starter motif
              </label>
              <button
                onClick={loadPresetTemplate}
                className="w-full py-1.5 px-3 rounded-lg border border-border bg-paper hover:border-terracotta text-ink text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-muted" />
                <span>Load "Sacred Tree of Life" outline</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-1 space-y-2">
              <button
                onClick={handleFoldSilk}
                disabled={isFolding}
                className="w-full py-2 px-4 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-colors border border-border"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>{isFolding ? 'Pressing fabric...' : 'Fold silk & mirror (press)'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={setupCanvas}
                  className="flex-1 py-1.5 px-3 rounded-lg border border-border bg-paper hover:border-terracotta text-ink text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Silk</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex-1 py-1.5 px-3 rounded-lg border border-border bg-paper hover:border-terracotta text-ink text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Artwork</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-paper border-t border-border text-[11px] font-mono text-muted flex items-center justify-between">
          <span>Heritage Authenticity: Khatri Family Tradition (GI-IN-029)</span>
          <span className="text-muted">Parampara AI Interactive Sandbox</span>
        </div>
      </div>
    </div>
  );
};

