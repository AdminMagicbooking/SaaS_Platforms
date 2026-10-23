# ECOGRID RESORT investor teaser: assumptions and sources

Prepared 4 October 2026. All commercial figures are proposed scenarios, excluding VAT. No revenue, grant award, supplier quotation or operating savings in this teaser is represented as a contracted or measured result.

## Confirmed founder instructions

- Funding ask: **€700,000**.
- Both commercial models, with direct sales leading.
- Five offer components: CampaignBuilder and qualification wizard; grant team and back office; installation/material/carport estimating; supplier and contractor portals; Eco Grid Pilot inverter/battery dispatch.
- Launch in Spain, Italy and France, then Belgium, Netherlands and UK.
- Compare 3-, 4- and 5-star facilities across Small, Medium and Large.
- Produce an innovative visual presentation with three-year acquisition, delivery costs and facility savings.

## Existing sources and reconciliations

| Input | Internal source | Treatment |
|---|---|---|
| S 50–150, M 150–350, L 350–700 pitches | `../notes_segmentation_energie_2026-06-12.md` | Preserved. Boundaries reproduce the source rather than inventing a new segmentation. |
| Representative S/M/L loads 95 / 445 / 1,195 MWh/year | Same notes and `../BP/ECOGRID_Business_Plan_EN.docx` | Used as the 4-star reference. Other star-specific values are new scenario hypotheses. |
| Solar yield 1,400 kWh/kWp/year | June business plan | Southern Europe planning reference, not a site-specific production guarantee. |
| 35% works gross margin | `../Investor_Package_2026-07/English/ECOGRID_RESORT_Investment_Memorandum_EN.html` | Retained as a target. This is gross margin on sales, not markup on cost. |
| €250k software CAPEX and roughly €590k annual launch OPEX | `../BP/BP_interview_notes.md` | Retained. Software CAPEX stays outside EBITDA. |
| Earlier rollout 15 / 40 / 80 new sites, 2027–2029 | July memorandum | Replaced for this proposed growth case by 20 / 60 / 120. |
| July average project price €300k and annual €3k software / €1k maintenance | July memorandum | Replaced by bottom-up size-specific scope, quantities and fees. The resulting weighted price is materially higher. |
| June full-microgrid budgets S €0.20–0.35m, M €0.9–1.2m, L €2.1–2.7m | June business plan | Kept as a scope comparison. These include larger batteries and EV equipment. They are not the solar-first package cost. |
| Historic funding proposal €2–3m | July memorandum | Current founder ask supersedes it for this teaser. €700k does not finance owned resort plants. |

The older pilot reports and master documents contain inconsistent pilot scales, savings estimates and ownership references. No pilot IRR, historic subsidy, measured savings claim, partner endorsement or deployed-software claim is used as evidence in this teaser.

## New package hypotheses

| Input | Small | Medium | Large |
|---|---:|---:|---:|
| Representative pitches | 100 | 250 | 500 |
| 3-star annual demand, MWh | 75 | 330 | 900 |
| 4-star annual demand, MWh | 95 | 445 | 1,195 |
| 5-star annual demand, MWh | 130 | 600 | 1,500 |
| Engineering and controls allowance | €8,000 | €15,000 | €25,000 |
| Nominal battery ratio, kWh per kWp | 0 | 0.6 | 0.6 |
| Software per year | €2,500 | €4,000 | €5,000 |
| Maintenance per year | €2,000 | €4,000 | €8,000 |

Common rates: €900/kWp installed PV package, €300/kWh installed battery, €180/m² carport structure, 10% delivery contingency. Module power 550 W, module area 2.6 m², and 20% of panel footprint under carports. The carport structure rate excludes PV modules, inverters and the PV installation, already counted in the PV package.

These are editable planning budgets, **not supplier quotes or verified market averages**. The teaser’s “average delivery cost” means the scenario's weighted average by profile. Roof load, layouts, foundations, fire strategy, permits, interval loads, site grid capacity and equipment compatibility require engineering review. Major reinforcement, unusual civil works and EV chargers are outside the default package and need separate quotation.

Baseline energy assumptions: €0.22/kWh marginal avoided electricity price; 55% electricity-value offset; 85% use of generated PV energy on site. Fixed bill charges are not modelled. Northern markets require country/site yield and tariff assumptions. Site-specific energy profiles must validate the offset and storage selection.

Interactive sensitivity ranges: electricity tariff €0.04–€0.32/kWh and hypothetical client grant 0–80%. These controls do not change the fixed portfolio forecast. An 80% slider setting is an illustrative sensitivity, not a claim of grant eligibility or availability. Payback is not reached when the relevant annual net savings or financed cash contribution is non-positive.

## Model formulas

