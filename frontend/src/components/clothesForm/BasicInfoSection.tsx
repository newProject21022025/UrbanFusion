// src/components/clothesForm/ClothesForm.tsx

"use client";

import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';
import { useTranslations } from 'next-intl';

interface BasicInfoSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function BasicInfoSection({ formData, handleChange }: BasicInfoSectionProps) {
  const t = useTranslations('BasicInfoSection');
  return (
    <div className={styles.formSection}>      

      <div className={styles.formGroup}>
        <label>{t('nameEn')}</label>
        <input
          type="text"
          name="name.en"
          value={formData.name.en}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t('nameUk')}</label>
        <input
          type="text"
          name="name.uk"
          value={formData.name.uk}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t('descEn')}</label>
        <textarea
          name="description.en"
          value={formData.description.en}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t('descUk')}</label>
        <textarea
          name="description.uk"
          value={formData.description.uk}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t('gender')}</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="male">{t('male')}</option>
          <option value="female">{t('female')}</option>
        </select>
      </div>
    </div>
  );
}