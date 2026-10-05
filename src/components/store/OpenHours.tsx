"use client";

import { useSyncExternalStore } from "react";
import { storeInfo, type OpeningHour } from "@/lib/data/store";
import { formatTime, getOpenState } from "@/lib/utils";

/**
 * Opening hours are resolved on the client only.
 *
 * "Today" depends on the visitor's clock, so rendering it on the server would
 * risk a hydration mismatch at the day boundary — and a visitor acting on wrong
 * hours is worse than a blank value for one frame. `useSyncExternalStore` with
 * a null server snapshot gives exactly that: no markup on the server, the real
 * value immediately after hydration, and no setState-in-effect.
 */

const noopSubscribe = () => () => {};

function todayHours(): OpeningHour | undefined {
  const index = (new Date().getDay() + 6) % 7;
  return storeInfo.hours.weekly[index] ?? storeInfo.hours.weekly[0];
}

function formatRange(day: OpeningHour | undefined) {
  if (!day || !day.open || !day.close) return "Hours on request";
  return `${formatTime(day.open)} – ${formatTime(day.close)}`;
}

function useBrowserValue<T>(getValue: () => T): T | null {
  return useSyncExternalStore(
    noopSubscribe,
    getValue,
    () => null,
  );
}

export function OpenHours({ className }: { className?: string }) {
  const label = useBrowserValue(() => formatRange(todayHours()));

  return (
    <span className={className}>
      {label ?? "—"}
    </span>
  );
}

export function OpenStateBadge({ className }: { className?: string }) {
  const state = useBrowserValue(() => getOpenState(storeInfo.hours.weekly));

  if (state === null || state === "unknown") return null;

  return (
    <span className={className}>
      <span
        aria-hidden
        className={
          state === "open"
            ? "inline-block size-1.5 rounded-full bg-signal"
            : "inline-block size-1.5 rounded-full bg-fog"
        }
        style={
          state === "open"
            ? { animation: "star-pulse 2.4s ease-in-out infinite" }
            : undefined
        }
      />
      {state === "open" ? "Open now" : "Closed now"}
    </span>
  );
}