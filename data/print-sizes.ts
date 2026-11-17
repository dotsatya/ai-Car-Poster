import { PrintSize } from "@/types";

export const PRINT_SIZES: PrintSize[] = [
  { id: "a4", label: "A4", dimensions: "21.0 × 29.7 cm", priceNum: 29, price: "$29", popular: false },
  { id: "a3", label: "A3", dimensions: "29.7 × 42.0 cm", priceNum: 45, price: "$45", popular: false },
  { id: "12x18", label: "12 × 18 inches", dimensions: "30.5 × 45.7 cm", priceNum: 55, price: "$55", popular: false },
  { id: "a2", label: "A2 Gallery", dimensions: "42.0 × 59.4 cm", priceNum: 79, price: "$79", popular: true },
  { id: "a1", label: "A1 Exhibition", dimensions: "59.4 × 84.1 cm", priceNum: 119, price: "$119", popular: false },
  { id: "ultra", label: "Panoramic Grand", dimensions: "60.0 × 120.0 cm", priceNum: 159, price: "$159", popular: false },
];
