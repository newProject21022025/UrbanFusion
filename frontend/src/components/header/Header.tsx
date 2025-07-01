// src/components/header/Header.tsx

"use client";

import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import LogIn from "../../svg/LogIn/logIn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logoutAdmin, logoutUser } from "../../redux/slices/authSlice";
import BasketWhite from "../../svg/Basket/basketWhite";
import Search from "../../svg/Search/search";
import LogoWhite from "../../svg/Logo/logoWhite";
import HeartEmpty from "../../svg/Heart/heartEmpty";
import HeartBlack from "../../svg/Heart/heartBlack";
import PersonalData from "../../svg/PersonalData/personalData";
import Exit from "../../svg/Exit/exit";
import CatalogDropdown from "./CatalogDropdown";
import SearchBarHeader from "../searchBarHeader/SearchBarHeader";

type HeaderProps = {
  locale: "en" | "uk";
};

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const { isAdmin, isAuthenticated, adminLinks } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const basketItems = useSelector((state: RootState) => state.basket.items);
  // Розрахунок кількості товарів у кошику
  const basketCount = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // Кількість товарів у вибраному
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items
  );
  const favoriteCount = favoriteItems.length; // Кількість вибраних товарів

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (newLocale: string) => {
    router.push(pathname, { locale: newLocale, scroll: false });
  };
  
  const handleLogout = () => {
    if (isAdmin) {
      dispatch(logoutAdmin());
    } else {
      dispatch(logoutUser());
    }
    localStorage.clear();
    dispatch({ type: "basket/clearBasket" });
    dispatch({ type: "favorites/clearFavorites" });

    router.push("/");
    window.location.reload(); // ✅ перезавантаження для оновлення всього стану
  };

  if (!mounted) {
    // Рендер заглушки під час SSR
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          {/* Мінімальний контент для SSR */}
          <div>
            <Link href="/catalog" className={styles.navLink}>
              {t("catalog")}
            </Link>
          </div>
          <Link href="/" className={styles.navLink}>
            <div className={styles.logo}>
              <LogoWhite />
              {t("logo")}
            </div>
          </Link>
          <div className={styles.languageSwitcher}>
            <Search />
            <Link href="/logIn" className={styles.navLink}>
              <LogIn />
            </Link>
            <div className={styles.basketWrapper}>
              <Link href="/basket" className={styles.navLink}>
                <BasketWhite />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        catalogOpen ? styles.expanded : ""
      }`}
      onMouseLeave={() => setCatalogOpen(false)}
    >
      <nav className={styles.nav}>
        <div
          onMouseEnter={() => setCatalogOpen(true)}
          className={styles.catalogWrapper}
        >
          <Link href="/catalog" className={styles.navLink}>
            {t("catalog")}
          </Link>
          {catalogOpen && <CatalogDropdown />}
        </div>
        <Link href="/" className={styles.navLink}>
          <div className={styles.logo}>
            <span>
              <LogoWhite />
            </span>
            {t("logo")}
          </div>
        </Link>
        <div className={styles.languageSwitcher}>
          <SearchBarHeader />
          {isAuthenticated && (
            <Link href="/personalData" className={styles.navLink}>
              <PersonalData />
            </Link>
          )}
          {isAuthenticated ? (
            <div
              onClick={handleLogout}
              className={styles.navLink}
              role="button"
              tabIndex={0}
            >
              <Exit />
            </div>
          ) : (
            <Link href="/logIn" className={styles.navLink}>
              <LogIn />
            </Link>
          )}
          <button
            onClick={() => changeLanguage("en")}
            className={`${styles.languageButton} ${
              locale === "en" ? styles.active : ""
            }`}
          >
            EN
          </button>
          <span className={styles.languageSeparator}>|</span>
          <button
            onClick={() => changeLanguage("uk")}
            className={`${styles.languageButton} ${
              locale === "uk" ? styles.active : ""
            }`}
          >
            UK
          </button>
          <div className={styles.favoritesWrapper}>
            <Link href="/favorites" className={styles.navLink}>
              {favoriteCount > 0 ? <HeartBlack /> : <HeartEmpty />}
              {favoriteCount > 0 && (
                <span className={styles.favoritesCount}>{favoriteCount}</span>
              )}
            </Link>
          </div>
          <div className={styles.basketWrapper}>
            <Link href="/basket" className={styles.navLink}>
              <BasketWhite />
              {basketCount > 0 && (
                <span className={styles.basketCount}>{basketCount}</span>
              )}
            </Link>
          </div>
          {isAdmin && (
            <Link href={adminLinks.link} className={styles.navLink}>
              {adminLinks.label}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
