import type { Metadata } from "next";
import Link from "next/link";
import { Footer, TopNav } from "@/components/blog/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FinalCta } from "@/components/FinalCta";

const COMPETITORS = [
  {
    name: "Stripe",
    href: "/compare/stripe",
    blurb:
      "Honest, head-to-head: where Clink wins for AI-native SaaS, and where Stripe is still the right answer.",
  },
];

export const metadata: Metadata = {
  title: "Compare Clink — Payment Platform Comparisons",
  description:
    "Side-by-side comparisons between Clink and other payment platforms. Pricing, features, and honest pros and cons for AI-native SaaS.",
  openGraph: {
    title: "Compare Clink — Payment Platform Comparisons",
    description:
      "Side-by-side comparisons between Clink and other payment platforms.",
  },
  alternates: { canonical: "https://clink-ai.lovable.app/compare" },
};

export default function CompareIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Compare" }]}
      />
      <section className="mx-auto max-w-[1200px] px-6 pt-12 pb-10 md:pt-20">
        <p
          className="mb-5 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.22em" }}
        >
          COMPARE
        </p>
        <h1
          className="font-semibold leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          <span className="block text-foreground">How Clink Stacks Up</span>
        </h1>
        <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-foreground-muted">
          Honest, side-by-side comparisons against the payment platforms you're
          probably evaluating right now.
        </p>
      </section>
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPETITORS.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group rounded-[28px] border bg-elev p-7 transition-transform hover:-translate-y-1 md:p-8"
              style={{
                borderColor: "var(--surface-stroke)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase text-foreground-subtle"
                style={{ letterSpacing: "0.18em" }}
              >
                Clink vs
              </p>
              <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.01em] md:text-[30px]">
                {c.name}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
                {c.blurb}
              </p>
              <p
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--accent)" }}
              >
                Read comparison
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
      <FinalCta />
      <Footer />
    </div>
  );
}
