// src/components/orderForm/OrderForm.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./OrderForm.module.css";
import { useRouter } from "next/navigation";
import { clearBasket } from "../../redux/slices/basketSlice";

// Функція для форматування номера телефону
const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "").replace(/^380/, ""); // прибираємо зайвий 380
  const limited = cleaned.slice(0, 9); // лише 9 цифр після коду країни 

  let formattedValue = "+380";

  if (limited.length > 0) {
    formattedValue += ` (${limited.slice(0, 2)}`;
  }

  if (limited.length >= 3) {
    formattedValue += `) ${limited.slice(2, 5)}`;
  }

  if (limited.length >= 6) {
    formattedValue += `-${limited.slice(5, 7)}`;
  }

  if (limited.length >= 8) {
    formattedValue += `-${limited.slice(7, 9)}`;
  }

  return formattedValue;
};

const OrderForm = () => {
  const t = useTranslations("OrderForm");
  const { items: basketItems } = useSelector(
    (state: RootState) => state.basket
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [guestId, setGuestId] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const defaultGuestId = "guest_user";

  useEffect(() => {
    if (typeof window !== "undefined") {
      let localId = localStorage.getItem("guestUserId");
      if (!localId) {
        localId = crypto.randomUUID();
        localStorage.setItem("guestUserId", localId);
      }
      setGuestId(localId);
      setIsClient(true);
    }
  }, []);

  // Обробник зміни номера телефону
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "").replace(/^380/, "");
    const trimmedValue = rawValue.slice(0, 9); // максимум 9 цифр
    const formattedValue = formatPhoneNumber(trimmedValue);
    formik.setFieldValue("phone", formattedValue);
  };

  // Блокуємо видалення коду країни
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (
      e.key === "Backspace" &&
      target.selectionStart !== null &&
      target.selectionStart <= 5
    ) {
      e.preventDefault();
    }
  };

  const formik = useFormik({
    initialValues: {
      userId: user.userId || guestId || defaultGuestId,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "+380",
      email: user.email || "",
      address: user.address || "",
      additionalInfo: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required(t("required")),
      lastName: Yup.string().required(t("required")),
      phone: Yup.string()
        .matches(/^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, t("invalidPhone"))
        .required(t("required")),
      email: Yup.string().email(t("invalidEmail")).required(t("required")),
      address: Yup.string().required(t("required")),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const finalUserId = values.userId || guestId || defaultGuestId;
        const payload = {
          userId: finalUserId,
          userEmail: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          deliveryAddress: values.address,
          postOfficeDetails: values.additionalInfo,
          items: basketItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            size: item.selectedSize,
            color: item.selectedColor,
            article: item.article || "",
            name: {
              en: item.name?.en || "",
              uk: item.name?.uk || "",
            },
            description: {
              en: item.description?.en || "",
              uk: item.description?.uk || "",
            },
            mainImage: item.mainImage
              ? {
                  url: item.mainImage.url || "",
                  alt: {
                    en: item.mainImage.alt?.en || "",
                    uk: item.mainImage.alt?.uk || "",
                  },
                }
              : null,
            price: {
              amount: item.price?.amount || 0,
              currency: item.price?.currency || "USD",
              discount: item.price?.discount || 0,
            },
            category: {
              en: item.category?.en || "",
              uk: item.category?.uk || "",
            },
            gender:
              item.gender === "male" || item.gender === "female"
                ? item.gender
                : "male",
          })),
        };
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) throw new Error("Failed to submit order");

        resetForm();
        dispatch(clearBasket());
        router.push("/");
      } catch (err) {
        console.error("Order error:", err);
        alert(t("errorMessage"));
      }
    },
    enableReinitialize: true,
  });

  if (!isClient && !user.userId) return <div>Loading...</div>;

  const renderField = (
    id: keyof typeof formik.values,
    type: string = "text",
    isTextarea: boolean = false,
    placeholder?: string
  ) => {
    // Спеціальна обробка для поля телефону
    if (id === "phone") {
      return (
        <div className={styles.field}>
          <label htmlFor={id} className={styles.label}>
            {t(id)}
          </label>
          <input
            id={id}
            name={id}
            type="tel"
            className={styles.input}
            value={formik.values.phone}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            onBlur={formik.handleBlur}
            placeholder="+380 (XX) XXX-XX-XX"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className={styles.error}>{formik.errors.phone}</div>
          )}
        </div>
      );
    }
    
    // Стандартна обробка для інших полів
    const Input = isTextarea ? "textarea" : "input";
    return (
      <div className={styles.field}>
        <label htmlFor={id} className={styles.label}>
          {t(id)}
        </label>
        <Input
          id={id}
          name={id}
          type={type}
          className={styles.input}
          value={formik.values[id]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={placeholder}
          rows={isTextarea ? 4 : undefined}
        />
        {formik.touched[id] && formik.errors[id] && (
          <div className={styles.error}>{formik.errors[id]}</div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.orderForm}>
      {renderField("firstName")}
      {renderField("lastName")}
      {renderField("phone")}
      {renderField("email", "email")}
      {renderField("address")}
      {renderField("additionalInfo", "text", true)}
      <button
        type="submit"
        className={styles.button}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
};

export default OrderForm;



