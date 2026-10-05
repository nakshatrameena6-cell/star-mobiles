import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { AccessoryArt, type AccessoryVariant } from "@/components/art/AccessoryArt";
import { Button } from "@/components/ui/Cta";
import { DataNote, SectionLabel } from "@/components/ui/Section";
import { ContactSection } from "@/components/contact/ContactSection";
import { services } from "@/lib/data/services";
import { getChannel, whatsappLink } from "@/lib/data/contact";

const TITLE = "Mobile Service & Support | Star Mobiles, Coimbatore";
const DESCRIPTION =
  "Smartphone sales, accessories, mobile service and setup support at Star Mobiles, Puliyakulam, Coimbatore. Bring the device in for a clear diagnosis and an honest estimate.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/services" },
};

const PREVIEW: Record<string, AccessoryVariant> = {
  device: "cases",
  accessory: "protection",
  service: "power",
  support: "audio",
};

export default function ServicesPage() {
  const call = getChannel("call");

  return (
    <>
      <PageHeader
        index="03"
        kicker="Services"
        title="Sales, accessories, service, support."
        lede="Four things we do properly. Anything outside this list, ask anyway — we will tell you straight whether we can help or whether you need a specialist."
      />

      <section className="bg-ink pb-20 sm:pb-28" aria-labelledby="services-list-heading">
        <div className="shell">
          <h2 id="services-list-heading" className="sr-only">
            Services offered at Star Mobiles
          </h2>

          <Reveal as="ul" className="flex flex-col">
            {services.map((service) => (
              <li
                key={service.id}
                className="grid gap-10 border-t border-hair-dark py-12 last:border-b lg:grid-cols-12 lg:gap-8 lg:py-16"
              >
                <div className="lg:col-span-1">
                  <span className="type-index text-fog">{service.index}</span>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="type-display-m text-chalk">{service.title}</h3>
                  <p className="type-label-xs mt-5 text-mist">{service.summary}</p>
                </div>

                <div className="lg:col-span-5">
                  <p className="type-body max-w-[54ch] text-mist">{service.detail}</p>
                  {service.examples?.length ? (
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {service.examples.map((example) => (
                        <li key={example} className="type-label-xs text-fog">
                          {example}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href={whatsappLink(
                        `Hello Star Mobiles, I'd like to enquire about ${service.title.toLowerCase()}.`,
                      )}
                      external={whatsappLink(
                        `Hello Star Mobiles, I'd like to enquire about ${service.title.toLowerCase()}.`,
                      ).startsWith("http")}
                      variant="outline"
                    >
                      Enquire
                    </Button>
                    <Button href={call.href} variant="outline" magnetic={false}>
                      Call
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="aspect-square w-full max-w-[16rem] overflow-hidden bg-graphite">
                    <AccessoryArt
                      variant={PREVIEW[service.art] ?? "cases"}
                      className="h-full w-full"
                    />
                  </div>
                  <p className="type-label-xs mt-4 text-fog">Placeholder artwork</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 text-ink sm:py-28" aria-labelledby="process-heading">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionLabel index="04" tone="light">
                How a repair goes
              </SectionLabel>
              <h2 id="process-heading" className="type-display-m mt-8 max-w-[14ch] text-ink">
                Diagnosis first. Estimate before work.
              </h2>
              <DataNote tone="light" className="mt-7 max-w-[40ch]">
                Turnaround times, part availability and warranty terms vary by device and
                are confirmed in store after diagnosis. We do not publish figures we cannot
                stand behind.
              </DataNote>
            </div>

            <ol className="lg:col-span-6 lg:col-start-7">
              {[
                {
                  title: "Bring it in",
                  body: "Tell us what the device is doing, or what happened to it. If it still switches on, bring the charger too.",
                },
                {
                  title: "We diagnose",
                  body: "We check the fault in front of you where we can, and explain it in plain language.",
                },
                {
                  title: "You get an estimate",
                  body: "Cost and turnaround come before any work starts. Nothing begins without your go-ahead.",
                },
                {
                  title: "Collection",
                  body: "Hand it back ready to use, with a quick walkthrough of anything that changed.",
                },
              ].map((step, i) => (
                <li key={step.title} className="border-t border-hair-light py-7 last:border-b">
                  <div className="flex gap-6">
                    <span className="type-index shrink-0 pt-1 text-ash">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="type-display-s text-ink">{step.title}</h3>
                      <p className="type-body mt-3 max-w-[52ch] text-ash">{step.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
