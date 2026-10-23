---
product_name: SuperCars.Tours
slug: supercars-tours
status: live  # site is live; pre-revenue, supplier packages not yet sold
play: 3
play_name: standalone-bet
website: https://supercars.tours
repo: null  # D:\ClaudeProjects\supercars.tours — TODO: GitHub URL
languages: [en]
pricing_currency: EUR  # proposed supplier prices in EUR; billing currency not confirmed
pricing_model: supplier-listings-and-sponsorship  # free for owners, operators and event organisers
target_audiences: [supercar-owners, supercar-tour-operators, supercar-service-suppliers]
ai_safe_for_autoreply: false  # prices are proposals, team and traction unconfirmed — route to human
ai_safe_for_social_post: true  # positioning and audience sections only; no prices, no "first/only" claims
spec_last_updated: 2026-10-23
brain_format_version: structured-with-faq
---

# SuperCars.Tours — Application Brain

Single source of truth for what SuperCars.Tours is and does. Two audiences:

1. Humans / agents who need the capability map and the commercial model.
2. CampaignBuilder — social post generation from the sections mapped in
   `_portfolio/products-index.json`. Autoreply is **off** until prices and
   team are confirmed.

Not to be confused with **GTTourz** (`gttourz/`), the back-office SaaS for
tour operators. SuperCars.Tours is the public-facing discovery and comparison
site; GTTourz is the operator's tool. The two may hand off to each other
(see §7) but are separate products.

Keep it current. If the site, the packages or the model change, update this
file in the same change. Sources: `crowdfunding/2026-10-18/deliverables/`
(preparation pack and editable documents, 2026-10-18).

---

## 1. Product summary

SuperCars.Tours is a comparison guide and directory for supercar owners. It
helps an owner choose a driving tour suited to their driving and hospitality
preferences, and find specialist suppliers (transport, paint protection,
detailing, carbon repair, exhausts and parts, specialist maintenance, classic
car repair, track activities).

The site is **free for owners, tour operators and event organisers**.
Revenue comes from suppliers who pay for visibility and enquiries: annual
listings, category sponsorship, premium placement and accepted leads.

Editorial independence is a design constraint, not a slogan: scoring rules
are published, paid content is labelled, and a paid package cannot change an
editorial score or buy a favourable review.

## 2. Who it is for

| Persona | Who they are | The job they need done |
|---|---|---|
| Supercar owner / active buyer (UK first) | Owns or is about to buy a Ferrari, Lamborghini, McLaren, Porsche… and has a current tour, transport, protection or maintenance need | Compare tours on like-for-like facts; find a trustworthy specialist nearby |
| Tour operator / event organiser | Runs multi-day driving tours or track and lifestyle events | Be listed with comparable facts, free; receive qualified enquiries |
| Specialist supplier (paying customer) | UK business serving supercar owners: transport, PPF/detailing, carbon repair, exhausts, maintenance, classic repair, track days | Reach owners with a current need; measurable enquiries |

**Out of scope for v1:** selling or operating tours; booking or payment;
finance and insurance referrals (inactive until the user journey and FCA
position are assessed); native mobile apps; route planning; community
features; markets outside the UK.

## 3. Positioning — what makes it different

1. **Comparable facts, not brochures.** Every operator profile carries the
   same fields — price basis and currency, driving days, approximate driving
   distance, group size, accommodation level, included support, exclusions,
   date checked — with a source or an explicit "unavailable". Prices are never
   combined into a ranking.
2. **Driving-led vs hospitality-led, explained.** A tour built around driving
   is a different product from one built around hotels. The site makes that
   difference legible in filters, instead of leaving owners to infer it from
   photos.
3. **Editorial independence by construction.** Published scoring rules,
   labelled paid placement, separation between whoever sells sponsorship and
   whoever scores — recorded as a conflict with a second reviewer when the
   team is too small to separate fully.
