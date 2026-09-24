import type { ButtonHTMLAttributes, ComponentProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import styles from './V2.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'quiet';

export function V2Theme({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.theme, className)} {...props} />;
}

export function V2Button({
  variant = 'primary', busy = false, disabled, children, className, type = 'button', ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; busy?: boolean }) {
  return (
    <button
      {...props}
      type={type}
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
    >
      {busy && <LoaderCircle aria-hidden="true" className={styles.spinner} />}
      {children}
    </button>
  );
}

// Keep the existing TrackedLink navigation and attribution behavior intact.
export function V2Link({
  variant = 'primary', className, ...props
}: ComponentProps<typeof TrackedLink> & { variant?: ButtonVariant }) {
  return <TrackedLink className={clsx(styles.button, styles[variant], className)} {...props} />;
}

export function V2Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <article className={clsx(styles.card, className)} {...props} />;
}

export function V2CardLink({ className, ...props }: ComponentProps<typeof TrackedLink>) {
  return <TrackedLink className={clsx(styles.card, styles.cardLink, className)} {...props} />;
}
