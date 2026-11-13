import { PrintSize } from "@/types";

export const PRINT_SIZES: PrintSize[] = [
  { id: "a3", label: "A3 Studio", dimensions: "29.7 × 42.0 cm", priceNum: 129, price: "$129", popular: false },
  { id: "a2", label: "A2 Gallery", dimensions: "42.0 × 59.4 cm", priceNum: 189, price: "$189", popular: true },
  { id: "a1", label: "A1 Exhibition", dimensions: "59.4 × 84.1 cm", priceNum: 269, price: "$269", popular: false },
  { id: "ultra", label: "Panoramic Grand", dimensions: "60.0 × 120.0 cm", priceNum: 389, price: "$389", popular: false },
];
