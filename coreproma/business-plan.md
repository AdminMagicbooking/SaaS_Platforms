---
product_name: COREPROMA
slug: coreproma
business_plan_version: 0.1
business_plan_last_reviewed: 2026-05-23
business_plan_owner: Franck
business_plan_status: draft
audience: internal
---

# COREPROMA — Business Plan

> **Status:** draft · Last reviewed: 2026-05-23 · Owner: Franck
>
> Strategic source of truth for COREPROMA. Capabilities live in `product-spec.md` — not duplicated here.
> First version generated 2026-05-23 from the product-spec; numbers marked **TODO** must be filled before this can be called v1.

## 1. Pitch
*60 words max.*

COREPROMA is an all-in-one construction project management platform for two distinct audiences: construction professionals (entrepreneurs, architects, PMs) running multiple client projects, and homeowners running their own renovation. It centralises quotes, invoices, documents, photos, team comms, site meetings, AI-generated meeting reports, and embodied-carbon analysis — replacing the spreadsheet + WhatsApp + paper notebook stack the sector still uses.

## 2. Customer & problem

- **Primary persona (Pro):** Construction entrepreneur / architect / project manager running 2–10 active client projects, 1–10 internal users.
- **Primary persona (Individual):** Homeowner building or renovating, project value €30k–€500k, no construction background.
- **Their job-to-be-done:** keep budgets, quotes, invoices, documents, photos, contractor messages, and meetings under control across multiple sites — without losing anything in WhatsApp or email threads.
- **What they use today:** Excel + WhatsApp groups + email + paper folders + (for some) dedicated construction software like Batappli, Onaya, or Procore (the latter overkill for SMB).
- **Willingness to pay — evidence:**
  - Live pilot (Chiola Construction) is a paying user.
  - Competitor benchmark: Batappli ~€40/mo, Onaya from €99/mo, Procore enterprise-only. Our Pro plan at €499/yr (~€42/mo) is positioned between the cheap French tools and the heavy enterprise stack.
  - Marketing claim "€99.80 per project — one referral pays for the platform" is **internal copy**, not validated unit economics. Treat as a positioning anchor, not a proven ROI.

## 3. Market

- **TAM (Total Addressable Market):** [TODO — UK + France SMB construction firms <50 employees + active home renovators. Source needed: INSEE / ONS construction sector counts.]
- **SAM (Serviceable Addressable Market):** [TODO — narrow to FR-speaking + EN-speaking SMB construction firms that already use *some* digital tool.]
- **SOM (Year-1 reachable):** [TODO — pessimistic estimate based on current marketing channels (website, demos, partner referrals).]
- **Competition:**

| Alternative | Their price | Why we win / lose vs them |
|---|---|---|
| Batappli | ~€40/mo | Cheaper than us, French-only, no carbon tracker, no homeowner plan. We win on Pro multi-project, lose on price for single-project users. |
| Onaya | from €99/mo | Heavier suite, accountant-focused, no client portal, no PWA-on-site UX. We win on mobile/site UX and embodied-carbon. |
| Procore / Buildertrend | enterprise, $€€€ | Enterprise tier, US-anchored, too heavy for SMB. We win on price and SMB fit. |
| Spreadsheets + WhatsApp | "free" | Status quo. We win on data integrity, lose on inertia. |

## 4. Business model

- **Pricing tiers (confirmed in product-spec):**
  - Individual €149/yr (~£129/yr) — 1 project, 5 users
  - Professional €499/yr (~£429/yr) — 5 projects, 10 users/project, multi-project dashboard, company collaboration, carbon tracker
  - Enterprise — custom pricing
- **Billing model:** Annual subscription, paid upfront via Stripe.
- **Trial:** 7-day free, no card taken.
- **Refund policy:** Non-refundable after trial, cancel-anytime (access until end of period), 14-day dispute window.
- **Channel:** Self-serve (website + interactive demos in FR/EN) + booked demos (cal.eu/coreproma/demo) + Chiola pilot word-of-mouth.
- **Estimated sales cycle:** [TODO — likely 7–30 days self-serve, 30–90 days for booked-demo Pro.]
- **Currency:** Dual-listed EUR + GBP (D-06 currency policy still open at portfolio level).

## 5. Unit economics (today's best estimate)

