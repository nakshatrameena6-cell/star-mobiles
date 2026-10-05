"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink, Button } from "@/components/ui/Cta";
import { DataNote, SectionHead } from "@/components/ui/Section";
import { getSpecs, pendingProductCount, products, SPEC_LABELS } from "@/lib/data/catalog";
import { cn, formatINR } from "@/lib/utils";

/**
 * Featured devices — an editorial showcase, not a product grid.
 *
 * The visual panel pins while the index scrolls, and the displayed device
 * follows whichever row is nearest the viewport centre. Selection is therefore
 * driven by scroll, not hover: on a phone the same gesture that reveals the next
 * device also swaps it. Hover and keyboard focus refine the choice on a
 * desktop, where hovering is free.
 */
export function FeaturedDevices() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const list = products;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );

    for (const row of rows.current) if (row) observer.observe(row);
    return () => observer.disconnect();
  }, [list.length]);

  const current = list[active] ?? list[0];
  const price = current ? formatINR(current.price) : null;

  return (
    <section
      id="featured"
      className="relative bg-graphite py-20 sm:py-28 lg:py-36"
      aria-labelledby="featured-heading"
    >
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHead
            index="01"
            eyebrow="Featured devices"
            heading="The phone decides the month. Choose it carefully."
            lede="A short list of what we keep on the floor. Specifications and pricing are confirmed in store — nothing here is a guess."
            className="lg:max-w-[54ch]"
          />
          <Button href="/phones" variant="outline" className="shrink-0 self-start">
            All phones
          </Button>
        </div>

        {/* Showcase */}
        <div className="mt-14 grid lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          {/* Pinned visual — spans both rows on mobile so it stays in view */}
          <div className="sticky top-16 col-start-1 row-start-1 row-span-2 self-start sm:top-20 lg:col-span-5 lg:col-start-1 lg:row-span-1">
            <div className="relative bg-graphite pt-4 lg:pt-0">
              <div className="relative aspect-[5/6] w-full overflow-hidden bg-ink sm:aspect-[4/5] lg:aspect-[10/11]">
                {list.map((product, i) => (
                  <div
                    key={product.id}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center p-8 transition-[opacity,transform] duration-700 ease-expo lg:p-12",
                      i === active
                        ? "opacity-100 scale-100"
                        : "pointer-events-none scale-[0.97] opacity-0",
                    )}
                  >
                    <ProductImage
                      product={product}
                      variant="back"
                      className="h-full w-full"
                      sizes="(min-width: 1024px) 30vw, 60vw"
                    />
                  </div>
                ))}

                {/* Progress rail */}
                <div className="pointer-events-none absolute top-0 left-0 flex h-full w-px flex-col justify-center gap-2 bg-hair-dark">
                  {list.map((product, i) => (
                    <span
                      key={product.id}
                      className={cn(
                        "w-px transition-[height,background-color] duration-500 ease-expo",
                        i === active ? "h-10 bg-signal" : "h-4 bg-mist/30",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Active product metadata */}
              <div className="border-t border-hair-dark pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="type-label-xs text-fog">
                    {String(active + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                  </p>
                  <p className="type-label text-signal">
                    {price ?? "Price on request"}
                  </p>
                </div>

                <p className="type-display-m mt-4 text-chalk">
                  {current?.brand} {current?.model}
                </p>

                {current?.pendingData ? (
                  <DataNote className="mt-4">
                    Product details pending confirmation. Ask in store or on WhatsApp for
                    exact specifications and pricing.
                  </DataNote>
                ) : current?.tagline ? (
                  <p className="type-body mt-4 max-w-[40ch] text-mist">{current.tagline}</p>
                ) : null}

                <div className="mt-6">
                  <ArrowLink
                    href={`/phones/${current?.slug}`}
                    tone="dark"
                    cursorLabel="Open"
                  >
                    Explore device
                  </ArrowLink>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll-driven index */}
          <ol className="relative col-start-1 row-start-2 mt-2 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-0">
            {list.map((product, i) => {
              const specs = getSpecs(product);
              const quickSpecs = specs.filter((row) => row.value !== null).slice(0, 3);

              return (
                <li
                  key={product.id}
                  data-index={i}
                  ref={(node) => {
                    rows.current[i] = node;
                  }}
                  className={cn(
                    "border-t border-hair-dark transition-colors duration-500",
                    i === active ? "bg-graphite" : "hover:bg-graphite/50",
                  )}
                >
                  <Link
                    href={`/phones/${product.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-cursor=""
                    data-cursor-label="Open"
                    className="flex flex-col gap-6 px-1 py-10 sm:py-14 lg:px-4"
                    aria-current={i === active ? "true" : undefined}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <span
                        className={cn(
                          "type-index transition-colors duration-500",
                          i === active ? "text-signal" : "text-fog",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "size-5 shrink-0 transition-all duration-500 ease-expo",
                          i === active
                            ? "translate-x-0 text-signal opacity-100"
                            : "-translate-x-1 text-fog opacity-0",
                        )}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>

                    <div>
                      <p className="type-label-xs text-fog">{product.brand}</p>
                      <h3 className="type-display-m mt-3 text-chalk">{product.model}</h3>
                      <p className="type-body mt-4 max-w-[48ch] text-mist">
                        {product.tagline ??
                          (product.pendingData
                            ? "Specification and pricing to be confirmed for this device."
                            : "Ask in store for full specifications.")}
                      </p>
                    </div>

                    {/* Quick specification strip — editorial rows, not a table */}
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                      {quickSpecs.length > 0 ? (
                        quickSpecs.map((row) => (
                          <div key={row.label} className="border-t border-hair-dark pt-3">
                            <dt className="type-label-xs text-fog">{row.label}</dt>
                            <dd className="type-body mt-2 text-chalk">{row.value}</dd>
                          </div>
                        ))
                      ) : (
                        ["display", "processor", "ram"].map((key) => (
                          <div key={key} className="border-t border-hair-dark pt-3">
                            <dt className="type-label-xs text-fog">{SPEC_LABELS[key as keyof typeof SPEC_LABELS]}</dt>
                            <dd className="type-label-xs mt-2 text-fog/70">— pending</dd>
                          </div>
                        ))
                      )}
                    </dl>

                    <p className="type-label text-mist">
                      {formatINR(product.price) ?? "Price on request"}
                    </p>
                  </Link>
                </li>
              );
            })}
            <li className="border-t border-hair-dark" aria-hidden />
          </ol>
        </div>

        {pendingProductCount > 0 ? (
          <Reveal className="mt-12 flex flex-col gap-4 border-t border-hair-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
            <DataNote>
              {pendingProductCount} catalogue {pendingProductCount === 1 ? "slot is" : "slots are"}{" "}
              awaiting confirmed product data. Add real devices in{" "}
              <code className="text-mist">src/lib/data/catalog.ts</code> and this section
              fills in automatically.
            </DataNote>
            <Button href="/contact#whatsapp" variant="outline" className="shrink-0 self-start">
              Ask what is in stock
            </Button>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
