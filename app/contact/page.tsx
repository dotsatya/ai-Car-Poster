"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vehicle: "",
    subject: "Bespoke Artwork Commission",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
                Private Concierge
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Contact Our Atelier
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                Whether commissioning artwork for a rare collector chassis, inquiring about custom large-scale gallery
                installations, or tracking physical print production, our concierge is at your service.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#D9272E]">
                  Direct Enquiries
                </div>
                <div className="mt-1 text-base font-bold text-white">concierge@postergen.com</div>
                <div className="mt-0.5 text-xs text-neutral-400">Response within 4 business hours worldwide</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#D9272E]">
                  Global Dispatch Hubs
                </div>
                <div className="mt-1 text-base font-bold text-white">London · Los Angeles · Tokyo</div>
                <div className="mt-0.5 text-xs text-neutral-400">
                  Continuous 24/7 Giclée plotters & climate-controlled framing facilities
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#D9272E]">
                  Fleet & Dealership Art
                </div>
                <div className="mt-1 text-base font-bold text-white">bespoke@postergen.com</div>
                <div className="mt-0.5 text-xs text-neutral-400">
                  Bespoke batch runs for clubs, racing teams, and luxury automotive collections
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-neutral-900/60 p-8 lg:p-10 backdrop-blur-xl shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-2xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || "Collector"}. Our automotive concierge has logged your message and will
                    respond to <strong className="text-white">{formData.email}</strong> shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Send Concierge Message</h3>
                  <p className="text-xs text-neutral-400">
                    Fill in your vehicle specs and request details below.
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sir / Madam"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="driver@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Vehicle Model & Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2024 Porsche GT3 RS / Ferrari F40"
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white focus:border-[#D9272E] focus:outline-none"
                      >
                        <option value="Bespoke Artwork Commission" className="bg-neutral-900">Bespoke Artwork Commission</option>
                        <option value="Order & Production Status" className="bg-neutral-900">Order & Production Status</option>
                        <option value="Custom Large Sizing / Acrylic Mount" className="bg-neutral-900">Custom Sizing / Acrylic Mount</option>
                        <option value="Dealership & Club Orders" className="bg-neutral-900">Dealership & Club Orders</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Message & Specifications
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your machine, preferred templates, special chassis badges, or question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-[#D9272E] to-[#B01A20] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#D9272E]/30 transition-transform duration-200 hover:scale-[1.01]"
                  >
                    Submit Concierge Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

