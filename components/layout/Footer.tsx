"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg-primary py-8 text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-12">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4 text-center sm:text-left">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-sans text-sm font-bold tracking-[0.18em] text-white">
              POSTER <span className="text-brand">GEN</span>
            </span>
          </Link>
          <span className="hidden text-neutral-600 sm:inline">|</span>
          <p className="text-xs text-neutral-400">
            © 2026 POSTER GEN. All rights reserved.
          </p>
        </div>

        {/* Minimal Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <Link href="/templates" className="text-neutral-400 hover:text-white transition-colors">
            Templates
          </Link>
          <Link href="/studio" className="text-neutral-400 hover:text-white transition-colors">
            Studio
          </Link>
          <Link href="/how-it-works" className="text-neutral-400 hover:text-white transition-colors">
            Process
          </Link>
          <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/faq" className="text-neutral-400 hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
