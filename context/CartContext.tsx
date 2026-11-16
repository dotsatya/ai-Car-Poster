"use client";

import React, { createContext, useContext } from "react";
import { CartItem } from "@/types";
import { useStudio } from "./StudioContext";

interface CartContextType {
  cartItems: CartItem[];
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addDirectCartItem: (item: Omit<CartItem, "total">) => void;
  removeDirectCartItem: (id: string) => void;
  updateDirectCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const {
    cartItems,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    addDirectCartItem,
    removeDirectCartItem,
    updateDirectCartQuantity,
    clearCart,
  } = useStudio();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addDirectCartItem,
        removeDirectCartItem,
        updateDirectCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
