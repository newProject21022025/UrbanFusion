// src/app/[locale]/userOrders/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./UserOrders.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useTranslations } from "next-intl"; 
import { useParams } from "next/navigation"; 

interface Order {
  _id: string;
  orderNumber: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  phone: string;
  deliveryAddress: string;
  status: string;
  createdAt: string;
  article: string;
  items: {
    name: { en: string; uk: string };
    quantity: number;
    size: string;
    color: string;
    price: { amount: number; currency: string; discount: number };
    mainImage?: {
      url: string;
      alt: { en?: string; uk?: string };
    };
  }[];
}

export default function UserOrders() {
  const t = useTranslations("UserOrders"); // Initialize translations for the "UserOrders" namespace
  const params = useParams();
  const currentLocale = params.locale as string; // Get the current locale from URL params

  const userId = useSelector((state: RootState) => state.user.userId);
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const fetchOrders = async () => {
    if (!userId || loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentLocale}/orders/user/${userId}?page=${page}&limit=5`
      ); // Use currentLocale in the API path
      if (!res.ok) throw new Error(t("failedToFetchOrders")); // Translate error message
      const data = await res.json();

      setOrders((prev) => {
        const combined = [...prev, ...data.data];
        const uniqueOrders = combined.filter(
          (order, index, self) =>
            index === self.findIndex((o) => o._id === order._id)
        );
        return uniqueOrders;
      });

      setHasMore(data.page < data.totalPages);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(t("failedToFetchOrders"), err); // Translate error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset state when userId or locale changes
    setOrders([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
    fetchOrders(); // Load the first page
  }, [userId, currentLocale]); // Add currentLocale to dependency array

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchOrders();
        }
      },
      { rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef.current, hasMore, loading, fetchOrders]); // Add fetchOrders to dependency array for correctness

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("myOrders")}</h2>{" "}
      {/* Translate "Мої замовлення" */}
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <div className={styles.imageBox}>
            {order.items.map((item, i) => (
              <div className={styles.imageBox} key={i}>
                {item.mainImage?.url && (
                  <img
                    className={styles.image}
                    src={item.mainImage.url}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    alt={
                      item.mainImage.alt
                        ? item.mainImage.alt[currentLocale as "en" | "uk"] || ""
                        : ""
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.infoBox}>
            <p>
              <strong>{t("date")}:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString(currentLocale)}
            </p>
            <p>
              <strong>{t("orderNumber")}:</strong> {order.orderNumber}
            </p>
            <div className={styles.article}>{order.article}</div>
            <p>
              <strong>{t("name")}:</strong> {order.firstName}
            </p>
            <p>
              <strong>{t("lastName")}:</strong> {order.lastName}
            </p>
            <p>
              <strong>{t("email")}:</strong> {order.userEmail}
            </p>
            <p>
              <strong>{t("phone")}:</strong> {order.phone}
            </p>
            <p>
              <strong>{t("address")}:</strong> {order.deliveryAddress}
            </p>
          </div>
          <div className={styles.orderBox}>
            <p>
              <strong>{t("status")}:</strong> {order.status}
            </p>
            <ul className={styles.orderItems}>
              {order.items.map((item, i) => (
                <li key={i} className={styles.noBullet}>
                  <ul className={styles.itemDetails}>
                    <li>
                      {t("itemName")}:{" "}
                      {item.name[currentLocale as "en" | "uk"]}
                    </li>{" "}                    
                    <li>
                      {t("quantity")}: {item.quantity} {t("pieces")}
                    </li>
                    <li>
                      {t("size")}: {item.size}
                    </li>
                    <li>
                      {t("color")}:{" "}
                      <span
                        className={styles.circle}
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </li>
                    <li>
                      {t("priceWithoutDiscount")}:{" "}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                        }}
                      >
                        {" "}
                        {item.price.amount} {item.price.currency}
                      </span>
                    </li>
                    <li>
                      {t("priceWithDiscount")}:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {(
                          item.price.amount *
                          (1 - item.price.discount / 100)
                        ).toFixed(2)}{" "}
                        {item.price.currency}
                      </span>
                    </li>
                    <li>
                      {t("totalAmount")}:{" "}
                      {(
                        item.quantity *
                        item.price.amount *
                        (1 - item.price.discount / 100)
                      ).toFixed(2)}{" "}
                      {item.price.currency}
                    </li>
                  </ul>
                </li>
              ))}
            </ul>

            <div className={styles.statusButtons}>
              <p>
                <strong>{t("status")}: </strong>
                <span
                  className={`${styles.statusBadge} ${
                    styles["status-" + order.status]
                  }`}
                >
                  {
                    {
                      pending: t("pending"),
                      confirmed: t("confirmed"),
                      shipped: t("shipped"),
                      canceled: t("canceled"),
                    }[order.status]
                  }
                </span>
              </p>
            </div>
            <p>
              <strong>{t("orderTotal")}:</strong>{" "}
              {order.items
                .reduce(
                  (total, item) =>
                    total +
                    item.quantity *
                      item.price.amount *
                      (1 - item.price.discount / 100),
                  0
                )
                .toFixed(2)}{" "}
              {order.items[0]?.price.currency || "UAH"}
            </p>
          </div>
        </div>
      ))}
      <div ref={observerRef} style={{ height: 1 }} />
      {loading && <p>{t("loading")}</p>}{" "}    
      {!hasMore && <p>{t("allOrdersLoaded")}</p>}{" "}      
    </div>
  );
}