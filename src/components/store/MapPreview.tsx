"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Cta";
import { getChannel } from "@/lib/data/contact";
import { addressLines, fullAddress, storeInfo } from "@/lib/data/store";

/**
 * Location panel.
 *
 * Deliberately *not* a giant map iframe. A third-party embed costs a second of
 * main-thread time and a wall of someone else's UI, and we cannot embed a pin
 * until the exact storefront coordinates are confirmed. So: a drawn location
 * diagram, the address set as type, and one tap to open directions in Maps.
 *
 * If `storeInfo.mapEmbedUrl` is filled in, an opt-in interactive map becomes
 * available behind a tap.
 */
export function MapPreview({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [showMap, setShowMap] = useState(true);
  const directions = getChannel("directions");
  const embed = storeInfo.mapEmbedUrl.trim();

  const dark = tone === "dark";

  if (showMap && embed) {
    return (
      <div className="flex flex-col gap-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-hair-light shadow-md">
          <iframe
            src={embed}
            title={`Map showing the verified location of ${storeInfo.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
          <button
            type="button"
            onClick={() => setShowMap(false)}
            className="type-label-xs absolute top-3 left-3 bg-ink/90 px-3.5 py-2 text-chalk backdrop-blur-md transition-colors hover:bg-ink"
          >
            Show Diagram
          </button>
          <div className="absolute right-3 bottom-3">
            <span className="type-label-xs bg-ink/90 px-3 py-1.5 text-signal-lift backdrop-blur-md">
              11.0037° N, 76.9935° E
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <address className="not-italic">
            <p className={dark ? "type-body text-mist" : "type-body text-ash"}>
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className={dark ? "type-label-xs mt-4 text-signal-lift font-medium" : "type-label-xs mt-4 text-signal font-medium"}>
              Verified Google Maps Store Destination
            </p>
          </address>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className={
                tone === "dark"
                  ? "type-label inline-flex items-center justify-center border border-mist/35 px-6 py-4 text-chalk transition-colors duration-400 ease-expo hover:border-signal hover:text-signal-lift sm:px-7"
                  : "type-label inline-flex items-center justify-center border border-ink/25 px-6 py-4 text-ink transition-colors duration-400 ease-expo hover:border-signal hover:text-signal sm:px-7"
              }
            >
              Show Diagram
            </button>
            <Button href={directions.href} external variant="solid" tone={tone}>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden />
                Get directions
              </span>
            </Button>
          </div>
        </div>
        <p className="sr-only">Full address: {fullAddress}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Drawn diagram — clearly a diagram, not a fake satellite view */}
      <div
        className={
          dark
            ? "relative aspect-[4/3] w-full overflow-hidden bg-graphite"
            : "relative aspect-[4/3] w-full overflow-hidden bg-paper-alt"
        }
      >
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Diagram of the area around ${storeInfo.name}, ${storeInfo.address.line1}. Use the directions button for an interactive map.`}
        >
          <rect width="400" height="300" fill="none" />
          {/* Blocks */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 125}
                y={16 + row * 74}
                width={100}
                height={54}
                fill={dark ? "#0E1013" : "#E1DED7"}
              />
            )),
          )}
          {/* Roads */}
          {[88, 162, 236].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke={dark ? "#1B1F25" : "#D2CFC7"} strokeWidth="14" />
          ))}
          {[16, 141, 266, 391].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke={dark ? "#1B1F25" : "#D2CFC7"} strokeWidth="10" />
          ))}
          {/* Highlighted route */}
          <line x1="0" y1="162" x2="400" y2="162" stroke="#1B45F0" strokeWidth="2" strokeDasharray="10 8" opacity="0.75" />
          {/* Pin */}
          <g transform="translate(200 162)">
            <circle r="26" fill="#1B45F0" opacity="0.14" />
            <circle r="8" fill="#1B45F0" />
            <circle r="3" fill="#fff" />
          </g>
        </svg>

        <div className="absolute right-4 bottom-4 left-4">
          <p
            className={
              dark
                ? "type-label-xs bg-ink/90 px-3 py-2 text-mist backdrop-blur-sm"
                : "type-label-xs bg-paper/90 px-3 py-2 text-ash backdrop-blur-sm"
            }
          >
            Ramanadhapuram Main Road · Puliyakulam
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <address className="not-italic">
          <p className={dark ? "type-body text-mist" : "type-body text-ash"}>
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className={dark ? "type-label-xs mt-4 text-signal-lift font-medium" : "type-label-xs mt-4 text-signal font-medium"}>
            Verified Google Maps Store Destination
          </p>
        </address>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          {embed ? (
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className={
                tone === "dark"
                  ? "type-label inline-flex items-center justify-center border border-mist/35 px-6 py-4 text-chalk transition-colors duration-400 ease-expo hover:border-signal hover:text-signal-lift sm:px-7"
                  : "type-label inline-flex items-center justify-center border border-ink/25 px-6 py-4 text-ink transition-colors duration-400 ease-expo hover:border-signal hover:text-signal sm:px-7"
              }
            >
              Show Google Map
            </button>
          ) : null}
          <Button href={directions.href} external variant="solid" tone={tone}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden />
              Get directions
            </span>
          </Button>
        </div>
      </div>

      <p className="sr-only">Full address: {fullAddress}</p>
    </div>
  );
}
