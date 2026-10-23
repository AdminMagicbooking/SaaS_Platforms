# EcoGrid Resort — Journal

Event log of everything done on EcoGrid Resort **in this workspace** (docs,
commercial material, partner interactions, decisions). Product content is NOT
here — see `product-spec.md` (canonical spec) and `Commercial/brain.md`
(what the product delivers). Append new entries at the bottom; never rewrite
old ones.

## Reference

- **Product:** EcoGrid Resort™ — solar micro-grid platform for southern-European
  campsites and holiday villages. Play 4 (Energy / Smart Grid).
- **App repo (code + Azure deployment):** `D:\ClaudeProjects\EcoGridResort`
  — TODO: add GitHub URL.
- **This folder:** everything non-code.
  - `product-spec.md` — canonical product spec (read by CampaignBuilder;
    `marketing_ready: false`, not cleared for autoreply/social)
  - `Commercial/brain.md` — master reference: concept, market, model, IP,
    roadmap
  - `Commercial/BP/` — business plans, financial models, investor briefs (EN/FR)
  - `Commercial/Concept/` — concept notes, 2-pagers, investor decks
  - `Commercial/Investor_Package_2026-07/` — July 2026 investor package (EN/FR)
  - `Commercial/investor-teaser/` — interactive bilingual investor teaser
    (HTML + PPTX exports in `output/`)
  - `Commercial/presentation/dist/` — deployed to Azure Static Web Apps via
    `.github/workflows/azure-static-web-apps.yml`
  - `Commercial/API/` — inverter/energy API references (FoxESS, multi-vendor)
  - `PipelineENR/` — ENR's pipeline of permitted rooftop PV projects for sale
  - `MetalR/` — MetalR company presentation and solar-carport teasers
  - `contracts/` — see its README
- **Partners / contacts:**
  - Ethical (Tom Kneen, CEO; Boris) — co-development partner; contractual
    arrangement not yet formalised
  - ENR — French renewables partner on the ground (south-west France PV
    builder/operator); present at both campsite meetings
  - MetalR — solar carport / shade-structure supplier (material in `MetalR/`)
  - Campsites — two met; hook is the energy bill, sites want a demonstrable
    20% net saving to sign
  - Group-level targets — Maeva (Pierre & Vacances) and OMER CEO meetings
    being lined up
- **Open decisions:** Ethical contract (to agree before building the concept
  and starting the pilot application); IP/trademark clearance vs Atlas Copco
  "ecogrid" before filing in classes 9/37/42 (see `Commercial/brain.md` §1.1).

## Log

## 2026-10-23 — Folder renamed, journal created
- Renamed `SmartGrid/` → `ecogrid-resort/` (`git mv`) to match the app repo
  and CONVENTIONS §2 (kebab-case).
- Updated path references: `.github/workflows/azure-static-web-apps.yml`
  (trigger path + `app_location`), `_portfolio/products-index.json`
  (`spec_path`, `raw_url`; `slug` kept as `smartgrid`), `README.md`, `CLAUDE.md`.
- Created this `journal.md`; journal rule added to root `CLAUDE.md` for all
  ventures.
- Involved: Franck, Claude.
- Next: add the app's GitHub URL above; create `journal.md` in the other
  venture folders.
