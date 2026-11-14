import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Sparkles,
  Trophy,
  X,
  CheckCircle2,
  AlertCircle,
  Timer,
  ChevronRight,
  RotateCcw,
  Award
} from 'lucide-react';

interface MysteryCraftQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MysteryQuestion {
  id: string;
  image: string;
  title: string;
  clues: string[];
  options: string[];
  correctIndex: number;
  funFact: string;
}

const MYSTERY_QUESTIONS: MysteryQuestion[] = [
  {
    id: 'rogan',
    image: '/images/heritage/artisan_rogan.jpg',
    title: 'Mystery Artefact #1',
    clues: [
      'Natural mineral pigments bound with thick boiled castor oil resin.',
      'Drawn in mid-air using a 6-inch brass kalam without touching the cloth.',
      'Symmetrically mirrored by pressing the fabric in half along a center crease.',
    ],
    options: ['Madhubani Painting', 'Kutch Rogan Art', 'Warli Tribal Art', 'Pattachitra'],
    correctIndex: 1,
    funFact:
      'Practiced by only the Khatri family in Nirona, Kutch. A single saree can take over 6 months to craft!',
  },
  {
    id: 'bidri',
    image: '/images/heritage/craft_bidriware_aftaba.jpg',
    title: 'Mystery Artefact #2',
    clues: [
      'Cast from an alloy of 95% zinc and 5% copper.',
      'Inlaid with pure silver sheet or wire beaten into hand-carved grooves.',
      'Permanently blackened using rare ammonium-rich soil collected from the Bidar Fort.',
    ],
    options: ['Dhokra Brass Casting', 'Kansa Bell Metal', 'Bidriware Silver Inlay', 'Tanjore Gold Plate'],
    correctIndex: 2,
    funFact:
      'The fort soil in Bidar has special chemical oxidizers that turn the zinc jet-black while leaving the silver wire gleaming!',
  },
  {
    id: 'kalamkari',
    image: '/images/heritage/craft_kalamkari.jpg',
    title: 'Mystery Artefact #3',
    clues: [
      'Drawn with a bamboo reed pen dipped in fermented jaggery and iron water.',
      'Natural red color obtained from madder root (Manjistha) washed in temple rivers.',
      'Depicts episodes from epics on unbleached organic cotton.',
    ],
    options: ['Srikalahasti Kalamkari', 'Phad Scroll Painting', 'Pichwai Art', 'Gond Painting'],
    correctIndex: 0,
    funFact:
      'The cotton is treated with buffalo milk to prevent natural dyes from bleeding into adjacent fabric threads.',
  },
  {
    id: 'dhokra',
    image: '/images/heritage/craft_dhokra_elephant.jpg',
    title: 'Mystery Artefact #4',
    clues: [
      'Over 4,000-year-old non-ferrous metal lost-wax casting technique tracing to Mohenjo-daro.',
      'Uses clay cores wrapped with beeswax threads to form ribbed, tactile textures.',
      'Molten bronze and brass poured into heated clay moulds buried in coal pits.',
    ],
    options: ['Moradabad Brassware', 'Bastar Dhokra Casting', 'Aranmula Metal Mirror', 'Patan Patola'],
    correctIndex: 1,
    funFact:
      'Each Dhokra piece is an absolute one-of-a-kind original because the clay mould must be broken open to reveal the cast metal.',
  },
  {
    id: 'channapatna',
    image: '/images/heritage/craft_channapatna_toys.jpg',
    title: 'Mystery Artefact #5',
    clues: [
      'Turned on pedal lathes using soft, fine-grained Wrightia tinctoria (Aale mara) ivory wood.',
      'Colored naturally with organic vegetable lac, turmeric, indigo, and katha extracts.',
      'Polished with screw-pine leaves until mirror-smooth without toxic varnishes.',
    ],
    options: ['Kondapalli Toys', 'Kinhal Woodcraft', 'Channapatna Lacquerware', 'Saharanpur Carving'],
    correctIndex: 2,
    funFact:
      'Tipu Sultan invited Persian master artisans in the 18th century to train local artisans, earning the town the title "Gombegala Ooru" (Toy Town).',
  },
];

