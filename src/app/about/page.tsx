import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { LensMacro } from "@/components/art/DeviceArt";
import { Button } from "@/components/ui/Cta";
import { DataNote, SectionLabel } from "@/components/ui/Section";
import { ContactSection } from "@/components/contact/ContactSection";
import { storeInfo } from "@/lib/data/store";

const TITLE = "About Star Mobiles | Mobile Shop in Puliyakulam, Coimbatore";
const DESCRIPTION =
  "Star Mobiles is a smartphone, accessories and mobile service store on Ramanadhapuram Main Road, Puliyakulam, Coimbatore. How we work, and what we will not claim.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about" },
};

const NOT_CLAIMED = [
  "No award badges we did not win.",
  "No customer counts we cannot count.",
  "No reviews written for us.",
  "No discount percentages we cannot honour today.",
  "No specifications copied from a page we have not read.",
  "No pressure to buy before you are ready.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="04"
        kicker="About"
        title="A phone shop, run like a phone shop."
        lede="Star Mobiles is a mobile retail and service business on Ramanadhapuram Main Road in Puliyakulam, Coimbatore. We sell phones, we fit accessories, and we fix the ones that need fixing."
      />

      {/* Owner's note — an intentional slot rather than invented history */}
      <section className="bg-graphite py-20 sm:py-28" aria-labelledby="note-heading">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionLabel index="05">In our own words</SectionLabel>
              <h2 id="note-heading" className="type-display-m mt-8 max-w-[12ch] text-chalk">
                This part is yours to write.
              </h2>
              <p className="type-body mt-7 max-w-[36ch] text-mist">
                How the shop started, who works the counter, how long it has been here —
                that is your story to tell, in your own voice. Sixty words is plenty.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <blockquote className="border-l border-signal pl-6 sm:pl-10">
                <p className="type-display-s max-w-[26ch] text-fog">
                  [ ADD THE OWNER&apos;S NOTE — ABOUT SIXTY WORDS, IN YOUR OWN WORDS ]
                </p>
                <footer className="type-label-xs mt-8 text-fog">
                  {storeInfo.name} · {storeInfo.address.locality},{" "}
                  {storeInfo.address.city}
                </footer>
              </blockquote>
              <DataNote className="mt-10">
                Replace the placeholder above in{" "}
                <code className="text-mist">src/app/about/page.tsx</code>. It is marked
                clearly so nobody publishes an empty quote by accident.
              </DataNote>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-ink py-20 sm:py-28" aria-labelledby="principles-heading">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionLabel index="06">How we work</SectionLabel>
              <h2 id="principles-heading" className="sr-only">
                How Star Mobiles works
              </h2>
              <div className="mt-8 hidden aspect-square w-full max-w-[20rem] overflow-hidden bg-graphite lg:block">
                <LensMacro className="h-full w-full" />
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal as="ul" stagger={0.08} className="flex flex-col">
                {[
                  {
                    title: "Look at it in your hand first",
                    body: "Screen size, weight, camera reach, battery anxiety — none of that is settled by a spec sheet. Come and hold it.",
                  },
                  {
                    title: "Tell us the budget honestly",
                    body: "A ₹15,000 phone used well beats a ₹40,000 phone you regret. We will happily talk you down.",
                  },
                  {
                    title: "Say when we are wrong",
                    body: "If something is not in stock, or we cannot repair it, we would rather say so now than later.",
                  },
                  {
                    title: "Set it up before you leave",
                    body: "Transfer, accounts, the basics. You should not walk out and discover it is not ready.",
                  },
                ].map((item, i) => (
                  <li key={item.title} data-rise className="border-t border-hair-dark py-7 last:border-b">
                    <div className="flex gap-6">
                      <span className="type-index shrink-0 pt-1 text-fog">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="type-display-s text-chalk">{item.title}</h3>
                        <p className="type-body mt-3 max-w-[52ch] text-mist">{item.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What we don't claim — a deliberate trust device */}
      <section className="bg-paper py-20 text-ink sm:py-28" aria-labelledby="not-claimed-heading">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionLabel index="07" tone="light">
                What we do not claim
              </SectionLabel>
              <h2
                id="not-claimed-heading"
                className="type-display-m mt-8 max-w-[13ch] text-ink"
              >
                The list is the point.
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="grid gap-px bg-hair-light sm:grid-cols-2">
                {NOT_CLAIMED.map((item) => (
                  <li key={item} className="bg-paper px-5 py-6">
                    <span className="type-body flex gap-4 text-ink">
                      <span aria-hidden className="mt-2 block size-1.5 shrink-0 rotate-45 bg-signal" />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="type-body mt-8 max-w-[52ch] text-ash">
                Everything this website says about Star Mobiles can be checked: the address
                is a real shopfront, the hours are the hours the lights are on, and the one
                rating shown is attributed to the public directory it came from.
              </p>
              <div className="mt-8">
                <Button href="/contact#visit" tone="light">
                  Come and see us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
