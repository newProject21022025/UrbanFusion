

import React from "react";
import { useTranslations } from "next-intl";
import styles from "./ReturnClothes.module.css";

export default function ReturnClothes() {
  const t = useTranslations("ReturnClothes");

  return (
    <div className={styles.container}>
      <section className={styles.returnClothes}>
        <h2 className={styles.returnClothesTitle}>
          {t("howToReturnTitle")}
        </h2>
        <p className={styles.returnClothesDescription}>
          {t("description1")}{" "}
          <span className={styles.returnClothesHighlight}>UrbanFusion</span>{" "}
          {t("description2")}
        </p>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/1.png"
            alt="return step 1"
            className={styles.returnClothesImage}
          />
        </div>
      </section>

      <section className={styles.returnClothesItems}>
        <div className={styles.returnClothesBox}>
          <h2 className={styles.returnClothesTitle}>
            {t("stepByStepTitle")}
          </h2>
          <p>
            <span className={styles.returnClothesNumber}>01.</span>{" "}
            {t("step1")}
          </p>
          <p>
            <span className={styles.returnClothesNumber}>02.</span>{" "}
            {t("step2")}
          </p>
        </div>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/2.png"
            alt="return step 2"
            className={styles.returnClothesImage}
          />
          <img
            src="/returnClothes/3.png"
            alt="return step 3"
            className={styles.returnClothesImage}
          />
        </div>
      </section>

      <section className={styles.returnClothesItems}>
        <div className={styles.returnClothesBox}>
          <h2 className={styles.returnClothesTitle}>
            {t("chooseMethodTitle")}
          </h2>
          <p>
            <span className={styles.returnClothesNumber}>01.</span>{" "}
            {t("method1")}
          </p>
          <p>
            <span className={styles.returnClothesNumber}>02.</span>{" "}
            {t("method2")}
          </p>
          <p>
            <span className={styles.returnClothesNumber}>03.</span>{" "}
            {t("method3")}
          </p>
        </div>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/4.png"
            alt="return step 4"
            className={styles.returnClothesImage}
          />
        </div>
      </section>

      <section className={styles.returnClothesItems}>
        <div className={styles.returnClothesBox}>
          <h2 className={styles.returnClothesTitle}>
            {t("afterReturnTitle")}
          </h2>
          <p>
            <span className={styles.returnClothesNumber}>01.</span>{" "}
            {t("after1")}
          </p>
          <p>
            <span className={styles.returnClothesNumber}>02.</span>{" "}
            {t("after2")}
          </p>
        </div>
        <div className={styles.returnClothesImageBox}>
          <img
            src="/returnClothes/5.png"
            alt="return step 5"
            className={styles.returnClothesImage}
          />
        </div>
      </section>
    </div>
  );
}
