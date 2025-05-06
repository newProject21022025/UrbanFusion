// frontend/src/app/[locale]/AUF/edit/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClothesForm, { FormData } from '../../../../../components/clothesForm/ClothesForm';
import styles from './page.module.css';
import { clothesService } from '../../../../api/clothes/clothesService';
import { useLocale } from 'next-intl';

export default function EditClothesItem() {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale();
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClothesItem = async () => {
      try {
        const data = await clothesService.getClothesById(id as string, locale);
        setInitialData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchClothesItem();
  }, [id, locale]);

  const handleSubmit = async (formData: FormData) => {
    try {
      await clothesService.updateClothes(id as string, formData, locale);
      alert("Картку успішно оновлено!");
      router.push('/AUF');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!initialData) return <div className={styles.error}>Item not found</div>;

  return (
    <div className={styles.main}>
      <h2>Редагування картки одягу</h2>
      <ClothesForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        isEditMode={true} 
      />
    </div>
  );
}
