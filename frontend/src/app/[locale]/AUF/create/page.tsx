// frontend/src/app/[locale]/AUF/create/page.tsx
"use client"
import { useRouter } from 'next/navigation';
import ClothesForm, { FormData }  from '../../../../components/clothesForm/ClothesForm';
import styles from './Create.module.css';


export default function Create() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    // Додайте перевірку обов'язкових полів
    if (!formData.name.en || !formData.name.uk) {
      alert("Будь ласка, заповніть назву товару в обох мовах");
      return;
    }
  
    // Перевірка основного зображення
    if (!formData.mainImage.url) {
      alert("Будь ласка, додайте URL зображення");
      return;
    }
  
    console.log("Перевірка даних перед відправкою:", {
      name: formData.name,
      mainImage: formData.mainImage.url ? "присутнє" : "відсутнє",
      price: formData.price
    });
  
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/clothes`;
      console.log("Відправка на URL:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Додаткові перетворення даних, якщо потрібно
          price: {
            amount: Number(formData.price.amount),
            currency: formData.price.currency,
            discount: Number(formData.price.discount)
          }
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Деталі помилки:", errorText);
        throw new Error(`Помилка сервера: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Успішно створено:", result);
      router.push('/AUF/edit');
    } catch (error) {
      console.error("Повна помилка:", error);
      alert("Сталася помилка при створенні товару. Перевірте консоль для деталей.");
    }
  };
     

  return (
    <div className={styles.main}>
      <ClothesForm onSubmit={handleSubmit} />
    </div>
  );
}