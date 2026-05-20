import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { knowledgeArticles as KB_ARTICLES } from '@/lib/content/knowledge';

export const metadata = {
  title: 'PCB Assembly Knowledge Base | PCBA Guides for Hardware Teams',
  description:
    'Practical PCB assembly guides covering PCBA quote files, turnkey PCBA manufacturing, BOM best practices, Gerber preparation, prototype assembly, and sourcing review.',
  alternates: { canonical: 'https://huitaipcb.com/knowledge' },
};

const ARTICLES = [
  {
    slug: 'what-files-required-pcba-quote',
    category: 'Getting Started',
    categoryColor: 'bg-brand-yellow/15 text-brand-primary border-brand-yellow/30',
    title: 'What files are required for a PCBA quote?',
    excerpt:
      'A complete guide to Gerber files, BOM format, pick-and-place data, drill files, and assembly notes — what to prepare, what to skip, and how to send them.',
    image: '/factory/flow-01.png',
    readTime: '5 min read',
    status: 'published',
  },
  {
    slug: 'what-is-turnkey-pcba',
    category: 'Fundamentals',
    categoryColor: 'bg-brand-primary/8 text-brand-primary border-brand-primary/15',
    title: 'What is turnkey PCBA manufacturing?',
    excerpt:
      'How turnkey works vs. consignment assembly, what happens at each stage from file review to shipping, and why most hardware startups choose the turnkey model.',
    image: '/factory/real-smt-1.jpg',
    readTime: '6 min read',
    status: 'published',
  },
  {
    slug: 'full-vs-partial-turnkey',
    category: 'Decision Guide',
    categoryColor: 'bg-brand-green/10 text-brand-green-dark border-brand-green/20',
    title: 'Full turnkey vs partial turnkey — how to decide',
    excerpt:
      'When to ship your own components vs having the CM source everything. Cost breakdown, lead time tradeoffs, and component risk comparison for both approaches.',
    image: '/factory/real-reels.jpg',
    readTime: '7 min read',
    status: 'published',
  },
  {
    slug: 'dfm-checklist-gerber',
    category: 'Engineering',
    categoryColor: 'bg-brand-yellow/15 text-brand-primary border-brand-yellow/30',
    title: 'DFM checklist before submitting your Gerber files',
    excerpt:
      'The 12 most common manufacturability issues we flag — trace widths, drill sizes, silkscreen overlap, copper-to-edge distance, missing courtyard data, and more.',
    image: '/factory/qua-03.png',
    readTime: '8 min read',
    status: 'published',
  },
  {
    slug: 'bom-best-practices',
    category: 'Sourcing',
    categoryColor: 'bg-brand-primary/8 text-brand-primary border-brand-primary/15',
    title: 'BOM best practices for fast sourcing and quoting',
    excerpt:
      'Required columns, manufacturer part numbers vs. generic specs, lifecycle status flags, alternate part suggestions, and how to handle components you already own.',
    image: '/factory/flow-02.png',
    readTime: '6 min read',
    status: 'published',
  },
  {
    slug: 'shipping-pcba-internationally',
    category: 'Shipping',
    categoryColor: 'bg-brand-green/10 text-brand-green-dark border-brand-green/20',
    title: 'Shipping PCBAs internationally — what to expect',
    excerpt:
      'Anti-static packaging requirements, lithium battery rules, customs documentation, DDP vs DAP explained, typical lead times by destination, and how to track your shipment.',
    image: '/factory/real-ship-1.jpg',
    readTime: '5 min read',
    status: 'published',
  },
];

const COMING_SOON = [
  'How to write a functional test specification for your CM',
  'Understanding IPC Class II vs Class III — when does it matter?',
  'Surface finish comparison: HASL vs ENIG vs OSP',
  'How to manage component obsolescence in a long-run product',
  'First article inspection (FAI) — what to check and when to require it',
  'Rigid-flex design rules your CM actually wants you to follow',
];

export default function KnowledgePage() {
  return (
    <>
      <Nav />
      <main className="pt-[64px] min-h-screen bg-bg">
        {/* Hero */}
        <section className="relative px-[5vw] py-16 md:py-24 bg-brand-primary text-white overflow-hidden">
          <div
            className="absolute -top-[100px] right-[10%] w-[300px] h-[300px] rounded-full opacity-30"
            style={{ background: '#FCEA0B', filter: 'blur(100px)' }}
          />
          <div
            className="absolute -bottom-[100px] left-[10%] w-[280px] h-[280px] rounded-full opacity-20"
            style={{ background: '#93C249', filter: 'blur(100px)' }}
          />
          <div className="relative z-10 max-w-[1080px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
              <span
                className="w-1.5 h-1.5 rounded-full bg-brand-yellow"
                style={{ boxShadow: '0 0 12px #FCEA0B' }}
              />
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
              Guides written by engineers,
              <br />
              <em className="not-italic text-brand-yellow">not marketers.</em>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[620px] mx-auto">
              Practical articles covering everything from your first Gerber file
              submission to managing volume production. New guides added regularly
              based on what customers ask us most.
            </p>
          </div>
        </section>

        {/* Article cards */}
        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {KB_ARTICLES.map((a) => (
                <Link
                  key={a.slug}
                  href={`/knowledge/${a.slug}`}
                  className="group bg-white border border-line rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-brand-primary-dark">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover opacity-90 group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/50 to-transparent" />
                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full border backdrop-blur-sm ${a.categoryColor}`}
                      >
                        {a.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h2 className="text-base font-semibold text-brand-primary leading-tight mb-2 group-hover:text-brand-primary-light transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-sm text-ink-muted leading-relaxed flex-1">
                      {a.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
                      <span className="text-[11px] text-ink-muted">{a.readTime}</span>
                      <span className="text-xs font-medium text-brand-primary group-hover:text-brand-green-dark transition-colors">
                        Read guide →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Coming soon */}
        <section className="px-[5vw] pb-16">
          <div className="max-w-[1280px] mx-auto">
            <div className="bg-brand-primary-dark rounded-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                <div>
                  <div className="text-[11px] text-brand-yellow font-semibold tracking-[0.16em] mb-3">
                    COMING SOON
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                    More guides in progress
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {COMING_SOON.map((title, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="text-brand-yellow mt-0.5 flex-shrink-0">·</span>
                        {title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="bg-white/[0.05] border border-white/10 rounded-xl p-6 text-center min-w-[220px]">
                    <div className="text-sm font-medium text-white mb-1">
                      Have a topic request?
                    </div>
                    <div className="text-xs text-white/50 mb-4 leading-relaxed">
                      Tell us what you&apos;d like us to cover and we&apos;ll prioritize it.
                    </div>
                    <Link
                      href="/contact"
                      className="inline-block bg-brand-yellow text-brand-primary text-xs font-semibold py-2.5 px-5 rounded-lg hover:-translate-y-0.5 transition-all"
                    >
                      Suggest a topic →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
