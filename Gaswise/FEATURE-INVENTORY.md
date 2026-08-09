# Jobs Tracker — Feature Inventory

**Purpose:** a complete, honest list of what Jobs Tracker does, laid out for
side-by-side comparison against a competing product so gaps can be found in both
directions.

**Generated from the codebase**, 2026-08-04, at commit `c9e6b0e`. Not from marketing
material. 48 API controllers, 13 platform-admin controllers, 21 office views, 50
entities.

## How to use this for a comparison

Copy the tables, add two columns, and fill them in:

| | Meaning |
|---|---|
| **Us** | the Status column below — already filled in |
| **Them** | Yes / No / Partial |
| **Gap** | `THEM-ONLY` = build it · `US-ONLY` = a differentiator, say so in sales · `BOTH` = parity, ignore |

Status key: **Live** = in production · **Built** = merged, not yet exercised in
anger · **Partial** = works but with a stated limitation · **Planned** = designed,
not built · **Gap** = known missing, listed deliberately in §14 so the comparison
isn't flattering.

> Read §14 first if you're assessing us honestly. Every product comparison
> document overstates its own side; the gaps section is there to stop that.

---

## 1. Jobs and scheduling

| Feature | Status | Notes |
|---|---|---|
| Job CRUD with auto job numbers | Live | `next-number` endpoint, per-tenant sequences |
| Job types (configurable) | Live | Per tenant |
| Job status workflow | Live | Unassigned → Quote required → Quoted → Committed → In progress → Completed / Cancelled / Withdrawn / RejectedByClient |
| Multi-worker teams per job | Live | `JobWorker` join, not a single assignee |
| Multi-day scheduling | Live | `JobScheduledDay` — a job can span days, not just one date |
| Worker availability / absence | Live | `WorkerAvailability`, blocks scheduling |
| Planning grid, drag-and-drop | Live | Drag a job onto a worker's day |
| Planner scale: hour / day / week / month | Live | One toggle |
| Double-click a job to set its hours | Live | In the planner |
| Unassigned-jobs drawer | Live | Drop target; drag out to assign |
| **AI dispatch optimiser** | Live | Pareto-frontier scheduling — `POST /optimisation/dispatch`. Likely a differentiator. |
| Job notes (threaded) | Live | Per job, worker + office |
| Job attachments | Live | Any file type |
| Job photos with GPS + caption | Live | Geotagged at capture |
| Job variations (extra works) | Live | Raised by the worker on site |
| Job materials | Live | Logged against the job |
| Job invoices | Live | `JobInvoice` |
| Client sign-off signature on completion | Live | Or an explicit "client not on site" flag |
| Jobs CSV export | Live | Plus committed-jobs and all-jobs variants |

## 2. Field worker mobile experience

| Feature | Status | Notes |
|---|---|---|
| **Native iOS + Android apps** | Built | Capacitor. Android APK builds; iOS builds green on CI. Not yet in the stores. |
| Installable PWA (web) | Live | Offline app shell, background sync |
| Today's jobs list | Live | |
| Upcoming jobs tab | Live | Days ahead, separate from today |
| GPS tap-in / tap-out | Live | With accuracy grading — see §5 |
| Travel start ("on route") | Live | Feeds journey tracking |
| Arrival confirmation | Live | |
| Arrival photo prompt | Live | Prompted, GPS-stamped, confirms once on file |
| Site photos any time | Live | Camera or gallery |
| **Close-out photo at tap-out** | Gap | Not prompted — see §14 |
| In-app directions with route map | Live | Leaflet + OSRM, then hands off to Google Maps / Waze |
| Job messages (worker ↔ office) | Live | Real-time |
| RAMS review + sign on device | Live | Gated: can't start work with unsigned RAMS |
| Materials + variations from the field | Live | |
| Weekly timesheet entry + submit | Live | |
| Site notice banners | Live | Office pushes a notice to the worker's screen |
| Day gate: can't start a job early | Live | Server-enforced |
| Off-day jobs read-only | Live | Server-enforced |
| Tenant-branded app chrome | Live | Customer's logo and colours |
| **Push notifications** | Built | Sender + device registration done; needs the Firebase project to deliver |
| Offline reads | Live | |
| **Offline writes in the native app** | Gap | See §14 — the most significant limitation |

