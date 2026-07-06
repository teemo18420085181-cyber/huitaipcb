import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getKnowledgeIndexArticles, type KnowledgeDisplayArticle } from '@/lib/content/articles';
import { OG_IMAGES } from '@/lib/seo/og';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'PCB Assembly Knowledge Base | PCBA Guides for Hardware Teams',
  description:
    'Practical PCB assembly guides covering PCBA quote files, turnkey PCBA manufacturing, BOM best practices, Gerber preparation, prototype assembly, and sourcing review.',
  alternates: { canonical: 'https://huitaipcb.com/knowledge' },
  openGraph: {
    title: 'PCB Assembly Knowledge Base | PCBA Guides for Hardware Teams',
    description:
      'Practical PCB assembly guides for overseas buyers preparing Gerber files, BOM lists, sourcing requirements, testing plans, and PCBA quotations.',
    url: 'https://huitaipcb.com/knowledge',
    images: OG_IMAGES,
  },
};

const COMING_SOON = [
  'How to write a functional test specification for your CM',
  'Understanding IPC Class II vs Class III: when does it matter?',
  'Surface finish comparison: HASL vs ENIG vs OSP',
  'How to manage component obsolescence in a long-run product',
  'First article inspection (FAI): what to check and when to require it',
  'Rigid-flex design rules your CM actually wants you to follow',
];

function ArticleImage({ article }: { article: KnowledgeDisplayArticle }) {
  if (article.image.startsWith('http')) {
    return (
      <img
        src={article.image}
        alt={article.imageAlt}
        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <Image
      src={article.image}
      alt={article.imageAlt}
      fill
      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}

export default async function KnowledgePage() {
  const articles = await getKnowledgeIndexArticles();

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-[64px]">
        <section className="relative overflow-hidden bg-cc-carbon-2 px-[5vw] py-16 text-white md:py-24">
          <div
            className="absolute -top-[100px] right-[10%] h-[300px] w-[300px] rounded-full opacity-30"
            style={{ background: '#E6A85A', filter: 'blur(100px)' }}
          />
          <div
            className="absolute -bottom-[100px] left-[10%] h-[280px] w-[280px] rounded-full opacity-20"
            style={{ background: '#9EE34F', filter: 'blur(100px)' }}
          />
          <div className="relative z-10 mx-auto max-w-[1080px] text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cc-copper/40 bg-cc-copper/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-cc-copper-soft">
              <span
                className="h-1.5 w-1.5 rounded-full bg-cc-copper"
                style={{ boxShadow: '0 0 12px #E6A85A' }}
              />
              KNOWLEDGE BASE
            </div>
            <h1 className="mb-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[52px]">
              PCB Assembly Knowledge Base
              <br />
              <em className="not-italic text-cc-copper-soft">PCBA guides for real RFQ work.</em>
            </h1>
            <p className="mx-auto max-w-[620px] text-base leading-relaxed text-white/70 md:text-lg">
              PCBA guides for Gerber files, BOM sourcing, prototype assembly,
              sample board review, and turnkey PCB assembly in China. New guides
              are based on the questions overseas PCBA buyers ask before quotation.
            </p>
          </div>
        </section>

        <section className="px-[5vw] py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/knowledge/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden bg-cc-carbon">
                    <ArticleImage article={article} />
                    <div className="absolute inset-0 bg-gradient-to-t from-cc-carbon-2/50 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-sm ${article.categoryColor}`}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="mb-2 text-base font-semibold leading-tight text-cc-ink transition-colors group-hover:text-cc-ink-light">
                      {article.title}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-cc-ink-mute">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-cc-line pt-4">
                      <span className="text-[11px] text-cc-ink-mute">{article.readTime}</span>
                      <span className="text-xs font-medium text-cc-ink transition-colors group-hover:text-cc-signal">
                        Read guide &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5vw] pb-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="rounded-2xl bg-cc-carbon p-8 md:p-10">
              <div className="grid items-start gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                    COMING SOON
                  </div>
                  <h2 className="mb-4 text-xl font-semibold text-white md:text-2xl">
                    More guides in progress
                  </h2>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {COMING_SOON.map((title) => (
                      <div key={title} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="mt-0.5 flex-shrink-0 text-cc-copper-soft">-</span>
                        {title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="min-w-[220px] rounded-xl border border-white/10 bg-cc-carbon-2/[0.05] p-6 text-center">
                    <div className="mb-1 text-sm font-medium text-white">
                      Have a topic request?
                    </div>
                    <div className="mb-4 text-xs leading-relaxed text-white/50">
                      Tell us what you&apos;d like us to cover and we&apos;ll prioritize it.
                    </div>
                    <Link
                      href="/#customer-qa"
                      className="inline-block rounded-lg bg-cc-copper px-5 py-2.5 text-xs font-semibold text-cc-ink transition-all hover:-translate-y-0.5"
                    >
                      Suggest a topic &rarr;
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
