# Hessay Tender Pack — Wizard Requirements Analysis
*Derived from full analysis of all Tender Pack documents, July 2026*

---

## Project Reference: Hessay Solar Farm
- **Location:** South of Low Moor Lane, Hessay, York, YO23 3RR
- **Capacity:** 40 MW export / 49.16 MWp DC
- **Site area:** 61.3 ha (8 fields, flat agricultural land)
- **Construction duration:** 52 weeks (4 stages)
- **Client:** Hessay Solar Limited / Triple Power Generation Ltd
- **EPC Contractor:** Ethical Power

---

## PART 1 — WHAT THE WIZARD MUST KNOW (Inputs & Parameters)

### 1.1 Project Identity Inputs (Step 1 of Wizard)

| Input | Notes |
|---|---|
| Project name | |
| Country / territory | UK, France, Spain — drives rates, planning norms, flood/drainage rules |
| Grid reference or coordinates | For terrain lookup, flood zone check |
| Site area (ha) | Critical size driver |
| Export capacity (MW AC) | The commercial target |
| DC peak capacity (MWp) | Derived from DC:AC ratio |
| DC:AC overplant ratio | Hessay = 1.117 (49.16 MWp / 44 MVA). Typical range 1.1–1.2 |
| Module rating (Wp) | Hessay = 640 Wp (JA Solar JAM66D45-640/LB) |
| Grid connection voltage | Hessay = 33 kV ICP |
| Design life | 40 years |
| Free-issue equipment list | **Critical EPC scope boundary** — at Hessay, modules + inverters + MVS + SCADA are free-issued by client. EPC prices installation only, not supply. Wizard must capture this. |

---

### 1.2 Derived Quantities — The Scaling Engine

Ratios extracted from Hessay electrical drawings — allows wizard to calculate counts from MW capacity alone:

| Ratio | Hessay Value | Formula |
|---|---|---|
| Modules per string | **27** | Fixed per design |
| Total strings | **2,845** | Total modules ÷ 27 |
| Total modules | **76,815** | MWp ÷ Module Wp × 1,000 |
| Inverter rating | **352 kVA** (Sungrow SG350HX) | From product library |
| Inverters per site | **125** | MVA ÷ inverter rating |
| Strings per inverter | **~22.8 avg** | Total strings ÷ inverters |
| MVS stations | **9** | Mix of 3 sizes (MVS3200/4480/6400) |
| MVS3200 (10 inverters) | 3 units | 3,520 kVA each |
| MVS4480 (14 inverters) | 3 units | 4,928 kVA each |
| MVS6400 (20 inverters) | 3 units | 7,040 kVA each |
| CCTV cameras per MW | **~1.9/MW** | 76 cameras ÷ 40 MW |
| Row pitch | **10.945 m** | Layout-dependent |
| Panel tilt | **18°** | Fixed design |

---

### 1.3 Site Condition Inputs — Risk & Cost Adjustment Engine

| Condition | Hessay Value | Wizard Input Type | Cost Impact |
|---|---|---|---|
| Topography | Flat (<1% slope, 1.9m total relief across 61 ha) | Dropdown: Flat / Undulating / Hilly | Earthworks multiplier |
| CBR / subgrade strength | **0.3–1.9%** — exceptionally poor | Dropdown: Good (>5%) / Poor (2–5%) / Very Poor (<2%) | Road & platform cost multiplier |
| Soil type | Glacial till / clay | Dropdown: Clay / Sandy / Rocky / Mixed | Pile type, trench cost |
| Rock within 5m | None | Y/N | Drilling cost uplift |
| Contamination | None | Y/N | Remediation cost uplift |
| Glacial cobbles/boulders | Present at 1–2.5m depth | Y/N | Pile obstruction contingency |
| Active land drains | Present at 0.6–1.2m | Y/N | Survey + rerouting cost |
| Groundwater depth | Shallow (2m in 43% of site) | Dropdown: >5m / 3–5m / 1–3m / <1m | Trench dewatering cost |
| UXO risk | Low (awareness briefings only) | Dropdown: Negligible / Low / Medium / High | UXO clearance cost |
| Flood zone | Mainly FZ1, some FZ2 | Dropdown: FZ1 / FZ2 / FZ3 | Foundation raising, layout constraint |

**Key insight:** Very poor CBR (0.3–1.9%) is the dominant cost abnormal at Hessay. It drives all access road and working platform costs and must be a first-class wizard input.

---

### 1.4 Access & Logistics Inputs

