# SaaS Projects — Portfolio Workspace

This folder is the shared workspace for **Franck Merlin** and **Mark Defosse**
to align on the strategy, roadmap, and product documentation of the SaaS
portfolio.

It is **not** a codebase. The code for each product lives in its own
repository (see each product folder for repo links).

## What lives here

```
SaaS_Projects/
  README.md                  this file
  CONVENTIONS.md             editing rules, git workflow, naming
  CLAUDE.md                  AI-assistant context for the COREPROMA codebase
  dashboard.html             single-page consolidated reference (open in a browser)
  _portfolio/                cross-product strategy and shared state
    ecosystem-vision.md      the founding narrative
    product-map.md           visual map of all products
    play-1-business-plan.md  consolidated Play 1 business plan (draft v0.1)
    ownership-roles.md       who owns what between Franck and Mark
    portfolio-metrics.md     consolidated KPIs across products
    decisions-ouvertes.md    open arbitrations to resolve together
    glossary.md              official names, aliases, vocabulary
    voice-and-tone.md        portfolio-wide voice guide for content generation
    campaignbuilder-integration.md  data contract for CampaignBuilder
    products-index.json      machine-readable product index for consumers
    linkedin-drafts/         v0 LinkedIn drafts per product (review before publish)
    comms/                   draft emails (e.g. Mark onboarding)
    costs/                   monthly cost & revenue tracking (CSV per month)
      README.md              methodology, CSV schema, n8n contract
      cost-allocation-key.md rules for splitting shared services
      monthly/               one CSV per month (YYYY-MM.csv)
    monthly-reviews/         end-of-month reviews (Franck + Mark)
      README.md              cadence + template
      YYYY-MM.md             one file per month
  _templates/                reusable templates for new products / docs
                             includes business-plan.template.md + monthly-cost.template.csv
  coreproma/                 construction project management SaaS
                             (product-spec.md + business-plan.md)
  emailrelay/                multilingual email-to-WhatsApp bridge
  findallproperty/           UK property valuation + neighbourhood intel
                             (product-spec.md + business-plan.md)
  gttourz/                   supercar driving-tour operator platform
  jobstracker/               field-ops platform for construction trades
                             (product-spec.md + business-plan.md)
  SmartGrid/                 EcoGrid Resort — solar micro-grid platform for
                             southern-European resorts & campsites
                             (product-spec.md + commercial / investor decks)
  waypointscreator/          DJI drone mission planning
```

## How to navigate

- **Want a single-page overview?** Open `dashboard.html` in a browser. It
  consolidates every product, every account, every open decision, every
  business plan, every cost line, and links to every other doc.
- **Want to understand the big picture?** Read `_portfolio/ecosystem-vision.md`
  first, then `_portfolio/product-map.md`.
- **Want the Play 1 strategic view?** Read `_portfolio/play-1-business-plan.md` —
  the consolidated business plan for FindAllProperty + COREPROMA + Jobs Tracker.
  Includes an honest §2 on what is and is not built today.
- **Working on a specific product?** Go to its folder. Each contains
  `product-spec.md` (the canonical product brain). Play 1 products also have
  `business-plan.md` (one-pager: market, pricing, unit economics, projections,
  risks). Plays 2 and 3 don't have business plans yet — deferred.
- **Tracking costs and revenue?** `_portfolio/costs/` — CSV per month, schema
  in `README.md`, splitting rules for shared services in `cost-allocation-key.md`.
- **Monthly review?** Last Friday of every month. Template and past reviews
  in `_portfolio/monthly-reviews/`.
- **Need to resolve something with your co-founder?** `_portfolio/decisions-ouvertes.md`
  lists every arbitration not yet settled, with context and options.
- **Starting a new product or doc?** Copy a template from `_templates/`.

## Consumed by CampaignBuilder

This repo is the canonical source of product knowledge for **CampaignBuilder**,
our internal Azure-hosted tool that generates social posts and autoreplies to
prospect emails. CampaignBuilder reads:

- `_portfolio/products-index.json` to discover all products
- Each `<product>/product-spec.md` with its YAML frontmatter
- `_portfolio/voice-and-tone.md` as a mandatory system prompt

The full data contract lives in `_portfolio/campaignbuilder-integration.md`.
Edits to any of these files propagate to CampaignBuilder within 5 minutes.

## Working together

This is a Git-backed folder. Both authors edit directly via Git — see
`CONVENTIONS.md` for the workflow (feature branches, no force-push, commit
message conventions).

If a file says "TODO" or "TO FILL TOGETHER", it's waiting on a joint decision.
Take it as an invitation to schedule a short sync.

## Status

- **Products documented:** **7 of 7** (COREPROMA, EmailRelay, FindAllProperty,
  GTTourz, Jobs Tracker, WaypointsCreator, EcoGrid Resort). GTTourz brain landed
  2026-05-23; EcoGrid Resort added 2026-06-02 as **Play 4 (Energy / Smart Grid)**,
  at commercial / investor stage (no code yet).
- **Business plans:** Play 1 only (FindAllProperty, COREPROMA, Jobs Tracker)
  — draft v0.1 created 2026-05-23. One consolidated Play 1 plan at
  `_portfolio/play-1-business-plan.md`. Plays 2 and 3 deferred.
- **Cost tracking:** initialised at `_portfolio/costs/` with manual process
  for now; n8n automation later. First month (2026-05) is seeded but mostly
  TODO — Azure + Stripe pulls pending before the first review.
- **Monthly reviews:** cadence set (last Friday of each month). First review
  skeleton at `_portfolio/monthly-reviews/2026-05.md`.
- **Brain formats:** currently inconsistent across products (see
  `_portfolio/decisions-ouvertes.md` D-08 for the standardisation plan).
  Templates in `_templates/` are the target format.
- **Portfolio docs:** initialised; many sections marked TODO pending a
  Franck/Mark sync.
- **Dashboard:** `dashboard.html` lists every TODO and every link in one
  place — start there to see the scope of what is still unknown.

## What's blocking Play 1 right now

Three blockers surfaced during business-plan drafting on 2026-05-23 (see each
product's `business-plan.md` §10 for detail):

1. **FindAllProperty revenue model is not formalised.** Product is free for
   consumers; partner-referral model implied in product-spec §7 but no
   contract exists. Needs at least one letter of intent before v1.0 build.
2. **D-01 (Jobs Tracker productisation path)** is open and blocks pricing,
   sales motion, and engineering choices. Recommend resolving within 60 days.
3. **D-06 (currency policy)** makes the Play 1 P&L hard to read because
   COREPROMA is dual-priced EUR + GBP.

## Note on CLAUDE.md

The `CLAUDE.md` at the root is the AI-assistant context file for **this
portfolio workspace** — it explains that `SaaS_Projects` is a planning /
command-center repo (not production code) and points to each venture's folder.
It was previously coupled to the COREPROMA codebase; that coupling was removed
so the file now describes the workspace itself.
