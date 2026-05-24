---
product_name: EmailRelay
slug: emailrelay
status: live
play: 2
play_name: infrastructure-messaging
website: null  # per-tenant subdomains on invationai.com
repo: null  # TODO
languages: [en]  # interface language
target_languages: [pt, es, ro, pl, ar, zh, it, fr]
pricing_currency: [GBP]
pricing_model: per-seat-monthly-plus-usage
target_audiences: [uk-estate-agents, uk-lettings, multilingual-businesses]
ai_safe_for_autoreply: true
ai_safe_for_social_post: true
spec_last_updated: 2026-05-22
brain_format_version: structured-numbered
---

# brain.md — EmailRelay Product Knowledge Base

> **Source brain — placed verbatim 2026-05-22.** This brain already follows
> a strong structure (numbered sections, AI-knowledge embedded) — it is one
> of the two formats that informed the portfolio-wide template
> (`_templates/product-spec.template.md`). Migration to the unified template
> is tracked as **D-08** in `_portfolio/decisions-ouvertes.md`.
>
> **Notes for migration:**
> - The "Invation AI platform" parent is referenced throughout. Its structural
>   status is **OPEN — D-03** in `decisions-ouvertes.md`.
> - The brain references binding specs at `docs/planning/prd.md` and
>   `docs/planning/architecture.md` — these live in the EmailRelay code
>   repository, not this folder.

---

> **Purpose of this file.** This is the single source of truth used to automate
> replies to inbound emails from prospects, customers, and partners asking
> *"what does EmailRelay do?"* / *"can it do X?"* / *"how does it work?"*.
> An AI assistant reads this file as context and drafts the answer.
> Keep it accurate, plain-spoken, and current — if the product changes, change
> this file. It is derived from `docs/planning/prd.md` and
> `docs/planning/architecture.md`, which remain the binding specs.

---

## 1. One-paragraph description

EmailRelay is a **multi-tenant SaaS product** that bridges the gap between any
CRM that sends email and any customer who only replies on WhatsApp. It ingests
a business's outgoing CRM emails by **BCC** (no CRM integration or plugin
needed), **translates them bidirectionally** between English and the customer's
own language using a domain-tuned glossary with a confidence-based "refusal"
safeguard, delivers them through the **WhatsApp Business API**, and writes
AI-generated conversation summaries back into the CRM contact's Notes. The
business's staff never change their workflow — they keep using their CRM and
email inbox exactly as before. The launch market is UK estate and lettings
agencies serving migrant clients, but the design is **CRM-agnostic** so it
extends to recruiters, dental practices, garages, schools, and any small
business whose CRM emits email but whose customers live on messaging.

## 2. The problem it solves

- A CRM **sends email because that is all it can do**. Many customers —
  especially non-native-English speakers — **never open those emails**; they
  live on WhatsApp.
- Result: missed viewings, stale offers, delayed paperwork, lost clients.
- Existing fixes are weak: generic Zapier/Twilio bridges have no domain depth
  and break under WhatsApp Business API rules; CRM-native WhatsApp features
  lock you into one CRM vendor.
- EmailRelay closes the gap **without** a CRM migration, plugin, or new inbox
  for staff to learn.

## 3. Who it is for

| Audience | What they get |
|---|---|
| **Front-line staff (e.g. a lettings agent)** | Replies from foreign-language clients arrive as ordinary translated emails in their existing inbox. Zero new tools, zero workflow change. |
| **The business owner / principal (the buyer)** | Foreign-language clients answered at parity with English ones; a full per-client audit trail; compliance evidence on demand. |
| **The end customer** | Receives messages in their own language, on WhatsApp, during the business's working hours — voice notes and photos included. |
| **Onboarding / support staff (Invation side)** | Concierge tooling to provision tenants, track Meta verification, import opt-in lists, manage templates. |

## 4. How it works — the end-to-end flow

1. **Send.** A staff member writes their normal CRM email to a client and adds
   the EmailRelay BCC address (e.g. `whatsapp@acme.invationai.com`).
2. **Ingest & route.** EmailRelay receives the BCC'd email, identifies the
   destination contact via an **opaque contact reference** (never a raw phone
   number — privacy by design).
3. **Translate out.** The English message is translated into the customer's
   language, applying the tenant's protected-terminology glossary.
4. **Deliver.** The translated message is sent to the customer on **WhatsApp**.
5. **Reply in.** The customer replies on WhatsApp (text **or voice note or
   image**). Voice notes are transcribed; images are passed through intact.
6. **Translate back.** The reply is translated into English.
7. **Back to the inbox.** The staff member gets the translated reply as a normal
   email, with the original-language text shown below it.
8. **Loop.** They reply to that email; EmailRelay translates and sends it back
   on WhatsApp. Repeat — invisibly.
