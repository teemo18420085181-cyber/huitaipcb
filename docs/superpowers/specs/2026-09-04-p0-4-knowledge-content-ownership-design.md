# P0-4 Knowledge Content Ownership Consolidation Design

## Goal

Separate BOM preparation, BOM supply risk, alternative-component approval, PCBA cost education, quotation preparation, and RFQ checklist intent while retaining every existing URL and the current Knowledge article design system.

## Selected architecture

Use static content ownership in `src/lib/content/knowledge.ts`. Existing static entries are revised in place. Core pages currently supplied by CMS receive same-slug static articles. All six core slugs are registered in `STATIC_CONTENT_OVERRIDE_SLUGS`, so older CMS rows cannot shadow reviewed repository content and no Supabase write is required. The shared article route, Article/Breadcrumb/FAQ schema behavior, CTA tracking, and real image system remain unchanged.

## Final ownership

| URL | Primary intent | Required destination |
| --- | --- | --- |
| `/knowledge/bom-best-practices` | Prepare a BOM correctly for quotation and production | BOM Risk, Alternative Approval, BOM Sourcing, RFQ |
| `/knowledge/bom-risk-alternative-component-sourcing` | Understand component availability and repeat-production BOM risk | Alternative Approval, BOM Sourcing, Low Volume, Quote Checklist |
| `/knowledge/bom-alternatives-pcba-sourcing` | Evaluate and approve a substitute component | BOM Risk, BOM Best Practices, BOM Sourcing, RFQ |
| `/knowledge/how-much-does-pcba-assembly-cost` | Understand why PCBA cost changes | Prototype, Low Volume, Turnkey, Quote Checklist |
| `/knowledge/what-determines-pcb-assembly-quote-china` | Prepare the information needed for an accurate supplier quote | Commercial File Checklist, PCB Assembly, Turnkey, BOM Sourcing, RFQ |
| `/knowledge/pcba-quotation-checklist` | Complete a short pre-submission RFQ readiness check | Quote Guide, Commercial File Checklist, RFQ |
| `/pcba-quote-file-checklist` | Upload-ready commercial file checklist | Retain existing page and conversion behavior |

## Exact metadata and H1 decisions

| Slug | SEO title | H1 | Meta description |
| --- | --- | --- | --- |
| `bom-best-practices` | `PCBA BOM Best Practices | Quote & Production Preparation` | `How to Prepare a BOM for PCBA Quotation and Production` | `Prepare a PCBA BOM with exact MPNs, designators, quantities, packages, DNP/DNI notes, approved alternatives and customer-supplied part details.` |
| `bom-risk-alternative-component-sourcing` | `BOM Risk and Component Availability in PCBA Manufacturing` | `BOM Risk and Component Availability in PCBA Manufacturing` | `Learn how MPN accuracy, obsolete parts, shortages, long lead times, MOQs and single-source components affect PCBA sourcing and repeat production.` |
| `bom-alternatives-pcba-sourcing` | `How to Approve Alternative Components for PCBA | Huitai PCB` | `How to Approve Alternative Components for PCBA` | `Review MPN, suffix, package, footprint, pinout, electrical ratings, firmware dependencies and customer approval before using a PCBA substitute component.` |
| `how-much-does-pcba-assembly-cost` | `How Much Does PCBA Assembly Cost? | Cost Factors` | `How Much Does PCBA Assembly Cost?` | `Learn why PCBA assembly cost changes with PCB fabrication, BOM, stencil and setup work, placement count, DIP or manual assembly, testing and quantity.` |
| `what-determines-pcb-assembly-quote-china` | `PCB Assembly Quote in China | Required RFQ Information` | `What Determines a PCB Assembly Quote in China?` | `Learn what a PCBA manufacturer needs for an accurate quote, including Gerber, BOM, CPL, drawings, PCB specifications, quantity, programming, testing and delivery details.` |
| `pcba-quotation-checklist` | `PCBA Quotation Checklist | RFQ Readiness` | `PCBA Quotation Checklist Before Supplier Review` | `Use this concise PCBA quotation checklist to confirm files, BOM ownership, quantity, revisions, programming, testing, delivery and open approval questions before RFQ submission.` |

## Content boundaries

- BOM preparation may mention alternatives only as a field buyers should record; it links out for shortage strategy and technical approval.
- BOM risk may mention that alternatives require approval but does not reproduce the approval workflow.
- Alternative approval contains the compatibility review and the explicit warning that appearance or package similarity is insufficient.
- Cost explains manufacturing cost drivers and quantity effects without pretending to give Huitai fixed prices.
- Quote preparation explains the inputs a supplier needs and limits cost discussion to scope completeness.
- The quotation checklist is intentionally shorter and more scannable than the quote guide.

## UX and schema

Keep the existing technical-editorial article layout and real manufacturing imagery. Use Markdown tables, checklists, callouts, natural contextual anchors, visible FAQs, and the restrained shared CTA. Mobile tables use fixed layout and anywhere wrapping so all columns and long MPN strings remain visible. The floating WhatsApp control uses a smaller edge-aligned mobile footprint so it does not cover the article column. Browser QA covers desktop and 390px mobile. Article, BreadcrumbList, Organization references, canonical URLs, and visible-FAQ-derived FAQPage behavior remain in the shared renderer.

## Safety

No URL, redirect, form, API, Supabase, email, analytics, attribution, idempotency, or production deployment change is authorized. `src/app/_metadata.ts`, `video/`, user-owned files, and Phase 1 edits remain untouched by P0-4.
