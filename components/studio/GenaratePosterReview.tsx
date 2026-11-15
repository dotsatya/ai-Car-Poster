"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Check,
  Plus,
  Eye,
  X,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { getAvailableSizesForArtwork } from "@/lib/templateSizes";

interface GenaratePosterReviewProps {
  onBackToConfigure: () => void;
}

const emptySubscribe = () => () => {};

export function GenaratePosterReview({ onBackToConfigure }: GenaratePosterReviewProps) {
  const {
    generatedArtworks,
    selectedTemplates,
    toggleArtworkSelection,
    updateArtworkSize,
    updateArtworkQuantity,
    customText,
    cartItems,
    cartSubtotal,
    setIsCartOpen,
  } = useStudio();

  const [inspectArtworkIndex, setInspectArtworkIndex] = useState<number | null>(null);
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

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Keyboard navigation & body scroll locking when preview modal is open
  useEffect(() => {
    if (inspectArtworkIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInspectArtworkIndex(null);
      } else if (e.key === "ArrowLeft") {
        setInspectArtworkIndex((prev) =>
          prev === null ? 0 : (prev - 1 + generatedArtworks.length) % generatedArtworks.length
        );
      } else if (e.key === "ArrowRight") {
        setInspectArtworkIndex((prev) =>
          prev === null ? 0 : (prev + 1) % generatedArtworks.length
        );
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inspectArtworkIndex, generatedArtworks.length]);

  const selectedCount = generatedArtworks.filter((a) => a.selected).length;
  const currentArtwork =
    inspectArtworkIndex !== null ? generatedArtworks[inspectArtworkIndex] : null;

  const modalSizes = currentArtwork
    ? getAvailableSizesForArtwork(currentArtwork, selectedTemplates)
    : [];
  const modalCurrentSize =
    modalSizes.find((s) => s.id === currentArtwork?.size) || modalSizes[0];

  const handlePrev = () => {
    if (inspectArtworkIndex === null) return;
    setInspectArtworkIndex((inspectArtworkIndex - 1 + generatedArtworks.length) % generatedArtworks.length);
  };

  const handleNext = () => {
    if (inspectArtworkIndex === null) return;
    setInspectArtworkIndex((inspectArtworkIndex + 1) % generatedArtworks.length);
  };

  return (
    <div className="mt-6 sm:mt-8 space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-white/[0.08] bg-neutral-900/60 p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 backdrop-blur-md hover:border-white/20 transition-all duration-300">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            ✓ 4 AI Poster Variations Generated
          </span>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mt-0.5">
            Review &amp; Select Posters for Print
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5 max-w-2xl">
            Choose which pictures you want to print. Only the posters you select below will be added to your Studio Print Cart.
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={onBackToConfigure}
            className="flex-1 sm:flex-initial text-center rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer transition-colors"
          >
            ← Adjust Inputs
          </button>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-center rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] whitespace-nowrap"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Print Cart ({cartItems.length})</span>
          </button>
        </div>
      </div>

      {/* 4 Generated Pictures Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {generatedArtworks.map((art, idx) => {
          const availableSizes = getAvailableSizesForArtwork(art, selectedTemplates);
          const currentSize =
            availableSizes.find((s) => s.id === art.size) || availableSizes[0];
          const itemTotal = currentSize.priceNum * art.quantity;

          return (
            <div
              key={art.id}
              className={`rounded-xl border p-3.5 sm:p-4.5 transition-all duration-300 flex flex-col justify-between ${
                art.selected
                  ? "border-brand/70 bg-neutral-900/90 shadow-xl shadow-brand/10 ring-1 ring-brand/30 -translate-y-1"
                  : "border-white/[0.08] bg-neutral-900/30 hover:border-white/25 hover:bg-neutral-900/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80"
              }`}
            >
              {/* Poster Image Container */}
              <div>
                <div
                  onClick={() => setInspectArtworkIndex(idx)}
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-black shadow-lg group cursor-pointer"
                  title="Click to preview in gallery resolution"
                >
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover filter contrast-110 brightness-95 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badges: Variation badge and Quick Inspect Icon */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                    <span className="rounded-full bg-black/75 border border-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {art.badge}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectArtworkIndex(idx);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/80 border border-white/20 text-neutral-300 hover:text-white hover:bg-black transition-colors cursor-pointer"
                      title="Inspect full resolution"
                    >
                      <Eye size={13} />
                    </button>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                      {art.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-md">
                      {art.title}
                    </h4>
                    {customText && (
                      <p className="text-[9px] text-neutral-300 font-mono truncate mt-0.5 drop-shadow">
                        {customText}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtitle Info */}
                <div className="mt-2.5 px-0.5">
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {art.subtitle}
                  </p>
                </div>
              </div>

              {/* Selection & Configuration Controls */}
              <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-3">
                {/* Print Selection Toggle Button */}
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

                {/* Sizing & Quantity Configuration */}
                <div className="space-y-2">
                  {/* Size Selector Button & Popover */}
                  <div className="relative size-menu-container">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      <span>Print Size</span>
                      <span className="text-neutral-500 font-mono text-[9px]">{currentSize.dimensions}</span>
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
                          {currentSize.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline truncate">
                          ({currentSize.dimensions})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-mono font-bold text-brand text-xs">
                          {currentSize.price}
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
                            const isSelected = currentSize.id === size.id;
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

                  {/* Quantity & Unit Total */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/50 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateArtworkQuantity(art.id, -1)}
                        className="h-5 w-5 rounded text-neutral-400 hover:bg-white/10 hover:text-white text-xs cursor-pointer flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-white">
                        {art.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateArtworkQuantity(art.id, 1)}
                        className="h-5 w-5 rounded text-neutral-400 hover:bg-white/10 hover:text-white text-xs cursor-pointer flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-white">
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary & Checkout Action */}
      <div className="rounded-xl border border-white/[0.08] bg-neutral-950/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md hover:border-white/20 transition-all duration-300">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            Configured Artworks
          </span>
          <div className="text-lg sm:text-xl font-bold text-white">
            {selectedCount} of {generatedArtworks.length} Posters Selected for Print ·{" "}
            <span className="text-brand">
              ₹{cartSubtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            {selectedCount === 0
              ? 'Click "+ Select to Print" on any of the pictures above to add them to your cart.'
              : "Selected posters are ready in your Studio Print Cart for museum packaging and dispatch."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="w-full sm:w-auto rounded-xl bg-brand hover:bg-brand-hover px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] text-center whitespace-nowrap"
        >
          Open Print Cart ({selectedCount}) →
        </button>
      </div>

      {/* Gallery-Grade High-Resolution Modal View */}
      {isClient && currentArtwork && inspectArtworkIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="artwork-preview-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setInspectArtworkIndex(null);
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 sm:p-5 md:p-8 backdrop-blur-xl animate-in fade-in duration-200"
          >
            <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl border border-white/[0.08] bg-[#0D0F13] p-4 sm:p-6 lg:p-7 shadow-2xl shadow-black/95 text-left animate-in zoom-in-95 duration-200">
              {/* Mobile Floating Close Button */}
              <button
                type="button"
                onClick={() => setInspectArtworkIndex(null)}
                className="md:hidden absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 border border-white/20 text-neutral-300 hover:text-white cursor-pointer"
                title="Close preview (Esc)"
              >
                <X size={16} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-center">
                {/* Left Column: Authentic 3:4 Portrait Poster Frame (object-cover, NO letterboxing) */}
                <div className="md:col-span-6 lg:col-span-6 flex flex-col items-center">
                  <div className="relative aspect-[3/4] w-full max-h-[46vh] sm:max-h-[56vh] md:max-h-[62vh] overflow-hidden rounded-xl border border-white/[0.08] bg-black shadow-2xl shadow-black/95 group">
                    <Image
                      src={currentArtwork.image}
                      alt={currentArtwork.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 90vw, 450px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Hallmarks overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/90 pointer-events-none">
                      <span className="rounded-full bg-black/75 px-2.5 py-0.5 backdrop-blur-md border border-white/15 font-semibold uppercase tracking-wider text-brand">
                        {currentArtwork.badge}
                      </span>
                      <span className="rounded-full bg-black/70 px-2.5 py-0.5 backdrop-blur-md border border-white/15 font-mono text-[9px]">
                        3:4 Fine Art Canvas
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-neutral-300 pointer-events-none">
                      <span className="rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/10 text-[9px] font-mono">
                        300+ DPI Archival Giclée
                      </span>
                      {customText && (
                        <span className="rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/10 font-mono text-[9px] truncate max-w-[150px]">
                          {customText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Spec Curation & Action Controls */}
                <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between space-y-4">
                  {/* Top row: Pagination & Close button */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Previous variation (←)"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-xs font-mono font-bold text-neutral-300 px-1.5">
                        Variation {inspectArtworkIndex + 1} of {generatedArtworks.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Next variation (→)"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectArtworkIndex(null)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Close preview (Esc)"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Poster Meta */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                      {currentArtwork.category}
                    </span>
                    <h3
                      id="artwork-preview-title"
                      className="font-sans normal-case text-lg sm:text-xl font-bold text-white tracking-wide mt-0.5"
                    >
                      {currentArtwork.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                      {currentArtwork.subtitle}
                    </p>
                  </div>

                  {/* Print Configuration Box */}
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        <span>Fine Art Print Size</span>
                        <span className="text-neutral-500 font-mono">
                          {modalCurrentSize?.dimensions}
                        </span>
                      </div>
                      <select
                        value={currentArtwork.size}
                        onChange={(e) => updateArtworkSize(currentArtwork.id, e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none cursor-pointer"
                      >
                        {modalSizes.map((size) => (
                          <option key={size.id} value={size.id} className="bg-neutral-900 text-white">
                            {size.name} ({size.dimensions}) — {size.price} {size.isPopular ? "★ Popular" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase font-semibold">Quantity</span>
                        <div className="flex items-center gap-1.5 mt-1 rounded-lg border border-white/10 bg-neutral-900 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateArtworkQuantity(currentArtwork.id, -1)}
                            className="h-5 w-5 rounded text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-semibold text-white">
                            {currentArtwork.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateArtworkQuantity(currentArtwork.id, 1)}
                            className="h-5 w-5 rounded text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-neutral-500 uppercase font-semibold">Unit Price</span>
                        <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                          ₹
                          {(
                            (modalCurrentSize?.priceNum || 1299) *
                            currentArtwork.quantity
                          ).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Toggle Action Button */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleArtworkSelection(currentArtwork.id)}
                      className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.98] ${
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
                          <span>Add to Print Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Thumbnail Navigation Strip */}
                  <div className="pt-2 border-t border-white/[0.08]">
                    <div className="text-[10px] text-neutral-400 uppercase font-semibold tracking-wider mb-2">
                      All 4 Generated Variations:
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {generatedArtworks.map((art, idx) => (
                        <button
                          key={art.id}
                          type="button"
                          onClick={() => setInspectArtworkIndex(idx)}
                          className={`relative aspect-[3/4] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                            idx === inspectArtworkIndex
                              ? "border-brand ring-2 ring-brand/40 scale-105 shadow-md"
                              : "border-white/15 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={art.image} alt={art.title} fill className="object-cover" />
                          {art.selected && (
                            <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-brand text-white flex items-center justify-center text-[8px] font-bold shadow">
                              ✓
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
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

