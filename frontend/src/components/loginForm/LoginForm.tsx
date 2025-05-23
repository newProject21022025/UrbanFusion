// src/components/loginForm/LoginForm.tsx


"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import {
  loginAdmin,
  loginUser,
  setAdminLinks,
} from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import { User } from "../../types/User";

interface LoginFormProps {
  onSubmit: (values: {
    login: string;
    password: string;
  }) => Promise<{ success: boolean; isAdmin: boolean; user?: User }>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations('login');

  const validationSchema = Yup.object({
    login: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { success, isAdmin, user } = await onSubmit(values);
      if (success) {
        if (isAdmin) {
          dispatch(loginAdmin());
          dispatch(setAdminLinks({ link: "/AUF/edit", label: "BOSS" }));
        } else {
          dispatch(loginUser());
        }
        if (user) {
          dispatch(
            setUser({
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.login,
              phone: user.phone ?? undefined,
              address: user.address ?? undefined,
              postOfficeDetails: user.postOfficeDetails ?? undefined,
              dateOfBirth: user.dateOfBirth ?? undefined,
              role: user.role ?? undefined,
            })
          );
        }
        router.push("/");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>{t('title')}</h1>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="login" className={styles.label}>
            {t('email')}
          </label>
          <input
            id="login"
            name="login"
            type="email"
            className={`${styles.input} ${
              formik.touched.login && formik.errors.login ? styles.error : ""
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
            {t('password')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`${styles.input} ${
              formik.touched.password && formik.errors.password
                ? styles.error
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.errorMessage}>{formik.errors.password}</div>
          )}
        </div>

        <div className={styles.links}>
          <a href="/forgot-password" className={styles.link}>
            {t('forgot')}
          </a>
          <a href="/register" className={styles.link}>
            {t('noAccount')}
          </a>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? t('submitting') : t('submit')}
        </button>
      </form>
    </div>
  );
}
