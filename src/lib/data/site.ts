/**
 * Site-level configuration.
 *
 * `NEXT_PUBLIC_SITE_URL` is used for canonical URLs, OpenGraph and the sitemap.
 * The fallback is an IANA-reserved `.example` domain so nothing invalid ever
 * ships. Set the real domain in `.env.local` before launch.
 */

export const siteConfig = {
  name: "Star Mobiles",
  legalName: "Star Mobiles",
  /** Replace with the real domain, e.g. https://starmobiles.example */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://starmobiles.example").replace(
    /\/$/,
    "",
  ),
  locale: "en_IN",
  founded: null,
  /**
   * Positioning line used across metadata and hero eyebrows.
   * Kept factual: a physical mobile retail and service store.
   */
  positioning: "Mobile retail and service, Puliyakulam, Coimbatore",
} as const;

export type SiteConfig = typeof siteConfig;
