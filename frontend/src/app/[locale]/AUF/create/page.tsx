// frontend/src/app/[locale]/AUF/create/page.tsx
"use client"; // Робить файл повністю клієнтським

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import ClothesForm, { FormData as ClothesFormData } from "../../../../components/clothesForm/ClothesForm";
import styles from "./Create.module.css";
import { clothesService } from "../../../api/clothes/clothesService";

export default function Create() {
  const router = useRouter();
  const locale = useLocale();

  const handleCreate = async (formData: ClothesFormData) => {
    try {
      await clothesService.createClothes(formData, locale);
      alert("Картку створено успішно!");
      router.push("/AUF");
    } catch (error) {
      console.error("Помилка при створенні картки:", error);
      alert("Помилка при створенні картки.");
    }
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Створення картки одягу</h2>
      <ClothesForm onSubmit={handleCreate} />
    </div>
  );
}


