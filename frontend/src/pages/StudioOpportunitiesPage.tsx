import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Opportunity } from '../types';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Briefcase, Calendar, ExternalLink, BookmarkCheck, Trash2 } from 'lucide-react';

export const StudioOpportunitiesPage: React.FC = () => {
  const { savedOpportunities, toggleSaveOpportunity } = useApp();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSaved();
  }, [savedOpportunities]);

  const loadSaved = async () => {
    setLoading(true);
    try {
      const data = await api.getOpportunities();
      setOpportunities(data.filter((o) => savedOpportunities.includes(o.id)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-editorial text-ink">Saved Opportunities</h1>
        <p className="text-xs text-muted mt-1">Bookmarked exhibition calls, fellowships, and grants for your workshop.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-surface rounded-md h-36 border border-border animate-pulse p-4" />
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <div className="bg-surface rounded-lg p-12 text-center border border-border text-xs text-muted space-y-2">
          <p>No saved opportunities in your studio workspace yet.</p>
          <a href="/opportunities" className="text-terracotta font-semibold hover:underline block">
            Browse Opportunities Directory →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-surface rounded-md p-6 border border-border shadow-card space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-terracotta block">{opp.provider}</span>
                  <h3 className="text-base font-semibold text-ink mt-0.5">{opp.title}</h3>
                </div>
                <button
                  onClick={() => toggleSaveOpportunity(opp.id)}
                  className="p-1.5 text-muted hover:text-rose-600 rounded transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-ink/80 leading-relaxed">{opp.description}</p>

              <div className="pt-2 flex items-center justify-between text-xs text-muted border-t border-border/60">
                <span className="text-amber-800 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-terracotta" /> Deadline: {opp.deadline}
                </span>

                <a
                  href={opp.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta font-bold hover:underline flex items-center gap-1"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
