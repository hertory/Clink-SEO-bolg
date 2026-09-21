---
title: "Clink Agent Wallet: Now Live on Familiar Card Rails"
description: "The Clink Agent Wallet is generally available: card-linked agent payments for Shopify checkout flows, APAC pickup, and per-use API purchases."
slug: "clink-launches-agent-wallet"
date: "2026-09-22"
category: "Agentic Payments"
secondaryCategory: "Product"
author: "Clink Team"
readingMinutes: 12
---

## TL;DR

- The Clink Agent Wallet is a card-linked, tokenized authorization and payment layer that lets AI agents pay on a user's behalf over familiar fiat and card-payment rails — and it is generally available as of today.
- Purchases are authorized per instruction, with a scope, an amount cap, and a validity window; a Visa Payment Passkey authenticates each instruction, and the agent never sees raw card details.
- Three surfaces are live today: supported checkout flows across Shopify storefronts globally, offline pickup with selected coffee and food partners in APAC, and per-use API purchases such as model tokens, paid tools, and credits top-up.
- Budgets, caps, and risk controls ship in the wallet, and every authorization and outcome is visible in the Clink Agent Wallet Dashboard.
- Existing merchants receive agent payments through their current storefront, checkout, processor, and settlement — no rebuild required.

Clink launches agent wallet capabilities that are live today, not on a waiting list. A user connects a Visa card once; an agent then pays for approved purchases inside set limits, while the card stays tokenized and every transaction is recorded and visible. Developer and partner integration is available in Early Access.

## The Clink Agent Wallet Is Generally Available

As of September 22, 2026, the user-facing Clink Agent Wallet is generally available. Users can connect a Visa card, define what their agent is allowed to buy, and let the agent complete those purchases on the payment rails they already use every day. The announcement marks the point where agent payments stop being a demo and start being something a user can switch on this afternoon. The word "launch" does a lot of work in payments, where announcements sometimes outrun availability; this one is anchored to surfaces a user can transact on today.

Mechanically, the wallet is a card-linked, tokenized authorization and payment layer. That phrasing is deliberate, because "agent wallet" has come to mean at least three different things across the industry, and this product is the kind that sits between an AI agent and a conventional card — not a crypto account and not a prepaid card. If you want the full map of wallet types before going deeper, our explainer on [what an AI agent wallet actually is](/blog/what-is-ai-agent-wallet) covers the taxonomy.

General availability also changes the conversation a builder can have with users. A prototype payment path forces every conversation into the conditional tense — what the product will support once the pilot concludes. A generally available one lets a builder answer in the present tense: the wallet exists, the card connects, the dashboard shows the history. For products whose premise is autonomy — research agents, shopping agents, operations agents — that difference decides whether payment is a feature or a roadmap promise.

The timing is not accidental. Payments companies and card networks across the industry have spent the past year announcing agent-commerce programs, pilots, and protocols, and builders have been left to wonder which of them a real user can actually use. What distinguishes this launch is that the consumer-facing piece — a wallet a user connects a card to — is live on card rails today, with concrete places to spend through it.

## What You Can Do With It Today

Three purchase surfaces are live as of September 2026, and each maps to something builders and users actually do. Together they cover a meaningful spread: online checkout, physical-world pickup, and machine-to-machine API spend.

The first surface is supported checkout flows across Shopify storefronts globally. An agent can complete a purchase where a storefront's checkout flow supports agent payment — and the wording matters, because coverage is at the flow level rather than a blanket claim over every merchant on the platform. For a user, though, the experience is the familiar one: the agent finds the product, the purchase instruction authorizes it, and checkout completes on the storefront the user chose. For builders, that surface answers the distribution question that has shadowed agentic commerce all year: an agent is only useful as a shopper if there are real storefronts at the other end. Flow-level support means the integration rides on checkout flows that already process card payments, rather than asking merchants to stand up a parallel agentic storefront.

The second surface is offline pickup in APAC with selected coffee and food partners. Here the agent places the order and pays; the user walks to the counter, presents the pickup code the wallet returns, and collects. The wallet also surfaces order status, so the handoff from screen to counter stays trackable instead of becoming a guess about whether the order went through. It is also a quietly important design point for agentic commerce: a large share of everyday commerce is not checkout on a website but a physical exchange at a counter. A wallet that only works on the web handles the first case; one that returns a pickup code and order status handles both.

