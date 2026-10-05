"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Star } from "@/components/animations/Marquee";
import { Button } from "@/components/ui/Cta";
import { contactChannels } from "@/lib/data/contact";
import { navigation } from "@/lib/data/navigation";
import { storeInfo } from "@/lib/data/store";
import { cn } from "@/lib/utils";

/**
 * Fixed masthead. Always light-on-dark so it stays legible across the page's
 * alternating surfaces; it gains a backdrop only once the hero has scrolled away.
 */
export function Navbar() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  /** Panel is tracked against the route it was opened on, so navigating away
   *  closes it during render instead of needing an effect to undo it. */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenedOn(next ? pathname : null),
    [pathname],
  );
  const closeRef = useRef<HTMLButtonElement>(null);

  // Condense once past the hero's first screen.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setCondensed(window.scrollY > 32);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Panel: escape to dismiss, lock background scroll, move focus in.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, setOpen]);

  const call = contactChannels.find((c) => c.id === "call")!;
  const whatsapp = contactChannels.find((c) => c.id === "whatsapp")!;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,backdrop-filter] duration-500 ease-expo",
          condensed
            ? "border-b border-hair-dark bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 sm:h-20">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${storeInfo.name} — home`}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "type-label relative block py-2 transition-colors duration-300",
                        active ? "text-chalk" : "text-mist hover:text-chalk",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-signal transition-transform duration-500 ease-expo",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={call.href}
              className="type-label-xs flex items-center gap-2 text-mist transition-colors duration-300 hover:text-signal-lift"
            >
              <Phone className="size-3.5" strokeWidth={1.5} aria-hidden />
              <span>{call.configured ? call.display : "Call store"}</span>
            </a>
            <Button href={whatsapp.href} variant="solid" external={whatsapp.external}>
              {whatsapp.configured ? "WhatsApp" : "Enquire"}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-chalk lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="type-label-xs">Menu</span>
            <Menu className="size-5" strokeWidth={1.5} aria-hidden />
            <span className="sr-only">Open navigation</span>
          </button>
        </div>
      </header>

      {/* Full-screen panel for small screens */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[85] flex flex-col bg-ink transition-[opacity,visibility] duration-500 ease-expo lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="shell flex h-16 shrink-0 items-center justify-between sm:h-20">
          <Wordmark />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-chalk"
          >
            <span className="type-label-xs">Close</span>
            <X className="size-5" strokeWidth={1.5} aria-hidden />
            <span className="sr-only">Close navigation</span>
          </button>
        </div>

        <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto py-6">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} className="border-t border-hair-dark last:border-b">
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <span className="type-display-m text-chalk">{item.label}</span>
                  <span className="type-index text-fog">{item.index}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3">
            <Button href={whatsapp.href} external={whatsapp.external} className="w-full">
              {whatsapp.configured ? "WhatsApp us" : "Enquire about a phone"}
            </Button>
            <Button href={call.href} variant="outline" className="w-full">
              Call store
            </Button>
          </div>

          <address className="mt-10 not-italic">
            <p className="type-label-xs mb-3 text-fog">Find us</p>
            <p className="type-body text-mist">
              {storeInfo.address.line1}
              <br />
              {storeInfo.address.line2}
              <br />
              {storeInfo.address.locality}, {storeInfo.address.city} —{" "}
              {storeInfo.address.postalCode}
            </p>
          </address>
        </nav>
      </div>
    </>
  );
}

/**
 * Wordmark lockup. The star sits inline rather than floating — this is the one
 * place the mark is allowed to be literal.
 */
function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="type-display-s leading-none text-chalk">STAR</span>
      <Star className="size-3" />
      <span aria-hidden className="h-3.5 w-px bg-mist/40" />
      <span className="type-label-xs leading-none text-mist">Mobiles</span>
    </span>
  );
}
