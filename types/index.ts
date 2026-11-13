export interface Template {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  longDescription?: string;
  accent: string;
  features?: string[];
  supportsCustomText?: boolean;
  recommendedAspect?: string;
}

export interface PrintSize {
  id: string;
  label: string;
  dimensions: string;
  priceNum: number;
  price: string;
  popular: boolean;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface SampleVehicle {
  name: string;
  image: string;
  text: string;
}

export interface User {
  email: string;
}

export type StudioState = "configure" | "auth_prompt" | "generating" | "review";

export type GenerationJobStatus = "queued" | "processing" | "completed";

export interface ArtworkSelection {
  selected: boolean;
  size: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  title: string;
  size: string;
  dimensions: string;
  price: number;
  quantity: number;
  total: number;
  isCombined: boolean;
  image: string;
}
