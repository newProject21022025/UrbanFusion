// src/app/[locale]/logIn/page.tsx

'use client';

// import { useRouter } from 'next/navigation';
// import { useLocale } from 'next-intl';
import { LoginForm } from '../../../components/loginForm/LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  // const router = useRouter();
  // const locale = useLocale();

  const handleSubmit = async (values: { login: string; password: string }): Promise<{ success: boolean; isAdmin: boolean }> => {
    try {
      console.log('Login attempt:', values.login);
      
      // This would be your actual API call
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
  
      // Determine if user is admin
      const isAdmin = data.user.role === 'admin';
      
      // Save user data to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');
        if (isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        }
      }

      return { success: true, isAdmin };
    } catch (error) {
      console.error('Login error:', error);
  
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Login failed. Please try again.');
      }
      
      return { success: false, isAdmin: false };
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