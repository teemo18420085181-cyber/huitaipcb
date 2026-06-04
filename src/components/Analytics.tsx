'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type EventParamValue = string | number | boolean;
export type EventParams = Record<string, EventParamValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const DEFAULT_EVENT_TIMEOUT_MS = 900;
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;

function getPagePath() {
  if (typeof window === 'undefined') return '';
  return `${window.location.pathname}${window.location.search}`;
}

function getPageTitle() {
  if (typeof document === 'undefined') return '';
  return document.title || '';
}

function isDebugModeEnabled() {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  return params.get('ga_debug') === '1' || window.localStorage.getItem('ga_debug') === 'true';
}

function getEventParams(params?: EventParams): EventParams {
  const eventParams: EventParams = {
    page_path: getPagePath(),
    ...params,
    transport_type: 'beacon',
  };

  if (isDebugModeEnabled()) {
    eventParams.debug_mode = true;
  }

  return eventParams;
}

export function trackEvent(
  name: string,
  params?: EventParams,
  options?: { timeoutMs?: number },
): boolean {
  if (typeof window === 'undefined') return false;

  const timeoutMs = options?.timeoutMs ?? DEFAULT_EVENT_TIMEOUT_MS;
  const eventParams = getEventParams(params);

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, {
      ...eventParams,
      event_timeout: timeoutMs,
    });
    return true;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: name,
      ...eventParams,
    });
    return true;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[GA4] skipped event "${name}" because gtag/dataLayer is not ready`);
  }

  return false;
}

export default function Analytics() {
  const gaId = GA_ID;
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

    window.gtag?.('config', gaId, {
      page_path: pagePath,
      ...(isDebugModeEnabled() ? { debug_mode: true } : {}),
    });
  }, [gaId, pathname]);

  useEffect(() => {
    if (!gaId) return;

    if (pathname !== '/contact') return;

    void trackEvent('contact_page_view', {
      page_path: '/contact',
      page_title: getPageTitle(),
    });
  }, [gaId, pathname]);

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);}
          var gaDebug = new URLSearchParams(window.location.search).get('ga_debug') === '1' || window.localStorage.getItem('ga_debug') === 'true';
          window.gtag('js', new Date());
          window.gtag('config', '${gaId}', {
            page_path: window.location.pathname + window.location.search,
            ...(gaDebug ? { debug_mode: true } : {})
          });
        `}
      </Script>
    </>
  );
}
