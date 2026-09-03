# HuitaiPCB Production Change Review Package — 2026-09-03

**Final decision: APPROVED FOR CONTROLLED PRODUCTION ROLLOUT**

**Release boundary:** this approval freezes the reviewed candidate and its ordered rollout plan; it does not itself authorize a production action. No production SQL, migration, Storage change, environment change, GA4 change, deployment, live inquiry, commit, or push was performed.

## 1. Frozen production scope

### Exact migration files

| Order | Migration | SHA-256 |
| --- | --- | --- |
| 1 | `supabase/migrations/20260901_conversion_attribution.sql` | `674E141FE8874E82701683F6DC4A764E397404A3A9B88B41308C0DEE3171376E` |
| 2 | `supabase/migrations/20260902090000_rls_grants_storage_hardening.sql` | `DE6AAE6E664C52993DCFC64B804C8C92BA6A3943AB3CCA632D503F6990C588EA` |
| 3 | `supabase/migrations/20260902100000_order_image_storage_transition.sql` | `A9AC08A0A591EED36AA9C15EA1ED44E672D4B2193709D942FE0B8BEBA5C610C5` |

The hashes must be recalculated immediately before production execution and match exactly. Do not use a one-shot command that applies all three migrations before the application compatibility deployment; migration 3 is deliberately separated by an application deployment boundary.

### Exact application deployment scope

The candidate is based on repository HEAD `62c4e4607ab31305cc786a43eda8201601da0336`. It remains an uncommitted working-tree candidate, so there is no release commit SHA yet. The next approved step must create one selective commit from only the frozen inventory, then rerun the complete gate against that commit. The exact inventory is recorded in `docs/reports/seo-geo-daily/2026-09-03-selective-release-inventory.md`.

Runtime/dependency files:

- `package.json`
- `package-lock.json`
- `src/app/api/inquiry/route.ts`
- `src/components/Analytics.tsx`
- `src/components/InquiryForm.tsx`
- `src/lib/email/resend.ts`
- `src/lib/analytics/attribution.ts`
- `src/lib/analytics/server.ts`
- `src/lib/inquiry/client-response.ts`
- `src/lib/inquiry/process.ts`
- `src/lib/inquiry/supabase-adapter.ts`
- `src/lib/inquiry/types.ts`
- `src/lib/inquiry/validation.ts`
- `src/lib/admin/action-validation.ts`
- `src/lib/admin/order-image-model.ts`
- `src/lib/admin/order-images.ts`
- `src/lib/admin/require-admin.ts`
- `src/lib/admin/require-admin-page.ts`
- `src/app/admin/(protected)/customers/actions.ts`
- `src/app/admin/(protected)/feedback/actions.ts`
- `src/app/admin/(protected)/inquiries/actions.ts`
- `src/app/admin/(protected)/knowledge/actions.ts`
- `src/app/admin/(protected)/orders/actions.ts`
- `src/app/admin/(protected)/page.tsx`
- `src/app/admin/(protected)/customers/page.tsx`
- `src/app/admin/(protected)/feedback/page.tsx`
- `src/app/admin/(protected)/inquiries/page.tsx`
- `src/app/admin/(protected)/inquiries/[id]/page.tsx`
- `src/app/admin/(protected)/knowledge/page.tsx`
- `src/app/admin/(protected)/knowledge/[id]/edit/page.tsx`
- `src/app/admin/(protected)/library/page.tsx`
- `src/app/admin/(protected)/orders/page.tsx`
- `src/app/admin/(protected)/orders/[id]/page.tsx`
- `src/app/admin/(protected)/orders/new/page.tsx`

The existing `src/app/admin/(protected)/layout.tsx` fail-closed membership guard remains a required unchanged dependency of this candidate. The package retains the already-reviewed Next.js 16.3.4 production dependency remediation and Vitest test harness; it introduces no additional dependency upgrade.

Verification/support files that belong with the candidate but are not production SQL entrypoints:

- `vitest.config.ts`
- `src/test/server-only.ts`
- the 13 `*.test.ts` files under `src/lib/admin`, `src/lib/analytics`, `src/lib/inquiry`, `src/lib/email`, and `src/lib/supabase`
- `scripts/seo-regression.mjs`
- `supabase/schema.sql`
- `supabase/policies.sql`
- `supabase/baselines/20260902_production_security_baseline.md`
- `supabase/verification/20260902_security_post_migration.sql`
- `supabase/tests/database/20260902_security_hardening.test.sql`
- `supabase/tests/disposable/20260902_disposable_supabase_test_plan.md`
- the security/conversion audit reports, including this package

