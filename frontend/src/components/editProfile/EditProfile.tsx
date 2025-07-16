// src/components/editProfile/EditProfile.tsx

'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/slices/userSlice';
import styles from './EditProfile.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Ім'я обов'язкове"),
  lastName: Yup.string(),
  phone: Yup.string().matches(/^[0-9+\-() ]+$/, 'Невірний формат телефону'),
  address: Yup.string(),
  postOfficeDetails: Yup.string(),
});

export default function EditProfile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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
    return <div>Завантаження профілю...</div>;
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/auth/update/${user.userId}`, {
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
        alert('Дані оновлено успішно!');
      } else {
        alert('Помилка оновлення');
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('Щось пішло не так.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Редагувати профіль</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>Імʼя</label>
              <Field id="firstName" name="firstName" type="text" className={styles.input} />
              <ErrorMessage name="firstName" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>Прізвище</label>
              <Field id="lastName" name="lastName" type="text" className={styles.input} />
              <ErrorMessage name="lastName" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>Телефон</label>
              <Field id="phone" name="phone" type="text" className={styles.input} />
              <ErrorMessage name="phone" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="address" className={styles.label}>Адреса</label>
              <Field id="address" name="address" type="text" className={styles.input} />
              <ErrorMessage name="address" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="postOfficeDetails" className={styles.label}>Нова пошта</label>
              <Field id="postOfficeDetails" name="postOfficeDetails" type="text" className={styles.input} />
              <ErrorMessage name="postOfficeDetails" component="div" className={styles.error} />
            </div>     
            <button type="submit" className={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Збереження...' : 'Зберегти'}
            </button>
          </Form>
        )}
      </Formik>      
    </div>
  );
}
