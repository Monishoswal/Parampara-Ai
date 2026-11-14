import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../lib/api';
import { Craft, QAResult } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SourceCitationCard } from '../components/ui/SourceCitationCard';
import { CraftVideoPlayer } from '../components/ui/CraftVideoPlayer';
import {
  ArrowLeft,
  MapPin,
  BookOpen,
  Layers,
  Send,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Film,
  Phone,
  MessageCircle,
  IndianRupee,
  Share2,
  Maximize2,
  Clock,
  ShoppingBag
} from 'lucide-react';

export const CraftDetailPage: React.FC = () => {
  const { craftSlug } = useParams<{ craftSlug: string }>();
  const [craft, setCraft] = useState<Craft | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'process' | 'materials' | 'context' | 'claims' | 'sources'>('video');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  // Heritage Q&A Drawer State
  const [question, setQuestion] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [qaResult, setQaResult] = useState<QAResult | null>(null);

  useEffect(() => {
    if (craftSlug) {
      loadCraftDetail(craftSlug);
    }
  }, [craftSlug]);

  const loadCraftDetail = async (slug: string) => {
    setLoading(true);
    try {
      const data = await api.getCraft(slug);
      setCraft(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setQaLoading(true);
    try {
      const res = await api.askHeritage(question, craftSlug);
      setQaResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setQaLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-8">
        <div className="h-8 bg-paper rounded w-1/4" />
        <div className="h-96 bg-surface rounded-lg" />
        <div className="h-20 bg-surface rounded-md" />
      </div>
    );
  }

  if (!craft) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-editorial text-ink">Record Not Found</h2>
        <p className="text-sm text-muted">The requested craft record does not exist in our Pan-India archive.</p>
        <Link to="/explore" className="inline-block px-4 py-2 rounded-md bg-terracotta text-white font-semibold text-xs">
          Return to Pan-India Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link & Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pan-India Heritage Archive</span>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={craft.review_status} size="md" />
          {craft.gi_tag && (
            <span className="text-xs text-amber-900 bg-amber-100/90 font-semibold px-3 py-1 rounded-full border border-amber-300">
              {craft.gi_tag}
            </span>
          )}
          <span className="text-xs text-muted font-medium bg-surface px-3 py-1 rounded-full border border-border">
            {craft.data_label}
          </span>
        </div>
      </div>

      {/* Hero Record Header & Summary Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta">
              {craft.category}
            </span>
            <span className="text-muted">•</span>
            <span className="flex items-center gap-1 text-ink">
              <MapPin className="w-3.5 h-3.5 text-terracotta" />
              {craft.region_claim}
            </span>
            {craft.zone && (
              <>
                <span className="text-muted">•</span>
                <span className="text-sage font-bold">{craft.zone} Zone of India</span>
              </>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-editorial text-ink">{craft.name}</h1>

          {craft.alternate_names && craft.alternate_names.length > 0 && (
            <p className="text-sm text-muted italic">
              Regional vernacular terms: {craft.alternate_names.join(' • ')}
            </p>
          )}

          <p className="text-base text-ink/90 leading-relaxed pt-1">
            {craft.summary}
          </p>

          {/* Evidence Basis Card */}
          <div className="p-4 rounded-md bg-surface border border-border/80 text-xs text-muted flex items-start gap-3 shadow-subtle">
            <BookOpen className="w-4 h-4 text-navy flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink font-semibold">Evidence Basis for Geographic Claim: </strong>
              <span>{craft.region_basis}</span>
              {craft.heritage_era && (
                <div className="mt-1 text-[11px] text-amber-800 font-medium">
                  Historical Era: {craft.heritage_era}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Image / Gallery Preview */}
        <div className="lg:col-span-5">
          <div className="rounded-lg overflow-hidden border border-border shadow-card bg-surface p-2.5 space-y-2.5">
            <div
              className="relative h-72 sm:h-80 rounded-md overflow-hidden cursor-pointer group"
              onClick={() => setSelectedGalleryImage(craft.hero_image)}
            >
              <img
                src={craft.hero_image}
                alt={craft.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <button
                type="button"
                className="absolute bottom-3 right-3 p-2 rounded-md bg-surface/85 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-border"
                title="Expand photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery thumbnails */}
            {craft.gallery_images && craft.gallery_images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {[craft.hero_image, ...craft.gallery_images].slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedGalleryImage(img)}
                    className="h-16 rounded-md overflow-hidden border border-border/80 cursor-pointer hover:border-terracotta transition-colors"
                  >
                    <img src={img} alt="Gallery thumb" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS WITH SMOOTH MOTION */}
      <div className="border-b border-border flex items-center gap-4 sm:gap-6 overflow-x-auto text-sm font-semibold pb-1">
        <button
          onClick={() => setActiveTab('video')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'video'
              ? 'border-terracotta text-terracotta font-bold'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Process Demonstration Reel</span>
        </button>

        <button
          onClick={() => setActiveTab('process')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'process'
              ? 'border-terracotta text-terracotta font-bold'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sequential Stages ({craft.process_stages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'materials'
              ? 'border-terracotta text-terracotta font-bold'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <span>Materials & Tools ({craft.materials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('context')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'context'
              ? 'border-terracotta text-terracotta font-bold'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <span>Cultural Lore & Lineage</span>
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'claims'
              ? 'border-terracotta text-terracotta font-bold'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-sage" />
          <span>Claim Verification ({craft.claims?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sources'
              ? 'border-terracotta text-terracotta font-bold'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          <BookOpen className="w-4 h-4 text-navy" />
          <span>Primary Archives ({craft.sources?.length || 0})</span>
        </button>
      </div>

      {/* MAIN TAB CONTENT AREA & ASIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {/* TAB 0: INTERACTIVE PROCESS VIDEO */}
            {activeTab === 'video' && (
              <motion.div
                key="tab-video"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-editorial text-ink">Master Artisan Process Video</h3>
                  <p className="text-xs text-muted mt-1">
                    Authentic documentation of {craft.name} filmed on location in {craft.region_claim}.
                  </p>
                </div>

                <CraftVideoPlayer
                  videoUrl={craft.video_url}
                  youtubeId={craft.youtube_id || 'NMFaPZAFgUU'}
                  posterUrl={craft.video_poster || craft.hero_image}
                  title={craft.video_title}
                  duration={craft.video_duration}
                  bookmarks={craft.video_bookmarks}
                  craftName={craft.name}
                  artisanName={craft.associated_artisans?.[0]?.public_name}
                />
              </motion.div>
            )}

            {/* TAB 1: PROCESS STAGES */}
            {activeTab === 'process' && (
              <motion.div
                key="tab-process"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-editorial text-ink">Sequential Craft Process</h3>
                    <p className="text-xs text-muted">Verified step-by-step techniques practiced by certified master artisans.</p>
                  </div>
                  <span className="text-xs text-muted font-medium bg-surface px-3 py-1 rounded-full border border-border">
                    {craft.process_stages.length} Documented Stages
                  </span>
                </div>

                <div className="space-y-4">
                  {craft.process_stages.map((stage) => (
                    <div
                      key={stage.stage_number}
                      className="bg-surface rounded-md p-6 border border-border shadow-subtle flex items-start gap-5 hover:border-terracotta/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-md bg-terracotta/10 text-terracotta font-bold font-editorial text-xl flex items-center justify-center flex-shrink-0">
                        {stage.stage_number}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-ink">{stage.title}</h4>
                          {stage.duration && (
                            <span className="text-[11px] text-muted flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              {stage.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted leading-relaxed">{stage.description}</p>
                        {stage.materials_used && stage.materials_used.length > 0 && (
                          <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                            <span className="font-semibold text-ink/70">Materials:</span>
                            {stage.materials_used.map((m, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-paper border border-border text-ink">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 2: MATERIALS */}
            {activeTab === 'materials' && (
              <motion.div
                key="tab-materials"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-editorial text-ink">Materials & Traditional Tools</h3>
                  <p className="text-xs text-muted">Natural botanical, mineral, and metallurgical ingredients used in production.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {craft.materials.map((mat, i) => (
                    <div key={i} className="bg-surface rounded-md p-5 border border-border shadow-subtle space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-ink">{mat.name}</h4>
                        {mat.is_natural && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sage-light text-sage font-medium">
                            100% Natural Component
                          </span>
                        )}
                      </div>
                      {mat.local_name && (
                        <p className="text-xs text-amber-800 font-medium italic">
                          Local name: {mat.local_name}
                        </p>
                      )}
                      <p className="text-xs text-ink/80 leading-relaxed">{mat.purpose}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: CONTEXT */}
            {activeTab === 'context' && (
              <motion.div
                key="tab-context"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-surface rounded-lg p-8 border border-border shadow-subtle space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-editorial text-ink">Cultural History & Living Context</h3>
                  {craft.heritage_era && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20">
                      {craft.heritage_era}
                    </span>
                  )}
                </div>

                <p className="text-sm text-ink/90 leading-relaxed whitespace-pre-line">
                  {craft.cultural_context}
                </p>

                <div className="pt-6 border-t border-border">
                  <h4 className="text-sm font-bold text-ink mb-3">Core Traditional Techniques:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {craft.techniques.map((t, idx) => (
                      <div key={idx} className="p-3 rounded-md bg-paper border border-border text-xs font-semibold text-ink flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-terracotta" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: CLAIMS */}
            {activeTab === 'claims' && (
              <motion.div
                key="tab-claims"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-editorial text-ink">Claim-Level Verification Status</h3>
                    <p className="text-xs text-muted">Each factual statement is evaluated independently against primary sources.</p>
                  </div>
                  <Link to="/curator" className="text-xs font-bold text-terracotta hover:underline">
                    Curator Console ?
                  </Link>
                </div>

                {craft.claims && craft.claims.map((claim) => (
                  <div key={claim.id} className="bg-surface rounded-md p-5 border border-border shadow-subtle space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-ink leading-relaxed">"{claim.claim_text}"</p>
                      <StatusBadge status={claim.status} size="sm" />
                    </div>
                    {claim.review_note && (
                      <div className="p-3 rounded-lg bg-paper border border-border/60 text-xs text-muted">
                        <strong className="text-ink">Curator Review: </strong>
                        <span>{claim.review_note}</span>
                        {claim.reviewer_name && (
                          <span className="block mt-1 text-[11px] text-sage font-medium">
                            • Verified by {claim.reviewer_name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 5: SOURCES */}
            {activeTab === 'sources' && (
              <motion.div
                key="tab-sources"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-xl font-editorial text-ink">Supporting Archival Sources</h3>
                  <p className="text-xs text-muted">Ground truth monographs from National Crafts Museum, ASI, and GI Registry.</p>
                </div>
                <div className="space-y-4">
                  {craft.sources && craft.sources.map((src) => (
                    <SourceCitationCard key={src.id} source={src} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MASTER ARTISAN SPOTLIGHT & DIRECT CONNECTION */}
          {craft.associated_artisans && craft.associated_artisans.length > 0 && (
            <div className="pt-8 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-editorial text-ink">Master Knowledge Holders</h3>
                  <p className="text-xs text-muted">Direct connection with living practitioners • Zero intermediary cut</p>
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Consent Verified
                </span>
              </div>

              <div className="space-y-4">
                {craft.associated_artisans.map((art) => (
                  <div
                    key={art.id}
                    className="bg-surface rounded-lg p-6 border border-border shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={art.avatar_url}
                        alt={art.public_name}
                        className="w-16 h-16 rounded-md object-cover border-2 border-terracotta/30 shadow-sm"
                      />
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-ink">{art.public_name}</h4>
                        <p className="text-xs text-terracotta font-medium">{art.craft_specialization}</p>
                        <p className="text-[11px] text-muted">{art.region_label}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Link
                        to={`/artisans/${art.slug}`}
                        className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-md bg-paper border border-border hover:bg-surface text-ink text-xs font-medium transition-colors"
                      >
                        Artisan Studio ?
                      </Link>
                      <Link
                        to={`/bazaar?search=${encodeURIComponent(craft.name.split(' ')[0])}`}
                        className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-md bg-ink hover:bg-ink/90 text-surface text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-terracotta" />
                        <span>Acquire Work</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: HERITAGE Q&A ASSISTANT (RAG) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-surface rounded-lg p-5 border border-border shadow-card space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-paper border border-border text-terracotta">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">Heritage Q&A Assistant</h3>
                <p className="text-[11px] font-mono text-muted">Archival RAG Retrieval</p>
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              Ask anything about materials, techniques, or GI history. The assistant searches <strong>only</strong> verified archival records for {craft.name}.
            </p>

            {/* Question Input */}
            <form onSubmit={handleAskQuestion} className="space-y-3">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`e.g. Why is the soil from Bidar Fort ruins used in ${craft.name.split(' ')[0]}?`}
                rows={3}
                className="w-full p-3 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta resize-none"
              />
              <button
                type="submit"
                disabled={qaLoading || !question.trim()}
                className="w-full py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover disabled:opacity-50 text-white text-xs font-medium shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                {qaLoading ? (
                  <span>Consulting Verified Archive...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Ask grounded assistant</span>
                  </>
                )}
              </button>
            </form>

            {/* Q&A Result Presentation */}
            {qaResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-border/80 space-y-3"
              >
                <div className={`p-4 rounded-md text-xs leading-relaxed ${
                  qaResult.evidence_found
                    ? 'bg-paper text-ink border border-border'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}>
                  <p className="font-medium">{qaResult.answer}</p>
                </div>

                {/* Citations */}
                {qaResult.citations && qaResult.citations.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-muted block">
                      Cited Indian primary sources:
                    </span>
                    {qaResult.citations.map((c, idx) => (
                      <div key={idx} className="p-2.5 rounded-md bg-paper border border-border/60 text-[11px] space-y-1">
                        <span className="font-bold text-ink block">{c.source_title}</span>
                        <span className="text-muted block">{c.publisher}</span>
                        <span className="text-sage font-medium block">Claim status: {c.claim_status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] rounded-lg overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedGalleryImage}
                alt={craft.name}
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-4 right-4 bg-surface/90 hover:bg-terracotta text-white px-3 py-1.5 rounded-full text-xs font-bold border border-border transition-colors"
              >
                Close ?
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

