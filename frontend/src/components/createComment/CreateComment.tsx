//src/components/createComment/CreateComment.tsx

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; 
import styles from "./CreateComment.module.css";
import { commentService } from "../../app/api/commentService";
import { useTranslations } from "next-intl";

interface CreateCommentProps {
  clothesId: string;
  locale: string;
  onCommentAdded: () => void;
}

export default function CreateComment({
  clothesId,
  locale,
  onCommentAdded,
}: CreateCommentProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("CreateComment");

  const user = useSelector((state: RootState) => state.user);
  const userId = user.userId;
  const userName = user.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : "Користувач";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !userId) return;

    setIsSubmitting(true);
    try {
      await commentService.addComment(clothesId, locale, {
        userId,
        userName,
        rating,
        comment,
      });

      setComment("");
      setRating(0);
      onCommentAdded();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{t("leaveComment")}</h3>
      <div className={styles.rating}>
        <label>{t("rating")}</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={0}>{t("noRating")}</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("placeholder")}
        required
        className={styles.textarea}
      />
      <button
        type="submit"
        disabled={isSubmitting || !userId}
        className={styles.submitButton}
        title={!userId ? t("loginToComment") : ""}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
