"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    // Зберігаємо поточну позицію прокрутки перед переходом
    window.history.scrollRestoration = 'manual';
    
    const handlePopState = () => {
      // Використовуємо setTimeout, щоб переконатися, що скрол відбувається після відновлення сторінки
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Відновлюємо стандартну поведінку при знищенні компонента
      window.history.scrollRestoration = 'auto';
    };
  }, [pathname]);

  return null;
}