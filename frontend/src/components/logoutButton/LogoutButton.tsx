// components/logoutButton/LogoutButton.tsx

'use client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../redux/slices/authSlice';

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    router.push('/');
  };

  return (
    <button onClick={handleLogout}>
      Вийти
    </button>
  );
}

// 'use client';
// import { useRouter } from 'next/navigation';

// export default function LogoutButton() {
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('userRole');
//     router.push('/login');
//   };

//   return (
//     <button onClick={handleLogout}>
//       Вийти
//     </button>
//   );
// }