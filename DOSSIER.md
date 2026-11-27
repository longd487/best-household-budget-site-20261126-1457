# HomeLedger — dossier

## The household (fictional sample)

The Alvarez household: Maya & Jordan Alvarez, Leo (9) and Sofia (6).
Take-home pay $6,850/month (Maya $3,900 + Jordan $2,950). November 2026.

## The month's figures (all computed from the transaction list)

- Income: **$6,850.00**
- Spending (41 transactions, excluding the savings transfer): **$4,370.00**
- Moved to savings (1 transfer, 5 Nov): **$1,200.00** — savings rate 17.5%
- Left to assign: **$1,280.00**

Spending by category (budget → actual):

| Category | Budget | Actual | Status |
| --- | --- | --- | --- |
| Housing | $1,850 | $1,850.00 | on budget |
| Groceries | $650 | $620.00 | $30.00 left |
| Transport | $320 | $310.00 | $10.00 left |
| Utilities | $260 | $245.00 | $15.00 left |
| Dining out | $250 | $285.00 | **$35.00 over** |
| Entertainment | $150 | $140.00 | $10.00 left |
| Health | $200 | $180.00 | $20.00 left |
| Clothing | $100 | $95.00 | $5.00 left |
| Childcare | $500 | $480.00 | $20.00 left |
| Miscellaneous | $150 | $165.00 | **$15.00 over** |

50/30/20 on $6,850: needs $3,425 / wants $2,055 / savings $1,370.
Actual: needs $3,685 (53.8%), wants $685 (10.0%), savings $1,200 (17.5%,
shown rounded as 18% on the dashboard). Needs run high because rent is 27%
of take-home pay; wants are well inside the 30% line.

Budgeted in total (excluding the savings transfer): $4,430 — $4,370 spent,
99% used, $60 of the plan still unspent.

## Savings goals

- Emergency fund $8,400 / $10,000 (84%) — six months of essential spending
- Family holiday, July 2027: $1,250 / $2,400 (52%)
- New car fund: $3,600 / $9,000 (40%)
- Home deposit top-up: $2,150 / $5,000 (43%)

## Six-month trend (spending, excluding savings)

Jun $4,180 · Jul $4,520 · Aug $4,290 · Sep $4,410 · Oct $4,480 · Nov $4,370.
Average $4,375. November is $5 below the six-month average. Savings each
month: $1,200 / $1,150 / $1,200 / $1,200 / $1,100 / $1,200.

## What every control does

- Header nav and footer links switch pages (hash routes; the back button works).
- Transactions: category filter and live search narrow the 42-row table; the
  add-transaction form appends a row and recomputes every total on the site.
- Budget: editing any monthly budget re-renders the bars, the totals and the
  dashboard figures immediately.
- Goals: Add $50 / Add $100 move the progress bars; the add-goal form creates
  a new goal card.
- Tools: all four calculators recompute on every keystroke. The debt payoff
  calculator runs a real amortisation loop (balance × monthly APR − payment)
  and warns when the payment does not cover the interest.
- Charts are inline SVG generated from the data — no chart library, no images.

## Offline verification

- `node main.ts --check` — files exist, all local references resolve, no
  external URLs, no `fetch`/`XMLHttpRequest`/`WebSocket` calls in `app/`.
- Screenshots in `screenshots/` are real renders of this code in headless
  Chromium (desktop 1440px and phone 390px).
- No build step: `app/index.html` opens directly from `file://`.

## Design decisions

- One data object drives every number, so a figure on the dashboard can never
  disagree with the same figure on the Reports page.
- System font stack and hand-drawn SVG charts: zero network requests, which
  the brief requires, and the site stays fast on a phone.
- Warm, plain design (deep green on cream) with large touch targets and a
  single-column layout under 760px — the site is meant to be used while
  standing in a supermarket as well as at a desk.
