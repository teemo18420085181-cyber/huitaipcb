import { afterEach, describe, expect, it, vi } from 'vitest';
import PreviewWebsiteLayout, { metadata } from './layout';
import HomepagePreview from './page';
import CompanyPreviewPage from './company/page';
import AboutPreviewPage from './about/page';
import WorkflowPreviewPage from './how-we-work/page';

afterEach(() => vi.unstubAllEnvs());

describe('V3 website preview exposure boundary', () => {
  // Next may serialize leaf output into Flight even when a parent layout returns 404.
  it.each([
    ['homepage', HomepagePreview],
    ['company', CompanyPreviewPage],
    ['about', AboutPreviewPage],
    ['workflow', WorkflowPreviewPage],
  ] as const)('blocks the %s leaf before it can serialize preview content', (_name, Page) => {
    for (const environment of ['production', 'test']) {
      vi.stubEnv('NODE_ENV', environment);
      expect(() => Page()).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    }
    vi.stubEnv('NODE_ENV', 'development');
    expect(Page()).toBeTruthy();
  });
  it.each(['production', 'test'])('returns a real Next 404 in %s', environment => {
    vi.stubEnv('NODE_ENV', environment);
    expect(() => PreviewWebsiteLayout({ children: 'private preview' })).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });

  it('renders in development and explicitly prevents indexing', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(PreviewWebsiteLayout({ children: 'preview' }).props.children).toBe('preview');
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
