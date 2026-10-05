export type NavItem = {
  label: string;
  href: string;
  /** Short index used in the mega-panel. */
  index: string;
};

export const navigation: NavItem[] = [
  { label: "Phones", href: "/phones", index: "01" },
  { label: "Accessories", href: "/accessories", index: "02" },
  { label: "Services", href: "/services", index: "03" },
  { label: "About", href: "/about", index: "04" },
  { label: "Contact", href: "/contact", index: "05" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Mobile",
    links: [
      { label: "Phones", href: "/phones", index: "01" },
      { label: "Accessories", href: "/accessories", index: "02" },
    ],
  },
  {
    title: "Store",
    links: [
      { label: "Services", href: "/services", index: "03" },
      { label: "About", href: "/about", index: "04" },
      { label: "Contact", href: "/contact", index: "05" },
    ],
  },
];

export const marqueeWords = [
  "Smartphones",
  "Accessories",
  "Mobile service",
  "Setup & support",
  "Puliyakulam",
  "Coimbatore",
];
