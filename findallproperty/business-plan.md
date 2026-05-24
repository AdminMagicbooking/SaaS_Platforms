---
product_name: FindAllProperty
slug: findallproperty
business_plan_version: 0.1
business_plan_last_reviewed: 2026-05-23
business_plan_owner: Franck
business_plan_status: draft
audience: internal
---

# FindAllProperty — Business Plan

> **Status:** draft · Last reviewed: 2026-05-23 · Owner: Franck
>
> Strategic source of truth for FindAllProperty. Capabilities live in `product-spec.md` — not duplicated here.
>
> **⚠ Critical hole:** revenue model is **not formally captured** in `product-spec.md`. The product is "free for consumers" and the ecosystem section implies partner referral revenue, but neither the price, the partner contract, nor the volume model is documented. **This BP §4 makes assumptions that must be validated before any go-to-market spend.**

## 1. Pitch
*60 words max.*

FindAllProperty is a free, UK consumer property tool. Paste any UK listing URL — get an honest fair-value verdict (with comparable sold prices) plus a complete neighbourhood intelligence layer (crime, schools, healthcare, flood risk, transport, demographics) in seconds. Built on free public OGL data. Revenue from partner referrals (estate agency, mortgages, conveyancing, insurance, lettings), not from consumers.

## 2. Customer & problem

- **Primary persona — the active buyer/renter:** UK adult, currently searching, 3–10 saved listings, evaluating each.
- **Their job-to-be-done:** "I'm staring at this listing — should I trust the price, or move on?"
- **Secondary persona:** Homeowner curious about own value, or a buyer mid-negotiation.
- **What they use today:** Rightmove (no honest valuation), Zoopla (Hometrack data locked B2B), KnowYourArea (£4.99/mo, area-only no valuation), PropertyData/PaTMa (paid, investor-tilted Chrome extension), online estate agents (optimistic by design).
- **Willingness to pay — evidence:**
  - **Consumers do NOT pay.** Product is free by design — paying for property valuation has been repeatedly proven not to convert at consumer scale.
  - **Estate agents / mortgage brokers / conveyancers DO pay for qualified leads.** This is where the revenue thesis sits, but no partner contract exists yet.

## 3. Market

- **TAM:** UK property transactions ≈ 1.0–1.2M/year (residential, recent average). Plus rental market and refinancing flows. Source: HM Land Registry / UK Finance — need to fetch current numbers.
- **SAM:** Buyers/renters/owners with active property research intent at any point in a year — estimated 5–10M people. Source: TODO — Ofcom UK digital research / Hometrack TAM analyses.
- **SOM (Year-1 reachable, Manchester launch only):** TODO — Manchester property transactions ≈ 25–35k/year + rental search volume. Realistic Year-1 unique users: 10k–50k. Source: TODO.
- **Competition:**

| Alternative | Their price (to consumer) | Why we win / lose vs them |
|---|---|---|
| Rightmove / Zoopla | free | Dominant traffic, but cannot tell buyers a listing is overpriced (lead-gen for agents). We win on honesty. Lose on brand and distribution. |
| Hometrack (via lender portals) | B2B-only | Most accurate UK model, locked behind mortgage-lender contracts. Consumers never see it. We win on access. |
| KnowYourArea | £4.99/mo | Area data only, no valuation. We bundle both for free. |
| PropertyData / PaTMa | £14–£96/mo | Investor-tilted (yield, ROI jargon), Chrome extension friction. We win on consumer accessibility. Lose on data depth for investors (not our segment). |
| Online estate agents (Purplebricks, Yopa) | "free" valuation | Optimistic by design — top of a sell-your-home funnel. We win on impartiality. |

## 4. Business model

> **All revenue assumptions below need partner contract validation.** They follow from `product-spec.md` §7 (the ecosystem section) but are not formalised anywhere.

- **Consumer pricing:** Free, no signup required for v1.0 (signup added for v1.1 valuation-history feature).
- **Revenue streams (planned, not contracted):**
  1. **Partner agency listings feed** — agents pay a monthly fee or per-listing fee to have their properties prominently surfaced with accurate, structured data + direct enquiry routing.
  2. **Mortgage / conveyancing / insurance / lettings referrals** — receive a referral fee when a user moves from FindAllProperty to a partner service (post-launch, Phase 2).
  3. **Premium tier** — possible later (TBD): saved-valuation history, alerts, multi-property comparison.
- **Billing model (partner side):** TBD. Likely monthly retainer + per-qualified-lead fee for referrals.
- **Channel (consumer side):** Organic SEO (URL-paste tool is highly shareable + comparison-shopping queries), social, ICO-compliant content marketing, partner cross-promotion (estate agencies emailing their lists).
- **Channel (partner side):** Direct outreach to estate agencies in the launch city (Manchester, proposed); mortgage brokers and conveyancers approached once consumer traffic is proven.
- **Estimated sales cycle (partner side):** TBD. Estate agencies typically 30–90 days. First partner is the hard one.
- **Currency:** GBP only.

## 5. Unit economics (today's best estimate — partner-revenue model)

> All TODO. The product is pre-launch and has no revenue. Numbers below are **assumptions to test**, not current state.

