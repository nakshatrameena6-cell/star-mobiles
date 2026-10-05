"use client";

import { marqueeWords } from "@/lib/data/navigation";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Low-speed typographic marquee. Pure `transform` on a duplicated track, so it
 * stays on the compositor. Pauses on hover and freezes for reduced motion.
 */
export function Marquee({
  words = marqueeWords,
  /** Seconds for one full cycle. Slow is the point. */
  duration = 52,
  className,
}: {
  words?: readonly string[];
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const track = [...words, ...words];

  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className="flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]"
        style={
          reduced
            ? undefined
            : { animation: `star-marquee ${duration}s linear infinite` }
        }
      >
        {track.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
            <span className="type-display-s text-mist/65">{word}</span>
            <Star />
          </span>
        ))}
      </div>
      <span className="sr-only">{words.join(", ")}</span>
    </div>
  );
}

/** The brand mark as geometry. */
export function Star({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden
      className={cn("shrink-0 text-signal", className)}
      fill="currentColor"
    >
      <path d="M5 0 L5.9 3.4 L9.5 5 L5.9 6.6 L5 10 L4.1 6.6 L0.5 5 L4.1 3.4 Z" />
    </svg>
  );
}
