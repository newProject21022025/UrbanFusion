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
    console.log('Отправка данных:', values);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      console.log('Статус ответа:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t('errors.authFailed'));
      }

      const data = await response.json();
      console.log('Данные ответа:', data);
      
      localStorage.setItem('authToken', data.token || 'authenticated');
      localStorage.setItem('userRole', 'admin');
      
      router.push('/admin/dashboard');
    } catch (error: unknown) {
      let errorMessage = t('errors.generic');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Ошибка при входе:', error);
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}