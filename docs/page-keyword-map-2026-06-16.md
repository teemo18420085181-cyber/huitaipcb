# Page Keyword Map - 2026-06-16

## Rule

Do not delete overlapping SEO pages. Separate intent through title, H1, subtitle, FAQ, internal anchors, related guides, and schema.

## Intent Overlap Check

- `/turnkey-pcb-assembly` and `/pcb-fabrication-and-assembly` overlap around combined PCB + assembly. Separate them by making `/turnkey-pcb-assembly` about full coordination from Gerber/BOM through BOM sourcing, SMT/DIP, inspection/testing support, and finished PCBA delivery. Make `/pcb-fabrication-and-assembly` about the paired manufacturing process.
- `/prototype-pcb-assembly` and `/low-volume-pcba-assembly` overlap around small quantity builds. Separate them by making prototype about first-build review and incomplete files, while low-volume covers 5-500 pcs repeatable small-batch production.
- `/contact` overlaps all quote-intent pages. Separate it as the RFQ/upload conversion page, not a service explanation page.
- `/china-pcb-assembly` overlaps with `/pcb-assembly-company`. Separate `/china-pcb-assembly` as country/service intent and `/pcb-assembly-company` as supplier evaluation/company choice intent.

## Mapping

| Page | Current Purpose | Target Keyword | Secondary Keywords | Content Gap | Action |
| --- | --- | --- | --- | --- | --- |
| `/` | Brand and service overview | China-based turnkey PCBA manufacturer | PCB fabrication and assembly China; BOM sourcing PCB assembly; prototype PCBA China | Homepage gets clicks but visible GSC queries include brand confusion. Needs clearer Huitai naming and service routing later. | no_action_now |
| `/turnkey-pcb-assembly` | Full turnkey PCBA service page | turnkey PCB assembly manufacturer in China | turnkey PCBA service China; turnkey PCBA supplier China; one-stop PCBA service China; Gerber BOM SMT testing | GSC shows impressions for turnkey China phrases but weak positions. Needs stronger title description H1 FAQ and CTA. | update_existing_page |
| `/bom-sourcing-pcb-assembly` | BOM sourcing and component risk page | BOM sourcing PCB assembly | component sourcing PCB assembly; BOM shortage PCB assembly; alternative components PCBA; BOM risk review | Best direct service signal: `bom sourcing pcb assembly` has 1 click and 27 impressions. Needs sharper metadata and RFQ CTA. | update_existing_page |
| `/prototype-pcb-assembly` | Prototype PCBA service page | prototype PCB assembly China | prototype PCBA China; PCB assembly prototype quote; startup hardware PCBA prototype; Gerber BOM review | Page has 18 impressions and position 6.67 but zero clicks. Public Trends shows `prototype pcb assembly` growing. Needs CTR-focused title description FAQ. | update_existing_page |
| `/low-volume-pcba-assembly` | Low-volume/small-batch PCBA page | low-volume PCBA assembly China | low volume PCB assembly; small batch PCBA China; 5 pcs PCB assembly; 10 pcs PCB assembly; 100 pcs PCB assembly | Page has position 6.5 but only 4 impressions. Needs quantity FAQ and stronger internal links from prototype/content pages. | update_existing_page |
| `/pcb-fabrication-and-assembly` | Combined PCB fabrication plus assembly | PCB fabrication and assembly China | PCB manufacturing and assembly China; PCB plus assembly supplier China; Gerber BOM production review | Current visible queries are brand-confusion/SMT related. Keep distinct from turnkey by focusing on paired fabrication + assembly. | update_existing_page_later |
| `/china-pcb-assembly` | China PCB assembly supplier page | China PCB assembly manufacturer | PCB assembly service China; China PCB assembly quote; China PCB assembly online quote; product assembly services China | Highest GSC page impressions: 97 impressions and zero clicks. Should be a near-term CTR project after the five approved pages. | update_existing_page_later |
| `/pcb-assembly-company` | Supplier/company evaluation page | PCB assembly company in China | China PCBA supplier; how to choose PCB assembly manufacturer in China; PCB assembly supplier comparison China | 39 impressions at position 13.85 and zero clicks. Needs buyer-guide framing and internal links. | update_existing_page_later |
| `/contact` | RFQ and upload conversion page | PCBA quote | PCB assembly quote China; upload Gerber BOM for quote; turnkey PCBA quote; Gerber BOM PCB assembly quote | 27 impressions at position 13.78 and zero clicks. GA4 shows contact page drives 4 key events. Needs quote/upload wording and RFQ event tracking. | update_existing_page |
| `/knowledge` | Knowledge hub | PCB assembly knowledge base | PCB assembly quote checklist; BOM sourcing guide; prototype PCBA guide; China PCBA supplier guide | 41 impressions at position 4.29 and zero clicks. Hub likely needs stronger snippets and category routing later. | update_existing_page_later |

## Five-Page Optimization Direction

### `/contact`

- Title direction: `Request a PCBA Quote | Upload Gerber, BOM & Project Files`
- Description direction: upload Gerber, BOM, drawings, sample photos, or notes for engineering review.
- CTA direction: `Upload Gerber & BOM for Engineering Review`
- Tracking: add `rfq_form_start`, `rfq_file_upload`, `rfq_submit_success`, and `quote_cta_click` while keeping existing events.

### `/turnkey-pcb-assembly`

- Title direction: `Turnkey PCB Assembly Manufacturer in China | Gerber, BOM, SMT & Testing`
- H1 direction: full turnkey PCB assembly in China.
- FAQ should cover files needed, incomplete BOM, PCB fabrication plus assembly, prototype/low-volume support, and BOM shortage review.

### `/bom-sourcing-pcb-assembly`

- Title direction: `BOM Sourcing for PCB Assembly in China | Shortage & Alternative Review`
- H1 direction: BOM sourcing and component risk review for PCB assembly.
- FAQ should cover missing part numbers, obsolete/out-of-stock parts, alternatives, confirmation before production, and sending Gerber + BOM together.

### `/low-volume-pcba-assembly`

- Title direction: `Low-Volume PCBA Assembly in China | Prototype to Small Batch Builds`
- H1 direction: low-volume PCBA assembly for 5-500 pcs builds.
- FAQ should cover 5/10/50/100/500 pcs, cost per unit, file requirements, and BOM risk review.

### `/prototype-pcb-assembly`

- Title direction: `Prototype PCBA Assembly in China | Gerber & BOM Review Before Build`
- H1 direction: prototype PCBA assembly with engineering review before build.
- FAQ should cover incomplete files, required files, 5/10 prototype boards, BOM risks, and testing requirements.
