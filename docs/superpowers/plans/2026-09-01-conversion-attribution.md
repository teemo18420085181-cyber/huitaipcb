# Conversion Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a locally verified, server-confirmed inquiry state chain that stores authoritative acquisition evidence and attempts exactly one canonical `generate_lead` event for each newly saved inquiry.

**Architecture:** The Next.js route remains the HTTP adapter while pure validation, attribution, analytics delivery, email rendering, and a dependency-injected inquiry processor own distinct responsibilities. Supabase persists one idempotent inquiry plus side-effect states; browser events remain diagnostic, and the database—not GA4 Session Acquisition—is the authoritative reconciliation record.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.6, Zod 3, Supabase, Resend, GA4 Measurement Protocol, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-01-conversion-attribution-design.md`

## Global Constraints

- Use approach A: inline API orchestration with server-confirmed state transitions.
- Follow rollout order: migration → environment design → GA4 manual instructions → code → tests → audit documents.
- Prepare `supabase/migrations/20260901_conversion_attribution.sql` locally; do not execute it.
- Do not read or edit any environment file or expose credentials.
- Do not modify GA4 Admin, Supabase production data, Vercel production, or send a live inquiry.
- Preserve the existing `src/lib/email/resend.ts` Huitai PCB brand wording and all unrelated user changes.
- Do not change `/turnkey-pcb-assembly`, `/bom-sourcing-pcb-assembly`, or the GEO winner page.
- Do not commit, push, deploy, or create a PR.
- Database acquisition fields are authoritative evidence; GA4 displayed attribution is a separate, potentially incomplete observation.
- A `partial` or `failed` file outcome must produce matching warnings in the API response, UI, administrator email, and customer confirmation.
- There is no automatic analytics retry in this release. A future replay must reuse `analytics_event_id`, claim a persisted retryable failure atomically, and never treat GA4 `event_id` as an assumed deduplication guarantee.

---

## File Structure

- `supabase/migrations/20260901_conversion_attribution.sql`: additive production migration prepared but not executed.
- `supabase/schema.sql`: fresh-install representation of the same inquiry fields and constraints.
- `docs/reports/seo-geo-daily/2026-09-01-conversion-attribution-implementation.md`: environment, GA4 Admin, rollout, rollback, and attribution-evidence instructions.
- `vitest.config.ts`: deterministic Node/jsdom-free unit-test configuration and `@` alias.
- `src/lib/inquiry/types.ts`: shared inquiry, side-effect status, warning, and dependency contracts.
- `src/lib/inquiry/validation.ts`: form, attribution, idempotency, and attachment validation before database writes.
- `src/lib/analytics/attribution.ts`: privacy-safe acquisition capture and sanitation helpers.
- `src/lib/analytics/server.ts`: GA4 Measurement Protocol adapter and replay-safety classification.
- `src/lib/inquiry/process.ts`: dependency-injected state-chain orchestration.
- `src/app/api/inquiry/route.ts`: FormData adapter plus Supabase/Resend/GA dependency wiring.
- `src/lib/email/resend.ts`: escaped email templates, typed delivery results, and attachment-state wording.
- `src/components/Analytics.tsx`: page/micro events only; remove the custom contact view.
- `src/components/InquiryForm.tsx`: idempotency/acquisition fields, one funnel-start event, and warning-aware success UI.
- `src/lib/**/*.test.ts`: colocated unit tests for pure and orchestration behavior.
- `package.json`, `package-lock.json`: explicit typecheck/test scripts and Vitest dependency.

### Task 1: Prepare the additive migration and local operator instructions

**Files:**
- Create: `supabase/migrations/20260901_conversion_attribution.sql`
- Modify: `supabase/schema.sql`
- Create: `docs/reports/seo-geo-daily/2026-09-01-conversion-attribution-implementation.md`

**Interfaces:**
- Consumes: the field names and status semantics in the approved conversion spec.
- Produces: database columns consumed by `InquiryRepository` and a production rollout document that explicitly separates database-confirmed acquisition from GA4-displayed acquisition.

- [ ] **Step 1: Write the migration with additive nullable acquisition/correlation fields and explicit state constraints**

```sql
alter table public.inquiries
  add column if not exists page_path text,
  add column if not exists landing_page text,
  add column if not exists referrer text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists ga_client_id text,
  add column if not exists ga_session_id text,
  add column if not exists idempotency_key uuid,
  add column if not exists analytics_event_id uuid,
  add column if not exists files_status text,
  add column if not exists admin_email_status text,
  add column if not exists admin_email_message_id text,
  add column if not exists admin_email_sent_at timestamptz,
  add column if not exists customer_email_status text,
  add column if not exists customer_email_message_id text,
  add column if not exists customer_email_sent_at timestamptz,
  add column if not exists analytics_status text,
  add column if not exists analytics_sent_at timestamptz,
  add column if not exists analytics_attempt_count integer not null default 0,
  add column if not exists analytics_last_attempt_at timestamptz,
  add column if not exists analytics_last_error_code text,
  add column if not exists analytics_retry_state text;
