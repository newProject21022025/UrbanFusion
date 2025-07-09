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

  // ✅ Викликаємо useEffect завжди, без умов
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

  // const currentUserId = user.userId || guestId || "guest_user";

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
        .matches(/^\+\d{9,15}$/, t("invalidPhone"))
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
            article: item.article || "", // Додано поле article  
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
              // id: item.category?.id || "",
              en: item.category?.en || "",
              uk: item.category?.uk || "",
            },
            gender:
              item.gender === "male" || item.gender === "female"
                ? item.gender
                : "male", // ✅ без "unisex"              
          })),
        };
        console.log("Final payload", JSON.stringify(payload, null, 2));
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

  // ⛔ Відображення, а не хук, залежить від стану
  if (!isClient && !user.userId) return <div>Loading...</div>;

  const renderField = (
    id: keyof typeof formik.values,
    type: string = "text",
    isTextarea: boolean = false,
    placeholder?: string
  ) => {
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
      {renderField("phone", "tel", false, "+380123456789")}
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

