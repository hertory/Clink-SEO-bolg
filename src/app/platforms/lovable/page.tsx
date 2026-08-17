import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import clawAvatar from "@/assets/clink/claw-avatar.svg";

export const metadata: Metadata = {
  title: "Add Payments to Your Lovable App — Clink",
  description:
    "Ship global payments inside your Lovable app with Clink. Merchant-of-Record coverage, smart routing, subscription billing, and an agent-ready integration skill — from prompt to revenue.",
  openGraph: {
    title: "Add Payments to Your Lovable App — Clink",
    description:
      "From prompt to global revenue. Clink brings MoR payments, smart routing, and subscription billing to apps built with Lovable.",
  },
};

/* ---------- Data ---------- */

const WHY_CARDS = [
  {
    title: "Stay in the Chat",
    body: "Prompt Lovable to add Clink and the agent wires checkout, webhooks, and a customer portal — no SDK archaeology, no leaving the editor.",
  },
  {
    title: "Merchant of Record",
    body: "Clink is the seller of record on every transaction. Global VAT, GST, sales tax, refunds, and chargebacks are handled for you.",
  },
  {
    title: "Your Data Stays Portable",
    body: "Bring your own Stripe, Adyen, or Checkout.com keys. Clink orchestrates them — no proprietary lock-in, no rewrites when you swap PSPs.",
  },
];

const PROMPTS = [
  "Add Clink payments with a $29/mo Pro plan.",
  "Set up a Clink checkout for my $197 digital course.",
  "Add Starter $9, Pro $29, Enterprise $99 tiers with a 14-day trial.",
];

const STEPS = [
  {
    title: "Prompt Lovable to Add Clink",
    body: "Open your project, ask Lovable to add Clink, and the agent installs the integration skill, scaffolds the checkout, and creates webhook routes for you.",
  },
  {
    title: "Activate Your Clink Account",
    body: "Online onboarding with a streamlined KYC. A Chinese-speaking team supports you on WeChat or Feishu — most merchants go live in 1–2 business days.",
  },
  {
    title: "Define Your Catalog in Chat",
    body: "Subscriptions, one-time products, or hybrid usage-based pricing. Change tiers, trials, or promo codes by prompting Lovable again.",
  },
  {
    title: "Test Inside the Lovable Preview",
    body: "Sandbox keys are wired automatically. Run buy, renew, cancel, failed-renewal, and trial-to-paid flows before you ever take a real card.",
  },
  {
    title: "Flip to Live, Ship Globally",
    body: "Switch the environment toggle. Clink takes over cross-border tax, fraud screening, and payouts — your Lovable code does not change.",
  },
];

const CHECKLIST = [
  "Publish privacy policy, terms, and refund policy",
  "Publish at least one product with a live price",
  "Complete KYC / KYB with Clink",
  "Submit your live domain for review",
  "Connect your payout bank account",
  "Flip the test → live toggle",
];

const FAQS = [
  {
    q: "Does Lovable have built-in payment processing?",
    a: "Lovable generates React + Supabase code but does not process payments itself. Clink is the payments layer — prompt Lovable to add it and you get checkout, subscriptions, tax, and a customer portal end-to-end.",
  },
  {
    q: "Why Clink instead of going direct to Stripe?",
    a: "Stripe is a payment gateway; you still own tax registration, dunning, invoicing, multi-PSP routing, and chargeback ops. Clink is a Merchant of Record that wraps all of it — and lets you bring your own Stripe keys for orchestration.",
  },
  {
    q: "Can I bring my own PSP keys?",
    a: "Yes. Mount Stripe, Adyen, Checkout.com, Airwallex, or PayPal credentials in Clink and route traffic by issuer country, currency, and method. You keep your processor relationships; we add the routing layer.",
  },
  {
    q: "What does Merchant of Record actually mean?",
    a: "Clink is legally the seller on the invoice. We collect and remit VAT/GST/sales tax in the buyer's jurisdiction, handle refunds and chargebacks, and pay you out net of fees — no global tax registrations on your side.",
  },
  {
    q: "How long does verification take?",
    a: "Most teams clear KYC/KYB in 1–2 business days. Domain review and payout setup happen in parallel. A Chinese-speaking onboarding team is reachable on WeChat or Feishu throughout.",
  },
  {
    q: "Recurring, one-time, or usage-based — what's supported?",
    a: "All three, plus hybrid plans. Built-in dunning automatically retries failed charges, regional pricing supports multi-currency catalogs, and invoices are generated for every transaction.",
  },
];

/* ---------- Page ---------- */

