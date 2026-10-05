"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import { getChannel } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

const ICONS = {
  call: Phone,
  whatsapp: MessageCircle,
  directions: Navigation,
} as const;

const BAR_CHANNELS = [
  getChannel("call"),
  getChannel("whatsapp"),
  getChannel("directions"),
];

/**
 * Persistent conversion bar for small screens — the three things a visitor on a
 * phone actually needs. Appears only after the hero, so it never covers the
 * opening statement, and steps aside while the full contact section is on
 * screen so two call-to-actions never compete.
 */
export function MobileActionBar() {
  const [state, setState] = useState<"hidden" | "shown" | "suppressed">("hidden");

  useEffect(() => {
    let frame = 0;

    const evaluate = () => {
      const viewport = window.innerHeight;
      const pastHero = window.scrollY > viewport * 0.9;
      const contact = document.getElementById("contact");
      const contactOnScreen = contact
        ? contact.getBoundingClientRect().top < viewport * 0.8
        : false;

      if (contactOnScreen) setState("suppressed");
      else setState(pastHero ? "shown" : "hidden");
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const shown = state === "shown";

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[75] border-t border-hair-dark bg-ink/95 backdrop-blur-xl transition-[transform,opacity,visibility] duration-500 ease-expo sm:hidden",
        shown ? "visible translate-y-0 opacity-100" : "invisible translate-y-full opacity-0",
      )}
    >
      <ul
        className="grid grid-cols-3"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {BAR_CHANNELS.map((channel, i) => {
          const Icon = ICONS[channel.id];
          const inner = (
            <>
              <Icon className="size-4" strokeWidth={1.5} aria-hidden />
              <span className="type-label-xs">{channel.label}</span>
            </>
          );
          const className = cn(
            "flex flex-col items-center justify-center gap-2 py-3.5 active:text-signal-lift",
            i < BAR_CHANNELS.length - 1 && "border-r border-hair-dark",
            channel.id === "whatsapp" ? "text-signal-lift" : "text-chalk",
          );

          return (
            <li key={channel.id}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className={className}
              >
                {inner}
                {channel.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
