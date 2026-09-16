import {
  GROWTH_RACE,
  GROWTH_RACE_MAX_YEARS,
  GROWTH_RACE_MAX_ARR,
} from "@/lib/arr/growth100";

/* SVG geometry */
const W = 1200;
const H = 630;
const PAD_L = 80;
const PAD_R = 210;
const PAD_T = 40;
const PAD_B = 64;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const x = (year: number) => PAD_L + (year / GROWTH_RACE_MAX_YEARS) * PLOT_W;
const y = (arrM: number) =>
  PAD_T + PLOT_H - (arrM / GROWTH_RACE_MAX_ARR) * PLOT_H;

const Y_TICKS = [0, 25, 50, 75, 100];
const X_TICKS = Array.from(
  { length: GROWTH_RACE_MAX_YEARS + 1 },
  (_, i) => i,
);

function linePath(points: { year: number; arrM: number }[]) {
  return points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${x(p.year).toFixed(1)},${y(p.arrM).toFixed(1)}`,
    )
    .join(" ");
}

/** Labels stacked on the right, ordered by speed. */
const bySpeed = [...GROWTH_RACE].sort((a, b) => a.yearsTo100M - b.yearsTo100M);
const LABEL_Y: Record<string, number> = Object.fromEntries(
  bySpeed.map((s, i) => [s.slug, PAD_T + 12 + i * 30]),
);

export function GrowthRaceChart() {
  return (
    <div
      className="overflow-hidden rounded-[24px] border bg-elev p-4 md:p-8"
      style={{
        borderColor: "var(--surface-stroke)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Line chart: years from $1M to $100M ARR for Lovable, Cursor, Anthropic, Wiz, ElevenLabs, OpenAI, Slack, Twilio and Shopify"
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="race-accent" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff8a5c" />
            <stop offset="100%" stopColor="#ff5c8a" />
          </linearGradient>
        </defs>

        {/* Grid + axes */}
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--surface-stroke)"
              strokeDasharray={t === 100 ? "6 6" : undefined}
              strokeWidth={1}
            />
            <text
              x={PAD_L - 12}
              y={y(t) + 4}
              textAnchor="end"
              fontSize={15}
              fill="var(--color-text-muted)"
            >
              {t === 0 ? "$0" : `$${t}M`}
            </text>
          </g>
        ))}
        {X_TICKS.map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - PAD_B + 28}
            textAnchor="middle"
            fontSize={15}
            fill="var(--color-text-muted)"
          >
            {t}
          </text>
        ))}
        <text
          x={PAD_L + PLOT_W / 2}
          y={H - 12}
          textAnchor="middle"
          fontSize={14}
          fill="var(--color-text-muted)"
        >
          Years since ~$1M ARR
        </text>
        <text
          x={18}
          y={PAD_T + PLOT_H / 2}
          textAnchor="middle"
          fontSize={14}
          fill="var(--color-text-muted)"
          transform={`rotate(-90 18 ${PAD_T + PLOT_H / 2})`}
        >
          $ ARR
        </text>

        {/* Series */}
        {GROWTH_RACE.map((s) => {
          const end = s.points[s.points.length - 1];
          const endX = x(end.year);
          const endY = y(end.arrM);
          const labelY = LABEL_Y[s.slug];
          return (
            <g key={s.slug}>
              <path
                d={linePath(s.points)}
                fill="none"
                stroke={
                  s.highlighted
                    ? "url(#race-accent)"
                    : "var(--color-text-secondary)"
                }
                strokeWidth={s.highlighted ? 5 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={s.highlighted ? 1 : s.detailed ? 0.75 : 0.4}
              />
              {/* dot at the $100M crossing */}
              <circle
                cx={endX}
                cy={endY}
                r={s.highlighted ? 5 : 3}
                fill={s.highlighted ? "#ff5c8a" : "var(--color-text-secondary)"}
                opacity={s.highlighted ? 1 : 0.6}
              />
              {/* dotted connector to the right-hand label */}
              <line
                x1={endX + 6}
                y1={endY}
                x2={W - PAD_R + 14}
                y2={labelY - 4}
                stroke="var(--color-text-muted)"
                strokeWidth={1}
                strokeDasharray="2 4"
                opacity={0.5}
              />
              <text
                x={W - PAD_R + 22}
                y={labelY}
                fontSize={s.highlighted ? 17 : 15}
                fontWeight={s.highlighted ? 700 : 500}
                fill={
                  s.highlighted ? "var(--accent)" : "var(--color-text-primary)"
                }
              >
                {s.name}
                <tspan
                  dx={8}
                  fontSize={13}
                  fontWeight={400}
                  fill="var(--color-text-muted)"
                >
                  {s.timeLabel}
                </tspan>
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-4 text-xs leading-relaxed text-foreground-subtle">
        Years from ~$1M to a $100M annualized run rate. Solid lines connect
        publicly reported intermediate milestones; straight baselines (Wiz,
        Anthropic, Slack, Twilio, Shopify) use the reported time to $100M only.
        Sources: Sacra, TechCrunch, Shearwater Capital, public filings.
      </p>
    </div>
  );
}
