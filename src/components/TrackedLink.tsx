'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackEvent } from '@/components/Analytics';

type TrackedLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    eventName: string;
    eventParams?: Record<string, string | number | boolean>;
  };

export default function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
