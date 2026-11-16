"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Printer,
  LayoutGrid,
  Package,
  ArrowRight,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-bg-primary pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10 border-b border-white/[0.06]"
    >
      {/* Cinematic Studio Lighting Ambience */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-red-600/10 via-amber-500/5 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 h-[400px] w-[500px] rounded-full bg-white/[0.02] blur-3xl"
        aria-hidden="true"
      />

      {/* Main Content: Left Copy + Right 3D Leaning Posters */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6 lg:pr-4">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
                AI-POWERED CAR POSTERS
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white leading-[1.05]">
              Turn Your Car Into <br className="hidden sm:inline" />
              <span>A Premium Poster</span>
            </h1>

            <p className="text-xs sm:text-base lg:text-lg leading-relaxed text-neutral-400 max-w-xl">
              Upload your car photo, choose a design, and get stunning,
              print-ready automotive posters powered by AI.
            </p>

            <div className="pt-1.5 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <Link
                href="/templates"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>CHOOSE TEMPLATES</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Leaning Framed Posters Studio Visual */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end w-full">
            <div className="group relative w-full max-w-[340px] xs:max-w-[390px] sm:max-w-[460px] md:max-w-[490px] lg:max-w-[440px] xl:max-w-[480px] 2xl:max-w-[530px] aspect-[1465/1073]">
              <Image
                src="/hero.png"
                alt="AI-Powered Porsche 911 GT3 RS Leaning Framed Gallery Posters"
                fill
                priority
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 460px, (max-width: 1280px) 440px, 480px"
                className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Subtle Atelier Spec Badge */}
              <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 sm:px-3 sm:py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-neutral-300">
                  Museum Acrylic Frame · 300 DPI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features / Value Proposition Bar */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full mt-6 sm:mt-8 lg:mt-10 pt-5 sm:pt-6 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans normal-case text-sm font-bold text-white tracking-wide">
                AI-Generated Designs
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                Unique posters from your car photo
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans normal-case text-sm font-bold text-white tracking-wide">
                Print-Ready Quality
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                High-resolution, up to 300 DPI
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans normal-case text-sm font-bold text-white tracking-wide">
                Premium Templates
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                Curated designs for car enthusiasts
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans normal-case text-sm font-bold text-white tracking-wide">
                Worldwide Shipping
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                Get your poster delivered to your door
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
