// src/components/callbackForm/CallbackForm.tsx
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from "./CallbackForm.module.css";

interface CallbackFormValues {
  orderNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  description: string;
}

export default function CallbackForm() {
  const t = useTranslations("CallbackForm");
  const user = useSelector((state: RootState) => state.user);

  // Initialize form with user data if available
  const initialValues: CallbackFormValues = {
    orderNumber: "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    email: user.email || "",
    description: "",
  };

  const validationSchema = Yup.object({
    orderNumber: Yup.string().required(t("errors.orderNumberRequired")),
    firstName: Yup.string().required(t("errors.firstNameRequired")),
    lastName: Yup.string().required(t("errors.lastNameRequired")),
    phone: Yup.string()
      .required(t("errors.phoneRequired"))
      .matches(/^\+?[0-9\s\-]+$/, t("errors.phoneInvalid")),
    email: Yup.string()
      .email(t("errors.emailInvalid"))
      .required(t("errors.emailRequired")),
    description: Yup.string().required(t("errors.descriptionRequired")),
  });

  const onSubmit = async (values: CallbackFormValues) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
  
      alert(t("submitSuccess"));
      formik.resetForm(); // Очистити форму після успішної відправки
    } catch (error) {
      console.error("Error submitting callback form:", error);
      alert(t("submitError")); // додай такий переклад у файл i18n
    }
  };
  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    // Reset form when user data changes
    enableReinitialize: true,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("title")}</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="orderNumber" className={styles.label}>
            {t("orderNumber")}
          </label>
          <input
            id="orderNumber"
            name="orderNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.orderNumber}
            className={styles.input}
          />
          {formik.touched.orderNumber && formik.errors.orderNumber ? (
            <div className={styles.error}>{formik.errors.orderNumber}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            {t("firstName")}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className={styles.input}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className={styles.error}>{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            {t("lastName")}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className={styles.input}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className={styles.error}>{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={styles.input}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className={styles.error}>{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={styles.input}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            {t("description")}
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={styles.textarea}
            rows={5}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.error}>{formik.errors.description}</div>
          ) : null}
        </div>

        <button type="submit" className={styles.submitButton}>
          {t("submit")}
        </button>
      </form>
    </div>
  );
}
