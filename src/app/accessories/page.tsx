import type { Metadata } from "next";
import { AccessoryArt, type AccessoryVariant } from "@/components/art/AccessoryArt";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Cta";
import { DataNote, SectionLabel } from "@/components/ui/Section";
import { ContactSection } from "@/components/contact/ContactSection";
import {
  accessoryCategories,
  FRAMEWORK_NOTE,
} from "@/lib/data/services";
import { getChannel } from "@/lib/data/contact";

const TITLE = "Mobile Accessories | Star Mobiles, Coimbatore";
const DESCRIPTION =
  "Phone cases, screen protection, chargers, cables, audio and power accessories at Star Mobiles, Puliyakulam, Coimbatore. Tell us your model and we will fit it while you wait.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/accessories" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/accessories" },
};

export default function AccessoriesPage() {
  const call = getChannel("call");

  return (
    <>
      <PageHeader
        index="02"
        kicker="Accessories"
        title="Accessories that earn their place."
        lede="A phone is only as good as the case around it and the charger in the bag. Bring your model and we will fit what you need while you wait."
      />

      <section className="bg-ink pb-20 sm:pb-28" aria-labelledby="categories-heading">
        <div className="shell">
          <div className="flex flex-col gap-6 border-b border-hair-dark pb-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="categories-heading" className="type-display-m text-chalk">
              Categories
            </h2>
            <p className="type-label-xs text-fog">
              {accessoryCategories.length} categories
            </p>
          </div>

          <Reveal
            as="ul"
            stagger={0.07}
            className="mt-10 grid gap-px bg-hair-dark sm:grid-cols-2 lg:grid-cols-3"
          >
            {accessoryCategories.map((category) => (
              <li
                key={category.id}
                data-rise
                className="group flex flex-col justify-between bg-ink p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="type-index text-fog">{category.index}</span>
                  <span
                    aria-hidden
                    className="block size-1.5 rotate-45 bg-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="my-10 flex aspect-[4/3] items-center justify-center overflow-hidden bg-graphite">
                  <AccessoryArt
                    variant={category.id as AccessoryVariant}
                    className="h-[80%] w-[80%] transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                  />
                </div>

                <div>
                  <h3 className="type-display-s text-chalk">{category.title}</h3>
                  <p className="type-body mt-3 max-w-[30ch] text-mist">{category.blurb}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <DataNote className="mt-10">{FRAMEWORK_NOTE}</DataNote>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Button href="/contact#visit">Visit the store</Button>
            <Button href={call.href} variant="outline">
              Ask about an accessory
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 text-ink sm:py-28" aria-labelledby="fitting-heading">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionLabel index="03" tone="light">
                Getting fitted
              </SectionLabel>
              <h2
                id="fitting-heading"
                className="type-display-m mt-8 max-w-[14ch] text-ink"
              >
                Bring the phone. We will handle the rest.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ol className="flex flex-col">
                {[
                  "Tell us the exact model — the year matters more than the name.",
                  "We will show you the options that actually fit it.",
                  "Fitting and setup happen at the counter, usually while you wait.",
                ].map((step, i) => (
                  <li key={step} className="border-t border-hair-light py-6 last:border-b">
                    <div className="flex gap-6">
                      <span className="type-index shrink-0 pt-1 text-ash">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="type-body text-ink">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="type-label-xs mt-8 max-w-[48ch] leading-[1.9] text-ash/80">
                Specific brands, compatibility lists and warranties are published only
                once confirmed, so we never quote a fit we cannot verify.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
