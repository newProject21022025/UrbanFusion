// src/app/[locale]/catalog/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import { useLocale, useTranslations } from "next-intl"; // Додано useTranslations
import { clothesService, Clothes } from "../../api/clothes/clothesService";
import Eco from "../../../svg/Eco/eco";
import Cross from "../../../svg/Cross/cross";
import { ecoDescriptions, getCategoryKey } from "./data/ecoDescriptions";
import Link from "next/link";
import BasketBlack from "../../../svg/Basket/basketBlack";
import HeartWhite from "../../../svg/Heart/heartWhite";
import HeartBlack from "../../../svg/Heart/heartBlack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/favoritesSlice";
import { useSearchParams } from "next/navigation";

export default function Catalog() {
  const locale = useLocale();
  const t = useTranslations("Catalog"); // Для загальних текстів каталогу
  const tEco = useTranslations("EcoDescriptions"); // Для еко-описів

  const [clothes, setClothes] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items
  );
  const searchParams = useSearchParams();

  const selectedGender = searchParams.get("gender");
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase().trim();

  const [filteredClothes, setFilteredClothes] = useState<Clothes[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [paginatedClothes, setPaginatedClothes] = useState<Clothes[]>([]);

  useEffect(() => {
    fetchClothes();
  }, [locale]);

  useEffect(() => {
    if (!clothes?.length) return;

    const filtered = clothes.filter((item) => {
      const matchGender = selectedGender
        ? item.gender === selectedGender
        : true;
      const matchCategory = selectedCategory
        ? item.category?.[locale as "en" | "uk"] === selectedCategory
        : true;

      const nameMatch = item.name[locale as "en" | "uk"]
        .toLowerCase()
        .includes(searchQuery || "");

      const categoryMatch = item.category?.[locale as "en" | "uk"]
        .toLowerCase()
        .includes(searchQuery || "");

      const articleMatch = item.article
        ?.toLowerCase()
        .includes(searchQuery || "");

      const matchSearch = searchQuery
        ? nameMatch || categoryMatch || articleMatch
        : true;

      return matchGender && matchCategory && matchSearch;
    });

    setFilteredClothes(filtered);
    setVisibleCount(10); // скидаємо при новій фільтрації
  }, [clothes, selectedGender, selectedCategory, searchQuery, locale]);

  useEffect(() => {
    setPaginatedClothes(filteredClothes.slice(0, visibleCount));
  }, [filteredClothes, visibleCount]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        scrollTop + window.innerHeight >= scrollHeight - 200 &&
        visibleCount < filteredClothes.length
      ) {
        setVisibleCount((prev) => Math.min(prev + 10, filteredClothes.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredClothes.length, visibleCount]);

  const fetchClothes = async () => {
    try {
      setLoading(true);
      const data = await clothesService.getAllClothes(locale);
      setClothes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error"); // Тут можна також перекласти "Unknown error"
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
        .replace("", "")
        .trim() + " "
    );
  };

  const getGenderLabel = (gender: "male" | "female" | undefined) => {
    return t(`genderLabels.${gender || "unisex"}`);
  };
  

  const handleFlipCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isItemInBasket = (id: string) => {
    return basketItems.some((item) => item._id === id);
  };

  const isItemInFavorites = (id: string) => {
    return favoriteItems.some((item) => item._id === id);
  };

  const handleFavoriteClick = (item: Clothes) => {
    if (isItemInFavorites(item._id)) {
      dispatch(removeFromFavorites(item._id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>{t("title")}</h2>{" "}
      {/* Перекладено заголовок */}
      {loading && <div className={styles.loading}>{t("loading")}</div>}{" "}
      {/* Перекладено завантаження */}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.clothesContainer}>
        {paginatedClothes.map((item) => {
          const categoryKey = getCategoryKey(
            item.category?.[locale as "en" | "uk"]
          );
          const ecoInfo =
            ecoDescriptions[categoryKey] || ecoDescriptions["t-shirts"];

          return (
            <div
              key={item._id}
              className={`${styles.clothesCard} ${
                flippedCards[item._id] ? styles.flipped : ""
              }`}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <Link href={`/${locale}/catalog/${item._id}`} passHref>
                    <div className={styles.imageContainer}>
                      {item.mainImage?.url ? (
                        <img
                          src={item.mainImage.url}
                          alt={
                            item.mainImage?.alt?.[locale as "en" | "uk"] || ""
                          }
                          className={styles.clothesImage}
                          onError={(e) =>
                            ((e.target as HTMLImageElement).style.display =
                              "none")
                          }
                        />
                      ) : (
                        <div className={styles.noImage}>
                          {t("noImage")}
                        </div> // Перекладено "No image"
                      )}
                      {!item.availability && (
                        <div className={styles.soldOutBadge}>
                          {t("soldOutBadge")}
                        </div> // Перекладено "Немає в наявності"
                      )}
                      {item.price.discount > 0 && (
                        <div className={styles.discountBadge}>
                          -{item.price.discount}%
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className={styles.cardContent}>
                    <div className={styles.genderCategory}>
                      <span className={styles.category}>
                        {item.category?.[locale as "en" | "uk"] || ""}
                      </span>
                      <span className={styles.gender}>
                        {getGenderLabel(item.gender)}
                      </span>
                    </div>
                    <p className={styles.itemName}>
                      {item.name[locale as "en" | "uk"]}
                    </p>
                    <div className={styles.colorsContainer}>
                      <div className={styles.colorCircles}>
                        {item.stock?.map((stockItem, index) => (
                          <div
                            key={index}
                            className={styles.colorCircle}
                            style={{
                              backgroundColor: stockItem.color.code,
                            }}
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
                                item.price.amount *
                                  (1 - item.price.discount / 100)
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

                    <div
                      className={styles.heart}
                      onClick={() => handleFavoriteClick(item)}
                    >
                      {isItemInFavorites(item._id) ? (
                        <HeartBlack />
                      ) : (
                        <HeartWhite />
                      )}
                    </div>
                    <div
                      className={`${styles.basket} ${
                        isItemInBasket(item._id) ? styles.active : ""
                      }`}
                    >
                      <BasketBlack />
                    </div>

                    <div
                      className={styles.ecoIcon}
                      onClick={() => handleFlipCard(item._id)}
                    >
                      <Eco />
                    </div>
                  </div>
                </div>

                <div className={styles.cardBack}>
                  <div className={styles.cardBackContent}>
                    <h3>{tEco(ecoInfo.titleKey)}</h3>{" "}
                    {/* Переклад заголовка еко-інфо */}
                    <div className={styles.ecoDescription}>
                      {tEco(ecoInfo.descriptionKey)
                        .split("\n")
                        .map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}{" "}
                      {/* Переклад опису еко-інфо */}
                    </div>

                    <h4 className={styles.ecoCalculatorTitle}>
                      {tEco("ecoCalculatorTitle")}
                    </h4>{" "}
                    {/* Переклад заголовка калькулятора */}
                    <div className={styles.ecoMaterials}>
                      {ecoInfo.materials.map((material, index) => (
                        <div key={index} className={styles.ecoMaterial}>
                          <div className={styles.ecoMaterialHeader}>
                            <span className={styles.ecoMaterialName}>
                              {tEco(material.nameKey)}{" "}
                              {/* Переклад назви матеріалу */}
                            </span>
                            <span className={styles.ecoMaterialValue}>
                              {material.value}
                            </span>
                          </div>
                          <p className={styles.ecoMaterialDesc}>
                            {tEco(material.descKey)}{" "}
                            {/* Переклад опису матеріалу */}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div
                      className={styles.closeIcon}
                      onClick={() => handleFlipCard(item._id)}
                    >
                      <Cross />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <div className={styles.loading}>{t("loading")}</div>}
    </main>
  );
}