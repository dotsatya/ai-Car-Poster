"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth";
import { StudioProvider } from "@/context/StudioContext";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StudioProvider>
        <CartProvider>{children}</CartProvider>
      </StudioProvider>
    </AuthProvider>
  );
}
