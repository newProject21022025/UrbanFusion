// import { FormData } from "./ClothesForm";
// import styles from './ClothesForm.module.css';

// interface TagsSectionProps {
//   formData: FormData;
//   handleArrayChange: (
//     arrayName: 'careInstructions' | 'details' | 'tags',
//     index: number,
//     field: 'en' | 'uk' | '',
//     value: string
//   ) => void;
//   removeArrayItem: (arrayName: 'careInstructions' | 'details' | 'tags', index: number) => void;
//   addArrayItem: (arrayName: 'careInstructions' | 'details' | 'tags') => void;
// }

// export default function TagsSection({ 
//   formData, 
//   handleArrayChange, 
//   removeArrayItem, 
//   addArrayItem 
// }: TagsSectionProps) {
//   return (
//     <div className={styles.formSection}>
//       <h3>Tags</h3>
//       {formData.tags.map((tag, index) => (
//         <div key={index} className={styles.formGroup}>
//           <label>Tag {index + 1}:</label>
//           <input
//             type="text"
//             value={tag}
//             onChange={(e) => handleArrayChange('tags', index, '', e.target.value)}
//             required
//           />
//           {formData.tags.length > 1 && (
//             <button className={styles.formButton} type="button" onClick={() => removeArrayItem('tags', index)}>
//               Remove
//             </button>
//           )}
//         </div>
//       ))}
//       <button className={`${styles.formButton} ${styles.submitButton}`} type="button" onClick={() => addArrayItem('tags')}>
//         Add Tag
//       </button>
//     </div>
//   );
// }
