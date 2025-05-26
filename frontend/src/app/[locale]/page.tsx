'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import { Counter } from '../../components/counter/Counter';
import  RandomClothes  from '../../components/randomClothes/RandomClothes';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.content}>{t('content')}</p>
        <RandomClothes />
        <div>12345</div>

        <Counter />
      </main>
    </div>
  );
}