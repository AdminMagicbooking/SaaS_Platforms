---
name: coreproma-brand
description: Use when producing or editing any COREPROMA-branded document in French or English: sales brochure, one-pager, pitch deck, partnership proposal, email template, or print PDF.
---

# COREPROMA brand system

## Overview

COREPROMA documents are **fixed-height A4 pages rendered from a single
self-contained HTML file**, printed to PDF. Sage green and gold on cream, with
Fraunces for display type and Hanken Grotesk for text.

Two properties drive everything else:

1. **Pages are `210mm × 297mm` with `overflow:hidden`.** Content past the bottom
   is silently clipped. No scrollbar, no warning, no error — the sentence is
   just gone from the PDF. You cannot eyeball this; you must measure.
2. **Files must stay self-contained.** These get emailed and printed. Inline the
   CSS, draw icons as SVG, no external assets except the Google Fonts link.

## Quick reference

| Need | Use |
|---|---|
| Design tokens + all component CSS | `assets/coreproma.css` (inline it into `<style>`) |
| Starting skeleton | `assets/template.html` |
| Markup for every block | `components.md` |
| Check nothing is clipped | `node assets/measure.mjs doc.html` |
| See the rendered pages | `node assets/measure.mjs doc.html --shot` |
| Produce the PDF | `node assets/topdf.mjs doc.html out.pdf` |

Both scripts need `playwright` and use the `msedge` channel, which avoids
downloading a separate Chromium.

## Installing in another project

Copy this whole folder to `<project>/.claude/skills/coreproma-brand/`. It is
self-contained: no imports from the COREPROMA repo, no build step.

The two scripts need Playwright, which they resolve from the *project's*
`node_modules`, not from this folder:

```bash
npm i -D playwright     # once, in the target project
```

They launch the `msedge` channel, so no Chromium download is required on
Windows. On a machine without Edge, change `channel: 'msedge'` to nothing and
run `npx playwright install chromium`.

Run the scripts from the project root so that resolution works:

```bash
node .claude/skills/coreproma-brand/assets/measure.mjs docs/my-doc.html
```

## Plan facts (single source for documents)

Quote these rather than re-deriving them from an older brochure. Last verified
2026-08-24 against `server/src/middleware/planLimits.ts` and
`server/src/utils/storage-usage.ts`.

| | Particulier / Individual | Professionnel / Professional |
|---|---|---|
| Price | 149€ / year | 499€ / year |
| Projects (chantiers) | 1 | 5 |
| Users per project | 5 | 10 |
| Companies | 30 | 50 |
| **Storage, per account** | **10 GB** | **30 GB** |
| Add-on packs | 10 GB each, billed as a subscription | 10 GB each |

Pro-only, enforced in code (`requireProfessionalPlan`, `proOnly`): site meetings
and PV, réserves and OPR, client portal and client management, contractor
invitations, situations de travaux, project stage templates.

### Never state a per-item count for files

Factures, documents and médias are **not** count-limited. They are governed by
the storage quota above. Writing "50 factures · 50 documents · 50 médias" is
wrong twice: those caps no longer exist, and the quota is per **account**, not
per **chantier**. State the GB figure and that packs extend it, and never pair a
GB figure with "par chantier".

## Palette

| Token | Value | Use |
|---|---|---|
| `--ink` | `#21302a` | body text, darkest ground |
| `--ink-soft` | `#4d5d54` | secondary text |
| `--sage` | `#4a7c59` | brand primary, left-card accent |
| `--sage-deep` | `#2f5740` | headings on tint, dark ground |
| `--sage-tint` | `#eef3ec` | pale fills, chips, tiles |
| `--cream` | `#f6f2e9` | page background |
| `--paper` | `#fffdf8` | card surface |
| `--gold` | `#c0973f` | accent, CTA, right-card accent |
| `--gold-soft` | `#e7d4a6` | accent text on dark |
| `--line` | `#e3dccb` | hairline borders |
| `--alert` | `#c2563f` | omissions and overdue only |

Logo gold is `#e5b25d` — brighter than `--gold`, matching the brand asset. Use
it only in the logo mark.

## Typography

- **Fraunces** (serif) for display: `h1`, `h2`, card `h3`, prices, numerals.
  Always `font-weight:600`. Section numbers are italic.
- **Hanken Grotesk** for everything else.
- Small-caps labels (`.eyebrow`, `.panel-cap`, `.gain`, `.kpi .l`) carry wide
  letter-spacing, `.14em` to `.32em`. That spacing is the house signature; keep it.

Body copy runs small by design (9–12px) because these are dense A4 sheets read
at full size or printed, not screen UI.

## Building a document

1. Copy `assets/template.html`, paste `assets/coreproma.css` into its `<style>`.
2. Build sections from `components.md`.
3. **Measure after every content change**: `node assets/measure.mjs doc.html`.
4. Fix any overflow (see below), then re-measure until every page has slack ≥ 0.
5. Render: `node assets/topdf.mjs doc.html out.pdf`.

