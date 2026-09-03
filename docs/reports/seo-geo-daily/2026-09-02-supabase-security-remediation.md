# Supabase RLS / Grants / Storage Remediation — 2026-09-02

## Release decision

**READY FOR SECURITY MIGRATION REVIEW — not ready for deployment or production execution.**

The confirmed RLS/Storage blockers now have a local, reviewable remediation: two ordered migrations, a backward-compatible private order-image application model, application tests, static migration contract tests, a 72-assertion pgTAP identity matrix, a production baseline, and a catalog-only post-migration verification query.

This decision means only that the implementation is ready for human/security review. It does **not** authorize `supabase db push`, SQL Editor execution, Storage changes, deployment, commit, or push. A disposable real Supabase database must still run the pgTAP suite before any production window.

## Scope and unchanged boundaries

- No production SQL or Storage mutation was executed.
- No production row or `storage.objects` row was read.
- No production object was uploaded, deleted, moved, or downloaded.
- No GA4/GTM setting was changed.
- No live inquiry was sent.
- No commit, push, deploy, or index request occurred.
- The conversion attribution migration remains separate and unchanged.
- The existing application authorization layer remains intact; all ten sensitive Server Functions still call `requireAdmin()`.
- Existing `resend.ts` brand copy was not changed in this round.
- `/turnkey-pcb-assembly`, `/bom-sourcing-pcb-assembly`, GEO winners, Title, H1, canonical, schema, robots, entity naming, and `video/` were not touched.

## Production baseline

The fixed catalog-only baseline is stored at:

- `supabase/baselines/20260902_production_security_baseline.md`

It records the reviewed table existence, columns/types, RLS flags, grants, policies, function definition, bucket privacy/limits/MIME allowlists, and bucket-scoped `storage.objects` policies. It contains no project identifier, customer data, object name, file path, URL value, Auth row, or secret.

The matching post-migration read-only catalog query is:

- `supabase/verification/20260902_security_post_migration.sql`

That query does not select public business rows or `storage.objects` rows.

## Local migrations

### 1. `20260902090000_rls_grants_storage_hardening.sql`

This transaction:

- reproduces the confirmed production `orders` schema for fresh environments;
- fails closed if an existing `orders.id` is not UUID or the four amount fields are not `numeric(12,2)`;
- enables RLS for all nine reviewed public tables;
- reproduces `public.is_admin()` as `STABLE SECURITY DEFINER` with `SET search_path = public`, schema-qualified `public.admin_users`, and `auth.uid()`;
- atomically replaces the reviewed public-table policy sets with operation-specific policies;
- revokes broad `anon`/`authenticated` table privileges and grants back the operation allowlist;
- preserves public published article/knowledge/feedback reads;
- keeps `article-images` public at 5 MiB with its existing image allowlist and public-read/admin-write model;
- keeps `inquiry-files` private at 25 MiB and adds only admin SELECT;
- keeps `library-files` private and replaces authenticated-wide Storage access with admin-only SELECT/INSERT/DELETE.

It does not alter `storage.objects` grants and does not perform DML on `storage.objects` rows.

### 2. `20260902100000_order_image_storage_transition.sql`

This separate transaction is intentionally ordered after the general hardening migration and must not be applied until the backward-compatible application code is live. It:

- changes `order-images` to private;
- sets a 5 MiB object limit;
- allows only JPEG, PNG, and WebP;
- atomically removes all existing bucket-scoped policies regardless of display name;
- creates admin-only SELECT/INSERT/UPDATE/DELETE policies scoped to `bucket_id = 'order-images'`.

It does not rewrite `orders.image_1`/`image_2`/`image_3`, backfill URLs, read object rows, or upload/delete files.

The unique 14-digit migration versions avoid duplicate-version and wrong-order behavior in Supabase CLI.

## Final table policy model

