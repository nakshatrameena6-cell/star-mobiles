"use client";

import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Shared handle so other components can drive the scroller. */
export function getLenis() {
  return instance;
}

/**
 * Smooth scrolling, used as *rhythm* rather than novelty.
 *
 * Disabled for reduced-motion visitors and for coarse pointers, where momentum
 * hijacking is unwelcome. Runs on GSAP's ticker so Lenis and ScrollTrigger share
 * a single rAF loop. Lenis drives native window scroll, so ScrollTrigger picks
 * the movement up without any manual bridge.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gsap = getGsap();
    if (!gsap) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle expo-out settle: responsive without rubber-banding.
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      autoRaf: false,
    });
    instance = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      instance = null;
    };
  }, [reduced]);

  return null;
}

/** Restores scroll position on navigation — the scroller owns it, so it must ask. */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const lenis = instance;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }, 0);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
