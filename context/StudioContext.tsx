"use client";

import React, { createContext, useContext, useState, useMemo, useSyncExternalStore } from "react";
import { User, StudioState, GenerationJobStatus, ArtworkSelection, GeneratedArtwork, CartItem } from "@/types";
import { TEMPLATES } from "@/data/templates";
import { PRINT_SIZES } from "@/data/print-sizes";
import { toast } from "sonner";

const TEMPLATES_STORAGE_KEY = "poster_gen_selected_templates";
const STORAGE_EVENT = "poster_gen_templates_changed";

const USER_STORAGE_KEY = "poster_gen_auth_user";
const USER_STORAGE_EVENT = "poster_gen_auth_changed";

const GENERATED_STORAGE_KEY = "poster_gen_generated_artworks";
const GENERATED_STORAGE_EVENT = "poster_gen_generated_changed";

function subscribeGenerated(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(GENERATED_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(GENERATED_STORAGE_EVENT, callback);
  };
}

function getGeneratedSnapshot(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(GENERATED_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function saveGeneratedToStorage(artworks: GeneratedArtwork[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GENERATED_STORAGE_KEY, JSON.stringify(artworks));
    window.dispatchEvent(new Event(GENERATED_STORAGE_EVENT));
  } catch (e) {
    console.warn("Could not save generated artworks to localStorage", e);
  }
}

export const DEFAULT_GENERATED_ARTWORKS: GeneratedArtwork[] = [
  {
    id: "gen-poster-1",
    title: "Porsche 911 GT3 RS Minimalist Spec",
    subtitle: "Authentic OEM chassis geometry & clean typography for Porsche 911 GT3 RS",
    category: "Technical Spec",
    image: "/template photo/1.webp",
    badge: "Variation #01 · Minimalist",
    size: "a2",
    quantity: 1,
    selected: false,
  },
  {
    id: "gen-poster-2",
    title: "Porsche 911 GT3 RS · Dark Shadow",
    subtitle: "Moody studio lighting and high-contrast specular reflections",
    category: "Dark Atelier",
    image: "/template photo/2.webp",
    badge: "Variation #02 · Shadow Box",
    size: "a2",
    quantity: 1,
    selected: false,
  },
  {
    id: "gen-poster-3",
    title: "Porsche 911 GT3 RS · Heritage Livery",
    subtitle: "Vintage motorsport striping and competition numbers",
    category: "Heritage Racing",
    image: "/template photo/3.webp",
    badge: "Variation #03 · Heritage",
    size: "a2",
    quantity: 1,
    selected: false,
  },
  {
    id: "gen-poster-4",
    title: "Tokyo Cyber Night Edition",
    subtitle: "Multi-angle master composite with ambient reflections & Japanese typography",
    category: "Exhibition Cyber",
    image: "/template photo/4.webp",
    badge: "Variation #04 · Master Render",
    size: "a2",
    quantity: 1,
    selected: false,
  },
];

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

function subscribeTemplates(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function getTemplatesSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem(TEMPLATES_STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

function getServerTemplatesSnapshot(): string {
  return "[]";
}

function saveTemplatesToStorage(templates: string[]) {
  if (typeof window === "undefined") return;
  try {
    if (templates.length > 0) {
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
    } else {
      localStorage.removeItem(TEMPLATES_STORAGE_KEY);
    }
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch (e) {
    console.warn("Could not save templates to localStorage", e);
  }
}

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
  generatedArtworks: GeneratedArtwork[];
  selectedArtworks: Record<string, ArtworkSelection>;
  toggleArtworkSelection: (id: string) => void;
  updateArtworkSize: (id: string, size: string) => void;
  updateArtworkQuantity: (id: string, delta: number) => void;
  addDirectCartItem: (item: Omit<CartItem, "total">) => void;
  removeDirectCartItem: (id: string) => void;
  updateDirectCartQuantity: (id: string, delta: number) => void;
  cartItems: CartItem[];
  cartSubtotal: number;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const emptySubscribe = () => () => {};

export function StudioProvider({ children }: { children: React.ReactNode }) {
  // Modal & Navigation States
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Hydration-safe client mount detection (clean React 19 pattern without setState in effect)
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Authentication: Synchronized with localStorage (persists after signup until explicit sign out)
  const rawStoredUser = useSyncExternalStore(
    subscribeUser,
    getUserSnapshot,
    getServerUserSnapshot
  );

  const user: User | null = useMemo(() => {
    if (!isMounted || !rawStoredUser) return null;
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
  }, [isMounted, rawStoredUser]);

  // Selections: Synchronized with localStorage (defaults to empty [])
  const rawStoredTemplates = useSyncExternalStore(
    subscribeTemplates,
    getTemplatesSnapshot,
    getServerTemplatesSnapshot
  );

  const selectedTemplates: string[] = useMemo(() => {
    if (!isMounted) return [];
    try {
      const parsed = JSON.parse(rawStoredTemplates);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((id) => typeof id === "string" && TEMPLATES.some((t) => t.id === id))
          .slice(0, 3);
      }
    } catch {
      // Invalid JSON in localStorage
    }
    return [];
  }, [isMounted, rawStoredTemplates]);

  const [uploadedPhoto, setUploadedPhoto] = useState<string>("");
  const [vehicleName, setVehicleName] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");

  // Workflow State
  const [studioState, setStudioState] = useState<StudioState>("configure");
  const [generationProgress, setGenerationProgress] = useState<Record<string, GenerationJobStatus>>({});
  const [combinedStatus, setCombinedStatus] = useState<"idle" | "queued" | "processing" | "completed">("idle");
  const rawStoredGenerated = useSyncExternalStore(
    subscribeGenerated,
    getGeneratedSnapshot,
    () => ""
  );

  const [sessionGenerated, setSessionGenerated] = useState<GeneratedArtwork[] | null>(null);

  const generatedArtworks: GeneratedArtwork[] = useMemo(() => {
    if (sessionGenerated) return sessionGenerated;
    if (rawStoredGenerated) {
      try {
        const parsed = JSON.parse(rawStoredGenerated);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_GENERATED_ARTWORKS;
  }, [sessionGenerated, rawStoredGenerated]);

  const setGeneratedArtworks = (
    artworks: GeneratedArtwork[] | ((prev: GeneratedArtwork[]) => GeneratedArtwork[])
  ) => {
    setSessionGenerated((prev) => {
      const current = prev || generatedArtworks;
      const next = typeof artworks === "function" ? artworks(current) : artworks;
      saveGeneratedToStorage(next);
      return next;
    });
  };

  // Auth Methods
  const signIn = (email: string, password: string) => {
    const trimmed = email.trim();
    if (!trimmed) {
      return { success: false, error: "Please enter your email address." };
    }
    if (password.trim() !== "0000") {
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
    setStudioState("configure");
    setGenerationProgress({});
    setCombinedStatus("idle");
    toast.info("Signed Out", {
      description: "You have been signed out of your atelier account.",
    });
  };

  // Template toggle in selection bar (purely configures up to 3 templates for generation, DOES NOT ADD TO CART)
  const toggleTemplate = (id: string) => {
    const template = TEMPLATES.find((t) => t.id === id);
    const templateName = template?.name || "Template";

    // 1. If template is already selected, remove it from selection bar
    if (selectedTemplates.includes(id)) {
      const next = selectedTemplates.filter((t) => t !== id);
      saveTemplatesToStorage(next);

      toast.info(`Removed "${templateName}"`, {
        description: `${next.length} of 3 templates selected for studio`,
      });
      return;
    }

    // 2. If 3 are already selected, warn the user
    if (selectedTemplates.length >= 3) {
      toast.warning("Maximum 3 Templates Reached", {
        description: "You can select up to 3 templates for generation. Please remove one before adding another design.",
      });
      return;
    }

    // 3. Otherwise, add the template to selection bar
    const next = [...selectedTemplates, id];
    saveTemplatesToStorage(next);

    toast.success(`Selected "${templateName}"`, {
      description: `${next.length} of 3 template${next.length > 1 ? "s" : ""} selected for studio generation`,
    });
  };

  const clearTemplates = () => {
    saveTemplatesToStorage([]);
    toast.info("Cleared Template Selection", {
      description: "All selected templates have been removed from the studio queue.",
    });
  };

  // Helper to build 4 distinct generated AI poster variations
  const createFourPosterVariations = (): GeneratedArtwork[] => {
    const t1 = selectedTemplates[0] ? TEMPLATES.find((t) => t.id === selectedTemplates[0]) : null;
    const t2 = selectedTemplates[1] ? TEMPLATES.find((t) => t.id === selectedTemplates[1]) : null;
    const t3 = selectedTemplates[2] ? TEMPLATES.find((t) => t.id === selectedTemplates[2]) : null;

    const fallbackImgs = [
      "/template photo/1.webp",
      "/template photo/2.webp",
      "/template photo/3.webp",
      "/template photo/4.webp",
    ];

    const hasNamedCar = vehicleName && !/^\d+$/.test(vehicleName.trim()) && vehicleName.trim().length > 1;
    const carLabel = hasNamedCar ? vehicleName.trim() : (t1?.subtitle || "bespoke vehicle");

    return [
      {
        id: "gen-poster-1",
        title: t1 ? t1.name : "Minimalist Gallery Spec",
        subtitle: `Authentic OEM chassis geometry & clean typography for ${carLabel}`,
        category: t1 ? t1.category : "Technical Spec",
        image: uploadedPhoto || t1?.image || fallbackImgs[0],
        badge: "Variation #01 · Minimalist",
        size: "a2",
        quantity: 1,
        selected: false,
      },
      {
        id: "gen-poster-2",
        title: t2 ? t2.name : (t1 ? `${t1.name} · Dark Shadow` : "Obsidian Dark Shadow Box"),
        subtitle: `Moody studio lighting and high-contrast specular reflections`,
        category: t2 ? t2.category : "Dark Atelier",
        image: t2?.image || fallbackImgs[1],
        badge: "Variation #02 · Shadow Box",
        size: "a2",
        quantity: 1,
        selected: false,
      },
      {
        id: "gen-poster-3",
        title: t3 ? t3.name : (t1 ? `${t1.name} · Heritage Livery` : "Heritage Racing Livery"),
        subtitle: `Vintage motorsport striping and competition numbers`,
        category: t3 ? t3.category : "Heritage Racing",
        image: t3?.image || fallbackImgs[2],
        badge: "Variation #03 · Heritage",
        size: "a2",
        quantity: 1,
        selected: false,
      },
      {
        id: "gen-poster-4",
        title:
          selectedTemplates.length >= 2
            ? "Harmonized Composite Atelier Edition"
            : t1
            ? `${t1.name} · Tokyo Cyber`
            : "Tokyo Cyber Night Edition",
        subtitle: `Multi-angle master composite with ambient reflections & Japanese typography`,
        category: "Exhibition Cyber",
        image: fallbackImgs[3],
        badge: "Variation #04 · Master Render",
        size: "a2",
        quantity: 1,
        selected: false,
      },
    ];
  };

  // AI Generation Pipeline: Generates 4 pictures
  const startGenerationPipeline = () => {
    setStudioState("generating");

    const fourPosters = createFourPosterVariations();
    setGeneratedArtworks(fourPosters);

    const initial: Record<string, GenerationJobStatus> = {};
    fourPosters.forEach((p) => {
      initial[p.id] = "queued";
    });
    setGenerationProgress(initial);

    fourPosters.forEach((p, index) => {
      setTimeout(() => {
        setGenerationProgress((prev) => ({ ...prev, [p.id]: "processing" }));
      }, (index + 1) * 600);

      setTimeout(() => {
        setGenerationProgress((prev) => ({ ...prev, [p.id]: "completed" }));
      }, (index + 1) * 600 + 1300);
    });

    const totalTime = fourPosters.length * 600 + 1500;
    setTimeout(() => {
      setStudioState("review");
      toast.success("4 AI Posters Generated", {
        description: "Select which pictures you want to print to add them to your cart.",
      });
    }, totalTime);
  };

  const generateCombined = () => {
    setCombinedStatus("queued");
    setTimeout(() => {
      setCombinedStatus("processing");
    }, 600);
    setTimeout(() => {
      setCombinedStatus("completed");
    }, 2200);
  };

  // Toggling selection on a generated picture adds/removes it from the Studio Print Cart
  const toggleArtworkSelection = (id: string) => {
    setGeneratedArtworks((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextSelected = !art.selected;
          const sizeObj = PRINT_SIZES.find((s) => s.id === art.size) || PRINT_SIZES[3];
          if (nextSelected) {
            toast.success(`Added to Cart: "${art.title}"`, {
              description: `${sizeObj.label} (${sizeObj.dimensions}) · ${sizeObj.price}`,
            });
          } else {
            toast.info(`Removed from Cart: "${art.title}"`);
          }
          return { ...art, selected: nextSelected };
        }
        return art;
      })
    );
  };

  const updateArtworkSize = (id: string, size: string) => {
    setGeneratedArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, size } : art))
    );
  };

  const updateArtworkQuantity = (id: string, delta: number) => {
    setGeneratedArtworks((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextQty = Math.max(1, art.quantity + delta);
          return { ...art, quantity: nextQty };
        }
        return art;
      })
    );
  };

  // Backwards compatibility for components referencing selectedArtworks
  const selectedArtworks: Record<string, ArtworkSelection> = useMemo(() => {
    const record: Record<string, ArtworkSelection> = {};
    generatedArtworks.forEach((art) => {
      record[art.id] = {
        selected: art.selected,
        size: art.size,
        quantity: art.quantity,
      };
    });
    return record;
  }, [generatedArtworks]);

  // Direct Template Cart Items (for configured size & GSM purchases)
  const [directCartItems, setDirectCartItems] = useState<CartItem[]>([]);

  const addDirectCartItem = (newItem: Omit<CartItem, "total">) => {
    setDirectCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                total: (item.quantity + newItem.quantity) * item.price,
              }
            : item
        );
      }
      return [...prev, { ...newItem, total: newItem.price * newItem.quantity }];
    });
  };

  const removeDirectCartItem = (id: string) => {
    setDirectCartItems((prev) => prev.filter((item) => item.id !== id));
    setGeneratedArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, selected: false } : art))
    );
  };

  const updateDirectCartQuantity = (id: string, delta: number) => {
    setDirectCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              total: nextQty * item.price,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
    setGeneratedArtworks((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextQty = Math.max(1, art.quantity + delta);
          return { ...art, quantity: nextQty };
        }
        return art;
      })
    );
  };

  // Cart calculations: ONLY selected generated posters are added to the cart
  const studioCartItems: CartItem[] = generatedArtworks
    .filter((art) => art.selected)
    .map((art) => {
      const sizeObj = PRINT_SIZES.find((s) => s.id === art.size) || PRINT_SIZES[3];
      return {
        id: art.id,
        title: art.title,
        size: sizeObj.label,
        dimensions: sizeObj.dimensions,
        price: sizeObj.priceNum,
        quantity: art.quantity,
        total: sizeObj.priceNum * art.quantity,
        isCombined: art.id === "gen-poster-4",
        image: art.image,
        currency: "INR",
        formattedPrice: sizeObj.price,
      };
    });

  const cartItems: CartItem[] = [...directCartItems, ...studioCartItems];
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
        generatedArtworks,
        selectedArtworks,
        toggleArtworkSelection,
        updateArtworkSize,
        updateArtworkQuantity,
        addDirectCartItem,
        removeDirectCartItem,
        updateDirectCartQuantity,
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
