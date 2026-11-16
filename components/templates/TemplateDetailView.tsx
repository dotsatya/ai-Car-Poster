"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Plus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Template, PrintSizeId, PaperGsmId } from "@/types";
import { ALL_PRINT_SIZES, ALL_PAPER_GSM } from "@/lib/templatePhotos";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";
import { TemplateSelectionBar } from "./TemplateSelectionBar";

interface TemplateDetailViewProps {
  template: Template;
}

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const {
    selectedTemplates,
    toggleTemplate,
    setStudioState,
    addDirectCartItem,
    setIsCartOpen,
  } = useStudio();
  const isSelected = selectedTemplates.includes(template.id);
  const selectionIndex = selectedTemplates.indexOf(template.id);

  // Dynamic Print Size and Paper Quality Configuration
  const availableSizes =
    template.availableSizes && template.availableSizes.length > 0
      ? template.availableSizes
      : [ALL_PRINT_SIZES.a3, ALL_PRINT_SIZES.a2];

  const availableGsm =
    template.availableGsm && template.availableGsm.length > 0
      ? template.availableGsm
      : [ALL_PAPER_GSM["250gsm"], ALL_PAPER_GSM["300gsm"]];

  const [selectedSizeId, setSelectedSizeId] = useState<PrintSizeId>(
    availableSizes[0]?.id || "a3"
  );

  const isCombinationAvailable = (sizeId: PrintSizeId, gsmId: PaperGsmId) => {
    if (!template.pricing || template.pricing.length === 0) return true;
    return template.pricing.some((p) => p.size === sizeId && p.gsm === gsmId);
  };

  const [selectedGsmId, setSelectedGsmId] = useState<PaperGsmId>(() => {
    const validGsm = template.pricing?.find(
      (p) => p.size === (availableSizes[0]?.id || "a3")
    )?.gsm;
    return (validGsm as PaperGsmId) || availableGsm[0]?.id || "250gsm";
  });

  const handleSizeChange = (sizeId: PrintSizeId) => {
    setSelectedSizeId(sizeId);
    if (!isCombinationAvailable(sizeId, selectedGsmId)) {
      const fallbackGsm = template.pricing?.find((p) => p.size === sizeId)?.gsm as
        | PaperGsmId
        | undefined;
      if (fallbackGsm) {
        setSelectedGsmId(fallbackGsm);
      }
    }
  };

  const currentPricing =
    template.pricing?.find(
      (p) => p.size === selectedSizeId && p.gsm === selectedGsmId
    ) || template.pricing?.[0];

  const currentPriceFormatted =
    currentPricing?.formattedPrice || template.formattedStartingPrice || "₹799";
  const currentPriceNum = currentPricing?.price || 799;

  const currentSizeObj = ALL_PRINT_SIZES[selectedSizeId] || availableSizes[0];
  const currentGsmObj = ALL_PAPER_GSM[selectedGsmId] || availableGsm[0];

  const handleAddToCart = () => {
    addDirectCartItem({
      id: `${template.slug}-${selectedSizeId}-${selectedGsmId}`,
      title: template.name,
      size: currentSizeObj.name,
      gsm: currentGsmObj.name,
      dimensions: currentSizeObj.dimensions,
      price: currentPriceNum,
      quantity: 1,
      isCombined: false,
      image: template.image,
      currency: "INR",
      formattedPrice: currentPriceFormatted,
      templateSlug: template.slug,
    });
    setIsCartOpen(true);
    toast.success(
      `Added ${template.name} (${currentSizeObj.name}, ${currentGsmObj.name}) to cart!`
    );
  };

  // Curated related templates from the library: same category first, then fallback
  const sameCategory = TEMPLATES.filter(
    (t) => t.id !== template.id && t.category === template.category,
  );
  const otherCategory = TEMPLATES.filter(
    (t) => t.id !== template.id && t.category !== template.category,
  );
  const relatedTemplates = [...sameCategory, ...otherCategory].slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12 pb-32 sm:pb-36">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400 mb-4 sm:mb-6">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/templates" className="hover:text-white transition-colors">
          Templates
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">
          {template.name}
        </span>
      </div>

      {/* Mobile / Tablet Header: Clean Title & Category shown above image */}
      <div className="lg:hidden mb-4 sm:mb-6 text-left space-y-1.5">
        <div className="flex items-center justify-start gap-2 flex-wrap">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand">
            {template.category}
          </span>
          {template.tag && (
            <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-neutral-300">
              {template.tag}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white tracking-wide sm:tracking-wider">
          {template.name}
        </h1>
        {template.subtitle && (
          <p className="text-xs sm:text-sm text-neutral-400 font-medium">
            {template.subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14 items-start">
        {/* Left: High-Res Poster Artwork Showcase (compact and balanced on desktop, tablet, and mobile) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative aspect-[3/4] w-full max-w-[290px] xs:max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-[380px] xl:max-w-[420px] max-h-[46vh] sm:max-h-[52vh] lg:max-h-[66vh] overflow-hidden rounded-xl border border-white/[0.08] bg-black shadow-2xl shadow-black/80 lg:sticky lg:top-24 hover:border-white/25 transition-all duration-300">
            <Image
              src={template.image}
              alt={template.name}
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 450px, 420px"
              className="object-cover filter brightness-95 contrast-125 transition-transform duration-700 hover:scale-103"
            />
            {/* Subtle bottom info badges */}
            <div className="pointer-events-none absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5">
              <span className="rounded-full border border-white/15 bg-black/70 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-mono font-medium text-white/90 backdrop-blur-md">
                300 DPI Atelier Master
              </span>
            </div>
            <div className="pointer-events-none absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5">
              <span className="rounded-full border border-white/15 bg-black/70 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-mono font-medium text-white/90 backdrop-blur-md">
                3:4 Fine Art
              </span>
            </div>
          </div>
        </div>

        {/* Right: Specifications, Features & Selection Button */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {/* Desktop Header (Only shown on lg+ screens) */}
          <div className="hidden lg:block space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-brand">
                {template.category}
              </span>
              {template.tag && (
                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-300">
                  {template.tag}
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl text-white tracking-wide sm:tracking-wider">
              {template.name}
            </h1>
            {template.subtitle && (
              <p className="text-sm text-neutral-400 font-medium">
                {template.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-300">
            {template.longDescription || template.description}
          </p>

          {/* Dynamic Print Size & Paper GSM Configuration Section */}
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/60 p-4 sm:p-5 space-y-4 shadow-xl hover:border-white/20 transition-all duration-300">
            {/* Header: Dynamic Price & Live Guarantee */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3.5">
              <div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Fine Art Physical Print
                </span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand tracking-tight">
                    {currentPriceFormatted}
                  </span>
                  <span className="text-xs text-neutral-400">
                    all taxes included • tube packaging
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100+ Year Archival Inks</span>
              </div>
            </div>

            {/* 1. Print Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-white">
                  1. Print Size
                </span>
                <span className="text-neutral-400 text-[11px]">
                  {availableSizes.length} size{availableSizes.length > 1 ? "s" : ""} available
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(ALL_PRINT_SIZES) as PrintSizeId[]).map((sizeKey) => {
                  const sizeOption = ALL_PRINT_SIZES[sizeKey];
                  const isAvailable = availableSizes.some((s) => s.id === sizeKey);
                  const isSelected = selectedSizeId === sizeKey;

                  return (
                    <button
                      key={sizeKey}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => handleSizeChange(sizeKey)}
                      className={`relative flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                        !isAvailable
                          ? "border-white/5 bg-neutral-950/40 text-neutral-600 cursor-not-allowed opacity-40 line-through"
                          : isSelected
                            ? "border-brand bg-brand/10 ring-1 ring-brand text-white shadow-md shadow-brand/20 scale-[1.02]"
                            : "border-white/10 bg-black/40 text-neutral-300 hover:border-white/30 hover:bg-white/[0.04] cursor-pointer"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold">{sizeOption.name}</span>
                      <span className="text-[10px] text-neutral-400 mt-0.5 whitespace-nowrap">
                        {sizeOption.dimensions}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Paper Quality (GSM) Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-white">
                  2. Paper Quality (GSM)
                </span>
                <span className="text-neutral-400 text-[11px]">
                  Archival Giclée Paper
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(Object.keys(ALL_PAPER_GSM) as PaperGsmId[]).map((gsmKey) => {
                  const gsmOption = ALL_PAPER_GSM[gsmKey];
                  const isAvailableForTemplate = availableGsm.some((g) => g.id === gsmKey);
                  const isValidForCurrentSize = isCombinationAvailable(selectedSizeId, gsmKey);
                  const isEnabled = isAvailableForTemplate && isValidForCurrentSize;
                  const isSelected = selectedGsmId === gsmKey;

                  return (
                    <button
                      key={gsmKey}
                      type="button"
                      disabled={!isEnabled}
                      onClick={() => setSelectedGsmId(gsmKey)}
                      className={`relative flex flex-col items-start p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                        !isEnabled
                          ? "border-white/5 bg-neutral-950/40 text-neutral-600 cursor-not-allowed opacity-40"
                          : isSelected
                            ? "border-brand bg-brand/10 ring-1 ring-brand text-white shadow-md shadow-brand/20"
                            : "border-white/10 bg-black/40 text-neutral-300 hover:border-white/30 hover:bg-white/[0.04] cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {gsmOption.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-brand uppercase">Selected</span>
                        )}
                        {!isEnabled && (
                          <span className="text-[9px] text-neutral-600 uppercase">Unavailable</span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                        {gsmOption.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Order Button & Studio Multi-Select */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] text-center"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span>Order Physical Print ({currentPriceFormatted})</span>
              </button>

              <button
                type="button"
                onClick={() => toggleTemplate(template.id)}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
                  isSelected
                    ? "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                    : "border border-white/15 bg-black/50 text-neutral-300 hover:text-white hover:border-white/30"
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400 stroke-[2.5] shrink-0" />
                    <span>In Studio Queue ({selectionIndex + 1}/3)</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 stroke-[2] shrink-0" />
                    <span>Add to Studio ({selectedTemplates.length}/3)</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-neutral-400 pt-1">
              {currentSizeObj.name} ({currentSizeObj.dimensions}) printed on {currentGsmObj.name} ({currentGsmObj.label}).
            </p>
          </div>

          {/* Composition & Visual FX Features */}
          {template.features && template.features.length > 0 && (
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-3.5 sm:p-5 space-y-2 hover:border-white/20 transition-all duration-300">
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                Composition &amp; Visual Architecture
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {template.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specs Meta */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 text-xs">
            <div className="rounded-xl border border-white/[0.08] bg-black/50 p-2.5 sm:p-3.5">
              <div className="text-neutral-500 uppercase tracking-wider text-[9px] sm:text-[10px]">
                Print Aspect
              </div>
              <div className="mt-0.5 font-semibold text-white text-xs sm:text-sm">
                {template.recommendedAspect || "3:4 Standard"}
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-black/50 p-2.5 sm:p-3.5">
              <div className="text-neutral-500 uppercase tracking-wider text-[9px] sm:text-[10px]">
                Custom Telemetry
              </div>
              <div className="mt-0.5 font-semibold text-white text-xs sm:text-sm truncate">
                {template.supportsCustomText
                  ? "Plate / Chassis Text"
                  : "Fixed Typography"}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-neutral-400">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 hover:text-white underline underline-offset-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Browse all templates</span>
            </Link>
            <Link
              href="/studio"
              onClick={() => setStudioState("configure")}
              className="text-white hover:text-brand font-semibold flex items-center gap-1.5"
            >
              <span>Launch Poster Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Explore More Posters Section */}
      <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
           
            <h3 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Explore More Templates
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-neutral-400">
              Click any design to inspect its artistic specifications.
            </p>
          </div>
          <Link
            href="/templates"
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {relatedTemplates.map((rel) => {
            const isRelSelected = selectedTemplates.includes(rel.id);
            return (
              <div key={rel.id} className="group relative">
                <Link href={`/templates/${rel.slug}`} className="block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/60 transition-transform duration-300 group-hover:scale-102 group-hover:border-white/25">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-white tracking-wide truncate group-hover:text-brand transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-neutral-400 truncate">
                    {rel.category}
                  </p>
                </Link>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleTemplate(rel.id);
                  }}
                  className={`absolute top-2 right-2 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                    isRelSelected
                      ? "border-brand bg-brand text-white shadow-md shadow-brand/30"
                      : "border-white/20 bg-black/60 text-white hover:border-white"
                  }`}
                  title={
                    isRelSelected
                      ? "Remove from selection"
                      : "Add to selection bar"
                  }
                  aria-label={
                    isRelSelected
                      ? `Remove ${rel.name}`
                      : `Select ${rel.name}`
                  }
                >
                  {isRelSelected ? (
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Selection Bar */}
      <TemplateSelectionBar />
    </div>
  );
}
