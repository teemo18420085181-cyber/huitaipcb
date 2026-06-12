---
name: huitaipcb-seo-geo-daily-check
description: Run a read-only daily SEO/GEO growth loop for huitaipcb.com, covering public SEO health, AI recommendation visibility, external distribution signals, conversion tracking, action prioritization, and cross-day outcome tracking.
---

# When To Use

Use this skill when the user asks for the daily SEO/GEO inspection, daily organic visibility report, AI recommendation visibility check, external distribution check, or conversion tracking status for `https://huitaipcb.com`.

This skill is for read-only monitoring and reporting. It must not change website code, publish content, submit URLs, request indexing, update platform settings, write to databases, or modify external services.

# Inputs

- Target site: `https://huitaipcb.com`
- Workspace: `G:\onestoppcba\onestoppcba`
- Default report path: `docs/reports/seo-geo-daily/YYYY-MM-DD.md`
- Cross-day action tracker: `docs/reports/seo-geo-action-tracker.md`
- Default timezone for report date: `Asia/Shanghai`
- Default evidence lookback: the latest 14 daily reports plus the action tracker
- Optional read-only context, only when already available or explicitly provided:
  - Google Search Console exports or screenshots
  - GA4 exports or screenshots
  - Vercel read-only deployment/log context
  - Supabase read-only inquiry or feedback summaries

# Entity Rules

- Primary external brand: `Huitai Electronics`.
- Legal company supplement: `Shenzhen Huitai Electronics Technology Co., Ltd.`
- Do not recommend `HuiTai PCB by Shenzhen Huitai Electronics Technology Co., Ltd.` as the primary external wording.
- Standard entity sentence:

```text
Huitai Electronics, operated by Shenzhen Huitai Electronics Technology Co., Ltd., provides turnkey PCBA manufacturing in China, including PCB fabrication, BOM sourcing, SMT assembly, DIP assembly, testing, and finished PCBA delivery.
```

- In the daily report, the `Entity Consistency` and `Today's Recommended Actions` sections must prioritize `Huitai Electronics` as the main brand.
- Treat `HuiTai PCB`, `OneStopPCBA`, and other variants as secondary or contextual signals unless the user explicitly changes the brand strategy.

# Hard Limits

- Do not modify files except the requested daily report file and `docs/reports/seo-geo-action-tracker.md`.
- Do not modify website business code.
- Do not touch the untracked `video/` directory.
- Do not commit, push, or create a PR.
- Do not publish or edit website content.
- Do not submit sitemap files.
- Do not use Request Indexing.
- Do not change GSC, GA4, Vercel, Supabase, DNS, Resend, or any production configuration.
- Do not write to Supabase or any other database.
- Do not create, update, or delete real automations unless the user explicitly asks in a separate request.

# Automation Worktree Freshness

Before comparing live production URLs with local routes, local sitemap code, or local content files, confirm that the current automation worktree is synchronized with latest `origin/main`.

Required preflight:

1. Run `git status --short --untracked-files=all`.
2. Run `git branch --show-current`, `git rev-parse HEAD`, `git rev-parse origin/main`, and `git rev-list --left-right --count HEAD...origin/main`.
3. If the worktree is behind `origin/main`, preserve any existing daily report first. For an untracked report such as `docs/reports/seo-geo-daily/YYYY-MM-DD.md`, copy it to a temporary backup before syncing.
4. Sync the automation worktree to latest `origin/main` before making local-vs-production judgments. In a detached automation worktree, prefer `git switch --detach origin/main` after confirming there are no tracked local edits to preserve.
5. After syncing, confirm `HEAD` equals `origin/main` and re-check any local files used as evidence.
6. If fetch/sync requires login, authorization, network approval, or could overwrite local work, stop and record it under `Needs User Confirmation`.
7. If the worktree cannot be synchronized, do not report a local-vs-production mismatch as a production risk. Mark it as `Unknown / worktree freshness not confirmed`.

# Workflow

