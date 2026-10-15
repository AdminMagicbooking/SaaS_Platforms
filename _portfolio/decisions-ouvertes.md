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

> NOTE (Claude/Franck, 2026-08-09): the Ethical Power quotation v0.2 now
> offers Jobs Tracker per-user/month as the delivery vehicle for the
> Estimation Engine's B5/B6 modules — i.e. a second customer beyond CBES on
> a standalone subscription basis. If Ethical Power signs, option (B)/(C) is
> chosen de facto, and the per-user price inserted in that quotation becomes
> the Jobs Tracker pricing precedent. Resolve this decision (and the price)
> before the priced quotation is issued — not after.

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

> NOTE (Claude/Franck, 2026-08-09): this decision is now on a clock it did not
> have before. Quotation v0.3 records a proposed WaypointsCreator site-capture
> module in Annex A of the Ethical Power proposal. If that module is ever sold,
> spinning WaypointsCreator out or winding it down becomes materially harder
> and more expensive, because a client contract would depend on it. In effect
> the Annex answers D-04 in the direction of "keep indefinitely" — by accident,
> without the debate. Resolve D-04 on its own merits **before** the module
> moves from annex to quotation. See also D-16.

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

> NOTE (Claude/Franck, 2026-08-09): SmartGrid/EcoGrid makes this worse than
> documented. Its `product-spec.md` is a French internal working document with
> **no YAML frontmatter at all** (no `ai_safe_for_autoreply` /
> `ai_safe_for_social_post` flags, contrary to CONVENTIONS §9) and unwrapped
> confidential pilot data (client name + real financials in §6). It has been
> added to `products-index.json` with `marketing_ready: false` and only three
> safe sections mapped — but the real fix is a public-safe spec with
> frontmatter, i.e. this decision.

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

> NOTE (Claude/Franck, 2026-08-09): this entry is stale. The "6th product"
> (GTTourz) landed 2026-05-23 and EcoGrid Resort followed 2026-06-02 as
> product 7. Either resolve this as superseded (grouping questions now live
> in D-11) or repurpose it. Don't leave it "blocked" on a brief that shipped
> two and a half months ago.

---

## D-11 — Grouping of the Play 3 standalone bets

**Context.** Referenced from `product-map.md` since GTTourz landed, but never
registered here — the reference dangled for two and a half months, which is
exactly how a decision register loses authority. WaypointsCreator and GTTourz
share a play but have zero product overlap. Is "Play 3" a real category with
shared strategy (capital allocation, sale criteria, attention caps), or just
a drawer labelled "everything else"?

**Options.**
- **(A) Keep Play 3 as a loose bucket** and manage each bet independently.
- **(B) Define explicit portfolio rules for standalone bets** (max attention
  %, revenue thresholds to keep/kill, review cadence) and apply to both.
- **(C) Fold this into D-04** (WaypointsCreator rationale) and treat GTTourz
  the same way.

**Owner.** Franck + Mark (joint)
**Deadline.** TODO
**Status.** Open

---

## D-12 — Single-vendor AI exposure (Anthropic)

**Context.** Referenced from `product-map.md` as "potential D-12", never
registered. Four of seven products depend on Anthropic Claude (COREPROMA,
EmailRelay, Jobs Tracker carbon roadmap, GTTourz), and EcoGrid's planned AI
EMS would make five. A pricing change, model deprecation, or ToS shift at one
vendor now touches most of the portfolio.

**Options.**
- **(A) Accept the exposure** — document it, monitor, no engineering work.
- **(B) Abstract LLM calls behind a thin internal interface** in each product
  so a provider swap is a config change, not a rewrite.
- **(C) Actively dual-source** (second provider tested in CI for the highest-
  revenue product only).

**Owner.** Franck
**Deadline.** TODO
**Status.** Open

---

## D-13 — Shared WhatsApp / Twilio infrastructure

**Context.** Referenced from `product-map.md` as "potential D-13", never
registered. EmailRelay and GTTourz both ship WhatsApp via Twilio, with
separate Meta Business setups, template libraries, and ops knowledge.

**Options.**
- **(A) Keep separate** (product autonomy, no shared dependency).
- **(B) Share the Meta Business account + BSP contract and a common template
  library / ops runbook**, keeping product code separate.
- **(C) Extract a shared messaging service** (heaviest, only justified if a
  third product adopts WhatsApp).

**Owner.** Franck (infra) + Mark (Meta Business relationship)
**Deadline.** TODO
**Status.** Open

---

## D-14 — Repo hygiene: misplaced folders, duplicated tender pack, prospect data

**Context.** Audit of 2026-08-09 found the workspace drifting from its own
CONVENTIONS within ~10 weeks of writing them:

1. **`Ethical/` duplicates the entire ~150 MB Tender Pack** also present at
   `_portfolio/Tender Pack Docs/` — same files, byte-identical sizes, twice.
   The git pack is already 187 MB. This violates CONVENTIONS §3 (one source
   of truth) and arguably §7 — these are client delivery documents (Ethical
   Power / Hessay solar farm), not portfolio strategy, and CONVENTIONS says
   signed/client documents belong in the document store, not this repo.
