// components/Cards.tsx
'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, removeBook } from "../../redux/slices/booksSlice";
import { RootState, AppDispatch } from "../../redux/store";
import styles from "./CardsSecond.module.css"; // або створіть окремі стилі
import { useTranslations, useLocale } from "next-intl";

export default function CardsSecond() {
  const { items: books, status } = useSelector((state: RootState) => state.books);
  const t = useTranslations("Cards");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete book');
      }
      
      dispatch(removeBook(bookId));
    } catch (error) {
      console.error("Помилка при видаленні книги:", error);
      // Можна додати відображення помилки користувачеві
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>{t("error")}</div>;

  return (
    <div className={styles.cardBox}>
      <h1 className={styles.title}>{t("title")}</h1>
      
      <div className={styles.cardsContainer}>
        {books.map((book) => (
          <div key={book._id} className={styles.card}>
            <img 
              src={book.image} 
              alt={book.title[locale]} 
              className={styles.cardImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/fallback-image.jpg';
              }}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                {book.title[locale]}
              </h3>
              <p className={styles.cardDescription}>
                {book.description[locale]}
              </p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(book._id)}
                aria-label={t("delete")}
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}