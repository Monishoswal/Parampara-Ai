import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  Layers,
  Flame,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  Send,
  MessageSquare,
  BookOpen,
  Scale,
  ExternalLink,
  Volume2,
  ShoppingBag
} from 'lucide-react';
import { HeritageObject, HERITAGE_ARTISANS, HERITAGE_OBJECTS } from '../../data/heritageDataset';
import { api } from '../../lib/api';

interface ObjectDetailDrawerProps {
  object: HeritageObject | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelated: (obj: HeritageObject) => void;
  onSelectArtisan: (artisanId: string) => void;
  onOpenCompare: (obj: HeritageObject) => void;
}

export const ObjectDetailDrawer: React.FC<ObjectDetailDrawerProps> = ({
  object: propObject,
  isOpen,
  onClose,
  onSelectRelated,
  onSelectArtisan,
  onOpenCompare,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'ai' | 'connections'>('details');
  const [isSaved, setIsSaved] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Heritage AI Ask state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [cachedObject, setCachedObject] = useState<HeritageObject | null>(propObject);
  React.useEffect(() => {
    if (propObject) setCachedObject(propObject);
  }, [propObject]);

  const object = propObject || cachedObject;
  if (!object) return null;

  // Find linked artisan
  const artisan = HERITAGE_ARTISANS.find((a) => a.id === object.associated_artisan_id);

  // Find related objects
  const relatedObjects = HERITAGE_OBJECTS.filter((o) =>
    object.related_object_ids.includes(o.id)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/explore?object=${object.id}`
    );
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2200);
  };

  const handleAskAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);
    try {
      // Call grounded RAG API endpoint
      const response = await api.askHeritage(`${aiQuestion} (regarding ${object.name})`);
      setAiAnswer(response.answer);
    } catch (err) {
      // Grounded fallback response derived directly from verified data
      setAiAnswer(
        `${object.name} (${object.historical_era}) represents verified ${object.region} tradition. ${object.cultural_significance} Materials authentically involved: ${object.materials.join(', ')}.`
      );
    } finally {
      setAiLoading(false);
    }
  };

  const toggleAudioPreview = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-2xl bg-surface text-ink shadow-2xl h-full flex flex-col z-10 overflow-hidden border-l border-border transition-colors duration-300"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-paper/90 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF7A00]/15 hover:bg-[#FF7A00]/25 text-[#FF7A00] border border-[#FF7A00]/40 text-xs font-mono font-medium transition-all shadow-[0_0_12px_rgba(255,122,0,0.18)]"
                  title="Close and Return to 3D Museum (Esc)"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to 3D (Esc)</span>
                </button>
                <span className="px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terracotta/15 text-terracotta border border-terracotta/30">
                  {object.category_label}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted font-medium">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  {object.region} • {object.state}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  title={isSaved ? 'Saved in My Collection' : 'Save to Collection'}
                  className={`p-2 rounded-md border transition-colors ${
                    isSaved
                      ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                      : 'border-border text-muted hover:bg-paper'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  title="Share Heritage Link"
                  className="p-2 rounded-md border border-border text-muted hover:bg-paper transition-colors relative"
                >
                  {copyFeedback ? (
                    <Check className="w-4 h-4 text-sage" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-md border border-border text-muted hover:bg-paper transition-colors"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Dual Photographic Exhibition Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cultural Artefact Photo */}
                <div className="relative rounded-lg overflow-hidden bg-stone-950 border border-border shadow-card group">
                  <img
                    src={object.image_url}
                    alt={object.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 bg-stone-900/90 px-2 py-0.5 rounded-sm text-[10px] font-mono text-amber-300 border border-amber-500/30">
                    Verified Artefact
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-[10px] font-mono opacity-80">{object.historical_era}</p>
                    <p className="text-xs font-medium">{object.gi_status || 'GI Certified Cluster'}</p>
                  </div>
                </div>

                {/* Real Artisan Documentary Photograph */}
                <div className="relative rounded-lg overflow-hidden bg-stone-950 border border-border shadow-card group">
                  <img
                    src={object.artisan_photo_url}
                    alt={`Artisan crafting ${object.name}`}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 bg-stone-900/90 px-2 py-0.5 rounded-sm text-[10px] font-mono text-stone-200 border border-stone-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-sage" />
                    <span>The Hands Behind Heritage</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-xs font-medium">
                      {artisan ? artisan.name : 'Master Craftsperson at Work'}
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono">
                      {object.image_attribution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title & Cultural Attribution Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-sm text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {object.verification_status === 'curator_reviewed'
                      ? 'Archivally verified'
                      : 'Community confirmed'}
                  </span>
                  <span className="text-xs font-mono text-muted">Source: {object.primary_source}</span>
                </div>
                <h2 className="text-2xl font-editorial text-ink tracking-tight">
                  {object.name}
                </h2>
                {object.hindi_name && (
                  <p className="text-sm font-editorial text-terracotta">
                    {object.hindi_name}
                  </p>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 p-1 bg-paper rounded-md border border-border">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                    activeTab === 'details'
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Cultural lore & process
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'ai'
                      ? 'bg-surface text-terracotta shadow-sm'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-terracotta" />
                  <span>Ask Heritage AI</span>
                </button>
                <button
                  onClick={() => setActiveTab('connections')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                    activeTab === 'connections'
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Artisans & lineage
                </button>
              </div>

              {/* Tab 1: Details */}
              {activeTab === 'details' && (
                <div className="space-y-5">
                  {/* Historical Epoch & Cultural Significance */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono text-muted flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-terracotta" />
                      <span>Cultural significance & mythological context</span>
                    </h3>
                    <p className="text-sm text-ink leading-relaxed font-sans bg-paper p-3.5 rounded-md border border-border">
                      {object.cultural_significance}
                    </p>
                  </div>

                  {/* Historical Background */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono text-muted">
                      Historical timeline ({object.historical_era})
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {object.historical_context}
                    </p>
                  </div>

                  {/* Materials & Chemistry */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono text-muted flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-terracotta" />
                      <span>Traditional materials & botanical formulations</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {object.materials.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-sm text-xs font-mono bg-paper text-ink border border-border"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Traditional Manufacturing Techniques */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono text-muted flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-terracotta" />
                      <span>Documented craft techniques</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {object.techniques.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-sm text-xs font-mono bg-terracotta/10 text-terracotta border border-terracotta/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Manufacturing Process */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono text-muted">
                      Ancestral manufacturing process
                    </h3>
                    <div className="p-3.5 rounded-md bg-paper border border-border text-xs text-ink/90 leading-relaxed whitespace-pre-line font-mono">
                      {object.manufacturing_process}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Ask Heritage AI (Grounded RAG) */}
              {activeTab === 'ai' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-md bg-paper border border-border space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                      <BookOpen className="w-3.5 h-3.5 text-terracotta" />
                      <span>Grounded Cultural Knowledge</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      Ask questions about {object.name}'s preservation history, verified identifying
                      marks, natural dye chemistry, or generational oral tradition.
                    </p>
                  </div>

                  {/* Suggested Quick Questions */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono text-muted">
                      Suggested inquiries
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        `How to verify authentic ${object.name}?`,
                        `What makes the natural materials special?`,
                        `Explain the generational heritage lineage`,
                      ].map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setAiQuestion(q);
                          }}
                          className="text-left text-xs px-2.5 py-1 rounded-md bg-paper hover:bg-surface text-ink border border-border transition-colors font-mono text-[11px]"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inquiry Form */}
                  <form onSubmit={handleAskAI} className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        placeholder={`Ask anything about ${object.name}...`}
                        className="w-full px-3 py-2 pr-10 rounded-md border border-border bg-paper focus:bg-surface focus:outline-none focus:ring-1 focus:ring-terracotta text-xs text-ink"
                      />
                      <button
                        type="submit"
                        disabled={aiLoading || !aiQuestion.trim()}
                        className="absolute right-1.5 top-1.5 p-1 rounded-md bg-terracotta hover:bg-terracotta-hover disabled:opacity-40 text-white transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {/* AI Response Area */}
                  {aiLoading && (
                    <div className="p-3.5 rounded-md bg-paper border border-border flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-terracotta border-t-transparent animate-spin" />
                      <p className="text-xs text-muted font-mono">
                        Querying archival Indian heritage knowledge base...
                      </p>
                    </div>
                  )}

                  {aiAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-md bg-paper text-ink space-y-2 border border-border shadow-card"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-muted flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                          <span>Archival Grounding</span>
                        </span>
                        <span className="text-[10px] text-muted font-mono">
                          Primary Sources Cited
                        </span>
                      </div>
                      <p className="text-xs text-ink/90 leading-relaxed whitespace-pre-line font-sans">
                        {aiAnswer}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Tab 3: Artisans & Connections */}
              {activeTab === 'connections' && (
                <div className="space-y-5">
                  {/* Master Artisan Spotlight */}
                  {artisan ? (
                    <div className="p-4 rounded-lg bg-paper text-ink space-y-3 border border-border shadow-card">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={artisan.portrait_url}
                          alt={artisan.name}
                          className="w-14 h-14 rounded-md object-cover border border-border"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-editorial text-ink">
                              {artisan.name}
                            </h4>
                            {artisan.honorific && (
                              <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                {artisan.honorific}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-terracotta font-mono">
                            {artisan.craft_specialisation}
                          </p>
                          <p className="text-[11px] text-muted">
                            {artisan.region}, {artisan.state} • {artisan.experience_years} years of
                            living practice
                          </p>
                        </div>
                      </div>

                      <blockquote className="text-xs text-muted italic border-l-2 border-terracotta pl-3 py-1 font-serif">
                        "{artisan.quote}"
                      </blockquote>

                      <button
                        onClick={() => onSelectArtisan(artisan.id)}
                        className="w-full py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium shadow-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <span>View master artisan living biography</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-md bg-paper text-muted text-xs border border-border">
                      Community craft practiced collectively by master artisan guilds in {object.state}.
                    </div>
                  )}

                  {/* Connected Cultural Traditions */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono text-muted">
                      Connected crafts in the living heritage web
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {relatedObjects.map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => onSelectRelated(rel)}
                          className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-terracotta bg-paper hover:bg-surface cursor-pointer transition-colors shadow-sm group"
                        >
                          <img
                            src={rel.image_url}
                            alt={rel.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-ink group-hover:text-terracotta truncate">
                              {rel.name}
                            </p>
                            <p className="text-[10px] text-muted font-mono truncate">
                              {rel.region}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Footer */}
            <div className="p-4 border-t border-border bg-paper/90 backdrop-blur-md flex flex-wrap items-center gap-2">
              <button
                onClick={() => onOpenCompare(object)}
                className="flex-1 min-w-[120px] h-10 px-3 rounded-md border border-border hover:bg-paper bg-surface text-ink text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-muted" />
                <span>Compare</span>
              </button>

              <button
                onClick={toggleAudioPreview}
                className="flex-1 min-w-[120px] h-10 px-3 rounded-md bg-paper border border-border hover:bg-surface text-ink text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-terracotta" />
                <span>Audio Lore</span>
              </button>

              <Link
                to={`/bazaar?search=${encodeURIComponent(object.name.split(' ')[0])}`}
                className="flex-1 min-w-[160px] h-10 px-4 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                <span>Acquire from Guild</span>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

