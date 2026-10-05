"use client";

import { getGsap } from "@/lib/gsap";
import { useDesktopPointer, useReducedMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

/**
 * Product-exploration cursor.
 *
 * Reads `data-cursor` / `data-cursor-label` off any element via event
 * delegation, so any component can opt in without wiring refs. Stays a small
 * circle — it is a pointer, not a badge. Never rendered on touch or when the
 * visitor prefers reduced motion; the native cursor is always left intact.
 */
export function ProductCursor() {
  const fine = useDesktopPointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const gsap = getGsap();
    if (!gsap || !dotRef.current || !ringRef.current) return;

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      if (target) {
        setLabel(target.dataset.cursorLabel ?? "View");
        setActive(true);
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] hidden lg:block"
      style={{ cursor: "none" }}
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mist/50 bg-ink/10 backdrop-blur-[2px] transition-[width,height,opacity,background-color,border-color] duration-500 ease-expo"
        style={{
          width: active ? 74 : 26,
          height: active ? 74 : 26,
          opacity: visible ? 1 : 0,
          backgroundColor: active ? "rgba(27,69,240,0.14)" : "transparent",
          borderColor: active ? "rgba(91,123,255,0.9)" : "rgba(155,162,171,0.55)",
        }}
      >
        <span
          className="font-mono text-[0.5625rem] tracking-[0.16em] whitespace-nowrap uppercase transition-opacity duration-300"
          style={{ opacity: active ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
