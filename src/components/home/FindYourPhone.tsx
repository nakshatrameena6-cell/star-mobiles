"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Cta";
import { DataNote, SectionHead } from "@/components/ui/Section";
import { matchProducts, PRIORITIES, publishedProducts, type Priority } from "@/lib/data/catalog";
import { getChannel, whatsappLink } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

/**
 * "Find your phone" — a preference selector, not a chatbot and not a quiz.
 *
 * With a published catalogue it returns matching devices. With no catalogue it
 * does something more useful for a shop this size: it composes a short brief
 * you can send on WhatsApp, so the conversation starts from what you actually
 * need instead of "which phone".
 */
export function FindYourPhone() {
  const [chosen, setChosen] = useState<Priority[]>([]);
  const [copied, setCopied] = useState(false);

  const matches = useMemo(() => matchProducts(chosen), [chosen]);

  const brief = useMemo(() => {
    const labels = PRIORITIES.filter((p) => chosen.includes(p.id)).map((p) => p.label);
    return [
      "Hello Star Mobiles,",
      "",
      labels.length
        ? `I'm looking for a phone that is good for: ${labels.join(", ").toLowerCase()}.`
        : "I'm looking for a phone recommendation.",
      "My budget is around ₹______.",
      "Please let me know what you have in stock.",
    ].join("\n");
  }, [chosen]);

  const whatsapp = getChannel("whatsapp");
  const call = getChannel("call");

  const toggle = (id: Priority) => {
    setChosen((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
    setCopied(false);
  };

  const whatsappHref = whatsappLink(brief);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const hasCatalogue = publishedProducts.length > 0;

  return (
    <section className="relative bg-paper py-20 text-ink sm:py-28 lg:py-32" aria-labelledby="finder-heading">
      <div className="shell">
        <SectionHead
          index="03"
          id="finder-heading"
          eyebrow="Find your phone"
          heading="What matters most to you?"
          lede="Pick as many as you like. We will point you at what actually fits — not what has the biggest number on the box."
          tone="light"
        />

        <Reveal className="mt-12 sm:mt-16">
          <ul className="grid gap-px border-y border-hair-light bg-hair-light sm:grid-cols-2 lg:grid-cols-3">
            {PRIORITIES.map((priority) => {
              const active = chosen.includes(priority.id);
              return (
                <li key={priority.id}>
                  <button
                    type="button"
                    onClick={() => toggle(priority.id)}
                    aria-pressed={active}
                    className={cn(
                      "group flex w-full items-start justify-between gap-4 bg-paper px-5 py-6 text-left transition-colors duration-400 hover:bg-paper-alt sm:px-6 sm:py-7",
                      active && "bg-ink text-chalk hover:bg-ink",
                    )}
                  >
                    <span>
                      <span className="type-display-s block">{priority.label}</span>
                      <span
                        className={cn(
                          "type-label-xs mt-3 block",
                          active ? "text-mist" : "text-ash/80",
                        )}
                      >
                        {priority.blurb}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 flex size-5 shrink-0 items-center justify-center border transition-colors duration-300",
                        active
                          ? "border-signal bg-signal text-white"
                          : "border-ink/25 text-transparent",
                      )}
                    >
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Result: matches when a catalogue exists */}
          <div className="lg:col-span-5">
            <h3 className="type-label-xs text-ash">
              {matches.length > 0
                ? `${matches.length} match${matches.length === 1 ? "" : "es"}`
                : hasCatalogue
                  ? "No exact match yet"
                  : "Your brief"}
            </h3>

            {matches.length > 0 ? (
              <ul className="mt-6 flex flex-col">
                {matches.map((product) => (
                  <li key={product.id} className="border-t border-hair-light py-5">
                    <a
                      href={`/phones/${product.slug}`}
                      className="type-display-s block transition-colors duration-300 hover:text-signal"
                    >
                      {product.brand} {product.model}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="type-body mt-5 max-w-[42ch] text-ash">
                  {hasCatalogue
                    ? "Try removing a priority, or ask us directly — we can weigh up options that fall outside these categories."
                    : "Send this to us and we will reply with what is in stock that fits. It takes less than a minute."}
                </p>

                <pre className="mt-7 overflow-x-auto border border-hair-light bg-paper-alt px-5 py-5 font-mono text-[0.75rem] leading-[2] whitespace-pre-wrap text-ash">
                  {brief}
                </pre>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    href={whatsappHref}
                    external={whatsappHref.startsWith("http")}
                    tone="light"
                    magnetic={false}
                  >
                    Send on WhatsApp
                  </Button>
                  <button
                    type="button"
                    onClick={copy}
                    className="type-label-xs inline-flex items-center gap-2 border border-ink/20 px-4 py-4 text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5" strokeWidth={2} aria-hidden />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" strokeWidth={1.5} aria-hidden />
                        Copy brief
                      </>
                    )}
                  </button>
                </div>

                {!whatsapp.configured ? (
                  <DataNote tone="light" className="mt-5">
                    WhatsApp number not configured yet — the button opens our contact
                    page. Add the number in{" "}
                    <code>src/lib/data/store.ts</code> to enable the deep link.
                  </DataNote>
                ) : null}
              </>
            )}
          </div>

          {/* Editorial aside */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex h-full flex-col justify-between gap-8 border-t border-hair-light pt-6">
              <p className="type-body-lg text-ink">
                Most people walk in saying{" "}
                <span className="text-ash">“I want the best one.”</span> The honest question
                is what you do with it for the next two years — that is what decides the
                right phone, and it is a five-minute conversation in store.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/contact#visit" variant="outline" tone="light">
                  Visit the store
                </Button>
                <Button href={call.href} variant="solid" tone="light" magnetic={false}>
                  Call {call.configured ? call.display : "us"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
