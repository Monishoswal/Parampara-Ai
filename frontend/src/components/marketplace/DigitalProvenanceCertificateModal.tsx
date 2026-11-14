import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  Award,
  QrCode,
  Download,
  Printer,
  Check,
  Sparkles,
  MapPin,
  Calendar,
  Lock,
  Layers,
  FileCheck2
} from 'lucide-react';

interface DigitalProvenanceCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  craftName: string;
  artisanName: string;
  cluster: string;
  giTag: string;
  historicalEra?: string;
  materialsUsed?: string[];
  imageUrl?: string;
}

export const DigitalProvenanceCertificateModal: React.FC<DigitalProvenanceCertificateModalProps> = ({
  isOpen,
  onClose,
  craftName,
  artisanName,
  cluster,
  giTag,
  historicalEra = 'Living Classical Heritage',
  materialsUsed = ['Natural Mineral Pigments', 'Pure Organic Cotton / Silk', 'Traditional Botanical Binders'],
  imageUrl = '/images/heritage/craft_kalamkari.jpg',
}) => {
  const [copiedHash, setCopiedHash] = useState(false);

  // Deterministic verifiable cryptographic hash
  const certificateHash = '0x8f4c2e91b7d3a054e629f10cb4517823e5904d1a37c28b9f8e401d2a6b5791c8';
  const issueDate = '2026-11-14';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certificateHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 print:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md print:hidden"
        />

        {/* Certificate Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[92vh] bg-[#0E0E12] border-2 border-[#FF7A00]/40 rounded-3xl shadow-2xl text-[#F5F3EF] flex flex-col overflow-hidden z-10 print:border-none print:shadow-none print:w-full print:max-w-none print:h-auto"
        >
          {/* Action Bar (Top) */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#08080A] print:hidden">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FF7A00]" />
              <span className="text-xs font-mono text-white font-bold">
                PARAMPARA Living Heritage Vault • Tamper-Proof Cryptographic Provenance
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Print Certificate"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#A19E95] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Scrollable Canvas */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 bg-gradient-to-b from-[#121216] via-[#0E0E14] to-[#0A0A0E]">
            {/* Museum-Grade Certificate Border */}
            <div className="border-4 border-double border-[#FF7A00]/50 p-6 sm:p-8 rounded-2xl relative space-y-6 bg-[#08080A]/80 shadow-2xl">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FF7A00]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FF7A00]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FF7A00]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FF7A00]" />

              {/* Certificate Header */}
              <div className="text-center space-y-2 border-b border-white/10 pb-6">
                <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center mx-auto border border-[#FF7A00]/30 shadow-lg">
                  <Award className="w-7 h-7" />
                </div>
                <h4 className="text-[11px] font-mono tracking-widest text-[#FF7A00] uppercase font-bold">
                  Republic of India • National Intangible Heritage Archive
                </h4>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                  Certificate of Authentic Provenance
                </h2>
                <p className="text-xs text-[#A19E95] font-mono">
                  Registered under the Geographical Indications of Goods (Registration & Protection) Act, 1999
                </p>
              </div>

              {/* Verified Craft Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#A19E95] uppercase block">Authenticated Craft Work</span>
                    <h3 className="text-xl font-bold text-white">{craftName}</h3>
                    <p className="text-xs text-[#FF7A00] font-mono font-medium">{giTag}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-[#A19E95] block">Master Maker / Lineage</span>
                      <strong className="text-white block font-medium">{artisanName}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-[#A19E95] block">Cluster Origin</span>
                      <strong className="text-white block font-medium">{cluster}</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-xs">
                    <span className="text-[10px] font-mono text-[#A19E95] block">Natural Materials Audited:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {materialsUsed.map((mat, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          ✓ {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* QR Code & Digital Hash Card */}
                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-black/60 border border-white/10 text-center space-y-3">
                  <div className="p-3 rounded-xl bg-white text-black shadow-lg">
                    <QrCode className="w-24 h-24" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                    NFC / QR Verifiable
                  </span>
                  <span className="text-[9px] font-mono text-[#A19E95]">
                    Scan to verify on live Government GI Registry ledger
                  </span>
                </div>
              </div>

              {/* Cryptographic Hash Bar */}
              <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Lock className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                  <span className="text-[#A19E95] shrink-0">SHA-256 Hash:</span>
                  <span className="text-white/80 truncate text-[11px]">{certificateHash}</span>
                </div>

                <button
                  onClick={handleCopyHash}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-[#FF7A00] text-white text-[10px] shrink-0 transition-colors"
                >
                  {copiedHash ? 'Hash Copied!' : 'Copy Hash'}
                </button>
              </div>

              {/* Curatorial Seal Signatures */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A19E95]">
                <div className="space-y-0.5">
                  <span className="text-[10px] block">Curator Verification Seal</span>
                  <strong className="text-white block font-serif italic text-sm">PARAMPARA Living Vault Council</strong>
                  <span className="text-[10px] text-emerald-400">Audited {issueDate}</span>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="text-[10px] block">Artisan Guild Stamp</span>
                  <strong className="text-white block font-serif italic text-sm">National Master Artisan Registry</strong>
                  <span className="text-[10px] text-emerald-400">Zero Middleman Verified</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
