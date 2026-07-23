---
title: "How to Add Payments to Bolt.new Apps — Stripe Built-in, Then Clink"
description: "Add subscriptions and one-time payments to a Bolt.new app with native Stripe integration—then know when Clink's portable payment infrastructure is the better next step."
slug: "how-to-add-payments-bolt-app"
date: "2026-07-24"
updated: "2026-07-24"
category: "Product"
author: "Clink Team"
readingMinutes: 12
---

## TL;DR

Bolt.new is the only major vibe-coding platform where adding payments starts in a Settings panel, not a chat prompt. There is no Paddle toggle. There is no provider recommendation. There is Stripe, one Supabase Edge Function scaffold, and four documented webhook failure modes that account for nearly every broken Bolt-built SaaS.

- Bolt's native Stripe integration — the only payment processor with first-class support — works through **Settings → Stripe**: paste your test key, click "Retrieve my products," prompt "Add payments," and Bolt auto-generates Supabase Edge Functions for checkout, webhooks, and subscription management [Source: support.bolt.new/integrations/stripe]
- No paid Bolt plan is required; no Paddle path exists — "Stripe is the only payment processor with native first-class support in Bolt.new" [Source: RapidDev guide]
- The generated scaffold ships with four specific failure points: raw-body parsing before signature verification, missing production webhook secret, StackBlitz preview URLs registered as webhook endpoints, and no idempotency — Afterbuild Labs identifies these as "the most common support ticket on Bolt-built SaaS"
- Clink provides a portable billing layer that decouples payment logic from any single platform or processor; for the full integration guide, see the Clink path in [How to Add Payments to a Lovable App](/blog/how-to-add-payments-lovable-app)

---

## The Settings Panel, Not a Chat Prompt

Talk to Lovable. Talk to Replit Agent. You'll get payments. Talk to v0. You'll get UI components and a Marketplace install flow. Talk to Bolt? Bolt does not listen for payment commands in chat. You open Settings. You find Stripe. You paste a key. Only then — after Bolt has synced your real Stripe product IDs — do you type "Add payments" and watch it generate checkout code that actually works.

This is a developer-first flow. No magic. No abstraction. No "we recommend Paddle for your catalog." Just Stripe, your products, and Supabase Edge Functions. The setup takes ten minutes. The architecture stays exactly as visible as you left it. That is the promise. The fine print — the four webhook failure modes, the single-provider ceiling, the Supabase coupling — is what this article exists to deliver.

---

## Path A: Native Stripe in 10 Minutes

The Bolt Stripe flow compresses what would normally be hours of API route configuration.

**Step 1: Connect Supabase.** Bolt's Stripe integration requires Supabase or Bolt Database — Firebase is not supported because Stripe's secret keys run inside Supabase Edge Functions. If your project does not have a database, Bolt prompts you to add one first. Set up authentication so purchases attach to users.

**Step 2: Connect Stripe in Settings.** In your project, click the gear icon, find Stripe, paste your test secret key (`sk_test_...`). Click "Retrieve my products." Bolt queries your Stripe account and imports active products with their real price IDs. Select the products to use in your app. This sync step is what makes the generated code immediately usable — the AI references real Stripe product IDs, not placeholders.

**Step 3: Prompt.** Type "Add payments" in chat. Bolt generates: a Supabase edge function for checkout session creation (`supabase/functions/create-checkout/index.ts`), a webhook handler (`supabase/functions/stripe-webhook/index.ts`), React components for pricing pages and buy buttons, and database tables to track customers, subscriptions, and payment status. Review the generated files — the AI uses the real product IDs synced in the previous step.

**Step 4: Test in preview, then deploy.** Stripe's test mode provides test cards (`4242 4242 4242 4242` for success). Checkout session creation works in Bolt's WebContainer preview because it is an outbound HTTP call. Webhook events cannot arrive in preview — Bolt's WebContainer has no public URL. Deploy to Netlify or Bolt Cloud to test the full payment lifecycle.

**Step 5: Go live.** Switch from test key (`sk_test_`) to live key (`sk_live_`) in Settings → Stripe. Re-retrieve products to sync your live catalog. Update Netlify/Bolt Cloud environment variables. Create a live webhook endpoint in Stripe Dashboard pointing at your production URL.

The setup is genuinely fast. The ceiling is structural.

---

## What Bolt Doesn't Have — and Why It Matters

Bolt's payment architecture is one processor, one database provider, one webhook contract. That simplicity ships the first dollar. It becomes a ceiling when your needs multiply.

