"use client";

import { useState } from "react";
import Image from "next/image";

export function MissionSection() {
  const [activeHeroTab, setActiveHeroTab] = useState<"after" | "before">("after");

  return (
    <section id="how-it-works" className="relative border-t border-white/[0.06] bg-[#08090A] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Photo Comparison */}
          <div className="relative lg:col-span-6">
            <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900 shadow-2xl">
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

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/70 p-2 backdrop-blur-md">
                  <div className="flex gap-1">
                    <button
                      onClick={() => setActiveHeroTab("before")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                        activeHeroTab === "before" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Customer Photo
                    </button>
                    <button
                      onClick={() => setActiveHeroTab("after")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                        activeHeroTab === "after" ? "bg-[#D9272E] text-white" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      AI Master Poster
                    </button>
                  </div>
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase">
                    {activeHeroTab === "after" ? "Studio Noir V4.2" : "Original Raw Upload"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Steps */}
          <div className="lg:col-span-6 lg:pl-6">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Deliver Unmatched Luxury Performance
            </h2>
            <p className="mt-2 text-xl font-light text-neutral-300 lg:text-2xl">
              and Exceptional Experiences
            </p>

            <p className="mt-6 text-sm leading-relaxed text-neutral-400 md:text-base">
              To deliver a premium, transparent automotive art crafting experience that exceeds expectations. We believe
              luxury is not an option—it is a standard. Every interaction, every template, and every generated fine art
              print reflects our commitment to excellence.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-colors hover:border-white/10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D9272E]/10 font-mono text-xs font-bold text-[#D9272E]">
                  01
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Select Up To 3 Templates</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Choose from Vintage Monaco, Architectural Blueprint, Dark Studio, or Cyber Apex.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-colors hover:border-white/10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D9272E]/10 font-mono text-xs font-bold text-[#D9272E]">
                  02
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Upload Your Vehicle Photograph</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Any lighting or setting. Our machine vision isolates contours, wheels, and aerodynamic surfaces.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-colors hover:border-white/10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D9272E]/10 font-mono text-xs font-bold text-[#D9272E]">
                  03
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Sign In & Generate Previews</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Authenticate securely (Passcode: 0000), preserving your inputs, and receive high-res previews + optional combined triptych.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-colors hover:border-white/10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D9272E]/10 font-mono text-xs font-bold text-[#D9272E]">
                  04
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Museum-Grade Printing & Global Dispatch</h4>
                  <p className="text-xs text-neutral-400 mt-1">
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

