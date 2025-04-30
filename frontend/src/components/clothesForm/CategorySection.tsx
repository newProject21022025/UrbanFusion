import { FormData } from "./ClothesForm";
import styles from './ClothesForm.module.css';

interface CategorySectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const categories = [
  { id: 't-shirts', en: 'T-shirts', uk: 'Футболки' },
  { id: 'shirts', en: 'Shirts', uk: 'Сорочки' },
  { id: 'tops', en: 'Tops', uk: 'Топи' },
  { id: 'jeans', en: 'Jeans', uk: 'Джинси' },
  { id: 'hats', en: 'Hats', uk: 'Капелюхи' },
  { id: 'jackets', en: 'Jackets', uk: 'Куртки' },
  { id: 'glasses', en: 'Glasses', uk: 'Окуляри' },
  { id: 'bags', en: 'Bags', uk: 'Сумки' }
];

export default function CategorySection({ formData, handleChange }: CategorySectionProps) {
  return (
    <div className={styles.formSection}>
      <h3>Category</h3>
      
      <div className={styles.formGroup}>
        <label>Select Category:</label>
        <select
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
            }
            handleChange(e);
          }}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.en}>
              {category.en} / {category.uk}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Selected Category (English):</label>
        <input
          type="text"
          name="category.en"
          value={formData.category.en}
          readOnly
          className={styles.readonlyInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Selected Category (Ukrainian):</label>
        <input
          type="text"
          name="category.uk"
          value={formData.category.uk}
          readOnly
          className={styles.readonlyInput}
        />
      </div>
    </div>
  );
}