- Modules = ceiling(annual demand in kWh × 55% / [1,400 × 85% × 0.55 kWp]).
- PV capacity = modules × 0.55 kWp.
- Battery = 0 for S. For M/L, 0.6 × PV capacity, rounded up to a 10 kWh increment.
- Default carport structure area = rounded(modules × 2.6 m² × 20%).
- Delivery cost = 1.10 × (PV cost + battery cost + structure cost + engineering).
- Customer installation price = delivery cost / 0.65, for a 35% gross-margin target.
- Gross facility savings = lesser of 55% of annual modelled electricity cost and PV capacity × yield × self-use × tariff.
- Net facility savings = gross savings minus software and maintenance.
- Simple client payback = quoted price less hypothetical client grant / annual net savings. Financing, tax, degradation and replacement reserves are excluded.
- Financed asset-owner cash shown = 60% of gross savings minus maintenance. The resort pays the software fee to ECOGRID, and that fee stays outside asset-owner cash.
- Financed partner funds the **quoted installation price**, including EPC margin. No grant assumed. Asset payback = quoted price / illustrated annual asset/software cash. This is not IRR and does not prove bankability.

Export revenue, EV sales, avoided capacity charges, VPP/flexibility income, granted subsidies and grant success fees are **zero in the forecast**. This avoids adding unsupported benefits or counting the same energy saving twice.

## Acquisition and growth

| Year | New sites | Cumulative sites | Completed wizards | Audits | Sales + marketing | CAC |
|---|---:|---:|---:|---:|---:|---:|
| 2027 | 20 | 20 | 200 | 40 | €180,000 | €9,000 |
| 2028 | 60 | 80 | 600 | 120 | €360,000 | €6,000 |
| 2029 | 120 | 200 | 1,200 | 240 | €600,000 | €5,000 |

Target profile counts in 2027, ordered S3/S4/S5/M3/M4/M5/L3/L4/L5: **1 / 2 / 1 / 2 / 5 / 4 / 1 / 2 / 2**. Multiply by 3 for 2028 and 6 for 2029. This is 20% S, 55% M, 25% L. All sites in the operating-company forecast are direct sales.

Weighted baseline per site: delivery cost **€398,144.725**, quoted price **€612,530.346**, annual service fees **€8,550**, annual net facility savings **63,868.50**. Software-only annual fees average €3,950. “Service run rate” includes maintenance. It is not software-only ARR.

Works revenue = new sites × weighted quoted price. Works cost of sales = new sites × weighted delivery cost. Annual service revenue = (opening sites + half the new cohort) × annual fees. Service gross margin target is 65%. OPEX is €590k / €1.1m / €1.8m. No churn, delay or sales-tax cash flow in the baseline annual model.

The “delivery delay” case halves new installations. The “stretch” case multiplies them by 1.5. OPEX and sales/marketing budgets remain fixed, showing a volume sensitivity rather than a separately staffed operating plan. Cost-overrun sensitivity raises project cost while keeping signed prices fixed. It does not restore margin by automatically raising customer prices.

The €12.34m / €37.18m / €74.70m revenue and €3.75m / €12.04m / €24.70m illustrative EBITDA are mathematical scenario outputs. They are highly dependent on quote acceptance, price/margin validation and project timing. The model is predominantly project revenue over this period, with €790k software-only run rate within the €1.71m total service run rate at year 3.

Two / six / twelve contractor crews at ten commissioned projects per crew per year are capacity hypotheses. Capacity, local permissions and seasonal scheduling must be contracted before scaling. The up-to-12,000-record first-wave database is a planning target against the 12,307-site broad launch-country inventory below. It is not an eligible serviceable-market count. It includes all size/rating bands before qualification; 3–5-star, suitable energy load, decision authority and investment readiness reduce the reachable segment. Separately qualified holiday resorts can be added after deduplication.

## €700k funding and liquidity

Proposed allocation: €250k software, €180k launch hires including grant capability, €120k acquisition launch, €100k working capital, €50k contingency. Total €700k. Allocations do not sit on top of the P&L as extra expenses. The €300k team/acquisition launch allocation covers about six months of the annual €590k recurring OPEX assumption, after which project collections must support spending.

Proposed customer stages: 40% order, 50% before delivery, 10% acceptance. Supplier terms remain unconfirmed. The illustrative initial bridge test is four concurrent average projects × max(0, supplier prepayment percentage × average delivery cost − 40% × average quoted price). It tests only initial funding, not a full cash cycle. The €100k allocation fails under sufficiently adverse supplier terms. A monthly cash model must cover delayed collections, VAT, deposits, contractor payments, seasonality, warranty and contingency. A revolving facility may be necessary. Owned/financed plants require separately committed SPV capital.

