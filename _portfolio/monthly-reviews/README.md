# Monthly reviews

> The discipline that makes the cost tracker useful. Without a monthly review, the CSVs become
> a cemetery of numbers nobody acts on.

## Cadence

**Last Friday of every month.** 60 minutes max. Franck + Mark, video or in person.

If a month is skipped, create the file anyway with "skipped — reason" so the gap is visible.

## Inputs (gather before the meeting)

1. `_portfolio/costs/monthly/YYYY-MM.csv` filled in
2. Each Play 1 product's `business-plan.md` §6 (Traction) updated with the month's real numbers
3. Stripe MRR/ARR snapshot
4. Azure Cost Management summary (per Resource Group)
5. List of decisions from `_portfolio/decisions-ouvertes.md` with a status change in the month

## Outputs (write during/after the meeting)

For each month, one file: `_portfolio/monthly-reviews/YYYY-MM.md`.

Use the template below. Keep it short — **one page printable**. If you find yourself writing more,
the things that don't fit belong in the business plans or in `decisions-ouvertes.md`, not here.

## The template

Copy this into a new `YYYY-MM.md` at the start of each review:

```markdown
# Monthly Review — YYYY-MM

**Date:** YYYY-MM-DD
**Attendees:** Franck, Mark
**Duration:** XXmin

## 1. Headline this month
[One sentence. The single most important thing that happened or didn't happen.]

## 2. Financial snapshot

| Product | Cost (GBP) | Revenue (GBP) | Net (GBP) | Δ vs last month |
|---|---|---|---|---|
| FindAllProperty | | | | |
| COREPROMA | | | | |
| Jobs Tracker | | | | |
| **Play 1 total** | | | | |
| EmailRelay | | | | (later) |
| WaypointsCreator | | | | (later) |
| GTTourz | | | | (later) |
| **Portfolio total** | | | | |

FX rate used: 1 EUR = X.XX GBP (end-of-month). Source: [...]

## 3. Per-product status (Play 1)

### FindAllProperty
- Stage: [BMAD Phase 1 / PRD / build / launch]
- Customers: [n] (Δ)
- MRR/ARR: [n]
- Major event: ...

### COREPROMA
- Customers: [n] (Δ)
- MRR/ARR: [n]
- Churn (last 90d): [%]
- Major event: ...

### Jobs Tracker
- Pilot (CBES) status: ...
- D-01 (productisation) progress: ...
- Major event: ...

## 4. Decisions taken
- ...

## 5. Decisions deferred (and why)
- ...

## 6. Variance flags
*Any single line in the cost CSV that moved >30% vs last month. Investigate or explain.*
- ...

## 7. Action items
- [ ] Franck — ...
- [ ] Mark — ...
- [ ] Joint — ...

## 8. What we are NOT doing this month (the negative list)
*Things that were tempting but we are deliberately deferring. Helps avoid scope creep next month.*
- ...
```

## What to do with the review

- Commit the markdown file to the repo.
- Email a summary to anyone outside the two-founder loop who needs to know (none today; future investor or hire).
- If a decision was taken, also update `_portfolio/decisions-ouvertes.md` to mark it resolved.
- If variance flags appeared, also update the affected `business-plan.md` to reflect the new reality.

## Anti-patterns to watch for

- **Padding the review.** If a section is empty, leave it empty. Don't invent content to fill space.
- **Avoiding bad numbers.** The review must be honest. If a product is losing money, write that.
- **No action items.** A review without explicit owned actions is a meeting nobody had.
- **Carrying over the same action item three months in a row.** Decide: drop it, or escalate to a decision in `decisions-ouvertes.md`.
