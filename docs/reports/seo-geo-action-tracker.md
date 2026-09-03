# Huitaipcb SEO/GEO Action Tracker

This tracker is the cross-day memory for the read-only SEO/GEO growth loop. Daily runs may update evidence, status, priority, next review date, and decisions. They must not perform or authorize external side effects.

## Decision Rules

- Use yesterday as an early signal only.
- Use 7-day data for operational monitoring and 28-day data for SEO direction.
- Compare equal before/after windows when an implementation date exists.
- Do not declare an action won or lost from one day of data.
- Any code change, deployment, publishing, platform change, indexing request, external post, email, or database write requires separate user confirmation.

## Current Metric Baseline

| Window | Source | Metrics | Freshness / notes |
|---|---|---|---|
| 2026-06-11 | GSC | 10 impressions, 0 clicks, 0% CTR, average position 98.9 | Read-only browser check on 2026-06-12; single-day early signal |
| 2026-06-11 | GA4 | 2 users, 1 new user, 1 returning user, 2 sessions, 1 organic session, 6 events, 0 key events | Read-only browser check on 2026-06-12; GA4 marked traffic data mostly complete |
| 2026-06-03 to 2026-06-09 | GSC | 68 impressions, 4 clicks, 5.9% CTR, average position 50.6 | Latest processed 7-day window recorded in 2026-06-12 daily report |
| Last 28 days as checked 2026-06-12 | GA4 | 70 active users, 100 sessions, 585 events, 5 key events | Recorded in 2026-06-12 daily report |
| 2026-06-15 | Public technical audit | 43 sitemap URLs; 0 non-200; 0 missing canonicals; 22 descriptions over 160 characters; one confirmed knowledge soft 404 | Read-only live audit; fresh public evidence |
| 2026-06-13 to 2026-06-19 | GSC | 140 impressions, 2 clicks, 1.4% CTR, average position 50.4 | Read-only browser check on 2026-06-22; latest complete 7-day window |
| 2026-05-23 to 2026-06-19 | GSC | 470 impressions, 12 clicks, 2.6% CTR, average position 44.3 | Target-country subset: 352 impressions and 2 clicks across US, UK, Canada, Germany, and Australia |
| 2026-06-15 to 2026-06-21 | GA4 | 40 sessions, 8 engaged sessions, 219 events, 4 key events | Google organic: 2 sessions, both engaged, 2 key events |
| 2026-05-25 to 2026-06-21 | GA4 | 109 active users, 152 sessions, 898 events, 11 key events | Google organic: 21 sessions, 12 engaged, 7 key events; `rfq_submit_success` recorded twice |
| 2026-06-22 | Public technical audit | Priority pages, robots.txt, and sitemap.xml return 200; missing knowledge URL returns 404 | Soft-404 fix verified live |
| 2026-09-01 | Public technical audit | 58 sitemap URLs; 0 non-200; 0 missing titles; 0 missing canonicals; 0 public noindex; contact form, WhatsApp path, and GA4 marker present | Fresh read-only live audit |
| 2026-08-23 to 2026-08-29 | GSC | 156 impressions, 3 clicks, 1.9% CTR, average position 30.8 | Versus preceding 7 days: 110 impressions, 1 click, 0.9% CTR, position 46.8 |
| 2026-08-02 to 2026-08-29 | GSC | 465 impressions, 5 clicks, 1.1% CTR, average position 33.6 | Versus preceding 28 days: 524 impressions, 3 clicks, 0.6% CTR, position 26.4 |
| 2026-08-23 to 2026-08-29 | GSC Generative AI | 23 impressions | Top suppliers article: 14; `/china-pcba-manufacturer`: 5; homepage: 3 |
| 2026-08-02 to 2026-08-29 | GSC Generative AI | 77 impressions | Versus 67 in preceding 28 days; top suppliers article: 47 versus 9 |
| 2026-08-26 to 2026-09-01 | GA4 | 24 active users, 31 sessions, 168 events, 4 key events | AI Assistant: 5 sessions, 100% engagement, 2 key events; Organic Search: 7 sessions, 2 key events |
| 2026-08-04 to 2026-08-31 | GA4 | 119 active users, 131 sessions, 606 events, 6 key events | Versus previous 28 days: +67.6% users, +33.7% sessions, +12.0% events, +500% key events; only 1 `rfq_submit_success` |

