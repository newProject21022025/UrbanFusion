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
      <div>
        <Link href="/callback" className={styles.callback}>
          {t("callback")}
        </Link>
      </div>
    </div>
  );
}
