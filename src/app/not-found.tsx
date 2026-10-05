import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "@/components/animations/Marquee";
import { Button } from "@/components/ui/Cta";
import { navigation } from "@/lib/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404 — same voice as the rest of the site. Kept in the brand's register rather
 * than apologetic, and it always offers a way back into the catalogue.
 */
export default function NotFound() {
  return (
    <section className="bg-void pt-32 pb-24 sm:pt-44 sm:pb-32">
      <div className="shell">
        <div className="flex items-center gap-4 text-mist">
          <span className="type-index">404</span>
          <Star />
          <span className="type-label-xs">Off catalogue</span>
        </div>

        <h1 className="type-display-xl mt-10 max-w-[14ch] text-chalk">
          This device doesn&apos;t exist.
        </h1>

        <p className="type-body-lg mt-8 max-w-[46ch] text-mist">
          Either the link is old or we moved something. The catalogue is still where you
          left it.
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href="/phones">Back to phones</Button>
          <Button href="/" variant="outline">
            Back to store
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-20 border-t border-hair-dark pt-8">
          <ul className="grid gap-px bg-hair-dark sm:grid-cols-2 lg:grid-cols-5">
            {navigation.map((item) => (
              <li key={item.href} className="bg-void">
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-5 pr-2 transition-colors duration-300 hover:text-chalk"
                >
                  <span className="type-label text-mist transition-colors duration-300 group-hover:text-chalk">
                    {item.label}
                  </span>
                  <span className="type-index text-fog">{item.index}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
