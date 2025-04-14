'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, removeBook } from "../../redux/slices/booksSlice";
import { RootState, AppDispatch } from "../../redux/store";
import styles from "./Cards.module.css";
import { useTranslations, useLocale } from "next-intl";

export default function Cards() {
  const { items: books, status } = useSelector((state: RootState) => state.books);
  const t = useTranslations("Cards");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>{t("error")}</div>;

  const handleDelete = async (bookId: string) => {
    try {
      const response = await fetch(`/api/books?bookId=${bookId}`, { // передаємо bookId через query
        method: 'DELETE',
      });
  
      if (response.ok) {
        dispatch(removeBook(bookId)); // Видаляємо книгу з Redux після успішного видалення
      } else {
        const errorMessage = await response.text(); // Вивести текст помилки з відповіді
        console.error("Помилка при видаленні книги:", errorMessage);
      }
    } catch (error) {
      console.error("Помилка при видаленні книги:", error);
    }
  };
  
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
                onClick={() => handleDelete(book._id)}>
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
