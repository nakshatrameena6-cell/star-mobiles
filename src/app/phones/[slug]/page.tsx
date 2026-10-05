import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { RevealImage } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Cta";
import { DataNote } from "@/components/ui/Section";
import { ContactSection } from "@/components/contact/ContactSection";
import { getProductBySlug, getSpecs, products } from "@/lib/data/catalog";
import { whatsappLink } from "@/lib/data/contact";
import { formatINR } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.pendingData) {
    return {
      title: "Device unavailable",
      description: "This device is not currently published by Star Mobiles.",
      robots: { index: false, follow: true },
    };
  }

  const title = `${product.brand} ${product.model} | Star Mobiles Coimbatore`;
  const description =
    product.tagline ??
    `${product.brand} ${product.model} at Star Mobiles, Puliyakulam, Coimbatore. Ask for availability and specifications.`;

  return {
    title,
    description,
    alternates: { canonical: `/phones/${product.slug}` },
    openGraph: { title, description, url: `/phones/${product.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const specs = getSpecs(product);
  const price = formatINR(product.price);
  const enquiry = whatsappLink(
    `Hello Star Mobiles, I'd like to know about the ${product.brand} ${product.model} — is it in stock, and what is the price?`,
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Phones", item: "/phones" },
        {
          "@type": "ListItem",
          position: 3,
          name: `${product.brand} ${product.model}`,
          item: `/phones/${product.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${product.brand} ${product.model}`,
      ...(product.tagline ? { description: product.tagline } : {}),
      brand: { "@type": "Brand", name: product.brand },
      // No price or availability is asserted unless one was actually supplied.
      ...(typeof product.price === "number"
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: "https://schema.org/InStock",
              url: `/phones/${product.slug}`,
            },
          }
        : {}),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-void pt-24 sm:pt-32">
        <div className="shell">
          <Link
            href="/phones"
            className="type-label-xs inline-flex items-center gap-3 text-mist transition-colors duration-300 hover:text-chalk"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} aria-hidden />
            All phones
          </Link>
        </div>
      </div>

      {/* Product hero */}
      <section className="bg-void pb-16 sm:pb-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="type-label-xs text-fog">{product.brand}</p>
              <h1 className="type-display-l mt-5 text-chalk">{product.model}</h1>
              {product.tagline ? (
                <p className="type-body-lg mt-7 max-w-[42ch] text-mist">{product.tagline}</p>
              ) : null}

              <div className="mt-9 border-t border-hair-dark pt-6">
                <p className="type-label-xs text-fog">Price</p>
                <p className="type-display-m mt-3 text-chalk">
                  {price ?? "Price on request"}
                </p>
                <p className="type-label-xs mt-4 max-w-[40ch] leading-[1.9] text-fog">
                  {product.pendingData
                    ? "Pricing for this device is not published online yet."
                    : "Confirm the current price with us — it can move with stock and supplier pricing."}
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={enquiry} external={enquiry.startsWith("http")}>
                  Enquire about this phone
                </Button>
                <Button href="/contact#visit" variant="outline">
                  Check availability in store
                </Button>
              </div>

              <p className="type-label-xs mt-6 max-w-[44ch] leading-[1.9] text-fog">
                We do not show live stock counts online. Call or message and we will tell
                you exactly what is on the shelf.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <RevealImage className="overflow-hidden bg-graphite">
                <div className="aspect-[4/5] w-full">
                  <ProductImage
                    product={product}
                    variant="back"
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 44vw, 90vw"
                    priority
                  />
                </div>
              </RevealImage>
              <p className="type-label-xs mt-4 text-fog">
                {product.image
                  ? "Product photography"
                  : "Placeholder artwork — replace with Star Mobiles product photography"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-graphite py-20 sm:py-28" aria-labelledby="specs-heading">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <h2 id="specs-heading" className="type-display-m text-chalk">
                Quick specs
              </h2>
              <p className="type-body mt-6 max-w-[34ch] text-mist">
                Published figures only. Anything unconfirmed is marked rather than
                estimated.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="grid gap-px bg-hair-dark sm:grid-cols-2">
                {specs.map((row) => (
                  <div key={row.label} className="bg-graphite px-5 py-6">
                    <dt className="type-label-xs text-fog">{row.label}</dt>
                    <dd className="type-display-s mt-3 text-chalk">
                      {row.value ?? <span className="text-fog/70">Not confirmed</span>}
                    </dd>
                  </div>
                ))}
              </dl>

              {product.pendingData ? (
                <DataNote className="mt-8">
                  This catalogue entry is a placeholder. Brand, model, specifications and
                  pricing become real when they are added to{" "}
                  <code className="text-mist">src/lib/data/catalog.ts</code>. Until then we
                  will give you the full specification over WhatsApp or at the counter.
                </DataNote>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
