---
product_name: Jobs Tracker
slug: jobstracker
business_plan_version: 0.1
business_plan_last_reviewed: 2026-05-23
business_plan_owner: Franck
business_plan_status: draft
audience: internal
---

# Jobs Tracker — Business Plan

> **Status:** draft · Last reviewed: 2026-05-23 · Owner: Franck
>
> Strategic source of truth for Jobs Tracker. Capabilities live in `product-spec.md` — not duplicated here.
>
> **⚠ Critical blocker:** D-01 (productisation path — COREPROMA module vs standalone SaaS) is **open**. Until it's resolved, revenue projections in §7 are placeholder.

## 1. Pitch
*60 words max.*

Jobs Tracker is a field-operations platform for UK construction, electrical and trades firms running 10–50 engineers. It replaces the standard spreadsheet + WhatsApp + Sage double-entry mess with one system: dispatch, GPS tap-in/out timesheets, RAMS sign-off, photo evidence, materials and variations capture, accounting export. Live pilot at CBES (~30 engineers).

## 2. Customer & problem

- **Primary persona:** Office-side Project Manager or operations director at a 10–50 engineer construction / electrical / trades firm.
- **Their job-to-be-done:** dispatch jobs, prove engineers were on-site, capture RAMS sign-off and on-site photos, get accurate timesheets into Sage, follow up commercial workflow without re-typing references into three systems.
- **What they use today:** spreadsheets + Sage 50 + WhatsApp groups + paper RAMS + occasional FleetSmart for vehicle tracking. Double and triple data entry everywhere.
- **Willingness to pay — evidence:**
  - CBES (pilot customer) is paying. Pilot terms: TODO confirm.
  - FleetSmart, the closest comparable, charges per-engineer-per-month — the product-spec references this as the pricing anchor.
  - Field-ops software in this segment (BigChange, Joblogic) is priced £15–£50 per engineer per month.

## 3. Market

- **TAM:** [TODO — UK SMB construction firms with 10–50 engineers. Source needed: ONS Construction sector / Companies House data. Rough order of magnitude: tens of thousands of firms.]
- **SAM:** [TODO — firms in the 10–50 engineer band actively using digital tools beyond Excel/Sage.]
- **SOM (Year-1):** [TODO — limited by sales capacity (no dedicated sales hire yet); start with referrals from CBES.]
- **Competition:**

| Alternative | Their price | Why we win / lose vs them |
|---|---|---|
| FleetSmart | per-engineer, low | Strong on vehicle tracking, weak on commercial workflow + RAMS. We win on full job lifecycle. |
| BigChange / Joblogic | £15–£50 per engineer / month | Mature suites with strong feature lists. We win on simplicity, mobile UX, Sage Project Charges export. Lose on brand recognition and feature breadth. |
| Spreadsheets + Sage + WhatsApp | "free" | Status quo. We win on data integrity and audit trail. |
| **COREPROMA + Jobs Tracker as module** | depends on D-01 | Internal option — see D-01. Could be a tier of COREPROMA Pro rather than a separate SaaS. |

## 4. Business model

> **Blocked by D-01.** The model depends on whether Jobs Tracker is:
> - **(a)** a standalone multi-tenant SaaS sold direct (current architecture supports this), or
> - **(b)** a module inside COREPROMA Pro Field Edition.

- **Pricing tiers:** TBD — see D-01. Indicative ballpark if (a) standalone: **£20–£30 per engineer per month** (positioned below BigChange, above FleetSmart). If (b) module: a Pro Field tier of COREPROMA at €799–€999/yr.
- **Billing model:** Per-engineer monthly subscription if standalone; annual prepay if module.
- **Channel:** Direct sales (founder-led), pilot-referral driven. Long sales cycle (procurement is real in construction).
- **Estimated sales cycle:** 30–90 days. Construction firms move slowly and procurement gates exist over £5k/yr.
- **Currency:** GBP only.

## 5. Unit economics (today's best estimate)

| Metric | Value | Source / assumption |
|---|---|---|
| ARPU monthly (per customer firm) | TODO | Depends on pricing per engineer × firm size. At £25/eng/mo × 30 engineers = £750/mo per firm. |
| Gross margin % | TODO | Pilot infra cost is £18/mo for ~30 engineers + 8 office users — multi-tenant scales well, but the £18 number is single-tenant pilot tier, not multi-tenant SaaS tier. |
| CAC | TODO | Founder-led sales today → CAC ≈ time. Quantify when dedicated sales effort or paid acquisition starts. |
| LTV (12-month) | TODO | Construction software has historically low churn (sticky). LTV likely strong, but no data yet. |
| Payback (months) | TODO | If billed monthly: 1–3 months ARPU should cover variable costs at scale. |
| Infrastructure cost / customer / month | ~£0.60 / engineer (pilot) | Pilot: £18 / 30 engineers. Will increase with multi-tenant isolation strategy. |

