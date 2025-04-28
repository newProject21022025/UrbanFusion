// src/app/[locale]/logIn/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl'; // <-- важливо для підтримки локалі
import { LoginForm } from '../../../components/loginForm/LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale(); // отримуємо поточну локаль

  const handleSubmit = async (values: { login: string; password: string }): Promise<boolean> => {
    try {
      console.log('Login attempt:', values.login);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
  
      console.log('Login success:', data.user);
  
      // Зберігаємо дані користувача
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');
  
      // Перенаправлення з урахуванням локалі
      if (data.user.role === 'admin') {
        router.push(`/${locale}/AUF`);
      } else {
        router.push(`/${locale}/profile`);
      }
  
      return true; // Успішний вхід
    } catch (error) {
      console.error('Login error:', error);
  
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Login failed. Please try again.');
      }
      
      return false; // Невдалий вхід
    }
  };

  return (
    <div className={styles.container}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}




// 'use client';

// // import { useTranslations } from 'next-intl';
// import { LoginForm } from '../../../components/loginForm/LoginForm';
// import styles from './page.module.css';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   // const t = useTranslations('login');
//   const router = useRouter();

//   const handleSubmit = async (values: { login: string; password: string }) => {
//     try {
//       console.log('Login attempt:', values.login);
      
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(values)
//       });
  
//       const data = await response.json();
      
//       if (!response.ok || !data.success) {
//         throw new Error(data.message || 'Login failed');
//       }
  
//       console.log('Login success:', data.user);
      
//       // Зберігаємо дані користувача
//       localStorage.setItem('userData', JSON.stringify(data.user));
//       localStorage.setItem('isAuthenticated', 'true');
      
//       // Перенаправляємо адміна
//       if (data.user.role === 'admin') {
//         router.push('/AUF');
//       } else {
//         router.push('/profile');
//       }
      
//     } catch (error) {
//       console.error('Login error:', error);
    
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert('Login failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <LoginForm onSubmit={handleSubmit} />
//     </div>
//   );
// }