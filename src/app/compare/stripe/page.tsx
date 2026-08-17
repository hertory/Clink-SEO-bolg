import type { Metadata } from "next";
import Link from "next/link";
import { Footer, TopNav } from "@/components/blog/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { ComparisonTable } from "@/components/compare/ComparisonTable";
import { VerdictCard } from "@/components/compare/VerdictCard";
import { PricingCompare } from "@/components/compare/PricingCompare";
import { SplitRow } from "@/components/compare/SplitRow";
import { stripeCompare } from "@/lib/compare/stripe";

const CANONICAL = "https://clink-ai.lovable.app/compare/stripe";

const heroImageUrl = stripeCompare.hero.image.src;

export const metadata: Metadata = {
  title: "Clink vs Stripe (2026) — Honest Comparison",
  description:
    "Clink vs Stripe: 100+ local payment methods, MoR tax handling, usage-based billing, and smart routing — compared honestly against Stripe's strengths.",
  openGraph: {
    title: "Clink vs Stripe (2026) — Honest Comparison",
    description:
      "Side-by-side comparison: where Clink wins for AI-native SaaS, and where Stripe is still the better pick.",
    type: "article",
    url: CANONICAL,
    images: [{ url: heroImageUrl }],
  },
  twitter: {
    card: "summary_large_image",
    images: [heroImageUrl],
  },
  alternates: { canonical: CANONICAL },
};

export default function ClinkVsStripePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: "Stripe", href: "/compare/stripe" },
        ]}
      />
      <Hero />
      <Verdict />
      <Table />
      <Pricing />
      <DeepDive />
      <WhereStripeWins />
      <Migration />
      <FaqSection
        title="Clink vs Stripe, Answered."
        items={stripeCompare.faqs}
      />
      <ClosingCta />
      <Footer />
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: stripeCompare.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const h = stripeCompare.hero;
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero-glow)" }}
      />
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pt-16 pb-20 md:grid-cols-12 md:gap-16 md:pt-24 md:pb-28">
        <div className="md:col-span-6">
          <p
            className="mb-5 text-xs font-semibold uppercase text-foreground-subtle"
            style={{ letterSpacing: "0.22em" }}
          >
            {h.eyebrow}
          </p>
          <h1
            className="font-semibold leading-[1.04] tracking-[-0.02em]"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            <span className="block text-foreground">Clink vs</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-headline)" }}
            >
              Stripe
            </span>
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-foreground-muted">
            {h.deck}
          </p>
        </div>
        <div className="md:col-span-6">
          <div
            className="overflow-hidden rounded-[28px] border bg-elev"
            style={{
              borderColor: "var(--surface-stroke)",
              boxShadow: "var(--shadow-card)",
              aspectRatio: "1200 / 630",
            }}
          >
            <img
              src={h.image.src}
              alt="Abstract illustration of Clink and Stripe facing off"
              width={1216}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Verdict ---------- */
function Verdict() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          The verdict
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          Which One Should You Pick?
        </h2>
      </div>
      <VerdictCard
        clink={stripeCompare.verdict.pickClink}
        stripe={stripeCompare.verdict.pickStripe}
      />
    </section>
  );
}

/* ---------- Table ---------- */
function Table() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          At a glance
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          Capability by Capability
        </h2>
      </div>
      <ComparisonTable rows={stripeCompare.rows} />
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          Pricing
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          What You Actually Pay
        </h2>
        <p className="mx-auto mt-4 text-lg text-foreground-muted">
          Stripe's headline rate is per-transaction; the all-in cost depends
          on which add-ons you stack. Clink's MoR rate includes everything.
        </p>
      </div>
      <PricingCompare cards={stripeCompare.pricing} />
    </section>
  );
}

/* ---------- Deep dive ---------- */
function DeepDive() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <div className="mx-auto mb-14 max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          Feature deep-dive
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          Where the Platforms Diverge
        </h2>
      </div>
      <div className="space-y-20 md:space-y-28">
        {stripeCompare.splitRows.map((row, i) => (
          <SplitRow key={row.title} data={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Where Stripe wins ---------- */
function WhereStripeWins() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          Stripe's home turf
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          Where Stripe Is Still the Better Pick
        </h2>
        <p className="mx-auto mt-4 text-lg text-foreground-muted">
          We don't pretend to win every category. Here's where we'd
          point you to Stripe instead.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stripeCompare.whereStripeWins.map((c) => (
          <article
            key={c.title}
            className="rounded-[28px] border bg-elev p-7 md:p-8"
            style={{
              borderColor: "var(--surface-stroke)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] md:text-[22px]">
              {c.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              {c.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Migration ---------- */
function Migration() {
  const m = stripeCompare.migration;
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          Migration
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          {m.title}
        </h2>
      </div>
      <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {m.steps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-[28px] border bg-elev p-7"
            style={{
              borderColor: "var(--surface-stroke)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.01em] md:text-[22px]">
              {s.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Closing CTA ---------- */
function ClosingCta() {
  return <FinalCta />;
}
