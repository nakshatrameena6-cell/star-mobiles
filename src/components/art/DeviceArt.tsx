import { useId } from "react";
import type { DeviceArtVariant } from "@/lib/data/catalog";

/* ═══════════════════════════════════════════════════════════════
   DEVICE ARTWORK
   ═══════════════════════════════════════════════════════════════
   Precisely drawn vector devices used until real product photography
   is supplied. Replace with `image` in catalog.ts as shots arrive —
   every consumer falls back to this automatically.

   Drawn in the brand's own material language: cool graphite bodies,
   silver edges, a single cobalt screen emission.
*/

type Geometry = {
  w: number;
  h: number;
  rx: number;
  /** Body gradient stops — each variant reads as a different material. */
  bodyFrom: string;
  bodyTo: string;
  edge: string;
};

const GEOMETRY: Record<DeviceArtVariant, Geometry> = {
  signature: {
    w: 326,
    h: 700,
    rx: 52,
    bodyFrom: "#3A4048",
    bodyTo: "#14171B",
    edge: "#5A626C",
  },
  camera: {
    w: 336,
    h: 720,
    rx: 54,
    bodyFrom: "#2E333A",
    bodyTo: "#101216",
    edge: "#4C545E",
  },
  value: {
    w: 318,
    h: 660,
    rx: 46,
    bodyFrom: "#33383F",
    bodyTo: "#121417",
    edge: "#525A64",
  },
  compact: {
    w: 296,
    h: 600,
    rx: 44,
    bodyFrom: "#3E444C",
    bodyTo: "#171A1E",
    edge: "#616A74",
  },
};

const VB_W = 400;
const VB_H = 800;

/** Four-point sparkle — the brand mark as geometry, not decoration. */
function StarMark({ cx, cy, size, fill }: { cx: number; cy: number; size: number; fill: string }) {
  const r = size;
  return (
    <path
      d={`M ${cx} ${cy - r} C ${cx + r * 0.14} ${cy - r * 0.14}, ${cx + r * 0.14} ${cy - r * 0.14}, ${cx + r} ${cy} C ${cx + r * 0.14} ${cy + r * 0.14}, ${cx + r * 0.14} ${cy + r * 0.14}, ${cx} ${cy + r} C ${cx - r * 0.14} ${cy + r * 0.14}, ${cx - r * 0.14} ${cy + r * 0.14}, ${cx - r} ${cy} C ${cx - r * 0.14} ${cy - r * 0.14}, ${cx - r * 0.14} ${cy - r * 0.14}, ${cx} ${cy - r} Z`}
      fill={fill}
    />
  );
}