9. **Write-back.** Every few messages (default: every 5), an AI summary of the
   thread is written into the CRM contact's Notes.

Typical end-to-end speed: **under 60 seconds** from BCC receipt to WhatsApp
delivery.

## 5. What makes it different (the positioning)

1. **CRM-agnostic by design.** Works identically whether the business is on
   Reapit, Alto, Jupix, Street, HubSpot, Salesforce, or just spreadsheets —
   because it ingests by BCC, not by integration. No vendor lock-in.
2. **Translation is the moat, not the bridge.** A confidence-thresholded,
   glossary-backed pipeline tuned for property/legal terminology — with an
   explicit **refusal path** when the AI is not confident. "AI that knows when
   *not* to talk." Generic LLM translation is commodity; this is not.
3. **Sold as workflow acceleration, not messaging.** The unit of value is the
   outcome (viewing booked, offer captured, paperwork progressed), which
   unlocks owner-level buying — audit, compliance, sales velocity.

## 6. Full functionality list

This is the binding capability set. Each item maps to a numbered Functional
Requirement (FR) in `docs/planning/prd.md`.

### Ingestion & routing
- Register a per-tenant BCC address that receives the CRM's outbound email. *(FR1)*
- Ingest BCC'd emails and identify the destination contact via an opaque
  reference. *(FR2)*
- Route inbound CRM email to the contact's messaging channel (WhatsApp in v1). *(FR3)*
- Detect malformed / unrouteable emails and notify the sending staff member
  with an explanation. *(FR4)*
- Extensible to other ingestion paths (IMAP Sent-folder poll, CRM webhook, CRM
  API) as per-tenant adapters, no rearchitecture. *(FR5)*

### Translation & linguistic intelligence
- Bidirectional translation between English and **8 priority languages**:
  Portuguese, Spanish, Romanian, Polish, Arabic, Mandarin Chinese, Italian,
  French. *(FR6)*
- Tenant-specific **glossary** mapping protected property/legal terms to
  legally-equivalent target-language terms; supports dialect variants
  (Brazilian vs European Portuguese, Levantine vs Maghreb Arabic) and formal vs
  casual register. *(FR7)*
- Confidence score on every translation. *(FR8)*
- **Refusal safeguard:** if confidence falls below a tenant-configurable
  threshold, the system refuses to auto-send and surfaces the original message
  plus candidate translations to the staff member instead. *(FR9)*
- Presents **at least three** candidate alternative translations with
  confidence scores in the refusal state. *(FR10)*
- Transcribes inbound **voice notes** to text before translation. *(FR11)*
- Passes through inbound **image attachments** intact, with metadata. *(FR12)*

### WhatsApp delivery
- Delivers outbound messages via the **WhatsApp Business API**. *(FR13)*
- Receives inbound WhatsApp messages and links them to the right tenant and
  contact. *(FR14)*
- Submit, track, and manage Meta-approved WhatsApp **templates** per tenant. *(FR15)*
- Enforces the WhatsApp **24-hour customer-service window** — free-form when
  open, approved template otherwise. *(FR16)*
- Detects **opt-out keywords** (STOP / CANCEL / UNSUBSCRIBE and equivalents) in
  20+ languages and suppresses further sends until reconsent. *(FR17)*
- Swap the underlying WhatsApp BSP provider without changing customer-facing
  behaviour or interrupting live conversations. *(FR18)*

### Staff interaction
- Receive a translated WhatsApp reply as an ordinary email in the existing
  inbox. *(FR19)*
- Reply to a translated message simply by replying to the bridge email. *(FR20)*
- Forward a refused translation to a colleague in **one click** from the bridge
  email. *(FR21)*
- Attach voice notes or images to outbound replies. *(FR22)*

### Conversation storage & CRM integration
- Stores every message with timestamps, language metadata, translation
  provenance, confidence scores, and an intent-label field. *(FR23)*
- Generates AI thread-summaries on a configurable cadence (default every 5
  messages) and writes them to the CRM via email-to-Notes (universal) or CRM
  API (where supported). *(FR24)*
- Admins can retrieve the full audit trail of any conversation, original and
  translated text **side by side**. *(FR25)*
- Configure per-tenant CRM Notes write-back format, sender identity, target
  field. *(FR26)*
- Tags **high-stakes** messages (deposits, offers, contracts, legal terms) for
  owner review. *(FR27)*

### Tenant management & provisioning
- Provision a new tenant with its own subdomain, BCC address, BSP account,
  isolated contact directory, and default glossary. *(FR28)*
- CSV import of an existing contact list **with opt-in evidence**, validated
  row-by-row at onboarding. *(FR29)*
