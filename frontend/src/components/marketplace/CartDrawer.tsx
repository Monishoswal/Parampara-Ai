import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  IndianRupee
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount
  } = useApp();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-surface border-l border-border shadow-2xl flex flex-col justify-between"
            >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-paper">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-terracotta" />
                <h3 className="font-editorial text-lg text-ink font-semibold">
                  Artisan Acquisition Vault
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-surface border border-border text-muted">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded text-muted hover:text-ink hover:bg-surface transition-colors"
                title="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4 text-muted">
                  <div className="w-12 h-12 rounded-md bg-paper border border-border flex items-center justify-center mx-auto text-muted">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-ink">Your vault is empty</h4>
                    <p className="text-xs text-muted max-w-xs mx-auto">
                      Explore the Bazaar to discover authentic, verified handcrafts directly from Indian master artisans.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-md bg-paper border border-border flex gap-3 items-start"
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.title}
                        className="w-16 h-16 rounded object-cover border border-border flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-ink line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted hover:text-red-500 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[10px] font-mono text-muted truncate">
                          Maker: {item.product.artisan_name}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-1.5 bg-surface border border-border rounded px-1.5 py-0.5 text-xs">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-muted hover:text-ink p-0.5"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs w-4 text-center text-ink font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-muted hover:text-ink p-0.5"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Unit / Total Price */}
                          <div className="text-right">
                            <span className="font-mono text-xs font-semibold text-ink">
                              ₹{((item.product.price_inr || 0) * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Zero-Commission Commitment Callout */}
              {cart.length > 0 && (
                <div className="p-3 rounded-md bg-surface border border-border text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-sage font-medium text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% direct artisan livelihood</span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">
                    PARAMPARA AI charges zero commission on craft transactions. Your payment goes straight to the master artisan guilds.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-border bg-paper space-y-3">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-muted">
                    <span>Artisan Handcraft Total</span>
                    <span className="text-ink font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Platform Commission (0%)</span>
                    <span className="text-sage font-medium">₹0</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Insured Packaging & Transport</span>
                    <span className="text-sage font-medium">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between text-sm font-semibold text-ink">
                    <span>Total Amount</span>
                    <span className="text-base text-terracotta font-editorial">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onOpenCheckout();
                    }}
                    className="w-full h-11 rounded-md bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Proceed to Direct Acquisition</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full h-9 rounded-md bg-surface border border-border text-muted hover:text-ink text-xs font-medium transition-colors"
                  >
                    Continue Exploring Crafts
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
};
