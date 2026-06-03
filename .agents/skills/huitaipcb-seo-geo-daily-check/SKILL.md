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

# Workflow

1. Confirm the current workspace is `G:\onestoppcba\onestoppcba`.
2. Check `git status --short` and verify `video/` remains untracked and untouched.
3. Gather public, read-only signals for `https://huitaipcb.com`.
4. Use optional platform data only if it is already available in read-only form or the user explicitly provides it.
5. Mark unavailable private data as `Unknown`, not as healthy or unhealthy.
6. Write one daily report to `docs/reports/seo-geo-daily/YYYY-MM-DD.md`.
7. After writing the report, run `git status --short` and inspect the report diff.
8. Report what was checked, what was unknown, and what actions require separate user confirmation.

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
