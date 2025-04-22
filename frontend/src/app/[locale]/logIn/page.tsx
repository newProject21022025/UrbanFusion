// app/[locale]/login/page.tsx
'use client'; // Форма є клієнтським компонентом

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function LoginPage() {
  const t = useTranslations('login');

  // Схема валідації з Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('errors.invalidEmail'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.passwordMin', { min: 6 }))
      .required(t('errors.required'))
  });

  // Конфігурація Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      // Тут буде логіка відправки форми
      console.log('Дані форми:', values);
      alert(t('submitSuccess'));
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('title')}</h1>
        
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${
                formik.touched.email && formik.errors.email ? styles.error : ''
              }`}
              placeholder="your@email.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.errorMessage}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              {t('password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`${styles.input} ${
                formik.touched.password && formik.errors.password ? styles.error : ''
              }`}
              placeholder="••••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.errorMessage}>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <a href="#" className={styles.forgotLink}>
              {t('forgot')}
            </a>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? t('submitting') : t('title')}
          </button>
        </form>

        <p className={styles.footerText}>
          {t('noAccount')}
        </p>
      </div>
    </div>
  );
}