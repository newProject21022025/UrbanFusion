// app/[locale]/order/page.tsx

"use client"; 

import React from "react";
import OrderContent from "@/components/orderContent/OrderContent";
import OrderForm from "@/components/orderForm/OrderForm";
import OrderSummary from "@/components/orderSummary/OrderSummary";
import styles from "./Order.module.css";
import { useTranslations } from "next-intl";

export default function Page() {
  
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
