"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { PRINT_SIZES } from "@/data/print-sizes";
import { useStudio } from "@/context/StudioContext";

interface StudioReviewProps {
  onBackToConfigure: () => void;
}

export function StudioReview({ onBackToConfigure }: StudioReviewProps) {
  const {
    selectedTemplates,
    selectedArtworks,
    toggleArtworkSelection,
    updateArtworkSize,
    updateArtworkQuantity,
    customText,
    combinedStatus,
    generateCombined,
    cartItems,
    cartSubtotal,
    setIsCartOpen,
  } = useStudio();

  return (
    <div className="mt-6 sm:mt-8 space-y-6">
      <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/60 p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            ✓ Generation Complete
          </span>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mt-0.5">Review &amp; Select Posters for Print</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Choose any combination of ready artworks. Configure independent sizes and quantities below.
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onBackToConfigure}
            className="flex-1 sm:flex-initial text-center rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
          >
            ← Adjust Inputs
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 sm:flex-initial text-center rounded-xl bg-brand px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand/30 cursor-pointer whitespace-nowrap"
          >
            View Cart ({cartItems.length})
          </button>
        </div>
      </div>

      {/* Generated Artworks Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selectedTemplates.map((id) => {
          const tpl = TEMPLATES.find((t) => t.id === id);
          if (!tpl) return null;
          const itemState = selectedArtworks[id] || { selected: true, size: "a2", quantity: 1 };
          const currentSize = PRINT_SIZES.find((s) => s.id === itemState.size) || PRINT_SIZES[1];

          return (
            <div
              key={id}
              className={`rounded-2xl sm:rounded-3xl border p-3.5 sm:p-4.5 transition-all duration-300 ${
                itemState.selected
                  ? "border-brand bg-neutral-900/80 shadow-2xl shadow-brand/10"
                  : "border-white/10 bg-neutral-900/30 opacity-70"
              }`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg">
                <Image
                  src={tpl.image}
                  alt={tpl.name}
                  fill
                  className="object-cover filter contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleArtworkSelection(id)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
                      itemState.selected
                        ? "border-brand bg-brand text-white shadow-md"
                        : "border-white/30 bg-black/60 text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                    {tpl.category}
                  </span>
                  <div className="text-sm font-bold text-white">{tpl.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono truncate">{customText}</div>
                </div>
              </div>

              {/* Sizing & Quantity Configuration */}
              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Select Fine Art Print Size
                  </label>
                  <select
                    value={itemState.size}
                    onChange={(e) => updateArtworkSize(id, e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black/70 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                  >
                    {PRINT_SIZES.map((size) => (
                      <option key={size.id} value={size.id} className="bg-neutral-900 text-white">
                        {size.label} ({size.dimensions}) — {size.price} {size.popular ? "★ Popular" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.08] pt-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500">Unit Price</div>
                    <div className="text-base font-bold text-white">{currentSize.price}</div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2 py-1">
                    <button
                      onClick={() => updateArtworkQuantity(id, -1)}
                      className="h-6 w-6 rounded text-neutral-400 hover:bg-white/10 hover:text-white"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-xs font-semibold text-white">
                      {itemState.quantity}
                    </span>
                    <button
                      onClick={() => updateArtworkQuantity(id, 1)}
                      className="h-6 w-6 rounded text-neutral-400 hover:bg-white/10 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OPTIONAL COMBINED TRIPTYCH PREVIEW */}
      {selectedTemplates.length >= 2 && (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-brand/40 bg-gradient-to-r from-neutral-900/80 via-black/80 to-neutral-900/80 p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-300">
                ✦ Multi-Template Privilege
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">Optional Combined Triptych Preview</h4>
              <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
                Because you selected {selectedTemplates.length} templates (
                {selectedTemplates.map((id) => TEMPLATES.find((t) => t.id === id)?.name).join(", ")}), you are
                eligible for one combined composite artwork blending all perspectives.
              </p>
            </div>

            <div>
              {combinedStatus === "idle" && (
                <button
                  onClick={generateCombined}
                  className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-purple-200 transition-all hover:bg-purple-500/20 shadow-lg cursor-pointer"
                >
                  Generate Combined Artwork →
                </button>
              )}
              {combinedStatus === "processing" && (
                <div className="flex items-center gap-2 rounded-xl bg-purple-950/40 border border-purple-500/40 px-5 py-2.5 text-xs text-purple-300 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                  <span>Rendering composite triptych...</span>
                </div>
              )}
              {combinedStatus === "completed" && (
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400">
                  ✓ Triptych Artwork Ready
                </span>
              )}
            </div>
          </div>

          {combinedStatus === "completed" && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-4">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/15">
                <Image
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=85"
                  alt="Combined Triptych Master Render"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <div className="text-base font-bold text-white">Harmonized Automotive Triptych</div>
                    <div className="text-[11px] text-neutral-400">
                      Blending: {selectedTemplates.map((id) => TEMPLATES.find((t) => t.id === id)?.name).join(" + ")}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-brand">$389 (Panoramic Grand)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Checkout Action */}
      <div className="rounded-2xl border border-white/10 bg-black/60 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">
            Ready Artworks in Cart
          </span>
          <div className="text-lg sm:text-xl font-bold text-white">
            {cartItems.length} Posters Selected · Subtotal:{" "}
            <span className="text-brand">${cartSubtotal}</span>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full sm:w-auto rounded-xl bg-brand hover:bg-brand-hover px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all cursor-pointer text-center"
        >
          Open Cart &amp; Review Dispatch (${cartSubtotal}) →
        </button>
      </div>
    </div>
  );
}

