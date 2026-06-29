# Clink — Brand, Visual & Homepage Prototype Spec

> Single-file spec for AI coding agents (Lovable / Antigravity / Claude Code / Cursor).
> Reading this front-to-back gives you everything needed to ship a pixel-faithful prototype
> of the **clinkbill.com** homepage with zero additional context.

Reference screenshot: `clinkbill-reference-home.png` (desktop full-page capture).
Source of truth: <https://clinkbill.com/>

---

## §0 Agent Quick-Start

**One-line product:** Clink is payment & subscription-billing infrastructure for AI-native SaaS — one API for 100+ local payment methods, usage-based pricing, and built-in tax handling.

**Read order:** §0 → §1 → §2–§9 (tokens & components) → §10 IA → §11 section blueprints → §13 copy deck → §14 code refs → §16 acceptance checklist.

**Build order:**
1. Drop tokens into `styles.css` (§2–§5)
2. Global shell: dark `<body>`, sticky transparent nav (§6, §11.1)
3. Hero block with gradient headline + 3 feature pills + agent CTA (§11.2)
4. 5-up feature card grid w/ illustration top, copy bottom (§11.3)
5. "Feature Overview" alternating split rows (§11.4)
6. Partner logo marquee (§11.5)
7. Testimonial masonry / scrolling columns (§11.6)
8. Footer (§11.7)
9. Slop-sweep against §15 Do/Don't and §16 checklist

**Stack-neutral.** All tokens are semantic CSS vars + Tailwind class names. React, Vue, Svelte, vanilla — pick your poison. The spec does not require any specific framework.

---

## §1 Product Identity

| Field | Value |
|---|---|
| Name | **Clink** (logo wordmark "Clink", lowercase serif-ish geometric) |
| Tagline | *Payment Infrastructure for an AI-Native World* |
| Category | Payments orchestration + subscription billing + tax, with an "agent-ready" angle |
| Audience | SaaS / AI app founders, indie devs shipping global products, fintech-curious PMs |
| Tone | Confident, technical, dark-mode-premium. Stripe-meets-Linear with a warm coral accent. Never cute, never enterprise-stuffy. |
| Keywords | payments, orchestration, subscription billing, usage-based pricing, tax, AI-native, agent-ready, global coverage, smart routing |
| Mascot | A small coral lobster/crawfish icon ("Claw") used **only** next to the "Get Agent-Ready in 1-Click" CTA and the "Clink for Claw" nav item. Never decorative elsewhere. |

---

## §2 Color System

Theme is **dark-first**. Background is near-black with a subtle radial glow toward the top. Accent is a warm coral that pushes orange→pink in the headline gradient.

```css
:root {
  /* Surfaces */
  --background: oklch(0.14 0.005 30);          /* #161412-ish near-black, very slight warm */
  --background-elev: oklch(0.18 0.006 30);     /* card surface */
  --background-elev-2: oklch(0.22 0.008 30);   /* inner card / pill bg */
  --surface-stroke: oklch(1 0 0 / 0.08);       /* hairline borders on dark */

  /* Foreground */
  --foreground: oklch(0.98 0 0);               /* primary text */
  --foreground-muted: oklch(0.72 0.01 30);     /* body copy */
  --foreground-subtle: oklch(0.55 0.01 30);    /* meta / labels */

  /* Accent (coral) */
  --accent: oklch(0.74 0.18 38);               /* #ff7a59-ish */
  --accent-strong: oklch(0.68 0.21 32);        /* #ff5a3c hover / icon fill */
  --accent-soft: oklch(0.74 0.18 38 / 0.14);   /* pill bg / chip bg */

  /* Headline gradient (warm sunset) */
  --gradient-headline: linear-gradient(
    90deg,
    oklch(0.86 0.13 60) 0%,    /* peach */
    oklch(0.78 0.18 40) 50%,   /* coral */
    oklch(0.70 0.22 20) 100%   /* deep pink-red */
  );

  /* Hero ambient glow */
  --gradient-hero-glow: radial-gradient(
    ellipse 80% 60% at 50% 0%,
    oklch(0.45 0.15 30 / 0.35) 0%,
    transparent 70%
  );

  /* Card hover lift */
  --shadow-card: 0 1px 0 0 oklch(1 0 0 / 0.04) inset,
                 0 24px 48px -24px oklch(0 0 0 / 0.6);
}
```

