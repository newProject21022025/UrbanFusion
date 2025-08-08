// src/components/editProfile/ChangePasswordForm.tsx

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './EditProfile.module.css';
import { useTranslations } from 'next-intl'; 
import { useParams } from 'next/navigation'; 

export default function ChangePasswordForm() {
  const t = useTranslations('ChangePasswordForm'); // Initialize translations for the "ChangePasswordForm" namespace
  const params = useParams();
  const currentLocale = params.locale as string; // Get the current locale from URL params

  const user = useSelector((state: RootState) => state.user);

  // Create validation schema dynamically based on the current locale
  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(t('currentPasswordRequired')),
    newPassword: Yup.string()
      .min(6, t('minSixChars'))
      .required(t('newPasswordRequired')),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], t('passwordsDoNotMatch'))
      .required(t('confirmationRequired')),
  });

  return (
    <div className={styles.passwordSection}>
      <h3 className={styles.title}>{t('changePasswordTitle')}</h3>{" "}     
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={passwordSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentLocale}/auth/update-password/${user.userId}`, // Use currentLocale in API path
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword,
                }),
              }
            );

            const data = await res.json();
            if (data.success) {
              alert(t('passwordUpdatedSuccessfully'));
              resetForm();
            } else {             
              alert(data.message || t('passwordUpdateError')); 
            }
          } catch (error) {
            console.error('Password update error:', error);
            alert(t('somethingWentWrong')); 
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="currentPassword" className={styles.label}>
                {t('currentPassword')}
              </label>{" "}
              {/* Translate label */}
              <Field
                id="currentPassword"
                name="currentPassword"
                type="password"
                className={styles.input}
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                {t('newPassword')}
              </label>{" "}             
              <Field
                id="newPassword"
                name="newPassword"
                type="password"
                className={styles.input}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="confirmNewPassword" className={styles.label}>
                {t('confirmNewPassword')}
              </label>{" "}              
              <Field
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                className={styles.input}
              />
              <ErrorMessage
                name="confirmNewPassword"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? t('updatingPasswordButton') : t('updatePasswordButton')}{" "}              
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}