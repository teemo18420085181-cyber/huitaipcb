import { createSign } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const ENV_FILE = path.join(ROOT, ".env.local");
const REPORT_DIR = path.join(ROOT, "docs", "reports");
const DEFAULT_SITE = "sc-domain:huitaipcb.com";
const URL_PREFIX_SITE = "https://huitaipcb.com/";
const API_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const REPORT_TIME_ZONE = "Asia/Shanghai";
const PRIORITY_PAGES = [
  "/turnkey-pcb-assembly",
  "/bom-sourcing-pcb-assembly",
  "/china-pcb-assembly",
  "/prototype-pcb-assembly",
  "/low-volume-pcba-assembly",
  "/pcb-assembly-company",
  "/contact",
];

if (existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function dateOffset(days) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en", {
      timeZone: REPORT_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date())
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  const date = new Date(Date.UTC(parts.year, Number(parts.month) - 1, parts.day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function getCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const file = path.resolve(ROOT, process.env.GOOGLE_APPLICATION_CREDENTIALS);
    return JSON.parse(await readFile(file, "utf8"));
  }

  const clientEmail =
    process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  return clientEmail && privateKey
    ? { client_email: clientEmail, private_key: privateKey }
    : null;
}

function missingCredentialNames() {
  if (
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS
  ) {
    return [];
  }
  return [
    !process.env.GOOGLE_CLIENT_EMAIL && "GOOGLE_CLIENT_EMAIL",
    !process.env.GOOGLE_PRIVATE_KEY && "GOOGLE_PRIVATE_KEY",
  ].filter(Boolean);
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: API_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const assertion = `${unsigned}.${signer.sign(credentials.private_key, "base64url")}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(`Google authentication failed: ${JSON.stringify(data).slice(0, 800)}`);
  }
  return data.access_token;
}

async function queryGsc(token, siteUrl, range, dimensions = [], rowLimit = 25) {
  const body = { ...range, type: "web", rowLimit };
  if (dimensions.length) body.dimensions = dimensions;

  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    const hint =
      siteUrl === DEFAULT_SITE
        ? ` Set GSC_SITE_URL=${URL_PREFIX_SITE} if only the URL-prefix property is available.`
        : "";
    throw new Error(`GSC query failed (${response.status}): ${JSON.stringify(data).slice(0, 800)}${hint}`);
  }
  return data.rows || [];
}

function metrics(row = {}) {
  return {
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  };
}

function escapeCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function pct(value) {
  return `${((value || 0) * 100).toFixed(2)}%`;
}

function pos(value) {
  return (value || 0).toFixed(2);
}

function byImpressions(rows) {
  return [...rows].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  );
}

function suggestedPage(query) {
  const value = query.toLowerCase();
  if (/bom|component|shortage|obsolete|alternative part/.test(value)) {
    return "/bom-sourcing-pcb-assembly";
  }
  if (/prototype|startup hardware/.test(value)) return "/prototype-pcb-assembly";
  if (/low.?volume|small batch|5 pcs|10 pcs|100 pcs|500 pcs/.test(value)) {
    return "/low-volume-pcba-assembly";
  }
  if (/quote|quotation|upload|gerber|contact/.test(value)) return "/contact";
  if (/china/.test(value)) return "/china-pcb-assembly";
  if (/company|manufacturer|supplier/.test(value)) return "/pcb-assembly-company";
  return "/turnkey-pcb-assembly";
}

function queryAction(row) {
  if (row.position <= 30) {
    return "Review title and H1; add a matching FAQ and clear quote CTA.";
  }
  return "Add contextual internal links and a matching FAQ before changing the title.";
}

function summaryTable(ranges, seven, twentyEight) {
  const rows = [
    ["Last 7 days", ranges.seven, seven],
    ["Last 28 days", ranges.twentyEight, twentyEight],
  ];
  return [
    "| Period | Date range | Total clicks | Total impressions | Average CTR | Average position |",
    "| --- | --- | ---: | ---: | ---: | ---: |",
    ...rows.map(
      ([label, range, data]) =>
        `| ${label} | ${range.startDate} to ${range.endDate} | ${data.clicks} | ${data.impressions} | ${pct(data.ctr)} | ${pos(data.position)} |`,
    ),
  ].join("\n");
}

function topQueryTable(rows) {
  if (!rows.length) return "No live query data available.";
  return [
    "| Query | Clicks | Impressions | CTR | Position |",
    "| --- | ---: | ---: | ---: | ---: |",
    ...byImpressions(rows)
      .slice(0, 25)
      .map(
        (row) =>
          `| ${escapeCell(row.keys?.[0] || "(not set)")} | ${row.clicks || 0} | ${row.impressions || 0} | ${pct(row.ctr)} | ${pos(row.position)} |`,
      ),
  ].join("\n");
}

function lowCtrTable(rows) {
  const opportunities = byImpressions(rows).filter(
    (row) =>
      row.impressions >= 5 &&
      row.position <= 80 &&
      (row.clicks === 0 || row.ctr < 0.02),
  );
  if (!opportunities.length) return "No low-CTR opportunities matched the current filters.";
  return [
    "Filters: impressions >= 5, position <= 80, and clicks = 0 or CTR < 2%.",
    "",
    "| Query | Clicks | Impressions | CTR | Position | Suggested page | Suggested update |",
    "| --- | ---: | ---: | ---: | ---: | --- | --- |",
    ...opportunities.slice(0, 20).map((row) => {
      const query = row.keys?.[0] || "(not set)";
      return `| ${escapeCell(query)} | ${row.clicks || 0} | ${row.impressions || 0} | ${pct(row.ctr)} | ${pos(row.position)} | ${suggestedPage(query)} | ${queryAction(row)} |`;
    }),
  ].join("\n");
}

function strikingTable(rows) {
  const opportunities = byImpressions(rows).filter(
    (row) => row.impressions > 0 && row.position >= 20 && row.position <= 80,
  );
  if (!opportunities.length) return "No striking-distance keywords matched the current filters.";
  return [
    "Filters: position 20-80 and impressions > 0.",
    "",
    "| Query | Impressions | Clicks | CTR | Position | Suggested page |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
    ...opportunities.slice(0, 25).map((row) => {
      const query = row.keys?.[0] || "(not set)";
      return `| ${escapeCell(query)} | ${row.impressions || 0} | ${row.clicks || 0} | ${pct(row.ctr)} | ${pos(row.position)} | ${suggestedPage(query)} |`;
    }),
  ].join("\n");
}

function pageRecommendation(row) {
  const notes = [];
  if (row.impressions > 0 && row.clicks === 0) {
    notes.push("Impressions without clicks; review title and description");
  } else if (row.impressions >= 5 && row.ctr < 0.02) {
    notes.push("Low CTR; strengthen search-intent match");
  }
  if (row.position >= 20 && row.position <= 80) {
    notes.push("Add contextual internal links");
  }
  if (
    row.impressions >= 5 &&
    (row.clicks === 0 || (row.position >= 20 && row.position <= 80))
  ) {
    notes.push("July 1 optimization candidate");
  }
  return notes.join("; ") || "Monitor";
}

function pageTable(rows) {
  if (!rows.length) return "No live page data available.";
  return [
    "| Page | Clicks | Impressions | CTR | Position | Opportunity |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
    ...byImpressions(rows)
      .slice(0, 25)
      .map(
        (row) =>
          `| ${escapeCell(row.keys?.[0] || "(not set)")} | ${row.clicks || 0} | ${row.impressions || 0} | ${pct(row.ctr)} | ${pos(row.position)} | ${pageRecommendation(row)} |`,
      ),
  ].join("\n");
}

function breakdownTable(rows, label) {
  if (!rows.length) return `No live ${label.toLowerCase()} data available.`;
  return [
    `| ${label} | Clicks | Impressions | CTR | Position |`,
    "| --- | ---: | ---: | ---: | ---: |",
    ...byImpressions(rows)
      .slice(0, 15)
      .map(
        (row) =>
          `| ${escapeCell(row.keys?.[0] || "(not set)")} | ${row.clicks || 0} | ${row.impressions || 0} | ${pct(row.ctr)} | ${pos(row.position)} |`,
      ),
  ].join("\n");
}

function internalLinkTable() {
  return `| Source page | Destination page | Suggested anchor | Reason |
| --- | --- | --- | --- |
| /pcb-assembly-company | /turnkey-pcb-assembly | China-based turnkey PCBA manufacturer | Clarify the full-service offer |
| /turnkey-pcb-assembly | /bom-sourcing-pcb-assembly | BOM sourcing and component shortage review | Connect turnkey scope with sourcing risk |
| /bom-sourcing-pcb-assembly | /contact | send your BOM for sourcing risk review | Move high-intent visitors toward RFQ |
| /china-pcb-assembly | /turnkey-pcb-assembly | turnkey PCB assembly in China | Separate China-supplier and turnkey intent |
| /prototype-pcb-assembly | /low-volume-pcba-assembly | move from prototype to low-volume PCBA | Support the next production stage |
| /low-volume-pcba-assembly | /contact | request a low-volume PCBA review | Add a direct conversion path |
| /turnkey-pcb-assembly | /contact | upload Gerber and BOM for engineering review | Reinforce the primary quote action |`;
}

function nextActions(queries, pages, sample) {
  if (sample) {
    return [
      "Enable the Google Search Console API in the Google Cloud project.",
      `Grant the service account access to ${DEFAULT_SITE} in Search Console.`,
      "Add GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY to .env.local.",
      "Run npm run report:gsc again to replace sample mode with live data.",
    ];
  }

  const lowCtr = byImpressions(queries).find(
    (row) => row.impressions >= 5 && row.position <= 80 && (row.clicks === 0 || row.ctr < 0.02),
  );
  const striking = byImpressions(queries).find(
    (row) => row.impressions > 0 && row.position >= 20 && row.position <= 80,
  );
  const zeroClickPage = byImpressions(pages).find(
    (row) => row.impressions >= 5 && row.clicks === 0,
  );
  const actions = [];
  if (lowCtr) {
    const query = lowCtr.keys?.[0] || "the highest-impression low-CTR query";
    actions.push(`Review title, H1, FAQ, and CTA alignment for "${query}" on ${suggestedPage(query)}.`);
  }
  if (striking) {
    const query = striking.keys?.[0] || "the leading striking-distance query";
    actions.push(`Add one or two contextual internal links toward ${suggestedPage(query)} for "${query}".`);
  }
  if (zeroClickPage) {
    actions.push(`Schedule ${zeroClickPage.keys?.[0]} for the July 1 title and description review.`);
  }
  actions.push("Check that each priority service page links to /contact with an intent-specific anchor.");
  actions.push("Use the Page Opportunities table to select one July 1 update instead of changing several pages at once.");
  actions.push("Rerun this report after the next GSC data refresh before changing additional pages.");
  return actions.slice(0, 5);
}

function renderReport({ siteUrl, ranges, seven, twentyEight, queries, pages, countries, devices, sample }) {
  const modeNote = sample
    ? "> Sample mode: Google credentials are missing, so no live GSC metrics are shown."
    : "> Live data from the Google Search Console Search Analytics API.";
  const actions = nextActions(queries, pages, sample)
    .map((action, index) => `${index + 1}. ${action}`)
    .join("\n");

  return `# GSC Daily Report - ${dateOffset(0)}

${modeNote}

## A. Summary

Site: \`${siteUrl}\`
Search type: Web
Priority pages: ${PRIORITY_PAGES.map((page) => `\`${page}\``).join(", ")}

