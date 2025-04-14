import React from 'react'
import { useTranslations } from 'next-intl';
import styles from './SecondBooks.module.css';
import CardsSecond from '../../../components/cardsSecond/CardsSecond';

export default function SecondBooks() {
    const t = useTranslations('SecondBooks');
    
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.content}>{t('content')}</p>      
      <CardsSecond/>
    </main>
  )
}