export default function LovablePlatformPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms" },
          { label: "Lovable", href: "/platforms/lovable" },
        ]}
      />
      <Hero />
      <WhyClink />
      <PromptShowcase />
      <Walkthrough />
      <DropInCode />
      <AgentReady />
      <GoLive />
      <FaqSection title="Lovable + Clink, Answered." items={FAQS} />
      <FinalCta />
      <Footer />
    </div>
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
      <div className="mx-auto max-w-[960px] px-6 pt-24 pb-24 text-center md:pt-[120px] md:pb-32">
        <p
          className="mb-6 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.22em" }}
        >
          Platforms · Lovable
        </p>
        <h1
          className="font-semibold leading-[1.04] tracking-[-0.02em]"
          style={{ fontSize: "clamp(40px, 6.5vw, 84px)" }}
        >
          <span className="block text-foreground">
            Ship Payments in Your Lovable App.
          </span>
          <span
            className="block bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-headline)" }}
          >
            From Prompt to Global Revenue.
          </span>
        </h1>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {["Merchant of Record", "100+ Global Methods", "Agent-Ready Skill"].map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-sm font-medium text-foreground"
              style={{
                background: "var(--accent-soft)",
                borderColor:
                  "color-mix(in oklab, var(--accent) 35%, transparent)",
              }}
            >
              {p}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-[680px] text-lg leading-relaxed text-foreground-muted">
          You vibe-coded the app. Now add payments without leaving the chat —
          Clink wires checkout, subscriptions, smart routing, and global tax
          into your Lovable project in a single prompt.
        </p>
        <div className="mt-9 flex justify-center">
          <Link
            href="/clink-for-claw"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-cta)" }}
          >
            <img src={clawAvatar.src} alt="" className="h-7 w-7 rounded-full" />
            Get Agent-Ready in 1-Click
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
        <p className="mt-6 text-sm text-foreground-subtle">
          Built for Lovable. Powered by Clink.
        </p>
      </div>
    </section>
  );
}

