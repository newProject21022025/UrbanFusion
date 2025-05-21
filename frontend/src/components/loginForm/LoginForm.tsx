// src/components/loginForm/LoginForm.tsx
"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  loginAdmin,
  loginUser,
  setAdminLinks,
} from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";

interface LoginFormProps {
  onSubmit: (values: {
    login: string;
    password: string;
  }) => Promise<{ success: boolean; isAdmin: boolean; user?: any; }>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    login: Yup.string().required("Логін обов'язковий"),
    password: Yup.string().required("Пароль обов'язковий"),
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
              email: user.login, // ← login з бекенду
              phone: user.phone,
              address: user.address,
              postOfficeDetails: user.postOfficeDetails,
              dateOfBirth: user.dateOfBirth,
              role: user.role,
            })
          );
          console.log("Dispatching user to Redux:", user);
        }
        router.push("/");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Вхід</h1>

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
            Пароль
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

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}
