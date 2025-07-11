// src/app/[locale]/logIn/page.tsx

"use client";

import { LoginForm } from "../../../components/loginForm/LoginForm";
import styles from "./page.module.css";
import { User } from "../../../types/User";
import RegisterForm from "../../../components/registerForm/RegisterForm";
import { useState } from "react";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
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
        <p>
          {isRegistering
            ? "У вас вже є обліковий запис?"
            : "Немає облікового запису?"}
        </p>
        <button
          className={styles.btnRegistration}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Увійти" : "Зареєструватися"}
        </button>
      </div>
      <ul className={styles.info}>
        <p className={styles.infoTitle}>Переваги реєстрації:</p>
        <li>Швидке оформлення замовлення завдяки збереженій адресі </li>
        <li>Відстеження статусу своїх повідомлень </li>
        <li>Перегляд історії замовлень </li>
      </ul>
    </div>
  );
}
