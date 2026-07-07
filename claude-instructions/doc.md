# doc.zkyc.tech — Required Updates

Purpose: this file briefs another Claude instance working **in the `doc.zkyc.tech` repo** (a separate codebase from this marketing site) on the changes required by the "zKYC Website Update Brief" (July 6, 2026). That PDF's sections 1–4 have already been implemented in `zkyc-main-website` (this repo); this file covers only **section 5 — docs pricing pages** plus the docs-relevant parts of sections 6–7, which could not be applied here because the docs live in a different repo/deployment.

The instance working on this should **not assume** the docs site's framework, folder layout, or sidebar-config format — that repo hasn't been inspected. First step there should always be locating the actual sidebar config and pricing page(s) before editing (see "Before you start" below).

## Before you start

1. Find the sidebar/nav config (likely something like `mint.json`, `docs.json`, `_meta.json`, `sidebars.js`, or similar depending on the docs framework in use) and locate the entries currently labeled **"zKYC services"** and **"Agent services"**.
2. Find the actual pricing content pages those entries point to.
3. Treat the numbers below as the source of truth — they match what's now live on the main site (`zkyc-main-website/sections/Pricing.tsx`). If the docs currently show different numbers, the docs are stale and should be brought in line with these, not the other way around.

## Sidebar rename

| Current label | New label |
|---|---|
| zKYC services | Human KYC Pricing |
| Agent services | Agent KYA Pricing |

## 5.1 Human KYC Pricing page

**Page intro copy:**
> Verification pricing for teams using zKYC for private, reusable identity verification.

**Pricing table:**

| Plan | Best for | Starting price | CTA | Badge |
|---|---|---|---|---|
| Basic KYC | Pay-as-you-go identity verification | $1.50 / verification | Sign up free | MOST POPULAR |
| Pro KYC | Regulated and growing teams | $1.85 / verification | Sign up free | No badge |
| Enterprise | Custom compliance workflows and high-volume teams | Contact sales | Book a sales call | No badge |

**Plan details:**

*Basic KYC* — Starting at $1.50 per verification.
- ID Verification
- Liveness and Face Match
- Reusable KYC proof
- Dashboard access
- API and SDK access

*Pro KYC* — Starting at $1.85 per verification. Includes everything in Basic, plus:
- AML Screening
- Proof of Address
- Enhanced compliance checks
- Priority support

*Enterprise* — Contact sales. Includes everything in Pro, plus:
- Database validation
- Business verification
- Fraud detection and prevention solution
- Ongoing monitoring, financial and non-financial
- Volume pricing
- Custom workflows
- Dedicated onboarding
- SLAs and support
- Multi-team or ecosystem deployment

**Human KYC Volume Pricing** (separate table below the three plan cards):

| Volume Tier | Tier Volume | Price per KYC |
|---|---|---|
| 10,000 KYCs | 10,000 | $1.25 |
| 50,000 KYCs | 50,000 | $1.10 |
| 100,000 KYCs | 100,000 | $1.00 |
| 250,000+ KYCs | 250,000+ | $0.95 |

Note: $100 deposit to start.

> Note: neither Basic nor Pro currently carries a "first 25 verifications free" promotion on the main site — that promo copy was removed from the landing page pricing cards. Don't add it to the docs either unless the team explicitly confirms it should come back (see Open items).

## 5.2 Agent KYA Pricing page

**Page intro copy:**
> Know Your Agent pricing for autonomous AI agents, agent marketplaces, and agent payment networks.
>
> $2.50 per agent. Pay as you go for your first 1 to 99 agent verifications.
>
> As low as $1.25 per agent. Volume discounts begin at 100+ agents.
>
> $100 deposit to activate.

**Agent KYA Pricing Table** (single unified table — do not split into two separate cards the way the main site does; the docs present this as one table per the brief):

| Volume Tier | Tier Volume | Price per Agent |
|---|---|---|
| Pay-as-you-go | 1 to 99 agents | $2.50 |
| 100+ agents | 100 | $2.00 |
| 1,000+ agents | 1,000 | $1.75 |
| 10,000+ agents | 10,000 | $1.50 |
| 50,000+ agents | 50,000+ | $1.25 |

**Included with Agent KYA:**
- Agent identity verification, KYA
- Reusable agent credential, ERC-8004
- Trustless agent payments, X402
- Time-bound, instantly revocable authority
- SDK and API access

**CTA section:**
> Start with pay-as-you-go or contact sales for bulk agent credits.
- Sign up for free
- Contact Sales

## Consistency requirements (apply across both pages)

- Use these exact terms/casing everywhere: **Human KYC**, **Agent KYA**, **AI Agents · KYA** (main site's tab label, for cross-referencing), **ERC-8004**, **X402** (capital X — confirmed consistent on the main site, carry the same casing here).
- Plan names, prices, and feature wording should match the main site's `Pricing.tsx` exactly — if a number changes on the main site in the future, mirror it here. Consider linking to or generating this table from a shared config if the docs and main site ever end up in a monorepo; today they're separate repos so it's a manual sync.

## Open items (not yet decided — confirm before implementing, don't guess)

These were flagged as unresolved in the original brief and still apply to the docs specifically:
- [ ] Final signup URL for all "Sign up free" / "Sign up for free" CTAs.
- [ ] Final sales/demo booking URL for "Book a sales call" / "Contact Sales" CTAs.
- [ ] Whether the $100 deposit language should appear on **both** Human KYC volume pricing and Agent KYA volume pricing on the main site too, or stay docs-only (currently it's docs-only per this brief).
- [ ] Whether "first 25 verifications free" should be reinstated anywhere (main site or docs) — currently removed from both by default.
- [ ] Whether X402 should render as "X402" or "x402" — main site uses "X402" consistently; recommend the docs match unless told otherwise.
