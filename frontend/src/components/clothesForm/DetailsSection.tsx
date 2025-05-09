import { useTranslations } from 'next-intl';
import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';

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