**Honest notes:**
- The £18/mo pilot infra cost is **a single-tenant deployment**. Multi-tenant SaaS will need higher Azure tiers (Premium App Service, Azure SQL per-tenant isolation, dedicated SignalR backplane). Real per-customer infra at scale: TODO model.
- Construction firms expect on-boarding support (RAMS templates, Sage CSV mappings, work-status configuration). Concierge onboarding cost should be modelled separately — possibly a one-off setup fee.

## 6. Traction (as of 2026-05-23)

- **Paying customers:** 1 (CBES pilot)
- **MRR / ARR:** TODO confirm CBES pilot pricing
- **Active pipeline:** TODO list known prospects from CBES referrals or other channels
- **Churn:** N/A (one customer)
- **Notable wins:** business plan v0.1 drafted; product is production-deployed and used daily by ~38 users at CBES.

## 7. 12-month projection — three scenarios

> All projections are **placeholders blocked by D-01**. Replace once productisation path is decided and at least one non-pilot customer is signed.

| Scenario | Customers M+12 | MRR M+12 | Investment needed | Trigger to switch |
|---|---|---|---|---|
| **Base (standalone SaaS, founder-led sales)** | 3–5 firms | £2k–£4k MRR | TODO | Status quo: 1 new firm per quarter from referrals |
| **Optimistic (standalone + paid acquisition)** | 8–12 firms | £6k–£10k MRR | TODO marketing + 1 part-time sales | If pilot-to-paid conversion >50% on first 3 demos |
| **Wind-down (re-cast as COREPROMA module)** | n/a | Folded into COREPROMA Pro Field tier | — | If no second paying customer signs by M+6 |

## 8. Roadmap & milestones (12 months)

- **Q1 (now → 2026-08):**
  - **Resolve D-01.** This is the dominant blocker for everything else in this plan.
  - Confirm CBES pilot pricing and renewal terms.
  - Source 2–3 prospect demos from CBES referrals.
- **Q2 (2026-08 → 2026-11):**
  - Sign first non-pilot customer (depending on D-01 outcome).
  - Define multi-tenant infra tier and revised per-customer cost model.
  - Decide accounting integration roadmap — Sage 50 CSV → API → Xero / QuickBooks adapters.
- **Q3 (2026-11 → 2027-02):**
  - Carbon Reporting Module Phase 2 (in product-spec roadmap) — decide reuse vs rebuild vs COREPROMA (D-02).
  - Decide on D-09 (repo rename `BuildersJobsTracker` → `jobstracker`).
- **Q4 (2027-02 → 2027-05):**
  - Renew (or not) CBES pilot at year-end.
  - Year-1-after-pilot retrospective.

## 9. Risks (top 3)

1. **D-01 paralysis.** As long as the standalone vs module question is open, neither pricing nor go-to-market can be finalised — and engineering decisions (multi-tenant isolation strategy, branding shell) are being made implicitly every day.
   *Mitigation:* force a decision deadline. Recommend resolving D-01 within 60 days of this plan.
2. **Single-pilot dependency, like COREPROMA.** All real-world validation comes from CBES. Feature roadmap risks being CBES-specific even with the "portable from day one" intent.
   *Mitigation:* sign a second pilot before adding any major feature.
3. **Sales cycle too long for two-founder bandwidth.** Construction firm procurement takes 30–90 days. Selling at scale needs a dedicated sales motion neither founder has time for.
   *Mitigation:* defer paid acquisition until D-01 resolves the channel; until then, referral-only.

## 10. Ask / next decision

- **Top decision needed (Franck + Mark):** Resolve D-01. Recommendation: **decide within 60 days**, by 2026-07-23.
- **Secondary decisions:** confirm CBES pilot terms in writing; decide on Carbon Module D-02.
- **No external funding ask** — pilot revenue should cover pilot infra. Real funding question opens after D-01 if standalone SaaS path is chosen and a sales hire is needed.

---

## How to update this file
- Re-review monthly. Update §5 and §6 from Stripe + Azure data + sales pipeline state.
- Update §7 projections immediately once D-01 is resolved.
- Linked open decisions: **D-01 (dominant)**, D-02 (carbon module reuse), D-08 (brain format), D-09 (repo rename).