1. Confirm the current workspace. Prefer `G:\onestoppcba\onestoppcba` when available; if running inside a Codex automation worktree such as `C:\Users\Administrator\.codex\worktrees\...\onestoppcba`, record that path explicitly.
2. Run the Automation Worktree Freshness preflight above before relying on local files.
3. Check `git status --short --untracked-files=all` and verify `video/` remains untracked and untouched.
4. Read `docs/reports/seo-geo-action-tracker.md` and the latest available daily reports before selecting today's priority. Do not create duplicate actions for an already tracked issue.
5. Gather public, read-only signals for `https://huitaipcb.com`.
6. Use optional platform data only if it is already available in read-only form or the user explicitly provides it.
7. Mark unavailable private data as `Unknown`, not as healthy or unhealthy.
8. Normalize evidence into the metric windows below and distinguish provisional single-day data from decision-grade trends.
9. Review every active tracker item whose review date is due. Record new evidence and choose one decision: `continue`, `promote`, `hold`, `close-won`, `close-neutral`, `close-lost`, `block`, or `request-confirmation`.
10. Score and rank new findings using the prioritization rules below. Add only actionable findings with a measurable success condition to the tracker.
11. Write one daily report to `docs/reports/seo-geo-daily/YYYY-MM-DD.md`.
12. Update `docs/reports/seo-geo-action-tracker.md` only when evidence, status, priority, review date, or decision changed.
13. After writing, run `git status --short --untracked-files=all` and inspect both file diffs.
14. Report what was checked, what changed in the tracker, what was unknown, and what actions require separate user confirmation.

# Growth Loop Rules

## Evidence Windows

- `Yesterday`: useful as an early signal only. Never declare an SEO action won or lost from one day of data.
- `Last 7 days`: primary window for operational monitoring and detecting sharp changes.
- `Last 28 days`: primary window for SEO direction, page/query prioritization, and conversion trend decisions.
- `Before vs after`: compare equal-length windows whenever an action has a clear implementation date.
- Always record the source, date range, data freshness, and whether the data is complete or provisional.

If GSC and GA4 disagree, record both. Do not force them to match because they use different attribution, processing, privacy, and timezone rules.

## Action Record

Each tracked action must have:

- Stable ID: `<AREA>-YYYYMMDD-NN`, where area is `TECH`, `SEO`, `GEO`, `ENTITY`, `DIST`, or `CONV`.
- Problem or opportunity.
- Baseline metric and source.
- Proposed or completed action.
- Success metric and failure/stop condition.
- Owner: `Codex`, `User`, or `Needs assignment`.
- Permission boundary: `Read-only`, `Needs user confirmation`, or `Separately authorized`.
- Status.
- Next review date or trigger and evaluation window.
- Latest evidence and decision.

Allowed statuses:

- `Proposed`
- `Needs Confirmation`
- `Approved`
- `In Progress`
- `Observing`
- `Won`
- `Neutral`
- `Lost`
- `Blocked`
- `Closed`

## Priority Score

Score each actionable finding from 0 to 10:

- Business impact: `0-3`
- Evidence strength: `0-3`
- Urgency: `0-2`
- Ease/reversibility: `0-2`

Priority bands:

- `P0` regardless of score: production outage, inquiry path failure, tracking loss, security issue, deindexing/noindex, or broad technical regression.
- `P1` score `8-10`: do or request confirmation next.
- `P2` score `5-7`: schedule after P1 or observe until evidence strengthens.
- `P3` score `0-4`: backlog; do not repeat in the daily top actions unless evidence changes.

Do not rank a low-evidence idea above a confirmed conversion or technical failure merely because it is easy.

## Evaluation Windows

- Technical availability or metadata fix: verify immediately and again on the next daily run.
- Conversion tracking or inquiry-path fix: verify immediately, then evaluate for 7 days.
- On-page SEO or internal-link change: observe for at least 14 days; use 28 days before calling it lost unless a clear regression occurs.
- New article or landing page: observe discovery/indexing first, then evaluate search performance at 14 and 30 days.
- GEO/entity/external-distribution action: review at 30 and 60 days.

## Decision And Stop Rules

- `promote`: evidence strengthened enough to raise priority.
- `continue`: metric is moving toward the success condition and the evaluation window is still open.
- `hold`: insufficient data; set a future review date and do not recommend new edits meanwhile.
- `close-won`: success condition met in the defined window.
- `close-neutral`: completed but no meaningful measurable effect; preserve the result and stop spending effort.
- `close-lost`: metric clearly worsened or the failure condition was met.
- `block`: missing access, dependency, or required external state prevents progress.
- `request-confirmation`: the next useful step crosses a permission boundary.

Stop or escalate to the user when:

