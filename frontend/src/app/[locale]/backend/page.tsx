"use client"

import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import styles from "./Backend.module.css";

interface Card {
  id: number;
  title: string;
  description: string;
}

export default function Backend() {
  const t = useTranslations("Backend");
  const locale = useLocale() as "en" | "uk";
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cards?lang=${locale}`);
      if (!response.ok) throw new Error(t("fetchError"));
      const data = await response.json();
      setCards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("unknownError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [locale]); // Залежність від зміни локалі

  if (loading) {
    return <div className={styles.loading}>{t("loading")}</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.backendBox}>
      <h1 className={styles.title}>{t("title")}</h1>

      <div className={styles.cardsContainer}>
        {cards.map((card) => (
          <div key={card.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}