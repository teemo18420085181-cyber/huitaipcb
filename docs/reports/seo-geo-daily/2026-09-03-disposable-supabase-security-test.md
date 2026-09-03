# Disposable Supabase Security Test — 2026-09-03

**Decision: DISPOSABLE TEST PASSED / AWAITING PRODUCTION CHANGE REVIEW DECISION**

This is not `READY FOR DEPLOY`. It does not authorize production SQL, RLS, grants, Storage changes, data migration, deployment, commit, or push. The only pending external action is deletion of the disposable project after an action-time confirmation.

## Isolation and target guard

- Project: `huitaipcb-security-disposable-20260902`, Free plan, East US (Ohio).
- A fresh project reference was verified different from production before any SQL or API call.
- Production Supabase was not queried, connected to, or modified.
- No production customer, inquiry, order, Auth user, row, object, URL, or file was copied.
- All business rows, users, credentials, and objects were synthetic and carried a unique test-run prefix or fixed pgTAP UUID.
- API keys and passwords remained in volatile process memory. No secret was written to `.env`, source, repository, documentation, screenshots, or command output.
- Service role was used only for setup, cleanup control, and the intentional inquiry-file ingestion check. Every anon/non-admin/admin assertion used the appropriate public client or real Auth session/JWT.

## Applied sequence

1. `supabase/schema.sql`
2. `supabase/policies.sql`
3. `supabase/articles.sql`
4. `supabase/migrations/20260901_conversion_attribution.sql`
5. synthetic production-style public `order-images` bucket/policy baseline
6. `supabase/migrations/20260902090000_rls_grants_storage_hardening.sql`
7. public-bucket order-image checks
8. `supabase/migrations/20260902100000_order_image_storage_transition.sql`
9. private-bucket checks, 132 pgTAP, real JWT Data/Storage API matrices, and catalog verification
10. hardening and private-transition migration reruns, then post-rerun catalog/API smoke checks

All repository SQL and both migration reruns completed successfully. Neither migration rewrote order image values or deleted a Storage object.

The project was created with “Automatically expose new tables” disabled. Therefore fresh tables did not inherit the production-like service-role SQL privileges, and the first service-role `admin_users` setup insert correctly returned `42501`. A disposable-only fixture then granted service role the public-table privileges already present in the recorded production architecture. This was test-environment parity setup, not a production migration change and not a client-role permission expansion.

## Real Auth identity proof

| Check | Result |
| --- | --- |
| Synthetic non-admin user created through Auth Admin API | PASS |
| Synthetic admin user created through Auth Admin API | PASS |
| Both users signed in with password and received distinct sessions/JWTs | PASS |
| Non-admin `public.is_admin()` | `false` |
| Admin `public.is_admin()` | `true` |
| Service-role client used as an identity-test substitute | No |

## pgTAP

Final result: **132/132 passed**. Dashboard output was exactly `1..132` with no failure diagnostics.

The first managed-environment execution exposed `storage.protect_objects_delete()`: Supabase rejects direct SQL DELETE from `storage.objects` before RLS can return a policy result. The test was corrected without disabling or bypassing that platform guard:

- 12 Storage DELETE pgTAP assertions now inspect exact operation, role, `is_admin()`, and bucket-scoped policy shape;
- real object deletion allow/deny remains tested through the supported Storage API;
- four count assertions were scoped to their fixed pgTAP UUID/path so earlier synthetic API fixtures cannot change expected counts.

The final suite still contains 132 assertions and runs inside `BEGIN`/`ROLLBACK`.

## Order-image four-state transition

| Stored value | Bucket state | Evidence | Result |
| --- | --- | --- | --- |
| Legacy current-project public URL | public | object uploaded; public download 200; admin signed URL created; database stored HTTPS URL | PASS |
| New object path | public | object uploaded; public download 200; admin signed URL created; database stored only the path | PASS |
| Legacy current-project public URL | private | public endpoint changed to 400; URL parsed to expected object path; admin signed URL downloaded with 200 | PASS |
| New object path | private | public endpoint changed to 400; admin signed URL downloaded with 200 | PASS |

Additional transition evidence:

- non-admin upload succeeded under the deliberately recreated legacy authenticated-wide baseline;
- after transition, non-admin upload returned 403 and anon/non-admin signed/download operations returned 404;
- non-admin delete returned the Storage API's idempotent success shape but deleted zero objects; admin listing proved the object remained;
- admin DELETE returned one deleted object and admin listing proved it was removed;
- a legacy URL row was never rewritten, and a path row remained path-only;
- migration reruns preserved both admin signing paths and continued denying non-admin signing.

## Storage API identity matrix

