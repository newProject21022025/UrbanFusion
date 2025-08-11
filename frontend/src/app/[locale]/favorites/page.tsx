// src/app/[locale]/favorites/page.tsx

"use client";
import styles from './Favorites.module.css';
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import HeartBlack from "../../../svg/Heart/heartBlack";
import { removeFromFavorites } from "../../../redux/slices/favoritesSlice";

export default function Favorites() {
  const [hasMounted, setHasMounted] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Favorites");

  const favoriteItems = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const formatPrice = (amount: number) => {
    return (
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 0,
      })
        .format(amount)
        .replace("₴", "")
        .trim() + " "
    );
  };

  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t("title")}</h1>
      
      {favoriteItems.length === 0 ? (
        <div className={styles.empty}>{t("empty")}</div>
      ) : (
        <div className={styles.favoritesContainer}>
          {favoriteItems.map((item) => (
            <div key={item._id} className={styles.favoriteItem}>
              <Link href={`/${locale}/catalog/${item._id}`} passHref>
                <div className={styles.imageContainer}>
                  {item.mainImage?.url && (
                    <img
                      src={item.mainImage.url}
                      alt={item.mainImage?.alt?.[locale as "en" | "uk"] || ""}
                      className={styles.favoriteImage}
                    />
                  )}
                </div>
              </Link>
              
              <div className={styles.favoriteInfo}>
                <h3>{item.name[locale as "en" | "uk"]}</h3>
                <div className={styles.price}>
                  {formatPrice(item.price.amount)}
                </div>
              </div>
              
              <div 
                className={styles.heart} 
                onClick={() => handleRemoveFavorite(item._id)}
              >
                <HeartBlack />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