${summaryTable(ranges, seven, twentyEight)}

## B. Top Queries

Sorted by impressions for the last 28 days.

${topQueryTable(queries)}

## C. Low CTR Opportunities

${lowCtrTable(queries)}

## D. Striking Distance Keywords

${strikingTable(queries)}

## E. Page Opportunities

${pageTable(pages)}

## F. Internal Link Suggestions

${internalLinkTable()}

## Traffic Breakdown

### Top Countries

${breakdownTable(countries, "Country")}

### Top Devices

${breakdownTable(devices, "Device")}

## G. Next Actions

${actions}
`;
}

async function writeReport(fileName, report) {
  await mkdir(REPORT_DIR, { recursive: true });
  const outputFile = path.join(REPORT_DIR, fileName);
  await writeFile(outputFile, report, "utf8");
  return path.relative(ROOT, outputFile);
}

async function main() {
  const siteUrl = process.env.GSC_SITE_URL || DEFAULT_SITE;
  const ranges = {
    seven: { startDate: dateOffset(-7), endDate: dateOffset(-1) },
    twentyEight: { startDate: dateOffset(-28), endDate: dateOffset(-1) },
  };
  const credentials = await getCredentials();
  if (!credentials?.client_email || !credentials?.private_key) {
    const report = renderReport({
      siteUrl,
      ranges,
      seven: metrics(),
      twentyEight: metrics(),
      queries: [],
      pages: [],
      countries: [],
      devices: [],
      sample: true,
    });
    const output = await writeReport("gsc-daily-sample.md", report);
    console.log(`[report:gsc] Missing: ${missingCredentialNames().join(", ") || "valid Google service-account credentials"}.`);
    console.log(`[report:gsc] Enable the Google Search Console API and grant access to ${siteUrl}.`);
    console.log(`[report:gsc] Configure .env.local, then rerun npm run report:gsc.`);
    console.log(`[report:gsc] Sample report: ${output}`);
    return;
  }

  const token = await getAccessToken(credentials);
  const [sevenRows, twentyEightRows, queries, pages, countries, devices] = await Promise.all([
    queryGsc(token, siteUrl, ranges.seven, [], 1),
    queryGsc(token, siteUrl, ranges.twentyEight, [], 1),
    queryGsc(token, siteUrl, ranges.twentyEight, ["query"], 5000),
    queryGsc(token, siteUrl, ranges.twentyEight, ["page"], 1000),
    queryGsc(token, siteUrl, ranges.twentyEight, ["country"], 250),
    queryGsc(token, siteUrl, ranges.twentyEight, ["device"], 10),
  ]);
  const report = renderReport({
    siteUrl,
    ranges,
    seven: metrics(sevenRows[0]),
    twentyEight: metrics(twentyEightRows[0]),
    queries,
    pages,
    countries,
    devices,
    sample: false,
  });
  const output = await writeReport(`gsc-daily-${dateOffset(0)}.md`, report);
  console.log(`[report:gsc] Wrote ${output} for ${siteUrl}.`);
}

main().catch((error) => {
  console.error(`[report:gsc] ${error.message}`);
  process.exitCode = 1;
});
