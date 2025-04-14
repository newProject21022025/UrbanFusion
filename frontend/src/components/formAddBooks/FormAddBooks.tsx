"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./FormAddBooks.module.css";

export default function FormAddBooks() {
  const t = useTranslations("FormAddBooks");

  const [form, setForm] = useState({
    titleEn: "",
    titleUk: "",
    descriptionEn: "",
    descriptionUk: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const bookData = {
      title: { en: form.titleEn, uk: form.titleUk },
      description: { en: form.descriptionEn, uk: form.descriptionUk },
      image: form.image,
    };

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(t("success"));
        setForm({ titleEn: "", titleUk: "", descriptionEn: "", descriptionUk: "", image: "" });
      } else {
        setMessage(t("error", { error: data.error }));
      }
    } catch (error) {
      setMessage(t("failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{t("formTitle")}</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} type="text" name="titleEn" value={form.titleEn} onChange={handleChange} placeholder={t("titleEn")} required />
        <input className={styles.input} type="text" name="titleUk" value={form.titleUk} onChange={handleChange} placeholder={t("titleUk")} required />
        <textarea className={styles.textarea} name="descriptionEn" value={form.descriptionEn} onChange={handleChange} placeholder={t("descriptionEn")} required />
        <textarea className={styles.textarea} name="descriptionUk" value={form.descriptionUk} onChange={handleChange} placeholder={t("descriptionUk")} required />
        <input className={styles.input} type="text" name="image" value={form.image} onChange={handleChange} placeholder={t("image")} required />
        <button className={styles.button} type="submit" disabled={loading}>{loading ? t("loading") : t("submit")}</button>
      </form>
    </div>
  );
}
