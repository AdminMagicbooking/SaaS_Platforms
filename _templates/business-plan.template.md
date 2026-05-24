---
product_name: [Product Name]
slug: [slug]
business_plan_version: 0.1
business_plan_last_reviewed: YYYY-MM-DD
business_plan_owner: [Franck | Mark]
business_plan_status: draft | internal-v1 | investor-ready
audience: internal | internal+investor | investor
---

# [Product Name] — Business Plan

> **Status:** [draft / internal-v1 / investor-ready] · Last reviewed: YYYY-MM-DD · Owner: [name]
>
> Strategic source of truth for [Product Name]. Update when reality moves. Keep it under ~1500 words.
> The product capabilities live in `product-spec.md` — do **not** duplicate them here.

## 1. Pitch
*One paragraph. 60 words max. What it is, who it's for, why it exists, why now.*

[TODO]

## 2. Customer & problem
- **Primary persona:** [job title, industry, company size]
- **Their job-to-be-done:** [...]
- **What they use today:** [tool/process replaced]
- **Willingness to pay — evidence:** [interviews, pilots, comparable competitor prices]

## 3. Market
- **TAM (Total Addressable Market):** [number] · *Source:* [...]
- **SAM (Serviceable Addressable Market):** [number] · *Source:* [...]
- **SOM (Year-1 reachable):** [number] · *Source:* [...]
- **Competition (top 3 alternatives):**

| Alternative | Their price | Why we win / lose vs them |
|---|---|---|
| | | |

## 4. Business model
- **Pricing tiers:** [tier name + monthly/yearly price + currency]
- **Billing model:** [seat / usage / flat / hybrid]
- **Channel:** [direct sales / self-serve / partner-led]
- **Estimated sales cycle:** [days from first contact to paying]
- **Currency:** [GBP / EUR / USD] *(see D-06 if multi-currency)*

## 5. Unit economics (today's best estimate)

| Metric | Value | Source / assumption |
|---|---|---|
| ARPU (monthly) | | |
| Gross margin % | | revenue minus infrastructure cost / revenue |
| CAC (Customer Acquisition Cost) | | |
| LTV (12-month horizon) | | |
| Payback (months) | | |
| Infrastructure cost / customer / month | | see `_portfolio/costs/monthly/` |

## 6. Traction (as of YYYY-MM-DD)
- **Paying customers:** [n]
- **MRR / ARR:** [number]
- **Active pipeline:** [n prospects]
- **Churn (last 90 days):** [%]
- **Notable wins / losses this month:** [...]

## 7. 12-month projection — three scenarios

| Scenario | Customers M+12 | MRR M+12 | Investment needed | Trigger to switch |
|---|---|---|---|---|
| **Base** | | | | continue current pace |
| **Optimistic** | | | | hits X conversion / launches Y feature |
| **Wind-down** | | | | falls below Z by month N |

## 8. Roadmap & milestones (12 months)
- **Q1 (now → +3mo):**
- **Q2 (+3mo → +6mo):**
- **Q3 (+6mo → +9mo):**
- **Q4 (+9mo → +12mo):**

## 9. Risks (top 3 only — be honest)
1. **[Risk]** — [mitigation, or "no mitigation yet"]
2. **[Risk]** — [mitigation]
3. **[Risk]** — [mitigation]

## 10. Ask / next decision
*What needs to happen for this product to move to the next stage? Funding, hire, partnership, customer signal, decision arbitration?*

[TODO]

---

## How to update this file
- Re-review monthly (last Friday of the month — see `_portfolio/monthly-reviews/`).
- Update §5 (Unit economics) and §6 (Traction) every month with real numbers from Stripe + Azure Cost Management.
- Update §7 (Projections) every quarter or when reality breaks the assumption.
- Bump `business_plan_version` on every meaningful change. Minor for content updates, major for structural rewrites.
- Linked open decisions: any change here that depends on a `decisions-ouvertes.md` entry should reference its ID (e.g. "blocked by D-01").