| Metric | Value | Source / assumption |
|---|---|---|
| ARPU monthly (Pro) | ~€42 | €499/yr ÷ 12. Real cash flow front-loaded since billed annually. |
| ARPU monthly (Individual) | ~€12 | €149/yr ÷ 12. |
| Gross margin % | TODO | Need infra cost / customer first (see `_portfolio/costs/monthly/`) |
| CAC | TODO | No paid acquisition yet → CAC ≈ time + word-of-mouth. Quantify when paid channels start. |
| LTV (12-month) | TODO | Need churn cohort data. |
| Payback (months) | TODO | Annual prepay means payback is immediate if CAC < ARPU × 12 × gross margin. |
| Infrastructure cost / customer / month | TODO | Once we know total monthly infra and active customer count. |

**Honest note:** without churn data, LTV is a guess. Six months of Stripe data is the minimum to model this credibly.

## 6. Traction (as of 2026-05-23)

- **Paying customers:** TODO — pull from Stripe (count active Individual + Pro subscriptions)
- **MRR / ARR:** TODO
- **Active pipeline:** TODO
- **Churn (last 90 days):** TODO
- **Notable wins / losses this month:** Chiola pilot continues; business plan v0.1 drafted.

## 7. 12-month projection — three scenarios

> All projections are **placeholder shapes**. Replace with real numbers after 2–3 months of Stripe data and at least one paid-acquisition test.

| Scenario | Customers M+12 | MRR M+12 | Investment needed | Trigger to switch |
|---|---|---|---|---|
| **Base** | TODO | TODO | Stay bootstrapped | Status quo: organic + word-of-mouth |
| **Optimistic** | TODO | TODO | £TODO marketing budget | If FR paid-acquisition test yields CAC < €100, scale to £X/mo |
| **Wind-down** | <20 paying customers by M+9 | <€500 MRR by M+9 | — | Cut marketing spend, maintain mode only |

## 8. Roadmap & milestones (12 months)

- **Q1 (now → 2026-08):**
  - Resolve currency policy (D-06) — pick one display currency or commit to dual-pricing UX
  - Fill traction numbers from Stripe; first 3-month cohort churn baseline
  - First paid acquisition test (FR Google Ads or similar) — establish CAC ballpark
- **Q2 (2026-08 → 2026-11):**
  - Decide on a second pilot beyond Chiola (architect or larger entrepreneur)
  - Carbon module sales positioning: is it a real driver of Pro upgrade, or feature theatre?
  - Embodied-carbon module reuse decision (D-02) — share with Jobs Tracker or rebuild?
- **Q3 (2026-11 → 2027-02):**
  - Ecosystem hand-off prototype: COREPROMA project pre-fill from FindAllProperty (if FindAllProperty v1.0 is live)
  - Pricing tier review based on 6 months of customer behaviour
- **Q4 (2027-02 → 2027-05):**
  - Decide: continue investing in COREPROMA solo, or co-fund Jobs Tracker integration (D-01)
  - Year-1-after-pilot retrospective: did the assumptions hold?

## 9. Risks (top 3)

1. **Single-pilot dependency (Chiola Construction).** Most production validation comes from one customer. Risk: their feedback shapes the product in ways a second customer would reject.
   *Mitigation:* land a second pilot in a different size segment (architect or larger contractor) by Q2.
2. **Carbon module is unproven as a buying driver.** It's a flagship Pro feature, but no evidence yet that customers upgrade *because* of it (vs general Pro feature stack).
   *Mitigation:* track Pro upgrades that cite carbon explicitly in onboarding; if rate <20% by M+6, repurpose the module.
3. **Currency confusion (EUR + GBP).** Listing both currencies in marketing materials creates conversion friction and downstream Stripe Tax complexity.
   *Mitigation:* resolve D-06 by Q1.

## 10. Ask / next decision

- **Decision needed (Mark):** Is COREPROMA the financial anchor of Play 1, or is FindAllProperty? This affects where marketing budget goes when it becomes available.
- **No external funding ask at this stage** — current state is bootstrapped, runway-positive from Pro subscriptions assuming infra cost is contained.
- **Internal milestone before this BP becomes v1.0:** fill all TODO lines, run one paid acquisition test, gather 3 months of Stripe data.

---

## How to update this file
- Re-review monthly. Update §5 and §6 every month from Stripe + Azure data.
- Update §7 projections every quarter or when reality breaks the assumption.
- Linked open decisions: D-02, D-06, D-08, D-09 (Jobs Tracker naming — only indirect impact).