- Refuses to message any contact lacking valid opt-in evidence, and logs it. *(FR30)*
- Configurable data retention within allowed bounds (5–10 years, default 7). *(FR31)*
- On-demand export of the tenant's complete data set. *(FR32)*
- Hard-delete a tenant's data on churn after a 90-day grace period (unless
  legal-hold). *(FR33)*
- Meters usage (active seats and outbound conversations) and reports to Stripe
  Billing. *(FR34)*
- Admins see current tier, month-to-date usage, projected overage. *(FR35)*

### Monitoring, compliance & audit
- **BCC-compliance alarm:** detects when a staff member has stopped BCC'ing
  (no bridge traffic for ≥14 days while CRM activity continues) and alerts the
  admin. *(FR36)*
- Weekly summary email to the admin: usage, compliance, latency, refusals,
  high-stakes flags. *(FR37)*
- Per-agent BCC-compliance status on a tenant-scoped web page. *(FR38)*
- Produces GDPR subject-access-request data (access, portability, erasure)
  within 30 days for any contact. *(FR39)*
- Applies a minimum 5-year retention to AML-evidence-tagged messages,
  independent of the tenant's general setting. *(FR40)*
- Detects prohibited content before sending and blocks it with a notification. *(FR41)*

### Administration & operations
- Invation admin manages and versions the platform-wide glossary baseline. *(FR42)*
- Tenant super-admin adds tenant-specific glossary entries. *(FR43)*
- JIT impersonation for support: time-boxed (4h), MFA-protected, audit-logged. *(FR44)*
- Admins assign and revoke staff roles self-service. *(FR45)*
- Deliverability and translation-confidence telemetry feed for tenant admins. *(FR46)*
- Append-only, cryptographically-chained audit log of every admin action. *(FR47)*
- **Office-hours-aware auto-acknowledgement:** detects contact timezone and
  sends a template reply when a message arrives outside working hours, telling
  the customer when they'll be answered. *(FR48)*
- Contact data model supports many-to-one mapping (multiple numbers, household
  members, communication proxies). *(FR49)*

## 7. This is a SaaS — built to serve many organisations

EmailRelay is a **multi-tenant SaaS module** inside the Invation AI platform.
This is central to what the product is, and should be stated clearly in any
reply about scope or scale:

- **Each customer is a separate tenant.** Every business that signs up gets its
  own isolated tenant — its own contacts, glossary, WhatsApp number, branding,
  retention policy, staff list, and billing.
- **One platform, many organisations.** Tenants share the same infrastructure
  but are **isolated at every data row** (database row-level security *plus* an
  application-layer tenant guard — defence in depth). No business can ever see
  another's data.
- **Per-tenant subdomain.** Each organisation gets `<their-name>.invationai.com`,
  used for their BCC address, admin pages, and reply-from address.
- **Designed to scale linearly** from 1 to 100+ tenants with no rearchitecture,
  and a schema that supports thousands of tenants.
- **The same product serves any vertical.** Because ingestion is CRM-agnostic
  (BCC, not integration), the identical product onboards an estate agency, a
  recruiter, a dental practice, or a garage with no code changes — only
  glossary tuning.
- **Per-tenant configurability:** translation refusal threshold, retention
  period, glossary additions, working hours, roles, branding, and pricing are
  all set per organisation.

## 8. Pricing (current plan)

| Tier | For | Price | Highlights |
|---|---|---|---|
| **Hardened δ** (v1, available) | Launch customers | £29 / seat / mo + £15 per 100 outbound conversations | BCC ingestion, bidirectional translation with refusal, voice transcription, image passthrough, AI Notes summaries, opt-in wizard, concierge onboarding, weekly summary, BCC alarm |
| **The Hub** (v2, roadmap) | Teams wanting a staff UI | £49 / seat / mo + £15 / 100 conv | δ + per-client folder UI, AI-suggested replies, glossary editor, in-product opt-in management, rich dashboards |
| **Workflow Engine** (v3, roadmap) | Compliance / velocity focused | £79 / seat / mo + £15 / 100 conv | Hub + intent classification, CRM API write-back, guardrailed autopilot, multi-channel |
| **Compliance Vault** (v3+ add-on) | Regulated buyers | +£199 / office / mo | Tamper-evident audit log, per-tenant key envelopes, regulator-ready exports |

- **100 outbound conversations per tenant per month** are included in the
  per-seat fee (pooled across seats); overage is £15 per 100.
- **Concierge onboarding:** £499 one-time, bundled into all tiers.
- **Annual prepay:** 15% discount on 12-month commitments.

## 9. Onboarding — what a new customer experiences

Onboarding is **concierge** (white-glove), not self-serve, because Meta's
WhatsApp Business verification runs on an external 4–8 week clock that no UX can
shorten. Typical path (≈14–18 days from signed contract to first live message):

