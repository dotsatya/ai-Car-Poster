"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Tag,
  ShoppingCart,
  User,
  HomeIcon,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { setIsCartOpen, cartItems } = useStudio();

  const isHomeActive = pathname === "/";
  const isTemplatesActive = pathname ? pathname.startsWith("/templates") : false;
  const isPricingActive = pathname === "/pricing";
  const isAccountActive = pathname ? pathname.startsWith("/account") : false;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-white/[0.08] bg-[#0B0D10]/95 backdrop-blur-2xl shadow-[0_-8px_24px_rgba(0,0,0,0.8)]"
    >
      <div className="mx-auto max-w-md px-2 py-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-5 items-center justify-items-center gap-1">
          {/* Home Tab */}
          <Link
            href="/"
            aria-label="Home"
            className={`group flex flex-col items-center justify-center w-full py-1 px-1 rounded-md transition-all duration-200 ${
              isHomeActive
                ? "bg-[#181818] text-brand shadow-sm ring-1 ring-white/5 font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span
              className={`text-[10px] tracking-tight mt-1 leading-none truncate max-w-full ${
                isHomeActive ? "text-brand font-semibold" : "text-neutral-400 group-hover:text-white"
              }`}
            >
              Home
            </span>
          </Link>

          {/* Templates Tab */}
          <Link
            href="/templates"
            aria-label="Templates"
            className={`group flex flex-col items-center justify-center w-full py-1 px-1 rounded-md transition-all duration-200 ${
              isTemplatesActive
                ? "bg-[#181818] text-brand shadow-sm ring-1 ring-white/5 font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span
              className={`text-[10px] tracking-tight mt-1 leading-none truncate max-w-full ${
                isTemplatesActive ? "text-brand font-semibold" : "text-neutral-400 group-hover:text-white"
              }`}
            >
              Templates
            </span>
          </Link>

          {/* Pricing Tab */}
          <Link
            href="/pricing"
            aria-label="Pricing"
            className={`group flex flex-col items-center justify-center w-full py-1 px-1 rounded-md transition-all duration-200 ${
              isPricingActive
                ? "bg-[#181818] text-brand shadow-sm ring-1 ring-white/5 font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Tag className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span
              className={`text-[10px] tracking-tight mt-1 leading-none truncate max-w-full ${
                isPricingActive ? "text-brand font-semibold" : "text-neutral-400 group-hover:text-white"
              }`}
            >
              Pricing
            </span>
          </Link>

          {/* Cart Tab */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="group flex flex-col items-center justify-center w-full py-1 px-1 rounded-md text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 flex h-3.5 min-w-3.5 px-1 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-white shadow-sm ring-1 ring-[#0B0D10] animate-in zoom-in-75 duration-150">
                  {cartItems.length}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 leading-none truncate max-w-full text-neutral-400 group-hover:text-white">
              Cart
            </span>
          </button>

          {/* Dashboard / Account Tab */}
          <Link
            href="/account"
            aria-label="My Account"
            className={`group flex flex-col items-center justify-center w-full py-1 px-1 rounded-md transition-all duration-200 ${
              isAccountActive
                ? "bg-[#181818] text-brand shadow-sm ring-1 ring-white/5 font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span
              className={`text-[10px] tracking-tight mt-1 leading-none truncate max-w-full ${
                isAccountActive ? "text-brand font-semibold" : "text-neutral-400 group-hover:text-white"
              }`}
            >
              Account
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
