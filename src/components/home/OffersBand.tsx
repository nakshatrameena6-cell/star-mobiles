"use client";

import { ArrowLink } from "@/components/ui/Cta";
import { SectionLabel } from "@/components/ui/Section";
import { offers, hasVerifiedOffers } from "@/lib/data/offers";
import { whatsappLink } from "@/lib/data/contact";
import { formatINR } from "@/lib/utils";

/**
 * Offers strip.
 *
 * Nothing ships here until the store actually confirms an offer. The empty
 * state is a deliberate short line of copy rather than a hidden section or an
 * invented "20% off" — a promotion nobody authorised is worse than no
 * promotion at all.
 */
export function OffersBand() {
  const offerEnquiry = whatsappLink(
    "Hello Star Mobiles, do you have any offers or exchange deals right now?",
  );

  if (!hasVerifiedOffers) {
    return (
      <section
        className="border-y border-hair-dark bg-void py-14"
        aria-labelledby="offers-heading"
      >
        <div className="shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionLabel index="Offers">Offers</SectionLabel>
              <h2
                id="offers-heading"
                className="type-display-s mt-6 max-w-[26ch] text-chalk"
              >
                No running promotions published.
              </h2>
              <p className="type-body mt-5 max-w-[46ch] text-mist">
                We do not advertise discounts we cannot honour at the counter. Ask us about
                exchange value and bundle pricing on your next visit — we will tell you
                straight.
              </p>
            </div>

            <div className="shrink-0">
              <ArrowLink
                href={offerEnquiry}
                external={offerEnquiry.startsWith("http")}
                tone="light"
              >
                Ask about current deals
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-hair-dark bg-void py-20" aria-labelledby="offers-heading">
      <div className="shell">
        <SectionLabel index="Offers">Offers</SectionLabel>
        <h2 id="offers-heading" className="type-display-m mt-8 max-w-[16ch] text-chalk">
          Running right now.
        </h2>

        <ul className="mt-14 grid gap-px bg-hair-dark md:grid-cols-3">
          {offers.map((offer) => (
            <li key={offer.id} className="bg-void p-7">
              <p className="type-label-xs text-signal">{offer.label}</p>
              <h3 className="type-display-s mt-5 text-chalk">{offer.title}</h3>
              {offer.price != null ? (
                <p className="type-display-s mt-5 text-chalk">
                  {formatINR(offer.price)}
                </p>
              ) : null}
              <p className="type-label-xs mt-6 text-fog">
                {offer.endsOn ? `Ends ${offer.endsOn}` : "While stocks last"}
              </p>
              {offer.terms ? (
                <p className="type-label-xs mt-2 text-fog">{offer.terms}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}