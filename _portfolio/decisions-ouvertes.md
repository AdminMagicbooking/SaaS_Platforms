# Open Decisions — Cross-Product Arbitrations

> Every entry here is something Franck and Mark need to settle together.
> When a decision is resolved, move it to the "Resolved" section at the
> bottom (don't delete — the history matters).

## Format

Each decision has:
- **Context** — why this matters
- **Options** — concrete choices on the table
- **Trade-offs** — what we lose either way
- **Owner** — who drives the decision
- **Deadline** — when we need this settled by
- **Status** — open / blocked / resolved

---

## D-01 — Jobs Tracker productisation path

**Context.** Jobs Tracker is documented in its product spec as having "two
productisation paths under consideration": (1) a module inside COREPROMA, or
(2) a standalone multi-tenant SaaS. The platform is built to support either.
The choice determines architecture, pricing, GTM, and which CBES upsell path
we take.

**Options.**
- **(A) Module inside COREPROMA.** Single auth, single billing, sold as a
  field-ops add-on to COREPROMA Professional tier. Faster bundled value.
  Requires merging tenancy models.
- **(B) Standalone SaaS.** Multi-tenant Jobs Tracker, sold per-engineer at
  a price comparable to FleetSmart. White-labelled per customer. Independent
  GTM team.
- **(C) Both — sell the standalone, expose a module variant of the same
  surfaces inside COREPROMA's existing tenant model.** Most flexible, most
  expensive to build.

**Trade-offs.** (A) is fastest to revenue inside our existing book but
caps Jobs Tracker's addressable market to COREPROMA customers. (B) opens a
larger market but rebuilds onboarding, billing, and brand from scratch. (C)
is the right end-state but only if we have resources for it now.

**Owner.** Franck (technical) + Mark (commercial)
**Deadline.** TODO
**Status.** Open

---

## D-02 — Embodied-carbon module: one implementation or two?

**Context.** COREPROMA has a live "Empreinte carbone" feature implemented
in Node/Express. Jobs Tracker's spec includes the same feature as a Phase 2
deliverable, explicitly modelled on COREPROMA's MVP but reimplemented in
.NET 9. We are at risk of maintaining two copies of the same domain logic
in two stacks.

**Options.**
- **(A) Re-implement per stack as currently planned.** Duplication accepted
  as the cost of stack autonomy.
- **(B) Extract the carbon engine to a shared service** (HTTP / gRPC / hosted
  function). Both products call it.
- **(C) Pick one stack as the home of carbon logic and have the other
  product call it as a remote API.**

**Trade-offs.** (A) lets each product evolve independently but doubles the
maintenance, doubles the ADEME-coefficient sync work, and risks the two
versions drifting in their grading methodology. (B) and (C) require a shared
service deployment and add a cross-team dependency.

**Owner.** Franck (technical)
**Deadline.** Before Jobs Tracker Phase 2 carbon work starts.
**Status.** Open

---

## D-03 — What is "Invation AI"?

**Context.** The EmailRelay product spec describes EmailRelay as a
"multi-tenant SaaS module inside the Invation AI platform" and uses
`<tenant>.invationai.com` subdomains. FindAllProperty refers to "the
business partner" without naming Invation AI. The other products do not
mention it. It is unclear whether Invation AI is:

**Options.**
- **(A) The holding company / brand under which Franck and Mark trade**
  (and the other four products would all become "Invation AI products").
- **(B) The platform layer specific to EmailRelay** (other products are
  independent).
- **(C) A separate product / venture in its own right** that should have
  its own folder.
- **(D) Vestigial naming from an earlier strategy** — should be deprecated.

**Trade-offs.** (A) creates a strong umbrella brand but forces all products
into one identity. (B) keeps EmailRelay's parent abstract and is the
status quo. (C) means we have a 7th venture we haven't documented. (D) would
require a rename across EmailRelay's spec, subdomains, and any in-flight
contracts.

**Owner.** Mark (brand) + Franck (technical)
**Deadline.** Before either of the two affected specs is published externally.
**Status.** Open

---

## D-04 — Why two unrelated verticals (property + drones)?

**Context.** WaypointsCreator has no overlap with the property ecosystem
or with messaging infrastructure. It is a fully independent vertical
(DJI drone pilots). With two founders, building in two unrelated verticals
imposes context-switching costs and dilutes brand.

**Options.**
- **(A) Keep WaypointsCreator as a standalone bet.** Articulate the
  rationale (e.g. cash cow, future "physical-world ops" thesis) and stop
  pretending it is part of the same story.
- **(B) Spin WaypointsCreator out** — sell it, transfer it to a third
  party, or run it as a side project with capped attention.
- **(C) Wind it down** — close the product, refund or migrate users,
  free up engineering attention for the property ecosystem.

**Trade-offs.** (A) requires honest capital allocation and a defensible
narrative. (B) gives up potential upside but reclaims focus. (C) is the
cleanest from a focus perspective and the hardest emotionally — a live
product with paying users.

**Owner.** Franck + Mark (joint)
**Deadline.** Before the next investor conversation.
**Status.** Open

---

## D-05 — Stack policy: Node or .NET (or both)?

**Context.** Two products use Node/Express + React (COREPROMA,
WaypointsCreator). Two products use .NET 9/10 + React (Jobs Tracker,
EmailRelay). FindAllProperty's stack is TBD. We are paying the cost of
maintaining proficiency in both ecosystems.

**Options.**
- **(A) Standardise on Node going forward.** New products and rewrites use
  Node. .NET products maintained but not extended.
- **(B) Standardise on .NET going forward.** Inverse of (A).
- **(C) Accept the split as deliberate.** Document the reason (e.g. EmailRelay
  needed Azure Service Bus + Entra ID; COREPROMA started Node) and stop
  trying to reconcile.

**Trade-offs.** (A)/(B) reduce the surface area of expertise we need but
implies a multi-year migration cost or freezing one half of the portfolio.
(C) is honest about the cost but requires hiring engineers comfortable in
either or accepting we cannot easily move people between products.

**Owner.** Franck
**Deadline.** Before the next significant new product or hire.
**Status.** Open

---

## D-06 — Currency and pricing policy

**Context.** COREPROMA prices in EUR and GBP. EmailRelay prices in GBP.
WaypointsCreator prices in EUR. Jobs Tracker pricing is TBD. FindAllProperty
is free. There is no portfolio-level rule on what to price in what.

**Options.**
- **(A) Price each product in the currency of its launch market** (current
  de facto state).
- **(B) Price everything in GBP** (UK-anchored portfolio).
- **(C) Dual-list every paid product** in both EUR and GBP (COREPROMA today).

**Trade-offs.** (A) is honest but creates accounting and comparison friction.
(B) simplifies internal accounting but might lose conversion in EUR markets.
(C) doubles pricing-page maintenance.

**Owner.** Mark
**Deadline.** TODO
**Status.** Open

---

## D-07 — Pricing-tier naming consistency

**Context.** Tier names today: COREPROMA uses *Individual / Professional /
Enterprise*. EmailRelay uses *Hardened δ / Hub / Workflow Engine / Compliance
Vault*. WaypointsCreator uses *Free / Pro / Pro+*. Jobs Tracker pricing is
TBD. A customer cross-shopping two of our products gets three different
mental models.

**Options.**
- **(A) Unify on a single tier vocabulary** across all products (e.g.
  *Free / Pro / Business / Enterprise*).
- **(B) Keep product-specific tier names** but document the mapping for
  internal sales tooling.
- **(C) Group products under their play and unify within play** (e.g.
  property products share tier names; infrastructure and drone are
  independent).

**Trade-offs.** (A) cleanest for buyers but means rebranding EmailRelay's
distinctive tier names. (C) is the compromise — preserves brand for outlier
products but unifies within the core bet.

**Owner.** Mark
**Deadline.** TODO
**Status.** Open

---

## D-08 — Brain format standardisation

**Context.** The five existing product briefs follow five different
structures. FindAllProperty's structure is the strongest (numbered sections,
counter-metrics, legal posture, embedded AI-knowledge section). The
templates in `_templates/` are based on it.

