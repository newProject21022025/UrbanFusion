import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';

interface BasicInfoSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function BasicInfoSection({ formData, handleChange }: BasicInfoSectionProps) {
  return (
    <div className={styles.formSection}>
      {/* <div className={styles.formGroup}>
        <label>Slug (URL identifier):</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />
      </div> */}

      <div className={styles.formGroup}>
        <label>Name (English):</label>
        <input
          type="text"
          name="name.en"
          value={formData.name.en}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Name (Ukrainian):</label>
        <input
          type="text"
          name="name.uk"
          value={formData.name.uk}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description (English):</label>
        <textarea
          name="description.en"
          value={formData.description.en}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description (Ukrainian):</label>
        <textarea
          name="description.uk"
          value={formData.description.uk}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
}
