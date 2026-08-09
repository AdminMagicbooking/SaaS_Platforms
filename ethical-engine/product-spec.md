---
product_name: Ethical Estimation Engine
slug: ethical-engine
status: pre-contract
stage: quotation-draft-v0.1-unsigned
play: 5
play_name: epc-tendering
website: null  # proposed app.coreproma.io or coreproma.ethicalpower.com — undecided
repo: null  # build not started
languages: [en]
pricing_currency: [GBP]
pricing_model: bespoke-build-plus-hosting-and-support  # day-rate TBC; productisation depends on D-15
target_audiences: [uk-epc-contractors]
ai_safe_for_autoreply: false  # pre-contract, commercial in confidence — never auto-respond
ai_safe_for_social_post: false  # unannounced client project — nothing is public
spec_last_updated: 2026-08-09
brain_format_version: numbered-with-counter-metrics
---

# Ethical Estimation Engine — Product Brain

> **Purpose of this file.** The single canonical reference for the Ethical
> Estimation Engine (doc-header brand: *COREPROMA Solar Farm Platform*).
> Everything in this file is **commercial in confidence** — the frontmatter
> flags above are both `false` deliberately; no section of this document is
> cleared for autoreply or social content.
>
> **Source documents:** `Ethical/COREPROMA_Quotation_EthicalPower.pdf`
> (v0.1 draft, 2026-08-02), `Ethical/COREPROMA_Ethical_Estimation_Engine_roadmap.pdf`
> (B1–B7 workflow infographic), `Ethical/docs/Hessay Analysis.md`,
> `Ethical/docs/wizard-step-design.md`, `Ethical/docs/rate-library-seed.md`.
> **Stage:** Quotation draft v0.1 — unsigned. All prices [TBC]. Target
> go-live of the estimating core: **14 November 2026**, which assumed work
> starting w/c 4 August 2026 with a dedicated team of 2–3.
> **Last updated:** 2026-08-09

---

## 1. Product at a Glance

| | |
|---|---|
| **Product name** | Ethical Estimation Engine (see `_portfolio/glossary.md`) |
| **Category** | Tender estimation & project-governance platform for utility-scale solar EPC contractors |
| **Hero headline** | Every project risk priced as a named £ provision — not a blanket contingency |
| **For** | BD / commercial teams at solar EPC contractors (non-engineers), backed by QS/procurement-owned rate data |
| **Platform** | Web app (Azure App Service), Entra ID B2B SSO into the client's corporate directory |
| **Pricing** | Bespoke build (day-rate × person-days, [TBC]) + managed hosting + support contract. Not a self-serve SaaS today. |
| **Languages** | English (UK). France/Spain rate territories designed for Phase 2. |

**One-paragraph description.** The Ethical Estimation Engine turns a solar
farm tender from a document pile into a governed workflow. A 10-step wizard
captures the project (identity and free-issue scope, site conditions with 3D
terrain from GEOALT data, access, layout, infrastructure, surveys,
programme); a risk register prices every identified risk as a named £
provision; a cost engine applies a point-in-time unit-rate library across
~17 cost packages to produce a defensible bill of quantities, sensitivity
analysis and investor-ready summary at ±20–30% budget accuracy. Phase 2 adds
a supplier portal, phased delivery hub, governance tracking (was each
provision spent or released?) and live management/investor reporting.

**The problem it solves.** EPC tender estimation today is manual,
spreadsheet-driven and undocumented: risks are absorbed into blanket
contingency percentages nobody can defend, free-issue scope is captured in
footnotes, superseded rates leak into new bids, and management cannot see
which risk provisions were actually consumed. The Hessay tender pack
(<!-- INTERNAL -->a real 40 MW / 61.3 ha solar farm near York tendered by
Ethical Power<!-- /INTERNAL -->) is the documented evidence base: dozens of
PDFs, drawings and reports that currently require expert manual synthesis
for every estimate.

---

## 2. Who It's For

