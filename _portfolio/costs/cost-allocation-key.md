# Cost allocation key — how shared costs are split

> This file is the **rule book**. Any cost that cannot be attributed to a single product gets logged as
> `product_slug: shared` in the monthly CSV, then split into per-product lines using the rules below.
>
> If you find yourself ad-hoc-ing a split, **come back here and write the rule first**. Otherwise the
> tracker drifts within 3 months and the numbers stop being defendable.

## Allocation methods used

We use three split methods, in order of preference:

1. **Direct attribution** — when a service exposes per-product usage (Azure resource groups, Anthropic API keys, Stripe Products). Always preferred. No allocation needed.
2. **Usage-weighted split** — when a shared service can be metered by usage (tokens consumed, messages sent, customers billed). Apply the weight monthly.
3. **Flat split** — when neither of the above works (subscription costs, GitHub Org seats). Equal split across products, **only as a last resort**.

## Service-by-service allocation rules

### Anthropic Claude API
- **Method:** Direct attribution via per-product API key.
- **Rule:** Create one API key per product (`coreproma-prod`, `gttourz-prod`, `jobstracker-prod`, etc.). Anthropic console exposes usage per key.
- **Today:** Mostly manual reads from the console. TODO: confirm whether a single workspace has multiple keys today or one shared key (if shared, split is impossible — fix the key structure first).

### Azure subscription (overhead — Defender, Monitor, etc.)
- **Method:** Direct attribution via Resource Group tagging.
- **Rule:** Each product has its own RG. RG-level costs are 100% attributed to that product. Subscription-wide overhead (e.g. Defender for Cloud, central Log Analytics workspace) is `shared`, split via usage-weighted method (proportion of RG cost).
- **TODO:** Confirm the tagging convention (e.g. `tag: product=coreproma`) and that all resources carry it.

### Stripe — monthly fees
- **Method:** Direct attribution via Stripe Products.
- **Rule:** Stripe charges 1.5% + 20p (UK) or similar per transaction. Stripe's reporting can break fees down by Product. Use that.
- **Shared overhead** (e.g. Stripe Atlas, Tax setup): flat split across products that actually generate revenue in the month.

### Twilio (WhatsApp + SMS)
- **Method:** Direct attribution via per-product Twilio number / Messaging Service.
- **Rule:** Each product using Twilio gets its own Messaging Service. Twilio console exposes usage per service.
- **Currently shared by:** EmailRelay and GTTourz. **TODO:** Confirm GTTourz uses a different number pool from EmailRelay, otherwise we cannot split.

### SendGrid
- **Method:** Direct attribution via per-product sub-user (SendGrid supports sub-accounts).
- **Rule:** One sub-user per sending product. Sub-user-level reporting in SendGrid console.
- **Currently shared by:** COREPROMA, EmailRelay (Inbound Parse), WaypointsCreator, GTTourz. **TODO:** Confirm sub-user structure.

### Migadu SMTP
- **Method:** Currently only used by Jobs Tracker. Full attribution to `jobstracker`.

### Google Maps API
- **Method:** Direct attribution via per-product Google Cloud project + API key restriction.
- **Rule:** Each product calling Maps has its own restricted API key. Billing in Google Cloud Console is per-project.
- **Currently shared by:** Jobs Tracker, GTTourz. **TODO:** Confirm separate API keys.

### Cesium ion
- **Method:** Currently only used by WaypointsCreator. Full attribution.

### Xero (accounting subscription, not the GTTourz integration)
- **Method:** Currently only used by GTTourz. Full attribution to `gttourz`.

### GitHub Organisation
- **Method:** Flat split across products that have a repo in the org.
- **Rule:** Total monthly cost ÷ number of active product repos. Update when products are added or repos retired.

### Domain registrar
- **Method:** Direct attribution per domain.
- **Rule:** Each domain belongs to one product. Renewal cost goes to that product.
- **Edge case:** If Magicbooking Ltd has a corporate domain shared across products, split flat.

### Application Insights / Log Analytics
- **Method:** Direct attribution per workspace.
- **Rule:** One workspace per product. If a single shared workspace is used (current state — TODO confirm), split usage-weighted by ingestion volume per product.

## Two-founder time as a cost (the elephant in the room)

This tracker captures **infrastructure cost only**. It does **not** capture Franck's and Mark's time, which is the dominant cost of the business.

Two options for the future:
1. **Ignore time cost** (current default). Works while we are bootstrapping. Will distort gross-margin calculations.
2. **Allocate a notional founder rate** (e.g. £X/hour × estimated hours per product per month). Lets us reason about true unit economics, but adds maintenance burden.

**Decision:** parked until end-2026 unless an investor conversation forces it earlier. Note it in §5 of each business plan ("Gross margin excludes founder time").

## When to update this file

- A new service is added to the stack.
- A service moves from "shared" to "directly attributable" (or vice versa).
- A split method changes (e.g. moving from flat to usage-weighted).

Bump the date and add a short changelog at the bottom when you edit.

---

**Changelog**
- 2026-05-23 — Initial draft. Three Play 1 products (FindAllProperty, COREPROMA, Jobs Tracker) are the priority.
