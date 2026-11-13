"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, cartSubtotal } = useStudio();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <div className="relative h-full w-full max-w-md border-l border-white/10 bg-[#0E1012] p-6 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#D9272E]" />
              <h3 className="text-base font-bold text-white tracking-wide">Studio Print Cart</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4">
            <span className="text-xs font-medium text-neutral-400">
              Configured Artworks ({cartItems.length} selected for physical print)
            </span>

            {cartItems.length === 0 ? (
              <div className="mt-12 text-center text-xs text-neutral-500">
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
              <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-14 overflow-hidden rounded-lg bg-black">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white truncate max-w-[170px]">{item.title}</div>
                        <div className="text-[10px] text-neutral-400">
                          {item.size} ({item.dimensions}) × {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#D9272E]">${item.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-6 rounded-xl border border-white/10 bg-neutral-900/60 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Artworks Subtotal:</span>
                  <span className="text-white font-semibold">${cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Museum Archival Packaging:</span>
                  <span className="text-emerald-400 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Insured Express Dispatch:</span>
                  <span className="text-white font-semibold">$25</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm">
                  <span className="text-white">Estimated Total:</span>
                  <span className="text-[#D9272E]">${cartSubtotal + 25}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <button
            onClick={() => {
              setIsCartOpen(false);
              alert("Order prototype checkout summary noted! Front-end prototype validated.");
            }}
            disabled={cartItems.length === 0}
            className="w-full rounded-xl bg-gradient-to-r from-[#D9272E] to-[#B01A20] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#D9272E]/30 disabled:opacity-40"
          >
            Proceed to Checkout (${cartItems.length > 0 ? cartSubtotal + 25 : 0})
          </button>
        </div>
      </div>
    </div>
  );
}
