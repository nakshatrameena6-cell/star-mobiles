"use client";

import { EASE, getGsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";
import { DeviceArt } from "@/components/art/DeviceArt";
import { OpenHours } from "@/components/store/OpenHours";
import { Button } from "@/components/ui/Cta";
import { SectionLabel } from "@/components/ui/Section";
import { getChannel } from "@/lib/data/contact";
import { storeInfo } from "@/lib/data/store";
import { useRef, type ReactNode } from "react";

/**
 * Hero — a showroom entrance, not a centred banner.
 *
 * Composition is deliberately asymmetric: oversized type holds the left seven
 * columns while the product occupies the right five. On small screens the device
 * becomes a cropped silhouette behind the type, so the headline and both calls
 * to action stay above the fold.
 *
 * Entrance runs as one cinematic timeline — backdrop, clipped product reveal,
 * settle, masked headline, metadata, actions — then a slow reflection keeps
 * travelling across the device glass.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const call = getChannel("call");

  useIsoLayoutEffect(() => {
    const gsap = getGsap();
    if (!gsap || !scope.current) return;

    const q = gsap.utils.selector(scope);
    const backdrop = q("[data-hero-backdrop]");
    const product = q("[data-hero-product]");
    const art = q("[data-hero-art]");
    const lines = q("[data-hero-line]");
    const meta = q("[data-hero-meta]");
    const actions = q("[data-hero-cta]");

    if (reduced) {
      gsap.set([...backdrop, ...product, ...art, ...lines, ...meta, ...actions], {
        clearProps: "all",
      });
      return;
    }

    const context = gsap.context(() => {
      // Initial state is set explicitly rather than via `fromTo`, so the CSS
      // `.motion-hidden` gate and GSAP agree on the starting frame.
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(product, { opacity: 0, clipPath: "inset(16% 0% 100% 0%)" });
      gsap.set(art, { scale: 1.14, yPercent: 3 });
      gsap.set(lines, { yPercent: 116, opacity: 0 });
      gsap.set(meta, { y: 16, opacity: 0 });
      gsap.set(actions, { y: 18, opacity: 0 });

      const timeline = gsap.timeline({ defaults: { ease: EASE.expo } });

      // 1 — Backdrop.
      timeline.to(backdrop, { opacity: 1, duration: 0.9 }, 0);
      // 2 — Product emerges from a clipped container.
      timeline.to(
        product,
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EASE.mask },
        0.18,
      );
      // 3 — Product settles.
      timeline.to(art, { scale: 1, yPercent: 0, duration: 1.6 }, 0.2);
      // 4 — Headline unmasks.
      timeline.to(lines, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.085 }, 0.5);
      // 5 — Metadata rises.
      timeline.to(meta, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 }, 0.95);
      // 6 — Actions.
      timeline.to(actions, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 1.12);

      // Scroll choreography: the product recedes as the hero leaves.
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap.to(art, { yPercent: -7, scale: 0.93, ease: "none" }),
      });
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap.to(q("[data-hero-type]"), { yPercent: 12, opacity: 0.2, ease: "none" }),
      });
    }, scope);

    return () => context.revert();
  }, [reduced]);

  return (
    <section
      ref={scope}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-void pt-16 sm:pt-20"
      aria-labelledby="hero-heading"
    >
      {/* ── Backdrop: a measured grid, not decoration ────────────────────── */}
      <div data-hero-backdrop aria-hidden className="motion-hidden pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(155,162,171,0.08)_1px,transparent_1px)] [background-size:calc(100%/6)_100%]" />
        <div className="absolute inset-x-0 top-0 h-px bg-hair-dark" />
        {/* One low vignette to seat the type. Monochrome — no coloured bloom. */}
        <div className="absolute top-1/2 left-1/2 h-[130vw] w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(30,36,46,0.9),transparent)]" />
      </div>

      <div className="shell flex flex-1 flex-col justify-between pt-8 pb-8 sm:pt-14">
        {/* ── Top rail ─────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-6">
          <SectionLabel index="00">{storeInfo.descriptor}</SectionLabel>
          <p className="type-label-xs hidden max-w-[24ch] text-right text-fog sm:block">
            {storeInfo.address.locality}, {storeInfo.address.city}
            <br />
            {storeInfo.address.region} {storeInfo.address.postalCode}
          </p>
        </div>

        {/* ── Composition ──────────────────────────────────────────────────── */}
        <div className="relative flex flex-1 items-center py-10 sm:py-14">
          <div className="grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-6">
            {/* Type */}
            <div data-hero-type className="relative z-10 lg:col-span-7">
              <h1 id="hero-heading" className="sr-only">
                {storeInfo.name} — your next phone starts here. Smartphones,
                accessories and mobile service in Puliyakulam, Coimbatore.
              </h1>

              <p aria-hidden className="type-display-xl text-chalk select-none">
                {["YOUR NEXT", "PHONE", "STARTS HERE."].map((line) => (
                  <span key={line} className="block overflow-hidden pb-[0.04em]">
                    <span data-hero-line className="motion-hidden block will-change-transform">
                      {line}
                    </span>
                  </span>
                ))}
              </p>

              <p
                data-hero-meta
                className="motion-hidden type-body-lg mt-7 max-w-[46ch] text-mist sm:mt-9"
              >
                Smartphones, accessories and mobile service from a shop on
                Ramanadhapuram Main Road, Puliyakulam. Ask us anything — we would
                rather you buy the right phone than the biggest one.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                <span data-hero-cta className="motion-hidden">
                  <Button href="/phones">Explore phones</Button>
                </span>
                <span data-hero-cta className="motion-hidden">
                  <Button href="/contact#visit" variant="outline">
                    Visit store
                  </Button>
                </span>
                <span data-hero-cta className="motion-hidden mt-1">
                  <a
                    href={call.href}
                    {...(call.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="type-label-xs inline-flex items-center gap-3 py-3 text-mist transition-colors duration-300 hover:text-chalk"
                  >
                    <span aria-hidden className="h-px w-8 bg-mist/50" />
                    {call.configured ? `Call ${call.display}` : "Call the store"}
                  </a>
                </span>
              </div>
            </div>

            {/* Product */}
            <div className="relative lg:col-span-5">
              {/* Small screens: cropped silhouette behind the type */}
              <div
                data-hero-product
                aria-hidden
                className="motion-hidden pointer-events-none absolute -top-[4%] -right-[28%] h-[44vh] opacity-30 [mask-image:linear-gradient(to_bottom,#000_34%,transparent_90%)] lg:hidden"
              >
                <div data-hero-art className="h-full w-full will-change-transform">
                  <DeviceArt variant="signature" className="h-full w-full" />
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[min(76vw,25rem)] lg:max-w-none">
                <div
                  data-hero-product
                  aria-hidden
                  className="motion-hidden relative aspect-[5/6] w-full overflow-hidden lg:aspect-[10/11]"
                >
                  <div data-hero-art className="h-full w-full will-change-transform">
                    <DeviceArt
                      variant="signature"
                      className="h-full w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
                    />
                  </div>

                  {/* 7 — Reflection travelling across the glass */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <span
                      className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.085),transparent)]"
                      style={{
                        animation: "star-sweep 7.5s cubic-bezier(0.45,0,0.25,1) infinite",
                      }}
                    />
                  </div>
                </div>

                <p data-hero-meta className="motion-hidden type-label-xs mt-4 text-fog lg:mt-6">
                  Placeholder device artwork — replace with Star Mobiles product
                  photography
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Metadata strip ───────────────────────────────────────────────── */}
        <div
          data-hero-meta
          className="motion-hidden grid grid-cols-2 gap-px border-t border-hair-dark bg-hair-dark sm:grid-cols-4"
        >
          <HeroFact
            label="Location"
            value={`${storeInfo.address.locality}, Coimbatore`}
            note={storeInfo.address.postalCode}
          />
          <HeroFact
            label="Open today"
            value={<OpenHours />}
            note="Reference hours — confirm before visiting"
          />
          <HeroFact
            label="Rating"
            value={`${storeInfo.rating.value} / ${storeInfo.rating.scale}`}
            note={`From ${storeInfo.rating.count} ratings on ${storeInfo.rating.sourceLabel}`}
          />
          <HeroFact
            label="Enquiries"
            value="Call or WhatsApp"
            note="Ask us before you travel"
          />
        </div>
      </div>
    </section>
  );
}

function HeroFact({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note?: string;
}) {
  return (
    <div className="bg-void px-4 py-5 sm:px-5 sm:py-6">
      <p className="type-label-xs text-fog">{label}</p>
      <p className="type-display-s mt-3 text-chalk">{value}</p>
      {note ? <p className="type-label-xs mt-3 leading-[1.8] text-fog/80">{note}</p> : null}
    </div>
  );
}
