---
product_name: Ethical Estimation Engine
slug: ethical-engine
status: pre-contract
stage: quotation-draft-v0.3-unsigned
play: 5
play_name: epc-tendering
website: null  # proposed app.coreproma.io or coreproma.ethicalpower.com — undecided
repo: null  # build not started
languages: [en]
pricing_currency: [GBP]
pricing_model: capped-build-under-shared-ip-jv  # single route as of 2026-08-09; see D-15
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
> (v0.3 draft, 2026-08-09), `Ethical/COREPROMA_Board_Briefing_EthicalPower.pdf`,
> `Ethical/COREPROMA_Ethical_Estimation_Engine_roadmap.pdf`
> (B1–B7 workflow infographic), `Ethical/docs/Hessay Analysis.md`,
> `Ethical/docs/wizard-step-design.md`, `Ethical/docs/rate-library-seed.md`.
> **Stage:** Quotation draft v0.3 — unsigned. Cost envelope set 2026-08-09
> (see §11). Re-phased
> 2026-08-09: **Phase 1 (to end 2026)** = estimating core + the Jobs Tracker
> delivery & governance workspace, go-live ≈ **18 December 2026** with a
> January hypercare window, conditional on contract signature by end August.
> **Phase 2 (Q1 2027)** = supplier & third-party management, full B7
> reporting, rate intelligence. Two further modules are recorded in **Annex
> A** of the quotation as indicative only — see §5.4.
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
| **Pricing** | Single route: build capped at £250k under a shared-IP structure (§11), + managed hosting + support. Not a self-serve SaaS today. |
| **Languages** | English (UK). France/Spain rate territories designed for Phase 2. |

**One-paragraph description.** The Ethical Estimation Engine turns a solar
farm tender from a document pile into a governed workflow. A 10-step wizard
captures the project (identity and free-issue scope, site conditions with 3D
terrain from GEOALT data, access, layout, infrastructure, surveys,
programme); a risk register prices every identified risk as a named £
provision; a cost engine applies a point-in-time unit-rate library across
~17 cost packages to produce a defensible bill of quantities, sensitivity
analysis and investor-ready summary at ±20–30% budget accuracy. The phased
delivery hub and governance tracking (was each provision spent or released?)
ship in the same phase on Jobs Tracker; supplier and third-party management,
full reporting and rate intelligence follow in Q1 2027.

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

**Out of scope for Phase 1:** supplier and third-party management, full
reporting dashboards, rate intelligence (all Q1 2027); France and Spain rate
territories; any modelling of grid-connection cost (excluded **by design** —
obtained from the DNO, range £200k–£10M+); everything in Annex A (§5.4).
The phased delivery hub and governance tracking are **in** Phase 1, on Jobs
Tracker.

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
5. **B5 Project & Phases Setup** (Phase 1, on Jobs Tracker) — central
   delivery hub: phased plan, milestones, tasks, dependencies.
6. **B4 Supplier & third-party management** (Q1 2027) — pre-qualified suppliers submit offers
   against BOM lines, scored on price, lead time and ESG; accepted prices
   feed back into the rate library.
7. **B6 Governance Tasks** (Phase 1, on Jobs Tracker) — tracks each provision through
   delivery: held / spent / released.
8. **B7 Reports** — essential estimate export in Phase 1; live risk & cost
   exposure dashboards plus weekly/monthly management and investor reports
   in Q1 2027.

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

### 5.2 Supplier management, reporting & rate intelligence (Q1 2027)

- `v1.1` B4 supplier **and third-party management** (bespoke): offer
  submission against BOM with price/lead-time/ESG scoring and rate-library
  feedback — plus supplier onboarding, pre-qualification, compliance
  documents and performance. **The wider management application is new scope
  beyond the 20 p-days quoted for the portal alone; to be estimated at
  discovery.**
- `v1.1` Rate intelligence (AI): ingest supplier quotes and commodity indices
  (steel, copper, HDPE, diesel) to keep the rate library current. Scope
  confirmed 2026-08-09; tender-pack document extraction was considered and
  deliberately not taken — see §9 counter-metrics.
- `v1.1` B7 full reporting (bespoke): live dashboards, scheduled
  weekly/monthly management and investor reports
