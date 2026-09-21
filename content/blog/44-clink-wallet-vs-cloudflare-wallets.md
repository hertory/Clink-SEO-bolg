---
title: "Clink Wallet vs Cloudflare Wallets: Two Paths"
description: "Clink Wallet vs Cloudflare Wallets: two paths to agent payments. Compare status, funding, guardrails, and merchant acceptance, as of September 2026."
slug: "clink-wallet-vs-cloudflare-wallets"
date: "2026-09-26"
category: "Agentic Payments"
secondaryCategory: "Product"
author: "Clink Team"
readingMinutes: 12
---

## TL;DR

- **Clink Wallet vs Cloudflare Wallets is a comparison of two paths, not two substitutes.** Cloudflare Wallets bind agent identity and a buyer-side wallet into the Cloudflare account ecosystem, designed to hold stablecoins and settle over x402. The Clink Agent Wallet puts agent payments on cross-platform payment infrastructure built on familiar fiat and card rails, with no stored-value balance.
- As of September 2026, Cloudflare Wallets is announced: handle reservations are open, and full wallet functionality — onramp, offramp, and issuing Virtual Wallets — is described as arriving in the coming months.
- The user-facing Clink Agent Wallet is generally available as of September 2026; developer and partner integration remains in Early Access.
- Cloudflare constrains each agent wallet with three guardrails — an allowance, an approved merchant list, and a maximum transaction size. Clink layers budgets, per-purchase authorizations, and a risk layer on top of tokenized Visa credentials.

If you want the short version: teams whose agents already live inside the Cloudflare ecosystem should evaluate Cloudflare Wallets on its own terms, while teams whose agents need to pay across many merchant surfaces — storefronts, offline pickup, API products — should evaluate card-linked infrastructure such as the Clink Agent Wallet.

## Two Paths to Agent Payments

The query "Clink Wallet vs Cloudflare Wallets" sounds like a head-to-head product matchup, but the more accurate frame is two different starting points for the same problem: letting an AI agent pay on a human's behalf, under controls that human actually trusts. Both products answer the question every deployment team now faces — an agent that can browse and decide is not useful for commerce until it can also transact, and someone has to define what it is allowed to buy and how much. Where they diverge is in what they anchor the agent to: one anchors it to a platform ecosystem, the other to the existing payment card system.

Cloudflare's path starts with identity and stays inside its own ecosystem. Announced on August 4, 2026, Cloudflare Wallets pair a two-tier wallet structure with a cloudflare.pay identity layer, so an agent gets a human-readable handle and a wallet scoped to a Cloudflare account. Funds are designed to sit inside that ecosystem as stablecoins, and settlement runs over x402, the HTTP-native payment protocol. Our earlier [Cloudflare Wallets coverage](/blog/cloudflare-wallets-agent-payments) walks through the announcement in detail.

Clink's path starts with payment infrastructure instead. The [Clink Agent Wallet](/blog/clink-launches-agent-wallet) is card-linked: the user's card is tokenized when it is connected, and every agent purchase is authorized against familiar fiat and card rails rather than against a platform balance. That choice has a cascading effect on everything else — where agents can pay, how purchases are authorized, how refunds work, and how much of the existing merchant ecosystem works on day one.

This distinction matters because evaluation teams rarely face a migration decision between the two. The practical question is which path matches where your agents need to spend. If you are still deciding what an agent wallet should even do, start with [what an AI agent wallet is](/blog/what-is-ai-agent-wallet), then come back to this comparison with that baseline in place.

The comparison is also arriving at a moment when agent commerce has moved from demos to deployment planning. In 2026, payment networks, processors, and platform companies all shipped agent-payment products within weeks of each other, and procurement teams building shortlists now have to compare products that are at very different stages of availability. That is why every status claim in this article carries an as-of September 2026 stamp: a statement like "coming months" ages quickly, and anything you read here should be re-verified against both vendors at the moment you actually evaluate.

## What Cloudflare Wallets Is

