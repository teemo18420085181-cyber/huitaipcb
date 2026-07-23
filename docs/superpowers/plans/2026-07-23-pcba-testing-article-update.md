# PCBA Testing Article Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the existing pre-shipment PCBA testing article into a practical buyer guide while presenting testing as one stage of Huitai Electronics' one-stop turnkey PCBA workflow.

**Architecture:** Keep the existing slug and static-content route. Maintain the technical testing guide in `src/lib/content/knowledge.ts`, but frame it from the title onward as part of the coordinated path from PCB fabrication and BOM sourcing through SMT/DIP assembly, testing, packaging, and finished PCBA delivery. Keep the shorter browser/search title in `src/lib/content/articles.ts` aligned with that turnkey positioning.

**Tech Stack:** Next.js App Router, React, TypeScript, static TypeScript content objects, React Markdown, FAQPage JSON-LD.

## Global Constraints

- Preserve `/knowledge/pcba-testing-before-shipment` and its canonical URL.
- Do not edit business pages, `src/lib/content/seoPages.ts`, CMS data, production services, or the untracked image and preview files.
- Do not claim unverified IPC classes, X-ray or ICT capability, 100% testing, fixed sampling, zero defects, or guaranteed turnaround.
- Describe functional testing as project-specific and dependent on customer-provided or mutually confirmed instructions, firmware, fixtures, interfaces, and acceptance criteria.
- Do not commit, push, deploy, or publish without a separate explicit request.

---

### Task 1: Expand the static knowledge article

**Files:**
- Modify: `src/lib/content/knowledge.ts:1071`
- Modify: `src/lib/content/articles.ts:24`
- Modify: `src/app/knowledge/page.tsx:17`

**Interfaces:**
- Consumes: the existing `KnowledgeArticle` object shape and the Markdown/FAQ conventions already used by the knowledge page.
- Produces: an updated `KnowledgeArticle` with the same slug, category, image, and route behavior.

- [x] **Step 1: Update the article metadata**

  Set the display title to `PCBA Testing Before Shipment: AOI and Functional Test Requirements`, map the SEO title to `PCBA Testing Before Shipment: AOI vs Functional Test`, use an RFQ-oriented excerpt, keep the existing cover, set `readTime` to `9 min read`, and write a concise meta description containing `PCBA testing before shipment`, `AOI`, and `functional testing requirements`.

- [x] **Step 2: Replace the article sections**

  Use these exact section responsibilities in this order: `Quick answer`; `AOI, visual inspection, and functional testing compared`; `What AOI can and cannot check`; `What customers should provide for functional testing`; `Functional test specification template`; `Confirm the testing scope before quotation`; `Define failure handling and retesting`; `Pre-shipment PCBA testing checklist`; `FAQ`; `Send your testing requirements for review`.

  Include two Markdown tables: a comparison of inspection methods and a functional-test specification template. Keep all Huitai capability language conditional on the agreed project scope.

- [x] **Step 3: Add internal links and conversion path**

  Link naturally to `/quality`, `/pcba-testing-quality-control`, `/knowledge/common-pcba-defects-and-prevention`, `/turnkey-pcb-assembly`, and `/contact#project-files`. Use the final CTA `Send your Gerber, BOM, firmware, fixture notes, and acceptance criteria for an engineering review` without a response-time promise.

- [x] **Step 4: Remove the fulfilled coming-soon topic**

  Delete `How to write a functional test specification for your CM` from the `COMING_SOON` list in `src/app/knowledge/page.tsx` because the updated article now includes the specification template.

### Task 2: Validate content and application behavior

**Files:**
- Inspect: `src/lib/content/knowledge.ts`
- Inspect: `src/lib/content/articles.ts`
- Inspect: `src/app/knowledge/page.tsx`
- Inspect: `src/app/knowledge/[slug]/page.tsx`

**Interfaces:**
- Consumes: the updated article object and existing build/lint scripts.
- Produces: evidence that the content compiles, renders through the current article template, and passes repository checks.

