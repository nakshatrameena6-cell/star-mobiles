"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { DeviceArt } from "@/components/art/DeviceArt";
import { Button } from "@/components/ui/Cta";
import { SPEC_LABELS, SPEC_KEYS, getSpecs, products } from "@/lib/data/catalog";
import { whatsappLink } from "@/lib/data/contact";

type Slot = 0 | 1;

const EMPTY = "—";

/**
 * Comparison sheet.
 *
 * Three rules keep this honest:
 *  1. Only devices that are actually published appear as selectable options.
 *  2. Unknown values render as an explicit dash — never a guessed zero.
 *  3. Differences-only mode hides rows where both values match, because a
 *     comparison sheet full of identical rows is noise.
 */
export function Comparison() {
  const selectable = useMemo(() => products.slice(0, 6), []);
  const [slots, setSlots] = useState<Slot[]>([0, 1]);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const pair = slots.map((slot) => selectable[slot]).filter(Boolean);

  const rows = useMemo(() => {
    if (pair.length < 2) return [];
    const [a, b] = pair;
    const left = getSpecs(a);
    const right = getSpecs(b);
    return SPEC_KEYS.map((key, index) => {
      const lv = left[index]?.value ?? null;
      const rv = right[index]?.value ?? null;
      return {
        key,
        label: SPEC_LABELS[key],
        left: lv ?? EMPTY,
        right: rv ?? EMPTY,
        differs: Boolean(lv && rv && lv !== rv),
      };
    });
  }, [pair]);

  const visibleRows = differencesOnly ? rows.filter((row) => row.differs) : rows;

  const compareEnquiry = whatsappLink(
    `Hello Star Mobiles, I'd like a comparison between the ${pair[0]?.brand} ${pair[0]?.model} and the ${pair[1]?.brand} ${pair[1]?.model}.`,
  );

  if (selectable.length < 2) return null;

  return (
    <div className="mt-12">
      {/* Slot pickers */}
      <div className="grid gap-6 sm:grid-cols-2">
        {([0, 1] as Slot[]).map((slot) => {
          const value = slots[slot];
          return (
            <div key={slot}>
              <label
                htmlFor={`compare-slot-${slot}`}
                className="type-label-xs mb-3 block text-fog"
              >
                {slot === 0 ? "First phone" : "Second phone"}
              </label>
              <select
                id={`compare-slot-${slot}`}
                value={value}
                onChange={(event) => {
                  const next = Number(event.target.value) as Slot;
                  setSlots((current) => {
                    const other = slot === 0 ? current[1] : current[0];
                    return other === next
                      ? current
                      : slot === 0
                        ? [next, current[1]]
                        : [current[0], next];
                  });
                }}
                className="type-body w-full appearance-none border border-hair-dark bg-graphite px-4 py-3.5 text-chalk outline-none transition-colors duration-300 focus:border-signal"
              >
                {selectable.map((product, index) => (
                  <option key={product.slug} value={index}>
                    {product.brand} {product.model}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Slot cards */}
      <div className="mt-6 grid gap-px bg-hair-dark sm:grid-cols-2">
        {pair.map((product) => (
          <div key={product.slug} className="bg-graphite p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="type-label-xs text-fog">{product.brand}</p>
                <p className="type-display-s mt-2 text-chalk">{product.model}</p>
              </div>
              <div className="size-20 shrink-0 bg-void">
                <DeviceArt
                  variant={product.art}
                  className="h-full w-full"
                  alt={`${product.brand} ${product.model}`}
                />
              </div>
            </div>
            <Link
              href={`/phones/${product.slug}`}
              className="type-label-xs mt-4 inline-block text-mist transition-colors duration-300 hover:text-chalk"
            >
              Full details
            </Link>
          </div>
        ))}
      </div>

      {/* Table */}
      <table className="mt-10 w-full border-collapse">
        <caption className="sr-only">Specification comparison</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="type-label-xs border-b border-hair-dark pb-3 text-left font-normal text-fog"
            >
              Spec
            </th>
            {pair.map((product) => (
              <th
                key={product.slug}
                scope="col"
                className="type-label-xs border-b border-hair-dark pb-3 text-right font-normal text-fog"
              >
                {product.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.key}>
              <th
                scope="row"
                className="type-label-xs border-b border-hair-dark/50 py-3.5 text-left font-normal text-mist"
              >
                {row.label}
              </th>
              <td className="type-figure border-b border-hair-dark/50 py-3.5 text-right text-[0.8125rem] text-chalk">
                {row.left}
              </td>
              <td className="type-figure border-b border-hair-dark/50 py-3.5 text-right text-[0.8125rem] text-chalk">
                {row.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleRows.length === 0 ? (
        <p className="type-body mt-8 flex items-center gap-3 text-mist">
          <X className="size-4" strokeWidth={1.5} aria-hidden />
          {differencesOnly
            ? "No confirmed differences to show. Ask us directly and we will compare them for you."
            : "Specifications are still being confirmed for this pair. Call or WhatsApp and we will read the specs to you."}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => setDifferencesOnly((value) => !value)}
          aria-pressed={differencesOnly}
          className="type-label-xs inline-flex items-center gap-3 text-mist transition-colors duration-300 hover:text-chalk"
        >
          {differencesOnly ? (
            <Check className="size-3.5 text-signal" strokeWidth={2} aria-hidden />
          ) : (
            <Plus className="size-3.5" strokeWidth={1.5} aria-hidden />
          )}
          {differencesOnly ? "Showing differences only" : "Show differences only"}
        </button>

        <div className="sm:ml-auto">
          <Button
            href={compareEnquiry}
            external={compareEnquiry.startsWith("http")}
          >
            Ask us to compare these
          </Button>
        </div>
      </div>
    </div>
  );
}