function Lens({
  cx,
  cy,
  r,
  ring,
  glassFrom,
  glassTo,
}: {
  cx: number;
  cy: number;
  r: number;
  ring: string;
  glassFrom: string;
  glassTo: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 5} fill={ring} opacity="0.5" />
      <circle cx={cx} cy={cy} r={r + 3} fill="#0A0B0D" />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${glassFrom})`} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill={glassTo} opacity="0.85" />
      <circle
        cx={cx - r * 0.34}
        cy={cy - r * 0.38}
        r={r * 0.2}
        fill="#fff"
        opacity="0.32"
      />
    </g>
  );
}

type Props = {
  variant?: DeviceArtVariant;
  side?: "front" | "back";
  /** Rendered label. Must describe what the image actually shows. */
  alt?: string;
  className?: string;
  /** Screen emission. Off for back views. */
  lit?: boolean;
  priority?: boolean;
};

export function DeviceArt({
  variant = "signature",
  side = "front",
  alt,
  className,
  lit = true,
}: Props) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, "");

  const geo = GEOMETRY[variant];
  const bx = (VB_W - geo.w) / 2;
  const by = (VB_H - geo.h) / 2;

  const bodyId = `body-${uid}`;
  const sheenId = `sheen-${uid}`;
  const glassId = `glass-${uid}`;
  const screenId = `screen-${uid}`;
  const glowId = `glow-${uid}`;
  const bodyClipId = `bodyclip-${uid}`;
  const screenClipId = `screenclip-${uid}`;

  const bezel = 9;
  const sx = bx + bezel;
  const sy = by + bezel;
  const sw = geo.w - bezel * 2;
  const sh = geo.h - bezel * 2;
  const srx = geo.rx - bezel;

  const cameraLenses = {
    signature: [
      { cx: bx + 92, cy: by + 96, r: 30 },
      { cx: bx + 92, cy: by + 180, r: 30 },
      { cx: bx + 92, cy: by + 264, r: 30 },
    ],
    camera: [
      { cx: bx + 100, cy: by + 100, r: 34 },
      { cx: bx + 100, cy: by + 196, r: 34 },
      { cx: bx + 224, cy: by + 100, r: 26 },
    ],
    value: [
      { cx: bx + 88, cy: by + 92, r: 28 },
      { cx: bx + 168, cy: by + 92, r: 28 },
    ],
    compact: [{ cx: bx + 86, cy: by + 90, r: 30 }],
  } satisfies Record<DeviceArtVariant, { cx: number; cy: number; r: number }[]>;

  const lenses = cameraLenses[variant];

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={className}
      role="img"
      aria-label={
        alt ??
        `Vector placeholder illustration of a smartphone, ${side} view. Replace with product photography.`
      }
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={bodyId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={geo.bodyFrom} />
          <stop offset="42%" stopColor={geo.bodyTo} />
          <stop offset="100%" stopColor="#0B0D10" />
        </linearGradient>

        <linearGradient id={sheenId} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="38%" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={glassId} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#3C4A5C" />
          <stop offset="55%" stopColor="#0D1117" />
          <stop offset="100%" stopColor="#05070A" />
        </radialGradient>

        <linearGradient id={screenId} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#0C1017" />
          <stop offset="55%" stopColor="#06080C" />
          <stop offset="100%" stopColor="#04050A" />
        </linearGradient>

        <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#1B45F0" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#1B45F0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1B45F0" stopOpacity="0" />
        </radialGradient>

        <clipPath id={bodyClipId}>
          <rect x={bx} y={by} width={geo.w} height={geo.h} rx={geo.rx} />
        </clipPath>

        <clipPath id={screenClipId}>
          <rect x={sx} y={sy} width={sw} height={sh} rx={srx} />
        </clipPath>
      </defs>

      {/* Contact shadow — grounds the device without a glow blob */}
      <ellipse
        cx={VB_W / 2}
        cy={by + geo.h + 6}
        rx={geo.w * 0.42}
        ry={14}
        fill="#000"
        opacity="0.42"
      />

      {/* Body */}
      <rect
        x={bx}
        y={by}
        width={geo.w}
        height={geo.h}
        rx={geo.rx}
        fill={`url(#${bodyId})`}
      />

      {/* Side controls */}
      <g opacity="0.85">
        <rect x={bx + geo.w - 1} y={by + 190} width={4} height={56} rx={2} fill={geo.edge} opacity="0.6" />
        <rect x={bx + geo.w - 1} y={by + 262} width={4} height={56} rx={2} fill={geo.edge} opacity="0.6" />
        <rect x={bx - 3} y={by + 236} width={4} height={84} rx={2} fill={geo.edge} opacity="0.45" />
      </g>

      {side === "back" ? (
        <>
          {/* Camera module */}
          <g>
            {variant === "camera" ? (
              <>
                <rect
                  x={bx + 46}
                  y={by + 46}
                  width={geo.w - 92}
                  height={geo.w - 92}
                  rx={42}
                  fill="#0D0F12"
                  stroke={geo.edge}
                  strokeOpacity="0.4"
                />
                <rect
                  x={bx + 60}
                  y={by + 60}
                  width={34}
                  height={geo.w - 116}
                  rx={17}
                  fill="#050608"
                />
              </>
            ) : (
              <rect
                x={lenses[0].cx - (variant === "value" ? 56 : 54)}
                y={by + 44}
                width={variant === "value" ? 132 : 108}
                height={variant === "value" ? 96 : 268}
                rx={34}
                fill="#0D0F12"
                stroke={geo.edge}
                strokeOpacity="0.38"
              />
            )}

            {lenses.map((l, i) => (
              <Lens
                key={i}
                cx={l.cx}
                cy={l.cy}
                r={l.r}
                ring={geo.edge}
                glassFrom={glassId}
                glassTo="#0A0E14"
              />
            ))}

            {/* Flash */}
            <circle
              cx={variant === "value" ? bx + geo.w - 76 : bx + 236}
              cy={by + (variant === "value" ? 62 : 84)}
              r={9}
              fill="#F0E4C8"
              opacity="0.5"
            />
          </g>

          {/* Bare-metal sheen across the back glass */}
          <g clipPath={`url(#${bodyClipId})`}>
            <path
              d={`M ${bx - 40} ${by + geo.h * 0.1} L ${bx + geo.w * 0.7} ${by - 40} L ${bx + geo.w * 1.1} ${by + geo.h * 0.28} L ${bx} ${by + geo.h * 0.5} Z`}
              fill={`url(#${sheenId})`}
            />
            <path
              d={`M ${bx + geo.w * 0.45} ${by + geo.h} L ${bx + geo.w} ${by + geo.h * 0.55} L ${bx + geo.w} ${by + geo.h} Z`}
              fill="#fff"
              opacity="0.035"
            />
          </g>

          {/* Etched wordmark */}
          <g opacity="0.32">
            <text
              x={VB_W / 2}
              y={by + geo.h * 0.72}
              textAnchor="middle"
              fill="#fff"
              fontFamily="var(--font-display), sans-serif"
              fontSize="17"
              letterSpacing="7"
              fontWeight="500"
            >
              STAR
            </text>
          </g>
        </>
      ) : (
        <>
          {/* Screen */}
          <rect x={sx} y={sy} width={sw} height={sh} rx={srx} fill="#04050700" />
          <g clipPath={`url(#${screenClipId})`}>
            <rect x={sx} y={sy} width={sw} height={sh} fill={`url(#${screenId})`} />

            {lit && (
              <>
                <ellipse
                  cx={sx + sw * 0.5}
                  cy={sy + sh * 0.74}
                  rx={sw * 0.62}
                  ry={sh * 0.26}
                  fill={`url(#${glowId})`}
                />
                <path
                  d={`M ${sx - 10} ${sy + sh * 0.55} Q ${sx + sw * 0.5} ${sy + sh * 0.34}, ${sx + sw + 10} ${sy + sh * 0.52}`}
                  stroke="#5B7BFF"
                  strokeOpacity="0.28"
                  strokeWidth="1.5"
                  fill="none"
                />
                <StarMark
                  cx={sx + sw * 0.5}
                  cy={sy + sh * 0.4}
                  size={26}
                  fill="#5B7BFF"
                />
              </>
            )}

            {/* Status hairline + clock stand-in */}
            <rect
              x={sx + 26}
              y={sy + 22}
              width={sw * 0.22}
              height={4}
              rx={2}
              fill="#fff"
              opacity="0.14"
            />

            {/* Gesture bar */}
            <rect
              x={VB_W / 2 - 46}
              y={sy + sh - 34}
              width={92}
              height={4}
              rx={2}
              fill="#fff"
              opacity="0.26"
            />
          </g>

          {/* Punch-hole selfie camera */}
          <circle cx={VB_W / 2} cy={sy + 30} r={9} fill="#020304" />
          <circle
            cx={VB_W / 2}
            cy={sy + 30}
            r={9}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.08"
          />

          {/* Glass reflection sweep */}
          <g clipPath={`url(#${screenClipId})`}>
            <path
              d={`M ${sx - 60} ${sy + sh * 0.02} L ${sx + sw * 0.46} ${sy - 40} L ${sx + sw * 0.78} ${sy - 40} L ${sx - 60} ${sy + sh * 0.34} Z`}
              fill="#fff"
              opacity="0.055"
            />
          </g>
        </>
      )}

      {/* Outer edge light */}
      <rect
        x={bx + 0.5}
        y={by + 0.5}
        width={geo.w - 1}
        height={geo.h - 1}
        rx={geo.rx}
        fill="none"
        stroke={geo.edge}
        strokeOpacity="0.55"
      />
      <rect
        x={bx + 2.5}
        y={by + 2.5}
        width={geo.w - 5}
        height={geo.h - 5}
        rx={geo.rx - 2}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.06"
      />
    </svg>
  );
}

