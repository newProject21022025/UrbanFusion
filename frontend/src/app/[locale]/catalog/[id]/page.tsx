// src/app/[locale]/catalog/[id]/page.tsx

"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { clothesService, type Clothes } from "../../../api/clothes/clothesService";


export default function ClothesPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as "en" | "uk";
  const id = params.id as string;

  const [clothes, setClothes] = useState<Clothes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClothes = useCallback(async () => {
    try {
      const data = await clothesService.getClothesById(id, locale);
      setClothes(data);
    } catch (err: unknown) {
      setError(
        t("Catalog.error", {
          message: err instanceof Error ? err.message : "Unknown error",
        })
      );
    }
  }, [id, locale, t]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);

  if (error) return <div>{error}</div>;
  if (!clothes) return <div>{t("Catalog.loading")}</div>;
  
  const discountedPrice =
    clothes.price.amount * (1 - clothes.price.discount / 100);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{clothes.name[locale]}</h1>

      {clothes.mainImage?.url && (
        <img
          src={clothes.mainImage.url}
          alt={clothes.mainImage.alt[locale] || ""}
          width={600}
          height={600}
          className={styles.image}
          // priority
        />
      )}

      <div className={styles.description}>{clothes.description[locale]}</div>

      <div className={styles.priceBlock}>
        {clothes.price.discount > 0 && (
          <>
            <span className={styles.oldPrice}>
              {clothes.price.amount} {clothes.price.currency}
            </span>
            <span className={styles.discount}>-{clothes.price.discount}%</span>
          </>
        )}
        <span className={styles.newPrice}>
          {discountedPrice.toFixed(2)} {clothes.price.currency}
        </span>
      </div>

      <div className={styles.label}>
        {t("CategorySection.title")}: {clothes.category[locale]}
      </div>

      <div className={styles.label}>
        {t("BasicInfoSection.gender")}:{" "}
        {clothes.gender === "male"
          ? t("BasicInfoSection.male")
          : t("BasicInfoSection.female")}
      </div>

      <div className={styles.label}>
        {t("PriceSection.availability")}:{" "}
        {clothes.availability
          ? t("PriceSection.available")
          : t("PriceSection.notAvailable")}
      </div>

      <div className={styles.stockBlock}>
        <h2>{t("StockSection.title")}:</h2>
        {clothes.stock.map((stock, i) => {
          const hideSizesFor = ["Окуляри", "Сумки", "Glasses", "Bags"];
          const categoryName = clothes.category[locale];
          const shouldShowSizes = !hideSizesFor.includes(categoryName);

          return (
            <div key={i}>
              <div className={styles.label}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: stock.color.code }}
                  title={stock.color[locale]}
                />
                {stock.color[locale]}
              </div>
              {shouldShowSizes && (
                <div style={{ marginLeft: "1rem" }}>
                  {stock.sizes.map((sizeObj, j) => (
                    <div key={j}>
                      {t("StockSection.selectSize")}: {sizeObj.size},{" "}
                      {t("StockSection.quantity")}: {sizeObj.quantity}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}