# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this
repository.

## What this workspace is

`SaaS_Projects` is a **portfolio / command-center** workspace — a collection of
independent SaaS ventures, each in its own subdirectory, holding business plans,
product specs, "brains", commercial material, partner correspondence and
investor material. It does **not** contain the production application code for
those ventures; each product is developed and deployed from its own separate
repository.

Remote: `https://github.com/AdminMagicbooking/SaaS_Platforms.git` (GitHub).

## Layout

Venture folder → app repo (code + Azure deployment, under `D:\ClaudeProjects\`):

| Folder | App repo | Notes |
|---|---|---|
| `coreproma/` | `COREPROMA` | construction-management SaaS |
| `ecogrid-resort/` | `EcoGridResort` | ex-`SmartGrid/`, renamed 2026-10-23 |
| `jobstracker/` | `JobsTracker` | field-ops SaaS; `gaswise/` = customer material |
| `ethical-engine/` | `Ethical` | Estimation Engine; client source docs in `client-docs/` |
| `supercars-tours/` | `supercars.tours` | |
| `waypointscreator/` | `Waypoints` (+ `Waypoints-promo`) | |
| `gttourz/` | — none yet | `TourzManager` is not this product |
| `findallproperty/` | `PropertyyScrapper` | Property Scraper |
| `emailrelay/` | — none | |
| `campaignbuilder/` | `CampaignBuilder` | internal marketing tool, consumes this repo; journal only |

- `_portfolio/` — **only** `products-index.json` and `voice-and-tone.md`, the two
  files CampaignBuilder fetches from GitHub raw. Nothing else lives there.
- `_templates/` — templates for new products / docs
- `campaignbuilder/integration-contract.md` — how CampaignBuilder reads this repo
- `projects-status.html`, `accounts-register.html` — portfolio dashboards
- `CONVENTIONS.md` — workspace conventions

## Per-venture `journal.md` — mandatory

Each venture folder has a `journal.md` at its root. It is the venture's memory
of what was done **in this workspace**: documents produced, partner
interactions, decisions, links to the app repo. It is an **event log**, not a
product document — product content lives in `product-spec.md` / `brain.md`.

Rule: **after any session that creates, changes or discusses something in a
venture folder, append a dated entry to that folder's `journal.md`** before
finishing. Newest entry at the bottom. Format:

```
## YYYY-MM-DD — short title
- What was done (files created/changed, with relative paths)
- Who was involved (partner, contact, Franck/Mark)
- Decisions taken or left open (the journal is the decision record)
- Next step, if any
```

If a venture folder has no `journal.md` yet, create one from
`ecogrid-resort/journal.md` as the model.

## Conventions

See `CONVENTIONS.md` for naming and structure rules across venture folders.
Folders are kebab-case lowercase (`ecogrid-resort/`, not `EcoGridResort/`).

## Note

Each venture's *production code* lives in its own repository, separate from this
portfolio. Do not assume application source, build commands, or deployment
config live here — this workspace is documentation, planning, and scaffolding.
