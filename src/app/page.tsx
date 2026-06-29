import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { FinalCta } from "@/components/FinalCta";

import tabCard from "@/assets/clink/tab-icon-card.svg";
import tabWidget from "@/assets/clink/tab-icon-widget.svg";
import tabNotes from "@/assets/clink/tab-icon-notes.svg";
import clawAvatar from "@/assets/clink/claw-avatar.svg";

import tileLockin from "@/assets/clink/hero-feature-lockin-illustration.svg";
import tileGlobal from "@/assets/clink/hero-feature-global.png";
import tileSecure from "@/assets/clink/hero-feature-secure.png";
import tileSimple from "@/assets/clink/hero-feature-simple.png";
import tileReport from "@/assets/clink/hero-feature-report-chip.png";

import featurePayments from "@/assets/clink/feature-global-payments.png";
import featureRouting from "@/assets/clink/feature-smart-routing.png";
import featureBilling from "@/assets/clink/feature-billing.svg";

import p2 from "@/assets/clink/partners/partner_2.svg";
import p34 from "@/assets/clink/partners/partner_34.svg";
import p35 from "@/assets/clink/partners/partner_35.svg";
import p36 from "@/assets/clink/partners/partner_36.svg";
import p37 from "@/assets/clink/partners/partner_37.svg";
import p38 from "@/assets/clink/partners/partner_38.svg";
import p40 from "@/assets/clink/partners/partner_40.svg";
import p41 from "@/assets/clink/partners/partner_41.svg";
import p42 from "@/assets/clink/partners/partner_42.svg";
import p43 from "@/assets/clink/partners/partner_43.svg";
import p44 from "@/assets/clink/partners/partner_44.svg";
import p45 from "@/assets/clink/partners/partner_45.svg";
import p46 from "@/assets/clink/partners/partner_46.svg";
import p47 from "@/assets/clink/partners/partner_47.svg";
import p48 from "@/assets/clink/partners/partner_48.svg";

import tBlocksec from "@/assets/clink/testimonials/block-sec.png";
import tGeelark from "@/assets/clink/testimonials/gee-lark.png";
import tLinkloud from "@/assets/clink/testimonials/linkloud.webp";
import tGazolab from "@/assets/clink/testimonials/gazolab.svg";
import tZing from "@/assets/clink/testimonials/zing-front.png";
import tNova from "@/assets/clink/testimonials/nova-sonic.png";

/* ---------- Data ---------- */

const HERO_PILLS = [
  { label: "100+ Local Payment Methods", icon: tabCard },
  { label: "Usage-Based Pricing", icon: tabWidget },
  { label: "Built-in Tax Handling", icon: tabNotes },
];

const TILES = [
  {
    title: "Your Data, Any Processor",
    body: "Connect once, route anywhere. Clink keeps your subscription data independent and portable, so you can add, swap, or combine providers without rewriting a line of code.",
    img: tileLockin,
  },
  {
    title: "Global Coverage",
    body: "Unlock global markets instantly with support for 135+ currencies and local payment methods.",
    img: tileGlobal,
  },
  {
    title: "Secure & Stable",
    body: "Bank-grade security you can trust. A PCI-compliant vault that keeps customer data safe.",
    img: tileSecure,
  },
  {
    title: "Simple Integration",
    body: "Go live in minutes using our developer-friendly API or a prebuilt hosted solution.",
    img: tileSimple,
  },
  {
    title: "Unified Costs",
    body: "Simplify your finances with a transparent cost model. No hidden fees, just growth.",
    img: tileReport,
  },
];

const FEATURE_ROWS = [
  {
    title: "Global Payments",
    body: "Deliver a frictionless checkout experience anywhere. We unify global gateways into one interface, ensuring the right payment method is always available.",
    link: "Discover Payments",
    href: "/products/payment",
    img: featurePayments,
  },
  {
    title: "Smart Routing",
    body: "Recover lost revenue on autopilot. Our smart orchestration engine uses dynamic routing and automatic retries to maximize transaction success rates.",
    link: "Discover Smart Routing",
    href: "/products/routing",
    img: featureRouting,
  },
  {
    title: "Billing",
    body: "Automate your entire revenue lifecycle. Handle complex subscriptions, recurring invoices, and customer self-service portals from a single dashboard.",
    link: "Discover Billing",
    href: "/products/billing",
    img: featureBilling,
  },
];

const PARTNERS_A = [p2, p34, p35, p36, p37, p38, p40];
const PARTNERS_B = [p41, p42, p43, p44, p45, p46, p47, p48];

type Quote = { name: string; brand: string; body: string; avatar: string };

