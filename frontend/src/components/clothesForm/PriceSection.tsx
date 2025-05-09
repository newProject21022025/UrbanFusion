import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';
import { useTranslations } from 'next-intl';

interface PriceSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function PriceSection({
  formData,
  handleChange,
  setFormData,
}: PriceSectionProps) {
  const t = useTranslations('PriceSection');

  return (
    <div className={styles.formSection}>
      <h3>{t('title')}</h3>

      <div className={styles.formGroup}>
        <label htmlFor="price.amount">{t('amount')}:</label>
        <input
          type="number"
          id="price.amount"
          name="price.amount"
          value={formData.price.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price.currency">{t('currency')}:</label>
        <input
          type="text"
          id="price.currency"
          name="price.currency"
          value={formData.price.currency}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price.discount">{t('discount')}:</label>
        <input
          type="number"
          id="price.discount"
          name="price.discount"
          value={formData.price.discount}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="availability">{t('availability')}:</label>
        <select
          id="availability"
          name="availability"
          value={formData.availability.toString()}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              availability: e.target.value === 'true',
            }))
          }
          required
        >
          <option value="true">{t('available')}</option>
          <option value="false">{t('notAvailable')}</option>
        </select>
      </div>
    </div>
  );
}
