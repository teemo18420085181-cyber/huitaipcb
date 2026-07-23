# PCBA Testing Article Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the existing pre-shipment PCBA testing article into a practical buyer guide covering AOI, functional-test inputs, acceptance criteria, and quotation-stage scope confirmation.

**Architecture:** Keep the existing slug and static-content route. Replace the `pcba-testing-before-shipment` content object in `src/lib/content/knowledge.ts`, add its shorter browser/search title to the existing `ARTICLE_SEO_TITLES` map in `src/lib/content/articles.ts`, and remove the now-fulfilled functional-test-specification topic from the knowledge index `COMING_SOON` list. Reuse the current cover image, category, Markdown rendering, FAQ extraction, schema generation, and article CTA.

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
