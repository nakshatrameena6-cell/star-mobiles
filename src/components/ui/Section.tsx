import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Star } from "@/components/animations/Marquee";

/**
 * Section eyebrow: index numeral, rule, label. The connective tissue that lets
 * a long page read as one designed system.
 */
export function SectionLabel({
  index,
  children,
  tone = "dark",
  className,
}: {
  index?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        tone === "dark" ? "text-mist" : "text-ash",
        className,
      )}
    >
      {index ? <span className="type-index">{index}</span> : null}
      <Star />
      <span className="type-label-xs">{children}</span>
    </div>
  );
}

/**
 * Standard section header: eyebrow, oversized display line, optional lede.
 * Deliberately typographic — no container card, no badge.
 */
export function SectionHead({
  index,
  eyebrow,
  heading,
  lede,
  tone = "dark",
  align = "start",
  headingClassName,
  className,
  children,
  id,
}: {
  index?: string;
  eyebrow: string;
  heading: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "end";
  headingClassName?: string;
  className?: string;
  children?: ReactNode;
  /** Set when a parent section uses `aria-labelledby`. */
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "end" && "items-end text-right",
        className,
      )}
    >
      <SectionLabel index={index} tone={tone}>
        {eyebrow}
      </SectionLabel>

      <h2
        id={id}
        className={cn(
          "type-display-l max-w-[16ch]",
          tone === "dark" ? "text-chalk" : "text-ink",
          align === "end" && "max-w-[14ch]",
          headingClassName,
        )}
      >
        {heading}
      </h2>

      {lede ? (
        <p
          className={cn(
            "type-body max-w-[52ch]",
            tone === "dark" ? "text-mist" : "text-ash",
          )}
        >
          {lede}
        </p>
      ) : null}

      {children}
    </div>
  );
}

/** Full-bleed hairline. The primary structural device on dark sections. */
export function Rule({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full",
        tone === "dark" ? "bg-hair-dark" : "bg-hair-light",
        className,
      )}
    />
  );
}

/**
 * Small monospace note used to flag framework data honestly — e.g. "categories
 * are a starting framework". Replaces the badges and trust chips that generic
 * templates litter the page with.
 */
export function DataNote({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "type-label-xs max-w-[46ch] leading-[1.9]",
        tone === "dark" ? "text-fog" : "text-ash/80",
        className,
      )}
    >
      {children}
    </p>
  );
}
