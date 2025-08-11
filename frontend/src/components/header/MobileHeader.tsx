// src/components/header/MobileHeader.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./MobileHeader.module.css";
import Burger from "../../svg/Burger/burger";
import Cross from "../../svg/Cross/cross";
import LogoWhite from "../../svg/Logo/logoWhite";
import BasketWhite from "../../svg/Basket/basketWhite";
import HeartEmpty from "../../svg/Heart/heartEmpty";
import HeartBlack from "../../svg/Heart/heartBlack";
import LogIn from "../../svg/LogIn/logIn";
import Exit from "../../svg/Exit/exit";
import SearchBarHeader from "../searchBarHeader/SearchBarHeader";
import { useTranslations, useLocale } from "next-intl";
import PersonalData from "../../svg/PersonalData/personalData";
import CatalogDropdown from "./CatalogDropdown";

type Props = {
  t: ReturnType<typeof useTranslations>;
  changeLanguage: (lang: string) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  adminLinks?: {
    link: string;
    label: string;
  };
  handleLogout: () => void;
  favoriteCount: number;
  basketCount: number;
};

export default function MobileHeader({
  t,
  changeLanguage,
  isAuthenticated,
  isAdmin,
  adminLinks,
  handleLogout,
  favoriteCount,
  basketCount,
}: Props) {
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setShowCatalog(false);
  };

  const handleLanguageChange = (newLocale: string) => {
    changeLanguage(newLocale);
    setMenuOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setShowCatalog(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
      setShowCatalog(false);
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  if (!isMobile) return null;

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.topBar}>
        <button
          ref={burgerRef}
          onClick={toggleMenu}
          className={styles.burger}
          aria-label="Toggle menu"
        >
          {menuOpen ? <Cross /> : <Burger />}
        </button>

        <Link href="/" locale={locale} className={styles.logo}>
          <LogoWhite />
        </Link>

        <div className={styles.itemBox}>
          {isAuthenticated && (
            <Link
              href="/personalData"
              locale={locale}
              className={styles.navLink}
            >
              <PersonalData />
            </Link>
          )}
          <Link
            href="/favorites"
            locale={locale}
            className={styles.menuItem}
            onClick={() => setMenuOpen(false)}
          >
            {favoriteCount > 0 ? <HeartBlack /> : <HeartEmpty />}
          </Link>
          <Link href="/basket" locale={locale} className={styles.basket}>
            <BasketWhite />
            {basketCount > 0 && (
              <span className={styles.count}>{basketCount}</span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.menuItem}>
            <SearchBarHeader />
          </div>

          <Link
            href="/catalog"
            locale={locale}
            className={styles.menuItem}
            onClick={() => setMenuOpen(false)}
          >
            {t("catalog")}
          </Link>

          <button
            className={styles.btnBurger}
            onClick={() => setShowCatalog((prev) => !prev)}
          >
              {t("category")}
          </button>

          {showCatalog && (
            <div className={styles.catalogDropdownWrapper}>
              <CatalogDropdown
                onSelect={() => {
                  setShowCatalog(false);
                  setMenuOpen(false);
                }}
              />
            </div>
          )}

          {isAdmin && adminLinks && (
            <Link
              locale={locale}
              href={adminLinks.link}
              className={styles.menuItem}
              onClick={() => setMenuOpen(false)}
            >
              {adminLinks.label}
            </Link>
          )}

          <div className={styles.languageToggle}>
            <button
              onClick={() => handleLanguageChange("uk")}
              className={locale === "uk" ? styles.activeLang : ""}
            >
              UK
            </button>
            <span>|</span>
            <button
              onClick={() => handleLanguageChange("en")}
              className={locale === "en" ? styles.activeLang : ""}
            >
              EN
            </button>
          </div>

          {isAuthenticated ? (
            <button onClick={handleLogout} className={styles.menuItem}>
              <Exit />
            </button>
          ) : (
            <Link
              href="/logIn"
              locale={locale}
              className={styles.menuItem}
              onClick={() => setMenuOpen(false)}
            >
              <LogIn />
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