1. A short call to capture legal entity details and the existing contact list
   (with opt-in evidence).
2. Meta Business verification filed on the customer's behalf via Power of
   Attorney — started early so the external clock runs in parallel.
3. WhatsApp account provisioned, subdomain set up, BCC address generated.
4. Utility message templates submitted and approved.
5. Tenant activated, end-to-end test message confirmed — the customer is live.

## 10. Compliance & data protection

A genuine selling point — surface it confidently for owner/principal buyers:

- **UK & EU GDPR.** Invation is the processor; each customer is the controller.
  Template DPA signed at onboarding. Subject-access requests (access,
  portability, erasure) fulfilled within 30 days.
- **Opt-in discipline.** No message is sent to any contact without recorded
  opt-in evidence. Opt-out keywords detected in 20+ languages, suppressed
  within 60 seconds.
- **Right-to-Rent / AML.** Document exchanges logged with sender, recipient,
  timestamp, file hash, translation provenance; AML-evidence retained ≥5 years.
- **Audit trail.** Append-only, cryptographically-chained log of every message,
  translation event, opt-in capture, and admin action — tampering is
  detectable.
- **Data residency.** EU/UK only; primary region London. No US-only providers.
- **Encryption.** AES-256 at rest; TLS 1.3 in transit.
- **EU AI Act.** Actively monitored; the refusal threshold + glossary +
  per-translation audit log pre-position the product for future conformity
  assessment.

## 11. The technology (for technical enquiries)

- **Backend:** .NET 10 / C# 14, ASP.NET Core, .NET Aspire — four services:
  SmtpIngest, RoutingTranslation, BspEgress, AdminApi.
- **Frontend:** React 19 + Vite + TypeScript + Tailwind, on Azure Static Web
  Apps.
- **Data:** Azure SQL (row-level security + ledger tables), Azure Blob Storage,
  Azure Service Bus.
- **Hosting:** Azure Container Apps, UK South; infrastructure as code via Bicep.
- **Inbound mail:** SendGrid Inbound Parse webhook.
- **WhatsApp:** delivered through a Business Solution Provider behind an
  abstraction layer (Twilio adapter implemented; a second provider can be
  activated within ~4 hours).
- **Translation:** Anthropic Claude, behind a provider interface.
- **Voice transcription:** Whisper (OpenAI / Azure OpenAI).
- **Identity:** Microsoft Entra ID.
- **Observability:** OpenTelemetry → Application Insights, with per-tenant
  dimensions.

## 12. What it does NOT do (yet) — set expectations honestly

Currently out of scope (planned for later versions — do not promise these as
available today):

- A staff-facing app/UI for managing conversations (planned: v2 "The Hub").
- AI-suggested or auto-sent replies / autopilot (planned: v3, gated behind a
  safeguarding classifier).
- Intent classification (viewing / offer / complaint / paperwork) — v3.
- Channels beyond WhatsApp (Telegram, SMS, Signal, WeChat) — v3.
- Direct two-way CRM API integration as the default — v1 uses email-to-Notes;
  CRM API write-back is optional/per-tenant and expands in later versions.
- Self-serve signup — onboarding is concierge by design.
- A tenant-managed glossary editor — v2.

## 13. Quick answers to likely inbound questions

- **"Do I need to integrate it with my CRM?"** No. You just BCC an address on
  your normal client emails. Works with any CRM that sends email, or none.
- **"Will my staff have to learn a new tool?"** No. They keep using their CRM
  and email inbox. Translated replies arrive as ordinary emails.
- **"What languages?"** Portuguese, Spanish, Romanian, Polish, Arabic, Mandarin
  Chinese, Italian, French — with more addable.
- **"What if the translation is wrong?"** When the AI is not confident, it
  refuses to auto-send, shows your staff the original plus candidate
  translations, and offers one-click forwarding to a colleague. It does not
  guess on high-stakes messages.
- **"Can customers send voice notes / photos?"** Yes — voice notes are
  transcribed and translated; images pass through intact.
- **"Is it just for estate agents?"** That is the launch market, but the
  product is CRM-agnostic and works for any business with the same email-to-
  messaging gap.
- **"Can it serve more than one office / company?"** Yes — it is multi-tenant
  SaaS. Each organisation is a fully isolated tenant on shared infrastructure.
- **"How fast is delivery?"** Typically under 60 seconds end-to-end.
- **"How is my data protected?"** EU/UK-only hosting, AES-256 encryption,
  GDPR-compliant, append-only tamper-evident audit log, strict opt-in handling.

---

*Maintenance note: when product capabilities change, update sections 6, 8, and
12 first — those are the ones most likely to produce a wrong automated answer
if stale. Binding specs: `docs/planning/prd.md`, `docs/planning/architecture.md`.*
