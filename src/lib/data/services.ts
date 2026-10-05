/* ═══════════════════════════════════════════════════════════════
   SERVICES & ACCESSORIES
   ═══════════════════════════════════════════════════════════════

   `status` values:
     "verified"  — confirmed by the store. Rendered as a plain statement.
     "framework" — a suggested grouping only. Rendered under a visible
                   note so no visitor mistakes it for a claim.

   Delete or reword any framework row that the store does not offer.
*/

export type ServiceStatus = "verified" | "framework";

export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  status: ServiceStatus;
  /** Concrete examples. Only fill in for verified services. */
  examples?: string[];
  art: "device" | "accessory" | "service" | "support";
};

export const services: Service[] = [
  {
    id: "mobile-sales",
    index: "01",
    title: "Smartphones",
    summary: "New handsets, demonstrated in store.",
    detail:
      "Browse, switch on and compare devices on the floor before you decide. Bring your SIM card or an ID — we will help you set the handset up the way you actually use it.",
    status: "verified",
    art: "device",
  },
  {
    id: "accessories",
    index: "02",
    title: "Accessories",
    summary: "Cases, charging, audio and protection.",
    detail:
      "The small things that decide how a phone feels to live with day to day. Ask us to fit protection and accessories while you wait.",
    status: "verified",
    art: "accessory",
  },
  {
    id: "mobile-service",
    index: "03",
    title: "Mobile service",
    summary: "Diagnosis and repair for everyday faults.",
    detail:
      "Bring the device in and we will assess the fault, explain the options and give you a clear estimate before any work begins.",
    status: "verified",
    art: "service",
  },
  {
    id: "support",
    index: "04",
    title: "Setup & support",
    summary: "Transfers, activation and honest guidance.",
    detail:
      "Data transfer, account setup and the questions you would rather ask a person than a search bar. No pressure to buy — ask us anything.",
    status: "verified",
    art: "support",
  },
];

export type AccessoryCategory = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  status: ServiceStatus;
};

export const accessoryCategories: AccessoryCategory[] = [
  {
    id: "cases",
    index: "01",
    title: "Cases",
    blurb: "Everyday grip and drop protection.",
    status: "framework",
  },
  {
    id: "protection",
    index: "02",
    title: "Protection",
    blurb: "Tempered glass and screen films.",
    status: "framework",
  },
  {
    id: "chargers",
    index: "03",
    title: "Chargers",
    blurb: "Wall adapters and charging bricks.",
    status: "framework",
  },
  {
    id: "cables",
    index: "04",
    title: "Cables",
    blurb: "Data and charging leads.",
    status: "framework",
  },
  {
    id: "audio",
    index: "05",
    title: "Audio",
    blurb: "Earphones, headsets and speakers.",
    status: "framework",
  },
  {
    id: "power",
    index: "06",
    title: "Power",
    blurb: "Power banks and backup.",
    status: "framework",
  },
];

export const FRAMEWORK_NOTE =
  "Categories are a starting framework. Ask in store for what is on the shelf today.";

export function getService(id: string) {
  return services.find((s) => s.id === id);
}
