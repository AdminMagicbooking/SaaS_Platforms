# Conventions — Editing & Collaboration

These rules exist so the two of us can edit this folder without stepping on
each other's work. They are short on purpose. If a rule is wrong, change it
in a PR — don't ignore it.

## 1. Git workflow

The folder is a Git repository. Both Franck and Mark have direct write
access.

- **Never push directly to `main` for substantive changes.** Open a short-
  lived feature branch (`mark/strategy-q3`, `franck/coreproma-metrics`),
  commit, push, open a PR, merge.
- **Tiny corrections** (typos, broken links, formatting) may go straight to
  `main`. Use judgement — if the other person would want to see it before
  it lands, branch.
- **Never force-push to `main`.** History is shared.
- **Commit messages are written in full sentences**, not "wip" or "stuff".
  Example: `coreproma: add UK pricing column to spec` or
  `jobstracker: log Gaswise go-live in journal`.
- **Rename and move with `git mv`**, never with Explorer. Explorer moves lose
  history and leave git with a delete + an untracked folder.

## 2. File and folder naming

- **Folders:** `kebab-case`, all lowercase, no spaces, no numbers as prefix
  (`coreproma/`, `ecogrid-resort/`, not `EcoGridResort/`). Numbering does not
  scale to a growing portfolio.
- **Files:** `kebab-case.md`, lowercase. Exception: `README.md`,
  `CLAUDE.md`, `CONVENTIONS.md` keep their canonical casing.
- **One topic per file.** If a doc grows past ~300 lines or covers two
  unrelated topics, split it.

## 3. What lives where

- **Code and deployment** live in the app repo under `D:\ClaudeProjects\<App>`.
  Mapping in `CLAUDE.md`.
- **Everything non-code** for a venture lives in its folder here: product
  spec, business plan, commercial material, investor material, contracts,
  client/partner source documents.
- Each venture folder has, at its root:
  - `product-spec.md` — the **one** canonical product spec. If information
    about a product appears in two files, one of them is wrong. Reconcile,
    don't duplicate.
  - `journal.md` — the dated event log of what was done here for that
    venture (see `CLAUDE.md` for the rule and the entry format). It is also
    the decision record: a decision taken or left open is logged there, in
    the venture it concerns.
  - `contracts/` — customer agreements (unsigned drafts only, see §7).
- `_portfolio/` holds **only** the two files CampaignBuilder fetches
  (`products-index.json`, `voice-and-tone.md`). Do not add anything else
  there; cross-product notes go in the journal of the venture most concerned.

## 4. Editing a file the other person owns

There are no "owners". Edit anything. But:

- **Substantive changes** (rewriting a section, removing content, changing
  a decision) → branch, PR, discuss in the PR.
- **Additions, corrections, comments inline** → fine on `main` if small.
- **If you disagree with something, leave a `> NOTE (Mark, 2026-05-22):
  ...` blockquote in the file rather than deleting silently.** Comments
  in-file are visible to both of us, unlike Git history.

## 5. Marking incomplete work

Two explicit markers, used consistently:

- `TODO:` something one of us still needs to write.
- `TO FILL TOGETHER:` requires a joint decision before it can be written.

Don't leave half-written sentences. Either finish them or mark them.

## 6. Languages

Internal docs are written in **English by default** (so they can be reused
in pitch, code comments, customer-facing material). French may appear in
informal notes or comments but not in canonical docs.

## 7. Sensitive content

This folder is committed to Git. Do **not** put in here:

- API keys, secrets, tokens, passwords.
- Personal data of clients or prospects — prospect lists with names, e-mails
  or phone numbers. `**/prospects/` and `_private/` are git-ignored for that
  reason; keep such files there or off-repo.
- Signed contracts (use the signed-document store, not this folder).

Marketing copy, prospect lists by company (not personal contacts), pricing
plans, strategy, roadmaps — all fine.

`.gitignore` also excludes scratch and build output (`tmp/`, `output/`,
`**/working/`, `**/.build/`, lock files). Don't `git add -f` around it.

## 8. Decisions that affect both products and code

When a decision in a venture's journal implies engineering work in its app
repo, open a tracking issue in that code repo and reference it in the journal
entry. This folder is not the issue tracker.

## 9. This repo is consumed by CampaignBuilder

The internal tool **CampaignBuilder** (Azure-hosted) reads
`_portfolio/products-index.json`, every `<venture>/product-spec.md` listed in
it, and `_portfolio/voice-and-tone.md` to generate marketing content and
autoreply to prospect emails. Cache TTL is 5 minutes, so any edit lands in
production within minutes.

Before committing a change to any `product-spec.md`:

- Verify the YAML frontmatter at the top is intact and accurate (the
  `ai_safe_for_autoreply` and `ai_safe_for_social_post` flags in particular).
- Wrap any pilot customer name, internal decision, or unannounced feature
  in `<!-- INTERNAL --> ... <!-- /INTERNAL -->` markers so CampaignBuilder
  strips them before publication.
- If you change a section heading that appears in `products-index.json`,
  update the JSON to match. CampaignBuilder locates sections by exact
  heading text.
- If you **rename or move a venture folder**, update `spec_path` and
  `raw_url` in `products-index.json` in the same commit, or the product goes
  `unavailable` in CampaignBuilder.

See `campaignbuilder/integration-contract.md` for the full data contract.
