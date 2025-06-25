// src/components/footer/Footer.tsx

"use client";

import React from "react";
import styles from "./Footer.module.css";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <div className={styles.footer}>
      <div className={styles.footerFullWidth}>
        <h1 className={styles.title}>UrbanFusion</h1>
        <div className={styles.container}>
          <ul className={styles.containerItem}>
            <li className={styles.itemTitle}>{t("contacts")}</li>
            <li className={styles.item}>{t("postcode")}</li>
            <li className={styles.item}>{t("metro")}</li>
            <li className={styles.item}>{t("address")}</li>
            <li className={styles.item}>{t("phoneTitle")}</li>
            <li className={styles.item}>{t("phoneNumber")}</li>
          </ul>
  
          <ul className={styles.containerItem}>
            <li className={styles.itemTitle}>{t("followUs")}</li>
            <li className={`${styles.item} ${styles.footerLink}`}>Facebook</li>
            <li className={`${styles.item} ${styles.footerLink}`}>Instagram</li>
            <li className={`${styles.item} ${styles.footerLink}`}>X</li>
            <li className={styles.item}>
              <Link href="/callback" className={styles.footerLink}>
                {t("callback")}
              </Link>
            </li>
          </ul>
  
          <ul className={styles.containerItem}>
            <li className={styles.itemTitle}>{t("aboutUs")}</li>
            <li className={styles.item}>
              <Link href="/callback" className={styles.footerLink}>
                {t("recycling")}
              </Link>
            </li>
          </ul>
  
          <ul className={styles.containerItem}>
            <li className={styles.item}>
              <Link href="/callback" className={styles.footerLink}>
                {t("returnClothes")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
  
      <div className={styles.copyright}>
        <p className={styles.text}>© 2024 UrbanFusion. {t("rights")}</p>
        <p className={styles.text}>{t("developedWithLove")}</p>
      </div>
    </div>
  );
  }  