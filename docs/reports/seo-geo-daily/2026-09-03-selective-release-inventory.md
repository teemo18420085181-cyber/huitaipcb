# HuitaiPCB Selective Release Inventory — 2026-09-03

**Decision: APPROVED FOR CONTROLLED PRODUCTION ROLLOUT**

**Execution boundary:** this document freezes an uncommitted candidate only. No production SQL, Supabase/Storage change, Vercel environment change, GA4 Admin change, deploy, live inquiry, commit, or push was performed.

## Owner-copy search disposition

| File | Text | Public/indexable? | Change this release? |
| --- | --- | --- | --- |
| `src/lib/email/resend.ts` | response time, turnkey quotation scope, dedicated project contact, confirmation subject | No — customer confirmation email | Yes — owner-approved copy only |
| `src/lib/inquiry/client-response.ts` | successful inquiry response time | No — post-submit result | Yes — owner-approved copy only |
| `src/components/InquiryForm.tsx` | dormant success-copy fields | No — success state only; current render uses `getInquirySuccessCopy()` | Yes — owner-approved copy only |
| `src/lib/email/resend.test.ts` | approved-copy assertions | No — test | Yes |
| `src/lib/inquiry/client-response.test.ts` | approved-copy assertions | No — test | Yes |
| `src/components/InquiryForm.tsx` | visible form footer: “within 24 hours” | Yes — `/contact` | No — `OWNER COPY FOLLOW-UP` |
| `src/app/(en)/contact/page.tsx` | visible response target: “within 24 hours” | Yes — `/contact` | No — `OWNER COPY FOLLOW-UP` |
| `src/lib/content/knowledge.ts` | several `24h`/`24 hours` response claims and one NDA timing claim | Yes — Knowledge pages/meta | No — `OWNER COPY FOLLOW-UP` |
| `src/components/FeedbackBoard.tsx` | NDA timing claim | Yes — public component | No — `OWNER COPY FOLLOW-UP` |
| `docs/external-distribution/backlink-action-pack.md` | external-distribution 24-hour claim | Not runtime, but public-distribution copy | No — `OWNER COPY FOLLOW-UP` |
| historical audit/implementation reports | former wording recorded as evidence | No — historical documentation | No — preserve evidence; do not rewrite history |
| `src/lib/content/seoPages.ts` | generic plural “Turnkey quotes” guidance, not the rejected promise | Yes — service-page content | No — protected SEO content |

## A. INCLUDE IN RELEASE

Only the following files are candidates for selective staging.

### Runtime and dependency files

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

The unchanged `src/app/admin/(protected)/layout.tsx` remains a required runtime dependency but is not staged because it has no diff.

### Migrations and reproducible database state

- `supabase/migrations/20260901_conversion_attribution.sql`
- `supabase/migrations/20260902090000_rls_grants_storage_hardening.sql`
- `supabase/migrations/20260902100000_order_image_storage_transition.sql`
- `supabase/schema.sql`
- `supabase/policies.sql`
- `supabase/baselines/20260902_production_security_baseline.md`
- `supabase/verification/20260902_security_post_migration.sql`
- `supabase/tests/database/20260902_security_hardening.test.sql`
- `supabase/tests/disposable/20260902_disposable_supabase_test_plan.md`

### Tests and checks

- `vitest.config.ts`
- `src/test/server-only.ts`
- `scripts/seo-regression.mjs`
- `src/lib/admin/admin-actions.test.ts`
- `src/lib/admin/order-images.test.ts`
- `src/lib/admin/require-admin-page.test.ts`
- `src/lib/admin/require-admin.test.ts`
- `src/lib/analytics/attribution.test.ts`
- `src/lib/analytics/server.test.ts`
- `src/lib/email/resend.test.ts`
- `src/lib/inquiry/client-response.test.ts`
- `src/lib/inquiry/process.test.ts`
- `src/lib/inquiry/supabase-adapter.test.ts`
- `src/lib/inquiry/types.test.ts`
- `src/lib/inquiry/validation.test.ts`
- `src/lib/supabase/security-migration.test.ts`

### Reviewed release documentation

- `docs/reports/seo-geo-action-tracker.md`
- `docs/reports/seo-geo-daily/2026-09-01-conversion-attribution-implementation.md`
- `docs/reports/seo-geo-daily/2026-09-02-security-migration-final-review.md`
- `docs/reports/seo-geo-daily/2026-09-02-supabase-security-remediation.md`
- `docs/reports/seo-geo-daily/2026-09-03-disposable-supabase-security-test.md`
- `docs/reports/seo-geo-daily/2026-09-03-production-change-review.md`
- `docs/reports/seo-geo-daily/2026-09-03-selective-release-inventory.md`
- `docs/superpowers/plans/2026-09-01-conversion-attribution.md`
- `docs/superpowers/specs/2026-09-01-conversion-attribution-design.md`

## B. EXCLUDE FROM RELEASE

The following current workspace changes/untracked files must not be staged for this release:

