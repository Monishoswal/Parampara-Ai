import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

export type UserRole = 'public' | 'artisan' | 'curator';
export type AppLanguage = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr' | 'gu' | 'kn' | 'ml';
export type ColorTheme =
  | 'royal-obsidian'
  | 'charcoal-snow-orange'
  | 'ancient-brown-maroon'
  | 'royal-dark'
  | 'banarasi-crimson'
  | 'peacock-sapphire'
  | 'sandstone-light';

export const LANGUAGES: Record<AppLanguage, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  te: { name: 'Telugu', nativeName: 'తెలుగు' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்' },
  bn: { name: 'Bengali', nativeName: 'বাংলা' },
  mr: { name: 'Marathi', nativeName: 'मराठी' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം' },
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  language: AppLanguage;
  guildOrInstitution?: string;
  clusterLocation?: string;
  isLoggedIn: boolean;
}

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  savedOpportunities: string[];
  toggleSaveOpportunity: (oppId: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
  
  // User Profile & Role-Based Auth
  userProfile: UserProfile | null;
  loginUser: (profile: Omit<UserProfile, 'id' | 'isLoggedIn'>) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: UserRole;
  setAuthModalTab: (tab: UserRole) => void;
  openAuthModal: (role?: UserRole) => void;

  // Background Soundscape
  isSoundscapePlaying: boolean;
  setIsSoundscapePlaying: (playing: boolean) => void;
  toggleSoundscape: () => void;

  // Cinematic Intro Sequence
  hasSeenIntro: boolean;
  setHasSeenIntro: (seen: boolean) => void;
  replayIntro: () => void;

  // Bazaar Marketplace Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('public');
  const [language, setLanguageState] = useState<AppLanguage>('en');
  const [theme, setThemeState] = useState<ColorTheme>('royal-obsidian');
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(['opp-1']);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // User Profile from localStorage
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('parampara_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<UserRole>('public');

  // Background Soundscape auto-play state: defaults to TRUE
  const [isSoundscapePlaying, setIsSoundscapePlaying] = useState(true);

  // Cinematic Intro state - persisted to sessionStorage so it doesn't replay on every refresh
  const [hasSeenIntro, setHasSeenIntroState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('parampara_intro_seen') === 'true';
    } catch {
      return false;
    }
  });

  const setHasSeenIntro = (seen: boolean) => {
    setHasSeenIntroState(seen);
    try {
      if (seen) {
        sessionStorage.setItem('parampara_intro_seen', 'true');
      } else {
        sessionStorage.removeItem('parampara_intro_seen');
      }
    } catch {}
  };

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('parampara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('parampara_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync role and language when userProfile loads
  useEffect(() => {
    if (userProfile) {
      setRoleState(userProfile.role);
      setLanguageState(userProfile.language);
    }
  }, []);

  const loginUser = (profileData: Omit<UserProfile, 'id' | 'isLoggedIn'>) => {
    const profile: UserProfile = {
      ...profileData,
      id: `usr-${Math.random().toString(36).substring(2, 9)}`,
      isLoggedIn: true,
    };
    setUserProfile(profile);
    setRoleState(profile.role);
    setLanguageState(profile.language);
    try {
      localStorage.setItem('parampara_user', JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save user to localStorage', e);
    }
    setIsAuthModalOpen(false);

    const roleTitles: Record<UserRole, string> = {
      public: 'Public Heritage Explorer',
      artisan: 'Master Artisan Studio',
      curator: 'Heritage Curator Console',
    };
    showToast(`Welcome, ${profile.name}! Signed in as ${roleTitles[profile.role]} (${LANGUAGES[profile.language]?.nativeName}).`, 'success');
  };

  const logoutUser = () => {
    setUserProfile(null);
    setRoleState('public');
    try {
      localStorage.removeItem('parampara_user');
    } catch {}
    showToast('Signed out of Parampara Archive.', 'info');
  };

  const openAuthModal = (targetRole?: UserRole) => {
    if (targetRole) {
      setAuthModalTab(targetRole);
    }
    setIsAuthModalOpen(true);
  };

  const toggleSoundscape = () => {
    setIsSoundscapePlaying(prev => !prev);
  };

  const replayIntro = () => {
    setHasSeenIntro(false);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (userProfile) {
      const updated = { ...userProfile, role: newRole };
      setUserProfile(updated);
      try {
        localStorage.setItem('parampara_user', JSON.stringify(updated));
      } catch {}
    }
    showToast(
      `Switched view to ${newRole === 'curator' ? 'Curator Desk' : newRole === 'artisan' ? 'Artisan Studio' : 'Public Explorer'}`,
      'info'
    );
  };

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    if (userProfile) {
      const updated = { ...userProfile, language: lang };
      setUserProfile(updated);
      try {
        localStorage.setItem('parampara_user', JSON.stringify(updated));
      } catch {}
    }
    showToast(`Language set to ${LANGUAGES[lang]?.nativeName || lang}`, 'info');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title.substring(0, 32)}..." to direct cart`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product.price_inr || 0) * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const setTheme = (newTheme: ColorTheme) => {
    setThemeState(newTheme);
  };

  const toggleSaveOpportunity = (oppId: string) => {
    setSavedOpportunities(prev => {
      const exists = prev.includes(oppId);
      const updated = exists ? prev.filter(id => id !== oppId) : [...prev, oppId];
      showToast(exists ? 'Opportunity removed from bookmarks' : 'Opportunity saved to workspace', 'success');
      return updated;
    });
  };

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        theme,
        setTheme,
        savedOpportunities,
        toggleSaveOpportunity,
        toasts,
        showToast,
        dismissToast,
        userProfile,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        isSoundscapePlaying,
        setIsSoundscapePlaying,
        toggleSoundscape,
        hasSeenIntro,
        setHasSeenIntro,
        replayIntro,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
      {/* Sleek Floating Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg shadow-2xl border text-xs font-medium transition-all backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#14231b] text-emerald-300 border-emerald-500/40'
                : toast.type === 'warning'
                ? 'bg-[#291c0e] text-amber-300 border-amber-500/40'
                : toast.type === 'error'
                ? 'bg-[#2b1016] text-rose-300 border-rose-500/40'
                : 'bg-[#18181e] text-white border-[#2c2c34]'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-3 text-muted hover:text-white text-xs font-bold p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
