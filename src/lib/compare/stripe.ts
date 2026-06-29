import heroImage from "@/assets/clink/compare/clink-vs-stripe-hero.jpg";

export type CellValue = "yes" | "no" | "partial" | string;
export type ComparisonRow = {
  label: string;
  clink: CellValue;
  stripe: CellValue;
  note?: string;
};

export type PricingCard = {
  name: string;
  tagline: string;
  headline: string;
  headlineNote: string;
  lines: { label: string; value: string }[];
  footnote?: string;
  accent?: "clink" | "stripe";
};

export type SplitRowData = {
  eyebrow: string;
  title: string;
  body: string;
  clinkPoint: string;
  stripePoint: string;
};

export type Faq = { q: string; a: string };

export const stripeCompare = {
  hero: {
    eyebrow: "COMPARISON",
    title: "Clink vs Stripe",
    deck:
      "An honest, head-to-head look at two payment platforms for modern SaaS — where Clink is the better fit, and where Stripe still wins.",
    updated: "Updated Jun 23, 2026",
    image: heroImage,
    primaryCta: { label: "Talk to sales", href: "/contact" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
  },

  verdict: {
    pickClink: {
      title: "Pick Clink if…",
      points: [
        "You sell globally and need 100+ local payment methods out of the box (PIX, Alipay, iDEAL, UPI, OXXO, Konbini…).",
        "You're an AI-native or usage-based SaaS that needs credit wallets, token metering, and per-request billing as first-class primitives.",
        "You're incorporated outside Stripe's supported countries, or you'd rather have a Merchant-of-Record handle global tax and chargebacks.",
        "You want smart routing across multiple PSPs for higher auth rates — not a single acquirer.",
      ],
    },
    pickStripe: {
      title: "Pick Stripe if…",
      points: [
        "You need in-person card payments via Stripe Terminal hardware.",
        "You're building a multi-party marketplace where Stripe Connect's payouts model is the simplest path.",
        "You depend on the largest payments ecosystem — every CRM, ERP, no-code, and tax tool ships a Stripe connector.",
        "You sell mostly card-not-present in US/EU and don't need MoR or multi-PSP routing.",
      ],
    },
  },

  rows: [
    { label: "Local payment methods", clink: "100+", stripe: "~40", note: "Several Stripe LPMs require region/account approval." },
    { label: "Merchant of Record (tax, refunds, chargebacks)", clink: "yes", stripe: "no", note: "Stripe Tax is a separate paid add-on; you're still the merchant." },
    { label: "Supported merchant countries", clink: "Global incl. LATAM, MENA, parts of APAC", stripe: "~46 countries" },
    { label: "Usage-based & metered billing", clink: "yes", stripe: "partial", note: "Stripe Billing supports metered usage but credit wallets need custom glue." },
    { label: "Built-in tax (VAT / GST / sales)", clink: "yes", stripe: "partial", note: "Stripe Tax adds +0.5% per transaction." },
    { label: "Multi-PSP smart routing & failover", clink: "yes", stripe: "no", note: "Stripe is its own acquirer; no multi-acquirer routing." },
    { label: "AI agent / agentic checkout", clink: "yes", stripe: "partial", note: "Stripe Agent Toolkit wraps existing primitives." },
    { label: "Card-present / Terminal hardware", clink: "no", stripe: "yes" },
    { label: "Marketplace & multi-party payouts", clink: "partial", stripe: "yes", note: "Stripe Connect is the more mature option for marketplaces." },
    { label: "Subscriptions, trials, dunning", clink: "yes", stripe: "yes" },
    { label: "Pricing model", clink: "Flat MoR % + payout", stripe: "Per-transaction + add-ons" },
  ] as ComparisonRow[],

  pricing: [
    {
      name: "Clink",
      tagline: "Merchant of Record, transparent",
      headline: "From 5%",
      headlineNote: "per successful transaction",
      lines: [
        { label: "Card processing", value: "Included" },
        { label: "Global tax (VAT/GST/sales)", value: "Included" },
        { label: "Local payment methods", value: "Included" },
        { label: "Fraud & chargeback management", value: "Included" },
        { label: "Subscription billing & dunning", value: "Included" },
        { label: "Smart routing across PSPs", value: "Included" },
      ],
      footnote: "Volume tiers available at scale. No setup fee, no monthly minimum.",
      accent: "clink",
    },
    {
      name: "Stripe",
      tagline: "Pay-as-you-go, modular add-ons",
      headline: "2.9% + $0.30",
      headlineNote: "per US card transaction",
      lines: [
        { label: "International cards", value: "+1.5%" },
        { label: "Currency conversion", value: "+1.0%" },
        { label: "Stripe Tax (per transaction)", value: "+0.5%" },
        { label: "Stripe Billing (recurring)", value: "+0.5–0.7%" },
        { label: "Stripe Radar for Fraud Teams", value: "+$0.07/screened" },
        { label: "Chargeback fee", value: "$15 per dispute" },
      ],
      footnote: "Published rates as of Jun 2026. Negotiated rates available for high-volume merchants.",
      accent: "stripe",
    },
  ] as PricingCard[],

  splitRows: [
    {
      eyebrow: "Global coverage",
      title: "100+ Local Payment Methods, No Region Gating",
      body:
        "Stripe natively supports ~40 LPMs, and several (PIX, OXXO, Konbini, Alipay+) require country-specific account approval. Clink ships every major regional rail enabled by default — your checkout shows the right methods to the right buyer in every market.",
      clinkPoint: "100+ LPMs enabled on day one across LATAM, EMEA, APAC.",
      stripePoint: "Strong card coverage in US/EU; LPMs depend on approval.",
    },
    {
      eyebrow: "Tax handling",
      title: "Tax Included, Not a 0.5% Surcharge",
      body:
        "As Merchant of Record, Clink calculates, collects, and remits VAT, GST, and US sales tax in 60+ jurisdictions — included in the rate. Stripe Tax is a separate product that adds 0.5% per transaction, and you remain the legal seller.",
      clinkPoint: "MoR — Clink files and remits in your buyer's jurisdiction.",
      stripePoint: "Stripe Tax: +0.5% per txn; you remain the merchant.",
    },
    {
      eyebrow: "Reliability",
      title: "Multi-PSP Routing and Automatic Failover",
      body:
        "Clink routes each transaction across multiple acquirers based on issuer country, currency, and method — and fails over to a backup PSP automatically when one returns soft declines. Stripe is its own acquirer, so there's no equivalent multi-acquirer routing.",
      clinkPoint: "Multi-PSP routing for higher auth rates and resilience.",
      stripePoint: "Single acquirer; resilience tied to Stripe itself.",
    },
  ] as SplitRowData[],

  whereStripeWins: [
    {
      title: "Largest Ecosystem on the Planet",
      body:
        "Every CRM, ERP, no-code platform, accounting tool, and tax engine ships a Stripe connector. If your stack already speaks Stripe, integration is essentially free.",
    },
    {
      title: "In-Person & Terminal Hardware",
      body:
        "Stripe Terminal offers certified card readers, SDKs, and inventory. If you're charging cards in a physical store or popup, Stripe wins on day one — Clink is online-only.",
    },
    {
      title: "Marketplaces with Stripe Connect",
      body:
        "For multi-party platforms (Uber-for-X, two-sided marketplaces) Stripe Connect's onboarding, payouts, and 1099 handling are the most mature option available.",
    },
  ],

  migration: {
    title: "Moving From Stripe to Clink",
    steps: [
      {
        title: "Import Customers & Subscriptions",
        body:
          "Use the Clink CLI or CSV importer to migrate customers, payment methods (where tokens are portable), and active subscriptions in one pass.",
      },
      {
        title: "Run Webhooks in Parallel",
        body:
          "Point Clink webhooks at the same internal handlers during a 1–2 week dual-run. Reconcile events nightly until parity is confirmed.",
      },
      {
        title: "Cut Over and Decommission",
        body:
          "Flip the checkout to Clink. Leave Stripe in read-only mode for 30 days to handle refunds on legacy charges, then decommission.",
      },
    ],
  },

  faqs: [
    {
      q: "Is Clink a Stripe alternative, or can I use them together?",
      a: "Both. You can replace Stripe entirely with Clink, or keep your Stripe processing relationship and use Clink as a smart-routing + MoR layer on top. Many teams start with the hybrid setup and migrate fully over time.",
    },
    {
      q: "Can I keep Stripe and just add Clink for local payment methods?",
      a: "Yes. Mount your Stripe keys in Clink's routing layer, and Clink will route US/EU card volume to Stripe while routing PIX, Alipay, iDEAL, and other LPMs to the best regional acquirer.",
    },
    {
      q: "How does Clink's tax handling compare to Stripe Tax?",
      a: "Clink is a Merchant of Record — we are the legal seller on the invoice, and we collect and remit VAT/GST/sales tax in 60+ jurisdictions, included in the rate. Stripe Tax is a separate product that adds 0.5% per transaction and leaves you as the merchant responsible for filing.",
    },
    {
      q: "What does pricing look like for a $100k MRR SaaS?",
      a: "On Stripe you'd typically pay 2.9% + 30¢ on US cards, +1% international, +0.5% Stripe Tax, +0.5–0.7% Stripe Billing — call it 4–5% all-in once add-ons stack. Clink's MoR rate starts at 5% with tax, routing, billing, and chargeback ops included; volume pricing kicks in well before $100k MRR.",
    },
    {
      q: "Does Clink support full subscriptions like Stripe Billing?",
      a: "Yes — recurring plans, trials, proration, coupons, dunning, retries, customer portal, and hybrid usage-based billing are all built in. There is no Clink Billing add-on; it ships with the platform.",
    },
    {
      q: "What about marketplaces and multi-party payouts?",
      a: "Stripe Connect is more mature for true marketplace use cases today. Clink supports split payouts and partner accounting, but if you're building Uber-for-X, Stripe Connect remains the safer bet.",
    },
  ] as Faq[],

  closing: {
    title: "Make the Honest Call.",
    body: "Talk to a payments engineer. We'll show you exactly where Clink wins for your stack — and where Stripe is still the right answer.",
    cta: { label: "Talk to sales", href: "/contact" },
  },
};
