"use client";

import { useState } from "react";
import Link from "next/link";
import { ARR_COMPANIES } from "@/lib/arr/companies";
import { BrandLogo } from "@/components/BrandLogo";
import { GrowthRaceChart } from "@/components/arr/GrowthRaceChart";
import { ArrScaleChart } from "@/components/arr/ArrScaleChart";

const byScale = [...ARR_COMPANIES].sort((a, b) => b.arrM - a.arrM);
const byVelocity = [...ARR_COMPANIES].sort(
  (a, b) => (a.monthsTo100M ?? 999) - (b.monthsTo100M ?? 999) || b.arrM - a.arrM,
);

const TRACKS: [Track, string][] = [
  ["scale", "Ranked by ARR"],
  ["velocity", "Ranked by speed to $100M"],
];

type Track = "scale" | "velocity";
type ChartTrack = "race" | "scale";

const CHART_TRACKS: [ChartTrack, string][] = [
  ["race", "Fastest $1M → $100M"],
  ["scale", "Ranked by ARR"],
];

export function ArrLeaderboardInteractive() {
  const [track, setTrack] = useState<Track>("scale");
  const [chartTrack, setChartTrack] = useState<ChartTrack>("race");
  return (
    <>
      <LeaderboardSection track={track} onTrackChange={setTrack} />
      <SpeedSection track={chartTrack} onTrackChange={setChartTrack} />
    </>
  );
}

/* ---------- Leaderboard ---------- */

function LeaderboardSection({
  track,
  onTrackChange,
}: {
  track: Track;
  onTrackChange: (t: Track) => void;
}) {
  const rows = track === "scale" ? byScale : byVelocity;
  return (
    <section className="mx-auto max-w-[1080px] px-6 pb-6">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {TRACKS.map(([value, label]) => {
          const active = track === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onTrackChange(value)}
              className="relative z-10 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              style={{
                borderColor: active ? "var(--accent)" : "var(--surface-stroke)",
                color: active ? "var(--accent)" : "var(--foreground-muted)",
                background: active ? "var(--elev)" : "transparent",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div
        className="overflow-hidden rounded-[24px] border bg-elev"
        style={{
          borderColor: "var(--surface-stroke)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          className="hidden grid-cols-[56px_1.4fr_1fr_1fr_1fr_1fr] gap-4 border-b px-6 py-4 text-xs font-semibold uppercase text-foreground-subtle md:grid"
          style={{
            borderColor: "var(--surface-stroke)",
            letterSpacing: "0.12em",
          }}
        >
          <span>#</span>
          <span>Company</span>
          <span>Reported ARR</span>
          <span>$100M In</span>
          <span>Valuation</span>
          <span>As Of</span>
        </div>
        {rows.map((c, i) => {
          const row = (
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-6 py-5 transition-colors hover:bg-background md:grid-cols-[56px_1.4fr_1fr_1fr_1fr_1fr] md:items-center">
              <p className="text-lg font-semibold text-foreground-subtle">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-3">
                <BrandLogo name={c.name} domain={c.domain} size={32} />
                <div>
                  <p className="font-semibold leading-tight">{c.name}</p>
                  {c.detailHref && (
                    <p className="text-xs" style={{ color: "var(--accent)" }}>
                      Full revenue deep-dive →
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p
                  className="text-xl font-semibold tracking-[-0.02em]"
                  style={{ color: "var(--accent)" }}
                >
                  {c.arrLabel}
                </p>
                {c.basisNote && (
                  <p className="mt-1 text-xs text-foreground-subtle">
                    Gross run rate
                  </p>
                )}
              </div>
              <p className="text-sm text-foreground-muted">
                {c.monthsTo100M
                  ? `${c.monthsTo100M} months`
                  : (c.growthLabel ?? "—")}
              </p>
              <p className="text-sm text-foreground-muted">
                {c.valuation ?? "—"}
              </p>
              <div>
                <p className="text-sm text-foreground-subtle">{c.asOf}</p>
                <span
                  className="mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] text-foreground-subtle"
                  style={{ borderColor: "var(--surface-stroke)" }}
                >
                  {c.tier}
                </span>
              </div>
            </div>
          );
          return c.detailHref ? (
            <Link
              key={c.slug}
              href={c.detailHref}
              className="block border-b last:border-b-0"
              style={{ borderColor: "var(--surface-stroke)" }}
            >
              {row}
            </Link>
          ) : (
            <div
              key={c.slug}
              className="border-b last:border-b-0"
              style={{ borderColor: "var(--surface-stroke)" }}
            >
              {row}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Fastest $1M → $100M ---------- */

function SpeedSection({
  track,
  onTrackChange,
}: {
  track: ChartTrack;
  onTrackChange: (t: ChartTrack) => void;
}) {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
            Fastest $1M → $100M.
          </h2>
          <p className="mt-4 max-w-[680px] text-foreground-muted">
            {track === "race"
              ? "Years from roughly $1M to a $100M annualized run rate, drawn from public disclosures. AI-native companies have collapsed a journey that took the best SaaS companies of the last decade three to seven years — Lovable did it in about seven months, the fastest on record."
              : "Current reported annualized run rate for every company on the leaderboard. Anthropic and OpenAI operate at a different scale, while the next generation of AI-native companies is climbing toward $1B ARR."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:pt-2">
          {CHART_TRACKS.map(([value, label]) => {
            const active = track === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onTrackChange(value)}
                className="relative z-10 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  borderColor: active ? "var(--accent)" : "var(--surface-stroke)",
                  color: active ? "var(--accent)" : "var(--foreground-muted)",
                  background: active ? "var(--elev)" : "transparent",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-10">
        {track === "race" ? <GrowthRaceChart /> : <ArrScaleChart />}
      </div>
    </section>
  );
}
