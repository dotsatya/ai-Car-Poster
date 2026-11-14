"use client";

import Image from "next/image";
import { Sparkles, Printer, LayoutGrid, Package, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-0 sm:min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-bg-primary pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-12 lg:pb-12 border-b border-white/[0.06]"
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full my-auto">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6 lg:pr-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
                AI-POWERED CAR POSTERS
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[28px] sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.08]">
              Turn Your Car Into <br className="hidden sm:inline" />
              <span>A Premium Poster</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base lg:text-lg leading-relaxed text-neutral-400 max-w-xl">
              Upload a photo, choose a design, and get stunning, print-ready automotive posters powered by AI.
            </p>

            {/* Call to Actions */}
            <div className="pt-1.5 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <a
                href="#studio"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:bg-brand-hover hover:shadow-brand/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                <span>Create Your Poster</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.09] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                Browse Templates
              </a>
            </div>
          </div>

          {/* Right Column: 3D Leaning Framed Posters Studio Visual */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="group relative w-full max-w-[620px] aspect-[584/387] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-2xl shadow-black/80 transition-all duration-500 hover:border-white/20">
              <Image
                src="/hero-posters-showcase.webp"
                alt="AI-Powered Porsche 911 GT3 RS Leaning Framed Gallery Posters"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Soft studio vignette & floor light feather */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-primary/40 via-transparent to-transparent hidden lg:block" />

              {/* Subtle Atelier Spec Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-300">
                  Museum Acrylic Frame · 300 DPI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features / Value Proposition Bar */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Feature 1: AI-Generated Designs */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">AI-Generated Designs</h3>
              <p className="mt-0.5 text-xs text-neutral-400">Unique posters from your car photo</p>
            </div>
          </div>

          {/* Feature 2: Print-Ready Quality */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Print-Ready Quality</h3>
              <p className="mt-0.5 text-xs text-neutral-400">High-resolution, up to 300 DPI</p>
            </div>
          </div>

          {/* Feature 3: Premium Templates */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Premium Templates</h3>
              <p className="mt-0.5 text-xs text-neutral-400">Curated designs for car enthusiasts</p>
            </div>
          </div>

          {/* Feature 4: Worldwide Shipping */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Worldwide Shipping</h3>
              <p className="mt-0.5 text-xs text-neutral-400">Get your poster delivered to your door</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
