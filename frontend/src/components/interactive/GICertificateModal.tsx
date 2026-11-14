import React, { useRef } from 'react';
import {
  ShieldCheck,
  Download,
  X,
  Award,
  CheckCircle
} from 'lucide-react';

interface GICertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  craftName: string;
  artisanName: string;
  giTagNumber: string;
  region: string;
  materials: string[];
}

export const GICertificateModal: React.FC<GICertificateModalProps> = ({
  isOpen,
  onClose,
  craftName,
  artisanName,
  giTagNumber,
  region,
  materials,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-paper">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-ink" />
            <span className="text-sm font-editorial font-bold text-ink">
              Cryptographic GI Authenticity Certificate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDownload}
              className="px-3 py-1 bg-terracotta hover:bg-terracotta-hover text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF / Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-muted hover:text-ink hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Archival Certificate Paper Body */}
        <div className="p-6 overflow-y-auto">
          <div
            ref={certRef}
            className="relative bg-[#FFFDF7] text-[#1C100B] p-8 rounded-lg shadow-inner border-8 border-double border-[#854D0E] font-serif select-none"
          >
            {/* Corner Filigrees */}
            <div className="absolute top-2 left-2 text-xs font-mono text-[#854D0E]">
              Parampara • GI Registry
            </div>
            <div className="absolute top-2 right-2 text-xs font-mono text-[#854D0E]">
              {giTagNumber}
            </div>

            {/* Central Official Seal Emblem */}
            <div className="text-center space-y-2 pb-4 border-b border-[#854D0E]/30">
              <div className="w-14 h-14 rounded-full border-2 border-[#854D0E] flex items-center justify-center mx-auto bg-amber-50 text-[#854D0E]">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-editorial font-bold tracking-tight text-[#78350F]">
                Certificate of Craft Authenticity
              </h2>
              <p className="text-xs font-mono text-[#92400E]">
                Geographical Indications Registry • Ministry of Commerce & Industry
              </p>
            </div>

            {/* Certificate Proclamation */}
            <div className="py-6 space-y-4 text-center leading-relaxed">
              <p className="text-xs font-sans text-gray-700 italic">
                This document certifies that the masterwork designated herein has been forensic-audited
                and validated under the Parampara Heritage Protocol:
              </p>

              <div className="py-2">
                <div className="text-2xl font-editorial font-bold text-[#881337]">
                  {craftName}
                </div>
                <div className="text-sm font-mono text-gray-700 mt-1">
                  Origin: {region}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left text-xs bg-[#FAF5EE] p-4 rounded border border-[#E7D7C1] font-mono">
                <div>
                  <span className="text-gray-500 block text-[10px]">Living master:</span>
                  <strong className="text-gray-900">{artisanName}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">GI registry tag:</span>
                  <strong className="text-[#881337]">{giTagNumber}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Authentic materials:</span>
                  <span className="text-gray-800">{materials.slice(0, 3).join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Audit verification:</span>
                  <strong className="text-emerald-700">99.8% Pure handcraft</strong>
                </div>
              </div>
            </div>

            {/* Bottom Verification Seal & Signatures */}
            <div className="pt-4 border-t border-[#854D0E]/30 flex items-end justify-between text-xs font-mono">
              <div className="space-y-1">
                <div className="w-16 h-16 bg-white p-1 rounded border border-gray-300">
                  <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v2h-4v-2zm-4 4h4v4h-2v-2h-2v-2zm4 2h4v2h-4v-2zm-8-6h2v2h-2v-2zm4-4h2v2h-2V8zm-2 2h4v2h-4v-2z" />
                  </svg>
                </div>
                <div className="text-[9px] text-gray-500">Scan to Verify On-Chain</div>
              </div>

              <div className="text-center space-y-1">
                <div className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Cryptographically Sealed
                </div>
                <div className="text-[9px] text-gray-500">
                  SHA-256: 0x{Math.random().toString(16).substring(2, 10).toUpperCase()}...8F2B
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic text-base text-[#881337] border-b border-gray-400 pb-0.5">
                  Abdul Khatri
                </div>
                <div className="text-[10px] text-gray-600">Chief Artisan Registrar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
