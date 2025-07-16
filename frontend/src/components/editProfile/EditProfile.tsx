// src/components/editProfile/EditProfile.tsx

'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/slices/userSlice';
import styles from './EditProfile.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl'; // Import useTranslations
import { useParams } from 'next/navigation'; // Import useParams

export default function EditProfile() {
  const t = useTranslations('EditProfile'); // Initialize translations for the "EditProfile" namespace
  const params = useParams();
  const currentLocale = params.locale as string; // Get the current locale from URL params

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Create validation schema dynamically based on the current locale
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("firstNameRequired")),
    lastName: Yup.string(),
    phone: Yup.string().matches(/^[0-9+\-() ]+$/, t("invalidPhoneFormat")),
    address: Yup.string(),
    postOfficeDetails: Yup.string(),
  });

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '+380',
    address: user.address || '',
    postOfficeDetails: user.postOfficeDetails || '',
  };

  // ❗ Захист: не рендерити форму, поки дані не підтягнуті
  const isDataLoaded = !!user.firstName; // або інша обов'язкова властивість

  if (!isDataLoaded) {
    return <div>{t("loadingProfile")}</div>; // Translate loading message
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentLocale}/auth/update/${user.userId}`, { // Use currentLocale in API path
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (data.success) {
        const updatedUser = {
          userId: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName || '',
          email: data.user.email || data.user.login,
          phone: data.user.phone || '',
          address: data.user.address || '',
          postOfficeDetails: data.user.postOfficeDetails || '',
          dateOfBirth: data.user.dateOfBirth || '',
          role: data.user.role || '',
        };

        dispatch(setUser(updatedUser));
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        alert(t('dataUpdatedSuccessfully')); // Translate success message
      } else {
        alert(t('updateError')); // Translate error message
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert(t('somethingWentWrong')); // Translate generic error message
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('editProfileTitle')}</h2> {/* Translate title */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>{t('firstName')}</label> {/* Translate label */}
              <Field id="firstName" name="firstName" type="text" className={styles.input} />
              <ErrorMessage name="firstName" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>{t('lastName')}</label> {/* Translate label */}
              <Field id="lastName" name="lastName" type="text" className={styles.input} />
              <ErrorMessage name="lastName" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>{t('phone')}</label> {/* Translate label */}
              <Field id="phone" name="phone" type="text" className={styles.input} />
              <ErrorMessage name="phone" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="address" className={styles.label}>{t('address')}</label> {/* Translate label */}
              <Field id="address" name="address" type="text" className={styles.input} />
              <ErrorMessage name="address" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="postOfficeDetails" className={styles.label}>{t('postOfficeDetails')}</label> {/* Translate label */}
              <Field id="postOfficeDetails" name="postOfficeDetails" type="text" className={styles.input} />
              <ErrorMessage name="postOfficeDetails" component="div" className={styles.error} />
            </div>
            <button type="submit" className={styles.button} disabled={isSubmitting}>
              {isSubmitting ? t('saving') : t('save')}{" "} {/* Translate button text */}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}