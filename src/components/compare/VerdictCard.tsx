import { Check } from "lucide-react";

type Side = {
  title: string;
  points: string[];
};

export function VerdictCard({
  clink,
  stripe,
}: {
  clink: Side;
  stripe: Side;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Column side={clink} accent="clink" />
      <Column side={stripe} accent="stripe" />
    </div>
  );
}

function Column({
  side,
  accent,
}: {
  side: Side;
  accent: "clink" | "stripe";
}) {
  const isClink = accent === "clink";
  return (
    <article
      className="rounded-[28px] border bg-elev p-7 md:p-8"
      style={{
        borderColor: isClink
          ? "color-mix(in oklab, var(--accent) 35%, transparent)"
          : "var(--surface-stroke)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <p
        className="text-xs font-semibold uppercase"
        style={{
          letterSpacing: "0.18em",
          color: isClink ? "var(--accent)" : "var(--foreground-subtle)",
        }}
      >
        {isClink ? "CLINK" : "STRIPE"}
      </p>
      <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.01em] md:text-[26px]">
        {side.title}
      </h3>
      <ul className="mt-6 space-y-4">
        {side.points.map((p, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background: isClink
                  ? "var(--accent-soft)"
                  : "var(--background-elev-2)",
                color: isClink ? "var(--accent)" : "var(--foreground-muted)",
              }}
              aria-hidden
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-[15px] leading-relaxed text-foreground-muted">
              {p}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