2. **`Gaswise/`** (JobsTracker-vs-Arantico competitive analysis) is not
   referenced by README, product-map, or the index. Per CONVENTIONS §3 it
   belongs under `jobstracker/` — it is JobsTracker competitive material,
   not a product.
3. **`scrapped/`** holds ~20 MB of scraped + enriched prospect NDJSON
   (architects, builders, engineering firms). CONVENTIONS §7 forbids
   personal data of prospects in this repo; enriched scrapes almost
   certainly contain personal contacts. Compliance risk, and it doesn't
   belong in a strategy repo regardless.
4. **Cosmetics that signal decay:** committed LibreOffice `.~lock` files in
   `SmartGrid/Commercial/BP/`; folder names violating §2 kebab-case
   (`SmartGrid/`, `Ethical/`, `Gaswise/`); a `dist/` build output committed
   under `SmartGrid/Commercial/presentation/`.

**Options.**
- **(A) One clean-up pass on a branch:** delete `Ethical/`'s duplicated
  tender pack (keep one canonical location — or better, move client
  delivery docs out of the repo entirely), move Gaswise files under
  `jobstracker/`, move `scrapped/` off-repo (or to a `.gitignore`d
  `_private/`), delete lock files, add `.gitignore` rules. Note: git
  history will still carry the large blobs unless rewritten — decide
  whether history rewrite (BFG / git-filter-repo) is worth coordinating
  with Mark.
- **(B) Minimal:** fix the prospect-data issue only (compliance), leave the
  rest and accept the bloat.
- **(C) Do nothing** — explicitly accept this repo is also a working file
  dump, and amend CONVENTIONS to say so (honest, but then stop claiming
  one-source-of-truth).

**Trade-offs.** (A) is half a day plus a coordination cost with Mark
(history rewrite forces re-clone). (B) leaves the duplication compounding —
every clone pulls 150 MB of duplicated PDFs. (C) at least makes the rules
match reality, but kills the repo's authority as a canonical source.

**Owner.** Franck (executes) + Mark (sign-off on tender-pack location)
**Deadline.** Prospect data (point 3): within 2 weeks — it's a compliance
exposure, not a tidiness question. Rest: next monthly review.
**Status.** Open

---

## D-15 — Ethical Estimation Engine: the ownership structure

**Context.** The quotation to Ethical Power presents the commercial terms on
which the engine is built. **Updated 2026-08-09 (v0.3): the menu of IP options
was withdrawn and a single route is now proposed** — a new jointly-held
structure owns the platform IP, in exchange for a **£250,000 cap** on Phase 1
development including six months of Azure hosting. The same capped approach is
offered for the EcoGrid Resort software. This decides whether the Ethical
Estimation Engine is a **portfolio product**, a **paid bespoke build**, or —
as now proposed — **an interest in a joint venture**.

Related exposure: Ethical Power is a three-venture counterpart (this engine's
sole prospective client, EcoGrid's historic partner-in-discussion, JobsTracker
pitch target). A shared-ownership structure deepens that concentration
materially rather than diversifying it.

**What was withdrawn (recorded so the reasoning is not lost).**
- *Licence route* — Coreproma retains IP, lower build price, may resell to
  other EPCs. This was the only route that preserved Play 5 as an independent
  venture.
- *Outright sale* — client owns the code at a materially higher price;
  revenue, not a product.
- *Hybrid* — sale with a carve-out letting Coreproma reuse generic components.

**The consequences of proposing only the shared structure.**

1. **Play 5 stops being a venture and becomes a JV interest.** If the IP sits
   in a jointly-held entity, Coreproma cannot license the engine to other EPC
   contractors on its own initiative. Whether a Play 5 product still exists
   depends entirely on the commercialisation clause in the heads of terms —
   that clause, not the cap, is the commercially decisive term.
2. **The cap is now the whole downside, not one branch.** £250k is the
   *bottom* of the realistic £250k–£350k range, so Coreproma absorbs the
   overrun. Against a £300k midpoint that is roughly £50k of expected margin
   plus the entire tail. It holds only against a written scope baseline with
   enforced change control; the proposal's own framing is that requirements
   will move constantly, which is exactly the combination that fails.
3. **No fallback exists in the document.** A single-option proposal removes
   the client's ability to self-select and removes Coreproma's ability to
   capture more value from a client who wants exclusivity. If Ethical Power's
   board declines co-ownership — a plausible reaction from an EPC asked to
   own software jointly with a supplier — the negotiation restarts from zero
   with nothing else on the page. Hold a fallback position privately.
