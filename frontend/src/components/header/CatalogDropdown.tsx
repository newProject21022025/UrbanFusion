// src/components/header/CatalogDropdown.tsx

import { useTranslations } from "next-intl";
import styles from "./CatalogDropdown.module.css";

export default function CatalogDropdown() {
  const t = useTranslations("CatalogDropdown");

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

  return (
    <div className={styles.catalogDropdown}>
      <div className={styles.column}>
        <h4 className={styles.title}>{t("men.title")}</h4>
        <ul>
          {menItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.column}>
        <h4 className={styles.title}>{t("women.title")}</h4>
        <ul>
          {womenItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
