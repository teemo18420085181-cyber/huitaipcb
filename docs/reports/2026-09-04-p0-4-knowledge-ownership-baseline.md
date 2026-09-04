# P0-4 Knowledge Content Ownership Baseline

Captured from the local production build before P0-4 content changes on 2026-09-04. No Supabase records or production URLs were changed to create this baseline.

## Shared rendering baseline

- Knowledge articles render through `src/app/(en)/knowledge/[slug]/page.tsx`.
- Metadata comes from `KnowledgeDisplayArticle`; every inspected article had a self-referencing canonical.
- Visible FAQ markdown produced `FAQPage` only when questions and answers were present.
- The shared article schema was `Article`, with `publisher` and `reviewedBy` referencing the existing Huitai PCB Organization entity.
- The shared sidebar routes to `/contact#project-files` with the existing `upload_gerber_bom_click` event.

## BOM pages

| URL | Baseline title / H1 | Baseline focus | Main overlap |
| --- | --- | --- | --- |
| `/knowledge/bom-best-practices` | `BOM Best Practices for PCBA Sourcing and Quoting` | BOM fields, generic descriptions, alternatives, quote speed | Includes shortage and alternative-review language that belongs on two separate pages |
| `/knowledge/bom-risk-alternative-component-sourcing` | `BOM Risk and Alternative Component Sourcing for PCBA` | Availability, cost, lead time, obsolete parts, alternatives | Treats supply risk and substitute approval as one primary intent |
| `/knowledge/bom-alternatives-pcba-sourcing` | `BOM Alternatives in PCBA Sourcing: What Buyers Should Know` | Reasons for alternatives, approval, missing MPNs, sourcing risk | Repeats shortage/risk content instead of owning technical approval criteria |

All three returned HTTP 200, one H1, a self-canonical, `Article`, `BreadcrumbList`, and visible-FAQ-backed `FAQPage` schema.

## Cost and quote pages

| URL | Baseline title / H1 | Baseline focus | Main overlap |
| --- | --- | --- | --- |
| `/knowledge/how-much-does-pcba-assembly-cost` | `How Much Does PCBA Assembly Cost?` | PCB, BOM, assembly, testing cost drivers | Links to quote content but does not clearly separate cost education from RFQ preparation |
| `/knowledge/what-determines-pcb-assembly-quote-china` | `What Determines a PCB Assembly Quote in China?` | Cost factors, quotation checklist, delays | Mixes cost explanation and quote-input preparation |
| `/knowledge/pcba-quotation-checklist` | `PCBA Quotation Checklist: What to Prepare Before Contacting a Supplier` | Core checklist, BOM, PCB, testing | Repeats the long-form quote guide and the commercial file checklist |
| `/knowledge/what-files-required-pcba-quote` | `What Files Are Needed for a Turnkey PCBA Quote?` | Turnkey file definitions and incomplete-file guidance | Secondary overlap with the quote guide and file-preparation guide |
| `/knowledge/how-we-review-pcba-project-before-quotation` | `How We Review Your PCBA Project Before Quotation` | Huitai review workflow | Operational first-hand signal; distinct enough to retain as a supporting process article |
| `/pcba-quote-file-checklist` | `PCBA Quote File Checklist` | Upload-ready commercial file checklist | Must remain the action-oriented commercial destination rather than a second long tutorial |

All inspected routes returned HTTP 200. Knowledge pages had `Article` and `BreadcrumbList`; FAQPage appeared only where a visible FAQ existed. `/pcba-quote-file-checklist` had `WebPage`, `FAQPage`, and `BreadcrumbList`.

## Baseline resolution direction

- BOM Best Practices owns BOM preparation.
- BOM Risk owns component availability and continuity risk.
- BOM Alternatives owns technical substitute approval.
- Cost owns why PCBA cost changes.
- Quote Guide owns the information a manufacturer needs to prepare an accurate quotation.
- Knowledge Quotation Checklist becomes a short pre-submission readiness check.
- Commercial Quote File Checklist remains the conversion destination.
- Existing URLs remain unchanged; no redirects or deletions are planned.
