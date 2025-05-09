// src/app/[locale]/catalog/page.tsx

"use client";
import React from "react";
import styles from "./Catalog.module.css";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { clothesService, Clothes } from "../../api/clothes/clothesService";
import Eco from "../../../svg/Eco/eco";
import Cross from "../../../svg/Cross/cross";
import { ecoDescriptions, getCategoryKey } from "./data/ecoDescriptions"; // Import your ecoDescriptions here
import Link from "next/link";

export default function Catalog() {
  const locale = useLocale();
  const [clothes, setClothes] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchClothes();
  }, [locale]);

  const fetchClothes = async () => {
    try {
      setLoading(true);
      const data = await clothesService.getAllClothes(locale);
      setClothes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount: number) => {
    return (
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 0,
      })
        .format(amount)
        .replace("₴", "")
        .trim() + " ₴"
    );
  };

  const getGenderLabel = (gender: "male" | "female" | undefined) => {
    const safeLocale = locale === "uk" ? "uk" : "en";
    const labels = {
      male: { en: "Men", uk: "Чоловіча" },
      female: { en: "Women", uk: "Жіноча" },
      undefined: { en: "Unisex", uk: "Унісекс" },
    };
    return labels[gender || "undefined"][safeLocale];
  };

  const handleFlipCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Каталог товарів</h1>

      {loading && <div className={styles.loading}>Завантаження...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.clothesContainer}>
        {clothes.map((item) => {
          const categoryKey = getCategoryKey(
            item.category?.[locale as "en" | "uk"]
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
                {/* Передня сторона картки */}
                <div className={styles.cardFront}>
                  <Link href={`/${locale}/catalog/${item._id}`} passHref>                   
                                        
                      <div className={styles.imageContainer}>
                        {item.mainImage?.url ? (
                          <img
                            src={item.mainImage.url}
                            alt={
                              item.mainImage?.alt?.[locale as "en" | "uk"] || ""
                            }
                            className={styles.clothesImage}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className={styles.noImage}>No image</div>
                        )}
                        {!item.availability && (
                          <div className={styles.soldOutBadge}>
                            Немає в наявності
                          </div>
                        )}
                        {item.price.discount > 0 && (
                          <div className={styles.discountBadge}>
                            -{item.price.discount}%
                          </div>
                        )}
                      </div>
                    
                  </Link>

                  <div className={styles.cardContent}>
                    <div className={styles.genderCategory}>
                      <span className={styles.category}>
                        {item.category?.[locale as "en" | "uk"] || ""}
                      </span>
                      <span className={styles.gender}>
                        {getGenderLabel(item.gender)}
                      </span>
                      <h2 className={styles.itemName}>
                        {item.name[locale as "en" | "uk"]}
                      </h2>
                    </div>

                    <div className={styles.colorsContainer}>
                      <div className={styles.colorCircles}>
                        {item.stock?.map((stockItem, index) => (
                          <div
                            key={index}
                            className={styles.colorCircle}
                            style={{ backgroundColor: stockItem.color.code }}
                            title={stockItem.color[locale as "en" | "uk"]}
                          />
                        ))}
                      </div>
                    </div>

                    <div className={styles.priceContainer}>
                      {item.price.discount > 0 ? (
                        <>
                          <span className={styles.originalPrice}>
                            {formatPrice(item.price.amount)}
                          </span>
                          <span className={styles.discountedPrice}>
                            {formatPrice(
                              Math.round(
                                item.price.amount *
                                  (1 - item.price.discount / 100)
                              )
                            )}
                          </span>
                        </>
                      ) : (
                        <span className={styles.currentPrice}>
                          {formatPrice(item.price.amount)}
                        </span>
                      )}
                    </div>

                    <button
                      className={styles.addToCartButton}
                      disabled={!item.availability}
                    >
                      {item.availability
                        ? "Додати в кошик"
                        : "Немає в наявності"}
                    </button>
                    <div
                      className={styles.ecoIcon}
                      onClick={() => handleFlipCard(item._id)}
                    >
                      <Eco />
                    </div>
                  </div>
                </div>

                {/* Зворотня сторона картки */}
                <div className={styles.cardBack}>
                  <div className={styles.cardBackContent}>
                    <h3>{ecoInfo.title}</h3>
                    <div className={styles.ecoDescription}>
                      {ecoInfo.description.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>

                    <h4 className={styles.ecoCalculatorTitle}>
                      Калькулятор екологічності
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

                    <div
                      className={styles.closeIcon}
                      onClick={() => handleFlipCard(item._id)}
                    >
                      <Cross />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
