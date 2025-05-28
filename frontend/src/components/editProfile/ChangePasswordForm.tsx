// src/components/editProfile/ChangePasswordForm.tsx

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './EditProfile.module.css';

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Поточний пароль обовʼязковий'),
  newPassword: Yup.string().min(6, 'Мінімум 6 символів').required('Новий пароль обовʼязковий'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Паролі не співпадають')
    .required('Підтвердження обовʼязкове'),
});

export default function ChangePasswordForm() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.passwordSection}>
      <h3 className={styles.sectionTitle}>Змінити пароль</h3>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={passwordSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/auth/update-password/${user.userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
              }),
            });

            const data = await res.json();
            if (data.success) {
              alert('Пароль оновлено успішно!');
              resetForm();
            } else {
              alert(data.message || 'Помилка оновлення пароля');
            }
          } catch (error) {
            console.error('Password update error:', error);
            alert('Щось пішло не так');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="currentPassword" className={styles.label}>Поточний пароль</label>
              <Field id="currentPassword" name="currentPassword" type="password" className={styles.input} />
              <ErrorMessage name="currentPassword" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="newPassword" className={styles.label}>Новий пароль</label>
              <Field id="newPassword" name="newPassword" type="password" className={styles.input} />
              <ErrorMessage name="newPassword" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="confirmNewPassword" className={styles.label}>Підтвердіть новий пароль</label>
              <Field id="confirmNewPassword" name="confirmNewPassword" type="password" className={styles.input} />
              <ErrorMessage name="confirmNewPassword" component="div" className={styles.error} />
            </div>

            <button type="submit" className={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Оновлення...' : 'Оновити пароль'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
