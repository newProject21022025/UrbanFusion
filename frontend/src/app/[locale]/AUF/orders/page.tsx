// src/app/[locale]/AUF/orders/page.tsx

"use client";

import { useEffect, useState } from "react";
import styles from "./Orders.module.css";

interface Order {
  _id: string;
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders`) // Проксі до бекенду
      .then((res) => res.json())
      .then(setOrders);
  }, []);

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

      // Оновити локальний стан після зміни статусу
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
        {
          method: "PATCH",
        }
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

  return (
    <div className={styles.container}>
      <h1>Усі замовлення</h1>
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
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
            <strong>Дата:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
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
                  />
                )}
                {item.name.uk} – {item.quantity} шт., {item.size}, {item.color}{" "}
                – {item.price.amount} {item.price.currency}
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
                  <button
                    onClick={() => updateOrderStatus(order._id, "pending")}
                  >
                    Очікує
                  </button>                 
                  <button onClick={() => confirmOrder(order._id)}>
                    Підтверджено
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, "shipped")}
                  >
                    Відправлено
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, "canceled")}
                  >
                    Скасовано
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
