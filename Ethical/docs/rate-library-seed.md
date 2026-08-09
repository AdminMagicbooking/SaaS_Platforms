# Rate Library Seed
*Ethical Tender Wizard — unit specifications and rate library structure*
*Specifications grounded in Hessay tender pack drawings (July 2026)*

---

## Purpose

This document defines:
1. The **database schema** for the rate library
2. The **unit specifications** confirmed from Hessay drawings (what to price)
3. The **rate entry rules** (how rates are maintained)
4. **Placeholder rates** — to be replaced by Ethical Power QS / procurement team

> ⚠️ The £ figures in this document are illustrative placeholders only. Ethical Power's QS and procurement team must populate actual rates before the wizard produces defensible estimates.

---

## Database Schema

### Table: `rate_items`

```sql
CREATE TABLE rate_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            VARCHAR(20) UNIQUE NOT NULL,  -- e.g. "FENCE-001"
  package         VARCHAR(50) NOT NULL,          -- cost package group
  description     TEXT NOT NULL,
  specification   TEXT,                          -- full technical spec
  unit            VARCHAR(20) NOT NULL,          -- e.g. "m", "unit", "m²", "m³"
  notes           TEXT,
  active          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE rate_entries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate_item_id    UUID REFERENCES rate_items(id),
  territory       VARCHAR(10) NOT NULL,          -- "UK", "FR", "ES"
  effective_from  DATE NOT NULL,
  effective_to    DATE,                          -- NULL = current rate
  rate_gbp        DECIMAL(12,2),                -- base rate in GBP
  rate_eur        DECIMAL(12,2),                -- for FR/ES
  currency        VARCHAR(3) NOT NULL DEFAULT 'GBP',
  source          VARCHAR(100),                  -- "Hessay tender 2026", "Supplier X quote"
  confidence      VARCHAR(10),                   -- "confirmed", "estimated", "placeholder"
  notes           TEXT,
  created_by      VARCHAR(100),
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE rate_suppliers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate_item_id    UUID REFERENCES rate_items(id),
  supplier_name   VARCHAR(100),
  territory       VARCHAR(10),
  product_code    VARCHAR(50),
  lead_time_weeks INTEGER,
  min_quantity    DECIMAL(10,2),
  unit            VARCHAR(20),
  last_quoted     DATE,
  notes           TEXT
);
```

### Key design decisions
- **Point-in-time rates** (`effective_from` / `effective_to`): historic tenders remain reproducible at their original rates. Never overwrite — always insert a new row with a new `effective_from`.
- **Territory-specific**: UK rates are not assumed to apply elsewhere.
- **Confidence field**: "placeholder" rates must never produce a Green confidence score in the wizard.
- **Source field**: trace every rate back to its origin (quote, previous project, market index).

---

## Package 1 — Pre-Construction & Surveys

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| SURV-001 | Topographic survey | Survey-grade GPS, full site | lump sum | £8,000–15,000 | estimated |
| SURV-002 | Geotechnical investigation | Window samples + trial pits + plate load tests. Hessay: 63 WS + 20 TP + 13 PLT for 61 ha | lump sum | £25,000–50,000 | estimated |
| SURV-003 | UXO detailed risk assessment | Desk study + walkover. Clearance survey if Medium+ risk | lump sum | £3,000–8,000 | estimated |
| SURV-004 | UXO awareness briefings | All intrusive workers before commencement | per session | £500–1,000 | estimated |
| SURV-005 | UXO Risk Management Plan | Document preparation | lump sum | £500–1,500 | estimated |
| SURV-006 | Utilities investigation | CAT scan + records search + trial holes | lump sum | £5,000–15,000 | estimated |
| SURV-007 | Flood risk assessment | Full FRA for planning | lump sum | £8,000–20,000 | estimated |
| SURV-008 | Ecological survey | Phase 1 habitat survey + species surveys | lump sum | £5,000–15,000 | estimated |
| SURV-009 | Archaeological assessment | Desk study + walkover ± trial trenches | lump sum | £5,000–25,000 | estimated |
| SURV-010 | Pre/post construction road survey | Video + condition record of access roads | lump sum | £2,000–5,000 | estimated |
| SURV-011 | IDB Land Drainage Consent | Application preparation + IDB fee | lump sum | £3,000–8,000 | estimated |
| SURV-012 | NPG distribution cable plans (updated) | Valid 30 days — re-order close to construction | per order | £500–1,000 | estimated |

