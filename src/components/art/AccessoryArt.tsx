import { useId } from "react";

/* ═══════════════════════════════════════════════════════════════
   ACCESSORY ARTWORK
   ═══════════════════════════════════════════════════════════════
   Macro product renders drawn in the same material language as the
   devices — graphite bodies, silver edges, one cobalt detail.
   Replaced by real photography once available.
*/

export type AccessoryVariant =
  | "cases"
  | "protection"
  | "chargers"
  | "cables"
  | "audio"
  | "power";

const ALT: Record<AccessoryVariant, string> = {
  cases: "Vector illustration of a phone case with a raised camera bezel. Placeholder artwork.",
  protection: "Vector illustration of a screen protector sheet above a handset. Placeholder artwork.",
  chargers: "Vector illustration of a wall charger with folding pins. Placeholder artwork.",
  cables: "Vector illustration of a coiled charging cable with connectors. Placeholder artwork.",
  audio: "Vector illustration of wireless earbuds. Placeholder artwork.",
  power: "Vector illustration of a power bank with status indicators. Placeholder artwork.",
};

function Earbud({ x, y, rotate, uid }: { x: number; y: number; rotate: number; uid: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x={-26} y={-18} width={52} height={44} rx={22} fill={`url(#${uid}-shell)`} />
      <rect x={-14} y={14} width={28} height={62} rx={14} fill={`url(#${uid}-shell)`} />
      <rect x={-14} y={14} width={28} height={62} rx={14} fill="#000" opacity="0.18" />
      <circle cx={0} cy={2} r={15} fill="#07080A" />
      <circle cx={0} cy={2} r={15} fill="none" stroke="#fff" strokeOpacity="0.1" />
      <circle cx={-4} cy={-2} r={4} fill="#1B45F0" opacity="0.65" />
      <circle cx={-14} cy={62} r={7} fill="#fff" opacity="0.16" />
    </g>
  );
}

