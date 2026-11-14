"use client";

import { useState } from "react";

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
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
                Private Concierge
              </span>
              <h1 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Contact Our Atelier
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
                Whether commissioning artwork for a rare collector chassis,
                inquiring about custom large-scale gallery installations, or
                tracking physical print production, our concierge is at your
                service.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-3.5">
              <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-3.5 sm:p-4.5 backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                  Direct Enquiries
                </div>
                <div className="mt-0.5 text-sm sm:text-base font-bold text-white">
                  concierge@postergen.com
                </div>
                <div className="mt-0.5 text-xs text-neutral-400">
                  Response within 4 business hours worldwide
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-3.5 sm:p-4.5 backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                  Global Dispatch Hubs
                </div>
                <div className="mt-0.5 text-sm sm:text-base font-bold text-white">
                  London · Los Angeles · Tokyo
                </div>
                <div className="mt-0.5 text-xs text-neutral-400">
                  Direct air courier with serialized insured packaging
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-3.5 sm:p-4.5 backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                  Corporate &amp; Fleet Commissions
                </div>
                <div className="mt-0.5 text-sm sm:text-base font-bold text-white">
                  bespoke@postergen.com
                </div>
                <div className="mt-0.5 text-xs text-neutral-400">
                  Bespoke batch runs for clubs, racing teams, and luxury
                  automotive collections
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl sm:rounded-3xl border border-white/15 bg-neutral-900/60 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
              {submitted ? (
                <div className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4">
                  <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xl sm:text-2xl">
                    ✓
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || "Collector"}. Our automotive
                    concierge has logged your message and will respond to{" "}
                    <strong className="text-white">{formData.email}</strong>{" "}
                    shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Send Concierge Message
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Fill in your vehicle specs and request details below.
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 pt-1">
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sir / Madam"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="driver@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Vehicle Model &amp; Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2024 Porsche GT3 RS / Ferrari F40"
                        value={formData.vehicle}
                        onChange={(e) =>
                          setFormData({ ...formData, vehicle: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
                      >
                        <option
                          value="Bespoke Artwork Commission"
                          className="bg-neutral-900"
                        >
                          Bespoke Artwork Commission
                        </option>
                        <option
                          value="Custom Multi-Angle Triptych"
                          className="bg-neutral-900"
                        >
                          Custom Multi-Angle Triptych
                        </option>
                        <option
                          value="Large-Format Exhibition Prints"
                          className="bg-neutral-900"
                        >
                          Large-Format Exhibition Prints
                        </option>
                        <option
                          value="Order Tracking & Dispatch"
                          className="bg-neutral-900"
                        >
                          Order Tracking &amp; Dispatch
                        </option>
                        <option
                          value="Dealership & Club Orders"
                          className="bg-neutral-900"
                        >
                          Dealership &amp; Club Orders
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Message &amp; Specifications
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe your machine, preferred templates, special chassis badges, or question..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand hover:bg-brand-hover py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-transform duration-200 hover:scale-[1.01]"
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
