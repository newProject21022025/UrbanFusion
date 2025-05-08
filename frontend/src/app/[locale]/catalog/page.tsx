// src/app/[locale]/catalog/page.tsx

"use client";
import React from "react";
import styles from "./Catalog.module.css";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { clothesService, Clothes } from "../../api/clothes/clothesService";

export default function Catalog() {
  // const router = useRouter();
  const locale = useLocale();
  const [clothes, setClothes] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Каталог товарів</h1>

      {loading && <div className={styles.loading}>Завантаження...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.clothesContainer}>
        {clothes.map((item) => (
          <div key={item._id} className={styles.clothesCard}>
            <div className={styles.imageContainer}>
              {item.mainImage?.url ? (
                <img
                  src={item.mainImage.url}
                  alt={item.mainImage?.alt?.[locale as "en" | "uk"] || ""}
                  className={styles.clothesImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className={styles.noImage}>No image</div>
              )}
              {!item.availability && (
                <div className={styles.soldOutBadge}>Немає в наявності</div>
              )}
              {item.price.discount > 0 && (
                <div className={styles.discountBadge}>
                  -{item.price.discount}%
                </div>
              )}
            </div>

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

              {/* Блок кольорів */}
              <div className={styles.colorsContainer}>
                {/* <span className={styles.colorsLabel}></span> */}
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
                          item.price.amount * (1 - item.price.discount / 100)
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
                {item.availability ? "Додати в кошик" : "Немає в наявності"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

