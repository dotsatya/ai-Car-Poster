import { Template } from "@/types";
import { TEMPLATE_PHOTOS } from "@/lib/templatePhotos";

// Luxury gradient accents customized per aesthetic category
function getCategoryAccent(category: string): string {
  switch (category) {
    case "Technical Spec":
      return "from-slate-800 to-zinc-950";
    case "Heritage Racing":
      return "from-amber-600/30 to-neutral-950";
    case "Street Art & Graffiti":
      return "from-rose-600/30 to-purple-950/60";
    case "Futuristic & Cyber":
      return "from-cyan-600/30 to-blue-950/60";
    case "Classic Muscle":
      return "from-blue-700/30 to-neutral-950";
    case "Signature Luxury":
      return "from-neutral-700/40 to-black";
    case "Modern Gallery":
      return "from-zinc-600/30 to-neutral-950";
    case "Fine Art":
      return "from-red-900/40 to-neutral-950";
    case "Architectural & Iconic":
      return "from-stone-700/30 to-neutral-950";
    case "JDM Legends":
      return "from-orange-600/30 to-neutral-950";
    case "Modern JDM":
      return "from-yellow-600/30 to-neutral-950";
    case "Modern Luxury":
      return "from-slate-700/40 to-neutral-950";
    case "Modern Motorsport":
      return "from-red-700/30 to-neutral-950";
    case "Motorsport & Track":
      return "from-rose-700/40 to-neutral-950";
    case "Technical Art":
      return "from-cyan-800/30 to-neutral-950";
    case "Hypercar":
      return "from-purple-800/30 to-neutral-950";
    default:
      return "from-neutral-800/40 to-neutral-950";
  }
}

// Convert all 29 high-res posters from lib/templatePhotos into full Atelier Template objects
export const TEMPLATES: Template[] = TEMPLATE_PHOTOS.map((photo) => ({
  id: photo.slug,
  slug: photo.slug,
  name: photo.name,
  subtitle: photo.vehicle,
  category: photo.category,
  tag: photo.tag,
  image: encodeURI(photo.src),
  description: photo.description,
  longDescription: `${photo.description} Meticulously engineered for collectors and automotive enthusiasts. Generated with authentic chassis geometry, high-fidelity specular highlights, and museum-grade typography.`,
  accent: getCategoryAccent(photo.category),
  features: [
    "Museum archival 310 GSM Hahnemühle giclée print",
    "Ultra-high resolution 300+ DPI master render",
    "Preserves authentic OEM bodywork & reflection lines",
    "Customizable serial plate, VIN & chassis badges",
  ],
  supportsCustomText: true,
  recommendedAspect: "3:4 Fine Art Portrait",
  availableSizes: photo.availableSizes,
  availableGsm: photo.availableGsm,
  pricing: photo.pricing,
  startingPrice: photo.startingPrice,
  formattedStartingPrice: photo.formattedStartingPrice,
}));

// Backward compatibility map for previous sample template IDs
const LEGACY_ID_MAP: Record<string, string> = {
  "dark-noir": "porsche-911-gt3-rs-minimalist-spec",
  "monaco-vintage": "porsche-911-gt3-rs-racing-green-gold",
  "blueprint-cad": "porsche-carrera-gt-engineering-spec",
  "cyber-synth": "porsche-911-turbo-s-shark-blue-cyber",
  "bauhaus-minimal": "porsche-992-gt3-rs-minimalist-stripe",
  "trackday-telemetry": "bmw-m4-g82-competition-apex",
};

export function getTemplateBySlug(slugOrId: string): Template | undefined {
  if (!slugOrId) return undefined;
  const normalized = slugOrId.toLowerCase().trim();
  const resolvedSlug = LEGACY_ID_MAP[normalized] || normalized;

  return TEMPLATES.find(
    (t) =>
      t.slug.toLowerCase() === resolvedSlug ||
      t.id.toLowerCase() === resolvedSlug ||
      t.slug.toLowerCase() === normalized ||
      t.id.toLowerCase() === normalized
  );
}

