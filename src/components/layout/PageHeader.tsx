import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/data/images";

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
  image,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  image?: SiteImage;
  className?: string;
}) {
  return (
    <section className={`bg-void pt-28 pb-14 sm:pt-40 sm:pb-20 ${className ?? ""}`}>
      <div className="shell">
        <div className={image ? "grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8" : ""}>
          <div className={image ? "lg:col-span-7" : ""}>
            <div className="flex items-center gap-4 text-mist">
              <span className="type-index">{index}</span>
              <span aria-hidden className="size-1.5 rotate-45 bg-signal" />
              <span className="type-label-xs">{kicker}</span>
            </div>
            <h1 className="type-display-l mt-8 max-w-[18ch] text-chalk">{title}</h1>
            {lede ? <p className="type-body-lg mt-8 max-w-[56ch] text-mist">{lede}</p> : null}
            {children ? <div className="mt-10">{children}</div> : null}
          </div>

          {image ? (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,8,10,0.28),transparent_55%)]"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
