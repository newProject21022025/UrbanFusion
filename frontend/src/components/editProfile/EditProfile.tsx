// src/components/editProfile/EditProfile.tsx

"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/slices/userSlice";
import styles from "./EditProfile.module.css";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl"; 
import { useParams } from "next/navigation"; 

const formatPhoneNumber = (input: string): string => {
  // Видаляємо всі нецифрові символи
  const cleaned = input.replace(/\D/g, "").slice(0, 12); // обмежуємо до 12 цифр (380 + 9)

  // Автоматично додаємо 380, якщо номер порожній або починається не з 380
  const fullNumber = cleaned.startsWith("380") ? cleaned : "380" + cleaned;

  // Форматуємо за шаблоном +380 (XX) XXX-XX-XX
  if (fullNumber.length <= 3) {
    return `+380`; // Поки тільки код країни
  } else if (fullNumber.length <= 5) {
    return `+380 (${fullNumber.slice(3, 5)}`; // +380 (XX
  } else if (fullNumber.length <= 8) {
    return `+380 (${fullNumber.slice(3, 5)}) ${fullNumber.slice(5, 8)}`; // +380 (XX) XXX
  } else if (fullNumber.length <= 10) {
    return `+380 (${fullNumber.slice(3, 5)}) ${fullNumber.slice(
      5,
      8
    )}-${fullNumber.slice(8, 10)}`; // +380 (XX) XXX-XX
  } else {
    return `+380 (${fullNumber.slice(3, 5)}) ${fullNumber.slice(
      5,
      8
    )}-${fullNumber.slice(8, 10)}-${fullNumber.slice(10, 12)}`; // Повний формат
  }
};

export default function EditProfile() {
  const t = useTranslations("EditProfile"); // Initialize translations for the "EditProfile" namespace
  const params = useParams();
  const currentLocale = params.locale as string; // Get the current locale from URL params

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Create validation schema dynamically based on the current locale
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("firstNameRequired")),
    lastName: Yup.string(),
    phone: Yup.string()
      .matches(/^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, t("invalidPhoneFormat"))
      .required(t("phoneRequired")),
    address: Yup.string(),
    postOfficeDetails: Yup.string(),
  });

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "+380",
    address: user.address || "",
    postOfficeDetails: user.postOfficeDetails || "",
  };

  // ❗ Захист: не рендерити форму, поки дані не підтягнуті
  const isDataLoaded = !!user.firstName; // або інша обов'язкова властивість

  if (!isDataLoaded) {
    return <div>{t("loadingProfile")}</div>; // Translate loading message
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentLocale}/auth/update/${user.userId}`,
        {
          // Use currentLocale in API path
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      if (data.success) {
        const updatedUser = {
          userId: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName || "",
          email: data.user.email || data.user.login,
          phone: data.user.phone || "",
          address: data.user.address || "",
          postOfficeDetails: data.user.postOfficeDetails || "",
          dateOfBirth: data.user.dateOfBirth || "",
          role: data.user.role || "",
        };

        dispatch(setUser(updatedUser));
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        alert(t("dataUpdatedSuccessfully")); // Translate success message
      } else {
        alert(t("updateError")); // Translate error message
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert(t("somethingWentWrong")); // Translate generic error message
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("editProfileTitle")}</h2>{" "}      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>
                {t("firstName")}
              </label>{" "}             
              <Field
                id="firstName"
                name="firstName"
                type="text"
                className={styles.input}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>
                {t("lastName")}
              </label>{" "}             
              <Field
                id="lastName"
                name="lastName"
                type="text"
                className={styles.input}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>
                {t("phone")}
              </label>{" "}              
              <Field name="phone">
                {({ field, form }: FieldProps) => (
                  <input
                    {...field}
                    type="tel"
                    className={styles.input}
                    placeholder="+380 (XX) XXX-XX-XX"
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      form.setFieldValue("phone", formatted);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="phone"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="address" className={styles.label}>
                {t("address")}
              </label>{" "}              
              <Field
                id="address"
                name="address"
                type="text"
                className={styles.input}
              />
              <ErrorMessage
                name="address"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="postOfficeDetails" className={styles.label}>
                {t("postOfficeDetails")}
              </label>{" "}             
              <Field
                id="postOfficeDetails"
                name="postOfficeDetails"
                type="text"
                className={styles.input}
              />
              <ErrorMessage
                name="postOfficeDetails"
                component="div"
                className={styles.error}
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? t("saving") : t("save")}{" "}              
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