- `src/app/_metadata.ts` — pre-existing user-owned entity/metadata diff
- `.agents/skills/animation-vocabulary/`
- `.agents/skills/apple-design/`
- `.agents/skills/emil-design-eng/`
- `.agents/skills/find-animation-opportunities/`
- `.agents/skills/improve-animations/`
- `.agents/skills/pick-ui-library/`
- `.agents/skills/review-animations/`
- `skills-lock.json`
- `docs/external-distribution/backlink-action-pack.md`
- `docs/reports/pcba-aeo-topic-clusters.md`
- `docs/reports/pcba-buyer-question-library.md`
- `docs/reports/seo-aeo-geo-content-map.md`
- `docs/reports/seo-aeo-geo-strategy-2026-09-01.md`
- `docs/reports/seo-geo-daily/2026-09-01-aeo-content-template.md`
- `docs/reports/seo-geo-daily/2026-09-01-ai-crawler-audit.md`
- `docs/reports/seo-geo-daily/2026-09-01-conversion-audit.md`
- `docs/reports/seo-geo-daily/2026-09-01-entity-audit.md`
- `docs/reports/seo-geo-daily/2026-09-01-geo-winner-analysis.md`
- `docs/reports/seo-geo-daily/2026-09-01-ranking-diagnosis.md`
- `docs/reports/seo-geo-daily/2026-09-01.md`
- `docs/superpowers/plans/2026-09-01-seo-aeo-geo-audit.md`
- `docs/superpowers/specs/2026-09-01-seo-aeo-geo-audit-design.md`
- `index.html`
- `inputs/`
- `outputs/`
- `public/images/china-pcba-manufacturer/aoi-fai-workstation-real.jpg`
- `public/images/china-pcba-manufacturer/flying-probe-testing-real.jpg`
- `public/images/pcba/`
- `video/` (protected; no operation performed)
- all Turnkey/BOM/Knowledge/GEO-Winner content, other SEO pages, Title/H1/meta/canonical, Schema/JSON-LD, robots, sitemap, internal links, hreflang, and entity-name edits

## Protected diff and runtime evidence

- Release-candidate scoped diff across `src/lib/content/seoPages.ts`, `src/lib/content/knowledge.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, schema/entity helpers, and GEO Winner sources: **0 files**.
- Raw working-tree exception: `src/app/_metadata.ts` has a pre-existing user diff. It was preserved and is explicitly excluded.
- Local production smoke: all 10 requested routes returned HTTP 200; no 403 or 500.
- GEO Winner title/H1: `China Low-Volume Turnkey PCBA Supplier Comparison Guide (2026)`.
- GEO Winner canonical: `https://huitaipcb.com/knowledge/top-low-volume-turnkey-pcba-suppliers-china`.
- No form was submitted and no live inquiry was sent.

## Frozen migration SHA-256

| Order | Migration | SHA-256 |
| --- | --- | --- |
| 1 | `supabase/migrations/20260901_conversion_attribution.sql` | `674E141FE8874E82701683F6DC4A764E397404A3A9B88B41308C0DEE3171376E` |
| 2 | `supabase/migrations/20260902090000_rls_grants_storage_hardening.sql` | `DE6AAE6E664C52993DCFC64B804C8C92BA6A3943AB3CCA632D503F6990C588EA` |
| 3 | `supabase/migrations/20260902100000_order_image_storage_transition.sql` | `A9AC08A0A591EED36AA9C15EA1ED44E672D4B2193709D942FE0B8BEBA5C610C5` |

All three values match the prior Production Change Review freeze.

## Gate evidence

| Check | Result |
| --- | --- |
| Focused TDD red phase | exit 1; 3 expected copy failures, 10 passes |
| Focused TDD green phase | exit 0; 13/13 tests |
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0; 0 errors, 17 warnings |
| `npm run test` | exit 0; 13 files, 183/183 tests |
| `npm run test:seo` | exit 0; 43/43 checks |
| `npm run build` | exit 0; Next.js 16.3.4, default 11 workers, 44/44 pages |
| `git diff --check` | exit 0; line-ending notices only |
| `npm audit` | exit 1; 7 development-tree findings (6 high, 1 low) |
| `npm audit --omit=dev` | exit 0; 0 vulnerabilities |

## Exact proposed commit

Do not use `git add .`. Stage only the files in section A, verify the staged name list and diff, then create exactly one commit after explicit approval.

Proposed message:

`feat: harden inquiry conversion and admin security`

No commit has been created.

## Next ordered phase (not executed)

1. Selective release commit.
2. Production Supabase backup/recovery confirmation.
3. Production read-only preflight.
4. Verify migration SHA-256 values.
5. Apply Conversion Attribution migration, then verify.
6. Apply Security Hardening migration, then verify.
7. Configure Vercel environment variables.
8. Configure GA4.
9. Deploy the compatible application.
10. Verify public and admin behavior.
11. Apply Order Images Private Transition migration.
12. Run full verification.
13. After separate approval, send one labeled production test inquiry.
14. Reconcile database, email, and GA4 evidence.
