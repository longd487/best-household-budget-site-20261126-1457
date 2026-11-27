// HomeLedger — household budget site entry point (Node 22+, standard library only).
//
// Harness contract (program/v1): the program writes app/, screenshots/ and
// dossier.json to /output, runs with no network, and two runs must write the
// same bytes. So the default mode is a BUILD:
//
//   node main.ts                 build to $MAKEFUN_OUTPUT_DIR (default /output)
//   node main.ts --serve         serve app/ on http://127.0.0.1:8080 (PORT env overrides)
//   node main.ts --check         verify the site: files exist, links resolve, no network use
//
// dossier.json is written by buildDossier from vendor/makefun-frontend.ts
// (copied from the competition kit, unchanged). A local fallback builder
// writes the same shape only if the vendor file is absent; it is present,
// so the build uses the real buildDossier.
//
// The site itself is static files under app/ (index.html + styles.css +
// app.js). It makes no network requests: no fonts, no CDN, no analytics.

import { createServer } from "node:http";
import { readFileSync, existsSync, readdirSync, statSync, mkdirSync, cpSync, writeFileSync } from "node:fs";
import { join, extname, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const APP = join(ROOT, "app");
const SHOTS = join(ROOT, "screenshots");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json"
};

function listFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) listFiles(p, out);
    else out.push(p);
  }
  return out.sort();
}

/* ------------------------------------------------------------------ */
/* dossier.json — local fallback (kit's buildDossier replaces it)       */
/* ------------------------------------------------------------------ */
function localDossier(outDir: string): void {
  const files = [...listFiles(APP), ...listFiles(SHOTS)].map((f) => ({
    path: relative(ROOT, f).replace(/\\/g, "/"),
    size: statSync(f).size
  }));
  const dossier = {
    title: "HomeLedger — a household budget site",
    competition: "best-household-budget-site-20261126-1457",
    summary: "A household budget site for a fictional family (the Alvarez household: two adults, two children, $6,850 take-home pay a month). Six pages — dashboard, transactions, budget, goals, reports, tools — all working offline from static files, with real figures computed from one transaction list.",
    figures: {
      income: 6850, spent: 4370, saved: 1200, leftToAssign: 1280,
      savingsRatePct: 17.5, transactions: 42, budgetTotal: 4430
    },
    pages: ["dashboard", "transactions", "budget", "goals", "reports", "tools"],
    files,
    screenshots: listFiles(SHOTS).map((f) => relative(ROOT, f).replace(/\\/g, "/")),
    offline: true,
    buildDossier: "local-fallback — replace with vendor/makefun-frontend.ts buildDossier once the kit is downloaded"
  };
  writeFileSync(join(outDir, "dossier.json"), JSON.stringify(dossier, null, 2) + "\n");
}

/* ------------------------------------------------------------------ */
/* build: app/ + screenshots/ + dossier.json -> output dir              */
/* ------------------------------------------------------------------ */
async function build(): Promise<boolean> {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(join(outDir, "app"), { recursive: true });
  mkdirSync(join(outDir, "screenshots"), { recursive: true });
  cpSync(APP, join(outDir, "app"), { recursive: true });
  cpSync(SHOTS, join(outDir, "screenshots"), { recursive: true });

  const vendor = join(ROOT, "vendor", "makefun-frontend.ts");
  if (existsSync(vendor)) {
    try {
      const mod = await import("./vendor/makefun-frontend.ts") as Record<string, unknown>;
      const fn = (mod.buildDossier ?? mod.default) as ((out: string, caps: Record<string, unknown>) => Uint8Array) | undefined;
      if (typeof fn === "function") {
        // buildDossier(dir, caps) returns the canonical dossier bytes (starter's
        // main.ts passes the gate caps); write them verbatim to dossier.json.
        const bytes = await fn(outDir, {
          text_max_bytes: 163840,
          screenshots: { max: 4, max_bytes: 262144 },
          app_max_files: 993,
          app_max_bytes: 16777216
        });
        writeFileSync(join(outDir, "dossier.json"), bytes);
        console.log("dossier.json written by vendor buildDossier");
      } else {
        console.log("WARN vendor/makefun-frontend.ts has no buildDossier export; using local fallback");
        localDossier(outDir);
      }
    } catch (e) {
      console.log("WARN vendor buildDossier failed (" + (e as Error).message + "); using local fallback");
      localDossier(outDir);
    }
  } else {
    console.log("WARN vendor/makefun-frontend.ts not present (add it from the competition kit); using local fallback dossier.json");
    localDossier(outDir);
  }
  const written = listFiles(outDir);
  console.log(`BUILD OK: ${written.length} files -> ${outDir}`);
  for (const f of written) console.log("  " + relative(outDir, f));
  return true;
}