### Explicit exclusions

- `src/app/_metadata.ts` and all brand/entity changes
- `/turnkey-pcb-assembly`, `/bom-sourcing-pcb-assembly`, GEO-winner content, titles, H1s, canonical, schema, and robots changes
- content maps, proposed articles, public image additions, `inputs/`, `outputs/`, `index.html`, skill directories, and `video/`
- any dependency change beyond the already-tested lockfile and Next.js 16.3.4 state

The dirty working tree must not be deployed wholesale.

## 2. Exact production execution order

### Step 1 — Freeze the release artifact and decisions

- **Action:** create a selective release commit from the frozen allowlist, record its commit SHA, recalculate migration hashes, and rerun all gates. The three owner copy decisions are already finalized and covered by tests.
- **Expected state:** one immutable candidate; unrelated SEO/entity/assets remain outside it.
- **Verification:** exact file manifest, clean release checkout, matching hashes, full gate results.
- **Rollback point:** no production change exists; abandon the candidate.

### Step 2 — Establish recovery point and run read-only preflight

- **Action:** verify the production project ref, backup/PITR state, schema, columns, constraints, indexes, grants, policies, function, and bucket metadata using catalog-only queries.
- **Expected state:** production matches the 2026-09-02 baseline; attribution columns and migration object names are absent; no drift exists.
- **Verification:** save the redacted preflight output beside the baseline. Do not query business rows, Auth rows, `storage.objects`, filenames, or paths.
- **Rollback point:** no mutation has occurred. Any mismatch is a hard stop.

### Step 3 — Apply Conversion Attribution migration only

- **Action:** execute exactly `20260901_conversion_attribution.sql`.
- **Expected state:** additive attribution, idempotency, file/email/analytics state columns, checks, comments, and two partial unique indexes exist; legacy rows remain unchanged except the non-null attempt-count default.
- **Verification:** catalog-only checks for every column/type/default, named constraint definition, index predicate/uniqueness, and comments.
- **Rollback point:** stop before application deployment. Prefer retaining additive columns; destructive column removal requires a separate approved down migration and backup.

### Step 4 — Apply RLS/Grants/Storage Hardening migration only

- **Action:** execute exactly `20260902090000_rls_grants_storage_hardening.sql`.
- **Expected state:** least-privilege table grants, reviewed RLS, secure `is_admin()`, public published article/feedback reads, admin-only back-office access, public `article-images`, private/admin-only `library-files`, and private `inquiry-files` with admin SELECT.
- **Verification:** run the catalog verification script and smoke-test the still-running old application: published Knowledge reads, admin login/read operations, inquiry attachment signed URL, and existing server-side feedback/inquiry architecture.
- **Rollback point:** stop before deploying code. Correct a narrow policy/grant defect. Do not restore broad authenticated or anon access merely to recover convenience.

This step must precede the new application deployment so the new inquiry attachment reader never enters production without admin `inquiry-files` SELECT.

### Step 5 — Prepare production environment and GA4 Admin

- **Action:** confirm existing production variable names/targets, create the Measurement Protocol secret, add the two server-side GA4 variables, and apply the approved GA4 Key Event configuration. Do not expose the API secret to the browser.
- **Expected state:** the next Vercel deployment receives complete Supabase, Resend, site URL, browser GA, and server GA configuration.
- **Verification:** names and Vercel target scopes only; GA4 DebugView/Realtime verification waits for the labeled post-deploy test.
- **Rollback point:** remove/disable only newly created GA4 secret/configuration if the rollout is abandoned; existing application remains live.

### Step 6 — Deploy the exact compatibility application

- **Action:** deploy the immutable reviewed commit. This single deployment activates the backward-compatible reader, secure legacy parser, path-only new writer, admin signed URLs, Conversion pipeline, and application-layer authorization.
- **Expected state:** `order-images` is still public; legacy internal Supabase URLs are parsed to paths and signed, external HTTPS legacy URLs remain display-only, and all new order-image writes persist object paths. Public inquiry processing uses the new additive columns.
- **Verification:** deployment is `READY`; homepage/contact/services/Knowledge/GEO winner/German pages return 200; anonymous admin access redirects; admin login and all back-office reads work; inquiry attachments sign; an existing legacy order image displays. Do not create an order merely for this check.
- **Rollback point:** before any path-only order image is written, the previous app deployment remains available. After a path-only row exists, do not roll back below the compatibility-reader boundary; use a roll-forward hotfix or a compatibility-preserving deployment.

