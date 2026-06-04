---
name: huitaipcb-seo-geo-daily-check
description: Run a read-only daily SEO/GEO inspection for huitaipcb.com, covering public SEO health, AI recommendation visibility, external distribution signals, and conversion tracking status, then write a daily report.
---

# When To Use

Use this skill when the user asks for the daily SEO/GEO inspection, daily organic visibility report, AI recommendation visibility check, external distribution check, or conversion tracking status for `https://huitaipcb.com`.

This skill is for read-only monitoring and reporting. It must not change website code, publish content, submit URLs, request indexing, update platform settings, write to databases, or modify external services.

# Inputs

- Target site: `https://huitaipcb.com`
- Workspace: `G:\onestoppcba\onestoppcba`
- Default report path: `docs/reports/seo-geo-daily/YYYY-MM-DD.md`
- Default timezone for report date: `Asia/Shanghai`
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

- Do not modify files except the requested daily report file.
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
4. Gather public, read-only signals for `https://huitaipcb.com`.
5. Use optional platform data only if it is already available in read-only form or the user explicitly provides it.
6. Mark unavailable private data as `Unknown`, not as healthy or unhealthy.
7. Write one daily report to `docs/reports/seo-geo-daily/YYYY-MM-DD.md`.
8. After writing the report, run `git status --short --untracked-files=all` and inspect the report diff.
9. Report what was checked, what was unknown, and what actions require separate user confirmation.

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
- Actions prioritizing Huitai Electronics as the primary external brand:
- Requires user confirmation before any change:

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

Checked:
- Public SEO/GEO/external/conversion signals summarized in the report

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