/* ---------- Why Clink for Lovable ---------- */
function WhyClink() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          Why Clink for Lovable
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          A Payments Layer Designed for Prompt-Built Apps
        </h2>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {WHY_CARDS.map((c, i) => (
          <article
            key={c.title}
            className="rounded-[32px] border bg-elev p-8"
            style={{
              borderColor: "var(--surface-stroke)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase text-foreground-subtle"
              style={{ letterSpacing: "0.18em" }}
            >
              0{i + 1}
            </p>
            <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.01em] md:text-[26px]">
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

/* ---------- Prompt showcase ---------- */
function PromptShowcase() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          Prompt the integration
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          Three Prompts. Production-Ready Payments.
        </h2>
        <p className="mx-auto mt-4 text-lg text-foreground-muted">
          Lovable handles your UI and Supabase backend. Clink handles money.
          Drop any of these into chat to get started.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {PROMPTS.map((p) => (
          <article
            key={p}
            className="rounded-2xl border bg-background p-5"
            style={{ borderColor: "var(--surface-stroke)" }}
          >
            <p
              className="text-xs font-semibold uppercase text-foreground-subtle"
              style={{ letterSpacing: "0.18em" }}
            >
              You · in Lovable chat
            </p>
            <p className="mt-3 font-mono text-[14px] leading-relaxed text-foreground">
              <span style={{ color: "var(--accent)" }}>› </span>
              {p}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Walkthrough ---------- */
function Walkthrough() {
  const [a, b, c, d, e] = STEPS;
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[760px] text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
          style={{ letterSpacing: "0.18em" }}
        >
          The walkthrough
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          From Idea to Checkout in Five Steps
        </h2>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
        <StepTile data={a} step={1} className="md:col-span-7" />
        <StepTile data={b} step={2} className="md:col-span-5" />
        <StepTile data={c} step={3} className="md:col-span-4" />
        <StepTile data={d} step={4} className="md:col-span-4" />
        <StepTile data={e} step={5} className="md:col-span-4" />
      </div>
    </section>
  );
}

function StepTile({
  data,
  step,
  className = "",
}: {
  data: (typeof STEPS)[number];
  step: number;
  className?: string;
}) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-[32px] border bg-elev p-7 transition-all duration-200 hover:-translate-y-1 ${className}`}
      style={{
        borderColor: "var(--surface-stroke)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
      >
        {step}
      </span>
      <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] md:text-[24px]">
        {data.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-foreground-muted">
        {data.body}
      </p>
    </article>
  );
}

/* ---------- Drop-in code ---------- */
function DropInCode() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs font-semibold uppercase text-foreground-subtle" style={{ letterSpacing: "0.18em" }}>
            Test in the preview
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
            One Checkout Component. Sandbox Cards Included.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
            The preview environment runs in test mode by default. Use the sandbox cards below to step through the full subscription lifecycle before you flip to live.
          </p>
          <div className="mt-7 rounded-2xl border bg-elev p-5 text-sm" style={{ borderColor: "var(--surface-stroke)" }}>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
              <dt className="text-foreground-subtle">Valid</dt>
              <dd className="font-mono text-foreground">4242 4242 4242 4242</dd>
              <dt className="text-foreground-subtle">Declined</dt>
              <dd className="font-mono text-foreground">4000 0000 0000 0002</dd>
              <dt className="text-foreground-subtle">CVC</dt>
              <dd className="font-mono text-foreground">100</dd>
              <dt className="text-foreground-subtle">Expiry</dt>
              <dd className="font-mono text-foreground">Any future date</dd>
            </dl>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="overflow-hidden rounded-[32px] border bg-elev p-3" style={{ borderColor: "var(--surface-stroke)", boxShadow: "var(--shadow-card)" }}>
            <pre className="overflow-x-auto rounded-3xl bg-background p-6 font-mono text-[13px] leading-relaxed text-foreground-muted" style={{ borderColor: "var(--surface-stroke)" }}>
              <code>
                <span className="text-foreground-subtle">{`// CheckoutButton.tsx — generated by Lovable\n`}</span>
                <span style={{ color: "var(--accent)" }}>import</span>
                {` { clink } `}
                <span style={{ color: "var(--accent)" }}>from</span>
                {` "@clink/checkout";\n\n`}
                <span style={{ color: "var(--accent)" }}>export function</span>
                {` `}
                <span className="text-foreground">CheckoutButton</span>
                {`({ priceId }) {\n`}
                {`  `}<span style={{ color: "var(--accent)" }}>const</span>
                {` open = () => clink.checkout.open({\n`}
                {`    priceId,\n    mode: "test",\n    onSuccess: (session) =>\n      supabase.from("orders").insert(session),\n  });\n\n`}
                {`  `}<span style={{ color: "var(--accent)" }}>return</span>
                {` (\n    <button onClick={open}>\n      Upgrade to Pro\n    </button>\n  );\n}\n`}
              </code>
            </pre>
          </div>
          <p className="mt-4 text-xs text-foreground-subtle">
            Lovable scaffolds this component for you — no manual SDK setup.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Agent-Ready ---------- */
function AgentReady() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <article className="overflow-hidden rounded-[32px] border bg-elev p-8 md:p-12" style={{ borderColor: "var(--surface-stroke)", boxShadow: "var(--shadow-card)" }}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="mb-4 text-xs font-semibold uppercase text-foreground-subtle" style={{ letterSpacing: "0.18em" }}>
              Made for coding agents
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
              One Skill. Every Agent. Payments Done.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
              Install{" "}
              <code className="rounded-md px-2 py-0.5 text-[14px]" style={{ background: "var(--background-elev-2)", color: "var(--accent)" }}>
                clink-integ-skills
              </code>{" "}
              in Lovable, Claude Code, Cursor, or Codex and the agent owns the whole integration — checkout flow, webhook signatures, subscription routing, and agent payments. No doc-diving, no copy-pasting keys.
            </p>
            <Link href="/clink-for-claw" className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium" style={{ color: "var(--accent)" }}>
              Discover Clink for Claw
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border bg-background p-5 font-mono text-[13px] leading-relaxed text-foreground-muted" style={{ borderColor: "var(--surface-stroke)" }}>
              <p className="text-foreground-subtle"># In Lovable chat</p>
              <p className="mt-2"><span style={{ color: "var(--accent)" }}>›</span> Add Clink payments with a <span className="text-foreground">$29/mo Pro</span> plan and a <span className="text-foreground">14-day trial</span>.</p>
              <p className="mt-4 text-foreground-subtle"># Clink Skill</p>
              <p className="mt-2">✓ Catalog created in Clink</p>
              <p>✓ Checkout component added</p>
              <p>✓ Webhook handler wired</p>
              <p>✓ Customer portal route shipped</p>
              <p className="mt-3 text-foreground">Live in test mode. Ready to publish.</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ---------- Go-live ---------- */
function GoLive() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs font-semibold uppercase text-foreground-subtle" style={{ letterSpacing: "0.18em" }}>
            Go-live readiness
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">
            Six Checks Between Test Mode and Real Revenue.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
            Clink runs a readiness check against every published Lovable project. Clear the list and you are taking real cards — usually within a day.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium" style={{ color: "var(--accent)" }}>
            Talk to onboarding
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="md:col-span-7">
          <ul className="divide-y rounded-[32px] border bg-elev" style={{ borderColor: "var(--surface-stroke)" }}>
            {CHECKLIST.map((item, i) => (
              <li key={item} className="flex items-center gap-4 px-6 py-5" style={{ borderColor: "var(--surface-stroke)" }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent)" }} aria-hidden>✓</span>
                <span className="text-[15px] text-foreground">
                  <span className="text-foreground-subtle mr-3">0{i + 1}</span>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
