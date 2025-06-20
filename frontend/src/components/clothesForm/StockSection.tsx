// src/components/clothesForm/StockSection.tsx
"use client";

import { FormData } from "./ClothesForm";
import styles from "./ClothesForm.module.css";
import { useTranslations } from "next-intl";

interface StockSectionProps {
  formData: FormData;
  handleStockChange: (
    index: number,
    field: string,
    value: string | number,
    sizeIndex?: number
  ) => void;
  addStockItem: () => void;
  removeStockItem: (index: number) => void;
  addSize: (stockIndex: number) => void;
  removeSize: (stockIndex: number, sizeIndex: number) => void;
}

const colors = [
  { code: "#FF0000", en: "Red", uk: "Червоний" },
  { code: "#00FF00", en: "Green", uk: "Зелений" },
  { code: "#0000FF", en: "Blue", uk: "Синій" },
  { code: "#FFFF00", en: "Yellow", uk: "Жовтий" },
  { code: "#FF00FF", en: "Magenta", uk: "Пурпурний" },
  { code: "#00FFFF", en: "Cyan", uk: "Блакитний" },
  { code: "#000000", en: "Black", uk: "Чорний" },
  { code: "#FFFFFF", en: "White", uk: "Білий" },
  { code: "#808080", en: "Gray", uk: "Сірий" },
  { code: "#FFA500", en: "Orange", uk: "Помаранчевий" },
  { code: "#800080", en: "Purple", uk: "Фіолетовий" },
  { code: "#A52A2A", en: "Brown", uk: "Коричневий" },
];

const sizes = [
  { size: "XS", description: "44" },
  { size: "S", description: "46" },
  { size: "M", description: "48" },
  { size: "L", description: "50" },
  { size: "XL", description: "52" },
  { size: "XXL", description: "54-56" },
  { size: "XXXL", description: "58-60" },
  { size: "4XL", description: "62-64" },
];

