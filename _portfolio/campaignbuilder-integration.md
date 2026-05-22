# CampaignBuilder ↔ SaaS_Projects Integration

> **Purpose.** Specifies how the internal tool **CampaignBuilder** (Azure-hosted)
> consumes product knowledge from this repository to generate marketing
> content and autoreply to inbound prospect emails.
>
> **Status:** v0.1. Written 2026-05-22.
> **Owners:** Franck (repo side), CampaignBuilder team (consumer side).

---

## 1. Architecture summary

```
+----------------------+        HTTPS         +-------------------+
| CampaignBuilder      | -------------------> |  GitHub Raw API   |
| (Azure App Service)  |  GET .md + .json     |  raw.github...    |
+----------------------+                      +-------------------+
        |   ^                                          |
        |   |                                          |
        |   | content                                  | source of truth
        v   |                                          v
+----------------------+                      +-------------------+
| LLM (Anthropic /     |                      |  SaaS_Platforms   |
|  OpenAI) + prompt    |                      |  GitHub repo      |
|  templates           |                      |  (this repo)      |
+----------------------+                      +-------------------+
```

CampaignBuilder is the only consumer. The repo is the single source of truth.
Edits in the repo are visible to CampaignBuilder within the cache TTL (default
5 minutes).

## 2. Authentication

The repo is **private**. CampaignBuilder authenticates with a GitHub **fine-grained
Personal Access Token** scoped to read-only access on
`AdminMagicbooking/SaaS_Platforms` only.

- **Storage:** PAT lives in **Azure Key Vault** under the secret name
  `CampaignBuilder--GitHubReadPAT`. CampaignBuilder reads it via managed
  identity. The PAT never lands in source code, env vars, or logs.
- **Scope:** *Contents → Read-only* on this single repo. Nothing else.
- **Expiry:** 90 days. Rotation is owned by Franck. Reminder added to
  `dashboard.html` *Renewals* section.
- **Audit:** GitHub logs all repo reads against the PAT — periodically review
  the access log to verify it is only CampaignBuilder hitting the repo.

If the PAT is leaked or rotation is missed, the worst case is a read-only
exposure of internal strategy documents (`_portfolio/`). There is no write
exposure.

## 3. Endpoints CampaignBuilder must call

All URLs use the pattern:
```
https://raw.githubusercontent.com/AdminMagicbooking/SaaS_Platforms/main/<path>
```

### 3.1 Discovery (called first, cached 5 min)

```
GET /_portfolio/products-index.json
```

Returns the list of all products with their slugs, spec paths, and section
maps. CampaignBuilder iterates over this. Adding a new product to the
portfolio = adding an entry here + creating its folder.

### 3.2 Per-product brain (called per product, cached 5 min)

```
GET /<slug>/product-spec.md
```

Returns the canonical brain for that product. CampaignBuilder must:

1. Parse the **YAML frontmatter** (between `---` markers at the top).
2. Strip any `<!-- INTERNAL --> ... <!-- /INTERNAL -->` blocks.
3. Use the `sections` map in `products-index.json` to locate canonical
   sections by exact heading text.
4. Respect the frontmatter flags:
   - `ai_safe_for_autoreply: false` → do NOT use this brain for autoreply.
     Escalate inbound emails about this product to a human queue.
   - `ai_safe_for_social_post: false` → do NOT generate social posts.
   - `status: pre-launch` → do NOT publish anything that implies the product
     is available today. Use future tense.

### 3.3 Voice & tone (called once per generation, cached 5 min)

```
GET /_portfolio/voice-and-tone.md
```

**Mandatory.** CampaignBuilder injects the full contents of this file as a
system prompt before any content generation. If this file cannot be fetched,
CampaignBuilder must refuse to generate content and surface the failure to
an admin.

## 4. Content generation rules (binding)

These rules supplement `voice-and-tone.md`. They are technical rather than
stylistic.

1. **Brain content is the ground truth.** Do not invent features, prices,
   dates, languages, customer names, or integrations not present in the brain
   verbatim.
2. **Pricing in the product's official currency only.** Read
   `pricing_currency` from frontmatter. Quote in that currency. If user asks
   in another currency, do not convert — explain the product is priced in X.
3. **Refusal threshold.** If the LLM's confidence on an answer is below 0.7,
   the response status is `needs_review`, not `auto_send`.
4. **Pilot names are NEVER published.** Anything between `<!-- INTERNAL -->`
   markers is stripped. Pilot customer names (CBES, Chiola) appear in INTERNAL
   blocks — verify they are stripped before any output.
5. **Cite the brain commit SHA.** Every generated output (post draft, email
   reply draft) records the commit SHA of the brain at the time of
   generation. This is the audit trail. If the brain changes, the draft is
   marked `stale` until regenerated or approved.
