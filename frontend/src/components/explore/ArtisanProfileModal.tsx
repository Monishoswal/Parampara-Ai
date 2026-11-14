import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Award,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Heart,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { ArtisanProfile, HERITAGE_OBJECTS } from '../../data/heritageDataset';

interface ArtisanProfileModalProps {
  artisan: ArtisanProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectCraft: (craftId: string) => void;
}

export const ArtisanProfileModal: React.FC<ArtisanProfileModalProps> = ({
  artisan,
  isOpen,
  onClose,
  onSelectCraft,
}) => {
  if (!artisan) return null;

  // Associated craft objects
  const associatedCrafts = HERITAGE_OBJECTS.filter((obj) =>
    artisan.associated_craft_ids.includes(obj.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-4xl bg-surface text-ink rounded-lg shadow-2xl overflow-hidden z-10 border border-border max-h-[90vh] flex flex-col transition-colors duration-300"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-md bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Hero Photographic Banner: Workshop & Portrait */}
              <div className="relative h-72 sm:h-80 w-full bg-surface overflow-hidden">
                <img
                  src={artisan.workshop_photo_url}
                  alt={`${artisan.name}'s workshop environment`}
                  className="w-full h-full object-cover opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                {/* Overlaid Artisan Identity Badge */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end gap-5">
                  <div className="relative">
                    <img
                      src={artisan.portrait_url}
                      alt={artisan.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-md object-cover border-2 border-border shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-sage text-white p-1 rounded-full border-2 border-surface">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-white space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                        {artisan.name}
                      </h2>
                      {artisan.honorific && (
                        <span className="px-2.5 py-0.5 rounded-sm text-xs font-mono font-medium bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm">
                          {artisan.honorific}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-mono text-amber-300">
                      {artisan.craft_specialisation}
                    </p>
                    <p className="text-xs text-[#A19E95] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {artisan.region}, {artisan.state} ({artisan.zone})
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Master Quote Card */}
                <div className="p-5 sm:p-6 rounded-md bg-paper border-l-2 border-terracotta border-t border-r border-b border-border">
                  <p className="text-base sm:text-lg font-editorial italic text-ink leading-relaxed">
                    "{artisan.quote}"
                  </p>
                  <p className="text-xs text-terracotta font-mono mt-3">
                    — Master craftsman statement • Recorded via living heritage documentation
                  </p>
                </div>

                {/* Experience & Masterworks Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3.5 rounded-md bg-paper border border-border">
                    <p className="text-xs font-mono text-muted">
                      Generational practice
                    </p>
                    <p className="text-xl font-editorial font-bold text-ink mt-1">
                      {artisan.experience_years} Years
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md bg-paper border border-border">
                    <p className="text-xs font-mono text-muted">
                      Consent status
                    </p>
                    <p className="text-xs font-mono text-sage mt-2 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified master</span>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md bg-paper border border-border">
                    <p className="text-xs font-mono text-muted">
                      Regional guild
                    </p>
                    <p className="text-xs font-mono text-ink mt-2 truncate">
                      {artisan.state} Council
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md bg-paper border border-border">
                    <p className="text-xs font-mono text-muted">
                      Archival attribution
                    </p>
                    <p className="text-xs text-muted mt-2 truncate font-mono" title={artisan.image_attribution}>
                      {artisan.image_attribution}
                    </p>
                  </div>
                </div>

                {/* Biography & Cultural Mission */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-muted flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-terracotta" />
                    <span>Preservation mission & living heritage lineage</span>
                  </h3>
                  <p className="text-sm text-ink/90 leading-relaxed font-sans">
                    {artisan.bio}
                  </p>
                </div>

                {/* Master's Traditional Techniques */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-muted flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-terracotta" />
                    <span>Signature master techniques</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {artisan.techniques.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-sm text-xs font-mono bg-terracotta/10 text-terracotta border border-terracotta/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* National & State Honours */}
                {artisan.awards.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono text-muted flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>State & national accreditations</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {artisan.awards.map((award, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-sm text-xs font-mono bg-surface text-ink border border-border"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Masterpieces Craft Links */}
                {associatedCrafts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono text-muted">
                      Exhibition pieces preserved in this museum
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {associatedCrafts.map((obj) => (
                        <div
                          key={obj.id}
                          onClick={() => {
                            onClose();
                            onSelectCraft(obj.id);
                          }}
                          className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-terracotta bg-paper hover:bg-surface cursor-pointer transition-colors shadow-sm group"
                        >
                          <img
                            src={obj.image_url}
                            alt={obj.name}
                            className="w-14 h-14 rounded-md object-cover border border-border"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-ink group-hover:text-terracotta truncate">
                              {obj.name}
                            </p>
                            <p className="text-xs text-muted font-mono mt-0.5">
                              {obj.gi_status || obj.region}
                            </p>
                            <span className="text-[10px] text-terracotta font-semibold flex items-center gap-1 mt-1">
                              <span>Inspect in 3D Gallery</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-paper flex items-center justify-between">
              <span className="text-xs text-muted">
                Direct Guild Connect & Fair Artisan Compensation Guaranteed
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors"
              >
                Back to Museum
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

