// src/components/clothesForm/CategorySection.tsx

"use client";

import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';
import { useTranslations } from 'next-intl';
import { categoryMetadata } from './categoryMetadata';

type CategoryId = keyof typeof categoryMetadata;

interface CategorySectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  setDetails: (details: { en: string; uk: string }[]) => void;
}

const categories: { id: CategoryId; en: string; uk: string }[] = [
  { id: 't-shirts', en: 'T-shirts', uk: 'Футболки' },
  { id: 'shirts', en: 'Shirts', uk: 'Сорочки' },
  { id: 'tops', en: 'Tops', uk: 'Топи' },
  { id: 'jeans', en: 'Jeans', uk: 'Джинси' },
  { id: 'hats', en: 'Hats', uk: 'Капелюхи' },
  { id: 'jackets', en: 'Jackets', uk: 'Куртки' },
  { id: 'glasses', en: 'Glasses', uk: 'Окуляри' },
  { id: 'bags', en: 'Bags', uk: 'Сумки' }
];

export default function CategorySection({ formData, handleChange, setDetails }: CategorySectionProps) {
  const t = useTranslations('CategorySection');

  return (
    <div className={styles.formSection}>
      <h3>{t('title')}</h3>

      <div className={styles.formGroup}>
        <label htmlFor="category">{t('label')}:</label>
        <select
          id="category"
          name="category.en"
          value={formData.category.en}
          onChange={(e) => {
            const selectedCategory = categories.find(cat => cat.en === e.target.value);
            
            if (selectedCategory) {
              handleChange({
                target: {
                  name: 'category.uk',
                  value: selectedCategory.uk
                }
              } as React.ChangeEvent<HTMLInputElement>);

              const metadata = categoryMetadata[selectedCategory.id];
              if (metadata?.details) {
                setDetails(metadata.details);
              }
            }

            handleChange(e);
          }}
          required
        >
          <option value="">{t('placeholder')}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.en}>
              {category.en} / {category.uk}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category.en">{t('selectedEn')}:</label>
        <input
          type="text"
          id="category.en"
          name="category.en"
          value={formData.category.en}
          readOnly
          className={styles.readonlyInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category.uk">{t('selectedUk')}:</label>
        <input
          type="text"
          id="category.uk"
          name="category.uk"
          value={formData.category.uk}
          readOnly
          className={styles.readonlyInput}
        />
      </div>
    </div>
  );
}
