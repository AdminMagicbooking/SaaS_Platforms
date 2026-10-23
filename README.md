# SaaS Projects — Portfolio Workspace

Shared workspace for **Franck Merlin** and **Mark Defosse**: everything
**non-code** about each SaaS venture in the portfolio — product specs,
business plans, commercial and investor material, contracts, partner and
client documents, and a per-venture journal of what was done.

It is **not** a codebase. Each venture's code and Azure deployment live in
their own repo under `D:\ClaudeProjects\<App>`; the mapping is in `CLAUDE.md`.

## What lives here

```
SaaS_Projects/
  README.md                  this file
  CONVENTIONS.md             editing rules, git workflow, naming, what lives where
  CLAUDE.md                  AI-assistant context: folder → app mapping, journal rule
  projects-status.html       portfolio status page (open in a browser)
  accounts-register.html     accounts register
  _portfolio/                ONLY the two files CampaignBuilder fetches:
    products-index.json      machine-readable product index
    voice-and-tone.md        portfolio-wide voice guide (system prompt)
  _templates/                templates for new products / docs

  campaignbuilder/           internal marketing engine that reads this repo
                             (journal.md + integration-contract.md)
  coreproma/                 construction project management SaaS
  ecogrid-resort/            EcoGrid Resort — solar micro-grid platform for
                             southern-European resorts & campsites
  emailrelay/                multilingual email-to-WhatsApp bridge
  ethical-engine/            solar EPC tender estimation platform for Ethical Power
                             (client-docs/ holds their source material)
  findallproperty/           UK property valuation + neighbourhood intel
  gttourz/                   supercar driving-tour operator platform
  jobstracker/               field-ops platform for construction trades
                             (investor/, contracts/, marketing/, gaswise/)
  supercars-tours/           supercar owner comparison guide + supplier directory
  waypointscreator/          DJI drone mission planning
```

Every venture folder has at its root:

- `product-spec.md` — the canonical product spec (read by CampaignBuilder)
- `journal.md` — dated log of what was done here for that venture: documents
  produced, partner interactions, decisions. Start there to see where a
  venture stands.
- `contracts/` — customer agreements (drafts only)

## How to navigate

- **Where does venture X stand?** Open `X/journal.md`, read the Reference
  block, then the last few entries.
- **What does product X do?** `X/product-spec.md`.
- **Which app repo is X?** The table in `CLAUDE.md`.
- **Changing a product spec?** Read `CONVENTIONS.md` §9 first — CampaignBuilder
  reads it in production within 5 minutes.
- **Starting a new venture?** Copy a template from `_templates/`, create the
  folder (kebab-case), add `journal.md` from `ecogrid-resort/journal.md`,
  register the spec in `_portfolio/products-index.json`.

## Consumed by CampaignBuilder

This repo is the canonical source of product knowledge for **CampaignBuilder**,
our internal Azure-hosted tool that generates social posts and autoreplies to
prospect emails. It reads:

- `_portfolio/products-index.json` to discover all products
- Each `<venture>/product-spec.md` with its YAML frontmatter
- `_portfolio/voice-and-tone.md` as a mandatory system prompt

The full data contract lives in `campaignbuilder/integration-contract.md`.
Edits to any of these files propagate to CampaignBuilder within 5 minutes.
**Do not delete or move `_portfolio/`.**

## Working together

Git-backed folder, both authors edit directly — see `CONVENTIONS.md`
(feature branches, no force-push, `git mv` for renames, commit message
conventions).

`TODO` and `TO FILL TOGETHER` markers are waiting on one of us or on a joint
decision. Open decisions are recorded in the journal of the venture they
concern.
