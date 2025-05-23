"use client";
import React, { useEffect, useState } from "react";
import styles from "./RandomClothes.module.css";
import { useLocale } from "next-intl";
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
import { useTranslations } from "next-intl";

const RandomClothes = () => {
  const [randomClothes, setRandomClothes] = useState<Clothes[]>([]);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const locale = useLocale();
  const dispatch = useDispatch();
  const t = useTranslations("BasicInfoSection");

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
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "UAH",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("₴", "")
      .trim();

    const discounted = Math.round(amount * (1 - discount / 100));
    const formattedDiscounted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "UAH",
      minimumFractionDigits: 0,
    })
      .format(discounted)
      .replace("₴", "")
      .trim();

    return discount > 0
      ? `${formatted} → ${formattedDiscounted} ₴`
      : `${formatted} ₴`;
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Рекомендовані товари</h2>
      <div className={styles.clothesContainer}>
        {randomClothes.map((item) => {
          const categoryKey = getCategoryKey(
            item.category?.[locale as "uk" | "en"]
          );
          const ecoInfo =
            ecoDescriptions[categoryKey] || ecoDescriptions["t-shirts"];

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
                      {item.price.discount > 0 && (
                        <div className={styles.discountBadge}>
                          -{item.price.discount}%
                        </div>
                      )}
                      {!item.stock && (
                        <div className={styles.soldOutBadge}>
                          Немає в наявності
                        </div>
                      )}
                      {item.mainImage?.url ? (
                        <img
                          src={item.mainImage.url}
                          alt="product"
                          className={styles.clothesImage}
                        />
                      ) : (
                        <div className={styles.noImage}>No image</div>
                      )}
                    </div>
                  </Link>

                  <div className={styles.cardContent}>
                    <h3 className={styles.itemName}>
                      {item.name[locale as "uk" | "en"]}
                    </h3>
                    <div className={styles.genderCategory}>
                      <span className={styles.gender}>
                        {item.gender &&
                        (item.gender === "male" || item.gender === "female")
                          ? t(item.gender)
                          : "—"}
                      </span>
                      <span className={styles.separator}>|</span>
                      <span>{item.category?.[locale as "uk" | "en"]}</span>
                    </div>

                    <div className={styles.priceContainer}>
                      {item.price.discount > 0 ? (
                        <>
                          <span className={styles.originalPrice}>
                            {item.price.amount}₴
                          </span>
                          <span className={styles.discountedPrice}>
                            {formatPrice(
                              item.price.amount,
                              item.price.discount
                            )}
                          </span>
                        </>
                      ) : (
                        <span className={styles.currentPrice}>
                          {item.price.amount}₴
                        </span>
                      )}
                    </div>

                    <div className={styles.colorsContainer}>
                      <div className={styles.colorCircles}>
                        {Array.from(
                          new Set(item.stock.map((s) => s.color.code))
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

                    <h3>{ecoInfo.title}</h3>
                    <p className={styles.ecoDescription}>
                      {ecoInfo.description}
                    </p>

                    {ecoInfo.materials && (
                      <>
                        <h4 className={styles.ecoCalculatorTitle}>
                          Екоматеріали
                        </h4>
                        <div className={styles.ecoMaterials}>
                          {ecoInfo.materials.map((material, index) => (
                            <div key={index} className={styles.ecoMaterial}>
                              <div className={styles.ecoMaterialHeader}>
                                <span className={styles.ecoMaterialName}>
                                  {material.name}
                                </span>
                                <span className={styles.ecoMaterialValue}>
                                  {material.value}
                                </span>
                              </div>
                              <p className={styles.ecoMaterialDesc}>
                                {material.desc}
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
