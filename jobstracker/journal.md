# Jobs Tracker — Journal

Event log of everything done on Jobs Tracker **in this workspace** (docs,
commercial material, investor material, customer contracts, partner
interactions, decisions). Product content is NOT here — see `product-spec.md`.
Append new entries at the bottom; never rewrite old ones.

## Reference

- **Product:** Jobs Tracker — UK & Ireland field-ops SaaS for trades
  contractors (jobstracker.work). Play 1. Sold by Workwiz Limited.
- **App repo (code + Azure deployment):** `D:\ClaudeProjects\JobsTracker`
  — TODO: add GitHub URL.
- **This folder:**
  - `product-spec.md` — canonical product spec (read by CampaignBuilder)
  - `business-plan.md` — Play 1 one-pager (draft v0.1)
  - `contracts/` — subscription agreement draft 2026-10-16 (md + branded docx,
    `build-docx.js` builds it)
  - `investor/` — investor deck (2026-10-18), financial model
    (`build-financial-model.py` → xlsx), valuation memo, investor targets,
    contact routes, outreach e-mails and `.eml` drafts, product screenshots
  - `marketing/` — product PDF (EN / FR)
  - `gaswise/` — Gaswise customer material: import templates, page mock-ups,
    Arantico-vs-JobsTracker gap analysis
  - `prospects/` — prospect lists (git-ignored: personal contact data,
    CONVENTIONS section 7)
  - `case-study-cbes.html`, `pitch-ethical-power.html`, `jobs-tracker-logo.png`
- **Customers / partners:**
  - CBES — anchor customer, live since 15 Aug 2026; subscription agreement
    still to sign (Oct 2026)
  - Gaswise (Drogheda, IE) — signed Oct 2026, billing from Nov 2026, first
    release end Nov 2026; data import under way
  - Ethical Power — prospect, in discussion
  - Ethan Avalon (AvalonERP, US) — prospective reseller
- **Open:** investor outreach on hold until financial adviser reviews the
  model; raise through Workwiz Limited (£500k / £1m options).

## Log

## 2026-10-16 — Subscription agreement drafted
- `contracts/JobsTracker_Subscription_Agreement_DRAFT_2026-10-16.md` (+
  branded docx). Terms: 12-month initial term then rolling, 90 days' notice,
  Azure UK hosting. To be sent to CBES and Gaswise.

## 2026-10-18 — Investor package
- Investor deck, financial model, valuation memo, investor targets and outreach
  e-mails produced in `investor/` (see `investor/README.md`).
- 2026-10-19: contact routes added; outreach paused pending adviser review.

## 2026-10-23 — Journal created; repo hygiene
- Created this `journal.md` (portfolio-wide rollout, rule in root
  `CLAUDE.md`). Entries above are reconstructed from file dates, not a full
  history.
- `prospects/` removed from git and ignored (personal data). Gaswise templates
  unzipped into `gaswise/templates/`. Root `Gaswise/` folder (gap analysis vs
  Arantico) to be merged into `gaswise/`.
- Involved: Franck, Claude.
- Next: add the app's GitHub URL; log CBES signature and Gaswise go-live.
