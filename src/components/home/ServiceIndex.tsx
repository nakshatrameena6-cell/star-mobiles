"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AccessoryArt, type AccessoryVariant } from "@/components/art/AccessoryArt";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink, Button } from "@/components/ui/Cta";
import { SectionLabel } from "@/components/ui/Section";
import { services, type Service } from "@/lib/data/services";
import { getChannel } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

const PREVIEW_ART: Record<Service["art"], AccessoryVariant> = {
  device: "cases",
  accessory: "protection",
  service: "power",
  support: "audio",
};

/**
 * Service index — a typographic list, not a card grid.
 *
 * Rows expand on tap (so it works without hover) and the preview panel tracks
 * the active row on pointer devices. Only services the store has confirmed are
 * listed; the file they come from makes adding or removing one a single edit.
 */
export function ServiceIndex() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<string | null>(services[0]?.id ?? null);
  const call = getChannel("call");

  return (
    <section className="relative bg-ink py-20 sm:py-28 lg:py-32" aria-labelledby="services-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLabel index="04">Services</SectionLabel>
              <h2
                id="services-heading"
                className="type-display-l mt-8 max-w-[12ch] text-chalk"
              >
                What we actually do.
              </h2>
              <p className="type-body mt-7 max-w-[38ch] text-mist">
                Four things, done properly. If it is not on this list, ask anyway —
                we will tell you straight whether we can help.
              </p>

              {/* Preview panel */}
              <div className="mt-10 hidden aspect-square w-full max-w-[22rem] overflow-hidden bg-graphite lg:block">
                <div
                  key={services[active]?.id}
                  className="h-full w-full [&_svg]:h-full [&_svg]:w-full"
                >
                  <PreviewArt service={services[active]} />
                </div>
              </div>

              <div className="mt-10 hidden lg:block">
                <ArrowLink href="/services">All services</ArrowLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul>
              {services.map((service, i) => {
                const isOpen = open === service.id;
                return (
                  <li key={service.id} className="border-t border-hair-dark last:border-b">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`service-panel-${service.id}`}
                        onClick={() => {
                          setActive(i);
                          setOpen(isOpen ? null : service.id);
                        }}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        data-cursor=""
                        data-cursor-label={isOpen ? "Close" : "Open"}
                        className="group flex w-full items-start justify-between gap-6 py-7 text-left sm:py-9"
                      >
                        <span className="flex items-baseline gap-5 sm:gap-8">
                          <span
                            className={cn(
                              "type-index shrink-0 transition-colors duration-500",
                              i === active ? "text-signal" : "text-fog",
                            )}
                          >
                            {service.index}
                          </span>
                          <span>
                            <span className="type-display-m block text-chalk">
                              {service.title}
                            </span>
                            <span className="type-label-xs mt-4 block text-mist">
                              {service.summary}
                            </span>
                          </span>
                        </span>
                        <span className="mt-2 shrink-0 text-mist">
                          {isOpen ? (
                            <Minus className="size-5" strokeWidth={1.5} aria-hidden />
                          ) : (
                            <Plus className="size-5" strokeWidth={1.5} aria-hidden />
                          )}
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`service-panel-${service.id}`}
                      hidden={!isOpen}
                      className="pb-9 pl-0 sm:pl-[4.5rem]"
                    >
                      <p className="type-body max-w-[52ch] text-mist">{service.detail}</p>
                      {service.examples?.length ? (
                        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                          {service.examples.map((example) => (
                            <li key={example} className="type-label-xs text-fog">
                              {example}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="mt-7">
                        <ArrowLink href={`/contact?service=${service.id}`} tone="dark">
                          Enquire about {service.title.toLowerCase()}
                        </ArrowLink>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Reveal className="mt-10 lg:hidden">
              <Button href="/services" variant="outline" className="w-full">
                All services
              </Button>
            </Reveal>

            <p className="type-label-xs mt-8 text-fog">
              Need something not listed here?{" "}
              <a
                href={call.href}
                className="text-mist underline decoration-mist/30 underline-offset-4 transition-colors duration-300 hover:text-chalk hover:decoration-signal"
              >
                Call {call.configured ? call.display : "the store"}
              </a>{" "}
              and ask.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewArt({ service }: { service: Service | undefined }) {
  if (!service) return null;
  return (
    <AccessoryArt
      variant={PREVIEW_ART[service.art]}
      className="h-full w-full transition-transform duration-700 ease-expo"
    />
  );
}
