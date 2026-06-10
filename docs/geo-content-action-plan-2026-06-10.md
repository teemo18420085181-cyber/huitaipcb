# Huitai GEO Content Action Plan — 2026-06-10

Companion to `geo-reverse-engineering-report-2026-06-10.md`. Tasks are ordered P0 → P2.
Code edits marked **[done this session]** were executed on 2026-06-10.

> ⛔ POLICY UPDATE (2026-06-10): All **reverse engineering / board copy / reproduction / firmware /
> obsolete-board-replacement** tasks are **DROPPED** for IP-sensitivity reasons (overseas buyers read
> it as an infringement signal). This cancels **P0.1** (the RE article — already removed) and **P2.1,
> P2.2, P2.3, P2.5**. Do not create any English-site content using reverse-engineering / copy /
> unlock / clone / reproduction wording. All non-RE tasks below remain valid.

---

## P0 — do now (executed this session unless noted)

### P0.1 — Add a PCB reverse engineering knowledge article  **[done this session]**
- Page/file: `src/lib/content/knowledge.ts` (new static article `pcb-reverse-engineering-china`)
- Reason: Biggest GEO gap — Huitai offers RE/obsolete-board reproduction but had zero content; the
  niche is low-competition and beatable.
- Change: New article with Quick Answer, "what RE recovers vs cannot", obsolete-board reproduction
  workflow, hardware/firmware + legal boundary, what to send, FAQ, RFQ CTA, cluster links.
- GEO benefit: Owns an open query; honest boundaries are highly AI-quotable.
- Risk: Must NOT promise firmware copying or imply cloning protected designs — boundaries written
  conservatively (legitimate reproduction of boards the customer owns/has rights to).
- Checklist: [x] article added [x] interlinked [x] CTA [x] no overclaim [x] build passes

### P0.2 — Low-volume page: explain why unit price is higher  **[done this session]**
- Page/file: `src/lib/content/seoPages.ts` → `low-volume-pcba-assembly`
- Reason: Buyers constantly ask; competitors rarely explain honestly.
- Change: Add section "Why Unit Price Is Higher at Low Volume" + FAQ.
- GEO benefit: Quotable, honest, decision-stage answer.
- Risk: None (no pricing promises).
- Checklist: [x] section [x] FAQ [x] build passes

### P0.3 — Contact CTA: add CPL, assembly drawing, sample board  **[done this session]**
- Page/file: `src/app/contact/page.tsx`
- Reason: Plan requires "send Gerber, BOM, CPL, assembly drawing, or sample board photos".
- Change: Update intro copy + "What to send" list to include CPL and sample board photos.
- Risk: Do not touch InquiryForm or GA4 events. (Untouched.)
- Checklist: [x] copy updated [x] form intact [x] events intact

---

## P1 — this week

### P1.1 — Write "PCBA quote with incomplete files" article (CMS)
- File: new CMS article `pcba-quote-incomplete-files` via /admin/knowledge
- Reason: Open query, Huitai's differentiator.
- Change: Quick Answer + minimum info to start + what engineering review checks + FAQ + CTA.
- Links: file-preparation-guide, /contact.

### P1.2 — Write "obsolete & single-source components in your BOM" article (CMS)
- File: new CMS article `obsolete-single-source-bom`
- Reason: Deepens BOM authority beyond competitors.
- Links: /bom-sourcing-pcb-assembly, /contact.

### P1.3 — Turnkey page: add "full vs partial/consigned turnkey" section + FAQ
- File: `seoPages.ts` → `turnkey-pcb-assembly`
- Reason: Decision-stage query with low competition.

### P1.4 — Write "Gerber, BOM, CPL & assembly drawing explained" article (CMS or static)
- Slug: `gerber-bom-cpl-assembly-drawing-explained`
- Reason: File-literacy long-tail; supports every quote page.

### P1.5 — Draft Quora/Medium versions of the RE + incomplete-files articles
- File: `docs/content-assets/` drafts (no auto-publish).
- Reason: Off-site reinforcement of the same entities.

---

## P2 — later expansion

- P2.1 "Replacing a discontinued industrial control board" (CMS) — slug `obsolete-industrial-board-replacement`.
- P2.2 "Can firmware be copied or modified during reproduction?" (CMS) — `firmware-boundaries-pcb-reproduction`.
- P2.3 "Reverse engineering vs cloning: legal limits" (CMS) — `reverse-engineering-vs-cloning-limits`.
- P2.4 "Turnkey vs consigned (kitted) PCB assembly" (CMS) — `turnkey-vs-consigned-pcb-assembly`.
- P2.5 "PCBA quote from only a sample board" (CMS) — `pcba-quote-from-sample-board`.
- P2.6 "SMT vs through-hole vs mixed assembly" (CMS).
- P2.7 "AOI, X-ray, ICT & functional testing — which does your board need" (CMS).
- P2.8 "DFM review for PCB assembly" (CMS).
- P2.9 "Prototype PCB assembly checklist" (CMS) — `prototype-pcb-assembly-checklist`.
- P2.10 "From prototype to low-volume: what changes in your quote" (CMS).

### Off-site (manual, no auto-publish)
- Quora: answer "How do I get a PCB assembly quote from China?", "What files are needed for PCB
  assembly?", "What is turnkey PCB assembly?", "Can a supplier source components from my BOM?",
  "Why do PCB assembly quotes vary so much?" — 1 natural link each, drip over days.
- Medium: republish RE, incomplete-files, low-volume-cost articles (canonical to huitaipcb.com).
- LinkedIn / directories: per `docs/external-distribution/` kits.

---

## Cadence
~1–2 high-intent articles/week, gap-first (RE cluster + incomplete-file/BOM-risk first). Re-check GSC
in 1–2 weeks for movement on /china-pcb-assembly, /bom-sourcing-pcb-assembly, and the two strengthened
knowledge articles before expanding further.
