# P0-4 Knowledge Content Ownership Matrix

Final ownership after the 2026-09-04 P0-4 consolidation. Existing URLs remain unchanged. The six core knowledge slugs use reviewed static repository content; no Supabase rows were written.

| URL | Primary Intent | Primary Keyword Theme | Secondary Theme | Commercial Destination | Overlapping Pages | Resolution |
| --- | --- | --- | --- | --- | --- | --- |
| `/knowledge/bom-best-practices` | Prepare a BOM correctly for quotation and production | PCBA BOM preparation / BOM best practices | MPN suffixes, DNP/DNI, customer-supplied parts, released revision | `/bom-sourcing-pcb-assembly`, `/pcba-quote-file-checklist`, RFQ | BOM Risk; Alternative Component Approval | Owns required BOM fields and release readiness; links out for shortage strategy and technical substitute approval. |
| `/knowledge/bom-risk-alternative-component-sourcing` | Understand how availability creates production and continuity risk | PCBA BOM risk / component availability | Lifecycle, shortages, lead time, MOQ, single-source parts, repeat builds | `/bom-sourcing-pcb-assembly`, `/low-volume-pcba-assembly`, `/pcba-quote-file-checklist` | BOM Best Practices; Alternative Component Approval; `pcba-component-shortage-2026` | Owns supply continuity and BOM freeze; alternative discussion stops at approval boundaries and the 2026 page remains time-specific. |
| `/knowledge/bom-alternatives-pcba-sourcing` | Evaluate and approve a substitute component | Alternative component approval for PCBA | Package, footprint, pinout, ratings, firmware, project authorization | `/bom-sourcing-pcb-assembly`, RFQ | BOM Risk; BOM Best Practices | Owns the compatibility matrix and approval workflow; explicitly rejects appearance/package-only substitution. |
| `/knowledge/how-much-does-pcba-assembly-cost` | Understand why PCBA cost changes | PCBA assembly cost / PCBA cost factors | Prototype setup, quantity effect, testing and fixture scope | `/prototype-pcb-assembly`, `/low-volume-pcba-assembly`, `/turnkey-pcb-assembly`, `/pcba-quote-file-checklist` | Quote Guide | Owns cost education and setup-versus-unit economics; does not become an RFQ-input tutorial or publish invented Huitai prices. |
| `/knowledge/what-determines-pcb-assembly-quote-china` | Prepare the information a supplier needs for an accurate quotation | PCB assembly quote in China / PCBA RFQ requirements | Revision control, ownership, testing, delivery and lead-time scope | `/pcba-quote-file-checklist`, `/pcb-assembly-services`, `/turnkey-pcb-assembly`, `/bom-sourcing-pcb-assembly`, RFQ | Cost; Quotation Checklist; Files Required | Owns accurate-quotation inputs and scope completeness; cost-driver explanation is deliberately limited. |
| `/knowledge/pcba-quotation-checklist` | Run a short pre-submission RFQ readiness check | PCBA quotation checklist | File, responsibility, revision and open-question checks | `/pcba-quote-file-checklist`, RFQ | Quote Guide; Commercial File Checklist | Reduced to an action-oriented checklist that points to the long guide and commercial upload checklist. |
| `/knowledge/what-files-required-pcba-quote` | Explain the function of files needed for a turnkey quote | PCBA quote files / turnkey file requirements | Incomplete-file consequences | `/pcba-quote-file-checklist`, RFQ | Quote Guide; `pcb-assembly-file-preparation-guide` | Retained as a supporting file-definition guide; deeper consolidation with the file-preparation guide remains a next-phase candidate. |
| `/knowledge/how-we-review-pcba-project-before-quotation` | Explain Huitai's operational quotation review workflow | PCBA project review before quotation | Engineering handoff and review sequence | RFQ | Quote Guide | Retained as first-hand process content; it does not own the generic RFQ input taxonomy. |
| `/pcba-quote-file-checklist` | Convert a prepared buyer into an upload-ready RFQ | PCBA quote file checklist | Commercial scope confirmation | RFQ form | Knowledge Quotation Checklist; Files Required | Retained unchanged as the commercial destination and conversion page, not a second long-form tutorial. |

## Boundary checks

- BOM Risk is not Alternative Component Approval.
- Cost education is not Quote Preparation.
- Quote Guide is not the pre-submission checklist.
- The knowledge checklist is not the commercial upload checklist.
- Supporting operational and file-definition articles remain indexed at their existing URLs but no longer own the six core intents.
