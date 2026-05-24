---
plan_name: Play 1 — UK Property Ecosystem
products: [findallproperty, coreproma, jobstracker]
business_plan_version: 0.1
business_plan_last_reviewed: 2026-05-23
business_plan_owner: Franck (with Mark to react)
business_plan_status: draft
audience: internal
---

# Play 1 — UK Property Ecosystem · Business Plan

> **Status:** draft · Last reviewed: 2026-05-23
>
> The consolidated strategic view for the three products that form Play 1.
> Per-product detail lives in each product's own `business-plan.md` — this doc does **not** duplicate them.

## 1. Thesis (the founding bet)

A UK buyer or owner today uses Rightmove + an estate agent + a spreadsheet + WhatsApp + a paper notebook. We replace that chain with one connected experience across three products:

```
FindAllProperty  →  COREPROMA  →  Jobs Tracker
(search + value     (renovate + manage    (trades coordinate
 + area intel)       the project)          the actual work)
```

A single user account moves the buyer through search → buy → renovate → operate. Each hand-off carries data forward (property address, EPC, floor area, contractor list, RAMS templates) so nothing is re-typed and nothing is lost.

## 2. Read this first — the honest current state

> If you skip this section, the rest of the plan reads as more solid than it is. **Read it.**

The ecosystem described above is **aspirational, not built**. Specifically, today:

