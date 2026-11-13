"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#07080A] py-8 text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-12">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0F1012] border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#D9272E]" />
            </div>
            <span className="font-sans text-sm font-bold tracking-[0.18em] text-white">
              POSTER <span className="text-[#D9272E]">GEN</span>
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
            How It Works
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
