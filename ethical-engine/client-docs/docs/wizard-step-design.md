# Wizard Step Design
*Ethical Tender Wizard — UX & logic specification*
*Grounded in Hessay tender pack analysis and Coreproma/Ethical Power meeting notes*

---

## Overview

10-step linear wizard. Each step validates before proceeding. All inputs persist in session state so the user can navigate back freely. The cost engine runs silently in the background from Step 4 onward, updating the live cost summary panel visible on the right side of every step.

**Target user:** BD / commercial team member, not an engineer. Inputs should use plain language dropdowns and guided fields, not engineering codes.

**Target accuracy:** ±20–30% budget estimate. The wizard is not a contract price — outputs must say this clearly.

---

## Global UI Rules

- Progress bar at top showing current step / 10
- Right panel (always visible): running cost summary by package, updating live
- Every step has a "Confidence indicator" — flags missing inputs or high-risk conditions in amber/red
- "Save draft" available at any step — saves to database with timestamp
- Navigation: Back / Next buttons. Next is disabled until required fields are complete.
- Final output is locked once generated — user must create a new revision to change inputs

---

## Step 1 — Project Identity

**Purpose:** Capture who, what, where, and critically — what the client is supplying (free-issue scope).

### Required fields

| Field | Type | Notes |
|---|---|---|
| Project name | Text | |
| Reference number | Text | Auto-generated if blank |
| Country | Dropdown | UK / France / Spain (Phase 1). Drives rate library, planning norms, flood/drainage rules |
| Region / county | Text | For territory factor lookup |
| Site coordinates | Lat/Lng or Grid Ref | Used for terrain lookup and flood zone check |
| Export capacity (MW AC) | Number | The commercial headline figure |
| DC peak capacity (MWp) | Number | If known; otherwise derived in Step 4 |
| Design life (years) | Dropdown | 25 / 30 / 40 years |
| Tender type | Dropdown | EPC (supply + install) / EPC Installation only (free-issue) / Budget enquiry |
| Prepared by | Text / user lookup | |
| Date | Auto | |

### Free-issue scope (critical)

**Label this section clearly: "What is the client supplying? (Free-issue equipment)"**

Checkboxes — tick each item the client provides (EPC contractor installs only):

- [ ] PV Modules
- [ ] Inverters
- [ ] Transformer / MVS stations
- [ ] SCADA / monitoring system
- [ ] HV switchgear / protection relays
- [ ] Substation buildings
- [ ] Fencing
- [ ] Other (free text)

> ⚠️ **Hessay precedent:** Modules + inverters + MVS stations + SCADA were all free-issued by the client. This removed the largest supply cost items from the EPC scope. Always capture this before any cost is calculated.

### Validation
- Country + MW required before Step 2 unlocks
- If "EPC Installation only" selected, prompt: "Please tick all free-issue items above — this will be used to exclude supply costs from the estimate"

---

## Step 2 — Site Conditions & Terrain

**Purpose:** Capture ground conditions, terrain classification, and display the GEOALT terrain model if available.

### Terrain model upload (optional but recommended)

- **Upload GEOALT CSV** (format: X, Y, Z — no header, comma-separated, 2m grid)
- On upload: Python service parses file, computes stats (area, elevation range, slope distribution), renders 3D viewer
- If no file uploaded: user fills terrain fields manually

**GEOALT viewer panel** (Three.js, matches the existing point_cloud_3d_2.html):
- Displays on upload
- Shows: point count, X/Y extents, Z min/max, amplitude
- Controls: vertical exaggeration slider, point size, colour palette
- Computed and displayed automatically:
  - Site area (ha)
  - Mean elevation (m AOD)
  - Total relief (m)
  - Terrain classification (auto: Flat / Undulating / Steep)
  - % of site with slope >3% and >5%
  - Dominant aspect (N/S/E/W facing)

### Ground conditions

