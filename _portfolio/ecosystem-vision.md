# Ecosystem Vision — The Founding Narrative

> **Status:** draft v0.1. Written by Franck on 2026-05-22 from the existing
> product brains; updated 2026-05-23 when the GTTourz brain landed.
> **Mark must read this and react** — agree, disagree, rewrite. This is the
> document that defines whether we are aligned.
>
> **TO FILL TOGETHER:** the open questions at the end.

## What we are actually building

The six SaaS products documented in this folder do **not** form a single
unified platform. They are three distinct strategic plays running in parallel.
Pretending otherwise would lead to bad decisions.

### Play 1 — The UK property ecosystem (the core bet)

A circular consumer journey across three integrated products:

```
                       ┌─────────────────────────────────┐
                       │  Consumer searches for property │
                       │       FindAllProperty           │
                       └────────────────┬────────────────┘
                                        │ honest verdict, area intel
                                        ▼
                       ┌─────────────────────────────────┐
                       │  Consumer buys & renovates      │
                       │         COREPROMA               │
                       └────────────────┬────────────────┘
                                        │ project hand-off
                                        ▼
                       ┌─────────────────────────────────┐
                       │  Trades coordinate the work     │
                       │        Jobs Tracker             │
                       └────────────────┬────────────────┘
                                        │ owner operates the asset
                                        ▼
                                  (back to search)
```

**The thesis:** today, a UK buyer/owner uses Rightmove, an estate agent, a
spreadsheet, WhatsApp, and a paper notebook. We replace that chain with a
single account, single design system, one hand-off between products.

**Where this is documented:**
- FindAllProperty `product-spec.md` §7 ("The Ecosystem It Belongs To")
- COREPROMA `product-spec.md` — **currently silent on this**. TODO.
- Jobs Tracker `product-spec.md` — **currently silent on this**. TODO.

**Open question:** if this is our core bet, why do the COREPROMA and Jobs
Tracker briefs not mention the ecosystem? Either the briefs are stale, or
the ecosystem positioning is aspirational rather than load-bearing. We need
to decide which.

### Play 2 — EmailRelay (cross-vertical infrastructure)

EmailRelay is not part of the property ecosystem. It is **CRM-agnostic
messaging infrastructure** that any business can adopt — estate agencies are
the launch market, but the spec explicitly names recruiters, dental
practices, garages, schools.

**The thesis:** any business whose CRM emits email but whose customers live
on WhatsApp has the same problem. EmailRelay solves it once.

**Strategic position:**
- Could be sold standalone to any vertical.
- Could be sold as an add-on to the UK property ecosystem (estate agencies
  using COREPROMA + EmailRelay would be the first proof point).
- Lives in a parent platform branded "Invation AI" — see
  `decisions-ouvertes.md` for the unresolved question of what "Invation AI"
  is.

### Play 3 — Standalone vertical bets (WaypointsCreator + GTTourz)

Two products in this play. They share nothing with each other except the
shape of their bet: a deep vertical SaaS for a niche buyer, no overlap with
the property ecosystem or with EmailRelay.

**WaypointsCreator** targets **DJI drone pilots**. Per-seat consumer/prosumer
SaaS at €20/30 per month. Live.

**GTTourz** (added 2026-05-23) targets **operators of multi-day supercar
driving tours**. Two apps share one backend — an admin "Pit Wall" web app
for operator staff, and a mobile-first guest app for drivers and co-pilots.
Heavy AI usage (Claude Haiku 4.5) for hotel guest packs, inbox
review/translate, and receipt OCR. Xero is the accounting back-end.
Live, but several customer-facing features (online booking, live tracking,
track-day model, driver-app design port) are not yet built. Pricing model
is not in the brain — to be decided.

**Strategic position:** the two products *together* either form an emergent
"physical-world operations" portfolio (drones → maps → routes → tours →
site surveys → property → ...) or they are two unrelated side-bets that
dilute attention from Play 1.

**Open question for Mark (D-11, new 2026-05-23):** with GTTourz in the
portfolio, Play 3 now holds **two** standalone bets. Three live options:
> 1. Keep them grouped as "vertical experiments" with a hard limit (e.g. no
>    more than two, no more than 20% of engineering capacity each).
> 2. Split GTTourz off as a Play 4 and treat it as its own strategic line —
>    only if we believe a tour-operator vertical can stand alone.
> 3. Wind one of them down to free capacity for Play 1.

The status quo (D-04 — "WaypointsCreator: keep, spin out, or wind down?")
already pre-existed. GTTourz makes the answer **more urgent**, not less.

## Why this matters now

Franck and Mark are two people. Building three plays simultaneously means:

1. **Engineering attention is now split between three stack families**
   — Node/Express, .NET 9/10, and Next.js (GTTourz). This sharpens D-05.
2. **Carbon-tracker module risks being implemented twice in two stacks**
   (D-02).
3. **Brand and pricing currency are inconsistent** across products (D-06,
   D-07).
4. **GTTourz has no published pricing or billing model yet** — without it
   we cannot judge whether Play 3 is investable or a hobby.
5. **AI dependency is concentrating on Anthropic Claude** across four of
   six products (COREPROMA, EmailRelay, Jobs Tracker carbon, GTTourz).
   Single-vendor exposure is a real risk; consider a fallback provider
   strategy before more product weight lands on it.

If we do not name our plays clearly and rank them by capital allocation,
each will get diluted attention and none will reach escape velocity.

## The North Star (proposed by Franck, awaiting Mark's reaction)

> **By end of 2027, the UK property ecosystem (Play 1) generates more
> revenue than Play 2 and Play 3 combined. Plays 2 and 3 either prove they
> can stand alone profitably, or they are wound down.**

This is a proposed commitment, not a fact. Mark — write your version below
in a `> NOTE (Mark):` block, or rewrite this section entirely.

## TO FILL TOGETHER — open questions

The questions below must be answered jointly before this document is
finalised. Each maps to an entry in `decisions-ouvertes.md`.

1. **Do we agree on the three-play framing?** Or do we see it differently?
2. **Is the property ecosystem the dominant bet, or are the three plays
   genuinely equal?**
3. **What does "Invation AI" mean structurally?** Holding company, brand
   umbrella, single platform, or just the EmailRelay parent?
4. **Play 3 framing (D-11):** with GTTourz now in the portfolio alongside
   WaypointsCreator, do we keep them grouped, split GTTourz into a Play 4,
   or wind one of them down?
5. **GTTourz commercial model:** what is the price, who pays, how many
   operator-customers do we need before it self-funds its engineering cost?
6. **Who owns the strategic direction of each play?** Today it is implicit;
   it should be explicit (see `ownership-roles.md`).
