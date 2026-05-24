# Costs — methodology and process

> The single source of truth for what each SaaS product costs to run and earns per month.
> Today it is manual. Once n8n is wired up (see `_portfolio/decisions-ouvertes.md` and the
> roadmap below), it becomes automated. The file structure here is the contract n8n will write into.

## Folder layout

```
_portfolio/costs/
├── README.md                         (this file)
├── cost-allocation-key.md            (how shared services are split)
└── monthly/
    ├── 2026-05.csv                   (one file per month — append-only)
    ├── 2026-06.csv
    └── ...
```

The CSV schema (also documented inline below) lives in `_templates/monthly-cost.template.csv`.

## CSV schema

Every monthly file has these columns. **Do not reorder, do not rename** — n8n and any reader scripts will depend on this order.

| Column | Type | Allowed values | Notes |
|---|---|---|---|
| `product_slug` | string | `coreproma` · `emailrelay` · `findallproperty` · `gttourz` · `jobstracker` · `waypointscreator` · `shared` | Use `shared` for any cost that cannot be attributed to a single product (then split it via the allocation key). |
| `month` | string | `YYYY-MM` | The accounting month the line belongs to, not the date of the invoice. |
| `type` | string | `cost` · `revenue` | Sign of `amount` is implicit — both are positive numbers. |
| `category` | string | see below | Normalised. |
| `line_item` | string | free text | Human-readable description (e.g. "Azure App Service chiola B1"). |
| `currency` | string | `GBP` · `EUR` · `USD` | See D-06 (currency policy). Convert at month-end FX rate when aggregating. |
| `amount` | number | decimal, positive | Two decimals max. |
| `source` | string | `azure-cost-mgmt` · `stripe` · `anthropic-console` · `twilio-console` · `sendgrid-console` · `xero` · `manual` · `n8n-auto` | How the figure was obtained — drives confidence and reproducibility. |
| `notes` | string | free text | Optional. Use for assumption flags, TODOs, or anomaly explanations. |

### Categories — normalised list

**Cost categories:**
- `compute` — App Service, Container Apps, Functions
- `database` — Azure SQL, Cosmos, any managed DB
- `storage` — Azure Blob, file shares
- `ai` — Anthropic Claude, OpenAI/Whisper, Azure OpenAI
- `messaging` — SendGrid, Twilio, Migadu, any email/SMS/WhatsApp service
- `billing` — Stripe fees, Xero subscription cost
- `maps` — Google Maps, Cesium ion
- `domain` — Domain registration + DNS + SSL certs
- `monitoring` — Application Insights, status pages, alerting tools
- `other` — Anything that does not fit; explain in `notes`

**Revenue categories:**
- `subscription` — Recurring SaaS revenue
- `one-off` — Setup fees, concierge onboarding, professional services
- `partner` — Referral commissions (FindAllProperty mortgage/insurance leads etc.)

If a new category is needed, **add it to this list first**, then use it. Don't invent ad-hoc categories.

## Process — monthly refresh (manual, today)

End of every month, before the monthly review (see `_portfolio/monthly-reviews/`):

1. Create `_portfolio/costs/monthly/YYYY-MM.csv` from the template at `_templates/monthly-cost.template.csv`.
2. Pull cost lines:
   - **Azure**: Cost Management → Cost analysis → group by Resource Group → export to CSV → one line per RG per product.
   - **Stripe**: Dashboard → Reports → Balance summary → filter by Product if Products are set up cleanly. Add as `cost` (Stripe fees) and `revenue` (gross charges).
   - **Anthropic**: console.anthropic.com → Usage → filter by API key. Split by product via API-key naming convention (`coreproma-prod`, `gttourz-prod`, etc.).
   - **Twilio**, **SendGrid**, **Xero**: each console exposes monthly usage. Export and add as `messaging` or `billing`.
3. Apply the allocation key to any `shared` line — split into per-product lines per `cost-allocation-key.md`.
4. Commit the file. The monthly review reads from it.

## Process — once n8n is wired (later)

When the n8n workflow is built (target: after Play 1 BPs are stabilised), it will:

1. Run on the 1st of each month at 09:00.
2. Pull from Azure Cost Management API, Stripe API, Anthropic API, Twilio, SendGrid, Xero.
3. Write directly to `_portfolio/costs/monthly/YYYY-MM.csv` with `source: n8n-auto`.
4. Open a PR for human review of any `manual` line that needs override (e.g. allocation key exceptions).
5. Update the monthly-review skeleton at `_portfolio/monthly-reviews/YYYY-MM.md` with computed KPIs.

The CSV schema above **is the contract**. Any breaking schema change requires a follow-up to the n8n workflow.

## Confidence & verification rules

- Any line with `source: manual` is **provisional**. A human eyeballed a number; it might be wrong.
- Lines with `source: azure-cost-mgmt | stripe | …` come from system-of-record exports and are trusted.
- At month-end, the monthly-review note must call out any month-over-month variance > 30% on a single line — this is usually either an error or a real signal worth investigating.

## What this directory is NOT for

- **Not for forecasting** — projections live in each product's `business-plan.md` §7 and `_portfolio/play-1-business-plan.md`. Costs/ tracks reality, not predictions.
- **Not for per-customer cost modelling** — that lives in each `business-plan.md` §5 (Unit economics).
- **Not for invoicing** — Stripe + Xero handle that.

## Currency handling

All amounts are stored in the **native currency of the invoice** (the `currency` column). Aggregation across products requires FX conversion — the monthly-review script (manual today, n8n later) applies the end-of-month rate from a single source (TODO: which? Bank of England ECB? Pick one and stick).

D-06 (portfolio-wide pricing currency policy) is still open and will simplify this.