4. **One place for the supplier long tail.** The specialist services an owner
   needs are scattered across forums, club recommendations and social groups.
   The directory consolidates them with coverage area, supported vehicle types
   and a last-confirmed date.

Do **not** claim "first" or "only" platform. No dated competitor review exists
yet (search and maps, specialist directories, automotive communities, owner
clubs, operator sites, publications).

## 4. How it works — end-to-end

**Owner**
1. Lands on a comparison or service page addressing a specific question
   (e.g. driving-led Alpine tours under a budget; PPF fitters in a region).
2. Filters by geography, duration, driving intensity, accommodation level,
   budget. Price basis (per person / per car / two sharing) is shown, never
   normalised away.
3. Opens an operator or supplier profile; sees sourced facts, what is missing,
   date last checked, and clearly labelled paid placement.
4. Contacts the provider directly — the owner contracts with the provider,
   not with SuperCars.Tours. (Enquiry routing to a named supplier is a later
   feature with its own consent and dispute process.)

**Operator / organiser**
1. Requests a free profile; supplies the comparable facts with sources.
2. Editor publishes; profile keeps source and revision history.
3. Operator can correct facts at any time without buying anything.

**Supplier (paying)**
1. Requests a listing; accepts written commercial terms.
2. Listing goes live in its category and coverage area, labelled as paid where
   applicable.
3. Optional: sponsorship, premium placement, accepted-lead pricing — each with
   defined inventory, period, attribution and refund rules.

## 5. Functionality

### 5.1 Discovery and comparison
- `v1.0` Operator profiles with the fixed comparable-fact set (§3.1) and a
  source or "unavailable" per fact
- `v1.0` Comparison filters: geography, duration, driving intensity,
  accommodation level, budget
- `v1.0` Price basis shown explicitly; no cross-basis ranking
- `v1.0` Public landing listing current and upcoming tours

### 5.2 Supplier directory
- `v1.0` Supplier profiles: service category, coverage area, contact method,
  company identity, supported vehicle types, basis of any credential claim,
  last-confirmed date
- `v1.0` Paid placement displayed separately and labelled

### 5.3 Editorial
- `v1.0` Editor can update a profile with source and revision history preserved
- `v1.0` Published scoring rules; paid content cannot alter an editorial score
- `v1.1` Supplier self-service fact correction without purchase

### 5.4 Commercial
- `v1.0` Supplier listing request and acceptance of commercial terms
- `v1.1` Sponsorship and premium placement inventory with reporting
- `v1.2+` Accepted-lead billing (eligibility, attribution, duplicates,
  acceptance window, disputes, credits)

### 5.5 Audience retention
- `v1.1` Email newsletter bringing owners back to updated guides
- `v1.2+` WhatsApp broadcast — only after a documented sign-up, purpose and
  opt-out; marketing consent kept separate from enquiry consent
- `v1.2+` Owner reviews with moderation, relevant-experience check, correction
  process and publication permission

### 5.6 Analytics
- `v1.0` Distinguish browsing, enquiries and paid supplier outcomes; per
  channel: spend, sessions, attributable enquiries, accepted leads, suppliers
  acquired, contribution after delivery cost

### 5.7 Explicitly NOT in v1
- Selling, booking or operating tours; any payment flow
- Finance / insurance referrals (FCA credit-broking and insurance
  introduction rules to be assessed first)
- Native mobile apps, route planning, community, track integration
- Any market beyond the UK

## 6. Integrations and data

- No third-party datasets ingested. Profile facts are entered editorially
  from operator and supplier sources, each with a citation and date.
- Email delivery for the newsletter: TBD.
- Analytics: TBD (must separate organic from paid, and browsing from
  enquiries).

## 7. Ecosystem

Play 3 standalone bet. Adjacent products:

- **GTTourz** — operator back-office. Natural handoff: an operator listed on
  SuperCars.Tours runs the tour in GTTourz; a GTTourz tour could publish its
  public facts to SuperCars.Tours. Not built; no decision taken.
