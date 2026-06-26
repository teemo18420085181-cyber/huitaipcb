# Huitai SEO/GEO Keyword Opportunity Audit - 2026-06-16

## Data Discipline

This report replaces the earlier local-inference draft. During this run, Chrome was logged in and real data was read from:

- Google Search Console: `sc-domain:huitaipcb.com`
- GA4 property: `huitaipcb.com`
- Google Trends public interface/API
- Google autocomplete public endpoint
- Public competitor pages and visible SERP evidence

No GSC/GA4 settings were changed. No search volume or keyword difficulty number is invented.

Important caveat: before this run, the local codebase did not contain GSC/GA4 exports. This run created new local evidence files:

- `docs/gsc-performance-export-2026-06-16.csv`
- `docs/gsc-page-query-map-2026-06-16.md`
- `docs/ga4-conversion-audit-2026-06-16.md`
- `docs/public-market-keyword-trends-2026-06-16.md`
- `docs/public-market-keyword-trends-2026-06-16.csv`

## Part A - Public Market Trend Summary

Measured Google Trends signals:

- `pcb assembly`: growing worldwide over the past 12 months and past 5 years.
- `prototype pcb assembly`: growing worldwide over the past 12 months.
- `pcb assembly china`: growing worldwide over the past 12 months and past 5 years.
- `electronics manufacturing china`: growing worldwide over the past 12 months and past 5 years.
- Long-tail quote/BOM/low-volume terms often returned insufficient Trends data. These are still commercially useful when autocomplete, GSC, or buyer intent supports them.

Google autocomplete confirms buyer questions around quote, cost, online quote, file requirements, China supplier selection, and JLCPCB/PCBWay alternatives.

Country-level Trends API requests for US, UK, Germany, Canada, and Australia returned Google 429 rate limiting in the first session. A follow-up Google Trends UI read on 2026-06-17 is saved in `docs/regional-google-trends-primary-markets-2026-06-17.md`. It found stronger `pcb assembly` signal in the United States and United Kingdom, while Germany, Canada, and Australia remained sparse in Google Trends for the checked long-tail terms.

## Part B - Huitai Internal Data Summary

GSC Web Search, visible export range 2026-05-17 to 2026-06-14:

- Clicks: 14
- Impressions: 380
- CTR: 3.7%
- Average position: 40.4

Most important query signals:

- `bom sourcing pcb assembly`: 1 click, 27 impressions, position 50.96.
- `product assembly services china`: 16 impressions, position 74.19.
- `turnkey pcba service china`: 6 impressions, position 67.67.
- Quote-related impressions: `china pcb quote`, `china pcb assembly quote`, `china pcb assembly online quote`, `pcb assembly quotes`, `pcb quote china`, `smt assembly quote`.
- Use-case impressions: `keyboard pcb assembly service china`, `pet locator pcb assembly china`, `iot pcb assembly`, `pcb final inspection before packaging`.

Most important page signals:

- `/china-pcb-assembly`: 97 impressions, 0 clicks, position 58.72.
- `/knowledge/pcb-assembly-file-preparation-guide`: 42 impressions, 0 clicks, position 14.76.
- `/knowledge`: 41 impressions, 0 clicks, position 4.29.
- `/pcb-assembly-company`: 39 impressions, 0 clicks, position 13.85.
- `/capabilities`: 37 impressions, 0 clicks, position 7.27.
- `/bom-sourcing-pcb-assembly`: 35 impressions, 1 click, position 62.49.
- `/turnkey-pcb-assembly`: 31 impressions, 0 clicks, position 16.35.
- `/contact`: 27 impressions, 0 clicks, position 13.78.
- `/prototype-pcb-assembly`: 18 impressions, 0 clicks, position 6.67.
- `/low-volume-pcba-assembly`: 4 impressions, 0 clicks, position 6.5.

GA4 2026-05-17 to 2026-06-15:

- Total views: 356
- Active users: 91
- Key events: 7
- Organic search: 20 sessions, 7 active users, 5 key events.

Interpretation: traffic is small, but organic traffic converts. The problem is not only conversion; it is ranking visibility and CTR.

## Top 20 Public Market Opportunities

