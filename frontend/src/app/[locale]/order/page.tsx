// app/[locale]/order/page.tsx

"use client"; // бо використовуєш useSelector, useLocale

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrderContent from "@/components/orderContent/OrderContent";
import OrderForm from "@/components/orderForm/OrderForm";
import OrderSummary from "@/components/orderSummary/OrderSummary";
// import { Clothes } from "@/app/api/clothes/clothesService";
import styles from "./Order.module.css";
import { useTranslations } from "next-intl";

export default function Page() {
  // const items = useSelector(
  //   (state: RootState) => state.basket.items
  // ) as (Clothes & {
  //   quantity: number;
  //   selectedColor: string;
  //   selectedSize: string;
  // })[];
  const t = useTranslations("Order");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("orderTitle")}</h2>
      <div className={styles.containerInfo}>
        <OrderForm />
        <OrderSummary />
      </div>
      <OrderContent />
    </div>
  );
}
