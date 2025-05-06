/* frontend/src/app/[locale]/AUF/edit/page.tsx */

"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./Edit.module.css";
import { useRouter } from "next/navigation";
import { clothesService, Clothes } from "../../../api/clothes/clothesService";

export default function Edit() {
  const router = useRouter();
  const locale = useLocale();
  const [clothes, setClothes] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchClothes();
  }, [locale]);

  const fetchClothes = async () => {
    try {
      setLoading(true);
      const data = await clothesService.getAllClothes(locale);
      setClothes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this item? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeletingId(id);
      await clothesService.deleteClothes(id, locale);
      setClothes(clothes.filter((item) => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/${locale}/AUF/edit/${id}`);
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Clothes Management</h1>
      <div className={styles.clothesContainer}>
        {clothes.map((item) => (
          <div key={item._id} className={styles.clothesCard}>
            {item.mainImage && item.mainImage.url ? (
              <img
                src={item.mainImage.url}
                alt={item.mainImage.alt[locale as "en" | "uk"]}
                className={styles.clothesImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className={styles.noImage}>No image available</div>
            )}
            <div className={styles.cardContent}>
              <h2 className={styles.itemName}>
                {item.name[locale as "en" | "uk"]}
              </h2>
              <p className={styles.itemDescription}>
                {item.description[locale as "en" | "uk"]}
              </p>

              <div className={styles.priceContainer}>
                <span className={styles.price}>
                  {item.price.amount} {item.price.currency}
                </span>
                {item.price.discount > 0 && (
                  <span className={styles.discount}>
                    -{item.price.discount}%
                  </span>
                )}
              </div>

              <div
                className={`${styles.availability} ${
                  item.availability ? styles.inStock : styles.outOfStock
                }`}
              >
                {item.availability ? "In Stock" : "Out of Stock"}
              </div>

              <div className={styles.category}>
                Category:{" "}
                <strong>{item.category[locale as "en" | "uk"]}</strong>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Stock:</h3>
                {item.stock.map((stockItem, index) => (
                  <div key={index} className={styles.stockItem}>
                    <div className={styles.stockColor}>
                      Color: {stockItem.color[locale as "en" | "uk"]} (Code:{" "}
                      {stockItem.color.code})
                    </div>
                    <div className={styles.stockSizes}>
                      Sizes:
                      {stockItem.sizes.map((size, idx) => (
                        <span key={idx} className={styles.sizeItem}>
                          {size.size} ({size.quantity})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Care Instructions:</h3>
                {item.careInstructions.map((instruction, idx) => (
                  <div key={idx} className={styles.careItem}>
                    {instruction[locale as "en" | "uk"]}
                  </div>
                ))}
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Details:</h3>
                {item.details.map((detail, idx) => (
                  <div key={idx} className={styles.detailItem}>
                    {detail[locale as "en" | "uk"]}
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                <button
                  onClick={() => handleEdit(item._id)}
                  className={styles.editButton}
                >
                  editButton
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className={styles.deleteButton}
                  disabled={deletingId === item._id}
                >
                  {deletingId === item._id ? 'Deleting...' : 'Delete Item'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}