# Ecosystem Vision — The Founding Narrative

> **Status:** draft v0. Written by Franck on 2026-05-22 from the existing
> product brains. **Mark must read this and react** — agree, disagree,
> rewrite. This is the document that defines whether we are aligned.
>
> **TO FILL TOGETHER:** the open questions at the end.

## What we are actually building

The five SaaS products documented in this folder do **not** form a single
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

### Play 3 — WaypointsCreator (outlier / standalone bet)

WaypointsCreator targets **DJI drone pilots**. No overlap with property,
construction, messaging, or any of the above. Different vertical, different
buyer, different revenue model (per-seat consumer SaaS at €20/30 per month).

**Strategic position:** this is either a side-revenue stream, a strategic
mistake, or an entry point into a future "physical-world operations"
portfolio (drones → mapping → site surveys → property → ...). We have not
articulated which.

**Open question for Mark:** WaypointsCreator is a clear focus-cost. Is it
worth the engineering attention given the property bet is unfinished? This
is in `decisions-ouvertes.md` as D-04.

## Why this matters now

Franck and Mark are two people. Building three plays simultaneously means:

1. **Engineering attention is split between Node and .NET stacks** (see
   `decisions-ouvertes.md` D-05).
2. **Carbon-tracker module risks being implemented twice in two stacks**
   (D-02).
3. **Brand and pricing currency are inconsistent** across products (D-06,
   D-07).
4. **The 6th product** (in development) is unknown — does it belong to
   property, infrastructure, or another play entirely? Until we see the
   brief we cannot judge.

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
4. **Where does the 6th product fit when its brief arrives?**
5. **Who owns the strategic direction of each play?** Today it is implicit;
   it should be explicit (see `ownership-roles.md`).
