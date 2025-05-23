import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '@/components/header/Header';
import '../styles/globals.css';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { UserLoader } from '../../redux/UserLoader';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>next-intl-bug-repro-app-router</title>
      </head>
      <body>
        <ReduxProvider>
        <UserLoader />        
          <NextIntlClientProvider locale={locale}>         
            <Header locale={locale} />
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}