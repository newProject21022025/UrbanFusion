// src/app/[locale]/userOrders/page.tsx

'use client';

import { useEffect, useState } from 'react';
import styles from './UserOrders.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface Order {
  _id: string;
  orderNumber: string; // Додано
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

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);  
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    if (!userId) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders/user/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(setOrders)
      .catch((err) => console.error("Order fetch error:", err));
  }, [userId]); // додано userId як залежність

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Мої замовлення</h1>
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
                                
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
