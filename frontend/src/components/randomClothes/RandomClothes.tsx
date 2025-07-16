// src/components/RandomClothes/RandomClothes.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./RandomClothes.module.css";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/redux/slices/favoritesSlice";
import Eco from "@/svg/Eco/eco";
import Cross from "@/svg/Cross/cross";
import BasketBlack from "@/svg/Basket/basketBlack";
import HeartWhite from "@/svg/Heart/heartWhite";
import HeartBlack from "@/svg/Heart/heartBlack";
import {
  ecoDescriptions,
  getCategoryKey,
} from "@/app/[locale]/catalog/data/ecoDescriptions";
import { clothesService, Clothes } from "../../app/api/clothes/clothesService";

const RandomClothes = () => {
  const [randomClothes, setRandomClothes] = useState<Clothes[]>([]);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const locale = useLocale();
  const dispatch = useDispatch();

  const t = useTranslations("BasicInfoSection");
  const tEco = useTranslations("EcoDescriptions");

  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items
  );

  useEffect(() => {
    const fetchAndPickRandom = async () => {
      const allClothes = await clothesService.getAllClothes(locale);
      const shuffled = [...allClothes].sort(() => 0.5 - Math.random());
      setRandomClothes(shuffled.slice(0, 4));
    };
    fetchAndPickRandom();
  }, [locale]);

  const handleFlipCard = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFavoriteClick = (item: Clothes) => {
    if (favoriteItems.some((fav) => fav._id === item._id)) {
      dispatch(removeFromFavorites(item._id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const formatPrice = (amount: number, discount: number) => {
    const original = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "UAH",
      minimumFractionDigits: 0,
    }).format(amount);

    const discounted = Math.round(amount * (1 - discount / 100));
    const formattedDiscounted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "UAH",
      minimumFractionDigits: 0,
    }).format(discounted);

    return {
      original,
      discounted: formattedDiscounted,
      hasDiscount: discount > 0,
    };
  };

  return (
    <div className={styles.main}>
      <div className={styles.clothesContainer}>
        {randomClothes.map((item) => {
          const categoryKey = getCategoryKey(
            item.category?.[locale as "uk" | "en"]
          );
          const ecoInfo =
            ecoDescriptions[categoryKey] || ecoDescriptions["t-shirts"];

          const { original, discounted, hasDiscount } = formatPrice(
            item.price.amount,
            item.price.discount
          );

          return (
            <div
              key={item._id}
              className={`${styles.clothesCard} ${
                flippedCards[item._id] ? styles.flipped : ""
              }`}
            >
              <div className={styles.cardInner}>
                {/* FRONT */}
                <div className={styles.cardFront}>
                  <Link href={`/${locale}/catalog/${item._id}`}>
                    <div className={styles.imageContainer}>
                      {hasDiscount && (
                        <div className={styles.discountBadge}>
                          -{item.price.discount}%
                        </div>
                      )}
                      {!item.stock?.length && (
                        <div className={styles.soldOutBadge}>
                          {t("soldOutBadge")}
                        </div>
                      )}
                      {item.mainImage?.url ? (
                        <img
                          src={item.mainImage.url}
                          alt="product"
                          className={styles.clothesImage}
                        />
                      ) : (
                        <div className={styles.noImage}>{t("noImage")}</div>
                      )}
                    </div>
                  </Link>

                  <div className={styles.cardContent}>
                    <div className={styles.genderCategory}>
                      <span>{item.category?.[locale as "uk" | "en"]}</span>
                      <span className={styles.gender}>
                        {item.gender === "male" || item.gender === "female"
                          ? t(`genderLabels.${item.gender}`)
                          : "—"}
                      </span>
                    </div>

                    <p className={styles.itemName}>
                      {item.name[locale as "uk" | "en"]}
                    </p>

                    <div className={styles.priceContainer}>
                      {hasDiscount ? (
                        <>
                          <span className={styles.originalPrice}>
                            {original}
                          </span>
                          <span className={styles.discountedPrice}>
                            {discounted}
                          </span>
                        </>
                      ) : (
                        <span className={styles.currentPrice}>{original}</span>
                      )}
                    </div>

                    <div className={styles.colorsContainer}>
                      <div className={styles.colorCircles}>
                        {Array.from(
                          new Set(item.stock?.map((s) => s.color.code))
                        ).map((color) => (
                          <div
                            key={color}
                            className={styles.colorCircle}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div
                      className={styles.heart}
                      onClick={() => handleFavoriteClick(item)}
                    >
                      {favoriteItems.some((fav) => fav._id === item._id) ? (
                        <HeartBlack />
                      ) : (
                        <HeartWhite />
                      )}
                    </div>

                    <div className={styles.basket}>
                      <BasketBlack />
                    </div>

                    <div
                      className={styles.ecoIcon}
                      onClick={() => handleFlipCard(item._id)}
                    >
                      <Eco />
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className={styles.cardBack}>
                  <div className={styles.cardBackContent}>
                    <div
                      className={styles.closeIcon}
                      onClick={() => handleFlipCard(item._id)}
                    >
                      <Cross />
                    </div>

                    <h3>{tEco(ecoInfo.titleKey)}</h3>

                    <p className={styles.ecoDescription}>
                      {tEco(ecoInfo.descriptionKey)}
                    </p>

                    {ecoInfo.materials && (
                      <>
                        <h4 className={styles.ecoCalculatorTitle}>
                          {tEco("ecoCalculatorTitle")}
                        </h4>
                        <div className={styles.ecoMaterials}>
                          {ecoInfo.materials.map((material, index) => (
                            <div key={index} className={styles.ecoMaterial}>
                              <div className={styles.ecoMaterialHeader}>
                                <span className={styles.ecoMaterialName}>
                                  {tEco(material.nameKey)}
                                </span>
                                <span className={styles.ecoMaterialValue}>
                                  {material.value}
                                </span>
                              </div>
                              <p className={styles.ecoMaterialDesc}>
                                {tEco(material.descKey)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RandomClothes;
