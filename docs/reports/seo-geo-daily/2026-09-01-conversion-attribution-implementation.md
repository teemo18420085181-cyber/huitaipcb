# Conversion Attribution Implementation Record

**Date:** 2026-09-01
**Scope:** Local migration, code, tests, and operating instructions only
**Production state:** Not changed

## Decision and evidence model

The authoritative channel evidence for a saved inquiry is the sanitized acquisition data persisted on `public.inquiries`: `landing_page`, `page_path`, `referrer`, the five allowlisted UTM fields, `ga_client_id`, and `ga_session_id`.

GA4 displayed acquisition is a separate observation. A server-side Measurement Protocol `generate_lead` can count the conversion, but this implementation does **not** assume that Measurement Protocol will restore the event to the original GA4 session or reproduce Session Acquisition. Reconciliation must therefore report both:

1. **Database-confirmed attribution:** the persisted inquiry acquisition fields.
2. **GA4 display attribution:** the source/medium/channel shown by GA4, including `Direct` or `Unassigned` when session stitching is incomplete.

## Dependency Remediation — 2026-09-02

**Decision at the end of the dependency-remediation round: NOT READY.** The production dependency blocker was remediated locally: Next.js is now 16.3.4 and `npm audit --omit=dev` reports zero vulnerabilities. The remaining technical blocker found during the required 16.3 authorization review was pre-existing action-level authorization: nine sensitive admin Server Functions did not authenticate and authorize an administrator inside the function. The [Next.js Server Function documentation](https://nextjs.org/docs/app/getting-started/mutating-data) states that Server Functions are directly reachable by POST and must verify authentication and authorization inside every function. The protected layout and route redirect are not a substitute for this check.

This finding was not introduced by the dependency upgrade and was not fixed because this round was explicitly restricted to dependency remediation. Production rollout remains blocked until a separately approved minimal admin-action hardening change adds a shared server-only admin guard, calls it before every mutation, validates the action inputs, adds unauthorized/malformed-request tests, and passes this release gate again.

### Version matrix

| Package | Before | Finding / patched minimum | Local target | Relationship |
| --- | --- | --- | --- | --- |
| `next` | 16.2.6 | Two August 25 Critical advisories; patched in 16.3.3 | **16.3.4** | Direct production dependency |
| `react` | 19.2.6 | No production audit finding; satisfies Next 16.3.4 peer range | 19.2.6, unchanged | Direct production dependency |
| `react-dom` | 19.2.6 | No production audit finding; satisfies Next 16.3.4 peer range | 19.2.6, unchanged | Direct production dependency |
| `@next/env` and platform SWC packages | 16.2.6 | Must match the installed Next release | 16.3.4 | Next dependency / optional platform packages |
| `sharp` | 0.34.5 | High inherited libvips findings; npm audit patched range starts at 0.35.0 | **0.35.4** | Optional production dependency selected by Next |
| `postcss` | root 8.5.14 plus Next-nested 8.4.31 | High source-map file disclosure findings; affected through 8.5.22 | **8.5.23**, deduped | Root dev dependency plus Next runtime dependency |
| `nanoid` | 3.3.12 | High unbounded-loop findings; safe 3.x resolution is 3.3.18 | **3.3.18** | Transitive through PostCSS |
| `eslint-config-next` / `@next/eslint-plugin-next` | 14.2.15 | Remaining full-audit `glob` path is dev-only | 14.2.15, unchanged | Direct/transitive dev tooling |

`eslint-config-next@16.3.4` requires ESLint 9+, so changing it would be a separate lint-toolchain migration rather than a runtime security prerequisite. It was deliberately excluded from this minimal production remediation.

### Official security evidence and project exposure

- The [Next.js August 2026 Security Release](https://nextjs.org/blog/august-2026-security-release) identifies 16.3.3 as the patched 16.x minimum for both Critical vulnerabilities.
- [GHSA-2xp9-vwfh-vxw4](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4) affects Next versions below 16.3.3 when attacker-controlled AVIF is optimized. This project uses `next/image` broadly and explicitly enables `image/avif` before `image/webp`, so the vulnerable 16.2.6 version could not be retained. No `remotePatterns` or `localPatterns` are configured; CMS remote images use raw `<img>` rather than Next optimization.
- [GHSA-p293-qw3h-jr36](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36) requires Windows hosting plus both Pages and App Routers without Cache Components. The repository has no `pages/` or `src/pages/` tree and targets Vercel rather than a self-hosted Windows production server, reducing deployment-specific exploitability, but the framework was upgraded regardless.
- npm registry metadata identified 16.3.4 as the current stable `latest`; no canary, beta, RC, or future major was used. React 19.2.6 and local Node 24.16.0 meet the declared peer/runtime ranges.

### Minimal dependency change and lockfile explanation

The only new package.json change in this remediation is `next: ^16.2.6` to `next: ^16.3.4`. Supabase, Resend, React, ReactDOM, and all business dependencies stayed unchanged. No override and no `npm audit fix` command was used.

Comparison against the in-memory snapshot taken immediately before `npm install next@16.3.4 --save`:

- lockfile version remained 3;
- package entries changed from 709 to 710;
- 2 entries added: Sharp FreeBSD WASM and WebContainers WASM optional packages;
- 1 entry removed: the obsolete nested `node_modules/next/node_modules/postcss` copy;
- 40 entries changed, comprising Next, `@next/env`, platform SWC packages, Sharp/libvips platform packages, PostCSS, Nanoid, `@swc/helpers`, `@emnapi/runtime`, and `semver`;
- `next` 16.2.6 → 16.3.4, `sharp` 0.34.5 → 0.35.4, PostCSS root 8.5.14 plus nested 8.4.31 → one 8.5.23 resolution, and Nanoid 3.3.12 → 3.3.18.

The larger Git diff against `HEAD` also contains the previously approved Vitest lockfile work and therefore is not an upgrade-only measurement.

### Audit before and after

| Audit | Before | After |
| --- | --- | --- |
| `npm audit` | exit 1; 10 high + 1 low | exit 1; 6 high + 1 low, all in dev/build/lint tooling |
| `npm audit --omit=dev` | exit 1; 4 high | **exit 0; 0 vulnerabilities** |

The remediated runtime paths are Next.js, Next's PostCSS, Sharp/libvips, and Nanoid. Remaining full-audit packages are `brace-expansion`, `browserslist`, `glob`, `js-yaml`, and `postcss-selector-parser`; they are not present in the production-only audit. They should be handled later through a deliberate ESLint/build-tool migration, not `npm audit fix --force`.

### Next 16.3 regression and local-production verification

| Check | Result |
| --- | --- |
| App Router and routing | Build preserved all routes; homepage, `/services`, `/knowledge`, and `/contact` returned 200 |
| Locale/dynamic routes | Four `/de/[slug]` paths remained SSG; `/de` and `/de/turnkey-pcb-assembly` returned 200; Knowledge and admin routes remained dynamic |
| Redirects | Legacy knowledge URL returned the configured 301 target; a `www.huitaipcb.com` Host request returned 301 to the apex-domain path |
| Proxy and protected route | Proxy compiled; anonymous `/admin` returned 307 to `/admin/login`; login returned 200 |
| Server Actions | Compilation passed and no 16.3 regression was found, but action-level admin authorization is missing and is a release blocker |
| Inquiry API | Remained Node runtime and dynamic; invalid local multipart FormData returned 400 `form_invalid` before any Supabase/email/GA4 side effect |
| Image optimization | Local `og-image.jpg` optimization returned 200 as WebP and 200 as AVIF under Next 16.3.4 / Sharp 0.35.4 |
| Conversion protection | 8 test files, 43/43 tests passed; duplicate, pending, attachment, analytics, attribution, and email contracts remained intact |
| SEO protection | 43/43 regression checks passed; no protected SEO page diff |

`npm run start -- -p 3107` reached Ready in 146 ms. After the smoke requests completed without server errors, the local process was intentionally stopped with Ctrl+C; the shell process therefore ended with the expected interrupt exit rather than an application failure. No live inquiry was created.

### Fresh dependency-remediation release gate

| Command | Exit | Concrete result |
| --- | ---: | --- |
| `npm run typecheck` | 0 | No TypeScript diagnostics |
| `npm run lint` | 0 | 0 errors, 18 pre-existing warnings |
| `npm run test` | 0 | 8 files, 43/43 tests, 1.95 seconds |
| `npm run test:seo` | 0 | 43/43 checks |
| `npm run build` | 0 | Next 16.3.4 compiled; 44/44 static pages generated |
| `git diff --check` | 0 | No whitespace error; 8 LF-to-CRLF notices |
| `npm audit` | 1 | 6 high + 1 low, dev/build/lint only |
| `npm audit --omit=dev` | 0 | 0 vulnerabilities |
| Local production smoke | 0 | Public routes, admin redirect, WebP/AVIF, and invalid inquiry validation passed |

### Admin Server Function blocker identified in dependency-remediation review

The following nine mutation functions call Supabase without first verifying both an authenticated user and membership in `admin_users`: inquiry update/archive, customer delete, feedback publish/delete, order update, and article create/update/delete. `src/proxy.ts` currently returns `NextResponse.next()` and the protected layout redirects anonymous page renders, but neither is an action-internal authorization check. The [official Proxy documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) likewise says not to rely on Proxy alone for authorization and to verify authorization inside every Server Function.

RLS reduces exposure for inquiries, customers, and articles when the checked-in policies are applied. The checked-in policy files do not show equivalent RLS coverage for `orders` or `feedback_messages`, and production policy state was not queried in this local-only round. Therefore the Gate cannot claim that direct action POSTs are safely rejected.

Required next remediation, subject to separate approval:

1. Add one server-only `requireAdmin()` guard that validates the Supabase user and `admin_users` membership.
2. Invoke it before all nine mutations and before any service-role read/write.
3. Validate IDs, status enums, numeric fields, and destructive-action inputs.
4. Add tests for anonymous, authenticated-non-admin, malformed, and authorized calls without using production data.
5. Re-run this complete Gate. Only after it passes may rollout proceed: backup/preflight → migration → environment → GA4 Admin → deploy → one labeled test → reconciliation.

## Admin Server Function Authorization Hardening — 2026-09-02

**Current release decision: NOT READY.** The application-layer Server Function authorization blocker is fixed locally, including one additional sensitive order-creation path found by the fresh inventory. Release remains blocked because the repository does not define RLS for `feedback_messages`, does not define the `orders` table or its policies at all, and does not contain reproducible Storage policies for `library-files` or `order-images`. Production policy state was not queried or changed, so this round cannot prove that direct Supabase Data API/Storage access is restricted correctly.

### Threat model and authorization boundary

Every exported Server Function is treated as an independently reachable POST mutation endpoint. Hidden admin UI, unpredictable Action IDs, `src/proxy.ts`, and the protected layout are defense in depth only. The authorization boundary is the function itself.

`src/lib/admin/require-admin.ts` imports `server-only` and performs two independent checks:

1. Authentication: creates the existing cookie-backed Supabase SSR client and calls `auth.getUser()` so Supabase verifies the user; absent/invalid users produce `UNAUTHENTICATED`.
2. Authorization: queries `admin_users.user_id = verifiedUser.id`; no row produces `FORBIDDEN`, while a query error or thrown auth/database exception produces the generic `MUTATION_FAILED` and fails closed.

The `user_id` mapping is confirmed by `supabase/schema.sql`, `supabase/policies.sql`, and the existing protected layout. The existing authorization model treats any `admin_users` row as backend membership; the schema's `admin` / `manager` / `viewer` values are not currently differentiated by `public.is_admin()` or the layout, so this hardening intentionally did not invent a new role hierarchy.

`requireAdmin()` returns the same verified authenticated Supabase client used for the subsequent query. No mutation creates a service-role client. All Guard calls occur before Zod parsing and before any privileged read/write. The public inquiry and feedback ingestion routes retain their separate, intentional service-role use and were not changed.

### Complete sensitive Server Function inventory

The inventory found **10** sensitive Server Functions, not nine. `createOrder` was previously a direct browser `.insert()` and was moved behind the same server-only Guard.

| Function | File | Mutation | Current auth | Current validation | Service role? |
| --- | --- | --- | --- | --- | --- |
| `updateInquiry` | `inquiries/actions.ts` | `inquiries.update` | `requireAdmin()` first | UUID, status enum, notes max | No |
| `archiveInquiry` | `inquiries/actions.ts` | `inquiries.update` to closed | `requireAdmin()` first | UUID | No |
| `deleteCustomer` | `customers/actions.ts` | `customers.delete` | `requireAdmin()` first | UUID | No |
| `togglePublish` | `feedback/actions.ts` | `feedback_messages.update` | `requireAdmin()` first | UUID, strict boolean input, response max | No |
| `deleteFeedback` | `feedback/actions.ts` | `feedback_messages.delete` | `requireAdmin()` first | UUID | No |
| `createOrder` | `orders/actions.ts` | `orders.insert` | `requireAdmin()` first | required customer, status enum, finite bounded numerics, text/email/http(s) image URLs | No |
| `updateOrder` | `orders/actions.ts` | `orders.update` | `requireAdmin()` first | bounded opaque ID, status enum, finite bounded numerics, text max | No |
| `createArticle` | `knowledge/actions.ts` | `articles.insert` | `requireAdmin()` first | title/slug/text bounds, status enum, read-time range | No |
| `updateArticle` | `knowledge/actions.ts` | `articles.update` | `requireAdmin()` first | UUID plus full article validation | No |
| `deleteArticle` | `knowledge/actions.ts` | `articles.delete` | `requireAdmin()` first | UUID | No |

The repository does not define the `orders` table, so its ID type cannot be verified as UUID. To avoid inventing a schema, order update accepts only a trimmed 1–128 character opaque identifier restricted to letters, numbers, underscore, and hyphen. The production schema must confirm this contract during preflight.

### Input validation and safe errors

- Confirmed UUID tables use `z.string().uuid()`.
- Inquiry, order, article, and boolean state values use explicit allowlists.
- Quantity must be a finite non-negative integer; monetary fields must be finite and non-negative with a technical upper bound that prevents unsafe numeric payloads.
- Editable text is trimmed and bounded without changing the CMS data model.
- Empty/invalid delete IDs fail before `.delete()`.
- Supabase mutation errors are converted to `MUTATION_FAILED`; SQL, table, token, cookie, and service-role details are not returned.
- `redirect()` and `revalidatePath()` occur only after a successful mutation.

### TDD and zero-side-effect evidence

The pre-change baseline was 43/43 tests. RED was observed before implementation:

- the first security run exited 1 because the Guard/action modules did not exist;
- after minimal not-implemented shells were added, 39/40 behavioral assertions failed for the expected authorization, validation, and old article-action bypass reasons;
- the additional order-creation test produced 4 expected failures before `createOrder` existed;
- thrown `auth.getUser()` and `admin_users` lookup exceptions each produced a failing red test before generic fail-closed handling was added;
- the page-read wrapper first failed both anonymous/forbidden redirect assertions before implementation.

Final security coverage is 50 tests: 40 table-driven Action tests (10 functions × anonymous, authenticated non-admin, admin valid, and malformed admin input), six core Guard tests, and four page-Guard tests. Unauthorized/malformed cases assert zero `.insert()`, `.update()`, or `.delete()` calls and no success redirect/revalidation. Admin fixtures enter only the intended table and mutation path. No production account or database is used.

### Sensitive read audit

Ten protected admin pages now call `requireAdminPage()` before customer, inquiry, order, feedback, article-draft, or library reads. It converts only `UNAUTHENTICATED` / `FORBIDDEN` into `/admin/login` redirects; authorization-backend failures remain 500/fail-closed. This avoids relying on parallel layout execution and keeps anonymous smoke logs clean.

The inquiry detail page previously used `createServiceClient()` to read full inquiry PII, files, and signed attachment URLs. It now uses the verified authenticated client returned by the Guard, removing the service-role RLS bypass. No anonymous admin Route Handler that reads customer data was found. Public CMS reads that use a service client explicitly filter `status = 'published'`.

### Checked-in RLS and Storage matrix

This matrix describes repository SQL only, not production state. A service-role client bypasses RLS by design; none of the ten admin mutations now uses it.

| Table | SELECT RLS | INSERT | UPDATE | DELETE | Service-role bypass |
| --- | --- | --- | --- | --- | --- |
| `inquiries` | Admin via `is_admin()` | Admin | Admin | Admin | Yes |
| `customers` | Admin via `is_admin()` | Admin | Admin | Admin | Yes |
| `feedback_messages` | **No checked-in RLS/policy** | **No policy** | **No policy** | **No policy** | Yes |
| `orders` | **Table/schema absent** | **Unknown** | **Unknown** | **Unknown** | Yes |
| `articles` | Published public; admin all | Admin | Admin | Admin | Yes |
| `admin_users` | Own row only | No checked-in policy | No checked-in policy | No checked-in policy | Yes |

Additional browser-side mutation boundaries:

- `library_files` browser insert/delete is covered by checked-in admin-only table RLS, but the `library-files` Storage bucket policy is not checked in.
- `article-images` upload remains browser-side and has checked-in admin-only insert/update/delete Storage policies.
- `order-images` upload remains browser-side and has no checked-in bucket/policy definition.
- `feedback_messages` insertion remains an intentional public form Route Handler using service role; direct Data API access still requires an explicit production RLS decision.

These gaps were not patched automatically because the approved scope explicitly reserved RLS for a separate defense-in-depth workflow and production schema inspection is required before safe SQL can be written or applied.

### CSRF / Origin review

`next.config.js` does not configure custom `serverActions.allowedOrigins`. According to the [Next.js `serverActions` configuration documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions), Next compares Origin with Host and allows only same-origin Action requests by default. No custom CSRF token or cross-origin allowlist was added. This built-in check is supplementary and never replaces Authentication or Authorization.

### Fresh hardening gate

| Command | Exit | Concrete result |
| --- | ---: | --- |
| `npm run typecheck` | 0 | No TypeScript diagnostics |
| `npm run lint` | 0 | 0 errors; 17 existing warnings |
| `npm run test` | 0 | 11 files, 93/93 tests; includes 43 conversion tests and 50 admin-security tests |
| `npm run test:seo` | 0 | 43/43 checks |
| `npm run build` | 0 with one local worker | Next 16.3.4 compiled and generated 44/44 pages |
| `npm audit` | 1 | 6 high + 1 low, all in dev/build/lint tooling |
| `npm audit --omit=dev` | 0 | 0 vulnerabilities |
| Local production smoke | 0 | Public/locale routes, anonymous admin redirects, WebP/AVIF, and invalid inquiry validation passed; server log stayed clean |

Two default-concurrency build attempts exited 1 during page-data collection because the Windows host had only about 0.93 GB free while Next launched 11 workers; the second emitted V8 `Out of memory: HashMap::Initialize`. A temporary local `experimental.cpus: 1` setting allowed the exact `npm run build` command to pass, after which the setting was removed and `next.config.js` returned to a zero-diff state. This is recorded as a host-resource warning, not presented as an application pass under default local concurrency.

### Remaining blockers and next review

Before any controlled rollout approval:

1. Read-only inspect production definitions for `orders`, `feedback_messages`, `admin_users`, and the `library-files` / `order-images` buckets without printing data or credentials.
2. Draft and separately approve minimal RLS/Storage policies if production does not already enforce equivalent admin-only access; do not weaken the public inquiry/feedback ingestion design.
3. Confirm the real `orders.id` and numeric column types/constraints and align validation if necessary.
4. Re-run the complete Gate on a host/CI runner with sufficient memory under the actual build configuration.

No migration, production database setting, GA4 setting, environment, deployment, email, live inquiry, commit, or push occurred in this hardening round.

## Pre-remediation production readiness review — 2026-09-02

**Release decision: NOT READY.** The duplicate/pending reliability defect is fixed locally and the migration is suitable for a controlled, preflighted application. The remaining blocker is dependency security: the fresh production-only npm audit reports four high-severity runtime findings, including the directly installed `next@16.2.6`. This repository uses App Router, an admin `proxy`, and admin Server Actions, so the affected framework paths cannot be dismissed as unused without a separately verified remediation.

No dependency was upgraded and no `npm audit fix` command was run. Production rollout must remain blocked until a separate dependency-remediation change upgrades or otherwise resolves the production audit findings and passes the full release gate again.

### Duplicate plus pending behavior

An idempotent duplicate now distinguishes terminal and incomplete persisted states:

| Existing row | API result | Browser behavior | Side effects |
| --- | --- | --- | --- |
| All four status groups terminal | `duplicate=true`, `processingIncomplete=false`, `requiresManualReview=false` | Normal saved-result copy; key can be cleared | No file/email/analytics replay |
| Any file/email/analytics status `pending` | `duplicate=true`, `processingIncomplete=true`, `requiresManualReview=true` | “Inquiry saved — verification pending”; session idempotency key is retained | No upload, email, Measurement Protocol, or database-row replay |

The API still returns business success because the inquiry row exists, but it no longer represents incomplete delivery as fully processed. A status-persistence failure during the original request also returns `processingIncomplete=true` so the browser retains the correlation key and displays verification-pending copy.

Automatic recovery remains intentionally absent. Pending email or analytics states require manual investigation; `analytics_status=pending` must never be blindly replayed.

### Dependency and lockfile gate

Read-only commands and observed results:

| Check | Exit | Result |
| --- | ---: | --- |
| `npm audit` | 1 | 11 total findings: 10 high, 1 low |
| `npm audit --omit=dev` | 1 | 4 high production/runtime findings |

Production audit findings:

- direct `next@16.2.6`, covering multiple Next.js advisories;
- transitive `postcss@8.4.31` under Next;
- optional runtime `sharp@0.34.5` used by Next image handling;
- `nanoid@3.3.12`, shared through PostCSS resolution.

The other reported vulnerable packages are associated with development/build tooling: `brace-expansion`, `browserslist`, `glob`, `js-yaml`, `postcss-selector-parser`, and the development PostCSS path. They still require maintenance, but they are not the production-only audit blocker.

Lockfile comparison against `HEAD`:

- lockfile format remained version 3;
- root `package.json` dependency changes are only the `typecheck`/`test` scripts and `vitest@^3.2.7` dev dependency;
- package-lock entries: 617 before, 709 after;
- 92 entries added, 0 removed, and 0 existing package versions changed;
- the 92 additions are the Vitest/Vite/esbuild/Rollup/Chai test tree and platform-specific optional packages;
- Next 16.2.6, React/ReactDOM 19.2.6, Supabase JS 2.105.4, Resend 4.8.0, PostCSS 8.5.14, Nanoid 3.3.12, and Sharp 0.34.5 did not change.

The large textual lockfile diff is therefore explainable by adding the test runner and its optional cross-platform graph, not an unrelated production-version drift. It does not remove the pre-existing production security blocker.

### Migration release review

- **Additive:** only new columns, constraints, comments, and two indexes are introduced. There is no `UPDATE`, `DELETE`, drop, rename, or RLS change.
- **Legacy rows:** new side-effect status columns have no defaults and remain `NULL`; `NULL` means legacy outcome unknown, never pending/failed/sent. `analytics_attempt_count=0` is not evidence for a legacy row when `analytics_status IS NULL`.
- **New rows:** the application explicitly writes initial states and both UUID correlation values.
- **Checks:** file/email/analytics/retry values and non-negative/count-order rules are constrained while permitting legacy nulls.
- **Uniqueness:** partial unique indexes affect only non-null `idempotency_key` and `analytics_event_id`, so legacy null rows do not conflict.
- **Rerun:** the transaction, `ADD COLUMN IF NOT EXISTS`, guarded named constraints, and `CREATE INDEX IF NOT EXISTS` make a successful migration rerunnable. They do not repair a pre-existing same-name object with the wrong definition.
- **Preflight:** compare existing column types, constraint definitions, and index definitions by name before application. Constraint validation and non-concurrent index creation can acquire locks and should be scheduled appropriately.
- **Rollback:** revert application traffic first and leave additive columns in place. Removing columns/indexes is destructive and requires a separately approved, backed-up down migration.

Migration conclusion: technically acceptable for the specified order after schema/name/lock preflight, but it must not be applied while the overall release decision is NOT READY.

### GA4 `sent` semantics

`analytics_status=sent` means only that the Measurement Protocol request returned HTTP 2xx. It does **not** mean that GA4 displayed the event, joined it to the original session, assigned the expected source/medium, or confirmed a Key Event in reports. No admin UI currently displays this field. Any future UI must label it as transport acceptance rather than confirmed attribution.

Database attribution remains authoritative. GA4 Display Attribution remains secondary and requires post-deployment reconciliation.

### Email and owner-fact gate

The UI and both email templates remain truthful for `saved`, `partial`, `failed`, and `skipped_unconfigured` outcomes. A Resend `sent` state means the API returned a message ID, not that mailbox delivery was independently confirmed by a webhook.

The following existing wording is not changed and requires owner fact confirmation before rollout:

- response “within 24 hours”;
- “full turnkey quote” when files are complete;
- “one dedicated project engineer”.

Huitai PCB brand wording and the legal-company footer remain unchanged.

## Prepared migration

- File: `supabase/migrations/20260901_conversion_attribution.sql`
- State: prepared locally; not executed.
- Nature: additive columns, nullable legacy side-effect states, file expected/saved counts, two unique partial indexes, and named check constraints.
- Historical semantics: null side-effect status means “legacy outcome unknown,” not pending or failed.
- Correlation: `idempotency_key` prevents a second inquiry row; `analytics_event_id` is a non-PII stable identifier for the one canonical analytics event.

### Analytics failure and future replay

This release performs no Queue/Cron/Worker retry and no automatic in-request retry.

- `analytics_status=sent`: Measurement Protocol returned HTTP 2xx only; do not replay. This is not proof of GA4 report appearance or session attribution.
- `analytics_status=failed`, `analytics_retry_state=safe`: GA returned a definite rejection. A future separately approved replay may atomically claim the row, reuse the same `analytics_event_id`, and increment the persisted attempt count.
- `analytics_status=failed`, `analytics_retry_state=manual_review`: a network or timeout outcome is ambiguous. Do not blindly replay; first verify downstream evidence because GA may have accepted the request before the response was lost.
- `analytics_status=skipped_unconfigured`: the event was not attempted. A future replay may occur only after configuration, with an atomic persisted-state claim and the same `analytics_event_id`.

The application-level persisted state is the duplicate-prevention boundary. GA4 `event_id` is retained for correlation but is not treated as a guaranteed GA deduplication mechanism.

## Environment-variable design

No environment file was read or edited. Values must be configured manually in the future deployment environment.

| Variable | Scope | Purpose | Missing behavior |
|---|---|---|---|
| `GA4_MEASUREMENT_ID` | Server only | GA4 web-stream ID for Measurement Protocol | Inquiry saves; analytics becomes `skipped_unconfigured` |
| `GA4_API_SECRET` | Server only, secret | Measurement Protocol API secret | Inquiry saves; analytics becomes `skipped_unconfigured` |
| `RESEND_API_KEY` | Server only, secret | Existing Resend credential | Email status becomes `skipped_unconfigured` |
| `INQUIRY_NOTIFICATION_EMAIL` | Server only | Existing comma-separated administrator recipients | Existing documented fallback is used only if retained by owner |
| `INQUIRY_FROM_EMAIL` | Server only | Existing verified sender | Existing documented fallback is used only if retained by owner |
| `NEXT_PUBLIC_SITE_URL` | Public configuration | Canonical safe origin for internal administrator link construction | Link is omitted or safely falls back, never built from request data |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GA_ID` | Browser-visible | Existing page-view and diagnostic-event stream | Browser diagnostics are skipped |

`GA4_API_SECRET` must never use a `NEXT_PUBLIC_` prefix.

## GA4 Admin operations for a later approved rollout

No GA4 Admin setting was changed during this work. After migration review and before a separately approved validation inquiry, an administrator should:

1. Keep `generate_lead` as the only primary website-lead Key Event.
2. Remove Key Event status from `quote_click`, `whatsapp_click`, and `email_click`; retain them as raw micro events.
3. Keep `rfq_form_start`, `rfq_file_upload`, and `quote_cta_click` as non-Key diagnostics.
4. Leave Enhanced Measurement available, but use `rfq_form_start`—not generic automatic `form_start`—for the Huitai business funnel.
5. Create a Measurement Protocol API secret for the web stream and store it server-side as `GA4_API_SECRET`.
6. After deployment, run one separately authorized inquiry labeled as a test and reconcile database row, attachments, both email states, exactly one `generate_lead`, database attribution, and GA4 displayed attribution.

## File-state messaging contract

Both the UI and both email templates must use the persisted file outcome:

| `files_status` | UI and email meaning |
|---|---|
| `not_required` | Inquiry saved; no attachment claim |
| `saved` | All validated files were stored and recorded |
| `partial` | Inquiry saved; only some files were stored/recorded; buyer and administrator are warned |
| `failed` | Inquiry saved; no submitted file was fully stored/recorded; buyer is asked to resend attachments |

Neither administrator nor customer email may claim all files were received when the state is `partial` or `failed`.

## Future production rollout and rollback gates

The release is currently blocked. Dependency remediation and application-layer admin authorization are complete locally. After production RLS/Storage preflight, any separately approved policy remediation, and a complete release gate on a sufficiently provisioned build host, use this exact order:

1. Back up and review the production schema and confirm no existing conflicting columns, indexes, or constraints.
2. Review and execute the approved migration in Supabase.
3. Configure the server variables in the correct Vercel environments.
4. Apply the GA4 Admin changes above.
5. Deploy the reviewed code.
6. Run one separately authorized and clearly labeled live test inquiry.
7. Reconcile the authoritative database attribution and all persisted side-effect states against GA4 display data.

If rollout must be reversed, revert application traffic first. Database columns may safely remain additive while evidence is reviewed; dropping columns or indexes is destructive and requires a separate approved rollback migration and backup.

## TDD evidence

Tests were written and observed failing before each production module was added or completed. The focused red/green record is:

| Slice | Expected red evidence | Green evidence |
| --- | --- | --- |
| State types | 1 suite failed because the module did not exist | 1/1 passed |
| Attribution sanitation and keys | Suite failed because the module did not exist | 4 initial tests passed; expanded suite is 6/6 |
| Form/file validation | Suite failed because the module did not exist | 5/5 passed |
| Email and server analytics | 2 suites failed; 4 email assertions failed and analytics module was missing | one case-sensitive assertion then failed as expected after implementation; corrected suite reached 10/10 |
| Inquiry orchestration | Suite failed because the process module did not exist | first implementation reached 7/8; corrected dependency contract reached 8/8 |
| First-touch capture and warning-aware response | 2 suites/2 tests failed before behavior existed | combined affected suites reached 9/9 |
| Supabase adapter | Suite failed because the module did not exist | 3/3 passed |
| Runtime response guard | 1/4 failed before the stricter guard | 4/4 passed |
| Duplicate plus pending server boundary | 5/12 failed because the response lacked incomplete/manual-review state for one terminal and four pending cases | process suite reached 12/12; pending duplicates produce no row, upload, email, analytics, or status-update side effect |
| Incomplete duplicate browser contract | 3/6 failed because old complete-success copy was used, the old response shape was accepted, and key-retention logic was absent | client-response suite reached 6/6; incomplete results retain the idempotency key and show verification-pending copy |

The final unit-test suite contains 8 files and 43 tests. It covers the requested validation, idempotency, partial-file, email, analytics, acquisition, persistence-mapping, privacy-safe log, and truthful-response cases. The release-gate additions explicitly cover the terminal duplicate, each of the four independently pending status groups, no second row or side-effect replay, truthful browser copy, browser idempotency-key retention, and the original complete-success path.

### Test safety warning

During the first red email test, the test passed an injected sender argument to the old function, but that old function did not accept/use the injection and called the Resend SDK with its placeholder key. Resend returned an HTTP 401 validation response. No email was delivered and no inquiry was created. After the email adapter was implemented, all email tests use an injected sender and make no external request.

## Pre-remediation validation record

The required local commands were run after implementation. A final fresh sequence is recorded below:

| Command | Exit code | Concrete result |
| --- | ---: | --- |
| `npm run typecheck` | 0 | TypeScript completed with no diagnostics |
| `npm run lint` | 0 | 0 errors and 18 warnings; warnings are in pre-existing industry/knowledge/admin/proxy files, not the conversion files |
| `npm run test` | 0 | 8 test files passed; 43/43 tests passed in 1.90 seconds |
| `npm run test:seo` | 0 | 43/43 SEO regression checks passed |
| `npm run build` | 0 | Next.js 16.2.6 production build compiled; TypeScript completed; 44/44 static pages generated; `/api/inquiry` remained a dynamic route |
| `git diff --check` | 0 | No whitespace errors; Git emitted LF-to-CRLF working-copy warnings for 8 tracked files |
| `npm audit` | 1 | 11 findings: 10 high and 1 low; no fix was applied |
| `npm audit --omit=dev` | 1 | 4 high production/runtime findings; no fix was applied |

The first post-implementation `npm run test:seo` run exited 1 because its historical assertion still required the removed browser `contact_form_submit`. The regression was updated to protect the approved architecture instead: first-touch capture, `rfq_form_start`, the API process boundary, one server `generate_lead`, and no browser success events. The rerun passed 43/43.

The first post-implementation typecheck found three concrete type errors: the Resend request option name and two dynamically constructed Supabase select types. Those were corrected before the final validation sequence.

The first full-suite rerun after the release-gate tests exited 1 before reporting test failures. Focused tests passed, and a controlled diagnosis reproduced an esbuild `cannot allocate memory` failure when Vitest used file parallelism; the same 43 tests passed with file parallelism disabled at both one and two workers. `vitest.config.ts` now sets `fileParallelism: false`, after which the exact required `npm run test` command passed 43/43. No test was skipped and no coverage case was removed.

At that pre-remediation gate, the audits reported 11 total findings (10 high, 1 low) and 4 high production/runtime findings. The current post-remediation results are recorded in the Dependency Remediation section above.

## Local file-change inventory

### Dependency remediation changes on 2026-09-02

- `package.json` — Next 16.2.6 → 16.3.4 only
- `package-lock.json` — normal npm resolution for Next and required transitive/optional packages
- this implementation report
- `docs/reports/seo-geo-action-tracker.md` — only the Conversion row's permitted proposed action, status, next-review, and evidence fields

### Production-readiness changes on 2026-09-02

- `src/lib/inquiry/process.ts`
- `src/lib/inquiry/process.test.ts`
- `src/lib/inquiry/types.ts`
- `src/lib/inquiry/client-response.ts`
- `src/lib/inquiry/client-response.test.ts`
- `src/components/InquiryForm.tsx`
- `src/lib/analytics/server.ts`
- `supabase/migrations/20260901_conversion_attribution.sql`
- `supabase/schema.sql`
- `vitest.config.ts`
- this implementation report
- `docs/reports/seo-geo-action-tracker.md` (only the Conversion row's permitted priority, proposed action, status, next-review, and evidence fields for this gate)

### Conversion and admin-hardening implementation

- `package.json`
- `package-lock.json`
- `vitest.config.ts`
- `scripts/seo-regression.mjs`
- `src/app/api/inquiry/route.ts`
- `src/components/Analytics.tsx`
- `src/components/InquiryForm.tsx`
- `src/app/admin/(protected)/page.tsx`
- `src/app/admin/(protected)/customers/page.tsx`
- `src/app/admin/(protected)/customers/actions.ts`
- `src/app/admin/(protected)/feedback/page.tsx`
- `src/app/admin/(protected)/feedback/actions.ts`
- `src/app/admin/(protected)/inquiries/page.tsx`
- `src/app/admin/(protected)/inquiries/[id]/page.tsx`
- `src/app/admin/(protected)/inquiries/actions.ts`
- `src/app/admin/(protected)/knowledge/page.tsx`
- `src/app/admin/(protected)/knowledge/[id]/edit/page.tsx`
- `src/app/admin/(protected)/knowledge/actions.ts`
- `src/app/admin/(protected)/library/page.tsx`
- `src/app/admin/(protected)/orders/page.tsx`
- `src/app/admin/(protected)/orders/[id]/page.tsx`
- `src/app/admin/(protected)/orders/new/page.tsx`
- `src/app/admin/(protected)/orders/actions.ts`
- `src/lib/admin/action-validation.ts`
- `src/lib/admin/require-admin.ts`
- `src/lib/admin/require-admin-page.ts`
- `src/lib/admin/admin-actions.test.ts`
- `src/lib/admin/require-admin.test.ts`
- `src/lib/admin/require-admin-page.test.ts`
- `src/test/server-only.ts`
- `src/lib/analytics/attribution.ts`
- `src/lib/analytics/attribution.test.ts`
- `src/lib/analytics/server.ts`
- `src/lib/analytics/server.test.ts`
- `src/lib/email/resend.ts`
- `src/lib/email/resend.test.ts`
- `src/lib/inquiry/client-response.ts`
- `src/lib/inquiry/client-response.test.ts`
- `src/lib/inquiry/process.ts`
- `src/lib/inquiry/process.test.ts`
- `src/lib/inquiry/supabase-adapter.ts`
- `src/lib/inquiry/supabase-adapter.test.ts`
- `src/lib/inquiry/types.ts`
- `src/lib/inquiry/types.test.ts`
- `src/lib/inquiry/validation.ts`
- `src/lib/inquiry/validation.test.ts`
- `supabase/schema.sql`
- `supabase/migrations/20260901_conversion_attribution.sql`

### Specifications, plan, and audit documents

- `docs/superpowers/specs/2026-09-01-conversion-attribution-design.md`
- `docs/superpowers/specs/2026-09-01-seo-aeo-geo-audit-design.md`
- `docs/superpowers/plans/2026-09-01-conversion-attribution.md`
- `docs/superpowers/plans/2026-09-01-seo-aeo-geo-audit.md`
- `docs/reports/seo-aeo-geo-content-map.md`
- `docs/reports/pcba-buyer-question-library.md`
- `docs/reports/pcba-aeo-topic-clusters.md`
- `docs/reports/seo-aeo-geo-strategy-2026-09-01.md`
- `docs/reports/seo-geo-daily/2026-09-01-aeo-content-template.md`
- `docs/reports/seo-geo-daily/2026-09-01-ai-crawler-audit.md`
- `docs/reports/seo-geo-daily/2026-09-01-entity-audit.md`
- `docs/reports/seo-geo-daily/2026-09-01-geo-winner-analysis.md`
- this implementation report
- `docs/reports/seo-geo-action-tracker.md`, with only permitted evidence/status/priority/next-review/proposed-action fields updated in the relevant rows

Pre-existing user changes in `src/app/_metadata.ts` were not edited. The pre-existing Huitai PCB brand wording in `src/lib/email/resend.ts` was retained. No business-page content or metadata was changed.

## Production status

- Dependency remediation: **prepared locally; Next 16.3.4 and production audit 0 vulnerabilities; not deployed**.
- Admin authorization hardening: **10 Server Functions use action-internal Authentication + Authorization and runtime validation; not deployed**.
- Release gate: **NOT READY because production-equivalent RLS/Storage restrictions for feedback, orders, library files, and order images are not reproducible from checked-in SQL and were not verified in production**.
- Migration: **prepared locally, not executed**.
- Environment values: **documented by name only; no environment file was read or edited**.
- GA4 Admin: **manual instructions prepared; no setting changed**.
- Live inquiry/email: **not sent**; the red-test placeholder request described above was rejected before delivery.
- Deployment: **not performed**.
- Commit/push: **not performed**.
- Turnkey, BOM, and GEO-winner pages: **not modified**.

## Final repository snapshot

The final content-audit integrity check counted 58 URL rows, 60 buyer-question rows, and 13 topic-cluster rows. A scoped protected-page diff returned no files.

`git status --short` at handoff contains these tracked modifications:

```text
 M docs/reports/seo-geo-action-tracker.md
 M package-lock.json
 M package.json
 M scripts/seo-regression.mjs
 M src/app/_metadata.ts
 M src/app/admin/(protected)/customers/page.tsx
 M src/app/admin/(protected)/feedback/page.tsx
 M src/app/admin/(protected)/inquiries/[id]/page.tsx
 M src/app/admin/(protected)/inquiries/page.tsx
 M src/app/admin/(protected)/knowledge/[id]/edit/page.tsx
 M src/app/admin/(protected)/knowledge/actions.ts
 M src/app/admin/(protected)/knowledge/page.tsx
 M src/app/admin/(protected)/library/page.tsx
 M src/app/admin/(protected)/orders/[id]/page.tsx
 M src/app/admin/(protected)/orders/new/page.tsx
 M src/app/admin/(protected)/orders/page.tsx
 M src/app/admin/(protected)/page.tsx
 M src/app/api/inquiry/route.ts
 M src/components/Analytics.tsx
 M src/components/InquiryForm.tsx
 M src/lib/email/resend.ts
 M supabase/schema.sql
```

`src/app/_metadata.ts` is a pre-existing user modification and was not touched in this implementation. The status also contains pre-existing user/untracked skills, images, `inputs/`, `outputs/`, `index.html`, and earlier reports; they were preserved. New task files appear as untracked under the documented report/spec/plan paths, the four admin `actions.ts` modules, `src/lib/admin/`, `src/lib/analytics/`, `src/lib/inquiry/`, `src/lib/email/resend.test.ts`, `src/test/`, `supabase/migrations/`, and `vitest.config.ts`.

Exact tracked `git diff --stat` at handoff (Git does not include untracked files in this statistic):

```text
 docs/reports/seo-geo-action-tracker.md             |   19 +-
 package-lock.json                                  | 2925 +++++++++++++++-----
 package.json                                       |    7 +-
 scripts/seo-regression.mjs                         |   13 +-
 src/app/_metadata.ts                               |   20 +-
 src/app/admin/(protected)/customers/page.tsx       |   16 +-
 src/app/admin/(protected)/feedback/page.tsx        |   31 +-
 src/app/admin/(protected)/inquiries/[id]/page.tsx  |   49 +-
 src/app/admin/(protected)/inquiries/page.tsx       |    4 +-
 .../admin/(protected)/knowledge/[id]/edit/page.tsx |    4 +-
 src/app/admin/(protected)/knowledge/actions.ts     |  101 +-
 src/app/admin/(protected)/knowledge/page.tsx       |    4 +-
 src/app/admin/(protected)/library/page.tsx         |    4 +-
 src/app/admin/(protected)/orders/[id]/page.tsx     |   24 +-
 src/app/admin/(protected)/orders/new/page.tsx      |   21 +-
 src/app/admin/(protected)/orders/page.tsx          |    4 +-
 src/app/admin/(protected)/page.tsx                 |    4 +-
 src/app/api/inquiry/route.ts                       |  218 +-
 src/components/Analytics.tsx                       |   25 +-
 src/components/InquiryForm.tsx                     |  100 +-
 src/lib/email/resend.ts                            |  233 +-
 supabase/schema.sql                                |   43 +
 22 files changed, 2706 insertions(+), 1163 deletions(-)
```

## Production Supabase RLS & Storage Preflight — 2026-09-02

**Initial access state, superseded by the authenticated results below:** the repository baseline was completed before an authenticated read-only production catalog channel became available. The initial `UNKNOWN` matrices are retained as an audit trail only and must not be used as the final production result.

### Initial access attempt and privacy boundary (superseded)

- No Supabase CLI, `psql`, linked `.supabase` project, Vercel project link, database connection environment variable, Supabase CLI access-token artifact, or Docker runtime was available on this host.
- No `.env.local`, `.env.production`, credential, API key, cookie, browser storage, customer row, Storage object row, object name, or file path was read.
- The available Supabase Dashboard browser session redirected to the sign-in page. A connected Chrome session was not available.
- At that initial stage no production SQL had run. After the owner completed Dashboard sign-in, only the catalog queries documented in the authoritative completion section were executed. There was no business-row read, data mutation, migration, Storage operation, Auth change, environment change, GA4 change, deployment, commit, or push.

The authenticated Supabase Dashboard session later became available. The completed query bundle was limited to `pg_catalog`, `information_schema`, `pg_policies`, `pg_get_functiondef`, grants, and allowlisted `storage.buckets` rows. It did not query business rows or `storage.objects` rows.

### Initial production table and RLS matrix (superseded)

Every cell below is deliberately `UNKNOWN`, not an inferred negative result.

| Production object | Exists | RLS enabled | FORCE RLS | SELECT policy | INSERT policy | UPDATE policy | DELETE policy | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `public.inquiries` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `public.inquiry_files` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `public.customers` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `public.feedback_messages` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `public.orders` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `public.articles` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `public.knowledge_articles` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified / legacy-related |
| `public.admin_users` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `public.library_files` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |

`public.inquiry_files` and `public.knowledge_articles` were added to the requested inventory because the application/repository uses or defines them. `relforcerowsecurity=false` will not be treated as a failure by itself when production access is restored.

### Initial production grants matrix (superseded)

| Production table | `anon` grants | `authenticated` grants | Combined grants + RLS decision |
| --- | --- | --- | --- |
| `inquiries` | UNKNOWN | UNKNOWN | UNKNOWN |
| `inquiry_files` | UNKNOWN | UNKNOWN | UNKNOWN |
| `customers` | UNKNOWN | UNKNOWN | UNKNOWN |
| `feedback_messages` | UNKNOWN | UNKNOWN | UNKNOWN |
| `orders` | UNKNOWN | UNKNOWN | UNKNOWN |
| `articles` | UNKNOWN | UNKNOWN | UNKNOWN |
| `knowledge_articles` | UNKNOWN | UNKNOWN | UNKNOWN |
| `admin_users` | UNKNOWN | UNKNOWN | UNKNOWN |
| `library_files` | UNKNOWN | UNKNOWN | UNKNOWN |

This remains a release blocker because grants and policies are separate gates. Supabase's current security guidance explicitly says that grants decide whether a role can perform an operation and RLS decides which rows it can affect; existing projects may automatically grant broad table privileges to `anon` and `authenticated`. See [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) and [Securing your API](https://supabase.com/docs/guides/api/securing-your-api).

### Initial production Storage bucket matrix (superseded)

| Production bucket | Exists | Public | File-size limit | MIME allowlist | Status |
| --- | --- | --- | --- | --- | --- |
| `article-images` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `library-files` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `order-images` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `inquiry-files` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified |
| `knowledge-covers` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unverified / legacy setup reference |

### Initial production Storage policy matrix (superseded)

| Production bucket | SELECT | INSERT | UPDATE | DELETE | Role / expression evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `article-images` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | No production policy definition retrieved | Unverified |
| `library-files` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | No production policy definition retrieved | Unverified |
| `order-images` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | No production policy definition retrieved | Unverified |
| `inquiry-files` | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | No production policy definition retrieved | Unverified |

A private bucket requires RLS authorization for downloads and signed-URL creation, while a public bucket bypasses read access control for anyone with an asset URL. Ownership alone is not access control. See [Storage buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [Storage access control](https://supabase.com/docs/guides/storage/security/access-control), and [Storage ownership](https://supabase.com/docs/guides/storage/security/ownership).

### Repository baseline

This is checked-in/local evidence only.

| Object | Repository definition | Reproducibility / risk finding |
| --- | --- | --- |
| `inquiries` | UUID schema; RLS enabled; `admins_full_inquiries` `FOR ALL` via `public.is_admin()` | No explicit `anon` / `authenticated` grants or revokes; service-role Route performs public ingestion |
| `inquiry_files` | UUID schema; RLS enabled; admin-only `FOR ALL` | No Storage bucket or object-policy SQL for `inquiry-files` |
| `customers` | UUID schema; RLS enabled; admin-only `FOR ALL` | No explicit grants/revokes |
| `feedback_messages` | UUID schema exists | **No checked-in RLS enablement, policy, grants, or revokes** |
| `orders` | **No checked-in table schema** | ID type, numeric types/precision, constraints, RLS, policies, and grants are all unreproducible |
| `articles` | UUID schema; RLS enabled; public SELECT only when `status='published'`; admin `FOR ALL` | No explicit grants/revokes |
| `knowledge_articles` | UUID schema; RLS enabled; published public SELECT; admin `FOR ALL` | Legacy/parallel content table; no explicit grants/revokes |
| `admin_users` | `user_id uuid` PK/FK; role check for `admin`, `manager`, `viewer`; RLS enabled; users can SELECT only their own row | No INSERT/UPDATE/DELETE policy, but grants are not explicitly revoked; `is_admin()` treats every row/role as admin membership |
| `library_files` | UUID schema; RLS enabled; admin-only `FOR ALL` | Browser-side table and Storage mutations require production grants/policies; Storage rules absent from repo |
| `public.is_admin()` | Uses `auth.uid()` and schema-qualified `public.admin_users`; `SECURITY DEFINER STABLE` | No fixed `search_path`; actual owner, execute grants, and production definition unknown. Supabase recommends setting `search_path` for every Security Definer function: [Database Functions](https://supabase.com/docs/guides/database/functions) |
| `article-images` | Repeatable SQL: `public=true`, 5 MiB, image MIME allowlist; public SELECT and admin INSERT/UPDATE/DELETE policies | Reproducible public CMS-image intent; production remains unverified |
| `library-files` Storage | Setup docs say private | Bucket creation/config and `storage.objects` policies absent from repo |
| `inquiry-files` Storage | Setup docs say private; server service-role uploads; authenticated admin creates signed URLs | Bucket creation/config and `storage.objects` policies absent from repo |
| `order-images` Storage | Client uploads then stores `getPublicUrl()` URLs | No bucket/policy SQL. A public bucket conflicts with private order-media handling; a private bucket conflicts with the current permanent-public-URL display path |
| `knowledge-covers` Storage | Setup docs call it a public bucket; current static content uses local `/factory/knowledge-covers/...` URLs | No current Supabase Storage call found; likely a legacy setup reference, production unknown |

### Repository versus production drift

| Object | Repository | Production | Drift classification |
| --- | --- | --- | --- |
| `orders` | Missing schema/policies/grants | Unread | UNKNOWN; production-only is plausible but not proven |
| `feedback_messages` | Table only; no RLS/policies/grants | Unread | UNKNOWN; repository security definition is incomplete |
| `admin_users` | Own-row SELECT policy; no mutation policies; grants unspecified | Unread | UNKNOWN |
| `library-files` bucket | Private intent in docs; no reproducible bucket/policies | Unread | UNKNOWN |
| `order-images` bucket | Only client public-URL usage; no reproducible bucket/policies | Unread | UNKNOWN |
| `inquiry-files` bucket | Private intent in docs; no reproducible bucket/policies | Unread | UNKNOWN |
| `article-images` bucket | Public CMS images; admin write policies | Unread | UNKNOWN |
| `is_admin()` | Security Definer; schema-qualified lookup; no fixed `search_path` | Unread | UNKNOWN |

No object can be classified `SAME`, `PROD STRONGER`, `PROD WEAKER`, or `PROD ONLY` until the production metadata export is authenticated. The repository-only deficiencies above are confirmed reproducibility gaps, not proof of a live exploit.

### Code-path conclusions that do not require production row access

1. Public feedback submission uses `src/app/api/feedback/route.ts` and a server-side service-role client. The current browser does not need direct `anon` INSERT on `feedback_messages`. A minimal future policy design can therefore default to no client writes and preserve public ingestion through the Route.
2. Public feedback display currently comes from static component data, not a production `feedback_messages` SELECT. No anonymous table SELECT is required by the reviewed code. If that product requirement changes, only `is_published=true` rows should be considered for public read.
3. Inquiry rows and `inquiry-files` uploads are created by the service-role server path. Admin reads use the authenticated client and therefore need correct table and Storage SELECT policies.
4. Library files are uploaded, signed, deleted, and removed from the browser under an authenticated session. Both `library_files` table RLS and `storage.objects` bucket-scoped policies are necessary.
5. Order images are uploaded in the authenticated browser, but the application stores and renders public URLs. Before a private-bucket remediation can be considered complete, a later approved code change must replace permanent public URLs with private object paths plus short-lived signed URLs or another controlled delivery path.

### Initial twenty-answer checkpoint (superseded)

1. `orders` exists: **UNKNOWN — production catalog was not authenticated.**
2. `orders.id` type: **UNKNOWN.** The local opaque-ID validator must not be changed until this is confirmed.
3. `orders` RLS: **UNKNOWN.**
4. `anon` / `authenticated` grants on `orders`: **UNKNOWN.**
5. `orders` policies: **UNKNOWN.**
6. `feedback_messages` RLS: **UNKNOWN.** Repository SQL does not enable it.
7. Public feedback INSERT control: **production policy UNKNOWN; application ingestion is confirmed to use a service-role Route.**
8. Anonymous feedback SELECT/UPDATE/DELETE risk: **UNKNOWN in production; potentially severe because repo grants/RLS are unreproducible.**
9. Can ordinary users modify `admin_users`: **UNKNOWN in production.** Repository has no mutation policy, but production grants and additional policies were not read.
10. `library-files` bucket exists: **UNKNOWN.**
11. `library-files` public: **UNKNOWN; repository documentation requires private.**
12. `library-files` policies: **UNKNOWN; none checked in.**
13. `order-images` bucket exists: **UNKNOWN.**
14. `order-images` public: **UNKNOWN; current code assumes public retrieval.**
15. `order-images` policies: **UNKNOWN; none checked in.**
16. `inquiry-files` private: **UNKNOWN; repository documentation requires private.**
17. Anonymous/ordinary-user read risk for inquiry files: **UNKNOWN and P0 until disproved.**
18. `article-images` actual rules: **UNKNOWN in production; repository intent is public read and admin-only write.**
19. Repo/production drift: **cannot be classified without production metadata; confirmed repo gaps are listed above.**
20. True release blockers: **(a) production schema/RLS/grants/Storage policies are unread; (b) `orders` schema remains unknown; (c) private customer-file exposure cannot be excluded; (d) repository lacks reproducible security for feedback, orders, inquiry/library/order Storage; and (e) the order-image public-URL design must be reconciled with the intended privacy boundary.**

### Proposed next remediation, not executed

First finish this same read-only preflight after user login. Only then prepare a separately approved minimal migration and any required order-image code change:

1. Match validation to the real `orders.id`, numeric types, precision, scale, and checks.
2. For sensitive tables, explicitly define RLS and least-privilege grants together. Keep `anon` at no access unless a reviewed public read is genuinely required.
3. Preserve public feedback submission through the server Route; do not expose direct anonymous UPDATE/DELETE or unrestricted SELECT.
4. Keep `admin_users` client mutation closed. Review whether `viewer` should continue to satisfy `is_admin()` before changing role semantics.
5. Keep `inquiry-files` and `library-files` private and bucket-scope every required Storage operation to verified administrators; service-role ingestion remains server-only.
6. Decide the `order-images` privacy model. If private, store object paths and issue signed URLs rather than permanent public URLs.
7. Keep `article-images` public-read/admin-write unless production evidence or product requirements contradict that intent.
8. Harden the Security Definer helper with a fixed safe `search_path` and review function EXECUTE grants, without changing its business semantics accidentally.
9. Add reproducible policy/grant tests for `anon`, non-admin `authenticated`, and admin operations before any production application.

No remediation SQL was created or executed in this round. The next valid state after a complete metadata export is **READY FOR POLICY DESIGN**, not `READY FOR DEPLOY`. The default 11-worker production build still requires a sufficiently provisioned CI/Vercel/clean runner and was not rerun or replaced by a single-worker build in this documentation-only preflight.

### Authenticated production result — authoritative

The owner completed Supabase Dashboard sign-in and the preflight was finished against the `HuiTaiPCB` production project on 2026-09-02. These results supersede every initial `UNKNOWN` matrix above.

Only SELECT queries against `pg_class`, `pg_namespace`, `pg_constraint`, `pg_proc`, `pg_policies`, `information_schema.columns`, `information_schema.role_table_grants`, and allowlisted rows in `storage.buckets` were executed. No public business table, Auth row, `storage.objects` row, object name, file path, or customer data was selected.

#### Production `orders` schema

`public.orders` exists. RLS is enabled, FORCE RLS is false, and `orders.id` is **UUID**.

| Column(s) | Production type | Null/default | Constraint evidence |
| --- | --- | --- | --- |
| `id` | `uuid` | NOT NULL; `uuid_generate_v4()` | Primary key |
| `created_at`, `updated_at` | `timestamptz` | NOT NULL; `now()` | — |
| `customer_name` | `text` | NOT NULL; no default | — |
| `company`, `country`, `email`, `phone`, `product_name`, `notes` | `text` | Nullable; no default | — |
| `quantity` | `integer` / `int4` | Nullable; default `0` | No production non-negative or upper-bound CHECK |
| `board_amount`, `bom_amount`, `unit_price`, `total_amount` | `numeric(12,2)` | Nullable; default `0` | No production non-negative CHECK |
| `currency` | `text` | Nullable; default `USD` | No currency CHECK |
| `status` | `text` | NOT NULL; default `pending` | CHECK: `pending`, `in_production`, `shipped`, `completed`, `cancelled` |
| `image_1`, `image_2`, `image_3` | `text` | Nullable; no default | No URL/path CHECK |

The local numeric bounds are compatible with the production column ceilings: the amount maximum of `9,999,999,999.99` matches `numeric(12,2)`, and the quantity maximum of `10,000,000` is within `int4`. The application does not enforce at most two decimal places, so PostgreSQL may round higher-scale inputs. The database itself does not prevent negative quantity/amount values, although the local Action validator does. Because the ID is confirmed UUID, the next approved code remediation should replace the opaque order-ID validator with UUID validation.

#### Production table/RLS and policy matrix

All nine reviewed public tables exist, have `relrowsecurity=true`, and have `relforcerowsecurity=false`. FORCE RLS is not required for this application and its false state is not classified as a defect.

All listed production policies are `PERMISSIVE`. Policies whose role is `{public}` apply to all roles, with the shown expression determining access.

| Table | SELECT | INSERT | UPDATE | DELETE | Classification |
| --- | --- | --- | --- | --- | --- |
| `inquiries` | `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION: row boundary is correct; grants are broader than needed |
| `inquiry_files` | `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION: row boundary is correct; grants are broader than needed |
| `customers` | `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION: row boundary is correct; grants are broader than needed |
| `feedback_messages` | `is_published=true` OR `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION: intended row boundary; public ingestion is server-side; grants are broader than needed |
| `orders` | `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION / PROD ONLY: correct row boundary but unreproducible and over-granted |
| `articles` | Published rows for public; **all rows for any authenticated user** | **Any authenticated user** | **Any authenticated user** | **Any authenticated user** | **BLOCKER / PROD WEAKER** |
| `knowledge_articles` | Published rows OR `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION: row boundary is correct; broad grants |
| `admin_users` | Own row OR `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION: no ordinary-user self-elevation found; broad grants |
| `library_files` | `is_admin()` | `is_admin()` | `is_admin()` | `is_admin()` | NEEDS REMEDIATION: table boundary is correct; Storage boundary is not |

The `articles` blocker is specific and directly supported by the policy plus grant combination: `authenticated` has SELECT/INSERT/UPDATE/DELETE and the production `admins_full_articles` policy uses `auth.role() = 'authenticated'` for both USING and WITH CHECK. It does not call `is_admin()`. Therefore a signed-in non-admin can read drafts and create, update, or delete CMS articles through the Data API.

#### Production grants matrix

Every reviewed public table grants the same privileges to both `anon` and `authenticated`:

| Table | `anon` | `authenticated` |
| --- | --- | --- |
| `inquiries` | SELECT, INSERT, UPDATE, DELETE (+ REFERENCES, TRIGGER, TRUNCATE) | SELECT, INSERT, UPDATE, DELETE (+ REFERENCES, TRIGGER, TRUNCATE) |
| `inquiry_files` | Same broad grant set | Same broad grant set |
| `customers` | Same broad grant set | Same broad grant set |
| `feedback_messages` | Same broad grant set | Same broad grant set |
| `orders` | Same broad grant set | Same broad grant set |
| `articles` | Same broad grant set | Same broad grant set |
| `knowledge_articles` | Same broad grant set | Same broad grant set |
| `admin_users` | Same broad grant set | Same broad grant set |
| `library_files` | Same broad grant set | Same broad grant set |

RLS currently prevents row-level SELECT/INSERT/UPDATE/DELETE where the policy expressions deny access, but the grant surface is not least privilege and is not reproduced in repository SQL. The extra REFERENCES/TRIGGER/TRUNCATE grants were also confirmed. The Data API finding above does not rely on those extra privileges: `articles` is exploitable through ordinary DML grants plus its authenticated-allow policy.

#### Production constraints

The production primary keys, foreign keys, unique constraints, and checks match the checked-in schemas for the tables the repository defines. Important results:

- `orders`: UUID primary key and only the five-value status CHECK; no numeric CHECK.
- `feedback_messages`: UUID primary key and `reviewed_by → auth.users(id)`; no category/publish-state CHECK beyond column types/defaults.
- `admin_users`: `user_id` UUID primary key/FK with cascade delete; role CHECK permits `admin`, `manager`, and `viewer`.
- `inquiries`: UUID primary key, status CHECK, and `assigned_to` FK. The prepared attribution/status columns, checks, and unique indexes are absent because the migration has not been applied, as required.

#### Production admin helper

`public.is_admin()` is owned by `postgres`, is `STABLE SECURITY DEFINER`, takes no client parameter, and returns whether `public.admin_users.user_id = auth.uid()`. Its production `search_path` is fixed to `public`, and both referenced schemas are explicit. EXECUTE is granted to `anon`, `authenticated`, and `service_role`; calling it only reveals the caller's own membership boolean.

This function does not allow ordinary-user self-elevation. The production `admin_users` policies require `is_admin()` for INSERT/UPDATE/DELETE and allow an authenticated user to SELECT only their own row. However, `is_admin()` intentionally treats every `admin_users` row as full membership: `viewer`, `manager`, and `admin` are not differentiated. That is an authorization-model decision for a later round, not an unapproved change here.

Production is stronger than the current repository function definition because it fixes `search_path=public`. A future reproducibility migration should retain an explicit safe search path; an empty search path with fully schema-qualified objects is the stricter option recommended by Supabase.

#### Production Storage bucket matrix

`storage.buckets` and `storage.objects` both have RLS enabled and FORCE RLS disabled.

| Bucket | Exists | Public | Size limit | MIME allowlist | Classification |
| --- | --- | --- | --- | --- | --- |
| `article-images` | Yes | Yes | 5 MiB | JPEG, PNG, WebP, AVIF, GIF | SAFE for intended public CMS media |
| `inquiry-files` | Yes | No | 25 MiB | None | SAFE from public read; NEEDS REMEDIATION for the new authenticated-admin signed-URL path |
| `library-files` | Yes | No | None | None | **BLOCKER: any authenticated user can read/upload/delete** |
| `order-images` | Yes | **Yes** | None | None | **BLOCKER: public customer/order media; any authenticated user can upload/delete** |
| `knowledge-covers` | No | — | — | — | REPO/DOC ONLY legacy reference; no current Supabase call found |

#### Production Storage policy matrix

| Bucket | SELECT | INSERT | UPDATE | DELETE | Classification |
| --- | --- | --- | --- | --- | --- |
| `article-images` | Public bucket and public bucket-scoped SELECT | `is_admin()` | `is_admin()` | `is_admin()` | SAFE / matches repo intent |
| `inquiry-files` | `service_role` only | `service_role` only | `service_role` only | `service_role` only | No anon/ordinary-authenticated read risk found; service-role policies are redundant because service role bypasses RLS |
| `library-files` | Any `authenticated` user | Any `authenticated` user | No policy | Any `authenticated` user | **BLOCKER: not admin-only** |
| `order-images` | Public bucket plus public SELECT policy | Any `authenticated` user | No policy | Any `authenticated` user | **BLOCKER: public and not admin-only** |

No `storage.buckets` policies were present. Both `storage.buckets` and `storage.objects` carry broad table grants for `anon`, `authenticated`, and `service_role`; object access is currently determined by bucket public state and the `storage.objects` policies above.

The private `inquiry-files` bucket has no anon or ordinary-authenticated SELECT policy, so the requested customer-file exposure check is negative. However, the new local inquiry detail page now uses an authenticated admin client to call `createSignedUrl()`. After deployment, that path will be denied because production only has service-role Storage policies. A separately approved policy change must allow bucket-scoped `is_admin()` SELECT before this local hardening can roll out without breaking administrator attachment access.

#### Repository versus production drift

| Object | Repo | Production | Drift |
| --- | --- | --- | --- |
| `inquiries` attribution/status fields | Prepared additive migration, not applied | Legacy 16-column schema | REPO ONLY / expected pending migration |
| `orders` | No schema/policy/grant definition | UUID table, numeric schema, RLS and admin policy | PROD ONLY |
| `feedback_messages` RLS | No checked-in enablement/policy | RLS with published-public SELECT and admin management | PROD STRONGER but unreproducible |
| `articles` admin policy | `is_admin()` | Any `authenticated` user | **PROD WEAKER / BLOCKER** |
| `admin_users` admin-management policy | Own-row SELECT only | Own-row SELECT plus `is_admin()` management | PROD ONLY / safe but drifted |
| `is_admin()` | No fixed search path | Fixed `search_path=public` | PROD STRONGER / drifted |
| Table grants | No GRANT/REVOKE definitions | Broad default-style grants to `anon` and `authenticated` | PROD ONLY / NEEDS REMEDIATION |
| `article-images` | Public 5 MiB image bucket; public read/admin write | Same effective definition | SAME |
| `inquiry-files` | Private intent in docs; no bucket/policy SQL | Private 25 MiB; service-role policies only | PROD ONLY / safe today; incompatible with new admin signed-URL path |
| `library-files` | Private intent; no Storage SQL | Private, but any authenticated read/upload/delete | **PROD WEAKER than intended / BLOCKER** |
| `order-images` | No Storage SQL; code uses public URLs | Public, unlimited, no MIME allowlist; any authenticated upload/delete | **PROD ONLY and unsafe / BLOCKER** |
| `knowledge-covers` | Public legacy setup instruction | Bucket absent | REPO ONLY / stale documentation |

#### Final answers

1. `orders` exists: **Yes.**
2. `orders.id`: **UUID.**
3. `orders` RLS: **Enabled; FORCE RLS false.**
4. `orders` grants: **anon and authenticated both have SELECT/INSERT/UPDATE/DELETE plus REFERENCES/TRIGGER/TRUNCATE.**
5. `orders` policies: **one PERMISSIVE `{public}` ALL policy with `USING is_admin()` and `WITH CHECK is_admin()`.**
6. `feedback_messages` RLS: **Enabled.**
7. Public feedback INSERT: **not allowed directly by RLS; the website uses the server-side service-role Route.**
8. Feedback anonymous risk: **published rows are intentionally public SELECT; no anonymous UPDATE/DELETE or direct INSERT policy. Broad grants should still be reduced.**
9. Can an ordinary authenticated user modify `admin_users`: **No, not under the retrieved policies.** Only existing admins satisfy the mutation policy.
10. `library-files` exists: **Yes.**
11. `library-files` public: **No.**
12. `library-files` policies: **any authenticated user can SELECT, INSERT, and DELETE; no UPDATE policy. This is a blocker.**
13. `order-images` exists: **Yes.**
14. `order-images` public: **Yes.**
15. `order-images` policies: **public SELECT; any authenticated user INSERT and DELETE; no UPDATE. This is a blocker.**
16. `inquiry-files` private: **Yes.**
17. Inquiry-file anonymous/ordinary-user read risk: **No matching SELECT policy and the bucket is private; no exposure was found.** The upcoming authenticated-admin signed-URL path needs an admin SELECT policy.
18. `article-images`: **public bucket, 5 MiB and image MIME allowlist; public SELECT; `is_admin()` INSERT/UPDATE/DELETE.**
19. Repo/production drift: **orders, feedback RLS, grants, three private/business Storage definitions, admin management, and the stronger production function search path are not reproducible; production articles/library/order-image access is weaker than intended.**
20. Confirmed release blockers: **authenticated-wide CMS article management, authenticated-wide internal-library file access/mutation, and public/non-admin order-image access/mutation.** The inquiry-file admin signed-URL gap is an additional rollout functional blocker.

#### Proposed minimal remediation scope — not implemented

The production evidence is now sufficient to design a minimal remediation, but the current release remains blocked:

1. Replace the production `articles` authenticated-wide ALL expression with the existing `is_admin()` authorization intent; preserve published-public SELECT.
2. Restrict `library-files` SELECT/INSERT/DELETE to `is_admin()` and add explicit bucket limits/MIME rules only after confirming required internal file types and sizes.
3. Make `order-images` private, restrict write/delete/read to admins, store private object paths rather than public URLs, and generate short-lived signed URLs in authenticated admin reads. This requires a small coordinated code and data-compatibility plan, not policy SQL alone.
4. Add `is_admin()` SELECT for private `inquiry-files` so the new authenticated inquiry-detail page can create signed URLs; keep server-only service-role ingestion and no public read.
5. Reproduce the real `orders`, feedback, admin-user, Storage, function, and least-privilege grant definitions in one reviewed migration set. Revoke unused anon/authenticated privileges and grant back only the operations required by each application path.
6. Change the local order Action ID validator from opaque ID to UUID and consider an explicit two-decimal validation rule. Do not change the numeric ceiling.
7. Add database policy tests for anon, ordinary authenticated, and admin access before any production application.

No SQL remediation was authored or executed. No production setting was changed. Because confirmed production access gaps exist, the formal **Release Decision is NOT READY** under the supplied criteria—not `READY FOR POLICY DESIGN`, `READY FOR CONTROLLED ROLLOUT`, or `READY FOR DEPLOY`. The evidence does, however, make the next separately approved policy-design round concrete and bounded.
