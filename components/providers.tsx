"use client";

import React from "react";
import { StudioProvider } from "@/context/StudioContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StudioProvider>
        <CartProvider>{children}</CartProvider>
      </StudioProvider>
    </AuthProvider>
  );
}