---

## Package 2 — Preliminaries

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| PREL-001 | Welfare compound establishment | Site offices, toilets, mess room, first aid | lump sum | £20,000–40,000 | estimated |
| PREL-002 | Welfare compound running cost | Weekly rate including maintenance, consumables | per week | £1,500–3,000 | estimated |
| PREL-003 | Site security (manned) | If required during construction | per week | £2,000–4,000 | estimated |
| PREL-004 | Site management — PM | Project manager weekly cost | per week | £2,000–3,500 | estimated |
| PREL-005 | Site management — site manager | Per week on site | per week | £1,500–2,500 | estimated |
| PREL-006 | QC engineer (full-time) | Required during piling + mounting — 100% witness points | per week | £1,200–2,000 | estimated |
| PREL-007 | ECoW (Ecological Clerk of Works) | Full-time during construction. Hessay requirement | per week | £1,200–2,000 | estimated |
| PREL-008 | Local Liaison Officer (LLO) | Community liaison during construction | per week | £800–1,500 | estimated |
| PREL-009 | Health & Safety plan + CDM | Principal designer / contractor CDM duties | lump sum | £5,000–15,000 | estimated |
| PREL-010 | Insurance — contractor all-risks | % of contract value | % of value | 0.3–0.7% | estimated |
| PREL-011 | PRoW banksman | At each PRoW crossing throughout construction | per crossing per week | £600–1,000 | estimated |
| PREL-012 | Highway condition monitoring | Pre/during/post construction inspections | per month | £500–1,500 | estimated |

---

## Package 3 — Civil Works

### Earthworks & topsoil

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| CIVIL-001 | Topsoil strip | Strip and stockpile adjacent to working area | per m² | £1.50–3.00 | estimated |
| CIVIL-002 | Topsoil reinstatement | Spread and consolidate from stockpile | per m² | £1.50–3.00 | estimated |
| CIVIL-003 | Earthworks (cut to fill) | Grading for panel rows — typically minimal on flat sites | per m³ | £8–20 | estimated |
| CIVIL-004 | Muck away (off-site disposal) | Contaminated or excess spoil | per m³ | £25–60 | estimated |

### Internal access roads

**Hessay confirmed specification:** 3.5m wide carriageway, 300mm compacted Type 3 aggregate, Terram 1000 geotextile separator, permeable surface flush with adjacent ground.

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| ROAD-001 | Internal road — standard (CBR >5%) | 3.5m wide, 300mm Type 3 on Terram 1000 geotextile | per linear m | £120–180 | estimated |
| ROAD-002 | Internal road — poor CBR (2–5%) | 3.5m wide, 400mm Type 1 + geogrid on geotextile | per linear m | £180–260 | estimated |
| ROAD-003 | Internal road — very poor CBR (<2%) | 3.5m wide, 500–600mm Type 1 + heavy geogrid | per linear m | £250–380 | estimated |
| ROAD-004 | External road (new gravel track) | 4.5m wide, 300mm Type 1, geotextile | per linear m | £200–350 | estimated |
| ROAD-005 | External road (new tarmac) | 6.0m wide, full highway spec | per linear m | £600–1,200 | estimated |
| ROAD-006 | Hardstanding at compound / gates | 300mm Type 3 on geotextile, 4m wide | per m² | £45–70 | estimated |

> **CBR warning:** Hessay north zone CBR avg 0.6% — the most expensive road spec (ROAD-003) applied. This is not the default — it must be confirmed by geotechnical investigation.

### Drainage

