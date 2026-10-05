"use client";

import { getGsap } from "@/lib/gsap";
import { useDesktopPointer, useReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Subtle cursor attraction on primary actions. Capped at a small radius so the
 * button never feels like it is chasing the pointer.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const scope = useRef<HTMLSpanElement>(null);
  const fine = useDesktopPointer();
  const reduced = useReducedMotion();

  return (
    <span
      ref={scope}
      className={className}
      style={{ display: "inline-block" }}
      onPointerMove={(event) => {
        const gsap = getGsap();
        if (!gsap || !scope.current || reduced || !fine) return;
        if (event.pointerType !== "mouse") return;

        const rect = scope.current.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (event.clientY - (rect.top + rect.height / 2)) * strength;

        gsap.to(scope.current, {
          x,
          y,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }}
      onPointerLeave={() => {
        const gsap = getGsap();
        if (!gsap || !scope.current) return;
        gsap.to(scope.current, { x: 0, y: 0, duration: 0.7, ease: "expo.out", overwrite: "auto" });
      }}
    >
      {children}
    </span>
  );
}
