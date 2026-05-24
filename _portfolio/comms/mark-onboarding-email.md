# Email draft — onboarding Mark to the SaaS workspace

> **Status:** Draft for Franck to send. Personalise the opening if needed,
> then copy-paste into your email client. Delete this file (or keep as a
> record) after sending.
>
> **Tone:** matches `_portfolio/voice-and-tone.md` — direct, peer-to-peer,
> no marketing puff. Reads like a working note between cofounders.

---

**Subject:** SaaS workspace is live — your input needed before we ship anything

**To:** marcd@ribbonfish.co.uk

---

Mark,

I have initialised our shared workspace at `AdminMagicbooking/SaaS_Platforms`. You should have the GitHub invite — accept it and clone the repo locally if you prefer working in an editor, or browse it directly on GitHub.

The repo is the **single source of truth** for everything we share: product briefs, strategy, open decisions, voice guide, marketing knowledge. It is not a codebase — actual code lives in each product's own repo. All six products are now documented (COREPROMA, EmailRelay, FindAllProperty, Jobs Tracker, WaypointsCreator, GTTourz — the last brain landed 2026-05-23).

The internal tool CampaignBuilder reads from this repo to generate marketing content and prospect autoreplies. The data contract is fully written out, so we control voice and approval flow centrally rather than scattering it across products.

## What to read first, in order

1. **`dashboard.html`** — open it in a browser. One-page reference: every product, every account, every open decision, every TODO. Start here so you see the full surface area.
2. **`_portfolio/ecosystem-vision.md`** — the founding strategic frame. I propose we have three distinct plays (UK property ecosystem, infrastructure, standalone bet). You may disagree — leave a `> NOTE (Mark):` block in the file if so.
3. **`_portfolio/decisions-ouvertes.md`** — ten cross-product arbitrations not yet resolved.

## Three things I need from you in the next two weeks

1. **Read `_portfolio/voice-and-tone.md` and push back where you disagree.** This file guides every piece of content CampaignBuilder will generate. If the voice is wrong, fix it before it produces 200 LinkedIn posts in a tone you'd reject.
2. **Block a 60-minute working session to populate `_portfolio/ownership-roles.md`.** Today every line says TODO. Without an explicit split, we will collide on decisions or fall through gaps.
3. **Tag yourself as owner on three of the ten open decisions.** My suggestion to prioritise: D-01 (Jobs Tracker productisation path), D-03 (what is "Invation AI" structurally), D-04 (WaypointsCreator — keep, spin out, or wind down).

## A few things to know before you start editing

- **Git workflow** in `CONVENTIONS.md §1`: branches and PRs for anything substantive, direct push to main only for typos.
- **CampaignBuilder approval flow**: every generated post or autoreply starts as `draft`. Auto-publish is forbidden for the first 30 days (clock starts 2026-06-01). Every output needs one of us to approve in that window.
- **No secrets in this repo** (`CONVENTIONS.md §7`). API keys, passwords, tokens — never. The `dashboard.html` lists what accounts exist and where credentials live (Azure Key Vault for most), never the credentials themselves.
- **INTERNAL markers**: anything wrapped in `<!-- INTERNAL -->` blocks gets stripped before publication. Use them when you mention pilot customer names, in-flight decisions, or anything we are not ready to make public.

## Heads-up on operational gaps you will see

Honest warning: many sections are marked TODO or TO FILL TOGETHER. That is deliberate — I documented the gaps explicitly rather than papering over them. Notable holes:

- `_portfolio/ownership-roles.md` is empty (waiting on the working session)
- `_portfolio/portfolio-metrics.md` has placeholders for every product KPI
- Several products have no public landing page yet (FindAllProperty, WaypointsCreator, EmailRelay)
- A GitHub PAT for CampaignBuilder needs to be provisioned in Azure Key Vault before any of the integration work can start

I have left these visible so we can prioritise rather than rediscover them in three months.

## What I will do next

- Provision the GitHub PAT for CampaignBuilder once you have access (so we both see it in our Key Vault)
- Hold pending on filling `ownership-roles.md` until our working session
- Not generate any more LinkedIn drafts until you have reviewed the voice guide

Let me know when you have read the founding docs and I will book the working session.

Franck

---

## Notes for Franck before sending

- [x] ~~Replace placeholder email address at the top~~ — done (marcd@ribbonfish.co.uk)
- [ ] Confirm Mark accepted the GitHub invite before sending — if not, mention it in the opening
- [ ] Add a calendar link if you want him to book the working session himself
- [ ] Optional: attach `dashboard.html` to the email so he can open it without cloning the repo first
- [ ] Sign-off — adjust to your usual style ("Cheers", "À bientôt", etc.)
