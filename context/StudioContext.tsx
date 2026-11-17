"use client";

import React, { createContext, useContext, useState, useMemo, useSyncExternalStore } from "react";
import { User, StudioState, GenerationJobStatus, GeneratedArtwork, CartItem } from "@/types";
import { TEMPLATES } from "@/data/templates";
import { toast } from "sonner";
import { useAppAuth } from "@/lib/auth";
import { getAvailableSizesForArtwork } from "@/lib/templateSizes";

const TEMPLATES_STORAGE_KEY = "poster_gen_selected_templates";
const STORAGE_EVENT = "poster_gen_templates_changed";

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
    templateId: "porsche-911-gt3-rs-minimalist-spec",
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
    templateId: "porsche-911-gt3-rs-racing-green-gold",
  },
  {
    id: "gen-poster-3",
    title: "Porsche 911 GT3 RS · Heritage Livery",
    subtitle: "Vintage motorsport striping and competition numbers",
    category: "Heritage Racing",
    image: "/template photo/3.webp",
    badge: "Variation #03 · Heritage",
    size: "a3",
    quantity: 1,
    selected: false,
    templateId: "porsche-carrera-gt-engineering-spec",
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
    templateId: "porsche-911-turbo-s-shark-blue-cyber",
  },
];

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
  // Auth from app auth provider
  user: User | null;
  signIn: (email: string, password?: string) => { success: boolean; error?: string };
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
  startGenerationPipeline: () => void;

  // Review & Cart
  generatedArtworks: GeneratedArtwork[];
  toggleArtworkSelection: (id: string) => void;
  updateArtworkSize: (id: string, size: string) => void;
  updateArtworkQuantity: (id: string, delta: number) => void;
  addDirectCartItem: (item: Omit<CartItem, "total">) => void;
  removeDirectCartItem: (id: string) => void;
  updateDirectCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartItems: CartItem[];
  cartSubtotal: number;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const emptySubscribe = () => () => {};

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const { user, signIn, signOut: authSignOut, isSignInOpen, setIsSignInOpen } = useAppAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Client hydration check
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Template selections synced with localStorage
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
    } catch {}
    return [];
  }, [isMounted, rawStoredTemplates]);

  const [uploadedPhoto, setUploadedPhoto] = useState<string>("");
  const [vehicleName, setVehicleName] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");

  const [internalStudioState, setStudioState] = useState<StudioState>("configure");
  const [internalGenerationProgress, setGenerationProgress] = useState<Record<string, GenerationJobStatus>>({});
  const [internalDirectCartItems, setDirectCartItems] = useState<CartItem[]>([]);
  const [sessionGenerated, setSessionGenerated] = useState<GeneratedArtwork[] | null>(null);

  // Derived state: strictly protect generation review and cart when unauthenticated
  const studioState: StudioState = user ? internalStudioState : "configure";
  const generationProgress = user ? internalGenerationProgress : {};
  const directCartItems = user ? internalDirectCartItems : [];

  const rawStoredGenerated = useSyncExternalStore(
    subscribeGenerated,
    getGeneratedSnapshot,
    () => ""
  );

  // External auth reset listener for cross-tab or navbar logouts
  React.useEffect(() => {
    const handleAuthReset = () => {
      try {
        const storedUser = localStorage.getItem("poster_gen_auth_user");
        if (!storedUser) {
          setStudioState("configure");
          setSessionGenerated(null);
          setDirectCartItems([]);
          setUploadedPhoto("");
          setVehicleName("");
          setCustomText("");
          setGenerationProgress({});
          setIsCartOpen(false);
        }
      } catch {}
    };

    window.addEventListener("poster_gen_auth_changed", handleAuthReset);
    window.addEventListener("storage", handleAuthReset);
    return () => {
      window.removeEventListener("poster_gen_auth_changed", handleAuthReset);
      window.removeEventListener("storage", handleAuthReset);
    };
  }, []);

  const generatedArtworks: GeneratedArtwork[] = useMemo(() => {
    if (!user) return [];
    if (sessionGenerated) return sessionGenerated;
    if (rawStoredGenerated) {
      try {
        const parsed = JSON.parse(rawStoredGenerated);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_GENERATED_ARTWORKS;
  }, [user, sessionGenerated, rawStoredGenerated]);

  const setGeneratedArtworks = (
    artworks: GeneratedArtwork[] | ((prev: GeneratedArtwork[]) => GeneratedArtwork[])
  ) => {
    const current = sessionGenerated || generatedArtworks;
    const next = typeof artworks === "function" ? artworks(current) : artworks;
    saveGeneratedToStorage(next);
    setSessionGenerated(next);
  };

  const signOut = () => {
    authSignOut();
    setStudioState("configure");
    setSessionGenerated(null);
    setDirectCartItems([]);
    setUploadedPhoto("");
    setVehicleName("");
    setCustomText("");
    setGenerationProgress({});
    setIsCartOpen(false);
    try {
      localStorage.removeItem(GENERATED_STORAGE_KEY);
      localStorage.removeItem(TEMPLATES_STORAGE_KEY);
      window.dispatchEvent(new Event(GENERATED_STORAGE_EVENT));
      window.dispatchEvent(new Event(STORAGE_EVENT));
    } catch {}
  };

  const toggleTemplate = (id: string) => {
    const template = TEMPLATES.find((t) => t.id === id);
    const templateName = template?.name || "Template";

    if (selectedTemplates.includes(id)) {
      const next = selectedTemplates.filter((t) => t !== id);
      saveTemplatesToStorage(next);
      toast.info(`Removed "${templateName}"`, {
        description: `${next.length} of 3 templates selected for studio`,
      });
      return;
    }

    if (selectedTemplates.length >= 3) {
      toast.warning("Maximum 3 Templates Reached", {
        description: "You can select up to 3 templates for generation. Please remove one before adding another design.",
      });
      return;
    }

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

    const template1 = t1 || TEMPLATES[0];
    const template2 = t2 || t1 || TEMPLATES[1];
    const template3 = t3 || t1 || TEMPLATES[2];
    const template4 = t1 || TEMPLATES[3] || TEMPLATES[0];

    const getInitialSize = (template: typeof TEMPLATES[0]) => {
      if (!template.availableSizes || template.availableSizes.length === 0) return "a2";
      if (template.availableSizes.some((s) => s.id === "a2")) return "a2";
      if (template.availableSizes.some((s) => s.id === "a3")) return "a3";
      return template.availableSizes[0].id;
    };

    return [
      {
        id: "gen-poster-1",
        title: t1 ? t1.name : "Minimalist Gallery Spec",
        subtitle: `Authentic OEM chassis geometry & clean typography for ${carLabel}`,
        category: t1 ? t1.category : "Technical Spec",
        image: uploadedPhoto || t1?.image || fallbackImgs[0],
        badge: "Variation #01 · Minimalist",
        size: getInitialSize(template1),
        quantity: 1,
        selected: false,
        templateId: template1.id,
      },
      {
        id: "gen-poster-2",
        title: t2 ? t2.name : (t1 ? `${t1.name} · Dark Shadow` : "Obsidian Dark Shadow Box"),
        subtitle: `Moody studio lighting and high-contrast specular reflections`,
        category: t2 ? t2.category : "Dark Atelier",
        image: t2?.image || fallbackImgs[1],
        badge: "Variation #02 · Shadow Box",
        size: getInitialSize(template2),
        quantity: 1,
        selected: false,
        templateId: template2.id,
      },
      {
        id: "gen-poster-3",
        title: t3 ? t3.name : (t1 ? `${t1.name} · Heritage Livery` : "Heritage Racing Livery"),
        subtitle: `Vintage motorsport striping and competition numbers`,
        category: t3 ? t3.category : "Heritage Racing",
        image: t3?.image || fallbackImgs[2],
        badge: "Variation #03 · Heritage",
        size: getInitialSize(template3),
        quantity: 1,
        selected: false,
        templateId: template3.id,
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
        size: getInitialSize(template4),
        quantity: 1,
        selected: false,
        templateId: template4.id,
      },
    ];
  };

  // Simulates progressive AI generation queue
  const startGenerationPipeline = () => {
    if (!user) {
      setIsSignInOpen(true);
      toast.info("Authentication Required", {
        description: "Please sign in or create an atelier account to generate AI car posters.",
      });
      return;
    }

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
      try {
        const stored = localStorage.getItem("poster_gen_auth_user");
        if (!stored) return;
      } catch {
        return;
      }

      setStudioState("review");
      toast.success("4 AI Posters Generated", {
        description: "Select which pictures you want to print to add them to your cart.",
      });
    }, totalTime);
  };

  const toggleArtworkSelection = (id: string) => {
    const targetArt = generatedArtworks.find((art) => art.id === id);
    if (!targetArt) return;

    const nextSelected = !targetArt.selected;
    const availableSizes = getAvailableSizesForArtwork(targetArt, selectedTemplates);
    const sizeObj = availableSizes.find((s) => s.id === targetArt.size) || availableSizes[0];

    if (nextSelected) {
      toast.success(`Added to Cart: "${targetArt.title}"`, {
        description: `${sizeObj.name} (${sizeObj.dimensions}) · ${sizeObj.price}`,
      });
    } else {
      toast.info(`Removed from Cart: "${targetArt.title}"`);
    }

    setGeneratedArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, selected: nextSelected } : art))
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

  // Direct template purchases for size & GSM
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

  const studioCartItems: CartItem[] = user
    ? generatedArtworks
        .filter((art) => art.selected)
        .map((art) => {
          const availableSizes = getAvailableSizesForArtwork(art, selectedTemplates);
          const sizeObj = availableSizes.find((s) => s.id === art.size) || availableSizes[0];
          return {
            id: art.id,
            title: art.title,
            size: sizeObj.name,
            dimensions: sizeObj.dimensions,
            price: sizeObj.priceNum,
            quantity: art.quantity,
            total: sizeObj.priceNum * art.quantity,
            isCombined: art.id === "gen-poster-4",
            image: art.image,
            currency: "USD",
            formattedPrice: sizeObj.price,
          };
        })
    : [];

  const clearCart = () => {
    setDirectCartItems([]);
    setGeneratedArtworks((prev) =>
      prev.map((art) => ({ ...art, selected: false }))
    );
    try {
      localStorage.removeItem(GENERATED_STORAGE_KEY);
      window.dispatchEvent(new Event(GENERATED_STORAGE_EVENT));
    } catch {}
  };

  const cartItems: CartItem[] = user ? [...directCartItems, ...studioCartItems] : [];
  const cartSubtotal = user ? cartItems.reduce((acc, curr) => acc + curr.total, 0) : 0;

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
        startGenerationPipeline,
        generatedArtworks,
        toggleArtworkSelection,
        updateArtworkSize,
        updateArtworkQuantity,
        addDirectCartItem,
        removeDirectCartItem,
        updateDirectCartQuantity,
        clearCart,
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