- **Each product is engineered in isolation.** No shared identity, no shared design system, no shared customer database. Their `product-spec.md` files do not reference each other (except FindAllProperty's §7 ecosystem section, which is the only acknowledgment in writing).
- **No hand-off code exists.** The promised "FindAllProperty → COREPROMA pre-fill of property address / EPC / floor area" is a roadmap item, not a build.
- **Two tech stacks** divide the three products: Node/Express (COREPROMA) vs .NET 9 (Jobs Tracker) vs TBD (FindAllProperty). Cross-product engineering reuse is currently zero.
- **One paying customer for the actual ecosystem use case** — none, because the ecosystem doesn't function yet.
- **D-01 (Jobs Tracker productisation path) is open.** It could even be folded into COREPROMA as a module, which changes the ecosystem from "3 products" to "2 products + 1 feature tier".

A version of this plan that pretends the ecosystem is real today would be dishonest. Mark would see it and lose trust. The plan therefore treats the ecosystem as the **investment thesis**, not a current capability.

## 3. Per-product snapshot

| | FindAllProperty | COREPROMA | Jobs Tracker |
|---|---|---|---|
| **Stage** | Pre-launch · BMAD Phase 1 | Live · paying users | Pilot (CBES) |
| **Stack** | TBD | Node + Express + React | .NET 9 + EF Core + React/MUI |
| **Pricing** | Free (consumer) + partner revenue | €149/€499/yr | TBD (D-01) |
| **Revenue today** | £0 | TODO | TODO (CBES) |
| **Dominant blocker** | Revenue model not formalised | Currency policy (D-06) + carbon validation | D-01 productisation path |
| **BP file** | [findallproperty/business-plan.md](../findallproperty/business-plan.md) | [coreproma/business-plan.md](../coreproma/business-plan.md) | [jobstracker/business-plan.md](../jobstracker/business-plan.md) |

## 4. Aggregate financial picture

> All numbers are placeholders today. Real numbers will appear after 1–2 monthly reviews populate `_portfolio/costs/monthly/`.

| Line | 2026-05 | 2026-12 target | 2027-05 target |
|---|---|---|---|
| Play 1 total monthly cost | TODO | TODO | TODO |
| Play 1 total MRR | TODO | TODO | TODO |
| Play 1 net | TODO | TODO | TODO |
| Active customers (paying) | COREPROMA: TODO · JT: 1 (pilot) | | |
| Cumulative investment to date | TODO | | |
| Runway (Play 1 share of portfolio capacity) | TODO | | |

Source for all live numbers: `_portfolio/costs/monthly/YYYY-MM.csv`.

## 5. What it would take to make the ecosystem real

If we commit to the Play 1 thesis (vs treating the products as three independent SaaS), here is the integration backlog. Each item has a real engineering cost; none is shipped today.

| Hand-off | What it is | Cost effort | Priority |
|---|---|---|---|
| **Shared identity (SSO)** | One account works across all three products | ~3–6 weeks dev | High — without this every claim of "ecosystem" is fiction |
| **Shared design system** | Visual + interaction language consistent across the three apps | ~6–8 weeks dev (one-off) + ongoing maintenance | Medium |
| **FindAllProperty → COREPROMA hand-off** | "Start a renovation on this property" button pre-fills COREPROMA with address, EPC, floor area | ~2–3 weeks dev | High — visible, demonstrable, sells the thesis |
| **COREPROMA → Jobs Tracker hand-off** | Push a renovation project from COREPROMA into Jobs Tracker as a multi-engineer dispatch | ~3–4 weeks dev | Depends on D-01 outcome |
| **Embodied carbon module reuse** | Share one carbon engine between COREPROMA and Jobs Tracker (currently risks double-build per D-02) | ~2–3 weeks dev | High for engineering efficiency |
| **Partner-feed listings** | Estate agencies feed listings into FindAllProperty directly (solves Boomin problem) | depends on partner contracts | Critical for FindAllProperty revenue model |

Total engineering effort to make Play 1 a *demonstrable ecosystem*: ~20–30 dev-weeks (one developer). Across two founders splitting time, that's roughly 6 months of focused effort.

## 6. Path to investor-ready

For Play 1 to be defensible to a Series-A-ish investor, the plan needs:

1. **One signed partner contract for FindAllProperty.** Without partner revenue evidence, the consumer-free model is a hope.
2. **6 months of Stripe data for COREPROMA.** Real ARPU, churn cohorts, CAC per channel. Replace placeholder unit economics with reality.
3. **D-01 resolved.** Investor cannot underwrite a thesis where the same product is both a SaaS and a feature tier.
4. **One real cross-product hand-off shipped.** Even a basic FindAllProperty → COREPROMA pre-fill is enough to make the ecosystem demonstrable in a demo.
5. **Aggregated Play 1 P&L** populated from `_portfolio/costs/monthly/`. Not a slide deck — a CSV with real numbers.

**Estimated time to investor-ready: 9–12 months** assuming Q1 momentum on D-01 and partner outreach.

## 7. Risks at Play 1 level

1. **Ecosystem never gets built.** We have 3 unrelated SaaS, each weaker than its standalone competitors. Mitigation: ship the first hand-off (FindAllProperty → COREPROMA) by Q3 2026 as the proof-point.
2. **FindAllProperty regulatory / portal risk.** Cease-and-desist from Rightmove or Zoopla, or ICO escalation, kills the consumer front door — and with it, the whole Play 1 funnel. Mitigation: solicitor sign-off before Phase 2; honest architecture (no mass-crawling); partner-feed as the legitimacy lever.
3. **D-01 paralysis blocks Jobs Tracker.** As long as D-01 is open, Jobs Tracker pricing, sales motion, and engineering choices drift. Mitigation: decision deadline within 60 days (see Jobs Tracker BP §10).
4. **Currency mismatch (COREPROMA dual EUR/GBP).** Makes the Play 1 financial view harder to read at investor level. Mitigation: resolve D-06.
5. **Two-founder bus factor.** Two people across six products. Play 1 alone needs ~20–30 dev-weeks of integration work; total portfolio attention is split. Mitigation: explicit per-play capacity allocation in `ownership-roles.md`.

## 8. Decisions blocking Play 1

| ID | Title | Blocks | Status |
|---|---|---|---|
| **D-01** | Jobs Tracker productisation (module vs SaaS) | Jobs Tracker pricing, engineering, sales motion | Open — recommend resolution within 60 days |
| **D-02** | Embodied-carbon module: one impl or two? | Engineering efficiency across COREPROMA + Jobs Tracker | Open |
| **D-06** | Currency policy (EUR/GBP) | COREPROMA pricing presentation; Play 1 P&L roll-up | Open |
| **D-08** | Brain format standardisation | Investor pitch coherence; CampaignBuilder reliability | Open |
| **D-09** | Jobs Tracker repo rename | Cosmetic but blocks "everything called the same thing" | Open |
| **NEW — TODO add to decisions-ouvertes.md** | FindAllProperty revenue model formalisation | All of FindAllProperty's revenue projections | Open |

## 9. What this plan does NOT cover

- **EmailRelay, WaypointsCreator, GTTourz.** They are Play 2 and Play 3 — separate plans (deferred).
- **Cross-portfolio decisions.** Stack policy (D-05), pricing-tier naming (D-07) — live in `decisions-ouvertes.md`.
- **Detailed go-to-market plans per product.** Those live in each product's BP §4.
- **Investor pitch deck.** Once §6 milestones are met, derive a deck from this plan + per-product BPs.

---

## How to update this file
- Re-review at the monthly review (last Friday of the month).
- Update §4 every month from `_portfolio/costs/monthly/` aggregations.
- Update §3 (snapshot) and §8 (decisions) whenever a product or decision status changes.
- §1, §2, §5, §7 are stable — change only when the thesis itself moves.
