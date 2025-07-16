// src/app/[locale]/userOrders/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./UserOrders.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders/user/${userId}?page=${page}&limit=5`
      );
      if (!res.ok) throw new Error("Не вдалося отримати замовлення");
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
      console.error("Помилка завантаження замовлень:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // завантажити першу сторінку
  }, [userId]);

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
  }, [observerRef.current, hasMore, loading]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мої замовлення</h2>
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
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.infoBox}>
            <p>
              <strong>Дата:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Номер замовлення:</strong> {order.orderNumber}
            </p>
            <div className={styles.article}>{order.article}</div>
            <p>
              <strong>Ім’я:</strong> {order.firstName}
            </p>
            <p>
              <strong>Прізвище:</strong> {order.lastName}
            </p>
            <p>
              <strong>Email:</strong> {order.userEmail}
            </p>
            <p>
              <strong>Телефон:</strong> {order.phone}
            </p>
            <p>
              <strong>Адреса:</strong> {order.deliveryAddress}
            </p>
          </div>
          <div className={styles.orderBox}>
            <p>
              <strong>Статус:</strong> {order.status}
            </p>
            <ul className={styles.orderItems}>
              {order.items.map((item, i) => (
                <li key={i} className={styles.noBullet}>
                  <ul className={styles.itemDetails}>
                    <li>Назва товару: {item.name.uk}</li>
                    <li>Кількість: {item.quantity} шт.</li>
                    <li>Розмір: {item.size}</li>
                    <li>
                      Колір:{" "}
                      <span
                        className={styles.circle}
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </li>
                    <li>
                      Ціна без знижки:{" "}
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
                    <li >
                      Ціна зі знижкою:{" "}
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
                      Сума:{" "}
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
                <strong>Статус: </strong>
                <span
                  className={`${styles.statusBadge} ${
                    styles["status-" + order.status]
                  }`}
                >
                  {
                    {
                      pending: "Очікує",
                      confirmed: "Підтверджено",
                      shipped: "Відправлено",
                      canceled: "Скасовано",
                    }[order.status]
                  }
                </span>
              </p>
            </div>
            <p>
              <strong>Сума замовлення:</strong>{" "}
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
      {loading && <p>Завантаження...</p>}
      {!hasMore && <p>Це всі ваші замовлення 😊</p>}
    </div>
  );
}
