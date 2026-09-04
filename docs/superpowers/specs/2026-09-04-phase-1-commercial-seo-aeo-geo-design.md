# Phase 1 Commercial SEO, AEO, GEO Refactor Design

Date: 2026-09-04

## Objective

Refactor the homepage and three commercial service pages so each owns a distinct search intent, gives buyers and generative search systems an early direct answer, and presents a clearer path to the existing PCBA RFQ flow. The work must preserve the current brand system, real manufacturing imagery, server-rendered delivery, inquiry behavior, analytics attribution, and production integrations.

## In Scope

- `/`
- `/pcb-assembly-services`
- `/prototype-pcb-assembly`
- `/low-volume-pcba-assembly`
- Shared rendering and content types used by those pages where backward-compatible extension is required
- SEO regression expectations directly affected by the approved copy and metadata
- Browser-based desktop, tablet, and mobile QA for the four modified pages

## Out of Scope

- Inquiry form fields, validation, uploads, Supabase writes, email delivery, GA4, Measurement Protocol, attribution, idempotency, status fields, or API contracts
- Other commercial-page ownership changes beyond contextual links required by this phase
- Knowledge-page consolidation, redirects, page deletion, new mass SEO pages, or generic blog publishing
- Rebranding, new design systems, AI-generated factory imagery, production deployment, commit, push, or PR creation
- `video/` and unrelated untracked files

## Chosen Architecture

Use the existing shared service-page renderer and extend it with optional structured content blocks. Existing pages that do not provide those blocks keep their current rendering. The three target service pages opt into richer editorial sections such as checklists, comparison tables, outcome lists, and contextual links.

This approach keeps one implementation of Service, BreadcrumbList, and FAQPage schema; one CTA tracking path; and one responsive visual system. It avoids three duplicated page implementations and avoids a site-wide service-template redesign.

## Homepage Design

The homepage remains a manufacturing hub rather than a second Turnkey PCB Assembly page.

### Metadata and hero

- Title: `Custom PCBA Manufacturer | Prototype to Production | Huitai PCB`
- Meta description: `Huitai PCB provides custom PCBA manufacturing for hardware teams, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and repeat production.`
- H1: `Custom PCBA Manufacturing for Prototype and Production`
- Eyebrow: `CUSTOM PCBA MANUFACTURING · SHENZHEN, CHINA`
- Primary CTA: existing `/contact#quote-form` route with `Get PCBA Manufacturing Quote`
- Secondary CTA: existing `/contact#project-files` route with `Send Gerber & BOM`
- Preserve current tracking event names and parameters.

### Content order

1. Hero with real inspection-line image
2. Early answer-first section: `What Does Huitai PCB Provide?`
3. `Custom PCBA Manufacturing Capabilities` hub with descriptive links to fabrication, sourcing, assembly, and testing pages
4. `Choose the Right PCBA Manufacturing Path` with Prototype, Low-Volume, and Turnkey paths
5. `How a Custom PCBA Project Moves From Files to Production`
6. `Inside Our PCBA Manufacturing Process` using the existing real SMT, DIP, AOI, X-ray, finished-board, microscope, and packing photography
7. Quote-files table: `What Files Do You Need for a PCBA Quote?`
8. Existing applications content, retained where it supports buyer qualification
9. Six buyer-oriented FAQs
10. `Start Your Custom PCBA Project` CTA

The visual treatment continues the existing carbon, paper, copper, Bricolage, Hanken, and JetBrains Mono system. Cards are used only for paths or grouped capabilities; answer text, tables, imagery, and FAQs use more editorial layouts to avoid a repeated-card appearance.

## PCB Assembly Services Design

- Title: `PCB Assembly Services China | SMT & DIP | Huitai PCB`
- Meta description: `Huitai PCB provides SMT and through-hole PCB assembly services in Shenzhen for prototype, low-volume and repeat-production projects. Send Gerber, BOM and CPL for review.`
- H1: `PCB Assembly Services for SMT and Through-Hole Production`
- Service schema name: `PCB Assembly Services`
- Service type: `PCB Assembly`

The early answer defines PCB assembly as placing and soldering components onto a printed circuit board. The page then concentrates on SMT, through-hole/DIP, mixed assembly, manual/post-assembly work, inspection, required files, customer-supplied versus sourced components, production stages, workflow, and PCB Assembly versus Turnkey PCB Assembly.

Fabrication, full BOM purchasing, delivery, and project management remain concise cross-links rather than the page's main body. The content ratio will remain assembly-led, with supporting inspection/testing and component-handling sections.

## Prototype PCB Assembly Design

- Title: `Prototype PCB Assembly China | 5-Piece Builds | Huitai PCB`
- Meta description: `Prototype PCB assembly in China from 5 boards. Huitai reviews Gerber, BOM, CPL, revisions, component risks and test requirements before the first build.`
- H1: `Prototype PCB Assembly in China from 5 Boards`
- Service schema name: `Prototype PCB Assembly`
- Service type: `Prototype PCB Assembly`