The third surface is per-use purchases of API products: model tokens, paid tools, and credits top-up. This is the one AI builders will recognize immediately, because it addresses a real workflow gap — an agent that runs out of tokens or needs a paid tool mid-task currently has to stop and wait for a human to top up an account. With the wallet, that purchase can happen inside the limits the user has already set, and the task continues. For SaaS and API businesses, the same surface reads from the other side: per-use purchases are a way to sell to agents without building a bespoke billing integration for them, because the purchase happens per use, inside a mandate the user set, and settles through the card system.

## How a Purchase Works: The Visa Intelligent Commerce Chain

Every purchase runs through a four-step authorization chain built on Visa Intelligent Commerce, and the design principle is easy to state: the agent receives only the credential it needs, only after the user's instruction has been authenticated. Visa describes the broader program on its [Intelligent Commerce page](https://www.visa.com/en-us/solutions/intelligent-commerce).

The chain starts when a user connects a Visa card. The card is tokenized at connection and stored in a PCI-compliant payment vault, and the agent works with a token rather than a card number. There is no raw card detail sitting in the agent's context to leak, log, or expose through a prompt injection, because the agent never holds one. That single property eliminates an entire class of incidents — a context window is not a vault, and anything an agent can read should be assumed extractable.

Before any purchase, the user issues a purchase instruction that defines what the agent may do: the scope of the purchase, an amount cap, and a validity window. That instruction is a mandate for a specific purchase or task, not a blank check drawn on the card. When the agent later initiates a transaction, a Visa Payment Passkey authenticates the user's purchase instruction, and only then are transaction-specific credentials released for that single purchase.

