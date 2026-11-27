/* HomeLedger — a household budget site. Static, offline, no network requests.
   All figures come from the DATA object below; every total on the page is
   computed from it, so the numbers always agree with each other. */

"use strict";

/* ------------------------------------------------------------------ */
/* Data — a fictional sample household, November 2026                  */
/* ------------------------------------------------------------------ */
const DATA = {
  household: "The Alvarez Household",
  members: "Maya & Jordan Alvarez, with Leo (9) and Sofia (6)",
  month: "November 2026",
  asOf: "26 November 2026",
  income: [
    { source: "Maya — take-home pay", amount: 3900 },
    { source: "Jordan — take-home pay", amount: 2950 }
  ],
  categories: [
    { id: "housing",      name: "Housing",      budget: 1850, color: "#1d5c46" },
    { id: "groceries",   name: "Groceries",    budget: 650,  color: "#2e86ab" },
    { id: "transport",   name: "Transport",    budget: 320,  color: "#d98e2b" },
    { id: "utilities",   name: "Utilities",    budget: 260,  color: "#7b5ea7" },
    { id: "dining",      name: "Dining out",   budget: 250,  color: "#c44536" },
    { id: "entertainment", name: "Entertainment", budget: 150, color: "#4a7c59" },
    { id: "health",      name: "Health",       budget: 200,  color: "#3a6ea5" },
    { id: "clothing",    name: "Clothing",     budget: 100,  color: "#8d6b9e" },
    { id: "childcare",   name: "Childcare",    budget: 500,  color: "#b56576" },
    { id: "misc",        name: "Miscellaneous", budget: 150, color: "#6c757d" }
  ],
  // Spending transactions. Category totals are computed from these rows.
  transactions: [
    { date: "2026-11-01", merchant: "Maple Court Apartments — rent", category: "housing", amount: 1850.00 },
    { date: "2026-11-03", merchant: "GreenMart — weekly shop", category: "groceries", amount: 142.35 },
    { date: "2026-11-07", merchant: "GreenMart — top-up shop", category: "groceries", amount: 98.40 },
    { date: "2026-11-12", merchant: "GreenMart — weekly shop", category: "groceries", amount: 156.80 },
    { date: "2026-11-18", merchant: "Corner Market", category: "groceries", amount: 87.25 },
    { date: "2026-11-24", merchant: "GreenMart — weekly shop", category: "groceries", amount: 135.20 },
    { date: "2026-11-02", merchant: "Fuel — Shell Station", category: "transport", amount: 48.20 },
    { date: "2026-11-09", merchant: "Fuel — Shell Station", category: "transport", amount: 52.75 },
    { date: "2026-11-16", merchant: "Fuel — Shell Station", category: "transport", amount: 44.10 },
    { date: "2026-11-05", merchant: "Monthly transit pass", category: "transport", amount: 85.00 },
    { date: "2026-11-14", merchant: "City parking", category: "transport", amount: 24.95 },
    { date: "2026-11-21", merchant: "Tolls", category: "transport", amount: 40.00 },
    { date: "2026-11-25", merchant: "Car wash", category: "transport", amount: 15.00 },
    { date: "2026-11-06", merchant: "Electric — City Power", category: "utilities", amount: 96.40 },
    { date: "2026-11-10", merchant: "Water — City Water", category: "utilities", amount: 42.15 },
    { date: "2026-11-03", merchant: "Internet — FiberLink", category: "utilities", amount: 65.00 },
    { date: "2026-11-20", merchant: "Mobile — two lines", category: "utilities", amount: 41.45 },
    { date: "2026-11-04", merchant: "Trattoria Roma", category: "dining", amount: 42.50 },
    { date: "2026-11-08", merchant: "Sushi House", category: "dining", amount: 28.75 },
    { date: "2026-11-13", merchant: "Burger Joint — family dinner", category: "dining", amount: 63.20 },
    { date: "2026-11-15", merchant: "Café Luna", category: "dining", amount: 35.40 },
    { date: "2026-11-19", merchant: "Pizza Night", category: "dining", amount: 48.90 },
    { date: "2026-11-22", merchant: "Coffee & pastries", category: "dining", amount: 22.30 },
    { date: "2026-11-26", merchant: "Thai takeaway", category: "dining", amount: 43.95 },
    { date: "2026-11-02", merchant: "StreamFlix subscription", category: "entertainment", amount: 15.99 },
    { date: "2026-11-07", merchant: "Cinema — family film", category: "entertainment", amount: 32.00 },
    { date: "2026-11-15", merchant: "Concert tickets", category: "entertainment", amount: 58.00 },
    { date: "2026-11-21", merchant: "Bookshop", category: "entertainment", amount: 18.50 },
    { date: "2026-11-24", merchant: "Arcade games", category: "entertainment", amount: 15.51 },
    { date: "2026-11-05", merchant: "Pharmacy", category: "health", amount: 24.60 },
    { date: "2026-11-11", merchant: "Dentist — copay", category: "health", amount: 85.00 },
    { date: "2026-11-03", merchant: "Gym — Peak Fitness", category: "health", amount: 39.00 },
    { date: "2026-11-18", merchant: "Vitamins & supplements", category: "health", amount: 31.40 },
    { date: "2026-11-09", merchant: "Kids' shoes", category: "clothing", amount: 52.00 },
    { date: "2026-11-23", merchant: "Winter jacket", category: "clothing", amount: 43.00 },
    { date: "2026-11-02", merchant: "After-school club", category: "childcare", amount: 320.00 },
    { date: "2026-11-10", merchant: "School lunches", category: "childcare", amount: 96.00 },
    { date: "2026-11-17", merchant: "School supplies", category: "childcare", amount: 64.00 },
    { date: "2026-11-12", merchant: "Birthday gift", category: "misc", amount: 45.00 },
    { date: "2026-11-19", merchant: "Home repair — faucet", category: "misc", amount: 78.50 },
    { date: "2026-11-22", merchant: "Pet food", category: "misc", amount: 41.50 },
    { date: "2026-11-05", merchant: "Transfer to savings account", category: "savings", amount: 1200.00, transfer: true }
  ],
  goals: [
    { name: "Emergency fund", saved: 8400, target: 10000, note: "Six months of essential spending" },
    { name: "Family holiday — July 2027", saved: 1250, target: 2400, note: "Two weeks by the coast" },
    { name: "New car fund", saved: 3600, target: 9000, note: "Replace the 2016 hatchback" },
    { name: "Home deposit top-up", saved: 2150, target: 5000, note: "For the next move, in 2028" }
  ],
  bills: [
    { due: "1 Dec", name: "Rent — Maple Court Apartments", amount: 1850 },
    { due: "3 Dec", name: "Gym — Peak Fitness", amount: 39 },
    { due: "5 Dec", name: "Electric — City Power (estimate)", amount: 95 },
    { due: "8 Dec", name: "Internet — FiberLink", amount: 65 },
    { due: "15 Dec", name: "Car insurance — annual renewal share", amount: 145 }
  ],
  // Monthly spending excluding savings transfers (Jun–Nov 2026)
  trend: [
    { month: "Jun", spent: 4180, saved: 1200 },
    { month: "Jul", spent: 4520, saved: 1150 },
    { month: "Aug", spent: 4290, saved: 1200 },
    { month: "Sep", spent: 4410, saved: 1200 },
    { month: "Oct", spent: 4480, saved: 1100 },
    { month: "Nov", spent: 4370, saved: 1200 }
  ]
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money0 = (n) => "$" + Math.round(n).toLocaleString("en-US");
const pct = (n) => Math.round(n) + "%";
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const catById = (id) => DATA.categories.find((c) => c.id === id);
const spentByCat = (id) => DATA.transactions
  .filter((t) => t.category === id && !t.transfer)
  .reduce((s, t) => s + t.amount, 0);
const totalIncome = () => DATA.income.reduce((s, i) => s + i.amount, 0);
const totalSpent = () => DATA.transactions.filter((t) => !t.transfer).reduce((s, t) => s + t.amount, 0);
const totalSaved = () => DATA.transactions.filter((t) => t.transfer).reduce((s, t) => s + t.amount, 0);
const totalBudget = () => DATA.categories.reduce((s, c) => s + c.budget, 0);

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */
const ROUTES = ["dashboard", "transactions", "budget", "goals", "reports", "tools"];
function currentRoute() {
  const h = location.hash.replace(/^#\/?/, "") || "dashboard";
  return ROUTES.includes(h) ? h : "dashboard";
}
function render() {
  const route = currentRoute();
  $$(".page").forEach((p) => { p.hidden = p.id !== "page-" + route; });
  $$("nav a").forEach((a) => {
    const on = a.getAttribute("href") === "#/" + route || (route === "dashboard" && a.getAttribute("href") === "#/");
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  document.title = "HomeLedger — " + route[0].toUpperCase() + route.slice(1);
  ({ dashboard: renderDashboard, transactions: renderTransactions, budget: renderBudget,
     goals: renderGoals, reports: renderReports, tools: renderTools })[route]();
}
window.addEventListener("hashchange", render);

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */
function donutSVG(parts, size) {
  const r = 70, cx = 90, cy = 90, total = parts.reduce((s, p) => s + p.value, 0) || 1;
  let a0 = -Math.PI / 2, out = "";
  for (const p of parts) {
    const a1 = a0 + (p.value / total) * Math.PI * 2;
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    out += `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${p.color}"/>`;
    a0 = a1;
  }
  return `<svg viewBox="0 0 180 180" width="${size}" height="${size}" role="img" aria-label="Spending by category chart">${out}<circle cx="90" cy="90" r="42" fill="#fff"/><text x="90" y="86" text-anchor="middle" font-size="15" font-weight="700" fill="#1f2a24">${money0(total)}</text><text x="90" y="104" text-anchor="middle" font-size="10" fill="#5c6b62">spent in Nov</text></svg>`;
}

function renderDashboard() {
  const income = totalIncome(), spent = totalSpent(), saved = totalSaved();
  const left = income - spent - saved;
  const rate = saved / income * 100;
  $("#stat-income").textContent = money0(income);
  $("#stat-spent").textContent = money0(spent);
  $("#stat-saved").textContent = money0(saved);
  $("#stat-left").textContent = money0(left);
  $("#stat-rate").textContent = pct(rate);
  $("#donut").innerHTML = donutSVG(DATA.categories.map((c) => ({ value: spentByCat(c.id), color: c.color })));
  $("#donut-legend").innerHTML = DATA.categories.map((c) => {
    const v = spentByCat(c.id), share = (v / spent * 100);
    return `<li><span class="dot" style="background:${c.color}"></span>${esc(c.name)} <b>${money0(v)}</b> <span class="muted">${share.toFixed(1)}%</span></li>`;
  }).join("");
  const over = DATA.categories.filter((c) => spentByCat(c.id) > c.budget);
  const under = DATA.categories.filter((c) => spentByCat(c.id) <= c.budget)
    .sort((a, b) => (b.budget - spentByCat(b.id)) - (a.budget - spentByCat(a.id))).slice(0, 3);
  $("#health-list").innerHTML =
    (over.length ? over.map((c) => `<li class="over"><b>${esc(c.name)}</b> is ${money0(spentByCat(c.id) - c.budget)} over budget (${money0(spentByCat(c.id))} of ${money0(c.budget)})</li>`).join("") : `<li class="ok">No category is over budget this month.</li>`) +
    under.map((c) => `<li class="under"><b>${esc(c.name)}</b> has ${money0(c.budget - spentByCat(c.id))} left (${money0(spentByCat(c.id))} of ${money0(c.budget)})</li>`).join("");
  $("#bills-list").innerHTML = DATA.bills.map((b) =>
    `<li><span>${esc(b.due)}</span> ${esc(b.name)} <b>${money0(b.amount)}</b></li>`).join("");
  const recent = [...DATA.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  $("#recent-list").innerHTML = recent.map((t) =>
    `<li><span>${t.date.slice(5)}</span> ${esc(t.merchant)} <b class="${t.transfer ? "transfer" : ""}">${t.transfer ? "→ " : "−"}${money(t.amount)}</b></li>`).join("");
}

/* ------------------------------------------------------------------ */
/* Transactions                                                        */
/* ------------------------------------------------------------------ */
let txFilter = "all", txQuery = "";
function renderTransactions() {
  const sel = $("#tx-filter");
  if (sel.options.length === 1) {
    DATA.categories.forEach((c) => {
      const o = document.createElement("option"); o.value = c.id; o.textContent = c.name; sel.appendChild(o);
    });
    const o = document.createElement("option"); o.value = "savings"; o.textContent = "Savings transfers"; sel.appendChild(o);
  }
  sel.value = txFilter;
  $("#tx-search").value = txQuery;
  const rows = DATA.transactions
    .filter((t) => txFilter === "all" || t.category === txFilter)
    .filter((t) => !txQuery || (t.merchant + " " + (catById(t.category)?.name || "Savings")).toLowerCase().includes(txQuery))
    .sort((a, b) => b.date.localeCompare(a.date));
  $("#tx-count").textContent = rows.length + " of " + DATA.transactions.length + " transactions";
  $("#tx-body").innerHTML = rows.map((t) => {
    const cat = t.transfer ? { name: "Savings transfer", color: "#1d5c46" } : catById(t.category);
    return `<tr><td>${t.date}</td><td>${esc(t.merchant)}</td><td><span class="dot" style="background:${cat.color}"></span>${esc(cat.name)}</td><td class="num ${t.transfer ? "transfer" : ""}">${t.transfer ? "→ " : "−"}${money(t.amount)}</td></tr>`;
  }).join("") || `<tr><td colspan="4">No transactions match this filter.</td></tr>`;
  const shown = rows.filter((t) => !t.transfer).reduce((s, t) => s + t.amount, 0);
  $("#tx-total").textContent = "Shown spending: " + money(shown);
}
$("#tx-filter")?.addEventListener("change", (e) => { txFilter = e.target.value; renderTransactions(); });
$("#tx-search")?.addEventListener("input", (e) => { txQuery = e.target.value.trim().toLowerCase(); renderTransactions(); });
$("#tx-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const amount = parseFloat(f.amount.value);
  if (!f.merchant.value.trim() || !(amount > 0)) { $("#tx-msg").textContent = "Enter a description and an amount above $0."; return; }
  DATA.transactions.push({ date: f.date.value || "2026-11-26", merchant: f.merchant.value.trim(), category: f.category.value, amount });
  f.reset(); f.date.value = "2026-11-26";
  $("#tx-msg").textContent = "Added. Totals on every page updated.";
  txFilter = "all"; renderTransactions(); renderDashboard();
});

/* ------------------------------------------------------------------ */
/* Budget                                                              */
/* ------------------------------------------------------------------ */
function renderBudget() {
  const spent = totalSpent(), budget = totalBudget();
  $("#budget-summary").innerHTML =
    `<p><b>${money(spent)}</b> spent of <b>${money(budget)}</b> budgeted (${pct(spent / budget * 100)} used). ` +
    `${money(budget - spent)} of the plan is still unspent.</p>`;
  $("#budget-rows").innerHTML = DATA.categories.map((c) => {
    const s = spentByCat(c.id), use = s / c.budget * 100, over = s > c.budget;
    return `<div class="budget-row">
      <div class="budget-head"><span class="dot" style="background:${c.color}"></span><b>${esc(c.name)}</b>
        <span class="muted">${money(s)} of ${money(c.budget)}</span>
        <span class="badge ${over ? "bad" : "good"}">${over ? "+" + money0(s - c.budget) + " over" : money0(c.budget - s) + " left"}</span></div>
      <div class="bar"><span style="width:${Math.min(100, use).toFixed(1)}%;background:${over ? "#c44536" : c.color}"></span></div>
      <label>Monthly budget: $<input type="number" min="0" step="5" value="${c.budget}" data-cat="${c.id}" class="budget-input" aria-label="${esc(c.name)} budget"> <span class="muted">${use.toFixed(0)}% used</span></label>
    </div>`;
  }).join("");
  $$(".budget-input").forEach((inp) => inp.addEventListener("change", () => {
    const c = catById(inp.dataset.cat);
    const v = parseFloat(inp.value);
    if (v >= 0 && isFinite(v)) { c.budget = v; renderBudget(); renderDashboard(); }
  }));
  const needs = ["housing", "groceries", "transport", "utilities", "health", "childcare"].reduce((s, id) => s + spentByCat(id), 0);
  const wants = ["dining", "entertainment", "clothing", "misc"].reduce((s, id) => s + spentByCat(id), 0);
  const income = totalIncome();
  $("#rule-503020").innerHTML =
    `<p>50 / 30 / 20 on ${money0(income)} take-home pay means <b>${money0(income * 0.5)}</b> needs, <b>${money0(income * 0.3)}</b> wants, <b>${money0(income * 0.2)}</b> savings. ` +
    `This household: needs ${money0(needs)} (${pct(needs / income * 100)}), wants ${money0(wants)} (${pct(wants / income * 100)}), savings ${money0(totalSaved())} (${pct(totalSaved() / income * 100)}). ` +
    `Needs run high because rent is 27% of take-home pay; wants are well inside the 30% line.</p>`;
}

/* ------------------------------------------------------------------ */
/* Goals                                                               */
/* ------------------------------------------------------------------ */
function renderGoals() {
  $("#goal-rows").innerHTML = DATA.goals.map((g, i) => {
    const p = g.saved / g.target * 100;
    return `<div class="card goal-card">
      <h3>${esc(g.name)}</h3><p class="muted">${esc(g.note)}</p>
      <div class="bar"><span style="width:${Math.min(100, p).toFixed(1)}%;background:#1d5c46"></span></div>
      <p><b>${money(g.saved)}</b> of ${money(g.target)} — ${pct(p)} · ${money(g.target - g.saved)} to go</p>
      <p><button data-goal="${i}" data-add="50">Add $50</button> <button data-goal="${i}" data-add="100">Add $100</button></p>
    </div>`;
  }).join("");
  $$("#goal-rows button").forEach((b) => b.addEventListener("click", () => {
    const g = DATA.goals[+b.dataset.goal];
    g.saved = Math.min(g.target, g.saved + +b.dataset.add);
    renderGoals();
  }));
  const totalSavedGoals = DATA.goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = DATA.goals.reduce((s, g) => s + g.target, 0);
  $("#goal-summary").textContent = `${money(totalSavedGoals)} saved across ${DATA.goals.length} goals, of ${money(totalTarget)} in targets.`;
}
$("#goal-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const target = parseFloat(f.target.value), saved = parseFloat(f.saved.value) || 0;
  if (!f.name.value.trim() || !(target > 0)) { $("#goal-msg").textContent = "Give the goal a name and a target above $0."; return; }
  DATA.goals.push({ name: f.name.value.trim(), saved, target, note: "Added 26 November 2026" });
  f.reset(); $("#goal-msg").textContent = "Goal added.";
  renderGoals();
});

/* ------------------------------------------------------------------ */
/* Reports                                                             */
/* ------------------------------------------------------------------ */
function barChartSVG() {
  const max = Math.max(...DATA.trend.map((t) => t.spent + t.saved));
  const W = 640, H = 260, bw = 56, gap = (W - 6 * bw) / 7;
  let out = "";
  DATA.trend.forEach((t, i) => {
    const x = gap + i * (bw + gap);
    const hS = t.spent / max * (H - 50), hV = t.saved / max * (H - 50);
    out += `<rect x="${x}" y="${(H - 30 - hS).toFixed(1)}" width="${bw}" height="${hS.toFixed(1)}" fill="#2e86ab"><title>${t.month}: spent ${money(t.spent)}</title></rect>`;
    out += `<rect x="${x}" y="${(H - 30 - hS - hV).toFixed(1)}" width="${bw}" height="${hV.toFixed(1)}" fill="#1d5c46"><title>${t.month}: saved ${money(t.saved)}</title></rect>`;
    out += `<text x="${x + bw / 2}" y="${H - 10}" text-anchor="middle" font-size="12" fill="#1f2a24">${t.month}</text>`;
    out += `<text x="${x + bw / 2}" y="${(H - 38 - hS - hV).toFixed(1)}" text-anchor="middle" font-size="11" fill="#1f2a24">${money0(t.spent + t.saved)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Monthly spending and saving, June to November 2026">${out}</svg>`;
}
function renderReports() {
  $("#trend-chart").innerHTML = barChartSVG();
  const spent = totalSpent();
  $("#cat-table").innerHTML = DATA.categories.map((c) => {
    const v = spentByCat(c.id);
    return `<tr><td><span class="dot" style="background:${c.color}"></span>${esc(c.name)}</td><td class="num">${money(v)}</td><td class="num">${(v / spent * 100).toFixed(1)}%</td><td class="num">${money(c.budget)}</td><td class="num ${v > c.budget ? "over-text" : ""}">${v > c.budget ? "+" + money0(v - c.budget) : "−" + money0(c.budget - v)}</td></tr>`;
  }).join("");
  const avg = DATA.trend.reduce((s, t) => s + t.spent, 0) / DATA.trend.length;
  const top = DATA.categories.map((c) => ({ name: c.name, v: spentByCat(c.id) })).sort((a, b) => b.v - a.v)[0];
  const overCats = DATA.categories.filter((c) => spentByCat(c.id) > c.budget).map((c) => c.name);
  $("#insights").innerHTML =
    `<li>Housing is the largest cost: ${money(spentByCat("housing"))}, ${pct(spentByCat("housing") / spent * 100)} of all spending — rent alone is 27% of take-home pay.</li>` +
    `<li>Average monthly spending over the last 6 months is ${money0(avg)}; November (${money0(spent)}) is ${money0(avg - spent)} below that average.</li>` +
    `<li>Savings rate is ${pct(totalSaved() / totalIncome() * 100)} of take-home pay (${money(totalSaved())} of ${money(totalIncome())}), just below the 20% guideline — the household is close, and dining out is the easiest place to find the gap.</li>` +
    (overCats.length
      ? `<li>Over budget this month: ${overCats.join(", ")}. Dining out is the one to watch — ${money(spentByCat("dining"))} against a ${money(catById("dining").budget)} budget, the third month running it has overshot.</li>`
      : `<li>No category is over budget this month.</li>`) +
    `<li>Biggest single outlay after rent: the ${money(320)} after-school club payment on 2 November.</li>`;
}

/* ------------------------------------------------------------------ */
/* Tools — four working calculators                                    */
/* ------------------------------------------------------------------ */
const boundCalcs = new Set();
function bindCalc(id, fn) {
  const form = $(id);
  if (!form) return;
  if (!boundCalcs.has(id)) {
    boundCalcs.add(id);
    form.addEventListener("input", () => { $(id + "-out").innerHTML = fn(new FormData(form)); });
  }
  $(id + "-out").innerHTML = fn(new FormData(form));
}
function renderTools() {
  bindCalc("#calc-split", (d) => {
    const pay = parseFloat(d.get("pay")) || 0;
    if (pay <= 0) return "Enter your monthly take-home pay.";
    return `On ${money0(pay)} a month: needs <b>${money0(pay * 0.5)}</b> · wants <b>${money0(pay * 0.3)}</b> · savings <b>${money0(pay * 0.2)}</b>. ` +
      `This household's actual split is ${pct(["housing", "groceries", "transport", "utilities", "health", "childcare"].reduce((s, id) => s + spentByCat(id), 0) / totalIncome() * 100)} needs / ` +
      `${pct(["dining", "entertainment", "clothing", "misc"].reduce((s, id) => s + spentByCat(id), 0) / totalIncome() * 100)} wants / ${pct(totalSaved() / totalIncome() * 100)} savings.`;
  });
  bindCalc("#calc-afford", (d) => {
    const price = parseFloat(d.get("price")) || 0, months = parseFloat(d.get("months")) || 1;
    if (price <= 0) return "Enter the price of what you want to buy.";
    const per = price / months, buffer = totalIncome() - totalSpent() - totalSaved();
    const ok = per <= buffer;
    return `Saving ${money(per)} a month for ${months} month${months === 1 ? "" : "s"} buys it in full. ` +
      `This household has ${money(buffer)} a month unassigned, so that is <b>${ok ? "affordable" : "not affordable without cutting something else"}</b>.` +
      (ok ? "" : ` Stretch it to ${Math.ceil(price / buffer)} months at ${money(buffer)} a month instead.`);
  });
  bindCalc("#calc-emergency", (d) => {
    const monthly = parseFloat(d.get("monthly")) || 0, months = parseFloat(d.get("months")) || 6;
    if (monthly <= 0) return "Enter your essential monthly spending.";
    const target = monthly * months, have = DATA.goals[0].saved;
    return `A ${months}-month cushion needs <b>${money0(target)}</b>. The emergency fund holds ${money0(have)} — ${have >= target ? "covered, with " + money0(have - target) + " to spare." : money0(target - have) + " short. At " + money0(totalSaved()) + " a month it takes " + Math.ceil((target - have) / totalSaved()) + " month(s) to close the gap."}`;
  });
  bindCalc("#calc-debt", (d) => {
    const bal = parseFloat(d.get("balance")) || 0, apr = parseFloat(d.get("apr")) || 0, pay = parseFloat(d.get("pay")) || 0;
    if (bal <= 0 || pay <= 0) return "Enter a balance and a monthly payment.";
    const r = apr / 100 / 12;
    if (r > 0 && pay <= bal * r) return `A ${money0(pay)} payment does not cover the ${money0(bal * r)} monthly interest — the balance would grow. Pay at least ${money0(bal * r + 1)} a month.`;
    let b = bal, months = 0, interest = 0;
    while (b > 0 && months < 600) { const i = b * r; interest += i; b = b + i - pay; months++; }
    if (b > 0) return "That payment never clears the balance.";
    return `Paid off in <b>${months} month${months === 1 ? "" : "s"}</b> (${(months / 12).toFixed(1)} years), costing ${money0(interest)} in interest on top of the ${money0(bal)} borrowed.`;
  });
}

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  $("#household-name").textContent = DATA.household;
  $("#household-sub").textContent = DATA.members + " · " + DATA.month + " · figures as of " + DATA.asOf;
  $$("[data-month]").forEach((el) => { el.textContent = DATA.month; });
  render();
});
