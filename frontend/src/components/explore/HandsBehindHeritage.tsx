import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  MapPin,
  Award,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { HERITAGE_ARTISANS, ArtisanProfile } from '../../data/heritageDataset';
import { TiltCard } from '../interactive/TiltCard';

interface HandsBehindHeritageProps {
  onSelectArtisan: (artisan: ArtisanProfile) => void;
  onExploreCraft: (craftId: string) => void;
}

export const HandsBehindHeritage: React.FC<HandsBehindHeritageProps> = ({
  onSelectArtisan,
  onExploreCraft,
}) => {
  return (
    <section className="space-y-8 py-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-surface text-terracotta text-xs font-mono border border-border">
            <Users className="w-3.5 h-3.5 text-terracotta" />
            <span>Documentary portrait archive</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial text-ink tracking-tight">
            The Hands Behind Heritage
          </h2>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Authentic photographic profiles of Indian women weavers, potters, folk painters, bell-metal
            casters, and classical keepers preserving unbroken generational knowledge.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-muted bg-surface px-3 py-1.5 rounded-md border border-border">
          <ShieldCheck className="w-3.5 h-3.5 text-sage" />
          <span>Consented Documentation • Direct Guild Link</span>
        </div>
      </div>

      {/* Editorial Photographic Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HERITAGE_ARTISANS.map((artisan, index) => (
          <TiltCard key={artisan.id} maxTilt={6} className="h-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group rounded-lg bg-surface border border-border overflow-hidden shadow-card hover:border-border-strong transition-colors flex flex-col justify-between h-full"
            >
            {/* Split Photographic View: Hero Studio + Artisan Portrait Overlap */}
            <div className="relative h-60 overflow-hidden bg-surface">
              <img
                src={artisan.workshop_photo_url}
                alt={`${artisan.name} craft workshop`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

              {/* State & Experience Tag */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono bg-paper/90 text-ink border border-border">
                  {artisan.zone}
                </span>
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono text-muted bg-paper/90 border border-border">
                  {artisan.experience_years}+ Yrs Practice
                </span>
              </div>

              {/* Artisan Portrait */}
              <div className="absolute -bottom-5 left-5 flex items-end gap-3 z-10">
                <div className="relative">
                  <img
                    src={artisan.portrait_url}
                    alt={artisan.name}
                    className="w-18 h-18 rounded-md object-cover border-2 border-surface shadow-card group-hover:border-terracotta transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-sage text-white p-0.5 rounded-full border border-surface">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Profile Content */}
            <div className="pt-8 px-5 pb-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-editorial text-ink group-hover:text-terracotta transition-colors">
                    {artisan.name}
                  </h3>
                  {artisan.honorific && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {artisan.honorific.split('(')[0]}
                    </span>
                  )}
                </div>

                <p className="text-xs font-mono font-medium text-muted">
                  {artisan.craft_specialisation}
                </p>

                <p className="text-xs text-muted flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-muted" />
                  <span>
                    {artisan.region}, {artisan.state}
                  </span>
                </p>

                <blockquote className="text-xs text-muted italic font-serif border-l border-border pl-3 py-0.5 mt-2">
                  "{artisan.quote.length > 110 ? artisan.quote.substring(0, 108) + '...' : artisan.quote}"
                </blockquote>
              </div>

              {/* Techniques Pills */}
              <div className="space-y-1.5">
                <p className="text-xs font-mono text-muted">
                  Signature techniques
                </p>
                <div className="flex flex-wrap gap-1">
                  {artisan.techniques.slice(0, 2).map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-sm bg-paper text-ink font-mono border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-border flex items-center gap-2">
                <button
                  onClick={() => onSelectArtisan(artisan)}
                  className="flex-1 h-9 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Meet the Maker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      ))}
      </div>
    </section>
  );
};