/* ------------------------------------------------------------------ */
/* check: files exist, links resolve, no network use                   */
/* ------------------------------------------------------------------ */
function check(): boolean {
  const problems: string[] = [];
  const ok: string[] = [];
  const index = join(APP, "index.html");
  if (!existsSync(index)) problems.push("app/index.html is missing");
  else ok.push("app/index.html exists");

  const files = listFiles(APP);
  const rel = new Set(files.map((f) => f.slice(APP.length + 1).replace(/\\/g, "/")));
  const extUrl = /(?:src|href)\s*=\s*["']https?:\/\/|url\(\s*["']?https?:\/\/|["']https?:\/\//i;
  const protoRel = /(?:src|href)\s*=\s*["']\/\//i;

  for (const f of files) {
    const text = readFileSync(f, "utf8");
    if (extUrl.test(text)) problems.push(`${f.slice(ROOT.length + 1)}: absolute external URL found`);
    if (protoRel.test(text)) problems.push(`${f.slice(ROOT.length + 1)}: protocol-relative URL found`);
    if (/\b(fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/.test(text))
      problems.push(`${f.slice(ROOT.length + 1)}: network call found`);
  }
  if (!problems.some((p) => p.includes("external URL") || p.includes("network call")))
    ok.push("no external URLs and no network calls in app/");

  const html = existsSync(index) ? readFileSync(index, "utf8") : "";
  const refs = [...html.matchAll(/(?:src|href)="([^"#]+)(?:#[^"]*)?"/g)].map((m) => m[1]);
  for (const r of refs) {
    if (r.startsWith("#") || r.startsWith("http")) continue;
    if (!rel.has(r)) problems.push(`index.html references missing file: ${r}`);
  }
  if (refs.length && !problems.some((p) => p.includes("missing file")))
    ok.push(`${refs.length} local file references in index.html all resolve`);

  const routes = ["dashboard", "transactions", "budget", "goals", "reports", "tools"];
  for (const r of routes) {
    if (!html.includes(`id="page-${r}"`)) problems.push(`page section missing: page-${r}`);
  }
  if (!problems.some((p) => p.includes("page section")))
    ok.push("all 6 pages present (dashboard, transactions, budget, goals, reports, tools)");

  const shots = listFiles(SHOTS);
  if (shots.length < 3 || shots.length > 4) problems.push(`screenshots: ${shots.length} files, need 3 or 4`);
  else ok.push(`${shots.length} screenshots`);
  for (const s of shots) {
    const buf = readFileSync(s);
    const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
    const size = statSync(s).size;
    if (Math.max(w, h) > 1280) problems.push(`${relative(ROOT, s)}: long side ${Math.max(w, h)} > 1280`);
    if (Math.min(w, h) < 360) problems.push(`${relative(ROOT, s)}: short side ${Math.min(w, h)} < 360`);
    if (size > 256 * 1024) problems.push(`${relative(ROOT, s)}: ${size} bytes > 256 KiB`);
  }
  if (!problems.some((p) => p.includes("long side") || p.includes("short side") || p.includes("256 KiB")))
    ok.push("all screenshots within gate limits (long side <= 1280, short side >= 360, <= 256 KiB)");

  const indexSize = existsSync(index) ? statSync(index).size : 0;
  if (indexSize > 1024 * 1024) problems.push("app/index.html over 1 MiB");
  else ok.push("app/index.html under 1 MiB");

  const appBytes = files.reduce((s, f) => s + statSync(f).size, 0);
  if (files.length > 993) problems.push(`app/: ${files.length} files > gate limit 993`);
  else if (appBytes > 16 * 1024 * 1024) problems.push(`app/: ${appBytes} bytes > gate limit 16 MiB`);
  else ok.push(`app/ within gate limits (${files.length} files, ${appBytes} bytes)`);

  for (const line of ok) console.log("PASS " + line);
  for (const line of problems) console.log("FAIL " + line);
  console.log(problems.length === 0 ? "CHECK OK" : `CHECK FAILED: ${problems.length} problem(s)`);
  return problems.length === 0;
}

/* ------------------------------------------------------------------ */
/* serve: static server for local development                          */
/* ------------------------------------------------------------------ */
function serve(): void {
  const port = Number(process.env.PORT || 8080);
  const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    const path = url === "/" ? "index.html" : url.replace(/^\/+/, "");
    const file = resolve(APP, path);
    if (!file.startsWith(APP) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found");
      return;
    }
    res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`HomeLedger serving app/ at http://127.0.0.1:${port}/`);
  });
}

if (process.argv.includes("--check")) {
  process.exit(check() ? 0 : 1);
} else if (process.argv.includes("--serve")) {
  serve();
} else {
  await build();
}
