// src/app/[locale]/logIn/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { LoginForm } from '../../../components/loginForm/LoginForm';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const t = useTranslations('login');
  const router = useRouter();

  const handleSubmit = async (values: { login: string; password: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include'
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: t('errors.authFailed')
        }));
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      // Обробка успішного логіну...
      
    } catch (error: unknown) {
      let errorMessage = t('errors.generic');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Login error:', error);
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}