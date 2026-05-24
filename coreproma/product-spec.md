---
product_name: COREPROMA
slug: coreproma
status: live
play: 1
play_name: uk-property-ecosystem
website: https://coreproma.com
repo: null  # TODO
languages: [en, fr]
pricing_currency: [EUR, GBP]
pricing_model: annual-subscription
target_audiences: [construction-professionals, homeowners]
ai_safe_for_autoreply: true
ai_safe_for_social_post: true
spec_last_updated: 2026-05-22
brain_format_version: legacy
---

# COREPROMA — Construction Project Management Platform

> **Source brain — placed verbatim 2026-05-22.** This document predates the
> portfolio-wide template in `_templates/product-spec.template.md`.
> Migration to the template format is tracked as **D-08** in
> `_portfolio/decisions-ouvertes.md`.
>
> **Known gaps vs. the template** (to address during migration):
> - No "Source documents" pointer
> - No Stage marker
> - No counter-metrics
> - No tech-stack section
> - No mention of the property ecosystem this product belongs to
>   (see `_portfolio/ecosystem-vision.md` Play 1)

---

## What is COREPROMA?
COREPROMA is an all-in-one web platform for managing construction and renovation projects. It handles budget tracking, invoices, documents, media galleries, team collaboration, communication, site meetings, AI-powered reporting, and embodied-carbon analysis — all in one place. Available as a responsive web app and an installable PWA (iOS/Android/desktop) with offline asset caching and push notifications.
## Two Distinct Customer Segments
### For Professionals (Entrepreneurs, Architects, Project Managers)
You manage multiple construction or renovation projects for your clients. COREPROMA is the platform built for all your needs — centralise quotes, invoices, documents, meetings, and client communication across all your sites from a single dashboard.
### For Homeowners (Individual Plan)
You're building or renovating your home and need a simple way to manage quotes, invoices, documents, and share progress with family and friends. No more lost quotes, missing invoices, or scattered photos — everything organised and shareable in one place.
## Core Features (All Plans)
### Budget Management
- Set budgets by trade (electrician, plumber, etc.) and category
- Track spending in real-time with visual progress bars
- Budget vs spending comparison charts
- Pie chart distribution view
- Approved quotes feed directly into budget
### Quote Management (Devis)
- Collect and compare quotes from contractors side by side
- Attach PDF files to each quote
- Track amounts per trade and category
- Approved quotes automatically build your budget
### Invoice Tracking
- Upload and organize invoices by trade, category, and company
- Attach PDF files and send invoices directly by email
- Automatic budget deduction when invoices are recorded
- Cloud storage for all invoice files
- Filter by trade and company
### Document Management
- Organize permits, insurance certificates, quotes, contracts, and plans by type
- Select multiple documents and send by email in one click
- Custom document types
- Secure cloud storage
### Media Gallery
- Take photos directly from the app with automatic compression
- Photo carousel and video lightbox
- Share gallery publicly with a shareable link
- Organized by phase/category
- Social media publication (Instagram, Facebook)
### Company Directory
- Track all contractors, suppliers, and service providers
- Store contact details, notes, linked invoices and documents
- Company snapshot — full overview in one panel
- Quick search and filtering
- Send emails directly from the company card
### Team Collaboration
- Invite team members with Editor or Viewer roles via magic-link email invitations
- Invitee lands on pre-filled signup with email locked and project/company context banner
- Email verification skipped for invited users (email already verified via the link)
- Sign in with email or Google
- Pending invitations filtered out once accepted
- Orphan cleanup: deleting a user's last membership removes the global account so the email can be reused
### Guided Onboarding Companion ("Max")
- Friendly illustrated companion ("Max") walks new users through setup steps on the dashboard
- **Plan-aware checklist** — Pro users see all 8 steps (including clients and site meetings), Individual users see the 6 that apply to a single-project homeowner setup
- Auto-detects completion (clients, team, categories, companies, project steps, comms, meetings, company invites)
- Progress bar, skip option, micro-celebrations, and per-step messages from Max
- Collapsible — dismiss to a small reopen pill with progress badge, restore anytime
- Bilingual FR/EN
### Plan-Aware Guided Tour (Joyride)
- Interactive walkthrough of the main UI on first sign-in (project switcher, team menu, finance, comms)
- **Pro tour** highlights multi-project navigation, Team & Dashboard menu, and portfolio-level features
- **Pro tour also explains the "Show closed projects" toggle** — a discoverable hint about how archived projects resurface in the switcher
- **Individual tour** skips the project-switcher step (only 1 project) and reframes the team menu as "My Project" with homeowner-appropriate copy
- Replayable anytime from the help menu
### User Management — Collaborators vs Company Users
- Two separate grids on Manage Users: Collaborateurs (editor/viewer) and Utilisateurs entreprises (grouped by company)
- Company Snapshot panel includes a "Voir les utilisateurs liés" modal listing active members and pending invites per company
### AI Spellcheck
- Built-in AI-powered spelling and grammar correction on task descriptions
- Supports French and English
- Shows corrections inline with before/after diff
- Powered by Claude AI
### Communication Hub
- Receive emails and WhatsApp messages in your project
- Automatic routing per company
- Share WhatsApp contact card to companies
- Full message history with attachment storage and filing
### AI Translation & Spelling
- One-click spelling and grammar review
- Instant French ↔ English translation
- Works in emails, invoices, and templates
- Zero misunderstandings, zero language barriers
### Mobile App & PWA
- Installable as a Progressive Web App on iOS, Android, and desktop
- Mobile-first layouts: 44px touch targets, safe-area-aware sticky bars, no iOS auto-zoom
- Service worker: network-first HTML, cache-first assets — opens fast even on flaky site Wi-Fi
- Apple Web App meta tags + standalone display mode
### Push Notifications
- Web Push (VAPID) for in-browser and installed PWA — no separate app needed
- Per-event mute toggles: company messages, quotes, invoices, project steps, action updates, action assignments, invoice status, step additions, meeting reminders, action deadlines
- Smart batching (30s window) and 2-minute coalescing so users don't get spammed for bursts of related events
- iOS Safari supported once the app is installed to home screen
### Localized Email Communications
- Customer emails (welcome pack, subscription confirmation, invitations) sent in the language the workspace was created with
- Plan-aware welcome pack — Pro users get the full Pro onboarding email, Individual users get the homeowner version
- Bilingual templates throughout (FR/EN)
## Professional Exclusive Features
### Pro Dashboard — Multi-Project Portfolio View
- Single-screen overview across every project under your account
- Aggregated KPIs: total budget, total invoiced, open actions, upcoming meetings, active clients
- Project cards with budget progress bars, next meeting date, action counts, and one-click "Open project"
- Single-project dashboard route preserves the detailed per-site view when you drill in
- Login auto-selects when all your projects share one account — no tenant picker for the common case
### Workspace Model — Account = Workspace, Projects = Siblings
- Every Professional subscription is a single **workspace** (identified by an `account_slug`). All projects you create live inside it as siblings.
- Creating a "new project" from the switcher adds a sibling under your current workspace — never spins up a separate account or billing entity. Plan caps (5 projects on Pro) count per workspace.
- **Switcher** lists every project in your workspace, filtered to open by default. Tick **"Show closed projects"** at the bottom to surface archived ones.
- **All slug-admins on the workspace see every project automatically.** When admin A creates a project, admin B sees it immediately in their switcher — no manual sharing, no membership tweaks. Per-project data (budget, devis, invoices, documents, media, meetings, steps) stays scoped to each project.
### Project Status (Open / Closed)
- Mark any project **open** or **closed** from the Manage Projects page (slug-admin only)
- Closed projects are hidden from the switcher by default — toggle "Show closed projects" to surface them again
- Optional change-note on every status transition; full audit trail in `project_status_history` showing who closed/reopened the project and when
### Granular Project-Creation Permission
- Per-user-role flag `can_add_project` controls whether each slug-admin can create new projects under the workspace
- Default ON for existing admins (no behavior change at upgrade); set OFF to invite a co-admin who manages existing data without provisioning new projects
- The "+ Nouveau projet" entry in the switcher is hidden for admins whose flag is OFF; backend enforces the gate independently
### Phase Anticipation Widget
- Dashboard widget detects the project's *current* construction phase from your project steps (17-phase library covering structural work through finishings)
- Surfaces the *next* phase and a collapsible list of *upcoming* phases with their product categories (materials, tools, fixtures expected for each phase)
- Skips completed and unphased steps; deduplicates categories across phases
- Bilingual phase mapping (FR/EN) — works regardless of how steps are named in your project
### Embodied Carbon Tracker — "Empreinte carbone"
- Pro-only sustainability module under the Finance menu
**How the calculation works**
- Every quote line (devis) is matched to a carbon-intensity coefficient from a curated catalogue of ~41 ADEME-style monetary coefficients (kg CO₂e per € spent), grouped in 5 categories: *gros œuvre*, *second œuvre*, *finitions*, *extérieur*, *divers*.
- Matching is done by Claude Haiku — the model reads the line's description and (where present) trade/work-item context, and picks the best coefficient from the catalogue. Each match comes back with a confidence score (0–1) and a one-line rationale.
- `kg CO₂e = line amount (€) × coefficient (kg/€)`. Results are materialised at write time, so reads are pure aggregation — no recompute on dashboard open.
- Two safety nets: when the AI is unsure or the description is empty, the matcher falls back to a single "Autre / non classé" sector-average coefficient (1.50 kg/€) flagged with low confidence so the user can review.
- Slug admins can manually override any line — pick the right coefficient from the 41-row catalogue, the match becomes "manuel" with confidence 1.00, and the bulk re-matcher is forbidden from overwriting it on subsequent runs (`override_user_id` guard).
- A "Tout recalculer" action re-runs the matcher across all lines in parallel batches; manual overrides remain sticky.
**Grading (A–E)**
- Two modes, chosen automatically:
  - **Per m² (RE2020 mode)** — used when the project's surface area is set on the project record. Graded against the RE2020 residential threshold of 740 kg CO₂e / m².
  - **Per € (sectoral mode)** — used when the area is not set. Graded against a sectoral reference of 1.5 kg CO₂e / €.