**Hessay confirmed:** internal roads designed as SuDS attenuation (Type 3 sub-base as storage medium). IDB maximum discharge 1.4 l/s/ha. 1:100 AEP + 45% climate change allowance required.

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| DRAIN-001 | Attenuation storage (in road sub-base) | Type 3 aggregate, 30% voids, excess depth over standard | per m³ | £35–60 | estimated |
| DRAIN-002 | Hydro-Brake flow controller | 50mm orifice, 1.0 l/s. Hessay: 6 units | per unit | £1,500–3,000 | estimated |
| DRAIN-003 | Drainage ditch — new | Topsoil strip, excavation, formation, seeding | per linear m | £25–50 | estimated |
| DRAIN-004 | Culvert (access crossing, ordinary watercourse) | 600mm dia HDPE or concrete, with headwalls | per unit | £3,000–8,000 | estimated |
| DRAIN-005 | Directional drill (IDB watercourse crossing) | Under IDB-maintained watercourse. Includes mob/demob | per m | £500–1,200 | estimated |
| DRAIN-006 | Directional drill mobilisation | Per crossing | per crossing | £5,000–15,000 | estimated |
| DRAIN-007 | Chamber / manhole | Pre-cast concrete, cover to suit loading | per unit | £800–2,000 | estimated |

---

## Package 4 — Fencing & Security

**Hessay confirmed specification:**
- Fence: HT13/190/15 galvanised steel deer fencing, 1.9m height, timber posts at 3.15m c/c, 700mm embedment, 100mm concrete base pad
- Shoring: 45° brace assembly every 50m and at all corners
- Gate: 6.0m clear double-leaf steel, RAL 6005, 100×100×90cm concrete foundation per post

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| FENCE-001 | Deer fence — standard | HT13/190/15 galvanised, timber posts at 3.15m c/c, 1.9m height | per linear m | £25–40 | estimated |
| FENCE-002 | Deer fence — security upgraded | As above but 2.4m height with barbed wire topping | per linear m | £35–55 | estimated |
| FENCE-003 | Corner / end shoring post | 45° brace assembly; 1 per 50m + all corners | per unit | £150–300 | estimated |
| FENCE-004 | Badger gap | 100cm × 20cm opening at fence base with mesh flap | per unit | £50–120 | estimated |
| FENCE-005 | Double vehicle gate — standard | 6.0m clear, galvanised steel, RAL 6005, concrete pad foundations (100×100×90cm) | per unit | £3,000–6,000 | estimated |
| FENCE-006 | Pedestrian gate | 1.0m clear, steel, with lock | per unit | £800–1,500 | estimated |
| FENCE-007 | Security topping (barbed wire / anti-climb) | Retrospective addition if upgrade required | per linear m | £5–12 | estimated |

---

## Package 5 — Piling & Mounting Structure

> Note: at Hessay, modules + mounting frames were free-issued by client. Only installation cost was in EPC scope. Confirm free-issue status before pricing supply items.

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| PILE-001 | Driven steel pile — supply | Standard C-section or tube pile. Length per geotech | per pile | £35–80 | estimated |
| PILE-002 | Driven steel pile — installation | Hydraulic driver. Per pile including setting out | per pile | £15–35 | estimated |
| PILE-003 | Driven pile — poor CBR uplift | Extended length or heavy section for weak ground | per pile | £20–50 uplift | estimated |
| PILE-004 | Pre-auger (cobble / obstruction) | Pre-drill before pile installation | per pile | £25–60 | estimated |
| PILE-005 | Pile repositioning (obstruction) | Relocate pile due to buried obstruction | per event | £100–300 | estimated |
| MOUNT-001 | Mounting frame / rack — supply | Aluminium or galvanised steel. Per MWp installed | per MWp | £20,000–40,000 | estimated |
| MOUNT-002 | Mounting frame — installation | Labour + equipment per MWp | per MWp | £8,000–15,000 | estimated |
| MODULE-001 | PV module — supply | Per Wp DC. Hessay: 640 Wp JA Solar JAM66D45 | per Wp | £0.18–0.28 | estimated |
| MODULE-002 | PV module — installation | Fix to rack, connect DC, label, QC witness | per module | £8–15 | estimated |

---

