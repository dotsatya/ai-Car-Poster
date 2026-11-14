"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  Sparkles,
  ShoppingBag,
  Check,
  Plus,
  Eye,
  X,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { AccountNav } from "@/components/account/AccountNav";
import { PRINT_SIZES } from "@/data/print-sizes";
import { GeneratedArtwork } from "@/types";

export default function AccountGeneratedPostersPage() {
  const {
    generatedArtworks,
    toggleArtworkSelection,
    updateArtworkSize,
    setIsCartOpen,
    cartItems,
  } = useStudio();

  const [inspectIndex, setInspectIndex] = useState<number | null>(null);

  const currentArtwork: GeneratedArtwork | null =
    inspectIndex !== null && generatedArtworks[inspectIndex]
      ? generatedArtworks[inspectIndex]
      : null;

  const currentSizeObj = currentArtwork
    ? PRINT_SIZES.find((s) => s.id === currentArtwork.size) || PRINT_SIZES[3]
    : PRINT_SIZES[3];

  const selectedCount = generatedArtworks.filter((a) => a.selected).length;

  return (
    <div className="min-h-screen bg-bg-primary pb-28">
      {/* Shared Account Navigation Tabs */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {/* Subsection Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              Generated Posters &amp; Variations
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Explore your personal AI diffusion variations before ordering fine-art giclée prints.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                <ShoppingBag size={14} className="text-brand" />
                <span>Cart ({cartItems.length})</span>
              </button>
            )}

            <Link
              href="/studio"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            >
              <Wand2 size={13} />
              <span>New Generation</span>
            </Link>
          </div>
        </div>

        {/* Sub-bar metadata row */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
          <span>
            Showing {generatedArtworks.length} generated artwork{generatedArtworks.length !== 1 ? "s" : ""}
          </span>
          <span>Available for physical print &amp; studio generation</span>
        </div>

        {/* Empty State */}
        {generatedArtworks.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-neutral-900/40 p-10 sm:p-16 text-center max-w-2xl mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 border border-brand/20 text-brand mb-4">
              <Sparkles size={24} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">No AI Posters Generated Yet</h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
              Upload your personal car photograph in the Creation Studio and select up to 3 templates to render 4 bespoke museum-grade poster variations.
            </p>
            <div className="mt-6">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Launch Poster Studio</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* 4-Column Generated Posters Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {generatedArtworks.map((art, idx) => {
              const sizeObj =
                PRINT_SIZES.find((s) => s.id === art.size) || PRINT_SIZES[3];
              const formattedPrice = `₹${(sizeObj.priceNum * art.quantity).toLocaleString("en-IN")}`;

              return (
                <div
                  key={art.id}
                  className={`group relative rounded-xl border bg-neutral-900/50 p-3 sm:p-3.5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between hover:border-white/25 hover:shadow-xl hover:shadow-black/70 ${
                    art.selected
                      ? "border-brand/70 bg-neutral-900/90 ring-1 ring-brand/30"
                      : "border-white/[0.08]"
                  }`}
                >
                  {/* Poster Thumbnail Image with Aspect Ratio 3:4 */}
                  <div>
                    <div
                      onClick={() => setInspectIndex(idx)}
                      className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black border border-white/[0.08] cursor-pointer group/img"
                    >
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                      {/* Top Badge: Variation Label */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="rounded-full bg-black/70 border border-white/15 px-2.5 py-0.5 text-[9px] font-bold text-white tracking-wider backdrop-blur-md">
                          {art.badge}
                        </span>
                        {art.selected && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/40 animate-in zoom-in-75">
                            <Check size={13} strokeWidth={3} />
                          </span>
                        )}
                      </div>

                      {/* Hover Overlay with Preview Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 text-black px-3 py-1 text-xs font-bold shadow-lg">
                          <Eye size={13} />
                          <span>Inspect 300+ DPI</span>
                        </span>
                      </div>

                      {/* Bottom Image Info Tag */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/90 font-mono">
                        <span className="rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-md border border-white/10">
                          3:4 Fine Art
                        </span>
                        <span className="rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-md border border-white/10">
                          300+ DPI
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h3
                          className="font-sans normal-case text-sm font-bold text-white truncate"
                          title={art.title}
                        >
                          {art.title}
                        </h3>
                        <span className="text-xs font-bold text-brand shrink-0">
                          {formattedPrice}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {art.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Print Selection Button */}
                  <div className="mt-3.5 pt-3 border-t border-white/[0.08] space-y-2">
                    {/* Size Selector */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="font-mono">{sizeObj.label} ({sizeObj.dimensions})</span>
                      <button
                        type="button"
                        onClick={() => setInspectIndex(idx)}
                        className="text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Change Size
                      </button>
                    </div>

                    {/* Print Selection Action Button */}
                    <button
                      type="button"
                      onClick={() => toggleArtworkSelection(art.id)}
                      className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.98] ${
                        art.selected
                          ? "bg-brand text-white shadow-brand/30 hover:bg-brand-hover hover:shadow-brand/50 ring-1 ring-brand/50"
                          : "border border-white/20 bg-white/[0.05] text-neutral-200 hover:border-brand/70 hover:bg-brand/10 hover:text-white"
                      }`}
                    >
                      {art.selected ? (
                        <>
                          <Check className="h-4 w-4 stroke-[2.5]" />
                          <span>Selected for Print</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Select to Print</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Cart Callout Bar */}
        {selectedCount > 0 && (
          <div className="mt-8 rounded-xl border border-brand/40 bg-gradient-to-r from-brand/15 via-neutral-900/90 to-neutral-950 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white text-[10px] font-bold">
                  {selectedCount}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Posters Ready in Studio Print Cart
                </h3>
              </div>
              <p className="text-[11px] text-neutral-300 mt-0.5">
                Your chosen AI poster variations are queued with 12-color archival giclée plotter specifications.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto rounded-xl bg-brand hover:bg-brand-hover px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] whitespace-nowrap text-center"
            >
              Open Print Cart ({selectedCount}) →
            </button>
          </div>
        )}
      </main>

      {/* Gallery-Grade High-Resolution Modal View */}
      {currentArtwork &&
        inspectIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="artwork-preview-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setInspectIndex(null);
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/15 bg-[#101114] shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectIndex(null)}
                className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-neutral-300 hover:text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Left Column: High-Res Vertical Poster Visual */}
              <div className="relative w-full lg:w-1/2 aspect-[3/4] max-h-[50vh] lg:max-h-[92vh] bg-black shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center p-3 sm:p-6">
                <div className="relative aspect-[3/4] h-full w-auto max-w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Column: Specifications & Controls */}
              <div className="flex-1 p-5 sm:p-7 overflow-y-auto flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand/15 border border-brand/30 px-2.5 py-0.5 text-[10px] font-bold text-brand uppercase tracking-wider">
                      {currentArtwork.badge}
                    </span>
                    <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-neutral-300">
                      300+ DPI Archival Giclée
                    </span>
                  </div>

                  <h2
                    id="artwork-preview-title"
                    className="mt-2 text-lg sm:text-xl font-bold text-white tracking-wide"
                  >
                    {currentArtwork.title}
                  </h2>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    {currentArtwork.subtitle}
                  </p>

                  {/* Size Options Grid */}
                  <div className="mt-5 space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Select Physical Print Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PRINT_SIZES.map((size) => {
                        const isSizeActive = currentArtwork.size === size.id;
                        return (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() => updateArtworkSize(currentArtwork.id, size.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSizeActive
                                ? "border-brand bg-brand/10 ring-1 ring-brand text-white shadow-sm"
                                : "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">
                                {size.label}
                              </span>
                              <span className="text-xs font-mono font-bold text-brand">
                                {size.price}
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-400 block mt-0.5">
                              {size.dimensions}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Archival Packaging:</span>
                    <span className="text-white font-medium">CNC Kraft Protective Tube Included</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleArtworkSelection(currentArtwork.id)}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.98] ${
                        currentArtwork.selected
                          ? "bg-brand text-white shadow-brand/30 hover:bg-brand-hover hover:shadow-brand/50 ring-1 ring-brand"
                          : "border border-white/20 bg-white/[0.06] hover:border-brand hover:bg-brand hover:text-white text-white"
                      }`}
                    >
                      {currentArtwork.selected ? (
                        <>
                          <Check className="h-4 w-4 stroke-[2.5]" />
                          <span>Selected for Print · In Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" />
                          <span>Select for Print ({currentSizeObj.price})</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setInspectIndex(null)}
                      className="rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