Light theme is **not required** — the site is dark-only.

---

## §3 Typography

System-grade sans for everything; the site uses a single family at multiple weights. Use **Inter** or **Geist Sans** as a faithful free substitute (real site likely uses a custom geometric — Inter ships an honest approximation).

| Token | Family | Weight | Size / line-height | Use |
|---|---|---|---|---|
| `--font-display-xl` | Inter | 600 | clamp(48px, 6.5vw, 84px) / 1.04 | Hero headline |
| `--font-display-lg` | Inter | 600 | clamp(36px, 4.4vw, 56px) / 1.1 | Section H2 |
| `--font-display-md` | Inter | 600 | 28px / 1.2 | Card / row H3 |
| `--font-body-lg` | Inter | 400 | 18px / 1.55 | Hero subcopy, row body |
| `--font-body` | Inter | 400 | 16px / 1.6 | Default body |
| `--font-body-sm` | Inter | 500 | 14px / 1.45 | Pill labels, meta |
| `--font-caption` | Inter | 500 | 12px / 1.4 | Footer columns, micro |

Letter-spacing: tighten display sizes to `-0.02em`. Body stays at default.

**Headline rule:** Hero H1 is split across two lines. Line 1 ("Payment Infrastructure for an") is solid `--foreground`. Line 2 ("AI-Native World") uses `background: var(--gradient-headline); background-clip: text; color: transparent;`.

---

## §4 Layout & Spacing

- Max content width: **1200px**, centered, with **24px** gutters on mobile and **48px** on desktop.
- Section vertical rhythm: **120px** top/bottom on desktop, **72px** on mobile.
- Grid: 12-col on desktop, 8-col tablet, 4-col mobile. Card grids use CSS grid with `gap: 24px`.
- Border radii:
  - `--radius-sm` 10px (pills, small chips)
  - `--radius-md` 16px (buttons, inputs)
  - `--radius-lg` 24px (cards)
  - `--radius-xl` 32px (large cards / hero feature tiles)
- Hairlines: 1px `var(--surface-stroke)` only; never use solid mid-gray strokes.

---

## §5 Buttons

| Variant | Style |
|---|---|
| **Primary (Agent CTA)** | White pill, dark text, 56px tall, 24px horizontal padding, `border-radius: 9999px`, leading icon = coral lobster avatar (28px circle), trailing arrow → on hover slides 4px right. Used **once** in the hero. |
| **Ghost nav link** | Transparent, `--foreground-muted` → `--foreground` on hover, no underline. |
| **Outline (Login)** | 1px `--surface-stroke` border, pill, 36px tall, 16px horizontal padding, `--foreground`. |
| **Text link inline** | `--accent`, no underline, arrow → suffix. Used in "Discover Payments" etc. |

Buttons never use shadow except the primary white pill which gets `0 8px 24px -8px oklch(1 0 0 / 0.2)` for a subtle "raised" feel on the dark bg.

---

## §6 Components (Clink-specific)

### `TopNav`
- Sticky, full-width, transparent over hero, then `backdrop-filter: blur(16px)` + `background: oklch(0.14 0.005 30 / 0.7)` after 80px scroll.
- Left: wordmark "Clink" (white SVG, height 24px).
- Center: nav links — **Home**, **Clink for Claw** (with mini lobster icon, 16px), **Products**, **Support**, **Contact us**. Active link = `--foreground`; inactive = `--foreground-muted`.
- Right: **Login** outline button.
- Mobile: collapse center+right into a hamburger trigger.

### `HeroFeaturePill`
- Inline-flex row: 18px square icon (SVG, currentColor coral) + 14px/500 label.
- Background `--accent-soft`, border 1px `--accent / 30%`, radius `--radius-sm`, padding `8px 14px`.
- Three pills sit on a single row, gap 12px, centered below H1.

### `HeroAgentCTA`
- Primary white pill (see §5). Sits ~32px below subcopy, centered.