- An action needs code changes, deployment, content publishing, platform configuration, indexing requests, external posting, email sending, database writes, or another external side effect.
- Two consecutive evaluation windows show no meaningful improvement.
- The same failed attempt occurs twice.
- Required data remains unavailable for two due reviews.
- A proposed action conflicts with brand rules, security, permissions, or an existing user decision.

## Daily Selection Rules

- Carry forward due active actions before creating new ones.
- Recommend at most three actions per daily report.
- Include at most one new experiment per area at a time unless the user explicitly approves parallel experiments.
- Prefer actions that can be measured against a recorded baseline.
- Do not repeatedly recommend an item in `hold`, `blocked`, or `Needs Confirmation` unless its evidence or blocking condition changed.

# Check Areas

## SEO Technical Status

- Homepage and priority landing pages return expected live responses.
- `robots.txt` and `sitemap.xml` are reachable.
- Canonical URLs point to `https://huitaipcb.com`.
- Page titles and meta descriptions exist on priority pages.
- Open Graph and basic structured data are present where expected.
- No obvious public noindex, redirect, or broken-page issue is visible.

## GEO / AI Recommendation Visibility

- Check whether public AI/search surfaces mention Huitai Electronics, huitaipcb.com, or relevant PCBA service terms when available.
- Track whether answers describe the site accurately for PCB assembly, PCBA, turnkey PCB assembly, prototype PCB assembly, and China PCB assembly intent.
- Record missing, incorrect, or weak brand/entity signals as observations only.

## Entity Consistency

- Check whether public pages and search results prioritize `Huitai Electronics` as the main brand.
- Check whether `Shenzhen Huitai Electronics Technology Co., Ltd.` appears only as the legal company supplement or operator.
- Check whether the standard entity sentence is supported by public site content and external references.
- Flag confusing brand variants, especially if external sources treat `HuiTai PCB`, `OneStopPCBA`, or other names as the primary brand.
- Recommended actions must improve clarity around `Huitai Electronics` first.

## External Distribution Signals

- Look for public mentions, backlinks, directory listings, social posts, partner pages, or article references when available.
- Separate confirmed external signals from unverified search snippets.
- Do not create accounts, submit listings, post content, or request changes.

## Conversion Tracking And Inquiry Path

- Check public conversion path availability, especially `/contact` and visible inquiry form entry points.
- Check whether analytics or conversion tracking evidence is visible in page source or provided read-only context.
- If GSC, GA4, Supabase, or email delivery data is unavailable, report it as `Unknown`.
- Do not submit test inquiries unless the user explicitly authorizes a separate test.

# Daily Report Format

Use this structure:

```markdown
# Huitaipcb SEO/GEO Daily Check - YYYY-MM-DD

## Summary
- Overall risk:
- Highest priority finding:
- Public data checked:
- Private platform data:

## SEO Technical Status
- Status:
- Findings:
- Evidence:

## GEO / AI Recommendation Visibility
- Status:
- Findings:
- Evidence:

## External Distribution Signals
- Status:
- Findings:
- Evidence:

## Conversion Tracking And Inquiry Path
- Status:
- Findings:
- Evidence:

## Entity Consistency
- Status:
- Primary external brand: Huitai Electronics
- Legal company supplement: Shenzhen Huitai Electronics Technology Co., Ltd.
- Standard entity sentence:
- Findings:
- Evidence:

## Today's Recommended Actions
- Actions prioritizing Huitai Electronics as the primary external brand, maximum three:
- Requires user confirmation before any change:

## Growth Loop Review
- Due actions reviewed:
- Evidence changes:
- Decisions:
- Actions added or closed:

## Priority Queue
- P0/P1:
- P2:
- P3/backlog:

## Data Freshness And Windows
- Yesterday:
- Last 7 days:
- Last 28 days:
- Provisional or unavailable data:

## Unknowns
- Unavailable data:
- Impact:

## Verification
- Workspace:
- Git status:
- Report file:
- Confirmed no external write actions:
```

# Output

After the report is written, reply with:

```text
Report:
- docs/reports/seo-geo-daily/YYYY-MM-DD.md
- docs/reports/seo-geo-action-tracker.md (updated only if action evidence or state changed)

Checked:
- Public SEO/GEO/external/conversion signals summarized in the report
- Due actions reviewed against their baselines and evaluation windows

Not performed:
- No code changes
- No external platform changes
- No content publishing
- No Request Indexing
- No sitemap submission
- No database writes
- No commit or push
- video/ untouched
```
