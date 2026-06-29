import { Check, Minus, X } from "lucide-react";
import type { ComparisonRow } from "@/lib/compare/stripe";

function Cell({ value }: { value: string }) {
  if (value === "yes")
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
        aria-label="Yes"
      >
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  if (value === "no")
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-elev-2 text-foreground-subtle"
        aria-label="No"
      >
        <X className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  if (value === "partial")
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-elev-2 text-foreground-muted"
        aria-label="Partial"
      >
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  return (
    <span className="text-sm font-medium text-foreground">{value}</span>
  );
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div
      className="overflow-hidden rounded-[32px] border bg-elev"
      style={{
        borderColor: "var(--surface-stroke)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Header */}
      <div
        className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-4 border-b px-6 py-5 md:px-8"
        style={{ borderColor: "var(--surface-stroke)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
          Capability
        </p>
        <p className="text-center text-sm font-semibold text-foreground">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
              letterSpacing: "0.08em",
            }}
          >
            CLINK
          </span>
        </p>
        <p className="text-center text-sm font-semibold text-foreground">
          <span
            className="inline-block rounded-full bg-elev-2 px-3 py-1 text-xs text-foreground-muted"
            style={{ letterSpacing: "0.08em" }}
          >
            STRIPE
          </span>
        </p>
      </div>

      {/* Rows */}
      <ul className="divide-y" style={{ borderColor: "var(--surface-stroke)" }}>
        {rows.map((row) => (
          <li
            key={row.label}
            className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-4 px-6 py-5 md:px-8"
          >
            <div>
              <p className="text-[15px] font-medium text-foreground">
                {row.label}
              </p>
              {row.note ? (
                <p className="mt-1 text-[13px] leading-relaxed text-foreground-subtle">
                  {row.note}
                </p>
              ) : null}
            </div>
            <div className="flex justify-center text-center">
              <Cell value={row.clink} />
            </div>
            <div className="flex justify-center text-center">
              <Cell value={row.stripe} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
