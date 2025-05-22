// src/components/registerForm/RegisterForm.tsx

'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUser } from '../../redux/slices/userSlice';
import styles from './RegisterForm.module.css'; // переконайся, що такий файл існує


const RegisterForm = () => {
  const t = useTranslations('register');
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    firstName: '',
    login: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('errors.required')),
    login: Yup.string().email(t('errors.invalidEmail')).required(t('errors.required')),
    password: Yup.string().min(6, t('errors.passwordMin', { min: 6 })).required(t('errors.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('errors.passwordMismatch'))
      .required(t('errors.required')),
  });

  const handleSubmit = async (values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    setError(null);

    try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = values;

      // Виклик реєстрації через API роут
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const registerJson = await registerRes.json();
      if (!registerRes.ok) throw new Error(registerJson.message || 'Registration failed');

      // Якщо реєстрація успішна — логінемо користувача
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: values.login, password: values.password }),
      });

      const loginJson = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginJson.message || 'Login failed');

      // Форматуємо user дані для redux
      const user = loginJson.user;

      dispatch(setUser({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName || '',
        email: user.login,  // login з бекенду → email у слайсі
        phone: user.phone || '',
        address: user.address || '',
        postOfficeDetails: user.postOfficeDetails || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString() : '',
        role: user.role || 'user',
      }));

      resetForm();
      router.push('/');

    } catch (err: unknown) {
      setError('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      {error && <div className={styles.errorGlobal}>{error}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="firstName">{t('firstName')}</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" className={styles.error} />
            </div>

            <div className={styles.field}>
              <label htmlFor="login">{t('email')}</label>
              <Field type="email" name="login" />
              <ErrorMessage name="login" component="div" className={styles.error} />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">{t('password')}</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
