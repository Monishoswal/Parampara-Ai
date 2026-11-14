import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Hammer,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Mail,
  Lock,
  User,
  MapPin,
  Sparkles,
  ArrowRight,
  Shield,
  Volume2,
  Award,
  BookOpen,
  Layers,
  Check
} from 'lucide-react';
import { useApp, UserRole, AppLanguage, LANGUAGES } from '../context/AppContext';

export const SignUpPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginUser, userProfile } = useApp();

  const initialRole = (searchParams.get('role') as UserRole) || 'public';
  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup';

  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>(initialMode);

  // Form Fields - Public Explorer
  const [publicName, setPublicName] = useState('Arjun Mehta');
  const [publicEmail, setPublicEmail] = useState('arjun.mehta@heritage.in');
  const [publicPassword, setPublicPassword] = useState('••••••••');
  const [publicLanguage, setPublicLanguage] = useState<AppLanguage>('en');

  // Form Fields - Master Artisan
  const [artisanName, setArtisanName] = useState('Shah Rashid Ahmed Qadri');
  const [artisanGuild, setArtisanGuild] = useState('Bidriware Tarkashi');
  const [artisanCluster, setArtisanCluster] = useState('Bidar, Karnataka');
  const [artisanEmail, setArtisanEmail] = useState('rashid.qadri@artisan.guild');
  const [artisanPassword, setArtisanPassword] = useState('••••••••');
  const [artisanLanguage, setArtisanLanguage] = useState<AppLanguage>('kn');

  // Form Fields - Heritage Curator
  const [curatorName, setCuratorName] = useState('Dr. Ananya Sharma');
  const [curatorInstitution, setCuratorInstitution] = useState('National Crafts Museum & Hastkala Academy');
  const [curatorEmail, setCuratorEmail] = useState('ananya.curator@crafts.nic.in');
  const [curatorPassword, setCuratorPassword] = useState('••••••••');
  const [curatorLanguage, setCuratorLanguage] = useState<AppLanguage>('hi');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync role if url query param changes
  useEffect(() => {
    const r = searchParams.get('role') as UserRole;
    if (r && ['public', 'artisan', 'curator'].includes(r)) {
      setSelectedRole(r);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (selectedRole === 'public') {
        loginUser({
          name: publicName,
          email: publicEmail,
          role: 'public',
          language: publicLanguage,
        });
        navigate('/explore');
      } else if (selectedRole === 'artisan') {
        loginUser({
          name: artisanName,
          email: artisanEmail,
          role: 'artisan',
          language: artisanLanguage,
          guildOrInstitution: artisanGuild,
          clusterLocation: artisanCluster,
        });
        navigate('/studio');
      } else {
        loginUser({
          name: curatorName,
          email: curatorEmail,
          role: 'curator',
          language: curatorLanguage,
          guildOrInstitution: curatorInstitution,
        });
        navigate('/curator');
      }
      setIsSubmitting(false);
    }, 450);
  };

  const loadDemoPersona = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'public') {
      loginUser({
        name: 'Arjun Mehta',
        email: 'arjun.mehta@heritage.in',
        role: 'public',
        language: 'en',
      });
      navigate('/explore');
    } else if (role === 'artisan') {
      loginUser({
        name: 'Ustad Abdul Gafur Khatri',
        email: 'gafur.khatri@rogan.guild',
        role: 'artisan',
        language: 'gu',
        guildOrInstitution: 'Kutch Rogan Silk Painting',
        clusterLocation: 'Nirona, Kutch, Gujarat',
      });
      navigate('/studio');
    } else {
      loginUser({
        name: 'Dr. Ananya Sharma',
        email: 'ananya.curator@crafts.nic.in',
        role: 'curator',
        language: 'hi',
        guildOrInstitution: 'National Crafts Museum',
      });
      navigate('/curator');
    }
  };

  // Role metadata for dynamic vitrine
  const roleShowcases = {
    public: {
      tag: 'Heritage Explorer',
      title: 'Experience India’s 3D Living Monuments & Direct Artisan Provenance',
      description:
        'Walk through 360° circular rotunda galleries, inspect the 182-metre Statue of Unity at the sanctum, and acquire certified masterworks with zero intermediary markup.',
      image: '/images/heritage/arch_konark_wheel.jpg',
      statPrimary: '0% Middleman',
      statPrimaryLabel: 'Direct Guild Settlement',
      statSecondary: '360° Rotunda',
      statSecondaryLabel: 'Living 3D Digital Museum',
      badge: 'Living Heritage Public Portal',
      quote:
        '“To experience heritage not as dead relics behind glass, but as the living pulse of master craftsmen across India.”',
      author: '— Archaeological Survey & Craft Council Archive',
    },
    artisan: {
      tag: 'Master Artisan Guild',
      title: 'Document Oral Lineage, Craft Chemistry & Direct GI Acquisitions',
      description:
        'Record oral traditions in your native tongue using our voice-first documentation studio. Protect ancient secret recipes—from Bidar Fort soil to castor oil Rogan gum.',
      image: '/images/heritage/workshop_bidriware.jpg',
      statPrimary: '100% Payout',
      statPrimaryLabel: 'Direct Artisan Remittance',
      statSecondary: '9 Languages',
      statSecondaryLabel: 'Native Voice Documentation',
      badge: 'Certified GI Artisan Studio',
      quote:
        '“Our hands hold three hundred years of alchemy. PARAMPARA lets us speak our story in Kannada and Hindi directly to the world.”',
      author: '— Shah Rashid Ahmed Qadri, Padma Shri Master Craftsman',
    },
    curator: {
      tag: 'Heritage Curator & Scholar',
      title: 'Peer Review Archival Monograph Citations & Authenticate GI Claims',
      description:
        'Review oral history recordings, verify manufacturing chemical analyses, stamp cryptographic authenticity certificates, and link primary evidence to national museum archives.',
      image: '/images/heritage/craft_thanjavur.png',
      statPrimary: '100% Verified',
      statPrimaryLabel: 'Primary Historical Citations',
      statSecondary: 'GI Registry',
      statSecondaryLabel: 'Legal Counterfeit Protection',
      badge: 'Scholarly Verification Console',
      quote:
        '“Every record grounded in archaeological monographs and geographical indications prevents the cultural appropriation of our craft guilds.”',
      author: '— National Crafts Museum & Hastkala Academy',
    },
  };

  const currentShowcase = roleShowcases[selectedRole];

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F5F3EF] flex flex-col justify-between selection:bg-terracotta selection:text-white">
      {/* Top Quiet Navigation */}
      <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-terracotta text-white flex items-center justify-center font-editorial text-lg shadow-sm group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-editorial text-xl font-bold tracking-tight text-white">PARAMPARA</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70">
              Access Vault
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-white/50 hidden sm:inline">Already have credentials?</span>
          <button
            onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all font-medium border border-white/15"
          >
            {authMode === 'signup' ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </button>
        </div>
      </nav>

      {/* Main Dual-Column Living Archival Split */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Atmospheric Cultural Vitrine (Morphs with Role) */}
        <motion.div
          key={selectedRole}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between space-y-6"
        >
          {/* Badge & Role Pill */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/15 border border-terracotta/30 text-terracotta text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentShowcase.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-tight leading-tight">
              {currentShowcase.title}
            </h1>

            <p className="text-sm text-white/70 leading-relaxed font-sans">
              {currentShowcase.description}
            </p>
          </div>

          {/* Visual Artwork Showcase Card with Parallax Depth */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
            <img
              src={currentShowcase.image}
              alt={currentShowcase.tag}
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <p className="text-xs italic text-white/90 font-serif leading-snug">
                {currentShowcase.quote}
              </p>
              <p className="text-[11px] font-mono text-terracotta font-medium">
                {currentShowcase.author}
              </p>
            </div>
          </div>

          {/* Provenance Stat Badges */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xl font-bold font-editorial text-terracotta">
                {currentShowcase.statPrimary}
              </div>
              <div className="text-[11px] font-mono text-white/70">
                {currentShowcase.statPrimaryLabel}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xl font-bold font-editorial text-white">
                {currentShowcase.statSecondary}
              </div>
              <div className="text-[11px] font-mono text-white/70">
                {currentShowcase.statSecondaryLabel}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Role Sanctum & Custom Forms */}
        <div className="lg:col-span-7 bg-[#121216] rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          {/* Subtle Golden Glow Accent */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-terracotta font-semibold">
                {authMode === 'signup' ? 'New Registration' : 'Account Access'}
              </span>
              <h2 className="text-2xl font-editorial font-bold text-white mt-0.5">
                {authMode === 'signup' ? 'Create Your Vault Identity' : 'Welcome Back to the Sanctum'}
              </h2>
            </div>

            {/* Quick Demo Credentials Trigger */}
            <button
              type="button"
              onClick={() => loadDemoPersona(selectedRole)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terracotta/15 hover:bg-terracotta/25 border border-terracotta/30 text-terracotta text-xs font-mono font-medium transition-all"
              title="Skip typing and test this role instantly"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Demo {selectedRole === 'public' ? 'Explorer' : selectedRole === 'artisan' ? 'Artisan' : 'Curator'}</span>
            </button>
          </div>

          {/* 3 Interactive Persona Selector Cards with Sliding Indicator */}
          <div className="pt-6">
            <label className="text-[11px] font-mono text-white/60 block mb-2 uppercase tracking-wider">
              1. Select Your Guild Access Role
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Public Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('public')}
                className={`relative p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'public'
                    ? 'bg-white/10 border-terracotta shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${selectedRole === 'public' ? 'bg-terracotta text-white' : 'bg-white/10 text-white/70'}`}>
                    <Compass className="w-4 h-4" />
                  </div>
                  {selectedRole === 'public' && (
                    <motion.div layoutId="checkIcon" className="w-4 h-4 rounded-full bg-terracotta text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </motion.div>
                  )}
                </div>
                <div className="font-editorial text-sm font-bold text-white">Public Explorer</div>
                <div className="text-[11px] text-white/60 font-sans mt-0.5">3D museum, oral lore & artisan purchases</div>
              </button>

              {/* Artisan Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('artisan')}
                className={`relative p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'artisan'
                    ? 'bg-white/10 border-terracotta shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${selectedRole === 'artisan' ? 'bg-terracotta text-white' : 'bg-white/10 text-white/70'}`}>
                    <Hammer className="w-4 h-4" />
                  </div>
                  {selectedRole === 'artisan' && (
                    <motion.div layoutId="checkIcon" className="w-4 h-4 rounded-full bg-terracotta text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </motion.div>
                  )}
                </div>
                <div className="font-editorial text-sm font-bold text-white">Master Artisan</div>
                <div className="text-[11px] text-white/60 font-sans mt-0.5">Voice studio, craft chemistry & direct earnings</div>
              </button>

              {/* Curator Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('curator')}
                className={`relative p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'curator'
                    ? 'bg-white/10 border-terracotta shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${selectedRole === 'curator' ? 'bg-terracotta text-white' : 'bg-white/10 text-white/70'}`}>
                    <Scale className="w-4 h-4" />
                  </div>
                  {selectedRole === 'curator' && (
                    <motion.div layoutId="checkIcon" className="w-4 h-4 rounded-full bg-terracotta text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </motion.div>
                  )}
                </div>
                <div className="font-editorial text-sm font-bold text-white">Heritage Curator</div>
                <div className="text-[11px] text-white/60 font-sans mt-0.5">Archival audits, GI proof & museum records</div>
              </button>
            </div>
          </div>

          {/* Form Fields Customized for Selected Role */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="text-[11px] font-mono text-white/60 block mb-1 uppercase tracking-wider">
              2. Enter Credentials & Select Native Tongue
            </label>

            <AnimatePresence mode="wait">
              {/* PUBLIC EXPLORER FORM */}
              {selectedRole === 'public' && (
                <motion.div
                  key="form-public"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs font-mono text-white/80 block mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={publicName}
                        onChange={(e) => setPublicName(e.target.value)}
                        placeholder="e.g. Arjun Mehta"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/80 block mb-1.5">Explorer Email ID</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={publicEmail}
                        onChange={(e) => setPublicEmail(e.target.value)}
                        placeholder="explorer@parampara.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={publicPassword}
                          onChange={(e) => setPublicPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Native Language</label>
                      <div className="relative">
                        <Globe2 className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={publicLanguage}
                          onChange={(e) => setPublicLanguage(e.target.value as AppLanguage)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1a20] border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white cursor-pointer appearance-none"
                        >
                          {Object.entries(LANGUAGES).map(([code, l]) => (
                            <option key={code} value={code} className="bg-[#1a1a20] text-white">
                              {l.name} ({l.nativeName})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MASTER ARTISAN FORM */}
              {selectedRole === 'artisan' && (
                <motion.div
                  key="form-artisan"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Master Artisan Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={artisanName}
                          onChange={(e) => setArtisanName(e.target.value)}
                          placeholder="e.g. Ustad Abdul Gafur Khatri"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Craft Guild / Specialization</label>
                      <div className="relative">
                        <Hammer className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={artisanGuild}
                          onChange={(e) => setArtisanGuild(e.target.value)}
                          placeholder="e.g. Bidriware Tarkashi"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Certified GI Cluster Location</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-terracotta absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={artisanCluster}
                          onChange={(e) => setArtisanCluster(e.target.value)}
                          placeholder="Bidar, Karnataka"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Artisan Guild Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={artisanEmail}
                          onChange={(e) => setArtisanEmail(e.target.value)}
                          placeholder="rashid.qadri@artisan.guild"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Guild Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={artisanPassword}
                          onChange={(e) => setArtisanPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Mother Tongue (for Voice Stories)</label>
                      <div className="relative">
                        <Globe2 className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={artisanLanguage}
                          onChange={(e) => setArtisanLanguage(e.target.value as AppLanguage)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1a20] border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white cursor-pointer appearance-none"
                        >
                          {Object.entries(LANGUAGES).map(([code, l]) => (
                            <option key={code} value={code} className="bg-[#1a1a20] text-white">
                              {l.name} ({l.nativeName})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* HERITAGE CURATOR FORM */}
              {selectedRole === 'curator' && (
                <motion.div
                  key="form-curator"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Curator / Scholar Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={curatorName}
                          onChange={(e) => setCuratorName(e.target.value)}
                          placeholder="e.g. Dr. Ananya Sharma"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Museum / Institution</label>
                      <div className="relative">
                        <BookOpen className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={curatorInstitution}
                          onChange={(e) => setCuratorInstitution(e.target.value)}
                          placeholder="National Crafts Museum"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/80 block mb-1.5">Institutional Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={curatorEmail}
                        onChange={(e) => setCuratorEmail(e.target.value)}
                        placeholder="ananya.curator@crafts.nic.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Curatorial Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={curatorPassword}
                          onChange={(e) => setCuratorPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white placeholder-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/80 block mb-1.5">Research Dialect</label>
                      <div className="relative">
                        <Globe2 className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={curatorLanguage}
                          onChange={(e) => setCuratorLanguage(e.target.value as AppLanguage)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1a20] border border-white/15 focus:border-terracotta focus:outline-none text-xs text-white cursor-pointer appearance-none"
                        >
                          {Object.entries(LANGUAGES).map(([code, l]) => (
                            <option key={code} value={code} className="bg-[#1a1a20] text-white">
                              {l.name} ({l.nativeName})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action CTA Button */}
            <div className="pt-4 space-y-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-terracotta hover:bg-[#ff7a1a] text-white text-xs font-bold font-mono tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Establishing Vault Credentials...</span>
                  </span>
                ) : (
                  <>
                    <span>
                      {authMode === 'signup'
                        ? `Enter as ${selectedRole === 'public' ? 'Public Explorer' : selectedRole === 'artisan' ? 'Master Artisan' : 'Heritage Curator'}`
                        : 'Sign In to Workspace'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              <div className="text-center pt-1">
                <Link
                  to="/explore"
                  className="text-xs font-mono text-white/50 hover:text-white transition-colors underline underline-offset-4"
                >
                  Skip for now • Continue as Guest Explorer →
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Minimalist Provenance */}
      <footer className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/50">
          <span>PARAMPARA AI • Dedicated to Certified GI Indian Craft Guilds</span>
          <div className="flex gap-4">
            <Link to="/explore" className="hover:text-white transition-colors">3D Museum</Link>
            <span>•</span>
            <Link to="/bazaar" className="hover:text-white transition-colors">Living Bazaar</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition-colors">Ethical Charter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
