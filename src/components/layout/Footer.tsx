import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Star } from "@/components/animations/Marquee";
import { contactChannels } from "@/lib/data/contact";
import { footerColumns } from "@/lib/data/navigation";
import { addressLines, storeInfo } from "@/lib/data/store";

/**
 * Minimal footer. Wordmark, two link columns, the address as a wayfinding
 * statement, and the three conversion channels. No invented social accounts,
 * no newsletter gate, no badges.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const call = contactChannels.find((c) => c.id === "call")!;
  const whatsapp = contactChannels.find((c) => c.id === "whatsapp")!;
  const directions = contactChannels.find((c) => c.id === "directions")!;

  return (
    <footer className="relative border-t border-hair-dark bg-ink pt-16 pb-28 sm:pt-24 sm:pb-24">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Wordmark */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="type-display-l leading-none text-chalk">STAR</span>
              <Star className="size-4 text-signal" />
            </Link>
            <p className="type-label-xs mt-5 text-fog">{storeInfo.descriptor}</p>
            <p className="type-body mt-6 max-w-[34ch] text-mist">
              A phone shop on Ramanadhapuram Main Road, Puliyakulam. Walk in, switch
              it on, decide properly.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="type-label-xs text-fog">{column.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="type-body text-mist transition-colors duration-300 hover:text-chalk"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Address */}
          <div className="lg:col-span-3">
            <h2 className="type-label-xs text-fog">Visit</h2>
            <address className="mt-5 not-italic">
              <p className="type-body text-mist">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
          </div>
        </div>

        {/* Conversion row */}
        <div className="mt-16 grid gap-px border-t border-hair-dark bg-hair-dark sm:grid-cols-3">
          <FooterChannel channel={call} label="Call" />
          <FooterChannel channel={whatsapp} label="WhatsApp" signal />
          <FooterChannel channel={directions} label="Get directions" />
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-3 border-t border-hair-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label-xs text-fog">
            © {year} {storeInfo.name}
          </p>
          <p className="type-label-xs text-fog">
            {storeInfo.address.locality} · {storeInfo.address.city} ·{" "}
            {storeInfo.address.region}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterChannel({
  channel,
  label,
  signal,
}: {
  channel: (typeof contactChannels)[number];
  label: string;
  signal?: boolean;
}) {
  return (
    <a
      href={channel.href}
      {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex items-center justify-between gap-4 bg-ink px-5 py-5 transition-colors duration-300 hover:bg-graphite"
    >
      <span>
        <span className="type-label-xs block text-fog">{label}</span>
        <span
          className={
            signal
              ? "type-display-s mt-2 block text-signal-lift"
              : "type-display-s mt-2 block text-chalk"
          }
        >
          {channel.configured ? channel.display : "Add number"}
        </span>
      </span>
      <ArrowUpRight
        className="size-5 shrink-0 text-mist transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
        aria-hidden
      />
    </a>
  );
}
