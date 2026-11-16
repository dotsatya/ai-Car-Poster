"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  User,
  Phone,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { useAppAuth } from "@/lib/auth";
import { AccountNav } from "@/components/account/AccountNav";

interface Address {
  id: string;
  name: string;
  type: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    name: "Satya Sundar Dey",
    type: "Home Atelier",
    street: "Penthouse 14B, Apex Grand Tower, Road No. 36, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500033",
    country: "India",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Satya Dey (Studio Atelier)",
    type: "Design Studio & Garage",
    street: "Hangar 4, Motorway Industrial Park, Outer Ring Road, Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500032",
    country: "India",
    phone: "+91 98765 43211",
    isDefault: false,
  },
];

export default function AccountSettingsPage() {
  const { user, signOut } = useAppAuth();

  // ─── 1. ADDRESSES STATE & LOCALSTORAGE PERSISTENCE ───
  const [addresses, setAddresses] = useState<Address[]>(() => {
    if (typeof window === "undefined") return DEFAULT_ADDRESSES;
    try {
      const saved = localStorage.getItem("postergen_user_addresses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_ADDRESSES;
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Address Form State
  const [addrName, setAddrName] = useState("");
  const [addrType, setAddrType] = useState("Home Atelier");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrPostalCode, setAddrPostalCode] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrIsDefault, setAddrIsDefault] = useState(false);

  // ─── 3. MEMBER DETAILS (NAME & PHONE) STATE ───
  const [fullName, setFullName] = useState<string>(() => {
    if (typeof window === "undefined") return "Satya Sundar Dey";
    try {
      return localStorage.getItem("postergen_user_name") || "Satya Sundar Dey";
    } catch {
      return "Satya Sundar Dey";
    }
  });

  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    if (typeof window === "undefined") return "+91 98765 43210";
    try {
      return localStorage.getItem("postergen_user_phone") || "+91 98765 43210";
    } catch {
      return "+91 98765 43210";
    }
  });

  // Sync addresses to localStorage
  const saveAddresses = (newAddresses: Address[]) => {
    setAddresses(newAddresses);
    try {
      localStorage.setItem("postergen_user_addresses", JSON.stringify(newAddresses));
    } catch {
      // Ignore localStorage errors
    }
  };

  const openAddAddressModal = () => {
    setEditingAddressId(null);
    setAddrName(fullName || "Satya Sundar Dey");
    setAddrType("Home Atelier");
    setAddrStreet("");
    setAddrCity("");
    setAddrState("");
    setAddrPostalCode("");
    setAddrPhone(phoneNumber || "+91 98765 43210");
    setAddrIsDefault(addresses.length === 0);
    setIsAddressModalOpen(true);
  };

  const openEditAddressModal = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddrName(addr.name);
    setAddrType(addr.type);
    setAddrStreet(addr.street);
    setAddrCity(addr.city);
    setAddrState(addr.state);
    setAddrPostalCode(addr.postalCode);
    setAddrPhone(addr.phone);
    setAddrIsDefault(addr.isDefault);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrName.trim() || !addrStreet.trim() || !addrCity.trim() || !addrPostalCode.trim()) {
      toast.error("Please fill in required fields (Name, Street, City, PIN code).");
      return;
    }

    if (editingAddressId) {
      const updated = addresses.map((addr) => {
        if (addr.id === editingAddressId) {
          return {
            ...addr,
            name: addrName.trim(),
            type: addrType.trim() || "Delivery Destination",
            street: addrStreet.trim(),
            city: addrCity.trim(),
            state: addrState.trim(),
            postalCode: addrPostalCode.trim(),
            phone: addrPhone.trim(),
            isDefault: addrIsDefault,
          };
        }
        if (addrIsDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });
      saveAddresses(updated);
      toast.success("Address updated successfully!");
    } else {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        name: addrName.trim(),
        type: addrType.trim() || "Delivery Destination",
        street: addrStreet.trim(),
        city: addrCity.trim(),
        state: addrState.trim(),
        postalCode: addrPostalCode.trim(),
        country: "India",
        phone: addrPhone.trim(),
        isDefault: addrIsDefault || addresses.length === 0,
      };

      let updated: Address[];
      if (newAddress.isDefault) {
        updated = [newAddress, ...addresses.map((a) => ({ ...a, isDefault: false }))];
      } else {
        updated = [...addresses, newAddress];
      }
      saveAddresses(updated);
      toast.success("New delivery address added!");
    }

    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    if (addresses.length <= 1) {
      toast.error("You must retain at least one primary shipping destination.");
      return;
    }
    const updated = addresses.filter((a) => a.id !== id);
    if (!updated.some((a) => a.isDefault) && updated.length > 0) {
      updated[0].isDefault = true;
    }
    saveAddresses(updated);
    toast.success("Address removed.");
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveAddresses(updated);
    toast.success("Default shipping address updated.");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("postergen_user_name", fullName.trim());
      localStorage.setItem("postergen_user_phone", phoneNumber.trim());
    } catch {
      // Ignore
    }
    toast.success("Profile details saved", {
      description: "Your collector name and contact phone have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Account Navigation Bar */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-5 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-brand font-mono">
            COLLECTOR PROFILE
          </span>
          <h1 className="mt-1 text-xl sm:text-3xl font-bold tracking-tight text-white font-heading uppercase">
            My Account
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
            Manage your physical delivery addresses, registered email identity, and personal credentials.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8 max-w-4xl">
          {/* ============================================================== */}
          {/* PARTITION 1: FIRST — DELIVERY ADDRESSES */}
          {/* ============================================================== */}
          <section className="rounded-2xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-6 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 border border-brand/25 text-brand">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand">
                      01 / PARTITION
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                    Delivery Addresses
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={openAddAddressModal}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            {/* Addresses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`relative rounded-xl border p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between ${
                    addr.isDefault
                      ? "border-brand/40 bg-neutral-900/80 shadow-lg shadow-brand/5 ring-1 ring-brand/30"
                      : "border-white/[0.08] bg-neutral-900/40 hover:border-white/20 hover:bg-neutral-900/60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-300">
                          <MapPin className="h-2.5 w-2.5 text-brand" />
                          <span>{addr.type}</span>
                        </span>
                        {addr.isDefault && (
                          <span className="rounded-full bg-brand/15 border border-brand/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                            Default Destination
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditAddressModal(addr)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit address"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        {addresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Delete address"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white">{addr.name}</h3>
                    <p className="mt-1 text-xs text-neutral-300 leading-relaxed">{addr.street}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {addr.city}, {addr.state} — {addr.postalCode}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">{addr.country}</p>
                    {addr.phone && (
                      <p className="text-xs text-neutral-400 font-mono mt-2 pt-2 border-t border-white/[0.06]">
                        Phone: {addr.phone}
                      </p>
                    )}
                  </div>

                  {!addr.isDefault && (
                    <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-brand transition-colors cursor-pointer"
                      >
                        <span>Set as Default</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* PARTITION 2: THEN — ACCOUNT USER EMAIL ID */}
          {/* ============================================================== */}
          <section className="rounded-2xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 border border-brand/25 text-brand">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand">
                  02 / PARTITION
                </span>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                  Account User Email ID
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                  <span>Registered Email Identifier</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 lowercase font-mono">
                    <Lock className="h-3 w-3 text-neutral-400" />
                    verified ID
                  </span>
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || "member@postergen.atelier"}
                  className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 font-mono select-all cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Authentication Status
                </label>
                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Passwordless OTP
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Active &amp; Verified
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-neutral-400 leading-relaxed">
              Your registered email is your unique Atelier key used for authenticating commissions, serialized certificates, and one-time sign-in.
            </p>
          </section>

          {/* ============================================================== */}
          {/* PARTITION 3: THEN — OPTION TO INCLUDE NAME AND PHONE NUMBER */}
          {/* ============================================================== */}
          <section className="rounded-2xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-6 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 border border-brand/25 text-brand">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand">
                    03 / PARTITION
                  </span>
                  <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                    Personal Details
                  </h2>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Option */}
                <div>
                  <label
                    htmlFor="fullNameInput"
                    className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5"
                  >
                    <User className="h-3 w-3 text-brand" />
                    <span>Collector Full Name</span>
                  </label>
                  <input
                    id="fullNameInput"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Satya Sundar Dey"
                    className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all"
                  />
                  <p className="mt-1 text-[10px] text-neutral-400">
                    Appears on your signed Certificate of Authenticity.
                  </p>
                </div>

                {/* Phone Number Option */}
                <div>
                  <label
                    htmlFor="phoneInput"
                    className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5"
                  >
                    <Phone className="h-3 w-3 text-brand" />
                    <span>Contact Phone Number</span>
                  </label>
                  <input
                    id="phoneInput"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono placeholder-neutral-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all"
                  />
                  <p className="mt-1 text-[10px] text-neutral-400">
                    Used for courier dispatch updates and delivery verification.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Details</span>
                </button>
              </div>
            </form>
          </section>

          {/* ============================================================== */}
          {/* PARTITION 4: THEN — SIGN OUT BUTTON */}
          {/* ============================================================== */}
          <section className="rounded-2xl border border-red-500/20 bg-red-950/10 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 mt-0.5 sm:mt-0">
                  <LogOut className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                    04 / PARTITION
                  </span>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                    Sign Out of Atelier
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5 max-w-md">
                    End your active session on this device. Your orders, generated posters, and wishlist remain securely linked to your email.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={signOut}
                className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* ============================================================== */}
      {/* ADDRESS MODAL (ADD / EDIT) */}
      {/* ============================================================== */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.12] bg-[#0E1013] p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                <h3 className="text-base font-bold uppercase tracking-wider text-white">
                  {editingAddressId ? "Edit Delivery Address" : "Add Delivery Address"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={addrName}
                    onChange={(e) => setAddrName(e.target.value)}
                    placeholder="Full name"
                    className="mt-1 w-full rounded-xl border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-brand focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Address Label / Type
                  </label>
                  <input
                    type="text"
                    value={addrType}
                    onChange={(e) => setAddrType(e.target.value)}
                    placeholder="Home Atelier, Studio, Garage"
                    className="mt-1 w-full rounded-xl border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Street Address &amp; Suite / Hangar *
                </label>
                <input
                  type="text"
                  required
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  placeholder="Street, building, suite number"
                  className="mt-1 w-full rounded-xl border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-brand focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    placeholder="City"
                    className="mt-1 w-full rounded-xl border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-brand focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    State
                  </label>
                  <input
                    type="text"
                    value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    placeholder="State"
                    className="mt-1 w-full rounded-xl border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-brand focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={addrPostalCode}
                    onChange={(e) => setAddrPostalCode(e.target.value)}
                    placeholder="PIN Code"
                    className="mt-1 w-full rounded-xl border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono placeholder-neutral-600 focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Delivery Contact Phone
                </label>
                <input
                  type="tel"
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono placeholder-neutral-600 focus:border-brand focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addrIsDefault}
                  onChange={(e) => setAddrIsDefault(e.target.checked)}
                  className="rounded border-white/20 bg-neutral-800 text-brand focus:ring-brand h-4 w-4"
                />
                <span className="text-xs text-neutral-300">Set as default shipping destination</span>
              </label>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 transition-all cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Address</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