| Input | Hessay | Wizard Question |
|---|---|---|
| Access road type | Single-track 4.5m private lane | Width: Single / Double track |
| Max concurrent HGVs on site | 1–2 | Access constraint: Open / Restricted |
| Internal material transfer required | Yes (telehandler to tractor-trailer) | Y/N |
| Road to site exists | Yes (Tinker Lane) | Existing road Y/N; length if new (km) |
| Village routing restriction | Yes (Rufforth ban) | Community liaison required Y/N |
| PRoW crossings on access route | 2 (PRoW + bridleway) | Count |
| Ecological monitoring (ECoW) | Full-time throughout | Y/N |
| Working hour restrictions | 08:00–19:00 Mon–Fri, 08:00–13:00 Sat | Y/N |
| Delivery restrictions | Mon–Fri 10:00–16:00 only | Y/N |

---

### 1.5 Infrastructure Scope — Standard Elements

**Civil & Security:**
| Element | Hessay Spec | Wizard Input |
|---|---|---|
| Perimeter fence | 1.9m HT13/190/15 deer fencing, timber posts at 3.15m c/c, shoring every 50m | Perimeter length (m) — polygon or manual |
| Badger gaps | 100cm × 20cm openings | Count |
| Vehicle gates | 6.0m clear double-leaf steel, RAL 6005, 100×100×90cm concrete foundations | Count |
| Internal access roads | 3.5m wide, 300mm Type 3 on Terram 1000 geotextile | Length (m) |
| External road (new) | Gravel / tarmac | Length (km) |
| Construction compound | ~2,000 m² crushed stone | Y/N; size |
| Substation compound | 529 m² Type 3 permeable, 300mm deep | Derived from substation count |

**Cable Infrastructure:**
| Element | Hessay Spec | Wizard |
|---|---|---|
| Cable trench | 1.0m wide × ~1.1m deep, all circuits combined (HV 3×Ø220mm + DC + FO + data) | Length (m) |
| Directional drilling | Required under IDB watercourses | Count of watercourse crossings |
| HDPE conduits | 63 / 90 / 125 / 160 / 220mm | Derived from trench length |

**Electrical Equipment (typical counts):**
| Element | Hessay | Per MW scaling |
|---|---|---|
| CCTV cameras | 76 | ~1.9/MW |
| CCTV poles | 76 (mix of 3m, 7m, 10m) | ~1.9/MW |
| Meteo mast | ~1–2 per site | Lump sum |

**Drainage:**
| Element | Hessay | Wizard |
|---|---|---|
| Attenuation in sub-base | ~915 m³ total (6 drainage areas) | Derived from hardstanding area |
| Hydro-Brake flow controllers | 6 units, 50mm orifice, 1.0 l/s | Count |
| Watercourse crossings | Multiple | Count — directional drilling if IDB |
| IDB Land Drainage Consent | Required | Y/N — add 8–12 week programme allowance |

**Surveys & Pre-Construction (all mandatory at Hessay):**
- Topographic survey
- Geotechnical investigation (63 boreholes + 20 TPs + 13 PLTs for 61 ha)
- UXO detailed risk assessment
- Utilities investigation (CAT + trial holes)
- Flood risk assessment
- Ecological survey
- Archaeological assessment

---

## PART 2 — UNIT COST RATE LIBRARY SEED

| Element | Unit | Key Specification |
|---|---|---|
| Deer fence | £/linear m | 1.9m HT13/190/15, timber posts 3.15m c/c, galvanised |
| Fence shoring post | £/unit | 45° brace; 1 per 50m + all corners |
| Badger gap | £/unit | 100cm × 20cm in fence base |
| Double vehicle gate | £/unit | 6.0m clear, steel RAL 6005, 100×100×90cm concrete pad |
| Internal road (std CBR >5%) | £/linear m | 3.5m wide, 300mm Type 3 on Terram 1000 |
| Internal road (poor CBR <2%) | £/linear m | 450–600mm Type 1 + geogrid — significant uplift |
| Cable trench (all circuits) | £/linear m | 1.0m wide, multi-conduit HDPE, warning tape, reinstatement |
| Directional drill (watercourse) | £/m | Per linear metre + mob/demob |
| Topsoil strip and stockpile | £/m² | Site-wide |
| Topsoil reinstatement | £/m² | Full site |
| Inverter station container | £/unit | 40ft container, 6 inverters + MV + LV + UPS + TR (free-issue equip.) |
| Customer substation building | £/lump sum | 30.4×12.72×3.0m, dark green, +150mm plinth |
| DNO substation building | £/lump sum | 30.4×12.72×3.0m (identical spec to customer station) |
| Concrete pad/plinth | £/m³ | Foundation for all structures |
| CCTV pole (complete) | £/unit | Steel pole, thermal + IP + IR + fibre, concrete base, power + comms duct |
| Meteo mast (complete) | £/unit | 3.0m mast, all sensors, concrete base |
| Attenuation sub-base | £/m³ | Type 3 aggregate + Hydro-Brake + pipework |
| Welfare compound | £/week | Temporary — full construction duration |
| ECoW (Ecological Clerk of Works) | £/week | Full-time during construction |
| Local Liaison Officer | £/week | Community liaison |
| UXO awareness briefings | £/lump sum | Pre-construction, all intrusive workers |
| UXO Risk Management Plan | £/lump sum | Document preparation |
| IDB Land Drainage Consent | £/lump sum | Application + design |
| Utility survey (CAT + trial holes) | £/lump sum | Before any excavation |
| Highway condition survey | £/lump sum | Pre + post construction — contractor liability |
| QC engineer (full-time piling phase) | £/week | 100% witness point requirement |
| Concrete cube testing | £/pour | UKAS lab, 4 cubes per pour |
| Decommissioning bond allowance | £/MW | Mirror of construction cost |

