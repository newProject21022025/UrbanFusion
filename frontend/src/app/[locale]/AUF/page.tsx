// src/app/[locale]/AUF/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AUFRootRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  const basePath = pathname.startsWith('/en/AUF')
    ? '/en/AUF'
    : pathname.startsWith('/uk/AUF')
    ? '/uk/AUF'
    : '/AUF';

  useEffect(() => {
    router.push(`${basePath}/tab1`);
  }, [router, basePath]);

  return null;
}
