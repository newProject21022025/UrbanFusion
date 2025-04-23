// 'use client';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';
// import styles from './LoginForm.module.css';

// export function LoginForm() {
//   const router = useRouter();

//   const validationSchema = Yup.object({
//     login: Yup.string().required('Логін обов\'язковий'),
//     password: Yup.string().required('Пароль обов\'язковий')
//   });

//   const formik = useFormik({
//     initialValues: {
//       login: '',
//       password: ''
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         // Отправляем запрос через наш API роут
//         const response = await fetch('/api/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Помилка авторизації');
//         }

//         const data = await response.json();
        
//         localStorage.setItem('authToken', data.token || 'authenticated');
//         localStorage.setItem('userRole', 'admin');
        
//         window.location.href = '/admin/dashboard';
        
//       } catch (error: any) {
//         setErrors({
//           login: 'Невірний логін або пароль',
//           password: 'Невірний логін або пароль'
//         });
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   });

//   return (
//     <div className={styles.card}>
//       <h1 className={styles.title}>Вхід для адміністратора</h1>
      
//       <form onSubmit={formik.handleSubmit} className={styles.form}>
//         <div className={styles.inputGroup}>
//           <label htmlFor="login" className={styles.label}>
//             Логін
//           </label>
//           <input
//             id="login"
//             name="login"
//             type="text"
//             className={`${styles.input} ${
//               formik.touched.login && formik.errors.login ? styles.error : ''
//             }`}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.login}
//             autoComplete="username"
//           />
//           {formik.touched.login && formik.errors.login && (
//             <div className={styles.errorMessage}>{formik.errors.login}</div>
//           )}
//         </div>

//         <div className={styles.inputGroup}>
//           <label htmlFor="password" className={styles.label}>
//             Пароль
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             className={`${styles.input} ${
//               formik.touched.password && formik.errors.password ? styles.error : ''
//             }`}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//             autoComplete="current-password"
//           />
//           {formik.touched.password && formik.errors.password && (
//             <div className={styles.errorMessage}>{formik.errors.password}</div>
//           )}
//         </div>

//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={formik.isSubmitting}
//         >
//           {formik.isSubmitting ? 'Вхід...' : 'Увійти'}
//         </button>
//       </form>
//     </div>
//   );
// }

// src/components/loginForm/LoginForm.tsx
'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onSubmit: (values: { login: string; password: string }) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
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
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
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