'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (process.env.NEXT_PUBLIC_GA_ENABLE_EVENTS === 'false') return;
  window.gtag('event', name, params || {});
}

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const initialPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!gaId) return;
    const query = window.location.search.replace(/^\?/, '');
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (!initialPathRef.current) {
      initialPathRef.current = pagePath;
      return;
    }

    window.gtag?.('config', gaId, { page_path: pagePath });
  }, [gaId, pathname]);

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname + window.location.search
          });
        `}
      </Script>
    </>
  );
}
