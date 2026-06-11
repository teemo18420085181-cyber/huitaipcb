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
          'The trade-off is a slightly uneven, domed pad surface, which is not ideal for fine-pitch QFN or BGA parts. Lead-free HASL is available for RoHS. HASL is a solid default for standard boards with larger pads.',
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
          'A quick rule of thumb: choose lead-free HASL for standard, cost-sensitive boards with larger pads; ENIG for fine-pitch, BGA, high-reliability, or longer storage; OSP for low-cost boards assembled soon. See our [fabrication and assembly capabilities](/pcb-fabrication-and-assembly) for the finishes we coordinate.',
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
    title: 'Top 7 Low-Volume Turnkey PCBA Suppliers in China (2026)',
    excerpt:
      'A practical comparison of seven China PCBA suppliers for low-volume turnkey orders — who fits engineer-supported small batches, who fits instant-quote prototypes, and how to choose between them.',
    image: '/factory/svc-smt-assembly.jpg',
    readTime: '8 min read',
    metaDescription:
      'Compare 7 low-volume turnkey PCBA suppliers in China for 2026 — Huitai Electronics, JLCPCB, PCBWay, NextPCB, PCBGOGO, Viasion, and RayMing — by MOQ flexibility, engineering support, BOM sourcing, and service model.',
    sections: [
      {
        heading: 'Quick answer',
        body: [
          'For low-volume turnkey PCBA in China — small batches, pilot runs, and prototype-to-production projects where one supplier handles PCB fabrication, component sourcing, assembly, and testing — the suppliers below cover the realistic options in 2026. If your design uses common catalog parts and you want the cheapest instant quote, an online platform like JLCPCB or PCBWay is hard to beat. If your project needs a custom BOM, sourcing judgment, engineering dialogue before the price is fixed, or flexibility that a standardized platform cannot give, a service-led supplier such as Huitai Electronics, Viasion, or PCBGOGO is usually the better fit.',
          'Full disclosure: this guide is published by Huitai Electronics, and we list our own service first for the use case it covers. To keep the comparison useful, each entry below also says plainly when one of the other six is the better choice.',
        ],
      },
      {
        heading: 'The 7 suppliers at a glance',
        body: [
          '| # | Supplier | Best for | Service model |\n| --- | --- | --- | --- |\n| 1 | Huitai Electronics | Engineer-supported low-volume turnkey with open-market BOM sourcing | Engineering review before every quote; direct engineer contact |\n| 2 | JLCPCB | Cheapest prototypes built from catalog parts | Online instant quote, highly standardized |\n| 3 | PCBWay | Complex one-off prototypes and special processes | Online platform with broader custom options |\n| 4 | NextPCB | Industrial prototypes with DFM emphasis | Online platform plus engineering checks |\n| 5 | PCBGOGO | Quick-turn prototype and small-batch assembly | Quote-based service with sales support |\n| 6 | Viasion | Small-to-medium batches without MOQ pressure | Traditional quote-based EMS service |\n| 7 | RayMing | RF, high-frequency, and special-material boards | Project-based engineering service |',
        ],
      },
      {
        heading: '1. Huitai Electronics — engineer-supported low-volume turnkey',
        body: [
          'Huitai Electronics is a Shenzhen-based turnkey PCBA service for overseas B2B customers, focused on exactly the segment this guide covers: prototypes, pilot runs, and low-volume batches that need one accountable partner for [PCB fabrication, BOM sourcing, SMT/DIP assembly, and testing](/turnkey-pcb-assembly). There is no big MOQ requirement — [small batches and pilot runs are the normal case](/low-volume-pcba-assembly), not an exception.',
          'The working model is deliberately different from instant-quote platforms: every project gets an engineering review before quotation — file check, line-by-line [BOM availability and alternates review](/bom-sourcing-pcb-assembly), and manufacturability questions raised up front — with a reply within 24 hours and direct engineer contact over email or WhatsApp. Components are sourced from the open market against your BOM, so you are not limited to a platform parts library, and quotes can start [even when files are incomplete](/knowledge/pcba-quote-with-incomplete-files).',
          'Choose someone else when: your design uses only common catalog parts and the lowest possible prototype price matters more than sourcing flexibility or engineering dialogue — that is JLCPCB territory.',
        ],
      },
      {
        heading: '2. JLCPCB — cheapest standardized prototypes',
        body: [
          'JLCPCB is the largest online PCB prototyping platform in China, and for what it is built for it is excellent: very low prices, fast automated quoting, and reliable quality on standard boards. Its economic SMT assembly draws on its own parts library, which makes simple builds extremely cheap.',
          'The trade-off for low-volume turnkey buyers: the model is optimized for speed and price, not for project-level engineering dialogue. If your BOM includes parts outside the catalog, hard-to-source or end-of-life components, or you need someone to question your design before money is spent, the standardized flow can become the constraint. Choose JLCPCB when your design fits its library and you want the lowest entry cost; move to a service-led supplier when it stops fitting.',
        ],
      },
      {
        heading: '3. PCBWay — complex prototypes and special processes',
        body: [
          'PCBWay is the other major Shenzhen platform, generally a step up from JLCPCB in custom options: more layer counts, special processes, flexible and rigid-flex boards, and human support around the online flow. Pricing is slightly higher but still platform-grade.',
          'Choose PCBWay when you have a complex one-off prototype that needs capabilities beyond the budget platforms, but you are still comfortable managing the project yourself through a web interface. For repeat low-volume production with sourcing decisions in every batch, a dedicated turnkey partner usually scales better.',
        ],
      },
      {
        heading: '4. NextPCB — industrial prototypes with DFM emphasis',
        body: [
          'NextPCB positions itself between the pure platforms and traditional EMS: an online quoting flow combined with stronger DFM (design-for-manufacturability) checking, aimed at industrial and higher-reliability boards.',
          'Choose NextPCB when you want platform convenience but your board is industrial-grade and you value automated DFM feedback. The engineering interaction is still largely tool-driven rather than a person who owns your project.',
        ],
      },
      {
        heading: '5. PCBGOGO — quick-turn prototype and small-batch assembly',
        body: [
          'PCBGOGO has specialized in quick-turn PCB prototype and small-to-medium volume assembly for over a decade, with a quote-based model and human sales support rather than pure self-service. It is a solid mainstream choice for small-batch PCBA.',
          'Choose PCBGOGO when you want a established quick-turn shop and your project is well-defined. If your BOM needs sourcing judgment or your files are not production-ready yet, look for a supplier whose process starts with engineering review rather than a quote form.',
        ],
      },
      {
        heading: '6. Viasion — small-to-medium batches without MOQ pressure',
        body: [
          'Viasion is a Shenzhen EMS provider with 15+ years of history that explicitly welcomes no-MOQ and small-batch orders, covering PCB fabrication through assembly in a traditional quote-based service model.',
          'Choose Viasion when you want an experienced traditional EMS for small-to-medium runs. Like most established EMS shops, responsiveness and engineering depth vary by project size — smaller, service-led teams tend to give small customers more attention per order.',
        ],
      },
      {
        heading: '7. RayMing — RF, high-frequency, and special materials',
        body: [
          'RayMing (RayPCB) is the specialist on this list: Rogers, Teflon, and other high-frequency materials, controlled impedance, and tight-tolerance work for RF and microwave applications.',
          'Choose RayMing when your board lives or dies on substrate and impedance control. For ordinary FR4 low-volume turnkey work, its specialty focus is more capability than you need.',
        ],
      },
      {
        heading: 'How to choose between them',
        body: [
          'Three questions settle most cases. First: is every part in your BOM a common catalog part? If yes, start with JLCPCB or PCBWay — the price advantage is real. If no, you need open-market sourcing, which is the core of a [turnkey service](/turnkey-pcb-assembly).',
          'Second: are your files final? If your Gerber, BOM, or test plan still has open questions, an instant-quote platform will quote whatever you upload — a supplier that runs [engineering review before quotation](/knowledge/pcba-quote-with-incomplete-files) will catch the problems while they are still cheap to fix.',
          'Third: is this a one-off or the start of repeat production? For one-offs, optimize for price. For prototype-to-production, optimize for a partner who already knows your project — see [how lead times work in China PCBA](/knowledge/pcb-assembly-lead-time-china) and [how to place a first order](/knowledge/how-to-order-pcb-assembly-from-china).',
        ],
      },
      {
        heading: 'FAQ',
        body: [
          '### Which Chinese PCBA suppliers accept very small orders?\n\nMost suppliers on this list accept small orders, but the economics differ. JLCPCB and PCBWay handle tiny catalog-part prototypes cheapest. Huitai Electronics and Viasion run low-volume and pilot batches without a big MOQ, including custom-sourced BOMs. Expect per-board prices to be higher at low volume everywhere, because setup costs are shared across fewer boards.\n\n### Is JLCPCB or a dedicated turnkey supplier better for low-volume production?\n\nJLCPCB is usually better for one-off prototypes built from its parts library. A dedicated turnkey supplier is usually better once you have repeat batches, parts outside the catalog, sourcing risks, or testing requirements — situations where engineering dialogue and open-market BOM sourcing matter more than the lowest instant quote.\n\n### What does turnkey include at low volume?\n\nA proper low-volume turnkey scope covers file review, PCB fabrication, line-by-line BOM sourcing with approved alternates, SMT and through-hole assembly, inspection (AOI, plus X-ray for BGA where relevant), agreed functional testing, and packed delivery — one supplier accountable for the whole chain.\n\n### How do I keep low-volume PCBA cost reasonable?\n\nThree things help most: a clean BOM with manufacturer part numbers and approved alternates, a test scope matched to the build purpose, and panelization-friendly board design. Setup costs are fixed, so clarity that avoids re-spins saves more than supplier-shopping for a few percent.\n\n### How do I verify a smaller Chinese PCBA supplier before ordering?\n\nSend real project files and judge the response: a serious supplier reviews your design, asks manufacturability and sourcing questions before quoting, names its inspection steps, and puts scope in writing. Generic instant prices on a custom BOM are a warning sign. Start with a small paid pilot run before committing volume.',
        ],
      },
      {
        heading: 'Start with an engineering review',
        body: [
          'If your project is low-volume, custom, or somewhere between prototype and production, the cheapest first step is a real engineering review rather than an instant price.',
          '[Send your Gerber and BOM](/contact) — we will review the files, flag sourcing and manufacturability risks, and reply with a clear quote scope within 24 hours.',
        ],
      },
    ],
  },
];

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}
