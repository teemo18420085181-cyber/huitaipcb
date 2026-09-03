# Disposable Supabase Security Test Plan — 2026-09-02

Status: **EXECUTED 2026-09-03 / ALL TEST GATES PASSED / DISPOSABLE PROJECT DELETED**

This runbook is for a newly created disposable Supabase cloud project only. It must never be linked to, pointed at, or executed against the huitaipcb.com production project. Creating or deleting the disposable project requires explicit owner approval.

## Purpose

The disposable environment must provide evidence that static SQL review matches real Postgres RLS, Supabase Auth, and Storage API behavior. It uses synthetic identities, rows, and files only. No production customer, inquiry, order, file, Auth user, project reference, or secret may be copied.

## Preconditions and identity guard

1. Create a temporary project named clearly, for example `huitaipcb-security-disposable-20260902`.
2. Record its project reference privately and independently compare it with the production reference. Abort if they match or if the target cannot be proven disposable.
3. Keep the disposable database password, anon key, and service-role key only in temporary process environment variables. Never write their values to the repository, reports, screenshots, or command output.
4. Use a newly generated test-only password for two synthetic Auth users.
5. Do not enable production integrations, custom domains, Resend, GA4, webhooks, or Vercel environment variables.

The current host has no Supabase CLI, Docker, `psql`, or `supabase/config.toml`. After approval, use a pinned temporary `npx supabase` CLI or another reviewed runner; do not add the CLI as a project dependency merely to run this gate.

## Schema bootstrap order

Apply only to the verified disposable project, in this order:

1. `supabase/schema.sql`
2. `supabase/policies.sql` so `public.is_admin()` exists before `articles.sql`
3. `supabase/articles.sql`
4. `supabase/migrations/20260901_conversion_attribution.sql`
5. A synthetic production-baseline setup for the four bucket metadata rows and the recorded legacy `storage.objects` policies; create no production object names or files
6. `supabase/migrations/20260902090000_rls_grants_storage_hardening.sql`
7. Public-bucket compatibility checks for `order-images`
8. `supabase/migrations/20260902100000_order_image_storage_transition.sql`
9. Final catalog, pgTAP, Auth, Storage API, and application compatibility checks

Do not use `supabase/policies.sql` as the final policy definition. It is bootstrap input; the reviewed hardening migration must converge the project to the final state.

## Synthetic fixtures

Create through the disposable project's Auth Admin API:

- one confirmed authenticated non-admin user;
- one confirmed authenticated admin user.

Obtain real user sessions through `signInWithPassword`, not by using the service-role client for assertions. Insert only the admin user's UUID into `public.admin_users`. Verify through authenticated RPC calls that `public.is_admin()` returns false for anon and non-admin and true for admin.

Create synthetic published/draft articles, published/unpublished feedback, one order, one library metadata row, one inquiry plus inquiry-file metadata, and one customer. Prefix all values and object keys with a unique disposable test run identifier.

The service-role client is allowed only for setup, cleanup, and the intentional inquiry ingestion control. It must not be used to claim that anon, non-admin, or admin RLS passed.

## pgTAP gate

Run `supabase/tests/database/20260902_security_hardening.test.sql` against the disposable database after both migrations. The file currently contains **132 assertions**, runs inside `BEGIN`/`ROLLBACK`, and covers:

- `articles`, `orders`, `feedback_messages`, `admin_users`, and `library_files` table boundaries;
- `library-files`, `order-images`, `inquiry-files`, and `article-images` object policies;
- anon, authenticated non-admin, and authenticated admin identities;
- required SELECT/INSERT/UPDATE/DELETE behavior;
- least-privilege grants and removal of legacy TRUNCATE/TRIGGER/REFERENCES privileges;
- NULL, non-admin, and admin behavior of `public.is_admin()`.

Capture the exact command version, exit code, TAP assertion count, pass/fail output, and database target guard. Any failure keeps the release decision at `NOT READY` until explained and fixed.

## Real Storage API identity matrix

Use the Supabase JavaScript client and real disposable Auth sessions. Seed and clean up objects through the Storage API, never direct `storage.objects` row DML. Verify at minimum:

| Bucket | anon | non-admin | admin | service role control |
| --- | --- | --- | --- | --- |
| `article-images` | download allowed; upload/update/delete denied | download allowed; writes denied | download/upload/update/delete allowed | setup/cleanup only |
| `library-files` | all denied | all denied | download/upload/delete allowed; update denied | setup/cleanup only |
| `order-images` | all denied after transition | all denied after transition | download/signed URL/upload/update/delete allowed | setup/cleanup only |
| `inquiry-files` | all denied | all denied | download/signed URL allowed; upload/update/delete denied | inquiry upload setup proves intended ingestion |

Also prove that `order-images` rejects SVG and objects over 5 MiB, accepts a small JPEG/PNG/WebP, and that `inquiry-files` retains its 25 MiB limit. Do not upload customer-like content.

## Four-state order-image compatibility gate

The transition is acceptable only after all four states are demonstrated with synthetic rows/files:

