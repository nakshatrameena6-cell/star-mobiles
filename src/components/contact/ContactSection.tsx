import { ArrowUpRight, MessageCircle, Navigation, Phone } from "lucide-react";
import { OpenHours } from "@/components/store/OpenHours";
import { RevealText } from "@/components/animations/RevealText";
import { SectionLabel } from "@/components/ui/Section";
import { contactChannels } from "@/lib/data/contact";
import { addressLines, storeInfo } from "@/lib/data/store";

const ICONS = {
  call: Phone,
  whatsapp: MessageCircle,
  directions: Navigation,
  visit: null,
} as const;

/**
 * Contact — the single conversion surface. The phone number is the largest piece
 * of type on the page after the hero, because on a phone that is the action.
 *
 * Unconfigured channels still render, showing the placeholder token rather than
 * an invented number, and route to the contact page so no link is dead.
 */
export function ContactSection() {
  const call = contactChannels.find((c) => c.id === "call")!;
  const whatsapp = contactChannels.find((c) => c.id === "whatsapp")!;
  const directions = contactChannels.find((c) => c.id === "directions")!;

  const isConfigured = call.configured && whatsapp.configured;

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 bg-ink py-20 sm:py-28 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="shell">
        <SectionLabel index="09">Contact</SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="contact-heading" className="sr-only">
              Contact Star Mobiles
            </h2>
            <RevealText as="p" lines={["TALK TO", "SOMEONE WHO", "KNOWS."]} className="type-display-l text-chalk" />

            <div className="mt-10 flex flex-col gap-6">
              <div>
                <p className="type-label-xs text-fog">Phone</p>
                <a
                  href={call.href}
                  className="mt-3 block font-display text-[clamp(1.75rem,6.5vw,3.25rem)] leading-none font-semibold tracking-[-0.035em] text-chalk transition-colors duration-300 hover:text-signal-lift"
                >
                  {call.display}
                </a>
              </div>

              <div>
                <p className="type-label-xs text-fog">WhatsApp</p>
                <a
                  href={whatsapp.href}
                  {...(whatsapp.external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="type-display-s mt-3 block text-signal-lift"
                >
                  {whatsapp.display}
                </a>
              </div>
            </div>

            {!isConfigured ? (
              <p className="type-label-xs mt-8 max-w-[46ch] leading-[1.9] text-fog">
                Phone and WhatsApp numbers are not published yet. Add them in{" "}
                <code className="text-mist">src/lib/data/store.ts</code> — every call to
                action across the site picks them up automatically.
              </p>
            ) : null}
          </div>

          {/* Channels */}
          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="flex flex-col">
              {[
                { channel: call, label: "Call the store" },
                { channel: whatsapp, label: "Message on WhatsApp" },
                { channel: directions, label: "Open in Maps" },
              ].map(({ channel, label }) => {
                const Icon = ICONS[channel.id as keyof typeof ICONS];
                return (
                  <li key={channel.id} className="border-t border-hair-dark last:border-b">
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      data-cursor=""
                      data-cursor-label={channel.id === "directions" ? "Open" : "Go"}
                      className="group flex items-center justify-between gap-6 py-7"
                    >
                      <span className="flex items-center gap-5">
                        {Icon ? (
                          <Icon className="size-5 shrink-0 text-mist" strokeWidth={1.5} aria-hidden />
                        ) : null}
                        <span>
                          <span className="type-display-s block text-chalk">{label}</span>
                          <span className="type-label-xs mt-3 block text-fog">
                            {channel.configured ? channel.display : "Number to be added"}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-5 shrink-0 text-mist transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 border-t border-hair-dark pt-6">
              <p className="type-label-xs text-fog">Store</p>
              <address className="mt-3 not-italic">
                <p className="type-body text-mist">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </address>
              <p className="type-body mt-5 text-mist">
                Open today <OpenHours />
              </p>
              <p className="type-label-xs mt-4 leading-[1.9] text-fog/80">
                {storeInfo.hours.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
