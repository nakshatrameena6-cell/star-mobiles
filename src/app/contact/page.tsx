import type { Metadata } from "next";
import { Mail, MessageCircle, Navigation, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MapPreview } from "@/components/store/MapPreview";
import { OpenHours, OpenStateBadge } from "@/components/store/OpenHours";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Cta";
import { SectionLabel } from "@/components/ui/Section";
import { contactChannels } from "@/lib/data/contact";
import { storeInfo } from "@/lib/data/store";
import { formatTime } from "@/lib/utils";
import type { ReactNode } from "react";

const TITLE = "Contact Star Mobiles | Mobile Shop in Puliyakulam, Coimbatore";
const DESCRIPTION =
  "Call, WhatsApp or visit Star Mobiles at Ramanadhapuram Main Road, Puliyakulam, Coimbatore 641045. Opening hours, directions and enquiries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact" },
};

export default function ContactPage() {
  const call = contactChannels.find((c) => c.id === "call")!;
  const whatsapp = contactChannels.find((c) => c.id === "whatsapp")!;
  const directions = contactChannels.find((c) => c.id === "directions")!;
  const emailConfigured = storeInfo.email.value.length > 0;

  return (
    <>
      <PageHeader
        index="05"
        kicker="Contact"
        title="Call, message, or just walk in."
        lede="We are on Ramanadhapuram Main Road in Puliyakulam, Coimbatore. Come during store hours, or send a message and we will reply with what is actually in stock."
      >
        <OpenStateBadge className="type-label inline-flex items-center gap-2 text-mist" />
      </PageHeader>

      {/* Channels */}
      <section
        id="contact"
        className="scroll-mt-20 bg-ink pb-16 sm:pb-20"
        aria-labelledby="channels-heading"
      >
        <div className="shell">
          <h2 id="channels-heading" className="sr-only">
            Ways to reach Star Mobiles
          </h2>

          <ul className="grid gap-px bg-hair-dark md:grid-cols-3">
            <ChannelTile
              id="call"
              icon={<Phone className="size-5" strokeWidth={1.5} aria-hidden />}
              label="Call"
              value={call.display}
              href={call.href}
              configured={call.configured}
              note={call.configured ? "Fastest during store hours" : "Number to be added"}
            />
            <ChannelTile
              id="whatsapp"
              icon={<MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />}
              label="WhatsApp"
              value={whatsapp.display}
              href={whatsapp.href}
              configured={whatsapp.configured}
              note={
                whatsapp.configured ? "Send a photo of what you need" : "Number to be added"
              }
            />
            <ChannelTile
              id="directions"
              icon={<Navigation className="size-5" strokeWidth={1.5} aria-hidden />}
              label="Directions"
              value={directions.display}
              href={directions.href}
              configured
              note="Opens Google Maps"
              external
            />
          </ul>

          {!call.configured || !whatsapp.configured ? (
            <p className="type-label-xs mt-8 max-w-[54ch] leading-[1.9] text-fog">
              Phone and WhatsApp numbers are placeholders until the store publishes them.
              Add them in <code className="text-mist">src/lib/data/store.ts</code> — every
              link and button across the site updates at once.
            </p>
          ) : null}

          {emailConfigured ? (
            <p className="type-body mt-6 flex items-center gap-3 text-mist">
              <Mail className="size-4" strokeWidth={1.5} aria-hidden />
              <a href={`mailto:${storeInfo.email.value}`} className="hover:text-chalk">
                {storeInfo.email.value}
              </a>
            </p>
          ) : null}
        </div>
      </section>

      {/* Visit */}
      <section
        id="visit"
        className="scroll-mt-20 bg-paper py-20 text-ink sm:py-28"
        aria-labelledby="visit-heading"
      >
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionLabel index="06" tone="light">
                Visit
              </SectionLabel>
              <h2 id="visit-heading" className="type-display-m mt-8 max-w-[13ch] text-ink">
                Come and hold the phone before you decide.
              </h2>

              <div className="mt-10 border-t border-hair-light pt-6">
                <p className="type-label-xs text-ash">Address</p>
                <address className="mt-4 not-italic">
                  <p className="type-body-lg text-ink">
                    {storeInfo.address.line1}
                    <br />
                    {storeInfo.address.line2}
                    <br />
                    {storeInfo.address.locality}, {storeInfo.address.city} —{" "}
                    {storeInfo.address.postalCode}
                    <br />
                    <span className="text-ash">{storeInfo.address.region}</span>
                  </p>
                </address>
                <p className="type-label-xs mt-4 leading-[1.9] text-ash/70">
                  {storeInfo.address.sourceLabel}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <MapPreview tone="light" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section
        id="hours"
        className="scroll-mt-20 bg-paper-alt py-20 text-ink sm:py-24"
        aria-labelledby="hours-heading"
      >
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionLabel index="07" tone="light">
                Hours
              </SectionLabel>
              <h2 id="hours-heading" className="type-display-m mt-8 max-w-[10ch] text-ink">
                When the lights are on.
              </h2>
              <p className="type-body mt-7 max-w-[34ch] text-ash">
                Today:{" "}
                <span className="text-ink">
                  <OpenHours />
                </span>
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={directions.href} external tone="light">
                  Get directions
                </Button>
                <Button href={call.href} variant="outline" tone="light">
                  Call store
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <table className="w-full border-collapse">
                <caption className="sr-only">Star Mobiles weekly opening hours</caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="type-label-xs border-b border-hair-light pb-3 text-left font-normal text-ash/70"
                    >
                      Day
                    </th>
                    <th
                      scope="col"
                      className="type-label-xs border-b border-hair-light pb-3 text-right font-normal text-ash/70"
                    >
                      Opens
                    </th>
                    <th
                      scope="col"
                      className="type-label-xs border-b border-hair-light pb-3 text-right font-normal text-ash/70"
                    >
                      Closes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {storeInfo.hours.weekly.map((row) => (
                    <tr key={row.day}>
                      <th
                        scope="row"
                        className="type-body border-b border-hair-light/60 py-3.5 text-left font-normal text-ink"
                      >
                        {row.day}
                      </th>
                      <td className="type-figure border-b border-hair-light/60 py-3.5 text-right text-[0.8125rem] text-ash">
                        {row.open ? formatTime(row.open) : "—"}
                      </td>
                      <td className="type-figure border-b border-hair-light/60 py-3.5 text-right text-[0.8125rem] text-ash">
                        {row.close ? formatTime(row.close) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="type-label-xs mt-8 max-w-[48ch] leading-[1.9] text-ash/70">
                {storeInfo.hours.note} Public holidays can differ — call ahead if you are
                travelling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ChannelTile({
  id,
  icon,
  label,
  value,
  href,
  configured,
  note,
  external,
}: {
  id: string;
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  configured: boolean;
  note: string;
  external?: boolean;
}) {
  return (
    <li id={id} className="scroll-mt-28 bg-ink">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        data-cursor=""
        data-cursor-label={configured ? "Go" : "Info"}
        className="group block h-full p-6 transition-colors duration-400 hover:bg-graphite sm:p-8"
      >
        <div className="flex items-center gap-3 text-mist">
          {icon}
          <span className="type-label-xs">{label}</span>
        </div>
        <p
          className={
            configured
              ? "type-display-s mt-6 break-words text-chalk"
              : "type-display-s mt-6 break-words text-fog/70"
          }
        >
          {value}
        </p>
        <p className="type-label-xs mt-4 text-fog">{note}</p>
      </a>
    </li>
  );
}
