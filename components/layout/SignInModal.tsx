"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

export function SignInModal() {
  const { isSignInOpen, setIsSignInOpen, signIn } = useStudio();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isSignInOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signIn(emailInput, passwordInput);
    if (!result.success) {
      setErrorMsg(result.error || "Authentication failed. Use passcode: 0000");
    } else {
      setErrorMsg("");
      setEmailInput("");
      setPasswordInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-bg-primary p-5 sm:p-8 shadow-2xl">
        <button
          onClick={() => setIsSignInOpen(false)}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#16181B] border border-white/10">
            <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v7" />
              <path d="M12 15v7" />
            </svg>
          </div>
          <span className="font-sans text-base font-bold tracking-[0.2em] text-white">
            POSTER <span className="text-brand">GEN</span>
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold text-white">Atelier Member Sign In</h3>
        <p className="mt-1 text-xs text-neutral-400">
          Enter any dummy email and prototype passcode <strong className="text-white">0000</strong> to authenticate.
        </p>

        {errorMsg && (
          <div className="mt-3 rounded-lg border border-red-500/30 bg-red-950/40 p-2.5 text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="user@gmail.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Password / Passcode
              </label>
              <span className="text-[10px] text-brand font-medium">Use passcode: 0000</span>
            </div>
            <input
              type="password"
              required
              placeholder="0000"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 shadow-md"
          >
            Sign In & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

