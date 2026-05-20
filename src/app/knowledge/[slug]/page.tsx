import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getKnowledgeDisplayArticle } from '@/lib/content/articles';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getKnowledgeDisplayArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Huitai Electronics',
      alternates: { canonical: `https://huitaipcb.com/knowledge/${slug}` },
      openGraph: { url: `https://huitaipcb.com/knowledge/${slug}` },
    };
  }

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `https://huitaipcb.com/knowledge/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://huitaipcb.com/knowledge/${article.slug}`,
      images: [article.image],
      type: 'article',
    },
  };
}

function imageUrl(src: string) {
  return src.startsWith('http') ? src : `https://huitaipcb.com${src}`;
}

function ArticleImage({ src, title }: { src: string; title: string }) {
  if (src.startsWith('http')) {
    return <img src={src} alt={title} className="h-full w-full object-cover" />;
  }

  return (
    <Image
      src={src}
      alt={title}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 700px"
    />
  );
}

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getKnowledgeDisplayArticle(slug);

  if (!article) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-bg px-[5vw] pt-[120px]">
          <div className="mx-auto max-w-[720px] rounded-2xl border border-line bg-white p-10 text-center">
            <h1 className="text-2xl font-semibold text-brand-primary">Article not found</h1>
            <p className="mt-3 text-sm leading-6 text-ink-muted">
              This guide may have been moved, unpublished, or is still being prepared by our engineering team.
            </p>
            <Link
              href="/knowledge"
              className="mt-6 inline-flex rounded-lg bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-primary transition hover:-translate-y-0.5"
            >
              Back to Knowledge Base
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const articleUrl = `https://huitaipcb.com/knowledge/${article.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: imageUrl(article.image),
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Huitai Electronics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://huitaipcb.com/logo.svg',
      },
    },
    datePublished: article.publishedAt || undefined,
    dateModified: article.publishedAt || undefined,
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg pt-[64px]">
        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <section className="relative overflow-hidden bg-brand-primary px-[5vw] py-16 text-white md:py-20">
            <div className="relative z-10 mx-auto max-w-[980px]">
              <Link href="/knowledge" className="text-xs text-white/60 transition-colors hover:text-white">
                ← Knowledge Base
              </Link>
              <div className="mb-5 mt-6 inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-brand-yellow">
                {article.category}
              </div>
              <h1 className="max-w-[760px] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-[680px] text-base leading-relaxed text-white/70">
                {article.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/55">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </section>

          <section className="px-[5vw] py-12">
            <div className="mx-auto grid max-w-[980px] gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative h-64 bg-brand-primary-dark">
                  <ArticleImage src={article.image} title={article.title} />
                </div>
                <div className="p-7 md:p-9">
                  <div className="space-y-5 text-sm leading-7 text-ink-muted">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: ({ children }) => (
                          <h2 className="pt-4 text-2xl font-semibold leading-tight text-brand-primary">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="pt-3 text-lg font-semibold leading-tight text-brand-primary">{children}</h3>
                        ),
                        p: ({ children }) => <p>{children}</p>,
                        ul: ({ children }) => <ul className="list-disc space-y-2 pl-5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal space-y-2 pl-5">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        a: ({ children, href }) => (
                          <a href={href} className="font-medium text-brand-primary underline underline-offset-4">
                            {children}
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="rounded bg-bg-muted px-1.5 py-0.5 text-xs text-brand-primary">{children}</code>
                        ),
                        pre: ({ children }) => (
                          <pre className="overflow-x-auto rounded-xl bg-brand-primary p-4 text-xs leading-6 text-white">
                            {children}
                          </pre>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">{children}</table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-line bg-bg-muted px-3 py-2 font-semibold text-brand-primary">{children}</th>
                        ),
                        td: ({ children }) => <td className="border border-line px-3 py-2">{children}</td>,
                      }}
                    >
                      {article.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              <aside className="h-fit rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-24">
                <h2 className="mb-3 text-lg font-semibold text-brand-primary">Need a PCB assembly quote?</h2>
                <p className="mb-5 text-sm leading-6 text-ink-muted">
                  Upload Gerber, BOM, drawings, sample photos, or testing requirements for engineering review.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full justify-center rounded-lg bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-primary transition-all hover:-translate-y-0.5"
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
