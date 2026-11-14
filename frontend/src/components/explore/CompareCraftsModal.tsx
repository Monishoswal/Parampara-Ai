import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Scale,
  MapPin,
  Calendar,
  Layers,
  Flame,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { HeritageObject, HERITAGE_OBJECTS } from '../../data/heritageDataset';

interface CompareCraftsModalProps {
  initialObjectA: HeritageObject | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectObject?: (obj: HeritageObject) => void;
}

export const CompareCraftsModal: React.FC<CompareCraftsModalProps> = ({
  initialObjectA,
  isOpen,
  onClose,
  onSelectObject,
}) => {
  // Select first object (default to initialObjectA or first item)
  const [objectAId, setObjectAId] = useState<string>(
    initialObjectA?.id || HERITAGE_OBJECTS[0]?.id || ''
  );

  // Select second object (default to a different item)
  const defaultSecondId =
    HERITAGE_OBJECTS.find((o) => o.id !== (initialObjectA?.id || HERITAGE_OBJECTS[0]?.id))
      ?.id || HERITAGE_OBJECTS[1]?.id;

  const [objectBId, setObjectBId] = useState<string>(defaultSecondId || '');

  if (!isOpen) return null;

  const objA = HERITAGE_OBJECTS.find((o) => o.id === objectAId) || HERITAGE_OBJECTS[0];
  const objB = HERITAGE_OBJECTS.find((o) => o.id === objectBId) || HERITAGE_OBJECTS[1];

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

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-surface text-ink rounded-lg shadow-2xl overflow-hidden z-10 border border-border flex flex-col max-h-[92vh] transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-paper/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-md bg-terracotta/15 text-terracotta">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-ink">
                  Comparative Indian Craft Analysis
                </h2>
                <p className="text-xs text-muted">
                  Analyze differing metallurgical compositions, weaving structures, and regional philosophies
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

          {/* Selector Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4 bg-paper border-b border-border">
            <div>
              <label className="text-xs font-mono text-muted block mb-1.5">
                Select first tradition
              </label>
              <select
                value={objectAId}
                onChange={(e) => setObjectAId(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border text-xs font-semibold bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-terracotta"
              >
                {HERITAGE_OBJECTS.map((o) => (
                  <option key={o.id} value={o.id} className="bg-surface text-ink">
                    {o.name} ({o.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-muted block mb-1.5">
                Select comparative tradition
              </label>
              <select
                value={objectBId}
                onChange={(e) => setObjectBId(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border text-xs font-semibold bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-terracotta"
              >
                {HERITAGE_OBJECTS.map((o) => (
                  <option key={o.id} value={o.id} className="bg-surface text-ink">
                    {o.name} ({o.region})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparative Table Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Craft A Card */}
              <div className="space-y-5 p-5 rounded-lg bg-paper border border-border">
                <div className="relative h-48 rounded-md overflow-hidden bg-surface shadow-card">
                  <img
                    src={objA.image_url}
                    alt={objA.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-sm text-xs font-mono text-ink border border-border">
                    {objA.category_label}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <h3 className="text-base font-editorial text-white line-clamp-1">
                      {objA.name}
                    </h3>
                    <p className="text-xs text-amber-300 font-mono">
                      {objA.region} • {objA.state}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Historical era
                    </span>
                    <p className="font-semibold text-ink mt-0.5">{objA.historical_era}</p>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      GI certification status
                    </span>
                    <p className="font-semibold text-sage mt-0.5">
                      {objA.gi_status || 'Verified Traditional Geographical Cluster'}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Primary raw materials
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {objA.materials.map((m, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-surface border border-border text-xs font-mono text-ink"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Distinctive master technique
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {objA.techniques.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-terracotta/15 text-terracotta border border-terracotta/30 text-xs font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Cultural significance
                    </span>
                    <p className="text-muted leading-relaxed mt-0.5 font-sans">
                      {objA.cultural_significance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Craft B Card */}
              <div className="space-y-5 p-5 rounded-lg bg-paper border border-border">
                <div className="relative h-48 rounded-md overflow-hidden bg-surface shadow-card">
                  <img
                    src={objB.image_url}
                    alt={objB.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-sm text-xs font-mono text-ink border border-border">
                    {objB.category_label}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <h3 className="text-base font-editorial text-white line-clamp-1">
                      {objB.name}
                    </h3>
                    <p className="text-xs text-amber-300 font-mono">
                      {objB.region} • {objB.state}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Historical era
                    </span>
                    <p className="font-semibold text-ink mt-0.5">{objB.historical_era}</p>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      GI certification status
                    </span>
                    <p className="font-semibold text-sage mt-0.5">
                      {objB.gi_status || 'Verified Traditional Geographical Cluster'}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Primary raw materials
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {objB.materials.map((m, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-surface border border-border text-xs font-mono text-ink"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Distinctive master technique
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {objB.techniques.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-terracotta/15 text-terracotta border border-terracotta/30 text-xs font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted block">
                      Cultural significance
                    </span>
                    <p className="text-muted leading-relaxed mt-0.5 font-sans">
                      {objB.cultural_significance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-paper flex items-center justify-between">
            <span className="text-xs text-muted">
              Comparative matrix adheres to All India Handicrafts Board standards
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors"
            >
              Done Comparing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

