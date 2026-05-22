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

            PLAY 3 — STANDALONE BET
   ┌──────────────────────────────────────────────────────────┐
   │   WaypointsCreator Mission Control                       │
   │   (DJI drone waypoint mission planning)                  │
   │   No overlap with any other product                      │
   └──────────────────────────────────────────────────────────┘

            UNKNOWN — 6TH PRODUCT
   ┌──────────────────────────────────────────────────────────┐
   │   (brief not yet ready — placeholder)                    │
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
| **6th product** | TBD | TBD | Not yet documented | — | — | — |

## Notable cross-product themes

- **Embodied-carbon module** appears in COREPROMA (live, Node stack) and is
  planned for Jobs Tracker (.NET stack). At risk of being built twice.
  → see `decisions-ouvertes.md` D-02.
- **Currency mix** spans GBP and EUR, with COREPROMA dual-listed. No
  portfolio-level pricing policy. → D-07.
- **Two tech stacks (Node and .NET)** divide the engineering surface
  roughly 50/50 by product count. → D-05.
- **Three of five products** name a recurring auth/identity story (JWT,
  refresh tokens, magic links, Google sign-in) — opportunity for shared
  identity, not yet pursued. → potential D-08 in future.
