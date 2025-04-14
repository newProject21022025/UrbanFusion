import { useTranslations } from 'next-intl';
import styles from './Books.module.css';
import Cards from '../../../components/cards/Cards';
import FormAddBooks from '../../../components/formAddBooks/FormAddBooks';

export default function Books() {
  const t = useTranslations('Books');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.content}>{t('content')}</p>  
      <FormAddBooks/>
      <Cards />
    </main>
   
  );
}