The page is organized around first build, bring-up, design verification, controlled revisions, BOM validation, firmware feedback, and testing feedback. It explicitly presents three outcomes after prototype testing: approval, minor revision and rebuild, or major PCB/BOM/firmware change and revalidation.

Low-volume language is limited to the transition boundary and contextual links. The primary CTA remains the existing project-file upload route with `Upload Prototype Files for Review`.

## Low-Volume PCBA Design

- Title: `Low-Volume PCB Assembly China | Small-Batch PCBA | Huitai PCB`
- Meta description: `Low-volume PCB assembly in China for validated designs and small-batch production. Huitai supports 50–1,000 piece PCBA runs, BOM continuity, SMT/DIP assembly, inspection and testing.`
- H1: `Low-Volume PCB Assembly for Small-Batch Production`
- Service schema name: `Low-Volume PCB Assembly`
- Service type: `Low-Volume PCBA Manufacturing`

The page begins with validated designs and typical 50, 100, 500, or 1,000 piece projects. It contains a production-readiness checklist, quantity guidance, BOM continuity and approved-alternative controls, repeatable SMT/DIP assembly, first-article and batch inspection, functional testing, file and firmware revision control, prototype transition guidance, unit-cost explanation, and workflow.

Five- and ten-piece builds are removed from the page's primary positioning. The prototype route is shown as the correct path when design inputs are still changing.

## Structured Content Model

The shared service-page data model will gain optional, backward-compatible fields for richer page composition. The renderer will support only the variants required here:

- Narrative section with optional contextual links
- Checklist with an optional qualifying note
- Two-column comparison table that reflows into labelled mobile rows
- Outcome or staged-result list
- Workflow list

The existing `sections`, `workflow`, `filesNeeded`, `answerLinks`, FAQ, and CTA fields remain supported for every existing page. German pages will continue to use their current data unless their own content explicitly opts into the new blocks.

## Internal Linking

Links will use descriptive, natural anchor text and point directly to:

- `/pcb-fabrication-and-assembly`
- `/bom-sourcing-pcb-assembly`
- `/pcb-assembly-services`
- `/pcba-testing-quality-control`
- `/prototype-pcb-assembly`
- `/low-volume-pcba-assembly`
- `/turnkey-pcb-assembly`
- `/knowledge/prototype-vs-batch-pcb-assembly`
- `/pcba-quote-file-checklist` where quote preparation context is useful

The implementation will not add repeated exact-match links solely for keyword density.

## Structured Data

- Keep the homepage Organization and WebSite graph as the single canonical entity definition.
- Continue referencing `SITE.organizationId` from all Service schemas.
- Keep BreadcrumbList and FAQPage output tied to visible page content.
- Update the three target service names and service types to the approved values.
- Keep self-referencing canonicals and existing language alternates.
- Validate every emitted JSON-LD script through parsing during automated checks.

## Visual and Responsive Design

- Preserve real factory and board photography; no new generated imagery.
- Keep H1 sizes within the existing responsive scale so the service and CTA remain understandable within the first mobile screen.
- Use readable long-form measures and consistent 16/20/24-style spacing increments from the current utility system.
- Replace long runs of identical cards with a mix of answer panels, editorial text, checklists, mobile-safe tables, process lists, imagery, FAQs, and CTAs.
- Maintain one clearly dominant CTA per viewport.
- Tables render as standard rows on wider screens and labelled stacked rows on narrow screens, without horizontal overflow.
- Keep touch targets at least the current 48px CTA height and preserve visible keyboard focus.
- Preserve reduced-motion behavior and avoid new client-side animation or heavy libraries.

## Inquiry and Analytics Safety

No inquiry, upload, API, email, Supabase, or analytics implementation file will be edited. Existing `TrackedLink` routes, event names, destinations, and page-slug parameters are retained when CTA labels or placement changes.

Before delivery, the changed-file list will be compared against the protected implementation paths. The final report will explicitly list whether any protected file changed; the expected result is none.

## Validation

Run the commands available in `package.json` and required by the repository instructions:

1. `npm run lint`
2. `npm run typecheck`
3. `npm test`
4. `npm run test:seo`
5. `npm run build`
6. `git diff --check`

SEO checks will cover the four final metadata/H1 values, primary CTA destinations, required internal links, canonical behavior, schema provider reuse, and the prototype versus low-volume intent boundary.

After automated validation, run the built or development app locally and capture current-run browser screenshots for all four pages at desktop and mobile widths, with tablet sampling where practical. Inspect hierarchy, CTA prominence, image crops, tables, card rhythm, heading order, navigation/footer integrity, FAQ readability, focus behavior, and horizontal overflow. Fix material regressions before the final report.

## Delivery

The final report will list modified files, page-by-page changes, exact final metadata and H1 values, internal links, schema updates, visual/mobile/accessibility improvements, retained imagery, command results, build status, inquiry/analytics non-regression evidence, deferred SEO conflicts, and intentionally unchanged design issues.

No commit, push, PR, or deployment will be performed without explicit authorization.
