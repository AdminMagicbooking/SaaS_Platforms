# CampaignBuilder — Journal

Event log of everything done on CampaignBuilder **in this workspace**.
CampaignBuilder is an **internal tool**, not a product for sale: it has no
`product-spec.md` and is not listed in `_portfolio/products-index.json` —
it is the *consumer* of that index. Append new entries at the bottom; never
rewrite old ones.

## Reference

- **What it is:** Franck's own Azure-hosted marketing engine, developed with
  AI. Reads this repo (`products-index.json`, each `product-spec.md`,
  `_portfolio/voice-and-tone.md`) to generate social posts and autoreply to
  inbound prospect e-mails. Owns its own CRM contact data, SMTP/SendGrid
  sending, scheduling and analytics — none of that lives here.
- **App repo (code + Azure deployment):** `D:\ClaudeProjects\CampaignBuilder`
  — TODO: add GitHub URL.
- **This folder:** this journal. Integration contract lives in
  `integration-contract.md` in this folder (v0.1, 2026-05-22); do not
  duplicate it here.
- **Repo dependencies it is sensitive to:**
  - a product folder rename changes `spec_path` / `raw_url` in
    `products-index.json` — update in the same commit
  - `voice-and-tone.md` missing → generation halts
  - `<!-- INTERNAL -->` blocks must wrap pilot names and unannounced features
  - GitHub read PAT in Azure Key Vault (`CampaignBuilder--GitHubReadPAT`),
    90-day rotation owned by Franck
- **Current use:** ~10,000 UK prospect companies loaded for Jobs Tracker;
  first campaign planned first week of November 2026.
- **Open items:** the §10 checklist in `campaignbuilder-integration.md`
  (frontmatter parser, INTERNAL stripper, section extractor, cache, audit
  log, approval UI, routing table, confidence gate, Key Vault secret,
  monitoring) — status unknown in this workspace; TODO: mark what is done.
- **`_portfolio/` now holds only the two files this tool fetches:**
  `products-index.json` and `voice-and-tone.md`. Nothing else goes there.

## Log

## 2026-05-22 — Integration contract written
- Integration contract v0.1 written (now `campaignbuilder/integration-contract.md`).

## 2026-10-23 — Folder created
- Created `campaignbuilder/` and this journal so the tool has a home in the
  portfolio workspace. `ecogrid-resort` rename propagated to
  `products-index.json` the same day; `supercars-tours` added to the index.
- Involved: Franck, Claude.
- Next: GitHub URL; tick off the §10 checklist; log the first Jobs Tracker
  campaign (Nov 2026).
