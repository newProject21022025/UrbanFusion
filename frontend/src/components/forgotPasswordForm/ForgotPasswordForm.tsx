// src/components/forgotPasswordForm/ForgotPasswordForm.tsx

'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ForgotPasswordForm.module.css';
import { FormikHelpers } from 'formik';

interface ForgotPasswordFormValues {
  email: string;
}

const initialValues: ForgotPasswordFormValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Невірний формат email')
    .required("Email обов'язковий"),
});

export const ForgotPasswordForm: React.FC = () => {
    const handleSubmit = async (
        values: ForgotPasswordFormValues,
        { setSubmitting, setStatus }: FormikHelpers<ForgotPasswordFormValues>
      ) => {
        try {
          console.log('Sending email to backend:', values.email);
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/auth/forgot-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: values.email }),
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            throw new Error(result.message || 'Помилка надсилання запиту');
          }
      
          setStatus({ success: result.message });
        } catch (error: unknown) {
          if (error instanceof Error) {
            setStatus({ error: error.message });
          } else {
            setStatus({ error: 'Невідома помилка' });
          }
        } finally {
          setSubmitting(false);
        }
      };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Відновлення паролю</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className={styles.form}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Введіть ваш email"
              className={styles.input}
            />
            <ErrorMessage name="email" component="div" className={styles.error} />

            <button type="submit" disabled={isSubmitting} className={styles.button}>
              Надіслати новий пароль
            </button>

            {status?.success && <div className={styles.success}>{status.success}</div>}
            {status?.error && <div className={styles.error}>{status.error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
