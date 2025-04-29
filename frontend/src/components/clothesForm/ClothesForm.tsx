import { useState } from 'react';
import styles from './Create.module.css';

interface StockItem {
  color: {
    code: string;
    en: string;
    uk: string;
  };
  sizes: {
    size: string;
    quantity: number;
  }[];
}

interface CareInstruction {
  en: string;
  uk: string;
}

interface Detail {
  en: string;
  uk: string;
}

export default function ClothesForm() {
  const [formData, setFormData] = useState({
    slug: '',
    name: { en: '', uk: '' },
    description: { en: '', uk: '' },
    mainImage: {
      url: '',
      alt: { en: '', uk: '' }
    },
    price: {
      amount: 0,
      currency: 'USD',
      discount: 0
    },
    availability: true,
    category: {
      id: '',
      en: '',
      uk: ''
    },
    tags: [''],
    stock: [{
      color: { code: '', en: '', uk: '' },
      sizes: [{ size: '', quantity: 0 }]
    }],
    careInstructions: [{ en: '', uk: '' }],
    details: [{ en: '', uk: '' }],
    gender: 'male'
  });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
    
//     // Handle nested fields
//     if (name.includes('.')) {
//       const [parent, child, subChild] = name.split('.');
      
//       if (subChild) {
//         setFormData(prev => ({
//           ...prev,
//           [parent]: {
//             ...prev[parent as keyof typeof prev],
//             [child]: {
//               ...(prev[parent as keyof typeof prev] as any)[child],
//               [subChild]: value
//             }
//           }
//         }));
//       } else {
//         setFormData(prev => ({
//           ...prev,
//           [parent]: {
//             ...prev[parent as keyof typeof prev],
//             [child]: value
//           }
//         }));
//       }
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
    // Обработка вложенных полей (например, name.en, price.amount и т.д.)
    if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.');
      
      setFormData(prev => {
        // Для случаев вроде mainImage.alt.en (три уровня вложенности)
        if (subChild && parent && child && subChild) {
          return {
            ...prev,
            [parent]: {
              ...(prev as any)[parent],
              [child]: {
                ...(prev as any)[parent][child],
                [subChild]: value
              }
            }
          };
        }
        // Для случаев вроде price.amount (два уровня вложенности)
        else if (parent && child) {
          return {
            ...prev,
            [parent]: {
              ...(prev as any)[parent],
              [child]: type === 'number' ? Number(value) : value
            }
          };
        }
        return prev;
      });
    } 
    // Обработка обычных полей
    else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? Number(value) : 
                value
      }));
    }
  };

  const handleStockChange = (index: number, field: string, value: any, subIndex?: number) => {
    const updatedStock = [...formData.stock];
    
    if (subIndex !== undefined) {
      // Handle sizes array
      updatedStock[index].sizes[subIndex] = {
        ...updatedStock[index].sizes[subIndex],
        [field]: field === 'quantity' ? Number(value) : value
      };
    } else if (field in updatedStock[index].color) {
      // Handle color object
      updatedStock[index].color = {
        ...updatedStock[index].color,
        [field]: value
      };
    }
    
    setFormData(prev => ({
      ...prev,
      stock: updatedStock
    }));
  };

  const handleArrayChange = (
    arrayName: 'careInstructions' | 'details' | 'tags',
    index: number,
    field: string,
    value: string
  ) => {
    setFormData(prev => {
      // Создаем копию массива с правильным типом
      const updatedArray = [...prev[arrayName]] as 
        | CareInstruction[]
        | Detail[]
        | string[];
      
      if (arrayName === 'tags') {
        // Обработка массива тегов (string[])
        (updatedArray as string[])[index] = value;
      } else {
        // Обработка careInstructions или details (объекты)
        const item = { ...(updatedArray as (CareInstruction | Detail)[])[index] };
        (item as any)[field] = value;
        (updatedArray as (CareInstruction | Detail)[])[index] = item;
      }
      
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };


//   const handleArrayChange = (arrayName: 'careInstructions' | 'details' | 'tags', index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const updatedArray = [...prev[arrayName]];
      
//       if (field) {
//         // For objects in array (careInstructions, details)
//         updatedArray[index] = {
//           ...updatedArray[index],
//           [field]: value
//         };
//       } else {
//         // For simple array (tags)
//         updatedArray[index] = value;
//       }
      
//       return {
//         ...prev,
//         [arrayName]: updatedArray
//       };
//     });
//   };

  const addStockItem = () => {
    setFormData(prev => ({
      ...prev,
      stock: [
        ...prev.stock,
        {
          color: { code: '', en: '', uk: '' },
          sizes: [{ size: '', quantity: 0 }]
        }
      ]
    }));
  };

  const addSize = (stockIndex: number) => {
    const updatedStock = [...formData.stock];
    updatedStock[stockIndex].sizes.push({ size: '', quantity: 0 });
    setFormData(prev => ({
      ...prev,
      stock: updatedStock
    }));
  };

  const addArrayItem = (arrayName: 'careInstructions' | 'details' | 'tags') => {
    setFormData(prev => {
      const newItem = arrayName === 'tags' ? '' : { en: '', uk: '' };
      return {
        ...prev,
        [arrayName]: [...prev[arrayName], newItem]
      };
    });
  };

  const removeStockItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stock: prev.stock.filter((_, i) => i !== index)
    }));
  };

  const removeSize = (stockIndex: number, sizeIndex: number) => {
    const updatedStock = [...formData.stock];
    updatedStock[stockIndex].sizes = updatedStock[stockIndex].sizes.filter((_, i) => i !== sizeIndex);
    setFormData(prev => ({
      ...prev,
      stock: updatedStock
    }));
  };

  const removeArrayItem = (arrayName: 'careInstructions' | 'details' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clothes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Clothes item created successfully!');
      // Reset form or redirect if needed
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating clothes item');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* <h2>Create New Clothes Item</h2> */}
      
      {/* Basic Information */}
      <div className={styles.formSection}>
        {/* <h3>Basic Information</h3> */}
        <div className={styles.formGroup}>
          <label>Slug (URL identifier):</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>

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

      {/* Image */}
      <div className={styles.formSection}>
        <h3>Main Image</h3>
        <div className={styles.formGroup}>
          <label>Image URL:</label>
          <input
            type="url"
            name="mainImage.url"
            value={formData.mainImage.url}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Alt Text (English):</label>
          <input
            type="text"
            name="mainImage.alt.en"
            value={formData.mainImage.alt.en}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Alt Text (Ukrainian):</label>
          <input
            type="text"
            name="mainImage.alt.uk"
            value={formData.mainImage.alt.uk}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Price */}
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

      {/* Category */}
      <div className={styles.formSection}>
        <h3>Category</h3>
        <div className={styles.formGroup}>
          <label>Category ID:</label>
          <input
            type="text"
            name="category.id"
            value={formData.category.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category Name (English):</label>
          <input
            type="text"
            name="category.en"
            value={formData.category.en}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category Name (Ukrainian):</label>
          <input
            type="text"
            name="category.uk"
            value={formData.category.uk}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Tags */}
      <div className={styles.formSection}>
        <h3>Tags</h3>
        {formData.tags.map((tag, index) => (
          <div key={index} className={styles.formGroup}>
            <label>Tag {index + 1}:</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => handleArrayChange('tags', index, '', e.target.value)}
              required
            />
            {formData.tags.length > 1 && (
              <button className={styles.formButton} type="button" onClick={() => removeArrayItem('tags', index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button className={`${styles.formButton} ${styles.submitButton}`}  type="button" onClick={() => addArrayItem('tags')}>
          Add Tag
        </button>
      </div>

      {/* Stock */}
      <div className={styles.formSection}>
        <h3>Stock</h3>
        {formData.stock.map((stockItem, stockIndex) => (
          <div key={stockIndex} className={styles.stockItem}>
            <h4>Color Variant {stockIndex + 1}</h4>
            
            <div className={styles.formGroup}>
              <label>Color Code:</label>
              <input
                type="text"
                value={stockItem.color.code}
                onChange={(e) => handleStockChange(stockIndex, 'code', e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Color Name (English):</label>
              <input
                type="text"
                value={stockItem.color.en}
                onChange={(e) => handleStockChange(stockIndex, 'en', e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Color Name (Ukrainian):</label>
              <input
                type="text"
                value={stockItem.color.uk}
                onChange={(e) => handleStockChange(stockIndex, 'uk', e.target.value)}
                required
              />
            </div>

            <h5>Sizes</h5>
            {stockItem.sizes.map((size, sizeIndex) => (
              <div key={sizeIndex} className={styles.sizeItem}>
                <div className={styles.formGroup}>
                  <label>Size:</label>
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) => handleStockChange(stockIndex, 'size', e.target.value, sizeIndex)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={size.quantity}
                    onChange={(e) => handleStockChange(stockIndex, 'quantity', e.target.value, sizeIndex)}
                    min="0"
                    required
                  />
                </div>

                {stockItem.sizes.length > 1 && (
                  <button type="button" onClick={() => removeSize(stockIndex, sizeIndex)}>
                    Remove Size
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={() => addSize(stockIndex)}>
              Add Size
            </button>

            {formData.stock.length > 1 && (
              <button type="button" onClick={() => removeStockItem(stockIndex)}>
                Remove Color Variant
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addStockItem}>
          Add Color Variant
        </button>
      </div>

      {/* Care Instructions */}
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

      {/* Details */}
      <div className={styles.formSection}>
        <h3>Details</h3>
        {formData.details.map((detail, index) => (
          <div key={index} className={styles.formGroup}>
            <h4>Detail {index + 1}</h4>
            <div className={styles.formGroup}>
              <label>English:</label>
              <textarea
                value={detail.en}
                onChange={(e) => handleArrayChange('details', index, 'en', e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Ukrainian:</label>
              <textarea
                value={detail.uk}
                onChange={(e) => handleArrayChange('details', index, 'uk', e.target.value)}
                required
              />
            </div>

            {formData.details.length > 1 && (
              <button type="button" onClick={() => removeArrayItem('details', index)}>
                Remove Detail
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={() => addArrayItem('details')}>
          Add Detail
        </button>
      </div>

      <button type="submit" className={styles.submitButton}>
        Create Clothes Item
      </button>
    </form>
  );
}