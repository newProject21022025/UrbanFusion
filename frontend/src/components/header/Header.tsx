// src/components/header/Header.tsx

'use client';

import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import LogIn from '../../svg/LogIn/logIn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logoutAdmin } from '../../redux/slices/authSlice';


type HeaderProps = {
  locale: 'en' | 'uk';
};

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, adminLinks } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    dispatch(logoutAdmin());
    router.push('/');
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <div>
          <Link href="/catalog" className={styles.navLink}>
            {t('catalog')}
          </Link>        
          {isAdmin && (
            <Link href={adminLinks.aufLink} className={styles.navLink}>
              {adminLinks.aufLabel}
            </Link>
          )}        
        </div>  
        <Link href="/" className={styles.navLink}>
          <span></span>
          {t('logo')}
        </Link>  
        <div className={styles.languageSwitcher}>
          {isAdmin ? (
            <button onClick={handleLogout} className={styles.navLink}>
              Вийти
            </button>
          ) : (
            <Link href="/logIn" className={styles.navLink}>
              <LogIn/>        
            </Link>
          )}
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
      </nav>
    </header>
  );
}