**Options.**
- **(A) Migrate all five existing briefs to the template format** in
  a single pass.
- **(B) Migrate opportunistically** when a brief is being substantially
  updated for another reason.
- **(C) Keep current formats** and only use the template for new products.

**Trade-offs.** (A) is the right end-state but ~2–3 days of focused work.
(B) is pragmatic. (C) is the cheapest now and the most expensive later
(divergent formats become harder to consolidate over time).

**Owner.** Franck
**Deadline.** TODO
**Status.** Open

---

## D-09 — Naming: official names vs aliases

**Context.** Jobs Tracker has been called *Job Tracker*, *Jobs Tracker*,
*BuilderJobsTracker*, *BuildersJobsTracker* (repo name), and *CBES Tracker*
(the pilot deployment). The official name is now *Jobs Tracker* (per
`jobstracker.work`) — but legacy references exist throughout the docs and
codebase.

**Options.**
- **(A) Rename everywhere** including repo, deployment, internal docs, in
  one coordinated pass.
- **(B) Lock the canonical name in `glossary.md`** and let legacy names
  decay naturally over time.

**Trade-offs.** (A) is clean but a measurable amount of work and risks
breaking external links (the repo name change). (B) accepts a multi-year
transition.

**Owner.** Franck
**Deadline.** TODO
**Status.** Open

---

## D-10 — Positioning of the 6th product

**Context.** A 6th product is in development. Brief not yet ready.

**Options.** TBD — opens once brief lands.
**Status.** Blocked (waiting on brief)

---

## Resolved

*(empty — first decision resolved goes here, with date and outcome)*
