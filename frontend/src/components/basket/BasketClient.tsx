// src/components/basket/BasketClient.tsx

"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  removeItem,
  updateQuantity,
  clearBasket,
} from "../../redux/slices/basketSlice";
import Link from "next/link";
import styles from "./BasketClient.module.css";

interface SizeObject {
  size: string;
  quantity: number;
}

interface StockItem {
  color: {
    code: string;
    en: string;
    uk: string;
  };
  sizes: SizeObject[];
}

export default function BasketClient() {
  const t = useTranslations("Basket");
  const locale = useLocale();
  const dispatch = useDispatch();
  const [mounted, setMounted] = React.useState(false);
  const basketItems = useSelector((state: RootState) => state.basket.items);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const formatPrice = (amount: number) => {
    return (
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 0,
      })
        .format(amount)
        .replace("", "")
        .trim() + ""
    );
  };

  const handleRemoveItem = (id: string, color?: string, size?: string) => {
    dispatch(removeItem({ id, color, size }));
  };

  const handleQuantityChange = (
    id: string,
    color: string | undefined,
    size: string | undefined,
    newQuantity: number
  ) => {
    const item = basketItems.find(
      (i) =>
        i._id === id && i.selectedColor === color && i.selectedSize === size
    );

    if (!item) return;

    const stockItem = item.stock?.find((s: StockItem) => s.color.code === item.selectedColor);
    const sizeObj = stockItem?.sizes.find((s: SizeObject) => s.size === item.selectedSize);

    if (!sizeObj) return;

    const availableStock = sizeObj.quantity;

    if (newQuantity < 1 || newQuantity > availableStock) {
      alert(`Максимальна кількість цього товару на складі: ${availableStock}`);
      return;
    }

    if (newQuantity !== item.quantity) {
      dispatch(updateQuantity({ id, color, size, quantity: newQuantity }));
    }
  };

  const calculateTotal = () => {
    return basketItems.reduce((total, item) => {
      const price =
        item.price.discount > 0
          ? Math.round(item.price.amount * (1 - item.price.discount / 100))
          : item.price.amount;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t("title")}</h1>

      {basketItems.length === 0 ? (
        <div className={styles.emptyBasket}>
          <p>{t("emptyBasket")}</p>
          <Link href={`/${locale}/catalog`} className={styles.continueShopping}>
            {t("continueShopping")}
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.basketItems}>
            {basketItems.map((item) => {
              const price =
                item.price.discount > 0
                  ? Math.round(
                      item.price.amount * (1 - item.price.discount / 100)
                    )
                  : item.price.amount;

              const stockItem = item.stock?.find(
                (s: StockItem) => s.color.code === item.selectedColor
              );
              const sizeObj = stockItem?.sizes.find(
                (s: SizeObject) => s.size === item.selectedSize
              );
              const availableStock = sizeObj?.quantity ?? 0;

              return (
                <div
                  key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                  className={styles.basketItem}
                >
                  <div className={styles.itemImage}>
                    {item.mainImage?.url ? (
                      <img
                        src={item.mainImage.url}
                        alt={item.mainImage?.alt?.[locale as "en" | "uk"] || ""}
                      />
                    ) : (
                      <div className={styles.noImage}>No image</div>
                    )}
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.name[locale as "en" | "uk"]}</h3>
                    <p>{item.category?.[locale as "en" | "uk"]}</p>
                    {item.selectedColor && (
                      <p>
                        {t("color")}:{" "}
                        {
                          item.stock?.find(
                            (s: StockItem) => s.color.code === item.selectedColor
                          )?.color[locale as "en" | "uk"]
                        }
                      </p>
                    )}
                    {item.selectedSize && <p>{t("size")}: {item.selectedSize}</p>}
                  </div>
                  <div className={styles.itemPrice}>{formatPrice(price)}</div>
                  <div className={styles.itemQuantity}>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          item.selectedColor,
                          item.selectedSize,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          item.selectedColor,
                          item.selectedSize,
                          item.quantity + 1
                        )
                      }
                      disabled={item.quantity >= availableStock}
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.itemTotal}>
                    {formatPrice(price * item.quantity)}
                  </div>
                  <button
                    className={styles.removeItem}
                    onClick={() =>
                      handleRemoveItem(
                        item._id,
                        item.selectedColor,
                        item.selectedSize
                      )
                    }
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.basketSummary}>
            <div className={styles.total}>
              <span>{t("total")}:</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.clearBasket}
                onClick={() => dispatch(clearBasket())}
              >
                {t("clearBasket")}
              </button>
              <Link href={`/${locale}/order`} className={styles.order}>
                {t("proceedToCheckout")}
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

