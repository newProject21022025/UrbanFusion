import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';
import { useTranslations } from 'next-intl';

interface CareInstructionsSectionProps {
  formData: FormData;
  handleArrayChange: (
    arrayName: 'careInstructions' | 'details',
    index: number,
    field: 'en' | 'uk' ,
    value: string
  ) => void;
  removeArrayItem: (arrayName: 'careInstructions' | 'details', index: number) => void;
  addArrayItem: (arrayName: 'careInstructions' | 'details') => void;
}

export default function CareInstructionsSection({
  formData,
  handleArrayChange,
  removeArrayItem,
  addArrayItem
}: CareInstructionsSectionProps) {
  const t = useTranslations('CareInstructionsSection');

  return (
    <div className={styles.formSection}>
      <h3>{t('careInstructions')}</h3>
      {formData.careInstructions.map((instruction, index) => (
        <div key={index} className={styles.formGroup}>
          <h4>{t('instruction', { number: index + 1 })}</h4>

          <div className={styles.formGroup}>
            <label>{t('english')}:</label>
            <textarea
              value={instruction.en}
              onChange={(e) => handleArrayChange('careInstructions', index, 'en', e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>{t('ukrainian')}:</label>
            <textarea
              value={instruction.uk}
              onChange={(e) => handleArrayChange('careInstructions', index, 'uk', e.target.value)}
              required
            />
          </div>

          {formData.careInstructions.length > 1 && (
            <button type="button" onClick={() => removeArrayItem('careInstructions', index)}>
              {t('removeInstruction')}
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={() => addArrayItem('careInstructions')}>
        {t('addCareInstruction')}
      </button>
    </div>
  );
}