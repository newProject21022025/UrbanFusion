// src/components/forgotPasswordForm/ForgotPasswordForm.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ForgotPasswordForm.module.css';
import { FormikHelpers } from 'formik';
import { useTranslations } from 'next-intl';

interface ForgotPasswordFormValues {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("ForgotPassword");

  const initialValues: ForgotPasswordFormValues = { email: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalidEmail"))
      .required(t("requiredEmail")),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);
 
  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting, setStatus }: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {          
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: values.email }),
        }
      );
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || t("requestError"));
      }
  
      setStatus({ success: result.message });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus({ error: error.message });
      } else {
        setStatus({ error: t("unknownError") });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("title")}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              {t("labelEmail")}
            </label>
            <Field
              type="email"
              name="email"
              placeholder={t("placeholderEmail")}
              className={styles.input}
              suppressHydrationWarning
            />
            <ErrorMessage name="email" component="div" className={styles.error} />

            <button type="submit" disabled={isSubmitting} className={styles.button}>
              {t("sendNewPassword")}
            </button>

            {status?.success && <div className={styles.success}>{status.success}</div>}
            {status?.error && <div className={styles.error}>{status.error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
