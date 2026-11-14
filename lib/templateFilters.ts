import { Template } from "@/types";

export interface FilterState {
  brands: string[];
  models: string[];
  styles: string[];
  collections: string[];
  categories: string[];
  years: string[];
  priceRange: "all" | "499-999" | "999-1999" | "custom";
  customMinPrice: number;
  customMaxPrice: number;
}

export const INITIAL_FILTER_STATE: FilterState = {
  brands: [],
  models: [],
  styles: [],
  collections: [],
  categories: [],
  years: [],
  priceRange: "all",
  customMinPrice: 400,
  customMaxPrice: 2000,
};

export const FILTER_OPTIONS = {
  brands: [
    "Porsche",
    "BMW",
    "Mercedes-Benz",
    "Ferrari",
    "Lamborghini",
    "Audi",
    "McLaren",
    "Toyota",
    "Nissan",
    "Ford",
    "Koenigsegg",
    "Pagani",
    "Bugatti",
    "Mazda",
  ],
  models: [
    "911",
    "GT3 RS",
    "M3",
    "M4",
    "AMG GT",
    "Huracán",
    "Supra",
    "Skyline",
    "720S",
    "F40",
    "Chiron",
  ],
  styles: [
    "Minimal",
    "Vintage",
    "Racing",
    "Magazine",
    "Artistic",
  ],
  collections: [
    "JDM Legends",
    "Supercars",
    "Classic Icons",
    "Motorsport",
  ],
  categories: [
    "Sports",
    "Supercar",
    "Hypercar",
    "Muscle",
    "Luxury",
    "SUV",
  ],
  years: [
    "1990s",
    "2000s",
    "2010s",
    "2020s",
  ],
  priceRanges: [
    { id: "all", label: "All Prices" },
    { id: "499-999", label: "₹499–₹999" },
    { id: "999-1999", label: "₹999–₹1,999" },
    { id: "custom", label: "Custom Range" },
  ] as const,
};

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  count += filters.brands.length;
  count += filters.models.length;
  count += filters.styles.length;
  count += filters.collections.length;
  count += filters.categories.length;
  count += filters.years.length;
  if (filters.priceRange !== "all") count += 1;
  return count;
}

