export type KnowledgeArticle = {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  metaDescription: string;
  sections: { heading: string; body: string[] }[];
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: 'what-files-required-pcba-quote',
    category: 'Getting Started',
    categoryColor: 'bg-cc-copper/15 text-cc-ink border-cc-copper/30',
    title: 'What files are required for a PCBA quote?',
    excerpt: 'A practical checklist for Gerber files, BOM lists, assembly drawings, sample photos, and testing requirements.',
    image: '/factory/flow-01.png',
    readTime: '5 min read',
    metaDescription: 'Learn which files are required for an accurate PCBA quote, including Gerber files, BOM lists, drawings, sample photos, and testing requirements.',
    sections: [
      {
        heading: 'Core files for quotation',
        body: [
          'Gerber files, drill files, a BOM list, PCB specifications, and assembly drawings are the most useful starting point for a PCB assembly quote.',
          'If you already have sample boards or product photos, include those as references. They help engineers understand connector orientation, mechanical constraints, and final assembly needs.',
        ],
      },
      {
        heading: 'Helpful optional information',
        body: [
          'Quantity, target lead time, testing requirements, firmware flashing needs, packaging requirements, and preferred component brands can all improve quotation accuracy.',
          'If some files are missing, send what you have. An engineering review can identify what is still needed before final pricing.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-turnkey-pcba',
    category: 'Fundamentals',
    categoryColor: 'bg-cc-copper/10 text-cc-ink border-cc-copper/30',
    title: 'What is turnkey PCBA manufacturing?',
    excerpt: 'How turnkey PCBA manufacturing coordinates PCB fabrication, component sourcing, SMT assembly, testing, and delivery.',
    image: '/factory/real-smt-1.jpg',
    readTime: '6 min read',
    metaDescription: 'Understand turnkey PCBA manufacturing and how it covers PCB fabrication, BOM sourcing, SMT assembly, DIP assembly, testing, and delivery.',
    sections: [
      {
        heading: 'Turnkey PCBA in plain terms',
        body: [
          'Turnkey PCBA manufacturing means one supplier coordinates the full assembly workflow instead of asking the customer to manage separate PCB, component, assembly, and testing vendors.',
          'The supplier reviews files, coordinates PCB fabrication, sources components, manages SMT and DIP assembly, performs inspections, and prepares finished boards for delivery.',
        ],
      },
      {
        heading: 'When turnkey is useful',
        body: [
          'Turnkey assembly is especially useful for overseas B2B customers who need fewer handoffs, faster sourcing feedback, and a clear project owner.',
          'It is also helpful when the BOM contains hard-to-source parts or when testing and final assembly need to be coordinated with production.',
        ],
      },
    ],
  },
  {
    slug: 'bom-best-practices',
    category: 'Sourcing',
    categoryColor: 'bg-cc-copper/10 text-cc-ink border-cc-copper/30',
    title: 'BOM best practices for fast sourcing and quoting',
    excerpt: 'How to prepare a BOM list that helps component sourcing, alternatives review, and faster PCB assembly quotation.',
    image: '/factory/flow-02.png',
    readTime: '6 min read',
    metaDescription: 'Prepare a BOM list for fast PCBA sourcing and quoting with manufacturer part numbers, quantities, designators, alternates, and lifecycle notes.',
    sections: [
      {
        heading: 'BOM columns that matter',
        body: [
          'A clear BOM should include reference designators, quantity, manufacturer part number, manufacturer name, package, value, tolerance, voltage or power rating, and approved alternates if available.',
          'Avoid generic descriptions without part numbers when possible. They slow sourcing checks and increase the risk of substitution errors.',
        ],
      },
      {
        heading: 'Speed up sourcing review',
        body: [
          'Mark no-substitute parts, customer-supplied parts, and parts that can accept equivalents. This helps the sourcing team respond quickly when a component is short or obsolete.',
          'For prototype PCB assembly, include acceptable alternatives early so the quote can move forward without repeated BOM clarification cycles.',
        ],
      },
    ],
  },
  {
    slug: 'prototype-vs-batch-pcb-assembly',
    category: 'Decision Guide',
    categoryColor: 'bg-cc-signal/10 text-cc-signal border-cc-signal/20',
    title: 'Prototype PCB assembly vs batch PCB assembly',
    excerpt: 'Understand how prototype and batch PCBA projects differ in review depth, tooling, sourcing, testing, and delivery planning.',
    image: '/factory/real-aoi-op.jpg',
    readTime: '6 min read',
    metaDescription: 'Compare prototype PCB assembly and batch PCB assembly for engineering validation, low-volume builds, sourcing, testing, and production planning.',
    sections: [
      {
        heading: 'Prototype PCB assembly',
        body: [
          'Prototype PCB assembly focuses on engineering validation, early testing, and fast feedback. Quantities are usually small, and engineers expect design changes after testing.',
          'The quote should make clear which processes are prototype-friendly and which tests or fixtures are needed before scaling.',
        ],
      },
      {
        heading: 'Batch PCB assembly',
        body: [
          'Batch assembly focuses on repeatability, yield, component availability, process documentation, packaging, and delivery planning.',
          'Before moving to batch production, confirm the BOM, test plan, inspection standard, and any approved substitutions.',
        ],
      },
    ],
  },
  {
    slug: 'pcb-assembly-lead-time-china',
    category: 'Planning',
    categoryColor: 'bg-cc-signal/10 text-cc-signal border-cc-signal/20',
    title: 'How long does PCB assembly take? China PCBA lead times explained',
    excerpt: 'A realistic breakdown of China PCBA lead times — from file and BOM review to SMT assembly, testing, and shipping — and how to shorten them.',
    image: '/factory/real-ship-2.jpg',
    readTime: '6 min read',
    metaDescription: 'How long does PCB assembly take in China? A realistic look at PCBA lead times across BOM sourcing, PCB fabrication, SMT assembly, testing, and shipping.',
    sections: [
      {
        heading: 'What actually drives PCBA lead time',
        body: [
          'PCB assembly lead time is rarely one fixed number. It depends on component availability, board complexity, the testing you need, and how complete your files are when the project starts.',
          'The biggest variable is usually component sourcing, not the assembly itself. SMT lines are fast — waiting on a long-lead part is what stretches most schedules.',
        ],
      },
      {
        heading: 'A typical China PCBA timeline',
        body: [
          'For a straightforward turnkey project with in-stock parts, a common pattern is: 1–2 days for file and [BOM review](/bom-sourcing-pcb-assembly) and quotation, 2–4 days for PCB fabrication, a few days for component procurement (often in parallel), and 1–3 days for SMT assembly and inspection.',
          'Adding testing and packaging, many small to mid-size [China PCBA](/china-pcb-assembly) builds land in roughly 1–3 weeks from confirmed order to shipment. Complex boards, long-lead components, or extensive functional testing can extend this. Treat any range as typical, not a guarantee — your exact timeline is confirmed per project.',
        ],
      },
      {
        heading: 'Why BOM sourcing is the usual bottleneck',
        body: [
          'If even one component is out of stock or has a long lead time, it can gate the entire build. This is why reviewing the BOM for availability and approved alternatives before the order starts is the most effective way to protect your schedule.',
          'Marking no-substitute parts and pre-approving equivalents lets the sourcing team move quickly when a part is short. See [BOM best practices](/knowledge/bom-best-practices) for how to prepare a sourcing-ready BOM.',
        ],
      },
      {
        heading: 'How to shorten your lead time',
        body: [
          'Send complete files up front (Gerber, BOM with MPNs, quantity, and test requirements), approve component alternatives early, confirm the testing scope, and agree on a shipping method before production starts.',
          'The fastest path is to let engineers review your project before quoting, so missing details are caught early instead of mid-build. [Upload your Gerber and BOM](/contact) to get a timeline confirmed for your specific project.',
        ],
      },
      {
        heading: 'Prototype vs batch lead times',
        body: [
          'Prototypes are usually quicker to assemble but can wait on small-quantity part sourcing. Batch runs add time for yield, inspection, documentation, and packaging.',
          'If you are weighing the two, see [prototype PCB assembly vs batch PCB assembly](/knowledge/prototype-vs-batch-pcb-assembly) for how review depth, tooling, and testing differ.',
        ],
      },
    ],
  },
  {
    slug: 'pcb-assembly-minimum-order-quantity',
    category: 'Planning',
    categoryColor: 'bg-cc-signal/10 text-cc-signal border-cc-signal/20',
    title: 'Is there a minimum order quantity for PCB assembly?',
    excerpt: 'How MOQ really works for PCBA — why small and prototype runs are usually possible, what drives small-batch cost, and how to quote them.',
    image: '/factory/real-reels.jpg',
    readTime: '5 min read',
    metaDescription: 'Is there a minimum order quantity for PCB assembly? How small-batch and prototype PCBA runs work, what drives their cost, and what to send for a quote.',
    sections: [
      {
        heading: 'The short answer on PCBA MOQ',
        body: [
          'Many overseas buyers ask whether PCB assembly has a minimum order quantity. For [prototype and low-volume PCBA](/low-volume-pcba-assembly), the practical answer is usually flexible — small runs, including single-digit prototype quantities, can often be assembled, though the per-board cost is higher than at volume.',
          'There is rarely a hard "you must order a thousand boards" rule for assembly. The real question is whether a small run makes economic sense once setup and component minimums are included.',
        ],
      },
      {
        heading: 'Why small runs still carry setup cost',
        body: [
          'Even a small batch involves one-time setup: an SMT stencil, machine programming, and first-article checks. That cost is spread across the run, so 5 boards each absorb far more setup than 500 boards do.',
          'Some components are also sold in minimum quantities, such as full reels, so a build may need more of certain parts than the board count strictly requires.',
        ],
      },
      {
        heading: 'How prototypes and small batches are handled',
        body: [
          'For [prototype PCB assembly](/prototype-pcb-assembly), small quantities are expected — the goal is validating the design, so engineering review and BOM checks matter more than unit price.',
          'As volume grows, setup cost per board drops and pricing improves. The same files, BOM decisions, and test plan carry forward from prototype to batch production.',
        ],
      },
      {
        heading: 'Keeping small-run cost reasonable',
        body: [
          'Send complete files, pre-approve component alternatives, avoid unnecessary unique parts, and confirm only the testing you actually need.',
          'Component lead time also affects small-run cost and schedule — see [China PCBA lead times](/knowledge/pcb-assembly-lead-time-china) for how sourcing drives both.',
        ],
      },
      {
        heading: 'What to send for a small-batch quote',
        body: [
          'Gerber files, a BOM with manufacturer part numbers, quantity, assembly drawings, and your testing requirements are enough to start.',
          '[Send your files](/contact) and ask specifically about small-batch options. A realistic quote will show how setup and components affect the per-board price at your quantity.',
        ],
      },
    ],
  },
  {
    slug: 'iot-device-pcb-assembly-china',
    category: 'Applications',
    categoryColor: 'bg-cc-copper/10 text-cc-ink border-cc-copper/30',
    title: 'IoT device PCB assembly in China: what to plan for',
    excerpt: 'Key considerations for IoT PCBA — wireless modules, antennas, power, testing, and a path from small batch to volume production.',
    image: '/factory/real-smt-2.jpg',
    readTime: '6 min read',
    metaDescription: 'IoT device PCB assembly in China — planning wireless modules, antennas, power, testing, and the path from prototype to volume PCBA. Engineer-reviewed, reply within 24h.',
    sections: [
      {
        heading: 'What makes IoT PCBA different',
        body: [
          'IoT product boards add a few constraints over a basic PCBA: a wireless module or RF section, an antenna, power management for battery or always-on operation, and connectors or sensors. These choices affect layout, sourcing, and testing, so they are worth reviewing before the board goes to assembly.',
          'For [turnkey IoT PCBA](/turnkey-pcb-assembly), the goal is to coordinate fabrication, component sourcing, assembly, and testing while keeping these wireless and power details in view.',
        ],
      },
      {
        heading: 'Sourcing the wireless and power parts early',
        body: [
          'Wireless modules (Wi-Fi, BLE, LoRa, cellular) and certain power or sensor ICs can have longer lead times or availability swings. Identifying these early — and pre-approving alternates — protects your schedule.',
          'See [BOM sourcing and PCB assembly](/bom-sourcing-pcb-assembly) for how MPN checks and approved alternatives keep an IoT build on track.',
        ],
      },
      {
        heading: 'Antenna and RF layout review',
        body: [
          'Antenna keep-out areas, module placement, and ground design influence wireless performance. An engineering review before assembly can flag obvious RF layout risks, missing footprints, or unclear orientation.',
          'For a [China PCBA](/china-pcb-assembly) build, send your Gerber, BOM, and any RF or mechanical notes so these details are confirmed up front.',
        ],
      },
      {
        heading: 'Testing IoT boards',
        body: [
          'IoT boards usually need functional testing for power-up, connectivity, and basic I/O. Provide firmware, a test method, fixtures, or pass/fail criteria so the [testing scope](/pcba-testing-quality-control) can be confirmed.',
          'Note: regulatory certification such as FCC or CE is the product owner’s responsibility, but a clean, well-tested build makes later certification smoother.',
        ],
      },
      {
        heading: 'From small batch to volume',
        body: [
          'A common path is to validate a [small batch](/low-volume-pcba-assembly) first, confirm the BOM and test plan, then scale to volume. The same file package and sourcing decisions carry forward.',
          '[Send your IoT project files](/contact) for an engineering review and a quote — reply within 24h.',
        ],
      },
    ],
  },
  {
    slug: 'keyboard-pcb-assembly-china',
    category: 'Applications',
    categoryColor: 'bg-cc-copper/10 text-cc-ink border-cc-copper/30',
    title: 'Custom keyboard PCB assembly in China: what to know',
    excerpt: 'A practical guide to custom mechanical keyboard PCBA — hotswap sockets, switches, LEDs, sourcing, and prototyping before a group buy or batch.',
    image: '/factory/real-aoi-op.jpg',
    readTime: '6 min read',
    metaDescription: 'Custom keyboard PCB assembly in China — hotswap sockets, switches, RGB LEDs, mixed SMD/through-hole assembly, sourcing, and prototyping. Engineer-reviewed, reply within 24h.',
    sections: [
      {
        heading: 'What makes keyboard PCBA different',
        body: [
          'Custom mechanical keyboard PCBs mix several part types on one board: switch or hotswap sockets, diodes, a microcontroller, a USB-C connector, stabilizers, and often per-key or underglow RGB LEDs. That mix of surface-mount and through-hole parts is what shapes the assembly plan.',
          'Because keyboard projects — including group buys and small runs — are usually [low-volume](/low-volume-pcba-assembly), engineering review and sourcing clarity tend to matter more than high-volume pricing.',
        ],
      },
      {
        heading: 'A mixed SMD and hotswap assembly job',
        body: [
          'Diodes, the controller, and LEDs are typically surface-mount, while hotswap sockets and some connectors are through-hole or bottom-mounted. A keyboard build usually needs SMT assembly plus DIP or hand-soldered steps, so it helps to confirm which parts go where before quoting.',
          'Send your Gerber files and a clear BOM so placement and orientation are confirmed early. See [BOM sourcing](/bom-sourcing-pcb-assembly) for how MPN checks help avoid switch, socket, or LED mix-ups.',
        ],
      },
      {
        heading: 'Sourcing the keyboard-specific parts',
        body: [
          'Hotswap sockets, specific switch footprints, addressable RGB LEDs (such as SK6812), and certain microcontrollers can have availability swings. Identifying these early and pre-approving alternates protects your timeline.',
          'See [China PCBA lead times](/knowledge/pcb-assembly-lead-time-china) for how component sourcing drives both schedule and small-run cost.',
        ],
      },
      {
        heading: 'Prototype first, then the group buy or batch',
        body: [
          'Most custom keyboard projects start with a [prototype](/prototype-pcb-assembly) to validate the key matrix, switch fit, stabilizer clearance, and firmware before committing to a larger run.',
          'Once the prototype is confirmed, the same files and BOM decisions carry forward into the batch — see [is there a minimum order quantity](/knowledge/pcb-assembly-minimum-order-quantity) for how small runs are handled.',
        ],
      },
      {
        heading: 'Files and testing for a keyboard PCBA quote',
        body: [
          'Send Gerber files, a BOM with manufacturer part numbers, the switch or hotswap type, quantity, and any firmware or test notes. Key-matrix continuity testing and firmware flashing can be coordinated when instructions or files are provided.',
          '[Upload your keyboard files](/contact) for an engineering review and a quote — reply within 24h.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-order-pcb-assembly-from-china',
    category: 'Getting Started',
    categoryColor: 'bg-brand-yellow/15 text-brand-primary border-brand-yellow/30',
    title: 'How to order PCB assembly from China: a first-time buyer guide',
    excerpt: 'A clear walkthrough of ordering PCBA from overseas — the process, NDAs, payment, and how to keep a first order low-risk.',
    image: '/factory/real-stencils.jpg',
    readTime: '6 min read',
    metaDescription: 'How to order PCB assembly from China for the first time — the RFQ process, NDA and IP, payment terms, and how to keep a first order low-risk. Reply within 24h.',
    sections: [
      {
        heading: 'The process at a glance',
        body: [
          'Ordering PCB assembly from an overseas supplier follows a predictable path: send your files for review, receive an engineer-reviewed quote, confirm scope and sign an NDA if needed, arrange payment, then production runs through sourcing, assembly, testing, and shipping. Knowing the steps up front makes a first order far less stressful.',
          'See the [PCBA quote file checklist](/pcba-quote-file-checklist) for exactly what to prepare, and [China PCBA lead times](/knowledge/pcb-assembly-lead-time-china) for how long each stage takes.',
        ],
      },
      {
        heading: 'Protecting your design',
        body: [
          'Reputable suppliers sign an NDA before receiving design files — ours takes under 24 hours, and you can use your template or ours.',
          'As a precaution, avoid sending confidential credentials or full production firmware through public channels until the scope and NDA are agreed.',
        ],
      },
      {
        heading: 'Payment, kept simple',
        body: [
          'For overseas orders, common methods are T/T (bank wire) and PayPal for smaller amounts, invoiced in USD, EUR, or GBP. A deposit with the balance before shipment is typical on a first order; net terms can follow once a working relationship is established.',
          'Whatever the method, confirm the exact terms in writing on your quote before paying.',
        ],
      },
      {
        heading: 'Lowering risk on a first order',
        body: [
          'Start with a [prototype or small batch](/prototype-pcb-assembly) to validate quality before committing to volume. Ask for a test report with the shipment, keep the BOM and test scope explicit, and confirm the shipping term (DAP vs DDP) so customs duties are not a surprise.',
          'A supplier that reviews your files and raises questions before quoting — rather than returning an instant black-box price — is usually the safer choice for a [China PCBA](/china-pcb-assembly) project.',
        ],
      },
      {
        heading: 'What to send to get started',
        body: [
          'Gerber files, a BOM with manufacturer part numbers, quantity, and any testing notes are enough for a first quote. Partial files are fine — engineers will tell you what is missing.',
          '[Send your files](/contact) and you will get an engineer-reviewed reply within 24 hours.',
        ],
      },
    ],
  },
  {
    slug: 'pcb-surface-finish-hasl-enig-osp',
    category: 'Fabrication',
    categoryColor: 'bg-cc-copper/10 text-cc-ink border-cc-copper/30',
    title: 'PCB surface finish guide: HASL vs ENIG vs OSP',
    excerpt: 'How to choose a PCB surface finish — HASL, ENIG, and OSP compared on cost, flatness, shelf life, and fine-pitch capability.',
    image: '/factory/pcb-surface-finish.jpg',
    readTime: '6 min read',
    metaDescription: 'PCB surface finish compared: HASL vs ENIG vs OSP — cost, solderability, flatness for BGA/fine-pitch, and shelf life — so you can pick the right one for your PCB assembly.',
    sections: [
      {
        heading: 'What a surface finish does',
        body: [
          'The surface finish is the coating on a bare board’s exposed copper pads. Its job is to protect the copper from oxidation before assembly and to give a solderable surface for the components. The finish affects cost, shelf life, how flat the pads are (which matters for fine-pitch parts), and assembly yield.',
          'For a [turnkey PCBA](/turnkey-pcb-assembly) project there is no single “best” finish — the right one depends on your component types, quantity, storage time, and budget.',
        ],
      },
      {
        heading: 'HASL — the low-cost default',
        body: [
          'HASL (Hot Air Solder Leveling) coats the pads with solder, then levels it with hot air. It is the most common and lowest-cost finish, with excellent solderability and a long shelf life.',
          'The trade-off is a slightly uneven, domed pad surface, which is not ideal for fine-pitch QFN or BGA parts. Lead-free HASL is often selected when RoHS-related requirements apply, but the surface finish alone does not establish product compliance. HASL is a common option for standard boards with larger pads.',
        ],
      },
      {
        heading: 'ENIG — flat and reliable',
        body: [
          'ENIG (Electroless Nickel Immersion Gold) plates the copper with nickel and a thin layer of gold. It gives a very flat surface, making it the preferred choice for fine-pitch components, QFN, and BGA. It also has a long shelf life (often 12 months or more) and good corrosion resistance.',
          'ENIG costs more than HASL or OSP, but for dense, high-reliability boards it is usually worth it — many [IoT and smart-display assemblies](/knowledge/iot-device-pcb-assembly-china) use ENIG for this reason.',
        ],
      },
      {
        heading: 'OSP — cheap and flat, but time-sensitive',
        body: [
          'OSP (Organic Solderability Preservative) is a thin organic coating over the copper. It is low-cost, flat, and environmentally friendly, with good solderability for boards that will be assembled soon.',
          'Its limits are a shorter shelf life and tolerance for fewer reflow cycles, and it is hard to inspect visually (no metallic coating to see). OSP suits cost-sensitive boards assembled within a few months.',
        ],
      },
      {
        heading: 'Other options: Immersion Silver and Tin',
        body: [
          'Immersion Silver and Immersion Tin are flat, fine-pitch-friendly alternatives with moderate cost, though both are more sensitive to handling and storage.',
          'They are less common than the three above, but available when a specific assembly, contact, or press-fit requirement calls for them.',
        ],
      },
      {
        heading: 'Which finish should you choose?',
        body: [
          'A quick rule of thumb: consider lead-free HASL for standard, cost-sensitive boards with larger pads; ENIG for fine-pitch, BGA, high-reliability, or longer storage; OSP for low-cost boards assembled soon. Surface finish selection depends on product requirements, assembly process, shelf life, and compliance needs. See our [fabrication and assembly capabilities](/pcb-fabrication-and-assembly) for the finishes we coordinate.',
          'RoHS-related material requirements should be confirmed before quotation. Material declarations or compliance documents should be discussed project by project when required.',
          'Not sure which fits your design? [Send your Gerber and BOM](/contact) and our engineering team will recommend a finish based on your components, quantity, and storage needs — reply within 24h.',
        ],
      },
    ],
  },
  {
    slug: 'common-pcba-defects-and-prevention',
    category: 'Quality',
    categoryColor: 'bg-cc-signal/10 text-cc-signal border-cc-signal/20',
    title: 'Common PCBA defects and how to prevent them',
    excerpt: 'The PCBA defects that matter — tombstoning, bridging, cold joints, BGA voids — how a good assembler catches them, and how engineering review prevents them.',
    image: '/factory/common-pcba-defects.jpg',
    readTime: '6 min read',
    metaDescription: 'Common PCB assembly defects explained — tombstoning, solder bridging, cold joints, BGA voids — and how AOI, X-ray, testing, and DFM review catch and prevent them.',
    sections: [
      {
        heading: 'Quality is the real question for overseas buyers',
        body: [
          'Behind "can I trust a China PCBA supplier" is one real worry: will the boards arrive working and consistent? The reassuring answer is that the common PCBA defects are well understood — a good assembler catches them with inspection and prevents most of them before production even starts.',
          'Below are the defects we watch for, how we detect them, and how engineering review stops them early.',
        ],
      },
      {
        heading: 'The common SMT defects',
        body: [
          'Tombstoning — a small two-terminal part lifts on one end during reflow, usually from uneven heating or unbalanced pads. Solder bridging — excess solder links two pads that should be separate, common on fine-pitch ICs. Insufficient or cold joints — too little paste or heat leaves a weak connection.',
          'Component shift, missing parts, wrong part, or reversed polarity round out the usual list. Most come down to paste volume, the reflow profile, placement accuracy, or a footprint issue — all controllable.',
        ],
      },
      {
        heading: 'The defects that hide under the part',
        body: [
          'Some defects are invisible from the top. BGA and QFN solder joints can have voids or opens hidden beneath the component — we verify these with X-ray. Through-hole joints can also be cold or incomplete after wave or hand soldering.',
          'This is why visual inspection alone is not enough for dense boards; the right mix of inspection methods matters.',
        ],
      },
      {
        heading: 'How we catch them',
        body: [
          'The inspection stack depends on the board: AOI (automated optical inspection) checks placement and solder on every board; X-ray verifies hidden BGA joints; flying probe or ICT confirms electrical continuity; and functional testing validates the board against your criteria.',
          'See [PCBA testing and quality control](/pcba-testing-quality-control) for how the test scope is set per project.',
        ],
      },
      {
        heading: 'How we prevent them up front',
        body: [
          'Catching defects is good; preventing them is better. Before production we run a DFM review of your files, inspect incoming components (IQC), dial in the reflow profile and stencil for your board, and confirm the test plan.',
          'This engineering-review-first approach is exactly why we do not return instant black-box quotes — see our [quality process](/quality) and [turnkey workflow](/turnkey-pcb-assembly).',
        ],
      },
      {
        heading: 'Worried about quality on a China order?',
        body: [
          'A supplier that reviews your design and raises manufacturability questions before quoting is your best defense against defects.',
          '[Send your Gerber and BOM](/contact) and we will review the design, flag any risks, and propose an inspection and test plan — reply within 24h.',
        ],
      },
    ],
  },
  {
    slug: 'pcba-quote-with-incomplete-files',
    category: 'Getting Started',
    categoryColor: 'bg-cc-copper/15 text-cc-ink border-cc-copper/30',
    title: 'How to get a PCBA quote with incomplete files',
    excerpt: 'You do not need a perfect data package to start. Here is the minimum that lets an engineering team give a preliminary PCB assembly quote, and how a firm quote is reached once the gaps are filled.',
    image: '/factory/pcba-quote-incomplete-files.jpg',
    readTime: '5 min read',
    metaDescription: 'How to get a PCB assembly quote when your files are incomplete — the minimum information needed for a preliminary quote, what engineering review checks, and how to reach a firm price.',
    sections: [
      {
        heading: 'Quick answer',
        body: [
          'You do not need a complete data package to get started. If your files are incomplete, send what you have — a partial or older Gerber, a partial BOM, board markings, photos of your own board, the quantity, and the target application. An engineering review uses that to give a preliminary PCB assembly quote and a clear list of what is still missing for a firm price. The fastest path is to send the available information now rather than waiting until every file is perfect.',
        ],
      },
      {
        heading: 'What "incomplete files" usually means',
        body: [
          'In practice, "incomplete" covers a range of situations: a Gerber without drill data, a BOM missing manufacturer part numbers, no pick-and-place (CPL) file, no assembly drawing, or only a schematic and a few photos of your own board. Each gap affects a different part of the quote — fabrication, sourcing, or placement — but rarely blocks a preliminary estimate.',
          'See [how to prepare files for a PCB assembly quote](/knowledge/pcb-assembly-file-preparation-guide) for the full file list and what each one is used for.',
        ],
      },
      {
        heading: 'The minimum needed for a preliminary quote',
        body: [
          'For a useful preliminary estimate, the practical minimum is: the board outline or dimensions and layer count (even approximate), a partial component list or a clear photo of your populated board so parts can be identified, the order quantity, and what the board is for.',
          'With that, an assembler can estimate fabrication, rough out the BOM cost, and flag the biggest sourcing risks before you invest time completing every file.',
        ],
      },
      {
        heading: 'What the engineering review checks and fills in',
        body: [
          'Engineering review is where incomplete information gets turned into a buildable scope. We identify visible components and their packages, flag parts that look obsolete or single-source, note where a drill file or assembly drawing is still required, and confirm whether your stated quantity and application change the recommended process.',
          'Component sourcing risk is usually the most important gap — see [BOM sourcing for PCB assembly](/bom-sourcing-pcb-assembly) for how obsolete and substitute parts are handled.',
        ],
      },
      {
        heading: 'Preliminary quote vs firm quote',
        body: [
          'A preliminary quote is an honest estimate based on partial information; it can move once the missing files arrive. A firm quote needs a complete, manufacturable data set: production Gerber and drill files, a BOM with manufacturer part numbers and approved alternates, a CPL (pick-and-place) file, an assembly drawing with polarity notes, quantity, and testing requirements.',
          'Sending files in stages is normal. The preliminary number tells you whether the project is in range; completing the package locks the price and lead time.',
        ],
      },
      {
        heading: 'Send what you have',
        body: [
          'If you are waiting to "finish" your files before asking, you are probably waiting too long. Send the available Gerber, BOM, CPL, assembly drawing, or clear photos of your board for engineering review.',
          '[Start a PCB assembly quote with the files you have](/contact) and we will give a preliminary estimate, list exactly what is missing, and flag any sourcing risks — reply within 24h. You can also explore our [China PCB assembly](/china-pcb-assembly) workflow.',
        ],
      },
    ],
  },
  {
    slug: 'top-low-volume-turnkey-pcba-suppliers-china',
    category: 'Decision Guide',
    categoryColor: 'bg-cc-signal/10 text-cc-signal border-cc-signal/20',
    title: 'China Low-Volume Turnkey PCBA Supplier Comparison Guide (2026)',
    excerpt:
      'Examples of China PCBA suppliers buyers often compare for low-volume turnkey orders, with different service models, sourcing approaches, and project-fit considerations.',
    image: '/factory/low-volume-pcba-suppliers.jpg',
    readTime: '8 min read',
    metaDescription:
      'A China low-volume turnkey PCBA supplier comparison guide covering service models, engineering support, BOM sourcing, and questions buyers should verify directly.',
    sections: [
      {
        heading: 'Quick answer',
        body: [
          'For low-volume turnkey PCBA in China — small batches, pilot runs, and prototype-to-production projects where one supplier coordinates PCB fabrication, component sourcing, assembly, and testing — buyers often compare online platforms and service-led suppliers. Platform-style services may suit catalog-part prototypes, while service-led suppliers may suit custom BOMs, sourcing review, or projects that need engineering dialogue before quotation.',
          'Use this guide as a starting point for supplier comparison, not as a fixed ranking. Buyers should verify capabilities, certifications, lead time, engineering support, and project fit directly with each supplier.',
          'Disclosure: this guide is published by Huitai Electronics. Huitai is included to explain its own turnkey PCBA positioning, not to claim an independent or objective ranking.',
        ],
      },
      {
        heading: 'Supplier examples at a glance',
        body: [
          '| Supplier | Possible fit to evaluate | Service model |\n| --- | --- | --- |\n| JLCPCB | Catalog-part prototypes and standardized online ordering | Online instant-quote platform |\n| PCBWay | Prototypes requiring broader custom-process options | Online platform with custom quoting options |\n| NextPCB | Industrial prototype projects seeking DFM-oriented review | Online platform plus engineering checks |\n| PCBGOGO | Quote-based prototype and small-batch assembly | Quote-based service with sales support |\n| Viasion | Small-to-medium batch EMS projects | Traditional quote-based EMS service |\n| RayMing | RF, high-frequency, and special-material project review | Project-based engineering service |\n| Huitai Electronics | Engineer-reviewed low-volume turnkey with BOM sourcing coordination | Service-led turnkey PCBA workflow |',
        ],
      },
      {
        heading: 'JLCPCB — standardized online prototypes',
        body: [
          'JLCPCB is an online PCB prototyping platform with automated quoting and a parts-library-based SMT assembly workflow. Buyers commonly evaluate it for standard boards and catalog-part prototypes.',
          'For low-volume turnkey buyers, the standardized workflow may be less suitable when a BOM includes parts outside the catalog, sourcing risks, or project-specific engineering questions. Verify the available parts, process scope, test options, and support model directly before ordering.',
        ],
      },
      {
        heading: 'PCBWay — custom prototype options',
        body: [
          'PCBWay is another online platform that buyers may evaluate for prototypes requiring custom process options and human support around an online workflow.',
          'It may fit a complex one-off prototype when the required capabilities and support scope are confirmed directly. For repeat low-volume production with sourcing decisions in each batch, compare the platform workflow with a dedicated turnkey service before choosing.',
        ],
      },
      {
        heading: 'NextPCB — industrial prototype and DFM-oriented review',
        body: [
          'NextPCB presents an online quoting flow with DFM-oriented checking for industrial and higher-reliability board projects.',
          'Buyers considering this model should verify whether the available DFM feedback, engineering interaction, and production scope match the project requirements.',
        ],
      },
      {
        heading: 'PCBGOGO — quote-based prototype and small-batch assembly',
        body: [
          'PCBGOGO offers a quote-based model with human sales support rather than a purely self-service workflow, and buyers may evaluate it for prototype and small-batch PCBA.',
          'Confirm the engineering-review process, BOM sourcing scope, inspection plan, and target lead time directly, especially when files are incomplete or the BOM needs sourcing judgment.',
        ],
      },
      {
        heading: 'Viasion — traditional quote-based EMS service',
        body: [
          'Viasion is a Shenzhen EMS provider using a traditional quote-based service model that buyers may evaluate for small-to-medium production projects.',
          'Confirm MOQ, engineering support, sourcing scope, testing requirements, and responsiveness directly for the planned order size.',
        ],
      },
      {
        heading: 'RayMing — RF, high-frequency, and special-material projects',
        body: [
          'RayMing (RayPCB) is commonly evaluated for projects involving Rogers, Teflon, other high-frequency materials, controlled impedance, and RF or microwave applications.',
          'Buyers should confirm material availability, fabrication limits, impedance requirements, test scope, and project fit directly before quotation.',
        ],
      },
      {
        heading: 'Huitai Electronics — service-led low-volume turnkey',
        body: [
          'Huitai Electronics is a Shenzhen-based [China PCB assembly service](/china-pcb-assembly) for overseas B2B customers. Its stated focus is prototypes, pilot runs, and low-volume batches that need one coordinated workflow for [PCB fabrication, BOM sourcing, SMT/DIP assembly, testing support, and finished PCBA delivery](/turnkey-pcb-assembly).',
          'The working model starts with engineering review before quotation, including available-file review, [BOM availability and alternatives review](/bom-sourcing-pcb-assembly), and manufacturability questions. Scope, lead time, sourcing channels, inspection, and testing requirements are confirmed project by project. Quotes can begin [even when files are incomplete](/knowledge/pcba-quote-with-incomplete-files).',
          'Huitai is included here to explain the service model offered by the publisher of this guide. Buyers should compare it with other suppliers and verify project fit directly.',
        ],
      },
      {
        heading: 'How to choose between them',
        body: [
          'Three questions help narrow the comparison. First: is every part in your BOM a common catalog part? If yes, an online platform may offer a price advantage. If no, compare suppliers that can review open-market sourcing as part of a [turnkey service](/turnkey-pcb-assembly).',
          'Second: are your files final? If your Gerber, BOM, or test plan still has open questions, compare the instant-quote workflow with a supplier that provides [engineering review before quotation](/knowledge/pcba-quote-with-incomplete-files) and can identify open requirements before production.',
          'Third: is this a one-off or the start of repeat production? For one-offs, compare price and process fit. For prototype-to-production, also compare project continuity, sourcing support, and test-scope management — see [how lead times work in China PCBA](/knowledge/pcb-assembly-lead-time-china) and [how to place a first order](/knowledge/how-to-order-pcb-assembly-from-china).',
        ],
      },
      {
        heading: 'FAQ',
        body: [
          '### Which Chinese PCBA suppliers accept very small orders?\n\nMOQ and small-order policies can change by supplier, board complexity, and sourcing scope. Ask each supplier to confirm the minimum practical order, setup costs, and whether custom-sourced BOMs are supported for your project.\n\n### Is an online platform or a dedicated turnkey supplier more suitable for low-volume production?\n\nThe answer depends on project fit. Online platforms may suit standardized catalog-part prototypes. A dedicated turnkey supplier may suit repeat batches, parts outside a platform catalog, sourcing risks, or project-specific testing requirements. Compare both models using real project files.\n\n### What can turnkey include at low volume?\n\nA low-volume turnkey scope can include file review, PCB fabrication, BOM sourcing with customer-approved alternatives, SMT and through-hole assembly, agreed inspection, testing support, and packed delivery. Confirm the exact scope in writing before ordering.\n\n### How do I keep low-volume PCBA cost reasonable?\n\nA clean BOM with manufacturer part numbers and approved alternatives, a test scope matched to the build purpose, and panelization-friendly board design can reduce avoidable setup and rework costs.\n\n### How do I verify a Chinese PCBA supplier before ordering?\n\nSend real project files and assess the response. Ask suppliers to confirm capabilities, certifications, lead time, sourcing channels, inspection, testing, and documentation for your exact project. Start with a small paid pilot run before committing volume.',
        ],
      },
      {
        heading: 'Start with an engineering review',
        body: [
          'If your project is low-volume, custom, or somewhere between prototype and production, an engineering review can clarify the scope before price and lead time are confirmed.',
          '[Send your Gerber and BOM](/contact) for file, sourcing, manufacturability, and testing-scope review before quotation.',
        ],
      },
    ],
  },
  {
    slug: 'jlcpcb-alternatives-turnkey-pcba',
    category: 'Decision Guide',
    categoryColor: 'bg-cc-signal/10 text-cc-signal border-cc-signal/20',
    title: 'JLCPCB Alternatives for Turnkey PCBA Assembly (2026)',
    excerpt:
      'JLCPCB is excellent at what it is built for — but its model has limits. The signs you have outgrown it, and which turnkey PCBA alternatives fit custom BOMs, low-volume production, and engineering support.',
    image: '/factory/jlcpcb-alternatives.jpg',
    readTime: '7 min read',
    metaDescription:
      'Looking for JLCPCB alternatives for turnkey PCBA? When to stay with JLCPCB, the 5 signs you have outgrown it, and how alternatives like Huitai Electronics, PCBWay, NextPCB, and Viasion compare for custom BOMs and low-volume production.',
    sections: [
      {
        heading: 'Quick answer',
        body: [
          'JLCPCB is the right choice for cheap, fast prototypes built from common catalog parts — nothing on this page changes that. People look for JLCPCB alternatives when their project stops fitting that model: parts outside the platform library, a BOM that needs sourcing judgment, repeat low-volume production, functional testing against custom criteria, or the need to talk to an engineer before money is spent. The realistic alternatives split by need: PCBWay or NextPCB for more capable platform-style service, and service-led turnkey suppliers such as Huitai Electronics, PCBGOGO, or Viasion when you need open-market BOM sourcing and a person who owns your project.',
          'Disclosure: this guide is published by Huitai Electronics, one of the alternatives discussed below. We say plainly when JLCPCB or another option is the better choice.',
        ],
      },
      {
        heading: 'When JLCPCB is still the right choice',
        body: [
          'Be honest with yourself before switching: if your board uses common catalog components, your files are final, you are ordering a handful of prototypes, and you do not need custom testing — stay. No turnkey supplier will beat the platform price on that job, and switching buys you nothing.',
          'The rest of this guide is for the moment that stops being true.',
        ],
      },
      {
        heading: '5 signs you have outgrown the platform model',
        body: [
          '**1. Your parts are not in the library.** Economic platform assembly draws on a fixed parts catalog. Once your design needs specific manufacturer part numbers, unusual packages, or end-of-life parts, you need [open-market BOM sourcing](/bom-sourcing-pcb-assembly) — buying against your BOM, with approved alternates, not around a catalog.',
          '**2. Your BOM needs judgment, not just fulfillment.** Shortages, lifecycle risk, substitute approval, long-lead buys — a platform quotes what you upload; it does not tell you that a part is about to go obsolete. A supplier who reviews the BOM line by line catches this [before the quote](/knowledge/pcba-quote-with-incomplete-files).',
          '**3. You are moving from one-off to repeat production.** Pilot runs and repeat low-volume batches need process continuity: the same stencil decisions, the same test plan, a partner who already knows the board. See [prototype vs batch assembly](/knowledge/prototype-vs-batch-pcb-assembly) for what changes.',
          '**4. You need testing against your criteria.** Standard platform output is a board that passes AOI. If you need functional testing against firmware, fixtures, or acceptance criteria you define, that is a [testing and quality-control scope](/pcba-testing-quality-control) a platform form cannot capture.',
          '**5. You need to talk to an engineer before spending.** When the design has open questions — a footprint you are unsure about, a tolerance that worries you — an instant quote is exactly the wrong product. You want manufacturability questions raised before the price is fixed, not change orders after.',
        ],
      },
      {
        heading: 'The alternatives, by what you actually need',
        body: [
          '| Need | Alternative | Why |\n| --- | --- | --- |\n| More capability, still platform-style | PCBWay | Higher layer counts, special processes, more human support |\n| Industrial boards with DFM checks | NextPCB | Platform flow plus stronger automated DFM feedback |\n| Quick-turn small batches, quote-based | PCBGOGO | Established quick-turn shop with sales support |\n| Small-to-medium EMS without MOQ pressure | Viasion | 15+ years traditional EMS, welcomes small orders |\n| Engineer-supported low-volume turnkey | Huitai Electronics | Engineering review before every quote, open-market sourcing, direct engineer contact |',
          'For a fuller comparison of these suppliers, see our [China low-volume turnkey PCBA supplier comparison guide](/knowledge/top-low-volume-turnkey-pcba-suppliers-china).',
        ],
      },
      {
        heading: 'What switching looks like in practice',
        body: [
          'Moving from a platform to a turnkey supplier is mostly a files exercise. Send the same package you already have — Gerber and drill files, BOM with manufacturer part numbers, pick-and-place file, assembly drawing — plus two things platforms never asked you for: your quantity plan (one batch or repeat?) and your test expectations. [Incomplete files are workable](/knowledge/pcba-quote-with-incomplete-files); a preliminary quote scopes the gaps.',
          'Expect the first response to be questions rather than a price. That is the product you are switching for: a [turnkey supplier](/turnkey-pcb-assembly) is pricing your project, not your upload. A serious one replies within a day or two with manufacturability notes, sourcing flags, and a quote scope — at Huitai the reply lands within 24 hours.',
        ],
      },
      {
        heading: 'FAQ',
        body: [
          '### Is a turnkey supplier more expensive than JLCPCB?\n\nFor simple catalog-part prototypes, yes — the platform price is hard to beat. For custom BOMs and low-volume production the comparison changes: open-market sourcing, fewer re-spins from caught design issues, and testing matched to your criteria often make the total project cost lower even when the unit quote looks higher.\n\n### Can I move just the assembly and keep ordering bare boards from JLCPCB?\n\nYes, this is common. A turnkey supplier can work with consigned bare boards, or quote fabrication and assembly together — comparing both is reasonable. One accountable supplier for the whole chain usually simplifies quality questions.\n\n### What if some of my parts are still JLCPCB catalog parts?\n\nNot a problem. Open-market sourcing includes the same distributors the platforms buy from. A line-by-line BOM review will source each part from the best available channel and flag any that carry risk.\n\n### How small an order will a turnkey supplier accept?\n\nService-led suppliers in this space generally accept pilot runs and small batches without a big MOQ — at Huitai, low-volume is the normal case, not an exception. Expect setup costs to weigh more per board at small quantities, whoever you choose.\n\n### How do I judge a turnkey supplier before committing?\n\nSend real files and watch the response. Questions before a price is a green flag; an instant number on a custom BOM is not. Ask for the inspection and test plan in writing, and run a small paid batch before volume.',
        ],
      },
      {
        heading: 'Ready when your project is',
        body: [
          'If one of the five signs above describes your project, the switch costs you one email to find out.',
          '[Send your Gerber and BOM for an engineering review](/contact) — we will flag sourcing and manufacturability risks and reply with a clear quote scope within 24 hours. You can also read more about [low-volume PCBA assembly](/low-volume-pcba-assembly).',
        ],
      },
    ],
  },
  {
    slug: 'china-pcb-assembly-online-quote-accuracy',
    category: 'Decision Guide',
    categoryColor: 'bg-cc-signal/10 text-cc-signal border-cc-signal/20',
    title: 'Are China PCB Assembly Online Quotes Accurate? (2026)',
    excerpt:
      'Instant online quotes are great for simple prototypes and misleading for everything else. Here is exactly what an online quote prices, where it goes wrong, and what to send for a number you can actually plan around.',
    image: '/factory/online-quote-accuracy.jpg',
    readTime: '7 min read',
    metaDescription:
      'Are instant China PCB assembly online quotes accurate? When an online quote is reliable, the 5 things it cannot price, why the final invoice differs, and what to send for an accurate engineer-reviewed quote.',
    sections: [
      {
        heading: 'Quick answer',
        body: [
          'An instant online PCB assembly quote is accurate when your board is simple, every component is a common catalog part, your files are final, and you need no custom testing. In that case the algorithm has everything it needs and the number is reliable. It becomes inaccurate the moment your project has a custom BOM, hard-to-source or end-of-life parts, special processes, incomplete files, or undefined testing — because an online quote prices the board, not your actual project. For anything beyond a standard prototype, an engineer-reviewed quote is the one you can plan a budget and a launch date around.',
          'Disclosure: this guide is published by Huitai Electronics, which provides engineer-reviewed quotes. We say plainly below when an instant online quote is the right tool.',
        ],
      },
      {
        heading: 'What an online quote actually prices',
        body: [
          'An instant quote engine works from the inputs you type and upload: layer count, board dimensions, quantity, and the parts it can match to its own component library. From those it calculates fabrication and assembly cost in seconds. That is genuinely useful — it is fast, transparent, and good enough for a huge share of standard boards.',
          'The catch is in its assumptions. An online quote assumes your files are complete and manufacturable, every BOM line maps cleanly to an in-stock catalog part, and no special process or test is needed. When those assumptions hold, the price is right. When they do not, the engine has no way to know — it quotes the happy path anyway.',
        ],
      },
      {
        heading: 'The 5 things an online quote cannot price',
        body: [
          '**1. Components outside the catalog.** If your BOM uses specific manufacturer part numbers the platform does not stock, those lines are either ignored or flagged for manual sourcing later — exactly where the real cost lives. [Open-market BOM sourcing](/bom-sourcing-pcb-assembly) prices them against your actual BOM.',
          '**2. Shortages and end-of-life parts.** An engine quotes a part as if it is available at list price. It will not tell you a critical IC is on 26-week lead time or has gone obsolete — you discover that after you have paid.',
          '**3. Special processes and tolerances.** Controlled impedance, unusual finishes, fine-pitch BGA, rigid-flex — these add real process steps that simple parametric quoting under-counts.',
          '**4. Incomplete or ambiguous files.** No pick-and-place file, a missing drill layer, an assembly drawing that contradicts the Gerber — an engine cannot catch these, so it prices a board it cannot actually build as specified. See [how a quote works with incomplete files](/knowledge/pcba-quote-with-incomplete-files).',
          '**5. Your test and acceptance scope.** "Functional test against my firmware" is not a checkbox an engine can price. If testing matters to you, an instant quote almost never includes it.',
        ],
      },
      {
        heading: 'Why the final invoice differs from the online number',
        body: [
          'When an online quote turns out wrong, it usually is not because anyone moved the price — it is because the engine quoted an idealized version of your project and reality showed up during production. A part was short, a footprint needed a respin, a test step got added. Each becomes a change request, and the "cheap" instant number drifts upward.',
          'This is the core difference: an instant quote is a price for a board that matches its assumptions; an engineer-reviewed quote is a price for your specific project after someone has checked whether those assumptions actually hold. One is faster; the other is the number you can budget against.',
        ],
      },
      {
        heading: 'When an online quote is the right tool',
        body: [
          'To be fair to instant quoting: if your design uses only common catalog parts, your files are final, you are ordering a handful of standard prototype boards, and you do not need custom testing, an online quote from a platform like JLCPCB or PCBWay is accurate and hard to beat on speed and price. Use it.',
          'The honest line is about fit, not quality. For that standard case, instant quoting wins. For custom BOMs and production planning, a reviewed quote wins — see [when you have outgrown the platform model](/knowledge/jlcpcb-alternatives-turnkey-pcba).',
        ],
      },
      {
        heading: 'What to send for an accurate quote',
        body: [
          'An accurate quote does not require a perfect data package, but the more of this you send, the firmer the number: Gerber and drill files, a BOM with manufacturer part numbers and approved alternates, a pick-and-place file, an assembly drawing, your quantity, and your testing requirements. See the full [PCBA quote file checklist](/pcba-quote-file-checklist).',
          'If your files are incomplete, send what you have plus clear photos of your board — an engineering review gives a preliminary number and a precise list of what is still needed for a firm price, rather than a confident-but-wrong instant figure.',
        ],
      },
      {
        heading: 'FAQ',
        body: [
          '### How accurate is an instant online PCB assembly quote?\n\nVery accurate for simple boards built entirely from a platform\'s catalog parts with final files and no custom testing. Accuracy drops sharply once your BOM has parts outside the catalog, sourcing risk, special processes, incomplete files, or defined test requirements — because the engine prices the board, not those project realities.\n\n### Why is my final price different from the online quote?\n\nUsually because the engine quoted an idealized version: it assumed every part was in stock at list price, your files were fully manufacturable, and no testing was needed. When a part is short, a footprint needs a respin, or a test step is added, those become change requests that move the price. An engineer-reviewed quote surfaces these before you commit.\n\n### Is an online quote or an engineer-reviewed quote better?\n\nNeither is universally better — they fit different projects. An online quote is better for fast, standard catalog-part prototypes. An engineer-reviewed quote is better for custom BOMs, low-volume production, and anything you need to budget and schedule accurately.\n\n### Can I get an accurate quote without complete files?\n\nYes. Send what you have — a partial BOM, board photos, quantity, and the application. An engineering review returns a preliminary quote plus a clear list of what is missing for a firm price. This is often more useful than a precise-looking instant number based on incomplete assumptions.\n\n### How fast is an engineer-reviewed quote?\n\nSlower than an instant engine, but not by much in practice — at Huitai the target is a reviewed reply within 24 hours, with sourcing and manufacturability risks already flagged so the number does not move later.',
        ],
      },
      {
        heading: 'Get a quote you can plan around',
        body: [
          'If your project is anything more than a standard catalog-part prototype, the accurate number is one engineering review away.',
          '[Send your Gerber and BOM](/contact) — we will review the files, flag sourcing and manufacturability risks, and reply with a clear quote scope within 24 hours. See also our [China PCB assembly](/china-pcb-assembly) workflow.',
        ],
      },
    ],
  },
  {
    slug: 'bom-risk-alternative-component-sourcing',
    category: 'Sourcing',
    categoryColor: 'bg-cc-copper/10 text-cc-ink border-cc-copper/30',
    title: 'BOM Risk & Alternative Component Sourcing for Low-Volume PCBA',
    excerpt:
      'Component supply in 2026 is selectively tight, not universally short. Here are the five BOM risks to check before you build, how alternative sourcing actually works (and its limits), and how to prepare a BOM that survives shortages.',
    image: '/factory/bom-risk-sourcing.jpg',
    readTime: '8 min read',
    metaDescription:
      'How to manage BOM risk and alternative component sourcing for low-volume PCBA in 2026 — what component shortage really means now, the 5 risks to check (EOL, single-source, MOQ, long lead time, authenticity), and how to prepare a shortage-resistant BOM.',
    sections: [
      {
        heading: 'Quick answer',
        body: [
          'For a low-volume PCBA project, BOM risk — not assembly itself — is usually what blows up the budget and the schedule. The good news is that component supply in 2026 is selectively tight, not universally short: most standard passives and common parts are readily available, while specific lines (some high-capacitance / large-case MLCCs and certain MCU and memory families, partly squeezed by AI-server demand) have seen longer lead times and tighter allocation. The practical answer is not to panic-buy everything — it is to review the BOM line by line before you build, identify the few parts that actually carry risk, line up approved alternates for them, and lock long-lead parts early.',
          'Disclosure: this guide is published by Huitai Electronics, which does BOM sourcing as part of turnkey PCBA. The sourcing approach below is what we actually do; the supply commentary is kept general because specifics change by part, manufacturer, and date.',
        ],
      },
      {
        heading: 'What "component shortage" actually means in 2026',
        body: [
          'It is easy to read headlines and assume everything is short. In practice the tightness is concentrated, not across the board. Through mid-2026, industry reporting points to extended lead times on particular high-capacitance and large-case MLCCs, plus select MCU and memory lines — driven partly by AI-server and data-center demand pulling capacity — while standard 0402/0603 passives and many jellybean parts remain broadly available.',
          'The specifics (which exact series, how many weeks) vary by manufacturer, package, and the week you ask, and they go stale quickly. That is exactly why a BOM should be checked line by line against current availability rather than assumed from a general "there is a shortage" headline. The risk lives in a handful of lines, not the whole list.',
        ],
      },
      {
        heading: 'The 5 BOM risks to check before you build',
        body: [
          '**1. Long lead time.** A single part on a multi-week or multi-month lead time can gate your whole build. These need to be identified and ordered first, not discovered at kitting.',
          '**2. End-of-life / obsolescence.** A part may still appear in catalogs but be marked NRND (not recommended for new designs) or EOL. Designing it in now means a redesign later — better to flag and substitute early.',
          '**3. Single-source parts.** If only one manufacturer makes a critical part and you have no approved alternate, one allocation event holds your build hostage. Single-sourcing a cheap part is a surprisingly common way to stall a project.',
          '**4. Minimum order quantity (MOQ).** Many components are sold in reels of thousands. On a low-volume build you may pay toward a full reel for a handful of boards, which changes cost more than the unit price suggests. See [why per-board price is higher at low volume](/low-volume-pcba-assembly).',
          '**5. Authenticity / counterfeit risk.** When a part is scarce, the grey market fills the gap — and that is where counterfeits appear. Parts should come from the manufacturer or authorized channels, not whoever has stock at any price.',
        ],
      },
      {
        heading: 'How alternative sourcing works — and its limits',
        body: [
          'Alternative sourcing means having a backup part that does the same job when the first choice is short, obsolete, or over-priced. For jellybean components — common resistors, capacitors, and standard regulators — a manufacturer can usually propose an equivalent quickly, and it is worth authorizing that in advance so a $0.02 part never stalls a build.',
          'The limit is important and we are strict about it: substitutes are proposed, never silently swapped. Any part with a functional, tolerance, footprint, thermal, or compliance implication — and anything you have marked no-substitute — is confirmed with you before purchase. An "equivalent" that is not truly equivalent is worse than a delay. This is why a clean BOM with approved alternates already listed speeds everything up.',
        ],
      },
      {
        heading: 'What this looks like on the sourcing desk',
        body: [
          'In practice, BOM risk work happens before a quote is finalized, not during production. Each line is checked for current availability and lifecycle status, the few risky parts are flagged, long-lead items are surfaced so they can be ordered early, and where a part is short or single-source we propose customer-approved alternates rather than guessing.',
          'This is also the most current, first-hand part of sourcing: which specific parts are tight this month, and what is actually substituting well, is something a sourcing team sees in live quotes — not something a generic article can keep up to date. It is the reason we review the BOM before quoting instead of returning an instant number. See [BOM sourcing for PCB assembly](/bom-sourcing-pcb-assembly) and [why instant online quotes are often wrong](/knowledge/china-pcb-assembly-online-quote-accuracy).',
        ],
      },
      {
        heading: 'How to prepare a BOM that survives shortages',
        body: [
          'You can remove most BOM risk before you ever send an RFQ. Include manufacturer part numbers (not just generic descriptions) for every line, list one or two approved alternates for critical parts, and clearly mark the no-substitute parts so they are never swapped. Note any part you already know is long-lead or single-source.',
          'Then share your real quantity and timeline. A sourcing team that knows your production window can buy ahead on long-lead parts instead of hitting the problem at kitting. For the full column-by-column format, see [BOM best practices for fast sourcing](/knowledge/bom-best-practices).',
        ],
      },
      {
        heading: 'FAQ',
        body: [
          '### Are electronic components still in shortage in 2026?\n\nSelectively, not universally. Most standard passives and common parts are broadly available, while particular lines — some high-capacitance/large-case MLCCs and certain MCU and memory families — have seen longer lead times and tighter allocation, partly from AI-server demand. The specifics change by manufacturer, series, and date, so a BOM should be checked line by line rather than judged from a general headline.\n\n### What is the difference between a shortage and obsolescence?\n\nA shortage is temporary — the part still exists but is hard to get right now. Obsolescence (EOL / NRND) is permanent — the manufacturer is ending or has ended production. A shortage may be solved by waiting or finding stock; obsolescence usually needs a substitute or a redesign, so it is better caught early.\n\n### Can I approve alternative components in advance?\n\nYes, and it helps a lot. Listing one or two approved alternates per critical part, and authorizing equivalents for jellybean components, lets sourcing move immediately when a part is short — without waiting on an email for every line. Parts with functional or compliance implications are still confirmed before purchase.\n\n### How do I reduce BOM risk on a low-volume build?\n\nUse manufacturer part numbers, list approved alternates, mark no-substitute parts, flag anything you know is long-lead or single-source, and share your real timeline. Most BOM risk can be removed on paper before the first board is built.\n\n### What if a part on my BOM is end-of-life?\n\nIt is flagged during engineering review, and we propose a form-fit-function alternate for your approval, or note where a small design change may be needed. Catching an EOL part before production is far cheaper than discovering it mid-build.',
        ],
      },
      {
        heading: 'Send your BOM for a risk review',
        body: [
          'The cheapest time to find a sourcing problem is before production — on paper, during engineering review.',
          '[Send your BOM and Gerber files](/contact) and we will check each line for availability, lifecycle, and sourcing risk, flag the parts that matter, and propose approved alternates — with a clear quote scope back within 24 hours.',
        ],
      },
    ],
  },
];

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}