Cloudflare Wallets is a [two-tier wallet system announced on August 4, 2026](https://blog.cloudflare.com/wallets/), alongside a cloudflare.pay identity layer, designed to give AI agents both money and a recognizable identity within the Cloudflare ecosystem. The design deliberately mirrors how Cloudflare already treats accounts, API keys, and bot verification — wallet infrastructure that behaves like the rest of the platform.

The first tier is the Account Wallet, which belongs to the human account owner and holds the funds. Cloudflare has said these wallets will initially hold stablecoins, but the specific asset has not been published; the company has publicly discussed a stablecoin concept called NET Dollar, yet as of September 2026 it has not confirmed that NET Dollar is what Account Wallets will hold. From the Account Wallet, the owner delegates spending to the second tier: a Virtual Wallet issued per agent and accessed through API keys, with spending capped by limits the owner sets. Handle reservations through cloudflare.pay are already open — one handle per account — though handles carry no funds yet.

Every Virtual Wallet operates inside three guardrails: an allowance that caps total spend, an approved merchant list that limits where the agent can pay, and a maximum transaction size for any single purchase. The appeal of this design is legibility. An owner reasoning about exposure asks three questions — how much in total, to whom, and how big per transaction — and each one maps to exactly one control. The trade-off, developed further in the side-by-side below, is that all three controls sit at the wallet level rather than at the level of an individual purchase. On the identity side, each wallet handle is a human-readable name built on the keypair infrastructure of Web Bot Auth and Turnstile, with optional declaration when merchants need it — turning an otherwise opaque keypair into something a counterparty can read.

Availability is the caveat. As of September 2026, the full wallet functionality — onramp and offramp of funds, and the issuing of Virtual Wallets — was still described as coming in the following months, with funding via bank transfer part of that planned rollout. Custody arrangements and fees are not published. Settlement is x402-native: on the seller side, [Cloudflare's Monetization Gateway](https://blog.cloudflare.com/monetization-gateway/) (announced July 1, 2026) already lets sites charge x402 micropayments for pages, datasets, APIs, and MCP tools, so the demand side of that market is what Wallets are meant to fill.

Cloudflare's approach has genuine strengths worth naming. The human-readable identity layer is the clearest one: by anchoring wallet handles to Web Bot Auth keypairs, Cloudflare gives agents a stable, verifiable identity that merchants can actually evaluate — a harder problem than payments alone. It is also native to the Workers and Agents ecosystem, so a team already running agents on Cloudflare gets identity, wallet, and settlement from one platform without integration work across vendors. And x402-native settlement fits machine-speed micropayments for APIs and content in a way card rails were never designed for. The open questions are the flip side of an early-stage design: analysts, including Simon Taylor, publicly flagged the risk that a misbehaving merchant-side retry loop could drain an allowance, and Cloudflare has described routing unusual spend to human review — a control that was described but not live as of September 2026.

## What Clink Agent Wallet Is

The Clink Agent Wallet is a card-linked, tokenized authorization and payment layer — generally available to users as of September 2026, with developer and partner integration in Early Access. It is not a stored-value product: when a user connects a card, it is tokenized and held in a PCI-compliant payment vault, and unspent funds never leave the user's funding source. There is no balance to top up and hold inside the wallet itself, which changes the risk profile of the whole arrangement — the user's money stays where it already was.

Every purchase runs through the Visa Intelligent Commerce chain. The card is tokenized at connection; the agent's intent to buy becomes a purchase instruction carrying a scope, an amount cap, and a validity window; the user authenticates with a Visa Payment Passkey; and the transaction produces a transaction-level record. That chain is the product of Clink's [partnership with Visa on Intelligent Commerce](/blog/clink-and-visa-partner-on-intelligent-commerce), and it means each agent purchase is authorized individually rather than drawn down from a pooled balance.

The control surface is correspondingly fine-grained. Users set total and daily budgets, a per-transaction cap, and top-up frequency limits; authorization is per-purchase or per-task, scoped by mandate to a specific merchant or purchase target, with validity windows and separate treatment for recurring versus one-time spending. A risk layer adds a daily top-up budget, a daily top-up frequency cap, and automatic pausing on unusual patterns, while idempotency and single-checkout-attempt controls prevent duplicated charges. Teams comparing [AI agent spending limits](/blog/ai-agent-spending-limits) across vendors will find the granularity here sits at the individual purchase level, not just the wallet level.

Acceptance runs over existing rails. The wallet works in supported checkout flows across Shopify storefronts globally, in offline pickup with selected coffee and food partners in APAC, and against API products on a per-use basis. On the merchant side, existing Clink and card merchants accept agent payments with zero rebuild, with optional exposure through MCP, Skills, and a product catalog for merchants who want to make their inventory agent-addressable. Because purchases ride normal card rails, refunds work through the same rails, including full refunds by order ID through the Payment Skill — though outcomes are subject to the underlying card process, and no guarantees are offered. Every transaction is visible in the Wallet Dashboard's transaction history, which gives both the human owner and any finance or audit function a per-transaction record rather than a running balance to reconstruct. Clink also participates in TAP as an active collaboration, alongside the Visa work.

## Side-by-Side: Five Dimensions

Both products solve agent payments, but they make different trade-offs on five dimensions that matter to evaluation teams. The table below compares them as of September 2026, using only publicly stated facts for Cloudflare.

| Dimension | Cloudflare Wallets | Clink Agent Wallet |
|---|---|---|
| **Status** | Announced August 4, 2026; handle reservations open; full wallet functionality (onramp, offramp, issuing Virtual Wallets) described as coming in the following months | User-facing wallet generally available; developer and partner integration in Early Access |
| **Funding asset** | Account Wallets hold funds "initially stablecoins"; specific asset unpublished; funding via bank transfer planned | Card-linked tokenized authorization layer; no stored-value balance; unspent funds stay with the user's funding source |
| **Authorization granularity** | Three guardrails per Virtual Wallet: allowance, approved merchant list, maximum transaction size | Total/daily budgets, per-transaction cap, per-purchase or per-task authorization, mandate-scoped merchant or purchase target, validity windows, recurring vs one-time, top-up frequency limits, plus a risk layer with automatic pausing |
| **Merchant acceptance** | x402-native settlement; seller side via Monetization Gateway for pages, datasets, APIs, and MCP tools | Supported checkout flows across Shopify storefronts globally; APAC offline pickup (selected coffee and food partners); API products per use; existing Clink and card merchants accept agent payments with zero rebuild |
| **Identity and protocols** | cloudflare.pay handles on Web Bot Auth and Turnstile keypair infrastructure, declaration optional; x402 settlement | Visa Intelligent Commerce chain: tokenization, purchase instruction, Visa Payment Passkey authentication, transaction-level records; TAP active collaboration |

The authorization row is where the philosophical difference is sharpest. Cloudflare scopes its guardrails at the wallet level — one allowance, one merchant list, one cap per agent — which is simple to reason about and matches how an owner delegates to a known set of destinations. Clink scopes controls at the purchase level: each buy carries its own instruction with scope, cap, and validity, sitting inside budgets and a risk layer. Neither model is strictly stricter; they constrain at different altitudes.

The acceptance rows describe two different markets. Cloudflare Wallets plug into the x402 economy — paying for APIs, datasets, pages, and MCP tools through the Monetization Gateway — which is a real and growing surface, but a specific one. Clink's surfaces are general-purpose commerce: Shopify checkout flows, physical pickup, and API products, accepted by merchants who have already built for cards. One thing both companies share: as of September 2026, neither publishes pricing, so any total-cost comparison at this stage would be speculation.

The status row deserves its own reading, because comparing an announced product to a generally available one is itself an evaluation criterion. A team that needs to ship agent purchasing this quarter is not comparing two products on equal footing; it is comparing a working integration against a roadmap with stated but unhired milestones. A team with a longer horizon may reasonably weight the architectures over the current status, and simply re-check availability when the evaluation window arrives. Treat the stamps in this article as a snapshot, not a verdict.

## Where Cloudflare Wallets Fits Best

Cloudflare Wallets is the stronger fit for teams that already operate inside the Cloudflare ecosystem. If your agents run on Workers and use the Agents SDK, the wallet arrives as a native extension of infrastructure you already manage: identity, spending delegation, and settlement come from the same platform, under the same account controls you use today. There is no separate vendor relationship to establish and no cross-platform token flow to reconcile.

It is also the natural choice when your agents' spending is x402-shaped. An agent that buys API calls, datasets, or paywalled content at micropayment scale matches exactly what the Monetization Gateway sells and what x402 settles, and the human-readable handle tied to Web Bot Auth gives the counterparty side of those transactions something solid to verify. For that ecosystem-bound, machine-speed use case, the design is coherent — provided your timeline accommodates a rollout whose full wallet functionality was still pending as of September 2026. The evaluation questions to put to Cloudflare are the ones its public materials do not yet answer: custody arrangements, fees, and the specific stablecoin asset, plus a date for Virtual Wallet issuance.

## Where Clink Agent Wallet Fits Best

The Clink Agent Wallet is the stronger fit when your agents need to spend broadly across surfaces rather than inside one platform. A purchasing agent that comparison-shops across Shopify storefronts, picks up coffee and food offline in APAC, and consumes paid APIs is operating in general commerce, and card rails are the one payment method accepted everywhere that commerce already happens. Because acceptance rides existing Clink and card merchant relationships, new merchant acceptance requires zero rebuild on the merchant side.

It is also the fit for teams whose control requirements are per-purchase rather than per-wallet. If the requirement is "this agent may spend up to a set cap on this specific order from this specific merchant, valid within a stated window" — scoped by mandate, authorized per task, refunded through normal card rails if something goes wrong — that granularity lives at the purchase-instruction layer, not in three wallet-level guardrails. And because there is no stored-value balance, unspent funds remain in the user's funding source, which finance teams tend to prefer when the alternative is preloading float across many agent wallets. The evaluation questions here are narrower: confirm which of your target surfaces are in the supported set, and how the per-purchase instruction flow maps onto your agents' existing checkout paths. For teams mapping the broader landscape of [agent payments infrastructure](/blog/ai-agent-payments-infrastructure), this is the infrastructure side of [agent payments](/blog/agent-payments) made concrete.

## Conclusion

Clink Wallet vs Cloudflare Wallets is best read as two paths, not a winner-takes-all matchup. Cloudflare binds agent identity and a buyer-side stablecoin wallet into its account ecosystem, with x402-native settlement and a handle system built on Web Bot Auth — a coherent choice for teams whose agents live and spend there, with full wallet functionality still ahead as of September 2026. Clink puts agent payments on cross-platform payment infrastructure using familiar fiat and card rails, trading ecosystem integration for breadth: agents that can pay across supported Shopify storefronts, offline pickup, and API products today, under per-purchase controls finer than wallet-level guardrails.

The decision heuristic is therefore not "which product is better" but "where do your agents spend." If the answer is inside one platform's API economy, evaluate that platform's wallet on its own merits. If the answer is across the open web's existing merchant base, evaluate card-linked infrastructure — and if that is your situation, [contact sales](https://clinkbill.com/contact) to see the Clink Agent Wallet against your actual purchase flows.

## FAQ

### Are Clink Wallet and Cloudflare Wallets direct competitors?

No — they are two different paths to agent payments rather than substitute products. Cloudflare Wallets anchor agent spending inside the Cloudflare account ecosystem with stablecoins and x402 settlement, while the Clink Agent Wallet authorizes agent purchases over existing fiat and card rails across many merchant surfaces. Most teams will evaluate whichever path matches where their agents actually spend, not choose between the two as rivals.

### What currency or asset does Cloudflare Wallets use?

As of September 2026, Cloudflare has said Account Wallets will initially hold stablecoins, without publishing which specific asset. The company has publicly discussed a stablecoin concept called NET Dollar, but it has not confirmed that NET Dollar is the settlement asset for Wallets, and settlement over x402 is the mechanism it has named. Custody and fee details are likewise not published.

### Is Cloudflare Wallets available to use today?

Partially. As of September 2026, users can reserve a cloudflare.pay handle — one per account, with no funds attached — but the full wallet functionality, including onramp and offramp of funds and the issuing of Virtual Wallets for agents, was described as coming in the following months. Funding via bank transfer is part of that planned rollout rather than a live capability.

### Is the Clink Agent Wallet generally available?

Yes — the user-facing Clink Agent Wallet is generally available as of September 2026. The Early Access designation now applies to developer and partner integration rather than the end-user wallet. Live surfaces include supported checkout flows across Shopify storefronts globally, offline pickup with selected coffee and food partners in APAC, and API products on a per-use basis.

### Which product has stricter spending controls?

Neither is simply stricter — they constrain at different levels. Cloudflare applies three guardrails per agent wallet: an allowance, an approved merchant list, and a maximum transaction size. Clink combines budgets, per-transaction caps, and top-up limits with a per-purchase authorization chain — each purchase carries its own scope, amount cap, and validity — plus a risk layer that can pause automatically on unusual patterns. Wallet-level caps are easier to reason about; purchase-level instructions are more precise.

### How much do Cloudflare Wallets or the Clink Agent Wallet cost?

Neither company publishes pricing as of September 2026. Cloudflare has not published custody or fee details for Wallets, and Clink operates a contact-sales model rather than a public price list, so no fee figures should be assumed for either side. Teams evaluating either product should request current terms directly from the vendor as part of the evaluation.
