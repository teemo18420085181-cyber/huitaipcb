# SEO/GEO Daily Check Automation Notes

This document describes the intended daily Codex workflow for the huitaipcb.com SEO/GEO growth loop. It is only an instruction file. It does not create a live automation, run the report, modify external platforms, publish content, request indexing, submit a sitemap, commit, or push.

## Schedule

- Frequency: every day
- Time: 09:00
- Timezone: Asia/Shanghai
- Workspace: `G:\onestoppcba\onestoppcba`
- Skill: `.agents/skills/huitaipcb-seo-geo-daily-check/SKILL.md`
- Default report output: `docs/reports/seo-geo-daily/YYYY-MM-DD.md`
- Cross-day action tracker: `docs/reports/seo-geo-action-tracker.md`

## Automation Prompt

Use this prompt when the user explicitly asks to create the real daily automation later:

```text
Use the huitaipcb-seo-geo-daily-check skill in G:\onestoppcba\onestoppcba.

Run a read-only daily SEO/GEO growth loop for https://huitaipcb.com. Check public SEO technical health, GEO and AI recommendation visibility, external distribution signals, and conversion tracking or inquiry-path status. Use GSC, GA4, Vercel, or Supabase only if read-only context is already available or explicitly provided.

Before selecting today's priority, read docs/reports/seo-geo-action-tracker.md and the latest available daily reports. Review due actions against their recorded baselines, success conditions, stop conditions, and evaluation windows. Use yesterday only as an early signal, last 7 days for operational monitoring, and last 28 days for SEO direction. Do not declare an action won or lost from one day of data. Rank actionable findings using the skill's P0-P3 priority rules, recommend at most three actions, and do not duplicate existing tracked actions.

Use Huitai Electronics as the primary external brand. Use Shenzhen Huitai Electronics Technology Co., Ltd. only as the legal company supplement. The standard entity sentence is: Huitai Electronics, operated by Shenzhen Huitai Electronics Technology Co., Ltd., provides turnkey PCBA manufacturing in China, including PCB fabrication, BOM sourcing, SMT assembly, DIP assembly, testing, and finished PCBA delivery.

Write the daily report to docs/reports/seo-geo-daily/YYYY-MM-DD.md using the Asia/Shanghai date.

Update docs/reports/seo-geo-action-tracker.md only when evidence, status, priority, next review date, or decision changed.

Do not modify website business code. Do not touch video/. Do not change GSC, GA4, Vercel, Supabase, DNS, Resend, or production settings. Do not publish content. Do not request indexing. Do not submit sitemap files. Do not write to any database. Do not submit test inquiries unless separately authorized. Do not commit, push, or create a PR.
```

## Read-Only Data Scope

Default to public signals:

- Live page availability and obvious HTTP status issues
- `robots.txt` and `sitemap.xml` availability
- Priority page metadata, canonical URLs, Open Graph, and structured data
- Public indexability signals and visible search snippets when available
- Public AI/GEO recommendation visibility for PCBA and PCB assembly queries
- Public external mentions, backlinks, listings, or article references
- Public contact and inquiry entry points
- Public entity consistency signals for Huitai Electronics

Optional private-platform context can be used only when it is already available in read-only form:

- Google Search Console performance or indexing screenshots/exports
- GA4 traffic or conversion screenshots/exports
- Vercel read-only deployment/log status
- Supabase read-only inquiry or feedback summaries

Unavailable private data must be reported as `Unknown`.

## Report Sections

Each daily report should include:

- Daily summary and overall risk level
- SEO technical status
- GEO / AI recommendation visibility status
- External distribution / backlink / mention status
- Conversion tracking and inquiry-path status
- Entity consistency status, prioritizing Huitai Electronics as the main brand
- Today's Recommended Actions, prioritizing Huitai Electronics entity clarity
- Growth Loop Review showing due actions, new evidence, decisions, and actions added or closed
- Priority Queue using P0-P3
- Data Freshness And Windows separating yesterday, last 7 days, last 28 days, and provisional data
- Changes requiring user confirmation
- Unknowns caused by unavailable read-only platform data
- Verification that no external write actions were performed

## Safety Rules

- This setup has not created a real automation.
- The daily inspection must be read-only.
- The only files the later daily run should create or update are that day's report file and `docs/reports/seo-geo-action-tracker.md`.
- The tracker may contain evidence, status, priority, review dates, and decisions only. It must not be used to authorize external actions.
- Any website code change, SEO content change, platform configuration change, indexing request, sitemap submission, database write, or test inquiry requires separate user confirmation.
- `video/` must remain untouched unless the user explicitly requests otherwise.