---

## PART 3 — RISK FACTORS THE WIZARD MUST MODEL

### Ground (HIGH)
- Very poor subgrade (CBR 0.3–1.9%): significantly heavier road spec required. North zone 2.5× weaker than south.
- Glacial cobbles at 1–2.5m: pile obstruction contingency needed.
- Active land drains at 0.6–1.2m: pre-piling drainage survey, rerouting cost.

### Utilities (MEDIUM-HIGH)
- Northern Powergrid cables across entire site: updated plans valid 30 days only. Diversion possible — get budget from NPG.
- Yorkshire Water mains + sewers (1967 vintage, brittle): CAT + trial holes mandatory. Diversion cost is applicant's liability (Section 185 WIA 1991).
- No gas on site: zero gas risk.

### Drainage / Flood (MEDIUM)
- IDB consent: 8–12 weeks on critical path. Must start before mobilisation.
- Directional drilling under IDB watercourses: multiple crossings, significant cost vs open cut.
- 150–300mm raised foundations for all structures in 1:1,000 flood extent (northern half of site).
- 9m (IDB) / 3m (ordinary) watercourse setbacks constrain structure siting.
- Internal roads double as SuDS attenuation — road spec and drainage design are coupled. Cannot value-engineer one without the other.

### Access (MEDIUM)
- Single-track access: 1–2 HGVs max on site at once. Programme extension risk.
- PRoW crossings: banksmen required throughout construction.
- Internal material transfer via telehandler: additional plant cost.

### Ecological (MEDIUM)
- ECoW full-time: fixed weekly cost regardless of programme length.
- Nesting bird season (March–August): vegetation clearance restricted.
- Dormice methodology: hedge clearance supervision required.
- 5m hedgerow buffer: reduces effective working area.

### Quality / Programme (MEDIUM)
- Hold points (48-hour notice) throughout: must be in programme.
- 28-day concrete cube results: last pours must be 28+ days before handover.
- 100% witness of every pile table and mounting table: QC engineer full-time during these phases.
- Zero open NCRs at handover: rework contingency required.

---

## PART 4 — WIZARD STEP DESIGN

**Step 1 — Project Identity:** Name, country, coordinates, MW (AC export), site area (ha), design life, free-issue scope.

**Step 2 — Site Conditions:** CBR/ground class, soil type, rock (Y/N), contamination (Y/N), UXO level, flood zone, groundwater depth, land drains (Y/N), cobble/boulder risk (Y/N), ecological sensitivities.

**Step 3 — Access & Logistics:** Access road type (existing/new, length km), access constraint (open/restricted), internal transfer required (Y/N), PRoW crossings (count), restricted hours (Y/N), ECoW required (Y/N).

**Step 4 — Layout Parameters:** Module Wp, DC:AC ratio, tilt, row pitch, fixed vs tracker. → Wizard derives: module count, string count, inverter count, MVS count.

**Step 5 — Infrastructure Scope:** Perimeter length (m), gate count, internal road length (m), new external road length (km), cable trench length (m), watercourse crossings (count), CCTV count (derived or manual), meteo masts (count).

**Step 6 — Pre-Construction & Surveys:** Tick all applicable: topo survey, geotech, UXO, utility search, flood risk assessment, ecology, archaeology. → Adds fixed cost and programme allowances.

**Step 7 — Programme:** Construction duration (weeks), start season (Q1/Q2/Q3/Q4 — affects ecological restrictions), access constraint factor.

**Step 8 — Cost Build-Up:** Apply rates to all quantities. Apply territory factor, CBR uplift, access multiplier, ecological cost, risk allowances, contingency %, margin %.

**Step 9 — Risk & Confidence Score:** Flag: missing surveys, poor CBR, restricted access, watercourse crossings, flood zone 2/3, utility diversions needed, unclarified free-issue scope.

