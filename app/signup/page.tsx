"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, KeyRound, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useStudio } from "@/context/StudioContext";

export default function SignUpPage() {
  const { user, signIn, signOut } = useStudio();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [emailInput, setEmailInput] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setStep("otp");
    setResendCooldown(30);
    toast.success(`Verification code sent to ${trimmed}`, {
      description: "Demo OTP passcode: 0000",
    });

    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    setErrorMsg("");
    const cleanValue = value.replace(/[^0-9]/g, "");

    const newDigits = [...otpDigits];
    if (cleanValue.length === 0) {
      newDigits[index] = "";
      setOtpDigits(newDigits);
      return;
    }

    newDigits[index] = cleanValue.slice(-1);
    setOtpDigits(newDigits);

    if (index < 3 && cleanValue.length > 0) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 4);
    if (!pasteData) return;

    const newDigits = ["", "", "", ""];
    for (let i = 0; i < pasteData.length; i++) {
      newDigits[i] = pasteData[i];
    }
    setOtpDigits(newDigits);

    const nextIndex = Math.min(pasteData.length, 3);
    otpInputsRef.current[nextIndex]?.focus();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otpDigits.join("");
    if (otpCode.length < 4) {
      setErrorMsg("Please enter the complete 4-digit code.");
      return;
    }

    const result = signIn(emailInput, otpCode);
    if (!result.success) {
      setErrorMsg(result.error || "Invalid code. Please enter demo OTP: 0000");
    } else {
      setErrorMsg("");
      setEmailInput("");
      setOtpDigits(["", "", "", ""]);
      setStep("email");
    }
  };

  const handleAutoFillDemo = () => {
    setOtpDigits(["0", "0", "0", "0"]);
    setErrorMsg("");
    otpInputsRef.current[3]?.focus();
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    setErrorMsg("");
    toast.success(`New code sent to ${emailInput}`, {
      description: "Demo OTP passcode: 0000",
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111114] p-6 sm:p-8 shadow-2xl hover:border-white/25 transition-all duration-300">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 border border-white/[0.08] shadow-inner">
            <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v7" />
              <path d="M12 15v7" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-[0.25em] text-white">
            POSTER <span className="text-brand">GEN</span>
          </span>
        </div>

        {user ? (
          /* Already Signed In View */
          <div className="mt-6 space-y-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">You Are Signed In</h2>
              <p className="mt-1 text-xs text-neutral-400">
                Active account email: <strong className="text-white">{user.email}</strong>
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                Your session is safely stored and remains active until you sign out.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/studio"
                className="w-full rounded-xl bg-brand hover:bg-brand-hover py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] text-center"
              >
                Launch Poster Studio →
              </Link>
              <Link
                href="/account"
                className="w-full rounded-xl border border-white/[0.08] hover:border-white/25 bg-white/[0.04] py-2.5 px-4 text-xs font-semibold text-neutral-300 hover:text-white transition-all text-center"
              >
                Go to My Account
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="text-xs text-red-400 hover:underline pt-1 cursor-pointer"
              >
                Sign out of this email
              </button>
            </div>
          </div>
        ) : (
          /* Sign Up / Sign In Form */
          <>
            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            {/* STEP 1: Enter Email */}
            {step === "email" && (
              <div className="mt-5 space-y-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    Atelier Member Sign Up / Sign In
                  </h2>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    Enter your email address to sign up with a one-time passcode. No password required.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      Email Address
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        type="email"
                        required
                        autoFocus
                        placeholder="name@example.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full rounded-xl border border-white/[0.08] bg-neutral-900/80 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-neutral-500 hover:border-white/25 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-brand transition-all duration-200"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                        <Mail className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover py-3 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <span>Continue with Email</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-neutral-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Passwordless authentication • Demo OTP: <strong>0000</strong></span>
                </div>
              </div>
            )}

            {/* STEP 2: Enter One-Time OTP */}
            {step === "otp" && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setErrorMsg("");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Change email</span>
                  </button>
                  <span className="text-[10px] font-mono text-neutral-400">Step 2 of 2</span>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    Enter One-Time OTP
                  </h2>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    We sent a 4-digit code to <strong className="text-white">{emailInput}</strong>.
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      4-Digit Verification Passcode
                    </label>

                    {/* 4-Box Segmented OTP Input */}
                    <div className="mt-2 flex items-center justify-between gap-2.5 sm:gap-3" onPaste={handleOtpPaste}>
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpInputsRef.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-white/[0.08] hover:border-white/25 focus:border-brand bg-neutral-900/90 text-center text-xl sm:text-2xl font-bold text-white focus:outline-none focus:ring-1 focus:ring-brand shadow-inner transition-all duration-200"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Demo 0000 Auto-Fill Pill */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleAutoFillDemo}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] hover:border-brand/40 bg-brand/10 hover:bg-brand/20 px-2.5 py-1 text-[11px] font-medium text-brand transition-all duration-200 cursor-pointer"
                    >
                      <KeyRound className="h-3 w-3" />
                      <span>Use Demo OTP: <strong>0000</strong></span>
                    </button>

                    <button
                      type="button"
                      disabled={resendCooldown > 0}
                      onClick={handleResendOtp}
                      className={`text-[11px] transition-colors cursor-pointer ${
                        resendCooldown > 0
                          ? "text-neutral-500 cursor-not-allowed"
                          : "text-neutral-400 hover:text-white underline underline-offset-4"
                      }`}
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-neutral-200 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-95"
                  >
                    <span>Verify &amp; Sign Up</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
