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
import { commentService } from "../../../api/commentService";
import { RootState } from "../../../../redux/store";

export default function ClothesPage() {
  const t = useTranslations("Catalog");
  const params = useParams();
  const locale = params.locale as "en" | "uk";
  const id = params.id as string;
  const dispatch = useDispatch();
  const router = useRouter();

  // Отримуємо userId і userName з Redux state
  const userId = useSelector((state: RootState) => state.user.userId);
  // const userName = useSelector((state: RootState) => state.user.userName);


  const [clothes, setClothes] = useState<Clothes | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [itemAdded, setItemAdded] = useState(false);

  const fetchClothes = useCallback(async () => {
    try {
      const data = await clothesService.getClothesById(id, locale);
      setClothes(data);
    } catch (err: unknown) {
      setError(
        t("Catalog.error", {
          message: err instanceof Error ? err.message : "Unknown error",
        })
      );
    }
  }, [id, locale, t]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);

  if (error) return <div>{error}</div>;
  if (!clothes) return <div>{t("loading")}</div>;

  const discountedPrice =
    clothes.price.amount * (1 - clothes.price.discount / 100);

  const handleAddToBasket = () => {
    if (!selectedColor || !selectedSize) {
      alert("Оберіть колір та розмір перед додаванням до кошика.");
      return;
    }

    if (!clothes._id) {
      console.error("У товару відсутній _id:", clothes);
      return;
    }

    const selectedStockItem = clothes.stock.find(
      (stock) =>
        stock.color.code === selectedColor &&
        stock.sizes.some((sizeObj) => sizeObj.size === selectedSize)
    );

    if (!selectedStockItem) {
      console.warn("Не знайдено відповідний stockItem", {
        selectedColor,
        selectedSize,
        stock: clothes.stock,
      });
      return;
    }

    const selectedSizeObj = selectedStockItem.sizes.find(
      (sizeObj) => sizeObj.size === selectedSize
    );
    const availableStock = selectedSizeObj?.quantity || 0;

    if (availableStock < 1) {
      alert("Цей розмір наразі відсутній на складі.");
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

  const handleLike = async (commentId: string) => {
    if (!userId) {
      console.warn("User is not logged in");
      return;
    }
    try {
      await commentService.likeComment(commentId, userId);
      fetchClothes();
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleDislike = async (commentId: string) => {
    if (!userId) {
      console.warn("User is not logged in");
      return;
    }
    try {
      await commentService.dislikeComment(commentId, userId);
      fetchClothes();
    } catch (err) {
      console.error("Dislike failed", err);
    }
  };

  // console.log("props:", { clothes, locale, userId, userName });

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
            <div key={i}>
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
                <div style={{ marginLeft: "1rem" }}>
                  {stock.sizes.map((sizeObj, j) => (
                    <div key={j}>
                      <label>
                        <input
                          type="radio"
                          name="size"
                          value={sizeObj.size}
                          checked={selectedSize === sizeObj.size}
                          onChange={() => setSelectedSize(sizeObj.size)}
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
      </div>
      {itemAdded && (
        <div className={styles.successMessage}>
          ✅ {t("addedToBasketMessage") || "Товар додано до кошика!"}
        </div>
      )}
      <button className={styles.addToBasketButton} onClick={handleAddToBasket}>
        {t("addToBasket")}
      </button>

      {clothes.reviews?.length > 0 && (
        <div className={styles.reviewsBlock}>
          <h2>{t("reviewsTitle")}</h2>
          <ul className={styles.reviewsList}>
            {clothes.reviews.map((review, index) => (
              <li
                key={review.id ?? `${review.userName}-${index}`}
                className={styles.reviewItem}
              >
                <div className={styles.reviewHeader}>
                  <strong>{review.userName}</strong> – ⭐ {review.rating}/5
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
                <div className={styles.reviewActions}>
                  <button onClick={() => handleLike(review.id)}>
                    👍 {review.likes.length}
                  </button>
                  <button onClick={() => handleDislike(review.id)}>
                    👎 {review.dislikes.length}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* {userId && userName && ( */}
        <CreateComment
          clothesId={id}
          locale={locale}
          userId={""}
          userName={""}
          onCommentAdded={handleCommentAdded}
        />
      {/* )} */}
    </main>
  );
}
