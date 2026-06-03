'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackEvent } from '@/components/Analytics';

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
};

export default function TrackedAnchor({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedAnchorProps) {
  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const anchor = event.currentTarget;
    const href = anchor.getAttribute('href') || '';
    const buttonText = anchor.textContent?.replace(/\s+/g, ' ').trim();
    const email = href.startsWith('mailto:') ? href.replace(/^mailto:/, '').split('?')[0] : undefined;
    const trackingPromise = trackEvent(
      eventName,
      {
        ...(eventParams || {}),
        ...(buttonText ? { button_text: buttonText } : {}),
        ...(email ? { email } : {}),
      },
      { timeoutMs: 700, waitForGtagMs: 700 },
    );

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
      void trackingPromise;
      return;
    }

    event.preventDefault();
    await trackingPromise;
    window.location.href = href;
  };

  return <a {...props} onClick={handleClick} />;
}
