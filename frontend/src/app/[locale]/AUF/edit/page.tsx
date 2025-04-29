'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import styles from './Edit.module.css';

interface Clothes {
  _id: string;
  slug: string;
  name: {
    en: string;
    uk: string;
  };
  description: {
    en: string;
    uk: string;
  };
  mainImage: {
    url: string;
    alt: {
      en: string;
      uk: string;
    };
  } | null;  // Додаємо можливість, що mainImage може бути null
  price: {
    amount: number;
    currency: string;
    discount: number;
  };
  availability: boolean;
  category: {
    id: string;
    en: string;
    uk: string;
  };
  stock: {
    color: {
      code: string;
      en: string;
      uk: string;
    };
    sizes: {
      size: string;
      quantity: number;
    }[];
  }[];
  careInstructions: {
    en: string;
    uk: string;
  }[];
  details: {
    en: string;
    uk: string;
  }[];
  reviews: {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: {
      en: string;
      uk: string;
    };
    likes: string[];
  }[];
}

export default function Edit() {
  const locale = useLocale();
  const [clothes, setClothes] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const url = `https://urban-fusion-amber.vercel.app/${locale}/clothes`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClothes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, [locale]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.main}>
      <div className={styles.clothesContainer}>
        {clothes.map((item) => (
          <div key={item._id} className={styles.clothesCard}>
            {/* Перевірка наявності mainImage перед використанням */}
            {item.mainImage && item.mainImage.url ? (
              <img
                src={item.mainImage.url}
                alt={item.mainImage.alt[locale as 'en' | 'uk']}
                className={styles.clothesImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className={styles.noImage}>No image available</div> // Якщо зображення немає
            )}
            <h2>{item.name[locale as 'en' | 'uk']}</h2>
            <p>{item.description[locale as 'en' | 'uk']}</p>
            <div className={styles.price}>
              {item.price.amount} {item.price.currency}{' '}
              {item.price.discount > 0 && (
                <span className={styles.discount}>-{item.price.discount}%</span>
              )}
            </div>
            <div className={styles.availability}>
              {item.availability ? 'In Stock' : 'Out of Stock'}
            </div>
            <div className={styles.category}>
              <strong>{item.category[locale as 'en' | 'uk']}</strong>
            </div>
            <div className={styles.stock}>
              <h4>Stock:</h4>
              {item.stock.map((stockItem, index) => (
                <div key={index} className={styles.stockItem}>
                  <div>
                    Color: {stockItem.color[locale as 'en' | 'uk']} (Code: {stockItem.color.code})
                  </div>
                  <div>
                    Sizes:
                    {stockItem.sizes.map((size, idx) => (
                      <span key={idx}>
                        {size.size} ({size.quantity} available)
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.careInstructions}>
              <h4>Care Instructions:</h4>
              {item.careInstructions.map((instruction, idx) => (
                <div key={idx}>
                  {instruction[locale as 'en' | 'uk']}
                </div>
              ))}
            </div>
            <div className={styles.details}>
              <h4>Details:</h4>
              {item.details.map((detail, idx) => (
                <div key={idx}>{detail[locale as 'en' | 'uk']}</div>
              ))}
            </div>
            <div className={styles.reviews}>
              <h4>Reviews:</h4>
              {item.reviews.map((review, idx) => (
                <div key={idx} className={styles.review}>
                  <div>{review.userName}</div>
                  <div>Rating: {review.rating}</div>
                  <div>{review.comment[locale as 'en' | 'uk']}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
