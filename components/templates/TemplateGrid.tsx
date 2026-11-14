"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { Template } from "@/types";
import { TemplateCard } from "./TemplateCard";
import { TemplateSelectionBar } from "./TemplateSelectionBar";

const CATEGORIES = ["All", "Minimal", "Vintage", "Racing", "Magazine", "Artistic"] as const;
type CategoryType = (typeof CATEGORIES)[number];

function matchesCategoryFilter(template: Template, cat: CategoryType): boolean {
  if (cat === "All") return true;

  const c = (template.category || "").toLowerCase();
  const n = (template.name || "").toLowerCase();
  const d = (template.description || "").toLowerCase();
  const t = (template.tag || "").toLowerCase();

  switch (cat) {
    case "Minimal":
      return (
        c.includes("spec") ||
        c.includes("minimal") ||
        c.includes("gallery") ||
        n.includes("minimal") ||
        n.includes("spec") ||
        d.includes("white") ||
        d.includes("clean") ||
        d.includes("monochromatic")
      );
    case "Vintage":
      return (
        c.includes("heritage") ||
        c.includes("classic") ||
        c.includes("iconic") ||
        n.includes("heritage") ||
        n.includes("shelby") ||
        n.includes("mustang") ||
        n.includes("ferrari f40") ||
        n.includes("carrera gt") ||
        d.includes("vintage") ||
        d.includes("retro") ||
        d.includes("golden")
      );
    case "Racing":
      return (
        c.includes("racing") ||
        c.includes("motorsport") ||
        c.includes("track") ||
        n.includes("gt3") ||
        n.includes("apex") ||
        n.includes("m4") ||
        n.includes("competition") ||
        n.includes("csl") ||
        n.includes("speed") ||
        t.includes("racing") ||
        t.includes("track")
      );
    case "Magazine":
      return (
        c.includes("modern") ||
        c.includes("jdm") ||
        n.includes("supra") ||
        n.includes("cle 53") ||
        n.includes("skyline") ||
        n.includes("240sx") ||
        d.includes("magazine") ||
        d.includes("split panel") ||
        d.includes("showcase") ||
        d.includes("tribute")
      );
    case "Artistic":
      return (
        c.includes("art") ||
        c.includes("graffiti") ||
        c.includes("cyber") ||
        c.includes("hypercar") ||
        c.includes("fine art") ||
        n.includes("graffiti") ||
        n.includes("storm") ||
        n.includes("halo") ||
        n.includes("afterburner") ||
        n.includes("jesko") ||
        n.includes("zonda") ||
        n.includes("rules") ||
        d.includes("graffiti") ||
        d.includes("painting")
      );
    default:
      return true;
  }
}

export function TemplateGrid() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [search, setSearch] = useState("");

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesCat = matchesCategoryFilter(tpl, selectedCategory);
    const q = search.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesSearch =
      tpl.name.toLowerCase().includes(q) ||
      tpl.subtitle.toLowerCase().includes(q) ||
      tpl.category.toLowerCase().includes(q) ||
      tpl.tag.toLowerCase().includes(q) ||
      tpl.description.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-28">
      {/* 1. Full-Width Search Input Bar */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl sm:rounded-2xl border border-[var(--border)] bg-neutral-900/70 py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-[var(--foreground)] placeholder-[var(--foreground-muted)] backdrop-blur-md transition-all focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
          <Search size={16} className="shrink-0 text-neutral-400" strokeWidth={2} />
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

      {/* 2. Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white text-black shadow-md shadow-white/10"
                  : "bg-neutral-900/80 text-neutral-400 border border-white/[0.08] hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. Poster Grid: 2 in a row on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {filtered.map((tpl) => (
          <TemplateCard key={tpl.id} template={tpl} />
        ))}
      </div>

      {/* Empty Search State */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 py-20 text-center">
          <p className="text-sm font-medium text-neutral-400">
            No poster templates match &ldquo;{search}&rdquo; in {selectedCategory}.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-xs font-semibold text-brand hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. Mid-Bottom Floating Selection Bar (Extracted Component) */}
      <TemplateSelectionBar />
    </div>
  );
}
