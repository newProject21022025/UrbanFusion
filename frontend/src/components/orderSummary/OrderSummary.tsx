// components/OrderSummary.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslations, useLocale } from "next-intl";
import styles from "./OrderSummary.module.css";

type Locale = "en" | "uk";

export default function OrderSummary() {
  const t = useTranslations("Order");
  const locale = useLocale() as Locale;

  const items = useSelector((state: RootState) => state.basket.items);
  const [basketItems, setBasketItems] = useState<typeof items>([]);

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

  useEffect(() => {
    setBasketItems(items);
  }, [items]);

  if (!basketItems.length) return null;

  const totalSum = basketItems.reduce((sum, item) => {
    const price = item.price.amount;
    const discount = item.price.discount;
    const finalPrice = discount
      ? Math.round(price * (1 - discount / 100))
      : price;
    return sum + finalPrice * item.quantity;
  }, 0);

  return (
    <div className={styles.summaryContainer}>
      <h3 className={styles.summaryTitle}>{t("orderSummary")}</h3>
      <div className={styles.itemsList}>
        {basketItems.map((item) => {
          const price = item.price.amount;
          const discount = item.price.discount;
          const finalPrice = discount
            ? Math.round(price * (1 - discount / 100))
            : price;
          const totalPrice = finalPrice * item.quantity;
          const itemName = item.name?.[locale] ?? t("noName");
          const size = item.selectedSize ?? t("unknown");

          return (
            <div
              key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
              className={styles.itemRow}
            >
              <div className={styles.itemName}>
                {itemName}
                {size && <span className={styles.itemDetail}> • {size}</span>}
              </div>
              <div className={styles.itemDetails}>
                <span>
                  {item.quantity} × {formatPrice(finalPrice)}
                </span>
                <span className={styles.itemTotal}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.totalSection}>
        <div className={styles.totalRow}>
          <span>{t("totalSum")}:</span>
          <span className={styles.totalAmount}>{formatPrice(totalSum)}</span>
        </div>
      </div>
    </div>
  );
}
