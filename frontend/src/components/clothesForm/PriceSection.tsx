import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';

interface PriceSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function PriceSection({ formData, handleChange, setFormData }: PriceSectionProps) {
  return (
    <div className={styles.formSection}>
      <h3>Price</h3>
      <div className={styles.formGroup}>
        <label>Amount:</label>
        <input
          type="number"
          name="price.amount"
          value={formData.price.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Currency:</label>
        <input
          type="text"
          name="price.currency"
          value={formData.price.currency}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Discount:</label>
        <input
          type="number"
          name="price.discount"
          value={formData.price.discount}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Availability:</label>
        <select
          name="availability"
          value={formData.availability.toString()}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            availability: e.target.value === 'true'
          }))}
          required
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
    </div>
  );
}