- **WaypointsCreator** — no current link.

Partner channel: Ethan Avalon (AvalonERP, US) is a prospective reseller
across Workwiz products; SuperCars.Tours is in scope.

## 8. Legal posture (summary — not legal advice)

- SuperCars.Tours is an information and advertising service. It does not
  sell tours and must not imply that a listing guarantees workmanship,
  insurance cover or tour safety.
- Owner contact data (newsletter, enquiries) needs a lawful basis, separate
  consents for marketing vs enquiry forwarding, secure records and a
  correction / dispute process. UK PECR applies to electronic marketing.
- Paid placement must be labelled as advertising. Editorial scores must be
  provably independent of payment.
- Finance and insurance introductions may need FCA permission; inactive until
  assessed.
- Supplier logos, images and testimonials require permission.

## 9. Success metrics

**North-star:** accepted enquiries delivered to paying suppliers per month.

**Leading indicators**
- Operator profiles with a complete comparable-fact set — target: all
  published profiles
- Repeat visits per owner (newsletter return rate)
- Supplier renewals after first term

**Counter-metrics (must not happen)**
- Any paid package changes an editorial score or ranking
- Lead disputes exceed an agreed share of billed leads
- Traffic growth without any attributable supplier enquiries — reach without
  demand proves nothing

## 10. FAQ — for the email auto-responder

Autoreply is **disabled** for this product (`ai_safe_for_autoreply: false`).
Route every inbound to a human. The answers below are for human use and for
the day autoreply is switched on.

**Is it free to list my tour?** Yes. Operators and event organisers are listed
free with the comparable-fact set. You can correct your facts at any time.

**Can I pay to rank higher?** No. Paid packages buy labelled visibility
(listing, sponsorship, premium placement). They do not change editorial
scores or rankings.

**Do you book tours?** No. You contract directly with the operator.

**What does a supplier listing cost?** Proposed ranges exist but are not
confirmed prices — route to a human.

**Which countries?** UK only for now. Other markets are later options.

**Can I advertise finance or insurance?** Not yet. Those categories are
inactive pending regulatory assessment.

## 11. Pricing & packages (PROPOSED — not confirmed with any customer)

Proposed in EUR; billing currency, VAT treatment and tax basis to be confirmed
before quoting.

| Offer | Proposed range | Modelling assumption |
|---|---|---|
| Annual listing | €300 – €5,000 / year | €900 blended |
| Category sponsorship | €5,000 – €10,000 / year | €7,500 |
| Premium placement | €500 – €1,500 / month | €750 |
| Accepted lead | €20 – €80 / lead | €40 |

No willingness-to-pay evidence yet. Pilot offer: a plain annual listing with
a fixed profile specification and transparent renewal; higher packages only
once incremental value is demonstrated. Lead volumes are never bundled into a
listing without explicit cost, delivery and refund terms.

<!-- INTERNAL -->
## 12. Team, funding and open items (internal)

- Team as stated in the crowdfunding pack: founder (Franck), Charlie as COO,
  Lorenzo Granay (Italy). Roles, time commitments and terms unconfirmed.
  Discussions with individuals in Ireland and Spain — no staffing or
  partnership established.
- Intended raise: €700k – €1m, equity route with a lead investor and a
  community campaign once evidence supports the amount. UK-only scope.
- No revenue, traffic, registered-user count, signed suppliers or historic
  financials supplied as of 2026-10-18 — the investor case is not evidenced
  yet. See `crowdfunding/2026-10-18/deliverables/editable-documents/13_Founder_inputs.md`.
- Repo: `D:\ClaudeProjects\supercars.tours`.
<!-- /INTERNAL -->

---

*Maintenance note: when packages, scope or the UK-only boundary change,
update §5, §9 and §11 first — and flip `ai_safe_for_autoreply` only once
prices are confirmed.*
