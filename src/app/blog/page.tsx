import type { Metadata } from "next";
import { Footer, TopNav } from "@/components/blog/SiteChrome";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FinalCta } from "@/components/FinalCta";
import { getAllPosts } from "@/lib/blog-server";
import type { BlogPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Payment Infrastructure & Agent Payments Blog",
  description:
    "Guides and analysis on payment infrastructure, subscription billing, smart routing, and the agent economy — from the team building Clink.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Payment Infrastructure & Agent Payments Insights | Clink",
    description:
      "Guides and analysis on payment infrastructure, subscription billing, smart routing, and the agent economy — from the team building Clink.",
    url: "/blog",
  },
};

/** Reader-intent sections: merge the 8 content clusters into 4 browsing groups. */
const SECTIONS: { id: string; title: string; blurb: string; slugs: string[] }[] = [
  {
    id: "agent-payments",
    title: "Agent Payments & Wallets",
    blurb: "Agent wallets, payment protocols, and where agents can pay today.",
    slugs: [
      "agent-payments",
      "clink-launches-agent-wallet",
      "what-is-ai-agent-wallet",
      "ai-agent-payments-infrastructure",
      "ai-agent-spending-limits",
      "clink-wallet-vs-cloudflare-wallets",
      "clink-and-visa-partner-on-intelligent-commerce",
      "what-is-ap2-agent-payments-protocol",
      "what-is-x402",
      "what-is-machine-payments-protocol",
      "what-is-agentic-commerce-protocol",
      "what-is-universal-commerce-protocol",
      "how-to-sell-on-chatgpt",
      "agentic-commerce-agent-channels",
      "agentic-commerce-merchant-stack-cms",
      "agentic-commerce-merchant-stack-psp",
      "cloudflare-wallets-agent-payments",
      "stripe-openrouter-acquisition",
    ],
  },
  {
    id: "payments-billing",
    title: "Payments & Billing",
    blurb: "Payment models, merchant-of-record choices, and product guides.",
    slugs: [
      "what-is-clink",
      "mor-vs-psp",
      "smart-routing",
      "pay-by-link",
      "what-is-skill-marketplace",
      "clink-launches-skill-marketplace",
      "best-ai-companies-by-arr",
      "fastest-growing-ai-companies-arr",
      "how-to-add-payments-lovable-app",
      "integrate-stripe-lovable",
      "how-to-add-payments-bolt-app",
      "how-to-add-payments-v0-app",
      "how-to-add-payments-replit-app",
    ],
  },
  {
    id: "stripe-risk",
    title: "Stripe Risk",
    blurb: "Disputes, chargebacks, account restrictions — and how to respond.",
    slugs: [
      "what-is-stripe-dispute",
      "how-to-dispute-stripe-charge",
      "stripe-chargeback-prevention",
      "stripe-account-suspended",
      "why-stripe-closes-accounts",
      "how-to-appeal-stripe-account-closure",
    ],
  },
  {
    id: "metrics",
    title: "Metrics Glossary",
    blurb: "The SaaS finance metrics behind recurring revenue.",
    slugs: [
      "burn-rate",
      "annual-recurring-revenue",
      "monthly-recurring-revenue",
      "net-revenue-retention",
      "runway",
    ],
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts(); // already sorted by date desc
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  // Featured slot: the Agent Wallet launch announcement (series anchor).
  const featured =
    bySlug.get("clink-launches-agent-wallet") ?? posts[0];

  const sections = SECTIONS.map((s) => ({
    ...s,
    posts: s.slugs
      .filter((slug) => slug !== featured.slug)
      .map((slug) => bySlug.get(slug))
      .filter((p): p is BlogPost => Boolean(p)),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]}
      />

      {/* Hero — masthead grid-line band */}
      <section
        className="border-b"
        style={{
          borderColor: "var(--reader-line)",
          backgroundImage:
            "linear-gradient(90deg, transparent calc(25% - 1px), rgba(23,23,25,.045) 25%, transparent calc(25% + 1px)), linear-gradient(90deg, transparent calc(75% - 1px), rgba(23,23,25,.045) 75%, transparent calc(75% + 1px))",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--reader-coral)" }}
          >
            The Clink Journal
          </p>
          <h1
            className="mt-5 max-w-[820px] font-semibold text-foreground"
            style={{
              fontSize: "clamp(34px, 4.5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontFamily: "var(--font-manrope), Inter, sans-serif",
              textWrap: "balance",
            }}
          >
            Field notes on payment infrastructure, billing, and the agent
            economy.
          </h1>
          <p
            className="mt-5 max-w-[640px] text-[19px] leading-[1.6]"
            style={{ color: "var(--reader-ink-2)" }}
          >
            Long-form essays and product deep-dives from the team building
            Clink.
          </p>
        </div>
      </section>

      {/* Section anchor nav */}
      <nav
        className="border-b bg-white"
        style={{ borderColor: "var(--reader-line)" }}
        aria-label="Browse topics"
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm transition-colors hover:text-[#ef6e7d]"
              style={{ color: "var(--reader-ink)" }}
            >
              {s.title}
            </a>
          ))}
          <a
            href="/arr-leaderboard"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#ef6e7d]"
            style={{ color: "var(--reader-coral)" }}
          >
            ARR Leaderboard
            <span aria-hidden>↗</span>
          </a>
        </div>
      </nav>

      {/* Featured lead card */}
      <section
        className="mx-auto max-w-[1200px] px-6 pt-12"
        aria-label="Featured article"
      >
        <a
          href={`/blog/${featured.slug}`}
          className="group block rounded-[20px] border bg-white p-8 transition-all hover:-translate-y-0.5 md:p-10"
          style={{
            borderColor: "var(--reader-line)",
            boxShadow: "var(--shadow-float-2)",
          }}
        >
          <div
            className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--reader-coral)" }}
          >
            <span>Featured</span>
            <span>·</span>
            <span>{featured.category}</span>
            <span>·</span>
            <span>{formatDate(featured.date)}</span>
          </div>
          <h2
            className="mt-4 max-w-[860px] font-semibold text-foreground"
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-manrope), Inter, sans-serif",
            }}
          >
            {featured.title}
          </h2>
          <p
            className="mt-4 max-w-[680px] text-[17px] leading-relaxed"
            style={{ color: "var(--reader-ink-2)" }}
          >
            {featured.description}
          </p>
          <span
            className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium"
            style={{ color: "var(--reader-coral)" }}
          >
            Read the announcement
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </a>
      </section>

      {/* Topic sections */}
      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-16">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24 pb-16 last:pb-0">
            <div
              className="flex flex-wrap items-baseline justify-between gap-2 border-t pt-8"
              style={{ borderColor: "var(--reader-line)" }}
            >
              <h2
                className="text-[24px] md:text-[28px] font-semibold text-foreground"
                style={{
                  fontFamily: "var(--font-manrope), Inter, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.title}
              </h2>
              <span className="text-sm" style={{ color: "var(--reader-ink-3)" }}>
                {s.blurb}
              </span>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {s.posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <FinalCta />
      <Footer />
    </div>
  );
}
