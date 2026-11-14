import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { CuratorQueueItem, CuratorStats } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';
import {
  Inbox,
  ShieldCheck,
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  XCircle,
  Eye,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const CuratorQueuePage: React.FC = () => {
  const { showToast } = useApp();
  const [queue, setQueue] = useState<CuratorQueueItem[]>([]);
  const [stats, setStats] = useState<CuratorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<CuratorQueueItem | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [claimStatuses, setClaimStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [queueData, statsData] = await Promise.all([
        api.getCuratorQueue(),
        api.getCuratorStats()
      ]);
      setQueue(queueData);
      setStats(statsData);
      if (queueData.length > 0) {
        setSelectedSubmission(queueData[0]);
        // Initialize claim statuses
        const map: Record<string, string> = {};
        queueData[0].claims_to_verify?.forEach((c: any) => {
          map[c.id] = c.current_status;
        });
        setClaimStatuses(map);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimStatusChange = (claimId: string, newStatus: string) => {
    setClaimStatuses((prev) => ({ ...prev, [claimId]: newStatus }));
    showToast(`Claim ${claimId} marked as '${newStatus}'`, 'info');
  };

  const handleDecision = async (decision: 'approve' | 'request_changes' | 'reject') => {
    if (!selectedSubmission) return;
    try {
      await api.reviewSubmission(
        selectedSubmission.id,
        decision,
        reviewNotes || `Curator decision: ${decision} with claim audits recorded.`,
        'Dr. Ananya Sharma (Chief Heritage Curator)'
      );

      showToast(`Submission #${selectedSubmission.id} marked as '${decision}'. Audit event recorded.`, 'success');
      loadData();
    } catch (e) {
      console.error(e);
      showToast('Error recording curator decision', 'error');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Curator Top Statistics */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-surface p-4 rounded-md border border-border shadow-subtle">
            <span className="text-[11px] text-muted font-medium block">Total Vault Records</span>
            <span className="text-2xl font-bold font-editorial text-ink mt-1 block">{stats.total_records}</span>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border shadow-subtle">
            <span className="text-[11px] text-muted font-medium block">Pending Reviews</span>
            <span className="text-2xl font-bold font-editorial text-terracotta mt-1 block">{stats.pending_reviews}</span>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border shadow-subtle">
            <span className="text-[11px] text-muted font-medium block">Curator Verified Claims</span>
            <span className="text-2xl font-bold font-editorial text-sage mt-1 block">{stats.curator_reviewed_claims}</span>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border shadow-subtle">
            <span className="text-[11px] text-muted font-medium block">Source Attached Claims</span>
            <span className="text-2xl font-bold font-editorial text-navy mt-1 block">{stats.source_attached_claims}</span>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border shadow-subtle">
            <span className="text-[11px] text-muted font-medium block">Disputed Claims</span>
            <span className="text-2xl font-bold font-editorial text-rose-600 mt-1 block">{stats.disputed_claims}</span>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border shadow-subtle">
            <span className="text-[11px] text-muted font-medium block">Consented Oral Stories</span>
            <span className="text-2xl font-bold font-editorial text-ink mt-1 block">{stats.contributed_stories}</span>
          </div>
        </div>
      )}

      {/* Main Review Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Queue Listing */}
        <div className="lg:col-span-4 bg-surface rounded-lg p-6 border border-border shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/80">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Inbox className="w-4 h-4 text-navy" />
              <span>Pending Review Queue</span>
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-paper text-muted font-bold">
              {queue.length} items
            </span>
          </div>

          <div className="space-y-3">
            {queue.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  setSelectedSubmission(sub);
                  const map: Record<string, string> = {};
                  sub.claims_to_verify?.forEach((c: any) => {
                    map[c.id] = c.current_status;
                  });
                  setClaimStatuses(map);
                }}
                className={`p-4 rounded-md border cursor-pointer transition-colors space-y-1.5 ${
                  selectedSubmission?.id === sub.id
                    ? 'bg-paper border-navy ring-1 ring-navy'
                    : 'bg-surface border-border hover:bg-paper/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">{sub.craft_name}</span>
                  <StatusBadge status={sub.status} size="sm" showIcon={false} />
                </div>
                <p className="text-xs text-muted">By {sub.contributor_name} ({sub.contributor_type})</p>
                <div className="text-[11px] text-terracotta font-medium pt-1">
                  Type: {sub.submission_type.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Inspection & Verification Panel */}
        <div className="lg:col-span-8">
          {selectedSubmission ? (
            <div className="bg-surface rounded-lg p-6 sm:p-8 border border-border shadow-card space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>Submission #{selectedSubmission.id}</span>
                    <span>•</span>
                    <span className="text-sage font-medium">{selectedSubmission.consent_status}</span>
                  </div>
                  <h2 className="text-2xl font-editorial text-ink mt-1">
                    {selectedSubmission.craft_name}
                  </h2>
                  <p className="text-xs text-muted">Contributor: {selectedSubmission.contributor_name}</p>
                </div>

                <StatusBadge status={selectedSubmission.status} size="md" />
              </div>

              {/* SIDE-BY-SIDE: Contributor Facts vs AI Suggested Draft */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-muted block">
                  Data lineage verification
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left: Contributor Facts */}
                  <div className="p-4 rounded-md bg-paper border border-border space-y-2">
                    <strong className="text-ink font-semibold block pb-1 border-b border-border/60">
                      Contributor-provided facts (primary)
                    </strong>
                    {Object.entries(selectedSubmission.contributor_provided_facts).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-muted capitalize">{key.replace('_', ' ')}: </span>
                        <span className="text-ink font-medium">{String(val)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: AI Suggestions */}
                  <div className="p-4 rounded-md bg-paper border border-border space-y-2">
                    <strong className="text-ink font-semibold block pb-1 border-b border-border">
                      AI-suggested draft fields (subject to review)
                    </strong>
                    {Object.entries(selectedSubmission.ai_suggested_draft).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-muted capitalize">{key.replace('_', ' ')}: </span>
                        <span className="text-ink font-medium">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CLAIM-LEVEL VERIFICATION WIDGET */}
              <div className="p-5 rounded-md bg-paper border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-mono text-ink">
                      Claim-level verification checklist
                    </h4>
                    <p className="text-[11px] text-muted">Set evidential status for individual claims.</p>
                  </div>
                  <span className="text-[11px] text-sage font-medium">Never certify entire record blindly</span>
                </div>

                {selectedSubmission.claims_to_verify?.map((claim: any) => {
                  const currentSt = claimStatuses[claim.id] || claim.current_status;
                  return (
                    <div key={claim.id} className="p-4 rounded-md bg-surface border border-border space-y-3">
                      <p className="text-xs font-medium text-ink">"{claim.claim_text}"</p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
                        <StatusBadge status={currentSt} size="sm" />
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <button
                            type="button"
                            onClick={() => handleClaimStatusChange(claim.id, 'source_attached')}
                            className="px-2 py-1 rounded bg-surface text-ink border border-border font-medium hover:bg-paper transition-colors"
                          >
                            Source Attached
                          </button>
                          <button
                            type="button"
                            onClick={() => handleClaimStatusChange(claim.id, 'curator_reviewed')}
                            className="px-2 py-1 rounded bg-surface text-sage border border-sage/30 font-medium hover:bg-sage/10 transition-colors"
                          >
                            Curator Reviewed
                          </button>
                          <button
                            type="button"
                            onClick={() => handleClaimStatusChange(claim.id, 'disputed')}
                            className="px-2 py-1 rounded bg-surface text-rose-700 border border-rose-300 font-medium hover:bg-rose-50 transition-colors"
                          >
                            Dispute
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Attached Sources */}
              {selectedSubmission.attached_sources?.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted block">Attached references</span>
                  {selectedSubmission.attached_sources.map((src: any, i: number) => (
                    <div key={i} className="p-3 rounded-md bg-paper border border-border text-xs flex items-center justify-between">
                      <div>
                        <strong className="text-ink">{src.title}</strong>
                        <span className="text-muted block text-[11px]">{src.publisher}</span>
                      </div>
                      <BookOpen className="w-4 h-4 text-terracotta" />
                    </div>
                  ))}
                </div>
              )}

              {/* Review Decision Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink block">Curator Decision Log & Notes</label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Record verification rationale, cited primary documentation, or change requests..."
                  className="w-full p-3 rounded-md bg-paper border border-border text-xs text-ink focus:outline-none focus:border-navy resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleDecision('reject')}
                  className="px-4 py-2.5 rounded-md border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject / Restrict</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision('request_changes')}
                  className="px-4 py-2.5 rounded-md border border-border text-ink hover:bg-paper text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Request changes</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision('approve')}
                  className="px-5 py-2.5 rounded-md bg-ink hover:bg-ink/90 text-surface text-xs font-medium shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4 text-sage" />
                  <span>Approve & publish to archive</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface rounded-lg p-12 text-center border border-border text-xs text-muted">
              Select a submission from the queue on the left to begin claim verification.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

