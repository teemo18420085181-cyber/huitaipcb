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
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}
