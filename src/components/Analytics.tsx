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
const DEFAULT_GTAG_WAIT_MS = 2500;
const GTAG_RETRY_INTERVAL_MS = 150;
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

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
}

export function trackEvent(
  name: string,
  params?: EventParams,
  options?: { timeoutMs?: number; waitForGtagMs?: number },
): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (!GA_ID) return Promise.resolve(false);
  if (process.env.NEXT_PUBLIC_GA_ENABLE_EVENTS === 'false') return Promise.resolve(false);

  ensureGtagQueue();

  const startedAt = Date.now();
  const timeoutMs = options?.timeoutMs ?? DEFAULT_EVENT_TIMEOUT_MS;
  const waitForGtagMs = options?.waitForGtagMs ?? DEFAULT_GTAG_WAIT_MS;

  return new Promise((resolve) => {
    const trySend = () => {
      if (typeof window.gtag !== 'function') {
        if (Date.now() - startedAt >= waitForGtagMs) {
          resolve(false);
          return;
        }

        window.setTimeout(trySend, GTAG_RETRY_INTERVAL_MS);
        return;
      }

      let resolved = false;
      const finish = () => {
        if (resolved) return;
        resolved = true;
        resolve(true);
      };

      window.setTimeout(finish, timeoutMs);
      window.gtag('event', name, {
        ...getEventParams(params),
        event_callback: finish,
        event_timeout: timeoutMs,
      });
    };

    trySend();
  });
}

export default function Analytics() {
  const gaId = GA_ID;
  const pathname = usePathname();
  const initialPathRef = useRef<string | null>(null);
  const contactPageTrackedRef = useRef<string | null>(null);

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

    if (pathname !== '/contact') {
      contactPageTrackedRef.current = null;
      return;
    }

    if (contactPageTrackedRef.current === pathname) return;
    contactPageTrackedRef.current = pathname;
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
          function gtag(){dataLayer.push(arguments);}
          var gaDebug = new URLSearchParams(window.location.search).get('ga_debug') === '1' || window.localStorage.getItem('ga_debug') === 'true';
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname + window.location.search,
            ...(gaDebug ? { debug_mode: true } : {})
          });
        `}
      </Script>
    </>
  );
}
