import { fullAddress, storeInfo } from "./store";
import { isFilled, mapsSearchUrl, toDialable } from "@/lib/utils";

/**
 * Contact channels are derived from `storeInfo` — never hand-written per page.
 *
 * When a channel has no real number configured we still render the CTA, but it
 * routes to the contact page where the missing value appears as an explicit
 * placeholder token. No link is ever dead and no number is ever invented.
 *
 * The literal object below (rather than a builder function) is deliberate: it
 * lets TypeScript infer a discriminated union, so `getChannel("call")` is typed
 * as the call channel instead of the whole set.
 */

const callDisplay = isFilled(storeInfo.phone.value)
  ? storeInfo.phone.value
  : storeInfo.phone.placeholder;

const whatsappDisplay = isFilled(storeInfo.whatsapp.value)
  ? storeInfo.whatsapp.value
  : storeInfo.whatsapp.placeholder;

const DEFAULT_MESSAGE =
  "Hello Star Mobiles, I'd like to enquire about a smartphone.";

export const contactChannels = [
  {
    id: "call",
    label: "Call",
    display: callDisplay,
    href: isFilled(storeInfo.phone.value)
      ? `tel:+${toDialable(storeInfo.phone.value)}`
      : "/contact#call",
    configured: isFilled(storeInfo.phone.value),
    external: false,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    display: whatsappDisplay,
    href: isFilled(storeInfo.whatsapp.value)
      ? `https://wa.me/${toDialable(storeInfo.whatsapp.value)}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`
      : "/contact#whatsapp",
    configured: isFilled(storeInfo.whatsapp.value),
    external: true,
  },
  {
    id: "directions",
    label: "Directions",
    display: storeInfo.address.locality,
    href: storeInfo.directionsUrl,
    configured: true,
    external: true,
  },
  {
    id: "visit",
    label: "Visit",
    display: storeInfo.address.line1,
    href: "/contact#visit",
    configured: true,
    external: false,
  },
] as const;

export type ContactChannel = (typeof contactChannels)[number];
export type ChannelId = ContactChannel["id"];

export function getChannel<K extends ChannelId>(id: K): Extract<ContactChannel, { id: K }> {
  const found = contactChannels.find((channel) => channel.id === id);
  if (!found) throw new Error(`Unknown contact channel: ${id}`);
  return found as Extract<ContactChannel, { id: K }>;
}

/**
 * WhatsApp deep link with an optional pre-written message. Falls back to the
 * contact page until a real number is configured — never invents one.
 */
export function whatsappLink(message?: string) {
  if (!isFilled(storeInfo.whatsapp.value)) return getChannel("whatsapp").href;
  const base = `https://wa.me/${toDialable(storeInfo.whatsapp.value)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappHref = getChannel("whatsapp").href;
export const callHref = getChannel("call").href;
export const directionsHref = getChannel("directions").href;
