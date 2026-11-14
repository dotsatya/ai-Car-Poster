"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Template } from "@/types";
import { useStudio } from "@/context/StudioContext";

interface TemplateCardProps {
  template: Template;
  showDetailsLink?: boolean;
}

const FAVOURITES_EVENT = "poster_gen_favourites_changed";

function subscribeFavourites(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(FAVOURITES_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FAVOURITES_EVENT, callback);
  };
}

function getFavouritesRaw(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem("poster_gen_favourites") || "[]";
  } catch {
    return "[]";
  }
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { selectedTemplates, toggleTemplate } = useStudio();
  const isSelected = selectedTemplates.includes(template.id);
  const selectionIndex = selectedTemplates.indexOf(template.id);

  const favouritesRaw = useSyncExternalStore(
    subscribeFavourites,
    getFavouritesRaw,
    () => "[]",
  );
  const isFavourite = favouritesRaw.includes(`"${template.id}"`);

  const toggleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs: string[] = JSON.parse(getFavouritesRaw());
      const nextState = !isFavourite;
      const updated = nextState
        ? Array.from(new Set([...favs, template.id]))
        : favs.filter((id) => id !== template.id);
      localStorage.setItem("poster_gen_favourites", JSON.stringify(updated));
      window.dispatchEvent(new Event(FAVOURITES_EVENT));
      if (nextState) {
        toast.success(`Added "${template.name}" to favourites`);
      } else {
        toast(`Removed "${template.name}" from favourites`);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-xl border transition-all duration-300 ${
        isSelected
          ? "border border-brand/50 bg-[#111114] shadow-[0_0_15px_rgba(217,39,46,0.18)] ring-1 ring-brand/20 -translate-y-1"
          : "border-white/[0.08] bg-[#111114] hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80"
      }`}
    >
      {/* Selected Indicator Badge on Top-Left (Matches Luxury Reference) */}
      {isSelected && (
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 pointer-events-none">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-brand/90 text-white shadow-md shadow-brand/25 ring-1 ring-white/20 animate-in zoom-in-75 duration-200">
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
          </span>
        </div>
      )}

      {/* Top-Right Heart Button on the Template Card */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20">
        <button
          type="button"
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
          onClick={toggleFavourite}
          className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
            isFavourite
              ? "border-brand/40 bg-black/80 text-brand scale-105 shadow-brand/30"
              : "border-white/20 bg-black/60 text-white/80 hover:border-white hover:text-white hover:bg-black/90 hover:scale-110"
          }`}
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all ${
              isFavourite ? "fill-brand text-brand stroke-brand" : "stroke-[2]"
            }`}
          />
        </button>
      </div>

      {/* Clicking the poster or card navigates to the template details page */}
      <Link
        href={`/templates/${template.slug}`}
        className="block p-2.5 sm:p-3 pb-3"
      >
        {/* Poster Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl sm:rounded-xl bg-black">
          <Image
            src={template.image}
            alt={template.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Subtle dark gradient overlay on hover revealing short description & specs */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-3 sm:p-3.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
            <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
              {template.name}
            </p>
            <p className="mt-1 text-[11px] sm:text-xs text-neutral-300 leading-relaxed line-clamp-2 font-medium">
              {template.description}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-400 font-medium">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {template.category}
              </span>
              <span>•</span>
              <span>300 DPI</span>
              <span>•</span>
              <span>Multiple Sizes</span>
            </div>
          </div>

          {/* Selected index badge in normal state */}
          {isSelected && (
            <div className="absolute bottom-2 left-2 z-10 pointer-events-none transition-opacity duration-200 group-hover:opacity-0">
              <span className="rounded-full bg-brand/85 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/25">
                #{selectionIndex + 1} Selected
              </span>
            </div>
          )}
        </div>

        {/* Info Area Below Image */}
        <div className="mt-2.5 sm:mt-3 px-1">
          <h3 className="font-sans normal-case text-xs sm:text-sm md:text-base font-bold text-white tracking-wide truncate group-hover:text-brand transition-colors">
            {template.name}
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-xs text-neutral-400 truncate font-sans">
            {template.category}
          </p>

          {/* Bottom Row: "+ Add" Button on the Bottom Left; Starting Price on the Bottom Right */}
          <div className="mt-2.5 pt-1.5 flex items-center justify-between border-t border-white/[0.06]">
            {/* Bottom Left: "+ Add" / "✓ Added" Button with Tooltip */}
            <div className="relative group/btn">
              <button
                type="button"
                aria-label={
                  isSelected ? "Remove from Selection" : "Add to Selection"
                }
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTemplate(template.id);
                }}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.98] ${
                  isSelected
                    ? "bg-brand/90 text-white shadow-brand/30 hover:shadow-brand/50 ring-1 ring-brand/35 hover:bg-brand"
                    : "border border-white/20 bg-white/[0.06] text-white hover:border-brand/60 hover:bg-brand/80 hover:text-white hover:shadow-sm hover:shadow-brand/30"
                }`}
              >
                {isSelected ? (
                  <>
                    <Trash2 className="h-3.5 w-3.5 stroke-[2]" />
                    <span className="hidden sm:block">Remove</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span className="hidden sm:block">Add</span>
                  </>
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full left-0 mb-1.5 hidden group-hover/btn:flex items-center pointer-events-none z-30">
                <div className="whitespace-nowrap rounded-md bg-black/95 px-2 py-1 text-[10px] font-semibold text-white shadow-xl border border-white/15">
                  {isSelected ? "Remove from Selection" : "Add to Selection"}
                </div>
              </div>
            </div>

            {/* Bottom Right: Starting Price */}
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
              {template.formattedStartingPrice
                ? `From ${template.formattedStartingPrice}`
                : "₹499"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