## 3. Timesheets and payroll

| Feature | Status | Notes |
|---|---|---|
| Weekly timesheet per worker | Live | |
| Submit → approve / reject cycle | Live | With reasons |
| Submission gates | Live | Refuses empty weeks and shifts left open |
| Location-verified hours | Live | Tap-in coordinates + accuracy grade attached |
| Travel-time adjustments | Live | `TimesheetTravelAdjustment` |
| §8.6 travel deduction rules | Live | Working-rule-agreement deductions, shown alongside the day |
| Office timesheet review screen | Live | Per week, per worker |
| Timesheet CSV export | Live | |
| Xero timesheet export | Live | |
| Sage project charges / records export | Live | With cost codes and per-worker resource IDs |
| Per-worker hourly rates | Live | |
| Daily journey viewer | Live | Route driven, time on site, deductions, CO₂ |
| Missed tap-in alert ("Crew live") | Live | Who's late, with a "van moved" hint from the tracker |
| Payroll system integration beyond CSV/Xero/Sage | Gap | No direct payroll API |

## 4. Enquiry → quote → job pipeline

| Feature | Status | Notes |
|---|---|---|
| Public enquiry form | Live | Anonymous, or scoped by magic link |
| Enquiry inbox with threading | Live | `InquiryMessage` |
| Enquiry documents | Live | |
| Enquiry → quote | Live | `raise-quote` |
| Quote workflow states | Live | Draft → field manager → complete → sent → accepted / rejected / withdrawn |
| Quote documents (draft + final) | Live | |
| Quote → job conversion | Live | |
| Quote pipeline + outcome reporting | Live | Win/loss |
| Quote CSV export | Live | |
| Enquiry API for external sites | Live | API-key authenticated, per-tenant keys |
| Site address suggestions | Live | From history |
| Postcode lookup + address autofill | Live | PostcodesIO free or IdealPostcodes paid |
| Companies House company lookup | Live | By company number |
| Client merge (de-duplication) | Live | |

## 5. Location, fleet and telematics

| Feature | Status | Notes |
|---|---|---|
| GPS accuracy grading | Live | Distinguishes a real GNSS fix from an IP-based guess |
| Live map of vehicles | Live | Leaflet |
| FleetSmart telematics integration | Partial | Poller built; **prod keys not configured**, so the live map is blank in production |
| Vehicle register | Live | |
| Vehicle ↔ worker bindings | Live | |
| Journey reconstruction per worker-day | Live | GPS path |
| Operating base / depot geocoding | Live | All journeys measured from it |
| Worker home addresses | Live | Drives travel rules |
| Geofencing / auto tap-in on arrival | Gap | Tap-in is manual |
| Live worker tracking (continuous) | Gap | Deliberately not built — foreground-only location |

## 6. Health, safety and compliance

| Feature | Status | Notes |
|---|---|---|
| RAMS / H&S template library | Live | Per tenant |
| Attach RAMS to a job | Live | From the job or the Edit Job dialog |
| RAMS PDF import | Live | |
| Worker RAMS sign-off | Live | Blocks starting work |
| Per-worker template exemptions | Live | |
| H&S submissions record | Live | |
| **AI RAMS drafter** | Live | Generates a RAMS draft from the job — likely a differentiator |
| Accident / incident reporting | Gap | No dedicated module |
| Toolbox talks | Gap | |
| Certification / ticket expiry tracking | Gap | No CSCS-style competency register |
| Asset / PAT / calibration register | Gap | |

## 7. Carbon and ESG

| Feature | Status | Notes |
|---|---|---|
| Per-job carbon calculation | Live | With recompute, bulk recompute, backfill |
| Per-van weekly + monthly emissions | Live | |
| Fleet monthly report, Excel + PDF | Live | |
| Annual carbon report PDF | Live | |
| **Client Scope 3 report PDF** | Live | Per client — a genuine differentiator for tender submissions |
| Job carbon CSV export | Live | |
| Distance from GPS path | Live | Telematics has no odometer, so distance is derived from the path |

## 8. Projects module (Ethical Power vertical)

