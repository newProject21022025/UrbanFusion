// src/components/header/MobileHeader.tsx

"use client";

import { useEffect, useState } from "react";
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
import { useTranslations } from "next-intl";
import PersonalData from "../../svg/PersonalData/personalData";

type Props = {
  t: ReturnType<typeof useTranslations>;
  locale: "en" | "uk";
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
  locale,
  changeLanguage,
  isAuthenticated,
  isAdmin,
  adminLinks,
  handleLogout,
  favoriteCount,
  basketCount,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.topBar}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={styles.burger}
          aria-label="Toggle menu"
        >
          {menuOpen ? <Cross /> : <Burger />}
        </button>

        <Link href="/" className={styles.logo}>
          <LogoWhite />
        </Link>

        <div className={styles.itemBox}>
          {isAuthenticated && (
            <Link href="/personalData" className={styles.navLink}>
              <PersonalData />
            </Link>
          )}
          <Link
            href="/favorites"
            className={styles.menuItem}
            onClick={() => setMenuOpen(false)}
          >
            {favoriteCount > 0 ? <HeartBlack /> : <HeartEmpty />}
          </Link>
          <Link href="/basket" className={styles.basket}>
            <BasketWhite />
            {basketCount > 0 && (
              <span className={styles.count}>{basketCount}</span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <SearchBarHeader />
          </div>

          <Link
            href="/catalog"
            className={styles.menuItem}
            onClick={() => setMenuOpen(false)}
          >
            {t("catalog")}
          </Link>

          {isAdmin && adminLinks && (
            <Link
              href={adminLinks.link}
              className={styles.menuItem}
              onClick={() => setMenuOpen(false)}
            >
              {adminLinks.label}
            </Link>
          )}

          <div className={styles.languageToggle}>
            <button
              onClick={() => changeLanguage("uk")}
              className={locale === "uk" ? styles.activeLang : ""}
            >
              UK
            </button>
            <span>|</span>
            <button
              onClick={() => changeLanguage("en")}
              className={locale === "en" ? styles.activeLang : ""}
            >
              EN
            </button>
          </div>

          {isAuthenticated ? (
            <button onClick={handleLogout} className={styles.menuItem}>
              <Exit />
              {/* {t("logout")} */}
            </button>
          ) : (
            <Link
              href="/logIn"
              className={styles.menuItem}
              onClick={() => setMenuOpen(false)}
            >
              <LogIn />
              {/* {t("login")} */}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
