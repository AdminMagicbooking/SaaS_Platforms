# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this
repository.

## What this workspace is

`SaaS_Projects` is a **portfolio / command-center** workspace — a collection of
independent SaaS ventures, each in its own subdirectory, holding business plans,
product specs, "brains", and scaffolding. It does **not** contain the production
application code for those ventures; each product is developed and deployed from
its own separate repository.

Remote: `https://github.com/AdminMagicbooking/SaaS_Platforms.git` (GitHub).

## Layout

- `coreproma/` — COREPROMA (construction-management SaaS): business plan + product spec
- `SmartGrid/` — SmartGrid / ECOGRID commercial docs and product spec
- `gttourz/` — GTTourz brain + business plans
- `findallproperty/`, `jobstracker/`, `emailrelay/`, `waypointscreator/` — venture entries
- `_portfolio/`, `_templates/` — shared portfolio assets and templates
- `dashboard.html` — portfolio dashboard
- `CONVENTIONS.md` — workspace conventions

## Conventions

See `CONVENTIONS.md` for naming and structure rules across venture folders.

## Note

Each venture's *production code* lives in its own repository, separate from this
portfolio. Do not assume application source, build commands, or deployment
config live here — this workspace is documentation, planning, and scaffolding.
