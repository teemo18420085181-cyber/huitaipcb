import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getKnowledgeArticle, knowledgeArticles } from '@/lib/content/knowledge';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `https://huitaipcb.com/knowledge/${article.slug}` },
    openGraph: { url: `https://huitaipcb.com/knowledge/${article.slug}` },
  };
}

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Nav />
      <main className="pt-[64px] min-h-screen bg-bg">
        <article>
          <section className="relative px-[5vw] py-16 md:py-20 bg-brand-primary text-white overflow-hidden">
            <div className="relative z-10 max-w-[980px] mx-auto">
              <Link href="/knowledge" className="text-xs text-white/60 hover:text-white transition-colors">
                ← Knowledge Base
              </Link>
              <div className="mt-6 inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-5 font-medium">
                {article.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight max-w-[760px]">
                {article.title}
              </h1>
              <p className="text-base text-white/70 leading-relaxed mt-5 max-w-[680px]">
                {article.excerpt}
              </p>
            </div>
          </section>

          <section className="px-[5vw] py-12">
            <div className="max-w-[980px] mx-auto grid lg:grid-cols-[minmax(0,1fr)_280px] gap-8">
              <div className="bg-white border border-line rounded-2xl overflow-hidden">
                <div className="relative h-64 bg-brand-primary-dark">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                </div>
                <div className="p-7 md:p-9 space-y-8">
                  {article.sections.map((section) => (
                    <section key={section.heading} className="space-y-3">
                      <h2 className="text-2xl font-semibold text-brand-primary">{section.heading}</h2>
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-sm text-ink-muted leading-7">
                          {paragraph}
                        </p>
                      ))}
                    </section>
                  ))}
                </div>
              </div>

              <aside className="lg:sticky lg:top-24 h-fit bg-white border border-line rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-brand-primary mb-3">Need a PCB assembly quote?</h2>
                <p className="text-sm text-ink-muted leading-6 mb-5">
                  Upload Gerber, BOM, drawings, sample photos, or testing requirements for engineering review.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full justify-center bg-brand-yellow text-brand-primary text-sm font-semibold py-3 px-5 rounded-lg hover:-translate-y-0.5 transition-all"
                >
                  Upload Gerber & BOM
                </Link>
              </aside>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