Every administrator policy uses `(select public.is_admin())`; none uses `auth.role() = 'authenticated'` as an admin test. Policies are split by operation so the purpose of each permission is explicit, matching current Supabase RLS guidance on combining grants and policies: [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

| Table | anon | authenticated non-admin | verified admin |
| --- | --- | --- | --- |
| `inquiries` | No table privilege | RLS denies rows | SELECT, UPDATE |
| `inquiry_files` | No table privilege | RLS denies rows | SELECT |
| `customers` | No table privilege | RLS denies rows | SELECT, DELETE |
| `feedback_messages` | SELECT published only | SELECT published only | SELECT all, UPDATE, DELETE |
| `orders` | No table privilege | RLS denies rows/writes | SELECT, INSERT, UPDATE; no DELETE |
| `articles` | SELECT published only | SELECT published only; no CMS write | SELECT all, INSERT, UPDATE, DELETE |
| `knowledge_articles` | SELECT published only | SELECT published only; no CMS write | SELECT all, INSERT, UPDATE, DELETE |
| `admin_users` | No table privilege | SELECT own row only; no mutation | SELECT all; no client mutation grant |
| `library_files` | No table privilege | RLS denies rows/writes | SELECT, INSERT, DELETE; no UPDATE |

### Articles

The unsafe production `admins_full_articles` policy is removed. Public/anon and ordinary authenticated users retain only `status = 'published'` SELECT. Four separate administrator policies provide full CMS operations through `public.is_admin()`.

Public `/knowledge`, article detail, sitemap, and the GEO winner retain their published-data path. The default build generated the public routes successfully; no article content or SEO metadata was changed.

### Feedback

The repository now reproduces production's correct model: public SELECT only when `is_published = true`, no public direct INSERT/UPDATE/DELETE, and admin SELECT/UPDATE/DELETE. The existing public Route continues to ingest through the server-side service role; its privileges are untouched.

### Orders

The migration reproduces the UUID primary key, `integer` quantity, four `numeric(12,2)` amounts, five-value status check, and legacy-compatible text image fields. RLS is admin-only. Current UI needs SELECT/INSERT/UPDATE, so no DELETE grant or policy is added.

No new database CHECK was added to the existing amount or image columns. This avoids rejecting unknown legacy rows or destroying URL compatibility before a separately verified data-quality review.

### `admin_users` and `is_admin()`

Ordinary authenticated users can read only their own membership result and cannot INSERT/UPDATE/DELETE membership through the Data API. Verified admins can read membership rows; no client mutation grant is added because no current UI path requires it. Administrative membership changes remain a separately controlled server/SQL responsibility.

The existing role semantics are unchanged: any `admin_users` row still counts as membership, regardless of `admin`, `manager`, or `viewer`. This round does not invent RBAC.

## Least-privilege grants

The migration first runs a table-by-table `REVOKE ALL PRIVILEGES ... FROM anon, authenticated`, which removes legacy `REFERENCES`, `TRIGGER`, `TRUNCATE`, and excess DML grants. It then grants back only:

| Table | anon required | authenticated required |
| --- | --- | --- |
| `inquiries` | None | SELECT, UPDATE |
| `inquiry_files` | None | SELECT |
| `customers` | None | SELECT, DELETE |
| `feedback_messages` | SELECT | SELECT, UPDATE, DELETE |
| `orders` | None | SELECT, INSERT, UPDATE |
| `articles` | SELECT | SELECT, INSERT, UPDATE, DELETE |
| `knowledge_articles` | SELECT | SELECT, INSERT, UPDATE, DELETE |
| `admin_users` | None | SELECT |
| `library_files` | None | SELECT, INSERT, DELETE |

The `authenticated` grants do not themselves confer admin access: RLS still requires `public.is_admin()` for private rows and mutations. The service-role grant surface is not changed because public form ingestion and CMS public rendering use trusted server paths.

## Storage model

Supabase private buckets subject downloads to RLS, and signed URL creation requires object SELECT; the policies below follow those boundaries: [Storage bucket fundamentals](https://supabase.com/docs/guides/storage/buckets/fundamentals), [Storage access control](https://supabase.com/docs/guides/storage/security/access-control).

| Bucket | Privacy | Size | MIME | Read/write policy |
| --- | --- | --- | --- | --- |
| `article-images` | Public, unchanged | 5 MiB | JPEG, PNG, WebP, AVIF, GIF | Public read; admin INSERT/UPDATE/DELETE |
| `inquiry-files` | Private, unchanged | 25 MiB | None, unchanged | Admin SELECT only; service-role public RFQ upload continues to bypass RLS |
| `library-files` | Private, unchanged | None, unchanged | None, unchanged | Admin SELECT/INSERT/DELETE only |
| `order-images` | Public → private | 5 MiB | JPEG, PNG, WebP | Admin SELECT/INSERT/UPDATE/DELETE only |

`library-files` intentionally retains NULL size and MIME limits for this review. The current internal library supports mixed Gerber, BOM, schematic, PCB, report, and archive formats, and no approved maximum exists. Because only verified admins can access it after remediation, adding an unverified allowlist is not necessary to close the confirmed P0. A later business decision can set a tested size/type contract.

No SVG allowance is added for order images. The UI `accept`, application validation, generated extension, and bucket metadata use the same JPEG/PNG/WebP set.

## Order-image application audit and transition

### Current paths audited

| Area | Previous behavior | Local remediation |
| --- | --- | --- |
| New order page | Browser admin session uploaded to `order-images`, then called `getPublicUrl()` | Browser admin session still uploads directly, but validates 5 MiB + JPEG/PNG/WebP and returns only `orders/<uuid>.<ext>` |
| `createOrder` | Accepted/stored any HTTP(S) URL | Requires a safe object path and rejects permanent URLs |
| Order update | Updates status/product/amount/notes only | Same; no image rewrite path added |
| Order detail | Rendered raw values as URLs | Requires admin, resolves new paths and eligible legacy URLs, creates 300-second signed URLs |
| Order list | Does not render images | Unchanged |
| Database | Three nullable text fields store public URLs | Same columns; new writes store object paths |

The browser upload remains an authenticated admin-session operation. It does not use or expose a service-role key. Database RLS and bucket-scoped Storage RLS remain a second authorization layer under the application `requireAdmin()` guard.

### New database value

New orders store only the Storage object key, for example:

`orders/<random-uuid>.webp`

Signed URLs are generated at read time and are never persisted.

### Legacy compatibility

The reader supports:

- a new safe object path;
- a legacy Supabase public URL whose bucket is exactly `order-images`, by extracting and validating its object key before signing;
- an external legacy HTTPS image URL, rendered as-is without treating it as Supabase Storage.

Unsafe schemes, absolute paths, traversal, query/fragment-bearing keys, backslashes, malformed encodings, and URLs referencing another Supabase bucket are rejected. Legacy rows are never updated or backfilled by a read. If a historic URL cannot be parsed safely, that image is omitted rather than exposing another bucket or crashing the page.

This is the selected backward-compatible-read + path-only-write strategy. No automatic URL-to-path backfill is included.

### Known non-blocking application risk

As before, if one browser upload succeeds and a later order create step fails, an unreferenced object can remain. This round does not add a cleanup queue/worker or destructive compensation path. It does not affect access control because the bucket becomes private and admin-only, but lifecycle cleanup should be designed separately if orphan volume becomes material.

## Order Action validation

- `updateOrder.id` now uses the shared `databaseUuid` validator.
- An invalid UUID produces `INVALID_INPUT` before `.from('orders')` mutation.
- Amounts are validated from the original trimmed decimal string.
- Empty amount fields normalize to zero.
- Accepted syntax is non-negative base-10 decimal with at most two fractional digits.
- Scientific notation, Infinity/NaN, negatives, more than two decimals, and values over `9,999,999,999.99` are rejected.
- The stored value is converted only after string/scale/range validation, so the implementation does not use `value * 100` as a floating-point precision test.

## Migration safety and rollout order

Both migrations use `BEGIN`/`COMMIT`. Policy replacement occurs in the same transaction as policy removal. The SQL contains no customer-row DELETE, uncertain URL backfill, Storage object row DML, public-access widening, or feedback-ingestion change.

The proposed production order, requiring a separate approval, is:

1. Back up schema/policy definitions and rerun the fixed baseline query.
2. Run the 72-assertion pgTAP suite against a disposable Supabase database with both migrations.
3. Complete security review of the migration diff and application compatibility code.
4. Deploy the backward-compatible order-image reader and path-only writer while `order-images` is still public.
5. Admin-smoke-test order creation/detail, library upload/download/delete, inquiry attachment signing, CMS draft management, public published articles, sitemap, and the GEO winner.
6. Apply `20260902090000_rls_grants_storage_hardening.sql` in an approved maintenance window.
7. Apply `20260902100000_order_image_storage_transition.sql` only after step 4 is verified.
8. Run the catalog-only verification script and role/API smoke tests for anon, non-admin authenticated, and admin.
9. Keep the bucket private if an application display bug appears; prefer a forward fix. Do not automatically reopen customer/order media as rollback.

Do not run a blind migration push before the compatible application reader is live. No production step above occurred in this round.

## Tests and validation

TDD evidence captured during this round:

- Baseline: `93/93` Vitest tests passed.
- Order contract RED: 7 expected failures proved opaque IDs, over-scale/scientific amounts, path rejection, and public-URL acceptance existed.
- Order contract GREEN: `47/47` admin Action tests passed.
- Order-image behavior RED: 8 expected failures against the minimal compile skeleton.
- Upload behavior RED: 2 expected failures before the uploader existed.
- Order-image GREEN: `18/18` tests passed.
- Migration contract RED: 32 expected failures before the two migrations existed; conversion isolation already passed.
- Migration contract GREEN: `33/33` static tests passed.

Final local command results:

| Command | Exit | Result |
| --- | ---: | --- |
| `npm run typecheck` | 0 | Passed |
| `npm run lint` | 0 | Passed with 17 warnings, 0 errors |
| `npm run test` | 0 | 13 files, 151/151 tests passed |
| `npm run test:seo` | 0 | 43/43 SEO regression checks passed |
| `npm run build` | 0 | Default Next.js configuration passed; 11 workers; 44/44 static pages |
| `git diff --check` | 0 | Passed; existing LF→CRLF notices remain |
| `npm audit` | 1 | 7 development-tree findings: 6 high, 1 low |
| `npm audit --omit=dev` | 0 | 0 production dependency vulnerabilities |

The 17 lint warnings are existing `any`, unused-variable, and `<img>` advisories in previously present files; there are no lint errors. The full npm audit findings are in tooling/transitive packages (`brace-expansion`, `browserslist`, `glob`, `js-yaml`, and `postcss-selector-parser`). No automatic audit fix was run because one suggested path includes a breaking ESLint configuration upgrade and dependency changes are outside this security remediation.

### Database-policy test status

- Static migration contract: **33/33 passed**.
- Prepared pgTAP identity/operation assertions: **72**.
- Executed pgTAP assertions: **0**.
- Reason: this host has no Supabase CLI, no `supabase/config.toml`, no Docker, and no `psql`.

Static SQL assertions are not treated as proof of live Postgres RLS enforcement. Supabase's documented gate is `supabase test db`; this remains mandatory before production: [Testing your database](https://supabase.com/docs/guides/database/testing).

## Remaining blockers before production

1. Human/security review of both migration files and the staged order-image rollout.
2. Real `supabase test db` execution of the 72-assertion pgTAP matrix on a disposable local/test project.
3. A review decision on direct SQL bucket metadata UPSERT versus an equivalent approved Storage Admin API step. The migrations follow the repository's existing SQL pattern; no object-row DML is used.
4. Approved production maintenance window, backup/rollback owner, and role-based smoke-test identities.
5. Separate explicit approval for app deployment and each production migration.
6. Optional dependency-maintenance work for the full development-tree npm audit; production dependencies currently audit clean.

## Final answers

1. New migrations: `20260902090000_rls_grants_storage_hardening.sql` and `20260902100000_order_image_storage_transition.sql`.
2. Articles: published SELECT for anon/non-admin; all CMS operations only through `public.is_admin()`.
3. Library Storage: private, admin SELECT/INSERT/DELETE, no ordinary authenticated/anon access; table metadata is separately admin-only.
4. Order images: compatible application code first, then private bucket with 5 MiB JPEG/PNG/WebP and admin-only operations.
5. New order rows store object paths, never public or signed URLs.
6. Legacy Supabase public URLs are parsed to safe paths and signed; external HTTPS URLs remain readable; no automatic row rewrite.
7. Inquiry files get only bucket-scoped admin SELECT for signed URLs; public/service-role upload architecture is unchanged.
8. Feedback policy is reproduced as published-public SELECT plus admin management; no anon INSERT.
9. Orders schema is reproduced and preflighted; RLS grants only admin SELECT/INSERT/UPDATE.
10. Order IDs now require UUID.
11. `numeric(12,2)` validation uses raw decimal-string scale/range validation before numeric conversion.
12. `admin_users` is non-mutable by clients; `is_admin()` gains fixed `search_path=public`; role semantics are unchanged.
13. Grants are revoked and restored per table/operation; service role and Storage table grants are untouched.
14. Article/inquiry limits are preserved; order images gain 5 MiB + three MIME types; library limits remain NULL pending a real business contract.
15. Policy tests: 33/33 static passed; 72 pgTAP assertions prepared, 0 executed.
16. Core Admin Security tests: 57/57 passed (47 Actions + 6 `requireAdmin` + 4 page guard); order-image security adds 18/18.
17. Conversion tests: 43/43 passed and were not changed.
18. SEO checks: 43/43 passed; 44/44 static build pages generated.
19. Build: exit 0 under the real default 11-worker configuration.
20. Production npm audit: exit 0, 0 vulnerabilities; full audit exit 1 with seven development-tree findings.
21. Remaining blockers are review, real disposable-database pgTAP, staged rollout approval, and production execution approval.
22. Next approval must separately cover compatible app deployment, general hardening migration, order-image private transition, and post-migration verification.

**Final state: REMEDIATION PREPARED LOCALLY / READY FOR SECURITY MIGRATION REVIEW.**
