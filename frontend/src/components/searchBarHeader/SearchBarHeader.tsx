// src/components/searchBarHeader/SearchBarHeader.tsx

"use client";

import { Formik, Form } from "formik";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import Search from "../../svg/Search/search";
import styles from "./SearchBar.module.css"; // створити або використати існуючі стилі

export default function SearchBar() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchSubmit = (values: { query: string }) => {
    if (!values.query.trim()) return;
    router.push(`/catalog?search=${encodeURIComponent(values.query.trim())}`);
    setShowSearch(false);
  };

  return (
    <div className={styles.searchWrapper}>
      {showSearch && (
        <Formik initialValues={{ query: "" }} onSubmit={handleSearchSubmit}>
          {({ values, handleChange, handleSubmit }) => (
            <Form className={styles.searchForm} onSubmit={handleSubmit}>
              <input
                name="query"
                type="text"
                placeholder="Пошук товарів..."
                className={styles.searchInput}
                autoFocus
                value={values.query}
                onChange={handleChange}
              />
            </Form>
          )}
        </Formik>
      )}
      <div
        onClick={() => setShowSearch((prev) => !prev)}
        className={styles.searchIcon}
      >
        <Search />
      </div>
    </div>
  );
}
