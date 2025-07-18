"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import Header from "@/components/header/Header";

type Props = {
  initialLocale: "en" | "uk"; // Додано строгу типізацію
};

export default function LocaleAwareHeader({ initialLocale }: Props) {
  const locale = useLocale() as "en" | "uk"; // Додано приведення типу
  
  useEffect(() => {
    if (typeof window !== 'undefined' && locale !== initialLocale) {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('user-locale', locale);
    }
  }, [locale, initialLocale]);

  return <Header locale={locale} />;
}