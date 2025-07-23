"use client";

import { useEffect } from "react";

export function LogVisitClient() {
  useEffect(() => {
    const visitData = {
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      // IP і геолокація будуть визначені на сервері
    };
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    fetch(`${backendUrl}/uk/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Помилка сервера: ${res.status} ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("Візит успішно зафіксовано");
        } else {
          console.warn("Відповідь сервера без success:", data);
        }
      })
      .catch((err) => {
        console.error("Помилка логування візиту:", err);
      });
  }, []);

  return null;
}
