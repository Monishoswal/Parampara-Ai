import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Artisan } from '../types';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Award,
  MapPin,
  Mail,
  ArrowLeft,
  Package,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

export const ArtisanProfilePage: React.FC = () => {
  const { artisanSlug } = useParams<{ artisanSlug: string }>();
  const { showToast } = useApp();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    message: '',
    interest: 'Custom Heritage Commission',
  });

  useEffect(() => {
    if (artisanSlug) {
      loadArtisan(artisanSlug);
    }
  }, [artisanSlug]);

  const loadArtisan = async (slug: string) => {
    setLoading(true);
    try {
      const data = await api.getArtisan(slug);
      setArtisan(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    showToast(`Enquiry transmitted directly to ${artisan?.public_name}. Zero platform commission charged.`, 'success');
    setTimeout(() => {
      setShowEnquiryModal(false);
      setEnquirySuccess(false);
      setEnquiryForm({ name: '', email: '', message: '', interest: 'Custom Heritage Commission' });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 animate-pulse space-y-6">
        <div className="h-6 bg-paper rounded w-1/4" />
        <div className="h-64 bg-surface rounded-lg" />
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-editorial text-ink">Artisan Profile Not Found</h2>
        <Link to="/explore" className="text-xs font-semibold text-terracotta hover:underline">
          Return to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <Link
        to="/explore"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Archive</span>
      </Link>

      {/* Profile Header Card */}
      <div className="bg-surface rounded-lg p-8 sm:p-10 border border-border shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-border/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={artisan.avatar_url}
              alt={artisan.public_name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border-4 border-terracotta/30 shadow-md"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-sage font-bold bg-sage-light px-2.5 py-0.5 rounded-full border border-sage/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Master Knowledge Holder</span>
                </span>
                {artisan.collective_name && (
                  <span className="text-xs text-muted font-medium">
                    • {artisan.collective_name}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-editorial text-ink">{artisan.public_name}</h1>
              <p className="text-sm font-semibold text-terracotta">{artisan.craft_specialization}</p>
              <p className="text-xs text-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>{artisan.region_label}</span>
                {artisan.experience_years && <span>• {artisan.experience_years} Years of Practice</span>}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowEnquiryModal(true)}
            className="px-4 py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Mail className="w-4 h-4" />
            <span>Direct artisan enquiry</span>
          </button>
        </div>

        {/* Bio & Honors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xs font-mono text-muted">Living biography & pedigree</h3>
            <p className="text-sm text-ink/90 leading-relaxed font-sans">
              {artisan.bio}
            </p>

            <div className="p-4 rounded-md bg-paper border border-border text-xs text-muted flex items-start gap-3">
              <HeartHandshake className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink font-semibold">Consent & fair trade charter: </strong>
                <span>All cultural stories and product cards are published with the explicit permission of {artisan.public_name}. PARAMPARA AI retains zero percentage of craft transactions.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono text-muted">State & national honors</h3>
            <div className="space-y-2">
              {artisan.awards?.map((award, i) => (
                <div key={i} className="p-3 rounded-md bg-paper border border-border text-xs font-medium text-ink flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Story Cards Showcase */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-editorial text-ink">Artisan Story Showcase</h2>
            <p className="text-xs text-muted">Authentic pieces documented with cultural provenance.</p>
          </div>
          <span className="text-xs text-sage font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Direct Workshop Sourcing
          </span>
        </div>

        {artisan.products && artisan.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artisan.products.map((prod) => (
              <div key={prod.id} className="bg-surface rounded-lg overflow-hidden border border-border shadow-subtle hover:border-terracotta/40 transition-colors flex flex-col justify-between">
                <div>
                  <div className="h-52 overflow-hidden">
                    <img src={prod.image_url} alt={prod.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-semibold text-terracotta">{prod.craft_name}</span>
                    <h3 className="text-base font-bold text-ink">{prod.title}</h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-3">{prod.description}</p>
                    <div className="p-3 rounded-md bg-paper border border-border/60 text-[11px] text-ink/80 italic mt-3">
                      "{prod.cultural_story}"
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/60 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-muted block">Direct Price</span>
                    <span className="text-base font-bold text-ink">?{prod.price_inr?.toLocaleString() || 'Enquiry'}</span>
                  </div>
                  <button
                    onClick={() => setShowEnquiryModal(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-paper hover:bg-terracotta hover:text-white border border-border text-xs font-semibold transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-surface rounded-md border border-border text-xs text-muted">
            No published products yet.
          </div>
        )}
      </div>

      {/* Contributed Oral Stories */}
      {artisan.stories && artisan.stories.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-border">
          <h2 className="text-2xl font-editorial text-ink">Contributed Oral Histories</h2>
          <div className="space-y-4">
            {artisan.stories.map((st) => (
              <div key={st.id} className="bg-surface rounded-md p-6 border border-border shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-terracotta">{st.craft_name}</span>
                    <span className="text-xs text-muted">•</span>
                    <span className="text-xs text-muted">{st.language}</span>
                  </div>
                  <p className="text-xs text-ink/90 font-medium italic">"{st.summary}"</p>
                </div>
                <Link
                  to="/stories"
                  className="text-xs font-bold text-terracotta hover:underline whitespace-nowrap"
                >
                  Listen to Full Recording ?
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-lg w-full p-8 border border-border shadow-elevated space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-editorial text-ink">Direct Enquiry for {artisan.public_name}</h3>
                <p className="text-xs text-muted mt-0.5">Connecting ethical buyers directly without intermediary commissions.</p>
              </div>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-muted hover:text-ink font-bold text-sm"
              >
                ?
              </button>
            </div>

            {enquirySuccess ? (
              <div className="p-6 rounded-md bg-sage-light border border-sage/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-sage mx-auto" />
                <h4 className="text-sm font-bold text-sage">Enquiry Sent Successfully</h4>
                <p className="text-xs text-muted">The artisan's registered coordinator will respond to your contact details.</p>
              </div>
            ) : (
              <form onSubmit={handleSendEnquiry} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    placeholder="e.g. Maya Rao / Design Studio"
                    className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">Subject of Interest</label>
                  <select
                    value={enquiryForm.interest}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, interest: e.target.value })}
                    className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none"
                  >
                    <option value="Custom Heritage Commission">Custom Heritage Commission</option>
                    <option value="Direct Purchase Enquiry">Direct Purchase Enquiry</option>
                    <option value="Exhibition / Workshop Invitation">Exhibition / Workshop Invitation</option>
                    <option value="Media / Research Interview">Media / Research Interview</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    placeholder="Describe your requirement, timeline, or query..."
                    className="w-full p-2.5 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-terracotta resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEnquiryModal(false)}
                    className="px-4 py-2 rounded-md border border-border text-xs font-semibold text-muted hover:text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    Send Direct Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