| Field | Type | Options | Cost driver |
|---|---|---|---|
| Terrain class | Auto (from GEOALT) or Dropdown | Flat (<3%) / Undulating (3–8%) / Steep (>8%) | Earthworks multiplier |
| Soil type | Dropdown | Clay / Sandy loam / Sandy / Rocky / Mixed | Pile type, trench spec |
| CBR / subgrade strength | Dropdown | Good (>5%) / Poor (2–5%) / Very Poor (<2%) | Road & platform multiplier |
| Rock within 5m depth | Y/N | | Pre-augering / blasting cost |
| Contamination present | Y/N | | Remediation cost |
| Glacial cobbles or boulders | Y/N | (seen at Hessay 1–2.5m depth) | Pile obstruction contingency |
| Active land drains present | Y/N | | Survey + rerouting cost |
| Groundwater depth | Dropdown | >5m / 3–5m / 1–3m / <1m | Trench dewatering |
| UXO risk level | Dropdown | Negligible / Low / Low-Medium / Medium / High | Clearance cost |
| Flood zone (majority of site) | Dropdown | FZ1 / FZ2 / FZ3 (UK) or equivalent | Foundation raising |
| Flood zone (worst area) | Dropdown | As above | Structure siting |

### Hessay reference values (shown as info tooltips)
- CBR: 0.3–1.9% (Very Poor) — north zone 2.5× weaker than south
- Soil: Glacial till / clay
- Terrain: Flat (total relief 3.44m across 61 ha)
- UXO: Low
- Flood zone: FZ1 (majority), FZ2 (NE corner)

### Auto-computed risk flags (shown in confidence panel)
- CBR "Very Poor" → amber flag: "Ground improvement likely required for all roads and working platforms — cost uplift applied"
- FZ2 or FZ3 → amber flag: "Structures may need raised foundations — check flood mapping"
- Rock within 5m → red flag: "Specialist pile drilling may be required — significant cost risk"
- Contamination → red flag: "Remediation cost not modelled — obtain specialist quote"

---

## Step 3 — Access & Logistics

**Purpose:** Capture site access constraints and logistics that affect programme and cost.

### External access

| Field | Type | Notes |
|---|---|---|
| Access road exists | Y/N | |
| Access road type | Dropdown | Public A/B road / Private single track / Private double track / No road — new build required |
| New road required | Y/N | |
| New road length (km) | Number | If Y above |
| New road spec | Dropdown | Gravel track / Tarmac / Both |
| Access constraint | Dropdown | Open (HGVs unrestricted) / Restricted (1–2 HGVs at a time) / Severely restricted |
| Village / community routing restriction | Y/N | Adds community liaison cost |
| PRoW crossings on access route | Number | 0–10+ — each requires banksman |
| Abnormal loads required | Y/N | |

> **Hessay precedent:** Single-track 4.5m road (Tinker Lane), max 1–2 HGVs on site at once, internal material transfer via telehandler + tractor-trailer, 2 PRoW crossings. This added plant cost and extended programme vs open-access site.

### On-site logistics

| Field | Type | Notes |
|---|---|---|
| Internal material transfer required | Y/N | Telehandler to tractor-trailer — adds plant cost |
| Working hour restrictions | Y/N | e.g. 08:00–19:00 Mon–Fri, 08:00–13:00 Sat |
| Delivery time restrictions | Y/N | e.g. Mon–Fri 10:00–16:00 only |
| On-site speed limit | Number (mph/kph) | |

### Ecological constraints

| Field | Type | Notes |
|---|---|---|
| ECoW (Ecological Clerk of Works) required | Y/N | Full-time during construction — fixed weekly cost |
| Nesting bird season restriction (Mar–Aug) | Y/N | Affects start timing |
| Badger setts on site | Y/N | 30m exclusion zone |
| Dormice present | Y/N | Supervised hedge clearance |
| Hedgerow buffers required | Y/N | 5m buffer from all hedgerows |
| Watercourse buffers required | Y/N | Typically 9m (IDB) or 3m (ordinary) |

### Auto-derived programme factors
- Restricted access → programme extension factor applied
- ECoW = Y → fixed weekly QC/ecology cost added
- Nesting season + early start → flag: "Consider Q3/Q4 start to avoid vegetation clearance restrictions"

---

## Step 4 — Layout Parameters

**Purpose:** Define the solar layout — fixed-tilt or tracker, module spec, row pitch. Wizard derives all electrical quantities from these inputs.

### Core layout inputs

| Field | Type | Notes |
|---|---|---|
| Module rating (Wp) | Number from library | Select from approved module list in rate library |
| DC:AC overplant ratio | Number | Default 1.117 (Hessay). Typical range 1.05–1.25 |
| Panel orientation | Dropdown | Fixed tilt / Single-axis tracker / Dual-axis tracker |
| Tilt angle (°) | Number | Hessay = 18°. Fixed tilt: 15–30° typical for UK |
| Row pitch (m) | Number | Hessay = 10.945m. Drives land use efficiency |
| Table configuration | Dropdown | Portrait / Landscape; 1P / 2P / 3P rows |
| Modules per string | Number | Hessay = 27 |
| Inverter model | Select from library | Drives strings-per-inverter calculation |