## Package 6 — Electrical (DC)

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| ELEC-DC-001 | DC string cable — supply | PV-type, 4mm² Cu twin-core, BS EN 60269-2 | per m | £1.50–2.50 | estimated |
| ELEC-DC-002 | DC string cable — install | Pull, terminate, label, test | per m | £1.50–3.00 | estimated |
| ELEC-DC-003 | DC conduit — Ø90mm HDPE | Supply + lay in trench | per m | £8–15 | estimated |
| ELEC-DC-004 | Combiner / string fuse box | Per inverter (if separate from inverter) | per unit | £200–500 | estimated |

---

## Package 7 — Electrical (LV/MV)

**Hessay confirmed cable trench spec:** 1.0m wide × ~1.1m deep. All circuits in one trench: HV 3×Ø220mm HDPE + DC Ø90–160mm + FO Ø63mm + data Ø90mm.

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| ELEC-LV-001 | Cable trench — excavation & reinstatement | 1.0m wide, all circuits, warning tape, backfill, reinstate | per linear m | £80–140 | estimated |
| ELEC-LV-002 | HDPE conduit Ø220mm (HV) | Supply + lay in trench | per m | £30–55 | estimated |
| ELEC-LV-003 | HDPE conduit Ø160mm (DC feeder) | Supply + lay in trench | per m | £18–30 | estimated |
| ELEC-LV-004 | HDPE conduit Ø125mm | Supply + lay in trench | per m | £14–22 | estimated |
| ELEC-LV-005 | HDPE conduit Ø90mm | Supply + lay in trench | per m | £10–16 | estimated |
| ELEC-LV-006 | HDPE conduit Ø63mm (FO) | Supply + lay in trench | per m | £6–10 | estimated |
| ELEC-LV-007 | LV cable — inverter to MVS | 3cx150mm² Cu/EPR/PCP 0.6/1kV. Supply + install | per m | £25–45 | estimated |
| ELEC-LV-008 | LV cable joint / termination | Per joint, UKAS witnessed | per joint | £300–800 | estimated |
| ELEC-LV-009 | Earth cable (bare) | 50mm² bare Cu in trench | per m | £8–15 | estimated |
| ELEC-LV-010 | Exothermic weld (CAD weld) | Earth continuity connection, witnessed | per weld | £25–60 | estimated |

---

## Package 8 — Electrical (HV & Grid Connection)

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| ELEC-HV-001 | HV cable 33kV — supply | YJVc 33kV armoured. Per metre | per m | £60–120 | estimated |
| ELEC-HV-002 | HV cable 33kV — installation | Pull, terminate, test. Per metre | per m | £30–60 | estimated |
| ELEC-HV-003 | HV cable joint 33kV | Heat-shrink or cold-shrink, witnessed (Hold point) | per joint | £2,000–5,000 | estimated |
| ELEC-HV-004 | HV cable termination 33kV | At switchgear, witnessed (Hold point) | per termination | £1,500–4,000 | estimated |
| ELEC-HV-005 | Grid connection — DNO cost | Highly variable — obtain DNO quote. Do NOT estimate. | lump sum | EXCLUDED | — |

> ⚠️ **Grid connection cost must always be excluded from the wizard estimate with a clear note.** It is obtained directly from the DNO (e.g. Northern Powergrid) and can range from £200k to £10M+. Including a modelled figure will produce dangerous mispricing.

---

## Package 9 — Substations & Inverter Stations

**Hessay confirmed specifications:**
- Customer substation: 30.4m × 12.72m × 3.0m, dark green metal cladding, +150mm plinth
- DNO substation: identical footprint and spec
- Inverter station: 40ft container (12.2m × 2.44m), 6 × Sungrow SG350HX inverters + MV cubicle + LV aux + UPS + transformer

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| SUBS-001 | Customer substation — building supply | 30.4×12.72×3.0m, dark green, +150mm plinth, A/C, louvres | lump sum | £150,000–300,000 | estimated |
| SUBS-002 | Customer substation — installation | Site delivery, crane lift, connection | lump sum | £30,000–60,000 | estimated |
| SUBS-003 | DNO substation — building supply | Identical to SUBS-001 | lump sum | £150,000–300,000 | estimated |
| SUBS-004 | DNO substation — installation | As SUBS-002 | lump sum | £30,000–60,000 | estimated |
| SUBS-005 | Concrete pad / plinth (substation) | RC slab, +150mm AOG | per m² | £200–350 | estimated |
| SUBS-006 | Inverter station container — supply | 40ft specialist inverter skid, 6 inverters (if not free-issue) | per unit | £80,000–160,000 | estimated |
| SUBS-007 | Inverter station — installation | Crane, positioning, cable connections, commissioning | per unit | £8,000–20,000 | estimated |
| SUBS-008 | Concrete pad (inverter station) | 12.5m × 3.0m RC slab, +150mm AOG | per unit | £4,000–8,000 | estimated |
| SUBS-009 | Oil bund (if required) | Around transformer, sealed, tested (Hold point) | per unit | £3,000–8,000 | estimated |
| SUBS-010 | Inverter supply (Sungrow SG350HX) | 352 kVA. If not free-issue | per unit | £25,000–45,000 | estimated |

