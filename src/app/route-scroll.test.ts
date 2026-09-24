import { afterEach, describe, expect, it, vi } from 'vitest';
import { disableSmoothScrollDuringRouteTransition } from 'next/dist/shared/lib/router/utils/disable-smooth-scroll';

vi.mock('next/font/google', () => ({
  Bricolage_Grotesque: () => ({ variable: 'display-font' }),
  Hanken_Grotesk: () => ({ variable: 'body-font' }),
  JetBrains_Mono: () => ({ variable: 'mono-font' }),
}));
vi.mock('@/components/Analytics', () => ({ default: () => null }));
vi.mock('@/components/FloatingWhatsApp', () => ({ default: () => null }));
import EnglishLayout from './(en)/layout';
import GermanLayout from './de/layout';

afterEach(() => vi.unstubAllGlobals());

describe('Next route scrolling with global smooth CSS', () => {
  it.each([['EN', EnglishLayout], ['DE', GermanLayout]] as const)(
    '%s lets Next position cross-page anchors synchronously, then restores CSS control', (_locale, Layout) => {
      const root = Layout({ children: null });
      const html = {
        dataset: { scrollBehavior: root.props['data-scroll-behavior'] },
        style: { scrollBehavior: '' },
        getClientRects: () => [],
      };
      vi.stubGlobal('document', { documentElement: html });
      let duringNavigation = '';
      disableSmoothScrollDuringRouteTransition(() => {
        duringNavigation = html.style.scrollBehavior;
      });
      expect(duringNavigation).toBe('auto');
      // Empty inline style lets the existing prefers-reduced-motion CSS win afterward.
      expect(html.style.scrollBehavior).toBe('');
    },
  );
});
