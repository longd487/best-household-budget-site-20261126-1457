[![Entered on make.fun](https://img.shields.io/badge/Entered%20on-make.fun-6C5CE7)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![Bounty: $50](https://img.shields.io/badge/Bounty-%2450-green)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![Static site](https://img.shields.io/badge/Static-HTML%20%2F%20CSS%20%2F%20JS-blue)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

# HomeLedger — a household budget site

Entry for make.fun's [**best-household-budget-site-20261126-1457** bounty](https://make.fun/bounty/best-household-budget-site-20261126-1457) ($50, top 10 share $5 each).
Deadline: 29 November 2026, 14:57 UTC.

## What it is

A household budget site for a fictional family (the Alvarez household: two
adults, two children, $6,850 take-home pay a month). It runs entirely offline
from its own static files — no account, no server, no network requests, no
fonts or libraries loaded from anywhere else.

Six pages, every one reached by a link in the header, footer or page body:

| Page | What it does |
| --- | --- |
| **Dashboard** | Income / spent / saved / left-to-assign, spending donut by category, budget health, upcoming bills, latest transactions |
| **Transactions** | All 42 November transactions, filter by category, live search, and an add-transaction form that updates every total on the site |
| **Budget** | Per-category budget vs actual with progress bars; edit any budget and the bars, totals and dashboard update at once; 50/30/20 check |
| **Goals** | Four savings goals with progress bars and working Add $50 / Add $100 buttons, plus an add-goal form |
| **Reports** | Six-month spending/saving bar chart, November by category with share and over/under, and insights computed from the figures |
| **Tools** | Four working calculators: 50/30/20 split, "Can we afford it?", emergency fund, debt payoff |

Every figure is computed from one transaction list in `app/app.js`, so the
totals always agree with each other. The household and its figures are a
fictional sample made to show the site working.

## Run it

```sh
node main.ts            # build: writes app/, screenshots/, dossier.json to /output
node main.ts --serve    # serve app/ at http://127.0.0.1:8080 for local browsing
node main.ts --check    # verify: files exist, links resolve, no network use, screenshots within gate limits
```

Or open `app/index.html` directly in any desktop or phone browser — it works
from `file://` too. Node 22.18 or later. Two builds write identical bytes
(verified: `diff -r` over two output dirs is empty).

## Layout

```
main.ts            entry point: static server + --check verifier (Node stdlib only)
app/
  index.html       all six pages (hash-routed sections)
  styles.css       all styling (system fonts only)
  app.js           data + rendering + all interactions (no libraries)
screenshots/      real renders of the site (desktop + phone)
vendor/
  makefun-frontend.ts   kit vendor file (unchanged), writes the real dossier.json
DOSSIER.md         design decisions, figures and verification notes
LICENSE            MIT
```

## Submission note

`vendor/makefun-frontend.ts` is copied from the competition kit, unchanged.
`main.ts` calls its `buildDossier` with the starter's gate caps
(`text_max_bytes: 163840`, screenshots max 4 × 256 KiB, `app_max_files: 993`,
`app_max_bytes: 16777216`) and writes the returned bytes verbatim to
`dossier.json`, so the build produces the real vendor dossier (about 699 KB,
under the 1.5 MiB limit).

Gate limits verified locally (`node main.ts --check`, 8/8 pass): 4 screenshots,
each ≤ 256 KiB, long side ≤ 1280, short side ≥ 360; `app/index.html` under
1 MiB; `app/` within its file-count and byte limits; no external URLs or
network calls anywhere in `app/`.

<sub>Entered on make.fun — [best-household-budget-site-20261126-1457](https://make.fun/bounty/best-household-budget-site-20261126-1457) bounty entry.</sub>
