import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Mic, CheckCircle2, ArrowRight } from 'lucide-react';

export const StudioSubmissionsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-editorial text-ink">My Heritage Submissions</h1>
          <p className="text-xs text-muted mt-1">Status of oral stories and technique updates submitted to the curator desk.</p>
        </div>
        <Link
          to="/studio/stories/new"
          className="px-4 py-2.5 rounded-md bg-terracotta text-white font-semibold text-xs shadow-sm hover:bg-terracotta-hover transition-colors flex items-center gap-1.5"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>New Oral Story</span>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="bg-surface rounded-md p-6 border border-border shadow-card space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-terracotta block">Submission #SUB-101</span>
              <h3 className="text-lg font-semibold text-ink mt-0.5">Bidar Fort Underground Soil Oxidation Oral History</h3>
              <p className="text-xs text-muted">Contributed by Shah Rashid Ahmed Qadri • Hindi Audio</p>
            </div>
            <StatusBadge status="curator_reviewed" size="sm" />
          </div>

          <p className="text-xs text-ink/90 leading-relaxed bg-paper p-4 rounded-md border border-border">
            "हमारे बिदर किले की जो मिट्टी है, वह कोई मामूली मिट्टी नहीं है। जब सूरज की रोशनी उस मिट्टी पर सदियों से नहीं पड़ी होती, तब उसमें वह तासीर आती है..."
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-muted border-t border-border/60">
            <span>Verified by Dr. Ananya Sharma on 2026-10-20</span>
            <Link to="/explore/bidriware" className="font-medium text-terracotta hover:underline flex items-center gap-1">
              View in Public Vault <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="bg-surface rounded-md p-6 border border-border shadow-card space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-muted block">Submission #SUB-204</span>
              <h3 className="text-lg font-semibold text-ink mt-0.5">Tarkashi Pure Silver Cold Hammer Wire Technique</h3>
              <p className="text-xs text-muted">Contributed via Voice of Tradition Studio • Hindi Audio</p>
            </div>
            <StatusBadge status="source_attached" size="sm" />
          </div>

          <p className="text-xs text-muted leading-relaxed bg-paper p-4 rounded-md border border-border">
            Extracted metadata: Pure silver wire 99.9%, hand cold-hammered without thermal solder. Currently under review for publication.
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-muted border-t border-border/60">
            <span>In Curator Review Queue</span>
            <span className="text-amber-700 font-medium">Estimated Review: 24-48 Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};