Aim for **8–30px of slack** per page. Under 8px is fragile — a font substitution
or one extra word will clip it. Over ~200px looks unfinished unless it is the
closing page, where whitespace above the call to action reads as deliberate.

### When a page overflows

Shortening the wrong thing wastes time. In order of effectiveness:

1. **Find the driver.** In a `.tools` row both cards stretch to the same height,
   so only the *taller* card matters. Trimming the shorter one changes nothing.
2. **Kill a wrapped line, not a word.** Text costs height in whole lines. Getting
   a bullet from two lines to one saves ~13px; trimming three words off a bullet
   that still wraps saves zero.
3. **Cut a whole block.** A card `<p>` is worth ~15px per line plus margin. Ask
   whether it repeats what the visual already shows.
4. **Then adjust spacing.** `.sec{padding}`, `.trow{padding}`, hero padding.
   Small, safe, but only buys a few px each.

Never fix overflow by shrinking the base font. It breaks the type scale across
pages and shows immediately next to another document in the set.

## House rules

### No em dashes or en dashes

`—` and `–` never appear in COREPROMA copy, French or English. Use a comma, a
colon, a full stop, or a middot `·` for inline separators. Verify before
shipping:

```bash
grep -c "—\|–" doc.html   # must print 0
```

### Every claim must be checked against the product

Marketing copy drifts ahead of the software. Before writing that a feature
exists, confirm it in the codebase — a route, a migration, a UI label. Two real
failures from the Pro brochure worth remembering:

- A whole section described a carbon-footprint feature with ADEME coefficients
  and RE2020 grading. A `ManageCarbon.tsx` page existed, so it looked supported.
  It was not shipped.
- "Notes are recorded and sent straight to contractors" was false: recording
  notes sends nothing. Sending is always an explicit action.

A third, from 2026-08-24: every brochure advertised per-item caps for invoices,
documents and media long after the code had stopped enforcing them and moved to
a storage quota. Counts are the most drift-prone claim in this product. Check
`PLAN_CEILINGS` and `PLAN_STORAGE_GB` before quoting any limit.

When the app's own label differs from the database column, **follow the UI**. A
reader who signs up must find the word they were sold. The reserve severity
field is `criticite` in SQL but shows as *Priorité* in the interface, so the
brochure says priorité.

### Say what the product does, not how important it is

The palette and typography carry the premium feel; the copy should not try to.
Avoid the patterns that read as machine-written: stacked adjectives ("efficace,
centralisé et clair"), rule-of-three lists, rhetorical questions as openers,
staccato fragments for drama, and tacked-on benefit words. Prefer one concrete
fact — "Qui doit quoi, pour quand, et qui a validé" beats "responsabilisation
accrue".

Prefer the active voice with a named actor. "L'IA rapproche les lignes" reads
as a product doing work; "les lignes sont rapprochées" reads as filler.

## French and English editions

Ship `-fr` and `-en` files sharing one stylesheet, so both languages stay
visually identical. Set `<html lang>` and translate the `<title>`.

English editions are **UK trade English**, not literal translation. French
construction terms have no direct equivalents:

| French | English |
|---|---|
| réserves | snags |
| levée de réserves | snag close-out |
| OPR | pre-completion inspection |
| PV de réception | practical completion certificate |
| lot | trade package |
| entreprise | contractor |
| situations de travaux | valuations |
| devis | quote |
| chantier | project / site |
| maître d'ouvrage (MOA) | client |
| maître d'œuvre (MOE) | project manager |
| planning Gantt | project schedule |

Spell out MOA and MOE in English; the initialisms mean nothing to that reader.
*Assurance décennale* and *dommages-ouvrage* are French legal instruments with
no UK counterpart — render them as "contractor insurance" and "structural
warranty" and do not imply legal equivalence.

Eponyms need care in both languages: "Gantt" is understood by architects and
project managers but not by every contractor. Use plain wording in persuasive
captions ("planning de chantier") and keep the technical term in specification
lists, where a reader may be scanning for it.

Re-measure after translating. English runs shorter than French on average but
individual strings can be much longer, and the layout has no slack to spare.

## Common mistakes

| Mistake | Consequence |
|---|---|
| Editing copy without re-measuring | Text silently clipped in the PDF |
| Trimming the shorter card in a row | Zero height saved; row height is set by the taller card |
| Emoji or box-drawing glyphs as icons | Inconsistent weights, soft printing, palette clash |
| Linking an external stylesheet or image | Breaks the moment the file is emailed |
| `printBackground:false` in the PDF step | Hero, cards and footer all render white |
| Two visuals in one card | Overflows the page |
| `st-late` used for a neutral state | Red reads as an alarm |
| Raising the base font to fill space | Breaks the type scale against the rest of the set |
