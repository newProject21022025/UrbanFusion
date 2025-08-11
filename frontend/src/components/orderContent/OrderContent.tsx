// components/OrderContent.tsx

"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./OrderContent.module.css";
import { Clothes } from "../../app/api/clothes/clothesService";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Locale = "en" | "uk";

export default function OrderContent() {
  const t = useTranslations("Order");
  const locale = useLocale() as Locale;

  const basketItems = useSelector(
    (state: RootState) => state.basket.items
  ) as (Clothes & { quantity: number })[];

  const [hasMounted, setHasMounted] = React.useState(false);

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

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (!basketItems.length) {
    return (
      <div className={styles.emptyBasket}>
        <p>{t("emptyBasket")}</p>
        <Link href="/shop" className={styles.continueShopping}>
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      
      <div className={styles.basketItems}>
        {basketItems.map((item) => {
          const name = item.name?.[locale] ?? t("noName");
          const description = item.description?.[locale] ?? t("noDescription");
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

          const matchedSize = matchedStock?.sizes.find(
            (sz) => sz.size === selectedSize
          );
          const colorName =
            matchedStock?.color?.[locale] ?? selectedColor ?? t("unknown");
          const size = matchedSize?.size ?? selectedSize ?? t("unknown");

          const price = item.price.amount;
          const discount = item.price.discount;
          const finalPrice = discount
            ? Math.round(price * (1 - discount / 100))
            : price;

          return (
            <div
              key={`${item._id}-${selectedColor}-${selectedSize}`}
              className={styles.basketItem}
            >
              <div className={styles.itemImage}>
                <img src={imageUrl} alt={imageAlt} />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.article}>{item.article}</div>
                <h3>{name}</h3>
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
                      <span className={styles.oldPrice}>
                        {formatPrice(price)}
                      </span>{" "}
                      <span className={styles.discountPrice}>
                        {formatPrice(finalPrice)}
                      </span>
                    </>
                  ) : (
                    formatPrice(price)
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>      
    </div>
  );
}


