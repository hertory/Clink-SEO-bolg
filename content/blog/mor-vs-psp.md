---
title: "MoR vs PSP: How to Choose the Right Payment Infrastructure Model"
description: "Merchant of Record vs Payment Service Provider — an honest, framework-driven comparison for SaaS teams deciding how to handle global payments, tax compliance, and operational overhead."
slug: "mor-vs-psp"
date: 2026-06-29
category: "Comparison"
keywords: ["MoR vs PSP", "merchant of record", "payment service provider", "payment infrastructure", "SaaS payments", "Stripe vs Paddle", "MoR comparison", "global tax compliance", "payment orchestration"]
author: "Clink Team"
image: "/blog/mor-vs-psp-hero.svg"
readingMinutes: 14
related: ["what-is-clink"]
---

## TL;DR

Choosing between a Merchant of Record (MoR) and a Payment Service Provider (PSP) is the single most consequential decision in a SaaS payment stack.

- **An MoR** handles tax, compliance, refunds, and chargebacks as the legal seller — fast to launch but sacrifices merchant identity and control over payment routing
- **A PSP** gives full ownership of checkout and invoices, but shifts tax registration, multi-currency reconciliation, and compliance onto your team
- **The hybrid model** (Clink's approach) combines both: MoR coverage for emerging markets, PSP control for core geographies, and multi-PSP smart routing to optimize approval rates
- This article offers a five-dimension decision framework, a cost comparison table, and a step-by-step playbook for choosing your model

---

## The Architecture Difference

The terminology itself is misleading. "MoR" and "PSP" are not alternative payment methods — they are fundamentally different legal and operational models that determine who owns the customer relationship, who files taxes, and who gets sued.

### Payment Service Provider (PSP)

A PSP is a technology layer. Stripe, Adyen, Checkout.com, Airwallex — these companies process transactions on your behalf. They move money from your customer's bank to your bank. But they do not sell anything. **You are the merchant.**

**What a PSP gives you**:
- Payment acceptance infrastructure (card processing, wallets, bank transfers)
- Tokenization and PCI compliance
- A dashboard for tracking transactions
- Basic fraud screening
- Optional add-ons for tax calculation, billing logic, and revenue recovery

**What a PSP does not give you**:
- Tax registration in foreign jurisdictions
- Tax calculation that works across 60+ countries without separate add-ons
- Liability for chargebacks or disputes
- Customer-facing invoicing with proper tax line items
- A single point of contact when a regulator in Brazil or India comes asking questions

### Merchant of Record (MoR)

An MoR is the legal seller on every transaction. When a customer buys your product, the MoR's name appears on the invoice and credit card statement. The MoR collects the money, withholds and remits taxes, handles refunds and chargebacks, and pays you out net of fees.

**What an MoR gives you**:
- Tax calculation, collection, and remittance across jurisdictions
- Chargeback and dispute management
- Consolidated payout to one bank account
- Regulatory compliance as the legal entity responsible for the sale
- Faster time-to-market — no tax registrations to file before going live

**What an MoR costs you**:
- Higher per-transaction fees (typically 4–7% vs 2.9% + $0.30 for a PSP)
- Loss of merchant identity on invoices and statements
- Reduced control over checkout UX and payment routing
- Dependency on the MoR for compliance — if their tax engine misses something, you're still exposed reputationally

---

## The Decision Framework

The MoR vs PSP decision breaks into five dimensions. Use this checklist to score your situation.

| Dimension | Leans MoR | Leans PSP |
|-----------|-----------|-----------|
| **Incorporation country** | Outside top 30 PSP-supported countries, or don't want local entity | Incorporated in US, EU, UK, or another well-served jurisdiction |
| **Target markets** | 20+ countries with different tax regimes | 1–5 countries, primarily US/EU card-not-present |
| **Billing complexity** | One-time or flat subscriptions; simple pricing | Usage-based, tiered, hybrid, multi-currency catalogs |
| **Operational capacity** | No in-house tax or compliance team | Can hire or already have finance/tax/legal support |
| **Merchant identity** | Comfortable with third-party name on invoices | Brand experience on invoices and checkout is a priority |

If you score MoR ≥4, an MoR is likely the pragmatic choice — especially if you're early-stage and want to ship globally without building a compliance team. If you score PSP ≥4, you likely need the control and economics of owning your merchant relationship.

---

## What Nobody Tells You About MoRs

MoRs are marketed as "zero-operational-overhead global payments." The pitch is accurate for the first 12 months. But three structural issues emerge at scale.

### 1. The Tax Shell Problem

When you use an MoR, the tax authority in every jurisdiction sees the MoR — not you — as the seller. If your product grows to $10M ARR in a single country, the local tax authority may eventually want to register **you** directly. Transitioning from MoR to direct merchant status means:

- Migrating customer payment tokens — which requires PCI-compliant handling and may not be portable between PSPs
- Reregistering for tax in every jurisdiction where you exceed thresholds
- Rebuilding billing logic to handle regional tax rates, exemptions, and filing schedules

This is not a hypothetical. Every SaaS company that scales internationally through an MoR either eventually registers as a merchant or accepts permanent dependency on the MoR.

### 2. Checkout Conversion

MoR-branded invoices are recognizable. Customers who see "Paddle Inc." or "Lemon Squeezy LLC" on their credit card statement may file disputes because they don't recognize the charge. This is called friendly fraud, and it disproportionately affects MoR merchants whose brand equity doesn't transfer to the payment layer.

A PSP lets you retain your brand on every touchpoint — checkout, invoice, statement descriptor. For B2B SaaS where procurement teams scrutinize vendor names, this matters.

### 3. Multi-PSP Routing

MoRs typically operate on a single underlying PSP or a limited set. If that PSP experiences degraded performance in a specific region, you cannot route around it. PSP-based infrastructure — especially with a smart routing layer like Clink — can shift transactions across acquirers to optimize approval rates. MoR users give up this knob entirely.

---

## What Nobody Tells You About PSPs

The flip side: going direct with a PSP is liberating until you hit your first tax nexus.

### 1. The Tax Registration Death March

Every country has different rules for when a foreign company must register for VAT, GST, or sales tax. Thresholds range from $0 (UK — register immediately if you sell digital services to consumers) to $100K+ (US states). The moment you cross a threshold, you're legally required to register, file returns, and remit taxes in that jurisdiction.

For a SaaS company selling in 30 countries, that's 30 separate registration processes, 30 sets of filing deadlines, and 30 opportunities to incur penalties for late or incomplete remittance.

Stripe Tax, Avalara, and similar tools help with **calculation** — they tell you the right rate. But they don't handle registration or filing. That's still your problem.

### 2. Payment Method Fragmentation

A PSP gives you card processing. But global SaaS customers don't all pay by card. In the Netherlands, iDEAL captures 60%+ of e-commerce transactions. In Brazil, Boleto Bancario and PIX dominate. In Indonesia, GoPay and Dana are table stakes. In Germany, 30% of B2B payments are still done by bank transfer with a payment reference.

Each of these payment methods requires:
- A separate integration or PSP connection
- Regional compliance (PIX requires a local Brazilian entity for some flows)
- Reconciliation logic that handles method-specific settlement times and failure modes

Most PSPs natively support 20–40 payment methods. Getting to the 100+ that serious global SaaS needs means connecting multiple PSPs — which brings us to the next problem.

### 3. The Multi-PSP Management Tax

Once you connect a second PSP, you've created:
- Two reconciliation feeds to match against your billing system
- Two webhook formats with different error semantics
- Two sets of decline codes that mean slightly different things
- No automatic failover when one PSP underperforms in a region

Engineering teams end up building internal orchestration layers — which is exactly what Clink's smart routing was designed to replace. But most companies don't build them. They accept the revenue leakage.

---

## The Third Option: Unified Payment Infrastructure

The MoR vs PSP framing assumes you pick **one**. But that's a false binary born from a market where these were separate products.

Clink combines both models in a single integration:
- **PSP-agnostic routing**: Connect your existing Stripe, Adyen, or Checkout.com accounts. Clink routes intelligently across them.
- **MoR-level compliance**: Clink acts as merchant of record where needed — handling tax, refunds, and chargebacks in markets you haven't registered in.
- **Your brand stays on the invoice**: Unlike traditional MoRs, Clink keeps your name and logo on every customer touchpoint.
- **Portable subscription data**: Your billing logic lives in Clink's independent layer, not locked inside any processor's proprietary models.

This approach lets you go fast with MoR coverage in new markets while maintaining full PSP control in your core geographies. You're no longer choosing between speed and control — you're using each model where it makes sense.

![Payment Infrastructure Comparison](/blog/mor-vs-psp-comparison.svg)

---

## How to Decide: A Step-by-Step Playbook

### Step 1: Map Your Current and Planned Markets

List every country where you have paying customers today, and every country you plan to enter in the next 18 months. For each, note:

- Tax registration thresholds (digital services)
- Required local payment methods
- Currency
- PSP coverage quality (good / partial / none)

If your map shows 15+ countries with tax obligations, an MoR — or a hybrid model — saves months of registration work.

### Step 2: Audit Your Billing Model

Complex pricing models create more tax edge cases. If you're selling flat monthly subscriptions in one currency, an MoR's tax engine handles it trivially. If you're doing usage-based billing, multi-currency catalogs, or hybrid plans with credits and add-ons, most MoRs struggle to model your pricing accurately — and you'll end up with tax discrepancies that your finance team will only discover at reconciliation.

### Step 3: Assess Your Team's Compliance Bandwidth

Be honest: if the EU tax authority sends a letter asking for 18 months of transaction records, can you produce them in 30 days? If not, you need either an MoR or someone on payroll who can.

### Step 4: Run the Numbers

| Cost Factor | PSP (Stripe) | MoR (Paddle) | Clink (Hybrid) |
|-------------|-------------|--------------|-----------------|
| Card processing | 2.9% + $0.30 | ~5% (all-in) | From 5% (MoR) |
| International cards | +1.5% | Included | Included |
| Tax calculation | +0.5% (Stripe Tax) | Included | Included |
| Tax filing | DIY or CPA ($5K–50K/yr) | Included | Included |
| Chargeback management | $15/ dispute + DIY | Included | Included |
| Multi-PSP routing | DIY integration | Not available | Included |

For a $100K MRR SaaS selling in 15 countries, the all-in cost of a PSP stack (Stripe + Stripe Tax + CPA for filing + 2 additional PSP integrations) frequently lands in the 4–6% range — comparable to MoR pricing but with significantly more operational overhead.

---

## Case Study: The "Hybrid" Pattern

A common pattern among Clink customers:

1. **Launch**: Start with Clink's MoR mode across 30+ markets. No tax registrations, no CPA bills, no compliance team. Ship in weeks.
2. **Grow**: As revenue concentrates in the US and EU, register as a merchant in those jurisdictions. Connect your own Stripe account to Clink's routing layer.
3. **Optimize**: Route US/EU volume through your PSP for lower fees. Keep MoR coverage for emerging markets where registration isn't worth the overhead. Clink handles the routing, tax, and reconciliation across both models.

This is the pragmatic answer to the MoR-vs-PSP question: don't choose. Use each where it's optimal, and let infrastructure handle the seams.

---

## FAQ

### Can I switch from an MoR to a PSP later?

Yes, but it requires planning. You'll need to register for tax in jurisdictions where you meet thresholds, migrate customer payment tokens (if portable), and rebuild any checkout or billing logic that was tightly coupled to the MoR. The earlier you build on portable infrastructure — where your subscription data lives independently of any processor — the easier the transition.

### Does Stripe offer an MoR solution?

No. Stripe is a PSP. Stripe Tax adds calculation, but you remain the merchant of record — responsible for registration, filing, and liability. If you need MoR, you need Paddle, Lemon Squeezy, or Clink.

### What about Paddle vs Clink?

Paddle is a pure MoR — great if you want to offload everything, but you lose merchant identity, multi-PSP routing, and the ability to graduate to direct PSP status later without a full migration. Clink offers MoR plus the option to connect your own PSPs for hybrid routing, keeping your data portable and your brand on the invoice.

### Is MoR more expensive than PSP in the long run?

For a US/EU-only SaaS with simple pricing, PSP is cheaper by 1–2 percentage points. For a global SaaS with complex billing, the operational cost of managing tax, chargebacks, and multi-PSP infrastructure usually exceeds the MoR premium. Run the numbers for your specific scenario — the comparison table in this article is a starting point, not financial advice.

### Do I need an MoR if I only sell B2B?

B2B sales face different tax rules — often reverse-charge VAT in the EU, and many countries exempt B2B digital services if the buyer provides a valid VAT ID. But you still need to collect and validate those VAT IDs, and you still need to register in countries where B2C sales exceed thresholds. An MoR handles B2B as well — automatically applying reverse-charge logic where applicable — but the economics are different: if your customer base is 90% B2B with valid tax IDs, running your own PSP + tax tool is more cost-effective.

### Can I use Clink with my existing Stripe account?

Yes. Mount your Stripe keys in Clink's routing layer, and Clink will route US/EU volume to Stripe while providing MoR coverage for markets where you haven't registered. There's no migration — your Stripe integration keeps working exactly as it does today.
