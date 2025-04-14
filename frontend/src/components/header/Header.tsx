'use client';

import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';

type HeaderProps = {
  locale: 'en' | 'uk';
};

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          {t('home')}
        </Link>
        <Link href="/about" className={styles.navLink}>
          {t('about')}
        </Link>
        <Link href="/contact" className={styles.navLink}>
          {t('contact')}
        </Link>
        <Link href="/books" className={styles.navLink}>
          {t('books')}
        </Link>
        <Link href="/backend" className={styles.navLink}>
          {t('backend')}
        </Link>
        <Link href="/secondBooks" className={styles.navLink}>
          {t('secondBooks')}
        </Link>
      </nav>   

      <div className={styles.languageSwitcher}>
        <span className={styles.languageLabel}>{t('switchLanguage')}:</span>
        <button 
          onClick={() => changeLanguage('en')}
          className={`${styles.languageButton} ${locale === 'en' ? styles.active : ''}`}
        >
          EN
        </button>
        <span className={styles.languageSeparator}>|</span>
        <button 
          onClick={() => changeLanguage('uk')}
          className={`${styles.languageButton} ${locale === 'uk' ? styles.active : ''}`}
        >
          UK
        </button>
      </div>
    </header>
  );
}
