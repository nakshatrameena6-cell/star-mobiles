"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Only fire once. */
  once?: boolean;
  /** Shrink the viewport band, e.g. "-10% 0px -10% 0px". */
  rootMargin?: string;
  threshold?: number;
};

/**
 * Minimal, reliable scroll-visibility primitive.
 *
 * One-shot reveals use this rather than ScrollTrigger: an IntersectionObserver
 * is cheap, survives hydration without a refresh pass, and cannot desync from
 * Lenis. ScrollTrigger is reserved for scrub-driven effects.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  once = true,
  rootMargin = "-8% 0px -8% 0px",
  threshold = 0.01,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