- Letter brackets (both modes, based on `value / threshold` ratio):
  - **A** < 0.50 · **B** < 0.75 · **C** < 1.00 · **D** < 1.25 · **E** ≥ 1.25
- The grade card on the dashboard shows the letter, the ratio (% of threshold), the active threshold label, and switches mode the moment an area is entered or cleared.
**UI & reporting**
- Project carbon dashboard: grade card, 4 KPI cards (total kg CO₂e, total €, intensity kg/€, line coverage X/Y), stacked bar by category, sortable per-devis table with confidence badges (green ≥ 0.8 · amber ≥ 0.5 · red < 0.5 · sky = manual).
- Per-line modal exposes the 41 coefficients (grouped by category) and the AI's reasoning so the admin can see why each match was chosen.
- Project surface (m²) editable inline from the grade card — flips grading mode immediately.
- One-click client-facing PDF report (A4, one page) — grade card, KPIs, category table, methodology footer, RE2020 reference. Falls back to HTML if Puppeteer/Chromium isn't available on the host.
**Roadmap**
- Foundation for upcoming Digital Product Passport / CIL / phase-aware RE2020 thresholds (530 in 2025, 475 in 2028, 415 in 2031) and building-type variants (residential vs office vs school).
### Project Step Templates (Construction Types)
- 8 pre-built construction-type libraries: Individual House, Residential Building, House Renovation, Hotel, Restaurant, Public Building, Office, Retail
- Each template ships a curated step list in French and English
- Duplicate any system template, rename it, and customise the steps for your firm
- Drag-to-reorder steps, system/user type distinction, full CRUD in Settings
- Start new projects in seconds with the right phasing already in place
### Company Collaboration (Partner Access)
- Invite partner companies (plumbers, electricians, masons, etc.) to access your project with a dedicated company role
- Each company gets one seat — one user per company, linked to their company record
- Personalised invitation page: shows inviter name, project name, company name — existing users sign in, new users register
- Login-time slug selection: users with multiple project accesses choose which project to enter
- Scoped interface: company users see only Dashboard, Project Steps, Site Meetings, Invoices, and Quotes — all other menus are hidden (not greyed, absent)
- Company Dashboard with budget overview (pie chart, total quoted/invoiced/paid), pending actions, project progress, and recent quotes
- Default deny security: company role is blocked from all routes by default, only explicitly opened endpoints are accessible
### Company Project Steps (Treeview)
- Company users see their assigned project steps in a treeview layout with expandable nodes
- Add tasks and sub-tasks under assigned steps with proper attribution (who created, when)
- AI spellcheck on task name and description fields
- Recursive nesting supported (tasks within tasks)
- Status management: planned → in progress → completed
### Company Meeting Actions
- After a Réunion de Chantier is completed, company users see their assigned actions highlighted in the PV
- "Your Actions" read-only banner in the PV with status chips and deadline urgency indicators (overdue in red, due soon in amber)
- Observations, participants, and actions linked to the company are visually highlighted throughout the PV with sage accent borders and "Vous" badges
- Dedicated Actions Detail page: company users can update status, add notes, upload documents and photos, reply to messages
- Meeting Actions Hub (Pro view): all actions from completed meetings grouped by meeting and company, with integrated messaging and document management
### Company Invoices
- Company users see only invoices linked to their company (filtered server-side)
- Upload new invoices with number, amount, date, description, and file attachment
- Mark invoices as paid (payment confirmation with timestamp)
- Payment status badges: Pending (amber) → Confirmed (green)
- No access to company dropdown filters or work item categories — simplified view
### Quote Approval Workflow (Devis)
- Company users upload quotes with status "Pending Approval" — budget is NOT impacted until approved
- Pro users see a pending count badge on the Finance & Docs menu
- Pro users review pending quotes and Accept (links to budget, recalculates total) or Reject (with reason)
- Company users see status badges: Pending Approval (amber), Accepted (green), Rejected (red with reason)
- Approved quotes automatically recalculate the budget total
- Only accepted quotes count toward budget — rejected quotes have zero budget impact
### Action Messaging & Documents
- Integrated messaging per action: Pro users send messages, company users reply — appears in both action view and global communication
- Auto-creation of company communication folder on first message
- Document upload per action: files stored in project documents table, images also added to media gallery
- Download capability for all action-attached documents
### Site Meetings
- Schedule virtual or on-site meetings
- Attendance tracking with participant list
- Meeting notes and agenda management
- Linked to project and participants
- Weekly/monthly recurrence
- Email invitations to participants
### Client Management
- Secure client portal with token-based access links
- Share project steps and milestones with clients
- Clients see only their own project
- Read-only or editor access per client
### Voice Notes
- Record voice notes during site visits from any device
- Automatic speech-to-text transcription
- Linked to meetings and projects
- Full-text search across all recordings
### AI Meeting Reports (Procès-Verbal)
- One-click generation of professional meeting reports
- AI compiles notes and voice recordings into structured PV
- Professional format with participants, decisions, action items
- Editable before sharing
- PDF export and email delivery
- Automatic FR/EN language detection
## Pricing
### Individual Plan — €149/year (£129/year)
- 1 project, up to 5 users
- 25 media items with social media publication
- 30 invoices, 30 documents
- Budget tracker, communication manager, company snapshot
- AI translation & spelling
- 7-day free trial (no payment taken)
### Professional Plan — €499/year (£429/year) — Best Value
- 5 projects, up to 10 users per project
- 50 media items per project with social media publication
- 50 invoices, 50 documents per project
- Budget tracker, communication manager, company snapshot
- AI translation & spelling
- **Pro Dashboard** — multi-project portfolio view with aggregated KPIs and phase-anticipation widget
- **Company collaboration** — invite partner companies with scoped access to project data
- **Quote approval workflow** — companies submit quotes, Pro approves/rejects before budget impact
- **Meeting action tracking** — centralized hub with messaging, documents, and status tracking
- **Site meetings** — virtual or on-site, with attendance tracking
- **Voice notes** with automatic transcription
- **AI meeting reports** — auto-generated Procès-Verbal
- **Client management** with secure project portal
- **Project step templates** — 8 pre-built construction-type libraries (House, Building, Renovation, Hotel, Restaurant, Public, Office, Retail)
- **Embodied carbon tracker** — AI-matched per-devis carbon (ADEME coefficients, Claude Haiku), A–E grade (RE2020 740 kg/m² or sectoral 1.5 kg/€), manual override, client-facing PDF report
- 7-day free trial (no payment taken)
### Enterprise — Custom pricing
- Contact for larger volumes of projects, documents, or media
## Trial
- 7-day free trial on all plans
- No payment taken during trial
- Full access during trial period
## Payment & Refund Policy
- Subscriptions billed annually via Stripe
- Payments are non-refundable after the trial period
- Cancel anytime, access continues until end of billing period
- Dispute window: 14 days after charge
## Interactive Demos
- English demo: https://coreproma.com/coreproma-demo.html
- French demo: https://coreproma.com/coreproma-demo-fr.html
- Personalised demo booking: https://cal.eu/coreproma/demo
## Website
- https://coreproma.com
## Support
- Email: support@coreproma.com
- Languages: French and English
## Key Value Propositions
### For Professionals
- Manage all your client projects from one Pro Dashboard with portfolio-wide KPIs
- Invite partner companies to collaborate — they see only their data, update their actions, upload quotes
- Quote approval workflow: companies submit, you approve — budget updates only when you say so
- Meeting action tracking: every action from every PV, tracked and followed up with messaging
- Site meetings with AI-generated reports save 2+ hours per meeting
- Client portal builds trust and reduces support calls by 70%
- Voice notes capture observations on-site without writing
- Project step templates for 8 construction types — start projects faster
- Embodied carbon tracker — AI matches every quote line to an ADEME monetary intensity coefficient, computes `amount × kg/€`, grades the project A–E against the RE2020 residential threshold (740 kg CO₂e/m²) or a sectoral reference (1.5 kg CO₂e/€), and hands clients a one-page PDF report
- Push notifications keep your team in sync without inbox noise — coalesced and per-event mutable
- ROI: €99.80 per project — one referral pays for the platform
### For Homeowners
- Your life's project, finally under control
- No more lost quotes, missing invoices, scattered photos
- Share progress with family and friends via a public gallery link
- AI translation for expats building abroad
- Installable on your phone — capture photos, scan invoices, get push reminders on the go
- Simple, affordable, all-in-one
## Social Media Descriptions
### TikTok (FR, 120 chars)
COREPROMA — Gérez votre chantier : budget, factures, documents, photos, réunions de chantier. Tout en un.
### TikTok (EN, 120 chars)
COREPROMA — Manage your construction project: budget, invoices, documents, photos & site meetings. All in one app.