### Auto-derived quantities (displayed live, read-only)

| Derived value | Formula | Hessay result |
|---|---|---|
| Total modules | (MWp × 1,000,000) ÷ Module Wp | 76,815 |
| Total strings | Total modules ÷ Modules per string | 2,845 |
| Total inverters | (MW AC × 1,000) ÷ Inverter rating (kW) | 125 |
| Strings per inverter (avg) | Total strings ÷ Total inverters | 22.8 |
| MVS stations required | Inverter count ÷ Inverters per MVS type | 9 |
| CCTV cameras (estimated) | MW × 1.9 | 76 |
| Approx panel rows | Derived from site area + row pitch | — |

### PVcase import (optional)
- **Upload PVcase export** (CSV or DXF)
- Overwrites derived quantities with actual PVcase values for: module count, pile count, string layout, trench route lengths
- Flag: "PVcase quantities imported — derived values replaced with design data"

> If PVcase data is available, quantities are more accurate. If not, wizard estimates from the scaling ratios above. Always note which method was used in the output.

---

## Step 5 — Infrastructure Scope

**Purpose:** Define what physical infrastructure needs to be built. Some fields auto-derive from previous steps; others are entered manually or estimated.

### Civil & Security

| Field | How populated | Unit | Hessay |
|---|---|---|---|
| Perimeter fence length (m) | From GEOALT polygon or manual entry | m | Derived from site boundary |
| Fence spec | Dropdown from rate library | | HT13/190/15 deer fence 1.9m |
| Shoring posts | Auto: 1 per 50m + all corners | count | — |
| Badger gaps | Manual (from ecology report) | count | — |
| Vehicle access gates | Manual | count | — |
| Gate spec | Dropdown | | 6.0m clear double-leaf steel |
| Internal access road | Manual or estimated (0.8× √site_ha × 1000m) | m | — |
| New external road | From Step 3 | m | — |
| Construction compound | Y/N + size (m²) | m² | ~2,000 m² |
| Substation compound | Auto from substation count | m² | 529 m² |

### Cable infrastructure

| Field | How populated | Notes |
|---|---|---|
| Cable trench length (m) | Manual or estimated | All circuits in one trench (1.0m wide) at Hessay |
| Watercourse crossings | Manual | Each triggers directional drilling cost |
| HV cable route length | Manual | From MVS stations to grid connection point |
| Grid connection distance (km) | Manual | Major cost variable — get from DNO |

### Security & monitoring

| Field | How populated | Notes |
|---|---|---|
| CCTV cameras | Auto from Step 4 (1.9/MW) or manual override | |
| CCTV pole type mix | Dropdown | 10m / 7m / 3m poles — affects unit cost |
| Meteo stations | Number | Typically 1–2 per site |
| SCADA (free-issue?) | From Step 1 | |

### Drainage

| Field | How populated | Notes |
|---|---|---|
| IDB consent required | Y/N | If Y: add 8–12 week programme allowance |
| Watercourse crossings requiring drilling | Number | From watercourse map / utility survey |
| Attenuation storage required | Auto (derived from hardstanding area) | Internal roads double as SuDS at Hessay |
| Flow control units | Auto from drainage area count | |

### Infrastructure confidence check
- If perimeter fence length not entered → amber: "Perimeter length not set — using estimated value based on site area"
- If cable trench = 0 → red: "Cable trench length required"
- If grid connection distance not set → amber: "Grid connection cost not included — this can be significant"

---

## Step 6 — Pre-Construction & Surveys

**Purpose:** Identify mandatory surveys and pre-construction activities. Each adds a fixed cost and potentially a programme allowance.

