# Final Security Migration Review — 2026-09-02

**Decision: DISPOSABLE TEST PASSED / AWAITING PRODUCTION CHANGE REVIEW DECISION**

This is not `READY FOR DEPLOY` and does not authorize a production SQL, Storage, grant, policy, deployment, commit, or push operation. The local SQL and compatibility code are review-complete, and the approved disposable Supabase execution passed on 2026-09-03. The owner must separately decide whether to enter Production Change Review.

## Disposable execution update — 2026-09-03

The Free-plan project `huitaipcb-security-disposable-20260902` was created with a fresh reference verified different from production. Only synthetic users, rows, and Storage objects were used. Final results: pgTAP 132/132; catalog assertions 13/13 before and after migration reruns; real JWT Data API boundaries passed across all nine reviewed public tables; all Storage API identity cells passed; and all four public/private legacy/path order-image states passed. Both migrations executed and reran successfully. Full redacted evidence is in `2026-09-03-disposable-supabase-security-test.md`.

## Review scope and protected boundaries

Reviewed:

- `20260902090000_rls_grants_storage_hardening.sql`
- `20260902100000_order_image_storage_transition.sql`
- production catalog baseline
- catalog-only post-migration verification SQL
- pgTAP policy matrix
- order-image path-only writer, legacy reader, and signed URL resolver
- relevant article, feedback, order, admin, Supabase, and Storage call paths

No business row or `storage.objects` row was read. No production connection or mutation was made. No Storage object was uploaded/deleted. No deployment, commit, push, live inquiry, email, or analytics event occurred. Protected SEO pages, metadata, Schema, `video/`, and existing Resend brand copy were not changed.

## Findings fixed during review

| Finding | Initial decision | Local correction | Evidence |
| --- | --- | --- | --- |
| Legacy Storage URL parser checked bucket but not current Supabase origin | BLOCKER | Storage-shaped URLs now require HTTPS, exact configured project origin, exact `order-images` public prefix, no credentials/query/fragment, decoded safe path | Order-image suite expanded from 18 to 34 tests; focused RED first had 6 parser/signing failures, then 2 additional credential/empty-segment failures; 34/34 passed |
| `CREATE TABLE IF NOT EXISTS orders` guard checked only UUID and four amount columns | BLOCKER | Guard now verifies all 20 recorded columns/types/nullability/precision, exact column count, UUID PK, and the five-value status CHECK | Static migration suite RED on missing full guard, then 37/37 passed |
| 72 pgTAP assertions omitted important identity/operation boundaries | NEEDS ATTENTION | Matrix expanded to 132 assertions, including non-admin feedback, admin membership mutation, anon orders/library, article images, and missing Storage writes | 132/132 passed in the disposable Supabase database on 2026-09-03 |
| Verification SQL filtered Storage policies to known bucket expressions and could hide a global policy | NEEDS ATTENTION | Verification now lists every `storage.objects` policy and adds Storage RLS flags plus order constraints | Static verification contract passed |

No SQL blocker remains. Direct bucket-metadata UPSERTs, migration reruns, live RLS, and Storage API behavior passed in the disposable project.

## Statement-by-statement migration review

