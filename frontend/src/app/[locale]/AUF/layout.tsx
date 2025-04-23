'use client'
//../src/app/[locale]/AUF/layout.tsx

import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import styles from './page.module.css'

const TABS = ['tab1', 'tab2', 'tab3']

export default function AUFLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  // Визначаємо базовий шлях (з локаллю)
  const basePath = pathname.startsWith('/en/AUF')
    ? '/en/AUF'
    : pathname.startsWith('/uk/AUF')
    ? '/uk/AUF'
    : '/AUF'

  useEffect(() => {
    // Редірект на tab1, якщо просто /adminUrbanFusion
    if (pathname === basePath) {
      router.push(`${basePath}/tab1`)
    }
  }, [pathname, router, basePath])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Перемикач вкладок</h1>
      <div className={styles.buttonGroup}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => router.push(`${basePath}/${tab}`)}
            className={styles.button}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}
