"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Heart, Scroll, User as UserIcon } from "lucide-react";
import { useAppAuth } from "@/lib/auth";

export function AccountNav() {
  const pathname = usePathname();
  const { user } = useAppAuth();

  const avatarLetter = user?.email
    ? user.email.trim().charAt(0).toUpperCase()
    : "U";

  const tabs = [
    { label: "My Posters", href: "/account/generated", icon: Scroll },
    { label: "My Orders", href: "/account/orders", icon: Package },
    { label: "My Wishlist", href: "/account/wishlist", icon: Heart },
    { label: "My Account", href: "/account/settings", icon: UserIcon },
  ];

  return (
    <div className="border-b border-white/[0.08] bg-[#0d0e10]/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 pt-3.5 sm:pt-6 pb-2 sm:pb-3">
        {/* User Monogram & Identity Banner on ONE single clean row */}
        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-brand/20 via-neutral-900 to-neutral-950 border border-brand/40 text-white font-bold text-sm sm:text-lg shadow-md shadow-brand/10">
              {avatarLetter}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-xs sm:text-base md:text-lg font-bold text-white tracking-wide truncate max-w-[160px] xs:max-w-[220px] sm:max-w-xs md:max-w-md" title={user?.email || "Atelier Member"}>
                  {user?.email || "Atelier Member"}
                </h1>
                <span className="rounded-full bg-brand/10 border border-brand/30 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-brand shrink-0">
                  {user ? "Active" : "Guest"}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 font-mono truncate max-w-[190px] xs:max-w-[260px] sm:max-w-xs md:max-w-md">
                {user ? user.email : "Sign in to synchronize commissions"}
              </p>
            </div>
          </div>

          {/* <Link
            href="/studio"
            className="shrink-0 rounded-md border border-white/15 bg-white/[0.04] hover:bg-white/10 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Studio →</span>
          </Link> */}
        </div>

        {/* Tab Navigation with hidden scrollbar */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none px-0.5 -mx-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              pathname === tab.href ||
              (tab.href === "/account/orders" && pathname.startsWith("/account/orders")) ||
              (tab.href === "/account/settings" && (pathname === "/account/settings" || pathname === "/account/addresses"));

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex items-center gap-1.5 sm:gap-2 rounded-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-white/[0.08] text-white font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                    isActive ? "text-brand" : "text-neutral-400"
                  }`}
                />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
