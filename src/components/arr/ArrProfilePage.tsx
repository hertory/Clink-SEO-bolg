import { TopNav, Footer } from "@/components/blog/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { BrandLogo } from "@/components/BrandLogo";
import type { ArrProfile } from "@/lib/arr/profiles";

const W = 1000;
const H = 340;
const PAD_L = 64;
const PAD_R = 20;
const PAD_T = 24;
const PAD_B = 44;

export function ArrProfilePage({ profile }: { profile: ArrProfile }) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "ARR Leaderboard", href: "/arr-leaderboard" },
          { label: profile.name },
        ]}
      />
      <Hero p={profile} />
      <ChartSection p={profile} />
      <SpeedSection p={profile} />
      <TimelineSection p={profile} />
      <FactsSection p={profile} />
      <ModelSection p={profile} />
      <FaqSection
        title={`${profile.name} Revenue, Answered.`}
        items={profile.faqs}
      />
      <FinalCta
        title={profile.ctaTitle}
        description={profile.ctaDescription}
        ctaLabel={profile.ctaLabel}
        ctaHref={profile.ctaHref}
      />
      <Footer />
    </div>
  );
}

function Hero({ p }: { p: ArrProfile }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero-glow)" }}
      />
      <div className="mx-auto max-w-[1080px] px-6 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="flex items-center gap-3">
          <BrandLogo name={p.name} domain={p.domain} size={44} />
          <p
            className="text-xs font-semibold uppercase text-foreground-subtle"
            style={{ letterSpacing: "0.18em" }}
          >
            ARR Leaderboard
          </p>
        </div>
        <h1
          className="mt-6 max-w-[880px] font-semibold leading-[1.06] tracking-[-0.02em]"
          style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
        >
          {p.h1}
        </h1>
        <p className="mt-6 max-w-[720px] text-lg leading-relaxed text-foreground-muted">
          {p.intro}
        </p>
        <div
          className="mt-10 grid gap-px overflow-hidden rounded-[24px] border sm:grid-cols-2 lg:grid-cols-4"
          style={{
            borderColor: "var(--surface-stroke)",
            background: "var(--surface-stroke)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {p.heroStats.map(([value, label]) => (
            <div key={label} className="bg-elev px-6 py-7">
              <p
                className="bg-clip-text text-3xl font-semibold tracking-[-0.02em] text-transparent md:text-[36px]"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                {value}
              </p>
              <p className="mt-2 text-sm leading-snug text-foreground-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChartSection({ p }: { p: ArrProfile }) {
  const data = p.milestones;
  const max = p.chartMax;
  const x = (i: number) =>
    PAD_L + ((W - PAD_L - PAD_R) * i) / (data.length - 1);
  const y = (v: number) => {
    const inner = H - PAD_T - PAD_B;
    return PAD_T + inner - (inner * v) / max;
  };
  const points = data.map((m, i) => `${x(i)},${y(m.arr)}`).join(" ");
  const area = `${PAD_L},${y(0)} ${points} ${x(data.length - 1)},${y(0)}`;
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));
  const barW = 14;
  const fmt = (v: number) =>
    v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}B` : `$${v}M`;

  return (
    <section className="mx-auto max-w-[1080px] px-6 pb-6">
      <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
        {p.chartTitle}
      </h2>
      <p className="mt-4 max-w-[680px] text-foreground-muted">{p.chartIntro}</p>

      <figure
        className="mt-8 overflow-hidden rounded-[24px] border bg-elev p-4 md:p-6"
        style={{
          borderColor: "var(--surface-stroke)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label={`Line chart of ${p.name} annualized revenue over time`}
        >
          <defs>
            <linearGradient id={`arrFill-${p.slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridLines.map((g) => (
            <g key={g}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={y(g)}
                y2={y(g)}
                stroke="var(--surface-stroke)"
                strokeWidth="1"
              />
              <text
                x={PAD_L - 12}
                y={y(g) + 4}
                textAnchor="end"
                fontSize="12"
                fill="currentColor"
                opacity="0.5"
              >
                {fmt(g)}
              </text>
            </g>
          ))}

          <polygon points={area} fill={`url(#arrFill-${p.slug})`} />

          {data.map((m, i) => (
            <rect
              key={`${m.label}-bar-${m.arr}`}
              x={x(i) - barW / 2}
              y={y(m.arr)}
              width={barW}
              height={Math.max(y(0) - y(m.arr), 2)}
              rx="3"
              fill="var(--accent)"
              opacity="0.18"
            />
          ))}

          <polyline
            points={points}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {data.map((m, i) => (
            <g key={`${m.label}-dot-${m.arr}`}>
              <circle
                cx={x(i)}
                cy={y(m.arr)}
                r="5"
                fill="var(--bg-elev, #fff)"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <title>{`${m.date} — ${fmt(m.arr)} ARR`}</title>
            </g>
          ))}

          {data.map((m, i) => (
            <text
              key={`${m.label}-tick-${m.arr}`}
              x={x(i)}
              y={H - 16}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
              opacity="0.5"
            >
              {m.label}
            </text>
          ))}
        </svg>
        <figcaption className="mt-3 text-xs text-foreground-subtle">
          {p.chartSources}
        </figcaption>
      </figure>
    </section>
  );
}

