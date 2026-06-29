import type { PricingCard } from "@/lib/compare/stripe";

export function PricingCompare({ cards }: { cards: PricingCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {cards.map((card) => {
        const isClink = card.accent === "clink";
        return (
          <article
            key={card.name}
            className="flex flex-col rounded-[28px] border bg-elev p-8"
            style={{
              borderColor: isClink
                ? "color-mix(in oklab, var(--accent) 35%, transparent)"
                : "var(--surface-stroke)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[24px] font-semibold tracking-[-0.01em]">
                {card.name}
              </h3>
              <span
                className="text-[11px] font-semibold uppercase text-foreground-subtle"
                style={{ letterSpacing: "0.16em" }}
              >
                {card.tagline}
              </span>
            </div>

            <div className="mt-7">
              <p
                className="text-[44px] font-semibold leading-none tracking-[-0.02em] md:text-[52px]"
                style={isClink ? { color: "var(--accent)" } : undefined}
              >
                {card.headline}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {card.headlineNote}
              </p>
            </div>

            <ul
              className="mt-7 divide-y"
              style={{ borderColor: "var(--surface-stroke)" }}
            >
              {card.lines.map((l) => (
                <li
                  key={l.label}
                  className="flex items-center justify-between py-3.5 text-[15px]"
                >
                  <span className="text-foreground-muted">{l.label}</span>
                  <span className="font-medium text-foreground">{l.value}</span>
                </li>
              ))}
            </ul>

            {card.footnote ? (
              <p className="mt-6 text-[13px] leading-relaxed text-foreground-subtle">
                {card.footnote}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
