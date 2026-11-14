import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Opportunity } from '../types';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
  Briefcase,
  Calendar,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Building,
  Award,
  AlertCircle
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { savedOpportunities, toggleSaveOpportunity } = useApp();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    loadOpportunities();
  }, [category]);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const data = await api.getOpportunities(category === 'all' ? undefined : category);
      setOpportunities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Grant', 'Exhibition', 'Residency'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-editorial text-ink">Curated Artisan Opportunities</h1>
        <p className="text-sm text-muted max-w-2xl leading-relaxed">
          Verified directory of state and national fellowships, museum exhibitions, research grants, and direct buyer fairs. Never automated spam or scraped unverified deadlines.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
              category === cat
                ? 'bg-terracotta text-white shadow-subtle'
                : 'bg-surface text-ink hover:bg-paper border border-border/80'
            }`}
          >
            {cat === 'all' ? 'All Opportunities' : `${cat}s`}
          </button>
        ))}
      </div>

      {/* Opportunity Cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-md h-44 border border-border animate-pulse p-6" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {opportunities.map((opp) => {
            const isSaved = savedOpportunities.includes(opp.id);
            return (
              <div
                key={opp.id}
                className="bg-surface rounded-lg p-6 sm:p-8 border border-border shadow-subtle hover:border-terracotta/40 transition-colors flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-muted mb-1">
                        <Building className="w-3.5 h-3.5 text-navy" />
                        <span className="font-semibold text-ink/80">{opp.provider}</span>
                        <span>•</span>
                        <span className="text-terracotta font-medium">{opp.category}</span>
                      </div>
                      <h3 className="text-xl font-editorial text-ink">{opp.title}</h3>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <StatusBadge status={opp.status} size="sm" />
                      <button
                        onClick={() => toggleSaveOpportunity(opp.id)}
                        className={`p-2 rounded-md border transition-colors ${
                          isSaved
                            ? 'bg-terracotta text-white border-terracotta'
                            : 'bg-paper text-muted hover:text-ink border-border'
                        }`}
                        title={isSaved ? 'Saved to Studio' : 'Save Opportunity'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-ink/90 leading-relaxed font-sans">
                    {opp.description}
                  </p>

                  {/* Funding / Stipend highlight if present */}
                  {opp.grant_amount_or_stipend && (
                    <div className="p-3 rounded-md bg-paper border border-border text-xs text-ink font-semibold flex items-center gap-2">
                      <Award className="w-4 h-4 text-terracotta" />
                      <span>Grant / Stipend: {opp.grant_amount_or_stipend}</span>
                    </div>
                  )}

                  {/* Eligibility tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-muted">
                    <span className="font-bold text-ink">Eligible Crafts:</span>
                    {opp.eligible_crafts.map((c, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-paper border border-border text-ink">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-terracotta" />
                      <strong>Deadline: </strong> {opp.deadline}
                    </span>
                    <span>•</span>
                    <span>Last checked: {opp.last_checked_at}</span>
                  </div>

                  <a
                    href={opp.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    <span>View Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

