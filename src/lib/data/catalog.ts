/* ═══════════════════════════════════════════════════════════════
   CATALOGUE
   ═══════════════════════════════════════════════════════════════

   Nothing in this file may be invented. Three rules:

   1. `products` only ever contains devices Star Mobiles actually
      sells. The four entries below are *placeholder slots*, flagged
      with `pendingData: true`. They carry no brand, no model, no
      specifications and no price — because we do not know those yet.

   2. Once real devices are confirmed, replace a slot's fields and set
      `pendingData: false`. The UI upgrades automatically: real specs
      render in the specification table and the card drops its
      "awaiting confirmation" note.

   3. `brands` is the *published* brand wall. It is empty on purpose.
      Brands become visible the moment they are confirmed here — there
      is no hardcoded brand list anywhere else in the app.
*/

export const SPEC_KEYS = [
  "display",
  "processor",
  "ram",
  "storage",
  "camera",
  "battery",
] as const;

export type SpecKey = (typeof SPEC_KEYS)[number];

export const SPEC_LABELS: Record<SpecKey, string> = {
  display: "Display",
  processor: "Processor",
  ram: "RAM",
  storage: "Storage",
  camera: "Camera",
  battery: "Battery",
};

export type DeviceArtVariant = "signature" | "camera" | "value" | "compact";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  /** One-line positioning copy. Omit rather than guess. */
  tagline?: string;
  /** Vector artwork used until real photography is supplied. */
  art: DeviceArtVariant;
  /** Real photography, once available. Takes priority over `art`. */
  image?: { src: string; alt: string };
  /** INR. `null`/omitted renders as "Price on request" — never guessed. */
  price?: number | null;
  specs?: Partial<Record<SpecKey, string>>;
  /** Extra confirmed spec rows, shown under the standard six. */
  extras?: { label: string; value: string }[];
  /** True while this slot still needs real data. Suppresses claims. */
  pendingData?: boolean;
  featured?: boolean;
  /** Buckets for the "Find your phone" selector. Only set when confirmed. */
  priorities?: readonly Priority[];
};

export const PRIORITIES = [
  { id: "camera", label: "Camera", blurb: "Photos and video first" },
  { id: "gaming", label: "Gaming", blurb: "Sustained performance" },
  { id: "battery", label: "Battery", blurb: "All-day endurance" },
  { id: "performance", label: "Performance", blurb: "Speed and multitasking" },
  { id: "everyday", label: "Everyday", blurb: "Simple, reliable, balanced" },
  { id: "budget", label: "Budget", blurb: "Best value per rupee" },
] as const;

export type Priority = (typeof PRIORITIES)[number]["id"];

/* ── Placeholder device slots ────────────────────────────────────────────── */

const placeholder = (
  id: string,
  slug: string,
  art: DeviceArtVariant,
  featured: boolean,
  image: Product["image"],
): Product => ({
  id,
  slug,
  brand: "BRAND",
  model: "MODEL NAME",
  art,
  price: null,
  specs: undefined,
  pendingData: true,
  featured,
  image,
});

export const products: Product[] = [
  placeholder("slot-01", "featured-device-01", "signature", true, {
    src: "/images/catalog/signature-smartphone.jpg",
    alt: "Close-up product photo of a modern smartphone on a white surface.",
  }),
  placeholder("slot-02", "featured-device-02", "camera", true, {
    src: "/images/catalog/camera-smartphone.jpg",
    alt: "Macro photo of smartphone camera lenses.",
  }),
  placeholder("slot-03", "featured-device-03", "value", false, {
    src: "/images/catalog/value-smartphone.jpg",
    alt: "Hand holding a smartphone with a blank screen.",
  }),
  placeholder("slot-04", "featured-device-04", "compact", false, {
    src: "/images/catalog/compact-smartphone.jpg",
    alt: "Hand holding a compact smartphone in a clear case.",
  }),
];

/* ── Brand wall ─────────────────────────────────────────────────────────── */

/**
 * Brands Star Mobiles is confirmed to sell.
 * Empty until confirmed — the wall then renders a designed empty state
 * rather than guessing at a lineup.
 */
export const brands: { name: string; since?: string; note?: string }[] = [];

/* ── Derived ────────────────────────────────────────────────────────────── */

export const publishedProducts = products.filter((p) => !p.pendingData);

export const featuredProducts = products.filter((p) => p.featured);

export const pendingProductCount = products.filter((p) => p.pendingData).length;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getSpecs(product: Product): { label: string; value: string | null }[] {
  const rows = SPEC_KEYS.map((key) => ({
    label: SPEC_LABELS[key],
    value: product.specs?.[key] ?? null,
  }));
  for (const extra of product.extras ?? []) {
    rows.push({ label: extra.label, value: extra.value });
  }
  return rows;
}

/** Devices matching the chosen priorities. Pending slots never match. */
export function matchProducts(priorities: readonly Priority[]) {
  if (priorities.length === 0) return publishedProducts;
  return publishedProducts.filter((product) =>
    product.priorities?.some((p) => priorities.includes(p)),
  );
}
