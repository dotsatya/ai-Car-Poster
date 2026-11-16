"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShieldCheck,
  Package,
  Truck,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "wire">("card");

  // Form values
  const [fullName, setFullName] = useState("Satya Dey");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("Studio 4B, Atelier Penthouse, Bandra West");
  const [cityPostal, setCityPostal] = useState("Mumbai 400050");
  const [country, setCountry] = useState("India");

  const hasInrItems = cartItems.some((i) => i.currency === "INR" || i.price >= 200);
  const shippingFee = cartItems.length > 0 ? (hasInrItems ? 199 : 25) : 0;
  const grandTotal = cartSubtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrderId = `PG-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();

      toast.success("Commission Authorized!", {
        description: `Order #${generatedOrderId} has entered our production queue.`,
      });

      // Directly forward to order confirmation page
      router.push(`/checkout/success?orderId=${generatedOrderId}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24 text-white">
      {/* Checkout Top Bar */}
      <div className="border-b border-white/[0.08] bg-[#0d0e10]/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-4 sm:py-5 flex items-center justify-between">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Studio</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Lock className="h-3.5 w-3.5 text-brand" />
            <span>256-Bit Encrypted Archival Checkout</span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="mb-8">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand font-mono">
            SECURE ATELIER COMMISSIONS
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white font-heading">
            Checkout &amp; Commission Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Finalize museum-grade printing, custom serialization, and insured courier dispatch.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Details */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base uppercase tracking-wider">
                <Truck className="h-4 w-4 text-brand" />
                <span>Shipping Destination</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Phone Contact
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    City &amp; Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={cityPostal}
                    onChange={(e) => setCityPostal(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base uppercase tracking-wider">
                <CreditCard className="h-4 w-4 text-brand" />
                <span>Payment Method</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-brand bg-brand/10 text-white"
                      : "border-white/[0.08] bg-black/30 text-neutral-400 hover:text-white"
                  }`}
                >
                  Credit / Debit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === "upi"
                      ? "border-brand bg-brand/10 text-white"
                      : "border-white/[0.08] bg-black/30 text-neutral-400 hover:text-white"
                  }`}
                >
                  UPI / NetBanking
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("wire")}
                  className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === "wire"
                      ? "border-brand bg-brand/10 text-white"
                      : "border-white/[0.08] bg-black/30 text-neutral-400 hover:text-white"
                  }`}
                >
                  Bank Wire
                </button>
              </div>

              <div className="pt-2 text-xs text-neutral-400 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Includes Certificate of Authenticity &amp; tamper-proof serial seal</span>
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                  <Package className="h-4 w-4 text-brand" />
                  <span>Order Summary</span>
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  {cartItems.length > 0 ? `${cartItems.length} item(s)` : "1 Sample Print"}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/[0.08] bg-black shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{item.title}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">
                          {item.size.toUpperCase()} • Qty {item.quantity}
                        </p>
                      </div>
                      <span className="text-white font-semibold shrink-0">
                        {item.formattedPrice || (hasInrItems ? `₹${item.total}` : `$${item.total}`)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 text-xs">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/[0.08] bg-black shrink-0">
                      <Image src="/template photo/1.webp" alt="Porsche 911 GT3 RS" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">Porsche 911 GT3 RS Minimalist</p>
                      <p className="text-[10px] text-neutral-400 font-mono">A2 Gallery (42×59cm) • Qty 1</p>
                    </div>
                    <span className="text-white font-semibold shrink-0">₹1,499</span>
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-white/[0.08] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Archival Print Subtotal</span>
                  <span className="text-white font-mono">
                    {cartItems.length > 0
                      ? hasInrItems
                        ? `₹${cartSubtotal.toLocaleString("en-IN")}`
                        : `$${cartSubtotal}`
                      : "₹1,499"}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Reinforced Museum Tube Packaging</span>
                  <span className="text-emerald-400 font-semibold">Complimentary</span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Insured Express Courier</span>
                  <span className="text-white font-mono">
                    {cartItems.length > 0 ? (hasInrItems ? "₹199" : "$25") : "₹199"}
                  </span>
                </div>

                <div className="border-t border-white/[0.08] pt-3 flex justify-between text-sm font-bold">
                  <span className="text-white uppercase tracking-wider">Total Due</span>
                  <span className="text-brand font-mono text-base">
                    {cartItems.length > 0
                      ? hasInrItems
                        ? `₹${grandTotal.toLocaleString("en-IN")}`
                        : `$${grandTotal}`
                      : "₹1,698"}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isSubmitting ? "Processing Commission..." : "Authorize Commission"}</span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
