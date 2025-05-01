/* frontend/src/app/[locale]/AUF/edit/page.tsx */

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
  } | null;
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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchClothes();
  }, [locale]);

  const fetchClothes = async () => {
    try {
      setLoading(true);
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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`https://urban-fusion-amber.vercel.app/uk/clothes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
      }

      setClothes(clothes.filter(item => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    } finally {
      setDeletingId(null);
    }
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
                alt={item.mainImage.alt[locale as 'en' | 'uk']}
                className={styles.clothesImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className={styles.noImage}>No image available</div>
            )}
            <div className={styles.cardContent}>
              <h2 className={styles.itemName}>{item.name[locale as 'en' | 'uk']}</h2>
              <p className={styles.itemDescription}>{item.description[locale as 'en' | 'uk']}</p>
              
              <div className={styles.priceContainer}>
                <span className={styles.price}>
                  {item.price.amount} {item.price.currency}
                </span>
                {item.price.discount > 0 && (
                  <span className={styles.discount}>-{item.price.discount}%</span>
                )}
              </div>
              
              <div className={`${styles.availability} ${item.availability ? styles.inStock : styles.outOfStock}`}>
                {item.availability ? 'In Stock' : 'Out of Stock'}
              </div>
              
              <div className={styles.category}>
                Category: <strong>{item.category[locale as 'en' | 'uk']}</strong>
              </div>
              
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Stock:</h3>
                {item.stock.map((stockItem, index) => (
                  <div key={index} className={styles.stockItem}>
                    <div className={styles.stockColor}>
                      Color: {stockItem.color[locale as 'en' | 'uk']} (Code: {stockItem.color.code})
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
                    {instruction[locale as 'en' | 'uk']}
                  </div>
                ))}
              </div>
              
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Details:</h3>
                {item.details.map((detail, idx) => (
                  <div key={idx} className={styles.detailItem}>
                    {detail[locale as 'en' | 'uk']}
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleDelete(item._id)}
                className={styles.deleteButton}
                disabled={deletingId === item._id}
              >
                {deletingId === item._id ? 'Deleting...' : 'Delete Item'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}