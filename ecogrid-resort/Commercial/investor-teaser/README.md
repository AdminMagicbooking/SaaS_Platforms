# ECOGRID RESORT investor teaser

Open `ecogrid-investor-teaser.html` in a browser. It embeds its image and fonts and works offline. External source links require internet access.

The web teaser includes complete English and French versions. Use the EN/FR flag buttons in the header; switching preserves the current chapter and scenario inputs. The selected language is remembered in the browser. Share `https://www.ecogridresort.green/teaser/?lang=fr` for French or `?lang=en` for English. French includes localized currencies, photovoltaic units, tables, chart labels, accessibility labels and CSV exports. The editable PowerPoint remains in English.

French deployment verified on 5 October 2026: GitHub PR 3 merged, Azure deployment run 37275614478 succeeded. All three public teaser URL forms return the reviewed bilingual version. Live checks confirmed language persistence, scenario preservation, all nine facility profiles, country translations, French CSV export and no JavaScript errors. Local desktop, 390px and 320px layout checks passed without overflow findings.

The interactive story includes all five offer components, nine facility profiles, a quantity-based installation estimate, funding routes, energy-dispatch demonstration, the two business models, three-year rollout scenarios and the €700,000 launch request. The fixed baseline sits alongside controls for tariff, hypothetical grant, carport area, acquisition pace, supplier overruns and initial supplier payments.

The electricity tariff slider covers €0.04–€0.32/kWh in €0.01 steps. The hypothetical client grant slider covers 0–80% in five-percentage-point steps. Defaults remain €0.22/kWh and 0% grant. Scenarios with non-positive annual net savings or financed cash contribution display “Not reached” / “Non atteint” for payback.

Slider update deployed and verified on 5 October 2026: PR 4, merge commit `64f1e0d`, successful Azure run `37313671459`. Live endpoint, nine-profile extreme-input and English/French control checks passed; all public teaser URL forms match the reviewed artifact.

The editable PowerPoint is `output/ecogrid-investor-teaser-v3.pptx`. The companion `assumptions-and-sources.md` distinguishes founder inputs, documented assumptions and new scenario hypotheses. `scenario-data.json` contains the baseline numerical outputs.

The 2027–2029 growth case is a proposal, not a contracted forecast. The lighter solar-first package differs from the earlier full microgrid scope. Partner quotations, energy-load studies and the monthly cash plan must validate the economics before investor commitments. No grants or grid-export income underpin the base case.

Updated for the staged investment story: six-country market inventories, round-1 project contribution coverage with a 20–35% achieved-margin sensitivity, and evidence gates for a separately sized second round. The six-country footprint is indicative because the UK uses a broader industry scope and an older reference year.

Live presentation: https://www.ecogridresort.green/teaser/ (deployed and verified 4 October 2026). The existing homepage links to the teaser. Production files live at SmartGrid/Commercial/presentation/dist/teaser/index.html, deployed by the repository's Azure Static Web Apps workflow. GitHub PRs 1 and 2 are merged; successful deployment run 37227377823. Both /teaser and /teaser/ were verified, together with all six-country figures and the contribution calculator. Future edits must rebuild the standalone HTML and update the production copy through the existing deployment workflow.
