import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Inbox,
  CheckCircle,
  BookOpen,
  History,
  ArrowLeft,
  Scale,
  Users
} from 'lucide-react';

export const CuratorLayout: React.FC = () => {
  const { setRole } = useApp();
  const location = useLocation();

  const curatorLinks = [
    { name: 'Review Queue', path: '/curator', icon: Inbox },
    { name: 'Archival Sources', path: '/curator/sources', icon: BookOpen },
    { name: 'Audit & Decision History', path: '/curator/audit', icon: History },
  ];

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col justify-between p-5">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-border">
            <div className="w-10 h-10 rounded-md bg-navy text-white flex items-center justify-center font-editorial text-xl shadow-md">
              C
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-lg text-ink">PARAMPARA</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy text-white font-bold tracking-wider">
                  CURATOR
                </span>
              </div>
              <p className="text-[11px] text-muted">Verification Desk</p>
            </div>
          </div>

          {/* Active Reviewer Credential */}
          <div className="mt-5 p-3 rounded-md bg-navy-light text-navy border border-navy/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              AS
            </div>
            <div className="overflow-hidden">
              <h5 className="text-xs font-bold text-navy truncate">Dr. Ananya Sharma</h5>
              <p className="text-[10px] text-navy/80">Chief Heritage Curator</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1">
            {curatorLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-navy text-white shadow-subtle'
                      : 'text-ink/80 hover:bg-paper hover:text-ink'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border space-y-3">
          <div className="p-3 rounded-md bg-paper border border-border/80 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-ink mb-1">
              <Scale className="w-3.5 h-3.5 text-navy" />
              <span>Claim-Level Review</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Never certify an entire submission blindly. Scrutinize individual claims against primary sources.
            </p>
          </div>

          <Link
            to="/"
            onClick={() => setRole('public')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Archive</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface/90 backdrop-blur-md border-b border-border px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-ink">Parampara</Link>
            <span>/</span>
            <span className="font-semibold text-ink">Curator Review Desk</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Curation Active
            </span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

