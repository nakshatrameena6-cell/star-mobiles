export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Only digits — safe for `tel:` and `wa.me` deep links. */
export function toDialable(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function isFilled(value: string) {
  return toDialable(value).length >= 6;
}

/**
 * Indian numbering format: ₹1,29,999
 * Returns `null` for unset prices so the UI can fall back to
 * "Price on request" instead of inventing a number.
 */
export function formatINR(amount: number | null | undefined) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** `09:00` → `9:00 AM` */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}:${m} ${suffix}`;
}

/** Current 24h time as minutes since midnight. */
export function minutesNow() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function parseHHMM(value: string | null) {
  if (!value) return null;
  const [h, m] = value.split(":");
  return Number(h) * 60 + Number(m);
}

export type OpenState = "open" | "closed" | "unknown";

export function getOpenState(
  weekly: readonly { day: string; open: string | null; close: string | null }[],
): OpenState {
  const todayIndex = (new Date().getDay() + 6) % 7;
  const today = weekly[todayIndex];
  if (!today || !today.open || !today.close) return "unknown";

  const start = parseHHMM(today.open);
  const end = parseHHMM(today.close);
  if (start === null || end === null) return "unknown";

  // Shops past midnight: treat the window as spilling into the next day.
  const now = minutesNow();
  if (end <= start) return now >= start || now < end ? "open" : "closed";
  return now >= start && now < end ? "open" : "closed";
}

/** Zero-pad index for editorial numbering: 1 → "01" */
export function padIndex(n: number, width = 2) {
  return String(n).padStart(width, "0");
}

/**
 * Google Maps *search* deep link — not a pin. Used until the exact business
 * coordinates are confirmed, so we never send someone to the wrong place.
 */
export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