**Step 10 — Output:** Budget cost, detailed BOQ, £/MWp metric, assumptions & exclusions, surveys required, sensitivity table (±ground / ±access / ±programme), investor-ready summary.

---

## PART 5 — INSIGHTS ONLY THE TENDER DOCUMENTS REVEAL

1. **Free-issue scope halves the apparent EPC cost.** Modules + inverters + MVS + SCADA free-issued at Hessay. Wizard must ask this question for every project — it is a first-class input, not a footnote.

2. **Internal roads and drainage are one coupled system.** The Type 3 sub-base road provides ~915 m³ of SuDS attenuation. Value-engineering the road spec breaks the drainage design. Price them together.

3. **IDB Land Drainage Consent is a critical path item** (8–12 weeks). It rarely appears in early estimates. It must be in the programme from day one.

4. **Northern Powergrid plans are only valid for 30 days.** New plans needed close to construction start. This is a procurement/coordination task, not just a cost.

5. **Customer substation and DNO substation are identical buildings** (30.4m × 12.72m). One unit rate, priced twice.

6. **28-day concrete cube results must land before handover.** Last concrete activity must be placed 28+ days before practical completion or you have a handover blocker.

7. **Decommissioning mirrors construction in reverse.** If a decommissioning bond is required, the wizard can derive it automatically from the construction cost model.

8. **QC resourcing is not a preliminary — it is a deliverable.** 100% witness of every pile table and mounting table means a full-time QC engineer for months. This is often undercosted.

---

## PART 6 — HESSAY REFERENCE DATA (Rate Library Anchor)

| Parameter | Value | Source Document |
|---|---|---|
| Site area | 61.3 ha | CEMP |
| Export MW | 40 MW | CEMP / SLD |
| DC MWp | 49.16 MWp | GA drawing |
| DC:AC ratio | 1.117 | Calculated |
| Module count | 76,815 | SLD |
| Module rating | 640 Wp (JA Solar JAM66D45-640/LB) | ER / SLD |
| Modules per string | 27 | SLD |
| String count | 2,845 | SLD |
| Inverter count | 125 | SLD |
| Inverter rating | 352 kVA (Sungrow SG350HX) | SLD |
| MVS stations | 9 (3×MVS3200, 3×MVS4480, 3×MVS6400) | LVSLD |
| CCTV cameras | 76 total (63×10m pole, 9×7m, 4×3m) | CCTV drawing |
| Fence height | 1.9m (HT13/190/15 galvanised deer fence) | Fence detail |
| Gate clear width | 6.0m (double leaf steel) | Fence detail |
| Road width | 3.5m | Track cross-section |
| Road spec | 300mm Type 3 on Terram 1000 geotextile | Track cross-section |
| Cable trench width | 1.0m (all circuits combined) | Trench cross-section |
| Customer substation | 30.4m × 12.72m × 3.0m | Substation elevations |
| DNO substation | 30.4m × 12.72m × 3.0m (identical) | Substation elevations |
| Inverter station | 40ft container (12.2m × 2.44m), 6 inverters per unit | Inverter station drawing |
| CCTV pole height | 4.2m round steel | CCTV pole detail |
| Meteo mast height | 3.0m, 500×500×500mm concrete base | Meteo station detail |
| CBR south zone | Avg 1.5% (range 1.0–1.9%) | PLT report |
| CBR north zone | Avg 0.6% (range 0.3–1.1%) | PLT report |
| Topographic range | 13.0–14.9m AOD, ~1.9m total relief | EHLP survey |
| Max slope | <1% | Survey |
| UXO risk | Low (SE portion Low-Medium Allied SAA) | UXO report |
| Flood zone | FZ1 majority, FZ2 NE corner | FRA |
| IDB discharge limit | 1.4 l/s/ha | FRA |
| Total attenuation storage | ~915 m³ (6 areas, in road sub-base) | FRA |
| Substation setback (IDB watercourse) | 9m from top of bank | FRA |
| Substation setback (ordinary watercourse) | 3m from top of bank | FRA |
| Construction duration | 52 weeks (4 stages) | CEMP |
| Peak workforce | 60 operatives | CEMP |
| Stage 1 (enabling works) | 4 weeks, ~10 operatives | CEMP |
| Stage 2 (site setup + fencing) | 4 weeks | CEMP |
| Stage 3 (solar array construction) | 40 weeks, up to 60 operatives | CEMP |
| Stage 4 (commissioning + clearance) | 4 weeks, ~20 operatives | CEMP |
| Max daily vehicle movements | 100 | CTMP |
| Max concurrent HGVs on site | 1–2 | CTMP |
| On-site speed limit | 5 mph | CTMP |
| Access road speed limit | 15 mph (Tinker Lane) | CTMP |
