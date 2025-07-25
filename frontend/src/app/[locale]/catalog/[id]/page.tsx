// src/app/[locale]/catalog/[id]/page.tsx

"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import {
  clothesService,
  type Clothes,
} from "../../../api/clothes/clothesService";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../redux/slices/basketSlice";
import { useRouter } from "next/navigation";
import CreateComment from "../../../../components/createComment/CreateComment";
import LikeDislike from "../../../../components/likeDislike/LikeDislike";
import { RootState } from "../../../../redux/store";
import ShareLink from "../../../../components/shareLink/ShareLink";

export default function ClothesPage() {
  const t = useTranslations("Catalog");
  const params = useParams();
  const locale = params.locale as "en" | "uk";
  const id = params.id as string;
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector((state: RootState) => state.user.userId);
  const [clothes, setClothes] = useState<Clothes | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [itemAdded, setItemAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isAdmin = useSelector(
    (state: RootState) => state.user.role === "admin"
  );

  const fetchClothes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await clothesService.getClothesById(id, locale);
      setClothes(data);
    } catch (err: unknown) {
      setError(
        t("Catalog.error", {
          message: err instanceof Error ? err.message : "Unknown error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  }, [id, locale, t]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);

  useEffect(() => {
    if (clothes && clothes.stock.length > 0) {
      const firstStockItem = clothes.stock[0];
      const sortedSizes = [...firstStockItem.sizes].sort((a, b) =>
        a.size.localeCompare(b.size, undefined, { numeric: true })
      );

      setSelectedColor(firstStockItem.color.code);
      setSelectedSize(sortedSizes[0]?.size); // перший доступний розмір
    }
  }, [clothes]);

  useEffect(() => {
    if (clothes && selectedColor) {
      const stockItem = clothes.stock.find(
        (item) => item.color.code === selectedColor
      );

      if (stockItem) {
        const sortedSizes = [...stockItem.sizes].sort((a, b) =>
          a.size.localeCompare(b.size, undefined, { numeric: true })
        );
        setSelectedSize(sortedSizes[0]?.size);
      }
    }
  }, [selectedColor, clothes]);

  if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!clothes) return <div className={styles.loading}>{t("loading")}</div>;

  const discountedPrice =
    clothes.price.amount * (1 - clothes.price.discount / 100);

  const handleAddToBasket = () => {
    if (!selectedColor || !selectedSize) {
      alert(t("selectColorSize"));
      return;
    }

    if (!clothes._id) {
      console.error("Product missing _id:", clothes);
      return;
    }

    const selectedStockItem = clothes.stock.find(
      (stock) =>
        stock.color.code === selectedColor &&
        stock.sizes.some((sizeObj) => sizeObj.size === selectedSize)
    );

    if (!selectedStockItem) {
      console.warn("No matching stock item found", {
        selectedColor,
        selectedSize,
        stock: clothes.stock,
      });
      alert(t("sizeNotAvailable"));
      return;
    }

    const selectedSizeObj = selectedStockItem.sizes.find(
      (sizeObj) => sizeObj.size === selectedSize
    );
    const availableStock = selectedSizeObj?.quantity || 0;

    if (availableStock < 1) {
      alert(t("outOfStock"));
      return;
    }

    const itemToAdd = {
      ...clothes,
      stockItem: selectedStockItem,
      selectedColor,
      selectedSize,
      quantity: 1,
    };

    dispatch(addItem(itemToAdd));
    setItemAdded(true);

    setTimeout(() => {
      router.push(`/${locale}/catalog`);
    }, 3000);
  };

  const handleCommentAdded = () => {
    fetchClothes();
  };

  console.log(clothes);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          {clothes.mainImage?.url && (
            <img
              src={clothes.mainImage.url}
              alt={clothes.mainImage.alt[locale] || ""}
              width={600}
              height={600}
              className={styles.image}
              loading="lazy"
            />
          )}
        </div>
        <div className={styles.rightColumn}>
          {/* <div className={styles.infoBlock}></div> */}
          <p className={styles.article}>{clothes.article}</p>
          <h2 className={styles.title}>{clothes.name[locale]}</h2>
          <p className={styles.description}>{clothes.description[locale]}</p>

          <div className={styles.priceBlock}>
            {clothes.price.discount > 0 && (
              <>
                <span className={styles.oldPrice}>
                  {clothes.price.amount} {clothes.price.currency}
                </span>
                <span className={styles.discount}>
                  -{clothes.price.discount}%
                </span>
              </>
            )}
            <span className={styles.newPrice}>
              {discountedPrice.toFixed(2)} {clothes.price.currency}
            </span>
          </div>
          <h2>{t("availableGoods")}:</h2>
          <div className={styles.stockBlock}>
            {/* Кольори у рядок */}
            <div className={styles.colorRow}>
              {clothes.stock.map((stock, i) => (
                <div key={i} className={styles.stockItem}>
                  <div
                    className={`${styles.label} ${
                      selectedColor === stock.color.code ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedColor(stock.color.code)}
                  >
                    <span
                      className={styles.colorDot}
                      style={{ backgroundColor: stock.color.code }}
                      title={stock.color[locale]}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Розміри — під кольорами, в один рядок */}
            {(() => {
              const currentStock = clothes.stock.find(
                (stock) => stock.color.code === selectedColor
              );

              const categoryName = clothes.category[locale];
              const hideSizesFor = ["Окуляри", "Сумки", "Glasses", "Bags"];
              const shouldShowSizes = !hideSizesFor.includes(categoryName);

              return shouldShowSizes && currentStock ? (
                <div className={styles.sizesContainer}>
                  {[...currentStock.sizes]
                    .sort((a, b) =>
                      a.size.localeCompare(b.size, undefined, { numeric: true })
                    )
                    .map((sizeObj, j) => (
                      <div key={j} className={styles.sizeOption}>
                        <input
                          type="radio"
                          id={`size-${j}`}
                          name="size"
                          value={sizeObj.size}
                          checked={selectedSize === sizeObj.size}
                          onChange={() => setSelectedSize(sizeObj.size)}
                          disabled={sizeObj.quantity <= 0}
                        />
                        <label htmlFor={`size-${j}`}>
                          {sizeObj.size}
                          {/* {sizeObj.quantity} */}
                        </label>
                      </div>
                    ))}
                </div>
              ) : null;
            })()}
          </div>

          {clothes.careInstructions?.length > 0 && (
            <div className={styles.infoBlock}>
              <h2>{t("careTitle")}</h2>
              <ul className={styles.list}>
                {clothes.careInstructions.map((instruction, i) =>
                  instruction[locale]
                    .split(";")
                    .filter(Boolean)
                    .map((item, j) => <li key={`${i}-${j}`}>{item.trim()}</li>)
                )}
              </ul>
            </div>
          )}

          {clothes.details?.length > 0 && (
            <div className={styles.infoBlock}>
              <h2>{t("detailsTitle")}</h2>
              <ul className={styles.list}>
                {clothes.details.map((detail, i) =>
                  detail[locale]
                    .split(";")
                    .filter(Boolean)
                    .map((item, j) => <li key={`${i}-${j}`}>{item.trim()}</li>)
                )}
              </ul>
            </div>
          )}

          {itemAdded && (
            <div className={styles.successMessage}>
              ✅ {t("addedToBasketMessage") || "Товар додано до кошика!"}
            </div>
          )}
          <div className={styles.btnBlock}>
            <button
              className={styles.addToBasketButton}
              onClick={handleAddToBasket}
              disabled={!selectedColor || !selectedSize}
            >
              {t("addToBasket")}
            </button>
            <ShareLink />
          </div>
        </div>
      </div>
      <h2>{t("reviewsTitle")}</h2>
      <div className={styles.reviewsSection}>
        {clothes.reviews?.length > 0 ? (
          <ul className={styles.reviewsList}>
            {[...clothes.reviews].reverse().map((review, index) => {
              const userVote = userId
                ? review.likes.includes(userId)
                  ? "like"
                  : review.dislikes.includes(userId)
                  ? "dislike"
                  : null
                : null;

              return (
                <li key={`${review.id}-${index}`} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <strong>{review.userName}</strong>
                    <span className={styles.reviewRating}>
                      {review.rating > 0
                        ? Array(review.rating)
                            .fill(0)
                            .map((_, i) => (
                              <span key={i} aria-label="star" role="img">
                                ⭐
                              </span>
                            ))
                        : null}
                    </span>
                    {isAdmin && (
                      <button
                        className={styles.deleteButton}
                        onClick={async () => {
                          if (confirm(t("confirmDeleteReview"))) {
                            try {
                              await clothesService.deleteReview(
                                clothes._id,
                                review._id,
                                locale
                              );
                              fetchClothes();
                            } catch (error) {
                              console.error("Failed to delete review:", error);
                              alert(t("deleteReviewError"));
                            }
                          }
                        }}
                      >
                        🗑 {t("deleteReview")}
                      </button>
                    )}
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                  <div className={styles.reviewActions}>
                    <LikeDislike
                      reviewId={review._id}
                      clothesId={clothes._id}
                      initialLikes={review.likes.length}
                      initialDislikes={review.dislikes.length}
                      userId={userId}
                      locale={locale}
                      onChange={fetchClothes}
                      userVote={userVote}
                      authorId={review.userId} // ← додано
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.noReviews}>{t("noReviews")}</p>
        )}

        {userId && (
          <div className={styles.createCommentWrapper}>
            <CreateComment
              clothesId={id}
              locale={locale}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        )}
      </div>
    </main>
  );
}
