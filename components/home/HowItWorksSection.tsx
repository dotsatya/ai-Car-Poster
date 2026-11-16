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
      className="relative border-t border-white/[0.06] bg-bg-primary py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-6 sm:gap-y-8 items-stretch">
          {/* ─── ROW 1 LEFT: Header (order-1 on mobile/tablet, Row 1 on desktop) ─── */}
          <div className="order-1 lg:order-none lg:col-span-7 xl:col-span-8 flex flex-col justify-end">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand font-mono">
              SIMPLE PROCESS
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading uppercase">
              HOW IT WORKS
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl">
              Four steps from your photo to a poster on your wall.
            </p>
          </div>

          {/* ─── ROW 1 RIGHT: Toggle Buttons (order-3 on mobile/tablet, Row 1 on desktop) ─── */}
          <div className="order-3 lg:order-none lg:col-span-5 xl:col-span-4 flex items-end justify-center lg:justify-end">
            <div className="w-full max-w-[280px] sm:max-w-[340px] xl:max-w-[360px] flex justify-center lg:justify-end">
              <div className="inline-flex w-full sm:w-auto p-1 rounded-xl bg-black/40 border border-white/[0.08] shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveView("before")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeView === "before"
                      ? "bg-white/10 text-white border border-white/20 shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Camera size={13} className={activeView === "before" ? "text-brand" : ""} />
                  <span>Before Generation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("after")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeView === "after"
                      ? "bg-brand text-white border border-brand/50 shadow-sm shadow-brand/30"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Sparkles size={13} />
                  <span>After Generation</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── ROW 2 LEFT: 4 Step Cards (order-2 on mobile/tablet, Row 2 on desktop) ─── */}
          <div className="order-2 lg:order-none lg:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 h-full">
              {STEPS.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.step}
                    href={item.href}
                    className="group relative rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 cursor-pointer flex flex-col justify-between h-full min-h-[160px] sm:min-h-[180px]"
                  >
                    <div>
                      {/* Step Number in Red */}
                      <div className="text-brand font-mono text-xs sm:text-sm font-bold tracking-wider">
                        {item.step}
                      </div>

                      {/* Step Icon */}
                      <div className="mt-2.5 sm:mt-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-brand/10 border border-brand/25 text-brand shadow-sm shadow-brand/10 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-3 text-sm sm:text-base font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── ROW 2 RIGHT: Image Showcase (order-4 on mobile/tablet, Row 2 on desktop) ─── */}
          <div className="order-4 lg:order-none lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end">
            <div
              onClick={() => setActiveView(activeView === "before" ? "after" : "before")}
              className="group relative w-full max-w-[280px] sm:max-w-[340px] xl:max-w-[360px] aspect-[3/4] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E1013] shadow-2xl cursor-pointer select-none"
              title="Click to toggle Before / After"
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
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 border border-white/20 text-neutral-200 text-[10px] font-mono backdrop-blur-md">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
