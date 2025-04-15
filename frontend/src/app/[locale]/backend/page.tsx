"use client"
import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import styles from "./Backend.module.css";

interface Card {
  _id: string;
  title: {
    en: string;
    uk: string;
  };
  description: {
    en: string;
    uk: string;
  };
  image: string;
}

export default function Backend() {
  const t = useTranslations("Backend");
  const locale = useLocale() as "en" | "uk";
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://urban-fusion-amber.vercel.app';
      
      const response = await fetch(`${apiUrl}/uk/books?lang=${locale}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include' // Важливо для CORS з credentials
      });

      if (!response.ok) throw new Error(t("fetchError"));
      
      const data = await response.json();
      setCards(data);
    } catch (err) {
      console.error("Помилка отримання даних:", err);
      setError(err instanceof Error ? err.message : t("unknownError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [locale]);

  if (loading) return <div className={styles.loading}>{t("loading")}</div>;

  return (
    <div className={styles.backendBox}>
      <h1 className={styles.title}>{t("title")}</h1>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.cardsContainer}>
        {cards.map((card) => (
          <div key={card._id} className={styles.card}>
            <img 
              src={card.image} 
              alt={card.title[locale]} 
              className={styles.cardImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
              }}
            />
            <h3 className={styles.cardTitle}>{card.title[locale]}</h3>
            <p className={styles.cardDescription}>{card.description[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}