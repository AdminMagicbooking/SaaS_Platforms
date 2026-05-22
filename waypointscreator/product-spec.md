---
product_name: WaypointsCreator Mission Control
slug: waypointscreator
status: live
play: 3
play_name: standalone-bet
website: null  # TODO
repo: null  # TODO
languages: [en, fr, es, it, de]
pricing_currency: [EUR]
pricing_model: monthly-or-annual-subscription
target_audiences: [dji-drone-pilots, commercial-operators, surveyors, inspectors, cinematographers]
ai_safe_for_autoreply: true
ai_safe_for_social_post: true
spec_last_updated: 2026-05-22
brain_format_version: structured-with-faq
---

# brain.md — WaypointsCreator Mission Control

> **Source brain — placed verbatim 2026-05-22.** Migration to the
> portfolio-wide template (`_templates/product-spec.template.md`) is tracked
> as **D-08** in `_portfolio/decisions-ouvertes.md`.
>
> **Strategic note.** WaypointsCreator does not overlap with the UK property
> ecosystem (Play 1) or with EmailRelay (Play 2). It is currently classified
> as a "standalone bet" (Play 3) — see `_portfolio/ecosystem-vision.md` and
> **D-04** in `decisions-ouvertes.md` for the open question on whether to
> continue, spin out, or wind down.

---

