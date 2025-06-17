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

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{clothes.name[locale]}</h1>

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

      <div className={styles.description}>{clothes.description[locale]}</div>

      {clothes.careInstructions?.length > 0 && (
        <div className={styles.infoBlock}>
          <h2>{t("careTitle")}</h2>
          <ul className={styles.list}>
            {clothes.careInstructions.map((instruction, i) =>
              instruction[locale]
                .split(";")
                .filter(Boolean)
                .map((item, j) => (
                  <li key={`${i}-${j}`}>{item.trim()}</li>
                ))
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
                .map((item, j) => (
                  <li key={`${i}-${j}`}>{item.trim()}</li>
                ))
            )}
          </ul>
        </div>
      )}

      <div className={styles.priceBlock}>
        {clothes.price.discount > 0 && (
          <>
            <span className={styles.oldPrice}>
              {clothes.price.amount} {clothes.price.currency}
            </span>
            <span className={styles.discount}>-{clothes.price.discount}%</span>
          </>
        )}
        <span className={styles.newPrice}>
          {discountedPrice.toFixed(2)} {clothes.price.currency}
        </span>
      </div>

      <div className={styles.stockBlock}>
        <h2>{t("title")}:</h2>
        {clothes.stock.map((stock, i) => {
          const hideSizesFor = ["Окуляри", "Сумки", "Glasses", "Bags"];
          const categoryName = clothes.category[locale];
          const shouldShowSizes = !hideSizesFor.includes(categoryName);

          return (
            <div key={i} className={styles.stockItem}>
              <div
                className={`${styles.label} ${
                  selectedColor === stock.color.code ? styles.selected : ""
                }`}
                onClick={() => setSelectedColor(stock.color.code)}
                style={{ cursor: "pointer" }}
              >
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: stock.color.code }}
                  title={stock.color[locale]}
                />
                {stock.color[locale]}
              </div>

              {shouldShowSizes && (
                <div className={styles.sizesContainer}>
                  {stock.sizes.map((sizeObj, j) => (
                    <div key={j} className={styles.sizeOption}>
                      <label>
                        <input
                          type="radio"
                          name="size"
                          value={sizeObj.size}
                          checked={selectedSize === sizeObj.size}
                          onChange={() => setSelectedSize(sizeObj.size)}
                          disabled={sizeObj.quantity <= 0}
                        />
                        {t("selectSize")}: {sizeObj.size}, {t("quantity")}:{" "}
                        {sizeObj.quantity}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <ShareLink />
      </div>


      {itemAdded && (
        <div className={styles.successMessage}>
          ✅ {t("addedToBasketMessage") || "Товар додано до кошика!"}
        </div>
      )}

      <button
        className={styles.addToBasketButton}
        onClick={handleAddToBasket}
        disabled={!selectedColor || !selectedSize}
      >
        {t("addToBasket")}
      </button>

      <div className={styles.reviewsSection}>
        <h2>{t("reviewsTitle")}</h2>
        
        {clothes.reviews?.length > 0 ? (
          <ul className={styles.reviewsList}>
            {clothes.reviews.map((review, index) => {
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
                      ⭐ {review.rating}/5
                    </span>
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
          <CreateComment
            clothesId={id}
            locale={locale}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </main>
  );
}