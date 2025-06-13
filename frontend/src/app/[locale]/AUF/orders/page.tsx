// src/app/[locale]/AUF/orders/page.tsx

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Orders.module.css";

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

interface PaginatedOrders {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Order[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadOrders = useCallback(async () => {
    if (loading || page > totalPages) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders?page=${page}&limit=5`
      );
      const data: PaginatedOrders = await res.json();

      setOrders((prev) => [...prev, ...data.data]);
      setTotalPages(data.totalPages);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Помилка при завантаженні замовлень:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, totalPages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadOrders();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Не вдалося оновити статус");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Помилка оновлення статусу");
    }
  };

  const confirmOrder = async (orderId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders/${orderId}/confirm`,
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error("Не вдалося підтвердити замовлення");

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updatedOrder : order))
      );
    } catch (err) {
      console.error(err);
      alert("Помилка підтвердження замовлення");
    }
  };

  const deleteOrder = async (orderId: string) => {
    const confirmDelete = window.confirm(
      "Ви дійсно хочете видалити це замовлення?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders/${orderId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Не вдалося видалити замовлення");

      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error(err);
      alert("Помилка видалення замовлення");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Усі замовлення</h1>
  
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <p>
            <strong>Номер замовлення:</strong> {order.orderNumber}
          </p>
          <p>
            <strong>Ім’я:</strong> {order.firstName} {order.lastName}
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
          <p>
            <strong>Статус:</strong> {order.status}
          </p>
          <p>
            <strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}
          </p>
  
          <ul className={styles.orderItems}>
            {order.items.map((item, i) => (
              <li key={i} className={styles.noBullet}>
                {item.mainImage?.url && (
                  <img
                    src={item.mainImage.url}
                    width={80}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    alt={item.mainImage.alt?.uk || "Фото товару"}
                  />
                )}
                {item.name.uk} – {item.quantity} шт., {item.size}, {item.color} –{" "}
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  {item.price.amount} {item.price.currency}
                </span>{" "}
                →{" "}
                <span style={{ fontWeight: "bold", color: "green" }}>
                  {(
                    item.price.amount *
                    (1 - item.price.discount / 100)
                  ).toFixed(2)}{" "}
                  {item.price.currency}
                </span>{" "}
                ={" "}
                {(
                  item.quantity *
                  item.price.amount *
                  (1 - item.price.discount / 100)
                ).toFixed(2)}{" "}
                {item.price.currency}
              </li>
            ))}
          </ul>
  
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
  
            <p>
              <strong>Оновити статус:</strong>
            </p>
            <button onClick={() => updateOrderStatus(order._id, "pending")}>
              Очікує
            </button>
            <button onClick={() => confirmOrder(order._id)}>
              Підтверджено
            </button>
            <button onClick={() => updateOrderStatus(order._id, "shipped")}>
              Відправлено
            </button>
            <button onClick={() => updateOrderStatus(order._id, "canceled")}>
              Скасовано
            </button>
            <button
              onClick={() => deleteOrder(order._id)}
              style={{ color: "red" }}
            >
              Видалити
            </button>
          </div>
        </div>
      ))}
  
      {/* Спостерігач для Infinite Scroll */}
      <div ref={observerRef} style={{ height: "1px" }}></div>
  
      {/* Інформер про завантаження */}
      {loading && <p style={{ textAlign: "center" }}>Завантаження...</p>}
    </div>
  );
}  