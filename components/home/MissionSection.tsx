"use client";

import { useState } from "react";
import Image from "next/image";

export function MissionSection() {
  const [activeHeroTab, setActiveHeroTab] = useState<"after" | "before">("after");

  return (
    <section id="how-it-works" className="relative border-t border-white/[0.06] bg-bg-primary py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Photo Comparison */}
          <div className="relative lg:col-span-6">
            <div className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900 shadow-2xl hover:border-white/20 transition-all duration-300">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={
                    activeHeroTab === "after"
                      ? "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=85"
                      : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80"
                  }
                  alt="Exotic car in industrial garage with atmospheric lighting"
                  fill
                  className="object-cover object-center filter contrast-125 transition-all duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 rounded-xl border border-white/10 bg-black/80 p-1.5 sm:p-2 backdrop-blur-md">
                  <div className="flex gap-1 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveHeroTab("before")}
                      className={`flex-1 sm:flex-initial rounded-lg px-2 sm:px-2.5 py-1 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all text-center ${
                        activeHeroTab === "before" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Customer Photo
                    </button>
                    <button
                      onClick={() => setActiveHeroTab("after")}
                      className={`flex-1 sm:flex-initial rounded-lg px-2 sm:px-2.5 py-1 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all text-center ${
                        activeHeroTab === "after" ? "bg-brand text-white" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      AI Master Poster
                    </button>
                  </div>
                  <span className="text-[8px] sm:text-[9px] tracking-wider text-neutral-400 uppercase text-center">
                    {activeHeroTab === "after" ? "Studio Noir V4.2" : "Original Raw Upload"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Steps */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand font-mono">
                THE ATELIER STANDARD
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading uppercase">
              Deliver Unmatched Luxury Performance
            </h2>
            <p className="mt-1 text-base sm:text-lg font-light text-neutral-300 lg:text-xl">
              and Exceptional Experiences
            </p>

            <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
              To deliver a premium, transparent automotive art crafting experience that exceeds expectations. We believe
              luxury is not an option—it is a standard. Every interaction, every template, and every generated fine art
              print reflects our commitment to excellence.
            </p>

            <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 sm:p-3.5 transition-colors hover:border-white/10">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 font-mono text-[10px] sm:text-xs font-bold text-brand">
                  01
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Select Up To 3 Templates</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                    Choose from Vintage Monaco, Architectural Blueprint, Dark Studio, or Cyber Apex.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 sm:p-3.5 transition-colors hover:border-white/10">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 font-mono text-[10px] sm:text-xs font-bold text-brand">
                  02
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Upload Your Vehicle Photograph</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                    Any lighting or setting. Our machine vision isolates contours, wheels, and aerodynamic surfaces.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 sm:p-3.5 transition-colors hover:border-white/10">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 font-mono text-[10px] sm:text-xs font-bold text-brand">
                  03
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Sign In &amp; Generate Previews</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                    Authenticate securely (Passcode: 0000), preserving your inputs, and receive high-res previews + optional combined triptych.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 sm:p-3.5 transition-colors hover:border-white/10">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 font-mono text-[10px] sm:text-xs font-bold text-brand">
                  04
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Museum-Grade Printing &amp; Global Dispatch</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                    Select print sizes, review cart, and receive your serialized framed fine art print.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