The reader and writer are bundled in the tested deployment. Code-first before Step 4 is rejected because inquiry attachment signed URLs would still lack the required admin policy. Private-first before this step is rejected because legacy public URLs would fail.

### Step 7 — Apply Order Images Private Transition migration

- **Action:** execute exactly `20260902100000_order_image_storage_transition.sql`.
- **Expected state:** `order-images` is private, 5 MiB, JPEG/PNG/WebP only, and admin-only SELECT/INSERT/UPDATE/DELETE; no order row or Storage object is rewritten or deleted.
- **Verification:** catalog checks plus admin display of a legacy Supabase URL row and a path row if one naturally exists; anon/non-admin access remains denied.
- **Rollback point:** keep the compatibility application deployed. Reopening the bucket is an **emergency-only security rollback**, not the normal recovery path.

### Step 8 — Full post-change verification

- **Action:** run the catalog, public-site, admin, and Storage matrices below.
- **Expected state:** no regression and no widened access.
- **Verification:** record timestamps, HTTP results, catalog output, identities used, and redacted outcomes.
- **Rollback point:** fail closed; use the matrix in section 10.

### Step 9 — One labeled production validation inquiry

- **Action:** only after separate action-time approval, submit exactly one inquiry clearly labeled `TEST / PRODUCTION VALIDATION`.
- **Expected state:** exactly one inquiry row, correct database attribution and states, expected attachments, and one server `generate_lead` attempt.
- **Verification:** reconcile the database row, email records, server state, and GA4 display using `analytics_event_id`; remove no evidence automatically.
- **Rollback point:** stop further tests and diagnose. Do not resubmit with a new idempotency key to hide a partial result.

## 3. Production preflight checklist

Expected production project ref: `dfqmmxpztctzhzkjjqld`. It must be compared character-for-character before opening or executing SQL. The disposable ref must not appear anywhere in the session.

- [ ] Project ref and project name match production.
- [ ] The complete catalog baseline is re-exported read-only immediately before the maintenance window.
- [ ] All nine reviewed public tables exist and retain expected column types.
- [ ] `orders.id` is UUID and the primary key is exactly `(id)`.
- [ ] `orders.quantity` is `integer`.
- [ ] all four order money columns are `numeric(12,2)`.
- [ ] current order status constraint matches the baseline.
- [ ] all nine tables have RLS enabled.
- [ ] current policies and grants exactly match the recorded pre-migration baseline; no unreviewed policy exists.
- [ ] `public.is_admin()` remains parameterless, `STABLE SECURITY DEFINER`, schema-qualified, and fixed to `search_path=public`.
- [ ] `article-images`: public, 5 MiB, current image allowlist.
- [ ] `inquiry-files`: private, 25 MiB.
- [ ] `library-files`: private with the recorded limits.
- [ ] `order-images`: public with the recorded pre-transition limits.
- [ ] all Conversion columns are absent before migration 1.
- [ ] Conversion constraint/index names and replacement policy names do not conflict with different definitions.
- [ ] migration file hashes match section 1.
- [ ] expected lock duration and maintenance window are acceptable.

Any drift means **STOP — NOT READY**. This review did not run production SQL, so this checklist remains an execution-time gate.

## 4. Backup and recovery plan

