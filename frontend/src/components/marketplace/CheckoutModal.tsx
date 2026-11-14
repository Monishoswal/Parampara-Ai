import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  IndianRupee,
  QrCode,
  CreditCard,
  Building,
  ArrowRight,
  ExternalLink,
  Printer,
  Copy,
  Check,
  Package
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../lib/api';
import { OrderReceipt } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart, showToast } = useApp();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'DirectTransfer'>('UPI');
  const [copiedCert, setCopiedCert] = useState(false);

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !city || !pincode) {
      showToast('Please fill all required delivery details', 'warning');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        customer_name: name,
        customer_phone: phone,
        customer_email: email || undefined,
        shipping_address: address,
        city,
        state,
        pincode,
        payment_method: paymentMethod,
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price_inr: item.product.price_inr || 0,
        })),
      };

      const res = await api.placeOrder(orderPayload);
      setReceipt(res);
      clearCart();
      setStep('confirmation');
      showToast('Order confirmed! 100% payout scheduled to artisan guild.', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyCertificate = () => {
    if (receipt) {
      navigator.clipboard.writeText(receipt.certificate_id);
      setCopiedCert(true);
      showToast('Authenticity Certificate ID copied', 'info');
      setTimeout(() => setCopiedCert(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              if (step !== 'confirmation') onClose();
            }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-2xl bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
          >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-paper">
            <div>
              <span className="text-xs font-mono text-terracotta">
                Direct master guild acquisition
              </span>
              <h3 className="font-editorial text-lg text-ink font-semibold mt-0.5">
                {step === 'details' && '1. Shipping & artisan provenance details'}
                {step === 'payment' && '2. Direct guild payment verification'}
                {step === 'confirmation' && 'Order confirmed & provenance issued'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-muted hover:text-ink hover:bg-surface transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* STEP 1: DELIVERY DETAILS */}
            {step === 'details' && (
              <form onSubmit={handleSubmitDetails} className="space-y-4">
                <div className="p-3 rounded-md bg-paper border border-border text-xs flex items-center gap-2 text-muted font-mono">
                  <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
                  <span>Insured Pan-India Express Crated Dispatch • 0% Platform Commission</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-mono text-xs text-muted">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-3 py-2 rounded-md border border-border bg-paper focus:bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs text-muted">
                      Mobile number (for delivery & WhatsApp tracking) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-md border border-border bg-paper focus:bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-mono text-xs text-muted">
                    Email address (optional, for digital certificate)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aarav@example.com"
                    className="w-full px-3 py-2 rounded-md border border-border bg-paper focus:bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-mono text-xs text-muted">
                    Street address / house / colony *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 402, Heritage Residency, 12th Main, Indiranagar"
                    className="w-full px-3 py-2 rounded-md border border-border bg-paper focus:bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-mono text-xs text-muted">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full px-3 py-2 rounded-md border border-border bg-paper focus:bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs text-muted">
                      State *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-border bg-paper focus:bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-terracotta cursor-pointer"
                    >
                      {[
                        'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
                        'Gujarat', 'Jammu & Kashmir', 'Karnataka', 'Kerala', 'Madhya Pradesh',
                        'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu',
                        'Telangana', 'Uttar Pradesh', 'West Bengal'
                      ].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs text-muted">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="560038"
                      className="w-full px-3 py-2 rounded-md border border-border bg-paper focus:bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="text-xs font-mono">
                    <span className="text-muted block">Order Total</span>
                    <span className="text-base font-semibold text-ink">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    type="submit"
                    className="h-10 px-5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT METHOD & REVIEW */}
            {step === 'payment' && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted block">
                    Choose direct payment channel
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded-md border text-left flex items-start gap-3 transition-colors ${
                        paymentMethod === 'UPI'
                          ? 'border-terracotta bg-paper ring-1 ring-terracotta/30'
                          : 'border-border bg-surface hover:bg-paper'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-terracotta mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-ink block">Instant UPI Payment</span>
                        <span className="text-[11px] text-muted leading-tight block">
                          GPay, PhonePe, Paytm, BHIM with direct merchant VPA
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('DirectTransfer')}
                      className={`p-3 rounded-md border text-left flex items-start gap-3 transition-colors ${
                        paymentMethod === 'DirectTransfer'
                          ? 'border-terracotta bg-paper ring-1 ring-terracotta/30'
                          : 'border-border bg-surface hover:bg-paper'
                      }`}
                    >
                      <Building className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-ink block">Artisan Guild Bank Transfer</span>
                        <span className="text-[11px] text-muted leading-tight block">
                          NEFT / IMPS to Registered Weavers / Casters Society
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Card')}
                      className={`p-3 rounded-md border text-left flex items-start gap-3 transition-colors ${
                        paymentMethod === 'Card'
                          ? 'border-terracotta bg-paper ring-1 ring-terracotta/30'
                          : 'border-border bg-surface hover:bg-paper'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-ink block">Cards & NetBanking</span>
                        <span className="text-[11px] text-muted leading-tight block">
                          RuPay, Visa, Mastercard & SBI/HDFC/ICICI NetBanking
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Simulated UPI QR Panel if UPI selected */}
                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-md bg-paper border border-border flex flex-col sm:flex-row items-center gap-4 text-xs font-mono">
                    <div className="w-24 h-24 bg-white p-2 rounded border border-stone-300 flex items-center justify-center shrink-0">
                      <QrCode className="w-20 h-20 text-stone-950" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-terracotta font-semibold text-sm">Direct Artisan Guild VPA</span>
                      <p className="text-xs text-ink font-semibold select-all">parampara.artisan.guild@sbi</p>
                      <p className="text-[11px] text-muted font-sans leading-relaxed">
                        Scan with Google Pay, PhonePe, or BHIM. Amount: ₹{cartTotal.toLocaleString('en-IN')}.
                        100% credited without payment gateway commissions.
                      </p>
                    </div>
                  </div>
                )}

                {/* Order Summary breakdown */}
                <div className="p-3.5 rounded-md bg-surface border border-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-muted">
                    <span>Selected Artefacts ({cart.length})</span>
                    <span className="text-ink">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Artisan Society Compensation</span>
                    <span className="text-sage">100% (₹{cartTotal.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Platform Commission</span>
                    <span className="text-sage">₹0</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Packaging & Express Transport</span>
                    <span className="text-sage">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between text-sm font-semibold text-ink">
                    <span>Total Payable</span>
                    <span className="text-base text-terracotta">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="h-9 px-3 rounded-md bg-surface border border-border text-muted hover:text-ink text-xs transition-colors"
                  >
                    ← Back to Details
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handlePlaceOrder}
                    className="h-10 px-6 rounded-md bg-terracotta hover:bg-terracotta-hover disabled:opacity-50 text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {loading ? (
                      <span>Confirming with Guild Ledger...</span>
                    ) : (
                      <>
                        <span>Authorize Acquisition</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ORDER CONFIRMATION & DIGITAL AUTHENTICITY CERTIFICATE */}
            {step === 'confirmation' && receipt && (
              <div className="space-y-5 text-center sm:text-left">
                <div className="flex items-center gap-3 p-4 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Acquisition Confirmed with Master Artisan Guild</h4>
                    <p className="text-[11px] opacity-90 mt-0.5">
                      Order Reference: <strong>{receipt.order_id}</strong> • Estimated Delivery: <strong>{receipt.estimated_delivery}</strong>
                    </p>
                  </div>
                </div>

                {/* Digital Certificate of Cultural Authenticity Card */}
                <div className="p-5 rounded-md bg-paper border border-border space-y-4 shadow-card">
                  <div className="flex items-start justify-between border-b border-border pb-3">
                    <div>
                      <span className="text-xs font-mono text-terracotta">
                        Government of India GI linked provenance
                      </span>
                      <h4 className="font-editorial text-lg text-ink font-semibold">
                        Certificate of Cultural Authenticity
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-muted font-semibold bg-surface border border-border px-2 py-0.5 rounded-sm">
                        {receipt.certificate_id}
                      </span>
                      <button
                        onClick={copyCertificate}
                        className="p-1 rounded text-muted hover:text-ink hover:bg-surface transition-colors"
                        title="Copy Certificate ID"
                      >
                        {copiedCert ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-surface border border-border">
                      <span className="text-muted block text-[10px]">Patron</span>
                      <span className="text-ink truncate block">{receipt.customer_name}</span>
                    </div>
                    <div className="p-2 rounded bg-surface border border-border">
                      <span className="text-muted block text-[10px]">Direct Payout</span>
                      <span className="text-sage truncate block">100% to Guild</span>
                    </div>
                    <div className="p-2 rounded bg-surface border border-border">
                      <span className="text-muted block text-[10px]">Platform Fee</span>
                      <span className="text-sage truncate block">₹0.00</span>
                    </div>
                    <div className="p-2 rounded bg-surface border border-border">
                      <span className="text-muted block text-[10px]">Dispatched To</span>
                      <span className="text-ink truncate block">{city}, {state}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted leading-relaxed font-sans bg-surface p-3 rounded border border-border">
                    This document certifies that your acquisition was created by verified generational mastercraftspersons without intermediate factory mass-replication.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={receipt.whatsapp_tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-10 px-4 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Connect with artisan guild on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="h-10 px-4 rounded-md bg-surface border border-border hover:bg-paper text-ink text-xs font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5 text-muted" />
                    <span>Print authenticity certificate</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={onClose}
                    className="text-xs text-muted hover:text-ink font-mono underline underline-offset-4"
                  >
                    Return to heritage bazaar
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
