import { notFound } from 'next/navigation';
import SeoLandingPage from '@/components/SeoLandingPage';
import { dictionaries } from '@/lib/i18n/dictionary';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';
import { OG_IMAGES } from '@/lib/seo/og';

const deServiceSlugs = [
  'turnkey-pcb-assembly',
  'china-pcb-assembly',
  'bom-sourcing-pcb-assembly',
  'prototype-pcb-assembly',
] as const;

type DeServiceSlug = (typeof deServiceSlugs)[number];
type PageProps = { params: Promise<{ slug: string }> };

function isDeServiceSlug(slug: string): slug is DeServiceSlug {
  return deServiceSlugs.includes(slug as DeServiceSlug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return deServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!isDeServiceSlug(slug)) {
    return {};
  }

  const page = dictionaries.de.seoPages[slug];
  const englishPath = `/${slug}`;
  const germanPath = `/de/${slug}`;

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: {
      canonical: absoluteUrl(germanPath),
      languages: getLanguageAlternates(englishPath),
    },
    openGraph: {
      images: OG_IMAGES,
      title: page.seoTitle,
      description: page.metaDescription,
      url: absoluteUrl(germanPath),
      locale: 'de_DE',
      siteName: 'Huitai Electronics',
    },
  };
}

export default async function GermanSeoLandingPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isDeServiceSlug(slug)) {
    notFound();
  }

  return <SeoLandingPage page={dictionaries.de.seoPages[slug]} locale="de" />;
}