function SpeedSection({ p }: { p: ArrProfile }) {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {p.speed.map((s) => (
          <div
            key={s.label}
            className="rounded-[20px] border bg-elev px-6 py-6"
            style={{ borderColor: "var(--surface-stroke)" }}
          >
            <p className="text-sm text-foreground-muted">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-foreground-subtle">{s.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineSection({ p }: { p: ArrProfile }) {
  const fmt = (v: number) =>
    v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}B` : `$${v}M`;
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-12">
      <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
        Every Reported ARR Milestone.
      </h2>
      <ol className="relative mt-12 max-w-[760px]">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px"
          style={{ background: "var(--surface-stroke)" }}
        />
        {p.milestones.map((m, i) => {
          const isEdge = i === 0 || i === p.milestones.length - 1;
          return (
            <li
              key={`${m.date}-${m.arr}`}
              className="relative py-5 pl-10 first:pt-0 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute top-[9px] left-0 h-[15px] w-[15px] rounded-full"
                style={
                  isEdge
                    ? {
                        background: "var(--accent)",
                        boxShadow:
                          "0 0 0 5px color-mix(in srgb, var(--accent) 18%, transparent)",
                      }
                    : {
                        background: "var(--bg-elev, #fff)",
                        border: "3px solid var(--accent)",
                      }
                }
              />
              <p className="text-sm text-foreground-subtle">{m.date}</p>
              <p
                className="mt-1 bg-clip-text text-2xl font-semibold tracking-[-0.02em] text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                {fmt(m.arr)} ARR
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-foreground-muted">
                {m.note}{" "}
                <span className="text-foreground-subtle">— {m.source}</span>
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function FactsSection({ p }: { p: ArrProfile }) {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-12">
      <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
        {p.name} by the Numbers.
      </h2>
      <div
        className="mt-10 grid gap-px overflow-hidden rounded-[24px] border sm:grid-cols-2 lg:grid-cols-3"
        style={{
          borderColor: "var(--surface-stroke)",
          background: "var(--surface-stroke)",
        }}
      >
        {p.facts.map((f) => (
          <div key={f.label} className="bg-elev px-6 py-6">
            <p className="text-sm text-foreground-muted">{f.label}</p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.02em]">
              {f.value}
            </p>
            <p className="mt-1 text-xs text-foreground-subtle">{f.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ModelSection({ p }: { p: ArrProfile }) {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[36px] md:leading-[1.1]">
            {p.modelTitle}
          </h2>
          {p.modelParagraphs.map((t) => (
            <p
              key={t.slice(0, 24)}
              className="mt-5 text-[15px] leading-relaxed text-foreground-muted"
            >
              {t}
            </p>
          ))}
        </div>
        <div
          className="rounded-[24px] border bg-elev p-8"
          style={{
            borderColor: "var(--surface-stroke)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase text-foreground-subtle"
            style={{ letterSpacing: "0.18em" }}
          >
            Revenue Mix
          </p>
          <ul className="mt-6 space-y-5">
            {p.revenueMix.map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span>
                  <span className="text-[15px] font-medium">{t}</span>
                  <span className="mt-1 block text-sm text-foreground-muted">
                    {d}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
