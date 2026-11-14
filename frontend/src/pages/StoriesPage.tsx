import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { StoryItem } from '../types';
import { LineageTreeModal } from '../components/interactive/LineageTreeModal';
import {
  BookOpen,
  Mic,
  Play,
  Pause,
  Languages,
  ShieldCheck,
  ArrowRight,
  Clock,
  GitBranch,
  Volume2,
  Radio,
  Sliders,
  Flame,
  Waves
} from 'lucide-react';

export const StoriesPage: React.FC = () => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showTranslationMap, setShowTranslationMap] = useState<Record<string, boolean>>({});
  const [isLineageModalOpen, setIsLineageModalOpen] = useState(false);
  const [activeFieldSound, setActiveFieldSound] = useState<'krishna' | 'maheshwar' | 'dhokra' | 'river'>('krishna');

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    try {
      const data = await api.getStories();
      setStories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTranslation = (id: string) => {
    setShowTranslationMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF7A00]">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[10px] font-semibold">Living Lineages & Oral Lore</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-editorial tracking-tight text-white leading-tight">
            Oral Histories & <span className="italic font-normal text-gold-gradient">Master Narratives</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted/90 max-w-2xl font-sans leading-relaxed">
            Preserving ancestral artisan memories in their original mother tongue dialects (Kutchhi, Awadhi, Telugu, Braj), cross-referenced with 7–10 generation genealogical trees.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsLineageModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121216] border border-[#FF7A00] text-white hover:bg-[#FF7A00]/15 text-xs font-mono font-medium shadow-[0_0_15px_rgba(255,122,0,0.2)] transition-all whitespace-nowrap"
          >
            <GitBranch className="w-4 h-4 text-[#FF7A00]" />
            <span>Interactive Lineage Trees (Gharanas)</span>
          </button>

          <Link
            to="/studio/stories/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-terracotta hover:bg-[#ff7a1a] text-white text-xs font-medium shadow-sm transition-colors whitespace-nowrap"
          >
            <Mic className="w-4 h-4" />
            <span>Record in Studio</span>
          </Link>
        </div>
      </div>

      {/* Field Recording Ambient Player Banner */}
      <div className="p-4 rounded-2xl bg-surface border border-border shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-terracotta/15 text-terracotta flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-ink font-mono uppercase tracking-wide">
              Cluster Field Acoustic Atmosphere
            </h4>
            <p className="text-xs text-muted">
              Listen to the living acoustic environment recorded directly in master craft clusters
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveFieldSound('krishna')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeFieldSound === 'krishna'
                ? 'bg-terracotta text-white shadow-sm'
                : 'bg-paper text-muted hover:text-ink border border-border'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Krishna Flute</span>
          </button>

          <button
            onClick={() => setActiveFieldSound('maheshwar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeFieldSound === 'maheshwar'
                ? 'bg-terracotta text-white shadow-sm'
                : 'bg-paper text-muted hover:text-ink border border-border'
            }`}
            title="Field audio of hand-operated pit loom shuttles in Maheshwar"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Maheshwar Looms</span>
          </button>

          <button
            onClick={() => setActiveFieldSound('dhokra')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeFieldSound === 'dhokra'
                ? 'bg-terracotta text-white shadow-sm'
                : 'bg-paper text-muted hover:text-ink border border-border'
            }`}
            title="Field audio of clay furnace bellows and molten bronze casting in Bastar"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Dhokra Kiln</span>
          </button>

          <button
            onClick={() => setActiveFieldSound('river')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeFieldSound === 'river'
                ? 'bg-terracotta text-white shadow-sm'
                : 'bg-paper text-muted hover:text-ink border border-border'
            }`}
            title="Field audio of the sacred Swarnamukhi river sandbanks and temple bells"
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Swarnamukhi River</span>
          </button>
        </div>
      </div>

      {/* Stories Listing */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-2xl h-64 border border-border animate-pulse p-6" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {stories.map((story) => {
            const isTranslated = !!showTranslationMap[story.id];
            return (
              <div
                key={story.id}
                className="bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-card hover:border-terracotta/40 transition-colors space-y-6"
              >
                {/* Story Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-terracotta font-mono">{story.craft_name}</span>
                      <span className="text-xs text-muted">•</span>
                      <span className="text-xs text-muted font-mono">Spoken in {story.language}</span>
                    </div>
                    <h3 className="text-xl font-editorial text-ink mt-1">
                      Narrative by {story.contributor_name}
                    </h3>
                    <p className="text-xs text-muted font-mono">{story.artisan_role}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sage/15 text-sage border border-sage/30">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Contributor Consented & Published</span>
                    </span>
                  </div>
                </div>

                {/* Story Content / Transcript */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted">
                      {isTranslated ? 'English Translated Reading' : `Original ${story.language} Recording Transcript`}
                    </span>
                    <button
                      onClick={() => toggleTranslation(story.id)}
                      className="text-xs font-mono text-terracotta hover:underline flex items-center gap-1"
                    >
                      <Languages className="w-3.5 h-3.5" />
                      <span>{isTranslated ? `View Original (${story.language})` : 'Translate to English'}</span>
                    </button>
                  </div>

                  <p className="text-sm leading-relaxed text-ink/90 font-serif italic bg-paper/60 p-5 rounded-xl border border-border">
                    {isTranslated && story.translation ? story.translation : story.transcript}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-muted border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-terracotta" />
                      Recorded {story.created_at ? new Date(story.created_at).toLocaleDateString() : 'Historical Archive'}
                    </span>
                    <span>Status: {story.review_status}</span>
                  </div>

                  <Link
                    to={`/explore`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-terracotta hover:text-[#ff7a1a]"
                  >
                    <span>View Craft Provenance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Lineage Tree Modal */}
      <LineageTreeModal
        isOpen={isLineageModalOpen}
        onClose={() => setIsLineageModalOpen(false)}
      />
    </div>
  );
};
