import type { Metadata } from "next";
import { ProductIndexList } from "@/components/products/ProductIndexList";
import { Comparison } from "@/components/products/Comparison";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Cta";
import { DataNote, SectionHead } from "@/components/ui/Section";
import { brands, products, publishedProducts } from "@/lib/data/catalog";
import { getChannel } from "@/lib/data/contact";

const TITLE = "Smartphones | Star Mobiles, Puliyakulam, Coimbatore";
const DESCRIPTION =
  "Browse smartphones from Star Mobiles in Puliyakulam, Coimbatore. Compare display, processor, RAM, storage, camera and battery side by side, then call or WhatsApp to confirm availability.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/phones" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/phones" },
};

export default function PhonesPage() {
  const whatsapp = getChannel("whatsapp");

  return (
    <>
      <PageHeader
        index="01"
        kicker="Phones"
        title="Every phone we keep, in one place."
        lede="Nothing here is ordered online. This is what we hold, sell and set up at the counter — and we will happily let you switch two of them on side by side before you decide."
      />
      <section className="bg-ink pb-20 sm:pb-28" aria-labelledby="catalogue-heading">
        <div className="shell">
          <div className="flex flex-col gap-6 border-b border-hair-dark pb-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="catalogue-heading" className="type-display-m text-chalk">
              Catalogue
            </h2>
            <p className="type-label-xs text-fog">
              {products.length} {products.length === 1 ? "entry" : "entries"} ·{" "}
              {publishedProducts.length} confirmed
            </p>
          </div>

          {brands.length > 0 ? (
            <nav aria-label="Filter by brand" className="mt-8 flex flex-wrap gap-2">
              {brands.map((brand) => (
                <span
                  key={brand.name}
                  className="type-label-xs border border-hair-dark px-4 py-2.5 text-mist"
                >
                  {brand.name}
                </span>
              ))}
            </nav>
          ) : (
            <p className="type-label-xs mt-8 text-fog">
              Brand filtering appears once a confirmed brand list is added to the
              catalogue.
            </p>
          )}

          <div className="mt-10">
            <ProductIndexList />
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Button href={whatsapp.href} external={whatsapp.external}>
              Ask what is in stock
            </Button>
            <Button href="/contact#visit" variant="outline">
              Visit the store
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-20 sm:py-28" aria-labelledby="compare-heading">
        <div className="shell">
          <SectionHead
            index="02"
            id="compare-heading"
            eyebrow="Compare"
            heading="Put two phones side by side."
            lede="Rows that differ are marked. Nothing is scored or ranked — the difference is yours to judge."
            className="lg:max-w-[52ch]"
          />
          <div className="mt-12 sm:mt-16">
            <Comparison />
          </div>
          <DataNote className="mt-10">
            Specifications shown are those published by the manufacturer. If a row reads
            “not confirmed”, ask us and we will read the full spec sheet to you in store.
          </DataNote>
        </div>
      </section>
    </>
  );
}
