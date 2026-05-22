# FindAllProperty — Product Brain

> **Source brain — placed verbatim 2026-05-22.** This brain is the strongest
> structurally of the five existing briefs (stage marker, source documents,
> counter-metrics, legal posture, AI-knowledge embedded). It is the basis
> for the portfolio-wide template at `_templates/product-spec.template.md`.
>
> Migration of other product briefs to this format is tracked as **D-08**
> in `_portfolio/decisions-ouvertes.md`.

---

**The single concept-reference for the FindAllProperty SaaS product.**
This document describes the full product concept, every functionality, and every
third-party data source the product uses. It is written to be **self-contained** —
it can be used directly as the knowledge base for an automated email responder that
answers people who write in asking for more information (see
[Section 10 — Email Automation](#10-email-automation-knowledge-base)).
- **Project:** FindAllProperty
- **Stage:** BMAD Phase 1 (Analysis) complete — concept locked, PRD next
- **Geographic scope at launch:** one UK city (proposed: Manchester)
- **Last updated:** 2026-05-22
- **Source documents:** `docs/product-brief-findallproperty-2026-05-08.md`,
  `docs/vision-findallproperty-2026-05-08.md`,
  `docs/research-findallproperty-2026-05-08.md`
---
## 1. The Product in One Paragraph
FindAllProperty is a free, UK-focused, AI-powered property tool. A consumer pastes
any UK property listing URL into a single search bar and, in seconds, receives two
things no other UK product gives them in one place: an **honest fair-value verdict**
on that listing (with the comparable sold prices behind it) and a complete
**neighbourhood intelligence layer** about the surrounding area — crime, schools,
healthcare, environmental risk, transport, demographics. Everything is built on free,
public, Open Government Licence (OGL) data.
**Positioning line:**
> *Rightmove shows you the listing. KnowYourArea (£4.99/mo) shows you the area.
> FindAllProperty does both, with an honest verdict, for free.*
---
## 2. The Problem It Solves
UK home-buyers and renters have **no honest, accessible way** to know whether a
specific listing is fairly priced — and the neighbourhood data they need is scattered
across paid tools and government websites.
- **Rightmove / Zoopla** dominate consumer search but their valuation tools are
  lead-generation funnels into estate agents. They structurally *cannot* tell a buyer
  "this listing is overpriced" without alienating the agents who pay them.
- **Hometrack** (Zoopla-owned) runs the most accurate UK valuation model — but it is
  locked behind B2B mortgage-lender contracts and never reaches consumers.
- **PropertyData / PaTMa** offer credible analysis, but as paid, investor-tilted
  Chrome extensions (yield, ROI, GDV jargon; install friction).
- **Online estate agents** (Purplebricks, Yopa, Strike) give instant valuations only
  as the top of a sell-your-home funnel — optimistic by design.
- **KnowYourArea** covers neighbourhood data well but is a separate £4.99/mo product
  with no valuation logic.
**The gap:** no single, free destination gives a buyer an honest fair-value verdict
*and* a complete area picture in one view. FindAllProperty is built to own that gap.
**Why now:** generative AI has made the "explain a number in plain English" layer
cheap to ship, and UK public data already covers the data side. The window is months,
not years — Rightmove began a major AI investment push in November 2025.
---
## 3. Who It Is For
| Persona | Who they are | The job they need done |
|---|---|---|
| **Primary — the active buyer/renter** | UK adult actively searching, 3–10 saved listings, evaluating individual properties | "I'm staring at this listing — should I trust the price, or move on?" |
| **Secondary — the curious owner / negotiator** | Homeowner curious about their own value, or a buyer mid-negotiation | "What's a fair counter-offer to put on this property?" |
**Out of scope for the MVP:** property investors, estate agents, mortgage brokers,
surveyors, developers, lenders (these are later-phase / B2B audiences).
---
## 4. How It Works — The Core Flow
1. User pastes any UK property listing URL into one input field.
2. The server fetches that URL **once**, on the user's behalf, and parses key
   attributes: price, postcode, beds, property type, floor area (if disclosed),
   EPC rating (if disclosed).
3. The server joins those attributes against:
   - an internal **valuation model** built from public data, and
   - a **neighbourhood intelligence layer** keyed off the postcode / LSOA.
4. The user gets a result page with three sections:
   - **Verdict** — one-line, traffic-light coloured, with a plain-English narrative.
   - **Comparables** — 3–5 recently sold properties with date, price, distance, reason.
   - **Area** — neighbourhood intelligence summary (crime, schools, healthcare,
     environmental risk, transport, demographics).
5. **No retention** of fetched HTML or photos. The result page links out to the
   original listing.
---
## 5. Full Functionality List
The product covers **two feature areas** sharing one URL-paste entry point and one
result page: **Valuation** and **Neighbourhood Intelligence**. Items are tagged by
release: `v1.0` (launch), `v1.1` (next), `v1.2+` (later).
### 5.1 Valuation feature area
- `v1.0` Single-input URL-paste flow with validation and one-time fetch.
- `v1.0` Listing-attribute parser for Rightmove, Zoopla and OnTheMarket detail pages.
- `v1.0` Public-data valuation model trained on Land Registry sold prices + EPC
  floor area for the launch city.
- `v1.0` Fair-value verdict — single line, traffic-light coloured
  ("looks fairly priced" / "likely 8% over fair value" / "well below market —
  investigate").
- `v1.0` 3–5 comparable sold properties shown with date, price, distance, and a
  brief reason for inclusion.
- `v1.0` Plain-English explanation paragraph (LLM-generated from the structured
  comparables).
- `v1.0` Source attribution footer ("Contains HM Land Registry data © Crown
  copyright…").
- `v1.1` Save valuation history (requires lightweight signup).
- `v1.1` Email a valuation to yourself.
- `v1.1` Estimated rental yield.
- `v1.1` Manual address entry (for users without a URL).
- `v1.2+` Expand to a second city.
- `v1.2+` Browser bookmarklet.
- `v1.2+` "What would I have to offer to make it fair value?" calculator.
- `v1.2+` Email digest tracking saved listings.
### 5.2 Neighbourhood Intelligence feature area
- `v1.0` **Crime overview** — last-12-months by category, severity colour-coded.
- `v1.0` **Schools nearby** — primary + secondary within 2km, with Ofsted rating.
- `v1.0` **Flood risk** — Environment Agency flood zones 1/2/3.
- `v1.0` **Deprivation context** — IMD 2019 LSOA decile, framed plainly
  ("less deprived than 70% of England").
- `v1.0` **Transport access** — nearest rail/tram stations + walk-time.
- `v1.1` **Healthcare facilities nearby** — GP surgeries, dentists, hospitals
  within 2km, with CQC rating.
- `v1.1` **Demographics summary** — age structure, tenure mix, household composition
  for the LSOA.
- `v1.1` **Health & employment context** — LSOA/MSOA-level statistics.
- `v1.1` **Environmental risk: radon** — radon-affected-area indicator.
- `v1.1` **Affordability vs district** — listing price vs local-authority median.
- `v1.2+` **Care homes & residential homes** with CQC ratings.
- `v1.2+` **Historic hazardous sites & landfills.**
- `v1.2+` **Renewable / industrial infrastructure** (solar, wind, gas, nuclear).
- `v1.2+` **Prison locations.**
- `v1.2+` **Detailed school admissions / FSM eligibility / language profile.**
### 5.3 Cross-cutting functionality
- `v1.0` Single-city geographic scope.
- `v1.0` Mobile-first responsive web UI (no native app, no Chrome extension).
- `v1.0` Anonymous use — no signup required.
- `v1.0` Privacy notice, ICO controller registration, GDPR Article 17 deletion route.
- `v1.0` Result-page share link.
### 5.4 Explicitly NOT in v1
Listing aggregation / full search; agent-facing tools; mortgage referrals; portal
photo display; coverage outside the launch city; native mobile app.
---
## 6. Third-Party Data Sources
There are two distinct categories: **(A)** the public datasets the product *ingests
and builds its index from*, and **(B)** the property portals the product *fetches a
single page from, on demand, when a user pastes a URL*. The distinction is legally
load-bearing — see [Section 8](#8-legal-posture).
### 6.1 Public datasets we ingest (the index)
| Source | What it provides | Used for | Release |
|---|---|---|---|
| **HM Land Registry Price Paid Data** | Sold price, postcode, type, tenure, date | Comparables engine | v1.0 |
| **EPC Register** ("Get energy performance of buildings data" service) | Floor area in m², EPC rating, property attributes | £/m² normalisation | v1.0 |
| **UK House Price Index (UK HPI)** | Monthly price index by local authority | Reflating older comps to today's value | v1.0 |
| **ONS Postcode Directory + Code-Point Open** | Postcode → lat/long + LSOA join key | The central geographic join layer | v1.0 |
| **Police.uk Crime API** (data.police.uk) | Crime category, month, fuzzed location | Crime overview | v1.0 |
| **DfE Get Information about Schools (GIAS) + Ofsted Management Information** | School locations, Ofsted ratings | Schools nearby | v1.0 |
| **Environment Agency Flood Map for Planning** | Flood zones 1/2/3 | Flood risk | v1.0 |
| **MHCLG IMD 2019** | Index of Multiple Deprivation by LSOA | Deprivation context | v1.0 |
| **Network Rail / TfGM open data** | Rail and tram stations | Transport access | v1.0 |
| **NHS ODS + CQC Syndication API** | GP surgeries, dentists, hospitals, care homes + CQC ratings | Healthcare facilities | v1.1 |
| **ONS Census 2021 (via Nomis)** | Age structure, tenure, household composition | Demographics | v1.1 |
| **OHID Fingertips API** | Area-level health statistics | Health context | v1.1 |
| **Nomis / ONS Annual Population Survey** | Employment statistics by area | Employment context | v1.1 |
| **UKHSA + British Geological Survey** | Radon-affected-area dataset | Radon risk | v1.1 |
| **Environment Agency Historic Landfill + Permitted Waste Sites** | Hazardous sites and landfills | Environmental hazards | v1.2+ |
| **Renewable Energy Planning Database (DESNZ)** | Wind, solar and other infrastructure | Industrial infrastructure | v1.2+ |
| **HMPPS open data** | Prison locations | Prison proximity | v1.2+ |
Every one of these is free and Open Government Licence (or free with registration).
A commercial alternative, **PropertyData API** (£28–£96/mo tiers), can replace the
valuation-stack sources to save engineering time — a build-vs-buy decision still open.
### 6.2 Property portals — single-page, on-demand fetch only
When a user pastes a URL, the server fetches **that one page, once**, parses the
listing attributes, returns the result, and discards the page. This is **not**
scraping or crawling.
| Portal | What is fetched | What is done with it |
|---|---|---|
| **Rightmove** | The single detail page the user pasted | Parse price, postcode, beds, type, floor area, EPC — then discard |
| **Zoopla** | Same — one user-pasted detail page | Same |
| **OnTheMarket** | Same — one user-pasted detail page | Same |
| **Agent websites** | Same — one user-pasted detail page | Same |
**Hard rules for portal fetches:**
- One page per user action — no background prefetch, no enumeration, no following
  internal links.
- Custom user agent (`FindAllProperty-Fetcher/0.1`); `robots.txt` honoured;
  back off on 429/403.
- **Never store fetched HTML or photos.** Only attributes the user could have typed
  by hand are retained, plus the source URL.
- **No mass crawling of any portal — ever.** The product's index is built entirely
  from the public datasets in 6.1, so it never *needs* to.
---
## 7. The Ecosystem It Belongs To
FindAllProperty is the **consumer front door** to a wider property-services platform
operated by, or partnered with, the business partner. The user journey is circular —
search → buy/rent/invest → own/operate → re-evaluate — and each loop brings the user
back through the connected products:
- **FindAllProperty** — search, value, area intelligence, partner listings.
- **Buy / Rent / Invest services** — estate agency, mortgages, conveyancing,
  insurance, lettings management, investor portfolio, valuation service.
- **COREPROMA** — renovation project and quote management for owners.
- **BuilderJobsTracker** — maintenance and trades coordination.
Phase 1 integrations: single sign-on across products, a shared design system,
partner-agency listings fed in directly (no scraping), and a property hand-off to
COREPROMA so a renovation project is pre-filled with the property's address, EPC and
floor area. Later phases add mortgage/conveyancing/insurance referrals, lettings
hand-off, trades recommendations, and an investor portfolio view.
The partner provides real listings via direct feed on day one — which solves the
chicken-and-egg problem that killed listing-aggregator start-ups like Boomin.
---
## 8. Legal Posture (Summary)
*Research-grade summary, not legal advice.*
- **Per-URL on-demand fetch is defensible.** A single, user-initiated fetch of one
  page sits within browsing-style precedent (transient-copy exception, *s.28A CDPA*)
  and is *de minimis* against UK database right.
- **Mass crawling of portals is a non-starter** — Rightmove and Zoopla terms of use
  explicitly prohibit bots/scrapers, UK database right is strong, and `robots.txt`
  blocks scrapers. The product is architected so it never needs to.
- **No photo retention or re-display** — copying even one portal photo server-side
  is full reproduction; there is no UK attribution defence. The product links out
  to the original listing instead.
- **GDPR** — property attributes are not personal data; agent-contact details are.
  ICO controller registration and fee are required before launch; a privacy notice
  with an Article 17 deletion route ships at v1.0.
- A solicitor sign-off is required before any Phase 2 work that involves agent-site
  feeds beyond direct partner feeds.
---
## 9. Success Metrics
- **North-star:** Verdict completion rate — % of users who paste a URL, see a
  verdict, and stay ≥30 seconds. Target ≥40% by month 3.
- Unique URL submissions/week: 500 (month 3) → 5,000 (month 6).
- Median verdict generation time: <10s (month 3) → <5s (month 6).
- Self-reported "this was useful": 60% (month 3) → 75% (month 6).
- **Counter-metrics (must not happen):** any cease-and-desist letter from a portal;
  median valuation error >15% vs actual sold prices; any retained photo or HTML.
---
## 10. Email Automation Knowledge Base
This section makes the document usable as the **knowledge source for an automated
responder** that answers people who email asking for more information about
FindAllProperty (prospective users, partners, press, investors).
### 10.1 How to use this document for auto-responses
1. **Classify the inbound email** into one of the audiences below.
2. **Pull the relevant facts** from Sections 1–9 — never invent details not present
   in this document.
3. **Draft a reply** in the matching tone, using the canned answers in 10.3 as a base.
4. **Route, don't auto-send, for sensitive categories.** Partner, investor, press
   and legal enquiries should produce a *draft* for a human to review and send.
   General product questions can be auto-sent.
### 10.2 Inbound audiences and routing
| Audience | Signals in the email | Action |
|---|---|---|
| **Prospective user** | "how does it work", "is it free", "when can I use it", "which cities" | Auto-reply from 10.3 |
| **Partner / estate agency** | "list our properties", "partnership", "agency", "feed" | Draft for human review |
| **Press / media** | "journalist", "article", "comment", "interview" | Draft for human review; route to founder |
| **Investor** | "funding", "raise", "deck", "cap table" | Route to founder; **do not** send numbers |
| **Legal / data** | "terms", "scraping", "GDPR", "copyright", "cease" | Route to human immediately; no auto-reply |
| **Support / bug** | "doesn't work", "wrong value", "error" | Acknowledge, log, route to support |
### 10.3 Canned answer bank (frequently asked questions)
**Q: What is FindAllProperty?**
A free UK property tool. Paste any property listing URL and get, in seconds, an
honest fair-value verdict on the price plus a full picture of the neighbourhood —
crime, schools, healthcare, flood risk, transport and demographics.
**Q: Is it free?**
Yes — free for consumers. There is no subscription and no signup required to get a
verdict.
**Q: How does it work?**
You paste a listing URL into one search bar. We fetch that page once, read the key
details (price, postcode, beds, type), compare it against recent sold prices from
public data, and return a plain-English verdict with the comparable sales and an
area summary.
**Q: Where does your data come from?**
Public, Open Government Licence sources — HM Land Registry sold prices, EPC records,
Police.uk crime data, Ofsted school ratings, Environment Agency flood maps, NHS/CQC
healthcare ratings and ONS demographics. See Section 6 for the full list.
**Q: Do you scrape Rightmove / Zoopla?**
No. When you paste a listing URL we fetch that single page once, on your behalf, read
the details and discard it. We never crawl portals and never store their pages or
photos.
**Q: Which areas do you cover?**
At launch, one UK city (proposed: Manchester). More cities follow once the first is
proven.
**Q: How accurate is the verdict?**
The model is built and back-tested against real Land Registry sold prices. We show
the reasoning and the comparable sales behind every verdict so you can judge it
yourself — and we show a confidence range, not just a single number.
**Q: Why can you say a listing is overpriced when Rightmove won't?**
Rightmove and Zoopla earn their revenue from estate agents, so their valuation tools
are built to generate leads for those agents. We have no agent-paid revenue model on
the consumer side, so we can give an honest verdict.
**Q: Do you keep my data / the listing photos?**
No. We do not store fetched pages or photos. We only keep the basic property
attributes and the source URL, and we provide a deletion route under GDPR.
**Q: When can I use it?**
The product is in development. (For a launch date, route to a human — this document
does not contain a confirmed date.)
**Q: I'm an estate agent — can I list with you?**
Yes, partner agencies feed their listings in directly and get prominent, accurate
presentation with direct enquiry routing. (Route this enquiry to a human.)
### 10.4 What an auto-responder must NOT do
- Do **not** state a launch date, price, or financial figure — none are confirmed
  here.
- Do **not** answer legal, partnership-terms or investor questions automatically —
  route to a human.
- Do **not** invent features, cities, or data sources not listed in this document.
- Do **not** promise accuracy beyond "back-tested against public sold prices".
---
*This document is the canonical product brain. When the concept changes, update this
file first, then propagate to the PRD and other docs.*
