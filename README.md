# HomeLedger — a household budget site

Entry for make.fun's **best-household-budget-site-20261126-1457** bounty ($50, top 10 share $5 each).
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
DOSSIER.md         design decisions, figures and verification notes
LICENSE            MIT
```

## Submission note

`vendor/makefun-frontend.ts` (copied from the competition kit, unchanged) is
**not** in this repository yet: the kit is downloaded at submission time with
the user's approval, and the file is added then. `main.ts` builds without it
— it copies `app/` and `screenshots/` to the output dir and writes
`dossier.json` from a local fallback builder — but the parent must re-run the
build once the vendor file is in place so the kit's `buildDossier` writes the
real `dossier.json`, and re-check with the kit's own `check` before submitting.

Gate limits verified locally (`node main.ts --check`, 7/7 pass): 4 screenshots,
each ≤ 256 KiB, long side ≤ 1280, short side ≥ 360; `app/index.html` under
1 MiB; no external URLs or network calls anywhere in `app/`.
