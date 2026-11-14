import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  X,
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
  ArrowRight
} from 'lucide-react';
import { useApp, UserRole, AppLanguage, LANGUAGES } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalTab, setAuthModalTab, loginUser } = useApp();
  const navigate = useNavigate();

  // Mode: 'signup' vs 'signin'
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  // Form Fields - Public
  const [publicName, setPublicName] = useState('Arjun Mehta');
  const [publicEmail, setPublicEmail] = useState('arjun.mehta@heritage.in');
  const [publicPassword, setPublicPassword] = useState('••••••••');
  const [publicLanguage, setPublicLanguage] = useState<AppLanguage>('en');

  // Form Fields - Artisan
  const [artisanName, setArtisanName] = useState('Shah Rashid Ahmed Qadri');
  const [artisanGuild, setArtisanGuild] = useState('Bidriware Tarkashi');
  const [artisanCluster, setArtisanCluster] = useState('Bidar, Karnataka');
  const [artisanEmail, setArtisanEmail] = useState('rashid.qadri@artisan.guild');
  const [artisanPassword, setArtisanPassword] = useState('••••••••');
  const [artisanLanguage, setArtisanLanguage] = useState<AppLanguage>('kn');

  // Form Fields - Curator
  const [curatorName, setCuratorName] = useState('Dr. Ananya Sharma');
  const [curatorInstitution, setCuratorInstitution] = useState('National Crafts Museum & Hastkala Academy');
  const [curatorEmail, setCuratorEmail] = useState('ananya.curator@crafts.nic.in');
  const [curatorPassword, setCuratorPassword] = useState('••••••••');
  const [curatorLanguage, setCuratorLanguage] = useState<AppLanguage>('hi');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authModalTab === 'public') {
      loginUser({
        name: publicName,
        email: publicEmail,
        role: 'public',
        language: publicLanguage,
      });
      navigate('/explore');
    } else if (authModalTab === 'artisan') {
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
  };

  const loadDemo = (role: UserRole) => {
    setAuthModalTab(role);
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden z-10 my-auto flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-border bg-[#121216] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta text-white flex items-center justify-center font-editorial text-xl font-bold shadow-md">
                P
              </div>
              <div>
                <h3 className="text-base font-editorial font-bold text-white tracking-tight">
                  Join the Living Heritage Vault
                </h3>
                <p className="text-xs text-muted font-mono">
                  Select your role & native tongue
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-paper transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Navigation Tabs */}
          <div className="grid grid-cols-3 bg-[#121216] p-1.5 border-b border-border text-xs font-mono">
            <button
              onClick={() => setAuthModalTab('public')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                authModalTab === 'public'
                  ? 'bg-terracotta text-white font-bold shadow-sm'
                  : 'text-muted hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Public Explorer</span>
            </button>

            <button
              onClick={() => setAuthModalTab('artisan')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                authModalTab === 'artisan'
                  ? 'bg-terracotta text-white font-bold shadow-sm'
                  : 'text-muted hover:text-white'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>Master Artisan</span>
            </button>

            <button
              onClick={() => setAuthModalTab('curator')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                authModalTab === 'curator'
                  ? 'bg-terracotta text-white font-bold shadow-sm'
                  : 'text-muted hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Heritage Curator</span>
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* PUBLIC EXPLORER FORM */}
            {authModalTab === 'public' && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-paper border border-border text-xs text-muted leading-relaxed">
                  Explore 3D monuments, acquire certified masterworks with zero middleman fee, and preserve cultural oral lore.
                </div>

                <div>
                  <label className="text-[11px] font-mono text-muted block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={publicName}
                      onChange={(e) => setPublicName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-muted block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={publicEmail}
                      onChange={(e) => setPublicEmail(e.target.value)}
                      placeholder="explorer@parampara.in"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-muted block mb-1">Choose Interface Language</label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={publicLanguage}
                      onChange={(e) => setPublicLanguage(e.target.value as AppLanguage)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white cursor-pointer"
                    >
                      {Object.entries(LANGUAGES).map(([code, l]) => (
                        <option key={code} value={code} className="bg-[#121216] text-[#F5F3EF]">
                          {l.name} — {l.nativeName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* MASTER ARTISAN FORM */}
            {authModalTab === 'artisan' && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-[#19221a] border border-emerald-500/30 text-xs text-emerald-300 leading-relaxed">
                  Voice-first storytelling studio. Record oral craft histories in your mother tongue, list GI products, and receive direct UPI settlements.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-muted block mb-1">Master Artisan Name</label>
                    <input
                      type="text"
                      required
                      value={artisanName}
                      onChange={(e) => setArtisanName(e.target.value)}
                      placeholder="Master Artisan Name"
                      className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-muted block mb-1">Craft Guild / Lineage</label>
                    <input
                      type="text"
                      required
                      value={artisanGuild}
                      onChange={(e) => setArtisanGuild(e.target.value)}
                      placeholder="e.g. Bidriware Tarkashi"
                      className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-muted block mb-1">Cluster Location</label>
                    <input
                      type="text"
                      required
                      value={artisanCluster}
                      onChange={(e) => setArtisanCluster(e.target.value)}
                      placeholder="Bidar, Karnataka"
                      className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-muted block mb-1">Artisan Guild Email</label>
                    <input
                      type="email"
                      required
                      value={artisanEmail}
                      onChange={(e) => setArtisanEmail(e.target.value)}
                      placeholder="artisan@guild.in"
                      className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-muted block mb-1">Native Tongue (Voice Recording Language)</label>
                  <select
                    value={artisanLanguage}
                    onChange={(e) => setArtisanLanguage(e.target.value as AppLanguage)}
                    className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white cursor-pointer"
                  >
                    {Object.entries(LANGUAGES).map(([code, l]) => (
                      <option key={code} value={code} className="bg-[#121216] text-[#F5F3EF]">
                        {l.name} — {l.nativeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* CURATOR CONSOLE FORM */}
            {authModalTab === 'curator' && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-[#271d15] border border-amber-500/30 text-xs text-amber-300 leading-relaxed">
                  Institutional evaluation desk. Verify GI claims against primary government archives and museum monographs.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-muted block mb-1">Curator Full Name</label>
                    <input
                      type="text"
                      required
                      value={curatorName}
                      onChange={(e) => setCuratorName(e.target.value)}
                      placeholder="Dr. Full Name"
                      className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-muted block mb-1">Institution / Museum</label>
                    <input
                      type="text"
                      required
                      value={curatorInstitution}
                      onChange={(e) => setCuratorInstitution(e.target.value)}
                      placeholder="National Crafts Museum"
                      className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-muted block mb-1">Official Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={curatorEmail}
                    onChange={(e) => setCuratorEmail(e.target.value)}
                    placeholder="curator@museum.nic.in"
                    className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-muted block mb-1">Primary Research Region & Dialect</label>
                  <select
                    value={curatorLanguage}
                    onChange={(e) => setCuratorLanguage(e.target.value as AppLanguage)}
                    className="w-full px-3 py-2 rounded-lg bg-paper border border-border focus:border-terracotta focus:outline-none text-xs text-white cursor-pointer"
                  >
                    {Object.entries(LANGUAGES).map(([code, l]) => (
                      <option key={code} value={code} className="bg-[#121216] text-[#F5F3EF]">
                        {l.name} — {l.nativeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 space-y-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-11 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold tracking-wide shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <span>Enter as {authModalTab === 'artisan' ? 'Master Artisan' : authModalTab === 'curator' ? 'Curator' : 'Public Explorer'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Instant One-Click Demo Access */}
              <div className="flex items-center justify-between pt-2 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => loadDemo(authModalTab)}
                  className="text-terracotta hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant 1-Click Demo Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="text-muted hover:text-white"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