## Active Actions

| ID | Priority | Area | Problem / opportunity | Action / stop condition | Baseline | Success condition | Owner / permission | Status | Next review | Latest evidence / decision |
|---|---|---|---|---|---|---|---|---|---|---|
| ENTITY-20260612-01 | P2 (5/10) | Entity / distribution | External entity corroboration for Huitai Electronics remains weak and directory listings are not yet publicly visible | Hold profile outreach and `sameAs` additions until the owner approves the primary public brand and confirms each controlled public URL; then verify names before proposing an atomic alignment. | Crunchbase live; PCBA Finder and PCB Directory not publicly visible on 2026-06-12 | Confirmed public listings and consistent Huitai Electronics naming; eligible URLs available for later `sameAs` consideration | User + Codex / Read-only monitoring; external changes need confirmation | Needs Decision | 2026-09-15 or on owner decision | The 2026-09-01 entity audit found no approved public `sameAs` set. Current owned-site identity is Huitai PCB plus the full legal company name, while historical strategy expected Huitai Electronics; no external profile or schema was changed. |
| ENTITY-20260615-01 | P1 (8/10) | Entity / trust | Owned-site entity and capability claims need factual alignment before more GEO promotion | Approve one entity fact sheet first: primary brand, legal name, permitted alias, public profiles, author/reviewer, and evidence-backed claims. Then propose one coordinated owned-site alignment; stop if factual confirmation is unavailable. | `foundingDate: 2010` is unconfirmed in profile notes; authorized-only vs open-market sourcing language conflicts; ONESTOPPCBA remains prominent | Huitai Electronics is primary; verified facts are consistent across schema and visible copy; unverified blanket claims removed or qualified | User + Codex / Code change approved; factual confirmation required before restoring specific claims | Needs Decision | 2026-09-15 or on owner fact approval | Current code/live entity graph is internally coherent as Huitai PCB brand plus Shenzhen Huitai Electronics Technology Co., Ltd. legal entity; no current ONESTOPPCBA occurrence was found in the reviewed application source. The historical primary-name target remains unresolved, so no brand/schema/company-name change was made. |
| GEO-20260615-01 | P1 (8/10) | GEO / citation quality | Priority knowledge articles lack truthful freshness and reviewer signals | Protect current winners. After factual and code approval, consider only truthful update dates, an accountable author/reviewer, small fact corrections, and one natural service link; stop if an edit changes the main intent, supplier set, or structure. | Static articles emit no datePublished/dateModified; CMS uses publication date for both | Priority articles expose truthful dates, author/reviewer identity, and first-hand evidence; observe discovery/citation signals at 30/60 days | User + Codex / Needs user confirmation for code/content changes | Planned / Protected | 2026-09-15 | GEO winner audit confirms `/knowledge/top-low-volume-turnkey-pcba-suppliers-china` improved from 9 to 47 AI impressions and to about position 10 in standard search. JLC alternatives recorded 43 AI impressions over three months; `/china-pcba-manufacturer` also improved. No winner was modified. |
| SEO-20260622-01 | P2 (7/10) | SEO / CTR | Seven-day momentum improved, while the 28-day window remains mixed and two service pages regressed | Hold edits through 2026-09-15 and recheck an equal 14-day window. Only propose a minimal turnkey Title/H1 and verified capability update if `turnkey pcba service china` fails to sustain the top 30 after at least 10 new impressions; keep the BOM page unchanged unless its core Query itself remains below position 30 for two complete 7-day windows. Preserve the GEO winner and stop broad rewrites. | Latest 28 days: 465 impressions, 5 clicks, 1.1% CTR, position 33.6; latest 7 days: 156 impressions, 3 clicks, 1.9% CTR, position 30.8 | Page regressions are explained or recover; target-market clicks and CTR improve without damaging the GEO winner | Codex / Read-only observation | Observing | 2026-09-15 | Diagnosis completed 2026-09-01. Turnkey: 28-day position 66.5 vs 26.3; core Query `turnkey pcba service china` 49.7 vs 18.5, but latest 7 days recovered to 19.5 vs 80.5. BOM: 28-day position 28.6 vs 20.9; core Query `bom sourcing pcb assembly` was broadly stable at 15.0 vs 12.5 while exposure fell from 10 to 1; latest 7-day page position improved to 16.0 vs 36.0. No current preferred-URL switching or material cannibalization; both pages have strong contextual internal-link coverage. GA4 had only 1 turnkey and 0 BOM landing sessions in the matching 28-day window, so behavior data is inconclusive. |
| CONV-20260622-01 | P0 (10/10) | Conversion | GA4 records successful RFQ events, but their business validity is unknown and aggregate key events may overstate genuine leads | Create only the approved selective release commit, then stop for production backup/preflight approval. Apply the three migrations one at a time with verification and an application deployment boundary before the order-image private transition. Never replay pending/manual-review analytics blindly. | Latest 28 days: 15 contact page views, 7 form starts, 1 `contact_form_submit`, 1 `generate_lead`, 1 `rfq_submit_success`, and 6 total key events | Each success event is classified as test or genuine inquiry; tracking-to-business mismatch is zero or documented | User + Codex / Separate approval required for commit and every production-side change | APPROVED FOR CONTROLLED PRODUCTION ROLLOUT / SELECTIVE COMMIT PENDING | On explicit approval for the selective commit | Owner copy decisions were finalized on 2026-09-03 in inquiry-success/confirmation UI and customer email only; public/indexable matches remain `OWNER COPY FOLLOW-UP`. TDD recorded 3 expected failures before implementation and 13/13 focused passes after it. Complete gates: 183/183 Vitest, SEO 43/43, default 11-worker build 44/44, typecheck exit 0, lint exit 0 with 17 warnings, diff check exit 0, and production audit 0. Ten requested local production-smoke routes returned 200; GEO Winner title/H1/canonical remained unchanged. All three migration SHA-256 values still match the frozen review. The disposable test evidence remains pgTAP 132/132, catalog 13/13 before and after rerun, real JWT Data API/Storage identity matrices, and four order-image transition states passed; project and credentials were deleted/cleared. No production change, commit, push, deploy, GA4 change, or live inquiry occurred. |

## Closed Actions

| ID | Area | Decision | Evidence |
|---|---|---|---|
| TECH-20260612-01 | Technical SEO | Closed / Won | Homepage rendered a valid `og:image` on 2026-06-15 and the image URL returned normally. |
| TECH-20260615-01 | Technical SEO | Closed / Won | `/knowledge/this-article-does-not-exist-geo-check` returned HTTP 404 in production on 2026-06-22. |
| GEO-20260611-01 | GEO content | Closed / Won | Both June GEO articles achieved measurable Google Generative AI visibility. In the latest 28 days the top suppliers article generated 47 AI impressions versus 9 previously; the JLCPCB alternatives article generated 43 over the latest three months. |

## Daily Update Checklist

1. Review actions whose `Next review` date or trigger is due.
2. Record fresh evidence using yesterday, 7-day, 28-day, or equal before/after windows.
3. Choose one decision: `continue`, `promote`, `hold`, `close-won`, `close-neutral`, `close-lost`, `block`, or `request-confirmation`.
4. Add a new action only when it has a measurable baseline, success condition, owner, permission boundary, and review date.
5. Recommend no more than three actions in the daily report.
