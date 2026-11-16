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

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-10">
        {/* Subsection Header */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider text-white">
              Generated Posters &amp; Variations
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
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
          /* Responsive Posters Grid: 2 in a row on mobile, 3 on tablet, 4 on desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {generatedArtworks.map((art, idx) => {
              const availableSizes = getAvailableSizesForArtwork(art, selectedTemplates);
              const sizeObj =
                availableSizes.find((s) => s.id === art.size) || availableSizes[0];
              const formattedPrice = `₹${(sizeObj.priceNum * art.quantity).toLocaleString("en-IN")}`;

              return (
                <div
                  key={art.id}
                  className={`group relative flex flex-col justify-between rounded-xl border transition-all duration-300 ${
                    openSizeMenuId === art.id ? "z-40" : "z-10"
                  } ${
                    art.selected
                      ? "border-brand/50 bg-[#111114] shadow-[0_0_15px_rgba(217,39,46,0.18)] ring-1 ring-brand/20 -translate-y-1"
                      : "border-white/[0.08] bg-[#111114] hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80"
                  }`}
                >
                  {/* Poster Thumbnail & Interactive Card Body */}
                  <div
                    onClick={() => setInspectIndex(idx)}
                    className="block p-2 sm:p-2.5 sm:pb-3 cursor-pointer"
                  >
                    {/* Poster Image Container */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg sm:rounded-xl bg-black">
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Hover Overlay with specs & inspect hint */}
                      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                        <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {art.title}
                        </p>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-neutral-300 leading-relaxed line-clamp-2 font-medium">
                          {art.subtitle}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-neutral-400 font-mono">
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                            300+ DPI
                          </span>
                          <span>•</span>
                          <span>{sizeObj.name}</span>
                        </div>
                      </div>

                      {/* Bottom Image Info Tag in default state */}
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[9px] text-white/90 font-mono pointer-events-none group-hover:opacity-0 transition-opacity">
                        <span className="rounded-full bg-black/60 px-1.5 py-0.5 backdrop-blur-md border border-white/10">
                          {sizeObj.name}
                        </span>
                        <span className="rounded-full bg-black/60 px-1.5 py-0.5 backdrop-blur-md border border-white/10 flex items-center gap-1">
                          <Eye size={9} className="text-brand inline sm:hidden" />
                          <span>300+ DPI</span>
                        </span>
                      </div>
                    </div>

                    {/* Info Area Below Image */}
                    <div className="mt-2 sm:mt-2.5 px-0.5">
                      <h3 className="font-sans normal-case text-xs sm:text-sm font-bold text-white tracking-wide truncate group-hover:text-brand transition-colors">
                        {art.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-neutral-400 truncate font-sans">
                        {art.subtitle}
                      </p>

                      {/* Bottom Row: "+ Add" Button on the Left; Price on the Right */}
                      <div className="relative size-menu-container mt-2 pt-1.5 flex items-center justify-between border-t border-white/[0.06]">
                        {/* Bottom Left: "+ Add" / "✓ Added" Button */}
                        <div className="relative group/btn">
                          <button
                            type="button"
                            aria-label={
                              art.selected ? "Remove from Print Selection" : "Add to Print Selection"
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleArtworkSelection(art.id);
                            }}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.98] ${
                              art.selected
                                ? "bg-brand/90 text-white shadow-brand/30 hover:shadow-brand/50 ring-1 ring-brand/35 hover:bg-brand"
                                : "border border-white/20 bg-white/[0.06] text-white hover:border-brand/60 hover:bg-brand/80 hover:text-white hover:shadow-sm hover:shadow-brand/30"
                            }`}
                          >
                            {art.selected ? (
                              <>
                                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                                <span className="hidden sm:inline">Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                                <span className="hidden sm:inline">Add</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Bottom Right: Price with Quick Size Selector Trigger */}
                        <div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setOpenSizeMenuId(openSizeMenuId === art.id ? null : art.id);
                            }}
                            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-white hover:text-brand transition-colors cursor-pointer group/price"
                            title="Click to choose print size"
                          >
                            <span className="font-mono text-xs sm:text-sm font-bold text-white group-hover/price:text-brand">
                              {formattedPrice}
                            </span>
                            <ChevronDown
                              className={`h-3 w-3 text-neutral-400 group-hover/price:text-brand transition-transform duration-200 ${
                                openSizeMenuId === art.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {/* Available Sizes Dropdown Popover (Positioned directly above the bottom row) */}
                        {openSizeMenuId === art.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute bottom-full mb-1.5 z-50 rounded-xl border border-white/20 bg-[#15161c] p-2 sm:p-2.5 shadow-2xl shadow-black/95 ring-1 ring-white/10 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 w-[220px] sm:w-[240px] max-w-[calc(100vw-28px)] ${
                              idx % 2 === 0
                                ? "left-0 sm:left-auto sm:right-0"
                                : "right-0"
                            }`}
                            style={{ backgroundColor: "#15161c" }}
                          >
                            <div className="px-2 py-1.5 border-b border-white/[0.08] flex items-center justify-between text-[10px] text-neutral-400 uppercase font-semibold tracking-wider gap-2">
                              <span className="whitespace-nowrap">Print Size</span>
                              <span className="text-brand font-mono text-[9px] whitespace-nowrap">
                                {availableSizes.length} sizes
                              </span>
                            </div>

                            <div className="mt-1 space-y-1 max-h-52 overflow-y-auto pr-1">
                                {availableSizes.map((size) => {
                                  const isSelected = sizeObj.id === size.id;
                                  return (
                                    <button
                                      key={size.id}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateArtworkSize(art.id, size.id);
                                        setOpenSizeMenuId(null);
                                      }}
                                      className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-all cursor-pointer ${
                                        isSelected
                                          ? "bg-brand/20 text-white border border-brand/50 font-semibold shadow-sm"
                                          : "text-neutral-300 hover:bg-white/[0.08] hover:text-white border border-transparent"
                                      }`}
                                    >
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="font-bold text-xs text-white whitespace-nowrap">
                                            {size.name}
                                          </span>
                                          {size.isPopular && (
                                            <span className="rounded bg-brand/25 border border-brand/40 px-1 py-0.2 text-[7px] font-bold text-brand uppercase tracking-wider shrink-0">
                                              Popular
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[10px] text-neutral-400 font-mono block mt-0.5 whitespace-nowrap">
                                          {size.dimensions}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                        <span className="font-mono font-bold text-brand text-xs whitespace-nowrap">
                                          {size.price}
                                        </span>
                                        {isSelected && (
                                          <Check className="h-3.5 w-3.5 text-brand stroke-[2.5]" />
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        )}

        {/* Bottom Cart Callout Bar */}
        {selectedCount > 0 && (
          <div className="mt-6 sm:mt-8 rounded-xl border border-brand/40 bg-gradient-to-r from-brand/15 via-neutral-900/90 to-neutral-950 p-3.5 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 sm:gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white text-[10px] font-bold shrink-0">
                  {selectedCount}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Posters Ready in Studio Print Cart
                </h3>
              </div>
              <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
                Your chosen AI poster variations are queued with 12-color archival giclée plotter specifications.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto shrink-0 rounded-xl bg-brand hover:bg-brand-hover px-5 sm:px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] whitespace-nowrap text-center"
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
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-[#101114] shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectIndex(null)}
                aria-label="Close dialog"
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/75 text-neutral-300 hover:text-white hover:bg-black transition-colors cursor-pointer shadow-lg"
              >
                <X size={16} />
              </button>

              {/* Left Column: High-Res Vertical Poster Visual */}
              <div className="relative w-full lg:w-1/2 h-[34vh] sm:h-[42vh] lg:h-auto lg:max-h-[92vh] bg-black shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center p-3 sm:p-5">
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
              <div className="flex-1 p-4 sm:p-6 md:p-7 overflow-y-auto flex flex-col justify-between space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="rounded-full bg-brand/15 border border-brand/30 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-brand uppercase tracking-wider">
                      {currentArtwork.badge}
                    </span>
                    <span className="rounded-full bg-white/[0.06] border border-white/10 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-neutral-300">
                      300+ DPI Archival Giclée
                    </span>
                  </div>

                  <h2
                    id="artwork-preview-title"
                    className="mt-2 text-base sm:text-lg md:text-xl font-bold text-white tracking-wide"
                  >
                    {currentArtwork.title}
                  </h2>
                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                    {currentArtwork.subtitle}
                  </p>

                  {/* Size Options Grid */}
                  <div className="mt-3.5 sm:mt-5 space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
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
                            className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSizeActive
                                ? "border-brand bg-brand/10 ring-1 ring-brand text-white shadow-sm"
                                : "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[11px] sm:text-xs font-bold text-white truncate">
                                {size.name}
                              </span>
                              <span className="text-[11px] sm:text-xs font-mono font-bold text-brand shrink-0">
                                {size.price}
                              </span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-neutral-400 block mt-0.5 font-mono">
                              {size.dimensions}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 sm:pt-4 border-t border-white/10 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs">
                    <span className="text-neutral-400">Archival Packaging:</span>
                    <span className="text-white font-medium">CNC Kraft Tube Included</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => toggleArtworkSelection(currentArtwork.id)}
                      className={`w-full sm:flex-1 py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.98] ${
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
                      className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-4 py-2.5 sm:py-3 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer text-center"
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
