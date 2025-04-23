// components/authRoute/AuthRoute.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
}