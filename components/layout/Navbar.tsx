"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { useAppAuth } from "@/lib/auth";

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut, setIsSignInOpen } = useAppAuth();
  const {
    setIsCartOpen,
    setIsSearchOpen,
    cartItems,
  } = useStudio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    if (!isUserMenuOpen && !isMobileUserMenuOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        isMobileUserMenuOpen &&
        mobileUserMenuRef.current &&
        !mobileUserMenuRef.current.contains(target)
      ) {
        setIsMobileUserMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsUserMenuOpen(false);
        setIsMobileUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUserMenuOpen, isMobileUserMenuOpen]);

  const navLinks = [
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ];

  const avatarLetter = user?.email
    ? user.email.trim().charAt(0).toUpperCase()
    : "U";

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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Icons & Profile */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
            aria-label="Search"
            title="Search Templates"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
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

          {/* User Profile Avatar with Sleek Dropdown (or Sign In Button) */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                aria-label="User Account Menu"
                className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer ${
                  isUserMenuOpen
                    ? "border-brand ring-2 ring-brand/40 shadow-brand/20 scale-105"
                    : "border-white/20 hover:border-white/40 hover:scale-105"
                }`}
                title={user.email}
              >
                <span>{avatarLetter}</span>
              </button>

              {/* Minimal Luxury Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/[0.08] bg-[#121215]/95 p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 hover:border-white/20 transition-all duration-300"
                >
                  {/* Dropdown Header: Avatar + User Email */}
                  <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.08]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 border border-brand/30 text-white font-bold text-sm shadow-inner">
                      {avatarLetter}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white truncate" title={user.email}>
                        {user.email}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-medium">
                        Atelier Collector
                      </p>
                    </div>
                  </div>

                  {/* Menu Links: My Dashboard, My Account */}
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                      role="menuitem"
                    >
                      <LayoutDashboard className="h-4 w-4 text-neutral-400 shrink-0" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href="/account/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                      role="menuitem"
                    >
                      <UserIcon className="h-4 w-4 text-neutral-400 shrink-0" />
                      <span>My Account</span>
                    </Link>
                  </div>

                  {/* Sign Out Item */}
                  <div className="pt-1 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer text-left"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 text-red-400 shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsSignInOpen(true)}
              className="rounded-full bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
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
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-neutral-300 hover:bg-white/[0.06] hover:text-white cursor-pointer"
            aria-label="Search templates"
            title="Search"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Mobile Shopping Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-neutral-300 hover:bg-white/[0.06] hover:text-white cursor-pointer"
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

          {/* Mobile User Avatar with Dedicated Account Dropdown (or Sign In button) */}
          {user ? (
            <div className="relative" ref={mobileUserMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileUserMenuOpen(!isMobileUserMenuOpen);
                }}
                aria-expanded={isMobileUserMenuOpen}
                aria-haspopup="true"
                aria-label="User Account Menu"
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border text-white font-bold text-xs shadow-sm transition-all duration-200 cursor-pointer ${
                  isMobileUserMenuOpen
                    ? "border-brand ring-2 ring-brand/40 shadow-brand/20 scale-105"
                    : "border-brand/50 hover:border-brand hover:scale-105"
                }`}
                title={user.email}
              >
                <span>{avatarLetter}</span>
              </button>

              {/* Dedicated Mobile Account Dropdown Menu */}
              {isMobileUserMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-xl border border-white/[0.08] bg-[#121215]/98 p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* Dropdown Header: Avatar + User Email */}
                  <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.08]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 border border-brand/30 text-white font-bold text-xs shadow-inner">
                      {avatarLetter}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white truncate" title={user.email}>
                        {user.email}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-medium">
                        Atelier Collector
                      </p>
                    </div>
                  </div>

                  {/* Menu Links: My Dashboard, My Account */}
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/account"
                      onClick={() => setIsMobileUserMenuOpen(false)}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                      role="menuitem"
                    >
                      <LayoutDashboard className="h-4 w-4 text-neutral-400 shrink-0" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href="/account/settings"
                      onClick={() => setIsMobileUserMenuOpen(false)}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                      role="menuitem"
                    >
                      <UserIcon className="h-4 w-4 text-neutral-400 shrink-0" />
                      <span>My Account</span>
                    </Link>
                  </div>

                  {/* Sign Out Item */}
                  <div className="pt-1 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileUserMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer text-left"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 text-red-400 shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSignInOpen(true)}
              className="rounded-full bg-brand hover:bg-brand-hover px-2.5 sm:px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              setIsMobileUserMenuOpen(false);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white cursor-pointer"
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

      {/* Mobile Drawer Menu (Three-bar icon: Pure navigation without account settings) */}
      {isMobileMenuOpen && (
        <div className="border-b border-white/10 bg-bg-primary/95 px-4 py-4 md:hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 font-semibold text-white"
                      : "hover:bg-white/[0.04] text-neutral-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Direct Studio Link */}
            <div className="pt-3 border-t border-white/10 mt-2">
              <Link
                href="/studio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer"
              >
                <span>Launch Creation Studio</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