| Feature | Status | Notes |
|---|---|---|
| Project templates | Live | |
| Project intake wizard | Live | |
| Generated requirements | Live | Material and role requirements from a template |
| Project phases | Live | CRUD |
| Jobs grouped by phase | Live | |
| Project photos | Live | |
| Starter template seeding | Live | |
| Gantt / critical path | Gap | Phases exist; no dependency graph |
| Budget vs actual per project | Gap | Job invoices exist; not rolled up |

## 9. Governance module (Ethical Power vertical)

| Feature | Status | Notes |
|---|---|---|
| Organisation structure (parent/child) | Live | |
| Role library + role assignment | Live | |
| Role members | Live | |
| Recurring compliance task templates | Live | |
| Task generation + scheduled sweep | Live | Background service |
| "My tasks" for the worker | Live | |
| Governance dashboard | Live | |
| Per-worker exemptions | Live | |

## 10. Communications

| Feature | Status | Notes |
|---|---|---|
| Email template library, foldered | Live | Rich text (TipTap) |
| Template send | Live | |
| Email outbox with retry | Live | `EmailOutboxItem` |
| SMTP per tenant | Live | Migadu in use for CBES |
| **SMS** | Built | Twilio + log/runtime implementations; not wired into flows |
| In-app notifications + unread badge | Live | Real-time via SignalR |
| Push notifications | Built | Needs Firebase project |
| Platform broadcasts to tenants | Live | With audience preview |
| Platform announcements banner | Live | |
| AI proofreading of outgoing text | Live | `POST /proofread` |
| Customer-facing portal for clients | Gap | Clients have no login |

## 11. Reporting

| Feature | Status | Notes |
|---|---|---|
| Office dashboard | Live | Crew live, today's state |
| Weekly work export | Live | |
| Client reports | Live | |
| Quote pipeline / outcome | Live | |
| Carbon suite | Live | See §7 |
| Unified table UX across 11+ tables | Live | Consistent paging, search, sort |
| Audit log with facets | Live | Every mutation recorded |
| Custom report builder | Gap | Reports are fixed |
| Scheduled / emailed reports | Gap | All on-demand |
| BI / warehouse export | Gap | No API for analytics tools |

## 12. Multi-tenancy and platform administration

Mostly relevant if the competitor is also a SaaS platform rather than a single-company tool.

| Feature | Status | Notes |
|---|---|---|
| Multi-tenant, row-level isolation | Live | Query filter + a stamping interceptor that rejects cross-tenant writes |
| Per-tenant subdomain + branding | Live | Colours, logo, typeface, landing template |
| Self-serve signup + email verification | Live | |
| Trial with expiry enforcement | Live | 402 gate |
| Stripe webhook / subscription | Live | |
| Per-tenant module flags + edition presets | Live | Field Service / Projects |
| Platform tenant management | Live | Create, deactivate, reactivate |
| Platform usage + storage metering | Live | |
| Tenant impersonation (support) | Live | |
| Platform staff + user management | Live | |
| Platform analytics | Live | Daily, trend, realtime, by country |
| Platform health dashboard | Live | |
| Platform email template management | Live | With revisions and restore |
| Onboarding progress tracking | Live | |
| GDPR data export per worker | Live | `me/data-export` |
| 4 roles: Worker / Planner / Admin / Manager | Live | Plus PlatformAdmin / PlatformSupport |
| SSO / SAML / Entra ID | Gap | Email+password and Google (platform staff only) |
| 2FA / MFA for tenant users | Gap | |
| Granular custom permissions | Gap | Fixed roles, not a permission matrix |

## 13. Integrations

| Integration | Status |
|---|---|
| Sage 50 (project charges, records, cost codes, per-worker resource IDs) | Live |
| Xero (timesheets, sales invoices) | Live |
| Stripe (subscription billing) | Live |
| FleetSmart telematics | Partial — prod keys missing |
| Companies House | Live |
| PostcodesIO / IdealPostcodes | Live |
| Twilio SMS | Built, not wired |
| Firebase / FCM push | Built, needs project |
| Anthropic Claude (RAMS drafting, proofreading) | Live |
| QuickBooks | Gap |
| Accounting via generic API/webhooks | Gap |
| Zapier / Make | Gap |
| Public REST API for customers | Partial — enquiry intake only |
| Outbound webhooks | Gap |

