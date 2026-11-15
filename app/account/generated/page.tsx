"use client";

import { useState, useEffect } from "react";
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
  ChevronDown,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { AccountNav } from "@/components/account/AccountNav";
import { GeneratedArtwork } from "@/types";
import { getAvailableSizesForArtwork } from "@/lib/templateSizes";

export default function AccountGeneratedPostersPage() {
  const {
    generatedArtworks,
    selectedTemplates,
    toggleArtworkSelection,
    updateArtworkSize,
    setIsCartOpen,
    cartItems,
  } = useStudio();

  const [inspectIndex, setInspectIndex] = useState<number | null>(null);
  const [openSizeMenuId, setOpenSizeMenuId] = useState<string | null>(null);

  // Close size popover on outside click or escape
  useEffect(() => {
    if (!openSizeMenuId) return;

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".size-menu-container")) {
        setOpenSizeMenuId(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenSizeMenuId(null);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSizeMenuId]);

  const currentArtwork: GeneratedArtwork | null =
    inspectIndex !== null && generatedArtworks[inspectIndex]
      ? generatedArtworks[inspectIndex]
      : null;

  const modalSizes = currentArtwork
    ? getAvailableSizesForArtwork(currentArtwork, selectedTemplates)
    : [];

  const currentSizeObj = currentArtwork
    ? modalSizes.find((s) => s.id === currentArtwork.size) || modalSizes[0]
    : null;

  const selectedCount = generatedArtworks.filter((a) => a.selected).length;

  return (
    <div className="min-h-screen bg-bg-primary pb-28">
      {/* Shared Account Navigation Tabs */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8">
        {/* Subsection Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-3.5 sm:mb-6">
          <div>
            <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white">
              Generated Posters &amp; Variations
            </h1>
    
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-1 rounded-lg sm:rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                <ShoppingBag size={13} className="text-brand" />
                <span>Cart ({cartItems.length})</span>
              </button>
            )}
          </div>
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
              const availableSizes = getAvailableSizesForArtwork(art, selectedTemplates);
              const sizeObj =
                availableSizes.find((s) => s.id === art.size) || availableSizes[0];
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
                    {/* Size Selector Button & Popover */}
                    <div className="relative size-menu-container">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        <span>Print Size</span>
                        <span className="text-neutral-500 font-mono text-[9px]">{sizeObj.dimensions}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpenSizeMenuId(openSizeMenuId === art.id ? null : art.id)}
                        className={`w-full flex items-center justify-between gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs transition-all cursor-pointer group ${
                          openSizeMenuId === art.id
                            ? "border-brand bg-brand/10 ring-1 ring-brand/40 text-white shadow-sm"
                            : "border-white/15 bg-black/60 hover:bg-black/90 hover:border-white/30 text-neutral-200"
                        }`}
                        title="Click to choose available size for this template"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-bold text-white text-xs truncate">
                            {sizeObj.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline truncate">
                            ({sizeObj.dimensions})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="font-mono font-bold text-brand text-xs">
                            {sizeObj.price}
                          </span>
                          <ChevronDown
                            className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 group-hover:text-white ${
                              openSizeMenuId === art.id ? "rotate-180 text-white" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Available Sizes Dropdown Popover (Solid Opaque Background + Blur) */}
                      {openSizeMenuId === art.id && (
                        <div
                          className="absolute left-0 right-0 bottom-full mb-1.5 z-50 rounded-xl border border-white/20 bg-[#15161c] p-2 shadow-2xl shadow-black/95 ring-1 ring-white/10 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150"
                          style={{ backgroundColor: "#15161c" }}
                        >
                          <div className="px-2 py-1 border-b border-white/[0.08] flex items-center justify-between text-[10px] text-neutral-400 uppercase font-semibold tracking-wider">
                            <span>Available Sizes</span>
                            <span className="text-brand font-mono text-[9px]">
                              {availableSizes.length} option{availableSizes.length > 1 ? "s" : ""}
                            </span>
                          </div>

                          <div className="mt-1 space-y-1 max-h-48 overflow-y-auto pr-0.5">
                            {availableSizes.map((size) => {
                              const isSelected = sizeObj.id === size.id;
                              return (
                                <button
                                  key={size.id}
                                  type="button"
                                  onClick={() => {
                                    updateArtworkSize(art.id, size.id);
                                    setOpenSizeMenuId(null);
                                  }}
                                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-brand/20 text-white border border-brand/50 font-semibold shadow-sm"
                                      : "text-neutral-300 hover:bg-white/[0.08] hover:text-white border border-transparent"
                                  }`}
                                >
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-xs text-white">{size.name}</span>
                                      {size.isPopular && (
                                        <span className="rounded bg-brand/25 border border-brand/40 px-1 py-0.2 text-[8px] font-bold text-brand uppercase">
                                          Popular
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                                      {size.dimensions}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="font-mono font-bold text-brand text-xs">
                                      {size.price}
                                    </span>
                                    {isSelected ? (
                                      <Check className="h-3.5 w-3.5 text-brand stroke-[2.5]" />
                                    ) : (
                                      <span className="w-3.5" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
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
                      {modalSizes.map((size) => {
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
                                {size.name}
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
                          <span>Select for Print ({currentSizeObj?.price || "₹1,299"})</span>
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
