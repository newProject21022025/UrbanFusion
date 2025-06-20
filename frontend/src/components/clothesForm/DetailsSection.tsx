// src/components/clothesForm/DetailsSection.tsx

"use client";

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';
import { categoryMetadata } from './categoryMetadata';

interface DetailsSectionProps {
  formData: FormData;
  handleArrayChange: (
    arrayName: 'careInstructions' | 'details',
    index: number,
    field: 'en' | 'uk',
    value: string
  ) => void;
  removeArrayItem: (arrayName: 'careInstructions' | 'details', index: number) => void;
  addArrayItem: (arrayName: 'careInstructions' | 'details') => void;
}

export default function DetailsSection({
  formData,
  handleArrayChange,
  removeArrayItem,
  addArrayItem
}: DetailsSectionProps) {
  const t = useTranslations('DetailsSection');
  const prevCategory = useRef<string>("");

  useEffect(() => {
    const currentEn = formData.category.en;

    if (currentEn && currentEn !== prevCategory.current) {
      const metadataEntry = Object.entries(categoryMetadata).find(
        ([, meta]) => meta.instructions.en.toLowerCase().includes(currentEn.toLowerCase())
      );

      if (metadataEntry) {
        const [, meta] = metadataEntry;

        if (meta.details && Array.isArray(meta.details)) {
          // Очистити всі попередні
          for (let i = formData.details.length - 1; i >= 0; i--) {
            removeArrayItem("details", i);
          }

          // Додати нові
          meta.details.forEach((detail) => addArrayItem("details"));

          // Встановити нові значення
          meta.details.forEach((detail, index) => {
            handleArrayChange("details", index, "en", detail.en);
            handleArrayChange("details", index, "uk", detail.uk);
          });
        }
      }

      prevCategory.current = currentEn;
    }
  }, [formData.category.en]);

  return (
    <div className={styles.formSection}>
      <h3>{t('details')}</h3>
      {formData.details.map((detail, index) => (
        <div key={index} className={styles.formGroup}>
          <h4>{t('detail', { number: index + 1 })}</h4>

          <div className={styles.formGroup}>
            <label>{t('english')}:</label>
            <textarea
              value={detail.en}
              onChange={(e) => handleArrayChange('details', index, 'en', e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>{t('ukrainian')}:</label>
            <textarea
              value={detail.uk}
              onChange={(e) => handleArrayChange('details', index, 'uk', e.target.value)}
              required
            />
          </div>

          {formData.details.length > 1 && (
            <button type="button" onClick={() => removeArrayItem('details', index)}>
              {t('removeDetail')}
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={() => addArrayItem('details')}>
        {t('addDetail')}
      </button>
    </div>
  );
}
