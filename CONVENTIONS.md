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
  `portfolio: log decision on Jobs Tracker productisation path`.

## 2. File and folder naming

- **Folders:** `kebab-case`, all lowercase, no spaces, no numbers as prefix
  (`coreproma/`, not `01-coreproma/`). Numbering does not scale to a growing
  portfolio.
- **Files:** `kebab-case.md`, lowercase. Exception: `README.md` and
  `CLAUDE.md` keep their canonical casing.
- **One topic per file.** If a doc grows past ~300 lines or covers two
  unrelated topics, split it.

## 3. One source of truth per topic

Each product has **one** canonical product spec (`product-spec.md`). If
information about a product appears in two files, one of them is wrong.
Reconcile, don't duplicate.

The same applies to cross-product info: portfolio strategy lives in
`_portfolio/`, not scattered in each product folder.

## 4. Editing a file the other person owns

There are no "owners". Edit anything. But:

- **Substantive changes** (rewriting a section, removing content, changing
  a decision) → branch, PR, discuss in the PR.
- **Additions, corrections, comments inline** → fine on `main` if small.
- **If you disagree with something, leave a `> NOTE (Mark, 2026-05-22):
  ...` blockquote in the file rather than deleting silently.** Comments
  in-file are visible to both of us, unlike Git history.

## 5. Marking incomplete work

Three explicit markers, used consistently:

- `TODO:` something one of us still needs to write.
- `TO FILL TOGETHER:` requires a joint decision before it can be written.
- `OPEN DECISION → _portfolio/decisions-ouvertes.md` links to the master list.

Don't leave half-written sentences. Either finish them or mark them.

## 6. Languages

Internal docs are written in **English by default** (so they can be reused
in pitch, code comments, customer-facing material). French may appear in
informal notes or comments but not in canonical docs.

## 7. Sensitive content

This folder is committed to Git. Do **not** put in here:

- API keys, secrets, tokens, passwords.
- Personal data of clients or prospects (use a `.gitignore`-ed
  `_private/` folder, or store off-repo).
- Signed contracts (use the signed-document store, not this folder).

Marketing copy, prospect lists by company (not personal contacts), pricing
plans, strategy, roadmaps — all fine.

## 8. Decisions that affect both products and code

When a portfolio decision (e.g. unifying carbon-tracker between COREPROMA and
Jobs Tracker) implies engineering work in another repository, log it in
`_portfolio/decisions-ouvertes.md` **and** open a tracking issue in the
relevant code repo. This folder is not the issue tracker.
