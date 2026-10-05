import { AccessoryArt, type AccessoryVariant } from "@/components/art/AccessoryArt";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink, Button } from "@/components/ui/Cta";
import { DataNote, SectionHead } from "@/components/ui/Section";
import {
  accessoryCategories,
  FRAMEWORK_NOTE,
  type AccessoryCategory,
} from "@/lib/data/services";

/**
 * Accessories — treated as product, not as an afterthought.
 *
 * An asymmetric rail: each category is a tall panel with a macro product render,
 * sized so the artwork reads as photography rather than an icon. No pill tabs,
 * no filter chips.
 */
export function AccessoriesBand() {
  return (
    <section
      className="relative bg-graphite py-20 sm:py-28 lg:py-32"
      aria-labelledby="accessories-heading"
    >
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHead
            index="05"
            id="accessories-heading"
            eyebrow="Accessories"
            heading="The small things you will use every day."
            lede="Cases, glass, chargers, cables, audio and power. Tell us your phone model and we will fit what you need while you wait."
            className="lg:max-w-[52ch]"
          />
          <Button href="/accessories" variant="outline" className="shrink-0 self-start">
            All accessories
          </Button>
        </div>

        {/* Rail — scrolls horizontally on small screens, reflows on large */}
        <Reveal className="mt-14 sm:mt-20">
          <ul className="-mx-[var(--spacing-gutter)] flex snap-x snap-mandatory gap-px overflow-x-auto px-[var(--spacing-gutter)] pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-px lg:overflow-visible lg:px-0">
            {accessoryCategories.map((category, i) => (
              <li
                key={category.id}
                className={cnPanel(i)}
              >
                <AccessoryPanel category={category} />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 border-t border-hair-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <DataNote>{FRAMEWORK_NOTE}</DataNote>
          <div className="shrink-0">
            <ArrowLink href="/accessories" tone="dark">
              Browse categories
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Alternating panel spans keep the grid asymmetric rather than a tidy 3×2. */
function cnPanel(index: number) {
  const spans = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
    "lg:col-span-1",
  ];
  return `w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto ${spans[index % spans.length]}`;
}

function AccessoryPanel({ category }: { category: AccessoryCategory }) {
  return (
    <div className="group flex h-full flex-col justify-between bg-ink p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="type-index text-fog">{category.index}</span>
        <span
          aria-hidden
          className="block size-1.5 rounded-full bg-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="my-8 flex aspect-square items-center justify-center overflow-hidden bg-graphite sm:my-10">
        <AccessoryArt
          variant={category.id as AccessoryVariant}
          className="h-[78%] w-[78%] transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
        />
      </div>

      <div>
        <h3 className="type-display-s text-chalk">{category.title}</h3>
        <p className="type-body mt-3 max-w-[30ch] text-mist">{category.blurb}</p>
      </div>
    </div>
  );
}
