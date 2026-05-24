---
product_name: GTTourz
slug: gttourz
status: live
play: 3
play_name: standalone-bet
website: null  # public landing page exists but domain not in brain — TODO
repo: null  # TODO
languages: [en]  # interface language; Claude translates inbound supplier mail on the fly
pricing_currency: null  # no pricing in the brain — autoreply must route pricing questions to a human
pricing_model: tbd
target_audiences: [supercar-tour-operators]
ai_safe_for_autoreply: true
ai_safe_for_social_post: true
spec_last_updated: 2026-05-23
brain_format_version: structured-with-faq
---

# GTTourz — Application Brain

Single source of truth for what GTTourz can do. Two audiences:

1. Humans / agents exploring the codebase who need a capability map.
2. The email auto-responder — when a message arrives at the public information address, this file is the knowledge base used to draft a reply.

Keep it current. If you add, remove, or materially change a feature, update the matching section here in the same change.

---

## 1. Product summary

GTTourz is a SaaS for operators who run multi-day driving tours in supercars (Ferrari, Porsche, McLaren, etc.) across Europe. It replaces the operator's usual mix of spreadsheets, WhatsApp groups, hotel email threads, and shoebox receipts with one platform.

Two distinct applications share one backend and database:

- **Back-office (Admin)** — used by the operator and their staff. Web app, dark "Pit Wall" aesthetic.
- **Front-office (Drivers & Co-pilots)** — used by paying guests during the tour. Mobile-first.

There is also a **public landing page** that lists current and upcoming tours.

Auth model: two roles only — **Admin** (operator staff, gated by an email allowlist) and **Guest** (drivers and co-pilots). Sign-in is Google OAuth only.

---

## 2. Admin (back-office) capabilities

### 2.1 Tours
- Create a tour with a name, start/end dates, start point, and a hotel-by-hotel itinerary.
- Each leg between hotels carries its Google Maps route, distance, and drive time.
- Full-page map view of the tour. Markers for start point and each hotel. Click any marker to open a side panel with the day's details — hotel info, check-in/out, and schedule events matched to that day.
- Day-by-day schedule editor (events with times, locations, notes).
- Per-tour document library (PDFs, briefings, route books) stored in Azure Blob.

### 2.2 Hotels
- Hotel directory with full property details.
- **AI-generated guest pack** for each hotel — first-class feature. Claude drafts the welcome content, area highlights, restaurant suggestions, and practical tips based on the hotel's location and profile.
- Communication templates (welcome message, check-in instructions, etc.).
- "Surroundings" content shown in the driver app.
- Optional QR code for guests to pull the pack on arrival.

### 2.3 Drivers & co-pilots (Compliance / Pit Card)
- Driver and co-pilot records — passport, driving licence (with photo upload), emergency contact, RAMS-style compliance fields.
- **Per-tour pairing** — the same person can drive a different car with a different co-pilot on a different tour. Pairing is tour-scoped, not global.
- Each crew shows on a **Pit Card** — driver + co-pilot + their car (make, model, registration) grouped on one card. Three cards per row.
- Click a Pit Card to open a modal with Driver / Co-pilot / Car / Crew-pairing tabs.
- Car photo currently resolved from a make/model lookup with a stock photo; drivers can replace it with their own car shot from the front-office app.

### 2.4 Receipts & expenses
- Capture flow: snap a receipt photo → AI extracts vendor, date, amount, currency, tax → human reviews → approve or reject.
- Approved receipts can be **pushed to Xero** as Spend Money with the photo attached.
- **Auto-reconcile** option to mark the Spend Money transaction reconciled against the matching bank line.
- Reconciliation status is polled back from Xero and surfaced in the receipts dashboard.
- Lifecycle: `captured → pending → approved → pushed → reconciled`. Rejected receipts never push.

### 2.5 Xero integration
- One-click connect (OAuth 2.0) from `Settings → Xero`.
- Pick default bank account and default expense account.
- Toggle auto-reconcile on/off.
- Singleton connection — one organisation at a time per GTTourz instance.

### 2.6 Communications (Inbox)
- Unified inbox for **email** and **WhatsApp**, organised into folders.
- One folder per hotel, auto-created when the hotel record is created. Additional folders for general suppliers.
- **Inbound webhooks** route incoming email (SendGrid Parse) and WhatsApp (Twilio) by sender → folder → most-relevant active tour.
- Outbound: reply from the inbox; attachments stored in Azure Blob.
- **AI review / translate** on any message — Claude summarises and offers a translation when the message is in another language.
- **Contact routes** — admin can map a contact (email or phone) to a specific folder, overriding default routing.
- **vCard sharing** — share the operator's contact card as a vCard over WhatsApp.
- Per-folder settings for routing rules.

