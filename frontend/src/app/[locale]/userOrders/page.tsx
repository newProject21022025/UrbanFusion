'use client';

import { useEffect, useState } from 'react';
import styles from './UserOrders.module.css';

interface Order {
  _id: string;
  status: string;
  createdAt: string;
  items: {
    name: { uk: string };
    quantity: number;
    size: string;
    color: string;
    price: { amount: number; currency: string };
  }[];
}

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // або контекст, куки, auth token
    if (!userId) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders/user/${userId}`) // Проксі до бекенду
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Мої замовлення</h1>
      {orders.map(order => (
        <div key={order._id} className={styles.orderCard}>
          <p><strong>Статус:</strong> {order.status}</p>
          <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <ul className={styles.orderItems}>
            {order.items.map((item, i) => (
              <li key={i} className={styles.noBullet}>
                {item.name.uk} – {item.quantity} шт., {item.size}, {item.color} – {item.price.amount} {item.price.currency}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
