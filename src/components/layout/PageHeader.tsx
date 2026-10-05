import type { ReactNode } from "react";

/**
 * Standard interior page masthead. Oversized title on near-black, a kicker rail
 * above it, and a lede that says plainly what the page is for.
 */
export function PageHeader({
  index,
  kicker,
  title,
  lede,
  children,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-void pt-28 pb-14 sm:pt-40 sm:pb-20 ${className ?? ""}`}>
      <div className="shell">
        <div className="flex items-center gap-4 text-mist">
          <span className="type-index">{index}</span>
          <span aria-hidden className="size-1.5 rotate-45 bg-signal" />
          <span className="type-label-xs">{kicker}</span>
        </div>
        <h1 className="type-display-l mt-8 max-w-[18ch] text-chalk">{title}</h1>
        {lede ? <p className="type-body-lg mt-8 max-w-[56ch] text-mist">{lede}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
