"use client";

import { brands } from "@/lib/data/catalog";
import { Button } from "@/components/ui/Cta";
import { Marquee } from "@/components/animations/Marquee";
import { RevealText } from "@/components/animations/RevealText";
import { SectionLabel } from "@/components/ui/Section";
import { getChannel } from "@/lib/data/contact";

/**
 * Brand wall.
 *
 * Only brands Star Mobiles is confirmed to carry appear here. With an empty
 * configuration the section becomes the statement it was always making —
 * that we publish what we can stand behind — rather than a wall of logos we
 * cannot guarantee.
 */
export function BrandWall() {
  const whatsapp = getChannel("whatsapp");
  const call = getChannel("call");
  const hasBrands = brands.length > 0;

  const wallWords = hasBrands
    ? [...brands.map((b) => b.name), ...brands.map((b) => b.name)]
    : [];

  return (
    <section className="relative overflow-hidden bg-paper py-20 text-ink sm:py-28 lg:py-32" aria-labelledby="brands-heading">
      <div className="shell">
        <SectionLabel index="02" tone="light">
          Brands
        </SectionLabel>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="brands-heading" className="sr-only">
            Brands available at Star Mobiles
          </h2>

          <div className="lg:col-span-7">
            <RevealText
              as="p"
              lines={
                hasBrands
                  ? ["WE CARRY WHAT", "WE CAN STAND", "BEHIND."]
                  : ["WE ONLY LIST", "WHAT WE ACTUALLY", "STOCK."]
              }
              className="type-display-l text-ink"
            />
          </div>

          <div className="flex flex-col justify-end gap-7 lg:col-span-4 lg:col-start-9">
            <p className="type-body text-ash">
              {hasBrands
                ? "Stock rotates constantly, so prices and configurations change without notice. Ask us to confirm before you travel."
                : "Handset availability moves week to week. Rather than publish a lineup we cannot guarantee, ask us directly — we will tell you what is on the shelf today, and what is expected next."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button
                href={whatsapp.href}
                external={whatsapp.external}
                tone="light"
                className="shrink-0"
              >
                Ask about stock
              </Button>
              <Button href={call.href} variant="outline" tone="light" className="shrink-0">
                Call store
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee only appears once brands are confirmed */}
      {hasBrands ? (
        <div className="mt-16 border-y border-hair-light py-6 sm:mt-20 sm:py-8">
          <Marquee
            words={wallWords}
            duration={38}
            className="[&_span]:text-ink/70"
          />
        </div>
      ) : (
        <div className="mt-16 border-y border-hair-light py-6 sm:mt-20 sm:py-8">
          <p className="type-label-xs text-ash/70">
            Brand wall — awaiting confirmed supplier lineup. Populate{" "}
            <code className="text-ash">brands</code> in{" "}
            <code className="text-ash">src/lib/data/catalog.ts</code>.
          </p>
        </div>
      )}
    </section>
  );
}
