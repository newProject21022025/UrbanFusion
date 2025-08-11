// frontend/src/app/[locale]/authors/page.tsx

"use client";
import styles from "./Authors.module.css";
import { useTranslations } from "next-intl";

export default function Authors() {
  const t = useTranslations("Authors");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("title")}</h2>
      <p className={styles.description}>{t("description")}</p>

      {/* Дизайнери */}
      <section className={styles.section}>
        <h3 className={styles.subtitle}>🎨 {t("designersTitle")}</h3>
        <ul className={styles.list}>
          <li><strong>{t("designer1")}</strong></li>
          <li><strong>{t("designer2")}</strong></li>
          <li>{t("designerResponsibilities1")}</li>
          <li>{t("designerResponsibilities2")}</li>
        </ul>
        <a
          href="https://www.behance.net/gallery/224820279/Presentation-UIUX-Design"
          target="_blank"
          rel="noopener noreferrer"
        >
          Behance
        </a>
      </section>

      {/* Розробники */}
      <section className={styles.section}>
        <h3 className={styles.subtitle}>💻 {t("developersTitle")}</h3>
        <ul className={styles.list}>
          <li><strong>{t("developer1")}</strong></li>
          <li><strong>{t("developer2")}</strong></li>
          <li>{t("developerResponsibilities1")}</li>
          <li>{t("developerResponsibilities2")}</li>
        </ul>
      </section>

      {/* Технології */}
      <section className={styles.section}>
        <h3 className={styles.subtitle}>🛠 {t("technologiesTitle")}</h3>
        <ul className={styles.list}>
          <li>{t("technologiesFrontend")}</li>
          <li>{t("technologiesBackend")}</li>
          <li>{t("technologiesInfrastructure")}</li>
          <li>{t("technologiesDesign")}</li>
        </ul>
      </section>

      <p className={styles.footer}>{t("footer")}</p>
    </div>
  );
}
