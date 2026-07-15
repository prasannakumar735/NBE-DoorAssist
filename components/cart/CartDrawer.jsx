import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, shipping, total } = useCart();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[200]"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[201] shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <h2 className="text-lg font-heading font-bold uppercase tracking-wide text-ink flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand" />
                Your cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 text-on-surface-variant hover:text-ink transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="w-10 h-10 text-line mb-4" />
                <p className="text-on-surface-variant">Your cart is empty.</p>
                <Link
                  to="/strip-rolls"
                  onClick={closeCart}
                  className="mt-5 text-sm font-semibold text-brand hover:text-brandDark"
                >
                  Browse strip rolls →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs bg-surface-low border border-line rounded-lg px-3 py-2 text-on-surface-variant">
                      Add {formatCurrency(remainingForFreeShipping)} more for free delivery.
                    </p>
                  )}
                  {items.map((item) => (
                    <div key={item.sku} className="flex gap-4 pb-5 border-b border-line last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink leading-snug">{item.name}</p>
                        <p className="font-mono-spec text-xs text-on-surface-variant mt-1">{item.sku}</p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center border border-line rounded-md">
                            <button
                              type="button"
                              onClick={() => updateQty(item.sku, item.qty - 1)}
                              className="p-1.5 text-on-surface-variant hover:text-brand disabled:opacity-30"
                              disabled={item.qty <= 1}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-mono-spec">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.sku, item.qty + 1)}
                              className="p-1.5 text-on-surface-variant hover:text-brand"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-mono-spec font-semibold text-ink">
                            {formatCurrency(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.sku)}
                        className="text-on-surface-variant hover:text-red-600 transition-colors self-start"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 border-t border-line space-y-2">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-mono-spec">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Delivery</span>
                    <span className="font-mono-spec">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-ink pt-2">
                    <span>Total</span>
                    <span className="font-mono-spec">{formatCurrency(total)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="mt-3 block text-center bg-brand hover:bg-brandDark text-white font-semibold uppercase tracking-wide text-sm py-3.5 rounded-lg transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
