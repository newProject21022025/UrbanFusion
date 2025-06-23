// components/OrderContent.tsx

"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./OrderContent.module.css";
import { Clothes } from "../../app/api/clothes/clothesService";
import { useLocale, useTranslations } from "next-intl";

type Locale = "en" | "uk";

export default function OrderContent() {
  const t = useTranslations("Order"); // Вказуємо namespace для перекладів, наприклад, "Order"
  const locale = useLocale() as Locale;

  const basketItems = useSelector(
    (state: RootState) => state.basket.items
  ) as (Clothes & { quantity: number })[];
 
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Під час серверного рендеру нічого не рендеримо
    return null;
  }

  if (!basketItems.length) {
    return <p>{t("emptyBasket") /* Ключ з перекладу, наприклад "emptyBasket": "Кошик порожній" */}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>{t("orderTitle") /* "Оформлення замовлення" */}</h1>
      {basketItems.map((item) => {    
        
        const name = item.name?.[locale] ?? t("noName"); // "Без назви"
        const description = item.description?.[locale] ?? t("noDescription"); // "Опис відсутній"
        const imageUrl = item.mainImage?.url ?? "/no-image.jpg";
        const imageAlt = item.mainImage?.alt?.[locale] ?? name;
        const selectedColor = item.selectedColor;
        const selectedSize = item.selectedSize;
        const quantity = item.quantity || 1;

        const matchedStock = item.stock.find(
          (s) =>
            s.color.code === selectedColor &&
            s.sizes.some((sz) => sz.size === selectedSize)
        );
        
        const matchedSize = matchedStock?.sizes.find((sz) => sz.size === selectedSize);
        
        const colorName = matchedStock?.color?.[locale] ?? selectedColor ?? t("unknown");
        const size = matchedSize?.size ?? selectedSize ?? t("unknown");        

        const price = item.price.amount;
        const discount = item.price.discount;
        const finalPrice = discount
          ? Math.round(price * (1 - discount / 100))
          : price;

        return (
          <div
            key={`${item._id}-${selectedColor}-${selectedSize}`}
            className={styles.item}
          >
            <img src={imageUrl} alt={imageAlt} width={100} height={100} />
            <div className={styles.details}>
            <div className={styles.article}>{item.article}</div>
              <h2>{name}</h2>
              <p>{description}</p>
              <p>
                <strong>{t("quantity")}:</strong> {quantity}
              </p>
              <p>
                <strong>{t("size")}:</strong> {size}
              </p>
              <p>
                <strong>{t("color")}:</strong> {colorName}
              </p>
              <p>
                <strong>{t("price")}:</strong>{" "}
                {discount ? (
                  <>
                    <span className={styles.oldPrice}>{price} грн</span>{" "}
                    <span className={styles.discountPrice}>{finalPrice} грн</span>
                  </>
                ) : (
                  `${price} грн`
                )}
              </p>              
            </div>
          </div>
        );
      })}
    </div>
  );
}