| Migration | Statement / block | Object | Effect | Risk | Decision |
| --- | --- | --- | --- | --- | --- |
| Hardening | `BEGIN` | transaction | Starts one atomic authorization change set | Locks/changes remain pending until commit | SAFE |
| Hardening | `CREATE EXTENSION IF NOT EXISTS uuid-ossp` | extension | Reproduces UUID default support for fresh environments | Requires migration-owner privilege; no-op in recorded production | SAFE |
| Hardening | `CREATE TABLE IF NOT EXISTS public.orders` | `public.orders` | Creates the recorded order shape only when absent | Existing tables are not altered; must not hide drift | SAFE with following fail-closed guard |
| Hardening | full orders catalog `DO` guard | `public.orders` catalog | Aborts on missing/extra/wrong columns, precision/nullability, UUID PK, or missing recorded status values | Defaults are reported by verification but not rewritten | SAFE |
| Hardening | nine `ENABLE ROW LEVEL SECURITY` statements | reviewed public tables | Ensures RLS is enabled | Does not FORCE RLS or alter rows | SAFE |
| Hardening | `CREATE OR REPLACE FUNCTION public.is_admin()` | function | Uses caller `auth.uid()` and schema-qualified membership lookup under fixed search path | SECURITY DEFINER relies on trusted owner and fixed body | SAFE |
| Hardening | function `REVOKE` / `GRANT EXECUTE` | function ACL | Removes default PUBLIC execute and allows only anon/authenticated/service role | Boolean discloses only caller's own membership result | SAFE |
| Hardening | dynamic public-table `DROP POLICY` loop | nine tables | Removes all recorded/unknown policies before replacement | Broad convergence; must use approved baseline | SAFE inside same transaction; NEEDS ATTENTION on new baseline drift |
| Hardening | inquiry policies | `inquiries`, `inquiry_files` | Admin SELECT/UPDATE inquiry; admin SELECT attachment metadata | Service-role ingestion remains outside these client policies | SAFE |
| Hardening | customer policies | `customers` | Admin SELECT/DELETE only | No insert/update client path granted | SAFE |
| Hardening | feedback policies | `feedback_messages` | Public published SELECT; admin SELECT/UPDATE/DELETE | Direct public insert stays closed | SAFE |
| Hardening | order policies | `orders` | Admin SELECT/INSERT/UPDATE; no DELETE | Ordinary authenticated users have grants but no matching rows/policies | SAFE |
| Hardening | article policies | `articles` | Published SELECT for anon/authenticated; four admin CMS policies | Keeps SQL SELECT privilege required for RLS-filtered public read | SAFE |
| Hardening | knowledge policies | `knowledge_articles` | Same published/admin split | Preserves published Knowledge and GEO winner paths | SAFE |
| Hardening | admin membership policies | `admin_users` | Authenticated caller may select own row; admins may select all; no mutations | Own-row rule is redundant under current any-row-is-admin semantics but matches production architecture | SAFE |
| Hardening | library metadata policies | `library_files` | Admin SELECT/INSERT/DELETE; no UPDATE | Storage bucket remains a separately controlled object | SAFE |
| Hardening | per-table `REVOKE ALL PRIVILEGES` | nine public tables | Removes DML plus REFERENCES/TRIGGER/TRUNCATE from anon/authenticated | Short-lived loss is invisible outside uncommitted transaction | SAFE |
| Hardening | allowlisted table `GRANT` statements | nine public tables | Restores only application-required SQL operations | RLS remains the row-level admin boundary | SAFE |
| Hardening | three-bucket UPSERT | `storage.buckets` | Preserves article/inquiry/library privacy, size, MIME metadata | Official docs allow SQL bucket creation but separately caution treating Storage records as read-only; existing-bucket metadata update needs real platform test | NEEDS ATTENTION, not a local SQL blocker |
| Hardening | scoped Storage policy drop loop | `storage.objects` policies | Removes policies whose expressions reference the three reviewed buckets | Depends on fixed production baseline; an unrelated/global policy is not silently removed | SAFE with complete-policy verification; NEEDS ATTENTION on baseline drift |
| Hardening | article-image policies | `storage.objects` | Public SELECT plus admin INSERT/UPDATE/DELETE, all bucket-scoped | Public bucket intentionally remains public | SAFE |
| Hardening | inquiry-file policy | `storage.objects` | Adds only admin SELECT for signing | No anon insert/read and no admin delete added; service role bypasses RLS | SAFE |
| Hardening | library-file policies | `storage.objects` | Admin SELECT/INSERT/DELETE, no UPDATE | Every policy includes exact bucket ID | SAFE |
| Hardening | `COMMIT` | transaction | Publishes the complete policy/grant/bucket set atomically | Any prior statement failure rolls back | SAFE |
| Order transition | `BEGIN` | transaction | Starts isolated order-image access transition | Requires compatible code already active | SAFE with rollout precondition |
| Order transition | `order-images` bucket UPSERT | `storage.buckets` | Switches private, sets 5 MiB and JPEG/PNG/WebP | Direct metadata update and Storage behavior require disposable proof | NEEDS ATTENTION |
| Order transition | scoped Storage policy drop loop | `storage.objects` policies | Removes all expression-scoped legacy `order-images` policies | Existing public/auth-wide access ends only at commit | SAFE with baseline/verification |
| Order transition | four admin policies | `storage.objects` | Admin SELECT/INSERT/UPDATE/DELETE only | All operations require exact bucket ID and `public.is_admin()` | SAFE |
| Order transition | `COMMIT` | transaction | Atomically publishes privacy metadata and replacement policies | Application must already handle paths and legacy URLs | SAFE with rollout precondition |

