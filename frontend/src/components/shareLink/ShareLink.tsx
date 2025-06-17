// src/components/shareLink/ShareLink.tsx

"use client";

import { useState } from "react";
import styles from "./ShareLink.module.css";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ShareLink() {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("share");

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Не вдалося скопіювати посилання", error);
    }
  };

  return (
    <div className={styles.shareLink}>
      <button onClick={handleCopyLink} className={styles.button}>
        🔗 {t("button")}
      </button>
      {copied && <span className={styles.tooltip}>{t("copied")}</span>}
    </div>
  );
}
