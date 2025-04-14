import { useTranslations } from 'next-intl';
import styles from './Contact.module.css';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.content}>{t('content')}</p>
    </main>
  );
}