---

## Package 10 — CCTV & Security Systems

**Hessay confirmed:**
- 76 cameras total: 63 × 10m pole, 9 × 7m pole, 4 × 3m pole
- Pole: 100mm square galvanised steel, cast-in concrete base, 4×M24 root studs
- Each pole: 2 × 94/110mm ducts (power + comms), 600mm cover

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| CCTV-001 | CCTV pole 10m — complete | 10m square galvanised steel, concrete base, thermal + IP + IR + fibre | per unit | £3,000–6,000 | estimated |
| CCTV-002 | CCTV pole 7m — complete | 7m, as above | per unit | £2,500–5,000 | estimated |
| CCTV-003 | CCTV pole 3m — complete | 3m, as above | per unit | £1,500–3,000 | estimated |
| CCTV-004 | CCTV power duct | 230V 3C SWA supply duct per pole | per m | £8–15 | estimated |
| CCTV-005 | CCTV comms duct | CAT-6 + FO in 94/110mm duct | per m | £12–20 | estimated |
| CCTV-006 | NVR / recording system | Central CCTV recorder + software | lump sum | £8,000–25,000 | estimated |

---

## Package 11 — Monitoring & SCADA

**Hessay confirmed monitoring equipment:**
- Sungrow Logger 4000 (1 per MVS station = 9 units)
- Lufft WS600 weather station
- SR20-D2 pyranometer (inclined irradiance)
- SRA20-D2 albedometer
- PMF01 soiling sensor (×2 per meteo station)
- CMF01 ambient temp sensor
- InteliPro protection relay (1 per MVS)
- Powerfactors PSSU power quality unit (1 per MVS)

**Hessay meteo mast spec:** 3.0m × 34mm dia galvanised pole, 500×500×500mm concrete block, 2×110mm ducts.

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| MON-001 | Meteo mast — complete | 3.0m mast, all sensors, concrete base, 2 ducts | per unit | £8,000–15,000 | estimated |
| MON-002 | SCADA system — supply | If not free-issue | lump sum | £50,000–150,000 | estimated |
| MON-003 | Data logger (per MVS) | Sungrow Logger 4000 or equivalent | per unit | £2,000–5,000 | estimated |
| MON-004 | Protection relay (per MVS) | InteliPro or equivalent | per unit | £3,000–8,000 | estimated |
| MON-005 | Power quality unit (per MVS) | Powerfactors PSSU or equivalent | per unit | £5,000–12,000 | estimated |
| MON-006 | Power Plant Controller | Site-level, FO comms | lump sum | £20,000–50,000 | estimated |

---

## Package 12 — Quality & Testing

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| QC-001 | Concrete cube testing (UKAS lab) | 4 cubes per pour, 7/14/28-day tests. BS EN 12390-3:2019 | per pour | £300–600 | estimated |
| QC-002 | Concrete slump test | Per pour | per pour | £50–100 | estimated |
| QC-003 | CBR test (road / compound) | BS 1377-9. 1 per 25m² compound, 1 per 50m track | per test | £200–400 | estimated |
| QC-004 | Cable IR / sheath test | Pre-installation per drum | per drum | £100–250 | estimated |
| QC-005 | I-V curve trace (commissioning) | Per string | per string | £15–30 | estimated |
| QC-006 | Thermal imaging (commissioning) | Full site after energisation | lump sum | £3,000–8,000 | estimated |
| QC-007 | ITP administration | NCR management, hold point coordination | % of contract | 0.3–0.5% | estimated |
| QC-008 | HV cable pressure test | Post-installation, per circuit | per circuit | £500–2,000 | estimated |