- **B5 phases hub + B6 governance — delivered on Jobs Tracker, not
  built, and inside Phase 1 as of v0.3.** As of quotation v0.2 (2026-08-09) the delivery & governance
  workspace runs on Coreproma's existing Jobs Tracker platform
  (field-service proven), extended with a solar projects module and a
  B2b risk-register integration (both scoped at discovery). Sold as a
  per-user / per-month subscription; background IP under both D-15
  options — never assigned to the client. Interacts with **D-01**
  (Jobs Tracker productisation path).

### 5.3 Explicitly NOT built (any phase, by design or exclusion)

- Grid-connection cost modelling (DNO quote only — modelling it would
  produce dangerous mispricing)
- France / Spain territory factors (designed for, not populated — Phase 2+)
- Rate data itself: the client's QS/procurement team owns and supplies all
  unit rates; the engine ships structure, not numbers
- Third-party licences (PVcase, Google Maps Platform) — client-procured,
  never assignable

### 5.4 Annex A — proposed modules (indicative only, not scoped or priced)

Recorded in the quotation as a non-binding annex so the direction is visible
early. Neither forms part of Phase 1 or Q1 2027.

- **Module 1 — Investor portal.** A permissioned external role over data the
  platform already produces (named provisions, budget and sensitivity,
  investor one-pager, live cost exposure) plus a document register with
  watermarking and an access log. Driven by projects carrying third-party
  investors, including the French project. **Portfolio reuse: EcoGrid Resort
  (Play 4) is built on an SPV-per-site model with three investor profiles —
  the same portal would serve both plays.** Open: the investing entity and
  jurisdiction (UK vs France) drive disclosure duties and need legal advice
  before build; and whether it is a role on the estimation platform or a
  separate application (large cost difference).
- **Module 2 — Site capture (WaypointsCreator).** Mission-planning software
  only: survey grids, 3D terrain simulation, obstacle detection, mission
  export to DJI; imagery and orthomosaics attach to the project record and
  feed the Step 2 terrain model. **Flight operations are excluded by
  design** — commercial site survey flying in the UK is a Specific category
  activity requiring a CAA Operational Authorisation, a certified remote
  pilot (RPC-L1, or a legacy GVC) and third-party insurance under EC
  785/2004; those obligations sit with whoever flies. Coreproma supplies
  planning software, not aviation services. **This entangles WaypointsCreator
  (Play 3) with the portfolio's largest client deal while D-04 is still
  open — see D-16.**

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
  Azure SQL Database, Blob + Storage Queues with background
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
  unsigned, with a cost envelope but no agreed structure; nothing about
  this engagement is public.
- **IP is the open question that defines the product** (tracked as **D-15**
  in `_portfolio/decisions-ouvertes.md`). **As of 2026-08-09 only one route
  is proposed:** a new jointly-held structure owns the platform IP, in
  exchange for the £250,000 development cap. The licence route (Coreproma
  retains and resells) and the outright-sale route were both withdrawn from
  the document. This is a corporate transaction, not a payment term:
  shareholdings, contributions, governance, deadlock, exit treatment,
  whether the structure may license to other EPCs, and how the EcoGrid
  Resort software sits inside it are all unagreed, and it is offered as
  heads of terms to be negotiated in parallel with the build contract —
  which puts it on the critical path to signature. The client's own data
  (rates, projects, estimates) belongs to the client, and Jobs Tracker and
  its solar projects extension sit **outside** the structure, remaining
  Coreproma's product under subscription.