export function matchTemplate(
  template: Template,
  filters: FilterState,
  searchQuery: string = ""
): boolean {
  const name = (template.name || "").toLowerCase();
  const vehicle = (template.subtitle || "").toLowerCase();
  const desc = (template.description || "").toLowerCase();
  const category = (template.category || "").toLowerCase();
  const tag = (template.tag || "").toLowerCase();
  const fullText = `${name} ${vehicle} ${desc} ${category} ${tag}`;

  // 1. Search Query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    if (!fullText.includes(q)) return false;
  }

  // 2. Car Brand Filter
  if (filters.brands.length > 0) {
    const brandMatches = filters.brands.some((brand) => {
      const b = brand.toLowerCase();
      if (b === "porsche") return fullText.includes("porsche") || fullText.includes("carrera") || fullText.includes("911");
      if (b === "bmw") return fullText.includes("bmw") || fullText.includes("m4") || fullText.includes("m3") || fullText.includes("csl");
      if (b === "mercedes-benz" || b === "mercedes") return fullText.includes("mercedes") || fullText.includes("amg");
      if (b === "ferrari") return fullText.includes("ferrari") || fullText.includes("f40") || fullText.includes("812");
      if (b === "lamborghini") return fullText.includes("lamborghini") || fullText.includes("aventador") || fullText.includes("huracan") || fullText.includes("huracán");
      if (b === "audi") return fullText.includes("audi") || fullText.includes("r8") || fullText.includes("rs");
      if (b === "mclaren") return fullText.includes("mclaren") || fullText.includes("720s") || fullText.includes("p1");
      if (b === "toyota") return fullText.includes("toyota") || fullText.includes("supra");
      if (b === "nissan") return fullText.includes("nissan") || fullText.includes("skyline") || fullText.includes("240sx");
      if (b === "ford") return fullText.includes("ford") || fullText.includes("mustang") || fullText.includes("shelby");
      if (b === "koenigsegg") return fullText.includes("koenigsegg") || fullText.includes("jesko") || fullText.includes("agera");
      if (b === "pagani") return fullText.includes("pagani") || fullText.includes("zonda");
      if (b === "bugatti") return fullText.includes("bugatti") || fullText.includes("chiron");
      if (b === "mazda") return fullText.includes("mazda") || fullText.includes("rx-7") || fullText.includes("rx7");
      return fullText.includes(b);
    });
    if (!brandMatches) return false;
  }

  // 3. Car Model / Series
  if (filters.models.length > 0) {
    const modelMatches = filters.models.some((model) => {
      const m = model.toLowerCase();
      if (m === "911") return fullText.includes("911") || fullText.includes("992");
      if (m === "gt3 rs") return fullText.includes("gt3 rs") || fullText.includes("gt3");
      if (m === "m3") return fullText.includes("m3");
      if (m === "m4") return fullText.includes("m4");
      if (m === "amg gt") return fullText.includes("amg") || fullText.includes("cle 53") || fullText.includes("amg gt");
      if (m === "huracán" || m === "huracan") return fullText.includes("huracan") || fullText.includes("huracán");
      if (m === "supra") return fullText.includes("supra");
      if (m === "skyline") return fullText.includes("skyline") || fullText.includes("r33") || fullText.includes("gtr");
      if (m === "720s") return fullText.includes("720s");
      if (m === "f40") return fullText.includes("f40");
      if (m === "chiron") return fullText.includes("chiron");
      return fullText.includes(m);
    });
    if (!modelMatches) return false;
  }

  // 4. Poster Style
  if (filters.styles.length > 0) {
    const styleMatches = filters.styles.some((style) => {
      const s = style.toLowerCase();
      if (s === "minimal") {
        return (
          category.includes("spec") ||
          category.includes("minimal") ||
          category.includes("gallery") ||
          name.includes("minimal") ||
          name.includes("spec") ||
          desc.includes("white") ||
          desc.includes("clean") ||
          desc.includes("monochromatic")
        );
      }
      if (s === "vintage") {
        return (
          category.includes("heritage") ||
          category.includes("classic") ||
          category.includes("iconic") ||
          name.includes("heritage") ||
          name.includes("shelby") ||
          name.includes("mustang") ||
          name.includes("ferrari f40") ||
          name.includes("carrera gt") ||
          desc.includes("vintage") ||
          desc.includes("retro") ||
          desc.includes("golden")
        );
      }
      if (s === "racing") {
        return (
          category.includes("racing") ||
          category.includes("motorsport") ||
          category.includes("track") ||
          name.includes("gt3") ||
          name.includes("apex") ||
          name.includes("m4") ||
          name.includes("competition") ||
          name.includes("csl") ||
          name.includes("speed") ||
          tag.includes("racing") ||
          tag.includes("track")
        );
      }
      if (s === "magazine") {
        return (
          category.includes("modern") ||
          category.includes("jdm") ||
          name.includes("supra") ||
          name.includes("cle 53") ||
          name.includes("skyline") ||
          name.includes("240sx") ||
          desc.includes("magazine") ||
          desc.includes("split panel") ||
          desc.includes("showcase") ||
          desc.includes("tribute")
        );
      }
      if (s === "artistic") {
        return (
          category.includes("art") ||
          category.includes("graffiti") ||
          category.includes("cyber") ||
          category.includes("hypercar") ||
          category.includes("fine art") ||
          name.includes("graffiti") ||
          name.includes("storm") ||
          name.includes("halo") ||
          name.includes("afterburner") ||
          name.includes("jesko") ||
          name.includes("zonda") ||
          name.includes("rules") ||
          desc.includes("graffiti") ||
          desc.includes("painting")
        );
      }
      return false;
    });
    if (!styleMatches) return false;
  }

  // 5. Collection
  if (filters.collections.length > 0) {
    const colMatches = filters.collections.some((col) => {
      const c = col.toLowerCase();
      if (c === "jdm legends") {
        return (
          fullText.includes("jdm") ||
          fullText.includes("supra") ||
          fullText.includes("skyline") ||
          fullText.includes("rx-7") ||
          fullText.includes("rx7") ||
          fullText.includes("240sx")
        );
      }
      if (c === "supercars") {
        return (
          fullText.includes("720s") ||
          fullText.includes("huracan") ||
          fullText.includes("huracán") ||
          fullText.includes("812") ||
          fullText.includes("aventador") ||
          fullText.includes("cle 53") ||
          fullText.includes("turbo s") ||
          fullText.includes("gt3 rs")
        );
      }
      if (c === "classic icons") {
        return (
          fullText.includes("f40") ||
          fullText.includes("carrera gt") ||
          fullText.includes("shelby") ||
          fullText.includes("mustang") ||
          fullText.includes("zonda") ||
          fullText.includes("240sx")
        );
      }
      if (c === "motorsport") {
        return (
          fullText.includes("racing") ||
          fullText.includes("motorsport") ||
          fullText.includes("track") ||
          fullText.includes("gt3") ||
          fullText.includes("csl") ||
          fullText.includes("p1 gtr") ||
          fullText.includes("chiron") ||
          fullText.includes("agera")
        );
      }
      return fullText.includes(c);
    });
    if (!colMatches) return false;
  }

  // 6. Car Category
  if (filters.categories.length > 0) {
    const catMatches = filters.categories.some((cat) => {
      const k = cat.toLowerCase();
      if (k === "sports") {
        return (
          fullText.includes("supra") ||
          fullText.includes("240sx") ||
          fullText.includes("rx-7") ||
          fullText.includes("rx7") ||
          fullText.includes("cle 53") ||
          fullText.includes("m4")
        );
      }
      if (k === "supercar") {
        return (
          fullText.includes("gt3 rs") ||
          fullText.includes("turbo s") ||
          fullText.includes("720s") ||
          fullText.includes("812") ||
          fullText.includes("huracan") ||
          fullText.includes("huracán") ||
          fullText.includes("aventador")
        );
      }
      if (k === "hypercar") {
        return (
          fullText.includes("chiron") ||
          fullText.includes("jesko") ||
          fullText.includes("agera") ||
          fullText.includes("zonda") ||
          fullText.includes("p1 gtr") ||
          fullText.includes("hypercar") ||
          fullText.includes("f40") ||
          fullText.includes("carrera gt")
        );
      }
      if (k === "muscle") {
        return fullText.includes("mustang") || fullText.includes("shelby") || fullText.includes("muscle");
      }
      if (k === "luxury") {
        return (
          fullText.includes("mercedes") ||
          fullText.includes("amg") ||
          fullText.includes("signature luxury") ||
          fullText.includes("pagani") ||
          fullText.includes("812 gts") ||
          fullText.includes("cle 53")
        );
      }
      if (k === "suv") {
        return fullText.includes("suv") || fullText.includes("g-wagon") || fullText.includes("urus");
      }
      return fullText.includes(k);
    });
    if (!catMatches) return false;
  }

  // 7. Model Year
  if (filters.years.length > 0) {
    const yearMatches = filters.years.some((yr) => {
      if (yr === "1990s") {
        return (
          fullText.includes("1990") ||
          fullText.includes("1992") ||
          fullText.includes("1993") ||
          fullText.includes("1995") ||
          fullText.includes("1999") ||
          fullText.includes("240sx") ||
          fullText.includes("f40") ||
          fullText.includes("mk4") ||
          fullText.includes("r33") ||
          fullText.includes("rx-7") ||
          fullText.includes("rx7")
        );
      }
      if (yr === "2000s") {
        return fullText.includes("2003") || fullText.includes("carrera gt");
      }
      if (yr === "2010s") {
        return (
          fullText.includes("2015") ||
          fullText.includes("2016") ||
          fullText.includes("2017") ||
          fullText.includes("2018") ||
          fullText.includes("2019") ||
          fullText.includes("p1 gtr") ||
          fullText.includes("shelby") ||
          fullText.includes("720s") ||
          fullText.includes("agera") ||
          fullText.includes("zonda") ||
          fullText.includes("aventador svj")
        );
      }
      if (yr === "2020s") {
        return (
          fullText.includes("2020") ||
          fullText.includes("2021") ||
          fullText.includes("2022") ||
          fullText.includes("2023") ||
          fullText.includes("2024") ||
          fullText.includes("992") ||
          fullText.includes("g82") ||
          fullText.includes("cle 53") ||
          fullText.includes("huracan") ||
          fullText.includes("huracán") ||
          fullText.includes("jesko") ||
          fullText.includes("chiron") ||
          fullText.includes("gr supra")
        );
      }
      return false;
    });
    if (!yearMatches) return false;
  }

  // 8. Price Range
  const price = template.startingPrice || 499;
  if (filters.priceRange === "499-999") {
    if (price < 400 || price > 999) return false;
  } else if (filters.priceRange === "999-1999") {
    if (price < 999 || price > 1999) return false;
  } else if (filters.priceRange === "custom") {
    if (price < filters.customMinPrice || price > filters.customMaxPrice) return false;
  }

  return true;
}