4. **The anchor has now been removed.** The £250k cap only reads as a
   concession against a stated alternative. On 2026-08-09 the £250k–£350k
   reference range was struck from the client documents and replaced with the
   claim that comparable builds are *open-ended, with no ceiling*. That is
   rhetorically stronger and factually softer: it is a qualitative assertion
   from the party proposing the cap, it invites the reply "prove it", and it
   sits awkwardly in a document whose stated virtue is candour. The range
   survives only here, as the internal basis for the number. If the cap is
   ever challenged, the range is the defence and it is no longer on the page.
5. **Heads of terms move onto the critical path.** Shareholdings,
   contributions (is background IP contributed or licensed in?), governance
   and deadlock, commercialisation rights, exit and continuity, and whether
   the EcoGrid Resort software sits inside the same structure all have to be
   negotiated *before* signature, not after. Signature is targeted for end
   August to hold the mid-December go-live. That is a very short runway for a
   corporate transaction.
6. **Extending the cap to EcoGrid is a promise about software with no spec.**
   EcoGrid Resort has no product code and no engineering scope. The £250k
   figure cannot simply be copied across; the documents say "scope to be
   defined separately" and that wording must survive negotiation.

**Payment schedule** — £60,000 induction on signature, 70% of the balance on
first-module delivery (£133,000), 30% in Q1 2027 (£57,000). ⚠ Taken literally
as £60k *plus* 70% *plus* 30% of the total this sums to £310,000 and breaks the
cap; the documents assume the induction fee is credited within the £250,000.
Confirm before issue.

**Options now.**
- **(A) Proceed as proposed** — single shared-ownership route, capped. Accept
  that Play 5's future rests on the commercialisation clause.
- **(B) Proceed, but negotiate a reseller carve-out** giving Coreproma the
  right to license a generic version to other EPCs, with proceeds shared.
  Preserves the venture inside the structure. **Recommended if (A) is chosen.**
- **(C) Restore a fallback route privately** — not in the document, but agreed
  internally, so a board rejection of co-ownership does not end the deal.

**Owner.** Franck (technical/IP) + Mark (commercial)
**Deadline.** Heads of terms drafting must start immediately if signature is
to happen by end August 2026 and hold the mid-December go-live.
**Status.** Open

---

## D-16 — Two proposed modules: investor portal and drone site capture

**Context.** On 2026-08-09 two additional modules were proposed for the
Ethical Estimation Engine and recorded in **Annex A** of quotation v0.3 as
indicative only — deliberately outside the priced scope so they cannot delay
the signature or breach the Phase 1 scope freeze. They now need a portfolio
decision, not just a client one.

**Module 1 — Investor portal.** Give third-party investors on a project
(including the French project) permissioned access to the documents relevant
to an investment decision and the reports produced as work proceeds.

*Assessment:* the strongest of the two. It is mostly a permissioned external
role over data the platform already generates, not a second application. The
real argument for building it properly is **portfolio reuse**: EcoGrid Resort
(Play 4) is built on an SPV-per-site model with three named investor profiles
and needs exactly this. One portal, two plays.

*Open:* (a) the investing entity and its jurisdiction — UK or France —
because disclosure duties toward investors differ and shape the design;
take legal advice before build, not after. (b) A role on the estimation
platform, or a separate application? Large cost difference. (c) Hard
segregation: tender pricing, margin and the rate library must never be
reachable by an external user, and an investor who also backs a competitor is
a realistic scenario, not a hypothetical.

**Module 2 — Site capture (WaypointsCreator).** Drone imagery of a site
feeding terrain, dated risk evidence and progress reporting.

*Assessment:* the software half is defensible — WaypointsCreator already does
survey grids, 3D terrain simulation and DJI mission export, and the engine
already ingests GEOALT terrain, so site capture genuinely feeds Step 2. The
**service** half is a different business: commercial site survey flying in the
UK is a Specific category activity requiring a CAA Operational Authorisation,
an operations manual, a certified remote pilot (RPC-L1, replacing the legacy
GVC) and third-party insurance under EC 785/2004. Neither Coreproma nor
WaypointsCreator holds any of that — WaypointsCreator sells planning software
to pilots, it does not fly. Scope was fixed at **software only** on
2026-08-09; the flying obligations sit with the client or its surveyor.

*Open:* (a) confirm in writing who holds the Operational Authorisation and
insurance before any flight is planned through the platform. (b) **D-04.**
(c) Whether either module is actually demanded by Ethical Power or merely
available from Coreproma — a module that exists because we own the asset,
rather than because the client has the problem, is the wrong reason to build.

**Options (both modules).**
- **(A) Keep in Annex A** until the estimating core is live, then scope and
  quote separately. Current position, and the recommended one.
- **(B) Promote Module 1 only** to a priced Q1 2027 line, on the strength of
  the EcoGrid reuse case.
- **(C) Drop Module 2** and resolve D-04 independently.

**Owner.** Franck (technical, D-04) + Mark (commercial, demand)
**Deadline.** Module 1 jurisdiction question: before any design work.
Everything else: after Phase 1 go-live.
**Status.** Open

---

## Resolved

*(empty — first decision resolved goes here, with date and outcome)*
