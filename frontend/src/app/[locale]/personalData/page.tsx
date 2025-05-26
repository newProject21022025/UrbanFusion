// src/app/[locale]/personalData/page.tsx

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './PersonalData.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Шлях залежить від структури проекту
import EditProfile from '../../../components/editProfile/EditProfile'; // Шлях залежить від структури проекту

export default function PersonalData() {
  const t = useTranslations('PersonalData');

  const { firstName, email } = useSelector((state: RootState) => state.user);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.content}>{t('content')}</p>

      <div className={styles.userInfo}>
        <p><strong>{t('name')}:</strong> {firstName}</p>
        <p><strong>{t('email')}:</strong> {email}</p>
      </div>
      <EditProfile />
    </main>
  );
}