| Survey / Activity | Always required? | Programme impact | Notes |
|---|---|---|---|
| Topographic survey | Yes | 2–4 weeks | Or GEOALT import |
| Geotechnical investigation | Yes | 4–8 weeks | Drives pile and road specification |
| UXO detailed risk assessment | Yes | 2–4 weeks | Hessay = Low risk; cost is briefings only |
| Utilities investigation (CAT + plans) | Yes | 2–4 weeks | NPG plans valid 30 days only — re-order near construction |
| Flood risk assessment | Yes (FZ2/3) / Recommended (FZ1) | 4–8 weeks | IDB consent adds further 8–12 weeks |
| Ecological survey | Yes | 4–8 weeks | Seasonal restrictions if March–August |
| Archaeological assessment | Depends on planning | 4–12 weeks | |
| Pre-construction road condition survey | Yes | 1 week | Contractor liability for damage |
| IDB Land Drainage Consent | If watercourses present | **8–12 weeks** | Critical path — often missed |
| Planning consent (already obtained?) | Y/N | — | If N: wizard is pre-planning estimate only |

Each ticked item adds its cost to the estimate and its duration to the programme critical path.

---

## Step 7 — Programme

**Purpose:** Set programme duration and timing. Drives labour, plant, prelims, and seasonal cost adjustments.

### Inputs

| Field | Type | Notes |
|---|---|---|
| Construction start (quarter) | Dropdown | Q1 / Q2 / Q3 / Q4 |
| Construction start (year) | Year | |
| Programme duration (weeks) | Number | Hessay = 52 weeks |
| Peak workforce (operatives) | Number | Hessay = 60 |

### Programme breakdown (editable, auto-populated from Hessay ratios)

| Stage | Default (Hessay) | Editable |
|---|---|---|
| Stage 1 — Enabling works | 4 weeks | Yes |
| Stage 2 — Site setup + fencing | 4 weeks | Yes |
| Stage 3 — Solar array construction | 40 weeks | Yes |
| Stage 4 — Commissioning + clearance | 4 weeks | Yes |

### Auto-applied programme factors

| Condition | Factor |
|---|---|
| Access = Restricted | +10–20% programme duration |
| CBR = Very Poor | +5–10% (ground improvement works) |
| ECoW nesting season restriction | Flag if start = Q1 or Q2 |
| IDB consent not yet obtained | Critical path warning |
| Concrete cube 28-day rule | Flag: last concrete pour must be ≥28 days before practical completion |

### Inflation / indexation
- Construction start > 6 months from today → apply inflation uplift to rates (configurable % from rate library)
- Show clearly in cost build-up as a separate line

---

## Step 8 — Cost Build-Up

**Purpose:** Apply the rate library to all quantities from Steps 1–7. This is the core calculation engine.

### Cost model structure

The estimate is built line-by-line. Each line contains:

```
Quantity × Unit Rate × Location Factor × Programme Factor = Line Cost
```

### Cost packages

1. **Pre-construction & surveys** — topographic, geotech, UXO, utilities, FRA, ecology, archaeology, road condition survey
2. **Preliminaries** — welfare compound (£/week × programme weeks), site establishment, PPE, insurance, health & safety
3. **Civil works** — earthworks / topsoil strip, internal roads (with CBR uplift if applicable), external road, construction compound, drainage (attenuation + flow controls), watercourse crossings
4. **Fencing & security** — perimeter fence, shoring posts, badger gaps, vehicle gates
5. **Piling & mounting** — pile supply + installation (if not free-issue), mounting frames, panel installation
6. **Electrical — DC** — string cables, DC conduits, combiner boxes
7. **Electrical — LV/MV** — cable trench, LV cables (inverter to MVS), conduits, joint bays
8. **Electrical — HV** — HV cable, HV conduits, grid connection cable
9. **Substations & inverters** — inverter stations (if not free-issue), customer substation building, DNO substation building, concrete pads
10. **CCTV & security systems** — CCTV poles + cameras, fibre comms
11. **Monitoring** — meteo stations, SCADA (if not free-issue)
12. **Ecological & compliance** — ECoW (weekly × programme), LLO, UXO briefings, IDB consent
13. **Quality & testing** — QC engineer (weekly × piling + mounting phases), concrete cube testing, cable testing, ITP administration
14. **Decommissioning allowance** — mirror of construction (if required)
15. **Risk allowances** — line items for each flagged risk (ground, utilities, access, ecological, programme)
16. **Contingency** — % of total (default 10%; increase if CBR poor, flood risk, or utility diversion)
17. **Margin** — %

### Location factor
Applied to labour and plant lines:
- UK baseline = 1.0
- London / SE England = 1.15–1.25
- Scotland / remote = 1.10–1.20
- France = TBD (Phase 2)
- Spain = TBD (Phase 2)

### Free-issue deduction
Items ticked in Step 1 (free-issue scope) have their **supply cost** zeroed out. **Installation cost** is retained. The cost build-up shows both lines clearly:
- Module supply: £0 (client free-issue)
- Module installation: £X

