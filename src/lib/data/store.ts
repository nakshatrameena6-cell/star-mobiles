/**
 * Single source of truth for all business-critical information.
 *
 * ── IMPORTANT ──────────────────────────────────────────────────────────────
 * Everything here is EDITABLE CONFIGURATION, not scraped truth. The address and
 * opening hours below come from a third-party directory listing and are marked
 * `status: "reference"`. Confirm them with the store before going live, then
 * change `status` to `"verified"`.
 *
 * Never hardcode a phone number, price, offer or service anywhere else in the
 * codebase. This file is the only place these facts live.
 */

export type FieldStatus = "verified" | "reference" | "unset";

export type ContactField = {
  /** Raw digits, country code first, no spaces or symbols. Empty = unset. */
  value: string;
  /** Shown in the UI when `value` is empty. */
  placeholder: string;
  status: FieldStatus;
};

export type OpeningHour = {
  day: string;
  /** 24h `HH:MM`. `null` = closed. */
  open: string | null;
  close: string | null;
};

export const storeInfo = {
  name: "Star Mobiles",
  shortName: "STAR MOBILES",
  /** Shown under the wordmark and in the footer. */
  descriptor: "Mobile Retail & Service",

  address: {
    line1: "Ramanadhapuram Main Road",
    line2: "Puliyakulam",
    locality: "Puliyakulam",
    city: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "641045",
    country: "India",
    countryCode: "IN",
    status: "verified" as FieldStatus,
    sourceLabel: "Verified Google Maps Destination",
    sourceUrl: "https://maps.app.goo.gl/k1wxz3Q3BsmvCGXC8",
  },

  latitude: 11.0037153,
  longitude: 76.9934777,
  mapsUrl: "https://maps.app.goo.gl/k1wxz3Q3BsmvCGXC8",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=11.0037153,76.9934777",

  phone: {
    value: "",
    placeholder: "[ADD PHONE NUMBER]",
    status: "unset" as FieldStatus,
  } satisfies ContactField,

  whatsapp: {
    value: "",
    placeholder: "[ADD WHATSAPP NUMBER]",
    status: "unset" as FieldStatus,
  } satisfies ContactField,

  email: {
    value: "",
    placeholder: "[ADD EMAIL ADDRESS]",
    status: "unset" as FieldStatus,
  } satisfies ContactField,

  hours: {
    status: "reference" as FieldStatus,
    /** Shown as a footnote wherever hours appear. */
    note: "Confirm current store timings before visiting.",
    weekly: [
      { day: "Monday", open: "09:00", close: "22:00" },
      { day: "Tuesday", open: "09:00", close: "22:00" },
      { day: "Wednesday", open: "09:00", close: "22:00" },
      { day: "Thursday", open: "09:00", close: "22:00" },
      { day: "Friday", open: "09:00", close: "22:00" },
      { day: "Saturday", open: "09:00", close: "22:00" },
      { day: "Sunday", open: "09:00", close: "22:00" },
    ] satisfies OpeningHour[],
  },

  rating: {
    value: 4.6,
    scale: 5,
    count: 5,
    sourceLabel: "Google Maps",
    sourceUrl: "https://maps.app.goo.gl/k1wxz3Q3BsmvCGXC8",
    status: "verified" as FieldStatus,
  },

  mapEmbedUrl: "https://maps.google.com/maps?q=11.0037153,76.9934777&z=17&output=embed",

  social: [] as { label: string; href: string }[],
} as const;

/**
 * Single-line postal address for map queries and structured data.
 *
 * De-duplicated on purpose: `line2` already ends in the locality, so a plain
 * join produces "Puliyakulam, Puliyakulam" and Google Maps drops the pin.
 * De-dupe is per-segment, not per-word, so it also survives config edits where
 * a line is shortened or a new component is added.
 */
function joinAddress(parts: readonly string[]) {
  const seen = new Set<string>();
  return parts
    .flatMap((part) => part.split(/,\s*/))
    .map((part) => part.trim())
    .filter((part) => {
      if (!part) return false;
      const key = part.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(", ");
}

export const fullAddress = joinAddress([
  storeInfo.address.line1,
  storeInfo.address.line2,
  storeInfo.address.locality,
  storeInfo.address.city,
  storeInfo.address.region,
  storeInfo.address.postalCode,
  storeInfo.address.country,
]);

/** Human-friendly address split for display. */
export const addressLines = [
  storeInfo.address.line1,
  storeInfo.address.line2,
  `${storeInfo.address.locality}, ${storeInfo.address.city} — ${storeInfo.address.postalCode}`,
] as const;

export type StoreInfo = typeof storeInfo;
