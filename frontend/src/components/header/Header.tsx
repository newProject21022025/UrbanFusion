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
import HeartEmpty from "@/svg/Heart/heartEmpty";

type HeaderProps = {
  locale: "en" | "uk";
};

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, isAuthenticated, adminLinks } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items); // або ваш шлях до масиву
  const basketCount = basketItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  const handleLogout = () => {
    if (isAdmin) {
      dispatch(logoutAdmin());
    } else {
      dispatch(logoutUser());
    }
    router.push("/");
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <div>
          <Link href="/catalog" className={styles.navLink}>
            {t("catalog")}
          </Link>
          {isAdmin && (
            <Link href={adminLinks.link} className={styles.navLink}>
              {adminLinks.label}
            </Link>
          )}
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
          <Search />
          {isAuthenticated ? (
            <button onClick={handleLogout} className={styles.navLink}>
              Вийти
            </button>
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
          <div>
            <Link href="/favorites" className={styles.navLink}>
              <HeartEmpty />
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
        </div>
      </nav>
    </header>
  );
}
