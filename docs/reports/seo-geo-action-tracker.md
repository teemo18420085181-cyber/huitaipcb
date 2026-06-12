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

## Active Actions

| ID | Priority | Area | Problem / opportunity | Action / stop condition | Baseline | Success condition | Owner / permission | Status | Next review | Latest evidence / decision |
|---|---|---|---|---|---|---|---|---|---|---|
| TECH-20260612-01 | P1 (8/10) | Technical SEO | Homepage `og:image` was missing in the live HTML while the image file returned 200 | After approval, diagnose and fix metadata, deploy, then verify. Stop and reassess if the live issue is not reproducible or the fix would affect canonical/other metadata. | Missing on 2026-06-12 public check | Live homepage renders a valid `og:image`; still present on next daily run | User + Codex / Needs user confirmation for code change and deploy | Needs Confirmation | On approval, then next daily run | Confirmed regression; request confirmation, then verify immediately and next day |
| GEO-20260611-01 | P2 (6/10) | GEO content | Two new GEO articles need discovery, indexing, search-performance, and AI-surface evidence | Observe without new edits through the first evaluation windows. Stop the experiment after two 30-day windows without meaningful impressions or accurate mentions. | Published 2026-06-11; one article received 1 GSC impression on 2026-06-11 | Both URLs indexed; measurable impressions by day 14/30; accurate AI/search mentions by day 30/60 | Codex / Read-only observation | Observing | 2026-06-25 | Hold changes while the first 14-day observation window is open |
| ENTITY-20260612-01 | P2 (5/10) | Entity / distribution | External entity corroboration for Huitai Electronics remains weak and directory listings are not yet publicly visible | Monitor listing visibility and naming only. Stop repeating the action after 60 days without a state change and request a user decision on outreach. | Crunchbase live; PCBA Finder and PCB Directory not publicly visible on 2026-06-12 | Confirmed public listings and consistent Huitai Electronics naming; eligible URLs available for later `sameAs` consideration | User + Codex / Read-only monitoring; external changes need confirmation | Observing | 2026-07-11 | Continue read-only monitoring; do not repeat recommendation unless listing state changes |

## Closed Actions

No closed actions yet.

## Daily Update Checklist

1. Review actions whose `Next review` date or trigger is due.
2. Record fresh evidence using yesterday, 7-day, 28-day, or equal before/after windows.
3. Choose one decision: `continue`, `promote`, `hold`, `close-won`, `close-neutral`, `close-lost`, `block`, or `request-confirmation`.
4. Add a new action only when it has a measurable baseline, success condition, owner, permission boundary, and review date.
5. Recommend no more than three actions in the daily report.