Supabase documents daily managed backups for Pro/Team/Enterprise and PITR as a paid add-on; Free projects require a separate logical backup practice. Before rollout, verify the actual production plan and the Database > Backups page. If a usable restore point/PITR window is not confirmed, take an encrypted logical database backup using an approved Supabase CLI or `pg_dump` process and validate that the backup is readable. See [Supabase Database Backups](https://supabase.com/docs/guides/platform/backups).

Required evidence before Step 3:

- timestamped database recovery point and stated RPO/RTO;
- catalog/schema snapshot, including columns, constraints, indexes, functions, RLS flags, policies, and grants;
- four allowlisted Storage bucket metadata rows and bucket-scoped policy definitions;
- current Vercel production deployment identifier for application rollback;
- migration hashes and exact release commit SHA.

Do not download customer attachments or enumerate Storage objects as a backup method. These migrations delete neither business rows nor objects.

- **App rollback:** safe before path-only rows exist. Afterwards it must retain the compatibility reader.
- **Additive Conversion DB changes:** normally retain during app rollback; removing them is destructive.
- **RLS/grants:** use reviewed, narrow SQL repair/rollback. Never restore the known broad authenticated article/library/order policies as a convenience rollback.
- **Storage:** metadata/policies require SQL rollback. Reopening `order-images` is emergency-only because it re-expands access.

## 5. Migration review

### Conversion Attribution

- **Effect:** additive evidence/status columns, check constraints, partial unique indexes, and documentation comments.
- **Primary risk:** table lock during constraints/index creation or a same-name object with a different definition.
- **Verification:** exact catalog types, checks, index predicates, uniqueness, and legacy-null semantics.
- **Rollback:** revert application traffic first and retain additive columns. A down migration is separately approved and backed up.

### RLS / Grants / Storage Hardening

- **Effect:** replaces complete reviewed table policy sets atomically, minimizes client grants, hardens `is_admin()`, preserves public published reads and server-role ingestion, and fixes three Storage buckets.
- **Primary risk:** catalog drift could cause an intended workflow to lose a grant/policy.
- **Verification:** catalog script plus anon/non-admin/admin behavior and the public/server-side smoke checks.
- **Rollback:** transaction failure automatically restores the prior state. After commit, prefer a narrow forward repair. Never reintroduce broad authenticated access.

### Order Images Private Transition

- **Effect:** changes only bucket metadata and bucket-scoped policies; it does not modify order rows or Storage objects.
- **Primary risk:** an application version without the compatibility reader cannot render legacy internal public URLs after privacy changes.
- **Verification:** all four states: legacy/public, legacy/private, path/public, path/private.
- **Rollback:** setting the bucket public again can technically restore public URL delivery, but it reopens the data-access surface and is **emergency-only**. The preferred response is to keep the private bucket and fix/roll forward the signed-URL reader.

All three migrations are wrapped in transactions and passed first execution plus rerun in disposable Supabase. The two security migrations replace policies within the same transaction, so external sessions do not see a drop/create intermediate window. No migration deletes application data, Storage objects, or historical image values.

## 6. Application deploy review

Confirmed in the candidate:

- secure legacy order-image parser checks HTTPS, exact configured Supabase origin, exact bucket, no credentials/query/fragment, and safe decoded paths;
- new order images persist only `orders/{uuid}.{jpg|png|webp}` object paths;
- signed URLs are short-lived and generated only after `requireAdmin()`;
- legacy external HTTPS URLs remain display-compatible but are never passed to Supabase signing;
- 10 Admin Server Functions call `requireAdmin()` internally and validate UUID/form inputs;
- protected admin pages use fail-closed membership checks, with sensitive pages also calling `requireAdminPage()`;
- order IDs use UUID validation; monetary values reject negatives, exponent notation, more than two decimals, non-finite values, and anything over `9,999,999,999.99`;
- the inquiry pipeline persists authoritative acquisition fields, idempotency, attachment/email/analytics states, and one server-confirmed `generate_lead` attempt;
- file partial/failure wording is consistent in UI, administrator email, and customer email;
- analytics replay classification requires the same persisted `analytics_event_id` and a persisted safe retry state.

Known non-blocking operational edge: if a browser order-image upload succeeds but the subsequent order insert fails, the new private object can remain orphaned. This does not expose data and is not expanded in this frozen release; record it for a later admin-storage cleanup design.

## 7. Environment variable checklist

No value was read or printed during this review. There is no local Vercel project link or Vercel CLI session, so production presence must be re-confirmed by name and target in Vercel before rollout.

| Variable | Status | Required action |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Existing | Confirm Production target and exact production project; do not change value during this package. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Existing | Confirm Production target; browser-visible by design. |
| `SUPABASE_SERVICE_ROLE_KEY` | Existing | Confirm server-only Production target; never expose to browser. |
| `RESEND_API_KEY` | Existing | Confirm server-only Production target and current verified Resend account. |
| `INQUIRY_NOTIFICATION_EMAIL` | Existing | Confirm intended recipients; do not rely silently on source fallback. |
| `INQUIRY_FROM_EMAIL` | Existing | Confirm it is a verified sender. |
| `NEXT_PUBLIC_SITE_URL` | Existing | Confirm exact canonical origin `https://huitaipcb.com`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` or existing `NEXT_PUBLIC_GA_ID` | Existing | Confirm it targets the intended GA4 web stream. |
| `GA4_MEASUREMENT_ID` | Needs creation | Add server-only variable using the intended web-stream Measurement ID. |
| `GA4_API_SECRET` | Needs creation | Create in GA4 Measurement Protocol and store server-only; never prefix with `NEXT_PUBLIC_`. |

The first eight `Existing` statuses reflect the established application architecture, not a fresh value-level Vercel inspection. All must be marked Present in the release checklist before deployment.

## 8. GA4 Admin checklist

- [ ] Create one Measurement Protocol API secret for the intended web stream.
- [ ] Store it only as server-side `GA4_API_SECRET`.
- [ ] Set server-side `GA4_MEASUREMENT_ID` for the same web stream.
- [ ] Mark `generate_lead` as the website lead Key Event.
- [ ] Keep `quote_click`, `whatsapp_click`, and `email_click` non-Key.
- [ ] Keep `rfq_form_start`, `rfq_file_upload`, and `quote_cta_click` as non-Key diagnostics.
- [ ] Do not mark generic page/form-start events as leads.
- [ ] After deployment, use one labeled validation inquiry and reconcile by database inquiry ID and `analytics_event_id`.

No GA4 Admin change was made in this review.

## 9. Production verification checklist

### Catalog

- [ ] every Conversion column, check, partial unique index, and comment matches the reviewed migration;
- [ ] all nine tables retain RLS;
- [ ] grants contain only the reviewed SELECT/INSERT/UPDATE/DELETE operations and no REFERENCES/TRIGGER/TRUNCATE;
- [ ] `is_admin()` definition/owner/ACL/search path match the reviewed state;
- [ ] policy names, roles, commands, `USING`, and `WITH CHECK` match exactly;
- [ ] bucket public flags, size limits, MIME allowlists, and bucket-scoped policies match exactly.

### Public website

- [ ] homepage, `/contact`, `/services`, `/knowledge`, representative CMS article, GEO winner, and sitemap return expected results;
- [ ] `/turnkey-pcb-assembly` and `/bom-sourcing-pcb-assembly` remain unchanged;
- [ ] German homepage, contact, and representative service page return expected results;
- [ ] public published articles remain readable and drafts remain unavailable;
- [ ] no public content/metadata/entity regression is present.

### Admin

- [ ] anonymous and non-admin sessions fail closed;
- [ ] real admin login succeeds;
- [ ] inquiries list/detail/update/archive works;
- [ ] inquiry attachment signed URL works;
- [ ] customers list/delete, feedback list/update/delete, orders list/create/update, article CMS CRUD, and library list/upload/download/delete follow the reviewed minimum permissions;
- [ ] no admin action relies only on the route layout; each Server Function retains internal authorization.

### Storage

- [ ] `article-images` remains public-read/admin-write;
- [ ] `library-files` is private/admin read-upload-delete;
- [ ] `order-images` is private/admin read-upload-update-delete, 5 MiB, JPEG/PNG/WebP;
- [ ] `inquiry-files` remains private/service-role ingestion/admin-read;
- [ ] anon and non-admin identities cannot obtain or mutate protected files.

### Conversion

- [ ] exactly one clearly labeled `TEST / PRODUCTION VALIDATION` inquiry is submitted after separate approval;
- [ ] exactly one inquiry row exists for its idempotency key;
- [ ] database `landing_page`, `page_path`, referrer, UTM, GA client ID, and GA session ID are captured as available;
- [ ] attachment rows/objects and `files_status` counts agree;
- [ ] `admin_email_status` and `customer_email_status` agree with provider responses;
- [ ] `analytics_status`, attempt count, retry state, timestamp, and error code agree with the single server attempt;
- [ ] only one server `generate_lead` attempt exists for the stable `analytics_event_id`;
- [ ] GA4 displayed event/source is recorded separately from database attribution.

## 10. Rollback matrix

| Failure | Immediate action | App rollback | DB rollback | Storage rollback |
| --- | --- | --- | --- | --- |
| Application 500 | Stop rollout; inspect deployment/runtime logs without exposing payloads | Roll back only to a version retaining the compatibility reader once path rows may exist | Retain additive columns; no immediate DB rollback | None |
| Admin login/auth regression | Fail closed; stop admin mutations | Compatibility-preserving app rollback/hotfix | Verify `admin_users`, grants, and `is_admin()`; use narrow repair | None |
| Public articles inaccessible | Stop rollout and verify service-role/public paths | Roll back app only if application regression is proven | Restore only published SELECT/grant or correct service configuration; never broad draft access | Keep `article-images` public-read |
| Inquiry submission failure | Stop validation traffic; preserve failure evidence | Return to last compatible inquiry implementation if schema is already additive | Retain additive migration; narrowly repair ingestion dependency | Keep `inquiry-files` private; never add anon upload/read |
| Email failure | Preserve inquiry; classify email state accurately | No general app rollback unless template/provider integration regressed | None | None |
| GA4 failure | Keep inquiry successful; mark analytics failed/skipped with safe/manual-review semantics | No general app rollback | None; do not duplicate the lead | None |
| Admin signed URL failure | Keep protected file private; inspect admin SELECT and path parsing | Roll forward/fix compatibility reader | Narrow `inquiry-files` or relevant metadata SELECT repair | Never make protected bucket public |
| Order image failure | Stop new order-image writes; keep admin data private | Keep/redeploy compatibility reader; do not roll back below path support | Do not rewrite legacy rows automatically | Private→public is emergency-only; prefer narrow policy/reader fix |
| RLS unexpectedly blocks admin | Stop affected admin operation | Usually none | Narrowly correct the specific grant/policy after catalog comparison | Narrow bucket policy repair only |
| RLS exposes non-admin | Disable affected feature/access immediately and treat as security incident | App may be restricted or taken offline | Revoke offending grant/policy and verify all identities | Force affected bucket private/remove permissive bucket policy; fail closed |

When availability conflicts with data exposure, data protection wins. Never restore broad anon/authenticated privileges as a temporary workaround.

## 11. Owner fact decisions

The owner approved the following constrained customer-facing wording on 2026-09-03:

1. Huitai typically responds within 1 business day.
2. “Once the required files are complete, we can prepare a turnkey PCBA quotation covering PCB fabrication, component sourcing and assembly.”
3. “A dedicated project contact who coordinates with our engineering and production teams throughout your project.”

The approved copy is limited to inquiry-success/confirmation UI and the customer confirmation email (`src/components/InquiryForm.tsx`, `src/lib/inquiry/client-response.ts`, and `src/lib/email/resend.ts`). No migration, API, attribution, idempotency, file state, email state, GA4, authorization, RLS, or Storage behavior changed. Tests first failed against the former wording (3 expected failures) and then passed 13/13 after the copy-only implementation.

Matching wording on public/indexable Contact and Knowledge content was deliberately left unchanged and is classified `OWNER COPY FOLLOW-UP`. It must be handled as a separately approved SEO/content change, not folded into this release.

## 12. Remaining blockers and gate evidence

Current fresh local verification on 2026-09-03:

| Gate | Result |
| --- | --- |
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0; 0 errors, 17 warnings |
| `npm run test` | exit 0; 13 files, 183/183 tests |
| `npm run test:seo` | exit 0; 43/43 checks |
| `npm run build` | exit 0; Next.js 16.3.4, default 11 workers, 44/44 pages |
| `npm audit --omit=dev` | exit 0; 0 vulnerabilities |
| `npm audit` | exit 1; 7 development-tree findings (6 high, 1 low), no production dependency vulnerability |
| Local production smoke | 10/10 requested routes returned HTTP 200; no 403/500 |
| Protected release diff | 0 files across Turnkey, BOM, Knowledge/GEO Winner, robots, sitemap, schema/entity sources; pre-existing `src/app/_metadata.ts` diff retained but excluded |

Historical disposable evidence remains: pgTAP 132/132, catalog 13/13 before and after rerun, real JWT Data API matrix, Storage API identity matrix, and all four order-image transition states passed; the disposable project and credentials were then deleted/cleared.

Remaining action-time controls before any production mutation:

- a selective immutable release commit and clean release checkout;
- fresh production preflight matching the baseline;
- confirmed database restore point/PITR or validated logical backup;
- Vercel Production environment name/target confirmation and creation of the two GA4 server variables;
- GA4 Admin configuration and Measurement Protocol secret;
- separate action-time approval for production SQL, environment changes, GA4 changes, deployment, and the one labeled inquiry.

The owner wording decision is closed, the migration hashes remain frozen, the complete local gate passes, and the selective scope is documented. The package decision is:

**APPROVED FOR CONTROLLED PRODUCTION ROLLOUT**

This is not an instruction to deploy; every production-side step still requires the separate approvals and stop conditions above.
