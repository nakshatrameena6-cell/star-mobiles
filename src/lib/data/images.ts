export type SiteImage = {
  src: string;
  alt: string;
  sourceUrl: string;
};

export const pageImages = {
  heroPhone: {
    src: "/images/site/pages/hero-phone.jpg",
    alt: "Hand holding a smartphone with the home screen visible.",
    sourceUrl: "https://unsplash.com/photos/hand-holding-smartphone-with-app-icons-A6JxK37IlPo",
  },
  retailCounter: {
    src: "/images/site/pages/retail-counter.jpg",
    alt: "Smartphone and payment reader on a retail counter.",
    sourceUrl: "https://unsplash.com/photos/credit-card-reader-and-smartphone-on-counter-s9HUOktc4F8",
  },
} satisfies Record<string, SiteImage>;

export const serviceImages = {
  device: {
    src: "/images/site/pages/hero-phone.jpg",
    alt: "Hand holding a smartphone with the home screen visible.",
    sourceUrl: "https://unsplash.com/photos/hand-holding-smartphone-with-app-icons-A6JxK37IlPo",
  },
  accessory: {
    src: "/images/site/accessories/cases.jpg",
    alt: "Colorful phone cases arranged on a white surface.",
    sourceUrl: "https://unsplash.com/photos/FQXbLmlmvWY",
  },
  service: {
    src: "/images/site/services/phone-repair.jpg",
    alt: "Technician repairing the inside of a smartphone.",
    sourceUrl: "https://unsplash.com/photos/man-repairing-android-smartphone-K7OUs6y_cm8",
  },
  support: {
    src: "/images/site/accessories/protection.jpg",
    alt: "Phone, keys, screen protector, and cleaning cloth.",
    sourceUrl: "https://unsplash.com/photos/phone-keys-screen-protector-and-cleaning-cloth-VtMtatgJs1Q",
  },
} satisfies Record<string, SiteImage>;

export const accessoryImages = {
  cases: {
    src: "/images/site/accessories/cases.jpg",
    alt: "Colorful phone cases arranged on a white surface.",
    sourceUrl: "https://unsplash.com/photos/FQXbLmlmvWY",
  },
  protection: {
    src: "/images/site/accessories/protection.jpg",
    alt: "Phone, keys, screen protector, and cleaning cloth.",
    sourceUrl: "https://unsplash.com/photos/phone-keys-screen-protector-and-cleaning-cloth-VtMtatgJs1Q",
  },
  chargers: {
    src: "/images/site/accessories/chargers.jpg",
    alt: "Smartphone charging on a desk.",
    sourceUrl: "https://unsplash.com/photos/lxzWmerBObA",
  },
  cables: {
    src: "/images/site/accessories/cables.jpg",
    alt: "USB cable connectors on a white surface.",
    sourceUrl: "https://unsplash.com/photos/f0EpYkZ-cp4",
  },
  audio: {
    src: "/images/site/accessories/audio.jpg",
    alt: "Headphones and a mobile phone on a table.",
    sourceUrl: "https://unsplash.com/photos/a-pair-of-headphones-a-cell-phone-and-a-pair-of-headphones-apM-8J8ZNA8",
  },
  power: {
    src: "/images/site/accessories/power.jpg",
    alt: "Power bank charging a smartphone outdoors.",
    sourceUrl: "https://unsplash.com/photos/APdfyW0Aq-E",
  },
} satisfies Record<string, SiteImage>;
