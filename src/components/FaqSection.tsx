"use client";

export type FaqItem = { q: string; a: string };

/**
 * Site-wide FAQ section. Always placed immediately above the final CTA.
 * Single-open accordion using native <details>, divider between rows,
 * chevron on the right that rotates when open.
 */
export function FaqSection({
  eyebrow = "FAQ",
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[860px]">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[44px] md:leading-[1.08]">
          {title}
        </h2>

        <div
          className="mt-10 divide-y"
          style={{ borderColor: "var(--surface-stroke)" }}
        >
          {items.map((f, i) => (
            <details
              key={f.q}
              name="site-faq"
              className="group"
              style={{ borderColor: "var(--surface-stroke)" }}
              open={i === 0}
            >
              <summary
                className="flex cursor-pointer list-none items-center gap-6 py-6 text-left"
              >
                <span className="flex-1 text-lg font-medium text-foreground md:text-xl">
                  {f.q}
                </span>
                <svg
                  className="h-5 w-5 shrink-0 text-foreground-muted transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="pb-6 pr-10 text-[15px] leading-relaxed text-foreground-muted md:text-base">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <style>{`
        details > summary::-webkit-details-marker { display: none; }
        details > summary { list-style: none; }
      `}</style>
    </section>
  );
}
