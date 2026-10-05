import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/Section";
import { storeInfo } from "@/lib/data/store";

/**
 * Trust, built from things a visitor can verify.
 *
 * No badge wall, no invented awards, no testimonials. The one rating we show
 * belongs to a public directory and is attributed on the spot — republishing it
 * as our own would be a lie, so it is labelled, linked, and excluded from the
 * structured data in `layout.tsx`.
 */
const PRINCIPLES = [
  {
    title: "Prices before promises",
    body: "Ask for the price and you get the price. If a figure has moved since we last looked it, we will say so.",
  },
  {
    title: "Specifications, read out",
    body: "Every spec we publish is one the manufacturer states. We will read the fine print to you rather than skim it.",
  },
  {
    title: "A shop you can walk into",
    body: "Fixed address, fixed hours, real counter. Nothing about this business happens only online.",
  },
  {
    title: "No pressure to buy today",
    body: "Compare, come back, take your time. A phone you are unsure about is a phone you will regret.",
  },
];

export function TrustSection() {
  return (
    <section
      className="relative bg-void py-20 sm:py-24 lg:py-28"
      aria-labelledby="trust-heading"
    >
      <div className="shell">
        <SectionLabel index="08">Trust</SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Rating — attributed */}
          <div className="lg:col-span-4">
            <h2 id="trust-heading" className="sr-only">
              How customers rate Star Mobiles
            </h2>
            <p className="type-figure text-[clamp(3.5rem,11vw,7rem)] leading-none tracking-[-0.05em] text-chalk">
              {storeInfo.rating.value}
              <span className="text-fog">/{storeInfo.rating.scale}</span>
            </p>
            <p className="type-label-xs mt-5 text-mist">Customer rating</p>
            <p className="type-body mt-4 max-w-[34ch] text-fog">
              {storeInfo.rating.count} ratings published on{" "}
              <a
                href={storeInfo.rating.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-mist underline decoration-mist/30 underline-offset-4 transition-colors duration-300 hover:text-chalk hover:decoration-signal"
              >
                {storeInfo.rating.sourceLabel}
              </a>
              . This score belongs to that directory, not to us — we do not collect or
              publish our own reviews here.
            </p>
          </div>

          {/* Principles */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal as="ul" stagger={0.08} className="flex flex-col">
              {PRINCIPLES.map((principle, i) => (
                <li
                  key={principle.title}
                  data-rise
                  className="border-t border-hair-dark py-7 last:border-b"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                    <span className="type-index shrink-0 pt-1 text-fog">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="type-display-s text-chalk">{principle.title}</h3>
                      <p className="type-body mt-3 max-w-[52ch] text-mist">{principle.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