This transparency is mandatory — never hide the free-issue deduction.

---

## Step 9 — Risk & Confidence Score

**Purpose:** Surface all risk flags collected through Steps 1–8. Force the estimator to acknowledge each one before output is generated.

### Risk register (auto-populated)

Each risk has:
- Description
- Severity (Low / Medium / High)
- Cost allowance included? (Y/N)
- Action required

Example risks auto-flagged from Hessay-type conditions:

| Risk | Severity | Cost included | Action |
|---|---|---|---|
| Very poor CBR (road uplift applied) | Medium | Yes — uplift in civils | Confirm with geotech report |
| Glacial cobbles / pile obstruction | Medium | Yes — contingency % | Confirm depths in PLT logs |
| Active land drains — rerouting | Medium | Yes — allowance | Pre-piling drainage survey required |
| NPG cables across site — diversion? | High | No — obtain NPG budget | Get budget from Northern Powergrid before submitting |
| Yorkshire Water mains — diversion? | Medium | No — obtain YW budget | Section 185 cost — applicant bears it |
| IDB consent — critical path | Medium | Programme only | Start application before mobilisation |
| 28-day concrete cube rule | Low | Programme only | Time last pours ≥28 days before PC |
| Grid connection cost — excluded | High | No | DNO quote required — can be £1–10M+ |
| Free-issue scope not confirmed | High | N/A | Confirm with client before submitting |

### Confidence score
0–100%, shown as a dial. Deductions:
- Grid connection cost not included: −20
- Any High severity risk not costed: −15 each
- Free-issue scope unconfirmed: −15
- CBR not surveyed: −10
- Utilities not investigated: −10
- No GEOALT / terrain data: −5

Score thresholds:
- 80–100%: Green — suitable for client submission
- 60–79%: Amber — suitable for internal discussion only
- <60%: Red — missing too much information

### Mandatory acknowledgements
Before Step 10 unlocks, the user must check:
- [ ] I confirm the free-issue scope is agreed with the client
- [ ] I confirm the exclusions listed are accepted
- [ ] I confirm this is a budget estimate (±20–30%), not a contract price
- [ ] I confirm required surveys are planned (where flagged)

---

## Step 10 — Output & Export

**Purpose:** Generate the tender output documents.

### Output formats

**1. Budget cost summary (1 page)**
- Project name, date, prepared by
- Export MW, site area, territory
- Total budget cost
- Cost per MWp (£/MWp)
- Top 5 cost packages by value
- Confidence score
- Key assumptions (3–5 bullet points)
- Key exclusions (3–5 bullet points)

**2. Detailed cost build-up (Excel / PDF)**
- Full line-by-line BOQ
- Quantity, unit, rate, line total
- Package subtotals
- Risk allowances
- Contingency
- Margin
- Grand total

**3. Assumptions & exclusions register**
- All assumptions made (with source: "derived from Hessay reference" or "user input")
- All exclusions (grid connection, abnormal loads, planning, etc.)
- Surveys required before price can be confirmed

**4. Sensitivity analysis table**
- ±10% ground condition / CBR
- ±2 weeks programme
- ±10% access constraint
- ±5% inflation
- Each showing impact on total cost

**5. Comparable project reference**
- Hessay: 40 MW / 61.3 ha / York / FZ1 / Very Poor CBR / 52 weeks
- (Further projects added as rate library grows)

**6. Investor-ready summary (1 page)**
- Non-technical language
- Total construction budget
- Expected margin
- Key risks (plain English)
- Next steps required

### Export actions
- Download PDF (all sections)
- Download Excel (cost build-up only)
- Save to project record (database)
- Share link (read-only view)
- Create revision (clones all inputs, increments revision number)

---

## Appendix — Validation Rules Summary

| Field | Rule |
|---|---|
| Export MW | Required; >0 |
| Country | Required |
| Module Wp | Must exist in rate library |
| DC:AC ratio | 1.0–1.5 (warn if outside 1.05–1.25) |
| CBR class | Required if geotech survey done |
| Programme weeks | Must be ≥ sum of stage defaults |
| Last concrete pour | Must be ≥28 days before practical completion |
| Confidence score | <60% blocks output generation |
| Free-issue acknowledgement | Must be checked before Step 10 |
| Contingency | Minimum 5%; minimum 15% if High risk uncosted |
