"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

export function Navbar() {
  const pathname = usePathname();
  const {
    user,
    signOut,
    setIsSignInOpen,
    setIsCartOpen,
    setIsSearchOpen,
    cartItems,
  } = useStudio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Templates", href: "/templates" },
    { label: "Process", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-bg-primary/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Brand Monogram & Logo */}
        <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-800 to-black p-[1px] shadow-lg shadow-black/80">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0F1012] transition-colors group-hover:bg-[#16181C]">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-brand transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="M12 2v7" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 15v7" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base sm:text-lg font-bold tracking-[0.14em] sm:tracking-[0.2em] text-white whitespace-nowrap">
              POSTER <span className="text-brand">GEN</span>
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.28em] text-neutral-400 uppercase whitespace-nowrap">
              Automotive Atelier
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-7 lg:gap-9 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-white font-medium"
                    : "text-neutral-400 hover:text-white font-normal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search Icon, Shopping Bag Icon, Sign In Button */}
        <div className="hidden items-center gap-5 md:flex">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="Search"
            title="Search Templates"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="Shopping Bag"
            title="Studio Bag"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow-sm">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Sign In or Authenticated User Pill */}
          {user ? (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pl-3 pr-1.5 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-neutral-200 truncate max-w-[130px]">
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="rounded-full bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 text-[10px] font-semibold text-neutral-300 hover:text-white transition-colors"
                title="Sign Out"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSignInOpen(true)}
              className="rounded-full bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand/25 hover:scale-105 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:hidden shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-neutral-300 hover:bg-white/[0.06] hover:text-white"
            aria-label="Search templates"
            title="Search"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Mobile Shopping Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-neutral-300 hover:bg-white/[0.06] hover:text-white"
            aria-label="Shopping Bag"
            title="Cart"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-brand text-[8px] sm:text-[9px] font-bold text-white shadow-sm">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-white/10 bg-bg-primary/95 px-4 py-4 md:hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-neutral-300">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-xl px-3.5 py-2 transition-colors ${
                    isActive
                      ? "bg-white/10 font-semibold text-white"
                      : "hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between border-t border-white/10 pt-2.5 px-2">
                  <span className="text-xs text-neutral-400 truncate max-w-[200px]">
                    {user.email}
                  </span>
                  <button
                    onClick={signOut}
                    className="text-xs font-semibold text-brand"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSignInOpen(true);
                  }}
                  className="rounded-xl px-3.5 py-2 text-xs sm:text-sm text-brand font-bold bg-brand/10 hover:bg-brand/20 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
