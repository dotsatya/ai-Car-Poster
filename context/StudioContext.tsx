"use client";

import React, { createContext, useContext, useState } from "react";
import { User, StudioState, GenerationJobStatus, ArtworkSelection, CartItem } from "@/types";
import { TEMPLATES } from "@/data/templates";
import { PRINT_SIZES } from "@/data/print-sizes";
import { SAMPLE_VEHICLES } from "@/data/sample-vehicles";

interface StudioContextType {
  // Auth
  user: User | null;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;

  // Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Selections
  selectedTemplates: string[];
  toggleTemplate: (id: string) => void;
  clearTemplates: () => void;
  uploadedPhoto: string;
  setUploadedPhoto: (url: string) => void;
  vehicleName: string;
  setVehicleName: (name: string) => void;
  customText: string;
  setCustomText: (text: string) => void;

  // Pipeline
  studioState: StudioState;
  setStudioState: (state: StudioState) => void;
  generationProgress: Record<string, GenerationJobStatus>;
  combinedStatus: "idle" | "queued" | "processing" | "completed";
  startGenerationPipeline: () => void;
  generateCombined: () => void;

  // Review & Cart
  selectedArtworks: Record<string, ArtworkSelection>;
  toggleArtworkSelection: (id: string) => void;
  updateArtworkSize: (id: string, size: string) => void;
  updateArtworkQuantity: (id: string, delta: number) => void;
  cartItems: CartItem[];
  cartSubtotal: number;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  // Authentication
  const [user, setUser] = useState<User | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Selections (Default to 3 curated master templates for immediate preview capability)
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([
    "porsche-911-gt3-rs-minimalist-spec",
    "koenigsegg-jesko-absolut-1600hp",
    "mclaren-720s-red-graffiti",
  ]);
  const [uploadedPhoto, setUploadedPhoto] = useState<string>(SAMPLE_VEHICLES[0].image);
  const [vehicleName, setVehicleName] = useState<string>(SAMPLE_VEHICLES[0].name);
  const [customText, setCustomText] = useState<string>(SAMPLE_VEHICLES[0].text);

  // Workflow State
  const [studioState, setStudioState] = useState<StudioState>("configure");
  const [generationProgress, setGenerationProgress] = useState<Record<string, GenerationJobStatus>>({});
  const [combinedStatus, setCombinedStatus] = useState<"idle" | "queued" | "processing" | "completed">("idle");
  const [selectedArtworks, setSelectedArtworks] = useState<Record<string, ArtworkSelection>>({
    "porsche-911-gt3-rs-minimalist-spec": { selected: true, size: "a2", quantity: 1 },
    "koenigsegg-jesko-absolut-1600hp": { selected: true, size: "a2", quantity: 1 },
    "mclaren-720s-red-graffiti": { selected: true, size: "a2", quantity: 1 },
  });

  // Auth Methods
  const signIn = (email: string, password: string) => {
    if (!email.trim()) {
      return { success: false, error: "Please enter your email address." };
    }
    if (password.trim() !== "0000") {
      return { success: false, error: "Invalid password. Use prototype password 0000." };
    }
    setUser({ email: email.trim() });
    setIsSignInOpen(false);
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    setStudioState("configure");
    setGenerationProgress({});
    setCombinedStatus("idle");
  };

  // Template toggle (1 to 3 templates allowed)
  const toggleTemplate = (id: string) => {
    if (selectedTemplates.includes(id)) {
      setSelectedTemplates(selectedTemplates.filter((t) => t !== id));
    } else {
      if (selectedTemplates.length < 3) {
        setSelectedTemplates([...selectedTemplates, id]);
      }
    }
  };

  const clearTemplates = () => setSelectedTemplates([]);

  // AI Generation Pipeline Simulation
  const startGenerationPipeline = () => {
    setStudioState("generating");

    const initial: Record<string, GenerationJobStatus> = {};
    selectedTemplates.forEach((id) => {
      initial[id] = "queued";
    });
    setGenerationProgress(initial);

    selectedTemplates.forEach((id, index) => {
      setTimeout(() => {
        setGenerationProgress((prev) => ({ ...prev, [id]: "processing" }));
      }, (index + 1) * 750);

      setTimeout(() => {
        setGenerationProgress((prev) => ({ ...prev, [id]: "completed" }));
      }, (index + 1) * 750 + 1500);
    });

    const initialArtworks: Record<string, ArtworkSelection> = {};
    selectedTemplates.forEach((id) => {
      initialArtworks[id] = { selected: true, size: "a2", quantity: 1 };
    });
    setSelectedArtworks(initialArtworks);

    const totalTime = selectedTemplates.length * 750 + 1700;
    setTimeout(() => {
      setStudioState("review");
    }, totalTime);
  };

  const generateCombined = () => {
    setCombinedStatus("queued");
    setTimeout(() => {
      setCombinedStatus("processing");
    }, 600);
    setTimeout(() => {
      setCombinedStatus("completed");
      setSelectedArtworks((prev) => ({
        ...prev,
        combined: { selected: true, size: "ultra", quantity: 1 },
      }));
    }, 2200);
  };

  // Artwork selection toggles
  const toggleArtworkSelection = (id: string) => {
    setSelectedArtworks((prev) => {
      const current = prev[id] || { selected: false, size: "a2", quantity: 1 };
      return {
        ...prev,
        [id]: { ...current, selected: !current.selected },
      };
    });
  };

  const updateArtworkSize = (id: string, size: string) => {
    setSelectedArtworks((prev) => {
      const current = prev[id] || { selected: true, size: "a2", quantity: 1 };
      return {
        ...prev,
        [id]: { ...current, size },
      };
    });
  };

  const updateArtworkQuantity = (id: string, delta: number) => {
    setSelectedArtworks((prev) => {
      const current = prev[id] || { selected: true, size: "a2", quantity: 1 };
      const newQty = Math.max(1, current.quantity + delta);
      return {
        ...prev,
        [id]: { ...current, quantity: newQty },
      };
    });
  };

  // Cart calculations
  const cartItems: CartItem[] = Object.entries(selectedArtworks)
    .filter(([_, item]) => item.selected)
    .map(([id, item]) => {
      const isCombined = id === "combined";
      const template = isCombined ? null : TEMPLATES.find((t) => t.id === id);
      const sizeObj = PRINT_SIZES.find((s) => s.id === item.size) || PRINT_SIZES[1];
      const title = isCombined ? "Combined Master Triptych Poster" : template?.name || "Automotive Poster";
      return {
        id,
        title,
        size: sizeObj.label,
        dimensions: sizeObj.dimensions,
        price: sizeObj.priceNum,
        quantity: item.quantity,
        total: sizeObj.priceNum * item.quantity,
        isCombined,
        image: isCombined
          ? "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
          : template?.image || uploadedPhoto,
      };
    });

  const cartSubtotal = cartItems.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <StudioContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isSignInOpen,
        setIsSignInOpen,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        selectedTemplates,
        toggleTemplate,
        clearTemplates,
        uploadedPhoto,
        setUploadedPhoto,
        vehicleName,
        setVehicleName,
        customText,
        setCustomText,
        studioState,
        setStudioState,
        generationProgress,
        combinedStatus,
        startGenerationPipeline,
        generateCombined,
        selectedArtworks,
        toggleArtworkSelection,
        updateArtworkSize,
        updateArtworkQuantity,
        cartItems,
        cartSubtotal,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
}
