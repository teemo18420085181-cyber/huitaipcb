# AGENTS.md

## Project

This repository is the Huitai Electronics / huitaipcb.com PCBA turnkey website.

- Stack: Next.js App Router, React, TypeScript, Tailwind CSS.
- Main app code is under `src/app`, shared UI under `src/components`, content data under `src/lib/content`.
- Backend integrations include Supabase, Resend email, GA4, and GSC reporting scripts.
- Deployment target is Vercel.
- Work only inside this repository: `G:\onestoppcba\onestoppcba`.

## Working Rules

- Prefer targeted, minimal edits that match existing code style.
- Do not modify business pages, SEO pages, or `src/lib/content/seoPages.ts` unless the task explicitly asks.
- Do not refactor unrelated code or add large dependencies unless necessary and approved.
- Do not overwrite user changes; check `git status --short` before and after meaningful work.
- Do not automatically `git add`, commit, push, deploy, or create PRs unless the user explicitly requests it.
- Prefer `rg`, static files, scripts, API calls, and command-line checks over broad repository scans.
- Keep command output short. In PowerShell, use native filtering/truncation such as `Select-Object -First/-Last`, scoped searches, or explicit string slicing instead of Unix-only commands.
- Do not use browser tools for data tasks. Use a browser only when the user asks, or when visual layout, animation, or form behavior genuinely needs verification.

## Protected Files and Data

- Do not read, print, commit, or expose `.env.local`, `.env.production`, private keys, service-role keys, tokens, cookies, or credentials.
- Never paste secret values into chat, logs, reports, diffs, commits, or generated files.
- Treat GSC/GA4 CSV exports and generated reports as business data; ask before committing them.
- Do not delete, move, compress, edit, or commit `video/` unless the user explicitly requests it.
- Be cautious with Supabase, database schema/RLS/storage, Vercel settings, email configuration, auth, and production domain changes. Explain risk, migration order, and rollback before making such changes.
- Do not run destructive git or filesystem cleanup commands unless the user explicitly confirms the exact scope.

## Common Commands

- `git status --short`
- `git diff --check`
- `npm run build`
- `npm run lint`
- `npm run report:gsc`

Notes:

- Lint has migrated to the ESLint CLI through `npm run lint`.
- Do not use `next lint`.
- There is no project test script unless `package.json` later adds one.

## Validation

- Documentation-only changes: inspect the diff and run `git diff --check`.
- Script changes: run `node --check <script>` when applicable, plus lint/build if the script affects the app or package scripts.
- Engineering config changes: run `npm run lint`, `npm run build`, and `git diff --check`.
- Content or SEO changes: run `npm run build`, `git diff --check`, and confirm the changed page scope.
- API, Supabase, email, or auth changes: run relevant checks and document required environment variables, data writes, and failure paths.
- Deployment checks, when explicitly requested: confirm Vercel deployment state is `READY` and verify relevant URLs return HTTP 200.

## Reporting

Final responses should be concise but include what matters:

- Modified files.
- Commands run.
- Verification result.
- Whether commit, push, or deploy happened.
- Risks, manual setup, or follow-up decisions.

For reviews, audits, troubleshooting, and planning, include enough detail to explain findings and recommendations.
