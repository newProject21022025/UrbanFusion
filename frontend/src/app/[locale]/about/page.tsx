import { useTranslations } from 'next-intl';
import styles from './About.module.css';

export default function About() {
  const t = useTranslations('About');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.content}>{t('content')}</p>
    </main>
  );
}