"use client";

import { EASE, getGsap } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";
import { useInView } from "@/lib/use-in-view";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Inner element that scales down from `from`. */
  contentClassName?: string;
  /** Start scale for the inner element. */
  from?: number;
  delay?: number;
  duration?: number;
};

/**
 * Product / photograph emergence: the container opens with a clip while the
 * inner media settles from a slight overscan. GPU transforms only.
 */
export function RevealImage({
  children,
  className,
  contentClassName,
  from = 1.12,
  delay = 0,
  duration = 1.35,
}: Props) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  useIsoLayoutEffect(() => {
    const gsap = getGsap();
    if (!gsap || !scope.current) return;

    const inner = scope.current.firstElementChild as HTMLElement | null;
    if (!inner) return;

    if (reduced) {
      gsap.set(scope.current, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(inner, { scale: 1 });
      return;
    }

    if (!inView) {
      gsap.set(scope.current, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(inner, { scale: from });
      return;
    }

    const tween = gsap.to(scope.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration,
      ease: EASE.mask,
      delay,
    });
    const settle = gsap.to(inner, {
      scale: 1,
      duration: duration * 1.1,
      ease: EASE.expo,
      delay,
    });

    return () => {
      tween.kill();
      settle.kill();
    };
  }, [inView, from, delay, duration, reduced]);

  return (
    <div ref={scope} className={className}>
      <div ref={ref} className={contentClassName ?? "h-full w-full"}>
        {children}
      </div>
    </div>
  );
}

/**
 * Quiet fade-and-rise for supporting content. Used sparingly — motion here
 * should establish hierarchy, not decorate.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  duration = 0.85,
  as: Tag = "div",
  stagger,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "li" | "ul" | "ol" | "section" | "article" | "span";
  /** When set, children animate in sequence. */
  stagger?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  useIsoLayoutEffect(() => {
    const gsap = getGsap();
    if (!gsap || !scope.current) return;

    const targets =
      typeof stagger === "number"
        ? gsap.utils.toArray<HTMLElement>("[data-rise]", scope.current)
        : scope.current;

    if (reduced) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    if (!inView) {
      gsap.set(targets, { y, opacity: 0 });
      return;
    }

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      ease: EASE.expo,
      delay,
      stagger: stagger ?? 0,
      overwrite: "auto",
    });

    return () => {
      tween.kill();
    };
  }, [inView, y, duration, delay, stagger, reduced]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
