"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Check, Plus } from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { TEMPLATES } from "@/data/templates";

export function SearchModal() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen, selectedTemplates, toggleTemplate } = useStudio();
  const [query, setQuery] = useState("");

  // Handle escape key and body scroll lock when modal is open
  useEffect(() => {
    if (!isSearchOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const isSearching = query.trim().length > 0;

  const filtered = TEMPLATES.filter((t) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tag.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  });

  // When not searching: show top 4 most searched items (2x2 grid)
  // When searching: show top matching items (up to 6 in 2 columns)
  const displayedTemplates = isSearching ? filtered.slice(0, 6) : TEMPLATES.slice(0, 4);

  return (
    <div
      onClick={() => setIsSearchOpen(false)}
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/85 p-3 sm:p-4 pt-4 sm:pt-12 md:pt-16 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-xl sm:rounded-2xl border border-white/[0.1] bg-[#121418] shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-200"
      >
        {/* Header / Search Input */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-3 border-b border-white/[0.08] p-3.5 sm:p-4 shrink-0 bg-white/[0.01]">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Search templates (e.g. Noir, GT3, Monaco)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-md p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="rounded-md p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close search modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content / Results */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 min-h-0 space-y-3">
          <div className="flex items-center justify-between pb-0.5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400">
              {isSearching ? `Search Results (${filtered.length})` : "Most Searched"}
            </span>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[11px] font-medium text-brand hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {displayedTemplates.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-medium text-neutral-300">
                No templates found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-neutral-500">
                Try searching by category like &quot;Racing&quot;, &quot;Vintage&quot;, or car model like &quot;Porsche&quot;
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {displayedTemplates.map((tpl) => {
                const isSelected = selectedTemplates.includes(tpl.id);
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      if (!isSelected) {
                        toggleTemplate(tpl.id);
                      }
                      setIsSearchOpen(false);
                      router.push("/studio");
                    }}
                    className={`group flex items-center justify-between gap-2.5 rounded-md border p-2 sm:p-2.5 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-brand/50 bg-[#111114] ring-1 ring-brand/20 shadow-[0_0_12px_rgba(217,39,46,0.15)]"
                        : "border-white/[0.06] bg-[#111114] hover:border-white/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    {/* Left: Little Picture & Right-Side Name */}
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="relative h-10 w-12 sm:h-11 sm:w-14 overflow-hidden rounded-md bg-neutral-900 shrink-0 border border-white/[0.06]">
                        <Image
                          src={tpl.image}
                          alt={tpl.name}
                          fill
                          sizes="56px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-brand transition-colors">
                          {tpl.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-neutral-400 truncate mt-0.5">
                          {tpl.category}
                        </p>
                      </div>
                    </div>

                    {/* Right: Clean Compact Select / Selected Button */}
                    <div className="shrink-0 flex items-center pl-1">
                      {isSelected ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTemplate(tpl.id);
                          }}
                          className="inline-flex items-center gap-1 rounded-md bg-brand text-white text-[11px] font-semibold px-2 py-1 shadow-sm ring-1 ring-brand/35 hover:bg-brand-hover transition-colors cursor-pointer"
                          title="Click to deselect"
                        >
                          <Check className="h-3 w-3 stroke-[2.5]" />
                          <span>Selected</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTemplate(tpl.id);
                          }}
                          className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/[0.05] text-neutral-300 hover:border-brand/60 hover:bg-brand hover:text-white text-[11px] font-semibold px-2 py-1 transition-colors cursor-pointer"
                          title="Click to select"
                        >
                          <Plus className="h-3 w-3 stroke-[2.5]" />
                          <span>Select</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