| Persona | Who they are | The job they need done |
|---|---|---|
| BD / Commercial user | Non-engineer preparing budget estimates | Produce a defensible ±20–30% estimate from plain-language inputs, fast |
| QS / Commercial Manager | Owns civil/electrical unit rates | Maintain the rate library with point-in-time integrity and approval control |
| Procurement | Owns supplier rates and quotes | Feed supplier pricing into rates; run supplier offers against BOM lines (Phase 2) |
| Technical Director | Approves methodology | Sign off rate methodology changes and project validation |
| Management / investors | Oversight | See live risk exposure: which provisions are held, spent, released (Phase 2) |

**Out of scope for v1 (Phase 1):** supplier portal, phased delivery hub,
governance task tracking, full reporting dashboards (all Phase 2); France
and Spain rate territories; any modelling of grid-connection cost
(excluded **by design** — obtained from the DNO, range £200k–£10M+).

---

## 3. The Positioning (what makes us different)

1. **Named £ risk provisions, not blanket contingency.** Every risk is
   captured with category, status (known / potential / information gap),
   likelihood, a named £ provision and basis of estimate — and flows into
   the budget as a visible line. Clients see exactly what is costed and why.
2. **Free-issue scope as a first-class input.** What the client supplies vs
   what the EPC installs can halve the apparent EPC cost; the wizard
   captures it before any figure is calculated and shows supply-£0 /
   install-£X lines transparently.
3. **Honest by construction.** Grid connection is never modelled (DNO quote
   only); placeholder rates can never produce a green confidence score;
   output is locked with a mandatory acknowledgement gate (budget estimate
   ±20–30%, not a contract price).
4. **Reproducible estimates.** Point-in-time rate library (`effective_from`
   / `effective_to`, source, confidence, role-based ownership): historic
   tenders re-open at their original rates, and rates are never overwritten.

---

## 4. How It Works — The End-to-End Flow

1. **B1 Creation Wizard** — 10 validated steps; live cost panel and
   confidence flags from step 4; GEOALT terrain upload parsed to site area,
   slope distribution and terrain class with an interactive 3D viewer;
   scaling engine derives module / string / inverter / MVS counts from
   capacity (optional PVcase CSV/DXF import replaces derived quantities).
2. **B2 Project Validation** — wizard draft promoted to a locked, auditable
   project record; automated feasibility and compliance checks; technical
   sign-off routing.
3. **B2b Risk Register & Provisions** — per-risk capture across five
   categories (ground/geotechnical, information gaps, grid connection,
   planning/permitting, access/logistics/environment); each provision
   linked to a named budget line; confidence score dial with rule-based
   deductions.
4. **B3 Product & Stock Calculator** — auto-generated bill of materials;
   line-by-line cost build-up across ~17 packages; location / CBR / access /
   programme multipliers; inflation indexation; free-issue deduction logic;
   outputs: 1-page budget summary, full BOQ (Excel/PDF), assumptions &
   exclusions register, sensitivity table, investor-ready 1-pager.
5. **B5 Project & Phases Setup** (Phase 2) — central delivery hub: phased
   plan, milestones, tasks, dependencies.
6. **B4 Supplier Portal** (Phase 2) — pre-qualified suppliers submit offers
   against BOM lines, scored on price, lead time and ESG; accepted prices
   feed back into the rate library.
7. **B6 Governance Tasks** (Phase 2) — tracks each provision through
   delivery: held / spent / released.
8. **B7 Reports** — essential estimate export in Phase 1; live risk & cost
   exposure dashboards plus weekly/monthly management and investor reports
   in Phase 2.

---

## 5. Full Functionality List

### 5.1 Estimating core (Phase 1 — go-live target 14 Nov 2026)

- `v1.0` B1 wizard: 10 steps, session persistence, per-step validation,
  amber/red confidence flags, save-draft, locked outputs with revisioning
- `v1.0` GEOALT terrain: background parsing (X,Y,Z 2m grid), Three.js 3D
  viewer, auto terrain classification, slope stats
- `v1.0` Scaling engine: Hessay-derived ratios (27 modules/string,
  ~1.9 CCTV cameras/MW, MVS sizing mix); PVcase import override
- `v1.0` B2 validation: locked project records, revision history,
  feasibility & compliance checks, sign-off routing
- `v1.0` B2b risk register: named £ provisions, five risk categories,
  budget-line linkage, confidence score with rule-based deductions
