import type {
  AnalyticsRetryState,
  DeliveryStatus,
} from '@/lib/inquiry/types';

interface GenerateLeadInput {
  analyticsEventId: string;
  gaClientId?: string;
  gaSessionId?: string;
  pagePath?: string;
}

interface AnalyticsDeliveryOptions {
  measurementId?: string;
  apiSecret?: string;
  siteUrl?: string;
  fetchImpl?: typeof fetch;
}

export interface AnalyticsDeliveryResult {
  /** `sent` means the Measurement Protocol request returned HTTP 2xx only. */
  status: Exclude<DeliveryStatus, 'pending'>;
  retryState: AnalyticsRetryState;
  errorCode?: string;
}

interface PersistedAnalyticsState {
  status: Exclude<DeliveryStatus, 'pending'>;
  retryState: AnalyticsRetryState;
  analyticsEventId: string;
}

function safePageLocation(siteUrl: string | undefined, pagePath: string | undefined) {
  if (!siteUrl || !pagePath?.startsWith('/')) return undefined;
  try {
    return new URL(new URL(pagePath, 'https://huitaipcb.invalid').pathname, siteUrl).toString();
  } catch {
    return undefined;
  }
}

export async function sendGenerateLead(
  input: GenerateLeadInput,
  options: AnalyticsDeliveryOptions = {}
): Promise<AnalyticsDeliveryResult> {
  const measurementId = options.measurementId ?? process.env.GA4_MEASUREMENT_ID;
  const apiSecret = options.apiSecret ?? process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) {
    return {
      status: 'skipped_unconfigured',
      retryState: 'safe',
      errorCode: 'ga_unconfigured',
    };
  }

  const eventParams: Record<string, string | number> = {
    event_id: input.analyticsEventId,
    engagement_time_msec: 1,
  };
  if (input.gaSessionId) eventParams.session_id = input.gaSessionId;
  const pageLocation = safePageLocation(
    options.siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL,
    input.pagePath
  );
  if (pageLocation) eventParams.page_location = pageLocation;

  const endpoint = new URL('https://www.google-analytics.com/mp/collect');
  endpoint.searchParams.set('measurement_id', measurementId);
  endpoint.searchParams.set('api_secret', apiSecret);

  try {
    const response = await (options.fetchImpl ?? fetch)(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: input.gaClientId ?? input.analyticsEventId,
        events: [{ name: 'generate_lead', params: eventParams }],
      }),
    });

    if (!response.ok) {
      return {
        status: 'failed',
        retryState: 'safe',
        errorCode: `ga_http_${response.status}`,
      };
    }

    return { status: 'sent', retryState: 'not_needed' };
  } catch {
    return {
      status: 'failed',
      retryState: 'manual_review',
      errorCode: 'ga_network_ambiguous',
    };
  }
}

export function classifyAnalyticsReplay(
  persisted: PersistedAnalyticsState,
  requestedEventId: string
): boolean {
  if (persisted.analyticsEventId !== requestedEventId) return false;
  if (persisted.retryState !== 'safe') return false;
  return persisted.status === 'failed'
    || persisted.status === 'skipped_unconfigured';
}
