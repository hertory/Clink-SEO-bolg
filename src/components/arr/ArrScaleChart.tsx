import { BrandLogo } from "@/components/BrandLogo";
import { ARR_COMPANIES } from "@/lib/arr/companies";

const byScale = [...ARR_COMPANIES].sort((a, b) => b.arrM - a.arrM);
const maxArrM = byScale[0]?.arrM ?? 1;
const minArrM = byScale[byScale.length - 1]?.arrM ?? 1;
const logMax = Math.log(maxArrM);
const logMin = Math.log(minArrM);

function barWidth(arrM: number) {
  // Log scale so a $65B outlier does not compress every $500M bar to a dot.
  const raw = ((Math.log(arrM) - logMin) / (logMax - logMin)) * 100;
  return Math.max(raw, 3);
}

export function ArrScaleChart() {
  return (
    <div
      className="overflow-hidden rounded-[24px] border bg-elev p-5 md:p-8"
      style={{
        borderColor: "var(--surface-stroke)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex flex-col gap-4">
        {byScale.map((c) => {
          const pct = barWidth(c.arrM);
          return (
            <div
              key={c.slug}
              className="grid items-center gap-3 md:grid-cols-[1.6fr_2.6fr_1fr]"
            >
              <div className="flex items-center gap-3">
                <BrandLogo name={c.name} domain={c.domain} size={32} />
                <div>
                  <p className="font-semibold leading-tight">{c.name}</p>
                  <p className="text-xs text-foreground-subtle">{c.asOf}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="relative h-2.5 flex-1 overflow-hidden rounded-full"
                  style={{ background: "var(--surface-stroke)" }}
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background:
                        c.slug === "lovable"
                          ? "linear-gradient(90deg, #ff8a5c, #ff5c8a)"
                          : "var(--accent)",
                    }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-lg font-semibold tracking-[-0.02em]"
                  style={{ color: "var(--accent)" }}
                >
                  {c.arrLabel}
                </p>
                <span
                  className="mt-0.5 inline-block rounded-full border px-2 py-0.5 text-[11px] text-foreground-subtle"
                  style={{ borderColor: "var(--surface-stroke)" }}
                >
                  {c.tier}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-foreground-subtle">
        Current reported annualized run rate, ranked from highest to lowest.
        Bar lengths use a log scale so smaller outliers remain visible next to
        $10B+ figures. Values are sourced from company disclosures and major
        outlets; Mercor is shown as gross annualized revenue before contractor
        payouts.
      </p>
    </div>
  );
}