| Priority | Keyword | Cluster | Intent | Existing Page | Action |
| --- | --- | --- | --- | --- | --- |
| P0 | pcb assembly china | China Supplier | commercial | `/china-pcb-assembly` | update_existing_page |
| P0 | prototype pcb assembly | Prototype Low-volume | commercial | `/prototype-pcb-assembly` | update_existing_page |
| P0 | pcb assembly quote | Quote Files | transactional | `/contact` | update_existing_page |
| P0 | bom sourcing pcb assembly | BOM Sourcing | transactional | `/bom-sourcing-pcb-assembly` | update_existing_page |
| P0 | turnkey pcb assembly china | Turnkey PCBA | commercial | `/turnkey-pcb-assembly` | update_existing_page |
| P0 | pcb manufacturing and assembly china | Turnkey PCBA | commercial | `/pcb-fabrication-and-assembly` | update_existing_page |
| P0 | gerber bom pcb assembly quote | Quote Files | transactional | `/contact` | update_existing_page |
| P1 | what files are needed for pcb assembly | Quote Files | informational | `/knowledge/pcb-assembly-file-preparation-guide` | update_existing_page |
| P1 | low volume pcb assembly | Prototype Low-volume | commercial | `/low-volume-pcba-assembly` | update_existing_page |
| P1 | jlcpcb alternative | China Supplier | comparison | `/knowledge/jlcpcb-alternatives-turnkey-pcba` | update_existing_page |
| P1 | pcbway alternative | China Supplier | comparison | none | create_article |
| P1 | pcb assembly cost | Quote Files | informational | `/knowledge/how-much-does-pcba-assembly-cost` | update_existing_page |
| P1 | pcb assembly online quote | Quote Files | transactional | `/contact` | update_existing_page |
| P1 | component sourcing pcb assembly | BOM Sourcing | commercial | `/bom-sourcing-pcb-assembly` | update_existing_page |
| P1 | prototype pcb assembly services | Prototype Low-volume | commercial | `/prototype-pcb-assembly` | update_existing_page |
| P1 | rapid prototyping pcb assembly | Prototype Low-volume | commercial | `/prototype-pcb-assembly` | update_existing_page |
| P2 | electronics manufacturing china | China Supplier | commercial | none | create_article |
| P2 | pcb assembly service china | China Supplier | commercial | `/china-pcb-assembly` | update_existing_page |
| P2 | pcb assembly requirements | Quote Files | informational | `/knowledge/what-files-required-pcba-quote` | update_existing_page |
| P2 | circuit board assembly near me | Quote Files | local | none | no_action |

## Top 20 Huitai SEO Opportunities

| Priority | Keyword | Cluster | Intent | Existing Page | Action |
| --- | --- | --- | --- | --- | --- |
| P0 | bom sourcing pcb assembly | BOM Sourcing | transactional | `/bom-sourcing-pcb-assembly` | update_existing_page |
| P0 | china pcb assembly online quote | Quote Files | transactional | `/contact` and `/china-pcb-assembly` | update_existing_page |
| P0 | china pcb assembly quote | Quote Files | transactional | `/contact` | update_existing_page |
| P0 | turnkey pcba service china | Turnkey PCBA | commercial | `/turnkey-pcb-assembly` | update_existing_page |
| P0 | pcb assembly service china | China Supplier | commercial | `/china-pcb-assembly` | update_existing_page |
| P0 | china pcb quote | Quote Files | transactional | `/contact` | update_existing_page |
| P0 | gerber and bom | Quote Files | transactional | `/contact` and file-prep articles | update_existing_page |
| P0 | prototype pcb assembly | Prototype Low-volume | commercial | `/prototype-pcb-assembly` | update_existing_page |
| P0 | low volume pcba assembly | Prototype Low-volume | commercial | `/low-volume-pcba-assembly` | update_existing_page |
| P1 | pcb assembly file requirements | Quote Files | informational | `/knowledge/pcb-assembly-file-preparation-guide` | update_existing_page |
| P1 | what files are needed for pcb assembly | Quote Files | informational | `/knowledge/what-files-required-pcba-quote` | update_existing_page |
| P1 | pcb assembly quotes | Quote Files | transactional | `/contact` | update_existing_page |
| P1 | how much does pcb assembly cost | Quote Files | informational | `/knowledge/how-much-does-pcba-assembly-cost` | update_existing_page |
| P1 | pcb test service china | Industry Scenario | commercial | `/pcba-testing-quality-control` | update_existing_page |
| P1 | keyboard pcb assembly service china | Industry Scenario | commercial | none | create_article |
| P1 | iot pcb assembly | Industry Scenario | commercial | `/knowledge/iot-device-pcb-assembly-china` | update_existing_page |
| P1 | one-stop pcba service china | Turnkey PCBA | commercial | `/turnkey-pcb-assembly` | update_existing_page |
| P1 | turnkey pcba supplier china | Turnkey PCBA | commercial | `/turnkey-pcb-assembly` | update_existing_page |
| P2 | jlcpcb alternative | China Supplier | comparison | `/knowledge/jlcpcb-alternatives-turnkey-pcba` | update_existing_page |
| P2 | pcb final inspection before packaging | Quote Files | informational | none | create_article |

## Page Optimization Implications

The first code changes should still focus on:

1. `/contact`
2. `/turnkey-pcb-assembly`
3. `/bom-sourcing-pcb-assembly`
4. `/low-volume-pcba-assembly`
5. `/prototype-pcb-assembly`

However, the real GSC data also shows `/china-pcb-assembly` deserves a near-term follow-up because it has the highest impressions and zero clicks.

## Recommended Next Step

Do not add broad new pages first. Update metadata, H1/subtitle, CTA wording, FAQ, internal anchors, related links, and RFQ event names on the five approved pages, then separately plan a CTR-focused update for `/china-pcb-assembly`.
