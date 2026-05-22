# brain.md — [Product Name] Product Knowledge Base

> **Purpose of this file.** The single canonical reference for [Product Name].
> Describes what it is, every feature, pricing, integrations. Section 10 is
> written so this file can also serve as the knowledge base for an automated
> email responder to inbound prospect / user enquiries.
>
> **Source documents:** [pointers to PRD, architecture doc, vision doc, etc.]
> **Stage:** [BMAD Phase X / Concept locked / MVP shipped / Live]
> **Last updated:** YYYY-MM-DD

---

## 1. Product at a Glance

| | |
|---|---|
| **Product name** | [official name from `_portfolio/glossary.md`] |
| **Category** | [one-line category] |
| **Hero headline** | [the one-line public hook] |
| **For** | [target audience in plain words] |
| **Platform** | [web app / PWA / mobile / etc.] |
| **Pricing** | [tier names + headline price, currency from D-06] |
| **Languages** | [interface languages] |

**One-paragraph description.** [3–5 sentence elevator pitch. Specific, not
marketing-flavoured. End-to-end what the product does.]

**The problem it solves.** [The painful status quo for the target user.
Concrete, with named alternatives.]

---

## 2. Who It's For

[Primary persona + secondary persona, plus out-of-scope audiences. Use a
table if more than two.]

| Persona | Who they are | The job they need done |
|---|---|---|
|  |  |  |

**Out of scope for v1:** [explicit list — saves time in sales]

---

## 3. The Positioning (what makes us different)

[Two to four numbered points. Each one a real differentiator, not a generic
benefit. Reference the named competitors you are beating.]

---

## 4. How It Works — The End-to-End Flow

[Numbered steps from user action to outcome. Include latencies if known
("under 60 seconds"). This is the section a prospect screenshots and
forwards.]

---

## 5. Full Functionality List

[Group by feature area. Tag each item with the release tier it ships in
(`v1.0`, `v1.1`, `v1.2+`) AND/OR the pricing tier it requires (`(Free)`,
`(Pro)`, `(Pro+)`). One single list of capabilities — this is the binding
spec, not marketing.]

### 5.1 [Feature area A]

- `v1.0` [Capability — one line. Map to FR-NN if you have a PRD.]

### 5.2 [Feature area B]

- `v1.0` [...]

### 5.3 Cross-cutting capabilities

- [...]

### 5.4 Explicitly NOT in v1

[List by exclusion — sets honest expectations. Includes things planned for
v1.1, v1.2+, or never.]

---

## 6. Third-Party Data Sources / Integrations

[If the product is data-dependent (FindAllProperty), split into "datasets
ingested" vs "user-on-demand fetches" — legally important. If purely an
operational SaaS (COREPROMA), list integrations: Stripe, SendGrid, Google
Maps, Anthropic, etc.]

---

## 7. The Ecosystem It Belongs To

[Reference the relevant Play in `_portfolio/ecosystem-vision.md`. Name the
adjacent products this one hands off to or receives from. If it is a
standalone bet, say so explicitly.]

---

## 8. Legal Posture (Summary)

[Research-grade summary, not legal advice. Cover: data lawful basis,
copyright/database rights if scraping/fetching, terms compliance, GDPR
posture, key regulator notes (ICO, EU AI Act, EPC Act, etc.). Anything
load-bearing for go-live.]

---

## 9. Success Metrics & Counter-Metrics

**North-star.** [The one metric that, if it goes up, means the product is
working.]

**Leading indicators.**
- [metric — target — current]

**Counter-metrics (must not happen).**
- [red line — why it would mean we got something wrong]

---

## 10. AI / Auto-Response Knowledge Base

[Optional section — include if this product receives inbound enquiries that
benefit from auto-response. Structure mirrors FindAllProperty §10 or
EmailRelay's full design:]

### 10.1 How to use this document for auto-responses
[Routing rules: classify, pull facts, draft, route sensitive ones to human.]

### 10.2 Inbound audiences and routing
[Table: audience → signals → action (auto-send vs draft vs route).]

### 10.3 Canned answer bank
[Q&A pairs covering the most common enquiries.]

### 10.4 What an auto-responder must NOT do
[Hard limits: don't invent features, don't promise dates, route legal /
investor / partner to human.]

---

## 11. Pricing & Plans

[Per-tier table — price, what's included, what's NOT included. Match the
currency to `decisions-ouvertes.md` D-06. Match tier naming to D-07.]

---

## 12. Tech Stack (reference)

[Brief — backend, frontend, data, hosting, CI/CD, key SDKs and providers.
Useful for onboarding new engineers, not customer-facing.]

---

*Maintenance note: when product capabilities change, update sections 5, 9, and
11 first — those are the most likely to produce a wrong automated answer or
sales statement if stale.*