---

## Package 13 — Decommissioning

At end of design life, all infrastructure is removed and site restored to agricultural land. Hessay: full removal of all above and below-ground infrastructure, WEEE recycling of panels, metals recycled/scrapped.

| Code | Description | Spec | Unit | Placeholder £ | Confidence |
|---|---|---|---|---|---|
| DECOM-001 | Decommissioning allowance | Mirror of construction cost (typically 60–80%) | % of construction | 60–80% | estimated |

> Decommissioning bond is often required by the planning authority. The wizard can output an estimated bond value based on this allowance.

---

## Rate Maintenance Rules

### Who owns rates
- **QS / Commercial Manager** — owns all civil, fencing, cable, concrete rates
- **Procurement** — owns supplier rates (modules, inverters, MVS, switchgear)
- **Technical Director** — approves rate methodology changes

### Update frequency

| Category | Update frequency |
|---|---|
| Diesel / fuel-linked items (haulage, plant) | Monthly |
| Steel / metals (piles, fence, cable) | Monthly |
| HDPE ducting | Monthly |
| Concrete, stone, aggregates | Quarterly |
| Labour (subcontractor rates) | Quarterly or on quote receipt |
| Module / inverter supply | Per project (market moves fast) |
| Professional services (surveys, ECoW) | Annually |

### Rate entry workflow
1. Procurement receives quote or market rate
2. Rate entered in system with `effective_from` = today, `source` = supplier name / quote ref
3. Previous rate row: `effective_to` set to today − 1 day
4. QS approves before rate becomes available for new estimates
5. Existing saved estimates are NOT retroactively updated — they retain their original rates

### Commodity index linkage (future)
High-volatility items (steel, copper, HDPE) should be linked to commodity indices:
- Steel: LME Steel Scrap index
- Copper: LME Copper
- HDPE: ICIS HDPE pipe index
- Diesel: BEIS average UK pump price

---

## Territory Factors (Phase 1 — UK only)

| Region | Labour factor | Plant factor | Notes |
|---|---|---|---|
| Yorkshire / Midlands (baseline) | 1.00 | 1.00 | Hessay reference |
| Scotland | 1.12 | 1.15 | Remote access, supply chain |
| London / SE England | 1.20 | 1.10 | Labour market |
| Wales | 1.05 | 1.05 | |
| SW England | 1.05 | 1.05 | |
| Northern Ireland | 1.10 | 1.12 | |

France and Spain territory factors to be added in Phase 2.

---

## Hessay Reference Project — Summary Stats

Use these to validate wizard outputs for similar projects:

| Metric | Hessay |
|---|---|
| Export MW (AC) | 40 MW |
| DC MWp | 49.16 MWp |
| Site area | 61.3 ha |
| DC:AC ratio | 1.117 |
| Modules | 76,815 × 640 Wp JA Solar |
| Modules per string | 27 |
| Inverters | 125 × Sungrow SG350HX 352 kVA |
| MVS transformer stations | 9 |
| CCTV cameras | 76 |
| CCTV cameras per MW | 1.9 |
| Fence height | 1.9m HT13/190/15 |
| Gate width | 6.0m clear double-leaf |
| Internal road width | 3.5m |
| Road spec | 300mm Type 3 on Terram 1000 |
| Cable trench width | 1.0m (all circuits) |
| Customer substation | 30.4m × 12.72m × 3.0m |
| DNO substation | 30.4m × 12.72m × 3.0m |
| Inverter station | 40ft container, 6 inverters |
| CBR (south) | avg 1.5% |
| CBR (north) | avg 0.6% |
| Terrain | Flat (<1% slope) |
| Construction duration | 52 weeks |
| Peak workforce | 60 operatives |
| Free-issue by client | Modules, inverters, MVS stations, SCADA |
