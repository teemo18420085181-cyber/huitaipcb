# Phase 1 Commercial SEO, AEO, GEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage and three commercial service pages distinct keyword ownership, answer-first buyer content, clearer internal paths, valid structured data, and verified desktop/mobile presentation without changing inquiry or analytics behavior.

**Architecture:** Keep the homepage's existing component composition and add two focused server components for the early answer and RFQ file table. Extend `SeoLandingPage` with optional structured editorial blocks and an optional contextual secondary CTA; existing service pages and German content retain the legacy data path unless they opt into those fields.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Next Image, existing `TrackedLink`, Vitest/Node SEO regression checks.

**Spec:** `docs/superpowers/specs/2026-09-04-phase-1-commercial-seo-aeo-geo-design.md`

## Global Constraints

- Work only inside `G:\onestoppcba\onestoppcba`.
- Preserve the existing design system, real manufacturing images, server rendering, RFQ routes, and tracking event names.
- Do not edit inquiry, upload, Supabase, email, GA4, Measurement Protocol, attribution, idempotency, or API implementation files.
- Do not edit `src/app/_metadata.ts`; its current modification belongs to the user.
- Do not edit, move, or delete `video/`.
- Do not add dependencies, invent manufacturing claims, deploy, commit, push, or create a PR.
- Brand: `Huitai PCB`; legal entity: `Shenzhen Huitai Electronics Technology Co., Ltd.`

---

### Task 1: Lock the approved search intents in regression checks

**Files:**
- Modify: `scripts/seo-regression.mjs`

**Interfaces:**
- Consumes: static source files for the homepage, shared service renderer, and `seoPages` data.
- Produces: source-level assertions for the approved metadata, H1s, schema provider reference, CTAs, and intent boundaries.

- [x] **Step 1: Add failing assertions for the homepage**

Assert the exact title and H1, the early answer component, the capabilities heading and six internal destinations, all three project paths, the exact workflow heading, the quote-files table, the six-question FAQ, and both preserved RFQ destinations.

- [x] **Step 2: Add failing assertions for the three service pages**

Isolate all three entries from `seoPages.ts`. Assert each exact `seoTitle`, `metaDescription`, `title`, `serviceName`, and `serviceType`. Assert assembly-specific headings on PCB Assembly Services, first-build/outcome headings on Prototype, and readiness/BOM continuity/revision-control headings on Low Volume.

- [x] **Step 3: Add non-regression assertions**

Assert `provider: { '@id': SITE.organizationId }`, the self-canonical route helpers, the prototype/low-volume comparison guide links, and that low-volume introductory positioning does not contain `For 5 to 1,000` or make `5 pcs` its primary definition.

- [x] **Step 4: Run the SEO regression and confirm RED**

Run: `npm run test:seo`

Expected: failure messages naming the not-yet-implemented approved homepage and service-page content.

### Task 2: Refactor the homepage into a custom-PCBA hub

**Files:**
- Create: `src/components/HomeAnswer.tsx`
- Create: `src/components/QuoteFiles.tsx`
- Modify: `src/app/(en)/page.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/TrustStrip.tsx`
- Modify: `src/components/Comparison.tsx`
- Modify: `src/components/ProcessGrid.tsx`
- Modify: `src/components/FactoryGrid.tsx`
- Modify: `src/components/QualityTesting.tsx`
- Modify: `src/components/HomeFaq.tsx`
- Modify: `src/components/FinalCTA.tsx`

**Interfaces:**
- Consumes: existing homepage composition, design tokens, real images, `TrackedLink`, and Next `Link`.
- Produces: two server components with no props, revised hub sections, unchanged CTA URLs/event names, and visible FAQ JSON-LD matching the rendered FAQ.

- [x] **Step 1: Implement exact metadata and hero ownership**

Set the approved title and meta description in `page.tsx`. Set the eyebrow to `CUSTOM PCBA MANUFACTURING · SHENZHEN, CHINA`, H1 to `Custom PCBA Manufacturing for Prototype and Production`, and approved description. Keep `/contact#quote-form` with `quote_click`; make `/contact#project-files` the visible secondary button with `upload_gerber_bom_click`.

- [x] **Step 2: Add the early answer component**

Create `HomeAnswer.tsx` with H2 `What Does Huitai PCB Provide?` and the approved direct answer covering PCB fabrication, BOM sourcing, SMT, through-hole, programming, AOI/X-ray, electrical/functional testing, prototype, low volume, repeat production, and confirmed project requirements.

- [x] **Step 3: Turn capabilities into a linked service hub**

