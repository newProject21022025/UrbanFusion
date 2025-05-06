import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';

interface ImageSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function ImageSection({ formData, handleChange }: ImageSectionProps) {
  return (
    <div className={styles.formSection}>
      <h3>Main Image</h3>
      <div className={styles.formGroup}>
        <label>Image URL:</label>
        <input
          type="url"
          name="mainImage.url"
          value={formData.mainImage?.url ?? ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Alt Text (English):</label>
        <input
          type="text"
          name="mainImage.alt.en"
          value={formData.mainImage?.alt.en}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Alt Text (Ukrainian):</label>
        <input
          type="text"
          name="mainImage.alt.uk"
          value={formData.mainImage?.alt.uk}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}
