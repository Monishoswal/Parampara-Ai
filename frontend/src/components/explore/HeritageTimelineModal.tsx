import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Sparkles, MapPin, Layers, ArrowRight, Clock } from 'lucide-react';
import { HERITAGE_TIMELINE, HeritageTimelineMilestone } from '../../data/heritageDataset';

interface HeritageTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMilestoneEra?: (era: string) => void;
}

export const HeritageTimelineModal: React.FC<HeritageTimelineModalProps> = ({
  isOpen,
  onClose,
  onSelectMilestoneEra,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!isOpen) return null;

  const currentMilestone = HERITAGE_TIMELINE[selectedIdx];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-surface text-ink rounded-lg shadow-2xl overflow-hidden z-10 border border-border flex flex-col max-h-[90vh] transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-paper/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-md bg-terracotta/15 text-terracotta">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-ink">
                  Chronology of Indian Craft Traditions
                </h2>
                <p className="text-xs text-muted">
                  5,000 years of unbroken material civilization from the Indus Valley to Modern GI
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-md border border-border text-muted hover:bg-paper transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline Navigation Tabs */}
          <div className="px-6 py-4 bg-paper border-b border-border flex gap-2 overflow-x-auto scrollbar-none">
            {HERITAGE_TIMELINE.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedIdx === idx
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'bg-surface text-muted hover:text-ink border border-border'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{item.approx_period}</span>
              </button>
            ))}
          </div>

          {/* Selected Epoch Details */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-terracotta bg-terracotta/15 px-2.5 py-0.5 rounded-sm border border-terracotta/30">
                {currentMilestone.approx_period}
              </span>
              <h3 className="text-2xl font-editorial font-bold text-ink">
                {currentMilestone.era}
              </h3>
              <p className="text-sm text-ink leading-relaxed font-sans bg-paper p-5 rounded-md border border-border">
                {currentMilestone.significance}
              </p>
            </div>

            {/* Prominent Crafts & Disciplines */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-muted flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-terracotta" />
                <span>Signature material traditions flourishing in this era</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentMilestone.prominent_crafts.map((craft, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-md bg-paper border border-border text-xs font-semibold text-ink flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                    <span>{craft}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Cultural Epicenters */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-muted flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>Key geographical centers</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentMilestone.associated_regions.map((reg, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-sm text-xs font-mono bg-paper text-ink border border-border"
                  >
                    {reg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-border bg-paper flex items-center justify-between">
            <span className="text-xs text-muted">
              Grounded in archaeological excavations & National Archives documentation
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors"
            >
              Close Timeline
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

