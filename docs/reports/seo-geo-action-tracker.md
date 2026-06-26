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

## Active Actions

| ID | Priority | Area | Problem / opportunity | Action / stop condition | Baseline | Success condition | Owner / permission | Status | Next review | Latest evidence / decision |
|---|---|---|---|---|---|---|---|---|---|---|
| GEO-20260611-01 | P2 (6/10) | GEO content | Two new GEO articles need discovery, indexing, search-performance, and AI-surface evidence | Observe without new edits through the first evaluation windows. Stop the experiment after two 30-day windows without meaningful impressions or accurate mentions. | Published 2026-06-11; one article received 1 GSC impression on 2026-06-11 | Both URLs indexed; measurable impressions by day 14/30; accurate AI/search mentions by day 30/60 | Codex / Read-only observation | Observing | 2026-06-25 | Hold changes while the first 14-day observation window is open |
| ENTITY-20260612-01 | P2 (5/10) | Entity / distribution | External entity corroboration for Huitai Electronics remains weak and directory listings are not yet publicly visible | Monitor listing visibility and naming only. Stop repeating the action after 60 days without a state change and request a user decision on outreach. | Crunchbase live; PCBA Finder and PCB Directory not publicly visible on 2026-06-12 | Confirmed public listings and consistent Huitai Electronics naming; eligible URLs available for later `sameAs` consideration | User + Codex / Read-only monitoring; external changes need confirmation | Observing | 2026-07-11 | Continue read-only monitoring; do not repeat recommendation unless listing state changes |
| ENTITY-20260615-01 | P1 (8/10) | Entity / trust | Owned-site entity and capability claims need factual alignment before more GEO promotion | Confirm founding year, sourcing-channel policy, blanket quality claims, and primary visible brand; then align owned copy/schema. Stop if factual confirmation is unavailable. | `foundingDate: 2010` is unconfirmed in profile notes; authorized-only vs open-market sourcing language conflicts; ONESTOPPCBA remains prominent | Huitai Electronics is primary; verified facts are consistent across schema and visible copy; unverified blanket claims removed or qualified | User + Codex / Code change approved; factual confirmation required before restoring specific claims | In Progress | On user factual confirmation and after deployment | Unconfirmed founding year removed locally; sourcing and quality copy qualified on 2026-06-15 |
| GEO-20260615-01 | P2 (7/10) | GEO / citation quality | Priority knowledge articles lack truthful freshness and reviewer signals | After approval, add real published/modified dates and a verifiable author/reviewer profile to priority articles. Stop if dates or reviewer identity cannot be verified. | Static articles emit no datePublished/dateModified; CMS uses publication date for both | Priority articles expose truthful dates, author/reviewer identity, and first-hand evidence; observe discovery/citation signals at 30/60 days | User + Codex / Needs user confirmation for code/content changes | Needs Confirmation | On approval, then 30-day review | New action added from 2026-06-15 audit |
| SEO-20260622-01 | P1 (8/10) | SEO / CTR | Target-market visibility is growing, but clicks remain weak and the optimized pages have only five days of post-deployment data | Hold new rewrites through the first 14-day observation window. Review GSC on 2026-07-01; stop holding if a technical regression appears. | 28-day target markets: 352 impressions, 2 clicks; `/china-pcb-assembly` 108 impressions and 0 clicks; `/bom-sourcing-pcb-assembly` 62 impressions and 1 click | Post-change impressions continue and target-market CTR/page clicks improve without a technical regression | Codex / Read-only observation | Observing | 2026-07-01 | Hold; the 2026-06-17 page changes are too recent for a second rewrite |
| CONV-20260622-01 | P1 (8/10) | Conversion | GA4 records two successful RFQ submissions, but their business validity is unknown | With separate authorization, compare GA4 success events with inquiry records or notification emails. Stop if access is unavailable or the events are confirmed tests. | `rfq_submit_success` 2 events from 2 users in the 28-day GA4 window | Each success event is classified as test or genuine inquiry; tracking-to-business mismatch is zero or documented | User + Codex / Needs user confirmation for private-data read | Needs Confirmation | On user approval | GA4 tracking is operational; genuine inquiry count remains unverified |

## Closed Actions

| ID | Area | Decision | Evidence |
|---|---|---|---|
| TECH-20260612-01 | Technical SEO | Closed / Won | Homepage rendered a valid `og:image` on 2026-06-15 and the image URL returned normally. |
| TECH-20260615-01 | Technical SEO | Closed / Won | `/knowledge/this-article-does-not-exist-geo-check` returned HTTP 404 in production on 2026-06-22. |

## Daily Update Checklist

1. Review actions whose `Next review` date or trigger is due.
2. Record fresh evidence using yesterday, 7-day, 28-day, or equal before/after windows.
3. Choose one decision: `continue`, `promote`, `hold`, `close-won`, `close-neutral`, `close-lost`, `block`, or `request-confirmation`.
4. Add a new action only when it has a measurable baseline, success condition, owner, permission boundary, and review date.
5. Recommend no more than three actions in the daily report.