### `FeatureTile` (5-up grid under hero)
- Card: `--background-elev`, radius `--radius-xl`, padding 32px, `box-shadow: var(--shadow-card)`.
- Layout: illustration/PNG fills the top ~60% of the card (object-fit cover, no crop weirdness); H3 + 2-line body anchored to the bottom.
- Hover: translateY(-4px), border subtly brightens.
- Grid: on desktop, **2 large tiles on row 1** (asymmetric — left tile slightly wider, ~58/42 split), **3 equal tiles on row 2**. On tablet, 2-up; mobile, 1-up.

### `FeatureRow` (Feature Overview)
- Alternating split: text 5 cols / image 7 cols, then flipped on the next row.
- Text side: small uppercase eyebrow ("FEATURE OVERVIEW" on first row only) → H2 → body → text link "Discover X →".
- Image side: full-bleed product illustration inside a `--background-elev` card with `--radius-xl`.
- Vertical rhythm between rows: 96px.

### `PartnerMarquee`
- Two horizontal rails, infinite scrolling in **opposite directions**.
- Each rail: 14–16 partner logos rendered as monochrome white SVGs at ~70% opacity, height 36px, horizontal gap 64px.
- Use CSS `@keyframes scroll` with `animation: scroll 40s linear infinite`. Duplicate the logo set inline so the loop is seamless.
- Edges fade out via a mask: `mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent)`.

### `TestimonialColumn`
- Three vertical columns, each scrolling slowly upward at slightly different speeds (e.g. 60s / 80s / 70s) — classic "scrolling testimonial wall."
- Card: `--background-elev`, radius `--radius-lg`, padding 24px, `--surface-stroke` border. Top row: 32px avatar circle + name (bold) + brand (muted) on one line. Then 3–5 lines of quote.
- Container has the same edge mask used by the marquee (vertical).

### `Footer`
- Multi-column: brand + tagline (col 1), Products, Resources, Company, Legal (cols 2–5).
- Thin hairline above. Coral wordmark accent on one piece (e.g. small lobster + "© Clink Inc. 2025").

---

## §7 Icons, Imagery, Illustrations

**Icons** — 18–24px line-style SVGs, 1.5px stroke, `currentColor`. The three hero pills use:
- Card icon (`tab-icon-card.svg`) for "100+ Local Payment Methods"
- Widget/grid icon (`tab-icon-widget.svg`) for "Usage-Based Pricing"
- Notes/receipt icon (`tab-icon-notes.svg`) for "Built-in Tax Handling"

**Feature illustrations** — Dark, isometric/2.5D mini-scenes on a card background. Examples from the live site:
- *Your Data, Any Processor* — a database puck wired out to 4 colored app tiles (Stripe-S, Airwallex-a, Klarna-K, an "X" tile, and an Adyen-like A). Vector-style.
- *Global coverage* — globe with currency badges (Visa, Apple Pay, Klarna, SEPA) connected by orbit lines to a coral "Clink" core.
- *Secure & Stable* — a stylized vault / shield with a tiny PCI badge.
- *Simple integration* — a code/API window with a "Go live" button.
- *Unified Costs* — a receipt or chart chip with a single line item highlighted in coral.

