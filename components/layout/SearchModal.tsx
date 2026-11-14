"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { TEMPLATES } from "@/data/templates";

export function SearchModal() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen, selectedTemplates, toggleTemplate } = useStudio();
  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 pt-20 px-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-bg-primary p-4 sm:p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search size={18} className="text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Search templates (e.g. Monaco, Noir, Blueprint, Telemetry)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Matching Templates ({filtered.length})
          </span>
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => {
                toggleTemplate(tpl.id);
                setIsSearchOpen(false);
                router.push("/#studio");
              }}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-white/[0.04] p-3 transition-colors hover:border-brand/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-14 overflow-hidden rounded-md bg-neutral-900">
                  <Image src={tpl.image} alt={tpl.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{tpl.name}</h4>
                  <p className="text-xs text-neutral-400">{tpl.category} · {tpl.subtitle}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand">
                {selectedTemplates.includes(tpl.id) ? "Selected ✓" : "Select & Open Studio →"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
