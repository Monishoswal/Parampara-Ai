import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Eye,
  Package,
  Heart,
  Sparkles,
  X,
  FileCheck
} from 'lucide-react';
import { Product } from '../types';
import { api } from '../lib/api';
import { useApp } from '../context/AppContext';
import { ProductDetailModal } from '../components/marketplace/ProductDetailModal';
import { DirectArtisanPatronageModal } from '../components/marketplace/DirectArtisanPatronageModal';
import { DirectCommissionModal } from '../components/marketplace/DirectCommissionModal';

const ZONES = [
  'All India',
  'South India',
  'West India',
  'North India',
  'Central India',
  'East India',
];

const CATEGORIES = [
  'All Crafts',
  'Metalware',
  'Textiles & Handloom',
  'Traditional Art & Paintings',
  'Woodcraft & Toys',
  'Sculptures & Statues',
];

const MATERIALS = [
  'All Materials',
  'Silver Wire',
  'Khadi Cotton',
  'Castor Oil',
  'Bell Metal',
  'Ivory Wood',
  'Changthangi Wool',
];

export const BazaarPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, showToast } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('All India');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [priceRange, setPriceRange] = useState<'all' | 'under10k' | '10k-25k' | '25k-50k' | 'above50k'>('all');
  const [sortBy, setSortBy] = useState<'curated' | 'price-asc' | 'price-desc' | 'duration'>('curated');

  // Modal inspection state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPatronageOpen, setIsPatronageOpen] = useState(false);
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);

      const prodParam = searchParams.get('product');
      if (prodParam) {
        const found = data.find((p) => p.id === prodParam);
        if (found) {
          setSelectedProduct(found);
          setIsModalOpen(true);
        }
      }
    } catch (err) {
      console.error('Failed to load products', err);
      showToast('Could not load products from database', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (prod: Product) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
    setSearchParams({ product: prod.id });
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    searchParams.delete('product');
    setSearchParams(searchParams);
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Zone
        if (selectedZone !== 'All India' && p.zone !== selectedZone) {
          return false;
        }
        // Category
        if (selectedCategory !== 'All Crafts' && p.category !== selectedCategory) {
          return false;
        }
        // Material
        if (selectedMaterial !== 'All Materials') {
          const matchMat = p.materials?.some((m) =>
            m.toLowerCase().includes(selectedMaterial.toLowerCase())
          );
          if (!matchMat) return false;
        }
        // Price Range
        const price = p.price_inr || 0;
        if (priceRange === 'under10k' && price >= 10000) return false;
        if (priceRange === '10k-25k' && (price < 10000 || price > 25000)) return false;
        if (priceRange === '25k-50k' && (price < 25000 || price > 50000)) return false;
        if (priceRange === 'above50k' && price <= 50000) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchCraft = p.craft_name.toLowerCase().includes(q);
          const matchArtisan = p.artisan_name.toLowerCase().includes(q);
          const matchLoc = p.artisan_location?.toLowerCase().includes(q) || false;
          const matchMat = p.materials?.some((m) => m.toLowerCase().includes(q)) || false;
          if (!matchTitle && !matchCraft && !matchArtisan && !matchLoc && !matchMat) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.price_inr || 0) - (b.price_inr || 0);
        if (sortBy === 'price-desc') return (b.price_inr || 0) - (a.price_inr || 0);
        if (sortBy === 'duration') return (b.crafting_days || 0) - (a.crafting_days || 0);
        return 0; // curated default
      });
  }, [products, selectedZone, selectedCategory, selectedMaterial, priceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedZone('All India');
    setSelectedCategory('All Crafts');
    setSelectedMaterial('All Materials');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('curated');
  };

  const isFiltered =
    selectedZone !== 'All India' ||
    selectedCategory !== 'All Crafts' ||
    selectedMaterial !== 'All Materials' ||
    priceRange !== 'all' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'curated';

  return (
    <div className="space-y-12 pb-24 min-h-screen text-ink w-full min-w-0 overflow-x-hidden">
      {/* 1. REFINED ARCHIVAL CATALOG HEADER */}
      <section className="border-b border-border bg-gradient-to-b from-[#141418] via-[#0E0E12] to-surface pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-[11px] whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  GI Certified Lineages
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#FF7A00] text-[11px] font-mono tracking-wide whitespace-nowrap font-medium">100% Direct Guild Payout</span>
                <span className="text-white/20">•</span>
                <span className="text-muted/80 text-[11px] font-mono whitespace-nowrap">Zero Intermediary Cut</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial tracking-tight text-white leading-[1.08]">
                Living Heritage <span className="italic font-normal text-gold-gradient">Bazaar</span>
              </h1>

              <p className="text-sm sm:text-base text-muted/90 font-sans font-light leading-relaxed">
                Acquire rare, museum-cataloged masterworks directly from registered Indian artisan cooperatives. Every acquisition directly sustains multi-generational craft lineages.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsCommissionOpen(true)}
                className="h-10 px-4 rounded-lg bg-surface border border-border hover:border-terracotta text-white text-xs font-medium transition-all hover:shadow-[0_0_15px_rgba(255,122,0,0.2)] flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                <span>Bespeak Custom Piece</span>
              </button>
              <button
                onClick={() => setIsPatronageOpen(true)}
                className="h-10 px-4 rounded-lg bg-surface border border-border hover:border-rose-500/50 text-white text-xs font-medium transition-all hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] flex items-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Artisan Micro-Grant</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DISCOVERY & FILTER BAR */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 border-b border-border">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  isSelected
                    ? 'border-terracotta text-white font-semibold'
                    : 'border-transparent text-muted hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter Dropdowns & Search */}
        <div className="bg-surface rounded-xl p-3 border border-border flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, maker, material, or city..."
              className="w-full pl-10 pr-9 py-2 rounded-lg border border-border bg-paper text-xs text-white placeholder:text-muted/60 focus:outline-none focus:border-terracotta transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Zone Selector */}
          <div className="w-full md:w-36">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-paper text-xs text-white focus:outline-none focus:border-terracotta cursor-pointer"
            >
              {ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          {/* Material Selector */}
          <div className="w-full md:w-40">
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-paper text-xs text-white focus:outline-none focus:border-terracotta cursor-pointer"
            >
              {MATERIALS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="w-full md:w-36">
            <select
              value={priceRange}
              onChange={(e: any) => setPriceRange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-paper text-xs text-white focus:outline-none focus:border-terracotta cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under10k">Under ₹10,000</option>
              <option value="10k-25k">₹10,000 – ₹25,000</option>
              <option value="25k-50k">₹25,000 – ₹50,000</option>
              <option value="above50k">Above ₹50,000</option>
            </select>
          </div>

          {/* Sort */}
          <div className="w-full md:w-36">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-paper text-xs text-white focus:outline-none focus:border-terracotta cursor-pointer"
            >
              <option value="curated">Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Crafting Duration</option>
            </select>
          </div>

          {/* Reset */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="p-2 rounded-lg border border-border hover:bg-paper text-muted hover:text-white transition-colors text-xs flex items-center gap-1.5 shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Counter Header */}
        <div className="flex items-center justify-between text-xs font-mono text-muted px-1">
          <span><strong className="text-white font-editorial text-sm">{filteredProducts.length}</strong> certified masterworks</span>
          <span className="text-emerald-400 font-medium">100% Direct Lineage Payout · ₹0 Platform Commission</span>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface rounded-xl h-[380px] border border-border animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-surface rounded-xl border border-border p-8">
            <Package className="w-10 h-10 text-muted mx-auto stroke-[1.5]" />
            <h3 className="text-lg font-editorial font-bold text-white">No craft records match your criteria</h3>
            <p className="text-xs text-muted max-w-sm mx-auto">
              Try resetting your search query, material, or zone filter to discover other living traditions.
            </p>
            <button
              onClick={resetFilters}
              className="h-9 px-4 rounded-lg bg-terracotta text-white text-xs font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-surface rounded-xl overflow-hidden border border-border hover:border-[#383842] transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo Vitrine */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-black/40 cursor-pointer"
                    onClick={() => handleOpenDetail(prod)}
                  >
                    <img
                      src={prod.image_url}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                    {/* GI Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/85 text-white/90 border border-white/10 backdrop-blur-md">
                        {prod.zone || 'Pan-India'}
                      </span>
                      {prod.gi_tag && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 bg-black/85 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                          <FileCheck className="w-3 h-3" />
                          {prod.gi_tag.split('(')[0].trim()}
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-white/90 drop-shadow flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-terracotta" />
                      <span>{prod.artisan_location || 'India'}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#FF7A00] font-semibold block">
                        {prod.craft_name}
                      </span>
                      <h3
                        onClick={() => handleOpenDetail(prod)}
                        className="text-lg font-editorial font-semibold text-white group-hover:text-[#FFA033] transition-colors line-clamp-1 cursor-pointer tracking-tight leading-snug mt-0.5"
                      >
                        {prod.title}
                      </h3>
                      <p className="text-xs text-muted/80 font-sans line-clamp-2 mt-1 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    {/* Maker & Price */}
                    <div className="pt-3 border-t border-border flex items-baseline justify-between">
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted/70 block">Master Artisan</span>
                        <span className="text-xs text-[#F5F3EF] font-medium truncate block">{prod.artisan_name}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted/70 block">Direct Guild Price</span>
                        <span className="text-xl font-editorial font-semibold text-[#F5F3EF] flex items-baseline justify-end gap-0.5">
                          <span className="text-[#FF7A00] font-sans text-xs">₹</span>
                          {prod.price_inr ? prod.price_inr.toLocaleString('en-IN') : 'Enquire'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDetail(prod)}
                    className="flex-1 h-9 rounded-lg bg-paper border border-border hover:bg-surface text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-muted" />
                    <span>Inspect</span>
                  </button>

                  <button
                    onClick={() => addToCart(prod)}
                    className="flex-1 h-9 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-white" />
                    <span>Acquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. BESPOKE COMMISSIONS & GUILD PATRONAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#16161C] to-surface border border-border p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF7A00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest text-[10px] font-semibold">Living Lineage Patronage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-normal tracking-tight text-white">
              Direct Patronage & <span className="italic font-light text-gold-gradient">Bespoke Commissions</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted/90 leading-relaxed font-sans">
              Submit bespoke architectural or heirloom commissions directly to registered artisan cooperatives, or sponsor raw material stipends with 100% direct bank node routing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCommissionOpen(true)}
              className="h-10 px-5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespeak Custom Craft</span>
            </button>
            <button
              onClick={() => setIsPatronageOpen(true)}
              className="h-10 px-5 rounded-lg bg-paper border border-border hover:border-terracotta text-white text-xs font-medium transition-colors flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Artisan Micro-Grant</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
        onAddToCart={(prod) => {
          addToCart(prod);
          handleCloseDetail();
        }}
      />

      {/* Direct Artisan Patronage Modal */}
      <DirectArtisanPatronageModal
        isOpen={isPatronageOpen}
        onClose={() => setIsPatronageOpen(false)}
      />

      {/* Direct Artisan Commissioning Modal */}
      <DirectCommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />
    </div>
  );
};
