"use client";
import React from "react";
import styles from "./Catalog.module.css";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clothesService, Clothes } from "../../api/clothes/clothesService";

export default function Catalog() {
  const router = useRouter();
  const locale = useLocale();
  const [clothes, setClothes] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const formatPrice = (amount: number) => {
    return (
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 0,
      })
        .format(amount)
        .replace("₴", "")
        .trim() + " ₴"
    );
  };

  const getGenderLabel = (gender: "male" | "female" | undefined) => {
    const safeLocale = locale === "uk" ? "uk" : "en";
    const labels = {
      male: { en: "Men", uk: "Чоловіча" },
      female: { en: "Women", uk: "Жіноча" },
      undefined: { en: "Unisex", uk: "Унісекс" },
    };
    return labels[gender || "undefined"][safeLocale];
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Каталог товарів</h1>

      {loading && <div className={styles.loading}>Завантаження...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.clothesContainer}>
        {clothes.map((item) => (
          <div key={item._id} className={styles.clothesCard}>
            <div className={styles.imageContainer}>
              {item.mainImage?.url ? (
                <img
                  src={item.mainImage.url}
                  alt={item.mainImage?.alt?.[locale as "en" | "uk"] || ""}
                  className={styles.clothesImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className={styles.noImage}>No image</div>
              )}
              {!item.availability && (
                <div className={styles.soldOutBadge}>Немає в наявності</div>
              )}
              {item.price.discount > 0 && (
                <div className={styles.discountBadge}>
                  -{item.price.discount}%
                </div>
              )}
            </div>

            <div className={styles.cardContent}>
              <div className={styles.genderCategory}>
                <span className={styles.category}>
                  {item.category?.[locale as "en" | "uk"] || ""}
                </span>
                <span className={styles.gender}>
                  {getGenderLabel(item.gender)}
                </span>
                <h2 className={styles.itemName}>
                  {item.name[locale as "en" | "uk"]}
                </h2>
              </div>

              {/* Блок кольорів */}
              <div className={styles.colorsContainer}>
                {/* <span className={styles.colorsLabel}></span> */}
                <div className={styles.colorCircles}>
                  {item.stock?.map((stockItem, index) => (
                    <div
                      key={index}
                      className={styles.colorCircle}
                      style={{ backgroundColor: stockItem.color.code }}
                      title={stockItem.color[locale as "en" | "uk"]}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.priceContainer}>
                {item.price.discount > 0 ? (
                  <>
                    <span className={styles.originalPrice}>
                      {formatPrice(item.price.amount)}
                    </span>
                    <span className={styles.discountedPrice}>
                      {formatPrice(
                        Math.round(
                          item.price.amount * (1 - item.price.discount / 100)
                        )
                      )}
                    </span>
                  </>
                ) : (
                  <span className={styles.currentPrice}>
                    {formatPrice(item.price.amount)}
                  </span>
                )}
              </div>

              <button
                className={styles.addToCartButton}
                disabled={!item.availability}
              >
                {item.availability ? "Додати в кошик" : "Немає в наявності"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// "use client";
// import React from "react";
// import styles from "./Catalog.module.css";
// import { useLocale } from "next-intl";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { clothesService, Clothes } from "../../api/clothes/clothesService";

// export default function Catalog() {
//   const router = useRouter();
//   const locale = useLocale();
//   const [clothes, setClothes] = useState<Clothes[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchClothes();
//   }, [locale]);

//   const fetchClothes = async () => {
//     try {
//       setLoading(true);
//       const data = await clothesService.getAllClothes(locale);
//       setClothes(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className={styles.main}>
//       <h1 className={styles.title}>Clothes Management</h1>
//       <div className={styles.clothesContainer}>
//         {clothes.map((item) => (
//           <div key={item._id} className={styles.clothesCard}>
//             {item.mainImage && item.mainImage.url ? (
//               <img
//                 src={item.mainImage.url}
//                 alt={item.mainImage.alt[locale as "en" | "uk"]}
//                 className={styles.clothesImage}
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).style.display = "none";
//                 }}
//               />
//             ) : (
//               <div className={styles.noImage}>No image available</div>
//             )}
//             <div className={styles.cardContent}>
//               <h2 className={styles.itemName}>
//                 {item.name[locale as "en" | "uk"]}
//               </h2>
//               <p className={styles.itemDescription}>
//                 {item.description[locale as "en" | "uk"]}
//               </p>

//               <div className={styles.priceContainer}>
//                 <span className={styles.price}>
//                   {item.price.amount} {item.price.currency}
//                 </span>
//                 {item.price.discount > 0 && (
//                   <span className={styles.discount}>
//                     -{item.price.discount}%
//                   </span>
//                 )}
//               </div>

//               <div
//                 className={`${styles.availability} ${
//                   item.availability ? styles.inStock : styles.outOfStock
//                 }`}
//               >
//                 {item.availability ? "In Stock" : "Out of Stock"}
//               </div>

//               <div className={styles.category}>
//                 Category:{" "}
//                 <strong>{item.category[locale as "en" | "uk"]}</strong>
//               </div>

//               <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Stock:</h3>
//                 {item.stock.map((stockItem, index) => (
//                   <div key={index} className={styles.stockItem}>
//                     <div className={styles.stockColor}>
//                       Color: {stockItem.color[locale as "en" | "uk"]} (Code:{" "}
//                       {stockItem.color.code})
//                     </div>
//                     <div className={styles.stockSizes}>
//                       Sizes:
//                       {stockItem.sizes.map((size, idx) => (
//                         <span key={idx} className={styles.sizeItem}>
//                           {size.size} ({size.quantity})
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Care Instructions:</h3>
//                 {item.careInstructions.map((instruction, idx) => (
//                   <div key={idx} className={styles.careItem}>
//                     {instruction[locale as "en" | "uk"]}
//                   </div>
//                 ))}
//               </div>

//               <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Details:</h3>
//                 {item.details.map((detail, idx) => (
//                   <div key={idx} className={styles.detailItem}>
//                     {detail[locale as "en" | "uk"]}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
