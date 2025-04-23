// components/logoutButton/LogoutButton.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>
      Вийти
    </button>
  );
}