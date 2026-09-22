import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
  Gift,
  House,
  MapPin,
  PackageCheck,
  Plane,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  CircleDollarSign,
  Sparkles,
  WalletCards,
  ArrowDown,
} from "lucide-react";
import { Footer, TopNav } from "@/components/blog/SiteChrome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { HowToSection } from "@/components/HowToSection";
import { AgentSetupSection } from "@/components/agent-payments/AgentSetupSection";
import { BrandLogo } from "@/components/BrandLogo";
import {
  getAgentPaymentPage,
  getAgentPaymentSlugs,
} from "@/lib/agent-payments";
import clinkLogo from "@/assets/clink/nav-logo.svg";

export async function generateStaticParams() {
  return getAgentPaymentSlugs().map((agent) => ({ agent }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ agent: string }>;
}): Promise<Metadata> {
  const { agent } = await params;
  const page = getAgentPaymentPage(agent);
  if (!page) {
    return { title: "Page not found — Clink" };
  }
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/agentic-payments/${page.slug}` },
    openGraph: {
      title: page.meta.title,
      description: page.meta.ogDescription,
      url: `/agentic-payments/${page.slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

const USE_CASE_ICONS: Record<string, typeof House> = {
  House,
  Gift,
  Plane,
  RefreshCw,
  WalletCards,
  MapPin,
};

const STEP_ICONS: Record<string, typeof ShieldCheck> = {
  ShoppingBag,
  CircleDollarSign,
  ShieldCheck,
};

export default async function AgentPaymentsPage({
  params,
}: {
  params: Promise<{ agent: string }>;
}) {
  const { agent } = await params;
  const page = getAgentPaymentPage(agent);
  if (!page) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to Buy With ${page.agent.name} and Clink`,
      step: page.howTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <TopNav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Agentic Payments" },
          { label: page.agent.label, href: `/agentic-payments/${page.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{ background: "var(--gradient-hero-glow)" }}
        />
        <div className="mx-auto flex min-h-[660px] max-w-[1080px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[720px]">
          <div className="flex items-center gap-3">
            <BrandLogo name={page.agent.name} domain={page.agent.domain} size={44} />
            <span className="text-xl text-foreground-subtle">×</span>
            <span className="inline-flex h-11 items-center rounded-[10px] border border-border bg-card px-3 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={clinkLogo.src} alt="Clink" className="h-4 w-auto" />
            </span>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase text-accent">
            {page.hero.kicker}
          </p>
          <h1 className="mt-5 max-w-[900px] text-[44px] font-semibold leading-[1.02] sm:text-[58px] md:text-[72px]">
            {page.hero.h1}
          </h1>
          <p className="mt-7 max-w-[680px] text-lg leading-relaxed text-foreground-muted md:text-xl">
            {page.hero.standfirst}
          </p>
          <a
            href={page.hero.ctaHref}
            className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-primary px-6 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {page.hero.ctaLabel}
            <ArrowDown aria-hidden />
          </a>

          <div
            className="mt-16 flex w-full max-w-[760px] items-center justify-center"
            aria-label="A request becomes a completed purchase"
          >
            <div className="flex items-center gap-3 rounded-[16px] border border-border bg-card px-4 py-3 shadow-sm">
              <Sparkles aria-hidden className="size-4 text-accent" />
              <span className="text-sm font-medium">{page.hero.flowStart}</span>
            </div>
            <div className="mx-3 h-px flex-1 bg-border" />
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-sm">
              <BrandLogo name={page.agent.name} domain={page.agent.domain} size={24} />
            </span>
            <div className="mx-3 h-px flex-1 bg-border" />
            <div className="flex items-center gap-3 rounded-[16px] border border-border bg-card px-4 py-3 shadow-sm">
              <PackageCheck aria-hidden className="size-4 text-accent" />
              <span className="text-sm font-medium">{page.hero.flowEnd}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="scroll-mt-24 bg-elev">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-sm font-medium text-accent">{page.demo.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-[44px] md:leading-[1.08]">
              {page.demo.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
              {page.demo.body}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-[920px] overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
              <span className="flex items-center gap-2 text-sm font-medium">
                <BrandLogo name={page.agent.name} domain={page.agent.domain} size={22} />
                {page.agent.name} in Action
              </span>
              <span className="flex items-center gap-2 text-xs font-medium text-foreground-muted">
                <span className="size-2 rounded-full bg-accent" />
                {page.demo.badge}
              </span>
            </div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={page.demo.video}
              poster={page.demo.poster}
              muted
              playsInline
              controls
              preload="metadata"
              className="block aspect-video w-full bg-muted object-contain"
            />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:py-28">
          <div className="max-w-[760px]">
            <p className="text-sm font-medium text-accent">
              {page.capabilities.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-[44px] md:leading-[1.08]">
              {page.capabilities.title}
            </h2>
            <p className="mt-5 max-w-[650px] text-base leading-relaxed text-foreground-muted md:text-lg">
              {page.capabilities.body}
            </p>
          </div>

          <div className="mt-16 space-y-20 md:space-y-28">
            {page.capabilities.blocks.map((block, index) => (
              <article
                key={block.eyebrow}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="text-xs font-semibold uppercase text-accent">
                    {block.eyebrow}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-[38px]">
                    {block.title}
                  </h3>
                  <p className="mt-5 max-w-[500px] text-base leading-relaxed text-foreground-muted md:text-lg">
                    {block.body}
                  </p>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                  <CapabilityVisual visual={block.visual} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MCP setup (shared product section) */}
      <AgentSetupSection setup={page.setup} />

      {/* Use cases */}
      <section className="bg-elev">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:py-28">
          <div className="max-w-[760px]">
            <p className="text-sm font-medium text-accent">
              {page.useCases.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-[44px] md:leading-[1.08]">
              {page.useCases.title}
            </h2>
          </div>
          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {page.useCases.items.map((item) => {
              const Icon = USE_CASE_ICONS[item.icon] ?? Sparkles;
              return (
                <article
                  key={item.title}
                  className="min-h-[240px] border-b border-r border-border bg-card p-6 sm:p-7"
                >
                  <span className="flex size-11 items-center justify-center rounded-[12px] bg-muted">
                    <Icon aria-hidden className="size-5 text-accent" />
                  </span>
                  <h3 className="mt-8 text-xl font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How-to */}
      <section className="border-y border-border bg-background">
        <HowToSection
          eyebrow={page.howTo.eyebrow}
          title={page.howTo.title}
          description={page.howTo.description}
          steps={page.howTo.steps.map((step, index) => ({
            ...step,
            icon: STEP_ICONS[Object.keys(STEP_ICONS)[index]],
          }))}
        />
      </section>

      {/* FAQ */}
      <FaqSection
        title="Questions About Buying With Today."
        items={page.faqs}
      />

      {/* Final CTA */}
      <FinalCta
        title={page.finalCta.title}
        description={page.finalCta.description}
      />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[0]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[1]) }}
      />
    </div>
  );
}

function CapabilityVisual({ visual }: { visual: import("@/lib/agent-payments").AgentPaymentVisual }) {
  if (visual.kind === "choice") {
    return (
      <div className="rounded-[24px] border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <Sparkles aria-hidden className="size-5 text-accent" />
          <p className="text-sm font-semibold">{visual.heading}</p>
        </div>
        <div className="mt-5 rounded-[16px] bg-muted p-4 text-sm leading-relaxed text-foreground-muted">
          {visual.prompt}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {visual.tags.map(([label, value]) => (
            <div key={label} className="border-t border-border pt-3">
              <p className="text-xs text-foreground-subtle">{label}</p>
              <p className="mt-1 text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === "approval") {
    return (
      <div className="rounded-[24px] border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-[12px] bg-muted">
              <ShieldCheck aria-hidden className="size-5 text-accent" />
            </span>
            <div>
              <p className="text-sm font-semibold">{visual.heading}</p>
              <p className="text-xs text-foreground-muted">{visual.subheading}</p>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clinkLogo.src} alt="Clink" className="h-3.5 w-auto" />
        </div>
        <dl className="mt-7 space-y-4 border-y border-border py-5 text-sm">
          {visual.rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-foreground-muted">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent">
          <Check aria-hidden className="size-4" />
          {visual.confirm}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-sm font-semibold">{visual.heading}</p>
          <p className="mt-1 text-xs text-foreground-muted">{visual.subheading}</p>
        </div>
        <PackageCheck aria-hidden className="size-6 text-accent" />
      </div>
      <div className="mt-2">
        {visual.events.map(([event, status]) => (
          <div
            key={event}
            className="flex items-center gap-3 border-b border-border py-4 last:border-0"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
              <Check aria-hidden className="size-3.5 text-accent" />
            </span>
            <span className="flex-1 text-sm font-medium">{event}</span>
            <span className="text-xs text-foreground-muted">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
