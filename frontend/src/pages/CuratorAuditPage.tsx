import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { History, Shield, CheckCircle2, User } from 'lucide-react';

export const CuratorAuditPage: React.FC = () => {
  const [auditEvents, setAuditEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAudit();
  }, []);

  const loadAudit = async () => {
    setLoading(true);
    try {
      const data = await api.getAuditTrail();
      setAuditEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-editorial text-ink">Curator Audit Trail & Decision Log</h1>
        <p className="text-xs text-muted max-w-xl leading-relaxed mt-1">
          Chronological, tamper-evident record of all claim verifications, moderation decisions, and publication actions.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-md h-24 border border-border animate-pulse p-4" />
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-lg p-6 sm:p-8 border border-border shadow-card space-y-6">
          <div className="space-y-4">
            {auditEvents.map((evt) => (
              <div key={evt.id} className="p-4 rounded-md bg-paper border border-border flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-surface border border-border text-ink flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-ink text-xs capitalize">{evt.action.replace('_', ' ')}</span>
                    <span className="text-muted font-mono">{evt.created_at?.split('T')[0]}</span>
                  </div>
                  <p className="text-xs text-ink/90 font-medium">{evt.before_after_summary}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted pt-1">
                    <span className="font-semibold text-navy">Reviewer: {evt.actor_name}</span>
                    <span>•</span>
                    <span>Target: {evt.entity_type} ({evt.entity_id})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
