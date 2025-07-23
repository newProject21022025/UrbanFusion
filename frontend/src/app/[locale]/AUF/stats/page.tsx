// src/app/[locale]/AUF/stats/page.tsx

"use client";

import { useEffect, useState } from "react";
import styles from "./Stats.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface Order {
  _id: string;
  status: "pending" | "confirmed" | "shipped" | "canceled";
  createdAt: string;
  items: {
    quantity: number;
    price: {
      amount: number;
      discount: number;
      currency: string;
    };
  }[];
}

export default function OrderStatsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTotalSum = (orders: Order[]) => {
    return orders.reduce((sum, order) => {
      const orderTotal = order.items.reduce(
        (total, item) =>
          total +
          item.quantity * item.price.amount * (1 - item.price.discount / 100),
        0
      );
      return sum + orderTotal;
    }, 0);
  };

  const groupRevenueByMonth = () => {
    const grouped: Record<string, number> = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString("uk-UA", {
        year: "numeric",
        month: "short",
      });

      const orderTotal = order.items.reduce(
        (total, item) =>
          total +
          item.quantity * item.price.amount * (1 - item.price.discount / 100),
        0
      );

      grouped[month] = (grouped[month] || 0) + orderTotal;
    });

    return Object.entries(grouped).map(([month, total]) => ({
      name: month,
      Сума: Number(total.toFixed(2)),
    }));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders?page=1&limit=1000`
        );
        if (!res.ok) throw new Error("Помилка при отриманні замовлень");
        const data = await res.json();
        setOrders(data.data);
      } catch (err) {
        setError("Не вдалося завантажити статистику");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const countByStatus = (status: string) =>
    orders.filter((order) => order.status === status).length;

  const groupByWeek = () => {
    const grouped: Record<string, number> = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const year = date.getFullYear();
      const week = getWeekNumber(date);
      const key = `${year}-W${week}`;
      grouped[key] = (grouped[key] || 0) + 1;
    });

    return Object.entries(grouped).map(([week, count]) => ({
      name: week,
      Кількість: count,
    }));
  };

  const groupByMonth = () => {
    const grouped: Record<string, number> = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString("uk-UA", {
        year: "numeric",
        month: "short",
      });
      grouped[month] = (grouped[month] || 0) + 1;
    });

    return Object.entries(grouped).map(([month, count]) => ({
      name: month,
      Кількість: count,
    }));
  };

  const getWeekNumber = (d: Date) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };

  if (loading)
    return <p className={styles.loading}>Завантаження статистики...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.statsContainer}>
      <h2>Статистика замовлень</h2>

      <ul className={styles.statsList}>
        <li className={styles.statsItem}>
          <span className={styles.label}>Очікує:</span>
          <span className={styles.value}>
            {countByStatus("pending")} шт. |{" "}
            {getTotalSum(orders.filter((o) => o.status === "pending")).toFixed(
              2
            )}{" "}
            ₴
          </span>
        </li>

        <li className={styles.statsItem}>
          <span className={styles.label}>Підтверджено:</span>
          <span className={styles.value}>
            {countByStatus("confirmed")} шт. |{" "}
            {getTotalSum(
              orders.filter((o) => o.status === "confirmed")
            ).toFixed(2)}{" "}
            ₴
          </span>
        </li>

        <li className={styles.statsItem}>
          <span className={styles.label}>Відправлено:</span>
          <span className={styles.value}>
            {countByStatus("shipped")} шт. |{" "}
            {getTotalSum(orders.filter((o) => o.status === "shipped")).toFixed(
              2
            )}{" "}
            ₴
          </span>
        </li>

        <li className={styles.statsItem}>
          <span className={styles.label}>Скасовано:</span>
          <span className={styles.value}>
            {countByStatus("canceled")} шт. |{" "}
            {getTotalSum(orders.filter((o) => o.status === "canceled")).toFixed(
              2
            )}{" "}
            ₴
          </span>
        </li>

        <li className={`${styles.statsItem} ${styles.lastItem}`}>
          <span className={styles.label}>Загалом:</span>
          <span className={styles.value}>
            {orders.length} шт. |{" "}
            <strong>{getTotalSum(orders).toFixed(2)} ₴</strong>
          </span>
        </li>
      </ul>

      <div className={styles.chartBlock}>
        <h3>📅 Замовлення по тижнях</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupByWeek()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Кількість" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBlock}>
        <h3>📆 Замовлення по місяцях</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupByMonth()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Кількість" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartBlock}>
        <h3>💰 Доходи по місяцях</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupRevenueByMonth()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value: number | string) => `${value} ₴`} />
            <Legend />
            <Bar dataKey="Сума" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
