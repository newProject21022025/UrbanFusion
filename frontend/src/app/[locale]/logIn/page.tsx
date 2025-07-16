// src/app/[locale]/logIn/page.tsx

"use client";

import { LoginForm } from "../../../components/loginForm/LoginForm";
import styles from "./page.module.css";
import { User } from "../../../types/User";
import RegisterForm from "../../../components/registerForm/RegisterForm";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const t = useTranslations("login");
  const handleSubmit = async (values: {
    login: string;
    password: string;
  }): Promise<{ success: boolean; isAdmin: boolean; user?: User }> => {
    try {
      console.log("Login attempt:", values.login);

      // This would be your actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      // console.log("Login success:", data.user);

      // Determine if user is admin
      const isAdmin = data.user.role === "admin";

      // Save user data to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("isAuthenticated", "true");
        if (isAdmin) {
          localStorage.setItem("isAdmin", "true");
        }
      }

      return { success: true, isAdmin, user: data.user };
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Login failed. Please try again.");
      }

      return { success: false, isAdmin: false };
    }
  };

  return (
    <div className={styles.container}>
      {isRegistering ? <RegisterForm /> : <LoginForm onSubmit={handleSubmit} />}
      <div className={styles.registration}>
        <p>{isRegistering ? t("hasAccount") : t("noAccount")}</p>
        <button
          className={styles.btnRegistration}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? t('login') : t('register')}
        </button>
      </div>
      <ul className={styles.info}>
        <p className={styles.infoTitle}>{t("benefits.title")}</p>
        <li>{t("benefits.fastOrder")}</li>
        <li>{t("benefits.trackStatus")}</li>
        <li>{t("benefits.orderHistory")}</li>
      </ul>
    </div>
  );
}
