import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, LANGUAGES } from '../context/AppContext';
import {
  Compass,
  Camera,
  BookOpen,
  Briefcase,
  Info,
  UserCheck,
  Shield,
  ShoppingBag,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  ExternalLink,
  MapPin,
  Flame
} from 'lucide-react';
import { CartDrawer } from '../components/marketplace/CartDrawer';
import { CheckoutModal } from '../components/marketplace/CheckoutModal';
import { HeritageSoundscapePlayer } from '../components/interactive/HeritageSoundscapePlayer';
import { RoganCraftSimulator } from '../components/interactive/RoganCraftSimulator';
import { DhokraCastingSimulator } from '../components/interactive/DhokraCastingSimulator';
import { MysteryCraftQuiz } from '../components/interactive/MysteryCraftQuiz';
import { CinematicEntrance } from '../components/ui/CinematicEntrance';
import { AuthModal } from '../components/auth/AuthModal';

export const PublicLayout: React.FC = () => {
  const {
    role,
    language,
    setIsCartOpen,
    cartCount,
    userProfile,
    openAuthModal,
    logoutUser,
    isSoundscapePlaying,
    toggleSoundscape,
    replayIntro
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Collapsible vertical column state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRoganOpen, setIsRoganOpen] = useState(false);
  const [isDhokraOpen, setIsDhokraOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Heritage 3D', path: '/explore', icon: Compass, badge: '3D' },
    { name: 'Bazaar', path: '/bazaar', icon: ShoppingBag },
    { name: 'Heritage Lens', path: '/heritage-lens', icon: Camera, badge: 'AI' },
    { name: 'GIS Craft Map', path: '/map', icon: MapPin, badge: 'GIS' },
    { name: 'Oral Traditions', path: '/stories', icon: BookOpen },
    { name: 'Opportunities', path: '/opportunities', icon: Briefcase },
    { name: 'About & Trust', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-200 flex">
      {/* Cinematic Black Screen Entrance (Only pure white PARAMPARA center -> top-left) */}
      <CinematicEntrance />

      {/* Role-Based Authentication Modal */}
      <AuthModal />

      {/* 
        CONTRACTIBLE VERTICAL NAVIGATION SIDEBAR (Replaces cluttered top row)
        Positioned vertically on the left under PARAMPARA, smooth collapsible animation
      */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-surface border-r border-border shadow-2xl flex flex-col justify-between transition-all duration-300 ease-[0.16,1,0.3,1] select-none ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {/* 1. TOP BRAND HEADER: PARAMPARA + CONTRACT/EXPAND TOGGLE */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 overflow-hidden group"
            title="PARAMPARA"
          >
            <div className="w-9 h-9 rounded-xl bg-terracotta text-white flex items-center justify-center font-editorial text-xl font-bold shadow-md shrink-0 group-hover:scale-105 transition-transform">
              P
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center whitespace-nowrap"
              >
                <span className="font-editorial text-lg font-bold tracking-tight text-ink">
                  PARAMPARA
                </span>
              </motion.div>
            )}
          </Link>

          {/* Contract / Expand Sidebar Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-paper border border-border hover:border-terracotta text-muted hover:text-ink transition-colors"
            title={isCollapsed ? 'Expand Navigation Sidebar' : 'Contract Sidebar (Full Viewport Mode)'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-terracotta" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-muted hover:text-ink" />
            )}
          </button>
        </div>

        {/* 2. VERTICAL NAVIGATION LINKS LIST */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-none">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-muted">
              Heritage Galleries
            </div>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-terracotta text-white font-semibold shadow-sm'
                    : 'text-muted hover:text-ink hover:bg-paper'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={link.name}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-muted'}`} />
                {!isCollapsed && (
                  <span className="flex-1 truncate">{link.name}</span>
                )}
                {!isCollapsed && link.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-paper text-terracotta border border-border'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Interactive Tools Group */}
          <div className="pt-4 mt-4 border-t border-border">
            {!isCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-muted">
                Craft Simulators
              </div>
            )}

            {/* Rogan Silk Sandbox */}
            <button
              onClick={() => setIsRoganOpen(true)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-muted hover:text-ink hover:bg-paper transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="Interactive Rogan Silk Painting Simulator"
            >
              <Sparkles className="w-4 h-4 text-terracotta shrink-0" />
              {!isCollapsed && <span>Rogan Sandbox</span>}
            </button>

            {/* Dhokra Lost-Wax Simulator */}
            <button
              onClick={() => setIsDhokraOpen(true)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-muted hover:text-ink hover:bg-paper transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="4-Stage Bastar Lost-Wax Bronze Casting Simulator"
            >
              <Flame className="w-4 h-4 text-amber-500 shrink-0" />
              {!isCollapsed && <span>Dhokra Casting</span>}
            </button>

            {/* Heritage Mystery Quiz */}
            <button
              onClick={() => setIsQuizOpen(true)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-muted hover:text-ink hover:bg-paper transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="60-Second Mystery Heritage Quiz"
            >
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              {!isCollapsed && <span>Heritage Quiz</span>}
            </button>

            {/* Acquisition Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-muted hover:text-ink hover:bg-paper transition-colors relative ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="Artisan Acquisition Vault"
            >
              <div className="relative shrink-0">
                <ShoppingBag className="w-4 h-4 text-ink" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-terracotta text-white font-mono text-[9px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <span className="flex-1 text-left">Acquisition Cart</span>
              )}
              {!isCollapsed && cartCount > 0 && (
                <span className="text-[10px] font-mono text-terracotta font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. BOTTOM: USER ACCOUNT PROFILE CAPSULE & WORKSPACE ROUTING */}
        <div className="p-3 border-t border-border bg-paper/50">
          {userProfile?.isLoggedIn ? (
            <div className="space-y-2">
              <div
                className={`p-2 rounded-xl bg-surface border border-border flex items-center gap-2.5 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-terracotta/20 border border-terracotta/30 text-terracotta flex items-center justify-center font-bold shrink-0">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-ink truncate">
                        {userProfile.name}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-muted flex items-center gap-1">
                      <span className="capitalize text-terracotta font-medium">{userProfile.role}</span>
                      <span>•</span>
                      <span>{LANGUAGES[userProfile.language]?.nativeName || 'EN'}</span>
                    </div>
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex items-center gap-1 pt-1">
                  {userProfile.role === 'artisan' && (
                    <Link
                      to="/studio"
                      className="flex-1 py-1.5 px-2 rounded-lg bg-surface border border-border hover:border-terracotta text-center text-[11px] font-mono text-ink transition-colors"
                    >
                      Studio Console
                    </Link>
                  )}
                  {userProfile.role === 'curator' && (
                    <Link
                      to="/curator"
                      className="flex-1 py-1.5 px-2 rounded-lg bg-surface border border-border hover:border-terracotta text-center text-[11px] font-mono text-ink transition-colors"
                    >
                      Curator Queue
                    </Link>
                  )}
                  <button
                    onClick={logoutUser}
                    className="p-1.5 rounded-lg bg-surface border border-border hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/signup?mode=signin"
                className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl bg-surface border border-border hover:border-terracotta text-xs font-medium text-ink transition-colors ${
                  isCollapsed ? 'justify-center p-2' : ''
                }`}
                title="Sign In / Register Identity"
              >
                <User className="w-4 h-4 text-terracotta shrink-0" />
                {!isCollapsed && <span>Sign In / Register</span>}
              </Link>

              {!isCollapsed && (
                <div className="grid grid-cols-2 gap-1.5">
                  <Link
                    to="/signup?role=artisan"
                    className="py-1 px-2 rounded-lg bg-paper border border-border hover:border-terracotta text-center text-[10px] font-mono text-muted hover:text-ink transition-colors"
                  >
                    Artisan Join
                  </Link>
                  <Link
                    to="/signup?role=curator"
                    className="py-1 px-2 rounded-lg bg-paper border border-border hover:border-terracotta text-center text-[10px] font-mono text-muted hover:text-ink transition-colors"
                  >
                    Curator
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Record Story Action */}
          <div className="pt-2">
            <Link
              to="/studio/stories/new"
              className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl bg-terracotta hover:bg-[#ff7a1a] text-white text-xs font-semibold shadow-sm transition-colors ${
                isCollapsed ? 'justify-center p-2' : ''
              }`}
              title="Record Oral History Story"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Record Story</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* 
        MAIN PAGE CONTENT CANVAS (Offset to the right of the contractible vertical sidebar)
        Expands dynamically when the sidebar is contracted for maximum screen immersion!
      */}
      <div
        className={`flex-1 min-w-0 w-full overflow-x-hidden flex flex-col transition-all duration-300 ease-[0.16,1,0.3,1] ${
          isCollapsed ? 'pl-[72px]' : 'pl-64'
        } ${location.pathname === '/' || location.pathname === '/explore' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}
      >
        {/* Main Outlet with Fluid Page Transitions */}
        <main className={`flex-1 min-w-0 w-full ${location.pathname === '/' || location.pathname === '/explore' ? 'h-full overflow-hidden' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full min-w-0 ${location.pathname === '/' || location.pathname === '/explore' ? 'h-full w-full' : ''}`}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Minimalist Archival Footer (Hidden on 3D Fullscreen Experience) */}
        {location.pathname !== '/' && location.pathname !== '/explore' && (
          <footer className="bg-surface border-t border-border mt-20 pt-10 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-border text-xs text-muted">
              <div className="space-y-3 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-terracotta text-white flex items-center justify-center font-editorial text-sm font-bold">
                    P
                  </div>
                  <span className="font-editorial text-base font-bold text-ink">PARAMPARA AI</span>
                </div>
                <p className="leading-relaxed text-[12px]">
                  A controlled primary-evidence living archive documenting India’s intangible heritage,
                  master artisan lineages, and authentic manufacturing chemistry.
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-sage">
                  <Shield className="w-3 h-3" />
                  <span>Zero Commission on Artisan Livelihoods</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-medium text-ink">
                  Living traditions
                </h4>
                <ul className="space-y-1.5">
                  <li><Link to="/explore?object=obj-bidriware-aftaba" className="hover:text-ink">Bidriware Metal Inlay (Karnataka)</Link></li>
                  <li><Link to="/explore?object=obj-kalamkari-scroll" className="hover:text-ink">Srikalahasti Kalamkari (Andhra)</Link></li>
                  <li><Link to="/explore?object=obj-rogan-tree" className="hover:text-ink">Rogan Art of Kutch (Gujarat)</Link></li>
                  <li><Link to="/explore?object=obj-dhokra-elephant" className="hover:text-ink">Bastar Dhokra Casting (Chhattisgarh)</Link></li>
                  <li><Link to="/explore?object=obj-thanjavur-krishna" className="hover:text-ink">Thanjavur Gold Leaf (Tamil Nadu)</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-medium text-ink">
                  Archive resources
                </h4>
                <ul className="space-y-1.5">
                  <li><Link to="/explore" className="hover:text-ink">3D Digital Museum</Link></li>
                  <li><Link to="/bazaar" className="hover:text-ink text-terracotta font-medium">Living Heritage Bazaar</Link></li>
                  <li><Link to="/heritage-lens" className="hover:text-ink">Heritage Lens Identification</Link></li>
                  <li><Link to="/stories" className="hover:text-ink">Oral History Transcripts</Link></li>
                  <li><Link to="/curator" className="hover:text-ink">Curator Review Queue</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-medium text-ink">
                  User Access & Roles
                </h4>
                <div className="space-y-1.5 text-[11px]">
                  <Link
                    to="/signup?role=public"
                    className="text-muted hover:text-ink flex items-center gap-1 transition-colors"
                  >
                    <User className="w-3 h-3 text-terracotta" />
                    <span>Public Explorer Portal</span>
                  </Link>
                  <Link
                    to="/signup?role=artisan"
                    className="text-muted hover:text-ink flex items-center gap-1 transition-colors"
                  >
                    <UserCheck className="w-3 h-3 text-terracotta" />
                    <span>Master Artisan Studio Sign Up</span>
                  </Link>
                  <Link
                    to="/signup?role=curator"
                    className="text-muted hover:text-ink flex items-center gap-1 transition-colors"
                  >
                    <Shield className="w-3 h-3 text-sage" />
                    <span>Heritage Curator Console Sign Up</span>
                  </Link>
                  <button
                    onClick={replayIntro}
                    className="text-muted hover:text-terracotta flex items-center gap-1 pt-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay Cinematic Intro</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted font-mono">
              <span>© 2026 PARAMPARA AI • Dedicated to India's Traditional Craft Guilds</span>
              <div className="flex gap-4">
                <Link to="/about" className="hover:text-ink">Ethical Framework</Link>
                <span>•</span>
                <a href="https://github.com/heydamir/unslop" target="_blank" rel="noreferrer" className="hover:text-ink">Craft Standard: Unslop</a>
              </div>
            </div>
          </div>
        </footer>
        )}
      </div>

      {/* Bazaar Acquisition Cart & Checkout Drawers */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      {/* Interactive Acoustic Heritage Resonance Player (Web Audio Native) */}
      <HeritageSoundscapePlayer />

      {/* Interactive Modals: Rogan Simulator, Dhokra Simulator & Mystery Quiz */}
      <RoganCraftSimulator isOpen={isRoganOpen} onClose={() => setIsRoganOpen(false)} />
      <DhokraCastingSimulator isOpen={isDhokraOpen} onClose={() => setIsDhokraOpen(false)} />
      <MysteryCraftQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
};
