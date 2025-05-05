// frontend/src/app/[locale]/AUF/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import ClothesForm, { FormData } from "../../../../components/clothesForm/ClothesForm";
import styles from "./Create.module.css";

export default function Create() {
  const router = useRouter();

  const handleCreate = async (formData: FormData) => {
    try {
      const response = await fetch(`https://urban-fusion-amber.vercel.app/uk/clothes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create clothes item");
      }

      const createdItem = await response.json();
      alert("Картку створено успішно!");

      // Переадресація після створення, наприклад на сторінку списку товарів
      // router.push("/AUF");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Помилка при створенні картки.");
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Створення картки одягу</h1>
      <ClothesForm onSubmit={handleCreate} />
    </div>
  );
}


 // const router = useRouter();

  // const handleSubmit = async (formData: FormData) => {
  //   // Додайте перевірку обов'язкових полів
  //   if (!formData.name.en || !formData.name.uk) {
  //     alert("Будь ласка, заповніть назву товару в обох мовах");
  //     return;
  //   }
  
  //   // Перевірка основного зображення
  //   if (!formData.mainImage.url) {
  //     alert("Будь ласка, додайте URL зображення");
  //     return;
  //   }
  
  //   console.log("Перевірка даних перед відправкою:", {
  //     name: formData.name,
  //     mainImage: formData.mainImage.url ? "присутнє" : "відсутнє",
  //     price: formData.price
  //   });
  
  //   try {
  //     const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/clothes`;
  //     console.log("Відправка на URL:", apiUrl);
      
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...formData,
  //         // Додаткові перетворення даних, якщо потрібно
  //         price: {
  //           amount: Number(formData.price.amount),
  //           currency: formData.price.currency,
  //           discount: Number(formData.price.discount)
  //         }
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error("Деталі помилки:", errorText);
  //       throw new Error(`Помилка сервера: ${response.status}`);
  //     }
  
  //     const result = await response.json();
  //     console.log("Успішно створено:", result);
  //     router.push('/AUF/edit');
  //   } catch (error) {
  //     console.error("Повна помилка:", error);
  //     alert("Сталася помилка при створенні товару. Перевірте консоль для деталей.");
  //   }
  // };
     

  // <ClothesForm onSubmit={handleSubmit} />