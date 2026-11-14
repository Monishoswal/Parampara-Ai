import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Award,
  ShieldCheck,
  Clock,
  Layers,
  MessageCircle,
  Share2,
  Check,
  ShoppingBag,
  ExternalLink,
  Truck,
  Sparkles,
  Info,
  Heart
} from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ArtisanVoiceNotePlayer } from './ArtisanVoiceNotePlayer';
import { DirectArtisanPatronageModal } from './DirectArtisanPatronageModal';
import { GICertificateModal } from '../interactive/GICertificateModal';
import { DirectCommissionModal } from './DirectCommissionModal';
import { DigitalProvenanceCertificateModal } from './DigitalProvenanceCertificateModal';
import { EconomicTransparencyGraph } from './EconomicTransparencyGraph';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product: propProduct,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const { addToCart, showToast } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPatronageOpen, setIsPatronageOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [isProvenanceCertOpen, setIsProvenanceCertOpen] = useState(false);
  const [cachedProduct, setCachedProduct] = useState<Product | null>(propProduct);

  React.useEffect(() => {
    if (propProduct) setCachedProduct(propProduct);
  }, [propProduct]);

  const product = propProduct || cachedProduct;

  if (!product) return null;

  const currentImage = selectedImage || product.image_url;
  const allImages = product.images && product.images.length > 0
    ? product.images
    : [product.image_url];

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/bazaar?product=${product.id}`
    );
    setCopied(true);
    showToast('Product link copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  const cleanWaNumber = (product.whatsapp_number || '+919845012345').replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    `Namaste! I am interested in acquiring "${product.title}" (GI: ${product.gi_tag || product.craft_name}) listed on PARAMPARA AI Bazaar. Could you share more details?`
  );
  const whatsappUrl = `https://wa.me/${cleanWaNumber}?text=${waMessage}`;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            key="product-detail-modal-root"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              key="product-detail-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onClose}
              className="fixed inset-0 bg-[#08080A]/95 backdrop-blur-xl"
            />

            {/* Modal Window */}
            <motion.div
              key="product-detail-window"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#121216] rounded-2xl border border-border shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-paper shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-surface text-terracotta border border-border">
                    {product.zone || 'Pan-India'}
                  </span>
                  {product.gi_tag && (
                    <span className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded-sm bg-surface">
                      {product.gi_tag.split('(')[0]}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded text-muted hover:text-ink hover:bg-surface transition-colors"
                    title="Share artefact"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded text-muted hover:text-ink hover:bg-surface transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Product Visual Gallery Column (Sticky on desktop so photo stays visible while scrolling details) */}
                  <div className="md:col-span-6 space-y-3 md:sticky md:top-0">
                    <div className="relative aspect-square rounded-md overflow-hidden bg-surface border border-border">
                      <img
                        src={currentImage}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono drop-shadow">
                        <span className="bg-paper/90 text-muted px-2 py-0.5 rounded-sm border border-border">
                          {product.crafting_days ? `${product.crafting_days} Days Crafting Rhythm` : 'Master Heritage Piece'}
                        </span>
                        <span className="bg-emerald-950/90 text-emerald-300 px-2 py-0.5 rounded-sm border border-emerald-800">
                          100% Handcrafted
                        </span>
                      </div>
                    </div>

                {/* Thumbnails if multiple images */}
                {allImages.length > 1 && (
                  <div className="flex gap-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 rounded overflow-hidden border transition-colors ${
                          currentImage === img
                            ? 'border-terracotta ring-1 ring-terracotta'
                            : 'border-border opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Artisan Guarantee Notice */}
                <div className="p-3 rounded-md bg-paper border border-border text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-ink">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                    <span>Direct Guild Provenance Guarantee</span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Zero middlemen or aggregator markup. 100% of the listed price reaches the artisan collective directly in INR.
                  </p>
                </div>
              </div>

              {/* Product Info & Purchase Details Column */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#FF7A00] font-semibold block">
                    {product.craft_name}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-white mt-1 leading-tight tracking-tight">
                    {product.title}
                  </h2>
                </div>

                {/* Pricing Block */}
                <div className="p-4 rounded-xl bg-paper/60 border border-border flex items-baseline justify-between shadow-inner">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted block">Direct Guild Price</span>
                    <span className="text-3xl font-editorial font-semibold text-white tracking-tight flex items-baseline gap-1 mt-0.5">
                      <span className="text-[#FF7A00] text-lg font-sans">₹</span>
                      {product.price_inr ? product.price_inr.toLocaleString('en-IN') : 'Enquire'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-wider">Platform Cut</span>
                    <span className="text-xs font-mono font-semibold text-emerald-400">₹0 (100% to Maker)</span>
                  </div>
                </div>

                {/* Artisan Profile Snapshot */}
                <div className="flex items-center gap-3 p-3 rounded-md bg-surface border border-border">
                  <img
                    src={product.artisan_avatar || '/images/heritage/artisan_bidriware.jpg'}
                    alt={product.artisan_name}
                    className="w-12 h-12 rounded object-cover border border-border flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-xs font-mono text-muted">
                      <Award className="w-3.5 h-3.5 text-terracotta" />
                      <span>Certified maker</span>
                    </div>
                    <h4 className="text-sm font-semibold text-ink truncate mt-0.5">
                      {product.artisan_name}
                    </h4>
                    <p className="text-xs text-muted flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-muted shrink-0" />
                      <span>{product.artisan_location || 'India'}</span>
                    </p>
                  </div>
                </div>

                {/* Artisan Spoken Vernacular Greeting */}
                <ArtisanVoiceNotePlayer
                  artisanName={product.artisan_name}
                  language={product.zone === 'West' ? 'Kachchhi' : product.zone === 'South' ? 'Telugu' : 'Hindi'}
                  indicGreeting={
                    product.zone === 'West'
                      ? 'પ્રણામ! અમારી સાત પેઢીઓથી અમે આ વિશિષ્ટ રોગન કળા બનાવીએ છીએ.'
                      : product.zone === 'South'
                      ? 'నమస్కారం! మా కుటుంబం తరతరాలుగా ఈ పవిత్రమైన హస్తకళను కాపాడుతోంది.'
                      : 'नमस्ते! हमारी पीढ़ियाँ इस अनमोल धरोहर को जीवित रखने में समर्पित हैं।'
                  }
                  englishTranslation="Greetings! For seven generations, our family has dedicated our hands and lives to preserving this sacred heritage."
                />

                {/* Cultural Verification & Custom Bespoke Actions */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setIsCertOpen(true)}
                    className="py-2.5 px-3 rounded-lg bg-surface hover:bg-paper border border-border text-ink hover:text-white font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                    <span>Verify GI Certificate</span>
                  </button>

                  <button
                    onClick={() => setIsProvenanceCertOpen(true)}
                    className="py-2.5 px-3 rounded-lg bg-surface hover:bg-paper border border-border text-ink hover:text-white font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>Digital Provenance (NFC)</span>
                  </button>

                  <button
                    onClick={() => setIsCommissionOpen(true)}
                    className="py-2.5 px-3 rounded-lg bg-surface hover:bg-paper border border-border text-ink hover:text-white font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>Bespeak Custom Piece</span>
                  </button>

                  <button
                    onClick={() => setIsPatronageOpen(true)}
                    className="py-2.5 px-3 rounded-lg bg-surface hover:bg-paper border border-border text-ink hover:text-white font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Artisan Micro-Grant</span>
                  </button>
                </div>

                {/* 100% Economic Fair-Wage Transparency Breakdown */}
                <EconomicTransparencyGraph priceInr={product.price_inr} />

                {/* Technical Specifications */}
                <div className="space-y-2 border-t border-border pt-4">
                  <span className="text-xs font-mono text-muted block">
                    Archival specifications
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {product.dimensions && (
                      <div className="p-2 rounded bg-paper border border-border">
                        <span className="text-muted block text-[10px]">Dimensions</span>
                        <span className="text-ink">{product.dimensions}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="p-2 rounded bg-paper border border-border">
                        <span className="text-muted block text-[10px]">Weight</span>
                        <span className="text-ink">{product.weight}</span>
                      </div>
                    )}
                    {product.crafting_days && (
                      <div className="p-2 rounded bg-paper border border-border">
                        <span className="text-muted block text-[10px]">Crafting Duration</span>
                        <span className="text-ink">{product.crafting_days} Days Manual</span>
                      </div>
                    )}
                    {product.stock_quantity && (
                      <div className="p-2 rounded bg-paper border border-border">
                        <span className="text-muted block text-[10px]">Vault Availability</span>
                        <span className="text-ink">{product.stock_quantity} available</span>
                      </div>
                    )}
                  </div>

                  {product.materials && product.materials.length > 0 && (
                    <div className="pt-2">
                      <span className="text-xs font-mono text-muted block mb-1">
                        Materials & organic constituents
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.materials.map((m, i) => (
                          <span
                            key={i}
                            className="text-xs font-mono px-2 py-0.5 rounded-sm bg-paper text-ink border border-border"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cultural Narrative Story */}
                <div className="space-y-1.5 border-t border-border pt-4">
                  <span className="text-xs font-mono text-muted block">
                    The story behind this masterpiece
                  </span>
                  <p className="text-xs text-muted leading-relaxed font-sans bg-paper p-3 rounded border border-border">
                    {product.cultural_story || product.description}
                  </p>
                </div>

                {/* Acquisition Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleAdd}
                    className="flex-1 h-11 px-5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Acquire Masterwork</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-4 rounded-lg bg-surface border border-border hover:bg-paper text-ink text-xs font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    <span>Direct Artisan Inquiry</span>
                  </a>
                </div>

                {/* Shipping & Delivery Info */}
                <div className="pt-2 flex items-center gap-2 text-[11px] text-muted font-mono">
                  <Truck className="w-3.5 h-3.5 text-muted" />
                  <span>Insured wooden crate packaging • Pan-India express delivery</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Artisan Patronage Modal */}
      <DirectArtisanPatronageModal
        isOpen={isPatronageOpen}
        onClose={() => setIsPatronageOpen(false)}
        artisanName={product.artisan_name}
        craftName={product.craft_name}
        region={product.artisan_location}
      />

      {/* Cryptographic GI Authenticity Certificate Modal */}
      <GICertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        craftName={product.craft_name}
        artisanName={product.artisan_name}
        giTagNumber={product.gi_tag || 'GI-IN-029'}
        region={product.artisan_location || 'India'}
        materials={product.materials || ['Silk', 'Castor Oil Resin', 'Mineral Pigments']}
      />

      {/* Direct Artisan Commissioning Vault ("Bespeak Craft") */}
      <DirectCommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
        craftName={product.craft_name}
        artisanName={product.artisan_name}
      />

      {/* Verifiable Tamper-Proof Digital Provenance Certificate Modal */}
      <DigitalProvenanceCertificateModal
        isOpen={isProvenanceCertOpen}
        onClose={() => setIsProvenanceCertOpen(false)}
        craftName={product.craft_name}
        artisanName={product.artisan_name}
        cluster={product.artisan_location || 'Pan-India Craft Cluster'}
        giTag={product.gi_tag || 'GI Certified'}
        materialsUsed={product.materials || ['Natural Botanical Dyes', 'Pure Silk']}
        imageUrl={product.image_url}
      />
    </>
  );
};

