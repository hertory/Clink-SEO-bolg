import "server-only";
import today from "@/data/agent-payments/today.json";

export type AgentPaymentVisual =
  | {
      kind: "choice";
      heading: string;
      prompt: string;
      tags: [string, string][];
    }
  | {
      kind: "approval";
      heading: string;
      subheading: string;
      rows: [string, string][];
      confirm: string;
    }
  | {
      kind: "completion";
      heading: string;
      subheading: string;
      events: [string, string][];
    };

export type AgentPaymentBlock = {
  eyebrow: string;
  title: string;
  body: string;
  visual: AgentPaymentVisual;
};

export type AgentPaymentSetupAgent = {
  name: string;
  domain: string;
  label: string;
};

export type AgentPaymentPage = {
  slug: string;
  agent: AgentPaymentSetupAgent;
  meta: { title: string; description: string; ogDescription: string };
  hero: {
    kicker: string;
    h1: string;
    standfirst: string;
    ctaLabel: string;
    ctaHref: string;
    flowStart: string;
    flowEnd: string;
  };
  demo: {
    eyebrow: string;
    title: string;
    body: string;
    badge: string;
    video: string;
    poster: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    body: string;
    blocks: AgentPaymentBlock[];
  };
  setup: {
    title: string;
    body: string;
    primaryTab: string;
    secondaryTab: string;
    secondaryBadge: string;
    codeTitlePrefix: string;
    code: string;
    thenAskLabel: string;
    thenAsk: string;
    guideLabel: string;
    guideHref: string;
    footerNote: string;
    agents: AgentPaymentSetupAgent[];
  };
  useCases: {
    eyebrow: string;
    title: string;
    items: { icon: string; title: string; body: string }[];
  };
  howTo: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { name: string; text: string }[];
  };
  faqs: { q: string; a: string }[];
  finalCta: { title: string; description: string };
};

const PAGES: Record<string, AgentPaymentPage> = {
  today: today as unknown as AgentPaymentPage,
};

export function getAgentPaymentSlugs(): string[] {
  return Object.keys(PAGES);
}

export function getAgentPaymentPage(
  slug: string,
): AgentPaymentPage | null {
  return PAGES[slug] ?? null;
}
