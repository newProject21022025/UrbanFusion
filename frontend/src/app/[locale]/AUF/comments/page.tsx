// src/app/[locale]/AUF/comments/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./Comments.module.css";
import { clothesService, Clothes } from "../../../api/clothes/clothesService";

export default function Comments() {
  const { locale } = useParams() as { locale: string };
  const [clothesList, setClothesList] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClothes = async () => {
    try {
      setLoading(true);
      const allClothes = await clothesService.getAllClothes(locale);
      setClothesList(allClothes);
    } catch (error) {
      console.error("❌ Error fetching clothes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (
    clothesId: string,
    reviewId: string
  ) => {
    if (!confirm("Ви впевнені, що хочете видалити цей коментар?")) return;
    try {
      await clothesService.deleteReview(clothesId, reviewId, locale);
      await fetchClothes(); // оновити список після видалення
    } catch (error) {
      console.error("❌ Не вдалося видалити коментар:", error);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Усі коментарі</h2>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <div className={styles.commentsList}>
          {clothesList.flatMap((clothes) =>
            clothes.reviews.map((review) => (
              <div key={review._id} className={styles.commentItem}>
                <p><strong>👤 {review.userName}</strong></p>
                <p>📝 {review.comment}</p>
                <p>⭐ Рейтинг: {review.rating}</p>
                <p>👕 Товар: <strong>{clothes.name.uk}</strong></p>
                <button
                  onClick={() => handleDeleteReview(clothes._id, review._id)}
                  className={styles.deleteButton}
                >
                  🗑 Видалити
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}



