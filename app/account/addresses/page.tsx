"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Edit2, Check, X, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
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

const INITIAL_ADDRESSES: Address[] = [
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

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState("Home Atelier");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setType("Home Atelier");
    setStreet("");
    setCity("");
    setState("");
    setPostalCode("");
    setPhone("");
    setIsDefault(addresses.length === 0);
    setIsModalOpen(true);
  };

  const openEditModal = (addr: Address) => {
    setEditingId(addr.id);
    setName(addr.name);
    setType(addr.type);
    setStreet(addr.street);
    setCity(addr.city);
    setState(addr.state);
    setPostalCode(addr.postalCode);
    setPhone(addr.phone);
    setIsDefault(addr.isDefault);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !street || !city || !postalCode) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) => {
          if (addr.id === editingId) {
            return {
              ...addr,
              name,
              type,
              street,
              city,
              state,
              postalCode,
              phone,
              isDefault,
            };
          }
          if (isDefault) {
            return { ...addr, isDefault: false };
          }
          return addr;
        })
      );
      toast.success("Address updated successfully!");
    } else {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        name,
        type,
        street,
        city,
        state,
        postalCode,
        country: "India",
        phone,
        isDefault: isDefault || addresses.length === 0,
      };

      setAddresses((prev) => {
        if (newAddress.isDefault) {
          return [newAddress, ...prev.map((a) => ({ ...a, isDefault: false }))];
        }
        return [...prev, newAddress];
      });
      toast.success("New address added successfully!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast("Address removed");
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.success("Default shipping address updated");
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Account Navigation */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {/* Subsection Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              Saved Delivery Addresses
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Registered shipping destinations for insured archival print tube dispatch.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] self-start sm:self-auto"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Address</span>
          </button>
        </div>

        {/* Sub-bar metadata row */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
          <span>
            Showing {addresses.length} registered destination{addresses.length !== 1 ? "s" : ""}
          </span>
          <span>Insured DHL Express Fine Art Logistics</span>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`relative rounded-xl border p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                addr.isDefault
                  ? "border-brand/40 bg-neutral-900/80 shadow-xl shadow-brand/5 ring-1 ring-brand/30 hover:border-brand/60"
                  : "border-white/[0.08] bg-neutral-900/40 hover:border-white/25 hover:bg-neutral-900/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                      <MapPin className="h-3 w-3 text-brand" />
                      <span>{addr.type}</span>
                    </span>
                    {addr.isDefault && (
                      <span className="rounded-full bg-brand/15 border border-brand/30 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                        Default Shipping
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditModal(addr)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Edit address"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    {addresses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDelete(addr.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete address"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-sans normal-case text-sm sm:text-base font-bold text-white">{addr.name}</h3>
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
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr.id)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 hover:text-brand transition-colors cursor-pointer"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Set as Default Address</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Courier Security Guarantee Banner */}
        <div className="mt-10 rounded-xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-5 flex items-center gap-3 text-xs text-neutral-400 hover:border-white/20 transition-all duration-300">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>
            All poster parcels are dispatched in heavy-duty triangular kraft tubes with protective glassine sleeves and tracked air courier.
          </span>
        </div>

        {/* Add / Edit Address Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
            <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-bg-primary p-6 sm:p-8 shadow-2xl hover:border-white/20 transition-all duration-300">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 rounded-xl p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <h2 className="text-lg font-bold text-white">
                {editingId ? "Edit Delivery Address" : "Add Delivery Address"}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Ensure exact coordinates for priority fine-art courier delivery.
              </p>

              <form onSubmit={handleSave} className="mt-5 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="User name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      Address Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Home, Garage, Office"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Apartment, suite, unit, building, floor, street..."
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Hyderabad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Telangana"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="500033"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    Courier Contact Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 00000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDefaultCheck"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="rounded border-white/20 bg-neutral-900 text-brand focus:ring-brand"
                  />
                  <label htmlFor="isDefaultCheck" className="text-xs text-neutral-300 cursor-pointer">
                    Set as default shipping address
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  >
                    {editingId ? "Save Changes" : "Add Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
