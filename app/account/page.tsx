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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {!user && (
          <div className="mb-8 rounded-xl border border-brand/30 bg-brand/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-brand/50 transition-all duration-300">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                You are viewing sample account data.
              </p>
              <p className="text-xs text-neutral-300 mt-0.5">
                Sign in to sync your personalized archival poster orders, favorites, and saved delivery addresses.
              </p>
            </div>
            <button
              onClick={() => setIsSignInOpen(true)}
              className="rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] whitespace-nowrap"
            >
              Sign In with OTP
            </button>
          </div>
        )}

        {/* Subsection Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              Collector Overview
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Real-time summary of your atelier commissions, shipments, and creative pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/studio"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <span>Launch Studio</span>
            </Link>
          </div>
        </div>

        {/* Sub-bar metadata row */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
          <span>Active Atelier Member</span>
          <span>Available for physical print &amp; studio generation</span>
        </div>

        {/* Quick Summary Metric Cards: Active Shipments, Delivered Prints, Wishlist Posters, Generated Posters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/account/orders"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-4 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Active Shipments</span>
              <Truck className="h-4 w-4 text-brand" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">1</div>
            <p className="mt-1 text-[11px] text-emerald-400 font-medium">In Transit via DHL Air</p>
          </Link>

          <Link
            href="/account/orders"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-4 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Delivered Prints</span>
              <Package className="h-4 w-4 text-neutral-400 group-hover:text-white" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">3</div>
            <p className="mt-1 text-[11px] text-neutral-400 font-medium">Museum Sealed</p>
          </Link>

          <Link
            href="/account/wishlist"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-4 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Wishlist Posters</span>
              <Heart className="h-4 w-4 text-brand" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {wishlistCount > 0 ? wishlistCount : "Saved"}
            </div>
            <p className="mt-1 text-[11px] text-neutral-400 font-medium">
              {wishlistCount > 0 ? `${wishlistCount} saved design${wishlistCount > 1 ? "s" : ""}` : "Favorite artworks"}
            </p>
          </Link>

          <Link
            href="/account/generated"
            className="group rounded-xl border border-white/[0.08] bg-neutral-900/50 p-4 sm:p-5 hover:border-white/25 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Generated Posters</span>
              <Sparkles className="h-4 w-4 text-brand" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {generatedArtworks.length}
            </div>
            <p className="mt-1 text-[11px] text-neutral-400 font-medium">
              {generatedArtworks.length} created in studio
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
