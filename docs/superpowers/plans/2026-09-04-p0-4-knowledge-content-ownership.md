# P0-4 Knowledge Content Ownership Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the six core BOM, cost, and quote knowledge pages distinct search intent, answer-first content, commercial paths, and stable schema without changing URLs or backend behavior.

**Architecture:** Revise two existing static knowledge entries and add four same-slug static entries for CMS-backed pages in `knowledge.ts`. Register all six ownership slugs as static overrides in `articles.ts` so older CMS rows cannot shadow reviewed repository content. Retain the shared Knowledge design and schema builders, with targeted mobile table wrapping and floating-CTA sizing fixes.

**Tech Stack:** Next.js App Router, TypeScript, static knowledge content, React Markdown, existing Article/FAQ/Breadcrumb JSON-LD, Node SEO regression script, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-04-p0-4-knowledge-content-ownership-design.md`

## Global Constraints

- Work only inside `G:\onestoppcba\onestoppcba`.
- Preserve all existing slugs, URLs, real manufacturing images, shared article rendering, RFQ routes, and tracking event names.
- Do not write Supabase or change inquiry, upload, email, GA4, Measurement Protocol, attribution, idempotency, or API code.
- Do not edit `src/app/_metadata.ts`, `video/`, or unrelated user changes.
- Do not add dependencies, manufacture claims, commit, push, create a PR, or deploy.

---

### Task 1: Lock ownership decisions in SEO regression checks

**Files:**
- Modify: `scripts/seo-regression.mjs`

- [x] Add checks for all six exact SEO titles, H1 values, meta descriptions, and unchanged slugs.
- [x] Assert BOM Risk links to Alternative Approval, BOM Sourcing, Low Volume, and the commercial quote checklist without containing the full substitute-approval criteria table.
- [x] Assert Alternative Approval contains the package-similarity warning, compatibility criteria, customer approval, and links to BOM Risk and BOM Sourcing.
- [x] Assert Cost links to Prototype, Low Volume, Turnkey, and the quote checklist while Quote Guide owns the RFQ input list.
- [x] Assert the concise Quotation Checklist links to the explanatory Quote Guide, commercial checklist, and RFQ.
- [x] Assert all target slugs are in `STATIC_CONTENT_OVERRIDE_SLUGS` and the shared Knowledge route still emits Article, BreadcrumbList, conditional FAQPage, self-canonical metadata, and Organization references.
- [x] Run `npm run test:seo` and confirm the new checks fail because the ownership content is not implemented.

### Task 2: Separate BOM preparation and BOM risk

**Files:**
- Modify: `src/lib/content/knowledge.ts`
- Modify: `src/lib/content/articles.ts`

- [x] Rewrite `bom-best-practices` around exact MPNs, suffixes, designators, quantities, packages, descriptions, DNP/DNI, customer-supplied parts, approved alternatives, and release notes.
- [x] Add an early direct answer, a BOM field table, a pre-release checklist, links to BOM Risk and Alternative Approval, and a visible five-question FAQ.
- [x] Rewrite `bom-risk-alternative-component-sourcing` around lifecycle, obsolete items, shortages, allocation, long lead time, MOQ, single-source/no-substitute parts, repeat-order continuity, and BOM freeze.
- [x] Limit alternative discussion to customer approval and a contextual link; do not duplicate technical approval criteria.
- [x] Add the exact SEO title mappings in `articles.ts`.
- [x] Run `npm run test:seo` and confirm the BOM preparation/risk checks pass while later tasks remain red.

### Task 3: Make Alternative Component Approval technically distinct

**Files:**
- Modify: `src/lib/content/knowledge.ts`
- Modify: `src/lib/content/articles.ts`

- [x] Add a same-slug static article for `bom-alternatives-pcba-sourcing` with the approved H1, metadata, early answer, and explicit package/appearance warning.
- [x] Add a compatibility table covering MPN/suffix, package/footprint/pinout, ratings/tolerance/temperature, protocol/interface, firmware, project certifications, and customer approval.
- [x] Add a bounded approval workflow, rejection conditions, links to BOM Best Practices, BOM Risk, BOM Sourcing, and RFQ, plus visible FAQ.
- [x] Register the slug in `STATIC_CONTENT_OVERRIDE_SLUGS` and set its SEO title mapping.
- [x] Run `npm run test:seo` and confirm the alternative-approval checks pass.

### Task 4: Separate PCBA cost education from quotation preparation

**Files:**
- Modify: `src/lib/content/knowledge.ts`
- Modify: `src/lib/content/articles.ts`

- [x] Add the cost article static override with an early answer explaining setup cost and quantity effects without fixed Huitai pricing.
- [x] Cover PCB fabrication, BOM, stencil, SMT setup, placement count, DIP/manual work, AOI/X-ray, programming, functional testing, fixtures, packaging, and relevant delivery scope.
- [x] Link Cost naturally to Prototype, Low Volume, Turnkey, and the commercial quote checklist.
- [x] Add the Quote Guide static override around Gerber, BOM, CPL, drawings, PCB specification, quantity, programming, testing, customer-supplied parts, approved alternatives, destination, requested lead time, and revision status.
- [x] Limit Quote Guide cost discussion to explaining that incomplete scope changes quotation assumptions.
- [x] Link Quote Guide to the commercial file checklist, PCB Assembly Services, Turnkey, BOM Sourcing, and `/contact#project-files`.
- [x] Register both slugs as static overrides and set exact SEO title mappings.
- [x] Run `npm run test:seo` and confirm cost/quote ownership checks pass.

### Task 5: Convert the knowledge quotation checklist into a concise action page

**Files:**
- Modify: `src/lib/content/knowledge.ts`
- Modify: `src/lib/content/articles.ts`

- [x] Add the same-slug static quotation-checklist entry with the approved H1, metadata, short direct answer, grouped checklist, and final readiness check.
- [x] Link to the explanatory Quote Guide, `/pcba-quote-file-checklist`, relevant commercial services, and `/contact#project-files`.
- [x] Keep the page shorter and more scannable than the Quote Guide; do not repeat cost-driver explanations.
- [x] Register the slug as a static override and update its SEO title mapping.
- [x] Run `npm run test:seo` and require all P0-4 checks to pass.

### Task 6: Automated, protected-path, and browser verification

**Files:**
- Modify only task files if verification exposes a task-caused defect.
- Modify: `src/app/(en)/knowledge/[slug]/page.tsx`
- Modify: `src/components/FloatingWhatsApp.tsx`
- Create screenshots under the current Product Design audit output directory.

- [x] Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:seo`, `npm run build`, and `git diff --check`.
- [x] Confirm no inquiry, analytics, API, Supabase, email, attribution, idempotency, form-contract, `video/`, or `src/app/_metadata.ts` P0-4 diff.
- [x] Confirm all six target routes and commercial destinations return HTTP 200, one H1, self-canonical metadata, no `noindex`, parseable Article/Breadcrumb/FAQ schema, and the existing Organization reference.
- [x] Inspect all six modified pages at desktop and 390px mobile for editorial hierarchy, table reflow, long strings, checklist density, FAQ readability, CTA visibility, and horizontal overflow.
- [x] Add regression coverage and targeted fixes for mobile table wrapping and floating-CTA overlap.
- [x] Produce the ownership matrix and final 15-part report; stop without commit, push, PR, or deployment.
