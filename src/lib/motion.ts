"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/** `useLayoutEffect` that does not warn during SSR. */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const QUERY = "(prefers-reduced-motion: reduce)";

export function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Reactive `prefers-reduced-motion`. When true, every motion component in the
 * project renders its final state immediately and skips transforms entirely.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/** Coarse pointer detection — used to disable the custom cursor on touch. */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return coarse;
}

/** Matches a desktop-ish breakpoint, for cursor and hover-dependent behaviour. */
export function useDesktopPointer() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isDesktop;
}