### 2.7 Guests
- Guest directory across all tours.
- Each guest record carries personal details, passport, licence, and is linked to one or more tours via the `TourGuest` join (this is also where pairing lives).

### 2.8 Dashboard
- Telemetry strip at the top of every admin page — counters for active tours, pending receipts, unread inbox messages, etc.

---

## 3. Driver / Co-pilot (front-office) capabilities

Mobile-first. Logs in with Google. Sees only the tour(s) they are on.

### 3.1 Map
- Tour route on a custom dark-themed Google Map.
- Markers for hotels and points of interest along the route.

### 3.2 Hotel pack
- The AI-generated guest pack for each night's hotel — area highlights, restaurant suggestions, practical info.

### 3.3 Camera
- Capture photos and videos directly from the app.
- Each upload marked **private** (just me) or **shared** (with the tour).
- Stored in Azure Blob.

### 3.4 Gallery
- Personal media library (private uploads).
- Daily **auto-generated album** — derived from the day's route + hotel + media shared with the tour. Optional AI-written summary. Not user-editable.

### 3.5 Profile
- Personal info, licence/passport on file, accept the tour T&Cs.

---

## 4. Public landing page

- Lists current, upcoming, and past tours, pulled live from the database.
- Per-tour hero card with photo, dates, and a Sign In / Sign Up CTA.
- Sign Up currently opens a mailto to the operator (customer-side signup flow is on the backlog).

---

## 5. What GTTourz does **not** do (yet)

These are deferred or out of scope today. If asked, be honest about status — do not invent.

- **Track-day model** — supporting on-track sessions with sign-on sheets is not yet built.
- **Live tracking** — realtime position of cars during the tour is not yet built.
- **Customer-side tour signup** — the public site links to email, there is no online booking flow.
- **Driver-app port of the latest design** — the admin shell uses the new Pit Wall aesthetic; the driver app still runs the previous design.
- **Inbound webhook DNS** — the operator needs to wire up MX records and webhook endpoints (SendGrid Parse, Twilio Studio) before inbound email/WhatsApp will land in the inbox. The plumbing is built; the DNS is on the operator.

---

## 6. Tech foundation (one-liner each)

- **Frontend / Backend** — Next.js 16 App Router (modular monolith).
- **Database** — SQL Server.
- **ORM** — Prisma 6.
- **Storage** — Azure Blob (all photos, videos, receipts, attachments, vCards).
- **Auth** — NextAuth v5 + Google OAuth with email allowlist.
- **AI** — Anthropic Claude (`claude-haiku-4-5`) for guest packs, comms review/translate, receipt extraction.
- **Maps** — Google Maps JS API.
- **Email** — SendGrid (preferred) or SMTP.
- **WhatsApp** — Twilio.
- **Accounting** — Xero (`xero-node`).

---

## 7. FAQ — for the email auto-responder

When the public information email address receives a message, the responder reads this section first and falls back to sections 1–5 above.

**Q: What is GTTourz?**
GTTourz is software for operators who run multi-day supercar driving tours. It handles the tour itinerary, hotels, drivers, receipts, and all guest communication in one place.

**Q: Who is it for?**
Tour operators, not end customers. End customers (drivers, co-pilots) use a separate mobile-first app during the tour itself.

**Q: Can I book a tour through this site?**
Not directly yet. The public landing page lists current and upcoming tours; the Sign Up button currently sends an email to the operator. An online booking flow is on the roadmap.

**Q: How do drivers / co-pilots access the app?**
They sign in with their Google account on a mobile browser. They see only the tour(s) they are on. No app store install required.

**Q: What does the AI in the product do?**
Three things today: (1) writes the guest pack content for each hotel, (2) reviews and translates incoming hotel / supplier messages in the inbox, (3) extracts vendor / date / amount from receipt photos.

**Q: Does it integrate with accounting?**
Yes — with Xero. Approved receipts are pushed as Spend Money with the photo attached, and optionally auto-reconciled against the bank feed.

**Q: Does it integrate with WhatsApp?**
Yes — via Twilio. Inbound and outbound messages live in the same inbox as email.

**Q: What is *not* in the product yet?**
Track-day sign-on sheets, live car tracking, and a customer-side online booking flow. See section 5 for the full list.

**Q: How is data stored?**
Application data in SQL Server. All media (photos, videos, receipts, attachments) in Azure Blob.

**Q: Is there a public demo?**
The public landing page shows live tour data. A guided demo is by request — direct the sender to a human reply.

**Q: Anything you cannot answer from this file?**
Hand the message to a human. Do not guess pricing, contract terms, SLAs, roadmap dates, or anything about a specific named customer.
