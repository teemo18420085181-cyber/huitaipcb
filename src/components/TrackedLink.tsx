'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/components/Analytics';

type TrackedLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    eventName?: string;
    eventParams?: Record<string, string | number | boolean>;
  };

const TRACKED_NAVIGATION_DELAY_MS = 200;

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function hrefToString(href: LinkProps['href']) {
  if (typeof href === 'string') return href;

  const pathname = href.pathname || '';
  const query =
    href.query && Object.keys(href.query).length > 0
      ? `?${new URLSearchParams(
          Object.entries(href.query).reduce<Record<string, string>>((acc, [key, value]) => {
            if (value == null) return acc;
            acc[key] = Array.isArray(value) ? value.join(',') : String(value);
            return acc;
          }, {}),
        ).toString()}`
      : '';
  const hash = href.hash ? (href.hash.startsWith('#') ? href.hash : `#${href.hash}`) : '';

  return `${pathname}${query}${hash}`;
}

export default function TrackedLink({
  href,
  eventName,
  eventParams,
  onClick,
  replace,
  scroll,
  target,
  ...props
}: TrackedLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (!eventName) return;

    const link = event.currentTarget;
    const buttonText = link.textContent?.replace(/\s+/g, ' ').trim();
    const hrefString = hrefToString(href);

    if (isModifiedClick(event) || target === '_blank' || link.hasAttribute('download')) {
      trackEvent(eventName, {
        ...(eventParams || {}),
        ...(buttonText ? { button_text: buttonText } : {}),
      });
      return;
    }

    if (!hrefString || hrefString.startsWith('http') || hrefString.startsWith('mailto:') || hrefString.startsWith('tel:')) {
      trackEvent(eventName, {
        ...(eventParams || {}),
        ...(buttonText ? { button_text: buttonText } : {}),
      });
      return;
    }

    event.preventDefault();
    trackEvent(eventName, {
      ...(eventParams || {}),
      ...(buttonText ? { button_text: buttonText } : {}),
    });

    window.setTimeout(() => {
      if (replace) {
        router.replace(hrefString, { scroll });
      } else {
        router.push(hrefString, { scroll });
      }
    }, TRACKED_NAVIGATION_DELAY_MS);
  };

  return <Link {...props} href={href} replace={replace} scroll={scroll} target={target} onClick={handleClick} />;
}