- [x] **Step 1: Review the focused diff**

  Run `git diff -- src/lib/content/knowledge.ts src/lib/content/articles.ts src/app/knowledge/page.tsx` and confirm only the intended article object, its SEO-title mapping, and the fulfilled coming-soon item changed; the slug is unchanged, all required internal links are present, and no unsupported claim appears.

- [x] **Step 2: Run repository validation**

  Run `npm run lint`, `npm run build`, and `git diff --check`. Expected result: all commands exit successfully with no lint, TypeScript, build, or whitespace errors.

- [x] **Step 3: Check final workspace scope**

  Run `git status --short --untracked-files=all`. Expected result: the article source and this plan are the only new task changes; all pre-existing untracked image and preview files remain untouched.

### Task 3: Restore one-stop turnkey PCBA positioning

**Files:**
- Modify: `src/lib/content/knowledge.ts:1071`
- Modify: `src/lib/content/articles.ts:30`
- Modify: `docs/superpowers/plans/2026-07-23-pcba-testing-article-update.md`

**Interfaces:**
- Consumes: the published testing guide, the `ARTICLE_SEO_TITLES` map, and the site's established turnkey wording.
- Produces: the same article URL with a turnkey-focused title, first-screen summary, workflow context, complete RFQ package, and one-stop CTA.

- [x] **Step 1: Reframe title and metadata**

  Set the display title to `PCBA Testing Before Shipment in a Turnkey Manufacturing Workflow`, map the SEO title to `PCBA Testing Before Shipment | Turnkey PCBA Guide`, and make the excerpt and meta description state that testing follows PCB fabrication, BOM sourcing, and SMT/DIP assembly within one coordinated delivery workflow.

- [x] **Step 2: Put the complete workflow before the testing detail**

  Rewrite `Quick answer` so its first sentence says testing is one stage of a turnkey workflow rather than a standalone assembly service. Add `Where testing fits in turnkey PCBA` immediately afterward with a Markdown table covering engineering review, PCB fabrication, BOM sourcing, SMT/DIP assembly, inspection/testing, and packaging/delivery.

- [x] **Step 3: Expand project inputs and the CTA**

  Start the customer-input section with the complete RFQ package: Gerber/drill, BOM with manufacturer part numbers, pick-and-place data, assembly drawings, PCB specifications, quantity, delivery requirements, firmware, fixtures, and acceptance criteria. Rewrite the final section as `Send your complete turnkey PCBA package for review` and state that Huitai reviews fabrication, sourcing, assembly, testing, packaging, and delivery as one quote scope.

- [x] **Step 4: Add a one-stop FAQ answer**

  Add `What does Huitai coordinate in a turnkey PCBA project?` to the existing FAQ and answer with the verified scope: PCB fabrication, BOM sourcing, SMT/DIP assembly, inspection and functional testing to confirmed requirements, packaging, and finished PCBA delivery.

### Task 4: Validate and republish the positioning correction

**Files:**
- Inspect: `src/lib/content/knowledge.ts`
- Inspect: `src/lib/content/articles.ts`
- Inspect: `docs/superpowers/plans/2026-07-23-pcba-testing-article-update.md`

**Interfaces:**
- Consumes: the corrected article copy and the existing Git/Vercel deployment flow.
- Produces: verified production content on the unchanged article URL.

- [x] **Step 1: Run local checks**

  Run `npm run lint`, `npm run test:seo`, `npm run build`, and `git diff --check`. Expected result: zero lint errors, 11 SEO checks passed, successful Next.js production build, and no whitespace errors.

- [ ] **Step 2: Publish only the correction files**

  Stage `src/lib/content/knowledge.ts`, `src/lib/content/articles.ts`, and this plan; commit with `content: clarify turnkey PCBA testing workflow`; push `main` to `origin`.

- [ ] **Step 3: Verify production**

  Wait for both Vercel commit statuses to report `success`, then confirm the public article returns HTTP 200 and contains the new turnkey title, workflow heading, full process wording, and revised CTA.
