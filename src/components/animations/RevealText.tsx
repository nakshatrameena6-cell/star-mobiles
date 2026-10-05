"use client";

import { EASE, getGsap } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";
import { useRef } from "react";

type Props = {
  /** One entry per line. Each line is masked and rises independently. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Seconds between line reveals. */
  stagger?: number;
  /** `auto` reveals on scroll, `immediate` plays on mount. */
  trigger?: "auto" | "immediate";
  /** Re-run each time the block re-enters the viewport. */
  replay?: boolean;
  label?: string;
};

export function RevealText({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.085,
  trigger = "auto",
  replay = false,
  label,
}: Props) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ once: !replay });

  const shouldPlay = trigger === "immediate" || inView;

  useIsoLayoutEffect(() => {
    const gsap = getGsap();
    if (!gsap || !scope.current) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-line]", scope.current);
    if (!targets.length) return;

    if (reduced) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    if (!shouldPlay) {
      gsap.set(targets, { yPercent: 118, opacity: 0 });
      return;
    }

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 1.05,
      ease: EASE.expo,
      delay,
      stagger,
      overwrite: "auto",
    });

    return () => {
      tween.kill();
    };
  }, [shouldPlay, delay, stagger, reduced]);

  return (
    <div ref={scope} className={className}>
      <Tag ref={ref as never} aria-label={label}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.05em]">
            <span data-line className={cn("block will-change-transform", lineClassName)}>
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
