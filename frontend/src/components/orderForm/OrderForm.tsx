// src/components/orderForm/OrderForm.tsx

'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import styles from './OrderForm.module.css'

export default function OrderForm() {
  const t = useTranslations('OrderForm')

  const user = useSelector((state: RootState) => state.user)

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      email: user.email || '',
      address: user.address || '',
      additionalInfo: '', // нове поле
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t('required')),
      lastName: Yup.string().required(t('required')),
      phone: Yup.string()
        .matches(/^\+\d{9,15}$/, t('invalidPhone'))
        .required(t('required')),
      email: Yup.string().email(t('invalidEmail')).required(t('required')),
      address: Yup.string().required(t('required')),
      additionalInfo: Yup.string(), // додаткову інформацію необов’язково вводити
    }),
    onSubmit: (values) => {
      console.log('Order submitted:', values)
      // тут твій код відправки замовлення
    },
    enableReinitialize: true,
  })

  return (
    <form onSubmit={formik.handleSubmit} className={styles.orderForm}>
      <label htmlFor="firstName" className={styles.label}>{t('firstName')}</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        className={styles.input}
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className={styles.error}>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName" className={styles.label}>{t('lastName')}</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        className={styles.input}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className={styles.error}>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="phone" className={styles.label}>{t('phone')}</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        className={styles.input}
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="+1234567890"
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div className={styles.error}>{formik.errors.phone}</div>
      ) : null}

      <label htmlFor="email" className={styles.label}>{t('email')}</label>
      <input
        id="email"
        name="email"
        type="email"
        className={styles.input}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className={styles.error}>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="address" className={styles.label}>{t('address')}</label>
      <input
        id="address"
        name="address"
        type="text"
        className={styles.input}
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.address && formik.errors.address ? (
        <div className={styles.error}>{formik.errors.address}</div>
      ) : null}

      <label htmlFor="additionalInfo" className={styles.label}>{t('additionalInfo')}</label>
      <textarea
        id="additionalInfo"
        name="additionalInfo"
        className={styles.textarea}
        value={formik.values.additionalInfo}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows={4}
      />

      <button type="submit" className={styles.button}>{t('submit')}</button>
    </form>
  )
}
