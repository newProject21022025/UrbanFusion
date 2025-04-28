// src/components/loginForm/LoginForm.tsx
'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginAdmin, setAdminLinks } from '../../redux/slices/authSlice';

interface LoginFormProps {
  onSubmit: (values: { login: string; password: string }) => Promise<boolean>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    login: Yup.string().required('Логін обов\'язковий'),
    password: Yup.string().required('Пароль обов\'язковий')
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const isSuccess = await onSubmit(values);
      if (isSuccess) {
        dispatch(loginAdmin());
        dispatch(setAdminLinks({
          link: '/AUF/tab1',
          label: 'BOSS'
        }));
        router.push('/');
      }
      setSubmitting(false);
    }
  });

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Вхід для адміністратора</h1>
      
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="login" className={styles.label}>
            Логін
          </label>
          <input
            id="login"
            name="login"
            type="text"
            className={`${styles.input} ${
              formik.touched.login && formik.errors.login ? styles.error : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.login}
          />
          {formik.touched.login && formik.errors.login && (
            <div className={styles.errorMessage}>{formik.errors.login}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`${styles.input} ${
              formik.touched.password && formik.errors.password ? styles.error : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.errorMessage}>{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Вхід...' : 'Увійти'}
        </button>
      </form>
    </div>
  );
}