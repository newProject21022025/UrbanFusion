// src/components/clothesForm/CareInstructionsSection.tsx

"use client";

import { useEffect, useRef } from "react";
import { FormData } from "./ClothesForm";
import styles from "./ClothesForm.module.css";
import { useTranslations } from "next-intl";
import { categoryMetadata } from "./categoryMetadata";

interface CareInstructionsSectionProps {
  formData: FormData;
  handleArrayChange: (
    arrayName: "careInstructions" | "details",
    index: number,
    field: "en" | "uk",
    value: string
  ) => void;
  removeArrayItem: (
    arrayName: "careInstructions" | "details",
    index: number
  ) => void;
  addArrayItem: (arrayName: "careInstructions" | "details") => void;
}

export default function CareInstructionsSection({
  formData,
  handleArrayChange,
  removeArrayItem,
  addArrayItem,
}: CareInstructionsSectionProps) {
  const t = useTranslations("CareInstructionsSection");
  const prevCategory = useRef<string>("");

  useEffect(() => {
    const currentCategoryEn = formData.category.en;

    if (currentCategoryEn && currentCategoryEn !== prevCategory.current) {
      const key = formData.category.en
        .toLowerCase()
        .replace(/\s+/g, "-") as keyof typeof categoryMetadata;
      const metadataEntry = categoryMetadata[key];

      if (metadataEntry) {
        handleArrayChange(
          "careInstructions",
          0,
          "en",
          metadataEntry.instructions.en
        );
        handleArrayChange(
          "careInstructions",
          0,
          "uk",
          metadataEntry.instructions.uk
        );
      }

      prevCategory.current = currentCategoryEn;
    }
  }, [formData.category.en]);

  return (
    <div className={styles.formSection}>
      <h3>{t("careInstructions")}</h3>
      {formData.careInstructions.map((instruction, index) => (
        <div key={index} className={styles.formGroup}>
          <h4>{t("instruction", { number: index + 1 })}</h4>

          <div className={styles.formGroup}>
            <label>{t("english")}:</label>
            <textarea
              value={instruction.en}
              onChange={(e) =>
                handleArrayChange(
                  "careInstructions",
                  index,
                  "en",
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>{t("ukrainian")}:</label>
            <textarea
              value={instruction.uk}
              onChange={(e) =>
                handleArrayChange(
                  "careInstructions",
                  index,
                  "uk",
                  e.target.value
                )
              }
              required
            />
          </div>

          {formData.careInstructions.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("careInstructions", index)}
            >
              {t("removeInstruction")}
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={() => addArrayItem("careInstructions")}>
        {t("addCareInstruction")}
      </button>
    </div>
  );
}
