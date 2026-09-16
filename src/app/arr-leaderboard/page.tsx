import type { Metadata } from "next";
import { TopNav, Footer } from "@/components/blog/SiteChrome";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { ARR_COMPANIES } from "@/lib/arr/companies";
import { ArrLeaderboardInteractive } from "@/components/arr/ArrLeaderboardInteractive";

const CANONICAL = "https://clinkbill.com/arr-leaderboard";

const FAQS = [
  {
    q: "What does ARR mean on this leaderboard?",
    a: "ARR is annualized run rate — the most recent month or quarter of revenue multiplied out to a year, as disclosed by the company or reported by major outlets. It is a snapshot of momentum, not audited annual revenue.",
  },
  {
    q: "Where do the numbers come from?",
    a: "Every figure is a public company disclosure or reporting from outlets such as Bloomberg, TechCrunch, CNBC, Sacra and Sifted. Each entry names its source and the date the number was reported.",
  },
  {
    q: "How often is the leaderboard updated?",
    a: "Whenever a company on the list publicly discloses a new run-rate figure, or a new AI company crosses a reportable milestone with a credible source.",
  },
  {
    q: "Why is Lovable highlighted?",
    a: "Lovable holds the record for the fastest climb to $100M ARR in software history — 8 months from public launch — and we maintain a full sourced deep-dive page on its revenue trajectory.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The ARR Leaderboard: Fastest-Growing AI Companies",
  url: CANONICAL,
  itemListElement: ARR_COMPANIES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata: Metadata = {
  title: "The ARR Leaderboard: Fastest-Growing AI Companies (2026)",
  description:
    "Every publicly reported annualized revenue number for the fastest-growing AI companies — Anthropic, OpenAI, Cursor, ElevenLabs, Lovable and more — ranked, sourced and dated.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The ARR Leaderboard: Fastest-Growing AI Companies (2026)",
    description:
      "Anthropic, OpenAI, Cursor, ElevenLabs, Lovable — every public ARR figure, ranked and sourced.",
    url: CANONICAL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ArrLeaderboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Hero />
      <CriteriaSection />
      <ArrLeaderboardInteractive />
      <MethodNote />
      <FaqSection title="The Leaderboard, Answered." items={FAQS} />
      <FinalCta
        title="Building the Next Company on This List?"
        description="Clink adds checkout, subscriptions and merchant-of-record tax handling to any AI product — so revenue starts on day one."
        ctaLabel="See Clink for Lovable"
        ctaHref="/platforms/lovable"
      />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}

/* ---------- Inclusion criteria ---------- */

const CRITERIA: [string, string][] = [
  [
    "$50M+ ARR",
    "The latest reported annualized run rate has to be at least $50 million.",
  ],
  [
    "AI-native revenue",
    "Revenue comes from the AI product itself, not an AI feature bolted onto older software.",
  ],
  [
    "A named source",
    "Every figure carries a public source, a date and a tier: disclosed, reported or estimated.",
  ],
];

function CriteriaSection() {
  return (
    <section className="mx-auto max-w-[1080px] px-6 pb-10">
      <div className="grid gap-4 md:grid-cols-3">
        {CRITERIA.map(([title, body]) => (
          <div
            key={title}
            className="rounded-[20px] border bg-elev px-6 py-5"
            style={{ borderColor: "var(--surface-stroke)" }}
          >
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--accent)" }}
            >
              {title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero-glow)" }}
      />
      <div className="mx-auto max-w-[1080px] px-6 pt-14 pb-12 md:pt-20 md:pb-16">
        <p
          className="text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          ARR Leaderboard
        </p>
        <h1
          className="mt-6 max-w-[880px] font-semibold leading-[1.06] tracking-[-0.02em]"
          style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
        >
          The Fastest-Growing AI Companies, Ranked by Revenue.
        </h1>
        <p className="mt-6 max-w-[720px] text-lg leading-relaxed text-foreground-muted">
          Every publicly reported annualized run rate for the AI companies
          growing fastest — each figure sourced, dated and ranked. No estimates
          without a label, no numbers without a source.
        </p>
      </div>
    </section>
  );
}

/* ---------- Method note ---------- */

function MethodNote() {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-6">
      <div
        className="rounded-[20px] border bg-elev px-6 py-6"
        style={{ borderColor: "var(--surface-stroke)" }}
      >
        <p className="text-sm leading-relaxed text-foreground-muted">
          ARR figures are annualized run rates as disclosed by each company or
          reported by major outlets — a snapshot of momentum, not audited annual
          revenue. Definitions differ: Mercor&apos;s figure is gross annualized
          revenue before contractor payouts, Harvey&apos;s is annual recurring
          revenue, and entries tagged Estimated come from research firms rather
          than the company. Sources include Bloomberg, TechCrunch, CNBC, The
          Information, Sacra and Sifted. Companies below $50M, or without a
          verified public figure, are not listed.
        </p>
      </div>
    </section>
  );
}
