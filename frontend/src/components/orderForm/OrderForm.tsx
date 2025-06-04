// src/components/orderForm/OrderForm.tsx

"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./OrderForm.module.css";
import { useRouter } from "next/navigation";
import { clearBasket } from "../../redux/slices/basketSlice";
import { useDispatch } from "react-redux";

const OrderForm: React.FC = () => {
  const t = useTranslations("OrderForm");
  const { items: basketItems } = useSelector(
    (state: RootState) => state.basket
  );
  const user = useSelector((state: RootState) => state.user);

  const initialValues = useMemo(
    () => ({
      userId: user.userId || "",
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
        userId: user.userId,
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
        })),
      };

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
  const dispatch = useDispatch();
  const router = useRouter();

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
