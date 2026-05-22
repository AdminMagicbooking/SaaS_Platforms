# Jobs Tracker — Field Operations Platform for Construction & Trades

> **Source brain — placed verbatim 2026-05-22.** Migration to the
> portfolio-wide template (`_templates/product-spec.template.md`) is tracked
> as **D-08** in `_portfolio/decisions-ouvertes.md`.
>
> **Notes for migration:**
> - Canonical product name is **Jobs Tracker** (per the `jobstracker.work`
>   domain). Legacy aliases include *Job Tracker*, *BuilderJobsTracker*,
>   *BuildersJobsTracker* (repo), and *CBES Tracker* (pilot deployment).
>   See `_portfolio/glossary.md` and **D-09** in `decisions-ouvertes.md`.
> - The "two productisation paths" section is the live arbitration **D-01**
>   in `decisions-ouvertes.md`.
> - The "Carbon Reporting Module" section overlaps with COREPROMA's
>   existing implementation — see **D-02**.

---

## What is Job Tracker?
Job Tracker is an operational platform for construction, electrical, and building-trade firms running between ten and fifty field engineers. It replaces a tangle of spreadsheets, double-entered Sage records, and untracked WhatsApp messages with a single source of truth covering job booking, dispatch, GPS-traced tap-in/out timesheets, photo evidence, RAMS sign-off, materials and variations capture, accounting exports, and a real-time office dashboard. Delivered as a responsive web app for the office and a phone-installed PWA for the field, both updating live via SignalR.
## Pilot & Productisation Path
- **Lead pilot**: Combined Building & Electrical Services (CBES) — UK contractor with ~30 field engineers and ~8 office Project Managers — currently deployed as **CBES Tracker** at https://jobstracker.azurewebsites.net.
- **Design partner**: CBES drives the feature roadmap as a paying pilot; in return the product is designed portable from day one, with CBES-specific seed data and branding kept separable.
- **Two productisation paths under consideration**:
  1. **Module inside [COREPROMA](https://coreproma.com)** — adds field-operations (dispatch, tap-in/out, RAMS, on-site photos, materials/variations) to COREPROMA's existing project-management surface.
  2. **Standalone SaaS** — multi-tenant Job Tracker for construction & trades firms, white-labelled per customer, sold direct.
- The platform is built so either path is viable: tenant-scoped data model, branded shell, no CBES-specific business rules baked into shared code.
## Two Apps, One Platform
### Office (Back Office) — for Project Managers & Planners
The planning team runs the week from here: book reactive jobs in under 30 seconds, drag-and-drop weekly scheduling, watch the van fleet move on a live map, generate Sage-ready CSVs, sign off RAMS templates, and follow up on every commercial workflow stage (quoted, PO received, committed, invoiced, outstanding) without typing the same job reference into two systems.
### Worker (Field App) — for Engineers on Site
Field engineers carry Job Tracker on their phone — installable like any other app, works offline on flaky site Wi-Fi, big thumb-friendly buttons that work with gloves on. Today's jobs at a glance, one tap to start route, one tap on arrival, evidence photos, RAMS sign-off, materials captured against delivery notes, variations logged on the spot.
## User Roles
- **Worker** — field engineer; sees only their assigned jobs, tracks their own timesheets, signs RAMS, captures photos and materials.
- **Planner** — books and assigns jobs, manages the weekly schedule, has full access to the office dashboard.
- **Manager** — Planner permissions plus reports, audit logs, and settings (work statuses, RAMS templates, system config).
- **Admin** — full access including user management, password resets, and the demo-reset endpoint.
A second axis — **Worker Category** — describes the **job function** orthogonally to the auth Role: **FieldWorker** (regular field engineer), **FieldManager** (senior engineer who can be assigned inquiries to draft quotes), **ProjectManager** (office team driving planning and the commercial workflow). The Inquiries flow uses Category to filter the "assign to Field Manager" dropdown.
## Core Features
### Office Dashboard
- Top KPIs: jobs in progress, workers tapped-in, hours logged today, reactive jobs.
- Recent jobs table — click any row to open the job drawer with full detail.
- "Export today's jobs" button generates a CSV ready for Sage import.
### Planning — Drag-and-Drop Weekly Scheduler
- Built for an Excel-style "every column is filterable" workflow.
- Drag a job from the unassigned column onto a worker / day cell.
- Drag between cells to reschedule. Changes save automatically.
- Filter by PM or trade — useful when juggling parallel sites.
- Conflict detection prevents double-booking workers already on a job or on leave.
### Inquiries — Capture client requests
- The office books a new client inquiry with details, attached PDFs/Word/Excel docs (up to 10), priority flag, and an assigned **Field Manager**.
- Each inquiry receives a unique human-readable reference in `LL-NNNN` format (`AA-0001` → `ZZ-9999`, ~6.7M namespace).
- Inquiry status: **Open → Converted** (via the quote flow) or **Cancelled**.
- The reference is permanent and carried verbatim into the linked Quote and ultimately the Job.
### Quotes — Workflow with Field Managers
- A Quote is auto-created the moment an Inquiry is booked, sharing the same reference.
- State machine: **SubmittedToFieldManager → QuoteCompleted → SubmittedToClient → AcceptedByClient | RejectedByClient | Withdrawn**.
- Field Manager uploads their technical draft, then submits to office.
- Back office uploads the final quotation document and sends it to client recipients (email send is a tenant config — see Phase 2 roadmap).
- On client acceptance, **Convert to Job** opens the existing Add Job dialog pre-filled with client + reference; the new Job carries the same reference and inherits all inquiry + quote documents in its Records tab.
- Compliance enforcement: server rejects invalid transitions (e.g. completing an already-accepted quote) and missing-document submissions (can't send to client without a final-doc).
- Dashboard widgets: pipeline counts (with FM / awaiting send / awaiting client), outcome KPIs (accepted YTD, rejected YTD, win rate %).
### Jobs — Full Lifecycle
- "+ New Job" creates a planned or reactive job with the full commercial workflow: Job Number, Title, Client, Site Address, Job Type, Date / Start Time, Worker, Request date, Requested by, Target date, Work status (configurable: Outstanding / Quote required / Quoted No PO / Requoted / On hold / Warranty / Completed / Old), Quote Reference, Quotation Value, PO Number, PO Value, Program Date, Committed flag, Reactive SLA (12/24/48h).
- Filter strip with every column ("interrogate every field" Excel-style): Job #, Site, Client, Worker, Work status, Requested by, Quote ref, PO #, Reactive flag, Has outstanding £.
- Status flow: **Pending → Assigned → InProgress** (auto on first tap-in) → **Completed** (after tap-out & sign-off) → **Cancelled**.
- Job Detail drawer with tabs: Details & assign, Messages, Photos, Records.
- Records tab surfaces: Documents (RAMS, refurb reports, attachments), Invoices (with outstanding £ chip), Materials (description, supplier, qty, delivery-note download, total cost), Variations (description, raised date / by / PO, value with running total).
- Variation count + total £ rolled up to the main Jobs table.
- Indicator icons per row: RAMS on file, refurb report, photos attached, invoices recorded.
- Excel export of the filtered job list.
### Live Map — Real-Time Fleet Visibility
- Centre-of-region map with three layers: coloured dots per scheduled job site (status-coded blue/amber/rose/green), gradient van pins per active worker with registration plates underneath, and soft halo rings highlighting job clusters.
- Click a van for driver name, vehicle make/model, current site.
- Filter chips: Today / Reactive / All.
- Updates via SignalR — no refresh needed.
- Pluggable GPS feed: simulated mock for demo, FleetSmart direct integration on the roadmap, generic OBD-II / TomTom WEBFLEET adapters planned.
### Worker App — Daily Flow
- Branded greeting with today's date and one job listed in **Today's Jobs**.
- Per-job card with full info on one screen — no tabs, no menus.
- **Start Route** button: records travel start, fires GPS events, opens Google Maps directions to the site address.
- **Arrived** button: records tap-in, calculates travel minutes, switches job to InProgress.
- **Tap Out** at end of work: closes the timesheet entry, calculates on-site minutes, switches job to Completed.
- Job Detail tabs: Details, Messages, Photos, RAMS, Materials, Variations.
- Photos: snap directly from the phone with auto-compression, tagged "Arrival" / "Progress" / "Completion".
- Materials: record what was used, supplier, quantity, snap the delivery note as proof, log delivery date.
- Variations: log extra work or scope changes with description, value, PO ref, notes.
- "Show tracker" panel reveals the live GPS event log per job (for transparency and post-shift audit).
### RAMS / Health & Safety
- **Authoring (office)** — admin creates templates with a title, description, applicable JobType(s), and a content payload that can carry **either or both**:
  - A **PDF document** (uploaded to Azure Blob via the existing `/uploads` endpoint with a dedicated `hs-template-doc` purpose). Workers see it inline in an iframe viewer in the worker app — no JS PDF lib needed, native browser rendering on phones/tablets.
  - A **list of checkbox questions** with per-item required flag. Workers tick each to confirm.
- **Linking** — every template is tied to one or more JobTypes (the standard rule: "any job of type X requires this template") and can additionally be **attached to one specific job** (per-job override for unusual sites that need an extra checklist beyond the JobType-wide rule). The strict gate UNIONs both sources.
- **Immutable** — to revise a template, archive it and create a new one. Past submissions stay intact for audit.
- **Worker first-step rule** — when a worker opens a job with unsigned RAMS, the app auto-routes to the RAMS tab and shows a banner blocking other CTAs until everything is signed. Server-side `RAMS_NOT_SIGNED` guard fires on `tap-in`, `start-travel`, and `arrived` so the gate can't be bypassed via a stale PWA bundle.
- **Strict gate** — the worker must sign **every** active template required for their job (JobType-wide + per-job attachments). Partial signing doesn't unlock job progression.
- **Smart Submit button** — gated by both a **minimum-read timer** (only when a PDF is present; default 30 s, slider in the authoring dialog) AND **all required checkboxes ticked**. Button label flips between "Tick all required items", "Sign (Xs)", and "Sign" so the worker sees why it's locked.
- **Submission record** — who signed, when, optional comments (e.g. "site PPE missing"), GPS lat/lng stamp, completion-time-seconds, and the worker's checkbox answers serialised to JSON.
- **Audit-trail integrity** — every submission is permanent and tied to worker + job + template version. Archiving a template doesn't delete past submissions.
### Messaging — Job-Scoped Conversations
- Office and worker can chat about a specific job — no group-chat sprawl.
- Real-time delivery via SignalR; recipient sees a notification badge even with the drawer closed.
- Threads stored permanently and visible from both apps.
### Notifications
- Bell icon in the office topbar shows unread count.
- Triggers: new reactive job, late tap-out, RAMS sign-off, job completion, new message, action overdue.
- Click an item to jump straight to the related record.
### Photos & Site Evidence
- Worker takes photos directly from the app — auto-compressed before upload to Azure Blob Storage.
- Stored against job with category (Arrival / Progress / Completion / Damage).
- Office sees the gallery in the Job Detail drawer.
- Indicator icon on the Jobs table row when photos exist.
### Workers Directory
- **Add** new field staff or office users with required first name, last name, email, password, phone, role.
- **Edit** any existing worker via per-row pencil icon — change name, phone, role, **and Category** (FieldWorker / FieldManager / ProjectManager). Email is locked once set since it's the login identity. Required fields enforced both visually (red asterisk + disabled submit) and server-side.
- **Invite (with password reset)** — per-row email button on the Workers list runs the canonical "Worker — Starter Pack" comms template through SMTP and atomically resets the worker's password to a known onboarding default + sets `MustChangePassword=true` so first login redirects to a change-password screen. Repeatable — re-inviting resets the password again.
- **Forgot password** — public flow uses a 6-digit code emailed to the user (no enumeration leak); the reset endpoint accepts the code + new password.
- **Worker availability tracking** — annual leave, sick, training — visible on the planning grid so jobs can't be booked into unavailable slots.
### Clients Directory
- **Add** / **edit** any client via the cards on the Clients page: name, primary contact, contact email, **contact phone (required)**, **address (required)**, plus job-rollup stats (open jobs, WIP £).
- Client Weekly Report export — the spreadsheet the office takes into client meetings (CBES pilot uses a Ringway-compatible layout; other customers configure their own template).
### Vehicles & Fleet
- Track every van: **registration, make, model** (all required), MOT due, service due, current mileage, optional GPS device ID for live tracking.
- **Add** / **edit** via per-row pencil icon in the Vehicles table — same fields, prefilled when editing.
- Vehicles assigned to jobs feed the Live Map pins.
### Communications & Email Templates
- Office-side **Comms module** with folder hierarchy and template editor (TipTap rich-text — bold/italic, headings, lists, links, images, blockquotes, brand colours via inline `<span style="color:…">`).
- **Templates** support `{{firstName}}`, `{{lastName}}`, `{{fullName}}`, `{{email}}` placeholders + caller-supplied variables. Unknown placeholders are left intact so a typo doesn't blow up the send — the recipient sees the unsubstituted token.
- **Send test email** button on the editor; same pipeline reused by the Workers list "Invite" button.
- **SMTP wiring** — `Email:Provider` config switches between `Log` (writes to console, no real send — default in dev) and `Smtp` (real send). Production uses **Migadu** SMTP via STARTTLS on port 587; SPF/DKIM configured at DNS for the sending domain.
- **Audit-logged** — every template send records `CommsTemplateSent` (recipient, subject, sender) and every worker invite records `WorkerInvited` (recipient, subject, force-change-password flag).
### Timesheets
- Auto-built from worker tap-in / tap-out: travel minutes + on-site minutes per entry.
- Weekly view per worker — Draft → InProgress → Submitted → Approved.
- Office sees aggregated weekly totals.
- Sage Project Charges CSV export — one row per timesheet entry (Project Ref, Resource, Cost Code, Date, Quantity hours, Rate) — drops straight into Sage 50's Project Charges import.
### Accounting Integration (Sage Today, Pluggable Tomorrow)
- **Sage 50 Project Charges**: weekly timesheet → labour, replaces the manual "type each engineer's hours into Sage Projects" step.
- **Sage 50 Project Records**: one row per committed job → Project Ref, Customer Ref, Order Number, Site Address, dates, Quote Value, PO Value, PO Number — eliminates double-entry of project references.
- Pilot wires this as CSV download (same shape as Sage's import). **Phase 2** replaces it with a direct API push so the file step disappears entirely. Architecture supports adding Xero, QuickBooks, FreeAgent adapters when SaaS customers need them.
### Reports
- Filtered job lists for stakeholder reporting.
- Client Weekly Report per client with status / dates / RAMS / photo flags.
- Variation rollups for commercial review.
### Audit Logs
- Every mutation logged: who created, updated, deleted what, when, with old/new values.
- Filter by entity type, action, worker, date range.
- Required for compliance and the "who changed this job?" question that's universal across construction firms.
### Settings
- Configurable Work Statuses with sort order and colour — tenant defines their own commercial workflow language.
- Health-summary dashboard: database, blob storage, SignalR — live latency and reachability per dependency.
- Demo-reset endpoint (admin-only, gated to certain environments) to reseed the system to a known state.
### Real-Time (SignalR)
- Hub at `/hubs/tracker` broadcasts: `messageCreated`, `messageReceived`, `jobTravelStarted`, `jobStatusChanged`, tracker pings.
- Group-scoped: per-job, per-worker, plus role groups (Office / Planners / Managers).
- Office dashboard, Live Map, and Job Detail drawer subscribe automatically when open.
### Authentication & Security
- ASP.NET Core Identity + JWT access tokens with silent refresh.
- Refresh-token rotation + invalidation on logout.
- Forgot password by 6-digit code (no enumeration leak — same response for valid and invalid emails).
- Show / hide password fields with eye icon on every form.
- Role-based authorisation policies (`PlannerOrAbove` etc.) enforced at the controller level.
- Audit log of every mutation for traceability.
### PWA & Offline
- Installable as a Progressive Web App on iOS, Android, and desktop (Chrome / Edge).
- Mobile-first layouts: 44px touch targets, safe-area-aware sticky bars, no iOS auto-zoom.
- Service worker: network-first HTML, cache-first assets — opens fast even on flaky site Wi-Fi.
- Apple Web App meta tags + standalone display mode.
- The Help page in the office app includes step-by-step install and uninstall instructions for Edge and Chrome (desktop and phone).
## Tech Stack
- **Backend**: .NET 9 / C# / ASP.NET Core Web API, Entity Framework Core 9 (Code-First), SignalR
- **Frontend**: React + TypeScript + Material UI (Vite build, TanStack Query for server state)
- **Database**: SQL Server (Azure SQL Database in production)
- **Storage**: Azure Blob Storage for photos, attachments, delivery notes — Blob-level public read on a randomised-GUID naming scheme so URLs are unguessable
- **Hosting**: Single Azure App Service serving both API and React app from one origin — no CORS surface, single auth domain
- **CI/CD**: GitHub Actions on push to `main` → auto-deploys to Azure App Service
- **Cost (CBES pilot)**: ~£18/month (App Service B1 £10 + SQL Basic £4 + Storage £1 + bandwidth £3) — multi-tenant SaaS will use higher tiers and per-tenant database isolation strategies
## Roadmap
### Phase 1 (Live, CBES Pilot)
- Worker app: tap-in/out, photos, RAMS, materials, variations
- Office app: jobs, planning, live map, RAMS, reports, settings, audit logs
- Sage CSV exports (Project Charges + Project Records)
- Real-time updates via SignalR
- Push notifications (Web Push)
- PWA install on iOS / Android / desktop
- Auth: JWT + refresh + 6-digit code reset
### Phase 2 (CBES Roadmap, Generic Where Possible)
- Direct Sage API integration — replaces the CSV download step
- Direct FleetSmart API integration — replaces the simulated GPS feed
- Materials/expense receipts OCR
- **Carbon Reporting module** — see next section
## Carbon Reporting Module (Phase 2)
Embodied-carbon estimation for every job, modelled on the COREPROMA carbon-tracker MVP (full spec in `WorkNotes/Carbon_Tracker_Module_Spec.md`) and adapted to the Job Tracker / construction-trade context. Designed to plug directly into the existing `JobMaterials` data without disturbing the operational flow.
### What it does
Estimates the **embodied carbon (kg CO₂e)** of a job from its captured material lines, using monetary-intensity coefficients (kg CO₂e per £) sourced from ADEME's open dataset.
- Each `JobMaterial` row (description, supplier, quantity, unit cost) becomes one carbon-tracking line.
- An LLM matcher (Claude Haiku) maps each material description to the closest coefficient in the library — confidence score returned.
- `kg_co2e_per_line = unit_cost × quantity × coefficient.kg_co2e_per_gbp`.
- Aggregated per job → KPI strip + per-category stacked bar + A–E grade card + downloadable PDF report.
- Office admins can manually override any low-confidence AI match. Overrides are audit-logged.
### Grading
A–E grade card per job using one of two reference modes:
| Mode | Trigger | Threshold |
|---|---|---|
| `per_m2` | Job's site floor area is recorded | RE2020-aligned residential — **740 kg CO₂e/m²** |
| `per_£` (fallback) | No floor area on file | Sectoral reference — **1.5 kg CO₂e/£** |
Letter brackets (both modes): A `<0.50`, B `<0.75`, C `<1.00`, D `<1.25`, E `≥1.25` × threshold.
### Data model (planned)
- **`CarbonCoefficients`** — global library, tenant-agnostic. ~40 ADEME-sourced rows covering gros œuvre, second œuvre, finitions, extérieur, divers, plus an explicit "fallback / sector average" row used when the LLM can't find a confident match.
- **`JobMaterialCarbonMatch`** — per-line cache mirroring `JobMaterials`: matched coefficient id, computed kg CO₂e, match-confidence, override flag, who-matched / who-overrode timestamps.
- **`Jobs.AreaM2`** — optional floor-area column (nullable) to enable `per_m2` grading.
### Backend endpoints (planned)
- `POST /api/v1/jobs/{id}/carbon/match` — runs the LLM matcher across every unmatched material line, persists results.
- `GET /api/v1/jobs/{id}/carbon/summary` — KPIs (total kg CO₂e, kg CO₂e/£, kg CO₂e/m² if available, grade letter, per-category breakdown).
- `PUT /api/v1/jobs/{id}/carbon/match/{matchId}` — admin override the AI pick + recompute kg CO₂e.
- `GET /api/v1/jobs/{id}/carbon/report.pdf` — downloadable PDF (Puppeteer-rendered HTML, falls back to inline HTML if Puppeteer not installed).
### LLM matcher
- Anthropic Claude Haiku (cheap, fast). Reads `description` + optional supplier hint + amount, returns `coefficient_id` + confidence (0–1).
- If `ANTHROPIC_API_KEY` is missing or the API call fails, the matcher returns the explicit "fallback / sector average" coefficient with confidence `0.0` so the job still gets a kg CO₂e estimate (just flagged as imprecise).
- Confidence < 0.5 → UI surfaces a yellow badge prompting the admin to verify; confidence ≥ 0.8 → green badge.
### UI (office)
- **Per-job Carbon tab** in the Job Detail drawer — KPI strip (total kg CO₂e, kg CO₂e/£, grade letter), stacked bar by category, line list with confidence badges and override buttons, download-PDF action.
- **Jobs table column** — kg CO₂e total + grade chip per row.
- **Reports page** — period rollups (this quarter / YTD), per-client carbon footprint, top-emitting categories.
### Tenant config
- `CarbonReporting:Enabled` env var — feature flag (off by default, on per-tenant once a customer subscribes).
- `CarbonReporting:DefaultGradingMode` — `per_m2` / `per_£` / `auto`.
### Scope (MVP)
Monetary-intensity matching only (`kg_co2e_per_£`). Per-unit (kg, m², m³) coefficients and physical-quantity matching reserved for Stage 2. CSV / Sage carbon export is also Stage 2.
### Phase 3 (Productisation)
- Multi-tenant tenancy model (tenant-scoped users, jobs, settings, branding)
- Onboarding wizard replacing CBES seed data — generic "create your first job" flow
- White-label branding per tenant (logo, colours, app name, email sender)
- Pluggable accounting adapters: Xero, QuickBooks, FreeAgent alongside Sage
- Pluggable GPS adapters: TomTom WEBFLEET, generic OBD-II, alongside FleetSmart
- Subscription billing (Stripe) with per-seat or per-engineer pricing
- COREPROMA-module variant: Job Tracker UI surfaces inside COREPROMA's existing tenant model with shared auth and project mapping
## CBES Pilot Context
### Stakeholders
- **Owner / Sponsor**: Lynsey at CBES — drove the requirements brief and the Lynsey-round commercial-workflow fields (Request date, Requested by, Work status, Target date, RAMS, Photos, Invoiced amount, Outstanding amount).
- **Office team**: ~8 Project Managers (Tracey, Lyne, Jon, etc.) running planning and dispatch.
- **Field team**: ~30 engineers including Scott Linden (the demo's lead worker persona).
- **Original brief**: fix the Excel + Sage double-entry, give live fleet visibility (replacing FleetSmart's standalone view), capture RAMS digitally, surface invoiced/outstanding £ at a glance.
- **Brainstorming sessions**: 2026-04-27 (initial scope) and 2026-04-28 (owner clarifications) — full notes in `WorkNotes/`.
### CBES Deployment URLs
- **Production**: https://jobstracker.azurewebsites.net
- **GitHub repo**: https://github.com/AdminMagicbooking/BuildersJobsTracker
- **CI workflow**: `.github/workflows/deploy.yml`
- **Dev backend**: http://localhost:5398 (HTTP) / https://localhost:7137 (HTTPS)
- **Dev frontend**: http://localhost:5273 (Vite, pinned via `vite.config.ts`)
## Support & Contact
- **Project lead / IT consultant**: Franck Merlin
- **Lead pilot customer**: Combined Building & Electrical Services (CBES)
- **Internal docs**: `docs/deployment-guide.md`, `docs/live-demo-walkthrough.md`, `WorkNotes/`
## Key Value Propositions
### For the Office (Project Managers & Planners)
- Book a reactive job in under 30 seconds — same window someone could be on the phone with the customer.
- Drag-and-drop scheduling with no double-booking — system knows when each engineer is on a job or on leave.
- Live fleet view: where every van is right now, who's driving, which job they're on. When a customer rings to say nobody's turned up, you can see why in three seconds.
- Accounting CSV exports (Sage today, more adapters coming) kill the double-entry: no more typing project references into two systems.
- Every commercial-workflow field captured (Request date, Requested by, Work status, Target date, RAMS, Photos, Invoiced, Outstanding) — the spreadsheet retired.
- Audit log answers "who changed this job?" without a phone call.
### For the Field Engineers
- Engineers don't read manuals. Every action is a thumb-tap from the front screen — works with gloves on.
- Photos straight from the phone, auto-compressed, attached to the right job — no email shuffle.
- RAMS signed digitally on-site before tap-in — no paper, no chase.
- Materials and variations captured on the spot — no end-of-day reconstruction from memory.
- Works offline on flaky site Wi-Fi; queued actions send automatically when signal returns.
- One-tap navigation: Start Route opens Google Maps directions to the next site.
### For the Construction Firm Owner
- Replaces 3–4 disconnected tools (spreadsheets, FleetSmart, paper RAMS, manual Sage entry) with one platform.
- Pricing model under consideration: per-engineer subscription comparable to FleetSmart's seat cost; ROI from time saved on dispatch and accounting double-entry alone.
- Pilot deployment cost ~£18/month in cloud infrastructure — production scale economics worked into the SaaS pricing model.
