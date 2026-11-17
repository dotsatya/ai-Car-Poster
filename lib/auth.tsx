"use client";

import React, { createContext, useContext, useState, useMemo, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { User } from "@/types";

export interface AppAuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: User | null;
  signIn: (email: string, password?: string) => { success: boolean; error?: string };
  signOut: () => void;
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
  openSignIn: () => void;
  closeSignIn: () => void;
}

const AuthContext = createContext<AppAuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "poster_gen_auth_user";
const USER_STORAGE_EVENT = "poster_gen_auth_changed";

function subscribeUser(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(USER_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(USER_STORAGE_EVENT, callback);
  };
}

function getUserSnapshot(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(USER_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function getServerUserSnapshot(): string {
  return "";
}

function saveUserToStorage(user: User | null) {
  if (typeof window === "undefined") return;
  try {
    if (user && user.email) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ email: user.email.trim() }));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    window.dispatchEvent(new Event(USER_STORAGE_EVENT));
  } catch (e) {
    console.warn("Could not save user to localStorage", e);
  }
}

const emptySubscribe = () => () => {};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  // Client-mounted check to prevent hydration mismatch
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const rawStoredUser = useSyncExternalStore(
    subscribeUser,
    getUserSnapshot,
    getServerUserSnapshot
  );

  const user: User | null = useMemo(() => {
    if (!isLoaded || !rawStoredUser) return null;
    try {
      const parsed = JSON.parse(rawStoredUser);
      if (parsed && typeof parsed.email === "string" && parsed.email.trim().length > 0) {
        return { email: parsed.email.trim() };
      }
    } catch {
      if (typeof rawStoredUser === "string" && rawStoredUser.includes("@")) {
        return { email: rawStoredUser.trim() };
      }
    }
    return null;
  }, [isLoaded, rawStoredUser]);

  const isSignedIn = isLoaded && !!user;

  const signIn = (email: string, password?: string) => {
    const trimmed = email.trim();
    if (!trimmed) {
      return { success: false, error: "Please enter your email address." };
    }
    if (password !== undefined && password.trim() !== "0000" && password.trim() !== "") {
      return { success: false, error: "Invalid verification code. Enter demo OTP: 0000." };
    }
    saveUserToStorage({ email: trimmed });
    setIsSignInOpen(false);
    toast.success("Welcome to Poster Gen", {
      description: `Authenticated as ${trimmed}`,
    });
    return { success: true };
  };

  const signOut = () => {
    saveUserToStorage(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("poster_gen_generated_artworks");
        localStorage.removeItem("poster_gen_selected_templates");
        window.dispatchEvent(new Event("poster_gen_generated_changed"));
        window.dispatchEvent(new Event("poster_gen_templates_changed"));
      } catch (e) {
        console.warn("Could not clear studio storage on sign out", e);
      }
    }
    toast.info("Signed Out", {
      description: "You have been signed out of your atelier account.",
    });
  };

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isLoaded,
        isSignedIn,
        user,
        signIn,
        signOut,
        isSignInOpen,
        setIsSignInOpen,
        openSignIn,
        closeSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAppAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppAuth must be used within an AuthProvider");
  }
  return context;
}
