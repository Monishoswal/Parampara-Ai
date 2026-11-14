import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { HeritageObject } from '../../data/heritageDataset';

interface Fallback2DGalleryProps {
  objects: HeritageObject[];
  onSelectObject: (obj: HeritageObject) => void;
  selectedObject: HeritageObject | null;
}

export const Fallback2DGallery: React.FC<Fallback2DGalleryProps> = ({
  objects,
  onSelectObject,
  selectedObject,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs font-mono text-muted pb-2 border-b border-border">
        <span>Displaying {objects.length} verified cultural artefacts in curated 2D gallery</span>
        <span>Click any masterwork to open its full cultural lore & artisan lineage</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {objects.map((obj, idx) => {
          const isSelected = selectedObject?.id === obj.id;
          return (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => onSelectObject(obj)}
              className={`group rounded-lg bg-surface border cursor-pointer overflow-hidden transition-colors flex flex-col justify-between ${
                isSelected
                  ? 'border-terracotta ring-1 ring-terracotta/30 shadow-card'
                  : 'border-border hover:border-border-strong shadow-card'
              }`}
            >
              {/* Image Preview with Region and GI badges */}
              <div className="relative h-60 overflow-hidden bg-stone-950">
                <img
                  src={obj.image_url}
                  alt={obj.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-85" />

                {/* Region Tag */}
                <div className="absolute top-3 left-3 bg-stone-950/90 px-2 py-0.5 rounded-sm text-[10px] font-mono text-amber-300 border border-amber-500/30">
                  {obj.region}
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 bg-stone-900/90 px-2 py-0.5 rounded-sm text-[10px] font-mono text-stone-300 border border-stone-800">
                  {obj.category_label}
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] font-mono text-stone-400">{obj.state}</p>
                  <h3 className="text-base font-editorial text-white line-clamp-1">
                    {obj.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {obj.cultural_significance}
                </p>

                {/* Materials & Era */}
                <div className="space-y-1.5 pt-2 border-t border-border font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Historical Era</span>
                    <span className="text-ink">{obj.historical_era}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">GI Status</span>
                    <span className="text-sage">{obj.gi_status || 'GI Documented'}</span>
                  </div>
                </div>

                {/* Associated Artisan Snippet */}
                {obj.associated_artisan_name && (
                  <div className="flex items-center gap-2 p-2 rounded-sm bg-paper border border-border text-[11px] text-muted">
                    <UserCheck className="w-3.5 h-3.5 text-terracotta shrink-0" />
                    <span className="truncate">Master: {obj.associated_artisan_name}</span>
                  </div>
                )}

                {/* Card CTA */}
                <div className="pt-2 flex items-center justify-between text-xs font-medium text-terracotta">
                  <span>Inspect Cultural Lore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
