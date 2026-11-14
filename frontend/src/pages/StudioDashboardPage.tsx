import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Mic,
  Package,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

export const StudioDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="bg-surface rounded-lg p-8 border border-border shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sage-light text-sage font-bold border border-sage/30">
              Active Workshop Account
            </span>
            <span className="text-xs text-muted">Bidriware Tarkashi Master</span>
          </div>
          <h1 className="text-3xl font-editorial text-ink">Welcome back, Shah Rashid Qadri</h1>
          <p className="text-xs text-muted max-w-lg leading-relaxed">
            Your studio workspace lets you record oral knowledge in your own words, craft dignified product stories, and discover verified exhibition opportunities.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto">
          <Link
            to="/studio/stories/new"
            className="px-5 py-3 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Mic className="w-4 h-4" />
            <span>Record Oral Story</span>
          </Link>
          <Link
            to="/studio/products"
            className="px-5 py-3 rounded-md bg-paper border border-border hover:bg-border text-ink text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4 text-terracotta" />
            <span>Create Product Story</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-surface p-5 rounded-md border border-border shadow-subtle">
          <span className="text-xs text-muted font-medium block">Documented Records</span>
          <span className="text-2xl font-bold font-editorial text-ink mt-1 block">1</span>
          <span className="text-[11px] text-sage font-medium mt-1 block">Bidriware Metal Inlay (Published)</span>
        </div>

        <div className="bg-surface p-5 rounded-md border border-border shadow-subtle">
          <span className="text-xs text-muted font-medium block">Contributed Oral Stories</span>
          <span className="text-2xl font-bold font-editorial text-ink mt-1 block">1</span>
          <span className="text-[11px] text-sage font-medium mt-1 block">Audio + Bilingual Transcript</span>
        </div>

        <div className="bg-surface p-5 rounded-md border border-border shadow-subtle">
          <span className="text-xs text-muted font-medium block">Active Product Stories</span>
          <span className="text-2xl font-bold font-editorial text-ink mt-1 block">1</span>
          <span className="text-[11px] text-muted mt-1 block">Imperial Floral Aftaba</span>
        </div>

        <div className="bg-surface p-5 rounded-md border border-border shadow-subtle">
          <span className="text-xs text-muted font-medium block">Profile Completeness</span>
          <span className="text-2xl font-bold font-editorial text-terracotta mt-1 block">100%</span>
          <span className="text-[11px] text-sage font-medium mt-1 block">Consent & Bio Verified</span>
        </div>
      </div>

      {/* Two Column Layout: Submissions Status & Quick Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Submissions & Records */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface rounded-lg p-6 border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">My Heritage Submissions</h3>
              <Link to="/studio/submissions" className="text-xs text-terracotta font-semibold hover:underline">
                View All ?
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-md bg-paper border border-border flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink">Bidar Fort Underground Soil Oral History</span>
                    <StatusBadge status="curator_reviewed" size="sm" />
                  </div>
                  <p className="text-xs text-muted">
                    Audio recorded in Hindi/Urdu. Contributor verified; 3 verified claims attached.
                  </p>
                  <span className="text-[11px] text-muted block pt-1">Submitted & Approved on 2026-09-15</span>
                </div>
              </div>

              <div className="p-4 rounded-md bg-paper border border-border flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink">Imperial Floral Aftaba with Fine Silver</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-300">
                      Published Card
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    Product narrative grounded in GI Reg No. 17 facts. Direct enquiries active.
                  </p>
                  <span className="text-[11px] text-muted block pt-1">Direct Price: ?18,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Opportunities for this craft */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface rounded-lg p-6 border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Matching Opportunities</h3>
              <Link to="/opportunities" className="text-xs text-terracotta font-semibold hover:underline">
                Explore All ?
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-md bg-paper border border-border space-y-2">
                <span className="text-xs font-mono text-terracotta block">
                  Ministry of Textiles Fellowship
                </span>
                <h4 className="text-xs font-bold text-ink">National Master Craftsman Fellowship & Grant</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Direct financial stipend for certified master artisans practicing Bidriware, Kalamkari, and Rogan.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-amber-700 font-semibold">Deadline: 2026-12-15</span>
                  <Link to="/opportunities" className="text-terracotta font-bold hover:underline">
                    Apply ?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

