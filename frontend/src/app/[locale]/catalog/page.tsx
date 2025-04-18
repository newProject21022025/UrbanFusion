



'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import styles from './Catalog.module.css';

interface Book {
  _id: string;
  title: {
    en: string;
    uk: string;
  };
  description: {
    en: string;
    uk: string;
  };
  image: string;
}

export default function Catalog() {
  const t = useTranslations('Catalog');
  const locale = useLocale(); // получаем текущую локаль
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://urban-fusion-amber.vercel.app/uk/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className={styles.loading}>{t('loading')}</div>;
  if (error) return <div className={styles.error}>{t('error', { message: error })}</div>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.content}>{t('content')}</p>

      <div className={styles.booksContainer}>
        {books.map((book) => (
          <div key={book._id} className={styles.bookCard}>
            <img
              src={book.image}
              alt={book.title[locale as 'en' | 'uk']}
              className={styles.bookImage}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h2>{book.title[locale as 'en' | 'uk']}</h2>
            <p>{book.description[locale as 'en' | 'uk']}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
























// 'use client';

// import { useTranslations } from 'next-intl';
// import styles from './Catalog.module.css';
// import { useEffect, useState } from 'react';

// interface Book {
//   _id: string;
//   title: {
//     en: string;
//     uk: string;
//   };
//   description: {
//     en: string;
//     uk: string;
//   };
//   image: string;
// }

// export default function Catalog() {
//   const t = useTranslations('Catalog');
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch('https://urban-fusion-amber.vercel.app/uk/books');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setBooks(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <main className={styles.main}>
//       <h1 className={styles.title}>{t('title')}</h1>
//       <p className={styles.content}>{t('content')}</p>
      
//       <div className={styles.booksContainer}>
//         {books.map((book) => (
//           <div key={book._id} className={styles.bookCard}>
//             <img 
//               src={book.image} 
//               alt={book.title.uk} 
//               className={styles.bookImage}
//             />
//             <h2>{book.title.uk}</h2>
//             <p>{book.description.uk}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }