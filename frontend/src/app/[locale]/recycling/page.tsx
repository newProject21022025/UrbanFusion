

import React from "react";
import { useTranslations } from "next-intl";
import styles from "./Recycling.module.css";

export default function Recycling() {
  const t = useTranslations("Recycling");

  return (
    <div className={styles.container}>
      <section className={styles.recycling}>
        <h2 className={styles.recyclingTitle}>{t("title")}</h2>
        <p className={styles.recyclingDescription}>
          <span className={styles.recyclingHighlight}>{t("highlight")}</span>{" "}
          {t("description")}
        </p>
        <h3 className={styles.recyclingSubtitle}>{t("howTitle")}</h3>

        <div className={styles.recyclingBoxFirst}>
          <p>
            <span className={styles.recyclingNumber}>01.</span>{" "}
            {t("steps.01.title")}
          </p>
          <ul className={styles.recyclingList}>
            <li>{t("steps.01.list.0")}</li>
            <li>{t("steps.01.list.1")}</li>
          </ul>
        </div>
        <div>
          <img
            src="/recycling/recycling_1.png"
            alt="Step 1"
            className={styles.recyclingImageFirst}
          />
        </div>
      </section>

      <section className={styles.recyclingItems}>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>02.</span>{" "}
            {t("steps.02.title")}
          </p>
          <ul className={styles.recyclingList}>
            <li>{t("steps.02.list.0")}</li>
            <li>{t("steps.02.list.1")}</li>
            <li>{t("steps.02.list.2")}</li>
          </ul>
        </div>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_2.png"
            alt="Step 2"
            className={styles.recyclingImage}
          />
        </div>
      </section>

      <section className={styles.recyclingItems}>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_3.png"
            alt="Step 3"
            className={styles.recyclingImage}
          />
        </div>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>03.</span>{" "}
            {t("steps.03.title")}
          </p>
          <ul className={styles.recyclingList}>
            <li>{t("steps.03.list.0")}</li>
            <li>{t("steps.03.list.1")}</li>
            <li>{t("steps.03.list.2")}</li>
          </ul>
        </div>
      </section>

      <section className={styles.recyclingItems}>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>04.</span>{" "}
            {t("steps.04.title")}
          </p>
          <ul className={styles.recyclingList}>
            <li>{t("steps.04.list.0")}</li>
            <li>{t("steps.04.list.1")}</li>
            <li>{t("steps.04.list.2")}</li>
          </ul>
        </div>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_4.png"
            alt="Step 4"
            className={styles.recyclingImage}
          />
        </div>
      </section>

      <section className={styles.recyclingItems}>
        <div className={styles.recyclingImageBox}>
          <img
            src="/recycling/recycling_5.png"
            className={styles.recyclingImage}
            alt={t("steps.05.alt")}
          />
        </div>
        <div className={styles.recyclingBox}>
          <p>
            <span className={styles.recyclingNumber}>05.</span>{" "}
            {t("steps.05.title")}
          </p>
          <ul className={styles.recyclingList}>
            <li>{t("steps.05.list.0")}</li>
            <li>{t("steps.05.list.1")}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