**Generation prompts** (use these verbatim with `imagegen` when assets aren't downloadable):

| ID | Prompt | Size |
|---|---|---|
| `hero-feature-lockin` | "Dark UI illustration on near-black background, isometric-style: a cylindrical database puck in center with branching cables connecting to 4 rounded app icon tiles in purple, green, blue and coral, soft glow, minimal, premium fintech aesthetic" | 720×540 |
| `hero-feature-global` | "Dark UI illustration: a translucent globe wireframe with floating circular payment badges (Visa, Apple Pay, Klarna, SEPA) connected by orbit lines to a glowing coral 'Clink' wordmark at center, premium SaaS style" | 720×540 |
| `hero-feature-secure` | "Dark UI illustration: a sleek vault door with a coral shield emblem and tiny 'PCI' badge, soft warm glow from behind, premium fintech" | 720×540 |
| `hero-feature-simple` | "Dark UI illustration of an API code window with syntax-highlighted JSON and a coral 'Go live' button, minimal premium" | 720×540 |
| `hero-feature-report-chip` | "Dark UI illustration: a stylized invoice/receipt chip floating with one line item highlighted in coral and a small upward trend arrow" | 720×540 |
| `feature-global-payments` | "Dark dashboard mock: global payments interface with a world map and a coral-accented success rate gauge" | 1040×720 |
| `feature-smart-routing` | "Dark dashboard mock: smart routing flow chart with three gateway nodes and animated retry arrows in coral" | 1040×720 |
| `feature-billing` | "Dark dashboard mock: subscription billing UI with invoice list, MRR chart, and customer portal preview" | 1040×720 |
| `claw-avatar` | "Tiny cute coral lobster mascot face, flat vector, centered, transparent background, 64x64" | 64×64, transparent |

**Logos for partner marquee** — Use neutral white SVG silhouettes. If you don't have the real partners' logos, generate ~14 generic monochrome tech-brand wordmarks (varied widths). The marquee's effect depends on density and motion, not specific brand recognition.

---

## §8 Motion

- **Hero gradient text** — static. Do not animate.
- **Agent CTA arrow** — `transform: translateX(4px)` on hover, 180ms ease-out.
- **Feature tiles** — on hover: `translateY(-4px)`, border lightens to `oklch(1 0 0 / 0.16)`, 240ms ease-out.
- **Partner marquee** — 2 rails, 40s linear infinite, opposite directions. Pause on hover.
- **Testimonial columns** — 3 columns, 60–80s vertical scroll, alternating directions; pause on hover.
- **Scroll-in reveals** — keep restrained. Fade + 12px translateY on section enter, 400ms, single trigger. Do not stagger every card; reveal the whole section as one block.
- **Nav blur** — fade in backdrop blur after 80px scroll.

No parallax. No Lottie. No autoplay video. No scroll-jacking.

---

## §9 Don't-Do List (decoration)

- ❌ Do not put the lobster mascot anywhere except the agent CTA and the "Clink for Claw" nav item.
- ❌ Do not add a second hero CTA. The white agent pill is the only primary action.
- ❌ Do not add a "Trusted by NASA / Y Combinator" badge row — the partner marquee is the trust signal.
- ❌ Do not add purple/blue gradients. The accent system is warm coral only.
- ❌ Do not add icon backgrounds with rounded squares on every list item. Pills use coral-soft bg; everything else uses raw line icons.
- ❌ Do not add "As featured in TechCrunch" press strips.
- ❌ Do not use Lucide default icons everywhere; the three hero pill icons must be custom-feeling SVGs (card, widget, notes).
- ❌ Do not add a sign-up form to the hero. Login is the only auth surface on the homepage.
- ❌ Do not show pricing numbers on the homepage.

---

## §10 Information Architecture

**Top nav (left → right):** Wordmark · Home · Clink for Claw · Products · Support · Contact us · Login.

**Homepage route only.** All other links are placeholders for this prototype:
- `/clink-for-claw`
- `/products` (with subpages `/products/payment`, `/products/routing`, `/products/billing`)
- `/support`
- `/contact`
- `/login`

For the prototype, those routes can be stubbed (404 or "Coming soon") — only `/` is required for the spec.

**Homepage section order:**
1. TopNav (sticky)
2. Hero (headline + 3 pills + subcopy + agent CTA)
3. 5-up Feature Tile grid (2 wide + 3 narrow)
4. Feature Overview — 3 alternating rows (Global Payments, Smart Routing, Billing)
5. Cooperation partners — dual marquee
6. Trusted by Product Builders — testimonial wall
7. Footer

---

## §11 Section-by-Section Blueprint

### §11.1 TopNav
- Height: 72px desktop, 60px mobile.
- Container max-width 1200px.
- Left: wordmark (24px).
- Center: 5 nav links, gap 32px. "Clink for Claw" gets the 16px lobster icon to its left.
- Right: Login outline pill.
- Behavior: transparent → blurred dark bg after 80px scroll.

### §11.2 Hero
- Wrapper has `background: var(--gradient-hero-glow)` over `--background`.
- Vertical padding: 120px top, 96px bottom.
- Content centered, max-width 960px.
- H1, two lines:
  - Line 1: "Payment Infrastructure for an" (solid white)
  - Line 2: "AI-Native World" (gradient via `background-clip: text`)
- Below H1, 24px gap, three `HeroFeaturePill` chips on one row (wrap to 2+1 on mobile).
- Below pills, 20px gap, subcopy: `--foreground-muted`, 18px, max-width 640px, centered.
- Below subcopy, 32px gap, **single** `HeroAgentCTA` (white pill) "Get Agent-Ready in 1-Click" with lobster avatar.

### §11.3 Five-Up Feature Tile Grid
- Wrapper padding 96px top/bottom.
- Desktop grid:
  ```
  Row 1: [tile-1  spans 7 cols] [tile-2  spans 5 cols]   (or 58/42)
  Row 2: [tile-3]  [tile-4]  [tile-5]   (equal thirds)
  ```
- Tile order & content (top illustration → H3 → body):
  1. **Your Data, Any Processor** — `hero-feature-lockin` — "Connect once, route anywhere. Clink keeps your subscription data independent and portable, so you can add, swap, or combine providers without rewriting a line of code."
  2. **Global coverage** — `hero-feature-global` — "Unlock global markets instantly with support for 135+ currencies and local payment methods."
  3. **Secure & Stable** — `hero-feature-secure` — "Bank-grade security you can trust. A PCI-compliant vault that keeps customer data safe."
  4. **Simple integration** — `hero-feature-simple` — "Go live in minutes using our developer-friendly API or a prebuilt hosted solution."
  5. **Unified Costs** — `hero-feature-report-chip` — "Simplify your finances with a transparent cost model. No hidden fees, just growth."

### §11.4 Feature Overview (alternating rows)
- Eyebrow on the first row only: `FEATURE OVERVIEW`, 12px/600, `--foreground-subtle`, uppercase, letter-spacing 0.12em.
- Three rows, alternating image side (right, left, right):
  1. **Global Payments** — copy: "Deliver a frictionless checkout experience anywhere. We unify global gateways into one interface, ensuring the right payment method is always available." — link: `Discover Payments →` → `/products/payment` — image `feature-global-payments`.
  2. **Smart Routing** — copy: "Recover lost revenue on autopilot. Our smart orchestration engine uses dynamic routing and automatic retries to maximize transaction success rates." — link: `Discover Smart Routing →` → `/products/routing` — image `feature-smart-routing`.
  3. **Billing** — copy: "Automate your entire revenue lifecycle. Handle complex subscriptions, recurring invoices, and customer self-service portals from a single dashboard." — link: `Discover Billing →` → `/products/billing` — image `feature-billing`.

### §11.5 Cooperation Partners
- Section H2: "Cooperation partners" — `--font-display-lg`, centered.
- Subhead: "Trusted by high-growth companies worldwide." — `--foreground-muted`, 18px, centered, 16px below H2.
- 48px below subhead: dual marquee (see §6 `PartnerMarquee`). Rail 1 scrolls left, rail 2 scrolls right.
- Logos: 14 unique monochrome white SVG wordmarks, opacity 0.65, height 36px.

### §11.6 Trusted by Product Builders
- Section H2: "Trusted by Product Builders" — centered.
- Subhead: "See how industry leaders are using our platform to streamline operations and accelerate global expansion." — centered.
- 64px below subhead: **3-column scrolling testimonial wall** (see §6 `TestimonialColumn`).
- Real testimonial cards (use these 7, distribute across columns):

  | Name | Brand | Quote (truncate to ~5 lines per card) |
  |---|---|---|
  | Ruby Xu | BlockSec | "Clink has been a strong payments partner for our global SaaS business. The product is well-designed and easy to use, their team responds quickly, and they offer a wide range of payment methods that helps us serve customers across markets." |
  | Dominic | GeeLark | "As a partner, we see Clink as a mature and scalable platform for global payments and subscription billing. Its unified payment orchestration and subscription management significantly reduce cross-border operational complexity." |
  | JK | Linkloud | "Clink helps merchants manage the complexity of global payments and subscription billing with greater efficiency. Its intelligent payment capabilities provide reliable support for conversion and revenue growth in international markets." |
  | Silvirex | VoiSpark | "Clink delivers a stable and flexible all-in-one platform for payments and subscription billing, helping merchants simplify global collections and subscription management." |
  | Veritas | Gazolab | "Since partnering with Clink, we have seen a clear improvement in payment success rates and overall revenue performance. Clink's intelligent routing and automated retries significantly reduce revenue loss from failed transactions." |
  | Kevin | Virax.ai | "Clink has significantly accelerated our expansion into international markets. By enabling local payment methods and multi-currency support, cross-border conversion has improved noticeably." |
  | Ronald | ZingFront | "Clink has significantly improved our operational efficiency across payments and subscriptions. A unified platform reduces manual effort and allows teams to focus on growth." |
  | Silas | NovaSonic | "In subscription-based business scenarios, Clink demonstrates a deep understanding of billing and payment workflows. From subscription lifecycle to payment optimization, Clink delivers an integrated solution." |

  Distribute roughly: col 1 = Ruby, Silvirex, Ronald; col 2 = Dominic, Veritas, Silas; col 3 = JK, Kevin, (+ one repeat from col 1 to balance height). Duplicate the set inline so vertical scroll loops seamlessly.

### §11.7 Footer
- Hairline divider, then 80px top padding, 64px bottom.
- Columns:
  1. **Brand** — wordmark + one-line tagline ("Payment infrastructure for an AI-native world.") + small social row (Twitter / GitHub / LinkedIn line icons).
  2. **Products** — Payments, Smart Routing, Billing, Clink for Claw.
  3. **Resources** — Docs, API Reference, Changelog, Status.
  4. **Company** — About, Contact us, Support.
  5. **Legal** — Terms, Privacy, Cookies.
- Bottom bar: `© Clink Inc. 2025` (left) and small "Made for an AI-native world" (right).

---

## §12 Assets Manifest

If you can fetch from `clinkbill.com`, use the real URLs. If not, generate via `imagegen` using the prompts in §7.

| ID | Real URL | Fallback |
|---|---|---|
| `nav-logo` | https://clinkbill.com/resource/home-new/nav-logo.svg | Inline SVG wordmark "Clink", weight 600, white |
| `tab-icon-card` | https://clinkbill.com/resource/home-new/tab-icon-card.svg | Line-icon credit-card SVG |
| `tab-icon-widget` | https://clinkbill.com/resource/home-new/tab-icon-widget.svg | Line-icon 4-square grid SVG |
| `tab-icon-notes` | https://clinkbill.com/resource/home-new/tab-icon-notes.svg | Line-icon receipt SVG |
| `claw-avatar` | https://clinkbill.com/resource/clink-for-claw/claw-avatar.svg | Generated coral lobster face 64×64 (§7) |
| `hero-feature-lockin` | https://clinkbill.com/resource/home-new/hero-feature-lockin-illustration.svg | Generated (§7) |
| `hero-feature-global` | https://clinkbill.com/resource/home-new/hero-feature-global.png | Generated (§7) |
| `hero-feature-secure` | https://clinkbill.com/resource/home-new/hero-feature-secure.png | Generated (§7) |
| `hero-feature-simple` | https://clinkbill.com/resource/home-new/hero-feature-simple.png | Generated (§7) |
| `hero-feature-report-chip` | https://clinkbill.com/resource/home-new/hero-feature-report-chip.png | Generated (§7) |
| `feature-global-payments` | https://clinkbill.com/resource/home-new/feature-global-payments.png | Generated (§7) |
| `feature-smart-routing` | https://clinkbill.com/resource/home-new/feature-smart-routing.png | Generated (§7) |
| `feature-billing` | https://clinkbill.com/resource/home-new/feature-billing.svg | Generated (§7) |
| `partners-*` | https://clinkbill.com/images/partners/partner_{N}.svg (N ∈ 2,34–48) | 14 generic monochrome wordmarks |
| `testimonial-*` | https://clinkbill.com/images/trusted/{block-sec.png, gee-lark.png, linkloud.webp, voi-spark.ico, gazolab.svg, virax.ai.ico, zing-front.png, nova-sonic.png} | 32×32 initials avatar fallback |

Fonts: Inter (Google Fonts) weights 400/500/600.

---

## §13 Copy Deck (full real strings)

```text
[Nav]
Home  ·  Clink for Claw  ·  Products  ·  Support  ·  Contact us  ·  Login

[Hero H1]
Payment Infrastructure for an
AI-Native World

[Hero pills]
100+ Local Payment Methods
Usage-Based Pricing
Built-in Tax Handling

[Hero subcopy]
We've built everything inside, so you waste 0 time beyond building great products.

[Hero CTA]
Get Agent-Ready in 1-Click  →

[Feature tile 1]
Your Data, Any Processor
Connect once, route anywhere. Clink keeps your subscription data independent and portable, so you can add, swap, or combine providers without rewriting a line of code.

[Feature tile 2]
Global coverage
Unlock global markets instantly with support for 135+ currencies and local payment methods.

[Feature tile 3]
Secure & Stable
Bank-grade security you can trust. A PCI-compliant vault that keeps customer data safe.

[Feature tile 4]
Simple integration
Go live in minutes using our developer-friendly API or a prebuilt hosted solution.

[Feature tile 5]
Unified Costs
Simplify your finances with a transparent cost model. No hidden fees, just growth.

[Feature Overview eyebrow]
FEATURE OVERVIEW

[Row 1]
Global Payments
Deliver a frictionless checkout experience anywhere. We unify global gateways into one interface, ensuring the right payment method is always available.
Discover Payments →

[Row 2]
Smart Routing
Recover lost revenue on autopilot. Our smart orchestration engine uses dynamic routing and automatic retries to maximize transaction success rates.
Discover Smart Routing →

[Row 3]
Billing
Automate your entire revenue lifecycle. Handle complex subscriptions, recurring invoices, and customer self-service portals from a single dashboard.
Discover Billing →

[Partners]
Cooperation partners
Trusted by high-growth companies worldwide.

[Testimonials]
Trusted by Product Builders
See how industry leaders are using our platform to streamline operations and accelerate global expansion.

[Footer tagline]
Payment infrastructure for an AI-native world.

[Footer copyright]
© Clink Inc. 2025
```

---

## §14 Code Quick Reference

### Hero (React + Tailwind)
```tsx
<section className="relative isolate overflow-hidden">
  <div
    className="pointer-events-none absolute inset-0 -z-10"
    style={{ background: "var(--gradient-hero-glow)" }}
  />
  <div className="mx-auto max-w-[960px] px-6 pt-[120px] pb-24 text-center">
    <h1 className="text-[clamp(48px,6.5vw,84px)] font-semibold leading-[1.04] tracking-[-0.02em]">
      <span className="block text-foreground">Payment Infrastructure for an</span>
      <span
        className="block bg-clip-text text-transparent"
        style={{ backgroundImage: "var(--gradient-headline)" }}
      >
        AI-Native World
      </span>
    </h1>

    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {pills.map((p) => (
        <span
          key={p.label}
          className="inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-sm font-medium"
          style={{
            background: "var(--accent-soft)",
            borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)",
            color: "var(--foreground)",
          }}
        >
          <img src={p.icon} alt="" className="h-[18px] w-[18px]" />
          {p.label}
        </span>
      ))}
    </div>

    <p className="mx-auto mt-5 max-w-[640px] text-lg text-[var(--foreground-muted)]">
      We've built everything inside, so you waste 0 time beyond building great products.
    </p>

    <a
      href="/clink-for-claw"
      className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-[15px] font-medium text-black shadow-[0_8px_24px_-8px_rgba(255,255,255,0.2)]"
    >
      <img src={clawAvatar} alt="" className="h-7 w-7 rounded-full" />
      Get Agent-Ready in 1-Click
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  </div>
</section>
```

### FeatureTile
```tsx
<article className="group flex flex-col gap-6 rounded-[32px] border border-[var(--surface-stroke)] bg-[var(--background-elev)] p-8 transition-transform duration-200 hover:-translate-y-1">
  <div className="aspect-[16/10] overflow-hidden rounded-2xl">
    <img src={img} alt={title} className="h-full w-full object-cover" />
  </div>
  <div>
    <h3 className="text-[28px] font-semibold leading-tight">{title}</h3>
    <p className="mt-3 text-[var(--foreground-muted)]">{body}</p>
  </div>
</article>
```

### PartnerMarquee
```tsx
<div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
  <div className="flex w-max animate-[scroll_40s_linear_infinite] gap-16">
    {[...logos, ...logos].map((src, i) => (
      <img key={i} src={src} alt="" className="h-9 opacity-65" />
    ))}
  </div>
</div>
/* @keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } } */
```

### TestimonialColumn
```tsx
<div className="relative overflow-hidden [mask-image:linear-gradient(180deg,transparent,black_8%,black_92%,transparent)]">
  <div className="flex flex-col gap-6 animate-[scrollY_60s_linear_infinite]">
    {[...quotes, ...quotes].map((q, i) => (
      <article key={i} className="rounded-[24px] border border-[var(--surface-stroke)] bg-[var(--background-elev)] p-6">
        <header className="flex items-center gap-3">
          <img src={q.avatar} className="h-8 w-8 rounded-full" alt="" />
          <p className="text-sm"><span className="font-semibold">{q.name}</span> <span className="text-[var(--foreground-subtle)]">{q.brand}</span></p>
        </header>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--foreground-muted)]">{q.body}</p>
      </article>
    ))}
  </div>
</div>
/* @keyframes scrollY { from { transform: translateY(0) } to { transform: translateY(-50%) } } */
```

---

## §15 Do / Don't

✅ Do
- Keep dark mode only.
- Use the coral accent sparingly: headline gradient stop, hero pill icons, link arrows, and the lobster mascot.
- Use a single primary CTA in the hero.
- Use real testimonial copy from §11.6.
- Use the partner marquee as the trust signal.
- Match the 2+3 asymmetric feature tile grid exactly.

❌ Don't
- Don't introduce purple/blue gradient backgrounds.
- Don't sprinkle the lobster mascot in card corners or footers.
- Don't add stat counters ("99.99% uptime") that aren't on the source.
- Don't pad sections with logo strips beyond the one marquee.
- Don't add a pricing table on the homepage.
- Don't use Lucide icons for the hero pills — keep the three custom-feeling SVGs.
- Don't animate the headline gradient.

---

## §16 Acceptance Checklist (agent self-check)

Tick all 20 before claiming done.

1. [ ] Page background is near-black with subtle warm radial glow at top.
2. [ ] Top nav is sticky, transparent over hero, blurs after scroll.
3. [ ] Nav contains: wordmark, Home, Clink for Claw (w/ lobster icon), Products, Support, Contact us, Login pill.
4. [ ] Hero H1 splits across two lines; line 2 uses the coral→peach gradient via `background-clip: text`.
5. [ ] Three feature pills under H1 with custom SVG icons (card / widget / notes), coral-soft bg, coral-tinted border.
6. [ ] Subcopy reads "We've built everything inside, so you waste 0 time beyond building great products."
7. [ ] **Only one** primary CTA in the hero: white pill "Get Agent-Ready in 1-Click" with lobster avatar and trailing arrow.
8. [ ] Five-up feature tile grid: row 1 has 2 asymmetric tiles, row 2 has 3 equal tiles.
9. [ ] Feature tile titles and body copy match §11.3 exactly.
10. [ ] Feature Overview has 3 alternating split rows (image right / left / right).
11. [ ] Each Feature Overview row ends with a coral `Discover X →` text link, not a button.
12. [ ] Partner section uses **two** opposite-direction infinite marquees with edge fade mask.
13. [ ] Testimonial section uses **three** vertical scrolling columns with edge fade mask.
14. [ ] Testimonial quotes are real strings from §11.6 (Ruby, Dominic, JK, etc.) — no Lorem ipsum.
15. [ ] Footer has 5 columns + bottom bar with copyright.
16. [ ] No purple/blue gradients anywhere; coral is the only accent hue.
17. [ ] Lobster mascot appears only on the hero CTA and the "Clink for Claw" nav link.
18. [ ] All section spacing matches §4 (120/72px section padding, 24px grid gap).
19. [ ] Page is responsive: nav collapses, hero text scales via `clamp()`, tile grid stacks 2→1, testimonial columns reduce to 2→1.
20. [ ] No placeholder boilerplate, no Lorem ipsum, no "REPLACE this" left in the build.

---

*End of spec. Build well. — Clink Homepage Prototype Spec, v1.*
