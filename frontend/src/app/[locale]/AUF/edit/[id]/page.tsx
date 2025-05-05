// frontend/src/app/[locale]/AUF/edit/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClothesForm from '../../../../../components/clothesForm/ClothesForm';
import styles from './page.module.css';
import { FormData } from '../../../../../components/clothesForm/ClothesForm';

export default function EditClothesItem() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClothesItem = async () => {
      try {
        const response = await fetch(`https://urban-fusion-amber.vercel.app/uk/clothes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch clothes item');
        }
        const data: FormData = await response.json();
        setInitialData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchClothesItem();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/clothes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update clothes item');
      }

      router.push('/AUF/edit');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!initialData) return <div className={styles.error}>Item not found</div>;

  return (
    <div className={styles.main}>
      <h2>Edit Clothes Item</h2>
      <ClothesForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        isEditMode={true} 
      />
    </div>
  );
}