"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { TemplateCard } from "./TemplateCard";
import { TemplateSelectionBar } from "./TemplateSelectionBar";
import { TemplateFilterDrawer } from "./TemplateFilterDrawer";
import {
  FilterState,
  INITIAL_FILTER_STATE,
  matchTemplate,
  countActiveFilters,
} from "@/lib/templateFilters";

const QUICK_STYLES = [
  "All",
  "Minimal",
  "Vintage",
  "Racing",
  "Magazine",
  "Artistic",
] as const;

export function TemplateGrid() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Active filters count
  const activeCount = countActiveFilters(filters);

  // Filter templates through both search and comprehensive multi-group filters
  const filtered = TEMPLATES.filter((tpl) =>
    matchTemplate(tpl, filters, search),
  );

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
    setSearch("");
  };

  const removeBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b !== brand),
    }));
  };

  const removeModel = (model: string) => {
    setFilters((prev) => ({
      ...prev,
      models: prev.models.filter((m) => m !== model),
    }));
  };

  const removeStyle = (style: string) => {
    setFilters((prev) => ({
      ...prev,
      styles: prev.styles.filter((s) => s !== style),
    }));
  };

  const removeCollection = (collection: string) => {
    setFilters((prev) => ({
      ...prev,
      collections: prev.collections.filter((c) => c !== collection),
    }));
  };

  const removeCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== cat),
    }));
  };

  const removeYear = (yr: string) => {
    setFilters((prev) => ({
      ...prev,
      years: prev.years.filter((y) => y !== yr),
    }));
  };

  const removePriceRange = () => {
    setFilters((prev) => ({
      ...prev,
      priceRange: "all",
    }));
  };

  // Quick style pill click handler (syncs with drawer style filter)
  const handleQuickStyleClick = (style: (typeof QUICK_STYLES)[number]) => {
    if (style === "All") {
      setFilters((prev) => ({ ...prev, styles: [] }));
    } else {
      setFilters((prev) => {
        const isSelected = prev.styles.includes(style);
        return {
          ...prev,
          styles: isSelected ? prev.styles.filter((s) => s !== style) : [style],
        };
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-28">
      {/* 1. Search Bar with Filter Button on the LEFT SIDE */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full">
        {/* Filter Toggle Button (LEFT SIDE OF SEARCH BAR) */}
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 shadow-lg ${
            activeCount > 0
              ? "border-brand bg-brand/15 text-white shadow-brand/20 hover:bg-brand/25 ring-1 ring-brand/40"
              : "border-white/[0.08] bg-neutral-900/80 text-neutral-300 hover:border-white/25 hover:bg-neutral-800 hover:text-white"
          }`}
          aria-label="Open Filter Drawer"
        >
          <SlidersHorizontal
            size={16}
            className={activeCount > 0 ? "text-brand" : "text-neutral-400"}
          />
          <span className="hidden lg:inline">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow-sm">
              {activeCount}
            </span>
          )}
        </button>

        {/* Search Input Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search templates (e.g., Porsche, GT3 RS, Monaco, Retro)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] hover:border-white/20 bg-neutral-900/70 py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-neutral-400 backdrop-blur-md transition-all focus:border-brand/70 focus:outline-none focus:ring-1 focus:ring-brand/40"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
            <Search
              size={16}
              className="shrink-0 text-neutral-400"
              strokeWidth={2}
            />
          </div>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-white cursor-pointer"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Quick Style Pills + Result Count Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {QUICK_STYLES.map((style) => {
            const isActive =
              style === "All"
                ? filters.styles.length === 0
                : filters.styles.includes(style);
            return (
              <button
                key={style}
                type="button"
                onClick={() => handleQuickStyleClick(style)}
                className={`rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-md shadow-white/10"
                    : "bg-neutral-900/80 text-neutral-400 border border-white/[0.08] hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filter Status & Active Chips Row */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 pb-1 min-h-[30px]">
        <span className="text-[11px] text-neutral-400 uppercase font-mono font-semibold mr-1">
          FILTER :
        </span>

        {activeCount === 0 && !search ? (
          <span className="text-xs text-neutral-400 font-sans italic">
            Nothing applied
          </span>
        ) : (
          <>
            {search && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-neutral-900 px-2.5 py-1 text-[11px] text-white">
                <span>&ldquo;{search}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {filters.brands.map((b) => (
              <span
                key={`b-${b}`}
                className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] text-brand font-medium"
              >
                <span>Brand: {b}</span>
                <button
                  type="button"
                  onClick={() => removeBrand(b)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.models.map((m) => (
              <span
                key={`m-${m}`}
                className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] text-brand font-medium"
              >
                <span>Model: {m}</span>
                <button
                  type="button"
                  onClick={() => removeModel(m)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.styles.map((s) => (
              <span
                key={`s-${s}`}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-200"
              >
                <span>Style: {s}</span>
                <button
                  type="button"
                  onClick={() => removeStyle(s)}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.collections.map((c) => (
              <span
                key={`c-${c}`}
                className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] text-brand font-medium"
              >
                <span>Collection: {c}</span>
                <button
                  type="button"
                  onClick={() => removeCollection(c)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.categories.map((cat) => (
              <span
                key={`cat-${cat}`}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-200"
              >
                <span>Category: {cat}</span>
                <button
                  type="button"
                  onClick={() => removeCategory(cat)}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.years.map((y) => (
              <span
                key={`y-${y}`}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-neutral-900 px-2.5 py-1 text-[11px] font-mono text-neutral-200"
              >
                <span>Era: {y}</span>
                <button
                  type="button"
                  onClick={() => removeYear(y)}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.priceRange !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-mono text-brand">
                <span>
                  {filters.priceRange === "499-999" && "₹499–₹999"}
                  {filters.priceRange === "999-1999" && "₹999–₹1,999"}
                  {filters.priceRange === "custom" &&
                    `₹${filters.customMinPrice}–₹${filters.customMaxPrice}`}
                </span>
                <button
                  type="button"
                  onClick={removePriceRange}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline cursor-pointer ml-1"
            >
              <RotateCcw size={11} />
              <span>Reset All</span>
            </button>
          </>
        )}
      </div>

      {/* 4. Poster Grid: 2 in a row on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {filtered.map((tpl) => (
          <TemplateCard key={tpl.id} template={tpl} />
        ))}
      </div>

      {/* 5. Empty Filter Results State */}
      {filtered.length === 0 && (
        <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 py-20 px-4 text-center hover:border-white/20 transition-all duration-300">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 border border-white/[0.08] mb-3 text-neutral-400">
            <SlidersHorizontal size={20} />
          </div>
          <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
            No Matching Poster Templates
          </h3>
          <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
            No poster designs match your active search and filter combinations.
            Try relaxing your brand, model, or price criteria.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
          >
            <RotateCcw size={13} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* 6. Filter Drawer (Slide-Over from Left Side) */}
      <TemplateFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        totalMatches={filtered.length}
      />

      {/* 7. Mid-Bottom Floating Selection Bar */}
      <TemplateSelectionBar />
    </div>
  );
}