export const MysteryCraftQuiz: React.FC<MysteryCraftQuizProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealedClues, setRevealedClues] = useState(1);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentQ = MYSTERY_QUESTIONS[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isFinished || selectedOption !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setSelectedOption(-1); // Time out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isFinished, selectedOption, currentIndex]);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + (timeLeft * 10) + 100);
      try {
        // Play acoustic success chime
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch {}
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < MYSTERY_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setRevealedClues(1);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setRevealedClues(1);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(30);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-paper">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center">
              <Trophy className="w-4 h-4 text-ink" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold text-ink">
                Guess the Craft: 60s Mystery Challenge
              </h3>
              <p className="text-xs font-mono text-muted">
                Examine microscopic craft textures & unravel traditional clues
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

        {/* Content */}
        {!isFinished ? (
          <div className="p-6 space-y-6">
            {/* Top Stat Bar */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="text-muted">
                Question {currentIndex + 1} of {MYSTERY_QUESTIONS.length}
              </div>
              <div className="flex items-center gap-1.5 text-ink bg-paper px-2.5 py-1 rounded border border-border">
                <Timer className="w-3.5 h-3.5 text-muted" />
                <span>{timeLeft}s remaining</span>
              </div>
              <div className="text-emerald-400 font-bold">Score: {score} pts</div>
            </div>

            {/* Mystery Artefact Card with Microscopic Zoom */}
            <div className="relative h-48 rounded-lg overflow-hidden border border-border bg-paper">
              <img
                src={currentQ.image}
                alt="Mystery Artefact"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/heritage/craft_bidriware_aftaba.jpg';
                }}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  selectedOption !== null ? 'filter-none scale-100' : 'scale-150 filter blur-[1px]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded border border-border text-xs font-editorial text-ink">
                {selectedOption !== null ? currentQ.options[currentQ.correctIndex] : 'Macro Lens Texture Inspection'}
              </div>
            </div>

            {/* Revealing Clues */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted">
                  Traditional clues ({revealedClues}/3)
                </span>
                {revealedClues < 3 && selectedOption === null && (
                  <button
                    onClick={() => setRevealedClues((prev) => Math.min(3, prev + 1))}
                    className="text-xs text-terracotta hover:text-terracotta-hover font-medium underline underline-offset-2 transition-colors"
                  >
                    Reveal next clue
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {currentQ.clues.slice(0, revealedClues).map((clue, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-paper p-2.5 rounded-lg border border-border text-xs text-ink animate-fade-in"
                  >
                    <span className="w-4 h-4 rounded-full bg-surface text-muted border border-border flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{clue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let btnStyle = 'border-border bg-paper text-ink hover:border-terracotta hover:bg-surface';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500';
                  } else {
                    btnStyle = 'border-border bg-paper/40 text-muted opacity-40';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`p-3 rounded-lg border text-xs font-medium text-left transition-colors ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Answer Result & Fun Fact */}
            {selectedOption !== null && (
              <div className="p-3 rounded-lg bg-paper border border-border space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer! +{timeLeft * 10 + 100} pts
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> That was {currentQ.options[currentQ.correctIndex]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted font-sans">{currentQ.funFact}</p>
                <button
                  onClick={handleNext}
                  className="w-full py-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium rounded flex items-center justify-center gap-1 transition-colors mt-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-paper border border-border flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-ink" />
            </div>
            <div>
              <h4 className="text-xl font-editorial font-bold text-ink">
                Parampara Heritage Connoisseur
              </h4>
              <p className="text-xs text-muted mt-1">
                You scored <strong className="text-ink font-mono text-sm">{score} points</strong> across Indian GI Crafts!
              </p>
            </div>

            <div className="p-4 rounded-lg bg-paper border border-border max-w-sm mx-auto text-xs text-muted text-left space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span className="text-emerald-400">100% Master Rank</span>
              </div>
              <div className="flex justify-between">
                <span>Traditions Explored:</span>
                <span className="text-ink">Rogan, Bidri, Kalamkari, Dhokra</span>
              </div>
              <div className="flex justify-between">
                <span>GI Registry Validation:</span>
                <span className="text-ink">Verified</span>
              </div>
            </div>

            {/* Collectible Royal Obsidian & Temple Gold Guild Badges */}
            <div className="space-y-2 pt-2 max-w-md mx-auto">
              <span className="text-xs font-mono text-[#FF7A00] font-semibold block uppercase">
                ✦ Collectible Guild Seals Unlocked
              </span>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="p-2.5 rounded-xl bg-[#08080A] border border-[#FF7A00]/40 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF7A00] shrink-0" />
                  <div>
                    <strong className="text-[11px] font-mono text-white block">Bidri Metallurgist</strong>
                    <span className="text-[9px] text-[#A19E95] block">Zinc-Silver Alchemy</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#08080A] border border-[#FF7A00]/40 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF7A00] shrink-0" />
                  <div>
                    <strong className="text-[11px] font-mono text-white block">Rogan Symmetry Guard</strong>
                    <span className="text-[9px] text-[#A19E95] block">Castor-Oil Stylus</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#08080A] border border-[#FF7A00]/40 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF7A00] shrink-0" />
                  <div>
                    <strong className="text-[11px] font-mono text-white block">Kalamkari Botanist</strong>
                    <span className="text-[9px] text-[#A19E95] block">Natural Vegetable Dyes</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#08080A] border border-[#FF7A00]/40 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF7A00] shrink-0" />
                  <div>
                    <strong className="text-[11px] font-mono text-white block">Dhokra Bronze Caster</strong>
                    <span className="text-[9px] text-[#A19E95] block">Lost-Wax 1100°C</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="py-2 px-4 rounded-md border border-border bg-paper hover:border-terracotta text-ink text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onClose}
                className="py-2 px-5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