**No Paddle.** There is no Merchant of Record path, no built-in tax remittance workflow, no alternative to Stripe's processor economics. Lovable offers both Paddle and Stripe as built-in options and even recommends one based on your catalog. Bolt simply does not present a choice [Source: RapidDev, "Stripe is the only payment processor with native first-class support"]. For a full analysis of the MoR vs PSP trade-off, see our guide on [MoR vs PSP](/blog/mor-vs-psp).

**No multi-PSP routing.** When Stripe declines a payment — regional issuer preference, temporary network issue, fraud rule — your Bolt app has no fallback processor. In a multi-PSP architecture, that same transaction could route to Airwallex or Adyen and succeed, recovering 3–5% of revenue that a single processor leaves on the table. See [smart payment routing](/blog/smart-routing) for the data.

**No built-in provider switching.** You can switch from Stripe test to live, but you cannot switch from Stripe to a different processor within Bolt's built-in tooling. Products, prices, and subscription states do not migrate. Acceptable for a first launch; expensive when renewal revenue depends on approval rates across regions that one processor does not cover equally.

**Supabase-coupled architecture.** Bolt's Stripe integration runs inside Supabase Edge Functions — a security win that keeps secret keys out of client code, but also couples your payment logic to a specific backend provider. If your project outgrows Edge Function runtime limits, or if you want to run payment processing outside Supabase, the scaffold does not port cleanly. This coupling is invisible at launch and becomes visible the first time you need to handle a webhook timeout or a rate-limit issue that is specific to Supabase's Edge Function execution model.

---

## The Four Webhook Failure Modes

Bolt generates a Stripe integration that looks correct but contains four specific failures. Checkout works because Stripe handles it. The webhook that activates a subscription silently fails. Users see a successful charge but no upgraded plan. Afterbuild Labs, which rescues production payment integrations across AI-built apps, identifies this as "the most common support ticket on Bolt-built SaaS" [Source: afterbuildlabs.com, April 2026].

### 1. Body Parsed as JSON Before Signature Verification

Stripe signs webhook payloads over the raw request bytes. Bolt's default scaffold parses JSON first, then attempts verification — which always fails because the bytes changed.

```javascript
// Correct
const body = await request.text();
const event = stripe.webhooks.constructEvent(body, signature, secret);

// Wrong — Bolt's default
// const body = await request.json();
// event = stripe.webhooks.constructEvent(JSON.stringify(body), signature, secret);
```

### 2. STRIPE_WEBHOOK_SECRET Missing in Production

Bolt provisions the test environment, but production environment variables must be set manually on your deployment platform. The fix: Stripe Dashboard → Webhooks → your endpoint → reveal signing secret (`whsec_...`) → add as `STRIPE_WEBHOOK_SECRET` in Netlify/Bolt Cloud env → redeploy.

### 3. Webhook URL Points at StackBlitz Preview

During development, the registered webhook endpoint points at a `stackblitz.io` URL. These URLs are unreachable once the WebContainer is cold. Delete the preview endpoint in Stripe Dashboard and create one pointing at `https://your-app.netlify.app/api/stripe/webhook`.

### 4. Missing Idempotency

Stripe retries webhooks for up to three days. Without idempotency, each retry can double-charge. Create a `processed_webhook_events` table with `event_id` as primary key; insert before processing. On the outbound call: `stripe.subscriptions.create(params, { idempotencyKey: event.id })`.

These four fixes turn a scaffold that looks correct into one that actually works. The time investment is under an hour, but skipping any one of them means real users pay real money for features they never receive.

---

## When Single-PSP Architecture Is Enough

Bolt's Stripe integration is genuinely good at what it does. Use this framework to decide if "good" is enough.

| Situation | Decision |
|-----------|----------|
| First paid launch, single market, want the fastest Stripe setup available | **Built-in Stripe** |
| Domestic-heavy SaaS or services, comfortable with classic PSP economics | **Built-in Stripe** |
| Need Paddle / MoR semantics for global digital sales | **Not available in Bolt — see Lovable or Clink** |
| Multi-region, multi-currency, need processor failover | **Clink** |
| Already on Stripe but hitting platform-coupled limits | Start built-in, plan Clink graduation |

A practical way to think about this: if your app will process more than $5,000/month in a single region with card networks Stripe covers well, Bolt's built-in path is almost certainly the right first step. If your volume crosses regions — or if you already know you will need a second processor within the first year — the architecture conversation starts now, not after the first churn spike.

For comparison across platforms: Lovable offers Paddle + Stripe from chat ([see guide](/blog/how-to-add-payments-lovable-app)). v0 offers Stripe with cryptographic key exchange ([see guide](/blog/how-to-add-payments-v0-app)). Replit offers Stripe via Agent plus Whop for instant digital sales ([see guide](/blog/how-to-add-payments-replit-app)). Bolt is the Stripe-only, Settings-first lane — the fastest single-provider path, and the most constrained when your needs multiply.

