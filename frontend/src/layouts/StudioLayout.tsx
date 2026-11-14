import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Mic,
  Package,
  Briefcase,
  User,
  ArrowLeft,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const StudioLayout: React.FC = () => {
  const { setRole } = useApp();
  const location = useLocation();

  const studioLinks = [
    { name: 'Studio Overview', path: '/studio', icon: LayoutDashboard },
    { name: 'Record Oral Story', path: '/studio/stories/new', icon: Mic },
    { name: 'Product Story Studio', path: '/studio/products', icon: Package },
    { name: 'My Submissions', path: '/studio/submissions', icon: FileText },
    { name: 'Artisan Profile', path: '/studio/profile', icon: User },
    { name: 'Saved Opportunities', path: '/studio/opportunities', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col justify-between p-5">
        <div>
          {/* Studio Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-border">
            <div className="w-10 h-10 rounded-md bg-terracotta text-white flex items-center justify-center font-editorial text-xl shadow-md">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-lg text-ink">PARAMPARA</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-terracotta text-white font-bold tracking-wider">
                  STUDIO
                </span>
              </div>
              <p className="text-[11px] text-muted">Artisan Workspace</p>
            </div>
          </div>

          {/* Active Artisan Card */}
          <div className="mt-5 p-3 rounded-md bg-paper border border-border/80 flex items-center gap-3">
            <img
              src="/images/heritage/artisan_bidriware.jpg"
              alt="Artisan Avatar"
              className="w-10 h-10 rounded-full object-cover border border-terracotta/40"
            />
            <div className="overflow-hidden">
              <h5 className="text-xs font-bold text-ink truncate">Shah Rashid Qadri</h5>
              <div className="flex items-center gap-1 text-[10px] text-sage font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Artisan</span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1">
            {studioLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-terracotta text-white shadow-subtle'
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

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-border space-y-2">
          <div className="p-3 rounded-md bg-paper text-ink border border-border text-xs">
            <div className="flex items-center gap-1.5 font-medium mb-1">
              <Mic className="w-3.5 h-3.5 text-terracotta" />
              <span>Voice-First AI</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Record in your mother tongue. AI prepares drafts; you retain 100% editorial approval.
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface/90 backdrop-blur-md border-b border-border px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-ink">Parampara</Link>
            <span>/</span>
            <span className="font-semibold text-ink">Artisan Studio Workspace</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/studio/stories/new"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>New Spoken Story</span>
            </Link>
            <Link
              to="/artisans/rashid-qadri"
              className="text-xs text-terracotta font-semibold hover:underline"
            >
              View My Public Profile ?
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

