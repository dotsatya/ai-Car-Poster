"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Package, Heart, Truck, Sparkles } from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { useAppAuth } from "@/lib/auth";
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

export default function AccountPage() {
  const { user, setIsSignInOpen } = useAppAuth();
  const { generatedArtworks } = useStudio();

  const favouritesRaw = useSyncExternalStore(
    subscribeFavourites,
    getFavouritesRaw,
    () => "[]"
  );

  let wishlistCount = 0;
  try {
    const parsed = JSON.parse(favouritesRaw);
    if (Array.isArray(parsed)) wishlistCount = parsed.length;
  } catch {
    wishlistCount = 0;
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Shared Account Navigation */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8">
        {!user && (
          <div className="mb-4 sm:mb-6 rounded-xl border border-brand/30 bg-brand/10 p-3 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 hover:border-brand/50 transition-all duration-300">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold text-white">
                You are viewing sample account data.
              </p>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 mt-0.5">
                Sign in to sync your personalized archival poster orders, favorites, and saved delivery addresses.
              </p>
            </div>
            <button
              onClick={() => setIsSignInOpen(true)}
              className="rounded-lg sm:rounded-xl bg-brand hover:bg-brand-hover px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer whitespace-nowrap"
            >
              Sign In with OTP
            </button>
          </div>
        )}

        {/* Subsection Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-3.5 sm:mb-6">
          <div>
            <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white">
              Collector Overview
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
              Real-time summary of your atelier commissions, shipments, and creative pipeline.
            </p>
          </div>
        </div>

        {/* Quick Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <Link
            href="/account/orders"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-3.5 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer min-w-0"
          >
            <div className="flex items-center justify-between text-neutral-400 gap-1">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate">Active Shipments</span>
              <Truck className="h-4 w-4 text-brand shrink-0" />
            </div>
            <div className="mt-2 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">1</div>
            <p className="mt-1 text-[10px] sm:text-[11px] text-emerald-400 font-medium truncate">In Transit via DHL Air</p>
          </Link>

          <Link
            href="/account/orders"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-3.5 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer min-w-0"
          >
            <div className="flex items-center justify-between text-neutral-400 gap-1">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate">Delivered Prints</span>
              <Package className="h-4 w-4 text-neutral-400 group-hover:text-white shrink-0" />
            </div>
            <div className="mt-2 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">3</div>
            <p className="mt-1 text-[10px] sm:text-[11px] text-neutral-400 font-medium truncate">Museum Sealed</p>
          </Link>

          <Link
            href="/account/wishlist"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-3.5 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer min-w-0"
          >
            <div className="flex items-center justify-between text-neutral-400 gap-1">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate">Wishlist Posters</span>
              <Heart className="h-4 w-4 text-brand shrink-0" />
            </div>
            <div className="mt-2 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white truncate">
              {wishlistCount > 0 ? wishlistCount : "Saved"}
            </div>
            <p className="mt-1 text-[10px] sm:text-[11px] text-neutral-400 font-medium truncate">
              {wishlistCount > 0 ? `${wishlistCount} saved design${wishlistCount > 1 ? "s" : ""}` : "Favorite artworks"}
            </p>
          </Link>

          <Link
            href="/account/generated"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-3.5 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer min-w-0"
          >
            <div className="flex items-center justify-between text-neutral-400 gap-1">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate">Generated Posters</span>
              <Sparkles className="h-4 w-4 text-brand shrink-0" />
            </div>
            <div className="mt-2 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              {generatedArtworks.length}
            </div>
            <p className="mt-1 text-[10px] sm:text-[11px] text-neutral-400 font-medium truncate">
              {generatedArtworks.length} created in studio
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
