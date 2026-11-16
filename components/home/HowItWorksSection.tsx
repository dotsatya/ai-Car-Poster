"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  Upload,
  Sparkles,
  Package,
  Camera,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: LayoutGrid,
    title: "Pick templates",
    description: "Choose up to 3 designs.",
    href: "/templates",
  },
  {
    step: "02",
    icon: Upload,
    title: "Upload your car",
    description: "One photo works for all.",
    href: "/studio",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Get AI previews",
    description: "Verify email, then generate.",
    href: "/studio",
  },
  {
    step: "04",
    icon: Package,
    title: "Order and receive",
    description: "Pick size, pay, we print.",
    href: "/studio",
  },
];

export function HowItWorksSection() {
  const [activeView, setActiveView] = useState<"before" | "after">("after");

  return (
    <section
      id="how-it-works"
      className="relative border-t border-white/[0.06] bg-bg-primary py-8 sm:py-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 md:gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-4 sm:gap-y-6 md:gap-y-8 items-stretch">
          {/* ─── ROW 1 LEFT: Header (order-1 on mobile, Row 1 Col 1-7 on tablet/desktop) ─── */}
          <div className="order-1 md:order-none md:col-span-7 xl:col-span-8 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand font-mono">
                SIMPLE PROCESS
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading uppercase">
              HOW IT WORKS
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl">
              Four steps from your photo to a poster on your wall.
            </p>
          </div>

          {/* ─── ROW 1 RIGHT: Toggle Buttons (order-3 on mobile, Row 1 Col 8-12 on tablet/desktop) ─── */}
          <div className="order-3 md:order-none md:col-span-5 xl:col-span-4 flex items-end justify-center md:justify-end">
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] xl:max-w-[360px] flex justify-center md:justify-end">
              <div className="inline-flex w-full sm:w-auto p-1 rounded-xl bg-black/40 border border-white/[0.08] shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveView("before")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-2.5 sm:px-3.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeView === "before"
                      ? "bg-white/10 text-white border border-white/20 shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Camera size={13} className={activeView === "before" ? "text-brand" : ""} />
                  <span>Before</span>
                  <span className="hidden sm:inline">&nbsp;Generation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("after")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-2.5 sm:px-3.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeView === "after"
                      ? "bg-brand text-white border border-brand/50 shadow-sm shadow-brand/30"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Sparkles size={13} />
                  <span>After</span>
                  <span className="hidden sm:inline">&nbsp;Generation</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── ROW 2 LEFT: 4 Step Cards (order-2 on mobile, Row 2 Col 1-7 on tablet/desktop) ─── */}
          <div className="order-2 md:order-none md:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:gap-4 h-full">
              {STEPS.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.step}
                    href={item.href}
                    className="group relative rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-3 sm:p-4 md:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 cursor-pointer flex flex-col justify-between h-full min-h-[120px] sm:min-h-[145px] md:min-h-[165px]"
                  >
                    <div className="flex flex-col h-full justify-between">
                      {/* Top Row: Step Number & Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-brand font-mono text-xs sm:text-sm font-bold tracking-wider">
                          {item.step}
                        </span>
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-brand/10 border border-brand/25 text-brand shadow-sm shadow-brand/10 transition-transform duration-300 group-hover:scale-105">
                          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                      </div>

                      {/* Content: Title & Description */}
                      <div className="mt-2.5 sm:mt-3">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-wide group-hover:text-brand transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-neutral-400 leading-snug sm:leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── ROW 2 RIGHT: Image Showcase (order-4 on mobile, Row 2 Col 8-12 on tablet/desktop) ─── */}
          <div className="order-4 md:order-none md:col-span-5 xl:col-span-4 flex items-center justify-center md:justify-end">
            <div
              onClick={() => setActiveView(activeView === "before" ? "after" : "before")}
              className="group relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] xl:max-w-[360px] md:ml-auto aspect-[3/4] md:aspect-auto md:h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E1013] shadow-2xl cursor-pointer select-none"
              title="Click or tap to toggle Before / After"
            >
              {/* Before Image: Original Photo */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                  activeView === "before" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src="/carTransition/old.png"
                  alt="Before Generation - Original Car Photo"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 360px"
                  className="object-cover object-center"
                  priority
                />
                {/* Subtle top pill */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 border border-white/20 text-neutral-200 text-[10px] font-mono backdrop-blur-md shadow-sm">
                    <Camera size={10} className="text-amber-400" />
                    Before
                  </span>
                </div>
              </div>

              {/* After Image: AI Generated Poster */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                  activeView === "after" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src="/carTransition/new.png"
                  alt="After Generation - AI Fine-Art Poster"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 360px"
                  className="object-cover object-center"
                  priority
                />
                {/* Subtle top pill */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand/90 border border-brand/50 text-white text-[10px] font-mono font-medium backdrop-blur-md shadow-sm shadow-brand/30">
                    <Sparkles size={10} />
                    After
                  </span>
                </div>
              </div>

              {/* Subtle Bottom Interaction Hint */}
              <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 border border-white/15 text-neutral-300 text-[9px] sm:text-[10px] font-mono backdrop-blur-md">
                  Tap to toggle
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-black/60 text-neutral-400 text-[9px] font-mono">
                  {activeView === "before" ? "Original" : "Studio AI"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
