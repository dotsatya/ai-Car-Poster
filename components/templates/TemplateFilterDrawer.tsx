"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import {
  FilterState,
  FILTER_OPTIONS,
  countActiveFilters,
} from "@/lib/templateFilters";

const emptySubscribe = () => () => {};

interface TemplateFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  totalMatches: number;
}

export function TemplateFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  onReset,
  totalMatches,
}: TemplateFilterDrawerProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const activeCount = countActiveFilters(filters);

  const toggleArrayItem = (key: keyof FilterState, item: string) => {
    setFilters((prev) => {
      const currentList = prev[key] as string[];
      const exists = currentList.includes(item);
      const updated = exists
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      return {
        ...prev,
        [key]: updated,
      };
    });
  };

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Container (Slides from LEFT side) */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 bottom-0 left-0 z-[10000] h-dvh w-full max-w-md sm:max-w-lg bg-[#111114] border-r border-white/[0.08] shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-drawer-title"
          >
            {/* 1. Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 sm:px-6 py-4 shrink-0 bg-[#111114]/90 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 text-brand">
                  <SlidersHorizontal size={15} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      id="filter-drawer-title"
                      className="font-heading text-lg font-bold uppercase tracking-wider text-white"
                    >
                      Filters
                    </h2>
                    {activeCount > 0 && (
                      <span className="flex h-5 items-center rounded-full bg-brand/20 border border-brand/30 px-2 text-[10px] font-bold text-brand">
                        {activeCount} active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    {totalMatches !== undefined && (
                      <span className="text-neutral-300 font-medium">
                        {totalMatches} available •{" "}
                      </span>
                    )}
                    Refine catalog by car brand, chassis, style &amp; era
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                    title="Reset all filters"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close filters"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* 2. Scrollable Filter Groups */}
            <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
              {/* Filter Group 1: Car Brand */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Car Brand
                  </span>
                  {filters.brands.length > 0 && (
                    <span className="text-[10px] font-mono text-brand font-semibold">
                      {filters.brands.length} selected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {FILTER_OPTIONS.brands.map((brand) => {
                    const isSelected = filters.brands.includes(brand);
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => toggleArrayItem("brands", brand)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand text-white border border-brand shadow-sm shadow-brand/30 scale-102"
                            : "bg-neutral-900/90 text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={2.5} />}
                        <span>{brand}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group 2: Car Model / Series */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Car Model / Series
                  </span>
                  {filters.models.length > 0 && (
                    <span className="text-[10px] font-mono text-brand font-semibold">
                      {filters.models.length} selected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {FILTER_OPTIONS.models.map((model) => {
                    const isSelected = filters.models.includes(model);
                    return (
                      <button
                        key={model}
                        type="button"
                        onClick={() => toggleArrayItem("models", model)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand text-white border border-brand shadow-sm shadow-brand/30 scale-102"
                            : "bg-neutral-900/90 text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={2.5} />}
                        <span>{model}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group 3: Poster Style */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Poster Style
                  </span>
                  {filters.styles.length > 0 && (
                    <span className="text-[10px] font-mono text-brand font-semibold">
                      {filters.styles.length} selected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {FILTER_OPTIONS.styles.map((style) => {
                    const isSelected = filters.styles.includes(style);
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => toggleArrayItem("styles", style)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand text-white border border-brand shadow-sm shadow-brand/30 scale-102"
                            : "bg-neutral-900/90 text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={2.5} />}
                        <span>{style}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group 4: Collection */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Collection
                  </span>
                  {filters.collections.length > 0 && (
                    <span className="text-[10px] font-mono text-brand font-semibold">
                      {filters.collections.length} selected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {FILTER_OPTIONS.collections.map((col) => {
                    const isSelected = filters.collections.includes(col);
                    return (
                      <button
                        key={col}
                        type="button"
                        onClick={() => toggleArrayItem("collections", col)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand text-white border border-brand shadow-sm shadow-brand/30 scale-102"
                            : "bg-neutral-900/90 text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={2.5} />}
                        <span>{col}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group 5: Car Category */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Car Category
                  </span>
                  {filters.categories.length > 0 && (
                    <span className="text-[10px] font-mono text-brand font-semibold">
                      {filters.categories.length} selected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {FILTER_OPTIONS.categories.map((cat) => {
                    const isSelected = filters.categories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleArrayItem("categories", cat)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand text-white border border-brand shadow-sm shadow-brand/30 scale-102"
                            : "bg-neutral-900/90 text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={2.5} />}
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group 6: Model Year */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Model Year
                  </span>
                  {filters.years.length > 0 && (
                    <span className="text-[10px] font-mono text-brand font-semibold">
                      {filters.years.length} selected
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {FILTER_OPTIONS.years.map((year) => {
                    const isSelected = filters.years.includes(year);
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => toggleArrayItem("years", year)}
                        className={`text-center rounded-lg py-2 text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand text-white border border-brand shadow-sm shadow-brand/30 scale-102 font-bold"
                            : "bg-neutral-900/90 text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group 7: Price Range */}
              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Price Range
                  </span>
                  {filters.priceRange !== "all" && (
                    <span className="text-[10px] font-mono text-brand font-semibold">
                      Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {FILTER_OPTIONS.priceRanges.map((pr) => {
                    const isSelected = filters.priceRange === pr.id;
                    return (
                      <button
                        key={pr.id}
                        type="button"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: pr.id as FilterState["priceRange"],
                          }))
                        }
                        className={`text-center rounded-lg py-2 px-3 text-xs font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand text-white border border-brand shadow-sm shadow-brand/30 font-semibold"
                            : "bg-neutral-900/90 text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {pr.label}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Range Inputs */}
                {filters.priceRange === "custom" && (
                  <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3 space-y-2 mt-2 animate-in fade-in duration-200">
                    <span className="text-[11px] text-neutral-400 block">
                      Custom Starting Price (₹)
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] text-neutral-500 uppercase font-mono block mb-1">
                          Min ₹
                        </label>
                        <input
                          type="number"
                          min={300}
                          max={3000}
                          step={50}
                          value={filters.customMinPrice}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              customMinPrice: Number(e.target.value) || 0,
                            }))
                          }
                          className="w-full rounded-lg border border-white/10 bg-neutral-900/80 px-2.5 py-1.5 text-xs text-white font-mono focus:border-brand focus:outline-none"
                        />
                      </div>
                      <span className="text-neutral-500 pt-4">—</span>
                      <div className="flex-1">
                        <label className="text-[10px] text-neutral-500 uppercase font-mono block mb-1">
                          Max ₹
                        </label>
                        <input
                          type="number"
                          min={300}
                          max={3000}
                          step={50}
                          value={filters.customMaxPrice}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              customMaxPrice: Number(e.target.value) || 2000,
                            }))
                          }
                          className="w-full rounded-lg border border-white/10 bg-neutral-900/80 px-2.5 py-1.5 text-xs text-white font-mono focus:border-brand focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Drawer Footer: Result Count & Apply Button */}
            <div className="border-t border-white/[0.08] p-4 sm:p-5 pb-[max(1rem,env(safe-area-inset-bottom))] bg-[#111114] backdrop-blur-md shrink-0 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onReset}
                disabled={activeCount === 0}
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                Reset All
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                Apply
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
