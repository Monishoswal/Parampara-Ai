import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Compass,
  Hammer,
  ShieldCheck,
  Send,
  Calendar,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  FileCheck2,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DirectCommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  craftName?: string;
  artisanName?: string;
}

export const DirectCommissionModal: React.FC<DirectCommissionModalProps> = ({
  isOpen,
  onClose,
  craftName = 'Custom Living Heritage Masterwork',
  artisanName = 'Master Artisan Guild'
}) => {
  const { showToast } = useApp();
  const [selectedCraft, setSelectedCraft] = useState(craftName);
  const [dimensionWidth, setDimensionWidth] = useState('36');
  const [dimensionHeight, setDimensionHeight] = useState('48');
  const [dimensionUnit, setDimensionUnit] = useState<'inches' | 'feet' | 'cm'>('inches');
  const [motifDescription, setMotifDescription] = useState('');
  const [materialRequirement, setMaterialRequirement] = useState('100% Pure Certified Natural & Traditional');
  const [estimatedBudget, setEstimatedBudget] = useState('45000');
  const [timelineMonths, setTimelineMonths] = useState('3');
  const [patronName, setPatronName] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [patronType, setPatronType] = useState<'private_collector' | 'interior_architect' | 'museum_institution'>('private_collector');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName.trim() || !patronEmail.trim()) {
      showToast('Please provide your name and contact email.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Bespoke Craft Commission registered in Guild Ledger! (#COM-891)', 'success');
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-[#121216] border border-white/15 rounded-3xl shadow-2xl text-[#F5F3EF] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#08080A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/20 text-[#FF7A00] flex items-center justify-center border border-[#FF7A00]/30 shadow-md">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Direct Artisan Commissioning Vault ("Bespeak Craft")</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    0% Middleman
                  </span>
                </h3>
                <p className="text-xs text-[#A19E95] font-mono">
                  Direct custom craft contracts connecting patrons, architects & museums with authentic master guilds
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A19E95] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Zero Commission Guarantee Banner */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-xs text-emerald-300">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
                  <p className="leading-relaxed">
                    <strong>100% Direct Guild Escrow:</strong> 100% of your bespoke commission goes directly to the master artisan lineage and apprentice guild fund. Zero broker or auction cuts.
                  </p>
                </div>

                {/* Craft Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#A19E95] block">Target Traditional Craft Tradition</label>
                  <select
                    value={selectedCraft}
                    onChange={(e) => setSelectedCraft(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                  >
                    <option value="Bidriware Metal Inlay Wall Panel">Bidriware Metal Inlay (Silver & Zinc-Copper Panel)</option>
                    <option value="Srikalahasti Natural Dye Kalamkari Tapestry">Srikalahasti Natural Dye Kalamkari Tapestry (Cotton/Silk)</option>
                    <option value="Nirona Castor-Oil Rogan Silk Artwork">Nirona Castor-Oil Rogan Silk Artwork (Kutch)</option>
                    <option value="Bastar Lost-Wax Dhokra Bronze Sculpture">Bastar Lost-Wax Dhokra Bronze Sculpture (Chhattisgarh)</option>
                    <option value="Thanjavur 22K Gold Foil Temple Gesso Art">Thanjavur 22K Gold Foil Temple Gesso Art (Tamil Nadu)</option>
                    <option value="Patan Double-Ikkat Pure Silk Patola">Patan Double-Ikkat Pure Silk Patola (Gujarat)</option>
                  </select>
                </div>

                {/* Custom Dimensions */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Width</label>
                    <input
                      type="number"
                      value={dimensionWidth}
                      onChange={(e) => setDimensionWidth(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Height</label>
                    <input
                      type="number"
                      value={dimensionHeight}
                      onChange={(e) => setDimensionHeight(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Unit</label>
                    <select
                      value={dimensionUnit}
                      onChange={(e) => setDimensionUnit(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                    >
                      <option value="inches">Inches (in)</option>
                      <option value="feet">Feet (ft)</option>
                      <option value="cm">Centimetres (cm)</option>
                    </select>
                  </div>
                </div>

                {/* Custom Motif & Vision */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#A19E95] block">
                    Bespoke Motif, Theme & Architectural Placement Guidelines
                  </label>
                  <textarea
                    rows={3}
                    value={motifDescription}
                    onChange={(e) => setMotifDescription(e.target.value)}
                    placeholder="Describe desired motifs (e.g., Kalpavriksha tree of life, sacred temple geometric border, specific deity portrayal, or custom architectural wall dimensions)..."
                    className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#FF7A00] leading-relaxed"
                  />
                </div>

                {/* Budget & Timeline Estimator */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Estimated Budget Allocation (INR ₹)</label>
                    <input
                      type="number"
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                    />
                    <span className="text-[10px] font-mono text-emerald-400">100% to Master Artisan & Raw Materials</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A19E95] block">Desired Completion Window</label>
                    <select
                      value={timelineMonths}
                      onChange={(e) => setTimelineMonths(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF7A00]"
                    >
                      <option value="2">2 Months (Standard Masterwork)</option>
                      <option value="3">3–4 Months (Complex Multi-Layer)</option>
                      <option value="6">6+ Months (Monumental Architectural Commission)</option>
                    </select>
                  </div>
                </div>

                {/* Patron Identification */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-[#FF7A00] font-semibold block uppercase">
                    Patron Credentials
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#A19E95] block">Full Name</label>
                      <input
                        type="text"
                        value={patronName}
                        onChange={(e) => setPatronName(e.target.value)}
                        placeholder="e.g. Dr. Ananya Sharma"
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-white"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#A19E95] block">Email Address</label>
                      <input
                        type="email"
                        value={patronEmail}
                        onChange={(e) => setPatronEmail(e.target.value)}
                        placeholder="patron@institution.org"
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-white"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#A19E95] block">Patron Type</label>
                      <select
                        value={patronType}
                        onChange={(e) => setPatronType(e.target.value as any)}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-white"
                      >
                        <option value="private_collector">Private Collector</option>
                        <option value="interior_architect">Architect / Design Firm</option>
                        <option value="museum_institution">Museum / Cultural Institution</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,122,0,0.35)] transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Encrypting & Routing to Master Guild...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Bespoke Commission Proposal</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success confirmation state */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-4 bg-white/[0.02] rounded-2xl border border-white/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Bespoke Craft Proposal Registered</h4>
                <p className="text-xs text-[#A19E95] max-w-md mx-auto leading-relaxed">
                  Your commission proposal for <strong className="text-white">{selectedCraft}</strong> has been routed directly to the verified Guild Council. Commission Dossier Reference: <span className="font-mono text-[#FF7A00]">#COM-891</span>.
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-emerald-400 max-w-sm mx-auto">
                  A guild elder coordinator will contact {patronEmail} within 48 business hours with master artisan portfolio estimates.
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                >
                  Close Vault
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
