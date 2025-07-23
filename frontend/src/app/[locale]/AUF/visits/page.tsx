// src/app/[locale]/AUF/visits/page.tsx

"use client";

import { useEffect, useState } from "react";
// import styles from "./Visits.module.css"; // можеш створити стилі, або прибрати

interface Visit {
  ip: string;
  userAgent: string;
  url: string;
  timestamp: string;
  city?: string;
  country?: string;
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(`${backendUrl}/uk/visits`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Помилка завантаження");
        }
        setVisits(data.visits.reverse()); // показувати останні спочатку
      } catch (err: any) {
        setError(err.message || "Невідома помилка");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div>
      <h2>📈 Статистика відвідувань</h2>
      <p>Знайдено: {visits.length} записів</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>IP</th>
            <th>Країна</th>
            <th>Місто</th>
            <th>Сторінка</th>
            <th>Час</th>
            <th>User-Agent</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit, i) => (
            <tr key={i}>
              <td>{visit.ip}</td>
              <td>{visit.country || "невідомо"}</td>
              <td>{visit.city || "невідомо"}</td>
              <td>{visit.url}</td>
              <td>{new Date(visit.timestamp).toLocaleString("uk-UA")}</td>
              <td style={{ fontSize: "0.8rem" }}>{visit.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
