import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';

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
  return (
    <div className={styles.formSection}>
      <h3>Care Instructions</h3>
      {formData.careInstructions.map((instruction, index) => (
        <div key={index} className={styles.formGroup}>
          <h4>Instruction {index + 1}</h4>
          <div className={styles.formGroup}>
            <label>English:</label>
            <textarea
              value={instruction.en}
              onChange={(e) => handleArrayChange('careInstructions', index, 'en', e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Ukrainian:</label>
            <textarea
              value={instruction.uk}
              onChange={(e) => handleArrayChange('careInstructions', index, 'uk', e.target.value)}
              required
            />
          </div>

          {formData.careInstructions.length > 1 && (
            <button type="button" onClick={() => removeArrayItem('careInstructions', index)}>
              Remove Instruction
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={() => addArrayItem('careInstructions')}>
        Add Care Instruction
      </button>
    </div>
  );
}
