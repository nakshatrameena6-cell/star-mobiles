import type { MetadataRoute } from "next";
import { publishedProducts } from "@/lib/data/catalog";
import { siteConfig } from "@/lib/data/site";

const STATIC_ROUTES = [
  { path: "", priority: 1 },
  { path: "/phones", priority: 0.9 },
  { path: "/accessories", priority: 0.7 },
  { path: "/services", priority: 0.7 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  // Placeholder slots stay out of the index — there is nothing real to show yet.
  const productEntries: MetadataRoute.Sitemap = publishedProducts.map((product) => ({
    url: `${siteConfig.url}/phones/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