/**
 * Macro crop of a camera module — the "detail" shot in the art direction.
 * Used as a full-bleed editorial panel between sections.
 */
export function LensMacro({ className, id = "macro" }: { className?: string; id?: string }) {
  const raw = useId();
  const uid = `${id}${raw.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Macro illustration of a smartphone camera lens assembly. Placeholder artwork."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`${uid}-ring`} cx="0.34" cy="0.28" r="0.85">
          <stop offset="0%" stopColor="#5C6773" />
          <stop offset="48%" stopColor="#1B1F25" />
          <stop offset="100%" stopColor="#07080A" />
        </radialGradient>
        <radialGradient id={`${uid}-glass`} cx="0.38" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#25384D" />
          <stop offset="46%" stopColor="#0A0F16" />
          <stop offset="100%" stopColor="#030407" />
        </radialGradient>
        <linearGradient id={`${uid}-flare`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#5B7BFF" stopOpacity="0" />
          <stop offset="52%" stopColor="#5B7BFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#5B7BFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="600" height="600" fill="#0A0B0E" />
      <circle cx="300" cy="300" r="292" fill={`url(#${uid}-ring)`} />
      <circle cx="300" cy="300" r="292" fill="none" stroke="#fff" strokeOpacity="0.08" />
      <circle cx="300" cy="300" r="258" fill="none" stroke="#fff" strokeOpacity="0.06" />
      <circle cx="300" cy="300" r="228" fill="#08090C" />
      <circle cx="300" cy="300" r="212" fill="none" stroke="#fff" strokeOpacity="0.05" />
      <circle cx="300" cy="300" r="182" fill={`url(#${uid}-glass)`} />
      <circle cx="300" cy="300" r="182" fill="none" stroke="#fff" strokeOpacity="0.09" />
      <circle cx="300" cy="300" r="96" fill="#05070B" />
      <circle cx="242" cy="238" r="40" fill="#fff" opacity="0.09" />
      <circle cx="356" cy="366" r="18" fill="#5B7BFF" opacity="0.2" />
      <path d="M60 520 Q300 400 540 96" stroke={`url(#${uid}-flare)`} strokeWidth="2" fill="none" />
      <path d="M40 560 Q300 430 560 130" stroke={`url(#${uid}-flare)`} strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}