1. **Legacy public URL + public bucket:** current-origin URL parses to the object path and the authenticated admin can create a signed URL.
2. **Legacy public URL + private bucket:** the same stored row is not rewritten; URL parsing plus admin SELECT yields a signed URL.
3. **New object path + public bucket:** path-only upload/write remains displayable through the signed URL resolver before the private transition.
4. **New object path + private bucket:** path-only row resolves through the final admin SELECT policy.

For stages 1 and 3, run after general hardening but before the private-transition migration. For stages 2 and 4, run after the private-transition migration. Confirm a non-admin cannot create the signed URL after transition. Confirm an external HTTPS legacy URL is never sent to the Supabase signing API.

## Catalog verification

Run `supabase/verification/20260902_security_post_migration.sql`. It reads catalog and bucket metadata only. Save results privately and compare them with `supabase/baselines/20260902_production_security_baseline.md` and the expected final contract.

Explicitly verify:

- RLS flags for all reviewed public tables plus `storage.buckets` and `storage.objects`;
- all `anon`/`authenticated` grants and absence of TRUNCATE/TRIGGER/REFERENCES;
- all public-table policies;
- `public.is_admin()` owner-independent definition, `SECURITY DEFINER`, `STABLE`, fixed search path, and execute ACL;
- `orders.id` UUID, quantity integer, four `numeric(12,2)` columns, primary key, and status CHECK;
- all four bucket privacy/size/MIME values;
- the complete `storage.objects` policy list, including unexpected global policies.

## Application smoke test

Run the local application against disposable environment variables only. Sign in as the synthetic admin and verify:

- a new order upload stores `orders/<uuid>.<ext>`, never a public or signed URL;
- order detail displays both a synthetic legacy current-project URL and a new object path;
- a legacy external HTTPS URL does not crash the page and is not signed;
- library upload/download/delete works and update remains unavailable;
- an inquiry attachment signed URL works for admin;
- published Knowledge content remains readable while draft CMS content remains admin-only;
- feedback server ingestion uses the service-role path, while direct anon insert is denied.

Do not send email or analytics events. Use test-only addresses under `.test` and prevent outbound integrations from being configured.

## Cleanup and evidence

1. Delete all synthetic Storage objects through the Storage API.
2. Delete synthetic Auth users and rows through the disposable service-role/Admin API.
3. Run the catalog query once more if cleanup evidence is required.
4. Delete the disposable project under the same explicit approval that authorized its creation.
5. Record only assertion totals, statuses, timestamps, and the redacted disposable project label. Never record keys, database URLs, passwords, JWTs, file contents, or production identifiers.

Passing this plan allows `READY FOR PRODUCTION CHANGE REVIEW`; it still does not authorize deployment or any production mutation.

## Execution record — 2026-09-03

The approved Free-plan project `huitaipcb-security-disposable-20260902` was created with a fresh project reference verified different from production. Production projects, rows, Auth users, Storage objects, and secrets were not queried or copied. Keys and synthetic passwords remained in volatile process memory and were not written to files or command output.

Execution results:

- repository schema, baseline policies, article schema, conversion migration, synthetic public `order-images` baseline, hardening migration, and private-transition migration all executed successfully;
- hardening and private-transition migrations were each rerun successfully; post-rerun catalog verification remained 13/13;
- two real synthetic Auth users signed in with password and obtained distinct JWT sessions; `is_admin()` returned false for the non-admin and true for the admin;
- final pgTAP output was `1..132` with no failure diagnostics;
- real Storage API checks passed for all four buckets, including 403/404 denial behavior, signed URLs, 5 MiB rejection (413), unsupported MIME rejection (415), public article-image reads, and service-role-only inquiry upload;
- all four order-image transition states passed; legacy URL rows remained unchanged, path rows stayed path-only, public URLs stopped working after privacy transition, and both legacy-derived and new paths remained signable by the admin;
- supplementary Data API checks with real anon/non-admin/admin sessions passed across all nine reviewed public tables;
- local gates passed: typecheck, lint with 17 existing warnings, 180/180 Vitest, 43/43 SEO, default 11-worker build with 44/44 pages, diff check, and production-only audit with zero vulnerabilities.

Two test-harness issues were found and corrected before the final pass:

1. Supabase's managed `storage.protect_objects_delete()` guard prevents direct SQL DELETE testing. The 12 Storage DELETE pgTAP assertions now validate exact bucket-scoped policy shape, while actual deletion allow/deny is proved through the Storage API.
2. Four count assertions originally counted whole tables/buckets and collided with earlier synthetic API fixtures. They now target the pgTAP fixture UUID/path explicitly.

Because automatic table exposure was intentionally disabled when the disposable project was created, fresh tables did not inherit service-role SQL grants. A disposable-only fixture restored the service-role grants already present in the recorded production architecture so setup and service-role inquiry ingestion could be exercised. This did not change production SQL or the reviewed client grants.

Detailed redacted evidence is in `docs/reports/seo-geo-daily/2026-09-03-disposable-supabase-security-test.md`. After explicit action-time confirmation, the disposable project and all synthetic data were permanently deleted on 2026-09-03. The JavaScript test kernel was reset and all disposable credentials, JWT sessions, client bindings, and synthetic user identifiers were verified undefined.