Neither migration deletes an application row, deletes/uploads/renames a Storage object, rewrites an historical order image, backfills a URL, changes inquiry/feedback ingestion, opens anon/authenticated access, or touches conversion attribution state.

## Transaction and rerun safety

PostgreSQL DDL used here (`CREATE OR REPLACE FUNCTION`, policy DDL, RLS, grants) and bucket metadata DML are enclosed by each explicit transaction. Policy deletion and replacement therefore have no externally visible intermediate policy window; a statement failure rolls the transaction back. No separate Storage object-store operation occurs inside either migration.

Both scripts converge safely when rerun against their own resulting state: extension/table creation is conditional, bucket writes are UPSERTs, policy loops drop current bucket/table policies before recreation, and grants are revoked then restored. Rerun is intentionally fail-closed if `orders` or the reviewed production baseline has drifted. It is not permission to rerun a historical migration casually.

Supabase currently documents both [SQL bucket creation](https://supabase.com/docs/guides/storage/quickstart) and a general warning to [treat Storage schema records as read-only](https://supabase.com/docs/guides/storage/schema/design). Therefore the bucket metadata UPSERT remains a real disposable-platform gate, not an assumed production guarantee. Object operations must continue through the Storage API.

## Effective table grants

`REVOKE ALL PRIVILEGES` removes `REFERENCES`, `TRIGGER`, and `TRUNCATE` from both client roles before the allowlist is restored.

| Table | anon | authenticated |
| --- | --- | --- |
| `inquiries` | none | SELECT, UPDATE |
| `inquiry_files` | none | SELECT |
| `customers` | none | SELECT, DELETE |
| `feedback_messages` | SELECT | SELECT, UPDATE, DELETE |
| `orders` | none | SELECT, INSERT, UPDATE |
| `articles` | SELECT | SELECT, INSERT, UPDATE, DELETE |
| `knowledge_articles` | SELECT | SELECT, INSERT, UPDATE, DELETE |
| `admin_users` | none | SELECT |
| `library_files` | none | SELECT, INSERT, DELETE |

The authenticated SQL privileges are necessary for PostgREST/browser operations but do not make every signed-in user an admin: operation-specific RLS still requires `public.is_admin()` for private rows and writes.

## Boundary conclusions

### Articles

- anon and non-admin: SQL SELECT remains granted, with RLS returning only `status = 'published'`; all writes denied.
- admin: published/draft SELECT and INSERT/UPDATE/DELETE allowed through separate policies.
- public rendering currently uses the server service-role client and also filters `status = 'published'`; public RLS remains correct defense for direct Data API reads.
- no page, Title, H1, canonical, Schema, or article content changed.

### Feedback

- anon/non-admin see published rows only and cannot write directly.
- admin can SELECT all, UPDATE, and DELETE; no client INSERT path is granted.
- website POST continues `server Route -> service role -> INSERT`; service-role privileges are untouched.

### Orders

- anon has no table privilege; non-admin receives no rows and cannot pass insert/update policies.
- admin has SELECT/INSERT/UPDATE only; DELETE is absent at both grant and policy layers.
- the migration reproduces, rather than redefines, UUID ID, nullable integer quantity, four nullable `numeric(12,2)` amounts, and text image columns.

`numeric(12,2)` has ten integer digits and two fractional digits, so `9,999,999,999.99` is the exact maximum. Raw FormData strings are accepted only as non-negative base-10 decimals with up to two decimal places and are range-checked before conversion. Explicit tests allow `9999999999.99`, `0`, and `0.01`; they reject `10000000000.00`, `1.001`, `1e3`, `Infinity`, `NaN`, and `-1`. Order IDs use the shared `z.string().uuid()` contract and invalid IDs cause `INVALID_INPUT` before database mutation.

### `is_admin()` and `admin_users`

The no-argument `STABLE SECURITY DEFINER` function has fixed `search_path = public`, references `public.admin_users` and `auth.uid()` explicitly, and returns only whether the current caller has a membership row. NULL `auth.uid()` returns false; database exceptions deny the calling operation rather than granting it. Ordinary authenticated EXECUTE is acceptable because no other user's identity can be supplied.

Authenticated clients cannot INSERT/UPDATE/DELETE `admin_users`. Own-row SELECT is retained for architectural parity; because every current membership row counts as admin, the rule does not create a separate non-admin membership class. RBAC remains out of scope.

## Storage conclusions

| Bucket | Final metadata | Final policy |
| --- | --- | --- |
| `article-images` | public; 5 MiB; JPEG/PNG/WebP/AVIF/GIF | public SELECT; admin INSERT/UPDATE/DELETE |
| `library-files` | private; existing NULL size/MIME retained | admin SELECT/INSERT/DELETE; no UPDATE |
| `order-images` | private; 5 MiB; JPEG/PNG/WebP | admin SELECT/INSERT/UPDATE/DELETE |
| `inquiry-files` | private; 25 MiB; existing NULL MIME retained | admin SELECT only; service-role ingestion needs no policy |

Every new `storage.objects` policy contains an explicit `bucket_id = '<exact bucket>'`. There is no unscoped `public.is_admin()` Storage policy.

## Order-image no-downtime sequence

The reviewed order is:

1. deploy the backward-compatible reader and path-only writer;
2. apply general hardening, which supplies unrelated bucket/table fixes and leaves `order-images` public;
3. verify current-origin legacy URLs and new paths while the bucket is still public;
4. apply the private-transition migration;
5. verify both forms again under admin-only SELECT.

This code-first deployment does not require the future admin SELECT policy yet because production currently has a public, bucket-scoped SELECT policy. Supabase documents that [private downloads are governed by RLS](https://supabase.com/docs/guides/storage/buckets/fundamentals) and that [`createSignedUrl` requires object SELECT](https://supabase.com/docs/reference/javascript/v1/storage-from-createsignedurl); the current public policy supplies it before transition, and the new admin policy supplies it after transition. Real public-bucket signing remains an explicit disposable API test.

Alternative orders:

- **Hardening -> code -> private:** technically image-compatible because hardening does not touch `order-images`, but delays the required compatibility code and provides no advantage over the reviewed staged path.
- **Code -> private -> hardening:** image policies can work because the private migration creates admin SELECT, but it leaves the confirmed article/library blockers open longer and runs the dependent transition before the general reviewed convergence. Not recommended.
- **Private before compatible code:** rejected; legacy stored public URLs could stop rendering.

Four required states are covered by the design and unit tests, but still require real API/UI proof:

| Stored value | Bucket | Resolver behavior |
| --- | --- | --- |
| legacy current-project public URL | public | validate origin/bucket/path -> sign using current public SELECT |
| legacy current-project public URL | private | validate origin/bucket/path -> sign using admin SELECT |
| new object path | public | sign using current public SELECT |
| new object path | private | sign using admin SELECT |

New writes persist only `orders/<uuid>.<ext>`. Signed URLs are five-minute display artifacts and are never persisted. Legacy rows are read compatibly and never rewritten. External HTTPS legacy URLs remain renderable but never enter the signing API.

The parser accepts a current-origin URL-encoded filename and nested folders. It rejects another project, another bucket, HTTP, credentials, `javascript:`, `data:`, `file:`, traversal and encoded traversal, empty/root paths, malformed percent encoding, and Storage query/fragment tricks.

## Verification and test readiness

The verification SQL now reports:

- public and Storage RLS flags;
- every reviewed table column/default/precision;
- order constraints;
- all anon/authenticated grants;
- all public-table policies;
- complete `is_admin()` definition/settings/ACL;
- four bucket metadata rows;
- every `storage.objects` policy, including an unexpected global policy.

It reads no customer/business row, Auth row, object name, or object path.

Local automated evidence after review changes:

- full Vitest: 13 files, 180/180 passed;
- core Admin Security: 66/66 passed (56 Actions + 6 `requireAdmin` + 4 page guard);
- order-image compatibility/security: 34/34 passed;
- static migration/verification contract: 37/37 passed;
- Conversion: 43/43 passed;
- pgTAP: **132/132 passed** in disposable Supabase;
- real Storage API identity matrix: **passed** for anon, non-admin, admin, and the service-role ingestion control;
- catalog summary: **13/13 passed** before and after migration reruns;
- real JWT Data API matrix: **passed** across the nine reviewed public tables.

| Local gate | Exit | Result |
| --- | ---: | --- |
| `npm run typecheck` | 0 | passed |
| `npm run lint` | 0 | passed with 17 warnings, 0 errors |
| `npm run test` | 0 | 13 files, 180/180 passed |
| `npm run test:seo` | 0 | 43/43 passed |
| `npm run build` | 0 | default Next.js 16.3.4 configuration, 11 workers, 44/44 pages |
| `git diff --check` | 0 | passed; existing LF-to-CRLF notices remain |
| `npm audit` | 1 | 7 development-tree findings: 6 high, 1 low |
| `npm audit --omit=dev` | 0 | 0 production vulnerabilities |

The full-audit findings remain in development/tooling dependencies (`brace-expansion`, `browserslist`, `glob`, `js-yaml`, and `postcss-selector-parser`). No automatic or forced dependency rewrite was performed. The production dependency gate remains clean.

The pgTAP file now covers the requested tables/buckets, three identities, needed operations, grant hygiene, and `is_admin()` identity states. It still cannot prove Storage service behavior; the separate real Storage API matrix is mandatory.

## Disposable project plan

The exact plan is recorded in `supabase/tests/disposable/20260902_disposable_supabase_test_plan.md`. It requires:

1. a new temporary Supabase project with no production data;
2. repository schema plus migrations in the documented order;
3. real Auth sessions for anon, synthetic non-admin, and synthetic admin;
4. 132 pgTAP assertions;
5. pre/post-private order-image compatibility checks;
6. real Storage API download/upload/update/delete and signed-URL checks;
7. catalog-only verification;
8. synthetic cleanup and deletion of the temporary project.

This host reported Supabase CLI unavailable, Docker unavailable, `psql` unavailable, and no `supabase/config.toml`, so the approved cloud disposable project was used through the dashboard SQL Editor and the Supabase JavaScript client. After explicit action-time confirmation, the project and all synthetic data were permanently deleted on 2026-09-03, and the volatile test credentials and bindings were cleared.

## Remaining gate

The disposable technical gate passed and cleanup is complete. The owner may separately approve or decline entry into `Production Change Review`. No production operation is authorized, and the state remains `NOT READY FOR DEPLOY`.
