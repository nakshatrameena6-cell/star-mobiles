import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

import { SmoothScroll, ScrollReset } from "@/components/animations/SmoothScroll";
import { ProductCursor } from "@/components/animations/ProductCursor";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/data/site";
import { storeInfo } from "@/lib/data/store";

/* ── Typography ─────────────────────────────────────────────────────────────
   Inter Tight carries the display voice: tight apertures, excellent numerals,
   and a display weight that holds up at 176px. Geist Mono handles every
   technical label, index numeral and specification on the site.
   Two families, four weights total — hierarchy comes from scale, not weight. */

const display = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const TITLE = "Star Mobiles | Smartphones, Accessories & Mobile Service in Coimbatore";

const DESCRIPTION =
  "Star Mobiles is a mobile phone shop on Ramanadhapuram Main Road, Puliyakulam, Coimbatore. Handsets, accessories and mobile service — call, WhatsApp or walk in.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  keywords: [
    "mobile shop Puliyakulam",
    "mobile phone shop Coimbatore",
    "smartphones Puliyakulam",
    "mobile accessories Coimbatore",
    "phone service Puliyakulam",
    "Star Mobiles Coimbatore",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  /**
   * Local business structured data. Fields with no confirmed value are omitted
   * rather than filled with a placeholder — an empty schema is honest, a fake
   * one is not. The third-party directory rating is intentionally excluded from
   * `aggregateRating`, which is reserved for first-party reviews.
   */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    name: storeInfo.name,
    description: DESCRIPTION,
    url: siteConfig.url,
    ...(storeInfo.phone.value ? { telephone: storeInfo.phone.value } : {}),
    ...(storeInfo.email.value ? { email: storeInfo.email.value } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${storeInfo.address.line1}, ${storeInfo.address.line2}`,
      addressLocality: storeInfo.address.city,
      addressRegion: storeInfo.address.region,
      postalCode: storeInfo.address.postalCode,
      addressCountry: storeInfo.address.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Coimbatore" },
      { "@type": "Place", name: "Puliyakulam" },
    ],
    openingHoursSpecification: storeInfo.hours.weekly
      .filter((day) => day.open && day.close)
      .map((day) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${day.day}`,
        opens: day.open,
        closes: day.close,
      })),
  };

  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Gates `.motion-hidden` so motion never depends on a stylesheet load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex min-h-[100svh] flex-col bg-void">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-chalk focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <ScrollReset />
        <ProductCursor />
        <Navbar />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