- `v1.0` B3 cost engine: ~17 cost packages, rate library administration
  (point-in-time, territory-specific, confidence flags, role-based
  ownership), free-issue deduction, multipliers, contingency & margin
- `v1.0` Outputs: BOQ Excel/PDF, budget summary, assumptions & exclusions,
  sensitivity table, comparable-project reference, investor 1-pager
- `v1.0` Foundations: Entra ID SSO (multi-tenant B2B), MFA via Conditional
  Access (recommended: enforced), RBAC (BD, QS, Procurement, Technical
  Director, Admin), audit logging, Dev/Test/Prod environments, UK South

### 5.2 Delivery, procurement & reporting (Phase 2 — post go-live)

- `v1.1` B4 supplier portal: onboarding, offer submission against BOM,
  price/lead-time/ESG scoring, rate-library feedback loop
- `v1.1` B5 phases hub: milestones, tasks, owners, dependencies
- `v1.1` B6 governance: provision status tracking (held/spent/released)
- `v1.1` B7 full reporting: live dashboards, scheduled weekly/monthly
  management and investor reports

### 5.3 Explicitly NOT built (any phase, by design or exclusion)

- Grid-connection cost modelling (DNO quote only — modelling it would
  produce dangerous mispricing)
- France / Spain territory factors (designed for, not populated — Phase 2+)
- Rate data itself: the client's QS/procurement team owns and supplies all
  unit rates; the engine ships structure, not numbers
- Third-party licences (PVcase, Google Maps Platform) — client-procured,
  never assignable

---

## 6. Third-Party Data Sources / Integrations

- **GEOALT terrain files** (CSV X,Y,Z) — user-uploaded, parsed by a
  background worker
- **PVcase** (CSV/DXF export) — optional import of design quantities;
  licence is client-side, pass-through
- **Google Maps Platform** — terrain/context integration; client licence
- **Microsoft Entra ID** — customer-tenant SSO, MFA, provisioning; no
  separate password store
- **Azure** (Coreproma-managed subscription): App Service (Linux),
  PostgreSQL Flexible Server, Blob + Storage Queues with background
  workers, Key Vault, Application Insights; consumption re-billed monthly

---

## 7. The Ecosystem It Belongs To

**Play 5 — EPC tendering software.** Registered as its own play: the buyer
(EPC contractor commercial teams) and the job (pre-construction estimation)
are distinct from Play 1's construction delivery tools and Play 4's
resort micro-grid operation.

Relationships that matter:

- **COREPROMA brand.** The client-facing documents are branded "COREPROMA —
  Solar Farm Project Platform". The engine is built and sold under the
  COREPROMA name but shares no code with the COREPROMA construction PM
  product today. Whether it becomes a COREPROMA-family module or a
  standalone brand is unresolved.
- **EcoGrid Resort (Play 4).** Adjacent solar, different job: EcoGrid
  operates micro-grids for hospitality sites; this engine estimates
  utility-scale solar construction for EPCs. No shared code; shared domain
  vocabulary and — historically — a shared counterpart.
- <!-- INTERNAL -->**Ethical Power concentration.** Ethical Power is the
  anchor (sole) prospective client of this product, the historic
  partner-in-discussion for EcoGrid ("Ethical Solar"), and a JobsTracker
  pitch target (`jobstracker/pitch-ethical-power.html`). Three ventures now
  touch one counterpart — a portfolio-level dependency; see D-15.<!-- /INTERNAL -->
- **Hessay reference data.** The rate-library seed and scaling ratios are
  extracted from <!-- INTERNAL -->Ethical Power's Hessay tender
  pack<!-- /INTERNAL --> — that dataset is the UAT reference project and the
  first entry of the comparable-projects library.

---

## 8. Legal & Commercial Posture (Summary)

- **Everything is commercial in confidence.** The quotation is a v0.1 draft
  with every price [TBC]; nothing about this engagement is public.
- **IP is the open question that defines the product** (tracked as **D-15**
  in `_portfolio/decisions-ouvertes.md`): Option 1 — Coreproma retains IP
  and licenses the platform (resellable to other EPCs); Option 2 — the
  client owns the developed code outright at a materially higher price, and
  this becomes a bespoke build, not a portfolio product. In both options
  the client's own data (rates, projects, estimates) belongs to the client.
