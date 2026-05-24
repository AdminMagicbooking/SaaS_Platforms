# Product Map

A one-page summary of all SaaS products in the portfolio. For the strategic
narrative see `ecosystem-vision.md`.

## Visual map

```
            PLAY 1 — UK PROPERTY ECOSYSTEM (core bet)
   ┌──────────────────────────────────────────────────────────┐
   │                                                          │
   │   FindAllProperty  ──►  COREPROMA  ──►  Jobs Tracker     │
   │   (search/value)      (renovate)       (trades ops)      │
   │                                                          │
   └──────────────────────────────────────────────────────────┘

            PLAY 2 — INFRASTRUCTURE (cross-vertical)
   ┌──────────────────────────────────────────────────────────┐
   │   EmailRelay                                             │
   │   (CRM email → WhatsApp bridge, multilingual)            │
   │   Launch market: UK estate / lettings agents             │
   │   Parent: "Invation AI platform" — status unresolved     │
   └──────────────────────────────────────────────────────────┘

            PLAY 3 — STANDALONE VERTICAL BETS
   ┌──────────────────────────────────────────────────────────┐
   │   WaypointsCreator Mission Control                       │
   │   (DJI drone waypoint mission planning, €/mo per seat)   │
   │                                                          │
   │   GTTourz                                                │
   │   (supercar driving-tour operator platform — admin web   │
   │    + driver mobile app, AI guest packs, Xero, WhatsApp)  │
   │                                                          │
   │   No overlap between the two. See D-11 for grouping.     │
   └──────────────────────────────────────────────────────────┘
```

## Per-product snapshot

| Product | Play | Vertical | Stage | Tech stack | Pricing | Currency |
|---|---|---|---|---|---|---|
| **FindAllProperty** | 1 | UK consumer property | BMAD Phase 1 (concept locked) | TBD | Free for consumers | — |
| **COREPROMA** | 1 | Construction PM (B2B + B2C homeowner) | Live (paying users) | Node/Express + React | €149 / €499 / Enterprise | EUR / GBP |
| **Jobs Tracker** | 1 | Construction field ops (B2B) | CBES pilot live | .NET 9 + React/MUI | TBD (per-engineer) | GBP (pilot) |
| **EmailRelay** | 2 | CRM ↔ WhatsApp messaging | v1 "Hardened δ" available | .NET 10 / Aspire + React | £29/seat/mo + £15/100 conv | GBP |
| **WaypointsCreator** | 3 | DJI drone planning (B2C/B2B) | Live | Node/Express + React + Cesium | €20 / €30 per month | EUR |
| **GTTourz** | 3 | Supercar driving-tour operator ops (B2B) | Live — several features in progress | Next.js 16 + Prisma 6 + Azure Blob; Claude Haiku 4.5; Google Maps; Twilio; SendGrid; Xero | TBD (not in brain) | TBD |

## Notable cross-product themes

- **Embodied-carbon module** appears in COREPROMA (live, Node stack) and is
  planned for Jobs Tracker (.NET stack). At risk of being built twice.
  → see `decisions-ouvertes.md` D-02.
- **Currency mix** spans GBP and EUR, with COREPROMA dual-listed. No
  portfolio-level pricing policy. → D-07. GTTourz adds a fourth pricing
  unknown (the brain ships no pricing at all).
- **Three tech stack families now** — Node/Express (COREPROMA, WaypointsCreator),
  .NET 9/10 (Jobs Tracker, EmailRelay), Next.js + Prisma (GTTourz).
  GTTourz pushes D-05 from a 2-stack debate to a 3-stack debate.
- **Four of six products use Anthropic Claude** (COREPROMA, EmailRelay,
  Jobs Tracker carbon roadmap, GTTourz). Single-vendor AI exposure is now
  a portfolio-level dependency — worth a fallback strategy. → potential D-12.
- **WhatsApp is now used by two products** (EmailRelay and GTTourz, both via
  Twilio). Opportunity for shared Meta Business setup, BSP contract,
  template library, and ops runbook. → potential D-13.
- **Xero appears in only one product** (GTTourz) but the pattern
  (receipts → Spend Money → reconcile) generalises easily to COREPROMA and
  Jobs Tracker. Worth flagging as a reuse candidate.
- **Auth/identity story** — JWT, refresh tokens, magic links, Google sign-in,
  Entra ID — already inconsistent across the portfolio. GTTourz adds yet
  another shape (NextAuth v5 + Google-only + email allowlist).
  Shared identity remains unpursued. → potential D-08.
- **Three of six products ship a second customer-facing app** on the same
  backend (Jobs Tracker, EmailRelay tenant portal, GTTourz driver app).
  Pattern worth naming explicitly.
