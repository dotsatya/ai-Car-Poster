import { PrintSize } from "@/types";

export const PRINT_SIZES: PrintSize[] = [
  { id: "a4", label: "A4", dimensions: "21.0 × 29.7 cm", priceNum: 499, price: "₹499", popular: false },
  { id: "a3", label: "A3", dimensions: "29.7 × 42.0 cm", priceNum: 799, price: "₹799", popular: false },
  { id: "12x18", label: "12 × 18 inches", dimensions: "30.5 × 45.7 cm", priceNum: 999, price: "₹999", popular: false },
  { id: "a2", label: "A2 Gallery", dimensions: "42.0 × 59.4 cm", priceNum: 1299, price: "₹1,299", popular: true },
  { id: "a1", label: "A1 Exhibition", dimensions: "59.4 × 84.1 cm", priceNum: 1899, price: "₹1,899", popular: false },
  { id: "ultra", label: "Panoramic Grand", dimensions: "60.0 × 120.0 cm", priceNum: 2499, price: "₹2,499", popular: false },
];