const initials = (n: string) =>
  n
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const QUOTES: Quote[] = [
  {
    name: "Ruby Xu",
    brand: "BlockSec",
    body: "Clink has been a strong payments partner for our global SaaS business. The product is well-designed and easy to use, their team responds quickly, and they offer a wide range of payment methods that helps us serve customers across markets.",
    avatar: tBlocksec,
  },
  {
    name: "Dominic",
    brand: "GeeLark",
    body: "As a partner, we see Clink as a mature and scalable platform for global payments and subscription billing. Its unified payment orchestration and subscription management significantly reduce cross-border operational complexity.",
    avatar: tGeelark,
  },
  {
    name: "JK",
    brand: "Linkloud",
    body: "Clink helps merchants manage the complexity of global payments and subscription billing with greater efficiency. Its intelligent payment capabilities provide reliable support for conversion and revenue growth in international markets.",
    avatar: tLinkloud,
  },
  {
    name: "Silvirex",
    brand: "VoiSpark",
    body: "Clink delivers a stable and flexible all-in-one platform for payments and subscription billing, helping merchants simplify global collections and subscription management.",
    avatar: "",
  },
  {
    name: "Veritas",
    brand: "Gazolab",
    body: "Since partnering with Clink, we have seen a clear improvement in payment success rates and overall revenue performance. Clink's intelligent routing and automated retries significantly reduce revenue loss from failed transactions.",
    avatar: tGazolab,
  },
  {
    name: "Kevin",
    brand: "Virax.ai",
    body: "Clink has significantly accelerated our expansion into international markets. By enabling local payment methods and multi-currency support, cross-border conversion has improved noticeably.",
    avatar: "",
  },
  {
    name: "Ronald",
    brand: "ZingFront",
    body: "Clink has significantly improved our operational efficiency across payments and subscriptions. A unified platform reduces manual effort and allows teams to focus on growth.",
    avatar: tZing,
  },
  {
    name: "Silas",
    brand: "NovaSonic",
    body: "In subscription-based business scenarios, Clink demonstrates a deep understanding of billing and payment workflows. From subscription lifecycle to payment optimization, Clink delivers an integrated solution.",
    avatar: tNova,
  },
];

const COL_1 = [QUOTES[0], QUOTES[3], QUOTES[6]];
const COL_2 = [QUOTES[1], QUOTES[4], QUOTES[7]];
const COL_3 = [QUOTES[2], QUOTES[5], QUOTES[0]];

/* ---------- Metadata ---------- */
export const metadata: Metadata = {
  title: "Clink — Payment Infrastructure for an AI-Native World",
  description:
    "One API for 100+ local payment methods, usage-based pricing, and built-in tax handling. Clink is payment & subscription billing infrastructure for AI-native SaaS.",
  openGraph: {
    title: "Clink — Payment Infrastructure for an AI-Native World",
    description:
      "One API for 100+ local payment methods, usage-based pricing, and built-in tax handling.",
  },
};

/* ---------- Page ---------- */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Hero />
      <FeatureTiles />
      <FeatureOverview />
      <Partners />
      <Testimonials />
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
        <h1
          className="font-semibold leading-[1.04] tracking-[-0.02em]"
          style={{ fontSize: "clamp(40px, 6.5vw, 84px)" }}
        >
          <span className="block text-foreground">
            Payment Infrastructure for an
          </span>
          <span
            className="block bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-headline)" }}
          >
            AI-Native World
          </span>
        </h1>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {HERO_PILLS.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-sm font-medium text-foreground"
              style={{
                background: "var(--accent-soft)",
                borderColor:
                  "color-mix(in oklab, var(--accent) 35%, transparent)",
              }}
            >
              <img src={p.icon} alt="" className="h-[18px] w-[18px]" />
              {p.label}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-foreground-muted">
          We've built everything inside, so you waste 0 time beyond building
          great products.
        </p>

        <div className="mt-9 flex justify-center">
          <Link
            href="/clink-for-claw"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-cta)" }}
          >
            <img
              src={clawAvatar}
              alt=""
              className="h-7 w-7 rounded-full"
            />
            Get Agent-Ready in 1-Click
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Feature Tiles (2 + 3) ---------- */
function FeatureTiles() {
  const [a, b, c, d, e] = TILES;
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <Tile data={a} className="md:col-span-7" />
        <Tile data={b} className="md:col-span-5" />
        <Tile data={c} className="md:col-span-4" />
        <Tile data={d} className="md:col-span-4" />
        <Tile data={e} className="md:col-span-4" />
      </div>
    </section>
  );
}

