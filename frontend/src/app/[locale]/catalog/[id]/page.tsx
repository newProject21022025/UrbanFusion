// src/app/[locale]/catalog/[id]/page.tsx

"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import {
  clothesService,
  type Clothes,
} from "../../../api/clothes/clothesService";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../redux/slices/basketSlice";

export default function ClothesPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as "en" | "uk";
  const id = params.id as string;
  const dispatch = useDispatch();

  const [clothes, setClothes] = useState<Clothes | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
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

  const handleAddToBasket = () => {
    // Перевірка на наявність обраного кольору та розміру
    if (!selectedColor || !selectedSize) {
      alert("Оберіть колір та розмір перед додаванням до кошика.");
      return;
    }

    // Перевірка на наявність _id у товару
    if (!clothes._id) {
      console.error("У товару відсутній _id:", clothes);
      return;
    }

    // Пошук stockItem по кольору та наявності розміру
    const selectedStockItem = clothes.stock.find(
      (stock) =>
        stock.color.code === selectedColor &&
        stock.sizes.some((sizeObj) => sizeObj.size === selectedSize)
    );

    if (!selectedStockItem) {
      console.warn(
        "Не знайдено відповідний stockItem для вибраного кольору/розміру",
        {
          selectedColor,
          selectedSize,
          stock: clothes.stock,
        }
      );
      return;
    }

    // Отримання кількості товару на складі
    const selectedSizeObj = selectedStockItem.sizes.find(
      (sizeObj) => sizeObj.size === selectedSize
    );
    const availableStock = selectedSizeObj?.quantity || 0;

    if (quantity > availableStock) {
      alert(`Максимальна кількість цього товару на складі: ${availableStock}`);
      setQuantity(availableStock); // Обмеження до максимуму
      return;
    }

    const itemToAdd = {
      ...clothes,
      stockItem: selectedStockItem,
      selectedColor,
      selectedSize,
      quantity,
    };

    console.log("Додаємо товар у кошик:", itemToAdd);

    dispatch(addItem(itemToAdd));
  };

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

      <div className={styles.stockBlock}>
        <h2>{t("StockSection.title")}:</h2>
        {clothes.stock.map((stock, i) => {
          const hideSizesFor = ["Окуляри", "Сумки", "Glasses", "Bags"];
          const categoryName = clothes.category[locale];
          const shouldShowSizes = !hideSizesFor.includes(categoryName);

          return (
            <div key={i}>
              <div
                className={`${styles.label} ${
                  selectedColor === stock.color.code ? styles.selected : ""
                }`}
                onClick={() => setSelectedColor(stock.color.code)}
                style={{ cursor: "pointer" }}
              >
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
                      <label>
                        <input
                          type="radio"
                          name="size"
                          value={sizeObj.size}
                          checked={selectedSize === sizeObj.size}
                          onChange={() => setSelectedSize(sizeObj.size)}
                        />
                        {t("StockSection.selectSize")}: {sizeObj.size},{" "}
                        {t("StockSection.quantity")}: {sizeObj.quantity}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.quantityBlock}>
        <label>{t("StockSection.quantity")}</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const newValue = Number(e.target.value); // або parseInt
            setQuantity(Math.max(1, Math.min(newValue, 10)));
          }}
          min="1"
          max="10"
        />
      </div>

      <button className={styles.addToBasketButton} onClick={handleAddToBasket}>
        {t("StockSection.addToBasket")}
      </button>
    </main>
  );
}
