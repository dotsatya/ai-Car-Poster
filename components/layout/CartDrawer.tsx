"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartSubtotal,
    removeDirectCartItem,
    updateDirectCartQuantity,
  } = useCart();

  if (!isCartOpen) return null;

  const hasInrItems = cartItems.some((i) => i.currency === "INR" || i.price >= 200);

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-[9999] flex justify-end bg-black/75 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-full h-dvh w-full max-w-full sm:max-w-md border-l border-white/10 bg-bg-primary p-5 sm:p-6 shadow-2xl flex flex-col justify-between"
      >
        {/* Pinned Top Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand" />
            <h3 className="text-base font-bold text-white tracking-wide">Studio Print Cart</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Cart Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto py-4 pr-1 space-y-4">
          <span className="text-xs font-medium text-neutral-400 block">
            Configured Artworks ({cartItems.length} selected for physical print)
          </span>

          {cartItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              No generated posters selected for print yet. Run the studio generator to review previews and choose sizes.
              <div className="mt-4">
                <Link
                  href="/studio"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block rounded-xl bg-white/[0.06] hover:bg-white/10 px-4 py-2 text-xs font-semibold text-white"
                >
                  Open Studio →
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const isINR = item.currency === "INR" || item.price >= 200;
                const formattedTotal = isINR
                  ? `₹${item.total.toLocaleString("en-IN")}`
                  : `$${item.total}`;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-14 overflow-hidden rounded-lg bg-black shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[170px]">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {item.size} {item.gsm ? `• ${item.gsm}` : ""}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          {item.dimensions}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1.5">
                      <span className="text-xs font-bold text-brand">{formattedTotal}</span>
                      {/* If direct item, show quick quantity adjustments and trash */}
                      {item.id.includes("-") && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateDirectCartQuantity(item.id, -1)}
                            className="h-5 w-5 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-[10px]"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="text-[10px] font-semibold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateDirectCartQuantity(item.id, 1)}
                            className="h-5 w-5 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-[10px]"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeDirectCartItem(item.id)}
                            className="ml-1 text-neutral-500 hover:text-red-400 p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {!item.id.includes("-") && (
                        <span className="text-[10px] text-neutral-400">× {item.quantity}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-4 rounded-xl border border-white/[0.08] bg-neutral-900/60 p-4 space-y-2 text-xs hover:border-white/20 transition-all duration-300">
              <div className="flex justify-between text-neutral-400">
                <span>Artworks Subtotal:</span>
                <span className="text-white font-semibold">
                  {hasInrItems ? `₹${cartSubtotal.toLocaleString("en-IN")}` : `$${cartSubtotal}`}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Museum Archival Packaging:</span>
                <span className="text-emerald-400 font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Insured Express Dispatch:</span>
                <span className="text-white font-semibold">{hasInrItems ? "₹199" : "$25"}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm">
                <span className="text-white">Estimated Total:</span>
                <span className="text-brand">
                  {hasInrItems
                    ? `₹${(cartSubtotal + 199).toLocaleString("en-IN")}`
                    : `$${cartSubtotal + 25}`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Pinned Bottom Checkout Bar with Safe Area */}
        <div className="shrink-0 border-t border-white/10 pt-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <Link
            href="/checkout"
            onClick={() => setIsCartOpen(false)}
            className={`w-full inline-flex items-center justify-center rounded-xl bg-brand hover:bg-brand-hover py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] ${
              cartItems.length === 0 ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            Proceed to Checkout ({hasInrItems ? `₹${(cartSubtotal + 199).toLocaleString("en-IN")}` : `$${cartSubtotal + 25}`})
          </Link>
        </div>
      </div>
    </div>
  );
}