export default function StockSection({
  formData,
  handleStockChange,
  addStockItem,
  removeStockItem,
  addSize,
  removeSize,
}: StockSectionProps) {
  const t = useTranslations("StockSection");

  const handleColorChange = (index: number, value: string) => {
    const selectedColor = colors.find((c) => c.code === value);
    if (selectedColor) {
      handleStockChange(index, "code", selectedColor.code);
      handleStockChange(index, "en", selectedColor.en);
      handleStockChange(index, "uk", selectedColor.uk);
    }
  };

  const handleSizeChange = (
    stockIndex: number,
    sizeIndex: number,
    value: string
  ) => {
    handleStockChange(stockIndex, "size", value, sizeIndex);
  };

  return (
    <div className={styles.formSection}>
      <h3>{t("title")}</h3>
      {formData.stock.map((stockItem, stockIndex) => (
        <div key={stockIndex} className={styles.stockItem}>
          <h4>{t("colorVariant", { index: stockIndex + 1 })}</h4>

          <div className={styles.formGroup}>
            <label>{t("selectColor")}:</label>
            <select
              value={stockItem.color.code}
              onChange={(e) => handleColorChange(stockIndex, e.target.value)}
              required
            >
              <option value="">{t("selectColorPlaceholder")}</option>
              {colors.map((color) => (
                <option key={color.code} value={color.code}>
                  {color.en} / {color.uk}
                </option>
              ))}
            </select>
          </div>
         
          <h5>{t("sizes")}</h5>
          {stockItem.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className={styles.sizeItem}>
              <div className={styles.formGroup}>
                <label>{t("selectSize")}:</label>
                <select
                  value={size.size}
                  onChange={(e) =>
                    handleSizeChange(stockIndex, sizeIndex, e.target.value)
                  }
                  required
                >
                  <option value="">{t("selectSizePlaceholder")}</option>
                  {sizes.map((s) => (
                    <option key={s.size} value={s.size}>
                      {s.size} - {s.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>{t("quantity")}:</label>
                <input
                  type="number"
                  value={size.quantity}
                  onChange={(e) =>
                    handleStockChange(
                      stockIndex,
                      "quantity",
                      Number(e.target.value),
                      sizeIndex
                    )
                  }
                  min="0"
                  required
                />
              </div>

              {stockItem.sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(stockIndex, sizeIndex)}
                >
                  {t("removeSize")}
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={() => addSize(stockIndex)}>
            {t("addSize")}
          </button>

          {formData.stock.length > 1 && (
            <button type="button" onClick={() => removeStockItem(stockIndex)}>
              {t("removeColorVariant")}
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addStockItem}>
        {t("addColorVariant")}
      </button>
    </div>
  );
}



// import { useState, useEffect } from 'react';
// import { FormData } from "./ClothesForm";
// import styles from "./ClothesForm.module.css";
// import { useTranslations } from "next-intl";

// interface StockSectionProps {
//     formData: FormData;
//     handleStockChange: (
//       index: number,
//       field: string,
//       value: string | number,
//       sizeIndex?: number
//     ) => void;
//     addStockItem: () => void;
//     removeStockItem: (index: number) => void;
//     addSize: (stockIndex: number) => void;
//     removeSize: (stockIndex: number, sizeIndex: number) => void;
//   }
  
//   const colors = [
//     { code: "#FF0000", en: "Red", uk: "Червоний" },
//     { code: "#00FF00", en: "Green", uk: "Зелений" },
//     { code: "#0000FF", en: "Blue", uk: "Синій" },
//     { code: "#FFFF00", en: "Yellow", uk: "Жовтий" },
//     { code: "#FF00FF", en: "Magenta", uk: "Пурпурний" },
//     { code: "#00FFFF", en: "Cyan", uk: "Блакитний" },
//     { code: "#000000", en: "Black", uk: "Чорний" },
//     { code: "#FFFFFF", en: "White", uk: "Білий" },
//     { code: "#808080", en: "Gray", uk: "Сірий" },
//     { code: "#FFA500", en: "Orange", uk: "Помаранчевий" },
//     { code: "#800080", en: "Purple", uk: "Фіолетовий" },
//     { code: "#A52A2A", en: "Brown", uk: "Коричневий" },
//   ];
  
//   const sizes = [
//     { size: "XS", description: "44" },
//     { size: "S", description: "46" },
//     { size: "M", description: "48" },
//     { size: "L", description: "50" },
//     { size: "XL", description: "52" },
//     { size: "XXL", description: "54-56" },
//     { size: "XXXL", description: "58-60" },
//     { size: "4XL", description: "62-64" },
//   ];
  
//   export default function StockSection({
//     formData,
//     handleStockChange,
//     addStockItem,
//     removeStockItem,
//     addSize,
//     removeSize,
//   }: StockSectionProps) {
//     const t = useTranslations("StockSection");
//     const [localSizes, setLocalSizes] = useState<Record<string, number>>({});
  
//     // Ініціалізація локального стану при зміні formData
//     useEffect(() => {
//       const newLocalSizes: Record<string, number> = {};
      
//       formData.stock.forEach((stockItem, stockIndex) => {
//         stockItem.sizes.forEach(size => {
//           const key = `${stockIndex}_${size.size}`;
//           newLocalSizes[key] = size.quantity;
//         });
//       });
      
//       setLocalSizes(newLocalSizes);
//     }, [formData]);
  
//     const handleColorChange = (index: number, value: string) => {
//       const selectedColor = colors.find((c) => c.code === value);
//       if (selectedColor) {
//         handleStockChange(index, "code", selectedColor.code);
//         handleStockChange(index, "en", selectedColor.en);
//         handleStockChange(index, "uk", selectedColor.uk);
//       }
//     };
  
//     const handleSizeToggle = (stockIndex: number, size: string) => {
//       const stockItem = formData.stock[stockIndex];
//       const sizeIndex = stockItem.sizes.findIndex(s => s.size === size);
      
//       if (sizeIndex >= 0) {
//         removeSize(stockIndex, sizeIndex);
//       } else {
//         addSize(stockIndex);
//         // Встановлюємо новий розмір для останнього елементу (який щойно додали)
//         handleStockChange(
//           stockIndex,
//           "size",
//           size,
//           stockItem.sizes.length
//         );
//         // Встановлюємо кількість за замовчуванням
//         handleStockChange(
//           stockIndex,
//           "quantity",
//           localSizes[`${stockIndex}_${size}`] || 1,
//           stockItem.sizes.length
//         );
//       }
//     };
  
//     const handleQuantityChange = (stockIndex: number, size: string, value: number) => {
//       const key = `${stockIndex}_${size}`;
//       setLocalSizes(prev => ({ ...prev, [key]: value }));
      
//       const stockItem = formData.stock[stockIndex];
//       const sizeIndex = stockItem.sizes.findIndex(s => s.size === size);
      
//       if (sizeIndex >= 0) {
//         handleStockChange(
//           stockIndex,
//           "quantity",
//           value,
//           sizeIndex
//         );
//       }
//     };
  
//     return (
//       <div className={styles.formSection}>
//         <h3>{t("title")}</h3>
//         {formData.stock.map((stockItem, stockIndex) => (
//           <div key={stockIndex} className={styles.stockItem}>
//             {/* Змінено заголовок - додано явний текст */}
//             <h4>Кольоровий варіант {stockIndex + 1}</h4>
    
//             <div className={styles.formGroup}>
//               <label>{t("selectColor")}:</label>
//               <select
//                 value={stockItem.color.code}
//                 onChange={(e) => handleColorChange(stockIndex, e.target.value)}
//                 required
//               >
//                 <option value="">{t("selectColorPlaceholder")}</option>
//                 {colors.map((color) => (
//                   <option key={color.code} value={color.code}>
//                     {color.en} / {color.uk}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <h5>{t("sizes")}</h5>
//             <div className={styles.sizeGrid}>
//               {sizes.map((size) => {
//                 const isSelected = stockItem.sizes.some(s => s.size === size.size);
//                 const selectedSize = stockItem.sizes.find(s => s.size === size.size);
//                 const quantity = selectedSize?.quantity || 0;
                
//                 return (
//                   <div key={size.size} className={styles.sizeOption}>
//                     <label>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={() => handleSizeToggle(stockIndex, size.size)}
//                       />
//                       {size.size} - {size.description}
//                     </label>
//                     {isSelected && (
//                       <input
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => 
//                           handleQuantityChange(
//                             stockIndex, 
//                             size.size, 
//                             Number(e.target.value)
//                           )
//                         }
//                         min="0"
//                         required
//                         className={styles.quantityInput}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
    
//             {formData.stock.length > 1 && (
//               <button 
//                 type="button" 
//                 onClick={() => removeStockItem(stockIndex)}
//                 className={`${styles.actionButton} ${styles.removeButton}`}
//               >
//                 {t("removeColorVariant")}
//               </button>
//             )}
//           </div>
//         ))}
    
//         <button 
//           type="button" 
//           onClick={addStockItem}
//           className={`${styles.actionButton} ${styles.addButton}`}
//         >
//           {t("addColorVariant")}
//         </button>
//       </div>
//     );
//   }




