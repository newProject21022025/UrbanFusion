// src/components/header/CatalogDropdown.tsx

import { useTranslations } from "next-intl";
import styles from "./CatalogDropdown.module.css";
import { useRouter } from "next/navigation"; // або 'next/router' для App Router

export default function CatalogDropdown() {
  const t = useTranslations("CatalogDropdown");
  const router = useRouter();

  const handleSelect = (gender: "male" | "female", category: string) => {
    router.push(`/catalog?gender=${gender}&category=${encodeURIComponent(category)}`);
  };


  const menItems = [
    t("men.tShirt"),
    t("men.shirt"),
    t("men.jeans"),
    t("men.jacket"),
    t("men.bag"),
    t("men.glass"),
    t("men.hat"),    
  ];

  const womenItems = [
    t("women.tShirt"),
    t("women.shirt"),
    t("women.jeans"),
    t("women.jacket"),
    t("women.bag"),
    t("women.glass"),
    t("women.hat"),
    t("women.top"),
  ];
console.log(womenItems);

  return (
    <div className={styles.catalogDropdown}>
      <div className={styles.column}>
        <h4 className={styles.title}>{t("men.title")}</h4>
        <ul>
          {menItems.map((item, i) => (
            <li key={i} onClick={() => handleSelect("male", item)}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.column}>
        <h4 className={styles.title}>{t("women.title")}</h4>
        <ul>
          {womenItems.map((item, i) => (
            <li key={i} onClick={() => handleSelect("female", item)}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
