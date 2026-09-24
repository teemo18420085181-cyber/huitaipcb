'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { V2Link } from './Primitives';
import styles from './V2.module.css';

type NavigationProps = {
  items: { label: string; href: string; active?: boolean }[];
  homeHref: string;
  quoteHref: string;
  uploadHref: string;
  languages?: { label: string; href: string; lang: string; active?: boolean }[];
  quoteLabel?: string;
  uploadLabel?: string;
  trackClicks?: boolean;
  mobileMenuQuote?: boolean;
};

export default function V2Navigation({
  items, homeHref, quoteHref, uploadHref, languages = [],
  quoteLabel = 'Get PCBA Quote', uploadLabel = 'Send Gerber & BOM', trackClicks = true,
  mobileMenuQuote = true,
}: NavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  useEffect(() => {
    const close = () => {
      if (detailsRef.current) detailsRef.current.open = false;
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !detailsRef.current?.open) return;
      detailsRef.current.dataset.keyboard = 'true';
      close();
      triggerRef.current?.focus();
    };
    const onOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !detailsRef.current?.contains(event.target)) close();
    };
    const desktop = window.matchMedia('(min-width: 1200px)');
    const onDesktop = () => {
      if (!desktop.matches) return;
      if (detailsRef.current?.contains(document.activeElement)) brandRef.current?.focus();
      close();
    };
    document.addEventListener('keydown', onEscape);
    document.addEventListener('pointerdown', onOutsidePress);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('pointerdown', onOutsidePress);
      desktop.removeEventListener('change', onDesktop);
    };
  }, []);

  const closeMenu = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };
  const languageLinks = languages.map((language) => (
    <Link key={language.lang} href={language.href} hrefLang={language.lang}
      aria-current={language.active ? 'true' : undefined} onClick={closeMenu} className={styles.language}>
      {language.label}
    </Link>
  ));

  return (
    <nav aria-label="Main navigation" className={styles.nav}>
      <div className={clsx(styles.container, styles.navInner)}>
        <Link href={homeHref} ref={brandRef} className={styles.brand} aria-label="Huitai PCB home">
          <Image src="/logo.svg" alt="" width={66} height={50} />
          <span>
            <span className={styles.brandName}>HUITAI PCB</span>
            <span className={styles.brandCaption}>PCBA MANUFACTURING</span>
          </span>
        </Link>
        <div className={styles.desktopLinks}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.active ? 'page' : undefined} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className={styles.navActions}>
          <div className={clsx(styles.languages, styles.desktopLanguages)} aria-label="Languages">{languageLinks}</div>
          <V2Link href={quoteHref} className={styles.navQuote}
            eventName={trackClicks ? 'quote_click' : undefined}
            eventParams={{ location: 'nav', destination: quoteHref }}>
            {quoteLabel}
          </V2Link>
          <details ref={detailsRef} className={styles.mobileMenu}>
            <summary ref={triggerRef} className={styles.menuTrigger} aria-controls={menuId}
              aria-label="Navigation menu"
              onPointerDown={() => { if (detailsRef.current) detailsRef.current.dataset.keyboard = 'false'; }}
              onKeyDown={() => { if (detailsRef.current) detailsRef.current.dataset.keyboard = 'true'; }}>
              <Menu size={20} aria-hidden="true" className={styles.menuOpen} />
              <X size={20} aria-hidden="true" className={styles.menuClose} />
            </summary>
            <div id={menuId} className={styles.menuPanel}>
              <div className={styles.menuLinks}>
                {items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenu}
                    aria-current={item.active ? 'page' : undefined} className={clsx(styles.navLink, styles.menuLink)}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className={styles.menuFooter}>
                <div className={styles.languages} aria-label="Languages">{languageLinks}</div>
                <V2Link href={uploadHref} variant="secondary" onClick={closeMenu}
                  eventName={trackClicks ? 'upload_gerber_bom_click' : undefined}
                  eventParams={{ location: 'mobile_nav', destination: uploadHref }}>{uploadLabel}</V2Link>
                {mobileMenuQuote && <V2Link href={quoteHref} onClick={closeMenu}
                  eventName={trackClicks ? 'quote_click' : undefined}
                  eventParams={{ location: 'mobile_nav', destination: quoteHref }}>{quoteLabel}</V2Link>}
              </div>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
