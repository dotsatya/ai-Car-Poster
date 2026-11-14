"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, Package, Heart, Sparkles } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

export function AccountNav() {
  const pathname = usePathname();
  const { user } = useStudio();

  const avatarLetter = user?.email
    ? user.email.trim().charAt(0).toUpperCase()
    : "U";

  const tabs = [
    { label: "Overview", href: "/account", icon: User },
    { label: "Generated Posters", href: "/account/generated", icon: Sparkles },
    { label: "My Orders", href: "/orders", icon: Package },
    { label: "Wishlist", href: "/account/wishlist", icon: Heart },
    { label: "My Addresses", href: "/account/addresses", icon: MapPin },
  ];

  return (
    <div className="border-b border-white/[0.08] bg-[#0d0e10]/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-4">
        {/* User Monogram & Identity Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 via-neutral-900 to-neutral-950 border border-brand/40 text-white font-bold text-lg sm:text-xl shadow-lg shadow-brand/10">
              {avatarLetter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md" title={user?.email || "Atelier Member"}>
                  {user?.email || "Atelier Member"}
                </h1>
                <span className="rounded-full bg-brand/10 border border-brand/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand shrink-0">
                  {user ? "Authenticated" : "Guest"}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 font-mono truncate max-w-xs sm:max-w-md">
                {user ? "Personal ID: " + user.email : "Sign in to synchronize commissions"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/studio"
              className="rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition-all cursor-pointer"
            >
              Open Studio →
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              pathname === tab.href ||
              (tab.href === "/account" && pathname === "/account") ||
              (tab.href === "/orders" && (pathname === "/orders" || pathname === "/account/orders"));

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] text-white font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-brand" : "text-neutral-400"
                  }`}
                />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