6. **Approved drafts only.** Generation produces `status: draft`. Human
   approval flips to `status: approved`. Auto-publish only when both
   `approved` AND CampaignBuilder is past the 30-day supervised window (see
   voice-and-tone §7).

## 5. Failure modes and required behaviour

| Condition | CampaignBuilder behaviour |
|---|---|
| `products-index.json` returns 404 | Halt all operations. Alert admin. |
| `voice-and-tone.md` returns 404 | Halt all generation. Alert admin. |
| A specific product spec returns 404 | Mark that product as `unavailable`. Other products still work. |
| Brain has no frontmatter (legacy) | Treat all flags as `false` until manually overridden. |
| LLM confidence < 0.7 | Output `status: needs_review`, never auto-send. |
| GitHub Raw rate limit hit | Back off exponentially. Use last good cache. Alert admin if cache > 24h old. |
| PAT returns 401 | Halt all operations. Page Franck. |

## 6. Inbound email autoreply pipeline (for prospect questions)

```
Inbound email lands at sales@<product>.com
    |
    v
CampaignBuilder classifies (which product? which audience?)
    |
    v
GET product-spec.md + voice-and-tone.md
    |
    v
Strip <!-- INTERNAL --> blocks
    |
    v
Compose LLM prompt:
  [system] voice-and-tone.md
  [system] "Use only facts in the provided brain. Refuse if unsure."
  [user]   inbound email + brain content
    |
    v
LLM generates reply + confidence score
    |
    v
If confidence >= 0.7 AND ai_safe_for_autoreply == true:
    -> status: draft (awaiting human approval in 30-day window)
    -> after window passes: auto-send
Else:
    -> status: needs_review (always human-approve)
    -> route to Franck / Mark / support based on category
```

The category-to-routing table is owned by CampaignBuilder. It can mirror the
audience matrix in each brain's FAQ section (FindAllProperty §10.2 is the
reference example).

## 7. Social post generation pipeline

```
Trigger (manual or scheduled)
    |
    v
Pick a product (slug) + a platform (linkedin/x/instagram/facebook)
    |
    v
GET product-spec.md + voice-and-tone.md + products-index.json
    |
    v
Extract sections likely to yield a post:
  - "positioning"
  - "value_props" (if present)
  - "differentiation" (if present)
  - "audiences"
    |
    v
Compose LLM prompt with explicit platform rules from voice-and-tone §4
    |
    v
LLM generates draft
    |
    v
Output: { draft_text, brain_commit_sha, generated_at, platform,
          product_slug, status: 'draft' }
    |
    v
Human (Franck or Mark) reviews in CampaignBuilder UI
    |
    v
Approve -> schedule -> publish (with brand asset attached)
Reject  -> log reason -> feed back into prompt-tuning later
```

## 8. What CampaignBuilder MUST log

For every generated output, CampaignBuilder writes:

- `product_slug`
- `brain_commit_sha` (the SHA of `product-spec.md` at generation time)
- `voice_commit_sha` (the SHA of `voice-and-tone.md` at generation time)
- `model_used` (e.g. `claude-sonnet-4-6`)
- `confidence_score` (if available from the model)
- `generation_timestamp`
- `output_status` (`draft` / `needs_review` / `approved` / `published`)
- `reviewer` (when approved)
- `published_at` (when published)
- `platform` (for social) or `recipient_email` (for autoreply)

This log is the audit trail. It must be queryable.

## 9. What's NOT covered by this integration

- **Generation of brand visuals** (logos, post images) — separate workflow,
  not from this repo.
- **CRM contact data** — CampaignBuilder owns this internally. The repo does
  not store prospect data.
- **Sending email** — CampaignBuilder uses its own SMTP / SendGrid setup.
  This repo does not handle email delivery.
- **Scheduling** — CampaignBuilder owns post scheduling.
- **Analytics** — CampaignBuilder owns engagement metrics. The repo does not
  receive feedback from published content.

## 10. Open items for CampaignBuilder team

These are decisions or implementations needed on the CampaignBuilder side
before this integration is functional:

- [ ] Implement YAML frontmatter parser for `.md` files
- [ ] Implement INTERNAL marker stripper (regex
      `<!-- INTERNAL -->[\s\S]*?<!-- /INTERNAL -->`)
- [ ] Implement section extractor (find heading text → read until next same-
      or higher-level heading)
- [ ] Implement 5-minute cache with revalidation against GitHub ETag
- [ ] Implement audit log table per §8
- [ ] Implement approval workflow UI (draft → approved → published)
- [ ] Implement category-routing table for inbound emails
- [ ] Implement confidence-threshold gate (< 0.7 → needs_review)
- [ ] Set up Azure Key Vault secret for the GitHub PAT
- [ ] Set up monitoring / alerting for the failure modes in §5