## Official support-programme sources

These establish programme types and screening routes, **not that every campsite qualifies or that a call is currently accepting applications**. Reviewed 4 October 2026.

1. Spain: [IDAE RD477/2021](https://www.idae.es/ayudas-y-financiacion/para-energias-renovables-en-autoconsumo-almacenamiento-y-termicas-sector/incentivos-autoconsumo-y-almacenamiento-con-fuentes-de-energias-renovables-rd-4772021). The generic programme ran through 31 December 2023. Current regional and specialist routes need separate review.
2. Italy: [GSE shared self-consumption configurations](https://assistenza.clienti.gse.it/csm/it/differenze-tra-configurazioni-di-autoconsumo?id=faq&sys_id=8d36cf8ec34246143fd7bffb05013182). Shared-energy operating incentives depend on qualifying configurations. No automatic CAPEX grant assumed.
3. France: [ADEME funding](https://www.ademe.fr/nos-missions/financement/). Funding and eco-label support depend on eligible projects and schemes.
4. Belgium: [Wallonia AMUREBA](https://energie.wallonie.be/home/soutiens-financiers/entreprises/audits-et-etudes-amureba/amureba-pour-les-entreprises.html) for enterprise audits and studies, and [VLAIO solar support](https://www.vlaio.be/nl/subsidies-financiering/subsidiedatabank/maatregelen/zonnepanelen-steun) for Flemish support-route screening. Region matters.
5. Netherlands: [RVO SDE++](https://english.rvo.nl/subsidies-financiering/sde). Production/emissions support, not a universal upfront purchase discount.
6. UK: [Ofgem Smart Export Guarantee](https://www.ofgem.gov.uk/environmental-and-social-schemes/smart-export-guarantee-seg/electricity-suppliers). Export remuneration, not installation grant funding. Screen local grants separately.
7. EU: [LIFE Clean Energy Transition](https://cinea.ec.europa.eu/programmes/life/clean-energy-transition_en) for competitive programme support, and [EU Ecolabel tourist accommodation](https://green-forum.ec.europa.eu/green-business/eu-ecolabel/product-groups-and-criteria/tourist-accommodation_en) for certification scope. An eco-label does not automatically confer a subsidy.

The grant team must record location, beneficiary, equipment eligibility, opening/closing dates, award limits, aid stacking, eligible costs and reimbursement evidence for every application. No stale programmes from the earlier plans are promised as available aid.

## Files

The HTML embeds its image and fonts and works offline, except external source links. It includes nine-profile selection, tariff and hypothetical grant changes, carport area, energy replay, rollout and supplier-overrun controls, supplier-prepayment sensitivity, CSV download, reset and print.

PowerPoint uses editable text, tables and charts with embedded chart-data snapshots. The concept image is AI generated and explicitly identified. Source citations sit in the speaker notes. Native PowerPoint execution and investment-model audit are separate from the performed artifact checks.

## Country inventories and adjacent outdoor accommodation

Official/primary sources checked 4 October 2026. Establishments are sites, not pitches, beds or overnight stays. Counts are observed source inventories used to estimate a prospecting footprint.

| Country | Broad campsite inventory | Reference year | Phase | Source / scope |
|---|---:|---:|---|---|
| Spain | 1,431 | 2025 | Launch | Eurostat I553 |
| Italy | 2,880 | 2025 | Launch | Eurostat I553 |
| France | 7,996 | 2025 | Launch | Eurostat I553 |
| Belgium | 379 | 2025 | Expansion | Eurostat I553 |
| Netherlands | 2,630 | 2025 | Expansion | Eurostat I553 |
| United Kingdom | 6,169 | 2023 | Expansion | UKCCA holiday parks + campsites industry base |

**Launch sum: 12,307. Indicative six-country footprint: 21,485.** The six-country sum has mixed scope and vintages, since UK includes holiday parks and very small sites. It is not a harmonised census or an eligible serviceable market. The 20-site year-1 goal equals 0.16% of the broad launch inventory; 200 sites equals 1.63% of the launch inventory, or 0.93% of the six-country footprint. These ratios illustrate scale; they do not establish obtainable share or conversion.

1. [Eurostat tour_cap_nat](https://ec.europa.eu/eurostat/databrowser/view/tour_cap_nat/default/table?lang=en), dataset updated 22 September 2026. Filters: freq=A, accomunit=ESTBL, unit=NR, nace_r2=I553, time=2025, geo=ES/IT/FR/BE/NL. NACE I553 covers camping grounds, recreational vehicle parks and trailer parks. The raw JSON snapshot is saved privately in .build/eurostat-market-source.json. [Direct API query](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tour_cap_nat?lang=en&freq=A&unit=NR&accomunit=ESTBL&nace_r2=I553&geo=FR&geo=IT&geo=ES&geo=BE&geo=NL&sinceTimePeriod=2023). Italy 2024 was 2,380; 2025 is 2,880 in the current series. This source change is not interpreted as organic growth without investigating coverage and classification.
2. [UKCCA national 2024 report](https://www.ukcca.org.uk/media/o3og4sel/ukcca-uk-report-2024.pdf), tables 4.1 and 4.2: 2023 base England 4,754; Wales 922; Scotland 401; Northern Ireland 92; total 6,169. It is a conservative industry database, not a comprehensive national business census. [The announced 2026 research](https://www.ukcca.org.uk/articles-page/ukcca-research-2026/) does not establish a new published inventory count. No extrapolation to 2026 is invented.
3. [INSEE mainland France January 2026 inventory](https://www.insee.fr/fr/statistiques/8735173?geo=METRO-1), published 27 August 2026: 7,370 campings with more than ten pitches, including residential; 3★ 2,347 + 4★ 1,327 + 5★ 281 = **3,955**; and **799** holiday villages / family holiday homes, outside the camping category. Its scope differs from Eurostat's 2025 series; do not substitute one for the other silently. INSEE's 6,678 average seasonally open campsites from the occupancy survey are a different measure again.
4. [CBS table 82062NED](https://www.cbs.nl/nl-nl/cijfers/detail/82062NED): definitive 2025 Netherlands inventory 2,630 camping grounds + **1,782** holiday-house parks in separate published categories. Campsites have at least four tourist pitches, holiday-house parks at least ten beds; smaller sites and parks still need our size/energy screening. Provisional 2026 counts are 2,682 and 1,838; use definitive 2025 in the core table.

“Outdoor facilities” has no single comparable six-country inventory. Holiday villages, leisure resorts, marinas, sports facilities and holiday-house parks require explicit definitions and separate country registers. Adjacent French/Dutch counts illustrate opportunity without pretending all those sites are eligible or adding double-counted I552 short-stay apartments to the campsite market. UK holiday parks are already in its count. No unsupported outdoor-facility count is invented for Spain, Italy or Belgium.

## Round 1 validation and contribution coverage

Founder request: position €700k as a first validation round, test campaign demand, use early business to support the launch, and size the second round after observing the returns. The defensible investor wording is **controlled capital exposure with a measurable route to capital coverage**. The investment is not automatically minimal risk; sales conversion, achieved margin, time to delivery and collection remain unvalidated.

Average sale €612,530.346 less €398,144.725 delivery cost gives **€214,385.621 project gross contribution** at the 35% target margin. Four average projects give €857,542.485 gross contribution, exceeding €700k **before development and operating expenses**. This uses the weighted mix, not four small sites.

Eight average projects give €1,715,084.969 contribution. Deduct development €250k and the full first-year OPEX €590k once, leaving **€875,084.969 business surplus**, before tax, finance, working-capital changes, collection delays and additional capital expenditure. Gross coverage and business surplus are different comparisons. The €700k funding allocations are not added again as costs. Recurring service contribution is excluded from this conservative count. This is not investor principal repayment or guaranteed cash recovery.

At a 20% achieved margin on the same €612,530.346 selling price, contribution is €122,506.069; thresholds become **six** projects before launch expenses and **13** after development + first-year OPEX. The interactive margin control holds sale price/mix fixed and changes achieved delivery economics. The baseline three-year forecast stays unchanged.

Round 1 mitigations: stage campaign/hiring commitments, require customer deposits, negotiate milestone-aligned supplier payments, validate quotes, contract alternative delivery capacity, exclude owned asset financing from opco cash, and release further spend against observed acquisition/delivery milestones. None guarantees a return.

## Round 2 sizing after the market test

No amount or valuation is fixed now. Measure unique decision-makers reached, wizard start/completion, audit eligibility, signed contracts, paid deposits, commissioning, CAC, realised project margin, measured facility savings, annual service attach, collections and supplier cash terms by country, star rating and size. Campaign response alone is insufficient without a delivery/collection cohort.

Proposed readiness gates: full campaign-to-collection cycle; at least four commissioned and collected projects to test gross contribution coverage; repeatable cost/margin evidence; confirmed supplier and contractor capacity; monthly forecast reconciled to actual cash. Four projects are an initial economic test, not a statistically representative conversion sample. Repeat by key segment and report the sample sizes.

Second-round capital = approved expansion development / hiring / market launch spend + peak incremental working-capital cash gap + reserve − available operating cash. Use the signed pipeline, observed conversion and delivery slots to choose the country expansion pace. Owned-energy-asset funding belongs in a separate financing plan.
