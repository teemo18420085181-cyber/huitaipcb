'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackEvent } from '@/components/Analytics';

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName?: string;
  eventParams?: Record<string, string | number | boolean>;
};

const TRACKED_ANCHOR_DELAY_MS = 180;

export default function TrackedAnchor({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedAnchorProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (!eventName) return;

    const anchor = event.currentTarget;
    const href = anchor.getAttribute('href') || '';
    const buttonText = anchor.textContent?.replace(/\s+/g, ' ').trim();
    const email = href.startsWith('mailto:') ? href.replace(/^mailto:/, '').split('?')[0] : undefined;
    const params = {
      ...(eventParams || {}),
      ...(buttonText ? { button_text: buttonText } : {}),
      ...(email ? { email } : {}),
    };

    const shouldDelayDefault =
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      event.button === 0 &&
      !anchor.hasAttribute('download') &&
      !props.target &&
      (href.startsWith('mailto:') || href.startsWith('tel:'));

    if (!shouldDelayDefault) {
      trackEvent(eventName, params);
      return;
    }

    event.preventDefault();
    trackEvent(eventName, params);
    window.setTimeout(() => {
      window.location.href = href;
    }, TRACKED_ANCHOR_DELAY_MS);
  };

  return <a {...props} onClick={handleClick} />;
}
