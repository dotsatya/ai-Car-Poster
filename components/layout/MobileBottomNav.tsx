"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Tag,
  ShoppingCart,
  User,
  LayoutDashboard,
  Package,
  LogOut,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { useAppAuth } from "@/lib/auth";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user, signOut, setIsSignInOpen } = useAppAuth();
  const { setIsCartOpen, cartItems } = useStudio();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close account popover on outside click, touch, or escape key
  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAccountMenuOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isAccountMenuOpen) {
      setIsAccountMenuOpen(false);
    }
  }

  const avatarLetter = user?.email
    ? user.email.trim().charAt(0).toUpperCase()
    : "U";

  const isTemplatesActive = pathname ? pathname.startsWith("/templates") : false;
  const isPricingActive = pathname === "/pricing";
  const isAccountActive =
    isAccountMenuOpen || (pathname ? pathname.startsWith("/account") : false);

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-white/[0.08] bg-[#0B0D10]/95 backdrop-blur-2xl shadow-[0_-8px_24px_rgba(0,0,0,0.8)]"
    >
      <div className="mx-auto max-w-md px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-4 items-center justify-items-center">
          {/* 1. Templates Tab */}
          <Link
            href="/templates"
            aria-label="Templates"
            className={`flex h-9 w-14 sm:w-16 items-center justify-center rounded-md transition-all duration-200 ${
              isTemplatesActive
                ? "bg-[#25272c] text-brand shadow-sm ring-1 ring-white/5"
                : "text-white hover:text-white/80"
            }`}
          >
            <LayoutGrid className="h-5 w-5 shrink-0" />
          </Link>

          {/* 2. Pricing Tab */}
          <Link
            href="/pricing"
            aria-label="Pricing"
            className={`flex h-9 w-14 sm:w-16 items-center justify-center rounded-md transition-all duration-200 ${
              isPricingActive
                ? "bg-[#25272c] text-brand shadow-sm ring-1 ring-white/5"
                : "text-white hover:text-white/80"
            }`}
          >
            <Tag className="h-5 w-5 shrink-0" />
          </Link>

          {/* 3. Cart Tab */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="relative flex h-9 w-14 sm:w-16 items-center justify-center rounded-md text-white hover:text-white/80 transition-colors cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 shrink-0" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-white shadow-sm ring-1 ring-[#0B0D10] animate-in zoom-in-75 duration-150">
                  {cartItems.length}
                </span>
              )}
            </div>
          </button>

          {/* 4. Sign In / Profile Tab */}
          <div className="relative flex items-center justify-center" ref={accountMenuRef}>
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                  aria-expanded={isAccountMenuOpen}
                  aria-haspopup="true"
                  aria-label="User Account Menu"
                  className="flex h-9 w-14 sm:w-16 items-center justify-center rounded-md transition-all duration-200 cursor-pointer"
                >
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs font-bold text-white transition-all ${
                      isAccountActive
                        ? "border border-brand bg-[#101215]"
                        : "border border-brand bg-[#101215] hover:ring-1 hover:ring-brand/30"
                    }`}
                  >
                    <span>{avatarLetter}</span>
                  </div>
                </button>

                {/* Account Popover Menu Floating Above Bottom Navigation */}
                {isAccountMenuOpen && (
                  <div
                    role="menu"
                    className="absolute bottom-full right-0 mb-3 w-64 max-w-[calc(100vw-2rem)] rounded-md border border-white/[0.12] bg-[#121215]/98 p-1.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-150"
                  >
                    {/* Header: Avatar + User Email */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.08]">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#101215] border border-brand text-white font-bold text-xs shadow-inner">
                        {avatarLetter}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-xs font-semibold text-white truncate"
                          title={user.email}
                        >
                          {user.email}
                        </p>
                        <p className="text-[10px] text-neutral-400 font-medium">
                          Atelier Collector
                        </p>
                      </div>
                    </div>

                    {/* Menu Links */}
                    <div className="py-1 space-y-0.5">
                      <Link
                        href="/account"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                        role="menuitem"
                      >
                        <LayoutDashboard className="h-4 w-4 text-neutral-400 shrink-0" />
                        <span>My Dashboard</span>
                      </Link>

                      <Link
                        href="/account/orders"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                        role="menuitem"
                      >
                        <Package className="h-4 w-4 text-neutral-400 shrink-0" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        href="/account/settings"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                        role="menuitem"
                      >
                        <User className="h-4 w-4 text-neutral-400 shrink-0" />
                        <span>My Account</span>
                      </Link>
                    </div>

                    {/* Sign Out Item */}
                    <div className="pt-1 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          signOut();
                        }}
                        className="flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer text-left"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4 text-red-400 shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsSignInOpen(true)}
                aria-label="Sign In"
                className="flex h-9 w-14 sm:w-16 items-center justify-center rounded-md text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                <User className="h-5 w-5 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
