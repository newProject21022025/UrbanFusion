// src/components/orderForm/OrderForm.tsx

"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./OrderForm.module.css";
import { useRouter } from "next/navigation";
import { clearBasket } from "../../redux/slices/basketSlice";

const OrderForm: React.FC = () => {
  const t = useTranslations("OrderForm");
  const { items: basketItems } = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const getOrCreateGuestId = () => {
    if (typeof window === "undefined") return null;
  
    let guestId = localStorage.getItem("guestUserId");
    if (!guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem("guestUserId", guestId);
    }
    return guestId;
  };
  

  const initialValues = useMemo(
    () => ({
      userId: user.userId || getOrCreateGuestId() || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      email: user.email || "",
      address: user.address || "",
      additionalInfo: "",
    }),
    [user]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string().required(t("required")),
        lastName: Yup.string().required(t("required")),
        phone: Yup.string()
          .matches(/^\+\d{9,15}$/, t("invalidPhone"))
          .required(t("required")),
        email: Yup.string().email(t("invalidEmail")).required(t("required")),
        address: Yup.string().required(t("required")),
        additionalInfo: Yup.string(),
      }),
    [t]
  );

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const payload = {
        userId: user.userId || getOrCreateGuestId(),
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
            id: item.category?.id || "",
            en: item.category?.en || "",
            uk: item.category?.uk || "",
          },
          gender: item.gender === "female" ? "female" : "male",
        })),
      };

      console.log("корзина:", basketItems);
      console.log("payload:", payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uk/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Order failed");

      const result = await response.json();
      console.log("Order sent:", result);

      resetForm();
      dispatch(clearBasket());
      router.push("/");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(t("errorMessage"));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const renderField = (
    id: keyof typeof initialValues,
    type: string = "text",
    isTextarea: boolean = false,
    placeholder?: string
  ) => {
    const InputComponent = isTextarea ? "textarea" : "input";
    const inputProps = {
      id,
      name: id,
      type,
      className: isTextarea ? styles.textarea : styles.input,
      value: formik.values[id],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder,
      ...(isTextarea && { rows: 4 }),
    };

    return (
      <>
        <label htmlFor={id} className={styles.label}>
          {t(id)}
        </label>
        <InputComponent {...inputProps} />
        {formik.touched[id] && formik.errors[id] && (
          <div className={styles.error}>{formik.errors[id]}</div>
        )}
      </>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.orderForm}>
      {renderField("firstName")}
      {renderField("lastName")}
      {renderField("phone", "tel", false, "+1234567890")}
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