- ⚠ **Play 5 changes shape under this route.** If the platform IP sits in a
  jointly-held entity, Coreproma cannot resell the engine to other EPC
  contractors unilaterally. The Ethical Estimation Engine stops being an
  independent portfolio product and becomes an interest in a joint venture.
  Whether Play 5 still exists as a venture depends entirely on the
  commercialisation clause in the heads of terms.
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
- Go-live slipping past December because Q1 2027 scope or an Annex A module
  crept into Phase 1 (the quotation's own top risk)
- Rate intelligence shipping while tender-pack extraction — the larger prize,
  given Hessay was ~150 MB of documents — stays unbuilt and undiscussed

---

## 10. AI / Auto-Response Knowledge Base

**Not applicable — deliberately.** This is a pre-contract, single-client
B2B engagement. There is no inbound funnel, and both `ai_safe` frontmatter
flags are `false`. Any enquiry mentioning this product, the client, or
solar estimation routes to Franck directly. CampaignBuilder and any other
consumer must not generate content about this product.

---

## 11. Pricing & Plans

**Commercial structure (set 2026-08-09, quotation v0.3). A single route is
offered — the licence and outright-sale options were withdrawn.** Currency GBP.

- **£250,000 hard cap** on Phase 1 development, including six months of Azure
  hosting from go-live, **conditional on a new jointly-held structure owning
  the platform IP** (see §8 and D-15). The same capped approach is offered
  for the EcoGrid Resort software, scope to be defined separately.
- ⚠ **The £250k–£350k reference range was removed from the client documents
  on 2026-08-09** at Franck's instruction and replaced with the statement
  that comparable builds are normally *open-ended, with no ceiling*. The
  range remains the internal basis for the cap (see D-15) but no longer
  appears in anything the client sees. Consequence: the £250,000 figure is
  now unjustified on the page. A board asking "why 250 and not 180?" has no
  answer in the document, and the open-ended claim is a qualitative
  assertion made by the party proposing the cap.
- **Payment schedule under the cap:** £60,000 induction fee on signature
  (credited against the total), then 70% of the £190,000 balance (£133,000)
  on delivery of the first module at go-live, and 30% (£57,000) in Q1 2027
  alongside the supplier/procurement module and rate intelligence.
  ⚠ **Reading to confirm:** taken literally as £60k *plus* 70% *plus* 30% of
  the total, the schedule sums to £310,000 and breaks the cap. The documents
  assume the induction fee is credited within the cap.
- ⚠ **The cap transfers risk to Coreproma.** It sits at the *bottom* of the
  realistic range, so Coreproma absorbs everything above £250,000 in exchange
  for shared IP. It holds only against a written scope baseline with working
  change control — an uncapped scope behind a capped price fails for both
  sides. With no alternative route on offer, this is now the whole downside,
  not one branch of it.
- ⚠ **No commercial fallback in the document.** If Ethical Power's board
  declines shared ownership — a plausible reaction from an EPC asked to
  co-own software with a supplier — the proposal has nothing else to offer
  and the negotiation restarts. Have a fallback position ready even though
  it is not written down.

Effort figures below are Coreproma's estimate.

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
| **Phase 1 bespoke development, sub-total (to go-live)** | | — |
| Jobs Tracker — delivery & governance workspace (B5+B6), Phase 1 | Monthly subscription, per user | — (per user/month, quoted with seat count) |
| Jobs Tracker solar projects extension & risk-register integration, Phase 1 | One-off | sized at discovery |
| Q1 2027 — supplier & third-party management | One-off (later) | 20 + new scope |
| Q1 2027 — full B7 management & investor reporting | One-off (later) | 14 |
| Q1 2027 — rate intelligence (commodity indices + supplier quotes) | One-off (later) | sized at discovery |
| Azure hosting (managed) | Monthly | — (managed fee + Azure at cost; 6 months included under the cap) |
| Support & maintenance (Standard / Enhanced tiers) | Monthly, 12-month term | — |
| IP Option 2 uplift (client owns IP) | One-off | — |

Quotation validity: 30 days from date of issue (not yet issued). Support SLAs: P1 same-business-day response through P4
backlog.

---

## 12. Tech Stack (reference)

- **Backend/app:** Azure App Service (Linux) with staging slot
- **Database:** **Azure SQL Database** (rate library, projects, risk
  register, revisions). ⚠ The schema in `Ethical/docs/rate-library-seed.md`
  is written in PostgreSQL DDL (`gen_random_uuid()`, `TIMESTAMPTZ`,
  `UUID`) and needs porting to T-SQL (`NEWID()`, `DATETIMEOFFSET`,
  `UNIQUEIDENTIFIER`) before build. Decision taken 2026-08-09.
- **Async jobs:** Storage Queues + queue-triggered workers (terrain
  parsing, PVcase import, BOQ/PDF/Excel generation, report compilation)
- **Storage:** Blob (uploads + generated outputs); **Secrets:** Key Vault
- **Identity:** Entra ID multi-tenant B2B app, MFA via Conditional Access,
  RBAC per platform role; **Observability:** App Insights + Log Analytics
- **Front-end 3D:** Three.js terrain viewer (reuses existing
  point-cloud viewer work)
- **Environments:** Dev / Test-UAT / Prod, UK South, Azure SQL point-in-time
  restore, documented recovery

---

*Maintenance note: when the quotation is priced, signed, or the IP option
(D-15) is decided, update the frontmatter `status`, §8 and §11 first — they
are the sections most likely to mislead if stale.*
