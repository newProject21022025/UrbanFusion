// src/components/searchBarHeader/SearchBarHeader.tsx

"use client";

import { Formik, Form } from "formik";
import { useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import Search from "../../svg/Search/search";
import styles from "./SearchBar.module.css";
import { useTranslations } from "next-intl";

export default function SearchBar() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("SearchBar");

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleSearchSubmit = (values: { query: string }) => {
    if (!values.query.trim()) return;
    router.push(`/catalog?search=${encodeURIComponent(values.query.trim())}`);
    if (!isMobile) setShowSearch(false); // тільки на десктопі ховаємо
  };

  return (
    <div className={styles.searchWrapper}>
      {(showSearch || isMobile) && (
        <Formik initialValues={{ query: "" }} onSubmit={handleSearchSubmit}>
          {({ values, handleChange, handleSubmit }) => (
            <Form className={styles.searchForm} onSubmit={handleSubmit}>
              <input
                name="query"
                type="text"
                placeholder={t("searchPlaceholderHeader")}
                className={styles.searchInput}
                autoFocus
                value={values.query}
                onChange={handleChange}
              />
            </Form>
          )}
        </Formik>
      )}
      {!isMobile && (
        <div
          onClick={() => setShowSearch((prev) => !prev)}
          className={styles.searchIcon}
        >
          <Search />
        </div>
      )}
    </div>
  );
}
