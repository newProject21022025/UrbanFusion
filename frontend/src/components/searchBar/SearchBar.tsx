// src/components/SearchBar/SearchBar.tsx

"use client";

import { useEffect, useState, useMemo } from "react";
import { Clothes } from "../../app/api/clothes/clothesService";
import { useLocale } from "next-intl";
import styles from "./SearchBar.module.css";

type Props = {
  clothes: Clothes[];
  onResults: (filtered: Clothes[]) => void;
};

export default function SearchBar({ clothes, onResults }: Props) {
  const locale = useLocale();
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return clothes;
    return clothes.filter((item) => {
      const name = item.name[locale as "en" | "uk"]?.toLowerCase() || "";
      const article = item.article?.toLowerCase() || "";
      return name.includes(lowerQuery) || article.includes(lowerQuery);
    });
  }, [query, clothes, locale]);

  useEffect(() => {
    onResults(filteredResults);
  }, [filteredResults, onResults]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук за назвою або артикулом"
        className={styles.searchInput}
      />
    </div>
  );
}
