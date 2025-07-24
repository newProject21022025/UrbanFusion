// src/app/[locale]/AUF/visits/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Visit {
  ip: string;
  userAgent: string;
  url: string;
  timestamp: string;
  city?: string;
  country?: string;
}

type GroupBy = "day" | "week" | "month" | "all";

function groupVisits(visits: Visit[], groupBy: GroupBy) {
  const groups: Record<string, number> = {};

  for (const visit of visits) {
    const date = new Date(visit.timestamp);
    let key = "";

    switch (groupBy) {
      case "day":
        key = date.toISOString().split("T")[0]; // YYYY-MM-DD
        break;
      case "week": {
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - date.getDay());
        key = firstDayOfWeek.toISOString().split("T")[0];
        break;
      }
      case "month":
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        break;
      case "all":
        key = "Всього";
        break;
    }

    groups[key] = (groups[key] || 0) + 1;
  }

  return Object.entries(groups).map(([key, count]) => ({
    date: key,
    visits: count,
  }));
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy>("day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(`${backendUrl}/uk/visits`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Помилка завантаження");
        setVisits(data.visits.reverse());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Невідома помилка");
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, []);

  const groupedData = groupVisits(visits, groupBy);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📈 Статистика відвідувань</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Групувати за: </label>
        {(["day", "week", "month", "all"] as GroupBy[]).map((g) => (
          <button
            key={g}
            onClick={() => setGroupBy(g)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: groupBy === g ? "#0070f3" : "#eee",
              color: groupBy === g ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {g === "day" && "День"}
            {g === "week" && "Тиждень"}
            {g === "month" && "Місяць"}
            {g === "all" && "Загалом"}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={groupedData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="visits" stroke="#0070f3" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setShowList(!showList)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          {showList ? "Сховати список відвідувачів" : "Показати список відвідувачів"}
        </button>

        {showList && (
          <>
            <p>Знайдено: {visits.length} записів</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>IP</th>
                  {/* <th>Країна</th>
                  <th>Місто</th> */}
                  <th>Сторінка</th>
                  <th>Час</th>
                  <th>User-Agent</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit, i) => (
                  <tr key={i}>
                    <td>{visit.ip}</td>
                    {/* <td>{visit.country || "невідомо"}</td>
                    <td>{visit.city || "невідомо"}</td> */}
                    <td>{visit.url}</td>
                    <td>{new Date(visit.timestamp).toLocaleString("uk-UA")}</td>
                    <td style={{ fontSize: "0.8rem" }}>{visit.userAgent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