Rename the section to `Custom PCBA Manufacturing Capabilities`. Map the six capability cards to fabrication, BOM sourcing, assembly, assembly, testing, and turnkey delivery destinations with descriptive link labels and existing visual tokens.

- [x] **Step 4: Implement the three manufacturing paths**

Change `Comparison.tsx` to Prototype PCB Assembly, Low-Volume PCBA Assembly, and Turnkey PCB Assembly cards with the approved descriptions and direct routes. Use a responsive one/two/three-column layout and one text link per card.

- [x] **Step 5: Rename workflow and manufacturing proof**

Set `ProcessGrid` H2 to `How a Custom PCBA Project Moves From Files to Production`. Set `FactoryGrid` H2 to `Inside Our PCBA Manufacturing Process` and keep all existing real images with factual captions.

- [x] **Step 6: Add the RFQ file table**

Create `QuoteFiles.tsx` with H2 `What Files Do You Need for a PCBA Quote?`, rows for Gerber, BOM + MPN, CPL, Assembly Drawing, Quantity, and Testing Requirements, plus a contextual link to `/pcba-quote-file-checklist`. Render a desktop table and labelled stacked mobile rows without horizontal scrolling.

- [x] **Step 7: Align FAQ and final CTA**

Keep six core buyer questions, add `What does a PCBA manufacturer do?`, and render matching FAQPage JSON-LD. Set the final heading to `Start Your Custom PCBA Project`, approved body copy, and preserve both tracked destinations.

- [x] **Step 8: Compose the approved section order and run focused checks**

Order: Hero, HomeAnswer, capabilities, paths, workflow, manufacturing proof, quality/testing, quote files, applications, FAQ, final CTA. Run `npm run test:seo` and expect homepage assertions to pass while service-page assertions still fail.

### Task 3: Add backward-compatible structured editorial blocks

**Files:**
- Modify: `src/lib/content/seoPages.ts`
- Modify: `src/components/SeoLandingPage.tsx`

**Interfaces:**
- Produces: `SeoRichSection`, optional `richSections?: SeoRichSection[]`, and optional `heroSecondaryLink?: RelatedLink`.
- `SeoRichSection` fields: `heading`, optional `body`, `items`, `note`, `links`, `table`, `ordered`, and `tone`.
- `table` fields: `columns: [string, string]` and `rows: { label: string; value: string }[]`.
- Existing `sections`, `filesNeeded`, `workflow`, `answerLinks`, FAQ, and CTA fields remain valid.

- [x] **Step 1: Add optional types without changing existing required fields**

Define the types above in `seoPages.ts`. Keep them optional so all untouched English and German entries remain type-compatible.

- [x] **Step 2: Add the contextual hero secondary link**

In `SeoLandingPage.tsx`, render `page.heroSecondaryLink` as a plain internal `Link`; otherwise retain the current tracked quote-file checklist link. Do not change the primary tracked CTA.

- [x] **Step 3: Render editorial rich sections**

When `richSections` exists, render it instead of the legacy repeated `page.sections` cards. Use bordered editorial sections, numbered outcome lists when `ordered` is true, compact checklist rows, natural contextual links, and highlight treatment only for `tone: 'highlight'`.

- [x] **Step 4: Render responsive comparison tables**

Use a semantic `<table>` at `md` and above. At smaller widths, render each row as a bordered definition-style block with both column labels visible. Do not rely on hidden horizontal overflow for critical content.

- [x] **Step 5: Type-check the compatibility boundary**

Run: `npm run typecheck`

Expected: PASS for the untouched legacy and German service-page data.

### Task 4: Rebuild PCB Assembly Services around assembly intent

**Files:**
- Modify: `src/lib/content/seoPages.ts`
- Modify: `src/app/(en)/pcb-assembly-services/page.tsx`

**Interfaces:**
- Consumes: `richSections` and `heroSecondaryLink` from Task 3.
- Produces: exact approved metadata/H1/Service schema values and assembly-led content.

- [x] **Step 1: Set exact ownership fields**

Set title/H1, SEO title, meta description, quick answer, service name, and service type to the approved values. Use `absoluteUrl` and `getLanguageAlternates` for canonical and alternates in the route module.

- [x] **Step 2: Add assembly-led sections**

Add SMT Assembly; Through-Hole / DIP Assembly; Mixed SMT and Through-Hole Assembly; Manual Soldering and Post-Assembly Work; PCB Assembly Inspection; What Files Are Needed for PCB Assembly?; Customer-Supplied Components or Component Sourcing?; PCB Assembly for Different Production Stages; PCB Assembly Workflow; and PCB Assembly vs Turnkey PCB Assembly.

