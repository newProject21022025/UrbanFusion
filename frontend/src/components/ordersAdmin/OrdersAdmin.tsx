// src/components/ordersAdmin/OrdersAdmin.tsx

'use client';

import { useEffect, useState } from 'react';
import styles from './OrdersAdmin.module.css';

type OrderItem = {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  name: { en: string; uk: string };
  description: { en: string; uk: string };
  mainImage: { url: string; alt: { en: string; uk: string } } | null;
  price: { amount: number; currency: string; discount: number };
  category: { id: string; en: string; uk: string };
  gender: 'male' | 'female';
};

type Order = {
  _id: string;
  userEmail: string;
  deliveryAddress: string;
  postOfficeDetails?: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'canceled';
  items: OrderItem[];
  createdAt: string;
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders') // Потрібно проксувати до вашого Nest.js API
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch orders:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className={styles.loading}>Завантаження замовлень...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Усі замовлення</h1>
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <h2>
            {order.firstName} {order.lastName} ({order.userEmail})
          </h2>
          <p>Телефон: {order.phone}</p>
          <p>Адреса доставки: {order.deliveryAddress}</p>
          {order.postOfficeDetails && <p>Відділення: {order.postOfficeDetails}</p>}
          <p>Статус: {order.status}</p>
          <p>Дата: {new Date(order.createdAt).toLocaleString()}</p>

          <ul className={styles.itemsList}>
            {order.items.map((item, idx) => (
              <li key={idx} className={styles.item}>
                <img src={item.mainImage?.url || '/no-image.png'} alt={item.mainImage?.alt.uk || 'image'} />
                <div>
                  <p><strong>{item.name.uk}</strong></p>
                  <p>Кількість: {item.quantity}</p>
                  <p>Розмір: {item.size}</p>
                  <p>Колір: {item.color}</p>
                  <p>Ціна: {item.price.amount} {item.price.currency} (знижка {item.price.discount}%)</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
