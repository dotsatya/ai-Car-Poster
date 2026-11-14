"use client";

import { useState } from "react";
import { User, Bell, LogOut, Check } from "lucide-react";
import { toast } from "sonner";
import { useAppAuth } from "@/lib/auth";
import { AccountNav } from "@/components/account/AccountNav";

export default function AccountSettingsPage() {
  const { user, signOut } = useAppAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [orderTrackingSms, setOrderTrackingSms] = useState(false);

  const handleSave = () => {
    toast.success("Settings updated", {
      description: "Your atelier preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <AccountNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {/* Subsection Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              Account Settings
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Manage your personal credentials, communication preferences, and security settings.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Sub-bar metadata row */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
          <span>Security &amp; Preferences</span>
          <span>Verified Atelier Account</span>
        </div>

        {/* Settings Cards Grid */}
        <div className="space-y-6 max-w-4xl">
          {/* Profile & Credentials */}
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-5 sm:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-2.5 mb-4">
              <User className="h-4 w-4 text-brand" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                Member Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Registered Email
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || "member@postergen.atelier"}
                  className="mt-1.5 w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-300 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Authentication Method
                </label>
                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 text-xs text-neutral-300">
                  <span>Passwordless OTP</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-5 sm:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-2.5 mb-4">
              <Bell className="h-4 w-4 text-brand" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/30 p-3 text-xs text-neutral-300 cursor-pointer hover:bg-black/50">
                <div>
                  <p className="font-semibold text-white">Shipment &amp; Milestone Alerts</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Receive email updates when prints are dispatched or cleared by courier.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded border-white/20 bg-neutral-800 text-brand focus:ring-brand h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/30 p-3 text-xs text-neutral-300 cursor-pointer hover:bg-black/50">
                <div>
                  <p className="font-semibold text-white">SMS Courier Dispatch</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Instant SMS when courier is out for local delivery.</p>
                </div>
                <input
                  type="checkbox"
                  checked={orderTrackingSms}
                  onChange={(e) => setOrderTrackingSms(e.target.checked)}
                  className="rounded border-white/20 bg-neutral-800 text-brand focus:ring-brand h-4 w-4"
                />
              </label>
            </div>
          </div>

          {/* Account Actions / Sign Out */}
          <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">Sign Out of Atelier</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  End your current session on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-3.5 py-2 text-xs font-semibold text-red-300 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