export function AccessoryArt({
  variant,
  className,
}: {
  variant: AccessoryVariant;
  className?: string;
}) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, "");
  const shell = `url(#${uid}-shell)`;
  const edge = `url(#${uid}-edge)`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={ALT[variant]}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uid}-shell`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#454C55" />
          <stop offset="45%" stopColor="#1A1D21" />
          <stop offset="100%" stopColor="#0C0E11" />
        </linearGradient>
        <linearGradient id={`${uid}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6E7783" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6E7783" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#AEBAC6" stopOpacity="0.28" />
          <stop offset="45%" stopColor="#5B7BFF" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#8E9AA6" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {variant === "cases" && (
        <g>
          <rect x={112} y={54} width={176} height={300} rx={40} fill={shell} />
          <rect
            x={112}
            y={54}
            width={176}
            height={300}
            rx={40}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.12"
          />
          <rect x={140} y={78} width={72} height={112} rx={26} fill="#050608" />
          <circle cx={162} cy={110} r={15} fill="#0B0E13" stroke="#fff" strokeOpacity="0.08" />
          <circle cx={192} cy={110} r={15} fill="#0B0E13" stroke="#fff" strokeOpacity="0.08" />
          <circle cx={162} cy={158} r={15} fill="#0B0E13" stroke="#fff" strokeOpacity="0.08" />
          <path
            d="M112 210 L288 118 L288 176 L112 268 Z"
            fill="#fff"
            opacity="0.04"
          />
          <rect x={148} y={312} width={104} height={5} rx={2.5} fill="#1B45F0" opacity="0.6" />
        </g>
      )}

      {variant === "protection" && (
        <g>
          <rect x={96} y={126} width={208} height={244} rx={30} fill="#0D0F12" />
          <rect
            x={96}
            y={126}
            width={208}
            height={244}
            rx={30}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.1"
          />
          <g transform="translate(0 -74)">
            <rect x={104} y={118} width={192} height={228} rx={28} fill={`url(#${uid}-glass)`} />
            <rect
              x={104}
              y={118}
              width={192}
              height={228}
              rx={28}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.22"
            />
            <path d="M104 200 L296 132" stroke="#fff" strokeOpacity="0.14" strokeWidth="2" />
            <circle cx={200} cy={144} r={9} fill="#050608" opacity="0.8" />
          </g>
          <circle cx={200} cy={196} r={58} fill="none" stroke="#1B45F0" strokeOpacity="0.3" />
          <circle cx={200} cy={196} r={58} fill="none" stroke="#1B45F0" strokeOpacity="0.12" strokeWidth="10" />
        </g>
      )}

      {variant === "chargers" && (
        <g>
          <path d="M132 176 L200 140 L268 176 L200 212 Z" fill="#3B424A" />
          <path d="M132 176 L200 212 L200 322 L132 286 Z" fill="#1A1E23" />
          <path d="M268 176 L200 212 L200 322 L268 286 Z" fill="#0E1013" />
          <path d="M132 176 L200 140 L268 176 L200 212 Z" fill="none" stroke="#fff" strokeOpacity="0.14" />
          <path d="M132 176 L200 212 L268 176" fill="none" stroke="#fff" strokeOpacity="0.08" />
          <rect x={158} y={112} width={8} height={44} rx={4} fill={edge} />
          <rect x={186} y={100} width={8} height={56} rx={4} fill={edge} />
          <rect x={214} y={112} width={8} height={44} rx={4} fill={edge} />
          <rect x={218} y={244} width={32} height={10} rx={5} fill="#1B45F0" opacity="0.7" />
          <path d="M132 236 L200 272" stroke="#fff" strokeOpacity="0.05" />
        </g>
      )}

      {variant === "cables" && (
        <g>
          {[58, 86, 114].map((r, i) => (
            <circle
              key={r}
              cx={200}
              cy={214}
              r={r}
              fill="none"
              stroke="#2C3138"
              strokeWidth={i === 1 ? 13 : 9}
            />
          ))}
          {[58, 86, 114].map((r, i) => (
            <circle
              key={`s${r}`}
              cx={200}
              cy={214}
              r={r}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.07"
              strokeWidth={i === 1 ? 3 : 2}
            />
          ))}
          <rect x={186} y={92} width={28} height={54} rx={12} fill={shell} />
          <rect x={186} y={92} width={28} height={54} rx={12} fill="none" stroke="#fff" strokeOpacity="0.14" />
          <rect x={194} y={70} width={12} height={26} rx={5} fill="#B9C2CC" />
          <rect x={194} y={70} width={12} height={9} rx={4} fill="#050608" />
          <rect x={188} y={322} width={24} height={48} rx={11} fill={shell} />
          <rect x={188} y={322} width={24} height={48} rx={11} fill="none" stroke="#fff" strokeOpacity="0.14" />
          <rect x={196} y={366} width={8} height={14} rx={4} fill="#B9C2CC" />
          <circle cx={200} cy={214} r={9} fill="#1B45F0" opacity="0.6" />
        </g>
      )}

      {variant === "audio" && (
        <g>
          <ellipse cx={200} cy={348} rx={116} ry={16} fill="#000" opacity="0.4" />
          <Earbud x={140} y={168} rotate={-16} uid={uid} />
          <Earbud x={266} y={172} rotate={14} uid={uid} />
          <rect x={132} y={296} width={136} height={54} rx={27} fill={shell} opacity="0.9" />
          <rect
            x={132}
            y={296}
            width={136}
            height={54}
            rx={27}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.1"
          />
          <rect x={166} y={318} width={68} height={4} rx={2} fill="#1B45F0" opacity="0.65" />
        </g>
      )}

      {variant === "power" && (
        <g>
          <rect x={104} y={104} width={192} height={204} rx={26} fill={shell} />
          <rect
            x={104}
            y={104}
            width={192}
            height={204}
            rx={26}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.13"
          />
          <rect x={140} y={140} width={120} height={96} rx={14} fill="#0A0C0F" />
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={158 + i * 24}
                y={182}
                width={14}
                height={6}
                rx={3}
                fill={i === 0 ? "#1B45F0" : "#3A4149"}
                opacity={i === 0 ? 0.9 : 1}
              />
            ))}
          </g>
          <rect x={176} y={268} width={48} height={14} rx={7} fill="#050608" />
          <path d="M104 244 L296 152" stroke="#fff" strokeOpacity="0.05" strokeWidth="2" />
          <rect x={140} y={94} width={60} height={12} rx={6} fill="#2C3138" />
        </g>
      )}
    </svg>
  );
}

/** Print-grain overlay. Sits above sections, never intercepts pointer events. */
export function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
