import { describe, expect, it, vi } from 'vitest';
import { classifyAnalyticsReplay, sendGenerateLead } from './server';

const delivery = {
  analyticsEventId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  gaClientId: '123456.987654',
  gaSessionId: '1756684800',
  pagePath: '/contact',
};

describe('sendGenerateLead', () => {
  it('sends one non-PII generate_lead payload with the persisted event ID', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));

    const result = await sendGenerateLead(delivery, {
      measurementId: 'G-TEST123',
      apiSecret: 'secret',
      fetchImpl,
    });

    expect(result).toMatchObject({ status: 'sent', retryState: 'not_needed' });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(String(url)).toContain('measurement_id=G-TEST123');
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      client_id: '123456.987654',
      events: [{
        name: 'generate_lead',
        params: {
          event_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          session_id: '1756684800',
        },
      }],
    });
    expect(JSON.stringify(body)).not.toContain('email');
    expect(JSON.stringify(body)).not.toContain('file');
    expect(JSON.stringify(body)).not.toContain('inquiry');
  });

  it('uses the analytics event ID as an unattributed client fallback', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    await sendGenerateLead({ ...delivery, gaClientId: undefined }, {
      measurementId: 'G-TEST123', apiSecret: 'secret', fetchImpl,
    });

    const body = JSON.parse(String(fetchImpl.mock.calls[0][1].body));
    expect(body.client_id).toBe(delivery.analyticsEventId);
  });

  it('skips delivery when server GA configuration is missing', async () => {
    const fetchImpl = vi.fn();
    const result = await sendGenerateLead(delivery, {
      measurementId: undefined,
      apiSecret: undefined,
      fetchImpl,
    });

    expect(result).toEqual({
      status: 'skipped_unconfigured',
      retryState: 'safe',
      errorCode: 'ga_unconfigured',
    });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('marks a definite HTTP rejection safe for a future controlled replay', async () => {
    const result = await sendGenerateLead(delivery, {
      measurementId: 'G-TEST123',
      apiSecret: 'secret',
      fetchImpl: vi.fn().mockResolvedValue(new Response(null, { status: 400 })),
    });
    expect(result).toEqual({
      status: 'failed', retryState: 'safe', errorCode: 'ga_http_400',
    });
  });

  it('marks a network outcome for manual review rather than blind replay', async () => {
    const result = await sendGenerateLead(delivery, {
      measurementId: 'G-TEST123',
      apiSecret: 'secret',
      fetchImpl: vi.fn().mockRejectedValue(new Error('timeout')),
    });
    expect(result).toEqual({
      status: 'failed', retryState: 'manual_review', errorCode: 'ga_network_ambiguous',
    });
  });
});

describe('classifyAnalyticsReplay', () => {
  it('allows only a persisted safe state and requires the same event ID', () => {
    expect(classifyAnalyticsReplay({
      status: 'failed', retryState: 'safe', analyticsEventId: delivery.analyticsEventId,
    }, delivery.analyticsEventId)).toBe(true);
    expect(classifyAnalyticsReplay({
      status: 'failed', retryState: 'manual_review', analyticsEventId: delivery.analyticsEventId,
    }, delivery.analyticsEventId)).toBe(false);
    expect(classifyAnalyticsReplay({
      status: 'sent', retryState: 'not_needed', analyticsEventId: delivery.analyticsEventId,
    }, delivery.analyticsEventId)).toBe(false);
    expect(classifyAnalyticsReplay({
      status: 'failed', retryState: 'safe', analyticsEventId: delivery.analyticsEventId,
    }, 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb')).toBe(false);
  });
});
