'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params || {});
}

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId || !window.gtag) return;
    const query = window.location.search.replace(/^\?/, '');
    window.gtag('config', gaId, {
      page_path: query ? `${pathname}?${query}` : pathname,
    });
  }, [gaId, pathname]);

  useEffect(() => {
    if (!gaId) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const text = link.textContent?.trim().toLowerCase() || '';
      if (link.href.includes('/contact') && /(quote|upload|rfq|engineer)/.test(text)) {
        trackEvent('click_quote_button', {
          link_text: link.textContent?.trim() || 'contact_cta',
          link_url: link.href,
        });
      }
      if (link.href.startsWith('mailto:')) {
        trackEvent('click_email', { link_url: link.href });
      }
      if (link.href.includes('wa.me') || link.href.includes('whatsapp')) {
        trackEvent('click_whatsapp', { link_url: link.href });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [gaId]);

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
