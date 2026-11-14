import React, { useState } from 'react';
import {
  Heart,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';

interface DirectArtisanPatronageModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisanName?: string;
  craftName?: string;
  upiId?: string;
  region?: string;
}

const PRESET_AMOUNTS = [
  { amount: 250, label: 'Natural Pigments', desc: 'Funds 1kg raw alum & indigo roots' },
  { amount: 500, label: 'Artisan Kalam', desc: 'Crafts 1 hand-beaten brass stylus' },
  { amount: 1000, label: 'Silk Yardage', desc: 'Supports 1 week of organic cotton threads' },
  { amount: 2500, label: 'Master Apprentice Grant', desc: 'Direct monthly stipend for village youth' },
];

export const DirectArtisanPatronageModal: React.FC<DirectArtisanPatronageModalProps> = ({
  isOpen,
  onClose,
  artisanName = 'Ustad Abdul Gafur Khatri',
  craftName = 'Kutch Rogan Silk Painting',
  upiId = 'abdul.khatri@upi',
  region = 'Nirona, Kutch, Gujarat',
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  const currentAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  const handleConfirmPatronage = () => {
    const generatedTxn = 'UPI-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString().slice(-4);
    setTxnId(generatedTxn);
    setIsSuccess(true);

    try {
      // Acoustic temple bowl resonance on donation confirmation
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, audioCtx.currentTime); // Sacred A4 432Hz
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {}
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCustomAmount('');
    setSelectedAmount(500);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-surface border border-border rounded-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-paper">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold text-ink">
                Direct Artisan Micro-Grant (0% Platform Fee)
              </h3>
              <p className="text-xs font-mono text-emerald-400">
                100% Direct-to-Artisan UPI Banking Node
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Disbursal Impact Ticker */}
        <div className="bg-paper px-6 py-2.5 border-b border-border flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-muted">
            <TrendingUp className="w-3.5 h-3.5 text-muted" />
            <span>Cumulative Disbursed:</span>
            <strong className="text-ink font-bold">₹4,82,500</strong>
          </div>
          <div className="text-emerald-400 font-semibold">342 Living Masters</div>
        </div>

        {!isSuccess ? (
          <div className="p-6 space-y-5">
            {/* Beneficiary Card */}
            <div className="p-3.5 rounded-lg bg-paper border border-border flex items-center justify-between">
              <div>
                <div className="text-sm font-editorial font-bold text-ink">{artisanName}</div>
                <div className="text-xs text-muted">{craftName} • {region}</div>
                <div className="text-[11px] font-mono text-muted mt-1">Verified UPI: {upiId}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-surface px-2 py-0.5 rounded border border-border">
                  <ShieldCheck className="w-3.5 h-3.5" /> GI certified
                </span>
              </div>
            </div>

            {/* Micro-Grant Preset Amounts */}
            <div>
              <label className="text-xs font-mono text-muted block mb-2">
                Select patronage amount
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_AMOUNTS.map((p) => {
                  const isSel = selectedAmount === p.amount && !customAmount;
                  return (
                    <button
                      key={p.amount}
                      onClick={() => {
                        setSelectedAmount(p.amount);
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        isSel
                          ? 'border-terracotta bg-surface ring-1 ring-terracotta'
                          : 'border-border bg-paper hover:border-terracotta'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-ink">₹{p.amount}</span>
                        <span className="text-[10px] font-mono text-muted">{p.label}</span>
                      </div>
                      <p className="text-[10px] text-muted mt-1">{p.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount Field */}
            <div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted">₹</span>
                <input
                  type="number"
                  placeholder="Or enter custom patronage amount (e.g. 1500)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-border bg-paper text-xs text-ink placeholder-muted focus:outline-none focus:border-terracotta font-mono"
                />
              </div>
            </div>

            {/* Mock QR Code View */}
            <div className="flex items-center gap-4 p-3 bg-paper rounded-lg border border-border">
              <div className="w-16 h-16 bg-white rounded p-1 shrink-0 flex items-center justify-center">
                {/* Clean stylized SVG QR code */}
                <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v2h-4v-2zm-4 4h4v4h-2v-2h-2v-2zm4 2h4v2h-4v-2zm-8-6h2v2h-2v-2zm4-4h2v2h-2V8zm-2 2h4v2h-4v-2z" />
                </svg>
              </div>
              <div className="text-xs space-y-1">
                <div className="font-mono text-ink">Scan via Any UPI App</div>
                <div className="text-[11px] text-muted">GPay • PhonePe • Paytm • BHIM • Cred</div>
                <div className="text-[10px] font-mono text-emerald-400">NPCI Direct Route Verified</div>
              </div>
            </div>

            {/* Zero Fee Guarantee */}
            <div className="text-[11px] font-mono text-muted text-center">
              Parampara AI charges <strong className="text-emerald-400 font-bold">₹0.00</strong> commission. 100% of ₹{currentAmount} reaches {artisanName}.
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmPatronage}
              disabled={currentAmount <= 0}
              className="w-full py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Disburse ₹{currentAmount} Direct Patronage</span>
            </button>
          </div>
        ) : (
          /* Success Receipt Screen */
          <div className="p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <h4 className="text-xl font-editorial font-bold text-ink">
                Patronage Grant Disbursed!
              </h4>
              <p className="text-xs text-muted mt-1">
                ₹{currentAmount} directly transferred to {artisanName}'s account.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-4 rounded-lg bg-paper border border-border max-w-sm mx-auto text-xs text-muted text-left space-y-2 font-mono">
              <div className="flex justify-between border-b border-border pb-1.5">
                <span>Transaction Ref:</span>
                <span className="text-ink">{txnId}</span>
              </div>
              <div className="flex justify-between">
                <span>Beneficiary:</span>
                <span className="text-ink">{artisanName}</span>
              </div>
              <div className="flex justify-between">
                <span>Tradition:</span>
                <span className="text-ink">{craftName}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Commission:</span>
                <span className="text-emerald-400">₹0.00 (0%)</span>
              </div>
              <div className="flex justify-between font-bold text-ink pt-1 border-t border-border">
                <span>Total Disbursed:</span>
                <span className="text-emerald-400">₹{currentAmount}.00</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="py-2.5 px-6 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white text-xs font-medium transition-colors"
              >
                Close Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

