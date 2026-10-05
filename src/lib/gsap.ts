"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ScrollTrigger is registered lazily on the client only. Server renders never
 * touch `window`, so there is no hydration-time surprise and no plugin running
 * in a Node environment.
 */
let registered = false;

export function getGsap() {
  if (typeof window === "undefined") return null;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };

/**
 * Shared motion vocabulary. Every duration and curve in the project comes from
 * here so the site feels like one hand made it.
 */
export const motion = {
  /** Masked typography reveal. */
  reveal: { duration: 1.05, ease: "expo" },
  /** Image / product emergence from a clipped container. */
  clip: { duration: 1.35, ease: "mask" },
  /** Metadata fade + rise. */
  rise: { duration: 0.85, ease: "expo" },
  /** Cursor-driven micro interaction. */
  micro: { duration: 0.4, ease: "swift" },
  /** Stagger between list rows. */
  stagger: 0.055,
} as const;

export const EASE = {
  expo: "power4.out",
  swift: "power3.out",
  mask: "expo.inOut",
} as const;
