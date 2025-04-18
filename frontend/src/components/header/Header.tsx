'use client';

import React from 'react';
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
        <Link href="/" className={styles.navLink}>
         <span className={styles.logo}> 
          <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2289 32.0417C10.145 23.6653 2.60905 21.4593 0 21.5C1.19663 28.7129 7.29868 32.612 11.0621 32.0417C7.24095 28.4896 6.96397 28.9395 4.52144 25.2956C5.0004 25.7742 9.81909 29.8882 11.9744 32.0417L13.2289 32.0417Z" fill="#F2F2F2" />
            <path d="M13.5696 30.0871C11.3801 23.7637 3.91494 20.993 1.14003 20.3981C1.14085 19.1232 1.00258 15.5573 3.8768 11.2189C6.49891 7.26111 16.3829 1.52985 21.3245 0C19.88 0.849919 18.3592 2.80473 20.6399 5.86444C22.9207 8.92415 23.4914 13.3558 23.4914 15.3956C22.465 15.9056 19.272 17.5933 19.1579 23.4578C19.0667 28.1493 16.1928 30.3421 15.1665 30.0871C14.5961 26.0015 14.8242 27.7122 14.5961 26.0015C12.589 18.2503 15.2802 7.64927 17.1048 4.84454C9.12265 12.2388 13.5696 25.6594 14.3684 30.0871H13.5696Z" fill="#F2F2F2" />
            <path d="M33.8525 26.5973C31.765 35.2271 20.6099 35.9976 15.3302 33.7838C19.0692 33.271 25.141 26.1629 28.7731 20.2512C29.9824 18.2829 32.7223 16.3772 33.98 15.7764C33.2814 15.5667 28.1746 17.9751 25.6166 22.7837C23.5702 26.6306 20.4118 28.6292 18.8188 28.738C19.8721 25.5983 19.9894 24.2167 20.0556 23.4368L20.0569 23.4209C20.9146 13.3206 32.5503 12.9962 38.745 13.3849C35.8002 15.6456 35.9436 17.9528 33.8525 26.5973Z" fill="#F2F2F2" />
          </svg>
           UrbanFusion</span>
        </Link>
        <Link href="/about" className={styles.navLink}>
          {t('about')}
        </Link>
        <Link href="/catalog" className={styles.navLink}>
          {t('catalog')}
        </Link>
        {/* <Link href="/contact" className={styles.navLink}>
          {t('contact')}
        </Link> */}
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
