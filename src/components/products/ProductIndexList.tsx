import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { Reveal } from "@/components/animations/Reveal";
import { DataNote } from "@/components/ui/Section";
import { getSpecs, pendingProductCount, products, SPEC_KEYS, SPEC_LABELS } from "@/lib/data/catalog";
import { cn, formatINR } from "@/lib/utils";

/**
 * Full product index.
 *
 * One device per row across the full grid width: image on the left, identity in
 * the middle, specifications on the right. Rows are separated by hairlines rather
 * than enclosed in cards, which keeps the catalogue legible and stops the page
 * collapsing into a marketplace grid.
 */
export function ProductIndexList() {
  return (
    <div className="flex flex-col">
      <div className="hidden grid-cols-12 gap-6 border-b border-hair-dark pb-4 lg:grid">
        <span className="type-label-xs col-span-1 text-fog">No.</span>
        <span className="type-label-xs col-span-3 text-fog">Device</span>
        <span className="type-label-xs col-span-2 text-fog">Price</span>
        <span className="type-label-xs col-span-6 text-fog">Key specifications</span>
      </div>

      <ul>
        {products.map((product, i) => {
          const specs = getSpecs(product);
          const quick = specs.filter((row) => row.value !== null).slice(0, 4);

          return (
            <li key={product.id} className="border-b border-hair-dark">
              <Link
                href={`/phones/${product.slug}`}
                data-cursor=""
                data-cursor-label="Open"
                className="group grid grid-cols-12 items-center gap-x-6 gap-y-6 py-8 transition-colors duration-500 hover:bg-graphite lg:py-10"
              >
                <span className="type-index col-span-2 self-start text-fog lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Identity */}
                <div className="col-span-10 flex items-center gap-5 sm:gap-8 lg:col-span-3">
                  <div className="h-20 w-16 shrink-0 overflow-hidden bg-graphite sm:h-24 sm:w-20">
                    <ProductImage
                      product={product}
                      className="h-full w-full"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="type-label-xs text-fog">{product.brand}</p>
                    <h3 className="type-display-s mt-2 text-chalk">{product.model}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-12 lg:col-span-2">
                  <p className="type-label-xs text-fog lg:hidden">Price</p>
                  <p className="type-body mt-1 text-chalk lg:mt-0">
                    {formatINR(product.price) ?? "Price on request"}
                  </p>
                </div>

                {/* Specs */}
                <div className="col-span-10 flex items-end justify-between gap-6 lg:col-span-6">
                  <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                    {quick.length > 0 ? (
                      quick.map((row) => (
                        <div key={row.label}>
                          <dt className="type-label-xs text-fog">{row.label}</dt>
                          <dd className="type-body mt-1.5 text-chalk">{row.value}</dd>
                        </div>
                      ))
                    ) : (
                      SPEC_KEYS.slice(0, 4).map((key) => (
                        <div key={key}>
                          <dt className="type-label-xs text-fog">{SPEC_LABELS[key]}</dt>
                          <dd className="type-label-xs mt-2 text-fog/70">— pending</dd>
                        </div>
                      ))
                    )}
                  </dl>

                  <ArrowUpRight
                    className={cn(
                      "size-5 shrink-0 text-mist transition-transform duration-500 ease-expo",
                      "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    )}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {pendingProductCount > 0 ? (
        <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <DataNote>
            Catalogue entries above are placeholders awaiting confirmed product data —
            no brand, specification or price is asserted. Replace them in{" "}
            <code className="text-mist">src/lib/data/catalog.ts</code>.
          </DataNote>
        </Reveal>
      ) : null}
    </div>
  );
}
