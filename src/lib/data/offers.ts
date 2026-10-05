/* ═══════════════════════════════════════════════════════════════
   OFFERS
   ═══════════════════════════════════════════════════════════════

   There are no confirmed promotions right now, so there are no
   fabricated discounts. The site renders an enquiry-first offer band.

   To publish a real offer, add an entry below:

   export const offers: Offer[] = [
     {
       id: "bundle-01",
       label: "Limited offer",
       title: "Galaxy Buds with select handsets",
       productId: "galaxy-a56",      // must exist in catalog.ts
       price: 24999,                 // real, verified price — or omit
       endsOn: "2026-11-30",         // optional
       terms: "While stocks last.",
       status: "verified",
     },
   ]
*/

export type OfferStatus = "verified" | "framework";

export type Offer = {
  id: string;
  /** Short kicker, e.g. "Limited offer". */
  label: string;
  title: string;
  /** Reference into `catalog.ts`. */
  productId?: string;
  /** Real price in INR. Omit when not confirmed — never estimate. */
  price?: number | null;
  endsOn?: string;
  terms?: string;
  status: OfferStatus;
};

export const offers: Offer[] = [];

export const hasVerifiedOffers = offers.some((o) => o.status === "verified");