- **Background vs foreground IP** must be contractually separated;
  third-party licences are never assignable.
- **Estimates are not contract prices.** The product's own output gates
  force acknowledgement of ±20–30% accuracy — this posture must never be
  weakened in marketing or sales language.
- **Data residency:** UK South, client-tenant identity, no separate
  credential store.

---

## 9. Success Metrics & Counter-Metrics

**North-star (today).** A signed Phase 1 contract. Until M0, every other
metric is theoretical.

**Leading indicators (post go-live).**
- Estimates produced per month — target: replaces the manual process for
  all new tenders
- % of rate-library entries with `confirmed` confidence — target: >80%
  within 3 months of go-live (placeholder rates are the #1 delivery risk)
- Time from tender receipt to issued budget estimate — baseline: weeks;
  target: days

**Counter-metrics (must not happen).**
- A green-confidence estimate produced from placeholder rates (the design
  forbids it; if it happens, the trust model is broken)
- An engine output used as a contract price without the acknowledgement
  gate — reputational and financial exposure
- Go-live slipping past November because Phase 2 scope crept into Phase 1
  (the quotation's own top risk)

---

## 10. AI / Auto-Response Knowledge Base

**Not applicable — deliberately.** This is a pre-contract, single-client
B2B engagement. There is no inbound funnel, and both `ai_safe` frontmatter
flags are `false`. Any enquiry mentioning this product, the client, or
solar estimation routes to Franck directly. CampaignBuilder and any other
consumer must not generate content about this product.

---

## 11. Pricing & Plans

All monetary figures are **[TBC]** — effort is estimated, day-rate and
prices are inserted by Coreproma before the quotation is issued. Currency
GBP.

| Item | Basis | Effort (person-days) |
|---|---|---|
| Phase 0 — Discovery & design | One-off | 8 |
| Foundations (platform, DevOps, identity, security) | One-off | 25 |
| B1 Creation Wizard | One-off | 38 |
| B2 Validation | One-off | 6 |
| B2b Risk Register & Provisions | One-off | 10 |
| B3 Cost Calculator + outputs | One-off | 38 |
| B7 essential reporting output | One-off | 4 |
| QA, UAT & go-live (Phase 1) | One-off | 22 |
| **Phase 1 sub-total (to go-live)** | | **≈151** |
| Phase 2 — B4, B5, B6, full B7 | One-off (later) | ≈62 |
| Azure hosting (managed) | Monthly | — ([TBC]/month + Azure at cost) |
| Support & maintenance (Standard / Enhanced tiers) | Monthly, 12-month term | — |
| IP Option 2 uplift (client owns IP) | One-off | — |

Payment milestones M0 (signature) → M7 (production go-live accepted),
percentage shares [TBC]. Quotation validity: 30 days from date of issue
(not yet issued). Support SLAs: P1 same-business-day response through P4
backlog.

---

## 12. Tech Stack (reference)

- **Backend/app:** Azure App Service (Linux) with staging slot
- **Database:** Azure Database for PostgreSQL Flexible Server (rate
  library, projects, risk register, revisions — schema drafted in
  `Ethical/docs/rate-library-seed.md`)
- **Async jobs:** Storage Queues + queue-triggered workers (terrain
  parsing, PVcase import, BOQ/PDF/Excel generation, report compilation)
- **Storage:** Blob (uploads + generated outputs); **Secrets:** Key Vault
- **Identity:** Entra ID multi-tenant B2B app, MFA via Conditional Access,
  RBAC per platform role; **Observability:** App Insights + Log Analytics
- **Front-end 3D:** Three.js terrain viewer (reuses existing
  point-cloud viewer work)
- **Environments:** Dev / Test-UAT / Prod, UK South, PostgreSQL PITR
  backups, documented recovery

---

*Maintenance note: when the quotation is priced, signed, or the IP option
(D-15) is decided, update the frontmatter `status`, §8 and §11 first — they
are the sections most likely to mislead if stale.*
