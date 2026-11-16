"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TEMPLATES } from "@/data/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { AccountNav } from "@/components/account/AccountNav";

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

export default function WishlistPage() {
  const favouritesRaw = useSyncExternalStore(
    subscribeFavourites,
    getFavouritesRaw,
    () => "[]"
  );

  let favouriteIds: string[] = [];
  try {
    const parsed = JSON.parse(favouritesRaw);
    if (Array.isArray(parsed)) {
      favouriteIds = parsed;
    }
  } catch {
    favouriteIds = [];
  }

  const wishlistedTemplates = TEMPLATES.filter((t) =>
    favouriteIds.includes(t.id) || favouriteIds.includes(t.slug)
  );

  const handleClearWishlist = () => {
    localStorage.removeItem("poster_gen_favourites");
    window.dispatchEvent(new Event(FAVOURITES_EVENT));
    toast("Wishlist cleared");
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Account Navigation */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-10">
        {/* Subsection Header */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider text-white">
              Saved Artworks &amp; Wishlist
            </h1>
          </div>

          {wishlistedTemplates.length > 0 && (
            <button
              type="button"
              onClick={handleClearWishlist}
              className="shrink-0 inline-flex items-center gap-1 rounded-lg sm:rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
            >
              <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {wishlistedTemplates.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 py-20 px-4 text-center max-w-2xl mx-auto space-y-4 hover:border-white/20 transition-all duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-800 border border-white/[0.08]">
              <Heart className="h-7 w-7 text-neutral-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Your Wishlist is Empty</h2>
              <p className="mt-1.5 text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Click the heart icon on any automotive poster template to save it here for fast comparison, custom framing, or ordering.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Browse Poster Templates</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {wishlistedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
        )}
      </main>
    </div>
  );
}
