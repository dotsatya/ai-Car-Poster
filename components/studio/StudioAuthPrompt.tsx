"use client";

import { useState } from "react";
import { useStudio } from "@/context/StudioContext";

interface StudioAuthPromptProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function StudioAuthPrompt({ onBack, onSuccess }: StudioAuthPromptProps) {
  const { signIn, selectedTemplates, vehicleName } = useStudio();

  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signIn(authEmail, authPassword);
    if (!result.success) {
      setAuthError(result.error || "Authentication failed. Enter password: 0000");
    } else {
      setAuthError("");
      onSuccess();
    }
  };

  return (
    <div className="mt-12 mx-auto max-w-xl rounded-3xl border border-white/15 bg-neutral-900/80 p-8 lg:p-10 backdrop-blur-2xl shadow-2xl">
      <div className="text-center">
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          Step 2 of 4: Member Authentication
        </span>
        <h3 className="mt-4 text-2xl font-bold text-white">Sign In to Generate Artworks</h3>
        <p className="mt-2 text-xs leading-relaxed text-neutral-400">
          Your <strong className="text-white">{selectedTemplates.length} selected templates</strong> and{" "}
          <strong className="text-white">{vehicleName}</strong> photograph are securely preserved.
        </p>
      </div>

      {authError && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200 text-center">
          {authError}
        </div>
      )}

      <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="driver@enthusiast.com"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Password / Prototype OTP
            </label>
            <span className="text-[10px] text-brand font-medium">Passcode: 0000</span>
          </div>
          <input
            type="password"
            required
            placeholder="0000"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 shadow-lg mt-2 cursor-pointer"
        >
          Authenticate & Generate Previews →
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
        >
          ← Return to photo setup
        </button>
      </div>
    </div>
  );
}

