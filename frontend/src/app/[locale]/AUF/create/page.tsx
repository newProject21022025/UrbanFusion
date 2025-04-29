// import { useTranslations } from 'next-intl';

"use client"


import styles from './Create.module.css';
import ClothesForm from '../../../../components/clothesForm/ClothesForm';

export default function Create() {
  return (
    <div className={styles.main}>
      <h2>Create New Clothes Item</h2>
      <ClothesForm />
    </div>
  );
}