> **Purpose of this file:** A single, authoritative product reference for *WaypointsCreator Mission Control*. It describes what the product is, who it's for, every feature, pricing, integrations, and supported hardware. It is written so it can also be used to **auto-respond to prospects and users** asking about the product — see the [FAQ / Auto-Response Library](#faq--auto-response-library) at the end.
>
> Last updated: 2026-05-22. When the product changes, update this file.
---
## 1. Product at a Glance
| | |
|---|---|
| **Product name** | WaypointsCreator Mission Control (short: *WaypointsCreator*) |
| **Category** | Drone waypoint mission planning software (SaaS) |
| **Hero headline** | "Every flight, perfectly planned" |
| **Tagline** | "Built for drone pilots worldwide" |
| **For** | DJI drone pilots — commercial operators, surveyors, inspectors, cinematographers, enterprise teams |
| **Platform** | Web app (browser-based), with an optional local companion app for device transfer |
| **Pricing** | Free tier + paid subscriptions (Pro €20/mo, Pro+ €30/mo), billed in EUR |
| **Languages** | English, French, Spanish, Italian, German |
**One-line description:**
WaypointsCreator is professional drone mission planning software for DJI drones. It lets pilots plan precision waypoint flights on a 2D map, preview them in 3D simulation, visualize gimbal angles, detect obstacles before flying, and push finished missions straight to a DJI RC2 controller or phone — all from the browser.
**The problem it solves:**
Planning a complex drone mission by hand is slow and error-prone. WaypointsCreator removes the manual work: it auto-generates flight paths, simulates the flight on real-world terrain, warns about obstacles, and exports a ready-to-fly mission in minutes instead of hours.
---
## 2. Who It's For
**Target users:**
- Commercial drone operators
- Land surveying teams
- Site / structure inspection professionals
- Real estate and videography / cinematography professionals
- Enterprise organizations needing precision flight planning
**Primary use cases (marketing positioning):**
| Use case | What the product does |
|---|---|
| **Map any terrain in minutes** | Auto-generate survey grids and rectangle patterns for orthomosaic capture; export KMZ optimized for overlapping photo coverage. |
| **Film like a pro** | Plan smooth curved flight paths with precise gimbal angles; use POI to keep the subject framed throughout the flight. |
| **Inspect without climbing** | Plan repeatable inspection flights around structures; circle patterns + POI auto-tracking keep the camera locked on target. |
| **Survey acres, not hours** | Define survey areas with rectangle/polygon tools; auto-generate waypoint grids with configurable spacing, altitude, and camera angles. |
Hero carousel positioning lines: *for cinematic filming · for land surveying · for real estate tours · for site inspection*.
---
## 3. Pricing & Plans
All prices in **EUR**. Billing is **monthly or annual** — annual saves roughly **18%**.
### Free — €0 / forever
- 1 saved mission
- Up to 5 waypoints per mission
- Basic 2D map planning
- KMZ export (basic)
- Basic POI controls
- Community support
- No gimbal visualizer, device connection, cloud sync, simulation, or obstacle detection
### Pro — €20 / month  (or €197 / year ≈ €16.42/mo, saves €43)
- Unlimited missions (50-mission cap in feature gating) and unlimited waypoints
- 3D gimbal visualizer
- Advanced POI controls
- Phone / RC2 device connection (USB push & pull)
- KMZ export for all drones
- Cloud sync
- Email support
- No flight simulation or obstacle detection
### Pro+ — €30 / month  (or €295 / year ≈ €24.58/mo, saves €65 — **"Best Value"**)
- Everything in Pro
- Full 3D flight simulation (Cesium-powered, real-world terrain & buildings)
- Obstacle detection with proximity warnings
- Priority support
**Internal feature-gating limits** (`src/lib/featureGating.ts`): Free = 1 mission / 6 waypoints; Pro = 50 missions / unlimited waypoints; Pro+ = 200 missions / unlimited waypoints; Admin = unlimited. *(Note: marketing copy says "Up to 5 waypoints" for Free while the gate allows 6, and Pro/Pro+ are marketed as "unlimited missions" with internal caps of 50/200 — reconcile these if a customer asks for exact numbers.)*
**Feature-to-tier map:**
- Pro unlocks: gimbal visualizer, phone connection, RC2 connection, unlimited missions/waypoints
- Pro+ unlocks: flight simulation, obstacle detection
---
## 4. Full Feature List
Features are organized into four groups. Tier in brackets is the minimum plan required.
### A. Waypoint Planning Tools
- **Circle Pattern & POI** *(Pro)* — Click to set a center, click again for radius; the app auto-places a circular orbit of waypoints. "Point All to POI" aims every waypoint at a point of interest. Ideal for building inspections and 360° tours.
- **Rectangle Survey** *(Pro)* — Drag to draw a rectangle; configure total waypoints, choose serpentine or one-direction paths, assign actions (e.g. "Take Photo"). The app computes optimal waypoint placement.
- **Curve Path** *(Pro)* — Click to place points along a road/river/feature, double-click to finish; configure how waypoints are distributed along the curve, with per-waypoint actions and smooth interpolation.
- **Waypoint Details** *(Free)* — Select any waypoint and fine-tune altitude, speed, heading, gimbal pitch & yaw, and actions (Take Photo, Start Recording, etc.). Includes prev/next navigation between waypoints.
- **Undo System** *(Free)* — Up to 5 undo snapshots with a visible counter; keyboard shortcut Ctrl+Z.
### B. Gimbal Visualizer *(Pro)*
- Side-view elevation diagram at real-world scale showing the drone, gimbal angle, and POI.
- Drag the cyan handle to adjust pitch; drag the drone to change altitude.
- "Snap to POI" auto-calculates the gimbal angle.
- Per-waypoint navigation with multi-waypoint batch save.
### C. Export & Device Transfer
- **Export to Phone / Computer** *(Free)* — Generate a DJI-compatible KMZ file (WPML execution data + KML visualization) and download it to a phone or computer. Ready to fly.
- **Push & Pull RC2 / Phone** *(Pro)* — Connect a DJI RC2 controller or a phone running DJI Fly over USB. Push new missions to an available slot, pull existing missions back to edit, or delete mission slots. Requires a pre-existing blank mission slot on the device. Unlimited push/pull.
### D. 3D Simulation
- **3D Flight Simulation** *(Pro+)* — Cesium-powered preview over real-world terrain and buildings. First-Person View (drone camera) and Third-Person View (external). Play / pause / speed control (0.25×–4×), timeline scrubbing, and an elevation profile strip showing altitude changes.
- **Proximity Warnings / Obstacle Detection** *(Pro+)* — Real-time building-clearance detection during simulation, with exact clearance distance (meters) and building height. Catches collisions before the real flight.
- **Mission Notes & Documentation** *(Free)* — User-authored notes plus auto-generated simulation report notes from proximity warnings, saved with the mission.
### Cross-cutting capabilities
- Cloud-based mission storage and a reusable mission library (Pro+)
- Heading and path optimization for efficient, battery-friendly flights
- 2D interactive maps (Leaflet) and 3D views (CesiumJS)
- Mobile-responsive UI; keyboard shortcuts
- 5-language interface (EN/FR/ES/IT/DE)
---
## 5. Integrations & Supported Hardware
### DJI RC2 Controller
- Direct **USB** connection via a local **companion app** (runs as a standalone `.exe` or Node server).
- Push new missions, overwrite existing slots, or pull missions back to edit.
- Requires a pre-existing blank mission slot on the device; uses ADB for Android-based transfer and serial-number detection.
### Phone Transfer
- **Android:** MTP (Media Transfer Protocol). **iPhone:** AFC (Apple File Connection).
- Works with the **DJI Fly** app over a USB cable through the same companion app.
- Push / pull / delete missions, same as the RC2.
### File Format
- **KMZ** import/export — contains **WPML** (DJI's Waypoint Mission Markup Language) for execution and **KML** for Google Earth-style visualization.
### Supported DJI Drones (9 models)
**Mavic series:** Mavic 4 Pro · Mavic 3 Pro · Mavic 3 · Mavic 3 Classic
**Air series:** Air 3S · Air 3
**Mini series:** Mini 5 Pro · Mini 4 Pro · Mini 3 Pro
---
## 6. Accounts & Authentication
**Sign-up / sign-in:** email + password, or Google Sign-In (OAuth). Google-only accounts are supported (no password required).
**Profile fields:** email (unique), full name, first/last name, mobile number, flying country, email-verification status.
**Account flows:** email verification via 6-digit OTP, OTP-based password reset, Google account linking, subscription status tracking (Stripe customer & subscription IDs).
**Admin:** a separate Admin area (requires an `is_admin` flag, Google-verified) with user management, payments/invoices, subscription-tier configuration, and communication templates. The Admin and regular user sessions are mutually exclusive.
---
## 7. Pages & Surfaces
| Page | Route | Purpose |
|---|---|---|
| Landing page | `/` | Hero, use cases, feature showcase, video tutorials, drone banner, pricing, CTAs |
| Features | `/features` | Interactive showcase of all features by category, with tier badges and demo videos |
| Supported Drones | `/supported-drones` | The 9 supported DJI models with highlights |
| Contact Us | `/contact` | Contact form (General / Support / Billing categories) |
| Privacy Policy | `/privacy` | Legal |
| Terms & Conditions | `/terms` | Legal |
| Admin Dashboard | `/Admin` | Internal admin tools (not public) |
**Support channels by tier:** Community support (Free) → Email support (Pro) → Priority support (Pro+). Contact form routes messages to the team by category.
---
## 8. Tech Stack (reference)
- **Frontend:** React 18 + TypeScript (strict) + Vite, Tailwind CSS, Leaflet (2D maps), CesiumJS (3D simulation), React Router, Stripe.js.
- **Backend:** Express.js (CommonJS) in `server/`, Azure SQL (mssql), JWT auth, Google Auth, bcrypt, Helmet/CORS.
- **Payments:** Stripe (tiered subscriptions, EUR).
- **Email:** SendGrid SMTP (via nodemailer).
- **Hosting / CI-CD:** Azure App Service via Azure Pipelines.
- **Companion app:** local server / standalone `.exe` for USB device transfer (`server/rc2tool/`).
---
## 9. FAQ / Auto-Response Library
Ready-made answers for common prospect and user questions. Use them verbatim or lightly adapted.
**Q: What is WaypointsCreator?**
A: WaypointsCreator Mission Control is professional drone mission planning software for DJI drones. You plan precision waypoint flights on a map, preview them in 3D simulation, check for obstacles, and send the finished mission straight to your DJI RC2 controller or phone — all from your browser.
**Q: Which drones does it support?**
A: Nine DJI models: Mavic 4 Pro, Mavic 3 Pro, Mavic 3, Mavic 3 Classic, Air 3S, Air 3, Mini 5 Pro, Mini 4 Pro, and Mini 3 Pro.
**Q: How much does it cost?**
A: There's a free plan (€0 forever, 1 mission, up to 5 waypoints). Paid plans are Pro at €20/month and Pro+ at €30/month, billed in EUR. Annual billing saves about 18% (Pro €197/yr, Pro+ €295/yr).
**Q: What's the difference between Pro and Pro+?**
A: Pro gives you unlimited missions and waypoints, the gimbal visualizer, advanced POI controls, RC2/phone connection, and cloud sync. Pro+ adds full 3D flight simulation and obstacle detection with proximity warnings, plus priority support.
**Q: Is there a free version?**
A: Yes. The Free plan lets you plan one mission with up to 5 waypoints on a 2D map and export a basic KMZ file — no payment required.
**Q: Can I send missions directly to my drone?**
A: Yes, on Pro and above. You can push missions over USB to a DJI RC2 controller, or to a phone running the DJI Fly app (Android via MTP, iPhone via AFC). You can also pull existing missions back to edit them. This uses a small companion app on your computer.
**Q: Can I preview a flight before I fly it?**
A: Yes, on Pro+. The 3D flight simulation runs your mission over real-world terrain and buildings with first-person and third-person views, plus obstacle detection that warns you about building clearance before you fly.
**Q: What file format does it export?**
A: DJI-compatible KMZ files (with WPML execution data and KML visualization), which work directly with DJI drones.
**Q: Do I need to install anything?**
A: The planner runs entirely in your browser. The only optional install is a small companion app, used to transfer missions to your RC2 controller or phone over USB.
**Q: What languages is it available in?**
A: English, French, Spanish, Italian, and German.
**Q: How do I get help?**
A: Use the Contact page (categories