```

Add idempotent named check constraints through `DO $$ ... $$`, allowing legacy null statuses; add unique partial indexes on non-null `idempotency_key` and `analytics_event_id`. `analytics_retry_state` accepts `not_needed`, `safe`, or `manual_review`: a definite non-2xx rejection is `safe`, while a network/timeout ambiguity is `manual_review` and cannot be blindly replayed.

- [ ] **Step 2: Mirror the migration in the fresh-install schema**

Place the same columns inside `public.inquiries`, set new-row defaults only where they do not mislabel existing migration rows, and create the same unique partial indexes after the table definition.

- [ ] **Step 3: Document environment variables and GA4 manual operations**

Document server-only `GA4_MEASUREMENT_ID` and `GA4_API_SECRET`, existing Resend variables, browser measurement-ID compatibility, missing-config behavior, and the rule that no environment file was inspected. List the future GA4 Admin actions exactly: retain only `generate_lead` as the primary website lead Key Event, unmark click events, keep funnel diagnostics non-Key, create the Measurement Protocol secret, and run one separately authorized reconciliation test after deployment.

- [ ] **Step 4: Document rollout, rollback, and evidence boundaries**

State that database `landing_page`, `page_path`, referrer, UTM, and GA IDs are the authoritative inquiry evidence. Label GA4 acquisition as display-layer evidence that Measurement Protocol may not restore to the original session. Include migration backup/review, schema rollback SQL review, environment setup, GA4 setup, deploy, authorized test, and reconciliation order without executing any step.

- [ ] **Step 5: Validate the documentation/SQL diff**

Run: `git diff --check -- supabase/migrations/20260901_conversion_attribution.sql supabase/schema.sql docs/reports/seo-geo-daily/2026-09-01-conversion-attribution-implementation.md`

Expected: exit code 0; newline-conversion warnings may be reported separately but no whitespace error.

### Task 2: Add the unit-test harness and shared contracts

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/inquiry/types.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: TypeScript path alias `@/* -> ./src/*`.
- Produces: `npm run test`, `npm run typecheck`, `SideEffectStatus`, `FilesStatus`, `AnalyticsRetryState`, `InquiryInput`, `AcquisitionData`, `InquiryProcessResult`, `InquiryDependencies`.

- [ ] **Step 1: Add scripts and install Vitest as a development dependency**

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "devDependencies": {
    "vitest": "^3.2.4"
  }
}
```

Use `npm install --save-dev vitest@^3.2.4` so the lockfile remains generated by npm rather than hand-edited.

- [ ] **Step 2: Add deterministic Vitest configuration**

```ts
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: { environment: 'node', clearMocks: true },
});
```

- [ ] **Step 3: Define shared state contracts**

```ts
export type FilesStatus = 'not_required' | 'pending' | 'saved' | 'partial' | 'failed';
export type DeliveryStatus = 'pending' | 'sent' | 'failed' | 'skipped_unconfigured';
export type AnalyticsRetryState = 'not_needed' | 'safe' | 'manual_review';
export type InquiryWarningCode =
  | 'files_partial' | 'files_failed'
  | 'admin_email_failed' | 'customer_email_failed'
  | 'customer_email_skipped' | 'analytics_failed' | 'analytics_skipped';
```

Define a public response with `success`, `inquiryId`, `duplicate`, all four statuses, and an array of `{code, message}` warnings. Keep customer PII and file names out of this response contract.

- [ ] **Step 4: Verify the harness detects an intentional failing smoke assertion, then remove it**

Create a temporary `src/lib/inquiry/types.test.ts` with `expect(1).toBe(2)`, run `npm run test -- src/lib/inquiry/types.test.ts`, record the expected non-zero exit, change it to a real contract assertion, and rerun for exit code 0. This establishes the red/green harness before production behavior.

### Task 3: Implement privacy-safe attribution under TDD

**Files:**
- Create: `src/lib/analytics/attribution.test.ts`
- Create: `src/lib/analytics/attribution.ts`

**Interfaces:**
- Consumes: `URL`, browser `location`, `document.referrer`, `sessionStorage`, optional `gtag` callback.
- Produces: `sanitizeAcquisition(input: unknown): AcquisitionData`, `captureAttribution(): AcquisitionData`, `getOrCreateIdempotencyKey(): string`, `clearIdempotencyKey(): void`.

- [ ] **Step 1: Write failing sanitizer and key-lifecycle tests**

```ts
it('stores path-only URLs and strips query, hash, and credentials', () => {
  expect(sanitizeAcquisition({
    page_path: '/contact?email=a%40b.com#rfq',
    landing_page: 'https://huitaipcb.com/turnkey-pcb-assembly?utm_source=google',
    referrer: 'https://user:pass@example.com/search?q=secret#x',
  })).toMatchObject({
    page_path: '/contact',
    landing_page: '/turnkey-pcb-assembly',
    referrer: 'https://example.com/search',
  });
});

it('does not copy unknown or PII-shaped fields', () => {
  expect(sanitizeAcquisition({ email: 'buyer@example.com', message: 'secret' }))
    .toEqual({});
});
```

Also cover UTM whitespace/length caps, malformed GA IDs, same-session key reuse, and clearing only after saved success.

- [ ] **Step 2: Run the focused test and confirm expected failure**

Run: `npm run test -- src/lib/analytics/attribution.test.ts`

Expected: non-zero exit because the attribution module/functions do not exist.

- [ ] **Step 3: Implement the minimum allowlist sanitizer and browser helpers**

Use exact field allowlists, pathname-only conversion, origin-plus-path referrer normalization, bounded UTM strings, GA identifier regular expressions, and feature detection around browser globals. Never retain arbitrary query parameters.

- [ ] **Step 4: Run the focused tests until green**

Run: `npm run test -- src/lib/analytics/attribution.test.ts`

Expected: all attribution tests pass with exit code 0.

### Task 4: Validate all form data and attachments before insertion under TDD

**Files:**
- Create: `src/lib/inquiry/validation.test.ts`
- Create: `src/lib/inquiry/validation.ts`

**Interfaces:**
- Consumes: `FormData` values plus `sanitizeAcquisition`.
- Produces: `parseInquiryFormData(formData: FormData): ValidationResult`, `MAX_FILE_SIZE = 25 * 1024 * 1024`, `MAX_FILE_COUNT`, and normalized `ValidatedInquiryRequest`.

- [ ] **Step 1: Write failing validation tests**

```ts
it.each([
  ['bad.exe', 100],
  ['board.zip', 25 * 1024 * 1024 + 1],
])('rejects %s before persistence', (name, size) => {
  const result = parseInquiryFormData(makeFormData({ files: [makeFile(name, size)] }));
  expect(result.ok).toBe(false);
});
```

Add cases for valid inquiry, invalid UUID, empty/invalid file object, allowed extensions, and more than `MAX_FILE_COUNT`. Every invalid result must be representable as an HTTP 400 without a repository call.

- [ ] **Step 2: Run and record the red result**

Run: `npm run test -- src/lib/inquiry/validation.test.ts`

Expected: non-zero exit because validation exports are missing.

- [ ] **Step 3: Implement parsing and pre-insert validation**

Use Zod for text and acquisition fields, require UUID `idempotency_key`, combine project metadata into the stored message, validate every non-empty attachment before returning `ok: true`, and return privacy-safe field/error codes without echoing file names into logs.

- [ ] **Step 4: Run the focused tests until green**

Run: `npm run test -- src/lib/inquiry/validation.test.ts`

Expected: all validation tests pass with exit code 0.

### Task 5: Build explicit email and analytics delivery adapters under TDD

**Files:**
- Create: `src/lib/email/resend.test.ts`
- Modify: `src/lib/email/resend.ts`
- Create: `src/lib/analytics/server.test.ts`
- Create: `src/lib/analytics/server.ts`

**Interfaces:**
- Consumes: validated inquiry values, `FileDeliverySummary`, Resend `{data,error}`, `GA4_MEASUREMENT_ID`, `GA4_API_SECRET`, and persisted `analytics_event_id`.
- Produces: `EmailDeliveryResult`, `sendInquiryNotification`, `sendInquiryConfirmation`, `sendGenerateLead`, and `classifyAnalyticsReplay`.

- [ ] **Step 1: Write failing email tests before changing the templates**

Test that `{data: null, error}` maps to `failed`; customer HTML escapes `<script>`, quotes, and ampersands; `saved` says files were received; `partial` names only counts and warns some files were not saved; `failed` states attachments were not saved and asks the buyer to resend; `not_required` makes no attachment claim. Assert the existing visible Huitai PCB brand strings remain present.

- [ ] **Step 2: Run and record the email red result**

Run: `npm run test -- src/lib/email/resend.test.ts`

Expected: non-zero exit because current functions expose raw Resend results and lack file-state wording.

- [ ] **Step 3: Implement typed Resend results and state-accurate copy**

Inject or wrap the Resend send function so tests do not send email. Escape every customer-controlled HTML interpolation and attribute. Pass `{status, expectedCount, savedCount}` to both emails. Preserve all existing Huitai PCB brand wording; only add accurate attachment status language.

- [ ] **Step 4: Write failing analytics adapter tests**

Cover exact Measurement Protocol URL/body, `event_id`, non-PII event parameters, client-ID fallback, missing configuration → `skipped_unconfigured`, non-2xx → `failed` with retry state `safe`, and network/timeout → `failed` with retry state `manual_review`. Verify the replay classifier allows an atomic future replay only from a persisted `failed/safe` or `skipped_unconfigured/safe` state and always reuses the same event ID.

- [ ] **Step 5: Run and record the analytics red result**

Run: `npm run test -- src/lib/analytics/server.test.ts`

Expected: non-zero exit because the server analytics adapter does not exist.

- [ ] **Step 6: Implement the Measurement Protocol adapter**

Send only `generate_lead`, `event_id`, sanitized `page_location` without query data, and non-PII source diagnostics. Do not claim it restores GA4 Session Acquisition. Return structured delivery and retry-safety results; do not schedule or execute any retry.

- [ ] **Step 7: Run both adapter suites until green**

Run: `npm run test -- src/lib/email/resend.test.ts src/lib/analytics/server.test.ts`

Expected: all adapter tests pass with exit code 0 and no network/email call.

### Task 6: Implement the idempotent server-confirmed processor under TDD

**Files:**
- Create: `src/lib/inquiry/process.test.ts`
- Create: `src/lib/inquiry/process.ts`

**Interfaces:**
- Consumes: `ValidatedInquiryRequest` and injected repository, storage, email, analytics, UUID, clock, and privacy-safe logger dependencies.
- Produces: `processInquiry(input, deps): Promise<InquiryProcessResult>`.

- [ ] **Step 1: Write failing orchestration tests**

Use spies/fakes to prove:

```ts
it('persists one lead and attempts one canonical analytics event', async () => {
  const result = await processInquiry(validInput, deps);
  expect(deps.repository.insertInquiry).toHaveBeenCalledTimes(1);
  expect(deps.analytics.sendGenerateLead).toHaveBeenCalledTimes(1);
  expect(result.success).toBe(true);
});
```

Add database failure with zero side effects; storage failure and file-record failure with `partial/failed`; independent admin/customer email failures; explicit Resend error; analytics non-2xx/network failure; missing GA configuration; duplicate idempotency returning the same ID without storage/email/analytics repetition; privacy-safe logs; and exact warning codes.

- [ ] **Step 2: Run and record the processor red result**

Run: `npm run test -- src/lib/inquiry/process.test.ts`

Expected: non-zero exit because the processor does not exist.

- [ ] **Step 3: Implement insertion and duplicate recovery first**

Generate one server analytics UUID, insert initial statuses, and distinguish a unique idempotency conflict from other database failures. Duplicate recovery returns persisted state immediately. It never replays a `pending`, `sent`, `failed`, or skipped side effect during a normal duplicate browser request.

- [ ] **Step 4: Implement file outcomes and persist them before emails**

Attempt every validated file independently, require both storage upload and `inquiry_files` record success, derive `saved`, `partial`, or `failed`, and update the inquiry before building either email. Both emails receive the identical persisted file summary.

- [ ] **Step 5: Implement independent email and analytics outcomes**

Persist message IDs/timestamps only for successful sends. Persist `failed` or `skipped_unconfigured` explicitly. Attempt server analytics only for the newly inserted row and reuse its stored analytics event ID. Persist `attempt_count`, last-attempt time/error, status, and retry state. Do not retry in-process.

- [ ] **Step 6: Implement warnings and privacy-safe logs**

Warnings describe only actionable side-effect state. Logs include inquiry ID, stage, outcome, and bounded code; they omit names, addresses, telephone numbers, customer message, file names, raw referrer queries, and raw UTMs.

- [ ] **Step 7: Run the processor suite until green**

Run: `npm run test -- src/lib/inquiry/process.test.ts`

Expected: every processor case passes with exit code 0.

### Task 7: Wire the Next.js API and client form under TDD

**Files:**
- Create: `src/components/InquiryForm.test.tsx` or `src/lib/inquiry/client-response.test.ts`
- Modify: `src/app/api/inquiry/route.ts`
- Modify: `src/components/InquiryForm.tsx`
- Modify: `src/components/Analytics.tsx`

**Interfaces:**
- Consumes: `parseInquiryFormData`, `processInquiry`, Supabase/Resend/analytics adapters, attribution capture helpers.
- Produces: HTTP 400/500/200 response mapping, one form-journey idempotency key, diagnostic events only, and truthful success/warning UI.

- [ ] **Step 1: Write the failing UI/response-messaging tests**

Extract a pure `getInquirySuccessCopy(result)` if DOM dependencies would make the test brittle. Assert that `customer_email_status: 'failed'` does not promise a confirmation email, `files_status: 'partial'` surfaces a file warning, and all-sent state shows the normal saved-inquiry message.

- [ ] **Step 2: Run and record the red result**

Run: `npm run test -- src/lib/inquiry/client-response.test.ts`

Expected: non-zero exit because response-copy mapping does not exist.

- [ ] **Step 3: Replace the route body with thin validated wiring**

Map invalid input to 400, repository failure to 500, and a saved/recovered inquiry to 200. Use Supabase conditional updates for persisted states and check every returned error. Do not log raw request fields.

- [ ] **Step 4: Update browser tracking and request fields**

Remove manual generic `form_start`; keep one `rfq_form_start` per mount/journey and `rfq_file_upload` as selection-only. Add idempotency and acquisition fields to FormData. Remove browser `contact_form_submit`, `rfq_submit_success`, and `generate_lead`; remove the custom `contact_page_view` from `Analytics.tsx`.

- [ ] **Step 5: Implement warning-aware success UI and key rotation**

Clear the saved journey's idempotency key only after `success: true`. Render server warnings. Do not state that email or attachments succeeded when their returned states are failed, skipped, or partial.

- [ ] **Step 6: Run focused tests until green**

Run: `npm run test -- src/lib/inquiry/client-response.test.ts src/lib/inquiry/process.test.ts`

Expected: all focused tests pass with exit code 0.

### Task 8: Full conversion verification and implementation record

**Files:**
- Modify: `docs/reports/seo-geo-daily/2026-09-01-conversion-attribution-implementation.md`

**Interfaces:**
- Consumes: final local code and command outputs.
- Produces: concrete red/green evidence, test counts, exit codes, warnings, modified files, and future manual production steps.

- [ ] **Step 1: Run the full required command sequence**

```powershell
npm run typecheck
npm run lint
npm run test
npm run test:seo
npm run build
git diff --check
```

Record every exit code, test suite/test count, and warning rather than only saying “passed.”

- [ ] **Step 2: Verify forbidden and protected scope**

Run scoped diffs proving no changes to `src/app/_metadata.ts`, service-page content/metadata, GEO winner content, `video/`, production environment files, or unrelated user assets. Confirm no commit, push, deployment, GA4 Admin change, migration execution, database write, or email send occurred.

- [ ] **Step 3: Record migration and future manual operations**

List migration filename, environment variable names without values, GA4 manual steps, rollback considerations, partial-file email/UI behavior, authoritative database attribution, GA4 display limitations, and safe future analytics replay semantics.

- [ ] **Step 4: Capture final repository evidence**

Run: `git status --short` and `git diff --stat`

Expected: only authorized local additions/edits plus clearly identified pre-existing user changes; no staged or committed work.