---

## Beyond Bolt: Payment Infrastructure That Outlasts the Platform

When one processor, one database, and one platform become a ceiling, the answer is a payment layer you control. Clink provides that: integrate once for products, prices, checkout, subscriptions, and webhooks; connect Stripe (and other PSPs) underneath while keeping billing data portable. For the complete integration guide — `clink-integ-skills` installation, CLI workflow, catalog import, webhook automation — see the Clink path in [How to Add Payments to a Lovable App](/blog/how-to-add-payments-lovable-app). The Clink integration is platform-agnostic by design: once your billing runs through Clink, the platform you used to build the UI is an implementation detail. Pricing is Contact Sales as of mid-2026. Start at [clinkbill.com](https://clinkbill.com/) or [docs.clinkbill.com](https://docs.clinkbill.com/).

---

## Step-by-Step: Bolt + Stripe

Here is the no-nonsense version. Do these in order.

1. **Connect Supabase.** Add authentication. Bolt needs a user to attach a purchase to.
2. **Get your Stripe test key.** Stripe Dashboard → Developers → API keys. Copy `sk_test_...`. Do not use a live key here. Do not skip test mode.
3. **Bolt → Settings → Stripe.** Paste the test key. Click "Retrieve my products." Select the products to sell. Click "Apply selection."
4. **Prompt.** Type "Add payments." Be specific if you have multiple products: "Add Stripe checkout for Pro Plan at $29/month."
5. **Review.** Open the generated edge function. Confirm the price ID matches your Stripe catalog. If it does not, re-retrieve products and try again.
6. **Preview test.** Run a checkout with `4242 4242 4242 4242`. The redirect to Stripe Checkout works. Webhooks do not — WebContainer has no public URL. That is normal.
7. **Deploy to Netlify or Bolt Cloud.** Register the webhook endpoint in Stripe Dashboard. Add `STRIPE_WEBHOOK_SECRET` to production env. Apply all four webhook fixes (raw body, secret, URL, idempotency).
8. **Go live.** Switch to live key in Settings. Re-retrieve products. Redeploy. Verify: payment → webhook → subscription activates.

---

## Bolt-Specific Pitfalls

Beyond the four webhook failures, two more will bite you if you skip them.

1. **You deployed to Netlify but never updated the webhook URL.** Stripe's Dashboard still points at a dead `stackblitz.io` URL. Stripe retries. Retries fail. Subscriptions never activate. Fix: delete the old endpoint. Create one pointing at your production domain. Verify with Stripe CLI.

2. **You shipped the scaffold without testing webhook replay.** Stripe CLI exists for a reason. `stripe trigger checkout.session.completed`. Watch your logs. One 200. One subscription activation. One row in your events table. If you see anything else, the scaffold is not production-ready.

---

## Conclusion

Bolt.new's native Stripe integration is the fastest single-provider on-ramp in the vibe-coding ecosystem: Settings panel, product sync, one prompt, ten minutes to checkout. For a first paid launch in a single market, it is the rational default. The question is not whether it works — it does. The question is how long one processor, one database, and one webhook contract cover your product's needs. When they don't, the graduation path is infrastructure — a payment layer you control, not a Settings panel toggle you grow past.

---

## FAQ

### Does Bolt.new support Paddle?

No. Stripe is the only payment processor with native first-class support in Bolt.new. There is no built-in Paddle integration, no MoR path, and no alternative to Stripe within Bolt's Settings panel. Lovable is the only platform with native Paddle; v0 offers Paddle via a Vercel Starter Kit template.

### Why does my Bolt Stripe checkout work but subscriptions never activate?

This is the defining Bolt Stripe failure. Checkout succeeds because Stripe processes it. Subscription activation happens through your webhook handler, and Bolt's default scaffold fails on at least one of four things: body parsed as JSON before signature verification, `STRIPE_WEBHOOK_SECRET` missing in production, webhook URL pointing at StackBlitz preview, or missing idempotency. Apply all four fixes above.

### Do I need a paid Bolt plan to use Stripe?

No. Bolt's Stripe integration is available to all users regardless of plan. This is a contrast with Replit, which requires a Core or Pro plan for Stripe access.

### How do I test webhooks in Bolt's preview?

You can't. Bolt's WebContainer has no public URL for Stripe to POST webhook events to. Test checkout session creation in preview, then deploy to Netlify or Bolt Cloud to test the complete webhook-driven payment lifecycle. Use Stripe CLI (`stripe listen --forward-to`) for local testing.

### When should I move beyond Bolt's built-in Stripe?

When one processor is a structural constraint: multi-region decline rates, need for processor portability beyond Stripe, or billing logic that must survive a platform migration. Until then, built-in Stripe is the rational choice.
