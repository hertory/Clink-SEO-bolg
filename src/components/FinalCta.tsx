"use client";

type FinalCtaProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function FinalCta({
  title = "Ready to consolidate your payment stack?",
  description = "Talk to the Clink team about Global Payments, Smart Routing, Billing, and Clink for Claw — through a single API.",
  ctaLabel = "Discover Clink",
  ctaHref = "/contact",
}: FinalCtaProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20 md:pb-28">
      <div
        className="rounded-[32px] border bg-elev px-8 py-14 text-center md:px-12 md:py-20"
        style={{
          borderColor: "var(--surface-stroke)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-lg text-foreground-muted">
          {description}
        </p>
        <a
          href={ctaHref}
          className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium"
          style={{ color: "var(--accent)" }}
        >
          {ctaLabel}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}

export default FinalCta;
