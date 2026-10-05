import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/animations/Magnetic";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

const toneStyles: Record<Tone, { base: string; hover: string }> = {
  dark: {
    base: "text-chalk",
    hover: "hover:text-signal-lift",
  },
  light: {
    base: "text-ink",
    hover: "hover:text-signal",
  },
};

/**
 * Editorial action link: label with a hairline rule and a rule that draws in on
 * hover. Used everywhere except the hero's primary buttons, so CTAs stay scarce
 * and legible.
 */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
  external,
  cursorLabel,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  external?: boolean;
  cursorLabel?: string;
}) {
  const styles = toneStyles[tone];

  const inner = (
    <>
      <span
        className={cn(
          "type-label-xs transition-colors duration-300",
          styles.base,
          styles.hover,
        )}
      >
        {children}
      </span>
      <span className="relative h-px flex-1 overflow-hidden bg-current/25">
        <span className="absolute inset-0 -translate-x-full bg-signal transition-transform duration-500 ease-expo group-hover:translate-x-0" />
      </span>
      <ArrowUpRight
        className={cn(
          "size-3.5 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          styles.base,
          styles.hover,
        )}
        strokeWidth={1.5}
        aria-hidden
      />
    </>
  );

  const shared = cn(
    "group inline-flex w-full items-center gap-3 py-3 transition-colors",
    className,
  );

  const data = cursorLabel ? { "data-cursor": "", "data-cursor-label": cursorLabel } : undefined;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={shared}
        {...data}
      >
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={shared} {...data}>
      {inner}
    </Link>
  );
}

/**
 * Primary / secondary button. Near-square corners, mono label, arrow that
 * nudges on hover. `magnetic` opts into cursor attraction.
 */
export function Button({
  href,
  children,
  variant = "signal",
  tone = "dark",
  className,
  external,
  magnetic = true,
  cursorLabel,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "signal" | "solid" | "outline";
  tone?: Tone;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  cursorLabel?: string;
  onClick?: () => void;
}) {
  const variants = {
    signal: "bg-signal text-white hover:bg-signal-deep",
    solid: tone === "dark" ? "bg-chalk text-ink hover:bg-paper-alt" : "bg-ink text-chalk hover:bg-graphite",
    outline:
      tone === "dark"
        ? "border border-mist/35 text-chalk hover:border-signal hover:text-signal-lift"
        : "border border-ink/25 text-ink hover:border-signal hover:text-signal",
  } as const;

  const Tag = magnetic ? MagneticSlot : PlainSlot;

  const inner = (
    <span
      className={cn(
        "group/btn inline-flex items-center justify-center gap-3 px-6 py-4 transition-colors duration-400 ease-expo sm:px-7",
        variants[variant],
        className,
      )}
    >
      <span className="type-label">{children}</span>
      <ArrowUpRight
        className="size-4 shrink-0 transition-transform duration-500 ease-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        strokeWidth={1.5}
        aria-hidden
      />
    </span>
  );

  const data = cursorLabel ? { "data-cursor": "", "data-cursor-label": cursorLabel } : undefined;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" onClick={onClick} {...data}>
        <Tag>{inner}</Tag>
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...data}>
      <Tag>{inner}</Tag>
    </Link>
  );
}

/* Kept separate so `Magnetic` stays an optional wrapper. */
function MagneticSlot({ children }: { children: ReactNode }) {
  return <Magnetic strength={0.22}>{children}</Magnetic>;
}

function PlainSlot({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
