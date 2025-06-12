// src/app/[locale]/AUF/feedback/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./Feedback.module.css";
import { updateCallbackStatus } from "../../../api/callback/callbackApi";

interface Callback {
  _id: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  description: string;
  isProcessed: boolean;
  createdAt: string;
}

type FilterStatus = "all" | "processed" | "unprocessed";

export default function Feedback() {
  const t = useTranslations("Feedback");

  const [feedbackList, setFeedbackList] = useState<Callback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchFeedback = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/callback/paginated?page=${page}&limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFeedbackList(data.data); // ← це масив callback'ів
      setTotalPages(Math.ceil(data.total / itemsPerPage)); // ← data.total — це загальна кількість
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback(currentPage);
  }, [currentPage]);

  const toggleProcessed = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await updateCallbackStatus(id, !currentStatus);
      setFeedbackList((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isProcessed: updated.isProcessed } : item
        )
      );
    } catch {
      alert(t("toggleError"));
    }
  };

  const filteredList = feedbackList.filter((item) => {
    if (filter === "processed") return item.isProcessed;
    if (filter === "unprocessed") return !item.isProcessed;
    return true;
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("title")}</h2>

      <div className={styles.filter}>
        <label htmlFor="filter">{t("filterLabel")}</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterStatus)}
        >
          <option value="all">{t("all")}</option>
          <option value="processed">{t("processed")}</option>
          <option value="unprocessed">{t("unprocessed")}</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.cellHead}>{t("orderNumber")}</th>
            <th className={styles.cellHead}>{t("firstName")}</th>
            <th className={styles.cellHead}>{t("lastName")}</th>
            <th className={styles.cellHead}>{t("phone")}</th>
            <th className={styles.cellHead}>{t("email")}</th>
            <th className={styles.cellHead}>{t("description")}</th>
            <th className={styles.cellHead}>{t("status")}</th>
            <th className={styles.cellHead}>{t("date")}</th>
            <th className={styles.cellHead}>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item) => (
            <tr className={styles.row} key={item._id}>
              <td className={styles.cell}>{item.orderNumber}</td>
              <td className={styles.cell}>{item.firstName}</td>
              <td className={styles.cell}>{item.lastName}</td>
              <td className={styles.cell}>{item.phone}</td>
              <td className={styles.cell}>{item.email}</td>
              <td className={styles.cell}>{item.description}</td>
              <td className={styles.cell}>
                {item.isProcessed ? t("processed") : t("unprocessed")}
              </td>
              <td className={styles.cell}>
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className={styles.cell}>
                <button
                  className={`${styles.toggleButton} ${
                    item.isProcessed ? styles.toggleButtonYellow : ""
                  }`}
                  onClick={() => toggleProcessed(item._id, item.isProcessed)}
                >
                  {item.isProcessed ? t("unmark") : t("markAsProcessed")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← {t("prev")}
        </button>
        <span>
          {t("page")} {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("next")} →
        </button>
      </div>
    </div>
  );
}


// "use client";

// import React, { useEffect, useState } from "react";
// import { useTranslations } from "next-intl";
// import styles from "./Feedback.module.css";
// import { updateCallbackStatus } from "../../../api/callback/callbackApi";

// interface Callback {
//   _id: string;
//   orderNumber: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   description: string;
//   isProcessed: boolean;
//   createdAt: string;
// }

// type FilterStatus = "all" | "processed" | "unprocessed";

// export default function Feedback() {
//   const t = useTranslations("Feedback");

//   const [feedbackList, setFeedbackList] = useState<Callback[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filter, setFilter] = useState<FilterStatus>("all");

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/callback`
//         );
//         if (!res.ok) throw new Error();
//         const data: Callback[] = await res.json();
//         setFeedbackList(data);
//       } catch {
//         setError(t("error"));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedback();
//   }, [t]);

//   const toggleProcessed = async (id: string, currentStatus: boolean) => {
//     try {
//       const updated = await updateCallbackStatus(id, !currentStatus);
//       setFeedbackList((prev) =>
//         prev.map((item) =>
//           item._id === id ? { ...item, isProcessed: updated.isProcessed } : item
//         )
//       );
//     } catch {
//       alert(t("toggleError"));
//     }
//   };

//   const filteredList = feedbackList.filter((item) => {
//     if (filter === "processed") return item.isProcessed;
//     if (filter === "unprocessed") return !item.isProcessed;
//     return true;
//   });

//   if (loading) return <p>{t("loading")}</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>{t("title")}</h2>

//       <div className={styles.filter}>
//         <label htmlFor="filter">{t("filterLabel")}</label>
//         <select
//           id="filter"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value as FilterStatus)}
//         >
//           <option value="all">{t("all")}</option>
//           <option value="processed">{t("processed")}</option>
//           <option value="unprocessed">{t("unprocessed")}</option>
//         </select>
//       </div>

//       <table className={styles.table}>
//         <thead>
//           <tr className={styles.row}>
//             <th className={styles.cellHead}>{t("orderNumber")}</th>
//             <th className={styles.cellHead}>{t("firstName")}</th>
//             <th className={styles.cellHead}>{t("lastName")}</th>
//             <th className={styles.cellHead}>{t("phone")}</th>
//             <th className={styles.cellHead}>{t("email")}</th>
//             <th className={styles.cellHead}>{t("description")}</th>
//             <th className={styles.cellHead}>{t("status")}</th>
//             <th className={styles.cellHead}>{t("date")}</th>
//             <th className={styles.cellHead}>{t("action")}</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredList.map((item) => (
//             <tr className={styles.row} key={item._id}>
//               <td className={styles.cell}>{item.orderNumber}</td>
//               <td className={styles.cell}>{item.firstName}</td>
//               <td className={styles.cell}>{item.lastName}</td>
//               <td className={styles.cell}>{item.phone}</td>
//               <td className={styles.cell}>{item.email}</td>
//               <td className={styles.cell}>{item.description}</td>
//               <td className={styles.cell}>
//                 {item.isProcessed ? t("processed") : t("unprocessed")}
//               </td>
//               <td className={styles.cell}>
//                 {new Date(item.createdAt).toLocaleDateString()}
//               </td>
//               <td className={styles.cell}>
//                 <button
//                   className={`${styles.toggleButton} ${
//                     item.isProcessed ? styles.toggleButtonYellow : ""
//                   }`}
//                   onClick={() => toggleProcessed(item._id, item.isProcessed)}
//                 >
//                   {item.isProcessed ? t("unmark") : t("markAsProcessed")}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