## 14. Known gaps — read this before claiming parity

Listed deliberately. A comparison built only on strengths is useless for deciding
what to build.

**Significant**

1. **Offline writes in the native app.** iOS serves the Capacitor WebView over
   `capacitor://`, where service workers never register, so the Workbox
   background-sync queue the website relies on doesn't exist there. A tap-in made
   with no signal is lost. The in-app banner says so rather than promising a sync.
   Needs an idempotency design before mutations can be safely replayed — a
   double-applied tap-in is worse than a lost one. **If the competitor has genuine
   offline-first sync, this is the biggest gap.**
2. **No customer/client portal.** Clients can't log in to see job progress, approve
   quotes or download certificates. Everything client-facing goes by email. Common
   in competing products.
3. **No SSO or 2FA.** Email + password only for tenant users. Blocks larger
   customers with security policies.
4. **No accident/incident module, and no competency (CSCS ticket) tracking.**
   Partial nuance: `Message.MessageType` accepts `IncidentReport`, so a worker can
   flag a message as an incident — but there is no incident record, no structured
   fields, no investigation workflow and no register. Treat as a gap. Competency
   tracking doesn't exist at all, which is notable for a construction product.
5. **No asset or equipment register.** No PAT testing, calibration, or plant
   tracking.
6. **No purchase orders or supplier management.** `JobMaterial.Supplier` is a
   free-text field on the material line, nothing more — no supplier records, no
   pricing, no POs, no procurement workflow.
7. **No stock or inventory.** No van stock, no consumption tracking.

**Moderate**

8. No Gantt or task dependencies in Projects — phases exist, ordering doesn't.
9. No budget-vs-actual roll-up per project or client.
10. No custom report builder; no scheduled or emailed reports.
11. No outbound webhooks or general public API — enquiry intake is the only inbound one.
12. No geofenced auto tap-in.
13. SMS is built but not wired into any flow.
14. Close-out photo isn't prompted at tap-out (arrival photo is).
15. FleetSmart keys aren't in production, so the live map is blank there.
16. No QuickBooks; Sage and Xero only.

**Minor**

17. App still fetches web fonts from Google, so it falls back to system fonts offline.
18. Leaflet marker icons load from a CDN — broken map pins offline.
19. No dark mode.
20. No in-app document/certificate library for workers (RAMS aside).
21. No multi-language / i18n. English only.

## 15. Likely differentiators — verify these against the competitor

Where we are plausibly ahead. Worth checking specifically, because these are the
things to lead with if they hold.

1. **AI dispatch optimiser** — Pareto-frontier scheduling rather than rules.
2. **AI RAMS drafter** — generates a RAMS draft from the job.
3. **Client Scope 3 carbon report** — per-client PDF for tender submissions. Rare.
4. **Carbon throughout** — per job, per van, monthly, annual, all exportable.
5. **Location-verified timesheets with accuracy grading** — distinguishes a real
   GNSS fix from an IP guess, so hours are defensible rather than just recorded.
6. **§8.6 working-rule travel deductions** — encoded, not manual.
7. **Missed tap-in with a "van moved" telematics cross-check** — tells "not on site"
   apart from "on site, forgot to tap".
8. **Deep white-labelling** — per-tenant colours, logo, typeface and landing
   template, carried into the mobile app.
9. **Sage 50 depth** — cost codes and per-worker resource IDs, not just a CSV dump.
10. **Server-enforced field discipline** — day gates and off-day read-only are
    enforced in the API, not just hidden in the UI.

---

## Appendix — where to verify any line above

| Area | Source |
|---|---|
| Endpoints | `src/BuilderJobTracker.Api/Controllers/` (48 + 13 admin) |
| Data model | `src/BuilderJobTracker.Api/Entities/` (50) |
| Capability areas | `src/BuilderJobTracker.Api/Services/` (26) |
| Office UI | `web/src/pages/office/views/` (21) |
| Worker UI | `web/src/pages/worker/` (5) |
| Platform admin UI | `web/src/pages/admin/pages/` (9) |
| Module flags | `web/src/lib/modules.ts` |
| Mobile app | `docs/MOBILE-SETUP.md`, `WorkNotes/mobile-app-plan.md` |
| Tests | `tests.md` |