The fourth step is the audit trail. Transaction-level records link the agent, the mandate or instruction behind the purchase, the order and payment IDs, and the outcome. When a user asks "what did my agent buy?", the answer is a traceable chain from instruction to receipt — which is what makes delegating payments to software defensible in the first place. Clink is also collaborating with Visa on the Trusted Agent Protocol, an industry framework for establishing trust between agents and the merchants that receive them. For the background on this partnership, see our write-up on [Clink and Visa's Intelligent Commerce collaboration](/blog/clink-and-visa-partner-on-intelligent-commerce).

Read as a stack, the four steps separate concerns that agents routinely conflate. Tokenization removes the secret from the agent's reach; the instruction removes the decision from the agent's discretion; the passkey re-anchors the transaction to a human at the moment credentials move; and the records make the whole sequence reviewable after the fact. A builder evaluating any agent-payment design can use those four properties as a checklist — and, more practically, can explain to a cautious user exactly which part of the system prevents which failure mode.

## Guardrails and Visibility, Built In

The wallet ships with spending controls that operate before, during, and after a purchase. The short version: users set budgets and caps, mandates define what each authorization covers, and a risk layer can pause the wallet on its own when transaction patterns look unusual. The complete control set gets its own treatment in our deep dive on [AI agent spending limits](/blog/ai-agent-spending-limits); the essentials are:

- Total and daily budgets, plus a per-transaction cap on any single purchase
- Per-purchase or per-task authorization, with mandates scoped to a merchant or purchase target
- Validity periods on every mandate, which can be set as recurring or one-time
- Top-up frequency limits, alongside a daily top-up budget in the risk layer
- Automatic pausing on unusual transaction patterns, so the wallet protects itself when behavior deviates

Two further controls matter for trust in automated flows. The payment path uses idempotency and single-checkout-attempt controls, which means an agent retrying a stalled request cannot accidentally pay twice for the same thing. And everything lands in the Clink Agent Wallet Dashboard, where the transaction history shows each authorization, the risk controls that applied, and the outcome — paid, failed, or cancelled — so users audit their agent's behavior in one place rather than across bank statements.

## What This Means for Merchants

If you already sell through Clink or accept card payments as a Clink merchant, you do not need to rebuild anything to accept agent payments. Orders arrive through your current storefront, your current checkout, your existing processor, and your existing settlement — the agent initiates the purchase, but the money moves through the rails you already operate on. Reconciliation looks the same as it does for any other card order, which means finance teams do not inherit a new category of paperwork on day one.

The optional step is making your products discoverable to agents in the first place. Merchants can expose an MCP server, a Skill, or a Catalog endpoint so that agents can find what they sell and what it costs, and listing through the [Clink Skill Marketplace](/blog/what-is-skill-marketplace) is one route to that visibility. Merchants who do nothing still get paid; merchants who opt in simply get found more often. Discovery also compounds: an endpoint that describes products in a machine-readable way serves every agent that speaks to it, not one custom integration per agent platform. That is the same logic that made structured product data worth maintaining on the web, applied to a new class of buyer.

When something goes wrong, the familiar card-rail mechanics apply. Refunds, chargebacks, and disputes run through the existing processes your business already uses — an agent-initiated purchase is reversible the same way any card purchase is. The public [Clink Payment Skill](https://github.com/clinkbillcom/agentic-payment-skills) supports issuing a full refund against the original order ID, which matters for automation: the reversal itself can be handled programmatically. Dispute outcomes, as with any card transaction, follow the issuer's and processor's own review rather than a guaranteed result.

## Where the Agent Wallet Fits: Familiar Fiat Rails

The Clink Agent Wallet is deliberately not a parallel financial system. Users pay with the fiat currency and card rails they already use; the wallet's job is authorization — defining, enforcing, and recording what an agent may buy — not replacing the payment network underneath. That division of labor is what lets the wallet ship globally without asking anyone to change how money actually moves. The restraint is easier to see by contrast. Designs that ask users to preload a separate balance move the trust problem backwards — the user must part with funds before the agent has earned any — while designs that hand raw card details to an agent move it somewhere no dashboard can reach. Card-linked tokenization keeps the funds where they are and meters the authority to use them, which is a closer fit for how card payments already earn trust.

For builders, the positioning has a practical consequence: adoption does not require teaching users to acquire a new currency or move funds somewhere new before an agent can act. The funding source is a Visa card the user already trusts, and the trust question reduces to one the industry can actually answer — what is the agent allowed to buy, and who checked. For how the wider category fits together, our overview of [how agent payments work](/blog/agent-payments) covers the stack end to end, and [the 2026 infrastructure landscape](/blog/ai-agent-payments-infrastructure) maps who builds each layer.

Builders and partners who want to embed agentic payments into their own products can join the developer and partner integration program, an onboarding-led, MCP-based offering currently in Early Access. A REST API and a self-serve developer product are on the roadmap for later. The sequence is deliberate: put the wallet in users' hands first, then widen the integration surface as the ecosystem matures. The user-facing wallet, though, carries no such label: it is generally available now.

## Conclusion

The Clink Agent Wallet is generally available as of today. Three purchase surfaces are live — supported Shopify checkout flows, APAC pickup with selected coffee and food partners, and per-use API purchases — and every transaction runs through Visa's tokenize, authorize, authenticate, and record chain. Guardrails and a transaction dashboard give users control and visibility, merchants accept agent payments with zero rebuild, and developers and partners can start integrating through the Early Access program.

Connect a card and issue your first purchase instruction at [clinkbill.com](https://clinkbill.com/), or read the [documentation](https://docs.clinkbill.com/) for the details behind what shipped. Product details reflect clinkbill.com/docs as of September 2026.

## FAQ

### Is the Clink Agent Wallet generally available?

Yes. The user-facing wallet reached general availability on September 22, 2026. Only the developer and partner integration program carries an Early Access label, and a REST API plus a self-serve developer product remain roadmap items rather than launch requirements.

### Does the Clink Agent Wallet hold a balance or use cryptocurrency?

Neither. The wallet is card-linked: a user's Visa card is tokenized at connection, and purchases are made in familiar fiat over standard card rails. There is no stored-value account to preload and no digital currency to acquire before an agent can spend.

### Where can an agent actually pay today?

Three surfaces are live as of September 2026: supported checkout flows across Shopify storefronts globally; offline pickup with selected coffee and food partners in APAC, where the wallet returns a pickup code and order status; and per-use API products such as model tokens, paid tools, and credits top-up.

### Can the agent see my card number?

No. The card is tokenized when it is connected and kept in a PCI-compliant payment vault, and the agent works only with the token. Before transaction-specific credentials are released for any purchase, a Visa Payment Passkey authenticates the user's purchase instruction, so raw card details never enter the agent's context.

### How do refunds work if a purchase goes wrong?

Through the standard card-rail mechanisms: refunds, chargebacks, and disputes follow the existing processes between merchant, processor, and issuer. The public Clink Payment Skill supports a full refund against the original order ID, but the outcome of any chargeback is decided by the issuer's review, not guaranteed in advance.

### Do I need new checkout infrastructure to accept agent payments?

No. Existing Clink and card-payment merchants receive agent payments through their current storefront, checkout, processor, and settlement. Exposing an MCP server, Skill, or Catalog endpoint so agents can discover your products is optional and additive, not a requirement for getting paid.