function Tile({
  data,
  className = "",
}: {
  data: (typeof TILES)[number];
  className?: string;
}) {
  return (
    <article
      className={`group flex flex-col gap-6 rounded-[32px] border bg-elev p-7 transition-all duration-200 hover:-translate-y-1 ${className}`}
      style={{
        borderColor: "var(--surface-stroke)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        className="aspect-[16/10] overflow-hidden rounded-2xl bg-elev-2"
        style={{ borderColor: "var(--surface-stroke)" }}
      >
        <img
          src={data.img}
          alt={data.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] md:text-[26px]">
          {data.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
          {data.body}
        </p>
      </div>
    </article>
  );
}

/* ---------- Feature Overview alternating rows ---------- */
function FeatureOverview() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      {FEATURE_ROWS.map((row, i) => (
        <FeatureRow key={row.title} row={row} index={i} />
      ))}
    </section>
  );
}

function FeatureRow({
  row,
  index,
}: {
  row: (typeof FEATURE_ROWS)[number];
  index: number;
}) {
  const imageLeft = index % 2 === 1;
  return (
    <div
      className={`grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-12 md:gap-16 md:py-16 ${
        index === 0 ? "pt-0" : ""
      }`}
    >
      <div
        className={`md:col-span-5 ${imageLeft ? "md:order-2" : "md:order-1"}`}
      >
        {index === 0 && (
          <p
            className="mb-4 text-xs font-semibold uppercase text-foreground-subtle"
            style={{ letterSpacing: "0.18em" }}
          >
            Feature Overview
          </p>
        )}
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[44px] md:leading-[1.1]">
          {row.title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
          {row.body}
        </p>
        <Link
          href={row.href}
          className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium transition-colors"
          style={{ color: "var(--accent)" }}
        >
          {row.link}
          <span aria-hidden>→</span>
        </Link>
      </div>
      <div
        className={`md:col-span-7 ${imageLeft ? "md:order-1" : "md:order-2"}`}
      >
        <div
          className="overflow-hidden rounded-[32px] border bg-elev p-3"
          style={{
            borderColor: "var(--surface-stroke)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-elev-2">
            <img
              src={row.img}
              alt={row.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Partner Marquee ---------- */
function Partners() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          Cooperation Partners
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-lg text-foreground-muted">
          Trusted by high-growth companies worldwide.
        </p>
      </div>
      <div className="mt-12 flex flex-col gap-8">
        <MarqueeRail logos={PARTNERS_A} direction="left" duration={45} />
        <MarqueeRail logos={PARTNERS_B} direction="right" duration={55} />
      </div>
    </section>
  );
}

function MarqueeRail({
  logos,
  direction,
  duration,
}: {
  logos: string[];
  direction: "left" | "right";
  duration: number;
}) {
  const animation =
    direction === "left"
      ? `clink-scroll-x ${duration}s linear infinite`
      : `clink-scroll-x-reverse ${duration}s linear infinite`;
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max gap-16 pr-16" style={{ animation }}>
        {[...logos, ...logos, ...logos].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-9 w-auto opacity-60 grayscale brightness-200"
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-[40px]">
          Trusted by Product Builders
        </h2>
        <p className="mx-auto mt-4 max-w-[680px] text-lg text-foreground-muted">
          See how industry leaders are using our platform to streamline
          operations and accelerate global expansion.
        </p>
      </div>

      <div
        className="relative mt-16 grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-3"
        style={{
          height: "640px",
          maskImage:
            "linear-gradient(180deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Column quotes={COL_1} duration={60} reverse={false} />
        <Column quotes={COL_2} duration={80} reverse className="hidden md:flex" />
        <Column quotes={COL_3} duration={70} reverse={false} className="hidden md:flex" />
      </div>
    </section>
  );
}

function Column({
  quotes,
  duration,
  reverse,
  className = "",
}: {
  quotes: Quote[];
  duration: number;
  reverse: boolean;
  className?: string;
}) {
  const animation = reverse
    ? `clink-scroll-y-reverse ${duration}s linear infinite`
    : `clink-scroll-y ${duration}s linear infinite`;
  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="flex flex-col gap-5" style={{ animation }}>
        {[...quotes, ...quotes, ...quotes].map((q, i) => (
          <QuoteCard key={i} q={q} />
        ))}
      </div>
    </div>
  );
}

function QuoteCard({ q }: { q: Quote }) {
  return (
    <article
      className="rounded-[24px] border bg-elev p-6"
      style={{ borderColor: "var(--surface-stroke)" }}
    >
      <header className="flex items-center gap-3">
        {q.avatar ? (
          <img
            src={q.avatar}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
            style={{ background: "var(--background-elev-2)" }}
          />
        ) : (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
            }}
          >
            {initials(q.name)}
          </span>
        )}
        <div className="text-sm">
          <span className="font-semibold text-foreground">{q.name}</span>{" "}
          <span className="text-foreground-subtle">· {q.brand}</span>
        </div>
      </header>
      <p className="mt-4 text-[14.5px] leading-relaxed text-foreground-muted">
        {q.body}
      </p>
    </article>
  );
}
