// src/app/[locale]/personalData/page.tsx

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styles from "./PersonalData.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; // Шлях залежить від структури проекту
import EditProfile from "../../../components/editProfile/EditProfile"; // Шлях залежить від структури проекту
import Link from "next/link";
import ChangePasswordForm from "../../../components/editProfile/ChangePasswordForm"; // Шлях залежить від структури проекту

export default function PersonalData() {
  const t = useTranslations("PersonalData");

  const { firstName, email } = useSelector((state: RootState) => state.user);

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>{t("title")}</h2>

      <div className={styles.userInfo}>
        <p >
          {t("name")}
          <strong className={styles.greeting}>{firstName}!</strong>
        </p>
        <p>{email}</p>
        <Link className={styles.historyOrders} href="/userOrders">
          {t("userOrders")}
        </Link>
      </div>

      <div className={styles.contentProfile}>
        <EditProfile />
        <ChangePasswordForm />
      </div>
    </main>
  );
}
