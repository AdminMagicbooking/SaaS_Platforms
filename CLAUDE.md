# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Where the code lives

This working directory (`SaaS_Projects`) holds no application code. The active
codebase is **Chiola Construction / COREPROMA** at:

```
c:\MPS\ClaudeProject\ChiolaConstruction
```

- Frontend (Vite + React) — repo root
- Backend (Express API) — `server/` subdirectory

That project has its own `CLAUDE.md` at its root containing workflow rules, the
mentor instruction, and the trial/subscription model details — read it for
behavioral guidance. This file covers commands and architecture.

## Commands

All `npm` commands assume the working directory noted; the frontend root and
`server/` are **separate npm packages**.

### Frontend (run from `ChiolaConstruction/`)
- `npm run dev` — Vite dev server on port 5173 (runs `sync-i18n` first)
- `npm run build` — sync i18n locales, then `vite build`
- `npm run lint` — ESLint over the repo
- `npm run typecheck` — `tsc --noEmit -p tsconfig.app.json`
- `npm run test:e2e` — Playwright suite; `:ui` for the debugger; `:setup` re-seeds the e2e admin user
- Single E2E spec: `npx playwright test e2e/tests/<name>.spec.ts`

### Backend (run from `ChiolaConstruction/server/`)
- `npm run dev` — `tsx watch src/index.ts`, API on port 3001
- `npm run build` — `tsc` → `dist/`
- `npm start` — `node dist/index.js` (production entry)

### Environment switching
The backend reads `server/.env`. To switch DB targets, copy the desired file
over it and restart the port-3001 process:
`cp server/.env.production server/.env` or `cp server/.env.local server/.env`.

## Architecture

**Product:** multi-tenant SaaS for construction project management
(budgets, devis/quotes, invoices, site meetings + PV reports, media, client portal).

### ESM + import extensions
The backend is a pure ESM package (`"type": "module"`). Source is `.ts` but
relative imports must use the **`.js`** extension (e.g. `import { getPool } from './db.js'`)
— this is required, not a mistake.

### Backend bootstrap order
`server/src/index.ts` imports `./bootstrap.js` **first**, before any other
module. `bootstrap.ts` loads `.env` and initializes Application Insights before
instrumented modules (express, mssql, http) are imported — reordering these
imports breaks telemetry and env loading.

### Single server, two roles
`index.ts` mounts ~45 route modules under `/api/*` and also serves the built
React SPA from `server/public/` (a catch-all `app.get('*')` returns
`index.html`). The frontend `dist/` is copied into `server/public/` during CI —
the deployed artifact is the `server/` directory alone.

### Database (`server/src/db.ts`)
SQL Server via `mssql`, one lazily-created connection pool. Two auth modes
chosen by whether `DB_USER` is set:
- **SQL auth** (`DB_USER` present) — Azure/production; TLS on unless `DB_ENCRYPT=false`
- **Windows auth** (no `DB_USER`) — local dev against `(localdb)`, uses `msnodesqlv8`

Schema = baseline `server/db/init*.sql` + incremental `server/migrations/NNN_*.sql`.
Migrations are applied by ad-hoc scripts in `server/scripts/` (`apply-NNN.cjs`,
`seed-ci-db.cjs`). When code references a column that may not exist yet, guard
with a one-time `sys.columns` probe (see the `can_add_project` pattern in
`middleware/auth.ts`).

### Auth & authorization (`server/src/middleware/auth.ts`)
`authenticate` decodes a JWT and resolves one of four identity shapes:
1. **Demo mode** (`isDemoMode`) — no DB lookup; hard-blocks all mutations
2. **Admin-only** (`adminOnly`, no tenant) — global admin console
3. **Connect-as** (`isConnectAs`) — admin viewing a tenant they don't belong to
4. **Regular** — user joined to a tenant via `user_roles`

Role guards: `requireEditor`, `requireAdmin`, `requireSlugAdmin`,
`requireGlobalAdmin`, `requireVerified`. The `company` role is blocked by
`requireInternalRole` unless a route opts in with `allowCompany`.

### Multi-tenancy & plan/subscription gating
Data tables carry `tenant_id`; `tenants` reference an `accounts` row by
`account_slug` (the `accounts` row owns subscription state). Gating logic is
centralized in `server/src/middleware/planLimits.ts`:
- `PLAN_CEILINGS` + `effectiveLimit()` — per-resource caps (individual/professional/enterprise),
  with per-tenant `limit_*` overrides, grandfather flag, and internal-slug exemption
- `checkResourceLimit('media_items')` — route middleware; returns 403 `PLAN_LIMIT`
- `isSubscriptionAllowed()` — the trial-vs-Stripe matrix
- **Hard lockout:** `authenticate` itself blocks every mutating request (POST/PUT/PATCH/DELETE)
  for non-admin users whose tenant fails `isSubscriptionAllowed`, except paths under
  `SUBSCRIPTION_EXEMPT_PREFIXES` (auth, payments, admin, public, webhooks, track, support)

### Stripe webhook
`/api/payments/webhook` is mounted with `express.raw()` **before** `express.json()`
so the raw body is available for signature verification.

### Frontend
React 18 + TypeScript + Tailwind, `src/` with `components/`, `pages/`,
`contexts/` (Auth, Modal, Tour), `hooks/`, `lib/api.ts` (API client).
Bilingual (en/fr) via i18next; `src/i18n/*.json` is the source of truth and is
copied to `public/locales/` by the `sync-i18n` step on every dev/build.

## CI/CD

`azure-pipelines.yml` (triggers on `main`): builds frontend + backend, copies
`dist/` into `server/public/`, zips `server/`, deploys to Azure App Service
`chiola` (Node 20, `node dist/index.js`). The Playwright E2E stage is **opt-in**
— enable by setting the pipeline variable `runE2E=true`. See `e2e/README.md`
for the resumable CI-E2E checklist and test accounts.