| Metric | Value | Source / assumption |
|---|---|---|
| ARPU per partner-agency (monthly) | TODO | Need 2–3 partner contract quotes before this is real. Industry rough: £100–£500/mo per agency. |
| ARPU per qualified mortgage/conveyancing lead | TODO | Industry: £20–£100 per qualified mortgage lead, £30–£200 per conveyancing lead. |
| Gross margin % | high (data-driven, low marginal cost) | OGL data is free; cost is engineering + AI inference (Claude for plain-English verdict). |
| CAC | TODO | Consumer-side: organic + SEO + content. CAC may be near-zero per consumer if SEO works. |
| LTV (consumer) | n/a — consumer doesn't pay | Indirectly: LTV of a consumer = expected partner referral value × probability they convert. Likely £5–£20 per consumer who completes a verdict. |
| Infrastructure cost / 1000 verdicts | TODO | Driven by Claude inference cost per verdict + Azure data-fetch costs. Pre-launch model. |

## 6. Traction (as of 2026-05-23)

- **Paying customers:** 0 (pre-launch)
- **Partner contracts:** 0 (none yet)
- **MRR / ARR:** £0
- **Stage:** BMAD Phase 1 complete — concept locked, PRD next
- **Pre-launch signals:** product-spec is the strongest of the six brains in the portfolio (structurally complete with counter-metrics, legal posture, data sources documented).
- **Notable wins:** business plan v0.1 drafted; revenue-model assumptions now made explicit and contestable.

## 7. 12-month projection — three scenarios

> All projections are **placeholders**. Cannot be made credible until: (a) PRD is drafted, (b) revenue model is partner-validated by signing at least one agency or referral partner, (c) Manchester data ingestion pipeline is built.

| Scenario | Users M+12 | Revenue M+12 | Investment needed | Trigger to switch |
|---|---|---|---|---|
| **Base (Manchester launch, partner-led)** | 10k–25k MAU | £TODO | ICO registration + 1 dev (engineering) + 1 partner-development hour/week | First partner agency contract signed by M+6 |
| **Optimistic (Manchester + national content marketing)** | 50k–100k MAU | £TODO | + content marketing budget | Sustained ≥40% verdict completion rate (north-star) |
| **Wind-down** | <2k MAU by M+9 | £0 | — | Either: cease-and-desist letter received; or no partner agreement after 6 months of pitching |

## 8. Roadmap & milestones (12 months)

- **Q1 (now → 2026-08):**
  - **Resolve revenue model** — document the partner-revenue model formally in `product-spec.md` §11 (new section). Validate with 1 estate agency intent letter.
  - PRD complete.
  - ICO controller registration submitted.
- **Q2 (2026-08 → 2026-11):**
  - v1.0 build kickoff: Manchester data ingestion (Land Registry + EPC + ONS PostcodeDirectory + Police.uk + Ofsted + EA Flood + IMD).
  - First partner agency contract signed (or pivot revenue model).
  - Privacy notice + Article 17 deletion route shipped.
- **Q3 (2026-11 → 2027-02):**
  - v1.0 public launch (Manchester only).
  - North-star metric tracking live: verdict completion rate target ≥40% by M+3 post-launch.
  - Solicitor sign-off **mandatory** before Phase 2 (agent-site feeds beyond direct partner).
- **Q4 (2027-02 → 2027-05):**
  - v1.1 features (save history, manual address entry, healthcare/demographics).
  - Second-city decision (London? Birmingham? Edinburgh?).
  - First quarter of partner-revenue data.

## 9. Risks (top 3)

1. **Revenue model is unproven AND undocumented.** The product-spec describes the ecosystem but the BP §4 assumptions are not contractually backed. If no partner signs, the entire model fails.
   *Mitigation:* land one signed letter of intent from an estate agency or mortgage broker **before** v1.0 build kickoff.
2. **Legal / portal risk.** Mass-crawling of Rightmove/Zoopla is a non-starter and the per-URL fetch is "defensible" but not bulletproof. Any cease-and-desist letter would force a hard pivot or shutdown.
   *Mitigation:* keep the architecture honest (no background prefetch, no enumeration); solicitor sign-off before Phase 2; engage portals proactively as partners rather than adversaries.
3. **Single-city launch dependency.** Manchester is the proposed launch — if no SEO traction or partner uptake there, the model doesn't scale to other cities.
   *Mitigation:* set a 6-month checkpoint post-launch. If north-star <30% by M+6, treat as wind-down trigger.

## 10. Ask / next decision

- **Top decision needed (Franck + Mark):** confirm the partner-revenue model. Write it into `product-spec.md` §11 within 30 days. **This is the dominant blocker.**
- **Second decision:** PropertyData API (£28–£96/mo) — build the valuation stack ourselves from raw OGL data, or buy via PropertyData? Cost vs engineering time vs control.
- **No funding ask yet** — pre-launch product, no clear revenue model. Funding conversation comes after first partner contract.

---

## How to update this file
- Re-review monthly. Once launched, update §5 and §6 every month with real consumer + partner numbers.
- Update §7 projections immediately when revenue model is contracted.
- Linked open decisions: D-06 (currency, indirect), D-08 (brain format), and a **new decision** to surface in `decisions-ouvertes.md`: "FindAllProperty revenue model formalisation".