- [x] **Step 3: Add required contextual links and FAQ**

Link naturally to BOM sourcing, Turnkey, Prototype, Low Volume, testing, and fabrication + assembly. Keep 5–7 buyer FAQs and the existing project-file CTA route.

### Task 5: Separate prototype validation from low-volume production

**Files:**
- Modify: `src/lib/content/seoPages.ts`
- Modify: `src/app/(en)/prototype-pcb-assembly/page.tsx`
- Modify: `src/app/(en)/low-volume-pcba-assembly/page.tsx`

**Interfaces:**
- Consumes: structured blocks from Task 3.
- Produces: two distinct commercial intents and the approved Service schema names/types.

- [x] **Step 1: Implement Prototype exact metadata and early answer**

Use the approved Title, Meta, H1, five-board statement, and direct answer. Set the hero secondary link to `/low-volume-pcba-assembly`.

- [x] **Step 2: Implement the prototype validation structure**

Cover when to use prototype assembly, pre-build review, five-board starting point, Gerber/BOM/CPL revision control, BOM risk, first-article inspection, firmware/testing, the three post-test outcomes, workflow, and Prototype vs Low-Volume PCBA. Link to Low Volume, Turnkey, and `/knowledge/prototype-vs-batch-pcb-assembly`.

- [x] **Step 3: Implement Low Volume exact metadata and early answer**

Use the approved Title, Meta, H1, 50–1,000-piece positioning, and direct answer. Set the hero secondary link to `/prototype-pcb-assembly`.

- [x] **Step 4: Implement the production-readiness structure**

Add the exact readiness checklist, typical quantities, BOM continuity and substitution warning, repeatable SMT/DIP, first article and batch inspection, functional testing, controlled Gerber/BOM/CPL/drawing/firmware/test revisions, prototype transition, unit-cost explanation, and workflow.

- [x] **Step 5: Add required links and focused FAQs**

Link to Prototype, Turnkey, the prototype-versus-batch guide, BOM sourcing, and PCBA testing. Remove first-build language from primary low-volume positioning and avoid repeating the full comparison guide.

### Task 6: Complete automated verification and protected-path review

**Files:**
- Modify only files required to correct failures introduced by Tasks 1–5.
- Modify: `next.config.js` to cap build workers after repeated Windows native exits under low available memory.

**Interfaces:**
- Consumes: completed source changes.
- Produces: a verified production build and evidence that protected paths remain unchanged.

- [x] **Step 1: Run focused and full checks**

Run, in order: `npm run test:seo`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `git diff --check`.

- [x] **Step 2: Fix only task-caused failures**

For any failure, identify the exact changed file and correct it without refactoring unrelated code. Re-run the failed command and its dependent checks.

- [x] **Step 3: Verify protected files and routes**

Use `git diff --name-only` and targeted source searches to confirm no inquiry, analytics, API, Supabase, email, or form-contract file changed. Confirm CTA destinations remain `/contact#quote-form` and `/contact#project-files` with existing event names.

### Task 7: Browser visual, UX, mobile, and accessibility audit

**Files:**
- Create: local current-run screenshots under the Product Design audit output location.
- Modify only task files when a captured regression requires correction.

**Interfaces:**
- Consumes: locally rendered four-page implementation.
- Produces: accepted desktop/mobile screenshots and an evidence-tied audit summary.

- [x] **Step 1: Start the verified local app and open the in-app browser**

Use the repository's existing dev or production-start command. Do not deploy.

- [x] **Step 2: Capture all four pages at desktop and mobile widths**

Capture `/`, `/pcb-assembly-services`, `/prototype-pcb-assembly`, and `/low-volume-pcba-assembly`; sample tablet where practical. Reject loading, blank, cropped, or wrong-state screenshots.

- [x] **Step 3: Inspect the accepted screenshots**

Check first-screen comprehension, H1 wrapping, CTA hierarchy, section rhythm, image crops, table reflow, card consistency, FAQ readability, navigation/footer integrity, contrast risks, focus visibility, target sizes, and horizontal overflow.

- [x] **Step 4: Fix and recapture material issues**

Make only scoped fixes, repeat affected automated checks, and recapture the same viewport for direct comparison.

- [x] **Step 5: Complete self-review and handoff**

Use `pr-review` and `verification-before-completion`. Report changed files, exact metadata/H1 values, internal links, schema, visual/mobile/accessibility work, retained real imagery, every command and result, build status, protected-path confirmation, deferred conflicts, and no commit/push/deploy.