| Bucket | anon | non-admin | admin | Service-role control | Result |
| --- | --- | --- | --- | --- | --- |
| `article-images` | read allowed; upload denied 403 | read allowed; writes ineffective/denied | upload, read, update, delete allowed | setup only | PASS |
| `library-files` | read/sign/upload denied | read/sign/upload denied; delete removed zero | read/sign/upload/delete allowed; update denied 403 | setup only | PASS |
| `order-images` | read/sign/upload denied | read/sign/upload denied; delete removed zero | read/sign/upload/update/delete allowed | setup only | PASS |
| `inquiry-files` | read/sign/upload denied | read/sign/upload denied | read/sign allowed; upload denied 403; delete removed zero | upload allowed as intended ingestion path | PASS |

Bucket enforcement was also exercised through the real API:

- `order-images` rejected `image/svg+xml` with 415;
- `order-images` rejected a payload above 5 MiB with 413;
- a small PNG was accepted;
- signed URLs were short-lived test artifacts and were never persisted.

## Real JWT Data API matrix

Supplementary real-session tests passed across all reviewed public tables:

- `articles` and `knowledge_articles`: anon/non-admin saw published only; writes were denied; admin read draft/published and completed required CRUD.
- `feedback_messages`: anon/non-admin saw published only and direct insert was denied; admin read all, updated, and deleted.
- `orders`: anon was denied, non-admin saw zero and could not mutate, admin selected/inserted/updated, and admin DELETE was denied.
- `admin_users`: anon was denied, non-admin could not elevate or mutate membership, admin could read membership but could not mutate it.
- `library_files`: anon was denied, non-admin saw zero and could not insert, admin selected/inserted/deleted, and UPDATE was denied.
- `inquiries`: anon was denied, non-admin saw zero, admin selected/updated, and client insert/delete remained denied.
- `inquiry_files`: anon was denied, non-admin saw zero, admin selected, and client insert/delete remained denied.
- `customers`: anon was denied, non-admin saw zero, admin selected/deleted, and client insert/update remained denied.

## Catalog verification

The repository catalog script executed successfully and reported 12 final `storage.objects` policies. A consolidated read-only check then returned **13/13 passed**, both before and after migration reruns:

- 9/9 reviewed public tables have RLS enabled;
- `storage.buckets` and `storage.objects` have RLS enabled;
- the anon/authenticated grant set is exactly the 26-operation allowlist;
- the Storage policy-name set is exactly 12 and every policy is bucket-scoped;
- `orders.id` is UUID and `quantity` is `int4`;
- all four order money columns are `numeric(12,2)`;
- `is_admin()` is `STABLE SECURITY DEFINER`, has fixed `search_path=public`, and references `public.admin_users` plus `auth.uid()`;
- `article-images`: public, 5 MiB, five recorded image MIME types;
- `library-files`: private, current NULL size/MIME retained;
- `inquiry-files`: private, 25 MiB;
- `order-images`: private, 5 MiB, JPEG/PNG/WebP only.

No catalog query selected an Auth row, customer row, order row, inquiry row, object name, or object path.

## Local regression gate after test corrections

| Command | Exit | Result |
| --- | ---: | --- |
| `npm run typecheck` | 0 | PASS |
| `npm run lint` | 0 | PASS; 17 existing warnings, 0 errors |
| `npm run test` | 0 | 13 files, 180/180 |
| Admin Security subset | 0 | 66/66 |
| Order-image subset | 0 | 34/34 |
| Conversion subset | 0 | 43/43 |
| Static migration/verification subset | 0 | 37/37 |
| `npm run test:seo` | 0 | 43/43 |
| `npm run build` | 0 | Next.js 16.3.4 default config, 11 workers, 44/44 pages |
| `git diff --check` | 0 | PASS; existing LF-to-CRLF notices only |
| `npm audit --omit=dev` | 0 | 0 vulnerabilities |
| `npm audit` | 1 | 7 dev-tree findings: 6 high, 1 low |

The full-audit findings remain limited to development/tooling dependencies. No automatic dependency fix was applied.

## Remaining action and release boundary

All disposable security gates passed. After explicit action-time confirmation, the disposable project and all synthetic data were permanently deleted on 2026-09-03. The JavaScript test kernel was reset, and all disposable credentials, JWT sessions, client bindings, and synthetic user identifiers were verified undefined. The owner may separately decide whether to enter `Production Change Review`.

No production change, GA4 change, deployment, commit, or push occurred. Current decision remains:

**DISPOSABLE TEST PASSED / AWAITING PRODUCTION CHANGE REVIEW DECISION / NOT READY FOR DEPLOY**
